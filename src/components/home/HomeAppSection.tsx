import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  QrCode,
  Headphones,
  FileSignature,
  Wifi,
  Gift,
  Sparkles,
  Download,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export type AppScreenId =
  | 'inicio'
  | 'notas'
  | 'faturas'
  | 'pix'
  | 'suporte'
  | 'contratos'
  | 'wifi'
  | 'indique';

interface AppScreen {
  id: AppScreenId;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

export const HomeAppSection: React.FC = () => {
  const [activeScreenId, setActiveScreenId] = useState<AppScreenId>('inicio');
  const [isHovered, setIsHovered] = useState(false);

  const screens: AppScreen[] = [
    {
      id: 'inicio',
      title: 'Tela Inicial Inteligente',
      subtitle: 'Plano ativo, próxima fatura e velocidade contratada logo na abertura',
      badge: 'Painel Central',
      image: '/images/apps/screens/1.png',
      icon: LayoutDashboard,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/20',
    },
    {
      id: 'notas',
      title: 'Notas Fiscais',
      subtitle: 'Consulta e download das notas fiscais dos seus serviços',
      badge: 'Notas Fiscais',
      image: '/images/apps/screens/2.png',
      icon: Receipt,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
    },
    {
      id: 'faturas',
      title: 'Faturas & Histórico',
      subtitle: 'Histórico de faturas, valores e status de pagamento detalhado',
      badge: 'Financeiro',
      image: '/images/apps/screens/3.png',
      icon: CreditCard,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
    },
    {
      id: 'pix',
      title: 'Pagar com Pix',
      subtitle: 'Cópia rápida de chave Pix e QR Code para pagamento instantâneo',
      badge: 'Pix Instantâneo',
      image: '/images/apps/screens/4.png',
      icon: QrCode,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
    },
    {
      id: 'suporte',
      title: 'Suporte Integrado',
      subtitle: 'Atendimento ágil, diagnóstico de conexão e chamados técnicos',
      badge: 'Atendimento',
      image: '/images/apps/screens/5.png',
      icon: Headphones,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
    },
    {
      id: 'contratos',
      title: 'Contratos & Termos',
      subtitle: 'Documentos e assinatura digital com total validade jurídica',
      badge: 'Segurança & Legal',
      image: '/images/apps/screens/6.png',
      icon: FileSignature,
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/20',
    },
    {
      id: 'wifi',
      title: 'Minha Internet (Wi-Fi)',
      subtitle: 'Troca de nome (SSID) e senha do Wi-Fi direto pelo celular',
      badge: 'Gestão da Rede',
      image: '/images/apps/screens/7.jpg',
      icon: Wifi,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20',
    },
    {
      id: 'indique',
      title: 'Indique e Ganhe',
      subtitle: 'Indique amigos e ganhe descontos automáticos na sua fatura',
      badge: 'Programa Amigo',
      image: '/images/apps/screens/8.jpg',
      icon: Gift,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/20',
    },
  ];

  // Carrossel automático: avança para a próxima tela a cada 3.5 segundos (pausa se hovered)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveScreenId((currentId) => {
        const currentIndex = screens.findIndex((s) => s.id === currentId);
        const nextIndex = (currentIndex + 1) % screens.length;
        return screens[nextIndex].id;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, screens.length]);

  const activeScreen = screens.find((s) => s.id === activeScreenId) || screens[0];

  return (
    <section
      className="py-14 sm:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-nuvv-purple/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto bg-slate-900/85 rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl backdrop-blur-md">
          
          {/* Left Column: App Info, 8 Interactive Screen Buttons & Store Links */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-nuvv-purple/20 border border-nuvv-purple/40 text-indigo-300 text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
              <span>APLICATIVO OFICIAL NUVV</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Controle total da sua conexão{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-300 to-emerald-400">
                na palma da sua mão.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              O <strong>App Nuvv</strong> foi projetado para entregar autonomia e agilidade real. Navegue pelas funcionalidades abaixo ou acompanhe a demonstração automática:
            </p>

            {/* 8 Interactive Screen Tabs (4x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {screens.map((screen) => {
                const Icon = screen.icon;
                const isActive = activeScreenId === screen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setActiveScreenId(screen.id)}
                    className={`p-3 rounded-2xl text-left transition-all flex items-start space-x-3 cursor-pointer group relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-nuvv-purple to-indigo-600 text-white shadow-lg shadow-nuvv-purple/30 ring-2 ring-white/30'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl flex-shrink-0 transition-transform group-hover:scale-105 ${
                        isActive ? 'bg-white/20 text-white' : `${screen.iconBg} ${screen.iconColor}`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-black tracking-tight block leading-tight truncate">
                        {screen.title}
                      </span>
                      <span
                        className={`text-[10px] block leading-tight mt-1 line-clamp-1 ${
                          isActive ? 'text-indigo-100 font-medium' : 'text-gray-400'
                        }`}
                      >
                        {screen.subtitle}
                      </span>
                    </div>

                    {/* Active pulse bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-indigo-300 to-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Store Download Buttons Row */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
              <a
                href={siteConfig.appGooglePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="text-[9px] text-gray-400 leading-none">Baixar no</div>
                  <div className="text-xs font-black leading-tight">Google Play</div>
                </div>
              </a>

              <a
                href={siteConfig.appAppleStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <div className="text-left">
                  <div className="text-[9px] text-gray-400 leading-none">Baixar na</div>
                  <div className="text-xs font-black leading-tight">App Store</div>
                </div>
              </a>

              <a
                href={siteConfig.areaClienteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-nuvv-purple hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-nuvv-purple/20"
              >
                <span>Central Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Smartphone Mockup with Auto-Cycling Screens */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Frame */}
            <div className="w-[260px] sm:w-[285px] aspect-[720/1543] bg-slate-950 rounded-[44px] p-2.5 border-[5px] border-slate-700/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/20 relative group">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-950" />
              </div>

              {/* Screen Display Container */}
              <div className="w-full h-full bg-slate-950 rounded-[34px] overflow-hidden relative border border-white/5 shadow-inner">
                {screens.map((screen) => {
                  const isActive = activeScreenId === screen.id;
                  return (
                    <div
                      key={screen.id}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                          : 'opacity-0 scale-98 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={screen.image}
                        alt={screen.title}
                        className="w-full h-full object-cover select-none"
                        loading="eager"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Floating Active Badge on Mockup */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 rounded-full bg-slate-900/95 border border-white/20 text-[10px] font-black text-indigo-200 shadow-xl backdrop-blur-md whitespace-nowrap flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeScreen.badge}</span>
              </div>
            </div>

            {/* Pagination Indicators for Carousel Sequence */}
            <div className="mt-6 flex items-center space-x-1.5">
              {screens.map((screen) => {
                const isActive = activeScreenId === screen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setActiveScreenId(screen.id)}
                    aria-label={screen.title}
                    className={`transition-all rounded-full h-1.5 cursor-pointer ${
                      isActive
                        ? 'w-6 bg-emerald-400'
                        : 'w-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
