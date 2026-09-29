import React, { useState, useEffect } from 'react';
import {
  EntertainmentTier,
  PLAN_ADDONS,
  PlanAddon,
  PlanAddonCategory,
  TIER_CONFIG,
  resolveTierAndAddons,
} from '../../data/plans';
import {
  Tv,
  Sparkles,
  Check,
  Layers,
  Eye,
  HeartPulse,
  ShieldCheck,
  Phone,
  Clapperboard,
  Video,
  Plus,
  Minus,
  Star,
  Trophy,
  Film,
  Info,
  X,
  QrCode,
  Tag,
  RotateCcw,
} from 'lucide-react';

interface PlanSelectorProps {
  selectedTier: EntertainmentTier | null;
  onSelectTier: (tier: EntertainmentTier | null) => void;
  activeAddons: Record<string, boolean>;
  onToggleAddon: (addonKey: string) => void;
  onOpenChannelsModal?: (tier: EntertainmentTier) => void;
  onOpenProtecaoModal?: () => void;
  onResetSelection?: () => void;
}

type TvCategoryTab = 'destaque' | 'completo' | 'essencial' | 'basico' | 'cortesia';

const TV_CATEGORY_TABS: { id: TvCategoryTab; label: string; icon: any; badge?: string }[] = [
  { id: 'destaque', label: 'Super Ofertas', icon: Star, badge: 'CINEMA & ESPORTES' },
  { id: 'completo', label: 'Completo', icon: Trophy, badge: 'PREMIERE + COMBATE' },
  { id: 'essencial', label: 'Essencial', icon: Film, badge: '68 CANAIS' },
  { id: 'basico', label: 'Básico', icon: Tv, badge: 'VARIEDADES' },
  { id: 'cortesia', label: 'Só Fibra (Cortesia)', icon: Layers, badge: 'R$ 0,00' },
];

