import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Presentation,
  FileText,
  Printer,
  Search,
  Lock,
  LogOut,
  Shield,
  ShieldCheck,
  User,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  Wifi,
  Building2,
  GitBranch,
  Layers,
  ArrowRight,
  RefreshCw,
  Eye,
  KeyRound,
  Download,
} from 'lucide-react';
import { apiService, PortalUser, PortalDocSummary, PortalDocDetail } from '../services/apiService';
import { renderMarkdown } from '../utils/markdownRenderer';

export const PortalColaborador: React.FC = () => {
  // Autenticação do Usuário
  const [user, setUser] = useState<PortalUser | null>(() => {
    const saved = localStorage.getItem('nuvv_portal_user') || sessionStorage.getItem('nuvv_portal_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Navegação Principal do Portal
  const [activeTab, setActiveTab] = useState<'apresentacoes' | 'manuais'>('apresentacoes');

  // Manuais e Documentação
  const [docs, setDocs] = useState<PortalDocSummary[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>('00-manual-geral-produtos-e-combos');
  const [selectedDoc, setSelectedDoc] = useState<PortalDocDetail | null>(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docSearch, setDocSearch] = useState('');

  // Modal de Troca de Senha
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await apiService.portalLogin(loginEmail.trim(), loginPassword);
      if (res.success && res.user) {
        setUser(res.user);
        if (rememberMe) {
          localStorage.setItem('nuvv_portal_user', JSON.stringify(res.user));
        } else {
          sessionStorage.setItem('nuvv_portal_user', JSON.stringify(res.user));
        }
      } else {
        setLoginError(res.message || 'Credenciais inválidas.');
      }
    } catch {
      setLoginError('Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nuvv_portal_user');
    sessionStorage.removeItem('nuvv_portal_user');
    setUser(null);
  };

  // Carregar lista de Manuais
  useEffect(() => {
    if (user) {
      setDocsLoading(true);
      apiService.getPortalDocs().then((res) => {
        if (res.success && res.docs) {
          setDocs(res.docs);
          if (res.docs.length > 0 && !selectedSlug) {
            setSelectedSlug(res.docs[0].slug);
          }
        }
        setDocsLoading(false);
      });
    }
  }, [user]);

  // Carregar Conteúdo do Manual Selecionado
  useEffect(() => {
    if (user && selectedSlug) {
      setDocLoading(true);
      apiService.getPortalDoc(selectedSlug).then((res) => {
        if (res.success) {
          setSelectedDoc(res);
        }
        setDocLoading(false);
      });
    }
  }, [user, selectedSlug]);

  // Alterar Senha
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', message: 'A nova senha e a confirmação não conferem.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', message: 'A nova senha deve possuir no mínimo 6 caracteres.' });
      return;
    }

    setPasswordLoading(true);
    setPasswordFeedback(null);

    try {
      const res = await apiService.portalChangePassword(user!.email, currentPassword, newPassword);
      if (res.success) {
        setPasswordFeedback({ type: 'success', message: 'Senha alterada com sucesso!' });
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setPasswordFeedback(null);
        }, 1500);
      } else {
        setPasswordFeedback({ type: 'error', message: res.message || 'Erro ao alterar senha.' });
      }
    } catch {
      setPasswordFeedback({ type: 'error', message: 'Erro de comunicação com o servidor.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Imprimir / Exportar em PDF
  const handlePrintPdf = () => {
    window.print();
  };

  // Filtragem de manuais
  const filteredDocs = useMemo(() => {
    return docs.filter((d) =>
      d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
      d.slug.toLowerCase().includes(docSearch.toLowerCase())
    );
  }, [docs, docSearch]);

  // Renderizar Markdown em HTML
  const renderedContent = useMemo(() => {
    if (!selectedDoc?.content) return '';
    return renderMarkdown(selectedDoc.content);
  }, [selectedDoc]);

  // -----------------------------------------------------------------
  // TELA 1: LOGIN (Se não autenticado)
  // -----------------------------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Fundo gradiente moderno */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center font-black text-slate-950 text-2xl mx-auto shadow-lg shadow-cyan-500/20">
              N
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Portal do Colaborador</h1>
            <p className="text-xs text-slate-400">
              Central de Treinamento Comercial, Manuais de Produtos & Workflows Operacionais
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">E-mail Corporativo</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="seu.nome@nuvv.com.br"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Senha de Acesso</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
                />
                <span>Lembrar de mim</span>
              </label>
              <span className="text-[11px] text-slate-500">Acesso restrito Nuvv Telecom</span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
            Dúvidas ou primeiro acesso? Contate o administrador do sistema em{' '}
            <strong className="text-slate-400">admin@nuvv.com.br</strong>.
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // TELA 2: PORTAL AUTENTICADO
  // -----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col print:bg-white print:text-black">
      {/* Barra de Navegação Superior (Oculta na Impressão) */}
      <header className="print:hidden bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 text-slate-950 flex items-center justify-center font-black text-base shadow-lg shadow-cyan-500/20">
              N
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base text-white tracking-tight">Portal do Colaborador</span>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  NUVV TELECOM
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Hub de Treinamento, Manuais e Vendas</span>
            </div>
          </div>

          {/* Dados do Usuário & Ações */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-1.5">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white leading-none">{user.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{user.role || 'Colaborador'}</div>
              </div>
              {user.user_type === 'admin' ? (
                <span className="ml-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ADMIN
                </span>
              ) : null}
            </div>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Alterar Senha"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Senha</span>
            </button>

            {user.user_type === 'admin' && (
              <a
                href="/admin"
                className="p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Painel de Administração"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Painel Admin</span>
              </a>
            )}

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Encerrar Sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 border-t border-slate-800/60 py-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('apresentacoes')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'apresentacoes'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Apresentações de Treinamento</span>
          </button>

          <button
            onClick={() => setActiveTab('manuais')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              activeTab === 'manuais'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manuais & Documentação (.md)</span>
            {docs.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === 'manuais' ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {docs.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        {/* ============================================================ */}
        {/* SEÇÃO 1: APRESENTAÇÕES DE TREINAMENTO                        */}
        {/* ============================================================ */}
        {activeTab === 'apresentacoes' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono uppercase">
                  Capacitação Comercial & Operacional
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Apresentações Interativas de Treinamento
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Materiais em slides dinâmicos desenhados para a equipe comercial, técnica e de atendimento.
                  Incluem tabelas de preços, modais com diferenciais competitivos, regras técnicas e quebra de objeções.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Treinamento Residencial */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      14 SLIDES // OFERTAS RESIDENCIAIS
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                      Treinamento Residencial
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fibra 100% Simétrica, Wi-Fi 6, Combos com Universal+, Sony One, Max, Telecine, TurboMed, Kaspersky
                    Família, Nuvv Guard Residencial e Nuvv Tag (Rastreador).
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Tabelas de Preços</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Quebra de Objeções</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Monte seu Combo</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/treinamento-residencial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <span>Abrir Apresentação Residencial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Treinamento Empresarial */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-teal-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-teal-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
                      12 SOLUÇÕES // B2B & PME
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-teal-300 transition-colors">
                      Treinamento Empresarial
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Links Dedicados e PME, PABX Nuvem, Telefonia SIP, Mensageria RCS/SMS, Social Wi-Fi Marketing, Nuvv
                    Guard (Câmeras, Interfone e Poste Condomínio) e Kaspersky.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">SLA 4h Garantido</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Tabelas de Planos</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Cases & Argumentos</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/treinamento-empresarial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20"
                  >
                    <span>Abrir Apresentação Empresarial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Workflow de Implantação */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      11 ETAPAS // OPERAÇÃO & TÉCNICA
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                      Workflow de Implantação
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Esteira ponta a ponta: Viabilidade de CTO, lançamento de drop, aferição óptica (-15 a -24 dBm),
                    homologação RFC 2544, ativação de SVAs no Hubsoft e base de IA.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Padrões Ópticos</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Integração Hubsoft</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Pronto para IA</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/workflow-implantacao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Abrir Workflow de Implantação</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SEÇÃO 2: MANUAIS E DOCUMENTAÇÃO TÉCNICA                      */}
        {/* ============================================================ */}
        {activeTab === 'manuais' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar de Manuais (Oculta na Impressão) */}
            <div className="print:hidden lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Índice de Manuais de Produtos
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Selecione o produto ou serviço para leitura completa.</p>
              </div>

              {/* Campo de Busca */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filtrar manual..."
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Lista de Manuais */}
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                {docsLoading && docs.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto text-cyan-400 mb-2" />
                    Carregando manuais...
                  </div>
                ) : filteredDocs.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">Nenhum documento encontrado.</div>
                ) : (
                  filteredDocs.map((doc) => {
                    const isSelected = selectedSlug === doc.slug;
                    return (
                      <button
                        key={doc.slug}
                        onClick={() => setSelectedSlug(doc.slug)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-500/40 text-white shadow-md'
                            : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 hover:text-white'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="font-semibold text-xs truncate leading-snug">{doc.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">{doc.filename}</div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 transition-transform ${
                            isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Leitor Central do Manual Markdown */}
            <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 print:border-none print:bg-white print:p-0">
              {/* Barra Superior do Documento */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 print:border-b-2 print:border-black">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 uppercase print:text-black print:border-black">
                      MANUAL OFICIAL
                    </span>
                    <span className="text-xs text-slate-400 font-mono print:text-gray-600">
                      {selectedDoc?.filename}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1 print:text-black">
                    {selectedDoc?.title || 'Manual Nuvv Telecom'}
                  </h2>
                </div>

                <div className="print:hidden flex items-center gap-2">
                  <button
                    onClick={handlePrintPdf}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-sm"
                    title="Exportar documento para PDF via diálogo de impressão"
                  >
                    <Printer className="w-4 h-4 text-cyan-400" />
                    <span>Exportar / Imprimir em PDF</span>
                  </button>
                </div>
              </div>

              {/* Corpo do Documento Formatado */}
              {docLoading ? (
                <div className="py-20 text-center text-xs text-slate-500 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyan-400" />
                  <p>Carregando conteúdo do manual...</p>
                </div>
              ) : (
                <article
                  className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm print:text-black"
                  dangerouslySetInnerHTML={{ __html: renderedContent }}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal de Alteração de Senha */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-cyan-400" />
                Alterar Senha de Acesso
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Atualize sua senha para manter o acesso pessoal seguro ao portal.
              </p>
            </div>

            {passwordFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                  passwordFeedback.type === 'success'
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                    : 'bg-red-950/40 text-red-300 border-red-800/60'
                }`}
              >
                {passwordFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
                <span>{passwordFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Senha Atual *</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Digite sua senha atual"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nova Senha *</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Confirmar Nova Senha *</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  {passwordLoading ? 'Atualizando...' : 'Salvar Nova Senha'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rodapé (Oculto na Impressão) */}
      <footer className="print:hidden border-t border-slate-800/80 bg-slate-900/50 py-4 px-4 sm:px-8 text-center text-xs text-slate-500">
        © 2026 Nuvv Telecom. Portal de Capacitação e Manuais de Produtos. Uso exclusivo interno e confidencial.
      </footer>
    </div>
  );
};
