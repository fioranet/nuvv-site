import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
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
  TV_PLANS_REFERENCE_TABLE,
} from '../data/plans';
import { PlanSelector } from '../components/residencial/PlanSelector';
import { PlanCard } from '../components/residencial/PlanCard';
import { ValueAddedModals } from '../components/residencial/ValueAddedModals';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { FeasibilityModal } from '../components/viabilidade/FeasibilityModal';
import { Modal } from '../components/common/Modal';
import {
  Sparkles,
  Tv,
  Wifi,
  ShieldCheck,
  HeartPulse,
  Film,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Video,
  Cloud,
  CreditCard,
  Zap,
} from 'lucide-react';

import {
  buildComboSummary,
  saveComboSummaryToStorage,
  ComboLeadSummary,
} from '../services/comboSummary';

interface MonteSeuComboResidencialProps {
  currentCity: string;
  onOpenLeadModal: (planName?: string, summaryData?: ComboLeadSummary | null) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const MonteSeuComboResidencial: React.FC<MonteSeuComboResidencialProps> = ({
  currentCity,
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [searchParams] = useSearchParams();
  const initialAddon = searchParams.get('addon');

  const [selectedTier, setSelectedTier] = useState<EntertainmentTier | null>(null);
  const [activeAddons, setActiveAddons] = useState<Record<string, boolean>>(() => {
    if (initialAddon) {
      return { [initialAddon]: true };
    }
    return {};
  });

  useEffect(() => {
    if (initialAddon) {
      setActiveAddons((prev) => ({ ...prev, [initialAddon]: true }));
      setTimeout(() => {
        const el = document.getElementById('planos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [initialAddon]);
  const [visionConfig, setVisionConfig] = useState<VisionAddonConfig>({
    planId: null,
    cameraCount: 1,
    withComodato: false,
  });
  const [detailModalPlan, setDetailModalPlan] = useState<ResidentialPlan | null>(null);
  const [channelsModalTier, setChannelsModalTier] = useState<EntertainmentTier | null>(null);
  const [svaModal, setSvaModal] = useState<'telefonia' | 'nuvvplay' | 'protecao' | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [isFeasibilityModalOpen, setIsFeasibilityModalOpen] = useState(false);

  const effectiveTier: EntertainmentTier = selectedTier || 'cortesia';

  const addonTotal = useMemo(() => {
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

  const modalPromoPrice = detailModalPlan
    ? Number((detailModalPlan.tierPricing[effectiveTier].promoPrice + addonTotal).toFixed(2))
    : 0;

  const modalOriginalPrice = Number((modalPromoPrice + 20.00).toFixed(2));

  const effectiveTvConfig = TIER_CONFIG[effectiveTier] || TIER_CONFIG.cortesia;

  const modalDigitalApps = useMemo(() => {
    if (!detailModalPlan) return [];
    const items: Array<{
      name: string;
      tag: string;
      description: string;
      logo: string;
    }> = [];
    const seenNames = new Set<string>();

    const appMeta: Record<string, { tag: string; desc: string }> = {
      watch: {
        tag: `${effectiveTvConfig.channelsCount || 18} Canais`,
        desc: 'TV ao vivo em Full HD e catálogo on-demand.',
      },
      awdio: {
        tag: 'Áudio & Livros',
        desc: 'Audiobooks, podcasts e conteúdos em áudio.',
      },
      sony: {
        tag: 'Filmes & Séries',
        desc: 'Catálogo completo de filmes e séries da Sony via app Watch Brasil.',
      },
      'sony one': {
        tag: 'Filmes & Séries',
        desc: 'Catálogo completo de filmes e séries da Sony via app Watch Brasil.',
      },
      universal: {
        tag: 'Filmes & Séries',
        desc: 'Filmes de sucesso e séries exclusivas da Universal via app Watch Brasil.',
      },
      'universal+': {
        tag: 'Filmes & Séries',
        desc: 'Filmes de sucesso e séries exclusivas da Universal via app Watch Brasil.',
      },
      telecine: {
        tag: '6 Canais + Streaming',
        desc: '6 canais ao vivo e filmes sob demanda.',
      },
      hbomax: {
        tag: 'Streaming Premium',
        desc: 'Filmes, séries exclusivas HBO e esportes ao vivo.',
      },
      'hbo max': {
        tag: 'Streaming Premium',
        desc: 'Filmes, séries exclusivas HBO e esportes ao vivo.',
      },
      paramount: {
        tag: 'Filmes & Séries',
        desc: 'Filmes e séries de sucesso.',
      },
      'paramount+': {
        tag: 'Filmes & Séries',
        desc: 'Filmes e séries de sucesso.',
      },
      premiere: {
        tag: 'Futebol Ao Vivo',
        desc: 'Brasileirão Séries A e B ao vivo no NuvvPlay (Watch).',
      },
      combate: {
        tag: 'Lutas Ao Vivo',
        desc: 'O canal 100% dedicado aos esportes de combate.',
      },
    };

    // 1. Apps do pacote de TV
    const baseApps = effectiveTvConfig.includedApps || [];

    baseApps.forEach((app) => {
      const lowerName = app.name.toLowerCase();
      if (lowerName.includes('globo')) return;
      if (seenNames.has(lowerName)) return;
      seenNames.add(lowerName);

      const meta = appMeta[lowerName] || {
        tag: 'Incluso',
        desc: 'Filmes, séries e conteúdos sob demanda.',
      };

      items.push({
        name: app.name,
        tag: meta.tag,
        description: meta.desc,
        logo: app.logo,
      });
    });

    // 2. Addons avulsos adicionados pelo usuário
    Object.entries(activeAddons)
      .filter(([_, active]) => active)
      .forEach(([key]) => {
        const addon = PLAN_ADDONS[key];
        if (!addon) return;
        const lowerName = addon.name.toLowerCase();
        if (lowerName.includes('globo')) return;
        if (seenNames.has(lowerName) || seenNames.has(addon.id.toLowerCase())) return;
        seenNames.add(lowerName);

        const meta = appMeta[lowerName] || {
          tag: addon.category === 'streaming' ? 'Streaming' : 'Add-on',
          desc: addon.description,
        };

        items.push({
          name: addon.name,
          tag: meta.tag,
          description: meta.desc,
          logo: addon.logo || '/images/external/watch-.png',
        });
      });

    // 3. Vision Addons se houver
    if (
      visionConfig.cameraPlanId ||
      (visionConfig.planId &&
        (visionConfig.planId.includes('camera') ||
          visionConfig.planId.includes('byod')))
    ) {
      const camCount = Math.max(1, visionConfig.cameraCount || 1);
      items.push({
        name: `Nuvv Guard (${camCount}x Câmera${camCount > 1 ? 's' : ''})`,
        tag: 'Segurança',
        description: 'Gravação na nuvem e monitoramento ao vivo no App Nuvv Guard.',
        logo: '/images/external/cat_completo.png',
      });
    }

    if (
      visionConfig.intercomPlanId ||
      (visionConfig.planId && visionConfig.planId.includes('intercom'))
    ) {
      items.push({
        name: 'Interfone Virtual QR Code',
        tag: 'Interfonia',
        description: 'Receba chamadas de vídeo dos visitantes no app Nuvv Guard. Sem mensalidade enquanto cliente Nuvv.',
        logo: '/images/external/cat_completo.png',
      });
    }

    if (
      visionConfig.tagPlanId ||
      (visionConfig.planId && visionConfig.planId.includes('tag'))
    ) {
      const tCount = Math.max(1, visionConfig.tagCount || 1);
      items.push({
        name: `TAG de Rastreamento (${tCount}x)`,
        tag: 'Rastreamento',
        description: 'Localização de chaves e objetos no app Nuvv Guard. Sem mensalidade enquanto cliente Nuvv.',
        logo: '/images/external/cat_completo.png',
      });
    }

    const BRAND_ORDER = ['watch', 'awdio', 'sony', 'universal', 'premiere', 'combate', 'telecine', 'hbo', 'max'];
    const getBrandRank = (name: string) => {
      const n = name.toLowerCase();
      for (let i = 0; i < BRAND_ORDER.length; i++) {
        if (n.includes(BRAND_ORDER[i])) return i;
      }
      return 99;
    };

    items.sort((a, b) => getBrandRank(a.name) - getBrandRank(b.name));
    return items;
  }, [detailModalPlan, effectiveTvConfig, effectiveTier, activeAddons, visionConfig]);

  const modalHighlights = useMemo(() => {
    if (!detailModalPlan) return [];
    const hls: string[] = [];

    hls.push(`${detailModalPlan.speed} ${detailModalPlan.unit} 100% Fibra Óptica Nuvv`);
    hls.push('Wi-Fi incluso com alta estabilidade e cobertura');
    hls.push('Instalação e roteador Wi-Fi em comodato 100% grátis');

    if (effectiveTvConfig.channelsCount > 0) {
      hls.push(`${effectiveTvConfig.channelsCount} canais de TV ao vivo em Full HD no app NuvvPlay (Watch)`);
    }

    if (activeAddons.telecine) {
      hls.push('Telecine incluso com 6 canais ao vivo e streaming de filmes sob demanda');
    }
    if (activeAddons.hboMax) {
      hls.push('HBO Max incluso com filmes, séries consagradas e Champions League');
    }
    if (activeAddons.premiere) {
      hls.push('Premiere incluso com os jogos do Brasileirão Séries A e B');
    }
    if (activeAddons.combate) {
      hls.push('Combate incluso com o melhor das artes marciais e lutas ao vivo');
    }

    hls.push('App Awdio com audiobooks e podcasts no NuvvPlay (Watch)');

    return hls;
  }, [detailModalPlan, effectiveTvConfig, activeAddons]);

  const guardSetup = useMemo(() => getGuardSetupDetails(visionConfig), [visionConfig]);

  const handleSelectTier = (newTier: EntertainmentTier | null) => {
    const prevTierKey = selectedTier || 'cortesia';
    const newTierKey = newTier || 'cortesia';
    const prevIncluded = TIER_CONFIG[prevTierKey]?.includedAddons || [];
    const newIncluded = TIER_CONFIG[newTierKey]?.includedAddons || [];

    setSelectedTier(newTier);
    setActiveAddons((prev) => {
      const next = { ...prev };
      prevIncluded.forEach((id) => {
        if (!newIncluded.includes(id)) {
          delete next[id];
        }
      });
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

  const handleResetSelection = () => {
    setSelectedTier(null);
    setActiveAddons({});
    setVisionConfig({
      planId: null,
      cameraCount: 1,
      withComodato: false,
      cameraPlanId: null,
      intercomPlanId: null,
      tagPlanId: null,
      tagCount: 1,
    });
    try {
      localStorage.removeItem('nuvv_current_quote');
    } catch {
      // ignore
    }
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

    // Armazena no localStorage para persistência cross-session/recarregamentos
    saveComboSummaryToStorage(summary);

    // Abre o LeadModal passando o resumo descritivo e o objeto estruturado com taxas únicas/vendas
    onOpenLeadModal(summary.rawSummary, summary);
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Monte seu Combo Residencial Sob Medida em ${currentCity} | Nuvv Fibra`}
        description={`Monte o combo de internet perfeito para sua casa em ${currentCity}. Fibra óptica até 1 Giga com Wi-Fi 6, canais ao vivo no App Watch, Max, Telecine, Premiere, Telemedicina 24h e câmeras Nuvv Guard.`}
        cityName={currentCity}
        keywords={[
          'monte seu combo residencial',
          'plano de internet fibra residencial',
          'internet com tv e streaming',
          'app watch tv fibra',
          'telemedicina nuvv',
          'nuvv guard residencial',
          'internet fibra suzano',
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Combo Residencial Personalizado Nuvv - ${currentCity}`,
          serviceType: 'Internet Fibra Óptica Residencial e Entretenimento',
          provider: {
            '@type': 'Organization',
            name: 'Nuvv',
            url: 'https://nuvv.com.br/',
          },
          areaServed: {
            '@type': 'City',
            name: currentCity,
          },
          description: `Monte seu plano de internet 100% fibra óptica com Wi-Fi 6, canais ao vivo e streamings no App Watch, Telemedicina 24h e segurança Nuvv Guard em ${currentCity}.`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nuvv-purple/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back to Standard Plans Link */}
          <div className="mb-6">
            <Link
              to="/residencial"
              className="inline-flex items-center space-x-2 text-xs font-bold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar aos Planos Rápidos</span>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/20 border border-nuvv-purple/40 text-indigo-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
              <span>PLANÔMETRO RESIDENCIAL • {currentCity.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Monte o Combo Perfeito para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-400 to-emerald-400">
                Sua Família
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Personalize sua velocidade de internet e adicione pacotes de TV ao vivo, streamings de cinema, esportes, telemedicina 24h e câmeras de segurança na nuvem com cálculo automático e transparência total.
            </p>

            {/* Quick Pillars */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300">
              <span className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Wi-Fi 6 Incluso em Comodato</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fatura Única e Sem Surpresas</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Fibra Óptica Dedicada</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Planometer Section */}
      <section className="py-12 sm:py-16 bg-slate-50/70 relative -mt-6" id="planos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Full Interactive Plan Selector */}
          <PlanSelector
            selectedTier={selectedTier}
            onSelectTier={handleSelectTier}
            activeAddons={activeAddons}
            onToggleAddon={handleToggleAddon}
            visionConfig={visionConfig}
            onUpdateVisionConfig={setVisionConfig}
            onOpenChannelsModal={(tier) => setChannelsModalTier(tier)}
            onOpenProtecaoModal={() => setSvaModal('protecao')}
            onResetSelection={handleResetSelection}
          />

          {/* Plan Cards: 2-Column Grid on Tablet/Desktop for 400 Mega and 800 Mega */}
          <div className="relative mt-8">
            <div
              className="flex md:grid md:grid-cols-2 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 pt-2 px-2 md:px-0 max-w-4xl mx-auto items-stretch scrollbar-none"
              onScroll={(e) => {
                const scrollLeft = (e.target as HTMLElement).scrollLeft;
                const width = (e.target as HTMLElement).clientWidth;
                const index = Math.round(scrollLeft / (width * 0.85));
                if (index >= 0 && index < RESIDENTIAL_PLANS.length) {
                  setActiveCardIndex(index);
                }
              }}
            >
              {RESIDENTIAL_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink h-full flex flex-col"
                >
                  <PlanCard
                    plan={plan}
                    selectedTier={selectedTier}
                    activeAddons={activeAddons}
                    visionConfig={visionConfig}
                    hideCanaisGlobo={true}
                    onSelectPlan={handleSelectPlan}
                    onOpenDetails={setDetailModalPlan}
                    onOpenChannelsModal={(tier) => setChannelsModalTier(tier)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex md:hidden items-center justify-center space-x-2 mt-2">
              {RESIDENTIAL_PLANS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    activeCardIndex === idx ? 'w-6 bg-nuvv-purple' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Added Modals (Telefonia, NuvvPlay, Kaspersky) */}
      <ValueAddedModals
        onOpenLeadModal={onOpenLeadModal}
        externalActiveModal={svaModal}
        onCloseExternalModal={() => setSvaModal(null)}
      />

      {/* CHANNELS LINEUP MODAL */}
      {(() => {
        const modalResolution = channelsModalTier
          ? resolveTierAndAddons(channelsModalTier, activeAddons)
          : null;

        return (
          <Modal
            isOpen={!!channelsModalTier}
            onClose={() => setChannelsModalTier(null)}
            title={modalResolution ? modalResolution.channelsTitle : ''}
            subtitle="Confira todos os canais transmitidos em alta definição inclusos no pacote"
            maxWidth="3xl"
          >
            {channelsModalTier && modalResolution && (
              <div className="space-y-4">
                {/* Quick Switcher within Modal */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-3 max-h-28 overflow-y-auto">
                  {TV_PLANS_REFERENCE_TABLE.map((ref) => {
                    const isCurrent = channelsModalTier === ref.id;
                    return (
                      <button
                        key={ref.id}
                        type="button"
                        onClick={() => setChannelsModalTier(ref.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-nuvv-purple text-white shadow-xs'
                            : 'text-gray-600 hover:bg-gray-100 bg-gray-50 border border-gray-200/60'
                        }`}
                      >
                        {ref.tierCategory} ({ref.channelsCount} Canais)
                      </button>
                    );
                  })}
                </div>

                {/* Channels Lineup Image */}
                <div className="rounded-2xl border border-gray-200 bg-slate-950 p-2 sm:p-3 flex items-center justify-center max-h-[50vh] sm:max-h-[55vh] overflow-hidden">
                  <img
                    src={modalResolution.channelsImage}
                    alt={modalResolution.channelsTitle}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = TIER_CONFIG[channelsModalTier]?.channelsImage || '/images/external/tv_cortesia.png';
                      if (target.src !== fallback && !target.src.endsWith(fallback)) {
                        target.src = fallback;
                      }
                    }}
                    className="max-h-[46vh] sm:max-h-[52vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <span>* Canais transmitidos em HD pelo app NuvvPlay (Watch).</span>
                  <button
                    type="button"
                    onClick={() => setChannelsModalTier(null)}
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

      {/* PLAN DETAILS MODAL */}
      <Modal
        isOpen={!!detailModalPlan}
        onClose={() => setDetailModalPlan(null)}
        maxWidth="4xl"
        headerBanner={
          detailModalPlan ? (
            <div className="bg-gradient-to-r from-nuvv-purple via-indigo-600 to-nuvv-purple text-white px-6 sm:px-8 py-5 sm:py-6 rounded-t-3xl rounded-b-none">
              <div className="pr-14 sm:pr-16">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200">
                    {effectiveTvConfig.label.toUpperCase()}
                  </span>
                  <span className="text-xs text-indigo-300">•</span>
                  <span className="text-xs font-bold text-emerald-300">
                    {detailModalPlan.speed} {detailModalPlan.unit} 100% Fibra
                  </span>
                  <span className="text-xs text-indigo-300">•</span>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[11px] font-bold text-white">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>Wi-Fi incluso</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Combo {detailModalPlan.speed} {detailModalPlan.unit} {effectiveTvConfig.label}
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-2xl leading-relaxed">
                  {effectiveTvConfig.description ||
                    `${detailModalPlan.speed} ${detailModalPlan.unit} 100% Fibra Óptica com ultravelocidade e estabilidade.`}
                </p>
              </div>
            </div>
          ) : undefined
        }
      >
        {detailModalPlan && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Coluna 1: Conteúdos & Apps e Diferenciais */}
            <div className="md:col-span-7 space-y-5">
              {/* Conteúdos & Apps */}
              {modalDigitalApps.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-nuvv-purple font-black text-xs uppercase tracking-wider">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Conteúdos & Apps</span>
                    </div>
                    {effectiveTvConfig.channelsCount > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setChannelsModalTier(effectiveTier);
                        }}
                        className="text-[11px] font-bold text-nuvv-purple hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Ver {effectiveTvConfig.channelsCount} canais</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modalDigitalApps.map((app) => (
                      <div
                        key={app.name}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center space-x-2.5 hover:border-purple-300/80 transition-all shadow-2xs"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
                          <img
                            src={app.logo}
                            alt={app.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
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
              )}

              {/* Diferenciais Inclusos */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Diferenciais Inclusos:</span>
                </span>
                <div className="space-y-1.5">
                  {modalHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna 2: Condições de Pagamento, Serviços Guard, Taxa de Habilitação, Equipamento & CTA */}
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
                    R$ {modalPromoPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                {/* Preço 2: Após vencimento */}
                <div className="pt-2 border-t border-purple-200/60 space-y-1">
                  <div className="flex items-center justify-between px-1 text-xs gap-2">
                    <span className="text-gray-600 font-medium">Valor Original do Plano (após vencimento)</span>
                    <span className="text-gray-700 font-extrabold whitespace-nowrap flex-shrink-0">
                      R$ {(modalPromoPrice + 20.00).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 px-1 leading-snug">
                    * Perda do desconto de pontualidade de R$ 20,00 da banda larga + incidência de multa e juros por atraso.
                  </p>
                </div>
              </div>

              {/* SERVIÇOS NUVV GUARD (TAXAS DE HABILITAÇÃO / ANTECIPADA) */}
              {guardSetup.items.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-100 shadow-2xs space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] font-black text-cyan-900 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Serviços Nuvv Guard (Ativação e Envio)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {guardSetup.items.map((item, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-white border border-cyan-200/80 space-y-1">
                        <div className="flex items-center justify-between font-bold text-cyan-950">
                          <span>{item.name}</span>
                          {item.setupFee > 0 ? (
                            <span className="text-cyan-700 font-extrabold">
                              R$ {item.setupFee.toFixed(2).replace('.', ',')}
                            </span>
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
                <span>Assinar Este Combo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Feasibility Check Modal */}
      <FeasibilityModal
        isOpen={isFeasibilityModalOpen}
        onClose={() => setIsFeasibilityModalOpen(false)}
        initialService="residencial"
        onSelectPlanAndHire={(planName, addr) => {
          onOpenLeadModal(`${planName} (Endereço validado: ${addr})`);
        }}
      />

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
