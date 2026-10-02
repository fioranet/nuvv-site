import React from 'react';
import { BusinessPlan } from '../../data/businessPlans';
import { Check, ArrowRight, Zap, Info, Network, Clock, Server } from 'lucide-react';

interface BusinessPlanCardProps {
  plan: BusinessPlan;
  onSelectPlan: (plan: BusinessPlan) => void;
  onOpenDetails: (plan: BusinessPlan) => void;
}

export const BusinessPlanCard: React.FC<BusinessPlanCardProps> = ({
  plan,
  onSelectPlan,
  onOpenDetails,
}) => {
  const isSemiDedicado = plan.id.includes('semi') || plan.ipType?.toLowerCase().includes('fixo');
  const isLinkDedicado = plan.id.includes('dedicado') || plan.cirGuarantee?.includes('100%');
  const is1GigaBroadband =
    plan.id === 'biz-max-1000' ||
    (plan.speed === '1' && plan.unit === 'Giga' && plan.slaHours === 24);

  return (
    <div
      className={`relative rounded-3xl bg-white transition-all duration-300 flex flex-col h-full border ${
        plan.isPopular
          ? 'border-2 border-emerald-500 shadow-xl ring-4 ring-emerald-500/10 -translate-y-2'
          : 'border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Banner Tag */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-md flex items-center space-x-1.5 ${
              plan.isPopular ? 'bg-emerald-600' : 'bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-nuvv-green fill-nuvv-green" />
            <span>{plan.badge}</span>
          </span>
        </div>
      )}

      {/* Header: Nome, Velocidade e Preço com máxima clareza */}
      <div className="p-6 sm:p-7 pb-5 border-b border-slate-100 text-center">
        {/* Nome do Plano */}
        <span className="inline-block text-xs sm:text-sm font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-xl shadow-2xs">
          {plan.name}
        </span>

        {/* Velocidade Gigante e Nítida */}
        <div className="mt-3">
          <div className="text-5xl sm:text-6xl font-black text-slate-950 tracking-tight leading-none">
            {plan.speed}{' '}
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {plan.unit}
            </span>
          </div>
        </div>

        {/* Preço em Destaque logo abaixo da Velocidade */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          {plan.priceOnRequest ? (
            <div className="py-1 text-center">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Sob Medida
              </div>
              <span className="inline-block mt-1 text-xs sm:text-sm font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shadow-2xs">
                {plan.priceNote || 'PROJETO PERSONALIZADO'}
              </span>
            </div>
          ) : (
            <div className="text-center">
              {plan.originalPrice && (
                <div className="text-xs sm:text-sm text-slate-400 line-through font-bold">
                  De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}/mês
                </div>
              )}
              {plan.promoPrice !== undefined && (
                <div className="flex items-baseline justify-center space-x-1.5 text-slate-950 mt-0.5">
                  <span className="text-sm font-bold text-slate-400">Por R$</span>
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-600">
                    {Math.floor(plan.promoPrice)}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">
                    ,{(plan.promoPrice % 1).toFixed(2).substring(2)}
                  </span>
                  <span className="text-sm text-slate-500 font-bold">/mês</span>
                </div>
              )}
              <span className="inline-block mt-1.5 text-[11px] sm:text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-lg">
                Pagamento até o Vencimento
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Painel de Especificações Técnicas B2B: SLA, IP Fixo e CIR em linhas limpas e estruturadas */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div>
          {(plan.slaHours || plan.cirGuarantee || plan.ipType) && (
            <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-4 space-y-3 shadow-2xs">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-200/70">
                Garantias Corporativas do Plano
              </div>

              {/* 1. IP Fixo */}
              {plan.ipType && (
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSemiDedicado || plan.ipType.toLowerCase().includes('fixo')
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : isLinkDedicado
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <Server className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        {isSemiDedicado ? '1 IP Fixo IPv4 Incluso' : plan.ipType}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">
                        {isSemiDedicado
                          ? 'Público (/32) para Servidores & VPN'
                          : isLinkDedicado
                          ? 'Roteamento BGP / ASN Próprio'
                          : 'IP Dinâmico Corporativo'}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg flex-shrink-0 tracking-wider shadow-2xs ${
                      isSemiDedicado || plan.ipType.toLowerCase().includes('fixo')
                        ? 'bg-purple-600 text-white'
                        : isLinkDedicado
                        ? 'bg-indigo-900 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSemiDedicado ? 'IP Fixo' : isLinkDedicado ? 'Bloco IP' : 'Dinâmico'}
                  </span>
                </div>
              )}

              {/* 2. SLA (Atendimento & Reparo) */}
              {plan.slaHours && (
                <div className="flex items-center justify-between gap-2.5 pt-2.5 border-t border-slate-200/70">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        plan.slaHours <= 24
                          ? 'bg-slate-900 text-nuvv-green'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        SLA de Reparo:{' '}
                        <strong className="text-emerald-700 font-black">
                          Até {plan.slaHours} Horas
                        </strong>
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">
                        {plan.slaHours <= 4
                          ? 'SLA Contratual Rigoroso 24/7/365'
                          : plan.slaHours <= 12
                          ? 'Atendimento e Reparo Ágil em 12h'
                          : plan.slaHours === 24
                          ? 'Prioritário B2B (Metade do tempo)'
                          : 'Suporte Comercial Prioritário'}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg flex-shrink-0 tracking-wider shadow-2xs ${
                      plan.slaHours <= 4
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : plan.slaHours <= 12
                        ? 'bg-slate-900 text-white font-black'
                        : plan.slaHours === 24
                        ? 'bg-emerald-700 text-white font-black'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    SLA {plan.slaHours}h
                  </span>
                </div>
              )}

              {/* 3. Garantia de Banda (CIR) */}
              {plan.cirGuarantee && (
                <div className="flex items-center justify-between gap-2.5 pt-2.5 border-t border-slate-200/70">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center flex-shrink-0">
                      <Network className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs sm:text-sm font-black text-slate-900 leading-tight">
                        Garantia de Banda (CIR):{' '}
                        <strong className="text-emerald-700 font-black">{plan.cirGuarantee}</strong>
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">
                        {plan.cirGuarantee.includes('100%')
                          ? 'Simétrica Full-Duplex (1:1)'
                          : plan.cirGuarantee.includes('70%')
                          ? 'Estabilidade Contínua sem Oscilação'
                          : 'Garantia Superior ao Residencial'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-700 text-white flex-shrink-0 tracking-wider shadow-2xs">
                    {plan.cirGuarantee.includes('100%')
                      ? '100% Real'
                      : plan.cirGuarantee.includes('70%')
                      ? '70% Real'
                      : plan.cirGuarantee}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Destaque especial para 1 Giga Banda Larga */}
          {is1GigaBroadband && (
            <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 text-center shadow-2xs">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center justify-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>SLA 24H PRIORITÁRIO • CIR 50% GARANTIDO</span>
              </div>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5 leading-tight">
                Reparo prioritário em até 24h (metade do tempo) e 1.000 Mega de alta densidade para sua empresa.
              </p>
            </div>
          )}

          {/* Lista de Recursos Adicionais */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              Também incluso no plano:
            </span>
            <ul className="space-y-2.5">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug"
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <button
            type="button"
            onClick={() => onSelectPlan(plan)}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base text-white flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 cursor-pointer ${
              plan.isPopular
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'
            }`}
          >
            <span>{plan.priceOnRequest ? 'Solicitar Projeto Dedicado' : 'Contratar Plano'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onOpenDetails(plan)}
            className="w-full text-center text-xs sm:text-sm font-extrabold text-slate-500 hover:text-emerald-700 uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 py-1 cursor-pointer"
          >
            <Info className="w-4 h-4" />
            <span>Saber mais detalhes técnicos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

