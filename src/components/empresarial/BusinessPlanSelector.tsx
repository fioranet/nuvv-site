import React, { useState } from 'react';
import {
  BUSINESS_PLANS,
  BusinessPlan,
  PABX_PLANS,
  PabxPlan,
  TELEPHONY_PLANS,
  TelephonyPlan,
  BUSINESS_TV_PLANS,
  BusinessTvPlan,
} from '../../data/businessPlans';
import { MULTIATENDIMENTO_PLANS, MultiAtendimentoPlan } from '../../data/multiatendimentoData';
import { PLAN_ADDONS } from '../../data/plans';
import { SECURITY_PLANS, SecurityPlan } from '../../data/securityPlans';
import { SOCIAL_WIFI_PLANS, SocialWifiPlan } from '../../data/socialWifiData';
import {
  BusinessComboSelection,
  BusinessConnectivityType,
  calculateBusinessCombo,
  DEFAULT_BUSINESS_COMBO,
} from '../../data/businessPricing';
import { Modal } from '../common/Modal';
import {
  Wifi,
  Server,
  Phone,
  PhoneCall,
  MessageSquare,
  Video,
  ShieldCheck,
  Radio,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Network,
  RotateCcw,
  Zap,
  Building2,
  CheckCircle2,
  Tv,
  QrCode,
  Tag,
  Eye,
  Play,
  Layers,
} from 'lucide-react';
import {
  ComboLeadSummary,
  buildBusinessComboSummary,
  saveComboSummaryToStorage,
} from '../../services/comboSummary';

interface BusinessPlanSelectorProps {
  currentCity?: string;
  onOpenLeadModal: (planName?: string, summaryData?: ComboLeadSummary | null) => void;
}

type SolutionCategoryTab =
  | 'pabx'
  | 'telefonia'
  | 'multiatendimento'
  | 'vision'
  | 'seguranca'
  | 'hotspot'
  | 'tv';

