import React from 'react';
import { TELEPHONY_PLANS } from '../../data/businessPlans';
import { PhoneCall, Check, Zap, CheckCircle2 } from 'lucide-react';

interface TelephonyDetailSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const TelephonyDetailSection: React.FC<TelephonyDetailSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-20 bg-slate-50/60 border-t border-gray-100" id="telefonia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Explanatory Content */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-nuvv-purple uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Nuvv Voice Solutions</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark leading-tight">
              Telefonia IP Corporativa Inteligente e Econômica
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              A solução definitiva para a comunicação da sua empresa. Reduza custos drasticamente com nossas linhas virtuais, 0800 e Troncos SIP de alta qualidade.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Ativação Imediata</h4>
                  <p className="text-xs text-gray-500">Números novos ativados em até 1 hora útil.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Portabilidade Grátis</h4>
                  <p className="text-xs text-gray-500">Traga seu número atual de qualquer operadora sem perder chamadas.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Mobilidade Total</h4>
                  <p className="text-xs text-gray-500">Use seu número fixo no Smartphone via App ou qualquer aparelho SIP.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Cards */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-nuvv-card space-y-6">
            <h3 className="text-lg font-bold text-center text-nuvv-dark">Planos Linha Fixa</h3>

            <div className="space-y-4">
              {TELEPHONY_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    plan.isPopular
                      ? 'bg-nuvv-purple text-white border-nuvv-purple shadow-md'
                      : 'bg-white text-gray-900 border-indigo-100 hover:border-nuvv-purple/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold">{plan.name}</h4>
                    <div className="flex items-baseline space-x-0.5">
                      <span className="text-2xl font-black">
                        R$ {plan.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className={`text-xs ${plan.isPopular ? 'text-white/80' : 'text-gray-500'}`}>
                        /mês
                      </span>
                    </div>
                  </div>

                  {plan.badge && (
                    <span className="inline-block text-[10px] font-extrabold bg-amber-400 text-slate-900 px-2 py-0.5 rounded uppercase tracking-wider mb-3">
                      {plan.badge}
                    </span>
                  )}

                  <ul className="space-y-1.5 mb-4 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${plan.isPopular ? 'bg-nuvv-green' : 'bg-nuvv-purple'}`} />
                        <span className={plan.isPopular ? 'text-white/90' : 'text-gray-600'}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onSelectPlan(`Telefonia Fixa - ${plan.name}`)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                      plan.isPopular
                        ? 'bg-white text-nuvv-purple hover:bg-gray-100 shadow-sm'
                        : 'bg-nuvv-purple text-white hover:bg-nuvv-purple-hover'
                    }`}
                  >
                    Contratar Linha
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
