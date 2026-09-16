import React from 'react';
import { Modal } from '../common/Modal';
import { TELEPHONY_PLANS } from '../../data/businessPlans';
import { PhoneCall, Check, Zap, ShieldCheck } from 'lucide-react';

interface TelephonyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export const TelephonyDetailModal: React.FC<TelephonyDetailModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Telefonia Corporativa & Linha Fixa Digital"
      subtitle="Comunicação de voz de alta fidelidade via Troncos SIP e Linhas Virtuais"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Intro Banner */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start space-x-3 text-xs text-emerald-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p>
            Economize até 70% nas contas telefônicas da sua empresa com nossas linhas digitais. Portabilidade numérica 100% gratuita, sem perda de chamadas e com tarifação transparente.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TELEPHONY_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                plan.isPopular
                  ? 'bg-nuvv-purple text-white border-nuvv-purple shadow-md'
                  : 'bg-white text-gray-900 border-indigo-100'
              }`}
            >
              <div>
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
                  <span className="inline-block text-[9px] font-extrabold bg-amber-400 text-slate-900 px-2 py-0.5 rounded uppercase tracking-wider mb-3">
                    {plan.badge}
                  </span>
                )}

                <ul className="space-y-1.5 mb-6 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${plan.isPopular ? 'bg-nuvv-green' : 'bg-nuvv-purple'}`} />
                      <span className={plan.isPopular ? 'text-white/90' : 'text-gray-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectPlan(`Telefonia Fixa - ${plan.name}`);
                }}
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

        {/* Benefits Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <span className="text-xs font-bold text-gray-900 block mb-0.5">Ativação Imediata</span>
            <span className="text-[11px] text-gray-500">Linhas ativadas no mesmo dia</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <span className="text-xs font-bold text-gray-900 block mb-0.5">Portabilidade Grátis</span>
            <span className="text-[11px] text-gray-500">Mantenha seu número de sempre</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <span className="text-xs font-bold text-gray-900 block mb-0.5">Voz HD Cristalina</span>
            <span className="text-[11px] text-gray-500">Sem ruídos ou atrasos</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
