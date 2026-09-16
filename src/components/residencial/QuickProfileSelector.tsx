import React from 'react';
import { Film, Crown, Trophy, Wifi } from 'lucide-react';

export type ResidentialProfileId = 'filmes-series' | 'completao' | 'esportes' | 'sem-pacote';

export interface ResidentialProfile {
  id: ResidentialProfileId;
  label: string;
  badge: string;
  packageTitle: string;
  packageImage: string;
  tagline: string;
  highlights: string[];
  recommendedSpeed: string;
  tierKey: 'cortesia' | 'basico' | 'completo' | 'essencial';
  includedAddonKeys: string[];
}

export const RESIDENTIAL_PROFILES: Record<ResidentialProfileId, ResidentialProfile> = {
  'filmes-series': {
    id: 'filmes-series',
    label: 'Filmes e Séries',
    badge: 'CINEMA',
    packageTitle: 'WATCH BLACK CINEMA LOCAL PRO',
    packageImage: '/images/external/cinema.png',
    tagline: 'Filmes, lançamentos e séries exclusivas com Telecine e HBO Max em destaque.',
    highlights: [
      'Telecine e HBO Max em destaque',
      'Catálogo de Cinema & Lançamentos On-Demand',
      '26 canais ao vivo em alta definição',
    ],
    recommendedSpeed: '400 Mega ou 800 Mega',
    tierKey: 'cortesia',
    includedAddonKeys: ['telecine', 'hboMax'],
  },
  'completao': {
    id: 'completao',
    label: 'Completão',
    badge: 'TOP',
    packageTitle: 'POWER ELITE WBD',
    packageImage: '/images/external/completo_elite.png',
    tagline: 'A experiência máxima com todas as estreias e 100+ canais ao vivo.',
    highlights: [
      '100+ canais de TV ao vivo em Full HD',
      'Premiere e Combate, Telecine e HBO Max inclusos',
      'App Awdio com audiobooks e podcasts',
    ],
    recommendedSpeed: '800 Mega ou 1 Giga',
    tierKey: 'completo',
    includedAddonKeys: ['telecine', 'hboMax'],
  },
  'esportes': {
    id: 'esportes',
    label: 'Esportes',
    badge: 'ESPORTES',
    packageTitle: 'POWER ESPORTE CLUBE',
    packageImage: '/images/external/tv_power_esporte_clube.png',
    tagline: 'Premiere e Combate inclusos, com Sportv, ESPN, Band Sports, N Sports e principais notícias.',
    highlights: [
      'Premiere e Combate ao vivo inclusos',
      '68 canais ao vivo com Sportv, ESPN, Band Sports e N Sports',
      'Principais canais de notícias e variedades',
    ],
    recommendedSpeed: '800 Mega ou 1 Giga',
    tierKey: 'essencial',
    includedAddonKeys: ['premiere', 'combate'],
  },
  'sem-pacote': {
    id: 'sem-pacote',
    label: 'Internet',
    badge: 'FIBRA',
    packageTitle: 'UP',
    packageImage: '/images/external/tv_cortesia.png',
    tagline: 'Apenas internet fibra óptica de alta performance com canais cortesia e sem adicionais.',
    highlights: [
      '18 canais de TV aberta em alta definição',
      'Roteador Wi-Fi 6 incluso em comodato',
      'Preço base mais econômico',
    ],
    recommendedSpeed: '400 Mega',
    tierKey: 'cortesia',
    includedAddonKeys: [],
  },
};

interface QuickProfileSelectorProps {
  selectedProfile: ResidentialProfileId;
  onSelectProfile: (profile: ResidentialProfileId) => void;
}

export const QuickProfileSelector: React.FC<QuickProfileSelectorProps> = ({
  selectedProfile,
  onSelectProfile,
}) => {
  return (
    <div className="max-w-6xl mx-auto mb-6 space-y-4">
      {/* Selector Header */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5">
        <span className="text-xs font-black text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          OFERTAS DIRECIONADAS AO SEU PERFIL
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark">
          O que você e sua família mais gostam de assistir?
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          Alterne entre os 4 pacotes abaixo para visualizar os planos e vantagens correspondentes:
        </p>
      </div>

      {/* Single-Row 4-Profile Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 p-1.5 sm:p-2 bg-gray-200/70 rounded-3xl shadow-inner max-w-4xl mx-auto">
        {/* Button 1: Filmes e Séries */}
        <button
          type="button"
          onClick={() => onSelectProfile('filmes-series')}
          className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${
            selectedProfile === 'filmes-series'
              ? 'bg-nuvv-purple text-white shadow-lg shadow-nuvv-purple/30 scale-[1.02]'
              : 'text-gray-700 hover:text-nuvv-dark hover:bg-white/70'
          }`}
        >
          <Film className={`w-4 h-4 flex-shrink-0 ${selectedProfile === 'filmes-series' ? 'text-amber-300' : 'text-gray-500'}`} />
          <span className="whitespace-nowrap">Filmes e Séries</span>
        </button>

        {/* Button 2: Completão */}
        <button
          type="button"
          onClick={() => onSelectProfile('completao')}
          className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${
            selectedProfile === 'completao'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/25 scale-[1.02]'
              : 'text-gray-700 hover:text-nuvv-dark hover:bg-white/70'
          }`}
        >
          <Crown className={`w-4 h-4 flex-shrink-0 ${selectedProfile === 'completao' ? 'text-slate-950' : 'text-gray-500'}`} />
          <span className="whitespace-nowrap">Completão</span>
        </button>

        {/* Button 3: Esportes */}
        <button
          type="button"
          onClick={() => onSelectProfile('esportes')}
          className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${
            selectedProfile === 'esportes'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]'
              : 'text-gray-700 hover:text-nuvv-dark hover:bg-white/70'
          }`}
        >
          <Trophy className={`w-4 h-4 flex-shrink-0 ${selectedProfile === 'esportes' ? 'text-yellow-300' : 'text-gray-500'}`} />
          <span className="whitespace-nowrap">Esportes</span>
        </button>

        {/* Button 4: Internet (TV Cortesia) */}
        <button
          type="button"
          onClick={() => onSelectProfile('sem-pacote')}
          className={`py-3 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap ${
            selectedProfile === 'sem-pacote'
              ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/30 scale-[1.02]'
              : 'text-gray-700 hover:text-nuvv-dark hover:bg-white/70'
          }`}
        >
          <Wifi className={`w-4 h-4 flex-shrink-0 ${selectedProfile === 'sem-pacote' ? 'text-emerald-400' : 'text-gray-500'}`} />
          <span className="whitespace-nowrap">Internet</span>
        </button>
      </div>
    </div>
  );
};
