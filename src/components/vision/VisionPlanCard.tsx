import React from 'react';
import { VisionPlan, COMODATO_PRICE_PER_CAMERA } from '../../data/visionPlans';
import { Check, ArrowRight, Zap, Camera, ShieldCheck } from 'lucide-react';

interface VisionPlanCardProps {
  plan: VisionPlan;
  cameraCount: number;
  hasComodato: boolean;
  onSelectPlan: (plan: VisionPlan, totalMonthly: number) => void;
}

export const VisionPlanCard: React.FC<VisionPlanCardProps> = ({
  plan,
  cameraCount,
  hasComodato,
  onSelectPlan,
}) => {
  const storageCost = plan.pricePerCamera * cameraCount;
  const comodatoCost = hasComodato ? COMODATO_PRICE_PER_CAMERA * cameraCount : 0;
  const totalMonthly = storageCost + comodatoCost;

  const isFree = plan.retentionDays === 0;

  return (
    <div
      className={`relative rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between border flex-shrink-0 w-[245px] sm:w-[260px] md:w-[275px] snap-center p-5 sm:p-6 ${
        plan.isPopular
          ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-500/30'
          : 'border-gray-200 hover:border-emerald-400 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Banner Tag */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <span
            className={`px-3.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xs flex items-center space-x-1 ${
              plan.isPopular ? 'bg-emerald-600' : isFree ? 'bg-nuvv-purple' : 'bg-nuvv-dark'
            }`}
          >
            <Zap className="w-2.5 h-2.5 text-nuvv-green fill-nuvv-green" />
            <span>{plan.badge}</span>
          </span>
        </div>
      )}

      {/* Header & Retention */}
      <div className="text-center space-y-2 pt-1">
        <div className="inline-block">
          <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100/80">
            {plan.name}
          </span>
        </div>

        {/* Unit Price per camera */}
        <div className="pt-0.5">
          {isFree ? (
            <div className="text-2xl sm:text-3xl font-black text-nuvv-dark tracking-tight whitespace-nowrap">
              Grátis
            </div>
          ) : (
            <div className="flex items-baseline justify-center whitespace-nowrap text-nuvv-dark gap-1">
              <span className="text-xs font-bold text-gray-500">R$</span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-nuvv-dark">
                {plan.pricePerCamera.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[11px] text-gray-500 font-semibold whitespace-nowrap">/mês por câm</span>
            </div>
          )}
          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
            {plan.shortDescription}
          </p>
        </div>

        {/* Calculated Total Price Box */}
        <div className="p-3 bg-slate-50/90 rounded-2xl border border-gray-200/80 text-center space-y-0.5">
          <div className="text-[10px] text-gray-500 font-medium truncate">
            Total ({cameraCount} {cameraCount === 1 ? 'câm' : 'câms'}{hasComodato ? ' + comodato' : ''}):
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight whitespace-nowrap flex items-baseline justify-center gap-1">
            {totalMonthly === 0 ? (
              <span>R$ 0,00</span>
            ) : (
              <>
                <span>R$ {totalMonthly.toFixed(2).replace('.', ',')}</span>
                <span className="text-xs text-gray-500 font-semibold whitespace-nowrap">/mês</span>
              </>
            )}
          </div>
          {hasComodato && (
            <div className="text-[9px] text-emerald-800 font-bold flex items-center justify-center space-x-1 whitespace-nowrap pt-0.5">
              <Camera className="w-2.5 h-2.5 text-emerald-600" />
              <span className="truncate">Comodato incluso</span>
            </div>
          )}
        </div>
      </div>

      {/* Compact Features List (Core differences) */}
      <div className="my-4 pt-3 border-t border-gray-100 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-gray-700 font-semibold">
          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <span className="truncate">
            {isFree ? 'Visualização ao vivo grátis' : `${plan.retentionDays} dias gravação contínua`}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <span className="truncate">
            {isFree ? 'Acesso App iOS & Android' : 'Linha do tempo & busca rápida'}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <span className="truncate">
            {isFree ? 'Zero portas no roteador' : 'Download Full HD ilimitado'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => onSelectPlan(plan, totalMonthly)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center space-x-1.5 shadow-sm transition-all active:scale-98 whitespace-nowrap cursor-pointer ${
            plan.isPopular
              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
              : isFree
              ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover'
              : 'bg-nuvv-dark hover:bg-slate-800'
          }`}
        >
          <span>{isFree ? 'Começar Grátis' : 'Contratar Plano'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
