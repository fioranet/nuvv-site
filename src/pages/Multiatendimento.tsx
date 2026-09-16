import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  Layers,
  Bot,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Star,
  ChevronDown,
  PhoneCall,
  Laptop,
  Check,
  TrendingUp,
  Award,
  Globe,
  Radio,
  Smartphone,
  CheckSquare,
  QrCode,
  Send,
  Bell,
  MessageCircle,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import { MultiAtendimentoTabsShowcase } from '../components/multiatendimento/MultiAtendimentoTabsShowcase';
import { MultiAtendimentoPricing } from '../components/multiatendimento/MultiAtendimentoPricing';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import {
  MULTIATENDIMENTO_METRICS,
  MULTIATENDIMENTO_CORE_FEATURES,
  ADVANCED_CHANNELS_AND_FEATURES,
  MULTIATENDIMENTO_TESTIMONIALS,
  MULTIATENDIMENTO_FAQS,
  INTEGRATION_LOGOS,
} from '../data/multiatendimentoData';
import { siteConfig } from '../data/siteConfig';

interface MultiatendimentoPageProps {
  currentCity?: string;
  onOpenSpeedTest?: () => void;
  onOpenCitySelector?: () => void;
  onOpenLeadModal?: (planOrServiceName?: string) => void;
}

