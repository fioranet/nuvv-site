import React from 'react';
import { BusinessPlan } from '../../data/businessPlans';
import { Check, ArrowRight, Zap, Info, Shield, Network, Clock } from 'lucide-react';

interface BusinessPlanCardProps {
  plan: BusinessPlan;
  onSelectPlan: (plan: BusinessPlan) => void;
  onOpenDetails: (plan: BusinessPlan) => void;
}

export const BusinessPlanCard: React.FC<BusinessPlanCardProps> = ({
  plan,
  onSelectPlan,
  onOpenDetails,
}) => {
  return (
    <div
      className={`relative rounded-3xl bg-white transition-all duration-300 flex flex-col h-full border ${
        plan.isPopular
          ? 'border-emerald-500 shadow-nuvv-hover ring-2 ring-emerald-500/30 -translate-y-2'
          : 'border-gray-200 hover:border-emerald-500/40 shadow-nuvv-card hover:shadow-md'
      }`}
    >
      {/* Top Banner Tag */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <span
            className={`px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center space-x-1 ${
              plan.isPopular ? 'bg-emerald-600' : 'bg-nuvv-dark'
            }`}
          >
            <Zap className="w-3 h-3 text-nuvv-green fill-nuvv-green" />
            <span>{plan.badge}</span>
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 sm:p-7 pb-4 border-b border-gray-100 text-center">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-lg">
          {plan.name}
        </span>

        {/* Speed */}
        <div className="mt-4">
          <div className="text-4xl sm:text-5xl font-black text-nuvv-dark tracking-tight">
            {plan.speed} <span className="text-2xl sm:text-3xl font-extrabold">{plan.unit}</span>
          </div>
        </div>

        {/* Technical Badges if available */}
        {(plan.slaHours || plan.cirGuarantee || plan.ipType) && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {plan.cirGuarantee && (
              <span
                className={`inline-flex items-center space-x-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                  plan.cirGuarantee === '65%' || plan.cirGuarantee === '60%'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : plan.cirGuarantee.includes('80%')
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200/50'
                }`}
                title="Committed Information Rate - Taxa Mínima de Banda Garantida contratualmente"
              >
                <Network className="w-2.5 h-2.5" />
                <span>
                  Banda Garantida (CIR): {plan.cirGuarantee}
                </span>
              </span>
            )}
            {plan.slaHours && (
              <span
                className={`inline-flex items-center space-x-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                  plan.slaHours === 24
                    ? 'bg-slate-900 text-nuvv-green border-slate-900 shadow-2xs'
                    : plan.slaHours <= 12
                    ? 'bg-indigo-900 text-indigo-100 border-indigo-900 shadow-2xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200/60'
                }`}
                title="Service Level Agreement - Prazo máximo de atendimento técnico e reparo"
              >
                <Clock className="w-2.5 h-2.5" />
                <span>
                  Atendimento (SLA): {plan.slaHours}h
                  {plan.slaHours === 24 ? ' (Prioritário)' : ''}
                </span>
              </span>
            )}
            {plan.ipType && (
              <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                <Shield className="w-2.5 h-2.5" />
                <span>{plan.ipType}</span>
              </span>
            )}
          </div>
        )}

        {/* Special 1 Giga Superior SLA & CIR Highlight Callout */}
        {(plan.id === 'biz-max-1000' || (plan.speed === '1' && plan.unit === 'Giga' && plan.slaHours === 24)) && (
          <div className="mt-3 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 text-center shadow-2xs animate-fade-in">
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-950 flex items-center justify-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>SLA 24H PRIORITÁRIO • CIR {plan.cirGuarantee} SUPERIOR</span>
            </div>
            <p className="text-[10px] text-emerald-800 font-semibold mt-0.5 leading-tight">
              Reparo no dobro da velocidade (24h vs 48h) e {plan.cirGuarantee} de banda garantida (muito acima dos 40% do residencial).
            </p>
          </div>
        )}

        {/* Price Box */}
        <div className="mt-4">
          {plan.priceOnRequest ? (
            <div className="py-2">
              <div className="text-xl sm:text-2xl font-black text-nuvv-dark tracking-tight">
                Sob Medida
              </div>
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {plan.priceNote || 'PROJETO PERSONALIZADO'}
              </span>
            </div>
          ) : (
            <>
              {plan.originalPrice && (
                <div className="text-xs text-gray-400 line-through font-medium">
                  De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}/mês
                </div>
              )}
              {plan.promoPrice !== undefined && (
                <div className="flex items-baseline justify-center space-x-1 text-nuvv-dark">
                  <span className="text-sm font-bold text-gray-500">Por R$</span>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600">
                    {Math.floor(plan.promoPrice)}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-600">
                    ,{(plan.promoPrice % 1).toFixed(2).substring(2)}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">/mês</span>
                </div>
              )}
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Pagamento até o Vencimento
              </span>
            </>
          )}
        </div>
      </div>

      {/* Feature list */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-700">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={() => onSelectPlan(plan)}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 ${
              plan.isPopular
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                : 'bg-nuvv-dark hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
            }`}
          >
            <span>{plan.priceOnRequest ? 'Solicitar Projeto' : 'Contratar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenDetails(plan)}
            className="w-full text-center text-xs font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-wider transition-colors flex items-center justify-center space-x-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Saber mais detalhes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
