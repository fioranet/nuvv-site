import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  EntertainmentTier,
  PLAN_ADDONS,
  ResidentialPlan,
  TIER_CONFIG,
  VisionAddonConfig,
  calculateVisionAddonPrice,
  resolveTierAndAddons,
} from '../../data/plans';
import { ResidentialProfileId } from './QuickProfileSelector';
import { ArrowRight, Check, Zap, Eye, ShieldCheck, Phone, HeartPulse, Clock, Sparkles, Video, Wifi } from 'lucide-react';
import { Modal } from '../common/Modal';

interface PlanCardProps {
  plan: ResidentialPlan;
  selectedTier: EntertainmentTier | null;
  activeAddons: Record<string, boolean>;
  visionConfig?: VisionAddonConfig;
  activeProfile?: ResidentialProfileId;
  hideCanaisGlobo?: boolean;
  onSelectPlan: (plan: ResidentialPlan, totalPrice: number) => void;
  onOpenDetails: (plan: ResidentialPlan) => void;
  onOpenChannelsModal: (tier: EntertainmentTier) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  selectedTier,
  activeAddons,
  visionConfig,
  activeProfile,
  hideCanaisGlobo = true,
  onSelectPlan,
  onOpenDetails,
  onOpenChannelsModal,
}) => {
  const effectiveTier: EntertainmentTier = selectedTier || 'cortesia';
  const currentPricing = plan.tierPricing[effectiveTier];
  const resolution = resolveTierAndAddons(effectiveTier, activeAddons);

  // Calculate sum of active regular addons via resolution (accounting for promo discounts and bundle inclusions)
  const addonTotal = resolution.totalAddonPrice;

  // Calculate dynamic vision addon total
  const visionTotal = calculateVisionAddonPrice(visionConfig);

  const finalPromoPrice = currentPricing.promoPrice + addonTotal + visionTotal;
  const finalOriginalPrice = currentPricing.originalPrice + addonTotal + visionTotal;

  // Active addon objects
  const selectedAddonList = Object.entries(activeAddons)
    .filter(([_, active]) => active)
    .map(([key]) => PLAN_ADDONS[key])
    .filter(Boolean);

  // Ordem canônica das marcas
  const BRAND_ORDER = ['watch', 'awdio', 'sony', 'universal', 'premiere', 'combate', 'telecine', 'hbo', 'max'];
  const getBrandRank = (name: string) => {
    const n = name.toLowerCase();
    for (let i = 0; i < BRAND_ORDER.length; i++) {
      if (n.includes(BRAND_ORDER[i])) return i;
    }
    return 99;
  };

  // Base tier apps ordenados pela hierarquia de marcas
  const sortedTierApps = [...currentPricing.includedApps]
    .filter(
      (app) =>
        !app.name.toLowerCase().includes('globo') &&
        !app.logo.toLowerCase().includes('canais_globo')
    )
    .sort((a, b) => getBrandRank(a.name) - getBrandRank(b.name));

  const [isMoreAppsOpen, setIsMoreAppsOpen] = useState(false);

  // Lista unificada de todos os apps e addons inclusos para vitrine
  const allCardApps = useMemo(() => {
    const list: Array<{
      id: string;
      name: string;
      logo?: string;
      icon?: React.ReactNode;
      isHighlight?: boolean;
      highlightClass?: string;
    }> = [];

    // 1. Base tier apps ordenados canonicamente
    sortedTierApps.forEach((app, idx) => {
      const isCinemaHighlight =
        activeProfile === 'filmes-series' &&
        (app.name.toLowerCase().includes('telecine') ||
          app.name.toLowerCase().includes('max') ||
          app.name.toLowerCase().includes('hbo') ||
          app.name.toLowerCase().includes('cinema'));
      const isSportsHighlight =
        activeProfile === 'esportes' &&
        (app.name.toLowerCase().includes('premiere') ||
          app.name.toLowerCase().includes('sportv') ||
          app.name.toLowerCase().includes('espn'));
      const isCompletaoHighlight =
        activeProfile === 'completao' &&
        (app.name.toLowerCase().includes('premiere') ||
          app.name.toLowerCase().includes('combate') ||
          app.name.toLowerCase().includes('telecine') ||
          app.name.toLowerCase().includes('max') ||
          app.name.toLowerCase().includes('hbo'));

      list.push({
        id: `base-${app.name}-${idx}`,
        name: app.name,
        logo: app.logo,
        isHighlight: isCompletaoHighlight || isCinemaHighlight || isSportsHighlight,
        highlightClass: isCompletaoHighlight
          ? 'ring-2 ring-amber-400 shadow-md shadow-amber-500/40 scale-110 z-10 animate-pulse'
          : isCinemaHighlight
          ? 'ring-2 ring-nuvv-purple shadow-md shadow-nuvv-purple/40 scale-110 z-10 animate-pulse'
          : isSportsHighlight
          ? 'ring-2 ring-emerald-500 shadow-md shadow-emerald-500/40 scale-110 z-10 animate-pulse'
          : '',
      });
    });

    // 2. Addons avulsos adicionados pelo usuário
    selectedAddonList
      .filter(
        (addon) =>
          !currentPricing.includedApps.some(
            (app) => app.name.toLowerCase() === addon.name.toLowerCase()
          )
      )
      .forEach((addon) => {
        if (addon.category === 'telefonia') {
          list.push({
            id: addon.id,
            name: addon.name,
            icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-nuvv-purple" />,
          });
        } else if (addon.category === 'saude') {
          list.push({
            id: addon.id,
            name: addon.name,
            icon: <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />,
          });
        } else if (addon.category === 'protecao') {
          list.push({
            id: addon.id,
            name: addon.name,
            icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
          });
        } else if (addon.logo) {
          list.push({
            id: addon.id,
            name: addon.name,
            logo: addon.logo,
          });
        } else {
          list.push({
            id: addon.id,
            name: addon.name,
            icon: <Sparkles className="w-4 h-4 text-nuvv-purple" />,
          });
        }
      });

    // 3. Nuvv Guard Addon Item
    if (visionConfig?.planId) {
      list.push({
        id: 'nuvv-guard',
        name: `Nuvv Guard (${visionConfig.cameraCount}x)`,
        icon: (
          <div className="flex items-center space-x-1">
            <Video className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black text-emerald-800">{visionConfig.cameraCount}x</span>
          </div>
        ),
      });
    }

    return list;
  }, [sortedTierApps, selectedAddonList, currentPricing, activeProfile, visionConfig]);

  const appsContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const el = appsContainerRef.current;
    if (!el) return;

    // Mede imediatamente a largura atual disponível
    const currentW = el.getBoundingClientRect().width;
    if (currentW > 0) {
      setContainerWidth(currentW);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Limite adaptativo e dinâmico de slots visíveis medido pelo espaço real em pixels
  // Cada ícone tem ~40px de largura e gap de 8px (gap-2), totalizando ~48px por slot.
  // Em cards largos (como 2 cards na tela), containerWidth ~370-420px comporta 8 a 9 slots confortavelmente.
  const slotWidth = 46; // 38px ícone + 8px gap
  const maxVisibleSlots = containerWidth > 0
    ? Math.max(5, Math.floor((containerWidth + 8) / slotWidth))
    : 8; // fallback padrão otimista para cards médios/largos

  let visibleApps = allCardApps;
  let hiddenApps: typeof allCardApps = [];
  let overflowCount = 0;

  if (allCardApps.length > maxVisibleSlots) {
    const tailSlots = maxVisibleSlots - 2; // Mantém Watch no início, marcas nobres à direita e +N no final
    overflowCount = allCardApps.length - (1 + tailSlots);
    hiddenApps = allCardApps.slice(1, 1 + overflowCount); // recolhe do segundo em diante
    const tailApps = allCardApps.slice(1 + overflowCount);
    visibleApps = [allCardApps[0], ...tailApps];
  }

  return (
    <div
      className={`relative rounded-3xl bg-white transition-all duration-300 flex flex-col h-full border ${
        plan.isPopular
          ? 'border-nuvv-purple shadow-nuvv-hover ring-2 ring-nuvv-purple/30 md:-translate-y-2'
          : plan.priorityTraffic
          ? 'border-amber-400/80 shadow-nuvv-hover ring-2 ring-amber-400/20'
          : 'border-gray-200 hover:border-nuvv-purple/40 shadow-nuvv-card hover:shadow-md'
      }`}
    >
      {/* Top Banner Tag (e.g. MAIS ESCOLHIDO / HOME OFFICE & PRO GAMER) */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <span
            className={`px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center space-x-1.5 ${
              plan.isPopular
                ? 'bg-nuvv-purple'
                : plan.priorityTraffic
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600'
                : 'bg-nuvv-dark'
            }`}
          >
            {plan.priorityTraffic ? (
              <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-nuvv-green fill-nuvv-green" />
            )}
            <span>{plan.badge}</span>
          </span>
        </div>
      )}

      {/* Card Header: Tier Badge & Channel Count with Grade trigger */}
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between min-h-[36px]">
          <div className="flex flex-wrap gap-1.5 items-center max-w-[65%]">
            <span
              className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                activeProfile === 'completao'
                  ? 'text-amber-800 bg-amber-50 border border-amber-200'
                  : activeProfile === 'filmes-series'
                  ? 'text-nuvv-purple bg-purple-50 border border-purple-200'
                  : activeProfile === 'esportes'
                  ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                  : activeProfile === 'sem-pacote'
                  ? 'text-slate-700 bg-gray-100 border border-gray-200'
                  : selectedTier
                  ? 'text-nuvv-purple bg-indigo-50'
                  : 'text-emerald-700 bg-emerald-50 border border-emerald-100'
              }`}
            >
              {activeProfile === 'filmes-series'
                ? 'Cinema'
                : activeProfile === 'esportes'
                ? 'Esportes'
                : activeProfile === 'completao'
                ? 'Completão'
                : activeProfile === 'sem-pacote'
                ? 'Cortesia'
                : TIER_CONFIG[effectiveTier].label}
            </span>

            {/* Nuvv Guard Badges */}
            {visionConfig?.planId && (
              <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md shadow-2xs">
                {visionConfig.planId.includes('3d')
                  ? `+ GUARD 3D (${visionConfig.cameraCount}x)`
                  : visionConfig.planId.includes('7d')
                  ? `+ GUARD 7D (${visionConfig.cameraCount}x)`
                  : visionConfig.planId.includes('intercom')
                  ? '+ INTERFONE QR'
                  : `+ NUVV GUARD (${visionConfig.cameraCount}x)`}
              </span>
            )}

            {/* Other Addon Badges */}
            {selectedAddonList.map((addon) => {
              const isIncluded = !!TIER_CONFIG[effectiveTier]?.includedAddons?.includes(addon.id);
              const isCinemaHighlight =
                activeProfile === 'filmes-series' && (addon.id === 'telecine' || addon.id === 'hboMax');
              const isSportsHighlight =
                activeProfile === 'esportes' && addon.id === 'premiere';
              const isCompletaoHighlight =
                activeProfile === 'completao' &&
                (addon.id === 'telecine' ||
                  addon.id === 'hboMax' ||
                  addon.id === 'premiere' ||
                  addon.id === 'combate');

              return (
                <span
                  key={addon.id}
                  className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-2xs transition-all ${
                    isCompletaoHighlight
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 ring-2 ring-amber-400 font-black animate-pulse shadow-md shadow-amber-500/30'
                      : isCinemaHighlight
                      ? 'bg-nuvv-purple ring-2 ring-amber-300 font-black animate-pulse'
                      : isSportsHighlight
                      ? 'bg-emerald-600 ring-2 ring-yellow-300 font-black animate-pulse'
                      : isIncluded
                      ? 'bg-emerald-600'
                      : 'bg-nuvv-violet'
                  }`}
                >
                  {isIncluded ? `${addon.badge} INCLUSO` : addon.badge}
                </span>
              );
            })}
          </div>

          <div className="text-right flex-shrink-0">
            <span
              className={`text-sm font-black block transition-all duration-300 ${
                activeProfile === 'completao'
                  ? 'text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-lg ring-2 ring-amber-400 shadow-xs animate-pulse font-black'
                  : 'text-nuvv-dark'
              }`}
            >
              {resolution.channelsCount} Canais
            </span>
            <button
              type="button"
              onClick={() => onOpenChannelsModal(effectiveTier)}
              className="text-xs text-nuvv-purple hover:underline font-bold cursor-pointer"
            >
              Ver grade
            </button>
          </div>
        </div>

        {/* Speed Title */}
        <div className="mt-3 text-center">
          <div className="text-4xl sm:text-5xl font-black text-nuvv-dark tracking-tight">
            {plan.speed} <span className="text-2xl sm:text-3xl font-extrabold">{plan.unit}</span>
          </div>
          <div className="flex justify-center mt-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>Wi-Fi incluso</span>
            </span>
          </div>
        </div>

        {/* 1 Giga Special VIP Callout for Home Office & Gamers */}
        {plan.priorityTraffic && (
          <div className="mt-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-0.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center justify-center space-x-1">
              <span>⚡ PRIORIDADE DE BANDA • SLA 24H</span>
            </div>
            <div className="text-[10px] font-bold text-gray-600">
              Ideal para Home Office & Pro Gamers
            </div>
          </div>
        )}

        {/* Price Box */}
        <div className="mt-2.5 text-center">
          <div className="text-xs text-gray-400 line-through font-medium">
            De R$ {finalOriginalPrice.toFixed(2).replace('.', ',')}/mês
          </div>
          <div className="flex items-baseline justify-center space-x-1 text-nuvv-dark">
            <span className="text-sm font-bold text-gray-500">Por R$</span>
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-nuvv-dark">
              {Math.floor(finalPromoPrice)}
            </span>
            <span className="text-base sm:text-lg font-bold">
              ,{(finalPromoPrice % 1).toFixed(2).substring(2)}
            </span>
            <span className="text-xs text-gray-500 font-semibold">/mês</span>
          </div>
          <span className="inline-block mt-1 text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
            Pagamento até o Vencimento
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        {/* Promo banner container */}
        <div className="min-h-[44px] flex items-center">
          {currentPricing.promoBanner ? (
            <div className="w-full p-2.5 bg-red-50/90 border border-red-100 rounded-xl flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-500 text-white rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                ★
              </div>
              <p className="text-xs font-bold text-red-700 leading-tight">
                {currentPricing.promoBanner}
              </p>
            </div>
          ) : plan.priorityTraffic ? (
            <div className="w-full p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center space-x-2">
              <div className="w-5 h-5 bg-amber-500 text-white rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                ★
              </div>
              <p className="text-xs font-bold text-amber-800 leading-tight">
                Suporte VIP com atendimento em até 24h
              </p>
            </div>
          ) : (
            <div className="w-full p-2.5 bg-indigo-50/50 border border-indigo-100/60 rounded-xl flex items-center space-x-2">
              <div className="w-5 h-5 bg-nuvv-purple text-white rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                ✓
              </div>
              <p className="text-xs font-bold text-nuvv-purple leading-tight">
                Instalação grátis 100% fibra óptica
              </p>
            </div>
          )}
        </div>

        {/* Included Apps and Addons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Apps & Streamings
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Incluso</span>
            </span>
          </div>

          <div ref={appsContainerRef} className="flex flex-wrap items-center gap-2 min-h-[40px]">
            {visibleApps.map((item) => (
              <div
                key={item.id}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs hover:scale-105 transition-all flex items-center justify-center flex-shrink-0 ${
                  item.highlightClass || 'bg-slate-50 border border-slate-200/80'
                }`}
                title={item.name}
              >
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  item.icon
                )}
              </div>
            ))}

            {/* Badge +N sempre posicionado no final da fileira */}
            {overflowCount > 0 && (
              <button
                type="button"
                onClick={() => setIsMoreAppsOpen(true)}
                title={`Ver mais conteúdos inclusos (+${overflowCount})`}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xs hover:bg-nuvv-purple hover:scale-105 transition-all cursor-pointer flex-shrink-0"
              >
                +{overflowCount}
              </button>
            )}
          </div>
        </div>



        {/* Action Button & Details Link */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={() => onSelectPlan(plan, finalPromoPrice)}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 ${
              plan.isPopular
                ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover shadow-nuvv-purple/30'
                : plan.priorityTraffic
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-orange-600/30'
                : 'bg-nuvv-dark hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
            }`}
          >
            <span>Assinar Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenDetails(plan)}
            className="w-full text-center text-xs font-bold text-gray-400 hover:text-nuvv-purple uppercase tracking-wider transition-colors cursor-pointer"
          >
            Ver Detalhes Completos
          </button>

          {/* Disclaimer de Marcas Registradas */}
          {resolution.channelsCount > 18 && (
            <p className="text-[9px] text-slate-400/90 text-center leading-tight pt-1 px-1">
              *Canais e conteúdos Premiere, Combate, Telecine, Sony One e Universal+ integrados ao app Watch Brasil. Marcas registradas pertencentes aos seus respectivos titulares. Todos os direitos reservados.
            </p>
          )}
        </div>
      </div>

      {/* Mini-Modal para Exibir Demais Apps Inclusos (+N) */}
      <Modal
        isOpen={isMoreAppsOpen}
        onClose={() => setIsMoreAppsOpen(false)}
        title={`Também Inclusos no Combo ${plan.speed} ${plan.unit}`}
        subtitle="Demais plataformas e conteúdos integrados inclusos no seu plano"
        maxWidth="sm"
      >
        <div className="space-y-4 py-1">
          <div className="flex items-center justify-center gap-3 flex-wrap p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
            {hiddenApps.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white transition-all text-center"
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-slate-200/70 bg-white flex items-center justify-center">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain p-1 rounded-2xl"
                    />
                  ) : (
                    item.icon
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight max-w-[80px]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsMoreAppsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white font-bold text-xs transition-all cursor-pointer"
            >
              Entendi
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
