import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CIR_SLA_TABLE } from '../../data/support';
import {
  ShieldCheck,
  Zap,
  Clock,
  Info,
  Sparkles,
  Server,
  Building2,
  Home,
  PhoneCall,
  Activity,
} from 'lucide-react';

interface SlaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryFilter = 'todos' | 'empresarial' | 'corporativo' | 'residencial' | 'servicos';

export const SlaModal: React.FC<SlaModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');

  const filteredItems = CIR_SLA_TABLE.filter(
    (item) => activeCategory === 'todos' || item.category === activeCategory
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tabela de CIR & SLA (Garantia de Banda e Prazos)"
      subtitle="Transparência total: consulte as garantias contratuais de velocidade e prazos de reparo técnico."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* 1. Educational Explanations (CIR & SLA Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card CIR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white border border-indigo-100/90 shadow-2xs space-y-2.5">
            <div className="flex items-center space-x-2.5 text-nuvv-purple font-extrabold text-xs uppercase tracking-wider">
              <div className="w-7 h-7 rounded-xl bg-indigo-100/80 text-nuvv-purple flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <span>O que é CIR (Garantia de Banda)?</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>CIR (Committed Information Rate)</strong> é a porcentagem mínima de velocidade que a operadora assegura em contrato mesmo nos momentos de maior congestionamento.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[11px] text-nuvv-purple font-bold bg-white/80 p-2.5 rounded-xl border border-indigo-100">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                Mercado Comum: ~40% • <strong>Nuvv: 50% a 100% Garantido</strong>
              </span>
            </div>
          </div>

          {/* Card SLA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border border-amber-200/80 shadow-2xs space-y-2.5">
            <div className="flex items-center space-x-2.5 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
              <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span>O que é SLA (Prazo de Solução)?</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>SLA (Service Level Agreement)</strong> é o prazo máximo contratual para atendimento técnico e restabelecimento completo do link em caso de interrupção.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[11px] text-amber-900 font-bold bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Padrão: 48h • <strong>Prioritário: 24h, 12h ou 4h (Missão Crítica)</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Category Filter Switcher */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { id: 'todos', label: 'Todos os Serviços', icon: Activity },
            { id: 'empresarial', label: 'Empresarial PME', icon: Building2 },
            { id: 'corporativo', label: 'Semi & Dedicado', icon: Server },
            { id: 'residencial', label: 'Residencial', icon: Home },
            { id: 'servicos', label: 'Telefonia / PABX', icon: PhoneCall },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-nuvv-purple text-white shadow-xs'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Responsive Table / Cards */}
        <div className="rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gray-50/90 border-b border-gray-200/80 text-gray-400 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Plano / Serviço</th>
                  <th className="py-3.5 px-4 text-center">Garantia (CIR)</th>
                  <th className="py-3.5 px-4 text-center">Prazo Reparo (SLA)</th>
                  <th className="py-3.5 px-4">IP & Conexão</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Perfil Recomendado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-indigo-50/30 transition-colors ${
                      item.isPopular ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    {/* Plano */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-gray-900 flex items-center space-x-1.5">
                        <span>{item.serviceType}</span>
                        {item.badge && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    </td>

                    {/* CIR */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg font-black text-xs ${
                          item.cirValueNumber === 100
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : item.cirValueNumber >= 80
                            ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                            : item.cirValueNumber >= 65
                            ? 'bg-purple-100 text-purple-900 border border-purple-200'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.cirGuarantee}
                      </span>
                    </td>

                    {/* SLA */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg font-black text-xs ${
                          item.slaHours <= 4
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : item.slaHours <= 12
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : item.slaHours <= 24
                            ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.slaTimeLimit}
                      </span>
                    </td>

                    {/* IP */}
                    <td className="py-3.5 px-4 text-gray-700 font-semibold whitespace-nowrap text-[11px]">
                      {item.ipType}
                    </td>

                    {/* Recomendação */}
                    <td className="py-3.5 px-4 text-gray-500 text-[11px] leading-snug hidden md:table-cell">
                      {item.recommendedFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Information Callout */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/90 flex items-start space-x-3 text-xs text-gray-700">
          <Info className="w-4 h-4 text-nuvv-purple flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="leading-relaxed">
              <strong>Como funciona a contagem do SLA:</strong> O prazo começa a vigorar imediatamente após o registro do chamado técnico com emissão do número de protocolo em nossos canais oficiais (WhatsApp, Central 0800 ou App Nuvv+).
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              * Para conexões Semi-Dedicadas e Dedicadas, o monitoramento NOC opera 24/7/365 com detecção e abertura automática de incidentes de rede antes mesmo do contato do cliente.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
