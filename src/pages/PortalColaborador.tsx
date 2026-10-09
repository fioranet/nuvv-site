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
  Sparkles,
  ArrowRight,
  RefreshCw,
  Eye,
  KeyRound,
  Download,
  Folder,
  FolderOpen,
  Copy,
  Check,
  Phone,
  PhoneCall,
  MessageSquare,
  Mail,
  Building,
  Clock,
  HardDrive,
  Filter,
  ArrowLeft,
  FileCode,
  FileSpreadsheet,
  File as FileIcon,
  Grid,
  List,
} from 'lucide-react';
import {
  apiService,
  PortalUser,
  PortalDocSummary,
  PortalDocDetail,
  PortalFileItem,
  PortalContactItem,
  PortalFileCategory,
} from '../services/apiService';
import { renderMarkdown } from '../utils/markdownRenderer';

export const PortalColaborador: React.FC = () => {
  // Autenticação do Usuário (se o usuário já estiver logado no admin, conecta automaticamente como gestor)
  const [user, setUser] = useState<PortalUser | null>(() => {
    const saved = localStorage.getItem('nuvv_portal_user') || sessionStorage.getItem('nuvv_portal_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    if (sessionStorage.getItem('nuvv_admin_auth') === 'true') {
      return {
        id: 999,
        name: 'Administrador Nuvv',
        email: 'admin@nuvv.com.br',
        role: 'Gestor de Operações & Treinamento',
        user_type: 'admin',
        status: 'ativo',
      };
    }
    return null;
  });

  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Navegação Principal do Portal
  const [activeTab, setActiveTab] = useState<'arquivos' | 'contatos' | 'manuais' | 'apresentacoes'>('arquivos');

  // Repositório de Arquivos do Colaborador (Somente Leitura / Download)
  const [portalFiles, setPortalFiles] = useState<PortalFileItem[]>([]);
  const [portalCategories, setPortalCategories] = useState<PortalFileCategory[]>([]);
  const [portalFolder, setPortalFolder] = useState<string>('');
  const [portalBreadcrumbs, setPortalBreadcrumbs] = useState<Array<{ name: string; path: string }>>([
    { name: 'Início', path: '' },
  ]);
  const [portalSearch, setPortalSearch] = useState<string>('');
  const [portalFilesLoading, setPortalFilesLoading] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Contatos & Ramais Corporativos
  const [contacts, setContacts] = useState<PortalContactItem[]>([]);
  const [contactsLoading, setContactsLoading] = useState<boolean>(false);
  const [contactSearch, setContactSearch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('todos');

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

  // Helper de formatação de tamanho
  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Helper de formato de data
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return '';
    }
  };

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

  const handleAdminQuickEnter = () => {
    const adminUser: PortalUser = {
      id: 999,
      name: 'Administrador Nuvv',
      email: 'admin@nuvv.com.br',
      role: 'Gestor de Operações & Treinamento',
      user_type: 'admin',
      status: 'ativo',
    };
    setUser(adminUser);
    localStorage.setItem('nuvv_portal_user', JSON.stringify(adminUser));
  };

  const handleLogout = () => {
    localStorage.removeItem('nuvv_portal_user');
    sessionStorage.removeItem('nuvv_portal_user');
    setUser(null);
  };

  // Carregar Arquivos do Repositório do Colaborador
  const loadPortalFiles = async (folder: string = portalFolder, search: string = portalSearch) => {
    setPortalFilesLoading(true);
    try {
      const res = await apiService.getPortalFiles(folder, search);
      if (res.success && res.items) {
        setPortalFiles(res.items);
        if (res.breadcrumbs) setPortalBreadcrumbs(res.breadcrumbs);
        if (res.currentFolder !== undefined) setPortalFolder(res.currentFolder);
        if (res.categories && res.categories.length > 0) {
          setPortalCategories(res.categories);
        }
      }
    } catch (err) {
      console.error('Erro ao buscar arquivos do portal:', err);
    } finally {
      setPortalFilesLoading(false);
    }
  };

  // Carregar Abas / Categorias do Portal
  useEffect(() => {
    if (user) {
      apiService.getPortalFileCategories().then((res) => {
        if (res.success && res.categories) {
          setPortalCategories(res.categories);
        }
      }).catch((err) => console.error('Erro ao carregar categorias do portal:', err));
    }
  }, [user]);

  // Carregar Contatos Corporativos
  const loadContacts = async () => {
    setContactsLoading(true);
    try {
      const res = await apiService.getPortalContacts();
      if (res.success && res.contacts) {
        setContacts(res.contacts);
      }
    } catch (err) {
      console.error('Erro ao buscar contatos:', err);
    } finally {
      setContactsLoading(false);
    }
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

  // Carregar dados de arquivos ou contatos quando aba mudar
  useEffect(() => {
    if (user) {
      if (activeTab === 'arquivos') {
        loadPortalFiles(portalFolder, portalSearch);
      } else if (activeTab === 'contatos') {
        loadContacts();
      }
    }
  }, [user, activeTab, portalFolder]);

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

  // Copiar Link do Arquivo
  const handleCopyUrl = (url: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Categorias de Atalho Rápido para Pastas de Arquivos
  const PRESET_CATEGORIES = [
    { label: 'Todos os Arquivos', folder: '', icon: Layers },
    { label: 'Equipamentos: Manuais', folder: 'equipamentos/manuais', icon: BookOpen },
    { label: 'Equipamentos: Firmwares', folder: 'equipamentos/firmware', icon: HardDrive },
    { label: 'Produtos: Fichas Técnicas', folder: 'produtos/fichas', icon: FileText },
    { label: 'Produtos: Manuais', folder: 'produtos/manuais', icon: BookOpen },
    { label: 'Procedimentos & POPs', folder: 'procedimentos', icon: GitBranch },
    { label: 'Treinamento & Materiais', folder: 'treinamento', icon: Presentation },
  ];

  // Filtragem de contatos
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        !contactSearch ||
        c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.department.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.extension.toLowerCase().includes(contactSearch.toLowerCase()) ||
        (c.role && c.role.toLowerCase().includes(contactSearch.toLowerCase())) ||
        (c.notes && c.notes.toLowerCase().includes(contactSearch.toLowerCase()));

      const matchDept =
        selectedDepartment === 'todos' ||
        c.department.toLowerCase().includes(selectedDepartment.toLowerCase());

      return matchSearch && matchDept;
    });
  }, [contacts, contactSearch, selectedDepartment]);

  // Departamentos únicos para filtro
  const departmentsList = useMemo(() => {
    const set = new Set<string>();
    contacts.forEach((c) => {
      if (c.department) set.add(c.department);
    });
    return Array.from(set);
  }, [contacts]);

  // Filtragem de manuais markdown
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
    const hasAdminSession = sessionStorage.getItem('nuvv_admin_auth') === 'true';

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center font-black text-slate-950 text-2xl mx-auto shadow-lg shadow-cyan-500/20">
              N
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Portal do Colaborador</h1>
            <p className="text-xs text-slate-400">
              Central de Treinamento, Manuais de Equipamentos, POPs & Ramais Corporativos
            </p>
          </div>

          {/* Atalho Inteligente para Sessão Admin Conectada */}
          {hasAdminSession && (
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Sessão de Administrador Ativa</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Você já está autenticado no Painel Nuvv. Deseja acessar o Portal do Colaborador diretamente?
              </p>
              <button
                type="button"
                onClick={handleAdminQuickEnter}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
              >
                <span>Acessar Imediatamente como Administrador</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

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
              <span className="text-[11px] text-slate-400">Hub de Arquivos, Manuais, Treinamento & Ramais</span>
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
                title="Painel de Administração Nuvv"
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

        {/* Abas de Navegação Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 border-t border-slate-800/60 py-2 text-xs font-bold overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('arquivos')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'arquivos'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>📁 Arquivos & Downloads</span>
          </button>

          <button
            onClick={() => setActiveTab('contatos')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'contatos'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>📞 Contatos & Ramais</span>
          </button>

          <button
            onClick={() => setActiveTab('manuais')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'manuais'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 Manuais & POPs</span>
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

          <button
            onClick={() => setActiveTab('apresentacoes')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'apresentacoes'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>🎓 Treinamento & Slides</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        {/* ============================================================ */}
        {/* SEÇÃO 1: ARQUIVOS & DOWNLOADS (SOMENTE LEITURA / DOWNLOAD)    */}
        {/* ============================================================ */}
        {activeTab === 'arquivos' && (
          <div className="space-y-6">
            {/* Header com Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono uppercase">
                  Repositório /colaborador // Somente Leitura & Download
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Arquivos, Manuais & Downloads
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Acesse firmwares oficiais, manuais de fabricantes de ONUs e roteadores, fichas técnicas de produtos e
                  documentos corporativos na pasta exclusiva de colaboradores.
                </p>
              </div>
            </div>

            {/* Categorias & Abas Rápidas (Configuradas pelo Admin ou Auto-Detectadas de /colaborador) */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold custom-scrollbar">
              {(portalCategories.length > 0 ? portalCategories : [{ name: 'Todos os Arquivos', path: '' }]).map((cat, idx) => {
                const isSelected = (portalFolder === cat.path || (!portalFolder && !cat.path)) && !portalSearch;
                return (
                  <button
                    key={`${cat.path}-${idx}`}
                    type="button"
                    onClick={() => {
                      setPortalSearch('');
                      setPortalFolder(cat.path);
                      loadPortalFiles(cat.path, '');
                    }}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Barra de Busca & Navegação */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Breadcrumb da pasta atual */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs text-slate-400">
                <HardDrive className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                {portalBreadcrumbs.map((crumb, idx) => {
                  const isLast = idx === portalBreadcrumbs.length - 1;
                  return (
                    <React.Fragment key={crumb.path || 'root'}>
                      {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />}
                      <button
                        type="button"
                        onClick={() => {
                          setPortalSearch('');
                          setPortalFolder(crumb.path);
                          loadPortalFiles(crumb.path, '');
                        }}
                        className={`hover:text-cyan-400 transition-colors whitespace-nowrap ${
                          isLast ? 'text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        {crumb.name}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Controles de Busca e Visualização */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loadPortalFiles(portalFolder, portalSearch);
                  }}
                  className="relative flex-1 md:w-72"
                >
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={portalSearch}
                    onChange={(e) => setPortalSearch(e.target.value)}
                    placeholder="Buscar arquivo ou manual..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                  {portalSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setPortalSearch('');
                        loadPortalFiles(portalFolder, '');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'
                    }`}
                    title="Visualização em Grade"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'
                    }`}
                    title="Visualização em Tabela"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => loadPortalFiles(portalFolder, portalSearch)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  title="Atualizar lista"
                >
                  <RefreshCw className={`w-4 h-4 ${portalFilesLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Aviso de Repositório Seguro */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/40 border border-slate-800/60 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  Área de consulta e download direto. Para enviar novos arquivos ou manuais, utilize o Painel Administrativo Nuvv.
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 font-bold">
                {portalFiles.length} item(ns) encontrado(s)
              </span>
            </div>

            {/* Lista / Grade de Arquivos */}
            {portalFilesLoading ? (
              <div className="py-20 text-center text-xs text-slate-500 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyan-400" />
                <p>Carregando arquivos do repositório...</p>
              </div>
            ) : portalFiles.length === 0 ? (
              <div className="py-20 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl space-y-3">
                <FolderOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Nenhum arquivo nesta pasta</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {portalSearch
                    ? `Nenhum resultado corresponde à busca "${portalSearch}". Tente outro termo.`
                    : 'Esta pasta ainda não possui arquivos disponíveis para download. Selecione outra categoria ou pasta.'}
                </p>
                {portalFolder && (
                  <button
                    type="button"
                    onClick={() => {
                      setPortalFolder('');
                      setPortalSearch('');
                      loadPortalFiles('', '');
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar à Raiz</span>
                  </button>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              /* MODO GRADE */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portalFiles.map((item, idx) => {
                  const isDir = item.isDirectory;
                  const isPdf = item.extension === '.pdf';
                  const isHtml = item.extension === '.html' || item.extension === '.htm';
                  const isBin =
                    item.extension === '.bin' ||
                    item.extension === '.hex' ||
                    item.extension === '.img' ||
                    item.extension === '.tar' ||
                    item.extension === '.gz' ||
                    item.extension === '.zip';
                  const isImg =
                    item.extension === '.png' ||
                    item.extension === '.jpg' ||
                    item.extension === '.jpeg' ||
                    item.extension === '.webp' ||
                    item.extension === '.svg';

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border p-4 flex flex-col justify-between space-y-3 transition-all ${
                        isDir
                          ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 cursor-pointer shadow-sm'
                          : 'bg-slate-900/60 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 shadow-md'
                      }`}
                      onClick={() => {
                        if (isDir) {
                          setPortalFolder(item.relativePath);
                          setPortalSearch('');
                          loadPortalFiles(item.relativePath, '');
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {isDir ? (
                            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                              <Folder className="w-5 h-5" />
                            </div>
                          ) : isPdf ? (
                            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                          ) : isHtml ? (
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                              <FileCode className="w-5 h-5" />
                            </div>
                          ) : isBin ? (
                            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                              <HardDrive className="w-5 h-5" />
                            </div>
                          ) : isImg ? (
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                              <Eye className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                              <FileIcon className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <h4
                              className="text-xs font-bold text-white truncate hover:text-cyan-300 transition-colors"
                              title={item.name}
                            >
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {isDir ? 'Pasta / Diretório' : formatFileSize(item.size)}
                            </p>
                          </div>
                        </div>

                        {!isDir && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase flex-shrink-0 ${
                              isPdf
                                ? 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                                : isHtml
                                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
                                : isBin
                                ? 'bg-purple-950/60 text-purple-300 border-purple-800/60'
                                : isImg
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {item.extension.replace('.', '') || 'DOC'}
                          </span>
                        )}
                      </div>

                      {/* Ações para Arquivos */}
                      {!isDir ? (
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                          <a
                            href={item.publicUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700 text-[11px]"
                            title="Abrir no navegador"
                          >
                            <ExternalLink className="w-3 h-3 text-cyan-400" />
                            <span>Visualizar</span>
                          </a>

                          <a
                            href={item.publicUrl || '#'}
                            download={item.name}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-bold flex items-center justify-center gap-1.5 transition-colors border border-cyan-500/30 text-[11px]"
                            title="Baixar arquivo diretamente"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </a>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.publicUrl) handleCopyUrl(item.publicUrl);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Copiar link do arquivo"
                          >
                            {copiedUrl === item.publicUrl ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="text-[10px] text-amber-400/80 font-semibold flex items-center justify-between pt-1">
                          <span>Clique para explorar pasta</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* MODO TABELA */
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Nome do Item</th>
                      <th className="px-4 py-3 hidden md:table-cell">Tipo</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Tamanho</th>
                      <th className="px-4 py-3 hidden lg:table-cell">Atualização</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {portalFiles.map((item, idx) => {
                      const isDir = item.isDirectory;
                      return (
                        <tr
                          key={idx}
                          onClick={() => {
                            if (isDir) {
                              setPortalFolder(item.relativePath);
                              setPortalSearch('');
                              loadPortalFiles(item.relativePath, '');
                            }
                          }}
                          className={`hover:bg-slate-800/40 transition-colors ${isDir ? 'cursor-pointer' : ''}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              {isDir ? (
                                <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
                              ) : (
                                <FileIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                              )}
                              <span className="font-semibold text-white truncate max-w-xs md:max-w-md">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell uppercase font-mono text-[11px] text-slate-400">
                            {isDir ? 'Pasta' : item.extension.replace('.', '') || 'Arquivo'}
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell text-slate-400">
                            {isDir ? '—' : formatFileSize(item.size)}
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell text-slate-500 text-[11px]">
                            {formatDate(item.updatedAt)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {!isDir ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={item.publicUrl || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                  title="Visualizar"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                                </a>
                                <a
                                  href={item.publicUrl || '#'}
                                  download={item.name}
                                  className="p-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 transition-colors"
                                  title="Baixar"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => item.publicUrl && handleCopyUrl(item.publicUrl)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                                  title="Copiar Link"
                                >
                                  {copiedUrl === item.publicUrl ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-amber-400 font-bold flex items-center justify-end gap-1">
                                Abrir <ChevronRight className="w-3 h-3" />
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SEÇÃO 2: CONTATOS & RAMAIS CORPORATIVOS                      */}
        {/* ============================================================ */}
        {activeTab === 'contatos' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[10px] font-bold font-mono uppercase">
                  Diretório Telefônico Interno
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Contatos & Ramais Corporativos
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Lista telefônica interna da Nuvv Telecom com ramais, plantão 24h do NOC, supervisão de campo,
                  financeiro e atendimento comercial.
                </p>
              </div>
            </div>

            {/* Filtros por Departamento & Busca */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Filtro por Departamento */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto text-xs font-semibold pb-1 custom-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedDepartment('todos')}
                  className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap ${
                    selectedDepartment === 'todos'
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Todos os Setores
                </button>
                {departmentsList.map((dept, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap ${
                      selectedDepartment === dept
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Busca de Contatos */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Buscar por nome, ramal ou setor..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Cards de Contatos */}
            {contactsLoading ? (
              <div className="py-20 text-center text-xs text-slate-500 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-400" />
                <p>Carregando contatos corporativos...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="py-20 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl space-y-2">
                <PhoneCall className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-white">Nenhum contato encontrado</h3>
                <p className="text-xs text-slate-400">Verifique os filtros aplicados ou o termo pesquisado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 rounded-3xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-teal-500/5"
                  >
                    <div className="space-y-3">
                      {/* Cabeçalho do Card */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700/60 uppercase">
                            {contact.department}
                          </span>
                          <h3 className="text-base font-bold text-white mt-1.5 leading-snug">{contact.name}</h3>
                          <p className="text-xs text-slate-400">{contact.role}</p>
                        </div>

                        {contact.isEmergency && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-black uppercase tracking-wider flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                            24x7
                          </span>
                        )}
                      </div>

                      {/* Ramal em Destaque */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-teal-400" />
                          <span className="text-xs text-slate-400 font-medium">Ramal Interno:</span>
                        </div>
                        <span className="font-mono font-black text-teal-300 text-base bg-teal-950/60 px-3 py-1 rounded-xl border border-teal-500/30">
                          {contact.extension}
                        </span>
                      </div>

                      {/* Informações Complementares */}
                      {contact.notes && (
                        <p className="text-[11px] text-slate-400 bg-slate-900/90 rounded-xl p-2.5 border border-slate-800/60 leading-relaxed">
                          {contact.notes}
                        </p>
                      )}
                    </div>

                    {/* Botões de Ação Direta */}
                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone.replace(/\D/g, '')}`}
                          className="flex-1 min-w-[110px] py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700 text-[11px]"
                          title="Fazer ligação"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-400" />
                          <span>{contact.phone}</span>
                        </a>
                      )}

                      {contact.whatsapp && (
                        <a
                          href={`https://wa.me/55${contact.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/30 text-[11px]"
                          title="Conversar no WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className="w-full py-2 px-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-800 text-[11px]"
                          title="Enviar E-mail"
                        >
                          <Mail className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="truncate">{contact.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SEÇÃO 3: MANUAIS & DOCUMENTAÇÃO MARKDOWN                      */}
        {/* ============================================================ */}
        {activeTab === 'manuais' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar: Lista de Manuais */}
            <div className="lg:col-span-4 space-y-4 print:hidden">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    Manuais de Operação & POPs
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    {filteredDocs.length} DOCS
                  </span>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={docSearch}
                    onChange={(e) => setDocSearch(e.target.value)}
                    placeholder="Filtrar manuais..."
                    className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                  {docsLoading ? (
                    <div className="py-8 text-center text-xs text-slate-500 space-y-2">
                      <RefreshCw className="w-4 h-4 animate-spin mx-auto text-cyan-400" />
                      <span>Carregando manuais...</span>
                    </div>
                  ) : filteredDocs.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                      Nenhum manual encontrado.
                    </div>
                  ) : (
                    filteredDocs.map((doc) => {
                      const isSelected = selectedSlug === doc.slug;
                      return (
                        <button
                          key={doc.slug}
                          onClick={() => setSelectedSlug(doc.slug)}
                          className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-cyan-500/15 border border-cyan-500/40 text-white font-bold'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                          }`}
                        >
                          <FileText
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isSelected ? 'text-cyan-400' : 'text-slate-600'
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="truncate">{doc.title}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                              {doc.slug}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Painel Central: Visualizador do Manual */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 print:border-none print:p-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:hidden">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    MANUAL HOMOLOGADO // NUVV TELECOM
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {selectedDoc?.title || 'Selecione um manual'}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintPdf}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Exportar ou Imprimir em PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Exportar / Imprimir em PDF</span>
                  </button>
                </div>
              </div>

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

        {/* ============================================================ */}
        {/* SEÇÃO 4: APRESENTAÇÕES DE TREINAMENTO                        */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Treinamento Geral de Produtos */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                      10 SLIDES // VISÃO GERAL & COMBOS
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
                      Treinamento Geral
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Visão unificada de todo o portfólio Nuvv: Fibra Residencial, Conectividade PME e Dedicada,
                    Telefonia & PABX, Segurança Guard e a Matriz Completa de Combos.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Portfólio 360°</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Matriz de Combos</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Argumentos-Chave</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/treinamento/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20"
                  >
                    <span>Abrir Apresentação Geral</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Treinamento Residencial */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      7 SLIDES // B2C RESIDENCIAL
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                      Fibra Residencial
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Planos de 500 Mega, 800 Mega e 1 Giga com Wi-Fi 6 incluso. Argumentos para gamers, famílias com
                    muitos dispositivos e vantagens do streaming sem travar.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">500M / 800M / 1G</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Wi-Fi 6 Grátis</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">App Parametrizado</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/treinamento/residencial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <span>Abrir Apresentação Residencial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Treinamento Corporativo (PME + Dedicado) */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      8 SLIDES // B2B EMPRESAS & LINKS DEDICADOS
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                      Empresas & Dedicado
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Internet PME para comércio e escritórios, além de Links Dedicados com SLA 99,9%, 100% de garantia de
                    banda, BGP e suporte prioritário de engenharia.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">SLA 4 Horas</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">IP Fixo V4/V6</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Dupla Abordagem</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/treinamento/corporativo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Abrir Apresentação Corporativo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 4: Treinamento Telefonia & PABX Nuvem */}
              <div className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all group hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      7 SLIDES // VOZ FIXA & PABX EM NUVEM
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                      Telefonia & PABX
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Voz digital SIP Trunk, ramais móveis no smartphone, URA de atendimento, gravação de chamadas e
                    portabilidade numérica sem perda de linha telefônica.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">PABX Nuvem</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">SIP Trunk 30 Canais</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">Softphone App</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href="/treinamento/telefonia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                  >
                    <span>Abrir Apresentação Telefonia</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
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
        © 2026 Nuvv Telecom. Portal do Colaborador: Manuais, Arquivos, Treinamento & Ramais. Uso exclusivo interno.
      </footer>
    </div>
  );
};
