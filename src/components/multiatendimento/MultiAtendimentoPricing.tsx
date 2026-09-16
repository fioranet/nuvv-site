import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Users, MessageSquare, Bot } from 'lucide-react';
import { MULTIATENDIMENTO_PLANS } from '../../data/multiatendimentoData';

interface MultiAtendimentoPricingProps {
  onSelectPlan: (planName: string) => void;
}

export const MultiAtendimentoPricing: React.FC<MultiAtendimentoPricingProps> = ({
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden" id="precos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full">
            Investimento Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark mt-3 tracking-tight">
            Planos para equipes de todos os tamanhos.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Escale suas vendas e atendimento com planos flexíveis. Sem taxas de instalação ocultas.
          </p>

          {/* Billing Toggle (Monthly vs Annual with 20% Discount) */}
          <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-2xl mt-8 border border-gray-200 shadow-inner">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-nuvv-dark shadow-sm'
                  : 'text-gray-500 hover:text-nuvv-dark'
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-nuvv-dark text-white shadow-sm'
                  : 'text-gray-500 hover:text-nuvv-dark'
              }`}
            >
              <span>Anual</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-black text-white uppercase tracking-wider">
                Economize 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {MULTIATENDIMENTO_PLANS.map((plan) => {
            const isAnnual = billingCycle === 'annual';
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  plan.isPopular
                    ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-emerald-500/30 lg:-translate-y-2 border border-emerald-500/40'
                    : 'bg-slate-50/80 border border-gray-200/90 text-gray-900 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                      ★ {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-black ${plan.isPopular ? 'text-white' : 'text-nuvv-dark'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-relaxed ${plan.isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="py-2 border-y border-gray-200/40">
                    {price !== null ? (
                      <div>
                        <div className="flex items-baseline space-x-1">
                          <span className={`text-xs font-bold ${plan.isPopular ? 'text-emerald-400' : 'text-gray-500'}`}>
                            R$
                          </span>
                          <span className="text-3xl sm:text-4xl font-black tracking-tight">
                            {price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className={`text-xs ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                            /mês
                          </span>
                        </div>
                        {isAnnual && (
                          <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                            Faturado anualmente com 20% OFF
                          </span>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                          Sob Consulta
                        </span>
                        <span className="text-xs text-gray-400 block mt-0.5">Projetos customizados</span>
                      </div>
                    )}
                  </div>

                  {/* Limits Highlights */}
                  <div className="space-y-2 text-xs font-bold">
                    <div className={`p-2.5 rounded-xl flex items-center space-x-2 ${plan.isPopular ? 'bg-slate-800' : 'bg-white border border-gray-200'}`}>
                      <Users className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{plan.usersLimit}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl flex items-center space-x-2 ${plan.isPopular ? 'bg-slate-800' : 'bg-white border border-gray-200'}`}>
                      <MessageSquare className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{plan.connectionsLimit}</span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider block ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                      RECURSOS INCLUSOS:
                    </span>
                    <ul className="space-y-2 text-xs">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className={plan.isPopular ? 'text-gray-300' : 'text-gray-700'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  type="button"
                  onClick={() => onSelectPlan(`Plano Multiatendimento ${plan.name}`)}
                  className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-98 mt-8 flex items-center justify-center space-x-2 ${
                    plan.isPopular
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/30'
                      : 'bg-nuvv-dark hover:bg-nuvv-dark/90 text-white shadow-nuvv-dark/20'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
