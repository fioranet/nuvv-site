import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { db, initDatabase } from './db.js';
import {
  getSmtpConfig,
  sendWelcomeEmail,
  sendBlogBroadcast,
  sendViabilityAlert,
  createTransporter,
  logEmail,
} from './smtp.js';
import { validateCpfCnpj } from './validatorService.js';
import { buscarDadosSegundaVia, obterPixFaturamento } from './hubsoft.js';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Diretório de Uploads Persistentes (data/uploads) e escopo do Colaborador (/uploads/colaborador)
const uploadsDir = path.resolve(__dirname, '../data/uploads');
const collaboratorBaseDir = path.resolve(uploadsDir, 'colaborador');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(collaboratorBaseDir)) {
  fs.mkdirSync(collaboratorBaseDir, { recursive: true });
}

// Inicializar subpastas padrão dentro de /colaborador
const defaultCollaboratorSubfolders = [
  'equipamentos/manuais',
  'equipamentos/firmware',
  'produtos/manuais',
  'produtos/fichas',
  'procedimentos',
  'treinamento',
];
for (const sub of defaultCollaboratorSubfolders) {
  const p = path.join(collaboratorBaseDir, sub);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

// Middlewares
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Servir arquivos estáticos em /uploads com suporte a renderização de HTML, PDF e imagens
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (filePath.endsWith('.html') || filePath.endsWith('.htm')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  }
}));

// Initialize DB schema on startup
initDatabase();

// External Viability Engine URL (Easypanel)
const EXTERNAL_VIABILITY_URL = process.env.VIABILITY_API_URL || 'https://nuvv-digital-viabilidade.yuajnb.easypanel.host';