export const BusinessPlanSelector: React.FC<BusinessPlanSelectorProps> = ({
  currentCity = 'Sua Cidade',
  onOpenLeadModal,
}) => {
  const [combo, setCombo] = useState<BusinessComboSelection>(DEFAULT_BUSINESS_COMBO);
  const [activeTab, setActiveTab] = useState<SolutionCategoryTab>('pabx');
  const [isChannelsModalOpen, setIsChannelsModalOpen] = useState(false);

  const summary = calculateBusinessCombo(combo);

  const tabs = [
    { id: 'pabx' as const, label: 'PABX em Nuvem', icon: PhoneCall, count: combo.pabxPlanId ? 1 : 0 },
    { id: 'telefonia' as const, label: 'Telefonia IP', icon: Phone, count: combo.telephonyPlanId ? 1 : 0 },
    { id: 'multiatendimento' as const, label: 'Multiatendimento', icon: MessageSquare, count: combo.multiatendimentoPlanId ? 1 : 0 },
    { id: 'vision' as const, label: 'Nuvv Guard', icon: Video, count: (combo.guardCameraPlanId || combo.visionPlanId || combo.guardIntercomPlanId || combo.guardTagPlanId) ? 1 : 0 },
    { id: 'seguranca' as const, label: 'Segurança Digital', icon: ShieldCheck, count: combo.securityPlanId ? 1 : 0 },
    { id: 'hotspot' as const, label: 'Hotspot Wi-Fi', icon: Radio, count: combo.socialWifiPlanId ? 1 : 0 },
    { id: 'tv' as const, label: 'Esporte e Notícia', icon: Tv, count: combo.tvPlanId ? 1 : 0 },
  ];

  const currentConnectivityPlans = BUSINESS_PLANS[combo.connectivityType] || [];

  const handleReset = () => {
    setCombo(DEFAULT_BUSINESS_COMBO);
  };

  const handleProceedLead = () => {
    const leadSummary = buildBusinessComboSummary({
      selection: combo,
      cityName: currentCity,
    });
    saveComboSummaryToStorage(leadSummary);
    onOpenLeadModal(leadSummary.rawSummary, leadSummary);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Base Connectivity Selection */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-nuvv-card border border-gray-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
              <Wifi className="w-3.5 h-3.5" />
              <span>Etapa 1: Conectividade Base</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">
              Escolha a Internet Corporativa para sua Empresa
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Fibra óptica com ultraestabilidade e atendimento B2B dedicado em {currentCity}.
            </p>
          </div>

          {/* Switcher: Banda Larga vs Semi-Dedicado */}
          <div className="flex items-center p-1 bg-gray-100 rounded-2xl w-full sm:w-fit flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                const defaultPlan = BUSINESS_PLANS['banda-larga'][1]?.id || 'biz-plus-800';
                setCombo((prev) => ({ ...prev, connectivityType: 'banda-larga', planId: defaultPlan }));
              }}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                combo.connectivityType === 'banda-larga'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-nuvv-dark'
              }`}
            >
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span>Banda Larga PME</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const defaultPlan = BUSINESS_PLANS['semi-dedicado'][1]?.id || 'biz-semi-500';
                setCombo((prev) => ({ ...prev, connectivityType: 'semi-dedicado', planId: defaultPlan }));
              }}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                combo.connectivityType === 'semi-dedicado'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-nuvv-dark'
              }`}
            >
              <Server className="w-4 h-4 text-emerald-600" />
              <span>Semi-Dedicado (IP Fixo)</span>
            </button>
          </div>
        </div>

        {/* Connectivity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentConnectivityPlans.map((plan) => {
            const isSelected = combo.planId === plan.id;
            const price = plan.promoPrice ?? plan.originalPrice ?? 0;
            const originalPrice = plan.originalPrice;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setCombo((prev) => ({ ...prev, planId: plan.id }))}
                className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/30 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/80 shadow-2xs'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-4">
                    <span
                      className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full text-white shadow-2xs ${
                        plan.isPopular ? 'bg-emerald-600' : 'bg-slate-800'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                      {plan.name}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black text-nuvv-dark mt-2 tracking-tight">
                    {plan.speed} <span className="text-xl sm:text-2xl font-bold">{plan.unit}</span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-xs text-gray-500">R$</span>
                      <span className="text-2xl font-black text-emerald-700">
                        {price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">/mês</span>
                    </div>
                    {originalPrice && originalPrice > price && (
                      <span className="text-[11px] text-gray-400 line-through block">
                        De R$ {originalPrice.toFixed(2).replace('.', ',')}/mês
                      </span>
                    )}
                  </div>

                  {/* Special 1 Giga Differentiator Highlight */}
                  {plan.slaHours === 24 && (
                    <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-[11px] font-black text-emerald-950 flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 fill-emerald-600" />
                      <span>SLA 24h (Metade do tempo) & CIR {plan.cirGuarantee}</span>
                    </div>
                  )}

                  {/* Highlights */}
                  <ul className="mt-4 pt-3 border-t border-gray-200/80 space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className={plan.slaHours === 24 ? 'font-extrabold text-emerald-950 bg-emerald-100/60 px-1.5 py-0.5 rounded' : ''}>
                        Atendimento Técnico (SLA): {plan.slaHours}h {plan.slaHours === 24 ? '(Prioritário B2B)' : ''}
                      </span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{plan.ipType || 'IP Dinâmico'}</span>
                    </li>
                    {plan.cirGuarantee && (
                      <li className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className={plan.slaHours === 24 ? 'font-extrabold text-emerald-950 bg-emerald-100/60 px-1.5 py-0.5 rounded' : ''}>
                          Garantia de Banda (CIR): {plan.cirGuarantee} {plan.slaHours === 24 ? '(Acima do Residencial)' : ''}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Business Addon Solutions (Category Tabs) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-nuvv-card border border-gray-100 space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-nuvv-purple text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Etapa 2: Soluções Corporativas Integradas</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">
            Turbine o Pacote com Soluções de Telefonia, IA, Câmeras e Segurança
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Adicione ramais virtuais, linhas fixas, CRM de atendimento, gravação de câmeras ou antivírus corporativo.
          </p>
        </div>

        {/* Tab Switcher: Sem quebra de linha, nomes 100% completos e responsivo */}
        <div className="flex flex-wrap lg:flex-nowrap gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70 overflow-x-auto scrollbar-none">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 min-w-[130px] lg:min-w-0 py-2.5 px-2.5 rounded-xl text-xs xl:text-sm font-extrabold flex items-center justify-center space-x-1.5 transition-all text-center whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-nuvv-dark text-white shadow-sm ring-1 ring-nuvv-dark'
                    : 'bg-white/80 hover:bg-white text-gray-700 hover:text-nuvv-dark border border-gray-200/60 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isActive ? 'text-nuvv-green' : 'text-gray-500'}`} />
                <span className="whitespace-nowrap">{t.label}</span>
                {t.count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] flex items-center justify-center flex-shrink-0 ml-1">
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: PABX em Nuvem */}
        {activeTab === 'pabx' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span>Selecione o plano de PABX com ramais virtuais para sua equipe:</span>
              {combo.pabxPlanId && (
                <button
                  type="button"
                  onClick={() => setCombo((p) => ({ ...p, pabxPlanId: null }))}
                  className="text-rose-600 font-bold hover:underline"
                >
                  Remover PABX
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PABX_PLANS.filter((pabx) => pabx.id !== 'pabx-100').map((pabx) => {
                const isSelected = combo.pabxPlanId === pabx.id;
                return (
                  <button
                    key={pabx.id}
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        pabxPlanId: p.pabxPlanId === pabx.id ? null : pabx.id,
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-nuvv-purple bg-indigo-50/70 ring-2 ring-nuvv-purple/30 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-nuvv-purple uppercase">
                          {pabx.name}
                        </span>
                        {pabx.badge && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-nuvv-purple text-white">
                            {pabx.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-nuvv-dark mt-1">
                        {pabx.extensionCount}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {pabx.targetAudience}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <span className="text-lg font-black text-nuvv-purple">
                          + R$ {pabx.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-gray-500">/mês</span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-nuvv-purple text-white' : 'border-2 border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 2: Telefonia IP */}
        {activeTab === 'telefonia' && (
          <div className="space-y-4 animate-fade-in">
            {/* Header & Line Counter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs">
              <div className="flex items-center space-x-2.5 text-indigo-950 font-bold">
                <div className="w-7 h-7 rounded-xl bg-nuvv-purple text-white flex items-center justify-center shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-xs sm:text-sm text-indigo-950">
                    Quantidade de Linhas Telefônicas (DIDs):
                  </span>
                  <span className="text-[11px] text-indigo-700 font-medium">
                    Configure a capacidade de linhas simultâneas para o atendimento da sua empresa
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() =>
                    setCombo((p) => ({
                      ...p,
                      telephonyLinesCount: Math.max(1, (p.telephonyLinesCount || 1) - 1),
                    }))
                  }
                  disabled={(combo.telephonyLinesCount || 1) <= 1}
                  className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center font-black disabled:opacity-30 transition-all cursor-pointer hover:bg-indigo-200"
                  aria-label="Diminuir linhas"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-black text-indigo-950 text-xs min-w-[65px] text-center">
                  {combo.telephonyLinesCount || 1}{' '}
                  {(combo.telephonyLinesCount || 1) === 1 ? 'Linha' : 'Linhas'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCombo((p) => ({
                      ...p,
                      telephonyLinesCount: Math.min(20, (p.telephonyLinesCount || 1) + 1),
                    }))
                  }
                  disabled={(combo.telephonyLinesCount || 1) >= 20}
                  className="w-6 h-6 rounded-lg bg-nuvv-purple text-white flex items-center justify-center font-black disabled:opacity-30 transition-all cursor-pointer hover:bg-indigo-700"
                  aria-label="Aumentar linhas"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Robust Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TELEPHONY_PLANS.map((tel) => {
                const isSelected = combo.telephonyPlanId === tel.id;
                const count = combo.telephonyLinesCount || 1;
                const total = tel.price * count;

                return (
                  <button
                    key={tel.id}
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        telephonyPlanId: p.telephonyPlanId === tel.id ? null : tel.id,
                      }))
                    }
                    className={`p-5 rounded-3xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-nuvv-purple bg-indigo-50/70 ring-2 ring-nuvv-purple/30 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/80 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Bar with Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-base font-black text-nuvv-dark group-hover:text-nuvv-purple transition-colors">
                            {tel.name}
                          </span>
                          {tel.badge && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase tracking-wider">
                              {tel.badge}
                            </span>
                          )}
                        </div>

                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? 'bg-nuvv-purple text-white' : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Prominent Channel Pill */}
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-100/70 border border-indigo-200/80 text-[11px] font-extrabold text-indigo-950">
                        <PhoneCall className="w-3.5 h-3.5 text-nuvv-purple" />
                        <span>{tel.channelsInfo}</span>
                      </div>

                      {/* Technical Description */}
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {tel.description}
                      </p>

                      {/* Key Features List */}
                      <ul className="pt-2 border-t border-gray-100 space-y-1.5 text-xs text-gray-700">
                        {tel.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Price Bar */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-black text-nuvv-purple">
                          + R$ {total.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">/mês</span>
                        {count > 1 && (
                          <span className="text-[11px] text-gray-400 block font-normal mt-0.5">
                            ({count}x R$ {tel.price.toFixed(2).replace('.', ',')})
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-nuvv-purple text-white'
                            : 'bg-gray-100 text-gray-700 group-hover:bg-indigo-50 group-hover:text-nuvv-purple'
                        }`}
                      >
                        {isSelected ? 'Selecionado' : 'Selecionar Linha'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 3: Nuvv Multiatendimento CRM */}
        {activeTab === 'multiatendimento' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span>Centralize WhatsApp, Instagram e CRM com atendentes simultâneos no mesmo número:</span>
              {combo.multiatendimentoPlanId && (
                <button
                  type="button"
                  onClick={() => setCombo((p) => ({ ...p, multiatendimentoPlanId: null }))}
                  className="text-rose-600 font-bold hover:underline"
                >
                  Remover CRM
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MULTIATENDIMENTO_PLANS.filter((m) => m.monthlyPrice !== null).map((multi) => {
                const isSelected = combo.multiatendimentoPlanId === multi.id;
                return (
                  <button
                    key={multi.id}
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        multiatendimentoPlanId: p.multiatendimentoPlanId === multi.id ? null : multi.id,
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800 uppercase">
                          Plano {multi.name}
                        </span>
                        {multi.badge && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                            {multi.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-nuvv-dark mt-1">
                        {multi.usersLimit}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{multi.connectionsLimit}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <span className="text-lg font-black text-emerald-700">
                          + R$ {multi.monthlyPrice?.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-gray-500">/mês</span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border-2 border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 4: Nuvv Guard (Sincronizado com Residencial / Sem 'Ao Vivo') */}
        {activeTab === 'vision' && (
          <div className="space-y-4 animate-fade-in">
            {/* Camera Counter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-cyan-50/70 rounded-2xl border border-cyan-100 text-xs">
              <div className="flex items-center space-x-2.5 text-cyan-950 font-bold">
                <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-2xs">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-black text-xs sm:text-sm text-cyan-950">
                    Câmeras de Segurança com Gravação em Nuvem:
                  </span>
                  <span className="text-[11px] text-cyan-800 font-medium">
                    Imagens gravadas 24h na nuvem com detecção inteligente e monitoramento no App Nuvv Guard
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-cyan-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() =>
                    setCombo((p) => ({
                      ...p,
                      guardCameraCount: Math.max(1, (p.guardCameraCount || 1) - 1),
                    }))
                  }
                  disabled={(combo.guardCameraCount || 1) <= 1}
                  className="w-6 h-6 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-cyan-900 flex items-center justify-center font-black disabled:opacity-30 transition-all cursor-pointer"
                  aria-label="Diminuir câmeras"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-black text-cyan-950 text-xs min-w-[65px] text-center">
                  {combo.guardCameraCount || 1}{' '}
                  {(combo.guardCameraCount || 1) === 1 ? 'Câmera' : 'Câmeras'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCombo((p) => ({
                      ...p,
                      guardCameraCount: Math.min(20, (p.guardCameraCount || 1) + 1),
                    }))
                  }
                  disabled={(combo.guardCameraCount || 1) >= 20}
                  className="w-6 h-6 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center font-black disabled:opacity-30 transition-all cursor-pointer"
                  aria-label="Aumentar câmeras"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 4 Cloud Camera Plans Grid (Conforme Seletor Residencial) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Câmera Comodato + 3D Nuvem */}
              {(() => {
                const isSelected = combo.guardCameraPlanId === 'guard-camera-3d';
                const count = combo.guardCameraCount || 1;
                const total = 39.9 * count;
                return (
                  <button
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        guardCameraPlanId: isSelected ? null : 'guard-camera-3d',
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-cyan-600 bg-cyan-50/90 shadow-sm ring-2 ring-cyan-600/30'
                        : 'border-gray-200 hover:border-cyan-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 uppercase">
                          COMODATO INCLUSO
                        </span>
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-cyan-600 text-white' : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-gray-900 group-hover:text-cyan-700 transition-colors">
                        Câmera + 3D Nuvem
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        Câmera Wi-Fi Full HD inteligente inclusa com 3 dias de histórico contínuo na nuvem.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <span className="text-base font-black text-cyan-800">
                        + R$ {total.toFixed(2).replace('.', ',')}/mês
                      </span>
                      {count > 1 && (
                        <span className="text-[10px] text-gray-400 block">
                          ({count}x R$ 39,90)
                        </span>
                      )}
                    </div>
                  </button>
                );
              })()}

              {/* 2. Câmera Comodato + 7D Nuvem (Mais Escolhido) */}
              {(() => {
                const isSelected = combo.guardCameraPlanId === 'guard-camera-7d';
                const count = combo.guardCameraCount || 1;
                const total = 44.9 * count;
                return (
                  <button
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        guardCameraPlanId: isSelected ? null : 'guard-camera-7d',
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-cyan-600 bg-cyan-50/90 shadow-sm ring-2 ring-cyan-600/30'
                        : 'border-gray-200 hover:border-cyan-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase">
                          MAIS ESCOLHIDO
                        </span>
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-cyan-600 text-white' : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-gray-900 group-hover:text-cyan-700 transition-colors">
                        Câmera + 7D Nuvem
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        1 semana inteira de gravação 24h na nuvem com câmera Full HD em comodato.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <span className="text-base font-black text-cyan-800">
                        + R$ {total.toFixed(2).replace('.', ',')}/mês
                      </span>
                      {count > 1 && (
                        <span className="text-[10px] text-gray-400 block">
                          ({count}x R$ 44,90)
                        </span>
                      )}
                    </div>
                  </button>
                );
              })()}

              {/* 3. Câmera Comodato + 15D Nuvem */}
              {(() => {
                const isSelected = combo.guardCameraPlanId === 'guard-camera-15d';
                const count = combo.guardCameraCount || 1;
                const total = 59.9 * count;
                return (
                  <button
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        guardCameraPlanId: isSelected ? null : 'guard-camera-15d',
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-cyan-600 bg-cyan-50/90 shadow-sm ring-2 ring-cyan-600/30'
                        : 'border-gray-200 hover:border-cyan-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-800 text-white uppercase">
                          ALTA RETENÇÃO
                        </span>
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-cyan-600 text-white' : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-gray-900 group-hover:text-cyan-700 transition-colors">
                        Câmera + 15D Nuvem
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        15 dias de histórico contínuo para lojas, comércios e empresas com auditoria.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <span className="text-base font-black text-cyan-800">
                        + R$ {total.toFixed(2).replace('.', ',')}/mês
                      </span>
                      {count > 1 && (
                        <span className="text-[10px] text-gray-400 block">
                          ({count}x R$ 59,90)
                        </span>
                      )}
                    </div>
                  </button>
                );
              })()}

              {/* 4. Câmera Própria 7D (BYOD) */}
              {(() => {
                const isSelected = combo.guardCameraPlanId === 'guard-byod-7d';
                const count = combo.guardCameraCount || 1;
                const total = 19.9 * count;
                const setup = 15.0 * count;
                return (
                  <button
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        guardCameraPlanId: isSelected ? null : 'guard-byod-7d',
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-cyan-600 bg-cyan-50/90 shadow-sm ring-2 ring-cyan-600/30'
                        : 'border-gray-200 hover:border-cyan-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase">
                          CÂMERA PRÓPRIA (BYOD)
                        </span>
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-cyan-600 text-white' : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="text-sm font-black text-gray-900 group-hover:text-cyan-700 transition-colors">
                        Câmera Própria 7D
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        Conecte suas câmeras ou DVR existentes (Intelbras, Hikvision, etc.) na nuvem Nuvv.
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <span className="text-base font-black text-cyan-800">
                        + R$ {total.toFixed(2).replace('.', ',')}/mês
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        (+ R$ {setup.toFixed(2).replace('.', ',')} ativação única)
                      </span>
                    </div>
                  </button>
                );
              })()}
            </div>

            {/* Interfone Virtual & Tags de Rastreamento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {/* Interfone Virtual QR Code */}
              <div className="p-4 rounded-3xl bg-indigo-50/50 border border-indigo-100/80 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2 text-indigo-950 font-bold">
                      <div className="w-7 h-7 rounded-xl bg-nuvv-purple text-white flex items-center justify-center shadow-2xs">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-black">Interfone Virtual (QR Code)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Sem Mensalidade
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Receba chamadas de vídeo de visitantes, clientes ou entregadores diretamente no celular via App Nuvv Guard.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCombo((p) => ({
                      ...p,
                      guardIntercomPlanId:
                        p.guardIntercomPlanId === 'guard-intercom-residencial'
                          ? null
                          : 'guard-intercom-residencial',
                    }))
                  }
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    combo.guardIntercomPlanId === 'guard-intercom-residencial'
                      ? 'border-nuvv-purple bg-white shadow-sm ring-2 ring-nuvv-purple/30'
                      : 'border-indigo-200 hover:border-nuvv-purple bg-white hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-black text-nuvv-dark">
                      Placa QR Code Exclusiva Personalizada
                    </div>
                    <div className="text-xs text-nuvv-purple font-extrabold mt-0.5">
                      R$ 79,90 taxa única • <span className="text-emerald-700 font-bold">R$ 0,00/mês</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      combo.guardIntercomPlanId === 'guard-intercom-residencial'
                        ? 'bg-nuvv-purple text-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {combo.guardIntercomPlanId === 'guard-intercom-residencial' && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                </button>
              </div>

              {/* Tags de Rastreamento com Seletor de Quantidade */}
              <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-100/80 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2 text-emerald-950 font-bold">
                      <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-black">Tag de Rastreamento Inteligente</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Sem Mensalidade
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Localize veículos, chaves de veículos da empresa, malotes ou equipamentos móveis pelo App Nuvv Guard.
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    combo.guardTagPlanId === 'guard-track-tag'
                      ? 'border-emerald-600 bg-white shadow-sm ring-2 ring-emerald-600/30'
                      : 'border-emerald-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCombo((p) => ({
                          ...p,
                          guardTagPlanId:
                            p.guardTagPlanId === 'guard-track-tag' ? null : 'guard-track-tag',
                        }))
                      }
                      className="text-left flex-1 cursor-pointer"
                    >
                      <div className="text-xs font-black text-nuvv-dark">
                        Tag de Alta Precisão (Bluetooth & Rede Global)
                      </div>
                      <div className="text-xs text-emerald-700 font-extrabold mt-0.5">
                        R$ {(79.9 * (combo.guardTagCount || 1)).toFixed(2).replace('.', ',')} taxa única
                        {(combo.guardTagCount || 1) > 1 && (
                          <span className="text-gray-500 font-normal"> (R$ 79,90/un.)</span>
                        )}
                        {' • '}
                        <span className="text-emerald-800 font-bold">R$ 0,00/mês</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCombo((p) => ({
                          ...p,
                          guardTagPlanId:
                            p.guardTagPlanId === 'guard-track-tag' ? null : 'guard-track-tag',
                        }))
                      }
                      className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                        combo.guardTagPlanId === 'guard-track-tag'
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-gray-300 hover:border-emerald-500 bg-white'
                      }`}
                      aria-label="Selecionar Tag de Rastreamento"
                    >
                      {combo.guardTagPlanId === 'guard-track-tag' && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </button>
                  </div>

                  {/* Stepper de Quantidade de Tags */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">
                      Quantidade:
                    </span>

                    <div className="flex items-center space-x-2 bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-200">
                      <button
                        type="button"
                        onClick={() =>
                          setCombo((p) => ({
                            ...p,
                            guardTagCount: Math.max(1, (p.guardTagCount || 1) - 1),
                          }))
                        }
                        disabled={(combo.guardTagCount || 1) <= 1}
                        className="w-5 h-5 rounded-md bg-white hover:bg-emerald-100 disabled:opacity-30 text-emerald-900 flex items-center justify-center font-black transition-all text-xs cursor-pointer shadow-2xs"
                        aria-label="Diminuir tags"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="font-black text-emerald-950 text-xs min-w-[55px] text-center">
                        {combo.guardTagCount || 1} {(combo.guardTagCount || 1) === 1 ? 'TAG' : 'TAGs'}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setCombo((p) => ({
                            ...p,
                            guardTagPlanId: 'guard-track-tag', // Ao incrementar já ativa automaticamente
                            guardTagCount: Math.min(20, (p.guardTagCount || 1) + 1),
                          }))
                        }
                        disabled={(combo.guardTagCount || 1) >= 20}
                        className="w-5 h-5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 flex items-center justify-center font-black transition-all text-xs cursor-pointer shadow-2xs"
                        aria-label="Aumentar tags"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 5: Segurança Digital (4 Colunas) */}
        {activeTab === 'seguranca' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span>Proteção antivírus endpoint, anti-ransomware, VPN e gerenciador de senhas:</span>
              {combo.securityPlanId && (
                <button
                  type="button"
                  onClick={() => setCombo((p) => ({ ...p, securityPlanId: null }))}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Remover Segurança
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SECURITY_PLANS.map((sec) => {
                const isSelected = combo.securityPlanId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        securityPlanId: p.securityPlanId === sec.id ? null : sec.id,
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800 uppercase">
                          {sec.name}
                        </span>
                        {sec.badge && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                            {sec.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-nuvv-dark mt-1">
                        Até {sec.userCount} Usuários
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{sec.targetAudience}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <span className="text-lg font-black text-emerald-700">
                          + R$ {sec.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-gray-500">/mês</span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border-2 border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 6: Hotspot Wi-Fi Social */}
        {activeTab === 'hotspot' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span>Captive Portal personalizado com login por WhatsApp/redes sociais e captura de leads 100% LGPD:</span>
              {combo.socialWifiPlanId && (
                <button
                  type="button"
                  onClick={() => setCombo((p) => ({ ...p, socialWifiPlanId: null }))}
                  className="text-rose-600 font-bold hover:underline"
                >
                  Remover Hotspot
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SOCIAL_WIFI_PLANS.filter((w) => !w.priceOnRequest).map((wifi) => {
                const isSelected = combo.socialWifiPlanId === wifi.id;
                return (
                  <button
                    key={wifi.id}
                    type="button"
                    onClick={() =>
                      setCombo((p) => ({
                        ...p,
                        socialWifiPlanId: p.socialWifiPlanId === wifi.id ? null : wifi.id,
                      }))
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800 uppercase">
                          {wifi.name}
                        </span>
                        {wifi.badge && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                            {wifi.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-nuvv-dark mt-1">
                        {wifi.simultaneousUsers}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{wifi.description}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <span className="text-lg font-black text-emerald-700">
                          + R$ {wifi.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-xs text-gray-500">/mês</span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border-2 border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 7: TV Corporativa (Esporte e Notícia) */}
        {activeTab === 'tv' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1">
              <span>Grade de canais ao vivo perfeita para recepções, salas de espera, consultórios e refeitórios:</span>
              {combo.tvPlanId && (
                <button
                  type="button"
                  onClick={() => setCombo((p) => ({ ...p, tvPlanId: null }))}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Remover TV
                </button>
              )}
            </div>

            {BUSINESS_TV_PLANS.map((tvPlan) => {
              const isSelected = combo.tvPlanId === tvPlan.id;

              return (
                <div
                  key={tvPlan.id}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/30 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-4 max-w-3xl flex-1">
                      {/* Header do Plano */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xl sm:text-2xl font-black text-nuvv-dark">
                            {tvPlan.name}
                          </span>
                          {tvPlan.badge && (
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white uppercase tracking-wider">
                              {tvPlan.badge}
                            </span>
                          )}
                          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900 text-nuvv-green flex items-center space-x-1">
                            <Tv className="w-3 h-3" />
                            <span>{tvPlan.channelsCount} Canais ao Vivo</span>
                          </span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                            App Watch (NuvvPlay) Incluso
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {tvPlan.description}
                        </p>
                      </div>

                      {/* Logos dos Conteúdos e Plataformas Inclusas */}
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block">
                          Conteúdos e Plataformas Premium Inclusas:
                        </span>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <div className="bg-slate-900 px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-slate-800 shadow-2xs">
                            <img
                              src="/images/external/premiere.png"
                              alt="Premiere"
                              className="h-4 sm:h-5 object-contain filter brightness-110"
                            />
                            <span className="text-[11px] font-black text-white">Premiere</span>
                          </div>

                          <div className="bg-slate-900 px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-slate-800 shadow-2xs">
                            <img
                              src="/images/external/combate.png"
                              alt="Combate"
                              className="h-4 sm:h-5 object-contain filter brightness-110"
                            />
                            <span className="text-[11px] font-black text-white">Combate</span>
                          </div>

                          <div className="bg-white px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-gray-200 shadow-2xs">
                            <img
                              src="/images/external/canais_globo.png"
                              alt="SporTV / Canais Globo"
                              className="h-4 sm:h-5 object-contain"
                            />
                            <span className="text-[11px] font-black text-slate-800">SporTV</span>
                          </div>

                          <div className="bg-white px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-gray-200 shadow-2xs">
                            <img
                              src="/images/external/watch.png"
                              alt="Watch TV"
                              className="h-4 sm:h-5 object-contain"
                            />
                            <span className="text-[11px] font-black text-slate-800">Watch TV</span>
                          </div>

                          <div className="bg-white px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-gray-200 shadow-2xs">
                            <img
                              src="/images/external/universal_plus.png"
                              alt="Universal+"
                              className="h-4 sm:h-5 object-contain"
                            />
                            <span className="text-[11px] font-black text-slate-800">Universal+</span>
                          </div>

                          <div className="bg-white px-3 py-1.5 rounded-xl flex items-center space-x-2 border border-gray-200 shadow-2xs">
                            <img
                              src="/images/external/awdio.png"
                              alt="Awdio"
                              className="h-4 sm:h-5 object-contain"
                            />
                            <span className="text-[11px] font-black text-slate-800">Awdio</span>
                          </div>
                        </div>
                      </div>

                      {/* Chips Editoriais de Canais de Destaque */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center space-x-1.5 text-xs font-black text-slate-900">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            <span>Jornalismo & Notícias 24h</span>
                          </div>
                          <div className="flex flex-wrap gap-1 text-[11px]">
                            {[
                              'GloboNews',
                              'CNN Brasil',
                              'CNBC',
                              'BM&C News',
                              'NEW Brasil',
                              'BandNews TV',
                              'Jovem Pan News',
                            ].map((ch) => (
                              <span
                                key={ch}
                                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-slate-700 shadow-2xs"
                              >
                                {ch}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                          <div className="flex items-center space-x-1.5 text-xs font-black text-emerald-950">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Esportes & Lutas ao Vivo</span>
                          </div>
                          <div className="flex flex-wrap gap-1 text-[11px]">
                            {[
                              'Premiere (Brasileirão)',
                              'ESPN',
                              'SporTV',
                              'NSports',
                              'Combate (UFC)',
                              'BandSports',
                            ].map((sp) => (
                              <span
                                key={sp}
                                className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-900 shadow-2xs"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Botão de Abertura da Grade Completa */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsChannelsModalOpen(true)}
                          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-nuvv-green font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer group"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform text-nuvv-green" />
                          <span>Conferir Grade Completa dos 68 Canais</span>
                        </button>
                        <span className="text-[11px] text-gray-500 font-medium">
                          Consulte todos os canais de esportes, filmes, entretenimento e TV aberta.
                        </span>
                      </div>
                    </div>

                    {/* Preço e Botão Adicionar */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 flex-shrink-0 w-full lg:w-60">
                      <div className="text-left lg:text-right w-full">
                        <span className="text-xs text-gray-400 uppercase font-bold block">
                          Valor Adicional no Combo
                        </span>
                        <div className="flex items-baseline space-x-1 lg:justify-end">
                          <span className="text-sm font-bold text-gray-400">R$</span>
                          <span className="text-3xl sm:text-4xl font-black text-emerald-700 tracking-tight">
                            {tvPlan.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">/mês</span>
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-0.5">
                          Sem taxa de instalação • App Watch (NuvvPlay) incluso
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCombo((p) => ({
                            ...p,
                            tvPlanId: isSelected ? null : tvPlan.id,
                          }))
                        }
                        className={`w-full px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                          isSelected
                            ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-600/20'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Minus className="w-4 h-4" />
                            <span>Remover TV do Combo</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Adicionar ao Combo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Sticky / Prominent Cart Summary & Lead CTA */}
      <div className="sticky bottom-4 z-30 bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Summary Items List */}
          <div className="space-y-2 flex-grow min-w-0">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                Resumo do Combo Empresarial ({summary.itemCount} {summary.itemCount === 1 ? 'item' : 'itens'})
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-gray-400 hover:text-white underline ml-3 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto scrollbar-none">
              {summary.items.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center space-x-1.5 text-xs bg-slate-800 border border-white/10 px-2.5 py-1 rounded-xl text-gray-200"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="font-bold">{item.title}</span>
                  <span className="text-emerald-300 font-extrabold">
                    (R$ {item.totalPrice.toFixed(2).replace('.', ',')})
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & CTA Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
            <div>
              <div className="text-[11px] text-gray-400 uppercase font-semibold">
                Mensalidade do Pacote
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-sm font-bold text-gray-400">R$</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                  {summary.totalMonthly.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-gray-400 font-medium">/mês</span>
              </div>
              {summary.economyMonthly > 0 && (
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Economia de R$ {summary.economyMonthly.toFixed(2).replace('.', ',')}/mês
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleProceedLead}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
            >
              <span>Contratar Combo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal da Grade Completa de Canais (Esporte e Notícia) */}
      <Modal
        isOpen={isChannelsModalOpen}
        onClose={() => setIsChannelsModalOpen(false)}
        maxWidth="4xl"
        headerBanner={
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-t-3xl rounded-b-none border-b border-white/10">
            <div className="pr-14 sm:pr-16">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                  TV CORPORATIVA FIBRA
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-bold text-emerald-300">
                  68 Canais HD ao Vivo
                </span>
                <span className="text-xs text-slate-500">•</span>
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[11px] font-bold text-emerald-200">
                  <Tv className="w-3 h-3 text-emerald-400" />
                  <span>R$ 39,90/mês</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Grade de Canais: Esporte e Notícia (68 Canais)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Transmissão 100% digital em alta definição pelo App Watch (NuvvPlay) para Smart TVs, TV Box e dispositivos corporativos da recepção, consultório ou diretoria.
              </p>
            </div>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Imagem Oficial da Grade Completa de Canais */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
              <span>Grade oficial do pacote:</span>
              <a
                href="/images/external/tv_power_esporte_clube.png"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline flex items-center space-x-1"
              >
                <span>Abrir em tamanho original</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-slate-950 p-2 sm:p-3 shadow-inner">
              <img
                src="/images/external/tv_power_esporte_clube.png"
                alt="Grade Completa dos 68 Canais - Esporte e Notícia"
                className="w-full h-auto rounded-xl object-contain max-h-[480px] mx-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Categorias dos Canais Inclusos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-100 space-y-1">
              <span className="font-black text-red-950 block">Jornalismo 24h</span>
              <p className="text-red-900/80 leading-relaxed text-[11px]">
                GloboNews, CNN Brasil, CNBC, BM&C News, NEW Brasil, BandNews TV e Jovem Pan News.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <span className="font-black text-emerald-950 block">Esportes & Lutas</span>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                Premiere Clubes (Brasileirão), ESPN, SporTV, NSports, Combate HD (UFC) e BandSports.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
              <span className="font-black text-indigo-950 block">Séries & Filmes</span>
              <p className="text-indigo-900/80 leading-relaxed text-[11px]">
                Universal TV, Studio Universal, USA Network, Sony Channel, AXN e Lifetime.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
              <span className="font-black text-amber-950 block">Streaming & VOD</span>
              <p className="text-amber-900/80 leading-relaxed text-[11px]">
                App Watch (NuvvPlay) com +30 mil horas de catálogo, Universal+ e Awdio inclusos.
              </p>
            </div>
          </div>

          {/* Ações do Rodapé do Modal - Estritamente em uma única linha sem quebrar */}
          <div className="pt-3 border-t border-gray-100 flex flex-row items-center justify-between gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsChannelsModalOpen(false)}
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap text-center active:scale-98"
            >
              Fechar Visualização
            </button>

            <button
              type="button"
              onClick={() => {
                setCombo((p) => ({
                  ...p,
                  tvPlanId: p.tvPlanId === 'esporte-noticia' ? null : 'esporte-noticia',
                }));
                setIsChannelsModalOpen(false);
              }}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer shadow-sm whitespace-nowrap active:scale-98 ${
                combo.tvPlanId === 'esporte-noticia'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              {combo.tvPlanId === 'esporte-noticia' ? (
                <>
                  <Minus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Remover do Combo</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Adicionar Pacote (+ R$ 39,90/mês)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
