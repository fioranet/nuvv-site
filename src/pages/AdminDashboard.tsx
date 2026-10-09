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
  HardDrive,
  ExternalLink,
  PhoneCall,
  Calendar,
  Filter,
} from 'lucide-react';
import { apiService, AdminMetricsResponse } from '../services/apiService';
import { BLOG_POSTS } from '../data/blog';
import { BlogManager } from '../components/admin/BlogManager';
import { PortalUsersManager } from '../components/admin/PortalUsersManager';
import { FileManager } from '../components/admin/FileManager';
import { ContactsManager } from '../components/admin/ContactsManager';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nuvv_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'analytics' | 'viability' | 'files' | 'contacts' | 'blog' | 'newsletter' | 'leads' | 'portal_users' | 'smtp'>('analytics');
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState<AdminMetricsResponse | null>(null);
  const [newsletterData, setNewsletterData] = useState<any>(null);
  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [viabilityData, setViabilityData] = useState<any>(null);
  const [viabilityStatusFilter, setViabilityStatusFilter] = useState<string>('all');
  const [viabilitySearch, setViabilitySearch] = useState<string>('');
  const [healthStatus, setHealthStatus] = useState<any>(null);

  // Filtro de Tempo do Analytics
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'all' | 'custom'>('month');
  const [customStartDate, setCustomStartDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [customEndDate, setCustomEndDate] = useState<string>(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [metricsLoading, setMetricsLoading] = useState(false);

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

  // Carregar métricas filtradas por período
  const fetchMetrics = async (
    period: 'today' | 'week' | 'month' | 'all' | 'custom' = selectedPeriod,
    start: string = customStartDate,
    end: string = customEndDate
  ) => {
    setMetricsLoading(true);
    try {
      const res = await apiService.getMetrics({
        period,
        startDate: period === 'custom' ? start : undefined,
        endDate: period === 'custom' ? end : undefined,
      });
      if (res.success) {
        setMetrics(res.data);
      }
    } catch (err) {
      console.error('Error fetching filtered metrics:', err);
    } finally {
      setMetricsLoading(false);
    }
  };

  const handlePeriodChange = (period: 'today' | 'week' | 'month' | 'all' | 'custom') => {
    setSelectedPeriod(period);
    if (period !== 'custom') {
      fetchMetrics(period);
    }
  };

  const handleApplyCustomPeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStartDate || !customEndDate) return;
    fetchMetrics('custom', customStartDate, customEndDate);
  };

  // Load all dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [healthRes, metricsRes, newsRes, leadsRes, smtpRes, viabilityRes] = await Promise.allSettled([
        apiService.getHealth(),
        apiService.getMetrics({
          period: selectedPeriod,
          startDate: selectedPeriod === 'custom' ? customStartDate : undefined,
          endDate: selectedPeriod === 'custom' ? customEndDate : undefined,
        }),
        apiService.getNewsletter(),
        apiService.getLeads(),
        apiService.getSmtpConfig(),
        apiService.getViability(),
      ]);

      if (healthRes.status === 'fulfilled') setHealthStatus(healthRes.value);
      if (metricsRes.status === 'fulfilled' && metricsRes.value.success) setMetrics(metricsRes.value.data);
      if (newsRes.status === 'fulfilled' && newsRes.value.success) setNewsletterData(newsRes.value.data);
      if (leadsRes.status === 'fulfilled' && leadsRes.value.success) setLeadsData(leadsRes.value.data);
      if (viabilityRes.status === 'fulfilled' && viabilityRes.value.success) setViabilityData(viabilityRes.value.data);
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
  }, [isAuthenticated]);

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
            <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center mx-auto shadow-xl p-3">
              <img src="/images/nuvv-icon.png" alt="Nuvv Telecom" className="w-full h-full object-contain" />
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-center p-1.5 shadow-md flex-shrink-0">
              <img src="/images/nuvv-icon.png" alt="Nuvv Telecom" className="w-full h-full object-contain" />
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
            <a
              href="/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm cursor-pointer"
              title="Acessar o Portal do Colaborador (nova aba)"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portal do Colaborador</span>
              <ExternalLink className="w-3 h-3 text-cyan-400/70" />
            </a>

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
            { id: 'viability', label: '📍 Consultas de Viabilidade', icon: MapPin, badge: metrics?.kpis?.totalViability || viabilityData?.total },
            { id: 'leads', label: 'Leads Comerciais', icon: Users, badge: metrics?.kpis?.totalLeads },
            { id: 'files', label: '📁 Arquivos & Docs (FTP)', icon: HardDrive },
            { id: 'contacts', label: '📞 Contatos & Ramais', icon: PhoneCall },
            { id: 'blog', label: 'Blog & Artigos', icon: BookOpen },
            { id: 'newsletter', label: 'Nuvv News & Disparador', icon: Mail, badge: metrics?.kpis?.totalSubscribers },
            { id: 'portal_users', label: '👥 Usuários do Portal', icon: Users },
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
            {/* Barra de Filtro de Tempo (Período Analítico) */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-inner">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white flex items-center space-x-2">
                      <span>Filtro de Período & Análise Temporal</span>
                      {metricsLoading && <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />}
                    </h2>
                    <span className="text-xs text-gray-400">
                      Isole os dados por dia, semana, mês ou selecione datas específicas
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 self-start md:self-auto shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                  <span>{metrics?.periodInfo?.label || 'Últimos 30 dias (Mês)'}</span>
                </div>
              </div>

              {/* Botões Rápidos de Período */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                {[
                  { id: 'today', label: '☀️ Hoje (Do Dia)' },
                  { id: 'week', label: '📅 Últimos 7 Dias (Semana)' },
                  { id: 'month', label: '📊 Últimos 30 Dias (Mês)' },
                  { id: 'all', label: '🌐 Desde Sempre (Geral)' },
                  { id: 'custom', label: '🎯 Seleção Personalizada' },
                ].map((p) => {
                  const isActive = selectedPeriod === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      disabled={metricsLoading}
                      onClick={() => handlePeriodChange(p.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/25'
                          : 'bg-slate-950 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                      }`}
                    >
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Seletor Customizado de Período (De -> Até) */}
              {selectedPeriod === 'custom' && (
                <form
                  onSubmit={handleApplyCustomPeriod}
                  className="flex flex-wrap items-end gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 animate-fade-in"
                >
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Data Inicial
                    </label>
                    <input
                      type="date"
                      required
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Data Final
                    </label>
                    <input
                      type="date"
                      required
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={metricsLoading}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors flex items-center space-x-1.5 shadow-md shadow-emerald-500/25 h-[36px]"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>{metricsLoading ? 'Filtrando...' : 'Aplicar Período'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Aviso de Auditoria e Filtro Anti-Bot / Anti-Admin */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong className="text-white">Auditoria Ativa:</strong> Acessos ao painel administrativo (<code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded text-[11px]">/admin</code>, equipe interna) e requisições de robôs/crawlers automatizados foram isolados e não inflam as contagens comerciais.
              </span>
            </div>

            {/* 5 KPI Cards (Dinamizados pelo Período Selecionado) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Visitantes Únicos (Aparelhos)</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.uniqueVisitors || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Hoje: <strong>{metrics?.kpis?.todayUniqueVisitors || 0}</strong> • Vitalício: <strong>{metrics?.lifetime?.uniqueVisitors || metrics?.kpis?.uniqueVisitors || 0}</strong>
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Sessões / Visitas</span>
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.totalSessions || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Hoje: <strong>{metrics?.kpis?.todaySessions || 0}</strong> • Vitalício: <strong>{metrics?.lifetime?.totalSessions || metrics?.kpis?.totalSessions || 0}</strong>
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Pageviews no Período</span>
                  <Eye className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.totalPageviews || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  Hoje: <strong>{metrics?.kpis?.todayPageviews || 0}</strong> • Vitalício: <strong>{metrics?.lifetime?.totalPageviews || metrics?.kpis?.totalPageviews || 0}</strong>
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
                <span className="text-[11px] text-gray-400 block">
                  No período • Vitalício: <strong>{metrics?.lifetime?.totalViability || metrics?.kpis?.totalViability || 0}</strong>
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Leads Comerciais</span>
                  <Mail className="w-4 h-4 text-nuvv-purple" />
                </div>
                <div className="text-3xl font-black text-white">
                  {metrics?.kpis?.totalLeads || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">
                  No período • Vitalício: <strong>{metrics?.lifetime?.totalLeads || metrics?.kpis?.totalLeads || 0}</strong>
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

            {/* Nova Seção: Origens de Tráfego ("De Onde Vieram?") & Navegadores */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Origens de Tráfego */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>De Onde Vieram? (Origens de Tráfego)</span>
                  </h3>
                  <span className="text-[11px] text-gray-400">Referrers & Canais Reais</span>
                </div>

                <div className="space-y-3">
                  {metrics?.trafficSources && metrics.trafficSources.length > 0 ? (
                    metrics.trafficSources.map((src, idx) => {
                      const maxVal = metrics.trafficSources![0]?.count || 1;
                      const pct = Math.round((src.count / maxVal) * 100);
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-gray-200">{src.source_name}</span>
                            <span className="font-mono text-emerald-400 font-bold">{src.count} visitas</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-6 text-center text-xs text-gray-500">
                      Nenhuma visita externa registrada ainda.
                    </div>
                  )}
                </div>
              </div>

              {/* Navegadores */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span>Navegadores Reais</span>
                  </h3>
                  <span className="text-[11px] text-gray-400">Distribuição</span>
                </div>

                <div className="space-y-2">
                  {metrics?.browsers && metrics.browsers.length > 0 ? (
                    metrics.browsers.map((b, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40 last:border-none">
                        <span className="text-gray-300 font-medium">{b.name}</span>
                        <span className="font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded-lg">
                          {b.count} acessos
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-gray-500">
                      Aguardando primeiros registros de navegador.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabela de Últimos Acessos ao Site em Tempo Real */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Últimos Acessos ao Site em Tempo Real</span>
                  </h3>
                  <span className="text-xs text-gray-400">
                    Registros 100% reais gravados no SQLite com rota, origem, navegador e cidade
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Ao Vivo
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Data/Hora</th>
                      <th className="py-3 px-4 font-bold">Página Acessada</th>
                      <th className="py-3 px-4 font-bold">Cidade</th>
                      <th className="py-3 px-4 font-bold">Dispositivo & SO</th>
                      <th className="py-3 px-4 font-bold">Navegador</th>
                      <th className="py-3 px-4 font-bold">Origem (Referrer / Canal)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {metrics?.recentPageviews && metrics.recentPageviews.length > 0 ? (
                      metrics.recentPageviews.map((pv) => (
                        <tr key={pv.id} className="hover:bg-slate-850/50">
                          <td className="py-3 px-4 text-gray-400 font-mono whitespace-nowrap">
                            {new Date(pv.created_at).toLocaleString('pt-BR')}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-emerald-400 font-bold block truncate max-w-[200px]" title={pv.path}>
                              {pv.path}
                            </span>
                            {pv.title && <span className="text-gray-400 text-[11px] block truncate max-w-[200px]">{pv.title}</span>}
                          </td>
                          <td className="py-3 px-4">
                            {pv.city ? (
                              <span className="text-white font-medium bg-slate-800/80 px-2 py-0.5 rounded text-[11px]">
                                {pv.city}
                              </span>
                            ) : (
                              <span className="text-gray-500 text-[11px] italic">Não informada</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            <span className="capitalize">{pv.device || 'desktop'}</span>
                            {pv.os && <span className="text-gray-400 text-[11px] block">{pv.os}</span>}
                          </td>
                          <td className="py-3 px-4 text-gray-200">
                            {pv.browser || 'Chrome/Navegador'}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gray-300 font-mono text-[11px] truncate max-w-[220px] block" title={pv.referrer || 'Acesso Direto'}>
                              {pv.referrer ? pv.referrer : 'Acesso Direto'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-500">
                          Nenhum acesso registrado ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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

        {/* TAB 2: CONSULTAS DE VIABILIDADE (DADOS 100% REAIS) */}
        {activeTab === 'viability' && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards de Viabilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Total de Consultas</span>
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {viabilityData?.total || metrics?.kpis?.totalViability || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">Endereços checados pelos clientes</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Com Viabilidade (Coberto)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  {viabilityData?.withFeasibility || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">Clientes aptos para instalação imediata</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Em Análise Técnica</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400">
                  {viabilityData?.emAnalise || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">Aguardando validação de rota/POP</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                  <span>Sem Cobertura (Demanda)</span>
                  <XCircle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-3xl font-black text-rose-400">
                  {viabilityData?.withoutFeasibility || 0}
                </div>
                <span className="text-[11px] text-gray-400 block">Oportunidade para expansão de rede</span>
              </div>
            </div>

            {/* Demanda Reprimida por Bairro (se houver) */}
            {viabilityData?.unmetNeighborhoods && viabilityData.unmetNeighborhoods.length > 0 && (
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-xs font-black text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>Demanda Reprimida por Bairro (Clientes que procuraram sem cobertura)</span>
                  </h3>
                  <span className="text-[11px] text-gray-400">Top regiões para expansão</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {viabilityData.unmetNeighborhoods.map((unm: any, i: number) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80">
                      <span className="text-xs font-bold text-white block truncate">{unm.neighborhood}</span>
                      <span className="text-[11px] text-gray-400 block truncate">{unm.city || 'Região'}</span>
                      <span className="text-emerald-400 font-mono font-bold text-xs mt-1 block">
                        {unm.demand_count} pedidos
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tabela de Consultas de Viabilidade com Filtros */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Consultas de Viabilidade Realizadas</span>
                  </h3>
                  <span className="text-xs text-gray-400">
                    Histórico de endereços, contatos e status de cobertura gravados no SQLite
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href="/api/admin/export/viability"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </a>
                </div>
              </div>

              {/* Filtro por Status e Busca */}
              <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1.5 text-xs font-bold">
                  <span className="text-gray-400 text-[11px]">Filtrar:</span>
                  {(['all', 'VIAVEL', 'EM_ANALISE', 'INVIAVEL'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setViabilityStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                        viabilityStatusFilter === st
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      {st === 'all'
                        ? 'Todos'
                        : st === 'VIAVEL'
                        ? 'Viáveis'
                        : st === 'EM_ANALISE'
                        ? 'Em Análise'
                        : 'Inviáveis'}
                    </button>
                  ))}
                </div>

                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Buscar por nome, telefone, rua, bairro ou CEP..."
                      value={viabilitySearch}
                      onChange={(e) => setViabilitySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Data/Hora</th>
                      <th className="py-3 px-4 font-bold">Cliente / Contato</th>
                      <th className="py-3 px-4 font-bold">Endereço Consultado</th>
                      <th className="py-3 px-4 font-bold">Tipo</th>
                      <th className="py-3 px-4 font-bold">Status Viabilidade</th>
                      <th className="py-3 px-4 font-bold">Plano / Observações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {(() => {
                      const list = (viabilityData?.queries || []).filter((q: any) => {
                        if (viabilityStatusFilter === 'VIAVEL') {
                          if (q.status !== 'VIAVEL' && q.has_feasibility !== 1) return false;
                        } else if (viabilityStatusFilter === 'EM_ANALISE') {
                          if (q.status !== 'EM_ANALISE') return false;
                        } else if (viabilityStatusFilter === 'INVIAVEL') {
                          if (q.status === 'VIAVEL' || q.status === 'EM_ANALISE' || q.has_feasibility === 1) return false;
                        }
                        if (viabilitySearch.trim()) {
                          const term = viabilitySearch.toLowerCase();
                          const matches =
                            (q.name || '').toLowerCase().includes(term) ||
                            (q.phone || '').toLowerCase().includes(term) ||
                            (q.street || '').toLowerCase().includes(term) ||
                            (q.neighborhood || '').toLowerCase().includes(term) ||
                            (q.city || '').toLowerCase().includes(term) ||
                            (q.cep || '').toLowerCase().includes(term);
                          if (!matches) return false;
                        }
                        return true;
                      });

                      if (list.length === 0) {
                        return (
                          <tr>
                            <td colSpan={6} className="text-center py-8 text-gray-500">
                              Nenhuma consulta encontrada para os filtros selecionados.
                            </td>
                          </tr>
                        );
                      }

                      return list.map((q: any) => {
                        const isViable = q.status === 'VIAVEL' || q.has_feasibility === 1;
                        const isAnalise = q.status === 'EM_ANALISE';
                        return (
                          <tr key={q.id} className="hover:bg-slate-850/50">
                            <td className="py-3 px-4 text-gray-400 font-mono whitespace-nowrap">
                              {new Date(q.created_at).toLocaleString('pt-BR')}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-white block">{q.name || 'Anônimo'}</span>
                              {q.phone ? (
                                <a
                                  href={`https://wa.me/55${q.phone.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-mono text-[11px]"
                                  title="Iniciar conversa no WhatsApp"
                                >
                                  <span>{q.phone}</span>
                                  <PhoneCall className="w-3 h-3 text-emerald-500" />
                                </a>
                              ) : (
                                <span className="text-gray-500 text-[11px]">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-gray-200 font-medium block">
                                {[q.street, q.number].filter(Boolean).join(', ') || 'Rua não informada'}
                              </span>
                              <span className="text-gray-400 text-[11px] block">
                                {[q.neighborhood, q.city, q.state].filter(Boolean).join(' - ')}
                              </span>
                              {q.cep && (
                                <span className="text-gray-500 font-mono text-[10px] block">
                                  CEP: {q.cep}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 uppercase text-[10px] font-bold text-gray-300">
                              <span className="bg-slate-800 px-2 py-0.5 rounded">
                                {q.service_type || 'Residencial'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {isViable ? (
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30 inline-flex items-center space-x-1">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> Viável
                                </span>
                              ) : isAnalise ? (
                                <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-500/30 inline-flex items-center space-x-1">
                                  <Clock className="w-3 h-3 mr-1" /> Em Análise
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded border border-rose-500/30 inline-flex items-center space-x-1">
                                  <XCircle className="w-3 h-3 mr-1" /> Sem Cobertura
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-300 text-[11px]">
                              {q.plan_interested && (
                                <span className="font-bold text-emerald-300 block mb-0.5">
                                  {q.plan_interested}
                                </span>
                              )}
                              {q.notes ? <span className="text-gray-400 block">{q.notes}</span> : !q.plan_interested ? '—' : null}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEADS COMERCIAIS */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Leads e Propostas Solicitadas</span>
                  </h3>
                  <span className="text-xs text-gray-400">Contatos recebidos pelos modais B2B/B2C</span>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="/api/admin/export/leads"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </a>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                    Total: {leadsData.length}
                  </span>
                </div>
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
                      <th className="py-3 px-4 font-bold">Detalhes / Localização / Plano</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leadsData.length > 0 ? (
                      leadsData.map((lead: any) => (
                        <tr key={lead.id} className="hover:bg-slate-850/50">
                          <td className="py-3 px-4 text-gray-400 font-mono whitespace-nowrap">
                            {new Date(lead.created_at).toLocaleString('pt-BR')}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-400">{lead.source_page}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block">{lead.name || '—'}</span>
                            {lead.company && <span className="text-gray-400 text-[11px] block">{lead.company}</span>}
                            {lead.cnpj && <span className="text-gray-500 font-mono text-[10px] block">CNPJ: {lead.cnpj}</span>}
                          </td>
                          <td className="py-3 px-4 text-gray-200 font-mono">
                            {lead.phone ? (
                              <a
                                href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-bold"
                                title="Iniciar conversa no WhatsApp"
                              >
                                <span>{lead.phone}</span>
                                <PhoneCall className="w-3 h-3 text-emerald-500" />
                              </a>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-300">{lead.email || '—'}</td>
                          <td className="py-3 px-4 text-gray-300 text-[11px] max-w-[280px]">
                            {lead.details || '—'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-500">
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

        {/* 7. Portal Users Management Tab */}
        {activeTab === 'portal_users' && (
          <PortalUsersManager />
        )}

        {/* 8. Gerenciador de Arquivos & FTP Online */}
        {activeTab === 'files' && (
          <FileManager />
        )}

        {/* 9. Contatos & Ramais Corporativos */}
        {activeTab === 'contacts' && (
          <ContactsManager />
        )}
      </main>
    </div>
  );
};
