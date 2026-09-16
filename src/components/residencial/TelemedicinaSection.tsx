import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TELEMEDICINA_PLANS, TelemedicinaPlan } from '../../data/plans';
import { TelemedicinaModal } from './TelemedicinaModal';
import {
  HeartPulse,
  Clock,
  Video,
  FileCheck2,
  Percent,
  Check,
  CheckCircle2,
  Users,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

interface TelemedicinaSectionProps {
  activeAddons: Record<string, boolean>;
  onToggleAddon: (addonKey: string) => void;
  onOpenLeadModal?: (serviceName?: string) => void;
}

export const TelemedicinaSection: React.FC<TelemedicinaSectionProps> = ({
  activeAddons,
  onToggleAddon,
  onOpenLeadModal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Plano destaque familiar (mais completo e popular)
  const popularPlan =
    TELEMEDICINA_PLANS.find((p) => p.isPopular) || TELEMEDICINA_PLANS[1] || TELEMEDICINA_PLANS[0];

  const handleIncludeInPlan = (planId: string) => {
    onToggleAddon(planId);
    navigate(`/residencial/monte-seu-combo?addon=${planId}#planos`);
  };

  const handleSelectFromModal = (plan: TelemedicinaPlan) => {
    setModalOpen(false);
    handleIncludeInPlan(plan.id);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-rose-50/20 to-white relative overflow-hidden" id="telemedicina">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Showcase Fluido Unificado em 2 Colunas */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-rose-200/80 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Coluna Esquerda: Proposta de Valor e Pilares */}
          <div className="space-y-5 flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <HeartPulse className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>NUVV SAÚDE • TELEMEDICINA 24H</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Mais do que internet:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
                  saúde e telemedicina 24h
                </span>{' '}
                para sua família.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Pronto atendimento médico por vídeo em menos de 10 minutos pelo celular, receitas digitais válidas em farmácias de todo o Brasil e descontos de até 80% em medicamentos e exames presenciais.
              </p>
            </div>

            {/* 4 Pilares de Benefícios Rápidos */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Espera &lt; 10 min</span>
                  <span className="text-[10px] text-slate-500">24/7 sem sair de casa</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Receitas Digitais</span>
                  <span className="text-[10px] text-slate-500">Com certificado ICP-Brasil</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Até 80% OFF</span>
                  <span className="text-[10px] text-slate-500">Em exames e remédios</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Planos Familiares</span>
                  <span className="text-[10px] text-slate-500">Você + dependentes</span>
                </div>
              </div>
            </div>

            {/* CTAs de Ação */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Ver Todos os Planos & Especialidades</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenLeadModal) {
                    onOpenLeadModal('Dúvidas sobre Telemedicina Nuvv Saúde');
                  }
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Falar com Consultor
              </button>
            </div>
          </div>

          {/* Coluna Direita: Card Interativo de Destaque da Experiência Familiar */}
          {popularPlan && (
            <div className="w-full max-w-sm flex-shrink-0 bg-gradient-to-b from-rose-50/70 via-white to-rose-50/40 rounded-3xl p-6 border border-rose-300/80 shadow-md space-y-4 relative">
              {/* Badge de Destaque Superior */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>MAIS ESCOLHIDO PARA A FAMÍLIA</span>
                </span>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-md">
                  Titular + Dependentes
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">{popularPlan.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5">{popularPlan.targetAudience}</p>
              </div>

              {/* Bloco de Valor */}
              <div className="p-3.5 rounded-2xl bg-white border border-rose-200/70 flex items-baseline justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Adicional ao plano</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-slate-900">
                      R$ {popularPlan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/mês</span>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2 py-1 rounded-lg">
                  Sem carência
                </span>
              </div>

              {/* Lista dos Benefícios Centrais */}
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">Clínico geral e pediatra 24h sem limite de consultas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">Mais de 20 especialidades médicas com hora marcada</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">Receitas e atestados enviados no WhatsApp/SMS</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">Descontos de até 80% em farmácias credenciadas</span>
                </li>
              </ul>

              {/* Botão de Adição Rápida: Direciona para o Monte seu Combo */}
              <button
                type="button"
                onClick={() => handleIncludeInPlan(popularPlan.id)}
                className="w-full py-3.5 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 transition-all cursor-pointer bg-slate-900 hover:bg-nuvv-purple text-white shadow-md hover:shadow-lg active:scale-98"
              >
                <span>Incluir no meu Plano</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full Telemedicina Modal com todos os planos e especialidades */}
      <TelemedicinaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectPlan={handleSelectFromModal}
      />
    </section>
  );
};
