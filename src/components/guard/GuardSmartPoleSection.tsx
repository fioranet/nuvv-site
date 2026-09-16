import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Eye,
  Camera,
  Wifi,
  Users,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Building2,
  Home,
  Store,
  MapPin,
  Megaphone,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface GuardSmartPoleSectionProps {
  onOpenLeadModal?: (serviceName: string) => void;
}

export const GuardSmartPoleSection: React.FC<GuardSmartPoleSectionProps> = ({
  onOpenLeadModal,
}) => {
  const [activeImage, setActiveImage] = useState<'condominio' | 'mapa'>('condominio');
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide contínuo e suave entre as duas imagens reais
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 'condominio' ? 'mapa' : 'condominio'));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleOpenWhatsApp = () => {
    const text =
      'Olá! Gostaria de saber mais sobre o Poste de Monitoramento Inteligente da Nuvv e solicitar um projeto.';
    window.open(
      `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const handleRequestQuote = () => {
    if (onOpenLeadModal) {
      onOpenLeadModal('Poste de Monitoramento Inteligente Nuvv');
    } else {
      handleOpenWhatsApp();
    }
  };

  return (
    <section
      id="poste-inteligente"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-nuvv-purple/20"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nuvv-purple/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-nuvv-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-nuvv-green bg-emerald-950/80 border border-nuvv-green/40 px-3.5 py-1 rounded-full inline-flex items-center gap-2 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-nuvv-green" />
            INFRAESTRUTURA INTELIGENTE DE SEGURANÇA
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Poste de Monitoramento{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-300 to-indigo-300">
              Inteligente Nuvv.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Mais segurança onde as pessoas vivem, circulam e trabalham. Um mesmo sistema com diferentes formas de levar monitoramento profissional para condomínios, ruas, empresas e espaços públicos.
          </p>
        </div>

        {/* Main Summary Card Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl shadow-nuvv-purple/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column with Auto-alternating Real Images */}
            <div
              className="lg:col-span-5 space-y-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-nuvv-purple/40 shadow-xl bg-slate-950 min-h-[360px] sm:min-h-[400px] flex items-center justify-center">
                
                {/* Image 1: Condominio */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeImage === 'condominio'
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src="/images/services/poste_nuvv_condominio.jpg"
                    alt="Poste de Monitoramento Nuvv em frente a Condomínio"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-nuvv-green/40 flex items-center space-x-1.5 z-20">
                    <span className="w-2 h-2 rounded-full bg-nuvv-green animate-ping" />
                    <span className="text-[10px] font-bold text-white">Vigilância Ostensiva</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-xs z-20">
                    <div className="font-bold text-white flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-nuvv-green" />
                      <span>Rua e Calçada Monitorada</span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Imagens liberadas para condôminos e moradores
                    </div>
                  </div>
                </div>

                {/* Image 2: App Map */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeImage === 'mapa'
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src="/images/services/poste_nuvv_mapa_app.jpg"
                    alt="Mapa do App Nuvv Guard no Celular"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-nuvv-purple/40 flex items-center space-x-1.5 z-20">
                    <Smartphone className="w-3 h-3 text-nuvv-purple" />
                    <span className="text-[10px] font-bold text-white">App Nuvv Guard</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-xs z-20">
                    <div className="font-bold text-white flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-nuvv-purple" />
                      <span>Rede de Postes Conectada</span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Acompanhamento em tempo real no mapa
                    </div>
                  </div>
                </div>

              </div>

              {/* Mini toggle buttons */}
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveImage('condominio')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all border cursor-pointer ${
                      activeImage === 'condominio'
                        ? 'bg-nuvv-purple text-white border-nuvv-purple'
                        : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                  >
                    1. No Condomínio
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage('mapa')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all border cursor-pointer ${
                      activeImage === 'mapa'
                        ? 'bg-nuvv-purple text-white border-nuvv-purple'
                        : 'bg-white/5 text-gray-400 border-white/10'
                    }`}
                  >
                    2. No Mapa do App
                  </button>
                </div>

                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-nuvv-green" />
                  <span>Auto-slide 5s</span>
                </div>
              </div>
            </div>

            {/* Content Column: 4 Scenarios & Viability Summary */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Câmeras 360° • 100% Fibra Óptica • Wi-Fi • Gravação em Nuvem
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Um projeto completo sob medida para a sua região
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-normal">
                  Você não contrata apenas um "poste com câmera". A Nuvv entrega um projeto completo com equipamentos profissionais, transmissão de dados dedicada e acompanhamento pelo App Nuvv Guard.
                </p>
              </div>

              {/* 4 Quick Scenarios Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Building2 className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                    <span>🏢 Condomínios & Vilas</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Vigilância de áreas internas, portarias e calçadas externas para todos os condôminos.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Home className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                    <span>🏘️ Ruas & Bairros</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Vizinhos se organizam em conjunto para proteger as esquinas e frentes das casas.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Store className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>🏪 Corredores Comerciais</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Lojas e empresas dividem a infraestrutura para proteger clientes e funcionários.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>🏙️ Espaços de Convivência</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Praças e áreas públicas com monitoramento, Wi-Fi aberto e opções de parceria Nuvv.
                  </p>
                </div>
              </div>

              {/* Formas de Viabilizar */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-gray-400 font-bold uppercase">Como viabilizar:</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-medium">1. Contratação Direta</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-nuvv-green font-medium">2. Rateio entre Moradores</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-medium">3. Parceria Nuvv</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/postes"
                  className="px-6 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-nuvv-purple/25 cursor-pointer"
                >
                  <span>Conhecer Página Completa do Poste</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="px-6 py-3.5 rounded-2xl bg-nuvv-green hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-nuvv-green/20 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950" />
                  <span>Solicitar Proposta de Implantação</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
