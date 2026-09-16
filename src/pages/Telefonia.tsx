import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { telephonyServiceSchema } from '../data/seoSchemas';
import { TELEPHONY_PLANS } from '../data/businessPlans';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import { PhoneCall, Check, ArrowLeft, ShieldCheck, Zap, PhoneForwarded, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface TelefoniaPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Telefonia: React.FC<TelefoniaPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const telephonySlides = [
    {
      image: '/images/services/telephony_sip_hero.png',
      title: 'Tronco SIP Conectado',
      subtitle: 'Portabilidade Numérica Ativa',
      badge: 'Codec G.711 HD',
      tag: 'TRONCO SIP CORPORATIVO',
    },
    {
      image: '/images/services/business_scheduling_meet.png',
      title: 'Atendimento & 0800 Nacional',
      subtitle: 'Qualidade de Áudio Cristalina',
      badge: 'SLA 99.9%',
      tag: 'VOZ HD EM FIBRA',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % telephonySlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, telephonySlides.length]);

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Telefonia IP Corporativa, Linhas Fixas e Tronco SIP | Nuvv Voice"
        description="Linhas fixas digitais corporativas, Tronco SIP e 0800 com qualidade de voz HD via fibra óptica. Portabilidade gratuita e tarifas econômicas."
        keywords={[
          'telefonia fixa corporativa',
          'tronco sip',
          'linha digital empresas',
          'portabilidade numero fixo',
          'voip empresarial',
        ]}
        canonicalUrl="https://nuvv.com.br/telefonia"
        schema={telephonyServiceSchema}
      />
      {/* Telefonia Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & Actions */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/empresarial"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Soluções</span>
                </Link>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NUVV VOICE SOLUTIONS</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Telefonia IP Corporativa <br />
                <span className="text-gradient-green">Inteligente e Econômica.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Linhas fixas digitais (DID), Troncos SIP e 0800 com qualidade de áudio cristalina via fibra óptica. Portabilidade numérica gratuita e redução drástica de custos para sua empresa.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#planos-telefonia"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all text-center active:scale-98"
                >
                  Ver Planos de Linha Fixa
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar sobre Troncos SIP e Telefonia Fixa Corporativa da Nuvv.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  <span>Falar com Consultor</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-emerald-100 text-xs text-gray-700 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="font-black text-base text-emerald-600 block">0800 & DID</span>
                  <span className="text-[11px] text-gray-500">Números Nacionais</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">SIP Trunk</span>
                  <span className="text-[11px] text-gray-500">Ilimitado Brasil</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-700 block">Fibra Óptica</span>
                  <span className="text-[11px] text-gray-500">Codec G.711 HD</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card (Slideshow) */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {telephonySlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      heroSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Top Pill */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
                        {slide.tag}
                      </span>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="font-black text-white block">{slide.title}</span>
                          <span className="text-[10px] text-emerald-300">{slide.subtitle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Slideshow Indicators */}
                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {telephonySlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        heroSlide === i ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 sm:py-24 bg-slate-50/60" id="planos-telefonia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark">
              Planos de Linha Fixa Digital
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Escolha entre linha tarifada econômica ou plano 100% ilimitado para fixo Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {TELEPHONY_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 border flex flex-col justify-between transition-all ${
                  plan.isPopular
                    ? 'bg-nuvv-purple text-white border-nuvv-purple shadow-xl md:-translate-y-2'
                    : 'bg-white text-gray-900 border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black">{plan.name}</h3>
                    {plan.badge && (
                      <span className="text-[10px] font-extrabold bg-amber-400 text-slate-900 px-3 py-1 rounded-full uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100/20">
                    <span className="text-3xl sm:text-4xl font-black">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className={`text-xs font-semibold ${plan.isPopular ? 'text-white/80' : 'text-gray-500'}`}>
                      /mês
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-xs sm:text-sm">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.isPopular ? 'text-nuvv-green' : 'text-emerald-600'}`} />
                        <span className={plan.isPopular ? 'text-white/95' : 'text-gray-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenLeadModal(`Telefonia Fixa - ${plan.name} (R$ ${plan.price.toFixed(2).replace('.', ',')}/mês)`)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-98 ${
                    plan.isPopular
                      ? 'bg-white text-nuvv-purple hover:bg-gray-100'
                      : 'bg-nuvv-dark text-white hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
                  }`}
                >
                  Contratar Linha
                </button>
              </div>
            ))}
          </div>

          {/* Advantages 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-nuvv-dark">Ativação Imediata</h4>
              <p className="text-xs text-gray-500">Linhas novas e ramais ativados no mesmo dia.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center mx-auto mb-3">
                <PhoneForwarded className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-nuvv-dark">Portabilidade 100% Grátis</h4>
              <p className="text-xs text-gray-500">Traga seu número atual sem perder nenhuma ligação.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-nuvv-dark">Voz HD Cristalina</h4>
              <p className="text-xs text-gray-500">Sem chiados, latência ou instabilidade de rede.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended IP Telephony Hardware Carousel */}
      <RecommendedDevicesSection
        category="telefonia"
        badge="Dispositivos Recomendados"
        title="Telefones IP e Adaptadores ATA para Linha Fixa"
        subtitle="Aparelhos VoIP e adaptadores homologados para transformar suas linhas digitais e troncos SIP em alta fidelidade."
      />

      <PartnerCarousel />

      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
