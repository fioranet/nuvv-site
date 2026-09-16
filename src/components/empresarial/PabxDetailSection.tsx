import React from 'react';
import { PABX_PLANS } from '../../data/businessPlans';
import { Cloud, Check, PhoneCall, ArrowRight, ShieldCheck, Zap, Headphones, Smartphone } from 'lucide-react';

interface PabxDetailSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PabxDetailSection: React.FC<PabxDetailSectionProps> = ({ onSelectPlan }) => {
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
    <section className="py-20 bg-white border-t border-gray-100" id="pabx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-nuvv-purple uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full flex items-center justify-center space-x-1 w-max mx-auto mb-2">
            <Cloud className="w-3.5 h-3.5" />
            <span>Nuvv Voice Cloud</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark">
            PABX Virtual Inteligente para Empresas Modernas
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3">
            Transforme a comunicação da sua empresa com nossa plataforma em nuvem. Ramais no celular, gravação de chamadas, URA profissional e economia real na conta telefônica.
          </p>
        </div>

        {/* 4 Pillar Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: 'Mobilidade Total',
              desc: 'Atenda seu ramal no App (iOS/Android) ou Computador de qualquer lugar do mundo.',
              icon: Smartphone,
            },
            {
              title: 'Portabilidade Grátis',
              desc: 'Mantenha seu número atual. Traga sua linha fixa para a nuvem sem custos.',
              icon: PhoneCall,
            },
            {
              title: 'Gravação em Nuvem',
              desc: 'Audite seu atendimento com gravações armazenadas de forma segura e acessível.',
              icon: ShieldCheck,
            },
            {
              title: 'URA Flexível',
              desc: 'Crie menus de autoatendimento profissionais e encaminhe chamadas rapidamente.',
              icon: Headphones,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-slate-50/70 border border-gray-100 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-nuvv-purple flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-nuvv-dark mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* All Included Features Grid */}
        <div className="mb-16 bg-slate-50/70 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold text-center text-nuvv-dark mb-8">
            Todos os Recursos Inclusos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {allFeatures.map((feat, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-gray-100 flex items-center space-x-2 text-xs font-semibold text-gray-700 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans Table */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-nuvv-dark">Escolha o Plano Ideal</h3>
          <p className="text-xs text-gray-500 mt-1">Upgrade ou downgrade a qualquer momento conforme sua empresa cresce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {PABX_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl bg-white p-7 border flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? 'border-nuvv-purple shadow-nuvv-hover ring-2 ring-nuvv-purple/30 -translate-y-1'
                  : 'border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {plan.badge && (
                  <span className="text-[10px] font-extrabold text-white bg-nuvv-purple px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {plan.badge}
                  </span>
                )}
                <h4 className="text-lg font-black text-nuvv-dark">{plan.name}</h4>
                <p className="text-xs font-bold text-nuvv-purple mb-1">{plan.extensionCount}</p>
                <p className="text-[11px] text-gray-400 mb-4">{plan.targetAudience}</p>

                <div className="mb-6">
                  <span className="text-2xl font-black text-nuvv-dark">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">/mês</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(`PABX Cloud - ${plan.name}`)}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-sm transition-all ${
                  plan.isPopular
                    ? 'bg-nuvv-purple text-white hover:bg-nuvv-purple-hover'
                    : 'bg-white border border-nuvv-purple text-nuvv-purple hover:bg-indigo-50/50'
                }`}
              >
                Contratar Agora
              </button>
            </div>
          ))}
        </div>

        {/* Adicionais e Tarifas Box */}
        <div className="bg-slate-50/80 rounded-3xl p-8 border border-gray-100 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-nuvv-dark flex items-center space-x-2">
              <Zap className="w-5 h-5 text-nuvv-purple" />
              <span>Adicionais e Tarifas</span>
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Todos os planos aceitam upgrades de linhas, ramais e números a qualquer momento.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sem tarifas surpresa e contas excedentes no final do mês.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-[11px] text-gray-400 block font-semibold">Ramal Excedente</span>
                <span className="text-sm font-black text-nuvv-purple">R$ 14,90</span>
                <span className="text-[10px] text-gray-500"> /mês por ramal</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="text-[11px] text-gray-400 block font-semibold">Número Virtual</span>
                <span className="text-sm font-black text-nuvv-purple">R$ 19,90</span>
                <span className="text-[10px] text-gray-500"> /mês por número</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 rounded-2xl overflow-hidden shadow-md">
            <img
              src="/images/pabx/dashboard_3.png"
              alt="Painel PABX Nuvv"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
