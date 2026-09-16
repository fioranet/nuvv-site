import React from 'react';
import { SOCIAL_WIFI_PLANS, SocialWifiPlan } from '../../data/socialWifiData';
import { Check, ArrowRight, Zap, Users, PhoneCall } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface SocialWifiPlansProps {
  onSelectPlan: (plan: SocialWifiPlan) => void;
}

export const SocialWifiPlans: React.FC<SocialWifiPlansProps> = ({ onSelectPlan }) => {
  const handleOpenWhatsAppEnterprise = () => {
    const text = 'Olá! Gostaria de uma cotação para projeto especial de Social Wi-Fi corporativo (acima de 100 acessos simultâneos até 10.000).';
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="planos-social-wifi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            Planos por Capacidade Simultânea
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
            Escolha o Plano Ideal para seu Fluxo de Clientes
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Precificação simples e transparente baseada na quantidade de acessos simultâneos na sua rede.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 px-4 -mx-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 items-stretch">
          {SOCIAL_WIFI_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between border flex-shrink-0 w-[290px] sm:w-auto snap-center ${
                plan.isPopular
                  ? 'border-nuvv-purple shadow-xl ring-2 ring-nuvv-purple/30 lg:-translate-y-2'
                  : 'border-gray-200 hover:border-nuvv-purple/40 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Popular / Enterprise Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                  <span
                    className={`px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center space-x-1 ${
                      plan.isPopular
                        ? 'bg-nuvv-purple'
                        : plan.priceOnRequest
                        ? 'bg-gradient-to-r from-nuvv-dark to-slate-800'
                        : 'bg-emerald-600'
                    }`}
                  >
                    <Zap className="w-3 h-3 text-nuvv-green fill-nuvv-green" />
                    <span>{plan.badge}</span>
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="p-6 pb-5 border-b border-gray-100 text-center">
                <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-lg inline-block">
                  {plan.name}
                </span>

                <div className="mt-2 inline-flex items-center space-x-1 text-xs font-bold text-gray-700 bg-slate-100 px-2.5 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>{plan.simultaneousUsers}</span>
                </div>

                <div className="mt-4 flex items-baseline justify-center space-x-1 text-nuvv-dark">
                  {plan.priceOnRequest ? (
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-nuvv-dark py-2">
                      Sob Consulta
                    </span>
                  ) : (
                    <>
                      <span className="text-xs font-bold text-gray-500">R$</span>
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-nuvv-dark">
                        {plan.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">/mês</span>
                    </>
                  )}
                </div>

                <div className="mt-2 text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  {plan.priceOnRequest ? 'Projeto Sob Medida' : 'Pagamento até o Vencimento'}
                </div>

                <p className="text-xs text-gray-500 mt-2 min-h-[32px]">{plan.description}</p>
              </div>

              {/* Features List */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <ul className="space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 text-nuvv-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.priceOnRequest ? (
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppEnterprise}
                    className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs bg-nuvv-dark hover:bg-nuvv-dark/90 text-white flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98"
                  >
                    <PhoneCall className="w-4 h-4 text-nuvv-green" />
                    <span>Falar com Consultor</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 ${
                      plan.isPopular
                        ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover shadow-nuvv-purple/30'
                        : 'bg-nuvv-dark hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
                    }`}
                  >
                    <span>Contratar {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center text-xs text-gray-400 mt-4 flex items-center justify-center space-x-1.5 font-medium">
          <span>👉 Deslize para o lado para ver todos os planos</span>
        </div>
      </div>
    </section>
  );
};