export const Multiatendimento: React.FC<MultiatendimentoPageProps> = ({
  currentCity = 'Suzano',
  onOpenSpeedTest,
  onOpenCitySelector,
  onOpenLeadModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const multiSlides = [
    {
      image: '/images/services/multiatendimento_hero.png',
      title: 'WhatsApp Multi-Operador Ativo',
      subtitle: 'CRM Kanban & Flow Builder IA',
      badge: 'Meta Oficial',
      tag: 'OMNICHANNEL & CRM',
    },
    {
      image: '/images/services/smart_communication.png',
      title: 'Chatbot IA & Agente de Voz',
      subtitle: 'Atendimento Automático 24/7',
      badge: 'IA Integrada',
      tag: 'AUTOMAÇÃO NO-CODE',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % multiSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, multiSlides.length]);

  const handleOpenLead = (title: string = 'Nuvv Multiatendimento') => {
    if (onOpenLeadModal) {
      onOpenLeadModal(`Nuvv Multiatendimento - ${title}`);
    } else {
      const text = `Olá! Gostaria de testar o Nuvv Multiatendimento (${title}) para minha empresa em ${currentCity}.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Nuvv Multiatendimento em ${currentCity} | WhatsApp Multi-Atendente & CRM com IA`}
        description={`Plataforma de Atendimento e CRM Multi-Canal em ${currentCity}: Conecte múltiplos atendentes em 1 único número de WhatsApp, Instagram e Facebook. Construtor de fluxo no-code e Agentes IA de Voz.`}
        keywords={[
          `multiatendimento whatsapp ${currentCity}`,
          'multiplos atendentes whatsapp empresas',
          'crm whatsapp kanban',
          'chatbot no-code automacao whatsapp',
          'agente ia voz whatsapp',
          'plataforma atendimento omnichannel',
          'software gestao whatsapp business api',
        ]}
        canonicalUrl="https://nuvv.com.br/multiatendimento"
        cityName={currentCity}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-5 pb-8 sm:pt-6 sm:pb-10 border-b border-emerald-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              {/* Top Navigation & Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <Link
                  to="/empresarial"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Soluções</span>
                </Link>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Multi-Atendente & IA</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>API Oficial Meta</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Todo o seu atendimento em um só lugar. <br className="hidden sm:inline" />
                <span className="text-gradient-green">
                  Múltiplos atendentes, um único número.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Centralize <strong>WhatsApp, Instagram e Facebook</strong>. Escale suas vendas com nosso CRM integrado, construtor de fluxos no-code e atendimento automatizado por Inteligência Artificial.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleOpenLead('Teste Grátis 7 Dias')}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Começar Teste Grátis de 7 Dias</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenLead('Agendar Demonstração')}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-emerald-200 transition-all text-center active:scale-98 cursor-pointer"
                >
                  Agendar Demonstração ao Vivo
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-2.5 grid grid-cols-4 gap-2 border-t border-emerald-100 max-w-lg mx-auto lg:mx-0 text-left">
                {MULTIATENDIMENTO_METRICS.map((m, idx) => (
                  <div key={idx}>
                    <span className="font-black text-sm sm:text-base text-emerald-600 block">{m.value}</span>
                    <span className="text-[10px] text-gray-500 font-medium leading-tight block">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Mockup Visual Card (Slideshow) */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {multiSlides.map((slide, idx) => (
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
                      <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Slideshow Indicators */}
                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {multiSlides.map((_, i) => (
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

      {/* Integrations Ticker */}
      <section className="py-8 bg-slate-900 border-y border-slate-800 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Funciona com as ferramentas e canais que sua empresa já usa
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {INTEGRATION_LOGOS.map((item, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-gray-200 flex items-center space-x-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{item.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Showcase (4 Modules: Inbox, Flow Builder, Campaigns, Voice AI) */}
      <MultiAtendimentoTabsShowcase onOpenDemo={handleOpenLead} />

      {/* Core 4 Features Grid */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full">
              Ecossistema Completo
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark mt-3 tracking-tight">
              Uma plataforma, todas as funcionalidades para seu time
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Elimine a desorganização de vários celulares e ganhe controle total de todas as conversas comerciais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {MULTIATENDIMENTO_CORE_FEATURES.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-slate-50 border border-gray-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-black text-nuvv-dark">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenLead(item.title)}
                  className="pt-3 border-t border-gray-200 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1 transition-colors"
                >
                  <span>Ver demonstração</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Channels & Exclusive Features (9 Specialized Cards) */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1 rounded-full">
              Poder de Integração
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Canais, Automações e Recursos Exclusivos
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tudo o que sua empresa precisa para escalar a comunicação no WhatsApp e Redes Sociais com máxima estabilidade e conformidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ADVANCED_CHANNELS_AND_FEATURES.map((item) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Smartphone,
                Instagram: InstagramIcon,
                Zap,
                CheckSquare,
                QrCode,
                ShieldCheck,
                Send,
                Bell,
                MessageCircle,
              };
              const IconComponent = iconMap[item.iconName] || MessageSquare;

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-950/40 transition-all">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs font-bold text-emerald-400 block mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenLead(item.title)}
                    className="pt-3 border-t border-slate-800/80 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition-colors"
                  >
                    <span>Saiba mais sobre {item.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full">
              Resultados Reais
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark mt-3 tracking-tight">
              Amado por mais de 50.000 equipes
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Veja como nossos clientes transformaram seu atendimento no WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {MULTIATENDIMENTO_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <span className="font-bold text-xs text-nuvv-dark block">{t.name}</span>
                    <span className="text-[11px] text-gray-400">{t.role} • {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (3 Tiers) */}
      <MultiAtendimentoPricing onSelectPlan={handleOpenLead} />

      {/* Final Action CTA Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-nuvv-dark via-slate-900 to-emerald-950 p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-500/20">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                Comece em 2 Minutos
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                Pronto para expandir seu negócio?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Junte-se a milhares de empresas que aumentaram suas vendas e organizaram seu atendimento no WhatsApp com o Nuvv Multiatendimento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => handleOpenLead('CTA Banner')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Testar Grátis Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Accordion */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full">
              Tire suas Dúvidas
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-nuvv-dark mt-2">
              Perguntas que recebemos o tempo todo
            </h3>
          </div>

          <div className="space-y-3">
            {MULTIATENDIMENTO_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-nuvv-dark hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Carousel */}
      <PartnerCarousel />

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