function getSetting(key, defaultValue = null) {
  try {
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
    return row && row.value ? row.value : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setSetting(key, value) {
  db.prepare(`
    INSERT INTO settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `).run(key, value);
}

// -------------------------------------------------------------
// 1. HEALTH & DIAGNOSTICS
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  try {
    const pageviewsCount = db.prepare('SELECT COUNT(*) as count FROM page_views').get().count;
    const viabilityCount = db.prepare('SELECT COUNT(*) as count FROM viability_queries').get().count;
    const subscribersCount = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers').get().count;
    const leadsCount = db.prepare('SELECT COUNT(*) as count FROM commercial_leads').get().count;
    const smtp = getSmtpConfig();

    res.json({
      status: 'ok',
      database: 'connected (SQLite WAL)',
      records: {
        pageviews: pageviewsCount,
        viability: viabilityCount,
        subscribers: subscribersCount,
        leads: leadsCount,
      },
      smtpConfigured: Boolean(smtp.user && smtp.pass),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// -------------------------------------------------------------
// 2. REAL-TIME CLIENT TRACKING
// -------------------------------------------------------------
app.post('/api/track/pageview', (req, res) => {
  try {
    const {
      visitor_id,
      session_id,
      path,
      title,
      referrer,
      city,
      device,
      utm_source,
      utm_medium,
      utm_campaign,
      is_admin,
    } = req.body;
    const userAgent = req.headers['user-agent'] || '';

    // Detectar bots, spiders, crawlers e scans automáticos
    const isBot = /bot|spider|crawl|slurp|bing|yandex|baidu|semrush|ahrefs|dotbot|rogerbot|headless|curl|python|wget|scanner|nikto|sqlmap/i.test(userAgent) ||
      (path && (path.includes('<') || path.includes('>') || path.includes('onerror=') || path.includes('rel=nofollow') || path.includes('search_term_string')));

    // Detectar acessos administrativos internos
    const isAdmin = is_admin === true || is_admin === 1 || (path && (path.startsWith('/admin') || path.startsWith('/portal')));

    // Extrair IP real do visitante
    const forwarded = req.headers['x-forwarded-for'];
    const ipAddress = (forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '';

    // Extrair dispositivo real
    const isMobile = /mobile|iphone|ipod|android/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const resolvedDevice = device || (isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop');

    // Extrair Navegador
    let browser = 'Outro';
    if (/edg/i.test(userAgent)) browser = 'Edge';
    else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
    else if (/opera|opr/i.test(userAgent)) browser = 'Opera';

    // Extrair Sistema Operacional
    let os = 'Outro';
    if (/windows/i.test(userAgent)) os = 'Windows';
    else if (/android/i.test(userAgent)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
    else if (/mac os|macintosh/i.test(userAgent)) os = 'macOS';
    else if (/linux/i.test(userAgent)) os = 'Linux';

    // Cidade real apenas se informada (não simular 'Suzano' como default)
    const cleanCity = city && typeof city === 'string' && city.trim() ? city.trim() : null;

    db.prepare(`
      INSERT INTO page_views (
        visitor_id, session_id, path, title, referrer, city, device,
        browser, os, ip_address, utm_source, utm_medium, utm_campaign,
        is_bot, is_admin, user_agent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      visitor_id || session_id || 'anonymous',
      session_id || 'anonymous',
      path || '/',
      title || 'Nuvv',
      referrer || '',
      cleanCity,
      resolvedDevice,
      browser,
      os,
      ipAddress,
      utm_source || null,
      utm_medium || null,
      utm_campaign || null,
      isBot ? 1 : 0,
      isAdmin ? 1 : 0,
      userAgent.slice(0, 200)
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. ADMIN ANALYTICS METRICS (DADOS 100% REAIS COM FILTRO TEMPORAL)
// -------------------------------------------------------------
app.get('/api/admin/metrics', (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;

    let dateFilterClause = '';
    let dateParams = [];
    let periodLabel = 'Últimos 30 dias (Mês)';

    if (period === 'today') {
      dateFilterClause = " AND date(created_at) = date('now')";
      periodLabel = 'Hoje (Dia Atual)';
    } else if (period === 'week') {
      dateFilterClause = " AND created_at >= datetime('now', '-7 days')";
      periodLabel = 'Últimos 7 dias (Semana)';
    } else if (period === 'month') {
      dateFilterClause = " AND created_at >= datetime('now', '-30 days')";
      periodLabel = 'Últimos 30 dias (Mês)';
    } else if (period === 'custom' && startDate && endDate) {
      dateFilterClause = ' AND created_at >= ? AND created_at <= ?';
      dateParams = [`${startDate} 00:00:00`, `${endDate} 23:59:59`];
      periodLabel = `Período: ${startDate} até ${endDate}`;
    } else if (period === 'all') {
      dateFilterClause = '';
      periodLabel = 'Desde Sempre (Todo o Período)';
    } else {
      dateFilterClause = " AND created_at >= datetime('now', '-30 days')";
      periodLabel = 'Últimos 30 dias (Mês)';
    }

    // Filtro base: IGNORAR estritamente acessos do admin, portal e robôs/scanners automáticos
    const baseFilter = " AND (path NOT LIKE '/admin%' AND path NOT LIKE '/portal%') AND (is_admin = 0 OR is_admin IS NULL) AND (is_bot = 0 OR is_bot IS NULL)";
    const fullPeriodFilter = `WHERE 1=1 ${baseFilter} ${dateFilterClause}`;

    // Totais vitalícios públicos (Reais e limpos)
    const lifetimePageviews = db.prepare(`SELECT COUNT(*) as count FROM page_views WHERE 1=1 ${baseFilter}`).get().count;
    const lifetimeUniqueVisitors = db.prepare(`SELECT COUNT(DISTINCT COALESCE(visitor_id, session_id)) as count FROM page_views WHERE 1=1 ${baseFilter}`).get().count;
    const lifetimeSessions = db.prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE 1=1 ${baseFilter}`).get().count;
    const lifetimeViability = db.prepare('SELECT COUNT(*) as count FROM viability_queries').get().count;
    const lifetimeLeads = db.prepare('SELECT COUNT(*) as count FROM commercial_leads').get().count;
    const totalSubscribers = db.prepare("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'active'").get().count;

    // Métricas no Período Selecionado
    const periodPageviews = db.prepare(`SELECT COUNT(*) as count FROM page_views ${fullPeriodFilter}`).get(...dateParams).count;
    const periodUniqueVisitors = db.prepare(`SELECT COUNT(DISTINCT COALESCE(visitor_id, session_id)) as count FROM page_views ${fullPeriodFilter}`).get(...dateParams).count;
    const periodSessions = db.prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views ${fullPeriodFilter}`).get(...dateParams).count;

    // Hoje
    const todayPageviews = db.prepare(`SELECT COUNT(*) as count FROM page_views WHERE date(created_at) = date('now') ${baseFilter}`).get().count;
    const todayUniqueVisitors = db.prepare(`SELECT COUNT(DISTINCT COALESCE(visitor_id, session_id)) as count FROM page_views WHERE date(created_at) = date('now') ${baseFilter}`).get().count;
    const todaySessions = db.prepare(`SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE date(created_at) = date('now') ${baseFilter}`).get().count;
    
    // Viabilidade e Leads no período
    const periodViability = db.prepare(`SELECT COUNT(*) as count FROM viability_queries WHERE 1=1 ${dateFilterClause}`).get(...dateParams).count;
    const periodLeads = db.prepare(`SELECT COUNT(*) as count FROM commercial_leads WHERE 1=1 ${dateFilterClause}`).get(...dateParams).count;

    // Top Pages no Período
    const topPages = db.prepare(`
      SELECT path, COUNT(*) as views
      FROM page_views
      ${fullPeriodFilter}
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10
    `).all(...dateParams);

    // Device breakdown no Período
    const devices = db.prepare(`
      SELECT device, COUNT(*) as count
      FROM page_views
      ${fullPeriodFilter}
      GROUP BY device
    `).all(...dateParams);

    // Browsers breakdown no Período
    const browsers = db.prepare(`
      SELECT COALESCE(browser, 'Outro') as name, COUNT(*) as count
      FROM page_views
      ${fullPeriodFilter}
      GROUP BY name
      ORDER BY count DESC
      LIMIT 6
    `).all(...dateParams);

    // Top Cities no Período
    const topCities = db.prepare(`
      SELECT city, COUNT(*) as count
      FROM page_views
      ${fullPeriodFilter} AND city IS NOT NULL AND city != ''
      GROUP BY city
      ORDER BY count DESC
      LIMIT 8
    `).all(...dateParams);

    // Origens de Tráfego Reais no Período
    const trafficSources = db.prepare(`
      SELECT 
        CASE 
          WHEN utm_source IS NOT NULL AND utm_source != '' THEN 'Campanha: ' || utm_source
          WHEN referrer LIKE '%google%' THEN 'Google (Busca)'
          WHEN referrer LIKE '%instagram%' THEN 'Instagram'
          WHEN referrer LIKE '%facebook%' THEN 'Facebook'
          WHEN referrer LIKE '%whatsapp%' OR referrer LIKE '%wa.me%' THEN 'WhatsApp'
          WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
          WHEN referrer LIKE '%t.co%' OR referrer LIKE '%twitter%' OR referrer LIKE '%x.com%' THEN 'X / Twitter'
          WHEN referrer IS NULL OR referrer = '' OR referrer = '/' THEN 'Acesso Direto / Favoritos'
          ELSE referrer
        END as source_name,
        COUNT(*) as count
      FROM page_views
      ${fullPeriodFilter}
      GROUP BY source_name
      ORDER BY count DESC
      LIMIT 8
    `).all(...dateParams);

    // Últimos acessos reais no Período
    const recentPageviews = db.prepare(`
      SELECT id, path, title, referrer, city, device, browser, os, created_at
      FROM page_views
      ${fullPeriodFilter}
      ORDER BY id DESC
      LIMIT 15
    `).all(...dateParams);

    // Tendência diária no período
    let dailyTrend = [];
    if (period === 'today') {
      dailyTrend = db.prepare(`
        SELECT strftime('%H:00', created_at) as date, COUNT(*) as views
        FROM page_views
        WHERE date(created_at) = date('now') ${baseFilter}
        GROUP BY strftime('%H:00', created_at)
        ORDER BY date ASC
      `).all();
    } else {
      dailyTrend = db.prepare(`
        SELECT date(created_at) as date, COUNT(*) as views
        FROM page_views
        ${fullPeriodFilter}
        GROUP BY date(created_at)
        ORDER BY date ASC
        LIMIT 31
      `).all(...dateParams);
    }

    res.json({
      success: true,
      data: {
        periodInfo: {
          period,
          startDate: startDate || null,
          endDate: endDate || null,
          label: periodLabel,
        },
        lifetime: {
          totalPageviews: lifetimePageviews,
          uniqueVisitors: lifetimeUniqueVisitors,
          totalSessions: lifetimeSessions,
          totalViability: lifetimeViability,
          totalLeads: lifetimeLeads,
        },
        kpis: {
          totalPageviews: periodPageviews,
          todayPageviews,
          uniqueVisitors: periodUniqueVisitors,
          todayUniqueVisitors,
          totalSessions: periodSessions,
          todaySessions,
          totalViability: periodViability,
          totalSubscribers,
          totalLeads: periodLeads,
        },
        topPages,
        devices,
        browsers,
        topCities,
        trafficSources,
        recentPageviews,
        last7Days: dailyTrend,
      },
    });
  } catch (err) {
    console.error('Error fetching admin metrics:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. VIABILITY CONSULTATIONS & DEMAND HEATMAP
// -------------------------------------------------------------
app.get('/api/admin/viability', (req, res) => {
  try {
    const { status, service_type, city, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM viability_queries WHERE 1=1';
    const params = [];

    if (status === 'yes' || status === 'VIAVEL') {
      query += " AND (has_feasibility = 1 OR status = 'VIAVEL')";
    } else if (status === 'no' || status === 'INVIAVEL') {
      query += " AND (has_feasibility = 0 AND (status = 'INVIAVEL' OR status IS NULL))";
    } else if (status === 'EM_ANALISE') {
      query += " AND status = 'EM_ANALISE'";
    }

    if (service_type) {
      query += ' AND service_type = ?';
      params.push(service_type);
    }

    if (city) {
      query += ' AND city = ?';
      params.push(city);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const queries = db.prepare(query).all(...params);

    // Summary stats
    const total = db.prepare('SELECT COUNT(*) as count FROM viability_queries').get().count;
    const withFeasibility = db.prepare("SELECT COUNT(*) as count FROM viability_queries WHERE has_feasibility = 1 OR status = 'VIAVEL'").get().count;
    const emAnalise = db.prepare("SELECT COUNT(*) as count FROM viability_queries WHERE status = 'EM_ANALISE'").get().count;
    const withoutFeasibility = db.prepare("SELECT COUNT(*) as count FROM viability_queries WHERE (has_feasibility = 0 AND status != 'EM_ANALISE')").get().count;

    // Top Unmet Neighborhoods (Demanda Reprimida)
    const unmetNeighborhoods = db.prepare(`
      SELECT neighborhood, city, COUNT(*) as demand_count
      FROM viability_queries
      WHERE (has_feasibility = 0 AND status != 'EM_ANALISE') AND neighborhood IS NOT NULL AND neighborhood != ''
      GROUP BY neighborhood, city
      ORDER BY demand_count DESC
      LIMIT 8
    `).all();

    res.json({
      success: true,
      data: {
        queries,
        stats: {
          total,
          withFeasibility,
          emAnalise,
          withoutFeasibility,
          coverageRate: total > 0 ? Math.round((withFeasibility / total) * 100) : 0,
        },
        unmetNeighborhoods,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Heatmap Data for Unmet Demand
const CITY_FALLBACK_COORDS = {
  'suzano': [-23.5425, -46.3108],
  'mogi das cruzes': [-23.5244, -46.1882],
  'poa': [-23.5228, -46.3458],
  'poá': [-23.5228, -46.3458],
  'ferraz de vasconcelos': [-23.5414, -46.3683],
  'itaquaquecetuba': [-23.4861, -46.3486],
  'aruja': [-23.3967, -46.3208],
  'arujá': [-23.3967, -46.3208],
  'santa isabel': [-23.3156, -46.2239],
  'guarulhos': [-23.4542, -46.5333],
  'sao paulo': [-23.5505, -46.6333],
  'são paulo': [-23.5505, -46.6333],
  'campinas': [-22.9056, -47.0608],
  'rio de janeiro': [-22.9068, -43.1729],
};

app.get('/api/admin/viability/heatmap', (req, res) => {
  try {
    const unmetList = db.prepare(`
      SELECT 
        cep, 
        street, 
        neighborhood, 
        city, 
        state, 
        COUNT(*) as count,
        MAX(created_at) as last_request_at
      FROM viability_queries
      WHERE has_feasibility = 0
      GROUP BY cep, neighborhood, city
      ORDER BY count DESC
    `).all();

    // Map each group to lat/lng
    const heatmapPoints = unmetList.map((item) => {
      const cityKey = (item.city || 'suzano').toLowerCase().trim();
      const baseCoords = CITY_FALLBACK_COORDS[cityKey] || [-23.5425, -46.3108];

      // Add a slight jitter if grouping by CEP so multiple nearby CEPs don't perfectly overlap
      const hash = (item.cep || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const jitterLat = ((hash % 20) - 10) * 0.0015;
      const jitterLng = (((hash * 3) % 20) - 10) * 0.0015;

      return {
        lat: baseCoords[0] + jitterLat,
        lng: baseCoords[1] + jitterLng,
        count: item.count,
        weight: Math.min(Math.max(item.count, 1), 10),
        cep: item.cep,
        street: item.street,
        neighborhood: item.neighborhood,
        city: item.city,
        state: item.state,
        lastRequestAt: item.last_request_at,
      };
    });

    res.json({
      success: true,
      totalUnmetRequests: unmetList.reduce((sum, item) => sum + item.count, 0),
      pointsCount: heatmapPoints.length,
      points: heatmapPoints,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4.1 MOTOR EXTERNO DE VIABILIDADE TÉCNICA (EASYPANEL)
// -------------------------------------------------------------

app.post('/api/viability/check', async (req, res) => {
  try {
    const {
      query,
      number,
      service_type = 'residencial',
      latitude,
      longitude,
      name,
      phone,
      email,
      notes,
      plan_interested,
    } = req.body;

    if (!query && (latitude === undefined || latitude === null)) {
      return res.status(400).json({
        success: false,
        error: 'Endereço textual, CEP ou coordenadas geográficas são obrigatórios para a consulta.',
      });
    }

    // Camadas configuradas no sistema
    const configuredLayer = service_type === 'empresarial'
      ? (getSetting('viability_layer_empresarial') || 'ihs___sp')
      : (getSetting('viability_layer_residencial') || 'suzano_poa');

    // Monta o payload para a API externa de alta precisão (Shapely 2.0)
    const externalPayload = {
      query: query ? String(query).trim() : undefined,
      number: number ? String(number).trim() : undefined,
      latitude: latitude !== undefined && latitude !== null ? Number(latitude) : undefined,
      longitude: longitude !== undefined && longitude !== null ? Number(longitude) : undefined,
      layers: [configuredLayer],
    };

    let externalRes;
    try {
      const resp = await fetch(`${EXTERNAL_VIABILITY_URL}/api/viability/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(externalPayload),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`API Externa HTTP ${resp.status}: ${errorText}`);
      }
      externalRes = await resp.json();
    } catch (apiErr) {
      console.error('❌ Falha na chamada da API externa de viabilidade:', apiErr);
      return res.status(502).json({
        success: false,
        error: 'Não foi possível conectar ao motor externo de viabilidade.',
        details: apiErr.message,
      });
    }

    const status = externalRes.status || 'EM_ANALISE'; // VIAVEL, INVIAVEL, EM_ANALISE
    const hasFeasibility = status === 'VIAVEL' ? 1 : 0;
    const lat = externalRes.location?.latitude ?? (latitude !== undefined ? Number(latitude) : null);
    const lng = externalRes.location?.longitude ?? (longitude !== undefined ? Number(longitude) : null);
    const matchedPolygonName = externalRes.matched_polygon?.polygon_name || externalRes.matched_polygon?.polygon_id || null;
    const matchedLayerId = externalRes.matched_polygon?.layer_id || configuredLayer;
    const distanceMeters = typeof externalRes.distance_to_nearest_meters === 'number'
      ? Math.round(externalRes.distance_to_nearest_meters * 10) / 10
      : 0;
    const displayName = externalRes.display_name || query || '';

    // Extração de dados de endereço se vieram do Nominatim
    let street = '';
    let neighborhood = '';
    let city = service_type === 'empresarial' ? 'São Paulo' : 'Suzano';
    let state = 'SP';
    let cep = '';

    if (query && /^\d{5}-?\d{3}$/.test(query.trim())) {
      cep = query.trim().replace(/\D/g, '');
    }

    if (displayName) {
      const parts = displayName.split(',').map((p) => p.trim());
      if (parts.length >= 1) street = parts[0];
      const cepMatch = displayName.match(/\b\d{5}-\d{3}\b/);
      if (cepMatch && !cep) {
        cep = cepMatch[0].replace(/\D/g, '');
      }
      const knownCities = ['Suzano', 'Poá', 'Mogi das Cruzes', 'Ferraz de Vasconcelos', 'Itaquaquecetuba', 'Arujá', 'São Paulo', 'Guarulhos'];
      for (const kc of knownCities) {
        if (displayName.toLowerCase().includes(kc.toLowerCase())) {
          city = kc;
          break;
        }
      }
    }

    // Armazena no banco de dados SQLite (histórico completo de retornos)
    const insertStmt = db.prepare(`
      INSERT INTO viability_queries (
        name, phone, email, cep, street, number, neighborhood, city, state,
        service_type, has_feasibility, status, matched_layer, matched_polygon,
        distance_meters, latitude, longitude, raw_response, plan_interested, notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = insertStmt.run(
      name || null,
      phone || null,
      email || null,
      cep || (query ? query.slice(0, 20) : 'GPS'),
      street || query || '',
      number || null,
      neighborhood || '',
      city,
      state,
      service_type,
      hasFeasibility,
      status,
      matchedLayerId,
      matchedPolygonName,
      distanceMeters,
      lat,
      lng,
      JSON.stringify(externalRes),
      plan_interested || null,
      notes || `Motor Externo | Mancha: ${matchedPolygonName || 'N/A'} | Distância: ${distanceMeters}m`
    );

    // Dispara alerta se já tiver dados de contato
    if (phone || email || name) {
      sendViabilityAlert({
        name,
        phone,
        email,
        cep: cep || query,
        street,
        number,
        neighborhood,
        city,
        state,
        service_type,
        has_feasibility: Boolean(hasFeasibility),
        plan_interested,
        notes: `Status: ${status} | Distância: ${distanceMeters}m | Mancha: ${matchedPolygonName || 'N/A'}`,
      }).catch(console.error);
    }

    let userFriendlyMessage = '';
    if (status === 'VIAVEL') {
      userFriendlyMessage = 'Viabilidade Confirmada! Temos cobertura de Fibra Óptica de ultravelocidade para o seu endereço.';
    } else if (status === 'EM_ANALISE') {
      userFriendlyMessage = 'Endereço em estudo de viabilidade técnica pela nossa equipe.';
    } else {
      userFriendlyMessage = 'No momento não identificamos cobertura imediata para este endereço.';
    }

    res.json({
      success: true,
      query_id: info.lastInsertRowid,
      status,
      isAvailable: status === 'VIAVEL',
      service_type,
      configured_layer: configuredLayer,
      location: { latitude: lat, longitude: lng },
      display_name: displayName,
      matched_polygon: externalRes.matched_polygon || null,
      all_matched_polygons: externalRes.all_matched_polygons || [],
      distance_to_nearest_meters: distanceMeters,
      consulted_layers: externalRes.consulted_layers || [configuredLayer],
      message: userFriendlyMessage,
    });
  } catch (err) {
    console.error('❌ Erro no endpoint /api/viability/check:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Consulta camadas da API externa e configuração local ativa
app.get('/api/viability/layers', async (req, res) => {
  try {
    const resp = await fetch(`${EXTERNAL_VIABILITY_URL}/api/layers`);
    if (!resp.ok) {
      throw new Error(`API retornou HTTP ${resp.status}`);
    }
    const layers = await resp.json();
    const configResidencial = getSetting('viability_layer_residencial', 'suzano_poa');
    const configEmpresarial = getSetting('viability_layer_empresarial', 'ihs___sp');

    res.json({
      success: true,
      externalApiUrl: EXTERNAL_VIABILITY_URL,
      layers,
      config: {
        residencial_layer: configResidencial,
        empresarial_layer: configEmpresarial,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Não foi possível carregar as camadas da API externa.',
      details: err.message,
    });
  }
});

// Atualiza camadas associadas ao Residencial e Empresarial
app.post('/api/admin/viability/config', (req, res) => {
  try {
    const { residencial_layer, empresarial_layer } = req.body;
    if (residencial_layer) {
      setSetting('viability_layer_residencial', residencial_layer);
    }
    if (empresarial_layer) {
      setSetting('viability_layer_empresarial', empresarial_layer);
    }
    res.json({
      success: true,
      message: 'Configurações de camadas salvas com sucesso.',
      config: {
        residencial_layer: getSetting('viability_layer_residencial', 'suzano_poa'),
        empresarial_layer: getSetting('viability_layer_empresarial', 'ihs___sp'),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Atualização de lead ou log manual de viabilidade
app.post('/api/viability/log', async (req, res) => {
  try {
    const {
      query_id,
      name,
      phone,
      email,
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
      service_type,
      has_feasibility,
      status,
      plan_interested,
      notes,
    } = req.body;

    if (query_id) {
      // Atualiza o registro existente com os dados de contato do cliente
      db.prepare(`
        UPDATE viability_queries
        SET name = COALESCE(?, name),
            phone = COALESCE(?, phone),
            email = COALESCE(?, email),
            plan_interested = COALESCE(?, plan_interested),
            notes = COALESCE(?, notes)
        WHERE id = ?
      `).run(
        name || null,
        phone || null,
        email || null,
        plan_interested || null,
        notes || null,
        query_id
      );

      if (phone || email || name) {
        sendViabilityAlert({
          name,
          phone,
          email,
          cep: cep || '',
          street: street || '',
          number: number || '',
          neighborhood: neighborhood || '',
          city: city || 'Suzano',
          state: state || 'SP',
          service_type: service_type || 'residencial',
          has_feasibility: Boolean(has_feasibility),
          plan_interested,
          notes: notes || 'Lead capturado após consulta',
        }).catch(console.error);
      }

      return res.json({ success: true, updated: true, id: query_id });
    }

    const info = db.prepare(`
      INSERT INTO viability_queries (
        name, phone, email, cep, street, number, neighborhood, city, state,
        service_type, has_feasibility, status, plan_interested, notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name || null,
      phone || null,
      email || null,
      cep || '',
      street || '',
      number || '',
      neighborhood || '',
      city || 'Suzano',
      state || 'SP',
      service_type || 'residencial',
      has_feasibility ? 1 : 0,
      status || (has_feasibility ? 'VIAVEL' : 'INVIAVEL'),
      plan_interested || null,
      notes || null
    );

    // Send internal alert if name or phone or email exists
    if (phone || email || name) {
      sendViabilityAlert({
        name,
        phone,
        email,
        cep,
        street,
        number,
        neighborhood,
        city,
        state,
        service_type,
        has_feasibility,
        plan_interested,
      }).catch(console.error);
    }

    res.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 5. NUVV NEWS (NEWSLETTER) & BROADCASTING
// -------------------------------------------------------------
app.get('/api/admin/newsletter', (req, res) => {
  try {
    const subscribers = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC').all();
    const totalActive = db.prepare("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'active'").get().count;

    res.json({
      success: true,
      data: {
        subscribers,
        totalActive,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, source = 'footer' } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'E-mail inválido.' });
    }

    const existing = db.prepare('SELECT id, status FROM newsletter_subscribers WHERE email = ?').get(email.toLowerCase());

    if (existing) {
      if (existing.status !== 'active') {
        db.prepare("UPDATE newsletter_subscribers SET status = 'active' WHERE id = ?").run(existing.id);
      }
      return res.json({ success: true, message: 'Você já estava cadastrado e sua inscrição está ativa!' });
    }

    db.prepare(`
      INSERT INTO newsletter_subscribers (email, name, source)
      VALUES (?, ?, ?)
    `).run(email.toLowerCase(), name || null, source);

    // Trigger welcome email
    sendWelcomeEmail(email.toLowerCase()).catch(console.error);

    res.json({ success: true, message: 'Inscrição confirmada com sucesso!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/newsletter/broadcast', async (req, res) => {
  try {
    const { title, excerpt, category, slug } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Título da notícia é obrigatório.' });
    }

    const result = await sendBlogBroadcast({
      title,
      excerpt,
      category,
      slug,
    });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 6. COMMERCIAL LEADS
// -------------------------------------------------------------
app.get('/api/admin/leads', (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM commercial_leads ORDER BY created_at DESC').all();
    res.json({ success: true, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/leads', (req, res) => {
  try {
    const { source_page, name, company, cnpj, phone, email, details } = req.body;

    const info = db.prepare(`
      INSERT INTO commercial_leads (source_page, name, company, cnpj, phone, email, details)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      source_page || 'Geral',
      name || '',
      company || '',
      cnpj || '',
      phone || '',
      email || '',
      details || ''
    );

    res.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 7. SMTP SETTINGS & TESTER
// -------------------------------------------------------------
app.get('/api/admin/smtp', (req, res) => {
  try {
    const config = getSmtpConfig();
    res.json({
      success: true,
      data: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.user,
        from: config.from,
        adminEmail: config.adminEmail,
        hasPassword: Boolean(config.pass),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/smtp', (req, res) => {
  try {
    const { host, port, secure, user, pass, from, adminEmail } = req.body;

    const upsert = db.prepare(`
      INSERT INTO settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `);

    const updateTx = db.transaction(() => {
      if (host !== undefined) upsert.run('smtp_host', host);
      if (port !== undefined) upsert.run('smtp_port', String(port));
      if (secure !== undefined) upsert.run('smtp_secure', String(secure));
      if (user !== undefined) upsert.run('smtp_user', user);
      if (pass !== undefined && pass !== '') upsert.run('smtp_pass', pass);
      if (from !== undefined) upsert.run('smtp_from', from);
      if (adminEmail !== undefined) upsert.run('admin_alert_email', adminEmail);
    });

    updateTx();

    res.json({ success: true, message: 'Configurações SMTP salvas com sucesso!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/smtp/test', async (req, res) => {
  try {
    const { targetEmail } = req.body;
    if (!targetEmail) {
      return res.status(400).json({ success: false, error: 'E-mail de destino é obrigatório.' });
    }

    const config = getSmtpConfig();
    const transporter = createTransporter();

    if (!transporter) {
      return res.status(400).json({
        success: false,
        error: 'SMTP não configurado. Por favor, preencha o usuário e senha SMTP.',
      });
    }

    await transporter.verify();

    await transporter.sendMail({
      from: config.from,
      to: targetEmail,
      subject: '✅ Teste de Conexão SMTP - Nuvv Intelligence Hub',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #0B0E14; color: #FFFFFF; border-radius: 12px;">
          <h2 style="color: #10B981; margin-top: 0;">Servidor SMTP Conectado com Sucesso!</h2>
          <p>Este é um e-mail de teste disparado pelo painel de monitoramento da Nuvv.</p>
          <p><strong>Horário do disparo:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      `,
    });

    logEmail(targetEmail, 'Teste de Conexão SMTP', 'test', 'sent');

    res.json({ success: true, message: `E-mail de teste enviado com sucesso para ${targetEmail}!` });
  } catch (err) {
    logEmail(req.body.targetEmail || 'unknown', 'Teste de Conexão SMTP', 'test', 'failed', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});



// -------------------------------------------------------------
// 8. DATA EXPORTS (CSV)
// -------------------------------------------------------------
app.get('/api/admin/export/:type', (req, res) => {
  try {
    const { type } = req.params;

    if (type === 'viability') {
      const rows = db.prepare('SELECT * FROM viability_queries ORDER BY created_at DESC').all();
      let csv = 'ID,Data,Nome,Telefone,Email,CEP,Endereco,Numero,Bairro,Cidade,Estado,Servico,Status,Viabilidade,Mancha,Poligono,Distancia_Metros,Latitude,Longitude,Plano,Notas\n';
      rows.forEach(r => {
        csv += `"${r.id}","${r.created_at}","${r.name || ''}","${r.phone || ''}","${r.email || ''}","${r.cep}","${r.street || ''}","${r.number || ''}","${r.neighborhood || ''}","${r.city || ''}","${r.state || ''}","${r.service_type || ''}","${r.status || (r.has_feasibility ? 'VIAVEL' : 'INVIAVEL')}","${r.has_feasibility ? 'SIM' : 'NAO'}","${r.matched_layer || ''}","${r.matched_polygon || ''}","${r.distance_meters || 0}","${r.latitude || ''}","${r.longitude || ''}","${r.plan_interested || ''}","${(r.notes || '').replace(/"/g, '""')}"\n`;
      });

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=nuvv_viabilidade.csv');
      return res.send(csv);
    }

    if (type === 'newsletter') {
      const rows = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC').all();
      let csv = 'ID,Email,Nome,Status,Origem,Data_Inscricao,Ultima_Notificacao\n';
      rows.forEach(r => {
        csv += `"${r.id}","${r.email}","${r.name || ''}","${r.status}","${r.source}","${r.subscribed_at}","${r.last_notified_at || ''}"\n`;
      });

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=nuvv_newsletter.csv');
      return res.send(csv);
    }

    res.status(400).send('Tipo de exportação não suportado.');
  } catch (err) {
    res.status(500).send('Erro ao exportar dados: ' + err.message);
  }
});

// -------------------------------------------------------------
// 9. HUBSOFT ERP - 2ª VIA RÁPIDA & PIX
// -------------------------------------------------------------
app.post('/api/segunda-via/consultar', async (req, res) => {
  try {
    const { cpf_cnpj } = req.body;
    if (!cpf_cnpj) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_PARAM',
        message: 'Por favor, informe o CPF ou CNPJ do assinante.'
      });
    }

    const validation = validateCpfCnpj(cpf_cnpj);
    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_CPF_CNPJ',
        message: 'O CPF ou CNPJ digitado é inválido. Por favor, verifique os números e tente novamente.'
      });
    }

    const resultado = await buscarDadosSegundaVia(validation.clean);
    return res.json({
      status: 'success',
      data: resultado
    });
  } catch (error) {
    if (error.statusCode === 404 || error.code === 'CLIENT_NOT_FOUND') {
      return res.status(404).json({
        status: 'error',
        code: 'CLIENT_NOT_FOUND',
        message: 'Nenhum cadastro de assinante localizado para o CPF/CNPJ informado.'
      });
    }

    console.error('[ROUTE ERROR] Erro na consulta de 2ª via:', error.message || error);
    return res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: 'Não foi possível consultar as faturas no momento. Por favor, tente novamente em instantes.'
    });
  }
});

// Alias para compatibilidade
app.post('/api/segunda-via/buscar', (req, res, next) => {
  req.url = '/api/segunda-via/consultar';
  app.handle(req, res, next);
});

app.post('/api/segunda-via/pix', async (req, res) => {
  try {
    const { id_faturamento } = req.body;
    if (!id_faturamento) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_PARAM',
        message: 'O identificador da fatura é obrigatório.'
      });
    }

    const pixData = await obterPixFaturamento(id_faturamento);
    if (!pixData || !pixData.pix_copia_cola) {
      return res.status(404).json({
        status: 'error',
        code: 'PIX_NOT_FOUND',
        message: 'Não foi possível obter o código PIX Copia e Cola para esta fatura no momento.'
      });
    }

    return res.json({
      status: 'success',
      data: pixData
    });
  } catch (error) {
    console.error('[ROUTE ERROR] Erro ao obter PIX:', error.message || error);
    return res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: 'Erro interno ao processar chave PIX.'
    });
  }
});

// -------------------------------------------------------------
// 6.5. PORTAL DO COLABORADOR & USUÁRIOS
// -------------------------------------------------------------

// Login do Portal do Colaborador
app.post('/api/portal/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
    }

    const user = db.prepare('SELECT * FROM portal_users WHERE LOWER(email) = LOWER(?)').get(email.trim());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas. Verifique seu e-mail.' });
    }

    if (user.status === 'bloqueado') {
      return res.status(403).json({ success: false, message: 'Usuário bloqueado. Contate o administrador.' });
    }

    const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password_hash !== hashedInput) {
      return res.status(401).json({ success: false, message: 'Senha incorreta.' });
    }

    const { password_hash, ...safeUser } = user;
    return res.json({
      success: true,
      user: safeUser
    });
  } catch (err) {
    console.error('[PORTAL LOGIN ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Erro interno ao realizar login.' });
  }
});

