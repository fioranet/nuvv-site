import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface SocialWifiHeroProps {
  onScrollToFeatures: () => void;
  onScrollToPlans: () => void;
}

export const SocialWifiHero: React.FC<SocialWifiHeroProps> = ({
  onScrollToFeatures,
  onScrollToPlans,
}) => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 2);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  const handleOpenWhatsApp = () => {
    const text = 'Olá! Gostaria de saber mais sobre o Hotspot Wi-fi Social da Nuvv e solicitar uma demonstração para meu estabelecimento.';
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-indigo-100/50">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headlines & Value Props */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-nuvv-purple text-xs font-black tracking-wider uppercase shadow-2xs">
                <Wifi className="w-3.5 h-3.5 text-nuvv-purple" />
                <span>NUVV HOTSPOT WI-FI SOCIAL • MARKETING & VENDAS</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
              Transforme seu Wi-Fi em um <br />
              <span className="text-gradient-hero">canal de marketing e vendas.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Ofereça internet rápida aos seus clientes e receba em troca <strong>leads qualificados (WhatsApp, E-mail, Aniversário)</strong>, automações de mensagens, pesquisas de satisfação e mais avaliações 5 estrelas no Google.
            </p>

            {/* 4 Value Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-bold text-gray-800">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                <span>Captura Leads</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                <span>Automação</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                <span>Google Reviews</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>100% LGPD</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onScrollToPlans}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-md shadow-nuvv-purple/30 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
              >
                <span>Ver Planos e Valores</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-indigo-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-nuvv-purple" />
                <span>Solicitar Demonstração</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase (Slideshow) */}
          <div
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
              {/* Slide 0: Interactive Portal Card */}
              <div
                className={`absolute inset-0 p-4 space-y-3 transition-all duration-1000 ease-in-out ${
                  heroSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-200">PORTAL CAPTIVE CUSTOMIZADO</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    +1.842 VISITANTES
                  </span>
                </div>

                {/* Mockup Card */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-white/10 space-y-2.5">
                  <div className="p-2.5 bg-gradient-to-r from-nuvv-purple to-indigo-800 rounded-xl text-center text-white space-y-0.5">
                    <span className="text-[9px] text-indigo-200 uppercase font-bold tracking-wider">Wi-Fi Gratuito</span>
                    <h4 className="text-xs font-black">Conecte-se e ganhe 10% OFF hoje</h4>
                  </div>

                  <div className="space-y-1.5">
                    <div className="p-2 bg-slate-900 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-gray-400 text-[11px]">Login via WhatsApp</span>
                      <span className="text-emerald-400 font-bold text-[11px]">1 Clique</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-gray-400 text-[11px]">Login via Google</span>
                      <span className="text-blue-400 font-bold text-[11px]">Conectar</span>
                    </div>
                  </div>

                  <div className="w-full py-2 bg-nuvv-purple text-white text-center rounded-xl text-xs font-black shadow-md">
                    Conectar ao Wi-Fi
                  </div>
                </div>

                {/* Bottom live stats */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-1.5 bg-slate-950/80 rounded-xl border border-white/5">
                    <span className="text-[9px] text-gray-400 block font-semibold">LEADS</span>
                    <span className="text-emerald-400 font-bold text-[11px]">+2.800/mês</span>
                  </div>
                  <div className="p-1.5 bg-slate-950/80 rounded-xl border border-white/5">
                    <span className="text-[9px] text-gray-400 block font-semibold">ROAS</span>
                    <span className="text-white font-bold text-[11px]">3.2x Médio</span>
                  </div>
                  <div className="p-1.5 bg-slate-950/80 rounded-xl border border-white/5">
                    <span className="text-[9px] text-gray-400 block font-semibold">AVALIAÇÕES</span>
                    <span className="text-amber-400 font-bold text-[11px]">4.9 ★★★★★</span>
                  </div>
                </div>
              </div>

              {/* Slide 1: Real-time Dashboard Graphic */}
              <div
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  heroSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img
                  src="/images/services/social_wifi_hero.png"
                  alt="Dashboard Wi-Fi Marketing Nuvv"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-indigo-300 border border-white/10">
                    DASHBOARD EM TEMPO REAL
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="font-black text-white block">Automação de Disparos</span>
                      <span className="text-[10px] text-emerald-300">Mensagens de Pós-Venda & Aniversário</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                    98% Abertura
                  </span>
                </div>
              </div>

              {/* Slideshow Indicators */}
              <div className="absolute top-4 right-4 z-30 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      heroSlide === i ? 'w-5 bg-nuvv-purple' : 'w-1.5 bg-white/40 hover:bg-white/70'
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
