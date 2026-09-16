import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { TELEMEDICINA_PLANS, TelemedicinaPlan } from '../../data/plans';
import {
  HeartPulse,
  Clock,
  Video,
  FileCheck2,
  Percent,
  Sparkles,
  CheckCircle2,
  Users,
  User,
  ShieldCheck,
  Stethoscope,
  Smile,
  ArrowRight,
} from 'lucide-react';

interface TelemedicinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: TelemedicinaPlan) => void;
}

export const TelemedicinaModal: React.FC<TelemedicinaModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [selectedTab, setSelectedTab] = useState<'todos' | 'essencial' | 'premium'>('todos');

  const filteredPlans =
    selectedTab === 'todos'
      ? TELEMEDICINA_PLANS
      : TELEMEDICINA_PLANS.filter((p) => p.tier === selectedTab);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl" showCloseButton={true}>
      <div className="p-4 sm:p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start space-x-4 border-b border-gray-100 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>NUVV SAÚDE DIGITAL • PARCERIA TURBOMED</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">
              Telemedicina 24 Horas & Benefícios em Saúde
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Cuidado médico ágil para você e toda a sua família, sem filas e com descontos em exames e remédios.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars of Service */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100/80 space-y-1 text-center sm:text-left">
            <Clock className="w-5 h-5 text-rose-600 mx-auto sm:mx-0" />
            <div className="text-xs font-bold text-nuvv-dark">Espera de até 10 min</div>
            <p className="text-[10px] text-gray-500">Pronto atendimento 24/7 por vídeo</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 space-y-1 text-center sm:text-left">
            <FileCheck2 className="w-5 h-5 text-nuvv-purple mx-auto sm:mx-0" />
            <div className="text-xs font-bold text-nuvv-dark">Receitas & Atestados</div>
            <p className="text-[10px] text-gray-500">Documentos digitais válidos em todo o Brasil</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 space-y-1 text-center sm:text-left">
            <Percent className="w-5 h-5 text-emerald-600 mx-auto sm:mx-0" />
            <div className="text-xs font-bold text-nuvv-dark">Até 80% de Desconto</div>
            <p className="text-[10px] text-gray-500">Em farmácias e laboratórios credenciados</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100/80 space-y-1 text-center sm:text-left">
            <Smile className="w-5 h-5 text-sky-600 mx-auto sm:mx-0" />
            <div className="text-xs font-bold text-nuvv-dark">Rede Odontológica</div>
            <p className="text-[10px] text-gray-500">Tabela reduzida e parcelamento em 12x</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center space-x-2 border-b border-gray-100 pb-3">
          <button
            type="button"
            onClick={() => setSelectedTab('todos')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTab === 'todos'
                ? 'bg-nuvv-dark text-white shadow-sm'
                : 'text-gray-500 hover:text-nuvv-dark bg-gray-100'
            }`}
          >
            Todos os Planos
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('essencial')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTab === 'essencial'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-rose-600 bg-gray-100'
            }`}
          >
            Planos Essenciais (100% Online)
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('premium')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTab === 'premium'
                ? 'bg-nuvv-purple text-white shadow-sm'
                : 'text-gray-500 hover:text-nuvv-purple bg-gray-100'
            }`}
          >
            Planos Premium (Online + Presencial)
          </button>
        </div>

        {/* Plans Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlans.map((plan) => {
            const isFamiliar = plan.type === 'familiar';
            return (
              <div
                key={plan.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                  plan.isPopular
                    ? 'border-rose-500 bg-rose-50/20 shadow-md ring-2 ring-rose-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isFamiliar ? (
                        <Users className="w-4 h-4 text-rose-600" />
                      ) : (
                        <User className="w-4 h-4 text-rose-600" />
                      )}
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                        {isFamiliar ? 'Cobertura Familiar' : 'Cobertura Individual'}
                      </span>
                    </div>

                    {plan.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-600 text-white">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-black text-nuvv-dark">{plan.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{plan.targetAudience}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl sm:text-3xl font-black text-nuvv-dark">
                        R$ {plan.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">/mês adicionais</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-1.5 text-xs text-gray-700 pt-1 font-medium">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPlan(plan);
                    onClose();
                  }}
                  className={`w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    plan.isPopular
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                      : 'bg-nuvv-dark hover:bg-nuvv-purple text-white shadow-sm'
                  }`}
                >
                  <span>Incluir no meu Plano de Internet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200 text-center text-[11px] text-gray-500">
          🔒 Atendimento médico prestado por profissionais credenciados via plataforma parceira TurboMed, com sigilo médico e prontuário criptografado em conformidade com a LGPD e o Conselho Federal de Medicina (CFM).
        </div>
      </div>
    </Modal>
  );
};
