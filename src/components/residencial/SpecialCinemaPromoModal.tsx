import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, Check, Film, Tv, Flame, X, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface SpecialCinemaPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPromo: () => void;
}

export const SpecialCinemaPromoModal: React.FC<SpecialCinemaPromoModalProps> = ({
  isOpen,
  onClose,
  onApplyPromo,
}) => {
  const [showChannelLineup, setShowChannelLineup] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl" showCloseButton={false}>
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white border border-indigo-500/30 shadow-2xl -m-6 sm:-m-8">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button Top-Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual Banner */}
        <div className="relative p-5 sm:p-6 pb-2 bg-gradient-to-b from-indigo-950/80 via-slate-950/90 to-slate-950">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-2.5 shadow-lg animate-pulse">
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>Condição Especial Exclusiva</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Combo Cinema & Séries
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-lg">
            Turbine seu plano com os dois maiores streamings do mundo + <strong>26 canais ao vivo</strong> em alta definição por um preço imperdível!
          </p>

          {/* Streamings Logos Badge Row */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-md">
              <img
                src="/images/external/telecine.png"
                alt="Telecine"
                className="w-7 h-7 rounded-lg object-contain"
              />
              <div>
                <span className="block text-xs font-black text-white">Telecine</span>
                <span className="block text-[10px] text-gray-400 font-medium">+6 canais ao vivo + On Demand</span>
              </div>
            </div>

            <div className="text-base font-black text-amber-400">+</div>

            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-md">
              <img
                src="/images/external/hbomax.png"
                alt="HBO Max"
                className="w-7 h-7 rounded-lg object-contain"
              />
              <div>
                <span className="block text-xs font-black text-white">HBO Max</span>
                <span className="block text-[10px] text-gray-400 font-medium">Séries HBO, DC e Champions League</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Details and Value Box */}
        <div className="p-5 sm:p-6 pt-2 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center space-x-2.5 text-xs text-gray-200">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span><strong>26 canais ao vivo</strong> em HD no NuvvPlay</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-gray-200">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Todos os 6 canais da Rede Telecine</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-gray-200">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Mais de 10.000 filmes e séries on-demand</span>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-gray-200">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Multitelas (TV, Celular, Tablet e PC)</span>
            </div>
          </div>

          {/* Interactive Channel Lineup Accordion */}
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowChannelLineup((prev) => !prev)}
              className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>Ver Grade de Canais Inclusa (26 Canais)</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-400">
                <span className="text-[11px]">{showChannelLineup ? 'Ocultar' : 'Visualizar'}</span>
                {showChannelLineup ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showChannelLineup && (
              <div className="p-3 bg-slate-900/90 border-t border-white/10 flex flex-col items-center animate-fade-in">
                <div className="rounded-xl overflow-hidden bg-slate-950 p-2 max-h-[40vh] flex items-center justify-center border border-white/10 w-full">
                  <img
                    src="/images/external/cinema.png"
                    alt="Grade de Canais Mais Cinema (26 Canais)"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('tv_cortesia.png')) {
                        target.src = '/images/external/tv_cortesia.png';
                      }
                    }}
                    className="max-h-[36vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-2">
                  * 26 canais digitais transmitidos em alta definição no app NuvvPlay.
                </span>
              </div>
            )}
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400 line-through font-medium">
                De R$ 64,80/mês
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xs font-bold text-gray-300">Por apenas</span>
                <span className="text-3xl font-black text-amber-400">R$ 29,90</span>
                <span className="text-xs font-semibold text-gray-300">/mês</span>
              </div>
              <span className="inline-block mt-0.5 text-[10px] font-black text-emerald-400 uppercase tracking-wide">
                Economia de R$ 34,90 todos os meses
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onApplyPromo();
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Aproveitar Esta Oferta</span>
            </button>
          </div>

          {/* Footer Dismiss */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-gray-400 hover:text-gray-200 transition-colors underline decoration-gray-600"
            >
              Continuar apenas com o plano TV Cortesia sem adicionais
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
