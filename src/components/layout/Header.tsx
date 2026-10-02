import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  ExternalLink,
  Wifi,
  Phone,
  MessageSquare,
  ShieldCheck,
  Send,
  Bot,
  FileText,
  Network,
  Radio,
  Sliders,
  Sparkles,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Building2,
  Home,
  Check,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface HeaderProps {
  currentCity: string;
  onOpenCitySelector: () => void;
  onOpenLeadModal: (planName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onOpenCitySelector,
  onOpenLeadModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>('conectividade');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Estrutura dos Três Pilares com dados estritamente existentes no projeto
  const solutionsCategories = [
    {
      id: 'conectividade',
      title: 'Conectividade',
      subtitle: 'Infraestrutura de rede e alta disponibilidade',
      color: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Wifi,
      items: [
        {
          name: 'Banda Larga Empresarial',
          path: '/empresarial?categoria=banda-larga#planos-empresa',
          description: 'Fibra óptica corporativa com Wi-Fi 6 e estabilidade',
          icon: Wifi,
          badge: 'PJ',
        },
        {
          name: 'Link Semi-Dedicado',
          path: '/empresarial?categoria=semi-dedicado#planos-empresa',
          description: 'IP Fixo /32, CIR de 70% e SLA corporativo de 12h',
          icon: Network,
          badge: 'IP Fixo',
        },
        {
          name: 'Link Dedicado 1:1',
          path: '/empresarial?categoria=link-dedicado#planos-empresa',
          description: '100% de garantia simétrica Full-Duplex e SLA 4h',
          icon: Radio,
          badge: 'Carrier Grade',
        },
      ],
    },
    {
      id: 'comunicacao',
      title: 'Comunicação',
      subtitle: 'Voz, mensageria e automação empresarial',
      color: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: MessageSquare,
      items: [
        {
          name: 'PABX em Nuvem',
          path: '/pabx',
          description: 'Ramais virtuais no PC ou celular, URA e gravações',
          icon: PhoneCall,
        },
        {
          name: 'Telefonia IP Empresarial',
          path: '/telefonia',
          description: 'Linha digital no app com Push e Tronco SIP corporativo',
          icon: Phone,
        },
        {
          name: 'Mensageria SMS & RCS',
          path: '/mensageria',
          description: 'Disparos oficiais com selo verificado e mídia rica',
          icon: Send,
        },
        {
          name: 'Agente IA de Voz 24/7',
          path: '/agente-ia-voz',
          description: 'Atendimento telefônico humanizado sem filas',
          icon: Bot,
          badge: 'IA',
        },
      ],
    },
    {
      id: 'solucoes-digitais',
      title: 'Soluções Digitais',
      subtitle: 'Segurança, Wi-Fi e inteligência de atendimento',
      color: 'text-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Sparkles,
      items: [
        {
          name: 'Hotspot Wi-Fi Social',
          path: '/social-wifi',
          description: 'Wi-Fi para clientes com login social e LGPD',
          icon: Wifi,
        },
        {
          name: 'Segurança Digital',
          path: '/seguranca-digital',
          description: 'Proteção corporativa Kaspersky contra ransomware',
          icon: ShieldCheck,
        },
        {
          name: 'Multiatendimento',
          path: '/multiatendimento',
          description: 'Vários atendentes no mesmo WhatsApp com CRM Kanban',
          icon: MessageSquare,
        },
      ],
    },
  ];

  // Identificação do Contexto da Rota
  const isEmpresarial =
    location.pathname.startsWith('/empresarial') ||
    location.pathname.startsWith('/empresas') ||
    location.pathname.startsWith('/corporativo') ||
    location.pathname.startsWith('/pabx') ||
    location.pathname.startsWith('/telefonia') ||
    location.pathname.startsWith('/social-wifi') ||
    location.pathname.startsWith('/multiatendimento') ||
    location.pathname.startsWith('/seguranca-digital') ||
    location.pathname.startsWith('/mensageria') ||
    location.pathname.startsWith('/agente-ia-voz');

  const isResidencial =
    location.pathname.startsWith('/residencial') ||
    location.pathname === '/monte-seu-combo' ||
    location.pathname === '/residencial/monte-seu-combo';

  const isSobre =
    location.pathname === '/sobre' ||
    location.pathname === '/sobre-nos';

  const isSuporte =
    location.pathname.startsWith('/suporte');

  const isSolutionsActive =
    location.pathname.startsWith('/pabx') ||
    location.pathname.startsWith('/telefonia') ||
    location.pathname.startsWith('/social-wifi') ||
    location.pathname.startsWith('/multiatendimento') ||
    location.pathname.startsWith('/seguranca-digital') ||
    location.pathname.startsWith('/mensageria') ||
    location.pathname.startsWith('/agente-ia-voz') ||
    location.pathname === '/empresas/monte-seu-combo';

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setSolutionsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 180);
  };

  const handleItemClick = (path: string) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const hashPart = path.split('#')[1];
      if (hashPart) {
        setTimeout(() => {
          const el = document.getElementById(hashPart);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 80);
      }
    }
  };

  const handleSpecialistClick = () => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (isEmpresarial) {
      onOpenLeadModal('Consultoria Corporativa B2B - Header');
    } else {
      onOpenLeadModal('Atendimento Especializado - Header');
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      {/* 1. Global Top Utility & Context Switcher Bar */}
      <div
        className={`py-1.5 px-4 text-xs font-medium text-white transition-colors duration-300 ${
          isEmpresarial ? 'bg-slate-900 border-b border-slate-800' : 'bg-nuvv-dark'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Lado Esquerdo: Switcher Explícito de Jornada & Cidade */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[11px] font-bold">
              <Link
                to="/empresarial"
                className={`px-3 py-0.5 rounded-full transition-all flex items-center space-x-1.5 ${
                  isEmpresarial
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>Para Empresas</span>
              </Link>
              <Link
                to="/residencial"
                className={`px-3 py-0.5 rounded-full transition-all flex items-center space-x-1.5 ${
                  isResidencial
                    ? 'bg-nuvv-purple text-white font-black shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Home className="w-3 h-3" />
                <span>Para Você</span>
              </Link>
            </div>

            <span className="hidden sm:inline text-white/20">|</span>

            {/* Cidade / Localização */}
            <div className="hidden sm:flex items-center space-x-1.5 text-white/90">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ofertas para:</span>
              <strong className="uppercase font-bold tracking-wide text-white">{currentCity}</strong>
              <button
                type="button"
                onClick={onOpenCitySelector}
                className="ml-1 flex items-center space-x-0.5 underline text-white/80 hover:text-white transition-opacity font-semibold cursor-pointer"
              >
                <span>Alterar</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Lado Direito: Autoatendimento, 2ª Via & Área do Cliente */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-semibold">
            <Link
              to="/2via"
              className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full transition-all ${
                location.pathname === '/2via' || location.pathname === '/segunda-via'
                  ? 'bg-white/20 text-white font-black'
                  : 'hover:text-emerald-400 text-white/90 hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>2ª Via & PIX</span>
            </Link>

            <span className="text-white/20">|</span>

            <a
              href={siteConfig.areaClienteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-white transition-opacity text-white/90"
            >
              <span>Área do Cliente</span>
              <ExternalLink className="w-3 h-3 text-white/70" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial com subtítulo de posicionamento */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={isEmpresarial ? "/images/external/Nuvv_verde_black(c).png" : "/images/external/nuvv_logo.png"}
              alt="Nuvv - Tecnologia e Telecomunicações"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="hidden xl:inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400 border-l border-slate-200 pl-3 leading-tight">
              Tecnologia &<br />Telecomunicações
            </span>
          </Link>

          {/* Desktop Nav Links (Hierarquia Estratégica) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* 1. Empresas (Hub B2B Principal) */}
            <Link
              to="/empresarial"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/empresarial' || location.pathname === '/empresas'
                  ? 'text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Empresas
            </Link>

            {/* 2. Soluções (Mega Dropdown Organizado pelos 3 Pilares) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                aria-expanded={solutionsDropdownOpen}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isSolutionsActive || solutionsDropdownOpen
                    ? 'text-emerald-800 font-bold bg-emerald-50 border border-emerald-200/80'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>Soluções</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    solutionsDropdownOpen ? 'transform rotate-180 text-emerald-700' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Desktop Mega Dropdown Flyout (3 Pilares Lado a Lado + Monte sua Solução) */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full -left-20 w-[840px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 animate-fade-in z-50">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Portfólio Integrado Corporativo
                      </div>
                      <div className="text-sm font-bold text-nuvv-dark">
                        Conectividade, Comunicação e Soluções Digitais
                      </div>
                    </div>
                    <Link
                      to="/empresas/monte-seu-combo"
                      onClick={() => setSolutionsDropdownOpen(false)}
                      className="inline-flex items-center space-x-1.5 text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Monte sua Solução (Combo)</span>
                    </Link>
                  </div>

                  {/* 3 Colunas dos 3 Pilares */}
                  <div className="grid grid-cols-3 gap-6">
                    {solutionsCategories.map((cat) => {
                      const CatIcon = cat.icon;
                      return (
                        <div key={cat.id} className="space-y-3">
                          <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                            <CatIcon className={`w-4 h-4 ${cat.color}`} />
                            <h4 className="text-xs font-black text-nuvv-dark uppercase tracking-wider">
                              {cat.title}
                            </h4>
                          </div>

                          <div className="space-y-1">
                            {cat.items.map((item) => {
                              const ItemIcon = item.icon;
                              const isCurrent = location.pathname === item.path;

                              return (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => handleItemClick(item.path)}
                                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start space-x-2.5 group cursor-pointer ${
                                    isCurrent
                                      ? 'bg-slate-100 text-nuvv-dark font-bold'
                                      : 'hover:bg-slate-50 text-slate-700 hover:text-nuvv-dark'
                                  }`}
                                >
                                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                                    <ItemIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center space-x-1.5">
                                      <span className="truncate">{item.name}</span>
                                      {item.badge && (
                                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                      {item.description}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rodapé do Mega Menu com CTA consultivo direto */}
                  <div className="mt-5 pt-4 border-t border-gray-100 bg-slate-50/70 -mx-6 -mb-6 p-4 px-6 rounded-b-3xl flex items-center justify-between">
                    <p className="text-xs text-slate-600">
                      Precisa de um projeto de telecomunicações desenhado para sua infraestrutura?
                    </p>
                    <button
                      type="button"
                      onClick={handleSpecialistClick}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Falar com um Consultor de Engenharia</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Para Você (Residencial isolado) */}
            <Link
              to="/residencial"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isResidencial
                  ? 'text-nuvv-purple font-bold bg-indigo-50/70 border border-indigo-100'
                  : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
              }`}
            >
              Para Você
            </Link>

            {/* 4. Sobre Nós (Institucional de Alto Posicionamento) */}
            <Link
              to="/sobre"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isSobre
                  ? 'text-nuvv-purple font-bold bg-indigo-50/70 border border-indigo-100'
                  : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
              }`}
            >
              Sobre Nós
            </Link>

            {/* 5. Suporte */}
            <Link
              to="/suporte"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isSuporte
                  ? 'text-nuvv-purple font-bold bg-indigo-50/70 border border-indigo-100'
                  : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
              }`}
            >
              Suporte
            </Link>
          </nav>

          {/* Desktop Right CTA - Consultivo B2B */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              type="button"
              onClick={handleSpecialistClick}
              className="px-6 py-2.5 rounded-xl text-sm font-black bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-400/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>Falar com especialista</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={handleSpecialistClick}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 shadow-sm"
            >
              Especialista
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-nuvv-dark hover:bg-gray-100 cursor-pointer"
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Drawer Menu com Hierarquia dos 3 Pilares */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Seletor de Cidade Mobile */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <button
              type="button"
              onClick={() => {
                onOpenCitySelector();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cidade: <strong>{currentCity}</strong> (Alterar)</span>
            </button>
          </div>

          {/* Switcher Rápido de Contexto Mobile */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <Link
              to="/empresarial"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 text-center text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
                isEmpresarial ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Empresas</span>
            </Link>
            <Link
              to="/residencial"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 text-center text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
                isResidencial ? 'bg-white text-nuvv-purple shadow-xs' : 'text-slate-600'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Para Você</span>
            </Link>
          </div>

          {/* Links Principais Mobile */}
          <div className="flex flex-col space-y-1">
            <Link
              to="/empresarial"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === '/empresarial' || location.pathname === '/empresas'
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Empresas (Visão Geral B2B)
            </Link>

            {/* Acordeão Mobile de Soluções com os 3 Pilares */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden my-1">
              <div className="px-3 py-2.5 bg-slate-50 font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200/80 flex items-center justify-between">
                <span>Soluções por Categoria</span>
                <Link
                  to="/empresas/monte-seu-combo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[11px] font-black text-emerald-700 underline"
                >
                  Monte sua Solução
                </Link>
              </div>

              {solutionsCategories.map((cat) => {
                const isExpanded = mobileExpandedCategory === cat.id;
                const CatIcon = cat.icon;
                return (
                  <div key={cat.id} className="border-b last:border-b-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMobileExpandedCategory(isExpanded ? null : cat.id)}
                      className="w-full px-3 py-2.5 flex items-center justify-between text-sm font-bold text-slate-800 hover:bg-slate-50 text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <CatIcon className={`w-4 h-4 ${cat.color}`} />
                        <span>{cat.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'transform rotate-180 text-emerald-700' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-2 bg-slate-50 space-y-1 border-t border-slate-100">
                        {cat.items.map((item) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => handleItemClick(item.path)}
                            className="w-full text-left p-2 rounded-xl bg-white border border-slate-100 hover:border-emerald-500/40 flex items-center space-x-2.5"
                          >
                            <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="leading-tight">
                              <div className="text-xs font-bold text-slate-900">{item.name}</div>
                              <div className="text-[10px] text-slate-500 line-clamp-1">{item.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              to="/residencial"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                isResidencial
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Para Você (Residencial)
            </Link>

            <Link
              to="/sobre"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                isSobre
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Sobre Nós
            </Link>

            <Link
              to="/suporte"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                isSuporte
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Suporte & Atendimento
            </Link>
          </div>

          {/* Botões de Ação do Mobile Drawer */}
          <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2">
            <button
              type="button"
              onClick={handleSpecialistClick}
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-center shadow-md flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar com Especialista</span>
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                'Olá! Gostaria de conversar com a equipe da Nuvv sobre soluções empresariais.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-700 font-semibold text-center flex items-center justify-center space-x-2 border border-slate-200 text-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direto</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
