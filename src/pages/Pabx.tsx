import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { pabxServiceSchema } from '../data/seoSchemas';
import { PABX_PLANS, PabxPlan } from '../data/businessPlans';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import {
  Cloud,
  Check,
  Smartphone,
  PhoneCall,
  ShieldCheck,
  Headphones,
  Zap,
  ArrowRight,
  ArrowLeft,
  Phone,
  Layers,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface PabxPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Pabx: React.FC<PabxPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'small' | 'corp'>('all');
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const pabxSlides = [
    {
      image: '/images/pabx/pabx_cloud_hero.png',
      title: 'Central Telefônica Ativa',
      subtitle: 'URA & Gravação em Nuvem',
      badge: 'SLA 99.9%',
      tag: 'NUVV VOICE CLOUD',
    },
    {
      image: '/images/pabx/dashboard_1.png',
      title: 'Painel Web & Softphone',
      subtitle: 'Ramais no Celular e Computador',
      badge: 'Gestão em Tempo Real',
      tag: 'APP IOS & ANDROID',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % pabxSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, pabxSlides.length]);

  const filteredPlans = PABX_PLANS.filter((plan) => {
    if (selectedFilter === 'small') {
      return ['pabx-2', 'pabx-5', 'pabx-10'].includes(plan.id);
    }
    if (selectedFilter === 'corp') {
      return ['pabx-20', 'pabx-30', 'pabx-50', 'pabx-100'].includes(plan.id);
    }
    return true;
  });

  const allFeatures = [
    'Gravação de chamadas em Nuvem',
    'Secretária virtual – URA personalizada',
    'Reach me - Siga-me inteligente',
    'Chat interno corporativo com troca de arquivos',
    'Transferência de chamadas assistida e direta',
    'Música de chamadas em espera personalizada',
    'Grupos de captura e busca de ramais',
    'Transbordos inteligentes de chamadas',
    'Histórico detalhado de chamadas e gravações',
    'Sala de Conferência virtual',
    'Videoconferência integrada em HD',
    'Multidispositivo (Android, iOS, Windows, Mac)',
    'Correio de voz integrado ao aplicativo',
    'Handoff - Troca de dispositivo durante a chamada',
    'Fila de Atendimento com métricas em tempo real',
    'Painel Web de monitoramento em tempo real de ramais',
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="PABX Virtual Cloud Inteligente para Empresas | Nuvv Voice"
        description="Modernize a telefonia da sua empresa com PABX em Nuvem Nuvv. 2 a 100+ ramais virtuais no celular e PC, gravação de chamadas, URA inteligente e planos a partir de R$ 59,90/mês."
        keywords={[
          'pabx virtual',
          'pabx em nuvem',
          'telefonia voip empresas',
          'ramais no celular',
          'ura de atendimento',
          'pabx cloud suzano',
        ]}
        canonicalUrl="https://nuvv.com.br/pabx"
        schema={pabxServiceSchema}
      />

      {/* PABX Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-indigo-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/empresarial"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Soluções</span>
                </Link>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-nuvv-purple text-xs font-bold shadow-2xs">
                  <Cloud className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>NUVV VOICE CLOUD</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                PABX Virtual Inteligente para <br />
                <span className="text-gradient-hero">Empresas Modernas.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Transforme o atendimento da sua empresa com nossa plataforma em nuvem. Ramais no celular, gravação automática, URA profissional e planos sob medida de 2 a mais de 100 ramais.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#planos-pabx"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-md shadow-nuvv-purple/30 transition-all text-center active:scale-98"
                >
                  Conhecer Planos PABX
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de uma demonstração do PABX Virtual Cloud da Nuvv.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-indigo-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  <Phone className="w-4 h-4 text-nuvv-purple" />
                  <span>Agendar Demonstração</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-indigo-100 text-xs text-gray-700 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="font-black text-base text-nuvv-purple block">2 a 100+</span>
                  <span className="text-[11px] text-gray-500">Ramais Virtuais</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">100% Cloud</span>
                  <span className="text-[11px] text-gray-500">Zero Aparelho Físico</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-600 block">HD Voice</span>
                  <span className="text-[11px] text-gray-500">Qualidade Cristalina</span>
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
                {pabxSlides.map((slide, idx) => (
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
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-indigo-300 border border-white/10">
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
                      <span className="text-[10px] font-black text-nuvv-green bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Slideshow Indicators */}
                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {pabxSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        heroSlide === i ? 'w-5 bg-nuvv-green' : 'w-1.5 bg-white/40 hover:bg-white/70'
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

      {/* 4 Pillars Header */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Mobilidade Total',
                desc: 'Atenda seu ramal no App (iOS/Android) ou Computador em qualquer lugar do mundo.',
                icon: Smartphone,
              },
              {
                title: 'Portabilidade Grátis',
                desc: 'Mantenha seu número fixo atual de qualquer operadora sem custos.',
                icon: PhoneCall,
              },
              {
                title: 'Gravação em Nuvem',
                desc: 'Segurança jurídica e auditoria de chamadas gravadas com armazenamento seguro.',
                icon: ShieldCheck,
              },
              {
                title: 'URA Flexível',
                desc: 'Crie menus de autoatendimento profissionais com múltiplos níveis e horários.',
                icon: Headphones,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-nuvv-dark mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 sm:py-24 bg-slate-50/60" id="planos-pabx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Tabela Oficial de Planos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-3">
              Planos PABX Virtual Cloud
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Escolha a quantidade de ramais necessária para sua empresa. Upgrade ou downgrade a qualquer momento sem burocracia.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[
                { id: 'all', label: 'Todos os Planos' },
                { id: 'small', label: 'Iniciais (2 a 10 Ramais)' },
                { id: 'corp', label: 'Médias & Grandes (20 a 100 Ramais)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedFilter === tab.id
                      ? 'bg-nuvv-purple text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between transition-all bg-white ${
                  plan.isPopular
                    ? 'border-nuvv-purple shadow-nuvv-hover ring-2 ring-nuvv-purple/30 md:-translate-y-1'
                    : 'border-gray-200 shadow-sm hover:shadow-md hover:border-nuvv-purple/40'
                }`}
              >
                <div>
                  <div className="min-h-[28px] mb-2">
                    {plan.badge && (
                      <span className="text-[10px] font-extrabold text-white bg-nuvv-purple px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-nuvv-dark">{plan.name}</h3>
                  <p className="text-xs font-bold text-nuvv-purple mb-1">{plan.extensionCount}</p>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">{plan.targetAudience}</p>

                  <div className="mb-4 pb-4 border-b border-gray-100 whitespace-nowrap">
                    <span className="text-2xl sm:text-3xl font-black text-nuvv-dark">
                      R$&nbsp;{plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold ml-1">/mês</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-gray-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenLeadModal(`PABX Virtual - ${plan.name} (R$ ${plan.price.toFixed(2).replace('.', ',')}/mês)`)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 ${
                    plan.isPopular
                      ? 'bg-nuvv-purple text-white hover:bg-nuvv-purple-hover shadow-nuvv-purple/30'
                      : 'bg-nuvv-dark text-white hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            ))}

            {/* Custom Enterprise Card (Acima de 100 Ramais) */}
            <div className="rounded-3xl p-6 border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50/70 to-purple-50/50 flex flex-col justify-between transition-all hover:border-nuvv-purple">
              <div>
                <div className="min-h-[28px] mb-2">
                  <span className="text-[10px] font-extrabold text-nuvv-purple bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block border border-indigo-200">
                    PROJETOS ESPECIAIS
                  </span>
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Acima de 100 Ramais</h3>
                <p className="text-xs font-bold text-nuvv-purple mb-1">Capacidade Ilimitada</p>
                <p className="text-xs text-gray-500 mb-4">Para grandes corporações, hospitais, contact centers e operações multilocais.</p>

                <div className="mb-4 pb-4 border-b border-indigo-100/80">
                  <span className="text-2xl font-black text-nuvv-purple">Consulte</span>
                  <span className="text-xs text-gray-500 font-medium block mt-0.5">Engenharia personalizada</span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs text-gray-700">
                  {[
                    'Servidores dedicados de alta disponibilidade',
                    'Troncos SIP com centenas de canais simultâneos',
                    'Integração profunda com SAP, Salesforce e CRMs',
                    'SLA de Atendimento em até 4 horas com NOC dedicado',
                    'Treinamento presencial/remoto de toda a equipe',
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-nuvv-purple flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de consultar um projeto corporativo de PABX Virtual com mais de 100 ramais.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-nuvv-purple text-white hover:bg-nuvv-purple-hover text-center shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
              >
                <span>Falar com Especialista</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Adicionais & Tarifas */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-nuvv-dark flex items-center space-x-2">
                <Zap className="w-5 h-5 text-nuvv-purple" />
                <span>Adicionais e Tarifas Transparentes</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Sem contratos engessados. Adicione ramais e números virtuais conforme sua demanda e acompanhe o consumo em tempo real pelo portal.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                  <span className="text-xs text-gray-500 block font-semibold">Ramal Adicional</span>
                  <span className="text-lg font-black text-nuvv-purple whitespace-nowrap">R$&nbsp;14,90</span>
                  <span className="text-xs text-gray-500"> /mês por ramal</span>
                </div>
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                  <span className="text-xs text-gray-500 block font-semibold">Número Virtual (DID)</span>
                  <span className="text-lg font-black text-nuvv-purple whitespace-nowrap">R$&nbsp;19,90</span>
                  <span className="text-xs text-gray-500"> /mês por número</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0">
              <img
                src="/images/pabx/dashboard_3.png"
                alt="Painel PABX Nuvv"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Included Features */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark">
              Todos os Recursos Inclusos na Plataforma
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Sem taxas extras por funcionalidades essenciais de produtividade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto">
            {allFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex items-center space-x-3 text-xs font-semibold text-gray-800">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Telephony / IP Hardware Carousel */}
      <RecommendedDevicesSection
        category="telefonia"
        badge="Hardware Homologado"
        title="Telefones IP & ATAs Homologados para seu PABX"
        subtitle="Aparelhos VoIP, adaptadores ATA e roteadores multi-WAN testados para máxima qualidade de voz e estabilidade nos ramais Nuvv."
      />

      <PartnerCarousel />

      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
