import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  MapPin,
  Mail,
  Send,
  Database,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Lock,
  LogOut,
  Smartphone,
  Monitor,
  Eye,
  AlertTriangle,
  FileSpreadsheet,
  ChevronRight,
  Globe,
  Layers,
  BookOpen,
} from 'lucide-react';
import { apiService, AdminMetricsResponse } from '../services/apiService';
import { BLOG_POSTS } from '../data/blog';
import { CoverageManager } from '../components/admin/CoverageManager';
import { BlogManager } from '../components/admin/BlogManager';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nuvv_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'analytics' | 'viability' | 'blog' | 'newsletter' | 'leads' | 'smtp'>('analytics');
  const [viabilityViewMode, setViabilityViewMode] = useState<'manager' | 'queries'>('manager');
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState<AdminMetricsResponse | null>(null);
  const [viabilityData, setViabilityData] = useState<any>(null);
  const [newsletterData, setNewsletterData] = useState<any>(null);
  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [healthStatus, setHealthStatus] = useState<any>(null);

  // Viability Filters
  const [viabilityFilter, setViabilityFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [viabilitySearch, setViabilitySearch] = useState('');

  // Newsletter Broadcast Composer
  const [selectedPostId, setSelectedPostId] = useState<string>(String(BLOG_POSTS[0]?.id || ''));
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<any>(null);

  // SMTP Settings & Test
  const [smtpConfig, setSmtpConfig] = useState({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: '',
    pass: '',
    from: '"Nuvv Telecom" <notificacoes@nuvv.com.br>',
    adminEmail: 'contato@nuvv.com.br',
  });
  const [testEmailTarget, setTestEmailTarget] = useState('');
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [testEmailFeedback, setTestEmailFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [smtpSaveSuccess, setSmtpSaveSuccess] = useState(false);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'nuvv2026' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nuvv_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nuvv_admin_auth');
  };

  // Load all dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [healthRes, metricsRes, viabilityRes, newsRes, leadsRes, smtpRes] = await Promise.allSettled([
        apiService.getHealth(),
        apiService.getMetrics(),
        apiService.getViability({ status: viabilityFilter === 'all' ? undefined : viabilityFilter }),
        apiService.getNewsletter(),
        apiService.getLeads(),
        apiService.getSmtpConfig(),
      ]);

      if (healthRes.status === 'fulfilled') setHealthStatus(healthRes.value);
      if (metricsRes.status === 'fulfilled' && metricsRes.value.success) setMetrics(metricsRes.value.data);
      if (viabilityRes.status === 'fulfilled' && viabilityRes.value.success) setViabilityData(viabilityRes.value.data);
      if (newsRes.status === 'fulfilled' && newsRes.value.success) setNewsletterData(newsRes.value.data);
      if (leadsRes.status === 'fulfilled' && leadsRes.value.success) setLeadsData(leadsRes.value.data);
      if (smtpRes.status === 'fulfilled' && smtpRes.value.success) {
        setSmtpConfig((prev) => ({ ...prev, ...smtpRes.value.data }));
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, viabilityFilter]);

  // Broadcast blog post to subscribers
  const handleBroadcast = async () => {
    const post = BLOG_POSTS.find((p) => String(p.id) === String(selectedPostId));
    if (!post) return;

    setBroadcastLoading(true);
    setBroadcastResult(null);
    try {
      const res = await apiService.broadcastBlogPost({
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        slug: post.slug,
      });
      setBroadcastResult(res);
      apiService.getNewsletter().then((d) => setNewsletterData(d.data));
    } catch (err: any) {
      setBroadcastResult({ success: false, error: err.message });
    } finally {
      setBroadcastLoading(false);
    }
  };

  // Save SMTP settings
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.saveSmtpConfig(smtpConfig);
      setSmtpSaveSuccess(true);
      setTimeout(() => setSmtpSaveSuccess(false), 3000);
    } catch (err) {
      alert('Erro ao salvar SMTP');
    }
  };

  // Test SMTP connection
  const handleTestSmtp = async () => {
    if (!testEmailTarget) return;
    setTestEmailLoading(true);
    setTestEmailFeedback(null);
    try {
      const res = await apiService.testSmtp(testEmailTarget);
      setTestEmailFeedback({
        success: res.success,
        message: res.message || res.error || 'Teste realizado',
      });
    } catch (err: any) {
      setTestEmailFeedback({ success: false, message: err.message || 'Erro de conexão SMTP' });
    } finally {
      setTestEmailLoading(false);
    }
  };

  // Render Gate Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Nuvv Intelligence Hub</h2>
            <p className="text-xs text-gray-400">
              Acesso restrito para monitoramento de métricas, viabilidade e automações SMTP.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                Chave de Acesso Admin
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Digite a senha (padrão: nuvv2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              {pinError && (
                <span className="text-xs text-red-400 font-bold block mt-1">
                  Chave incorreta. Tente 'nuvv2026'.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Viability Queries
  const filteredViability = viabilityData?.queries?.filter((q: any) => {
    if (!viabilitySearch.trim()) return true;
    const s = viabilitySearch.toLowerCase();
    return (
      q.cep?.toLowerCase().includes(s) ||
      q.street?.toLowerCase().includes(s) ||
      q.neighborhood?.toLowerCase().includes(s) ||
      q.city?.toLowerCase().includes(s) ||
      q.name?.toLowerCase().includes(s)
    );
  }) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-sm">
              NV
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-base text-white tracking-tight">Nuvv Intelligence Hub</h1>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  SQLite Local WAL
                </span>
              </div>
              <span className="text-[11px] text-gray-400">Monitoramento & Gestão em Tempo Real</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Items */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto py-2 border-t border-slate-800/60 text-xs font-bold custom-scrollbar">
          {[
            { id: 'analytics', label: 'Visão Geral & Analytics', icon: BarChart3 },
            { id: 'viability', label: 'Mapa & Viabilidade', icon: MapPin, badge: metrics?.kpis?.totalViability },
            { id: 'blog', label: 'Blog & Artigos', icon: BookOpen },
            { id: 'newsletter', label: 'Nuvv News & Disparador', icon: Mail, badge: metrics?.kpis?.totalSubscribers },
            { id: 'leads', label: 'Leads Comerciais', icon: Users, badge: metrics?.kpis?.totalLeads },
            { id: 'smtp', label: 'Configurações SMTP', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-slate-950 text-emerald-300' : 'bg-slate-800 text-gray-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: VISÃO GERAL & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Pageviews Hoje</span>
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.todayPageviews || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Total acumulado: <strong>{metrics?.kpis?.totalPageviews || 0}</strong>
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Visitantes Únicos</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.todayUniqueVisitors || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Total de sessões: <strong>{metrics?.kpis?.uniqueVisitors || 0}</strong>
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Consultas de Viabilidade</span>
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  {metrics?.kpis?.totalViability || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">Endereços mapeados na base</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Assinantes Nuvv News</span>
                  <Mail className="w-4 h-4 text-nuvv-purple" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.totalSubscribers || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Leads comerciais: <strong>{metrics?.kpis?.totalLeads || 0}</strong>
                </span>
              </div>
            </div>

            {/* Middle Grid: Top Pages & 7-Day Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Top Visited Pages */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Páginas Mais Acessadas</span>
                  </h3>
                  <span className="text-[11px] text-gray-400">Ranking por visualizações</span>
                </div>

                <div className="space-y-3">
                  {metrics?.topPages && metrics.topPages.length > 0 ? (
                    metrics.topPages.map((page, idx) => {
                      const maxViews = metrics.topPages[0]?.views || 1;
                      const pct = Math.round((page.views / maxViews) * 100);
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-gray-300 truncate max-w-[280px]">
                              {page.path}
                            </span>
                            <span className="font-bold text-emerald-400">{page.views} views</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-xs text-gray-500">
                      Navegue pelo site para registrar os primeiros pageviews.
                    </div>
                  )}
                </div>
              </div>

              {/* City Distribution & Devices */}
              <div className="lg:col-span-5 space-y-6">
                {/* Cities */}
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Cidades com Maior Audiência</span>
                  </h3>
                  <div className="space-y-2">
                    {metrics?.topCities?.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1">
                        <span className="text-gray-300">{c.city}</span>
                        <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                          {c.count} acessos
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Devices */}
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                    <Monitor className="w-4 h-4 text-amber-400" />
                    <span>Dispositivos</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {metrics?.devices?.map((d, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                        <span className="text-xs uppercase font-bold text-gray-400 block">{d.device}</span>
                        <span className="text-xl font-black text-white">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MAPA DE VIABILIDADE & GESTÃO DE COBERTURA */}
        {activeTab === 'viability' && (
          <div className="space-y-8 animate-fade-in">
            {/* Sub-view Switcher Bar */}
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded-2xl">
              <div className="flex space-x-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setViabilityViewMode('manager')}
                  className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
                    viabilityViewMode === 'manager'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Gestão de Zonas, KMZ & Velocidades</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViabilityViewMode('queries')}
                  className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
                    viabilityViewMode === 'queries'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Histórico de Consultas & Demanda Reprimida ({viabilityData?.stats?.total || 0})</span>
                </button>
              </div>

              <span className="text-[11px] text-gray-400 hidden sm:inline mr-2">
                {viabilityViewMode === 'manager' ? 'Configuração de Polígonos de Fibra' : 'Leads Georreferenciados'}
              </span>
            </div>

            {/* View 1: Complete Coverage & KMZ Manager */}
            {viabilityViewMode === 'manager' && <CoverageManager />}

            {/* View 2: Client Queries History & Demand */}
            {viabilityViewMode === 'queries' && (
              <div className="space-y-8 animate-fade-in">
                {/* Header & Demanda Reprimida Alert Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-base font-black text-white">Consultas de Cobertura</h3>
                        <span className="text-xs text-gray-400">
                          Mapeamento de viabilidade georreferenciada via CEP
                        </span>
                      </div>
                      <a
                        href="/api/admin/export/viability"
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors self-start"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar CSV</span>
                      </a>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Buscar por CEP, bairro, rua ou nome..."
                          value={viabilitySearch}
                          onChange={(e) => setViabilitySearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setViabilityFilter('all')}
                          className={`px-3 py-1.5 rounded-lg ${viabilityFilter === 'all' ? 'bg-slate-800 text-white' : 'text-gray-400'}`}
                        >
                          Todos ({viabilityData?.stats?.total || 0})
                        </button>
                        <button
                          type="button"
                          onClick={() => setViabilityFilter('yes')}
                          className={`px-3 py-1.5 rounded-lg text-emerald-400 ${viabilityFilter === 'yes' ? 'bg-emerald-950 border border-emerald-500/30' : ''}`}
                        >
                          Com Cobertura ({viabilityData?.stats?.withFeasibility || 0})
                        </button>
                        <button
                          type="button"
                          onClick={() => setViabilityFilter('no')}
                          className={`px-3 py-1.5 rounded-lg text-red-400 ${viabilityFilter === 'no' ? 'bg-red-950 border border-red-500/30' : ''}`}
                        >
                          Sem Cobertura ({viabilityData?.stats?.withoutFeasibility || 0})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Demanda Reprimida (Bairros Sem Cobertura mais buscados) */}
                  <div className="lg:col-span-4 p-6 rounded-3xl bg-red-950/20 border border-red-900/40 space-y-3">
                    <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Demanda Reprimida (Expansão)</span>
                    </div>
                    <h4 className="text-sm font-black text-white">Bairros com Mais Buscas Sem Cobertura</h4>
                    <div className="space-y-1.5">
                      {viabilityData?.unmetNeighborhoods?.length > 0 ? (
                        viabilityData.unmetNeighborhoods.map((n: any, i: number) => (
                          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-red-900/20">
                            <span className="text-gray-300">
                              {n.neighborhood}, {n.city}
                            </span>
                            <span className="font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded">
                              {n.demand_count} pedidos
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-500 py-2">Nenhuma busca sem cobertura registrada ainda.</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Viability Queries Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="py-3.5 px-4 font-bold">Data</th>
                          <th className="py-3.5 px-4 font-bold">Status</th>
                          <th className="py-3.5 px-4 font-bold">CEP / Endereço</th>
                          <th className="py-3.5 px-4 font-bold">Bairro / Cidade</th>
                          <th className="py-3.5 px-4 font-bold">Contato</th>
                          <th className="py-3.5 px-4 font-bold">Serviço</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredViability.length > 0 ? (
                          filteredViability.map((row: any) => (
                            <tr key={row.id} className="hover:bg-slate-850/50 transition-colors">
                              <td className="py-3 px-4 text-gray-400 font-mono">
                                {new Date(row.created_at).toLocaleString('pt-BR')}
                              </td>
                              <td className="py-3 px-4">
                                {row.has_feasibility ? (
                                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Com Viabilidade</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-500/30 text-[10px] font-bold">
                                    <XCircle className="w-3 h-3" />
                                    <span>Sem Cobertura</span>
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <strong className="text-white font-mono">{row.cep}</strong>
                                <span className="text-gray-400 block text-[11px]">
                                  {row.street} {row.number ? `, nº ${row.number}` : ''}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-gray-300">
                                <strong>{row.neighborhood || '—'}</strong>, {row.city || 'Suzano'}
                              </td>
                              <td className="py-3 px-4">
                                {row.name && <span className="font-bold text-white block">{row.name}</span>}
                                {row.phone && <span className="text-emerald-400 block">{row.phone}</span>}
                                {row.email && <span className="text-gray-400 block">{row.email}</span>}
                                {!row.name && !row.phone && !row.email && (
                                  <span className="text-gray-500">Consulta anônima</span>
                                )}
                              </td>
                              <td className="py-3 px-4 uppercase text-[10px] font-bold text-gray-400">
                                {row.service_type || 'Residencial'}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center py-8 text-gray-500">
                              Nenhuma consulta de viabilidade encontrada com os filtros selecionados.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GESTOR DE CONTEÚDO & ARTIGOS DO BLOG */}
        {activeTab === 'blog' && (
          <div className="animate-fade-in">
            <BlogManager />
          </div>
        )}

        {/* TAB 4: NUVV NEWS & DISPARADOR DE NOTIFICAÇÕES */}
        {activeTab === 'newsletter' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Row: Broadcast Composer & Subscribers Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Broadcast Tool */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-black text-white">Disparador de Notificações (Nuvv News)</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Selecione o Artigo do Blog para Disparar
                    </label>
                    <select
                      value={selectedPostId}
                      onChange={(e) => setSelectedPostId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    >
                      {BLOG_POSTS.map((post) => (
                        <option key={post.id} value={post.id}>
                          [{post.category}] {post.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preview of selected post */}
                  {(() => {
                    const post = BLOG_POSTS.find((p) => String(p.id) === String(selectedPostId));
                    if (!post) return null;
                    return (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                          Prévia do E-mail
                        </span>
                        <h4 className="font-bold text-white">{post.title}</h4>
                        <p className="text-gray-400">{post.excerpt}</p>
                      </div>
                    );
                  })()}

                  <button
                    type="button"
                    onClick={handleBroadcast}
                    disabled={broadcastLoading}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {broadcastLoading
                        ? 'Enviando para assinantes...'
                        : `Disparar para todos os ${newsletterData?.totalActive || 0} assinantes ativos`}
                    </span>
                  </button>

                  {broadcastResult && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold ${
                        broadcastResult.success
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-950/60 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {broadcastResult.success
                        ? `🎉 Notificação disparada com sucesso para ${broadcastResult.result?.sentCount || 0} assinantes!`
                        : `Erro no disparo: ${broadcastResult.error}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Subscribers Summary */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-black text-white">Base de Assinantes</h3>
                    <a
                      href="/api/admin/export/newsletter"
                      className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Exportar CSV</span>
                    </a>
                  </div>
                  <div className="text-4xl font-black text-emerald-400">
                    {newsletterData?.totalActive || 0}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Usuários cadastrados no rodapé, box de newsletter do blog e popups interessados em receber atualizações da Nuvv.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-gray-400 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Novos inscritos recebem e-mail de boas-vindas automático via SMTP.
                  </span>
                </div>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Lista de E-mails Inscritos
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">E-mail</th>
                      <th className="py-3 px-4 font-bold">Origem</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold">Data Inscrição</th>
                      <th className="py-3 px-4 font-bold">Última Notificação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {newsletterData?.subscribers && newsletterData.subscribers.length > 0 ? (
                      newsletterData.subscribers.map((sub: any) => (
                        <tr key={sub.id} className="hover:bg-slate-850/50">
                          <td className="py-3 px-4 font-bold text-white">{sub.email}</td>
                          <td className="py-3 px-4 text-gray-400 uppercase text-[10px]">{sub.source || 'footer'}</td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                              Ativo
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400 font-mono">
                            {new Date(sub.subscribed_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4 text-gray-400 font-mono">
                            {sub.last_notified_at
                              ? new Date(sub.last_notified_at).toLocaleDateString('pt-BR')
                              : 'Ainda não notificado'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          Nenhum assinante cadastrado na base.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LEADS COMERCIAIS */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">Leads e Propostas Solicitadas</h3>
                  <span className="text-xs text-gray-400">Contatos recebidos pelos modais B2B/B2C</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                  Total: {leadsData.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Data</th>
                      <th className="py-3 px-4 font-bold">Solução / Origem</th>
                      <th className="py-3 px-4 font-bold">Nome & Empresa</th>
                      <th className="py-3 px-4 font-bold">Telefone / WhatsApp</th>
                      <th className="py-3 px-4 font-bold">E-mail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leadsData.length > 0 ? (
                      leadsData.map((lead: any) => (
                        <tr key={lead.id} className="hover:bg-slate-850/50">
                          <td className="py-3 px-4 text-gray-400 font-mono">
                            {new Date(lead.created_at).toLocaleString('pt-BR')}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-400">{lead.source_page}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block">{lead.name || '—'}</span>
                            {lead.company && <span className="text-gray-400 text-[11px]">{lead.company}</span>}
                          </td>
                          <td className="py-3 px-4 text-gray-200 font-mono">{lead.phone || '—'}</td>
                          <td className="py-3 px-4 text-gray-300">{lead.email || '—'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          Nenhum lead comercial registrado ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CONFIGURAÇÕES SMTP & DIAGNÓSTICO */}
        {activeTab === 'smtp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* SMTP Settings Form */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-black text-white">Configurações do Servidor SMTP</h3>
                <span className="text-xs text-gray-400">
                  Preencha as credenciais do e-mail da Nuvv para envio de notificações automáticas.
                </span>
              </div>

              <form onSubmit={handleSaveSmtp} className="space-y-3.5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Host SMTP
                    </label>
                    <input
                      type="text"
                      value={smtpConfig.host}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                      placeholder="smtp.nuvv.com.br ou smtp.gmail.com"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">Porta</label>
                    <input
                      type="number"
                      value={smtpConfig.port}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, port: parseInt(e.target.value, 10) })}
                      placeholder="465 ou 587"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Usuário / E-mail
                    </label>
                    <input
                      type="text"
                      value={smtpConfig.user}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
                      placeholder="notificacoes@nuvv.com.br"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Senha do SMTP
                    </label>
                    <input
                      type="password"
                      value={smtpConfig.pass}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, pass: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Remetente (From)
                    </label>
                    <input
                      type="text"
                      value={smtpConfig.from}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, from: e.target.value })}
                      placeholder='"Nuvv Telecom" <notificacoes@nuvv.com.br>'
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      E-mail para Alertas Comerciais
                    </label>
                    <input
                      type="email"
                      value={smtpConfig.adminEmail}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, adminEmail: e.target.value })}
                      placeholder="comercial@nuvv.com.br"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-md transition-all mt-2"
                >
                  Salvar Configurações SMTP
                </button>

                {smtpSaveSuccess && (
                  <span className="text-xs text-emerald-400 font-bold block text-center mt-2">
                    ✅ Configurações salvas com sucesso no banco SQLite!
                  </span>
                )}
              </form>
            </div>

            {/* SMTP Test & Database Diagnostics */}
            <div className="lg:col-span-5 space-y-6">
              {/* Test Email Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-2.5">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Testar Disparo de E-mail</span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Envie um e-mail de teste para verificar a conectividade do servidor SMTP com a internet.
                </p>

                <div className="space-y-2.5 pt-1">
                  <input
                    type="email"
                    placeholder="Digite seu e-mail para teste"
                    value={testEmailTarget}
                    onChange={(e) => setTestEmailTarget(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleTestSmtp}
                    disabled={testEmailLoading}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>{testEmailLoading ? 'Enviando teste...' : 'Disparar E-mail de Teste'}</span>
                  </button>
                </div>

                {testEmailFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      testEmailFeedback.success
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-950 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {testEmailFeedback.message}
                  </div>
                )}
              </div>

              {/* SQLite Health Info */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <h3 className="text-sm font-black text-white flex items-center space-x-2 border-b border-slate-800 pb-2.5">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>Diagnóstico do Banco SQLite</span>
                </h3>
                <div className="space-y-1.5 text-gray-300">
                  <div className="flex justify-between">
                    <span>Arquivo Local:</span>
                    <strong className="text-white font-mono">data/nuvv.sqlite</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Modo de Journal:</span>
                    <strong className="text-emerald-400">WAL (Write-Ahead Logging)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Pageviews:</span>
                    <strong className="text-white">{healthStatus?.records?.pageviews || 0}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Viabilidade:</span>
                    <strong className="text-white">{healthStatus?.records?.viability || 0}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Assinantes:</span>
                    <strong className="text-white">{healthStatus?.records?.subscribers || 0}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
