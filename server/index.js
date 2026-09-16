import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
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

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize DB schema on startup
initDatabase();

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
    const { session_id, path, title, referrer, city, device } = req.body;
    const userAgent = req.headers['user-agent'] || '';

    // Extract device if not provided
    const isMobile = /mobile|iphone|ipod|android/i.test(userAgent);
    const resolvedDevice = device || (isMobile ? 'mobile' : 'desktop');

    db.prepare(`
      INSERT INTO page_views (session_id, path, title, referrer, city, device, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      session_id || 'anonymous',
      path || '/',
      title || 'Nuvv',
      referrer || '',
      city || 'Suzano',
      resolvedDevice,
      userAgent.slice(0, 150)
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 3. ADMIN ANALYTICS METRICS
// -------------------------------------------------------------
app.get('/api/admin/metrics', (req, res) => {
  try {
    // Total & Today's Pageviews
    const totalPageviews = db.prepare('SELECT COUNT(*) as count FROM page_views').get().count;
    const todayPageviews = db.prepare("SELECT COUNT(*) as count FROM page_views WHERE date(created_at) = date('now')").get().count;
    
    // Total Unique Visitors (by session)
    const uniqueVisitors = db.prepare('SELECT COUNT(DISTINCT session_id) as count FROM page_views').get().count;
    const todayUniqueVisitors = db.prepare("SELECT COUNT(DISTINCT session_id) as count FROM page_views WHERE date(created_at) = date('now')").get().count;

    // Top Pages
    const topPages = db.prepare(`
      SELECT path, COUNT(*) as views
      FROM page_views
      GROUP BY path
      ORDER BY views DESC
      LIMIT 8
    `).all();

    // Device breakdown
    const devices = db.prepare(`
      SELECT device, COUNT(*) as count
      FROM page_views
      GROUP BY device
    `).all();

    // Top Cities
    const topCities = db.prepare(`
      SELECT city, COUNT(*) as count
      FROM page_views
      WHERE city IS NOT NULL AND city != ''
      GROUP BY city
      ORDER BY count DESC
      LIMIT 6
    `).all();

    // 7 Days Daily Pageviews Trend
    const last7Days = db.prepare(`
      SELECT date(created_at) as date, COUNT(*) as views
      FROM page_views
      WHERE created_at >= date('now', '-7 days')
      GROUP BY date(created_at)
      ORDER BY date ASC
    `).all();

    // Counters
    const totalViability = db.prepare('SELECT COUNT(*) as count FROM viability_queries').get().count;
    const totalSubscribers = db.prepare("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'active'").get().count;
    const totalLeads = db.prepare('SELECT COUNT(*) as count FROM commercial_leads').get().count;

    res.json({
      success: true,
      data: {
        kpis: {
          totalPageviews,
          todayPageviews,
          uniqueVisitors,
          todayUniqueVisitors,
          totalViability,
          totalSubscribers,
          totalLeads,
        },
        topPages,
        devices,
        topCities,
        last7Days,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// 4. VIABILITY CONSULTATIONS & DEMAND HEATMAP
// -------------------------------------------------------------
app.get('/api/admin/viability', (req, res) => {
  try {
    const { status, city, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM viability_queries WHERE 1=1';
    const params = [];

    if (status === 'yes') {
      query += ' AND has_feasibility = 1';
    } else if (status === 'no') {
      query += ' AND has_feasibility = 0';
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
    const withFeasibility = db.prepare('SELECT COUNT(*) as count FROM viability_queries WHERE has_feasibility = 1').get().count;
    const withoutFeasibility = db.prepare('SELECT COUNT(*) as count FROM viability_queries WHERE has_feasibility = 0').get().count;

    // Top Unmet Neighborhoods (Demanda Reprimida)
    const unmetNeighborhoods = db.prepare(`
      SELECT neighborhood, city, COUNT(*) as demand_count
      FROM viability_queries
      WHERE has_feasibility = 0 AND neighborhood IS NOT NULL AND neighborhood != ''
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

app.post('/api/viability/log', async (req, res) => {
  try {
    const {
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
      notes,
    } = req.body;

    const info = db.prepare(`
      INSERT INTO viability_queries (
        name, phone, email, cep, street, number, neighborhood, city, state,
        service_type, has_feasibility, plan_interested, notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
// 7.1 COVERAGE & GEOGRAPHIC FEASIBILITY LAYERS MANAGEMENT
// -------------------------------------------------------------
app.get('/api/coverage/layers', (req, res) => {
  try {
    const row = db.prepare('SELECT value, updated_at FROM settings WHERE key = ?').get('coverage_layers');
    if (row && row.value) {
      return res.json({
        success: true,
        custom: true,
        updatedAt: row.updated_at,
        data: JSON.parse(row.value),
      });
    }
    res.json({
      success: true,
      custom: false,
      data: null,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/coverage/layers', (req, res) => {
  try {
    const { layers } = req.body;
    if (!layers || typeof layers !== 'object') {
      return res.status(400).json({ success: false, error: 'Camadas de cobertura inválidas.' });
    }

    const payload = JSON.stringify(layers);
    db.prepare(`
      INSERT INTO settings (key, value, updated_at)
      VALUES ('coverage_layers', ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `).run(payload);

    res.json({
      success: true,
      message: 'Camadas e zonas de cobertura salvas com sucesso no banco de dados!',
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/coverage/reset', (req, res) => {
  try {
    db.prepare('DELETE FROM settings WHERE key = ?').run('coverage_layers');
    res.json({
      success: true,
      message: 'Camadas de cobertura restauradas para os padrões do sistema.',
    });
  } catch (err) {
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
      let csv = 'ID,Data,Nome,Telefone,Email,CEP,Endereco,Numero,Bairro,Cidade,Estado,Servico,Viabilidade,Plano\n';
      rows.forEach(r => {
        csv += `"${r.id}","${r.created_at}","${r.name || ''}","${r.phone || ''}","${r.email || ''}","${r.cep}","${r.street || ''}","${r.number || ''}","${r.neighborhood || ''}","${r.city || ''}","${r.state || ''}","${r.service_type || ''}","${r.has_feasibility ? 'SIM' : 'NAO'}","${r.plan_interested || ''}"\n`;
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
// 7. SERVING PRODUCTION FRONTEND (DIST) & SPA FALLBACK
// -------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA fallback for non-API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Nuvv Backend API Server running on port ${PORT} (http://localhost:${PORT})`);
});
