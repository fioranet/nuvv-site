import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Users, MessageSquare, Bot } from 'lucide-react';
import { MULTIATENDIMENTO_PLANS } from '../../data/multiatendimentoData';

interface MultiAtendimentoPricingProps {
  onSelectPlan: (planName: string) => void;
}

export const MultiAtendimentoPricing: React.FC<MultiAtendimentoPricingProps> = ({
  onSelectPlan,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden" id="precos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full">
            Dimensionamento Sob Medida
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark mt-3 tracking-tight">
            Planos para equipes de todos os tamanhos.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
            Estamos finalizando a implantação da solução comercial. Fale com nossos especialistas para agendar uma demonstração assistida e consultar as condições personalizadas para sua empresa.
          </p>
        </div>

        {/* 3 Pricing Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {MULTIATENDIMENTO_PLANS.map((plan) => {
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

                  {/* Price Tag - Sob Consulta */}
                  <div className="py-3 border-y border-gray-200/40">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-500">
                        Sob Consulta
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-0.5 ${plan.isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                      Valores a consultar • Implantação assistida
                    </span>
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
                  className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-98 mt-8 flex items-center justify-center space-x-2 cursor-pointer ${
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