// Alteração de Senha pelo Próprio Usuário
app.post('/api/portal/change-password', (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Todos os campos de senha são obrigatórios.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'A nova senha deve ter no mínimo 6 caracteres.' });
    }

    const user = db.prepare('SELECT * FROM portal_users WHERE LOWER(email) = LOWER(?)').get(email.trim());
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const hashedCurrent = crypto.createHash('sha256').update(currentPassword).digest('hex');
    if (user.password_hash !== hashedCurrent) {
      return res.status(401).json({ success: false, message: 'Senha atual incorreta.' });
    }

    const hashedNew = crypto.createHash('sha256').update(newPassword).digest('hex');
    db.prepare('UPDATE portal_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(hashedNew, user.id);

    return res.json({ success: true, message: 'Senha atualizada com sucesso!' });
  } catch (err) {
    console.error('[PORTAL CHANGE PASSWORD ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Erro interno ao atualizar senha.' });
  }
});

// CRUD de Usuários (Painel Administrativo)
app.get('/api/portal/users', (req, res) => {
  try {
    const users = db.prepare(`
      SELECT id, name, email, phone, role, user_type, status, created_at, updated_at 
      FROM portal_users 
      ORDER BY name ASC
    `).all();
    return res.json({ success: true, users });
  } catch (err) {
    console.error('[GET PORTAL USERS ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/portal/users', (req, res) => {
  try {
    const { name, email, password, phone, role, user_type, status } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const existing = db.prepare('SELECT id FROM portal_users WHERE LOWER(email) = LOWER(?)').get(email.trim());
    if (existing) {
      return res.status(409).json({ success: false, message: 'Já existe um usuário cadastrado com este e-mail.' });
    }

    const password_hash = crypto.createHash('sha256').update(password).digest('hex');
    const result = db.prepare(`
      INSERT INTO portal_users (name, email, password_hash, phone, role, user_type, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      name.trim(),
      email.trim().toLowerCase(),
      password_hash,
      phone ? phone.trim() : '',
      role ? role.trim() : 'Colaborador',
      user_type === 'admin' ? 'admin' : 'usuario',
      status === 'bloqueado' ? 'bloqueado' : 'ativo'
    );

    return res.json({
      success: true,
      user: {
        id: result.lastInsertRowid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        role: role ? role.trim() : 'Colaborador',
        user_type: user_type === 'admin' ? 'admin' : 'usuario',
        status: status === 'bloqueado' ? 'bloqueado' : 'ativo',
      }
    });
  } catch (err) {
    console.error('[CREATE PORTAL USER ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/portal/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, role, user_type, status } = req.body;

    const user = db.prepare('SELECT * FROM portal_users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const emailConflict = db.prepare('SELECT id FROM portal_users WHERE LOWER(email) = LOWER(?) AND id != ?').get(email.trim(), id);
      if (emailConflict) {
        return res.status(409).json({ success: false, message: 'Este e-mail já está sendo utilizado por outro usuário.' });
      }
    }

    let password_hash = user.password_hash;
    if (password && password.trim().length > 0) {
      password_hash = crypto.createHash('sha256').update(password.trim()).digest('hex');
    }

    db.prepare(`
      UPDATE portal_users 
      SET name = ?, email = ?, password_hash = ?, phone = ?, role = ?, user_type = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name ? name.trim() : user.name,
      email ? email.trim().toLowerCase() : user.email,
      password_hash,
      phone !== undefined ? phone.trim() : user.phone,
      role !== undefined ? role.trim() : user.role,
      user_type !== undefined ? user_type : user.user_type,
      status !== undefined ? status : user.status,
      id
    );

    return res.json({ success: true, message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error('[UPDATE PORTAL USER ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/portal/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = db.prepare('SELECT * FROM portal_users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    // Proteger para não deletar o último admin
    if (user.user_type === 'admin') {
      const adminCount = db.prepare("SELECT COUNT(*) as count FROM portal_users WHERE user_type = 'admin'").get().count;
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, message: 'Não é permitido excluir o único administrador do sistema.' });
      }
    }

    db.prepare('DELETE FROM portal_users WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Usuário removido com sucesso.' });
  } catch (err) {
    console.error('[DELETE PORTAL USER ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Listagem e Leitura dos Manuais em Markdown
app.get('/api/portal/docs', (req, res) => {
  try {
    const docsDir = path.resolve(__dirname, '../docs/manual-produtos');
    if (!fs.existsSync(docsDir)) {
      return res.json({ success: true, docs: [] });
    }

    const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
    const docs = files.map(file => {
      const fullPath = path.join(docsDir, file);
      const stat = fs.statSync(fullPath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Extrair primeiro título Markdown # se houver
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.md$/, '').replace(/-/g, ' ');

      return {
        slug: file.replace(/\.md$/, ''),
        filename: file,
        title,
        size: stat.size,
        updatedAt: stat.mtime
      };
    });

    return res.json({ success: true, docs });
  } catch (err) {
    console.error('[GET PORTAL DOCS ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/portal/docs/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
    const docsDir = path.resolve(__dirname, '../docs/manual-produtos');
    const filePath = path.join(docsDir, `${safeSlug}.md`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Documento não encontrado.' });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : safeSlug.replace(/-/g, ' ');

    return res.json({
      success: true,
      slug: safeSlug,
      filename: `${safeSlug}.md`,
      title,
      content
    });
  } catch (err) {
    console.error('[GET PORTAL DOC CONTENT ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 6.5. ADMIN FILE MANAGER & ONLINE FTP (/uploads)
// -------------------------------------------------------------
function getSafeUploadPath(subPath = '') {
  const cleanSub = path.normalize(String(subPath || '')).replace(/^(\.\.[\/\\])+/, '');
  const parts = cleanSub.split(/[\\/]/).filter(p => p && p !== '..' && p !== '.');
  const resolved = path.resolve(uploadsDir, ...parts);
  if (!resolved.startsWith(uploadsDir)) {
    throw new Error('Acesso negado: tentativa de navegação fora do diretório de uploads.');
  }
  return { resolved, relative: parts.join('/') };
}

function getFolderStats(dir) {
  let totalFiles = 0;
  let totalFolders = 0;
  let totalSize = 0;
  let htmlFiles = 0;
  let pdfFiles = 0;
  let imageFiles = 0;

  function traverse(current) {
    if (!fs.existsSync(current)) return;
    try {
      const entries = fs.readdirSync(current, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(current, entry.name);
        if (entry.isDirectory()) {
          totalFolders++;
          traverse(full);
        } else if (entry.isFile()) {
          totalFiles++;
          try {
            const st = fs.statSync(full);
            totalSize += st.size;
            const ext = path.extname(entry.name).toLowerCase();
            if (ext === '.html' || ext === '.htm') htmlFiles++;
            else if (ext === '.pdf') pdfFiles++;
            else if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.ico'].includes(ext)) imageFiles++;
          } catch (_) {}
        }
      }
    } catch (_) {}
  }

  traverse(dir);
  return { totalFiles, totalFolders, totalSize, htmlFiles, pdfFiles, imageFiles };
}

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const folder = req.query.folder || req.body.folder || '';
      const safe = getSafeUploadPath(folder);
      if (!fs.existsSync(safe.resolved)) {
        fs.mkdirSync(safe.resolved, { recursive: true });
      }
      cb(null, safe.resolved);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const rawName = path.basename(file.originalname, ext);
    const sanitized = rawName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_\-\.]/g, '-')
      .replace(/-+/g, '-');
    cb(null, `${sanitized || 'arquivo'}${ext}`);
  }
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

app.get('/api/admin/files', (req, res) => {
  try {
    const rawFolder = req.query.folder || '';
    const { resolved: currentDir, relative: currentRelative } = getSafeUploadPath(rawFolder);

    if (!fs.existsSync(currentDir)) {
      fs.mkdirSync(currentDir, { recursive: true });
    }

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    const items = [];

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      try {
        const stat = fs.statSync(fullPath);
        const itemRelative = currentRelative ? `${currentRelative}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
          let childCount = 0;
          try {
            childCount = fs.readdirSync(fullPath).length;
          } catch (_) {}

          items.push({
            name: entry.name,
            isDirectory: true,
            relativePath: itemRelative,
            updatedAt: stat.mtime,
            itemsCount: childCount,
          });
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          items.push({
            name: entry.name,
            isDirectory: false,
            relativePath: itemRelative,
            size: stat.size,
            extension: ext,
            updatedAt: stat.mtime,
            publicUrl: `/uploads/${itemRelative}`,
          });
        }
      } catch (err) {
        console.warn(`[WARN] Erro ao inspecionar item ${entry.name}:`, err.message);
      }
    }

    // Ordenação: pastas primeiro, depois arquivos em ordem alfabética
    items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    const breadcrumbParts = currentRelative ? currentRelative.split('/') : [];
    const breadcrumbs = [{ name: 'Raiz (/uploads)', path: '' }];
    let accum = '';
    for (const part of breadcrumbParts) {
      accum = accum ? `${accum}/${part}` : part;
      breadcrumbs.push({ name: part, path: accum });
    }

    const stats = getFolderStats(uploadsDir);

    return res.json({
      success: true,
      currentFolder: currentRelative,
      breadcrumbs,
      items,
      stats,
    });
  } catch (err) {
    console.error('[GET ADMIN FILES ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/files/upload', upload.array('files', 50), (req, res) => {
  try {
    const rawFolder = req.query.folder || req.body.folder || '';
    const { relative: currentRelative } = getSafeUploadPath(rawFolder);

    const uploadedFiles = (req.files || []).map(f => {
      const itemRelative = currentRelative ? `${currentRelative}/${f.filename}` : f.filename;
      return {
        name: f.filename,
        originalName: f.originalname,
        size: f.size,
        relativePath: itemRelative,
        publicUrl: `/uploads/${itemRelative}`,
      };
    });

    return res.json({
      success: true,
      message: `${uploadedFiles.length} arquivo(s) enviado(s) com sucesso.`,
      files: uploadedFiles,
    });
  } catch (err) {
    console.error('[UPLOAD FILES ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/files/create-folder', (req, res) => {
  try {
    const { folder = '', name = '' } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nome da pasta é obrigatório.' });
    }

    const safeFolderName = name.trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_\-\.]/g, '-')
      .replace(/-+/g, '-');

    const parentPath = getSafeUploadPath(folder);
    const targetFolder = path.join(parentPath.resolved, safeFolderName);

    if (fs.existsSync(targetFolder)) {
      return res.status(400).json({ success: false, message: 'Já existe uma pasta ou arquivo com este nome.' });
    }

    fs.mkdirSync(targetFolder, { recursive: true });

    return res.json({
      success: true,
      message: `Pasta "${safeFolderName}" criada com sucesso.`,
      folderName: safeFolderName,
    });
  } catch (err) {
    console.error('[CREATE FOLDER ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/files/save-file', (req, res) => {
  try {
    const { folder = '', filename = '', content = '' } = req.body;
    if (!filename || !filename.trim()) {
      return res.status(400).json({ success: false, message: 'Nome do arquivo é obrigatório.' });
    }

    const ext = path.extname(filename.trim()).toLowerCase();
    const basename = path.basename(filename.trim(), ext)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_\-\.]/g, '-')
      .replace(/-+/g, '-');

    const safeName = `${basename || 'documento'}${ext || '.html'}`;
    const parentPath = getSafeUploadPath(folder);
    const targetFile = path.join(parentPath.resolved, safeName);

    fs.writeFileSync(targetFile, String(content), 'utf-8');

    const itemRelative = parentPath.relative ? `${parentPath.relative}/${safeName}` : safeName;

    return res.json({
      success: true,
      message: `Arquivo "${safeName}" salvo com sucesso.`,
      filename: safeName,
      relativePath: itemRelative,
      publicUrl: `/uploads/${itemRelative}`,
    });
  } catch (err) {
    console.error('[SAVE FILE ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/admin/files/content', (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) {
      return res.status(400).json({ success: false, message: 'Caminho do arquivo não fornecido.' });
    }

    const { resolved: targetFile, relative: currentRelative } = getSafeUploadPath(filePath);

    if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
      return res.status(404).json({ success: false, message: 'Arquivo não encontrado.' });
    }

    const stat = fs.statSync(targetFile);
    if (stat.size > 10 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'Arquivo muito grande para edição inline (máx. 10MB).' });
    }

    const content = fs.readFileSync(targetFile, 'utf-8');
    const ext = path.extname(targetFile).toLowerCase();

    return res.json({
      success: true,
      filename: path.basename(targetFile),
      relativePath: currentRelative,
      publicUrl: `/uploads/${currentRelative}`,
      extension: ext,
      size: stat.size,
      content,
    });
  } catch (err) {
    console.error('[GET FILE CONTENT ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/admin/files/rename', (req, res) => {
  try {
    const { oldPath = '', newName = '' } = req.body;
    if (!oldPath || !newName || !newName.trim()) {
      return res.status(400).json({ success: false, message: 'Parâmetros inválidos.' });
    }

    const { resolved: sourcePath } = getSafeUploadPath(oldPath);
    if (!fs.existsSync(sourcePath)) {
      return res.status(404).json({ success: false, message: 'Item de origem não encontrado.' });
    }

    const isDir = fs.statSync(sourcePath).isDirectory();
    let safeNewName = '';

    if (isDir) {
      safeNewName = newName.trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_\-\.]/g, '-')
        .replace(/-+/g, '-');
    } else {
      const ext = path.extname(newName.trim()).toLowerCase() || path.extname(sourcePath).toLowerCase();
      const base = path.basename(newName.trim(), path.extname(newName.trim()))
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_\-\.]/g, '-')
        .replace(/-+/g, '-');
      safeNewName = `${base}${ext}`;
    }

    const targetDir = path.dirname(sourcePath);
    const destPath = path.join(targetDir, safeNewName);

    if (fs.existsSync(destPath)) {
      return res.status(400).json({ success: false, message: 'Já existe um item com esse novo nome.' });
    }

    fs.renameSync(sourcePath, destPath);

    return res.json({
      success: true,
      message: `Renomeado para "${safeNewName}" com sucesso.`,
      newName: safeNewName,
    });
  } catch (err) {
    console.error('[RENAME ITEM ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/admin/files', (req, res) => {
  try {
    const targetPath = req.query.path || req.body.path;
    if (!targetPath) {
      return res.status(400).json({ success: false, message: 'Caminho do item não fornecido.' });
    }

    const { resolved: targetResolved, relative: currentRelative } = getSafeUploadPath(targetPath);

    if (targetResolved === uploadsDir) {
      return res.status(400).json({ success: false, message: 'A pasta raiz de uploads não pode ser excluída.' });
    }

    if (!fs.existsSync(targetResolved)) {
      return res.status(404).json({ success: false, message: 'Item não encontrado.' });
    }

    const stat = fs.statSync(targetResolved);
    if (stat.isDirectory()) {
      fs.rmSync(targetResolved, { recursive: true, force: true });
    } else {
      fs.unlinkSync(targetResolved);
    }

    return res.json({
      success: true,
      message: `"${path.basename(targetResolved)}" excluído com sucesso.`,
      deletedPath: currentRelative,
    });
  } catch (err) {
    console.error('[DELETE FILE ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 6.2 PORTAL DO COLABORADOR - REPOSITÓRIO READ-ONLY & CONTATOS
// -------------------------------------------------------------

// Contatos Corporativos Padrão
const DEFAULT_PORTAL_CONTACTS = [
  {
    id: 1,
    name: 'NOC / Central de Operações de Rede',
    department: 'Engenharia & Suporte N2',
    role: 'Plantão Técnico 24x7',
    extension: '2001',
    phone: '(11) 4741-9000',
    whatsapp: '11947419000',
    email: 'noc@nuvv.com.br',
    notes: 'Escalonamento de incidentes de fibra, quedas de POP e monitoramento Zabbix/ACS.',
    isEmergency: true,
  },
  {
    id: 2,
    name: 'Suporte N1 & Atendimento ao Cliente',
    department: 'Suporte ao Cliente',
    role: 'Supervisão de Help Desk',
    extension: '2010',
    phone: '(11) 4741-9001',
    whatsapp: '11947419001',
    email: 'suporte@nuvv.com.br',
    notes: 'Atendimento aos assinantes: Seg a Sáb 08h às 22h, Dom/Feriados 08h às 18h.',
    isEmergency: false,
  },
  {
    id: 3,
    name: 'Equipe de Campo & Fusão de Fibra',
    department: 'Operações de Rede',
    role: 'Supervisão Técnica Externa',
    extension: '2020',
    phone: '(11) 4741-9005',
    whatsapp: '11947419005',
    email: 'operacoes@nuvv.com.br',
    notes: 'Ativações residenciais/corporativas, caixas de emenda CTO/CEO e vistorias.',
    isEmergency: true,
  },
  {
    id: 4,
    name: 'Comercial & Vendas B2B/B2C',
    department: 'Comercial',
    role: 'Gerência Comercial',
    extension: '2030',
    phone: '(11) 4741-9010',
    whatsapp: '11947419010',
    email: 'comercial@nuvv.com.br',
    notes: 'Planos corporativos, links dedicados, combos de telefonia e parcerias.',
    isEmergency: false,
  },
  {
    id: 5,
    name: 'Financeiro & Faturamento HubSoft',
    department: 'Financeiro',
    role: 'Contas a Receber / Faturamento',
    extension: '2040',
    phone: '(11) 4741-9020',
    whatsapp: '11947419020',
    email: 'financeiro@nuvv.com.br',
    notes: 'Baixas manuais, cobrança, renegociação, emissão de NF e suporte financeiro.',
    isEmergency: false,
  },
  {
    id: 6,
    name: 'Recursos Humanos & D.P.',
    department: 'Administração & RH',
    role: 'Atendimento ao Colaborador',
    extension: '2050',
    phone: '(11) 4741-9030',
    whatsapp: '11947419030',
    email: 'rh@nuvv.com.br',
    notes: 'Holerites, ponto, benefícios, atestados e comunicados institucionais.',
    isEmergency: false,
  },
];

// Função de segurança para navegação estritamente restrita à pasta /colaborador
function getSafeCollaboratorPath(subPath = '') {
  const collaboratorBase = path.resolve(uploadsDir, 'colaborador');
  if (!fs.existsSync(collaboratorBase)) {
    fs.mkdirSync(collaboratorBase, { recursive: true });
  }

  const cleanSub = path.normalize(String(subPath || '')).replace(/^(\.\.[\/\\])+/, '');
  const parts = cleanSub.split(/[\\/]/).filter(p => p && p !== '..' && p !== '.');
  const resolved = path.resolve(collaboratorBase, ...parts);
  if (!resolved.startsWith(collaboratorBase)) {
    return { resolved: collaboratorBase, relative: '' };
  }
  const relative = path.relative(collaboratorBase, resolved).replace(/\\/g, '/');
  return { resolved, relative };
}

// Função para obter as abas/categorias do colaborador (customizadas ou auto-detectadas das pastas)
function getCollaboratorCategories() {
  const saved = getSetting('portal_file_tabs');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (_) {}
  }

  // Auto-descoberta dinâmica de todas as pastas existentes em data/uploads/colaborador
  const collaboratorBase = path.resolve(uploadsDir, 'colaborador');
  const tabs = [{ name: 'Todos os Arquivos', path: '' }];
  if (!fs.existsSync(collaboratorBase)) return tabs;

  function scan(dir, rel = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const subRel = rel ? `${rel}/${entry.name}` : entry.name;
          const parts = subRel.split('/');
          const label = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/[-_]/g, ' ')).join(' > ');
          tabs.push({ name: label, path: subRel });
          if (parts.length < 2) {
            scan(path.join(dir, entry.name), subRel);
          }
        }
      }
    } catch (_) {}
  }
  scan(collaboratorBase, '');
  return tabs;
}

function getAllCollaboratorFolderPaths() {
  const collaboratorBase = path.resolve(uploadsDir, 'colaborador');
  const list = [''];
  if (!fs.existsSync(collaboratorBase)) return list;

  function scan(dir, rel = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const subRel = rel ? `${rel}/${entry.name}` : entry.name;
          list.push(subRel);
          scan(path.join(dir, entry.name), subRel);
        }
      }
    } catch (_) {}
  }
  scan(collaboratorBase, '');
  return list;
}

// Listagem de Arquivos para o Colaborador (SOMENTE LEITURA / DOWNLOAD - ESCOPO EXCLUSIVO: /colaborador)
app.get('/api/portal/files', (req, res) => {
  try {
    const rawFolder = req.query.folder || '';
    const searchQuery = (req.query.search || '').trim().toLowerCase();
    const { resolved: targetDir, relative: currentRelative } = getSafeCollaboratorPath(rawFolder);
    const collaboratorBase = path.resolve(uploadsDir, 'colaborador');
    const categories = getCollaboratorCategories();

    if (!fs.existsSync(targetDir)) {
      return res.json({
        success: true,
        currentFolder: currentRelative,
        breadcrumbs: [{ name: 'Início', path: '' }],
        items: [],
        categories,
      });
    }

    // Busca recursiva global EXCLUSIVAMENTE DENTRO de /uploads/colaborador
    if (searchQuery) {
      const results = [];
      const searchRecursive = (dir, rel) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const itemRelative = rel ? `${rel}/${entry.name}` : entry.name;
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            searchRecursive(fullPath, itemRelative);
          } else {
            if (entry.name.toLowerCase().includes(searchQuery) || itemRelative.toLowerCase().includes(searchQuery)) {
              try {
                const stat = fs.statSync(fullPath);
                results.push({
                  name: entry.name,
                  relativePath: itemRelative,
                  publicUrl: `/uploads/colaborador/${itemRelative}`,
                  isDirectory: false,
                  size: stat.size,
                  updatedAt: stat.mtime.toISOString(),
                  extension: path.extname(entry.name).toLowerCase(),
                });
              } catch {
                // ignore
              }
            }
          }
        }
      };

      searchRecursive(collaboratorBase, '');

      return res.json({
        success: true,
        currentFolder: currentRelative,
        search: searchQuery,
        items: results,
        categories,
      });
    }

    // Listagem da pasta solicitada (dentro do escopo /colaborador)
    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    const items = [];

    for (const entry of entries) {
      const fullPath = path.join(targetDir, entry.name);
      try {
        const stat = fs.statSync(fullPath);
        const itemRelative = currentRelative ? `${currentRelative}/${entry.name}` : entry.name;
        items.push({
          name: entry.name,
          relativePath: itemRelative,
          publicUrl: entry.isDirectory() ? null : `/uploads/colaborador/${itemRelative}`,
          isDirectory: entry.isDirectory(),
          size: entry.isDirectory() ? 0 : stat.size,
          updatedAt: stat.mtime.toISOString(),
          extension: entry.isDirectory() ? '' : path.extname(entry.name).toLowerCase(),
        });
      } catch (err) {
        console.warn(`Could not stat ${fullPath}:`, err.message);
      }
    }

    // Ordenação: pastas primeiro, depois arquivos por ordem alfabética
    items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Construção de Breadcrumbs relativos à raiz /colaborador
    const breadcrumbParts = currentRelative ? currentRelative.split('/') : [];
    const breadcrumbs = [{ name: 'Início', path: '' }];
    let accum = '';
    for (const part of breadcrumbParts) {
      accum = accum ? `${accum}/${part}` : part;
      breadcrumbs.push({ name: part, path: accum });
    }

    return res.json({
      success: true,
      currentFolder: currentRelative,
      breadcrumbs,
      items,
      categories,
    });
  } catch (err) {
    console.error('[GET PORTAL FILES ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Obter Abas/Categorias do Colaborador (Público/Portal)
app.get('/api/portal/file-categories', (req, res) => {
  try {
    return res.json({
      success: true,
      categories: getCollaboratorCategories(),
    });
  } catch (err) {
    console.error('[GET PORTAL CATEGORIES ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Obter Abas/Categorias e Pastas Disponíveis (Admin)
app.get('/api/admin/file-categories', (req, res) => {
  try {
    const isCustom = Boolean(getSetting('portal_file_tabs'));
    return res.json({
      success: true,
      categories: getCollaboratorCategories(),
      availableFolders: getAllCollaboratorFolderPaths(),
      isCustom,
    });
  } catch (err) {
    console.error('[GET ADMIN CATEGORIES ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Salvar / Definir Abas/Categorias do Colaborador (Admin)
app.post('/api/admin/file-categories', (req, res) => {
  try {
    const { categories } = req.body;
    if (categories === null || (Array.isArray(categories) && categories.length === 0)) {
      // Resetar para auto-detecção
      setSetting('portal_file_tabs', '');
      return res.json({
        success: true,
        message: 'Abas resetadas para detecção automática das pastas de /colaborador.',
        categories: getCollaboratorCategories(),
      });
    }

    if (!Array.isArray(categories)) {
      return res.status(400).json({ success: false, message: 'Formato inválido para abas.' });
    }

    // Normalizar itens
    const valid = categories
      .filter(c => c && c.name && typeof c.name === 'string')
      .map(c => ({
        name: c.name.trim(),
        path: String(c.path || '').trim().replace(/^\/+/, '').replace(/\/+$/, ''),
      }));

    setSetting('portal_file_tabs', JSON.stringify(valid));
    return res.json({
      success: true,
      message: 'Abas do Portal do Colaborador atualizadas com sucesso!',
      categories: valid,
    });
  } catch (err) {
    console.error('[SAVE ADMIN CATEGORIES ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Contatos Corporativos - Obter lista (Público / Colaborador)
app.get('/api/portal/contacts', (req, res) => {
  try {
    const saved = getSetting('portal_contacts');
    if (saved) {
      const parsed = JSON.parse(saved);
      return res.json({ success: true, contacts: parsed });
    }
    return res.json({ success: true, contacts: DEFAULT_PORTAL_CONTACTS });
  } catch (err) {
    console.error('[GET PORTAL CONTACTS ERROR]:', err);
    return res.json({ success: true, contacts: DEFAULT_PORTAL_CONTACTS });
  }
});

// Contatos Corporativos - Obter lista (Admin)
app.get('/api/admin/contacts', (req, res) => {
  try {
    const saved = getSetting('portal_contacts');
    if (saved) {
      const parsed = JSON.parse(saved);
      return res.json({ success: true, contacts: parsed });
    }
    return res.json({ success: true, contacts: DEFAULT_PORTAL_CONTACTS });
  } catch (err) {
    console.error('[GET ADMIN CONTACTS ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Contatos Corporativos - Salvar / Atualizar lista (Admin)
app.post('/api/admin/contacts', (req, res) => {
  try {
    const { contacts } = req.body;
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ success: false, message: 'A lista de contatos deve ser um array válido.' });
    }

    setSetting('portal_contacts', JSON.stringify(contacts));
    return res.json({ success: true, message: 'Lista de contatos corporativos atualizada com sucesso!' });
  } catch (err) {
    console.error('[SAVE ADMIN CONTACTS ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 7. SERVING PRODUCTION FRONTEND (DIST) & SPA FALLBACK
// -------------------------------------------------------------
const distPath = path.resolve(__dirname, '../dist');


if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA fallback for non-API routes (Express 5 compatible)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Endpoint não encontrado' });
    }
    if (req.method === 'GET' || req.method === 'HEAD') {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Nuvv Backend API Server running on port ${PORT} (http://localhost:${PORT})`);
});
