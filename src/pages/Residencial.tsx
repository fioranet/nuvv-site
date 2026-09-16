import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { residentialPlansSchema } from '../data/seoSchemas';
import {
  EntertainmentTier,
  ResidentialPlan,
  RESIDENTIAL_PLANS,
  TIER_CONFIG,
  PLAN_ADDONS,
  VisionAddonConfig,
  calculateVisionAddonPrice,
  getGuardSetupDetails,
  resolveTierAndAddons,
} from '../data/plans';
import {
  QuickProfileSelector,
  ResidentialProfileId,
  RESIDENTIAL_PROFILES,
} from '../components/residencial/QuickProfileSelector';
import { PlanSelector } from '../components/residencial/PlanSelector';
import { PlanCard } from '../components/residencial/PlanCard';
import { TelemedicinaSection } from '../components/residencial/TelemedicinaSection';
import { GuardFamilySection } from '../components/residencial/GuardFamilySection';
import { StreamingDevices } from '../components/residencial/StreamingDevices';
import { ValueAddedModals } from '../components/residencial/ValueAddedModals';
import { SuperAppSection } from '../components/common/SuperAppSection';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { Modal } from '../components/common/Modal';
import { FeasibilityModal } from '../components/viabilidade/FeasibilityModal';
import {
  RESIDENTIAL_TAB_OFFERS,
  SPEED_OPTIONS,
  PackageOffer,
  ResidentialTabId,
  SpeedOptionId,
  getPackageDigitalApps,
} from '../data/residentialOffers';
import {
  ArrowRight,
  Wifi,
  Tv,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Cloud,
  Phone,
  HeartPulse,
  ShieldCheck,
  Video,
  Flame,
  Crown,
  Layers,
  Info,
  Check,
} from 'lucide-react';

const RESIDENTIAL_MODAL_CHANNELS: {
  id: ResidentialProfileId;
  label: string;
  badge: string;
  channelsCount: number;
  channelsTitle: string;
  channelsImage: string;
  tier: EntertainmentTier;
}[] = [
    {
      id: 'filmes-series',
      label: 'Mais Cinema',
      badge: 'CINEMA',
      channelsCount: 26,
      channelsTitle: 'Grade de Canais Mais Cinema (26 Canais)',
      channelsImage: '/images/external/cinema.png',
      tier: 'cortesia',
    },
    {
      id: 'completao',
      label: 'Completão',
      badge: 'COMPLETÃO',
      channelsCount: 100,
      channelsTitle: 'Grade de Canais Completão (100+ Canais)',
      channelsImage: '/images/external/completo_elite.png',
      tier: 'completo',
    },
    {
      id: 'esportes',
      label: 'Mais Esportes',
      badge: 'ESPORTES',
      channelsCount: 68,
      channelsTitle: 'Grade de Canais Mais Esportes (68 Canais)',
      channelsImage: '/images/external/tv_power_esporte_clube.png',
      tier: 'essencial',
    },
    {
      id: 'sem-pacote',
      label: 'Cortesia',
      badge: 'CORTESIA',
      channelsCount: 18,
      channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
      channelsImage: '/images/external/tv_cortesia.png',
      tier: 'cortesia',
    },
  ];

import {
  buildComboSummary,
  saveComboSummaryToStorage,
  ComboLeadSummary,
} from '../services/comboSummary';

interface ResidencialPageProps {
  currentCity: string;
  onOpenLeadModal: (planName?: string, summaryData?: ComboLeadSummary | null) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Residencial: React.FC<ResidencialPageProps> = ({
  currentCity,
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      src: '/images/hero/res_1.png',
      alt: 'Nuvv Fibra Residencial Família e Streaming',
      badge: 'Fibra Residencial Ultra',
      tag: 'Jogos, 4K & Conexão Simultânea',
      pill: 'Wi-Fi 6 Grátis',
      topBadge: 'Sinal Ativo & Estável',
    },
    {
      src: '/images/hero/res_2.png',
      alt: 'Conexão Gamer & Entretenimento Nuvv',
      badge: 'Velocidade Real & Baixa Latência',
      tag: 'Streamings, TV ao Vivo & Telemedicina',
      pill: '100% Fibra',
      topBadge: 'Alta Performance',
    },
  ];

