import React, { useState, useEffect } from 'react';
import {
  Video,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Server,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface VisionHeroProps {
  onScrollToCalculator: () => void;
}

export const VisionHero: React.FC<VisionHeroProps> = ({ onScrollToCalculator }) => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const visionSlides = [
    {
      image: '/images/services/security_office_hero.png',
      tag: 'AO VIVO • NUVV VISION CLOUD',
      title: 'Câmera 01 - Entrada Principal',
      subtitle: 'Gravando em nuvem • Data Center São Paulo',
      res: '1080p Full HD',
      status: 'ONLINE',
    },
    {
      image: '/images/services/security_hero.png',
      tag: 'MONITORAMENTO COM IA',
      title: 'Câmera 02 - Perímetro & Garagem',
      subtitle: 'Detecção inteligente de pessoas e veículos',
      res: 'Smart 2K HD',
      status: 'GRAVANDO',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % visionSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, visionSlides.length]);

  const handleOpenWhatsApp = () => {
    const text = 'Olá! Gostaria de saber mais sobre o Nuvv Vision (CFTV em Nuvem) e solicitar um orçamento.';
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/50">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline and Badges */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
                <Video className="w-3.5 h-3.5 text-emerald-600" />
                <span>NUVV VISION • CFTV EM NUVEM</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
              Suas câmeras conectadas direto à nuvem, <br />
              <span className="text-gradient-green">sem complicação de rede.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Monitore sua casa ou empresa com gravação contínua em Data Center Nacional. <strong>Sem abrir portas no roteador</strong>, sem pagar por IP fixo e com suas imagens 100% salvas mesmo se o gravador ou a câmera forem danificados.
            </p>

            {/* 4 Core Value Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-bold text-gray-800">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Conexão Direta</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Ao Vivo Grátis</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Zero Portas</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Server className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Data Center Brasil</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
              >
                <span>Calcular Meu Plano</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Falar com Especialista</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Camera Feed Mockup Card (Slideshow) */}
          <div
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group aspect-[4/3]">
              {visionSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    heroSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <div className="p-4 bg-slate-950/90 border-b border-white/10 flex items-center justify-between z-20 relative">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold text-gray-200">{slide.tag}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {slide.status}
                    </span>
                  </div>

                  <div className="relative h-[calc(100%-115px)] bg-slate-950 overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">{slide.title}</span>
                        <span className="text-emerald-400 font-mono font-bold">{slide.res}</span>
                      </div>
                      <div className="text-[11px] text-gray-300 mt-0.5">
                        {slide.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 grid grid-cols-3 gap-2 text-center text-xs z-20 relative border-t border-white/5">
                    <div className="p-1.5 bg-slate-900/80 rounded-xl border border-white/5">
                      <span className="text-[9px] text-gray-400 block font-semibold">ACESSO</span>
                      <span className="text-emerald-400 font-bold text-[11px]">Ilimitado</span>
                    </div>
                    <div className="p-1.5 bg-slate-900/80 rounded-xl border border-white/5">
                      <span className="text-[9px] text-gray-400 block font-semibold">GRAVAÇÃO</span>
                      <span className="text-white font-bold text-[11px]">24h Nuvem</span>
                    </div>
                    <div className="p-1.5 bg-slate-900/80 rounded-xl border border-white/5">
                      <span className="text-[9px] text-gray-400 block font-semibold">APP</span>
                      <span className="text-white font-bold text-[11px]">iOS / Android</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Slideshow Indicators */}
              <div className="absolute top-4 right-20 z-30 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                {visionSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      heroSlide === i ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
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
  );
};
