import React from 'react';
import { Modal } from '../common/Modal';
import { PABX_PLANS } from '../../data/businessPlans';
import { Cloud, Check, Smartphone, PhoneCall, ShieldCheck, Headphones, Zap } from 'lucide-react';

interface PabxDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export const PabxDetailModal: React.FC<PabxDetailModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const allFeatures = [
    'Gravação de chamadas em Nuvem',
    'Secretária virtual – URA',
    'Reach me - Siga-me inteligente',
    'Chat interno com troca de arquivos',
    'Transferência de chamadas',
    'Música de chamadas em espera',
    'Grupos de captura e busca',
    'Transbordos inteligentes',
    'Histórico de chamadas e gravações',
    'Sala de Conferência',
    'Videoconferência integrada',
    'Multidispositivo e Multiplataforma',
    'Correio de voz - integrado ao chat',
    'Handoff - Troca de dispositivo',
    'Fila de Atendimento com métricas',
    'Monitor em tempo real de ramais',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="PABX Virtual Cloud Inteligente"
      subtitle="Transforme a comunicação corporativa da sua empresa com tecnologia em nuvem"
      maxWidth="4xl"
    >
      <div className="space-y-6 max-h-[78vh] overflow-y-auto pr-1">
        {/* 4 Pillars Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: 'Mobilidade Total', desc: 'Atenda no App ou Computador em qualquer lugar.', icon: Smartphone },
            { title: 'Portabilidade Grátis', desc: 'Mantenha seu número atual sem custos.', icon: PhoneCall },
            { title: 'Gravação em Nuvem', desc: 'Segurança e auditoria de chamadas.', icon: ShieldCheck },
            { title: 'URA Inteligente', desc: 'Autoatendimento profissional.', icon: Headphones },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-nuvv-purple text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-nuvv-dark">{item.title}</h4>
                  <p className="text-[11px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plans Grid */}
        <div>
          <h3 className="text-sm font-extrabold text-nuvv-dark uppercase tracking-wider mb-3">
            Escolha o Plano Ideal para sua Empresa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PABX_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                  plan.isPopular
                    ? 'border-nuvv-purple bg-indigo-50/40 shadow-md ring-2 ring-nuvv-purple/20'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div>
                  {plan.badge && (
                    <span className="text-[9px] font-extrabold text-white bg-nuvv-purple px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
                      {plan.badge}
                    </span>
                  )}
                  <h4 className="text-base font-bold text-nuvv-dark">{plan.name}</h4>
                  <p className="text-xs font-bold text-nuvv-purple">{plan.extensionCount}</p>
                  <p className="text-[11px] text-gray-400 mb-3">{plan.targetAudience}</p>

                  <div className="mb-4">
                    <span className="text-2xl font-black text-nuvv-dark">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">/mês</span>
                  </div>

                  <ul className="space-y-1.5 mb-5 text-xs text-gray-700">
                    {plan.features.slice(0, 5).map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectPlan(`PABX Cloud - ${plan.name}`);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                    plan.isPopular
                      ? 'bg-nuvv-purple text-white hover:bg-nuvv-purple-hover'
                      : 'bg-nuvv-dark text-white hover:bg-nuvv-dark/90'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Adicionais e Tarifas Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-nuvv-dark flex items-center space-x-1.5 mb-1">
              <Zap className="w-4 h-4 text-nuvv-purple" />
              <span>Adicionais e Tarifas Flexíveis</span>
            </h4>
            <p className="text-[11px] text-gray-500">
              Faça upgrade de ramais e adicione números virtuais (DID) a qualquer momento sem taxas surpresa.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center">
              <span className="text-[10px] text-gray-400 block font-semibold">Ramal Excedente</span>
              <span className="text-xs font-black text-nuvv-purple">R$ 14,90/mês</span>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center">
              <span className="text-[10px] text-gray-400 block font-semibold">Número Virtual</span>
              <span className="text-xs font-black text-nuvv-purple">R$ 19,90/mês</span>
            </div>
          </div>
        </div>

        {/* All Included Features Checklist */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
            Todos os Recursos da Plataforma
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {allFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-gray-700">
                <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