const PACKAGES_BY_CATEGORY: Record<TvCategoryTab, EntertainmentTier[]> = {
  destaque: ['mais-cinema', 'mais-esportes', 'completao-familia'],
  completo: ['completo', 'completo-telecine'],
  essencial: ['essencial', 'essencial-telecine', 'essencial-max'],
  basico: ['basico', 'basico-telecine'],
  cortesia: ['cortesia'],
};

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedTier,
  onSelectTier,
  activeAddons,
  onToggleAddon,
  onOpenChannelsModal,
  onOpenProtecaoModal,
  onResetSelection,
}) => {
  const effectiveTier: EntertainmentTier = selectedTier || 'cortesia';
  const currentCategory = TIER_CONFIG[effectiveTier]?.categoryGroup || 'destaque';

  const [activeTvTab, setActiveTvTab] = useState<TvCategoryTab>(currentCategory);
  const [activeCategory, setActiveCategory] = useState<PlanAddonCategory>('streaming');
  const resolution = resolveTierAndAddons(effectiveTier, activeAddons);

  const hasCustomSelection =
    (selectedTier !== null && selectedTier !== 'cortesia') ||
    Object.values(activeAddons).some(Boolean);

  // Sync tab with selected tier when selectedTier changes
  useEffect(() => {
    if (selectedTier) {
      const cat = TIER_CONFIG[selectedTier]?.categoryGroup;
      if (cat && cat !== activeTvTab) {
        setActiveTvTab(cat);
      }
    }
  }, [selectedTier]);

  const addonCategories = [
    { id: 'streaming', label: 'Streamings & TV', icon: Clapperboard },
    { id: 'saude', label: 'Telemedicina & Saúde', icon: HeartPulse },
    { id: 'protecao', label: 'Segurança Digital', icon: ShieldCheck },
    { id: 'telefonia', label: 'Telefonia Fixa', icon: Phone },
  ] as const;

  const filteredAddons = Object.entries(PLAN_ADDONS).filter(
    ([_, addon]) => addon.category === activeCategory
  );

  const renderAddonIcon = (addon: PlanAddon) => {
    if (addon.category === 'protecao') {
      return (
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
        </div>
      );
    }
    if (addon.category === 'telefonia') {
      return (
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-nuvv-purple border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-nuvv-purple" />
        </div>
      );
    }
    if (addon.category === 'saude') {
      return (
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      );
    }
    if (addon.logo) {
      return (
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
          <img
            src={addon.logo}
            alt={addon.name}
            className="max-h-5 sm:max-h-6 max-w-full object-contain"
          />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-nuvv-purple flex items-center justify-center flex-shrink-0 shadow-2xs">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-nuvv-card border border-gray-100 max-w-5xl mx-auto mb-8 space-y-6">
      {/* 1. Escolha do Pacote de TV e Streaming */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
          <span className="text-xs sm:text-sm font-extrabold text-nuvv-dark uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-nuvv-purple" />
            <span>1. Escolha o Pacote de TV e Streaming</span>
          </span>

          <div className="flex items-center gap-2.5">
            {onResetSelection && hasCustomSelection && (
              <button
                type="button"
                onClick={onResetSelection}
                className="text-xs font-bold text-gray-400 hover:text-rose-600 transition-colors flex items-center space-x-1 cursor-pointer bg-gray-50 hover:bg-rose-50 px-2.5 py-1 rounded-xl border border-gray-200/80 hover:border-rose-200"
                title="Limpar seleção e recomeçar do início"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar seleção</span>
              </button>
            )}
            {selectedTier && selectedTier !== 'cortesia' && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>{TIER_CONFIG[selectedTier].label} (+R$ {TIER_CONFIG[selectedTier].extraPrice.toFixed(2).replace('.', ',')})</span>
              </span>
            )}
            {onOpenChannelsModal && (
              <button
                type="button"
                onClick={() => onOpenChannelsModal(effectiveTier)}
                className="text-xs sm:text-sm font-bold text-nuvv-purple hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Ver grade de canais</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs for TV Packages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70 mb-3.5">
          {TV_CATEGORY_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isTabActive = activeTvTab === tab.id;
            const isCurrentCategorySelected =
              selectedTier && TIER_CONFIG[selectedTier]?.categoryGroup === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTvTab(tab.id)}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all text-center relative cursor-pointer ${
                  isTabActive
                    ? 'bg-nuvv-dark text-white shadow-sm ring-1 ring-nuvv-dark'
                    : 'bg-white/80 hover:bg-white text-gray-700 hover:text-nuvv-dark border border-gray-200/60 shadow-2xs'
                } ${idx === TV_CATEGORY_TABS.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isTabActive ? 'text-nuvv-green' : 'text-gray-500'}`} />
                <span className="leading-tight truncate">{tab.label}</span>
                {isCurrentCategorySelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 right-1.5 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Package Cards for the Active Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PACKAGES_BY_CATEGORY[activeTvTab].map((tierKey) => {
            const config = TIER_CONFIG[tierKey];
            const isSelected = selectedTier === tierKey || (tierKey === 'cortesia' && !selectedTier);

            return (
              <div
                key={tierKey}
                onClick={() => onSelectTier(isSelected && tierKey !== 'cortesia' ? null : tierKey)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer group relative ${
                  isSelected
                    ? 'bg-nuvv-dark text-white border-nuvv-dark shadow-md ring-2 ring-nuvv-purple/40'
                    : 'bg-gray-50/80 hover:bg-gray-100/90 text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  {/* Top Bar: Channels Count & Selection Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                        isSelected
                          ? 'bg-nuvv-purple text-white'
                          : 'bg-white text-nuvv-dark border border-gray-200'
                      }`}
                    >
                      {config.channelsCount} Canais
                    </span>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-nuvv-green bg-nuvv-green text-nuvv-dark'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Title & Extra Price */}
                  <div className="mb-2">
                    <div className="text-sm sm:text-base font-black flex items-center space-x-1.5">
                      <span>{config.label}</span>
                      {isSelected && <Sparkles className="w-4 h-4 text-nuvv-green" />}
                    </div>
                    <div
                      className={`text-xs font-extrabold mt-0.5 ${
                        isSelected ? 'text-nuvv-green' : 'text-nuvv-purple'
                      }`}
                    >
                      {config.extraPriceLabel}
                    </div>
                  </div>

                  {/* Included Apps Icons */}
                  {config.includedApps && config.includedApps.length > 0 && (() => {
                    const BRAND_ORDER = ['watch', 'awdio', 'sony', 'universal', 'premiere', 'combate', 'telecine', 'hbo', 'max'];
                    const getBrandRank = (name: string) => {
                      const n = name.toLowerCase();
                      for (let i = 0; i < BRAND_ORDER.length; i++) {
                        if (n.includes(BRAND_ORDER[i])) return i;
                      }
                      return 99;
                    };
                    const sortedApps = [...config.includedApps]
                      .filter(
                        (app) =>
                          !app.name.toLowerCase().includes('globo') &&
                          !app.name.toLowerCase().includes('awdio')
                      )
                      .sort((a, b) => getBrandRank(a.name) - getBrandRank(b.name));

                    return (
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                        {sortedApps.map((app) => (
                          <span
                            key={app.name}
                            className={`inline-flex items-center space-x-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isSelected
                                ? 'bg-white/15 text-white'
                                : 'bg-white text-gray-700 border border-gray-200'
                            }`}
                          >
                            {app.logo && (
                              <img
                                src={app.logo}
                                alt={app.name}
                                className="w-3.5 h-3.5 object-contain flex-shrink-0"
                              />
                            )}
                            <span className="truncate">{app.name}</span>
                          </span>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Description */}
                  <p
                    className={`text-[11px] leading-snug line-clamp-2 ${
                      isSelected ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {config.description}
                  </p>
                </div>

                {/* Footer Action: Ver Canais */}
                <div className="mt-3 pt-2 border-t border-gray-100/20 flex items-center justify-between text-[11px]">
                  {onOpenChannelsModal && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChannelsModal(tierKey);
                      }}
                      className={`font-bold hover:underline flex items-center space-x-1 cursor-pointer ${
                        isSelected ? 'text-indigo-200 hover:text-white' : 'text-nuvv-purple'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver grade</span>
                    </button>
                  )}

                  <span
                    className={`font-black uppercase tracking-wider text-[10px] ${
                      isSelected ? 'text-nuvv-green' : 'text-gray-400 group-hover:text-gray-700'
                    }`}
                  >
                    {isSelected ? 'Selecionado' : 'Selecionar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Adicionais Opcionais no Plano (À la Carte) */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <span className="text-xs sm:text-sm font-extrabold text-nuvv-dark uppercase tracking-wider flex items-center space-x-2">
            <Tv className="w-4 h-4 text-nuvv-purple" />
            <span>2. Adicionais Opcionais no Plano (À la Carte)</span>
          </span>
          <div className="flex items-center gap-3">
            {onResetSelection && hasCustomSelection && (
              <button
                type="button"
                onClick={onResetSelection}
                className="text-[11px] font-bold text-gray-400 hover:text-rose-600 transition-colors inline-flex items-center space-x-1 cursor-pointer"
                title="Limpar seleção e recomeçar do início"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar seleção</span>
              </button>
            )}
            <span className="text-xs text-gray-400 font-medium">Selecione para turbinar sua conexão</span>
          </div>
        </div>

        {/* Category Filter Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70">
          {addonCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full py-2.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all text-center cursor-pointer ${
                  isCatActive
                    ? 'bg-nuvv-purple text-white shadow-sm ring-1 ring-nuvv-purple'
                    : 'bg-white/80 hover:bg-white text-gray-700 hover:text-nuvv-dark border border-gray-200/60 shadow-2xs'
                } ${idx === addonCategories.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isCatActive ? 'text-nuvv-green' : 'text-gray-500'}`} />
                <span className="leading-tight truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Segurança Digital (Kaspersky) */}
        {activeCategory === 'protecao' && (
          <div className="space-y-2.5 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredAddons.map(([key, addon]) => {
                const isIncludedInPromo = !!TIER_CONFIG[effectiveTier]?.includedAddons?.includes(key);
                const isActive = !!activeAddons[key];

                return (
                  <div
                    key={key}
                    onClick={() => onToggleAddon(key)}
                    className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                      isIncludedInPromo && isActive
                        ? 'border-emerald-500 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/30'
                        : isActive
                        ? 'border-emerald-500 bg-emerald-50/80 shadow-sm ring-2 ring-emerald-500/30'
                        : 'border-emerald-200/80 bg-white hover:border-emerald-400 hover:bg-emerald-50/20 shadow-2xs'
                    }`}
                  >
                    {/* Left Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-black text-gray-900 group-hover:text-emerald-950 transition-colors truncate">
                        {addon.name}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5 leading-snug">
                        {addon.description}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProtecaoModal?.();
                        }}
                        className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 hover:underline inline-flex items-center gap-1 mt-2 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-emerald-600" />
                        <span>Saber mais</span>
                      </button>
                    </div>

                    {/* Right Price + Action */}
                    <div className="text-right flex-shrink-0 flex flex-col items-end justify-center space-y-1.5 pl-2">
                      <div className="text-sm sm:text-base font-black text-emerald-600 whitespace-nowrap">
                        <span>R$&nbsp;{addon.price.toFixed(2).replace('.', ',')}</span>
                        <span className="text-[10px] text-gray-400 font-normal ml-0.5">/mês</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleAddon(key);
                        }}
                        className={`text-xs font-bold px-3 py-1 rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-2xs flex items-center space-x-1'
                            : 'text-nuvv-purple hover:bg-purple-50 font-black'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Incluso</span>
                          </>
                        ) : (
                          'Adicionar'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Telefonia Fixa: Card Maior e Nome Completo em 2 Linhas Visíveis */}
        {activeCategory === 'telefonia' && (
          <div className="animate-fade-in max-w-2xl">
            {filteredAddons.map(([key, addon]) => {
              const details = resolution.effectiveAddonPrices[key] || {
                addonId: key,
                name: addon.name,
                originalPrice: addon.price,
                effectivePrice: addon.price,
                isIncluded: false,
                isPromo: false,
              };
              const isIncludedInPromo = details.isIncluded;
              const isActive = !!activeAddons[key] || isIncludedInPromo;

              return (
                <div
                  key={key}
                  onClick={() => {
                    if (isIncludedInPromo) return;
                    onToggleAddon(key);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group ${
                    isIncludedInPromo
                      ? 'border-emerald-500 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/30'
                      : isActive
                      ? 'border-nuvv-purple bg-indigo-50/90 shadow-sm ring-2 ring-nuvv-purple/30'
                      : 'border-indigo-200/80 bg-white hover:border-nuvv-purple hover:bg-indigo-50/20 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <Phone className="w-6 h-6 text-nuvv-purple" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Nome em duas linhas visíveis */}
                      <div className="leading-tight">
                        <span className="block text-sm sm:text-base font-black text-gray-900 group-hover:text-nuvv-purple transition-colors">
                          Linha Telefônica Fixa
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold text-nuvv-purple mt-0.5">
                          Ilimitado Brasil
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 font-medium mt-1.5 leading-relaxed">
                        {addon.description || 'Ligações ilimitadas para fixos de todo o Brasil e celulares com tecnologia 100% fibra óptica.'}
                      </p>
                    </div>
                  </div>

                  {/* Preço e Botão de Ação */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                        Assinatura
                      </span>
                      <div className="text-base sm:text-lg font-black text-nuvv-purple whitespace-nowrap">
                        R$ {details.effectivePrice.toFixed(2).replace('.', ',')}
                        <span className="text-xs font-normal text-gray-500 ml-0.5">/mês</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isIncludedInPromo) return;
                        onToggleAddon(key);
                      }}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-nuvv-purple text-white shadow-sm'
                          : 'bg-indigo-100 hover:bg-indigo-200 text-nuvv-purple font-black'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Adicionado</span>
                        </>
                      ) : (
                        <span>Adicionar Linha</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Telemedicina & Saúde: Nomes dos Planos Otimizados e Sem Quebra de Texto */}
        {activeCategory === 'saude' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-fade-in">
            {filteredAddons.map(([key, addon]) => {
              const details = resolution.effectiveAddonPrices[key] || {
                addonId: key,
                name: addon.name,
                originalPrice: addon.price,
                effectivePrice: addon.price,
                isIncluded: false,
                isPromo: false,
              };
              const isIncludedInPromo = details.isIncluded;
              const isActive = !!activeAddons[key] || isIncludedInPromo;

              // Nomes específicos solicitados para caber sem quebra de texto
              const SAUDE_DISPLAY_NAMES: Record<string, string> = {
                'telemed-essencial-ind': 'Essencial Individual',
                'telemed-essencial-fam': 'Essencial Familiar',
                'telemed-premium-ind': 'Premium Individual',
                'telemed-premium-fam': 'Premium Familiar',
              };
              const displayName = SAUDE_DISPLAY_NAMES[key] || addon.name;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (isIncludedInPromo) return;
                    onToggleAddon(key);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-1.5 group cursor-pointer ${
                    isIncludedInPromo
                      ? 'border-emerald-500 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/30'
                      : isActive
                      ? 'border-rose-500 bg-rose-50/90 shadow-sm ring-2 ring-rose-500/30'
                      : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <HeartPulse className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="whitespace-nowrap leading-tight">
                        <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-black text-gray-900 group-hover:text-rose-600 transition-colors whitespace-nowrap tracking-tight block">
                          {displayName}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-col justify-center leading-tight min-h-[30px]">
                        <div className="text-xs font-extrabold text-rose-600 whitespace-nowrap">
                          + R$ {details.effectivePrice.toFixed(2).replace('.', ',')}/mês
                        </div>
                        <div className="text-[9.5px] text-gray-400 font-medium truncate mt-0.5">
                          {addon.badge || 'TurboMed 24h'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ml-1 transition-colors ${
                      isActive
                        ? 'bg-rose-600 text-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Standard Addon Cards Grid for Streamings */}
        {activeCategory === 'streaming' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 animate-fade-in">
            {filteredAddons.map(([key, addon]) => {
              const details = resolution.effectiveAddonPrices[key] || {
                addonId: key,
                name: addon.name,
                originalPrice: addon.price,
                effectivePrice: addon.price,
                isIncluded: false,
                isPromo: false,
              };
              const isIncludedInPromo = details.isIncluded;
              const isActive = !!activeAddons[key] || isIncludedInPromo;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (isIncludedInPromo) return; // already included in bundle
                    onToggleAddon(key);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-1.5 group cursor-pointer ${
                    isIncludedInPromo
                      ? 'border-emerald-500 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/30'
                      : isActive
                      ? 'border-nuvv-purple bg-indigo-50/90 shadow-sm ring-2 ring-nuvv-purple/30'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                    {renderAddonIcon(addon)}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 whitespace-nowrap min-w-0 leading-tight">
                        <span className="text-xs font-black text-gray-900 group-hover:text-nuvv-purple transition-colors truncate">
                          {addon.name}
                        </span>
                        {isIncludedInPromo ? (
                          <span className="text-[8.5px] font-black uppercase px-1.5 py-0.5 bg-emerald-600 text-white rounded-md tracking-wider shadow-2xs whitespace-nowrap flex-shrink-0">
                            INCLUSO
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-1 flex flex-col justify-center leading-tight min-h-[32px]">
                        {isIncludedInPromo ? (
                          <>
                            <div className="text-xs font-extrabold text-emerald-700 whitespace-nowrap">
                              R$ 0,00 (Incluso)
                            </div>
                            <div className="text-[10px] text-gray-400 font-medium line-through whitespace-nowrap mt-0.5">
                              De R$ {details.originalPrice.toFixed(2).replace('.', ',')}
                            </div>
                          </>
                        ) : (
                          <div className="text-xs font-extrabold text-nuvv-purple whitespace-nowrap">
                            + R$ {details.effectivePrice.toFixed(2).replace('.', ',')}/mês
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ml-1 transition-colors ${
                      isIncludedInPromo
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-nuvv-purple text-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
