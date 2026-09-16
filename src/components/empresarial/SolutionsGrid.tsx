import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Router,
  Cloud,
  PhoneCall,
  Network,
  Clock,
  MessageSquare,
  Wifi,
  ShieldCheck,
  Radio,
  Send,
  Server,
  Cpu,
  ArrowRight,
  Bot,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { CorporateSolution, CORPORATE_SOLUTIONS } from '../../data/services';

interface SolutionsGridProps {
  onSelectSolution: (solution: CorporateSolution) => void;
}

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({ onSelectSolution }) => {
  const navigate = useNavigate();

  const iconMap: Record<string, React.ElementType> = {
    Router,
    Cloud,
    PhoneCall,
    Network,
    Clock,
    MessageSquare,
    Wifi,
    ShieldCheck,
    Radio,
    Send,
    Server,
    Cpu,
    Bot,
  };

  const handleCardAction = (solution: CorporateSolution) => {
    if (solution.route) {
      navigate(solution.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSelectSolution(solution);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 relative overflow-hidden" id="solucoes-grid">
      {/* Ambient glow verde corporativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-emerald-500/5 to-transparent pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cabeçalho da Sessão no Padrão do Design System */}
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>ECOSSISTEMA COMPLETO • TELECOM & TI CORPORATIVA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Nosso Portfólio Completo de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
              Soluções Corporativas
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
            Infraestrutura de ponta em conectividade dedicada, segurança cibernética, voz em nuvem e inteligência artificial para companhias que não podem parar.
          </p>
        </div>

        {/* Grid de 12 Soluções */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORPORATE_SOLUTIONS.map((solution) => {
            const Icon = iconMap[solution.iconName] || Router;
            const hasDedicatedPage = Boolean(solution.route);

            return (
              <div
                key={solution.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Top Bar: Icon + Category Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200/60">
                      {solution.categoryPill || 'Telecom'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1.5 leading-snug">
                    {solution.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {solution.shortDescription}
                  </p>

                  {/* Pricing note if available */}
                  {solution.pricingNote && (
                    <div className="mb-4 text-[11px] font-bold text-emerald-700 bg-emerald-50/60 px-2.5 py-1 rounded-lg inline-block">
                      {solution.pricingNote}
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  <button
                    type="button"
                    onClick={() => handleCardAction(solution)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 cursor-pointer group/btn ${
                      hasDedicatedPage
                        ? 'bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200/80 hover:border-emerald-600'
                        : 'bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{hasDedicatedPage ? 'Conhecer Solução' : 'Solicitar Estudo'}</span>
                    {hasDedicatedPage ? (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
