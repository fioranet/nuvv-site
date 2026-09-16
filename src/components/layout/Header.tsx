import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  ExternalLink,
  Eye,
  Phone,
  Wifi,
  MessageSquare,
  ShieldCheck,
  Send,
  Layers,
  Bot,
  FileText,
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
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const solutionLinks: Array<{
    name: string;
    path: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isDirectPage?: boolean;
    leadModalName?: string;
  }> = [
    {
      name: 'Nuvv Guard',
      path: '/guard',
      description: 'Câmeras, interfone virtual e Rastreamento',
      icon: ShieldCheck,
      isDirectPage: true,
    },
    {
      name: 'PABX Virtual',
      path: '/pabx',
      description: 'Telefonia corporativa em nuvem e ramais',
      icon: PhoneCall,
      isDirectPage: true,
    },
    {
      name: 'Telefonia Fixa',
      path: '/telefonia',
      description: 'Planos de voz corporativos e números 0800',
      icon: Phone,
      isDirectPage: true,
    },
    {
      name: 'Hotspot Wi-Fi Social',
      path: '/social-wifi',
      description: 'Wi-Fi inteligente com login social e marketing',
      icon: Wifi,
      isDirectPage: true,
    },
    {
      name: 'Multiatendimento',
      path: '/multiatendimento',
      description: 'WhatsApp e Redes Sociais',
      icon: MessageSquare,
      isDirectPage: true,
    },
    {
      name: 'Segurança Digital',
      path: '/seguranca-digital',
      description: 'Antivírus corporativo e proteção Kaspersky',
      icon: ShieldCheck,
      isDirectPage: true,
    },
    {
      name: 'Comunicação Digital',
      path: '/comunicacao-inteligente',
      description: 'Mensageria e Agentes de Voz IA',
      icon: Bot,
      isDirectPage: true,
    },
  ];

  const mainNavLinks = [
    { name: 'Residencial', path: '/residencial' },
    { name: 'Empresarial', path: '/empresarial' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Suporte', path: '/suporte' },
  ];

  const isEmpresarial =
    location.pathname.startsWith('/empresarial') ||
    location.pathname.startsWith('/empresas') ||
    location.pathname.startsWith('/monte-seu-combo-empresarial') ||
    location.pathname.startsWith('/pabx') ||
    location.pathname.startsWith('/telefonia') ||
    location.pathname.startsWith('/social-wifi') ||
    location.pathname.startsWith('/multiatendimento') ||
    location.pathname.startsWith('/seguranca-digital') ||
    location.pathname.startsWith('/comunicacao-inteligente');

  const isSolutionsActive =
    location.pathname.startsWith('/vision') ||
    location.pathname.startsWith('/pabx') ||
    location.pathname.startsWith('/telefonia') ||
    location.pathname.startsWith('/social-wifi') ||
    location.pathname.startsWith('/multiatendimento') ||
    location.pathname.startsWith('/seguranca-digital') ||
    location.pathname.startsWith('/comunicacao-inteligente');

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setSolutionsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 180);
  };

  const handleSolutionClick = (item: typeof solutionLinks[0]) => {
    setSolutionsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (item.isDirectPage) {
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(item.path);
      if (item.leadModalName) {
        onOpenLeadModal(item.leadModalName);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      {/* Global Top Bar (Utilidades, Cidade & Autoatendimento em 100% das páginas) */}
      <div
        className={`py-1.5 px-4 text-xs font-medium text-white transition-colors ${
          isEmpresarial ? 'bg-emerald-700' : 'bg-nuvv-purple'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Lado Esquerdo: Localização Contextual */}
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 opacity-90" />
            <span className="hidden sm:inline">Você está vendo ofertas para:</span>
            <span className="sm:hidden">Ofertas para:</span>
            <strong className="uppercase font-bold tracking-wide">{currentCity}</strong>
            <button
              onClick={onOpenCitySelector}
              className="ml-2 flex items-center space-x-1 underline hover:text-white/80 transition-opacity font-semibold cursor-pointer"
            >
              <span>Alterar cidade</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Lado Direito: 2ª Via Rápida & Área do Cliente (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 text-xs font-semibold">
            <Link
              to="/2via"
              className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full transition-all ${
                location.pathname === '/2via' || location.pathname === '/segunda-via'
                  ? 'bg-white/20 text-white font-black'
                  : 'hover:text-nuvv-green text-white/90 hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-nuvv-green" />
              <span>2ª Via Rápida & PIX</span>
            </Link>

            <span className="text-white/30">|</span>

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

      {/* Main Navigation Bar (Spacious & Clean) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={isEmpresarial ? "/images/external/Nuvv_verde_black(c).png" : "/images/external/nuvv_logo.png"}
              alt="Nuvv"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links (Spacious & Focused on Commercial Hierarchy) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {/* Residencial */}
            <Link
              to="/residencial"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/residencial'
                  ? 'text-nuvv-purple font-bold bg-indigo-50/70'
                  : 'text-gray-600 hover:text-nuvv-purple hover:bg-gray-50'
              }`}
            >
              Residencial
            </Link>

            {/* Empresarial */}
            <Link
              to="/empresarial"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/empresarial'
                  ? 'text-emerald-600 font-bold bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              Empresarial
            </Link>

            {/* Soluções (Dropdown Menu) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isSolutionsActive || solutionsDropdownOpen
                    ? 'text-nuvv-purple font-bold bg-indigo-50/70'
                    : 'text-gray-600 hover:text-nuvv-purple hover:bg-gray-50'
                }`}
              >
                <span>Soluções</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    solutionsDropdownOpen ? 'transform rotate-180 text-nuvv-purple' : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Desktop Dropdown Flyout */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 space-y-1 animate-fade-in z-50">
                  <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    Soluções Corporativas & Tecnológicas
                  </div>

                  {solutionLinks.map((item) => {
                    const Icon = item.icon;
                    const isCurrent = location.pathname === item.path;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleSolutionClick(item)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start space-x-3 group cursor-pointer ${
                          isCurrent
                            ? 'bg-nuvv-purple/10 text-nuvv-purple'
                            : 'hover:bg-slate-50 text-gray-700 hover:text-nuvv-dark'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isCurrent
                              ? 'bg-nuvv-purple text-white'
                              : 'bg-indigo-50 text-nuvv-purple group-hover:bg-nuvv-purple group-hover:text-white transition-colors'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors flex items-center space-x-1">
                            <span>{item.name}</span>
                          </div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Shop (Clean standard menu format, yellow highlight when active) */}
            <Link
              to="/shop"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/shop'
                  ? 'text-amber-700 font-bold bg-amber-50 border border-amber-200/60'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
              }`}
            >
              Shop
            </Link>

            <Link
              to="/blog"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/blog'
                  ? 'text-nuvv-purple font-bold bg-indigo-50/70'
                  : 'text-gray-600 hover:text-nuvv-purple hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/suporte"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/suporte'
                  ? 'text-nuvv-purple font-bold bg-indigo-50/70'
                  : 'text-gray-600 hover:text-nuvv-purple hover:bg-gray-50'
              }`}
            >
              Suporte
            </Link>
          </nav>

          {/* Desktop Right CTA - Contrate Online (High-Converting Yellow) */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => onOpenLeadModal(isEmpresarial ? 'Proposta Empresarial' : 'Plano Residencial')}
              className="px-6 py-2.5 rounded-xl text-sm font-black bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/25 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              Contrate Online
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => onOpenLeadModal()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-nuvv-purple text-white shadow-sm"
            >
              Assinar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-nuvv-dark hover:bg-gray-100 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <button
              onClick={() => {
                onOpenCitySelector();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg"
            >
              <MapPin className="w-3.5 h-3.5 text-nuvv-purple" />
              <span>Cidade: <strong>{currentCity}</strong> (Alterar)</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <Link
              to="/residencial"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === '/residencial'
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Residencial
            </Link>

            <Link
              to="/empresarial"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === '/empresarial'
                  ? 'bg-emerald-50 text-emerald-600 font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Empresarial
            </Link>

            {/* Mobile Soluções Accordion */}
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full px-3 py-2.5 flex items-center justify-between text-base font-semibold text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-nuvv-purple" />
                  <span>Soluções</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    mobileSolutionsOpen ? 'transform rotate-180 text-nuvv-purple' : ''
                  }`}
                />
              </button>

              {mobileSolutionsOpen && (
                <div className="p-2 bg-slate-50 space-y-1 border-t border-gray-100">
                  {solutionLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleSolutionClick(item)}
                        className="w-full text-left p-2.5 rounded-lg bg-white border border-gray-100 hover:border-nuvv-purple/40 flex items-center space-x-3"
                      >
                        <div className="w-7 h-7 rounded-md bg-indigo-50 text-nuvv-purple flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold text-gray-900">{item.name}</div>
                          <div className="text-[10px] text-gray-500">{item.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === '/shop'
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Shop
            </Link>

            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === '/blog'
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/suporte"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === '/suporte'
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Suporte
            </Link>

            <Link
              to="/2via"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                location.pathname === '/2via' || location.pathname === '/segunda-via'
                  ? 'bg-nuvv-purple/10 text-nuvv-purple font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>2ª Via de Fatura & PIX</span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                PIX
              </span>
            </Link>

            <a
              href={siteConfig.areaClienteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Área do Cliente</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full py-3 rounded-xl bg-nuvv-purple text-white font-semibold text-center shadow-md"
            >
              Assinar Agora
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de tirar dúvidas sobre os planos da Nuvv.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-green-50 text-green-700 font-semibold text-center flex items-center justify-center space-x-2 border border-green-200"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
