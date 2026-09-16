import React from 'react';
import {
  Tag,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Dog,
  Car,
  Briefcase,
  Key,
  Heart,
  Users,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

interface GuardTrackSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export const GuardTrackSection: React.FC<GuardTrackSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="track-section" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            MÓDULO TRACK • SEGURANÇA E TRANQUILIDADE DA FAMÍLIA
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Nuvv Tag.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
              Saiba sempre onde está o que você mais ama.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            A tranquilidade de saber que seus <strong>filhos chegaram bem na escola</strong> e que seu <strong>pet de estimação está protegido</strong> caso escape. Tudo isso no mesmo app da sua casa, sem complicação de marcas e acessível por toda a família.
          </p>
        </div>

        {/* Family Advantage Callout: No iPhone required & Shared family access */}
        <div className="max-w-4xl mx-auto mb-12 p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-800/80 to-amber-950/40 border border-amber-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-1.5">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Sem Precisar de iPhone</h4>
            <p className="text-xs text-gray-400">Funciona em qualquer smartphone sem restrições ou compras caras.</p>
          </div>

          <div className="space-y-1.5">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Toda a Família Conectada</h4>
            <p className="text-xs text-gray-400">Pais, mães e responsáveis acompanham o mesmo mapa simultaneamente.</p>
          </div>

          <div className="space-y-1.5">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Zero Chip de Celular</h4>
            <p className="text-xs text-gray-400">Sem mensalidades de dados móveis ou recargas. Bateria dura até 1 ano.</p>
          </div>
        </div>

        {/* 2-Column: Use Cases & Commercial Offer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Emotional & Practical Use Cases */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-extrabold text-white">
              Proteção para cada momento do seu dia
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kids Backpack */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-lg">
                  🎒
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Crianças & Mochila Escolar</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Saiba se seus filhos já chegaram na escola, van escolar ou curso com total paz de espírito.
                  </p>
                </div>
              </div>

              {/* Pets */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 text-lg">
                  🐕
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Pets na Coleira</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Se o portão ficar aberto e seu cão ou gato escapar, localize-o rapidamente no mapa antes de sustos.
                  </p>
                </div>
              </div>

              {/* Keys & Wallet */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Chaves & Carteiras</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Faça a Tag apitar pelo celular para achar as chaves em segundos ou veja no mapa onde a carteira ficou.
                  </p>
                </div>
              </div>

              {/* Car & Motorcycle */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Carros, Motos & Bikes</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Esconda no veículo para localização silenciosa contra furtos sem pagar planos caros de rastreador.
                  </p>
                </div>
              </div>

              {/* Luggage */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 sm:col-span-2 hover:border-amber-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Malas de Viagem & Instrumentos</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Acompanhe sua bagagem despachada em viagens de avião ou ônibus em tempo real direto na esteira.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality specs */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Bateria de até 1 ano:</strong> Pilha padrão CR2032 de troca simples e barata.</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Resistente à água:</strong> Aguenta chuva, passeios de pet e acidentes do dia a dia.</span>
              </div>
            </div>
          </div>

          {/* Right: Commercial Pricing Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                OFERTA CLIENTE FIBRA
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                SEGURANÇA ACESSÍVEL
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                Nuvv Tag com Taxa Única
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                Compre o dispositivo e use sem mensalidades enquanto for cliente Nuvv Fibra.
              </p>

              {/* Price Banner */}
              <div className="my-6 p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-center">
                <span className="text-xs text-amber-200 block font-semibold">Taxa Única Promocional</span>
                <div className="text-4xl font-black text-white my-1">
                  R$ 99,90 <span className="text-xs font-bold text-amber-300">taxa única</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold block">
                  ✓ SEM MENSALIDADE (já com Tag inclusa)
                </span>
              </div>

              {/* Bulk discount callout */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-1">
                <div className="flex items-center justify-between text-xs font-black text-white">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Desconto Progressivo:
                  </span>
                  <span className="text-amber-400">R$ 79,90 cada</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Proteja toda a casa: comprando <strong>3 ou mais unidades</strong> para filhos, pets e veículos, pague apenas <strong>R$ 79,90</strong> por tag!
                </p>
              </div>

              {/* Monthly Alternative note */}
              <div className="text-[11px] text-gray-400 text-center mb-6">
                Ou no plano mensal: R$ 9,90/mês (+ ativação de R$ 15,00).
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan ? onSelectPlan('Nuvv Tag - Promoção R$ 99,90') : null}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
              >
                <span>Garantir Minhas Tags</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