  // Auto-advance hero slides every 5.5 seconds unless hovered
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, heroSlides.length]);

  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<ResidentialProfileId>('filmes-series');
  const [selectedTier, setSelectedTier] = useState<EntertainmentTier | null>(null);
  const [activeAddons, setActiveAddons] = useState<Record<string, boolean>>({
    telecine: true,
    hboMax: true,
  });
  const [visionConfig, setVisionConfig] = useState<VisionAddonConfig>({
    planId: null,
    cameraCount: 1,
    withComodato: false,
  });
  const [detailModalPlan, setDetailModalPlan] = useState<ResidentialPlan | null>(null);
  const [channelsModalTier, setChannelsModalTier] = useState<EntertainmentTier | null>(null);
  const [channelsModalProfile, setChannelsModalProfile] = useState<ResidentialProfileId | null>(null);
  const [svaModal, setSvaModal] = useState<'telefonia' | 'nuvvplay' | 'protecao' | null>(null);
  const [isFeasibilityModalOpen, setIsFeasibilityModalOpen] = useState(false);

  // --- NOVO SISTEMA DE VITRINE DINÂMICA DE PLANOS ---
  const [activeTab, setActiveTab] = useState<ResidentialTabId>('destaques');
  const [activeCardCarouselIndex, setActiveCardCarouselIndex] = useState(0);
  const [tabSpeeds, setTabSpeeds] = useState<Record<string, SpeedOptionId>>(() => {
    const initial: Record<string, SpeedOptionId> = {};
    Object.values(RESIDENTIAL_TAB_OFFERS).forEach((offers) => {
      offers.forEach((pkg) => {
        initial[pkg.id] = (pkg.defaultSpeed as SpeedOptionId) || '400';
      });
    });
    return initial;
  });

  const [activeChannelsModal, setActiveChannelsModal] = useState<PackageOffer | null>(null);
  const [activeDetailsModal, setActiveDetailsModal] = useState<PackageOffer | null>(null);
  const [activeMoreAppsModal, setActiveMoreAppsModal] = useState<{
    title: string;
    apps: { name: string; logo: string }[];
  } | null>(null);

  const handleSpeedToggle = (pkgId: string, speedId: SpeedOptionId) => {
    setTabSpeeds((prev) => ({
      ...prev,
      [pkgId]: speedId,
    }));
  };

  const calculateOfferPrice = (pkg: PackageOffer, speedId: SpeedOptionId) => {
    const speedOpt = SPEED_OPTIONS.find((s) => s.id === speedId) || SPEED_OPTIONS[0];
    const promoPrice = pkg.basePrice400M + speedOpt.priceOffset;
    const originalPrice = pkg.originalBasePrice + speedOpt.priceOffset;
    return { promoPrice, originalPrice, speedOpt };
  };

  const effectiveTier: EntertainmentTier = selectedTier || 'cortesia';

  const handleSelectProfile = (profileId: ResidentialProfileId) => {
    setSelectedProfile(profileId);
    const profile = RESIDENTIAL_PROFILES[profileId];
    if (profile) {
      if (profile.tierKey === 'cortesia') {
        setSelectedTier(null);
      } else {
        setSelectedTier(profile.tierKey);
      }
      const nextAddons: Record<string, boolean> = {};
      profile.includedAddonKeys.forEach((key) => {
        nextAddons[key] = true;
      });
      setActiveAddons(nextAddons);
    }
  };

  const handleSelectTier = (newTier: EntertainmentTier | null) => {
    const prevTierKey = selectedTier || 'cortesia';
    const newTierKey = newTier || 'cortesia';
    const prevIncluded = TIER_CONFIG[prevTierKey]?.includedAddons || [];
    const newIncluded = TIER_CONFIG[newTierKey]?.includedAddons || [];

    setSelectedTier(newTier);
    setActiveAddons((prev) => {
      const next = { ...prev };
      // Remove addons that were only included in the previous tier
      prevIncluded.forEach((id) => {
        if (!newIncluded.includes(id)) {
          delete next[id];
        }
      });
      // Add addons included in the new tier
      newIncluded.forEach((id) => {
        next[id] = true;
      });
      return next;
    });
  };

  const handleToggleAddon = (key: string) => {
    setActiveAddons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectPlan = (plan: ResidentialPlan, totalPrice: number) => {
    const summary = buildComboSummary({
      plan,
      effectiveTier,
      activeAddons,
      visionConfig,
      totalPrice,
      cityName: currentCity,
    });

    saveComboSummaryToStorage(summary);
    onOpenLeadModal(summary.rawSummary, summary);
  };

  const currentPricing = detailModalPlan ? detailModalPlan.tierPricing[effectiveTier] : null;

  // Dynamic list of apps & streamings for the modal
  const modalAppsList = React.useMemo(() => {
    if (!detailModalPlan) return [];
    const tierPricing = detailModalPlan.tierPricing[effectiveTier];
    const items: Array<{
      id: string;
      name: string;
      description: string;
      logo?: string;
      category?: string;
    }> = [];
    const seenIds = new Set<string>();

    // Descriptions dictionary
    const appDescriptions: Record<string, string> = {
      watch: 'Filmes, séries e TV linear.',
      awdio: 'Audiobooks, podcasts e conteúdos em áudio.',
      'canais globo': 'Todos os Canais Abertos e Fechados.',
      globo: 'Todos os Canais Abertos e Fechados.',
      telecine: '+ 6 canais e filmes on-demand.',
      hbomax: 'Filmes, séries exclusivas e esportes ao vivo.',
      'hbo max': 'Filmes, séries exclusivas e esportes ao vivo.',
      paramount: 'Filmes e séries de sucesso.',
      'paramount+': 'Filmes e séries de sucesso.',
      premiere: 'Brasileirão A e B ao vivo com o melhor do futebol.',
      combate: 'O canal 100% dedicado aos esportes de combate.',
    };

    // 1. Apps from base tier
    tierPricing.includedApps.forEach((app) => {
      const lowerName = app.name.toLowerCase();
      const desc =
        appDescriptions[lowerName] ||
        (lowerName.includes('globo') ? 'Todos os Canais Abertos e Fechados.' : 'Filmes, séries e conteúdos sob demanda.');
      seenIds.add(lowerName);
      items.push({
        id: app.name,
        name: app.name,
        description: desc,
        logo: app.logo,
      });
    });

    // 2. Active Addons
    Object.entries(activeAddons)
      .filter(([_, active]) => active)
      .forEach(([key]) => {
        const addon = PLAN_ADDONS[key];
        if (!addon) return;
        const lowerName = addon.name.toLowerCase();
        if (seenIds.has(lowerName) || seenIds.has(addon.id.toLowerCase())) return;
        seenIds.add(lowerName);

        items.push({
          id: addon.id,
          name: addon.name,
          description: addon.description,
          logo: addon.logo,
          category: addon.category,
        });
      });

    // 3. Vision Addons if configured
    if (
      visionConfig.planId ||
      visionConfig.cameraPlanId ||
      visionConfig.intercomPlanId ||
      visionConfig.tagPlanId ||
      visionConfig.withComodato
    ) {
      if (
        visionConfig.cameraPlanId ||
        (visionConfig.planId &&
          (visionConfig.planId.includes('camera') ||
            visionConfig.planId.includes('byod')))
      ) {
        const camCount = Math.max(1, visionConfig.cameraCount || 1);
        items.push({
          id: 'vision-camera',
          name: `Nuvv Guard (${camCount}x Câmera${camCount > 1 ? 's' : ''})`,
          description: 'Gravação contínua na nuvem e monitoramento ao vivo no App Nuvv Guard.',
          category: 'vision',
        });
      }
      if (
        visionConfig.intercomPlanId ||
        (visionConfig.planId && visionConfig.planId.includes('intercom'))
      ) {
        items.push({
          id: 'vision-intercom',
          name: 'Interfone Virtual QR Code',
          description: 'Receba chamadas de vídeo dos visitantes no app Nuvv Guard.',
          category: 'vision',
        });
      }
      if (
        visionConfig.tagPlanId ||
        (visionConfig.planId && visionConfig.planId.includes('tag'))
      ) {
        const tCount = Math.max(1, visionConfig.tagCount || 1);
        items.push({
          id: 'vision-tag',
          name: `TAG de Rastreamento (${tCount}x)`,
          description: 'Localização de objetos, chaves e pets no app Nuvv Guard.',
          category: 'vision',
        });
      }
    }

    return items;
  }, [detailModalPlan, effectiveTier, activeAddons, visionConfig]);

  const addonTotal = React.useMemo(() => {
    const regularAddons = Object.entries(activeAddons)
      .filter(([_, active]) => active)
      .map(([k]) => {
        const isIncluded = TIER_CONFIG[effectiveTier]?.includedAddons?.includes(k);
        if (isIncluded) return 0;
        return PLAN_ADDONS[k]?.price || 0;
      })
      .reduce((acc, price) => acc + price, 0);
    const visionTotal = calculateVisionAddonPrice(visionConfig);
    return regularAddons + visionTotal;
  }, [activeAddons, visionConfig, effectiveTier]);

  const guardSetup = React.useMemo(() => getGuardSetupDetails(visionConfig), [visionConfig]);

  const modalPromoPrice = detailModalPlan
    ? Number((detailModalPlan.tierPricing[effectiveTier].promoPrice + addonTotal).toFixed(2))
    : 0;

  const modalOriginalPrice = Number((modalPromoPrice + 20.00).toFixed(2));

  // Real representative channels for ticker
  const channelList = [
    'HBO Max', 'Telecine', 'Universal+', 'ESPN', 'SporTV', 'Discovery',
    'Band', 'Globo', 'SBT', 'Discovery Kids', 'Record', 'CNN Brasil', 'TNT', 'Globo News',
    'AMC', 'N Sports', 'Megapix', 'MultShow', 'History Channel', 'National Geographic',
    'Sony One', 'TNT Series', 'h&h', 'GNT', 'Gloob', 'Adult Swim'
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Planos de Internet Fibra Residencial de até 1 Giga em ${currentCity} | Nuvv Fibra`}
        description={`Conheça os planos 100% fibra óptica da Nuvv em ${currentCity}. Ultravelocidade de até 1 Giga com Wi-Fi 6, TV ao vivo e streaming no App Watch, Telemedicina 24h, Max, Telecine e câmeras Nuvv Guard.`}
        keywords={[
          `planos de internet ${currentCity}`,
          `fibra residencial ${currentCity}`,
          `internet banda larga ${currentCity}`,
          'internet 1 giga fibra',
          'internet com tv e streaming',
          'app watch tv fibra',
          'plano 800 mega fibra',
          'telemedicina 24h internet',
          'nuvv guard residencial',
        ]}
        canonicalUrl="https://nuvv.com.br/residencial"
        schema={residentialPlansSchema}
        cityName={currentCity}
      />
      {/* Residencial Hero - Vibrant, Colorful & High-Converting Retail Telecom Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-100/90 via-purple-50/80 to-emerald-50/85 pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-indigo-100/60">
        {/* Background Decorative Ambient Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-nuvv-purple/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1.2px,transparent_1.2px)] [background-size:22px_22px] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Sales Copy & High Energy CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-nuvv-purple/40 text-nuvv-purple text-xs font-black uppercase tracking-wider shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-nuvv-purple fill-current" />
                  <span>100% FIBRA ÓPTICA EM {currentCity.toUpperCase()}</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-500/40 text-emerald-800 text-xs font-bold shadow-2xs">
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Wi-Fi 6 de Alta Performance</span>
                </span>
              </div>

              {/* Punchy Sales Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                A internet definitiva para a sua casa.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">
                  Sem limites.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Ultra conexão de até <strong>800 Mega</strong> com estabilidade de ponta a ponta. Jogos sem lag, múltiplos dispositivos conectados em 4K e telemedicina 24h inclusa para toda a sua família.
              </p>

              {/* Selling Bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-bold text-gray-800">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Instalação Grátis</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Wi-Fi Incluso</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Telemedicina 24h</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>100+ Canais</span>
                </span>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#planos"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-nuvv-purple/30 transition-all active:scale-98"
                >
                  <span>Conhecer Planos a partir de R$ 99,90</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsFeasibilityModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-gray-900 font-bold text-sm border-2 border-indigo-200/80 hover:border-nuvv-purple transition-all flex items-center justify-center space-x-2 shadow-2xs active:scale-98 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-nuvv-purple" />
                  <span>Consultar Cobertura</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Slideshow Carousel */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {heroSlides.map((slide, idx) => {
                  const isActive = currentHeroSlide === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isActive
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 pointer-events-none z-0'
                        }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Top Badge */}
                      <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 flex items-center space-x-2 text-xs shadow-lg">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="font-bold text-white">{slide.topBadge}</span>
                      </div>

                      {/* Floating Bottom Card */}
                      <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs shadow-xl">
                        <div className="space-y-0.5">
                          <span className="font-black text-white block">{slide.badge}</span>
                          <span className="text-[11px] text-emerald-300">{slide.tag}</span>
                        </div>
                        <span className="text-[11px] font-black text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
                          {slide.pill}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Carousel Navigation Indicators */}
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentHeroSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`transition-all rounded-full ${currentHeroSlide === idx
                        ? 'w-6 h-1.5 bg-emerald-400'
                        : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Animated Channels Ticker Bar */}
      <div className="bg-slate-900 text-gray-300 py-3.5 border-y border-white/10 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center space-x-8 animate-scroll w-max whitespace-nowrap">
          {[...channelList, ...channelList, ...channelList].map((channel, idx) => (
            <div key={idx} className="flex items-center space-x-2 px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors">
                {channel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Plans Section - Novo Modelo de Vitrine com Abas e Carrossel Mobile */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 bg-gradient-to-b from-slate-50/80 via-purple-50/20 to-white relative overflow-hidden" id="planos">
        {/* Glow de fundo sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-nuvv-purple/5 to-transparent pointer-events-none blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative">
          {/* Cabeçalho da Vitrine de Planos */}
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/10 border border-nuvv-purple/20 text-nuvv-purple text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-nuvv-purple" />
              <span>VITRINE DE PLANOS • 100% FIBRA ÓPTICA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              O que você e sua família vão <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">curtir de verdade</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Marcas consagradas e os streamings que você já ama com a ultravelocidade e estabilidade da fibra Nuvv.
            </p>
          </div>

          {/* Seletor de Abas por Nível de TV & Ofertas (Scroll horizontal no mobile com fácil leitura e toque) */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 px-1 max-w-full sm:flex-wrap sm:justify-center">
              {[
                { id: 'destaques', label: 'Super Ofertas', sublabel: 'Combos Prontos', icon: Sparkles },
                { id: 'completo', label: 'Completo', sublabel: 'Grade Máxima', icon: Crown },
                { id: 'essencial', label: 'Essencial', sublabel: 'Filmes & Séries', icon: Tv },
                { id: 'basico', label: 'Básico', sublabel: 'Super Econômico', icon: Layers },
                { id: 'internet', label: 'Só Fibra', sublabel: 'TV Cortesia', icon: Wifi },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as ResidentialTabId);
                      setActiveCardCarouselIndex(0);
                    }}
                    className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex-shrink-0 ${isSelected
                      ? 'bg-nuvv-dark text-white shadow-md ring-2 ring-nuvv-dark scale-102'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-2xs hover:scale-101'
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-nuvv-purple text-white' : 'bg-slate-100 text-nuvv-purple'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block leading-tight">{tab.label}</span>
                      <span
                        className={`text-[10px] font-medium block ${isSelected ? 'text-slate-300' : 'text-slate-400'
                          }`}
                      >
                        {tab.sublabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subtítulo dinâmico explicativo da categoria selecionada */}
            <div className="text-center text-xs text-slate-500 font-medium max-w-xl mx-auto px-4">
              {activeTab === 'destaques' && (
                <span>⭐ Combos prontos mais vantajosos com os melhores streamings e descontos inclusos.</span>
              )}
              {activeTab === 'completo' && (
                <span>👑 Grade máxima de canais ao vivo com Premiere, Combate e opção de Telecine.</span>
              )}
              {activeTab === 'essencial' && (
                <span>🎯 Canais populares da TV por assinatura com opções modulares de Telecine ou HBO Max.</span>
              )}
              {activeTab === 'basico' && (
                <span>💡 Grade essencial com canais abertos e variedades pelo menor custo mensal.</span>
              )}
              {activeTab === 'internet' && (
                <span>🚀 Ultravelocidade pura 100% fibra óptica com Wi-Fi incluso e 18 canais cortesia.</span>
              )}
            </div>
          </div>

          {/* Grid de Cards (Carrossel com snap no mobile / Grid no desktop) */}
          {(() => {
            const activeOffers = RESIDENTIAL_TAB_OFFERS[activeTab] || RESIDENTIAL_TAB_OFFERS.destaques;
            const gridLayoutClass =
              activeOffers.length === 1
                ? 'max-w-md mx-auto'
                : activeOffers.length === 2
                  ? 'flex md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-6 px-4 md:px-0 scrollbar-none items-stretch'
                  : 'flex md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-2 pb-6 px-4 md:px-0 scrollbar-none items-stretch';

            return (
              <div className="space-y-4">
                <div
                  className={gridLayoutClass}
                  onScroll={(e) => {
                    const scrollLeft = (e.target as HTMLElement).scrollLeft;
                    const width = (e.target as HTMLElement).clientWidth;
                    const index = Math.round(scrollLeft / (width * 0.85));
                    if (index >= 0 && index < activeOffers.length) {
                      setActiveCardCarouselIndex(index);
                    }
                  }}
                >
                  {activeOffers.map((pkg) => {
                    // SE FOR ABA SÓ FIBRA: Cards tradicionais focados em velocidade
                    if (activeTab === 'internet') {
                      const is800 = pkg.defaultSpeed === '800';
                      const speedNumber = is800 ? '800' : '400';
                      const promoPrice = pkg.basePrice400M;
                      const originalPrice = pkg.originalBasePrice;
                      const discount = originalPrice - promoPrice;

                      return (
                        <div
                          key={`res-plan-${pkg.id}`}
                          className={`w-[85vw] sm:w-[350px] md:w-auto snap-center flex-shrink-0 md:flex-shrink rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 relative border ${is800
                            ? 'border-nuvv-purple shadow-xl ring-2 ring-nuvv-purple/30 md:-translate-y-2'
                            : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-500/40'
                            }`}
                        >
                          {/* Badge de Destaque Superior para 800M */}
                          {is800 && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md ring-2 ring-white">
                                <Sparkles className="w-3.5 h-3.5 fill-current" />
                                <span>MAIS ESCOLHIDO • DOBRO DE VELOCIDADE</span>
                              </span>
                            </div>
                          )}

                          {/* BLOCO SUPERIOR: VELOCIDADE HERO EM DESTAQUE TRADICIONAL */}
                          <div className={`p-6 pb-5 rounded-t-3xl ${is800 ? 'bg-gradient-to-b from-purple-50/70 via-indigo-50/20 to-transparent' : 'bg-gradient-to-b from-emerald-50/60 via-slate-50/30 to-transparent'} text-center space-y-2`}>
                            <div className="flex items-center justify-between">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white border ${is800 ? 'border-purple-200 text-nuvv-purple' : 'border-emerald-200 text-emerald-700'} shadow-2xs`}>
                                {pkg.badge}
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveDetailsModal(pkg)}
                                className="text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                                title="Ver especificações e benefícios"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Número Gigante de Velocidade */}
                            <div className="py-2">
                              <div className="flex items-baseline justify-center gap-2">
                                <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                                  {speedNumber}
                                </span>
                                <span className={`text-2xl sm:text-3xl font-black ${is800 ? 'text-nuvv-purple' : 'text-emerald-600'}`}>
                                  MEGA
                                </span>
                              </div>
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mt-1">
                                100% Fibra Óptica Dedicada
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 min-h-[36px] line-clamp-2 leading-relaxed">
                              {pkg.tagline}
                            </p>
                          </div>

                          {/* BLOCO INTERMEDIÁRIO: ESPECIFICAÇÕES DE HARDWARE & FIBRA */}
                          <div className="px-6 py-3.5 bg-slate-50/90 border-y border-slate-200/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-xl ${is800 ? 'bg-purple-100 text-nuvv-purple' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center flex-shrink-0`}>
                                <Wifi className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <span className="text-[10px] uppercase font-black text-slate-400 block leading-none">
                                  Roteador Comodato
                                </span>
                                <span className="text-xs font-black text-slate-900 leading-tight">
                                  {is800 ? 'Wi-Fi Plus Alta Capacidade' : 'Wi-Fi Incluso'}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="inline-flex items-center text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-md">
                                Instalação 100% grátis
                              </span>
                            </div>
                          </div>

                          {/* BLOCO DE VALORES & BENEFÍCIOS */}
                          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-1 text-center">
                              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                                <span className="line-through">
                                  De R$ {originalPrice.toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                  Economia de R$ {discount.toFixed(2).replace('.', ',')}/mês
                                </span>
                              </div>

                              <div className="flex items-baseline justify-center space-x-1">
                                <span className="text-xs font-bold text-slate-500">Por R$</span>
                                <span className="text-4xl font-black text-slate-900 tracking-tight">
                                  {Math.floor(promoPrice)}
                                </span>
                                <span className="text-lg font-black text-slate-900">
                                  ,{(promoPrice % 1).toFixed(2).substring(2)}
                                </span>
                                <span className="text-xs font-semibold text-slate-500">/mês</span>
                              </div>

                              <p className="text-[11px] text-slate-400">
                                Preço fixo no Pix ou Boleto até o vencimento
                              </p>
                            </div>

                            {/* DIFERENCIAIS DA FIBRA */}
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                              {pkg.contentHighlights.map((hl, i) => (
                                <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span className="font-medium leading-snug">{hl}</span>
                                </div>
                              ))}
                            </div>

                            {/* TV CORTESIA CALLOUT */}
                            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Tv className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                                <span className="text-xs font-bold text-slate-800">18 Canais Cortesia NuvvPlay (Watch)</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveChannelsModal(pkg)}
                                className="text-[11px] font-black text-nuvv-purple hover:underline cursor-pointer"
                              >
                                Ver grade
                              </button>
                            </div>

                            {/* CTA */}
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const summary = `[Residencial - Só Fibra] ${pkg.title} - R$ ${promoPrice.toFixed(2).replace('.', ',')}/mês`;
                                  onOpenLeadModal(summary);
                                }}
                                className={`w-full py-4 rounded-2xl ${is800
                                  ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover text-white shadow-nuvv-purple/25'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                                  } font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer`}
                              >
                                <span>Quero {speedNumber} Mega</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>

                              <div className="text-center mt-2.5">
                                <button
                                  type="button"
                                  onClick={() => setActiveDetailsModal(pkg)}
                                  className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold underline cursor-pointer"
                                >
                                  Ver detalhes técnicos e regulamento
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // SE FOR ABA DE ENTRETENIMENTO: Cards híbridos de valor com marcas no topo e micro-seletor de velocidade
                    const activeSpeedId = tabSpeeds[pkg.id] || '400';
                    const { promoPrice, originalPrice, speedOpt } = calculateOfferPrice(pkg, activeSpeedId);
                    const discount = originalPrice - promoPrice;
                    const isPopular = pkg.isPopular;

                    // Ordem canônica das marcas: Watch, Awdio, Sony One, Universal+, Premiere, Combate, Telecine, HBO Max
                    const BRAND_ORDER = ['watch', 'awdio', 'sony', 'universal', 'premiere', 'combate', 'telecine', 'hbo', 'max'];
                    const getBrandRank = (name: string) => {
                      const n = name.toLowerCase();
                      for (let i = 0; i < BRAND_ORDER.length; i++) {
                        if (n.includes(BRAND_ORDER[i])) return i;
                      }
                      return 99;
                    };

                    // Montagem da lista de apps:
                    // Regras de negócio: Sony e Universal não constam do plano cortesia; Sony não consta no Mais Esportes
                    const isCortesia = pkg.category === 'essencial' || pkg.channelsCount <= 18;
                    const isAboveCortesia = !isCortesia;
                    const isMaisEsportes =
                      pkg.id.toLowerCase().includes('esportes') ||
                      pkg.title.toLowerCase().includes('mais esportes');
                    const allAppsList: { name: string; logo: string }[] = [];

                    // 1. Watch sempre presente
                    allAppsList.push({ name: 'Watch', logo: '/images/external/watch-.png' });

                    // 2. Awdio sempre logo após a Watch (exceto cortesia)
                    if (!isCortesia) {
                      allAppsList.push({ name: 'Awdio', logo: '/images/external/awdio.png' });
                    }

                    // 3. Sony One e Universal+ nos planos acima da cortesia (com exceções de regra)
                    if (isAboveCortesia && !isMaisEsportes) {
                      allAppsList.push({ name: 'Sony One', logo: '/images/external/sony_one.png' });
                    }
                    if (isAboveCortesia) {
                      allAppsList.push({ name: 'Universal+', logo: '/images/external/universal_plus.png' });
                    }

                    // 4. Demais apps do pacote (Premiere, Combate, Telecine, HBO Max, etc.)
                    pkg.heroLogos
                      .filter(
                        (item) =>
                          item.name.toLowerCase() !== 'watch' &&
                          !item.name.toLowerCase().includes('globo') &&
                          !item.name.toLowerCase().includes('sony') &&
                          !item.name.toLowerCase().includes('universal')
                      )
                      .forEach((item) => allAppsList.push(item));

                    // Ordena conforme hierarquia definida
                    allAppsList.sort((a, b) => getBrandRank(a.name) - getBrandRank(b.name));

                    // Limite adaptativo de slots visíveis:
                    // Em abas com até 2 cards (ex: Completo), os cards são mais largos e comportam 8 slots sem quebra.
                    // Em abas com 3 cards (ex: Destaques), o limite é 6 slots.
                    const isWideCardLayout = activeOffers.length <= 2;
                    const maxVisibleSlots = isWideCardLayout ? 8 : 6;
                    let visibleApps = allAppsList;
                    let hiddenApps: { name: string; logo: string }[] = [];
                    let overflowCount = 0;

                    if (allAppsList.length > maxVisibleSlots) {
                      const tailSlots = maxVisibleSlots - 2; // Mantém Watch no início, marcas nobres à direita e +N no final
                      overflowCount = allAppsList.length - (1 + tailSlots);
                      hiddenApps = allAppsList.slice(1, 1 + overflowCount); // recolhe do segundo em diante
                      const tailApps = allAppsList.slice(1 + overflowCount);
                      visibleApps = [allAppsList[0], ...tailApps];
                    }

                    return (
                      <div
                        key={`res-plan-${pkg.id}`}
                        className={`w-[85vw] sm:w-[350px] md:w-auto snap-center flex-shrink-0 md:flex-shrink rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 relative border ${isPopular
                          ? 'border-nuvv-purple shadow-xl ring-2 ring-nuvv-purple/30 md:-translate-y-2'
                          : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-nuvv-purple/40'
                          }`}
                      >
                        {/* Badge de Destaque Superior */}
                        {isPopular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md ring-2 ring-white">
                              <Sparkles className="w-3.5 h-3.5 fill-current" />
                              <span>MAIS ESCOLHIDO PARA FAMÍLIA</span>
                            </span>
                          </div>
                        )}

                        {/* BLOCO 1: MARCAS E DESEJO EM PRIMEIRO LUGAR (Topo do Card) */}
                        <div className="p-6 pb-4 rounded-t-3xl bg-gradient-to-b from-indigo-50/60 via-purple-50/20 to-transparent space-y-3.5">
                          {/* Linha de Tag do Pacote */}
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white border border-slate-200 text-nuvv-purple shadow-2xs">
                              {pkg.badge}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveDetailsModal(pkg)}
                              className="text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                              title="Ver especificações e benefícios"
                            >
                              <Info className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Vitrine de Logotipos Oficiais */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-h-[48px]">
                              {visibleApps.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="w-11 h-11 rounded-2xl overflow-hidden shadow-xs hover:scale-105 transition-all flex items-center justify-center flex-shrink-0 bg-slate-900/5"
                                  title={item.name}
                                >
                                  <img
                                    src={item.logo}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-2xl"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              ))}

                              {/* Badge +N posicionado no FINAL da fileira: abre mini-modal com os ícones que faltam */}
                              {overflowCount > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveMoreAppsModal({
                                      title: pkg.title,
                                      apps: hiddenApps,
                                    })
                                  }
                                  title={`Ver mais conteúdos inclusos (+${overflowCount})`}
                                  className="w-11 h-11 rounded-2xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xs hover:bg-nuvv-purple hover:scale-105 transition-all cursor-pointer flex-shrink-0"
                                >
                                  +{overflowCount}
                                </button>
                              )}
                            </div>

                            {/* Botão de Canais ao Vivo sem quebra */}
                            <button
                              type="button"
                              onClick={() => setActiveChannelsModal(pkg)}
                              className="text-[11px] font-bold text-nuvv-purple hover:underline flex items-center gap-1.5 cursor-pointer pt-0.5"
                            >
                              <Tv className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                              <span className="whitespace-nowrap">{pkg.channelsCount >= 99 ? '100+' : pkg.channelsCount} canais ao vivo (ver grade)</span>
                            </button>
                          </div>

                          {/* Título do Combo e Chamada de Experiência */}
                          <div className="pt-0.5 space-y-1 min-h-[76px] flex flex-col justify-start">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                              {pkg.title}
                            </h3>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {pkg.tagline}
                            </p>
                          </div>
                        </div>

                        {/* BLOCO 2: BASE FIBRA ÓPTICA (Fibra maior de um lado, Wi-Fi e Instalação Grátis do outro) */}
                        <div className="px-6 py-3.5 bg-slate-50/90 border-y border-slate-200/80">
                          <div className="flex items-center justify-between gap-2">
                            {/* Lado Esquerdo: Fibra Óptica em destaque */}
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center flex-shrink-0">
                                <Wifi className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-[10px] uppercase font-black text-slate-400 block leading-none">
                                  100% Fibra
                                </span>
                                <span className="text-sm font-black text-slate-900 leading-tight">
                                  {speedOpt.label}
                                </span>
                              </div>
                            </div>

                            {/* Lado Direito: Wi-Fi incluso e Instalação grátis */}
                            <div className="text-right space-y-0.5">
                              <span className="inline-flex items-center text-[11px] font-bold text-slate-700 block">
                                Wi-Fi incluso
                              </span>
                              <span className="inline-flex items-center text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                                Instalação grátis
                              </span>
                            </div>
                          </div>

                          {/* Micro-seletor elegante de velocidade */}
                          <div className="mt-2.5 flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleSpeedToggle(pkg.id, '400')}
                              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer ${activeSpeedId === '400'
                                ? 'bg-nuvv-purple text-white shadow-xs'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                              400 Mega
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSpeedToggle(pkg.id, '800')}
                              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeSpeedId === '800'
                                ? 'bg-nuvv-purple text-white shadow-xs'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                              <span>800 Mega</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black flex items-center gap-0.5 transition-all ${activeSpeedId === '800'
                                ? 'bg-white/25 text-white'
                                : 'bg-emerald-100 text-emerald-700 animate-pulse'
                                }`}>
                                <Sparkles className="w-2.5 h-2.5 inline animate-spin" style={{ animationDuration: '3s' }} />
                                <span>+R$ 30</span>
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* BLOCO 3: PRECIFICAÇÃO CLARA & ECONOMIA */}
                        <div className="p-6 space-y-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span className="line-through text-xs">
                                De R$ {originalPrice.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                Economia de R$ {discount.toFixed(2).replace('.', ',')}/mês
                              </span>
                            </div>

                            <div className="flex items-baseline space-x-1">
                              <span className="text-xs font-bold text-slate-500">Por R$</span>
                              <span className="text-4xl font-black text-slate-900 tracking-tight">
                                {Math.floor(promoPrice)}
                              </span>
                              <span className="text-lg font-black text-slate-900">
                                ,{(promoPrice % 1).toFixed(2).substring(2)}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">/mês</span>
                            </div>

                            <p className="text-[11px] text-slate-400">
                              Preço fixo no Pix ou Boleto até o vencimento
                            </p>
                          </div>

                          {/* BLOCO 4: DIFERENCIAIS DA EXPERIÊNCIA */}
                          <div className="space-y-2 pt-2 border-t border-slate-100 min-h-[96px]">
                            {pkg.contentHighlights.slice(0, 3).map((hl, i) => (
                              <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span className="font-medium leading-snug">{hl}</span>
                              </div>
                            ))}
                          </div>

                          {/* BLOCO 5: CTA DECISIVO */}
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                const summary = `[Residencial - Combo] ${pkg.title} (${speedOpt.label}) - R$ ${promoPrice.toFixed(2).replace('.', ',')}/mês`;
                                onOpenLeadModal(summary);
                              }}
                              className="w-full py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-md hover:shadow-lg shadow-nuvv-purple/25 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                            >
                              <span>Quero esse Combo</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="text-center mt-2.5">
                              <button
                                type="button"
                                onClick={() => setActiveDetailsModal(pkg)}
                                className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold underline cursor-pointer"
                              >
                                Ver detalhes técnicos e regulamento
                              </button>
                            </div>

                            {/* Disclaimer de Marcas Registradas */}
                            {pkg.channelsCount > 18 && (
                              <p className="text-[9px] text-slate-400/90 text-center leading-tight mt-2.5 px-2">
                                *Canais e conteúdos Premiere, Combate, Telecine, Sony One e Universal+ integrados ao app Watch Brasil. Marcas registradas pertencentes aos seus respectivos titulares. Todos os direitos reservados.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Indicador de Bolinhas do Carrossel em Mobile */}
                <div className="flex md:hidden items-center justify-center space-x-2 pt-1">
                  {activeOffers.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${activeCardCarouselIndex === idx ? 'w-6 bg-nuvv-purple' : 'w-2 bg-slate-300'
                        }`}
                    />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* GAP DE ADICIONAIS E SERVIÇOS EXTRAS (Fluido, Leve e Elegante) */}
          {/* GAP DE ADICIONAIS E SERVIÇOS EXTRAS -> DIRECIONAMENTO PARA O PLANÔMETRO COMPLETO */}
          <div className="max-w-6xl mx-auto pt-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left flex-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-nuvv-purple text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-nuvv-purple" />
                  <span>Personalize seu Combo • Adicionais a partir de R$ 9,90</span>
                </div>
                <h4 className="text-base sm:text-xl font-black text-slate-900">
                  Quer montar um combo 100% sob medida com todos os produtos?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                  Personalize velocidade, canais de TV, Telemedicina 24h, câmeras na nuvem e interfone inteligente diretamente no nosso simulador completo.
                </p>

                {/* Badges dos Serviços Extras em Pílulas Interativas */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1 text-xs font-bold text-slate-700">
                  {/* 1. Telemedicina 24h */}
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 shadow-2xs cursor-default"
                    title="Consultas online 24h por vídeo com receitas e atestados"
                  >
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                    <span>Telemedicina 24h <span className="text-slate-400 font-medium">(+R$ 9,90)</span></span>
                  </span>

                  {/* 2. Câmeras Nuvem */}
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 shadow-2xs cursor-default"
                    title="Monitoramento em tempo real com gravação segura na nuvem"
                  >
                    <Video className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Câmeras Nuvem <span className="text-slate-400 font-medium">(a partir de R$ 19,90)</span></span>
                  </span>

                  {/* 3. Tag de Rastreamento */}
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 shadow-2xs cursor-default"
                    title="Localização precisa de filhos, pets e pertences sem mensalidade para cliente Nuvv"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Tag Rastreamento <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-black">R$ 79,90 Única</span></span>
                  </span>

                  {/* 4. Interfone QR */}
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 shadow-2xs cursor-default"
                    title="Atenda entregas e visitantes no celular por chamada de vídeo sem mensalidade para cliente Nuvv"
                  >
                    <Phone className="w-3.5 h-3.5 text-nuvv-purple" />
                    <span>Interfone QR <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-black">R$ 79,90 Única</span></span>
                  </span>

                  {/* 5. Segurança Digital */}
                  <span
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 shadow-2xs cursor-default"
                    title="Proteção contra vírus e navegação segura para toda a família"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Segurança Digital <span className="text-slate-400 font-medium">(+R$ 9,90)</span></span>
                  </span>
                </div>
              </div>

              {/* Botão de Ação Direto para o Planômetro */}
              <div className="flex flex-col items-center lg:items-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/residencial/monte-seu-combo')}
                  className="px-6 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-xs sm:text-sm transition-all shadow-lg hover:shadow-nuvv-purple/30 flex items-center space-x-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Montar no Planômetro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10.5px] text-slate-400 mt-2 font-medium">
                  Simulação instantânea em tempo real
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telemedicina e Saúde 24h Section (TurboMed SVA) */}
      <TelemedicinaSection
        activeAddons={activeAddons}
        onToggleAddon={handleToggleAddon}
        onOpenLeadModal={onOpenLeadModal}
      />

      {/* Nuvv Guard • Proteção e Segurança Familiar (Câmeras, Tags e Interfone Virtual) */}
      <GuardFamilySection onOpenLeadModal={onOpenLeadModal} />

      {/* Value Added Services Row & Modals (Telefonia Fixa, NuvvPlay, Proteção Kaspersky) */}
      <ValueAddedModals
        onOpenLeadModal={onOpenLeadModal}
        externalActiveModal={svaModal}
        onCloseExternalModal={() => setSvaModal(null)}
      />

      {/* Streaming Gadgets */}
      <StreamingDevices />

      {/* Super App Showcase Section */}
      <SuperAppSection />

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />

      {/* Feasibility Check Modal */}
      <FeasibilityModal
        isOpen={isFeasibilityModalOpen}
        onClose={() => setIsFeasibilityModalOpen(false)}
        initialService="residencial"
        onSelectPlanAndHire={(planName, addr) => {
          onOpenLeadModal(`${planName} (Endereço validado: ${addr})`);
        }}
      />

      {/* PLAN DETAILS MODAL */}
      <Modal
        isOpen={!!detailModalPlan}
        onClose={() => setDetailModalPlan(null)}
        maxWidth="4xl"
      >
        {detailModalPlan && (
          <div className="space-y-6">
            {/* Header Purple Banner */}
            <div className="bg-gradient-to-r from-nuvv-purple via-indigo-600 to-nuvv-purple text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm -mt-1 sm:-mt-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Combo {detailModalPlan.speed} {detailModalPlan.unit} {TIER_CONFIG[effectiveTier].label}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-100 font-semibold mt-0.5">
                    {detailModalPlan.speed} {detailModalPlan.unit} 100% Fibra Óptica • Especificações e Benefícios
                  </p>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-white self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-nuvv-green" />
                  <span>{detailModalPlan.wifiBadge}</span>
                </div>
              </div>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Apps & Streamings + Conteúdos Digitais */}
              <div className="md:col-span-7 space-y-5">
                {/* Apps & Streamings */}
                <div>
                  <div className="flex items-center space-x-2 text-nuvv-purple font-extrabold text-xs uppercase tracking-wider mb-3">
                    <Tv className="w-4 h-4" />
                    <span>Apps & Streamings Inclusos</span>
                  </div>

                  <div className="space-y-2.5">
                    {modalAppsList.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/90 flex items-center space-x-3.5 shadow-2xs hover:border-nuvv-purple/40 transition-all"
                      >
                        {app.logo ? (
                          <div className="w-11 h-11 rounded-xl overflow-hidden shadow-xs flex items-center justify-center flex-shrink-0 bg-gray-50">
                            <img
                              src={app.logo}
                              alt={app.name}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs bg-indigo-50 border border-indigo-200 text-nuvv-purple">
                            {app.category === 'vision' ? (
                              <Video className="w-5 h-5 text-cyan-600" />
                            ) : app.category === 'protecao' ? (
                              <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            ) : app.category === 'saude' ? (
                              <HeartPulse className="w-5 h-5 text-rose-600" />
                            ) : app.category === 'telefonia' ? (
                              <Phone className="w-5 h-5 text-nuvv-purple" />
                            ) : (
                              <Sparkles className="w-5 h-5 text-nuvv-purple" />
                            )}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-extrabold text-nuvv-dark truncate">
                            {app.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 leading-snug">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conteúdos Digitais */}
                <div>
                  <div className="flex items-center space-x-2 text-nuvv-purple font-extrabold text-xs uppercase tracking-wider mb-3">
                    <Cloud className="w-4 h-4" />
                    <span>Conteúdos Digitais</span>
                  </div>

                  <div className="space-y-2.5">
                    {detailModalPlan.benefits.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/90 flex items-center space-x-3.5 shadow-2xs hover:border-nuvv-purple/40 transition-all"
                      >
                        <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shadow-xs flex-shrink-0">
                          <img
                            src={b.logo}
                            alt={b.name}
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-extrabold text-nuvv-dark truncate">
                            {b.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 leading-snug">
                            {b.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Recursos Técnicos, Condições de Pagamento, Taxa, Equipamento & CTA */}
              <div className="md:col-span-5 space-y-4">
                {/* Recursos Técnicos */}
                <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 shadow-2xs space-y-2.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Recursos Técnicos
                  </h4>
                  <ul className="space-y-1.5 text-xs font-semibold text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple flex-shrink-0" />
                      <span>{detailModalPlan.wifiBadge}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple flex-shrink-0" />
                      <span>{Math.round(detailModalPlan.speedNumber * 0.5)} Mega Upload</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple flex-shrink-0" />
                      <span>IP Dinâmico</span>
                    </li>
                    {detailModalPlan.priorityTraffic && (
                      <li className="flex items-center space-x-2 text-amber-800 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>Prioridade de Tráfego & SLA 24h</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CONDIÇÕES DE PAGAMENTO */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 shadow-2xs space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] font-black text-nuvv-purple uppercase tracking-wider">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>CONDIÇÕES DE PAGAMENTO</span>
                  </div>

                  {/* Preço 1: Até o vencimento */}
                  <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-xs flex items-center justify-between gap-2.5">
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-nuvv-purple block leading-tight">
                        Pix / Boleto (até vencimento)
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">Com desconto de pontualidade</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-nuvv-purple whitespace-nowrap flex-shrink-0 text-right">
                      R$ {modalPromoPrice.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  {/* Preço 2: Após vencimento */}
                  <div className="pt-2 border-t border-purple-200/60 space-y-1">
                    <div className="flex items-center justify-between px-1 text-xs gap-2">
                      <span className="text-gray-600 font-medium">Valor Original do Plano (após vencimento)</span>
                      <span className="text-gray-700 font-extrabold whitespace-nowrap flex-shrink-0">
                        R$ {modalOriginalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 px-1 leading-snug">
                      * Perda do desconto de pontualidade de R$ 20,00 da banda larga + incidência de multa e juros por atraso.
                    </p>
                  </div>
                </div>

                {/* SERVIÇOS NUVV GUARD (TAXAS DE HABILITAÇÃO / ANTECIPADA) */}
                {guardSetup.items.length > 0 && (
                  <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 shadow-2xs space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] font-black text-cyan-900 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Serviços Nuvv Guard (Ativação e Envio)</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {guardSetup.items.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-cyan-200/80 space-y-1">
                          <div className="flex items-center justify-between font-bold text-cyan-950">
                            <span>{item.name}</span>
                            {item.setupFee > 0 ? (
                              <span className="text-cyan-700 font-extrabold">R$ {item.setupFee.toFixed(2).replace('.', ',')}</span>
                            ) : (
                              <span className="text-emerald-600 font-extrabold">Isento</span>
                            )}
                          </div>
                          <p className="text-[11px] text-cyan-800 leading-snug">
                            {item.notice}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAXA DE HABILITAÇÃO */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                    TAXA DE HABILITAÇÃO
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A oferta possui taxa de habilitação isenta mediante permanência de 12 meses. Caso a oferta seja cancelada antes desse período, será cobrado o valor de R$ 480,00 de forma proporcional aos meses restantes.
                  </p>
                </div>

                {/* EQUIPAMENTO */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                    EQUIPAMENTO
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Assinante recebe modem em comodato, sem custos, mediante assinatura do respectivo contrato de comodato.
                  </p>
                </div>

                {/* BOTÃO ASSINAR AGORA */}
                <button
                  type="button"
                  onClick={() => {
                    const plan = detailModalPlan;
                    setDetailModalPlan(null);
                    handleSelectPlan(plan, modalPromoPrice);
                  }}
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                >
                  <span>Assinar Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* CHANNELS LINEUP MODAL */}
      {(() => {
        const activeItem = channelsModalProfile
          ? RESIDENTIAL_MODAL_CHANNELS.find((item) => item.id === channelsModalProfile)
          : RESIDENTIAL_MODAL_CHANNELS.find((item) => item.id === selectedProfile) || RESIDENTIAL_MODAL_CHANNELS[0];

        const isModalOpen = !!channelsModalTier || !!channelsModalProfile;

        return (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setChannelsModalTier(null);
              setChannelsModalProfile(null);
            }}
            title={activeItem ? activeItem.channelsTitle : ''}
            subtitle="Confira todos os canais transmitidos em alta definição inclusos no pacote"
            maxWidth="3xl"
          >
            {activeItem && (
              <div className="space-y-4">
                {/* Quick Switcher within Modal */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-3">
                  {RESIDENTIAL_MODAL_CHANNELS.map((item) => {
                    const isSelected = activeItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setChannelsModalProfile(item.id);
                          setChannelsModalTier(item.tier);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isSelected
                          ? 'bg-nuvv-purple text-white shadow-xs'
                          : 'text-gray-500 hover:bg-gray-100'
                          }`}
                      >
                        {item.label} ({item.channelsCount} Canais)
                      </button>
                    );
                  })}
                </div>

                {/* Channels Lineup Image strictly fitted to viewport */}
                <div className="rounded-2xl border border-gray-200 bg-slate-950 p-2 sm:p-3 flex items-center justify-center max-h-[50vh] sm:max-h-[55vh] overflow-hidden">
                  <img
                    src={activeItem.channelsImage}
                    alt={activeItem.channelsTitle}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = '/images/external/tv_cortesia.png';
                      if (target.src !== fallback && !target.src.endsWith(fallback)) {
                        target.src = fallback;
                      }
                    }}
                    className="max-h-[46vh] sm:max-h-[52vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <span>* Canais transmitidos em HD pelo app Watch (NuvvPlay).</span>
                  <button
                    type="button"
                    onClick={() => {
                      setChannelsModalTier(null);
                      setChannelsModalProfile(null);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </Modal>
        );
      })()}

      {/* MODAL DE GRADE DE CANAIS (Novo catálogo de ofertas) */}
      <Modal
        isOpen={!!activeChannelsModal}
        onClose={() => setActiveChannelsModal(null)}
        title={activeChannelsModal?.channelsTitle || 'Grade de Canais'}
        subtitle={`Confira os ${activeChannelsModal?.channelsCount} canais em alta definição inclusos`}
        maxWidth="3xl"
      >
        {activeChannelsModal && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-slate-950 p-3 flex items-center justify-center max-h-[52vh] overflow-hidden">
              <img
                src={activeChannelsModal.channelsImage}
                alt={activeChannelsModal.channelsTitle}
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = '/images/external/tv_cortesia.png';
                  if (target.src !== fallback && !target.src.endsWith(fallback)) {
                    target.src = fallback;
                  }
                }}
                className="max-h-[48vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>* Canais transmitidos em 1080p Full HD pelo app NuvvPlay (Watch).</span>
              <button
                type="button"
                onClick={() => setActiveChannelsModal(null)}
                className="px-4 py-2 rounded-xl bg-nuvv-purple text-white font-bold cursor-pointer text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL DE ESPECIFICAÇÕES TÉCNICAS DO PACOTE */}
      <Modal
        isOpen={!!activeDetailsModal}
        onClose={() => setActiveDetailsModal(null)}
        maxWidth="4xl"
        headerBanner={
          activeDetailsModal ? (() => {
            const speedId = tabSpeeds[activeDetailsModal.id] || (activeDetailsModal.defaultSpeed as SpeedOptionId) || '400';
            const { speedOpt } = calculateOfferPrice(activeDetailsModal, speedId);
            return (
              <div className="bg-gradient-to-r from-nuvv-purple via-indigo-600 to-nuvv-purple text-white px-6 sm:px-8 py-5 sm:py-6 rounded-t-3xl rounded-b-none">
                <div className="pr-14 sm:pr-16">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200">
                      {activeDetailsModal.badge}
                    </span>
                    <span className="text-xs text-indigo-300">•</span>
                    <span className="text-xs font-bold text-emerald-300">
                      {speedOpt.label} 100% Fibra
                    </span>
                    <span className="text-xs text-indigo-300">•</span>
                    <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[11px] font-bold text-white">
                      <Sparkles className="w-3 h-3 text-emerald-300" />
                      <span>{speedOpt.wifiBadge}</span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">{activeDetailsModal.title}</h3>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-2xl leading-relaxed">
                    {activeDetailsModal.detailsSummary}
                  </p>
                </div>
              </div>
            );
          })() : undefined
        }
      >
        {activeDetailsModal && (() => {
          const speedId = tabSpeeds[activeDetailsModal.id] || (activeDetailsModal.defaultSpeed as SpeedOptionId) || '400';
          const { promoPrice, speedOpt } = calculateOfferPrice(activeDetailsModal, speedId);
          const digitalApps = getPackageDigitalApps(activeDetailsModal);

          return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Coluna 1: Conteúdos & Apps e Destaques */}
              <div className="md:col-span-7 space-y-5">
                {/* Conteúdos & Apps */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-nuvv-purple font-black text-xs uppercase tracking-wider">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Conteúdos & Apps</span>
                    </div>
                    {activeDetailsModal.channelsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveChannelsModal(activeDetailsModal);
                        }}
                        className="text-[11px] font-bold text-nuvv-purple hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Ver {activeDetailsModal.channelsCount} canais</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {digitalApps.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {digitalApps.map((app) => (
                        <div
                          key={app.name}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center space-x-2.5 hover:border-purple-300/80 transition-all shadow-2xs"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
                            <img
                              src={app.logo}
                              alt={app.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="text-xs font-black text-slate-900 truncate">
                                {app.name}
                              </h5>
                              <span className="text-[9px] font-bold text-nuvv-purple bg-purple-100/70 px-1.5 py-0.5 rounded flex-shrink-0">
                                {app.tag}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                              {app.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Catálogo de streaming comum em todos os planos via app Watch */}
                  <div className="pt-1.5 space-y-1.5">
                    <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-nuvv-purple" />
                      <span>Catálogo adicional incluso via app Watch Brasil:</span>
                    </span>
                    <div className="rounded-xl bg-white border border-slate-200/90 p-2.5 sm:p-3 flex items-center justify-start shadow-2xs">
                      <img
                        src="/images/external/cat_min.png"
                        alt="Catálogo streaming incluso via app Watch Brasil"
                        className="max-h-11 sm:max-h-13 w-auto object-contain object-left"
                      />
                    </div>
                  </div>
                </div>

                {/* Destaques Inclusos */}
                <div className="space-y-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Diferenciais Inclusos:</span>
                  </span>
                  <div className="space-y-1.5">
                    {activeDetailsModal.contentHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coluna 2: Condições de Pagamento, Taxa de Habilitação, Equipamento & CTA */}
              <div className="md:col-span-5 space-y-3.5">
                {/* CONDIÇÕES DE PAGAMENTO */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 shadow-2xs space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] font-black text-nuvv-purple uppercase tracking-wider">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Condições de Pagamento</span>
                  </div>

                  {/* Preço 1: Até o vencimento */}
                  <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-xs flex items-center justify-between gap-2.5">
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-nuvv-purple block leading-tight">
                        Pix / Boleto (até vencimento)
                      </span>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        Com desconto de pontualidade
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-nuvv-purple whitespace-nowrap flex-shrink-0 text-right">
                      R$ {promoPrice.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  {/* Preço 2: Após vencimento */}
                  <div className="pt-2 border-t border-purple-200/60 space-y-1">
                    <div className="flex items-center justify-between px-1 text-xs gap-2">
                      <span className="text-gray-600 font-medium">Valor Original do Plano (após vencimento)</span>
                      <span className="text-gray-700 font-extrabold whitespace-nowrap flex-shrink-0">
                        R$ {(promoPrice + 20.00).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 px-1 leading-snug">
                      * Perda do desconto de pontualidade de R$ 20,00 da banda larga + incidência de multa e juros por atraso.
                    </p>
                  </div>
                </div>

                {/* TAXA DE HABILITAÇÃO */}
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Taxa de Habilitação</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A oferta possui taxa de habilitação isenta mediante permanência de 12 meses. Caso a oferta seja cancelada antes desse período, será cobrado o valor de R$ 480,00 de forma proporcional aos meses restantes.
                  </p>
                </div>

                {/* EQUIPAMENTO */}
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                    <Wifi className="w-3.5 h-3.5 text-nuvv-purple" />
                    <span>Equipamento</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Assinante recebe modem ({speedOpt.wifiBadge}) em comodato, sem custos, mediante assinatura do respectivo contrato de comodato.
                  </p>
                </div>

                {/* BOTÃO CONTRATAR */}
                <button
                  type="button"
                  onClick={() => {
                    const summary = `[Residencial] ${activeDetailsModal.title} (${speedOpt.label}) - R$ ${promoPrice.toFixed(2).replace('.', ',')}/mês`;
                    setActiveDetailsModal(null);
                    onOpenLeadModal(summary);
                  }}
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                >
                  <span>Contratar este Pacote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Mini-Modal para Exibir Demais Apps Inclusos (+N) */}
      <Modal
        isOpen={!!activeMoreAppsModal}
        onClose={() => setActiveMoreAppsModal(null)}
        title={activeMoreAppsModal ? `Também Inclusos no ${activeMoreAppsModal.title}` : ''}
        subtitle="Demais plataformas e conteúdos integrados inclusos no seu combo"
        maxWidth="sm"
      >
        {activeMoreAppsModal && (
          <div className="space-y-4 py-1">
            <div className="flex items-center justify-center gap-3 flex-wrap p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              {activeMoreAppsModal.apps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white transition-all text-center"
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-slate-200/70 bg-white flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setActiveMoreAppsModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white font-bold text-xs transition-all cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
