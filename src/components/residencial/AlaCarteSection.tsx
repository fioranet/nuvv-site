import React from 'react';
import { Film, Trophy, PlusCircle } from 'lucide-react';
import { PLAN_ADDONS } from '../../data/plans';

interface AlaCarteSectionProps {
  onToggleAddon: (key: string) => void;
  activeAddons: Record<string, boolean>;
}

export const AlaCarteSection: React.FC<AlaCarteSectionProps> = ({
  onToggleAddon,
  activeAddons,
}) => {
  const movies = [PLAN_ADDONS.telecine, PLAN_ADDONS.hboMax];
  const sports = [PLAN_ADDONS.premiere, PLAN_ADDONS.combate];

  return (
    <section className="py-16 bg-slate-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-nuvv-purple uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Premium
          </span>
          <h2 className="text-3xl font-extrabold text-nuvv-dark mt-2">
            À la Carte
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Adicione os melhores conteúdos ao seu plano e assista onde quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Filmes e Séries Column */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 text-nuvv-purple font-bold text-base mb-6">
              <Film className="w-5 h-5" />
              <span>Filmes e Séries</span>
            </div>

            <div className="space-y-4">
              {movies.map((item) => {
                const isSelected = !!activeAddons[item.id];
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-nuvv-purple bg-indigo-50/50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-12 bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center shadow-2xs">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="max-h-7 max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 max-w-xs">{item.description}</p>
                        <div className="text-xs font-bold text-nuvv-purple mt-1">
                          R$ {item.price.toFixed(2).replace('.', ',')}/mês
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleAddon(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-nuvv-purple text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Incluso' : '+ Adicionar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Esportes Column */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-base mb-6">
              <Trophy className="w-5 h-5" />
              <span>Esportes</span>
            </div>

            <div className="space-y-4">
              {sports.map((item) => {
                const isSelected = !!activeAddons[item.id];
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-12 bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center shadow-2xs">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="max-h-7 max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 max-w-xs">{item.description}</p>
                        <div className="text-xs font-bold text-emerald-600 mt-1">
                          R$ {item.price.toFixed(2).replace('.', ',')}/mês
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleAddon(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Incluso' : '+ Adicionar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
