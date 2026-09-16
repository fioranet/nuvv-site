import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/common/Modal';
import {
  EntertainmentTier,
  ResidentialPlan,
  RESIDENTIAL_PLANS,
  TIER_CONFIG,
  PLAN_ADDONS,
  VisionAddonConfig,
  calculateVisionAddonPrice,
  resolveTierAndAddons,
  TV_PLANS_REFERENCE_TABLE,
  TvPlanReference,
} from '../data/plans';
import {
  QuickProfileSelector,
  ResidentialProfileId,
  RESIDENTIAL_PROFILES,
} from '../components/residencial/QuickProfileSelector';
import { PlanCard } from '../components/residencial/PlanCard';
import {
  Sparkles,
  ArrowRight,
  Tv,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Crown,
  Trophy,
  HeartPulse,
  ShieldCheck,
  Wifi,
  Zap,
  Info,
  ArrowLeft,
  Film,
  Layers,
  FileSpreadsheet,
  Download,
  Maximize2,
  Eye,
  CreditCard,
  Cloud,
  Phone,
  Video,
  Bell,
  Tag,
} from 'lucide-react';

export type SpeedOptionId = '400' | '800';

export interface SpeedOption {
  id: SpeedOptionId;
  label: string;
  speed: string;
  unit: string;
  wifiBadge: string;
  priceOffset: number; // delta em relação a 400M (+R$ 30 para 800M)
}

export const SPEED_OPTIONS: SpeedOption[] = [
  {
    id: '400',
    label: '400 Mega',
    speed: '400',
    unit: 'Mega',
    wifiBadge: 'Wi-Fi Plus Incluso',
    priceOffset: 0,
  },
  {
    id: '800',
    label: '800 Mega',
    speed: '800',
    unit: 'Mega',
    wifiBadge: 'Wi-Fi Plus Incluso',
    priceOffset: 20,
  },
];

export interface PackageOffer {
  id: string;
  category: 'cinema' | 'completo' | 'esportes' | 'saude' | 'seguranca' | 'essencial';
  badge: string;
  badgeColor: 'amber' | 'purple' | 'emerald' | 'cyan' | 'blue' | 'slate';
  isPopular?: boolean;
  title: string;
  tagline: string;
  channelsCount: number;
  channelsTitle: string;
  channelsImage: string;
  catalogImage: string;
  hasCanaisGlobo?: boolean;
  heroLogos: { name: string; logo: string }[];
  contentHighlights: string[];
  basePrice400M: number;
  originalBasePrice: number;
  defaultSpeed: SpeedOptionId;
  detailsSummary: string;
}

export const PACKAGE_OFFERS: PackageOffer[] = [
  {
    id: 'pacote-cinema-series',
    category: 'cinema',
    badge: 'MAIS CINEMA',
    badgeColor: 'amber',
    isPopular: true,
    title: 'Mais Cinema',
    tagline: 'Telecine (6 canais ao vivo + streaming) e HBO Max com filmes, séries e App Awdio.',
    channelsCount: 26,
    channelsTitle: 'Grade de Canais Mais Cinema (26 Canais)',
    channelsImage: '/images/external/cinema.png',
    catalogImage: '/images/external/cat_completo.png',
    heroLogos: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
      { name: 'HBO Max', logo: '/images/external/hbomax.png' },
    ],
    contentHighlights: [
      'Telecine incluso com 6 canais ao vivo + conteúdo streaming',
      'HBO Max incluso com filmes, séries premiadas e Champions',
      'App Awdio com audiobooks, podcasts e conteúdos em áudio',
      '26 canais ao vivo no NuvvPlay (Watch)',
    ],
    basePrice400M: 129.80,
    originalBasePrice: 179.90,
    defaultSpeed: '400',
    detailsSummary: 'Combo para quem ama cinema, maratonar séries, esportes e ouvir conteúdos no Awdio.',
  },
  {
    id: 'pacote-completao-elite',
    category: 'completo',
    badge: 'TUDO INCLUSO • FAMÍLIA',
    badgeColor: 'purple',
    title: 'Completão Família',
    tagline: 'A experiência total: 100+ canais de TV ao vivo com Premiere, Combate, HBO Max e Telecine inclusos.',
    channelsCount: 100,
    channelsTitle: 'Grade de Canais Completão (100+ Canais)',
    channelsImage: '/images/external/completo_elite.png',
    catalogImage: '/images/external/cat_completo.png',
    hasCanaisGlobo: true,
    heroLogos: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Premiere', logo: '/images/external/premiere.png' },
      { name: 'Combate', logo: '/images/external/combate.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
      { name: 'HBO Max', logo: '/images/external/hbomax.png' },
    ],
    contentHighlights: [
      'Premiere e Combate inclusos (jogos do Brasileirão e grandes lutas)',
      'HBO Max e Telecine inclusos (6 canais ao vivo + streaming)',
      'App Awdio com audiobooks, podcasts e conteúdos em áudio',
      '100+ canais de TV ao vivo no NuvvPlay (Watch)',
    ],
    basePrice400M: 189.80,
    originalBasePrice: 249.90,
    defaultSpeed: '400',
    detailsSummary: 'O combo máximo com todas as estreias do cinema, lutas e jogos de futebol ao vivo para a família.',
  },
  {
    id: 'pacote-esportes-futebol',
    category: 'esportes',
    badge: 'MAIS ESPORTES',
    badgeColor: 'emerald',
    title: 'Mais Esportes',
    tagline: 'Premiere e Combate inclusos, com Sportv, ESPN, Band Sports, N Sports e canais de notícias.',
    channelsCount: 68,
    channelsTitle: 'Grade de Canais Mais Esportes (68 Canais)',
    channelsImage: '/images/external/tv_power_esporte_clube.png',
    catalogImage: '/images/external/cat_medio.png',
    hasCanaisGlobo: true,
    heroLogos: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Premiere', logo: '/images/external/premiere.png' },
      { name: 'Combate', logo: '/images/external/combate.png' },
    ],
    contentHighlights: [
      'Premiere com jogos do Brasileirão e Combate com grandes lutas',
      'Sportv, ESPN, Band Sports e N Sports com cobertura completa',
      'Canais de notícias nacionais e internacionais',
      '68 canais de TV ao vivo no NuvvPlay (Watch)',
    ],
    basePrice400M: 154.80,
    originalBasePrice: 209.90,
    defaultSpeed: '400',
    detailsSummary: 'Perfeito para quem ama futebol, lutas e esportes com os melhores canais esportivos e jornalísticos.',
  },
  {
    id: 'pacote-saude-familia',
    category: 'saude',
    badge: 'TELEMEDICINA & PROTEÇÃO',
    badgeColor: 'cyan',
    title: 'Família Protegida & Telemedicina 24h',
    tagline: 'TurboMed Telemedicina 24h para toda a família + Segurança Digital para até 5 dispositivos.',
    channelsCount: 18,
    channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
    channelsImage: '/images/external/tv_cortesia.png',
    catalogImage: '/images/external/cat_min.png',
    heroLogos: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'TurboMed 24h', logo: '/images/apps/turbomed_icon.svg' },
      { name: 'Segurança Digital', logo: '/images/apps/kaspersky_icon.svg' },
    ],
    contentHighlights: [
      'Telemedicina 24h por vídeo para titular e dependentes (com opção presencial no plano premium)',
      '19 especialidades médicas, receitas e atestados ICP-Brasil',
      'Descontos de até 80% em farmácias e laboratórios',
      'Segurança Digital para até 5 celulares e computadores contra vírus e golpes',
    ],
    basePrice400M: 129.70,
    originalBasePrice: 169.90,
    defaultSpeed: '400',
    detailsSummary: 'Cuidado completo com telemedicina para a família e segurança digital contra ameaças na internet.',
  },
  {
    id: 'pacote-casa-segura-guard',
    category: 'seguranca',
    badge: 'CÂMERA & MONITORAMENTO',
    badgeColor: 'blue',
    title: 'Casa Segura (Nuvv Guard)',
    tagline: 'Câmera Wi-Fi Full HD inteligente em comodato com gravação contínua na nuvem por 7 dias.',
    channelsCount: 18,
    channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
    channelsImage: '/images/external/tv_cortesia.png',
    catalogImage: '/images/external/cat_min.png',
    heroLogos: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Nuvv Guard', logo: '/images/apps/app_nuvv_guard_icon.png' },
    ],
    contentHighlights: [
      'Câmera Wi-Fi Full HD em comodato com visão noturna',
      'Gravação em nuvem segura por 7 dias (histórico contínuo)',
      'Alertas inteligentes de movimento humano no smartphone',
      '18 canais abertos em HD no NuvvPlay (Watch) + Roteador Wi-Fi Plus',
    ],
    basePrice400M: 144.80,
    originalBasePrice: 189.90,
    defaultSpeed: '400',
    detailsSummary: 'Monitore sua casa, filhos ou pets 24h por dia direto no app Nuvv Guard com gravação em nuvem.',
  },
  {
    id: 'pacote-essencial-fibra',
    category: 'essencial',
    badge: 'FIBRA PURA • ECONÔMICO',
    badgeColor: 'slate',
    title: 'Conexão Pura Essencial',
    tagline: 'Ultravelocidade 100% fibra óptica com Wi-Fi Plus e 18 canais cortesia pelo menor custo mensal.',
    channelsCount: 18,
    channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
    channelsImage: '/images/external/tv_cortesia.png',
    catalogImage: '/images/external/cat_min.png',
    heroLogos: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'App Nuvv', logo: '/images/apps/app_nuvv_icon.png' },
    ],
    contentHighlights: [
      '100% Fibra óptica estável para jogos e home office',
      'Roteador Wi-Fi Plus de alta tecnologia em comodato',
      '18 canais de TV aberta em alta definição pelo app',
      'Instalação grátis e suporte humanizado',
    ],
    basePrice400M: 99.90,
    originalBasePrice: 119.90,
    defaultSpeed: '400',
    detailsSummary: 'A opção ideal para quem busca internet de qualidade sem pacotes extras de streaming.',
  },
];

export type Sec3TabId = 'destaques' | 'completo' | 'essencial' | 'basico' | 'internet';

export const SEC3_TAB_OFFERS: Record<Sec3TabId, PackageOffer[]> = {
  destaques: [
    PACKAGE_OFFERS[0], // Mais Cinema
    PACKAGE_OFFERS[1], // Completão Família
    PACKAGE_OFFERS[2], // Mais Esportes
  ],
  completo: [
    {
      id: 'completo-base',
      category: 'completo',
      badge: 'COMPLETO',
      badgeColor: 'purple',
      title: 'Completo',
      tagline: 'Grade ampla com 93 canais ao vivo, variedades, infantis, Premiere e Combate inclusos.',
      channelsCount: 93,
      channelsTitle: 'Grade de Canais Completo (93 Canais)',
      channelsImage: '/images/external/tv_completo.png',
      catalogImage: '/images/external/cat_completo.png',
      hasCanaisGlobo: false,
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'Premiere', logo: '/images/external/premiere.png' },
        { name: 'Combate', logo: '/images/external/combate.png' },
      ],
      contentHighlights: [
        'Premiere e Combate inclusos (jogos e grandes lutas)',
        '93 canais de TV ao vivo com esportes e infantis',
        'App Awdio com podcasts e audiobooks',
        'Plataforma completa NuvvPlay (Watch)',
      ],
      basePrice400M: 159.80,
      originalBasePrice: 209.90,
      defaultSpeed: '400',
      detailsSummary: 'Grade completa com esportes ao vivo, canais infantis e variedades.',
    },
    {
      id: 'completo-cinema',
      category: 'completo',
      badge: 'COMPLETO + TELECINE',
      badgeColor: 'purple',
      isPopular: true,
      title: 'Completo + Telecine',
      tagline: 'A experiência do Completo somada aos 6 canais Telecine e catálogo sob demanda.',
      channelsCount: 99,
      channelsTitle: 'Grade de Canais Completo + Telecine (99 Canais)',
      channelsImage: '/images/external/completo_elite.png',
      catalogImage: '/images/external/cat_completo.png',
      hasCanaisGlobo: false,
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'Premiere', logo: '/images/external/premiere.png' },
        { name: 'Combate', logo: '/images/external/combate.png' },
        { name: 'Telecine', logo: '/images/external/telecine.png' },
      ],
      contentHighlights: [
        'Telecine incluso com 6 canais ao vivo + streaming',
        'Premiere e Combate ao vivo inclusos na grade',
        '99 canais de TV ao vivo com Telecine, esportes e infantis',
        'App Awdio incluso no NuvvPlay (Watch)',
      ],
      basePrice400M: 169.80,
      originalBasePrice: 229.90,
      defaultSpeed: '400',
      detailsSummary: 'Completo com os 6 canais Telecine, Premiere e Combate para toda a família.',
    },
  ],
  essencial: [
    {
      id: 'essencial-base',
      category: 'completo',
      badge: 'ESSENCIAL',
      badgeColor: 'cyan',
      title: 'Essencial',
      tagline: '68 canais de TV ao vivo com notícias, entretenimento e variedades.',
      channelsCount: 68,
      channelsTitle: 'Grade de Canais Essencial (68 Canais)',
      channelsImage: '/images/external/tv_essencial.png',
      catalogImage: '/images/external/cat_completo.png',
      hasCanaisGlobo: false,
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
      ],
      contentHighlights: [
        '68 canais de TV ao vivo em Full HD',
        'Programação de notícias, séries e entretenimento',
        'App Awdio com audiobooks, podcasts e conteúdos',
        'Acesso simultâneo no NuvvPlay (Watch)',
      ],
      basePrice400M: 129.80,
      originalBasePrice: 169.90,
      defaultSpeed: '400',
      detailsSummary: 'Excelente equilíbrio de canais de TV ao vivo para o dia a dia da família.',
    },
    {
      id: 'essencial-telecine',
      category: 'cinema',
      badge: 'ESSENCIAL + TELECINE',
      badgeColor: 'amber',
      isPopular: true,
      title: 'Essencial + Telecine',
      tagline: 'Grade Essencial de 68 canais somada aos 6 canais Telecine e streaming sob demanda.',
      channelsCount: 74,
      channelsTitle: 'Grade de Canais Essencial + Telecine (74 Canais)',
      channelsImage: '/images/external/tv_watch_black_premium.png',
      catalogImage: '/images/external/cat_completo.png',
      hasCanaisGlobo: false,
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'Telecine', logo: '/images/external/telecine.png' },
      ],
      contentHighlights: [
        'Telecine incluso com 6 canais ao vivo + conteúdo streaming',
        '68 canais de TV ao vivo em Full HD',
        'App Awdio com audiobooks, podcasts e conteúdos',
        '74 canais de TV ao vivo no NuvvPlay (Watch)',
      ],
      basePrice400M: 139.80,
      originalBasePrice: 189.90,
      defaultSpeed: '400',
      detailsSummary: 'Canais populares da TV mais as grandes estreias de cinema do Telecine.',
    },
    {
      id: 'essencial-max',
      category: 'cinema',
      badge: 'ESSENCIAL + HBO MAX',
      badgeColor: 'purple',
      title: 'Essencial + HBO Max',
      tagline: 'Grade Essencial de 68 canais somada ao streaming HBO Max com filmes, séries e Champions.',
      channelsCount: 68,
      channelsTitle: 'Grade de Canais Essencial + HBO Max (68 Canais)',
      channelsImage: '/images/external/tv_essencial.png',
      catalogImage: '/images/external/cat_completo.png',
      hasCanaisGlobo: false,
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'HBO Max', logo: '/images/external/hbomax.png' },
      ],
      contentHighlights: [
        'HBO Max incluso com séries premiadas e Champions League',
        '68 canais de TV ao vivo em Full HD',
        'App Awdio com audiobooks e podcasts',
        'Transmissão simultânea no NuvvPlay (Watch)',
      ],
      basePrice400M: 149.80,
      originalBasePrice: 199.90,
      defaultSpeed: '400',
      detailsSummary: 'O melhor das séries e filmes da HBO Max com toda a grade Essencial ao vivo.',
    },
  ],
  basico: [
    {
      id: 'basico-base',
      category: 'completo',
      badge: 'BÁSICO',
      badgeColor: 'slate',
      title: 'Básico',
      tagline: '28 canais selecionados com TV aberta e variedades pelo menor custo de TV.',
      channelsCount: 28,
      channelsTitle: 'Grade de Canais Básico (28 Canais)',
      channelsImage: '/images/external/tv_basico.png',
      catalogImage: '/images/external/cat_completo.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
      ],
      contentHighlights: [
        '28 canais de TV ao vivo com grade aberta e variedades',
        'App Awdio incluso com conteúdos em áudio',
        '100% Fibra óptica com Wi-Fi incluso',
        'Transmissão leve no app NuvvPlay (Watch)',
      ],
      basePrice400M: 109.80,
      originalBasePrice: 139.90,
      defaultSpeed: '400',
      detailsSummary: 'Grade essencial de canais para quem quer TV ao vivo gastando muito pouco.',
    },
    {
      id: 'basico-telecine',
      category: 'cinema',
      badge: 'BÁSICO + TELECINE',
      badgeColor: 'amber',
      isPopular: true,
      title: 'Básico + Telecine',
      tagline: 'Grade básica de 28 canais + 6 canais Telecine ao vivo e filmes sob demanda.',
      channelsCount: 34,
      channelsTitle: 'Grade de Canais Básico + Telecine (34 Canais)',
      channelsImage: '/images/external/tv_hub_ultra_local_pro.png',
      catalogImage: '/images/external/cat_completo.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'Telecine', logo: '/images/external/telecine.png' },
      ],
      contentHighlights: [
        'Telecine incluso com 6 canais ao vivo + conteúdo streaming',
        '28 canais essenciais da TV aberta e variedades',
        'App Awdio incluso com podcasts e audiobooks',
        '34 canais de TV ao vivo no NuvvPlay (Watch)',
      ],
      basePrice400M: 119.80,
      originalBasePrice: 159.90,
      defaultSpeed: '400',
      detailsSummary: 'A forma mais acessível de ter os 6 canais e o streaming do Telecine.',
    },
  ],
  internet: [
    {
      id: 'so-fibra-400',
      category: 'essencial',
      badge: 'FIBRA 400 MEGA',
      badgeColor: 'emerald',
      title: 'Fibra 400 Mega',
      tagline: 'Internet 100% fibra óptica de alta estabilidade com Wi-Fi incluso e 18 canais de TV cortesia.',
      channelsCount: 18,
      channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
      channelsImage: '/images/external/tv_cortesia.png',
      catalogImage: '/images/external/cat_min.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
      ],
      contentHighlights: [
        '400 Mega de velocidade para navegar, estudar e home office',
        'Roteador Wi-Fi de alta performance incluso em comodato',
        '18 canais cortesia de TV aberta no NuvvPlay (Watch)',
        'Instalação 100% grátis e suporte local humanizado',
      ],
      basePrice400M: 99.90,
      originalBasePrice: 119.90,
      defaultSpeed: '400',
      detailsSummary: 'Plano ideal para navegar com alta estabilidade, redes sociais, streaming e trabalho em casa.',
    },
    {
      id: 'so-fibra-800',
      category: 'essencial',
      badge: 'FIBRA 800 MEGA',
      badgeColor: 'purple',
      isPopular: true,
      title: 'Fibra 800 Mega',
      tagline: 'O dobro de velocidade com máxima capacidade para múltiplos dispositivos, streaming 4K e games.',
      channelsCount: 18,
      channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
      channelsImage: '/images/external/tv_cortesia.png',
      catalogImage: '/images/external/cat_min.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
      ],
      contentHighlights: [
        '800 Mega (o dobro de velocidade) com máxima estabilidade',
        'Roteador Wi-Fi Plus de alta capacidade para muitos aparelhos',
        '18 canais cortesia de TV aberta no NuvvPlay (Watch)',
        'Instalação 100% grátis e suporte técnico prioritário',
      ],
      basePrice400M: 119.90,
      originalBasePrice: 139.90,
      defaultSpeed: '800',
      detailsSummary: 'Alta capacidade para famílias conectadas, downloads pesados, streaming em 4K e jogos competitivos.',
    },
  ],
};

export interface CatalogLevelInfo {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  summary: string;
  plansIncluded: string;
  bannerImage: string;
  headline: string;
  description: string;
  studios: { name: string; tag: string }[];
}

export const CATALOG_LEVELS: CatalogLevelInfo[] = [
  {
    id: 'completo',
    title: 'Catálogo Completo',
    badge: 'ACERVO MÁXIMO',
    badgeColor: 'bg-amber-400/20 text-amber-300 border border-amber-400/30',
    summary: 'Todas as grandes distribuidoras de Hollywood, séries consagradas e estreias do cinema.',
    plansIncluded: 'Incluso em: Básico, Essencial, Completo, Mais Cinema e Mais Esportes',
    bannerImage: '/images/external/cat_completo.png',
    headline: 'O Acervo On-Demand Mais Completo da Categoria',
    description:
      'Mais de 10.000 horas de entretenimento com produções dos maiores estúdios mundiais. Filmes que acabaram de sair do cinema, franquias consagradas e séries completas para maratonar a qualquer hora sem pagar mais por isso.',
    studios: [
      { name: 'Warner Bros.', tag: 'Filmes, Séries & DC' },
      { name: 'Universal Pictures', tag: 'Grandes Bilheterias' },
      { name: 'Sony Pictures', tag: 'Ação, Animações & Ficção' },
      { name: 'Lionsgate', tag: 'Dramas & Ação Premiada' },
      { name: 'BBC Studios', tag: 'Documentários em 4K' },
      { name: 'DreamWorks', tag: 'Animações Infantis' },
      { name: 'MGM', tag: 'Estreias Globais' },
    ],
  },
  {
    id: 'medio',
    title: 'Catálogo Médio',
    badge: 'SELEÇÃO ESPECIAL',
    badgeColor: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30',
    summary: 'Seleção especial com conteúdos on-demand, documentários e especiais de esportes.',
    plansIncluded: 'Incluso em: Mais Esportes (POWER ESPORTE CLUBE)',
    bannerImage: '/images/external/cat_medio.png',
    headline: 'Seleção sob Medida para Quem Ama Esportes & Ação',
    description:
      'Além de toda a emoção dos canais Premiere e Sportv ao vivo, tenha acesso sob demanda a programas esportivos, reprises históricas, documentários e filmes selecionados no app.',
    studios: [
      { name: 'Estúdios Parceiros', tag: 'Acervo Selecionado' },
      { name: 'Documentários Esportivos', tag: 'Histórias do Futebol' },
      { name: 'Especiais Premiere', tag: 'Gols & Melhores Momentos' },
      { name: 'Filmes de Ação', tag: 'Títulos Sob Demanda' },
    ],
  },
  {
    id: 'minimo',
    title: 'Catálogo Cortesia',
    badge: 'ESSENCIAL',
    badgeColor: 'bg-slate-400/20 text-slate-300 border border-slate-400/30',
    summary: 'Acervo cortesia Watch com títulos parceiros, canais abertos e conteúdos essenciais.',
    plansIncluded: 'Incluso em: Conexão Pura, Família Protegida e Casa Segura',
    bannerImage: '/images/external/cat_min.png',
    headline: 'Entretenimento Básico Grátis em Todos os Planos',
    description:
      'Mesmo optando por apenas fibra ou planos de serviços como segurança ou telemedicina, você recebe o app Watch/NuvvPlay com 18 canais abertos em HD e catálogo cortesia de introdução.',
    studios: [
      { name: 'Canais Abertos em HD', tag: '18 canais transmitidos' },
      { name: 'Watch Cortesia', tag: 'Produções parceiras' },
      { name: 'Conteúdo Educativo', tag: 'Infantil & Família' },
      { name: 'NuvvPlay Multiplataforma', tag: 'Smart TV e Celular' },
    ],
  },
];

const RESIDENTIAL_MODAL_CHANNELS: {
  id: ResidentialProfileId;
  label: string;
  badge: string;
  channelsCount: number;
  channelsTitle: string;
  channelsImage: string;
  tier: EntertainmentTier;
}[] = [
  {
    id: 'filmes-series',
    label: 'Mais Cinema',
    badge: 'CINEMA',
    channelsCount: 26,
    channelsTitle: 'Grade de Canais Mais Cinema (26 Canais)',
    channelsImage: '/images/external/cinema.png',
    tier: 'cortesia',
  },
  {
    id: 'completao',
    label: 'Completão',
    badge: 'COMPLETÃO',
    channelsCount: 100,
    channelsTitle: 'Grade de Canais Completão (100+ Canais)',
    channelsImage: '/images/external/completo_elite.png',
    tier: 'completo',
  },
  {
    id: 'esportes',
    label: 'Mais Esportes',
    badge: 'ESPORTES',
    channelsCount: 68,
    channelsTitle: 'Grade de Canais Mais Esportes (68 Canais)',
    channelsImage: '/images/external/tv_power_esporte_clube.png',
    tier: 'essencial',
  },
  {
    id: 'sem-pacote',
    label: 'Cortesia',
    badge: 'CORTESIA',
    channelsCount: 18,
    channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
    channelsImage: '/images/external/tv_cortesia.png',
    tier: 'cortesia',
  },
];

interface TestePlanosProps {
  currentCity: string;
  onOpenLeadModal: (planName: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const TestePlanos: React.FC<TestePlanosProps> = ({
  currentCity,
  onOpenLeadModal,
}) => {
  const navigate = useNavigate();

  // --- SEÇÃO 1: OFERTAS POR CONTEÚDO (PROTÓTIPO NOVO) ---
  // State: selected speeds mapped by package id (all defaulting to 400M)
  const [packageSpeeds, setPackageSpeeds] = useState<Record<string, SpeedOptionId>>(() => {
    const initial: Record<string, SpeedOptionId> = {};
    PACKAGE_OFFERS.forEach((pkg) => {
      initial[pkg.id] = '400';
    });
    return initial;
  });

  // Active category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Modals state
  const [activeChannelsModal, setActiveChannelsModal] = useState<PackageOffer | null>(null);
  const [activeDetailsModal, setActiveDetailsModal] = useState<PackageOffer | null>(null);
  const [activeMoreAppsModal, setActiveMoreAppsModal] = useState<{
    title: string;
    apps: { name: string; logo: string }[];
  } | null>(null);

  // Catalog interactive section state
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('completo');
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<{ title: string; image: string } | null>(null);

  // --- SEÇÃO 2: CÓPIA ISOLADA IDÊNTICA AO RESIDENCIAL ---
  const [resSelectedProfile, setResSelectedProfile] = useState<ResidentialProfileId>('filmes-series');
  const [resSelectedTier, setResSelectedTier] = useState<EntertainmentTier | null>(null);
  const [resActiveAddons, setResActiveAddons] = useState<Record<string, boolean>>({
    telecine: true,
    hboMax: true,
  });
  const [resVisionConfig, setResVisionConfig] = useState<VisionAddonConfig>({
    planId: null,
    cameraCount: 1,
    withComodato: false,
  });
  const [resDetailModalPlan, setResDetailModalPlan] = useState<ResidentialPlan | null>(null);
  const [resChannelsModalTier, setResChannelsModalTier] = useState<EntertainmentTier | null>(null);
  const [resChannelsModalProfile, setResChannelsModalProfile] = useState<ResidentialProfileId | null>(null);
  const [resActiveCardIndex, setResActiveCardIndex] = useState(1); // Default 800M

  const resEffectiveTier: EntertainmentTier = resSelectedTier || 'cortesia';

  const handleResSelectProfile = (profileId: ResidentialProfileId) => {
    setResSelectedProfile(profileId);
    const profile = RESIDENTIAL_PROFILES[profileId];
    if (profile) {
      if (profile.tierKey === 'cortesia') {
        setResSelectedTier(null);
      } else {
        setResSelectedTier(profile.tierKey);
      }
      const nextAddons: Record<string, boolean> = {};
      profile.includedAddonKeys.forEach((key) => {
        nextAddons[key] = true;
      });
      setResActiveAddons(nextAddons);
    }
  };

  const handleResSelectPlan = (plan: ResidentialPlan, totalPrice: number) => {
    const resolution = resolveTierAndAddons(resEffectiveTier, resActiveAddons);
    const activeAddonNames = Object.entries(resActiveAddons)
      .filter(([_, active]) => active)
      .map(([key]) => {
        const addon = PLAN_ADDONS[key];
        if (!addon) return key;
        const details = resolution.effectiveAddonPrices[key];
        if (details?.isIncluded) {
          return `${addon.name} (Incluso no Pacote)`;
        }
        if (details?.isPromo) {
          return `${addon.name} (OFERTA: R$ ${details.effectivePrice.toFixed(2).replace('.', ',')}/mês)`;
        }
        return addon.name;
      });

    if (resVisionConfig.planId || resVisionConfig.withComodato) {
      if (resVisionConfig.planId) {
        const p = PLAN_ADDONS[resVisionConfig.planId];
        activeAddonNames.push(`${p?.name || resVisionConfig.planId} (${resVisionConfig.cameraCount}x)`);
      }
      if (resVisionConfig.withComodato) {
        activeAddonNames.push(`${resVisionConfig.cameraCount}x Câmeras em Comodato`);
      }
    }

    const extrasPayload = resolution.internalCodes.length
      ? ` | Extras: ${resolution.internalCodes.join(', ')}`
      : '';

    const planSummary = `[Teste Cópia Residencial] ${plan.speed} ${plan.unit} (${TIER_CONFIG[resEffectiveTier].label}) [Ref: ${resolution.referencePlan}${extrasPayload}] - R$ ${totalPrice.toFixed(2).replace('.', ',')}/mês${
      activeAddonNames.length ? ` [+ Adicionais: ${activeAddonNames.join(', ')}]` : ''
    }`;

    onOpenLeadModal(planSummary);
  };

  // Dynamic list of apps & streamings for the residential modal copy
  const resModalAppsList = useMemo(() => {
    if (!resDetailModalPlan) return [];
    const tierPricing = resDetailModalPlan.tierPricing[resEffectiveTier];
    const items: Array<{
      id: string;
      name: string;
      description: string;
      logo?: string;
      category?: string;
    }> = [];
    const seenIds = new Set<string>();

    const appDescriptions: Record<string, string> = {
      watch: 'Filmes, séries e TV linear.',
      awdio: 'Audiobooks, podcasts e conteúdos em áudio.',
      'canais globo': 'Todos os Canais Abertos e Fechados.',
      globo: 'Todos os Canais Abertos e Fechados.',
      telecine: '+ 6 canais e filmes on-demand.',
      hbomax: 'Filmes, séries exclusivas e esportes ao vivo.',
      'hbo max': 'Filmes, séries exclusivas e esportes ao vivo.',
      paramount: 'Filmes e séries de sucesso.',
      'paramount+': 'Filmes e séries de sucesso.',
      premiere: 'Brasileirão A e B ao vivo com o melhor do futebol.',
      combate: 'O canal 100% dedicado aos esportes de combate.',
    };

    tierPricing.includedApps.forEach((app) => {
      const lowerName = app.name.toLowerCase();
      const desc =
        appDescriptions[lowerName] ||
        (lowerName.includes('globo') ? 'Todos os Canais Abertos e Fechados.' : 'Filmes, séries e conteúdos sob demanda.');
      seenIds.add(lowerName);
      items.push({
        id: app.name,
        name: app.name,
        description: desc,
        logo: app.logo,
      });
    });

    Object.entries(resActiveAddons)
      .filter(([_, active]) => active)
      .forEach(([key]) => {
        const addon = PLAN_ADDONS[key];
        if (!addon) return;
        const lowerName = addon.name.toLowerCase();
        if (seenIds.has(lowerName) || seenIds.has(addon.id.toLowerCase())) return;
        seenIds.add(lowerName);

        items.push({
          id: addon.id,
          name: addon.name,
          description: addon.description,
          logo: addon.logo,
          category: addon.category,
        });
      });

    if (resVisionConfig.planId || resVisionConfig.withComodato) {
      items.push({
        id: 'vision-addon',
        name: `Nuvv Guard (${resVisionConfig.cameraCount}x Câmeras)`,
        description: 'Gravação contínua na nuvem e monitoramento ao vivo no App Nuvv Guard.',
        category: 'vision',
      });
    }

    return items;
  }, [resDetailModalPlan, resEffectiveTier, resActiveAddons, resVisionConfig]);

  const resAddonTotal = useMemo(() => {
    const regularAddons = Object.entries(resActiveAddons)
      .filter(([_, active]) => active)
      .map(([k]) => {
        const isIncluded = TIER_CONFIG[resEffectiveTier]?.includedAddons?.includes(k);
        if (isIncluded) return 0;
        return PLAN_ADDONS[k]?.price || 0;
      })
      .reduce((acc, price) => acc + price, 0);
    const visionTotal = calculateVisionAddonPrice(resVisionConfig);
    return regularAddons + visionTotal;
  }, [resActiveAddons, resVisionConfig, resEffectiveTier]);

  const resModalPromoPrice = resDetailModalPlan
    ? Number((resDetailModalPlan.tierPricing[resEffectiveTier].promoPrice + resAddonTotal).toFixed(2))
    : 0;

  const resModalOriginalPrice = Number((resModalPromoPrice + 20.00).toFixed(2));

  // --- SEÇÃO 3: OPÇÃO A (CARD HÍBRIDO FOCADO EM VALOR & EXPERIÊNCIA) ---
  const [sec3Tab, setSec3Tab] = useState<Sec3TabId>('destaques');

  const [sec3Speeds, setSec3Speeds] = useState<Record<string, SpeedOptionId>>(() => {
    const initial: Record<string, SpeedOptionId> = {};
    PACKAGE_OFFERS.forEach((pkg) => {
      initial[pkg.id] = '400';
    });
    Object.values(SEC3_TAB_OFFERS).forEach((offers) => {
      offers.forEach((pkg) => {
        initial[pkg.id] = (pkg.defaultSpeed as SpeedOptionId) || '400';
      });
    });
    return initial;
  });

  const handleSec3SpeedToggle = (pkgId: string, speedId: SpeedOptionId) => {
    setSec3Speeds((prev) => ({
      ...prev,
      [pkgId]: speedId,
    }));
  };

  const activeCatalogInfo = CATALOG_LEVELS.find((c) => c.id === selectedCatalogCategory) || CATALOG_LEVELS[0];

  // Carousel ref and state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filters exactly as requested by user
  const categories = [
    { id: 'todos', label: 'Todos os Pacotes', icon: Sparkles },
    { id: 'cinema', label: 'Filmes & Séries', icon: Clapperboard },
    { id: 'esportes', label: 'Futebol & Esportes', icon: Trophy },
    { id: 'saude', label: 'Saúde & Telemedicina', icon: HeartPulse },
    { id: 'seguranca', label: 'Câmeras e Segurança', icon: ShieldCheck },
    { id: 'essencial', label: 'Só Fibra', icon: Wifi },
  ];

  const filteredOffers = selectedCategory === 'todos'
    ? PACKAGE_OFFERS
    : selectedCategory === 'cinema'
    ? PACKAGE_OFFERS.filter((pkg) => pkg.category === 'cinema' || pkg.category === 'completo')
    : selectedCategory === 'esportes'
    ? PACKAGE_OFFERS.filter((pkg) => pkg.category === 'esportes' || pkg.category === 'completo')
    : PACKAGE_OFFERS.filter((pkg) => pkg.category === selectedCategory);

  const handleSpeedChange = (pkgId: string, speedId: SpeedOptionId) => {
    setPackageSpeeds((prev) => ({
      ...prev,
      [pkgId]: speedId,
    }));
  };

  const calculatePrice = (pkg: PackageOffer, speedId: SpeedOptionId) => {
    const speedOpt = SPEED_OPTIONS.find((s) => s.id === speedId) || SPEED_OPTIONS[0];
    const promoPrice = pkg.basePrice400M + speedOpt.priceOffset;
    const originalPrice = pkg.originalBasePrice + speedOpt.priceOffset;
    return { promoPrice, originalPrice, speedOpt };
  };

  const handleSelectPackage = (pkg: PackageOffer) => {
    const activeSpeed = packageSpeeds[pkg.id] || '400';
    const { promoPrice, speedOpt } = calculatePrice(pkg, activeSpeed);
    const summary = `${pkg.title} (${speedOpt.label}) - R$ ${promoPrice
      .toFixed(2)
      .replace('.', ',')}/mês [Pacote de Conteúdo]`;
    onOpenLeadModal(summary);
  };

  const checkScrollLimits = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).clientWidth + 20
      : 320;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
    setTimeout(checkScrollLimits, 300);
  };

  // Badge theme styling
  const getThemeClasses = (theme: PackageOffer['badgeColor']) => {
    switch (theme) {
      case 'amber':
        return {
          badge: 'bg-amber-500/15 border-amber-500/30 text-amber-900',
          btn: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-amber-500/25',
          header: 'from-amber-500/10 via-orange-500/5 to-transparent',
        };
      case 'purple':
        return {
          badge: 'bg-nuvv-purple/15 border-nuvv-purple/30 text-nuvv-purple',
          btn: 'bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black shadow-nuvv-purple/25',
          header: 'from-purple-600/10 via-indigo-600/5 to-transparent',
        };
      case 'emerald':
        return {
          badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-emerald-600/25',
          header: 'from-emerald-500/10 via-teal-500/5 to-transparent',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-900',
          btn: 'bg-cyan-600 hover:bg-cyan-700 text-white font-black shadow-cyan-600/25',
          header: 'from-cyan-500/10 via-blue-500/5 to-transparent',
        };
      case 'blue':
        return {
          badge: 'bg-blue-500/15 border-blue-500/30 text-blue-900',
          btn: 'bg-blue-600 hover:bg-blue-700 text-white font-black shadow-blue-600/25',
          header: 'from-blue-500/10 via-indigo-500/5 to-transparent',
        };
      default:
        return {
          badge: 'bg-slate-200 border-slate-300 text-slate-800',
          btn: 'bg-slate-900 hover:bg-slate-800 text-white font-black shadow-slate-900/20',
          header: 'from-slate-200/50 via-gray-100/40 to-transparent',
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Sandbox Alert Bar */}
      <div className="bg-slate-950 text-white border-b border-indigo-500/30 py-2.5 px-4 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-black text-indigo-300 uppercase tracking-wider">
              Página de Testes (Protótipo de Ofertas)
            </span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">
              Foco em <strong>Pacotes & Conteúdo</strong> • Velocidade como ajuste interno
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/residencial')}
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center space-x-1.5 transition-all text-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para Página Residencial</span>
          </button>
        </div>
      </div>

      {/* Header Section */}
      <section className="pt-8 pb-4 px-4 max-w-5xl mx-auto text-center space-y-2.5">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-nuvv-purple text-[11px] font-black tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
          <span>COMBOS RESIDENCIAIS • {currentCity.toUpperCase()}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          O que você quer assistir hoje?{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">
            A internet acompanha seu gosto.
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Selecione o pacote perfeito de canais, streamings e serviços. O valor se recalcula automaticamente ao escolher a velocidade da fibra.
        </p>
      </section>

      {/* Categories Filter Tabs: Fits in one line on desktop, wraps neatly centered */}
      <section className="max-w-6xl mx-auto px-4 mb-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                  setTimeout(checkScrollLimits, 200);
                }}
                className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-nuvv-dark text-white shadow-sm ring-1 ring-nuvv-dark'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-nuvv-green' : 'text-nuvv-purple'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Carousel Section with Centered Left/Right Navigation Arrows */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 relative group pt-6">
        {/* Navigation Arrow Left (Vertically centered on cards) */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Pacote anterior"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
        )}

        {/* Navigation Arrow Right (Vertically centered on cards) */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl border border-slate-200/90 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Próximo pacote"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        )}

        {/* Carousel Viewport (Narrower cards: w-[305px] sm:w-[320px]) */}
        <div
          ref={scrollRef}
          onScroll={checkScrollLimits}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pt-4 pb-6 px-1 scroll-smooth scrollbar-none items-stretch"
        >
          {filteredOffers.map((pkg) => {
            const activeSpeedId = packageSpeeds[pkg.id] || '400';
            const { promoPrice, originalPrice, speedOpt } = calculatePrice(pkg, activeSpeedId);
            const discount = originalPrice - promoPrice;
            const theme = getThemeClasses(pkg.badgeColor);

            return (
              <div
                key={pkg.id}
                className="w-[325px] sm:w-[355px] lg:w-[370px] snap-center flex-shrink-0 flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Popular Tag (Positioned properly without clipping) */}
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md ring-2 ring-white">
                      <Sparkles className="w-3 h-3 fill-current" />
                      <span>Destaque Mais Escolhido</span>
                    </span>
                  </div>
                )}

                {/* 1. TOPO: Nome e Explicação resumida do pacote */}
                <div className={`p-5 sm:p-6 rounded-t-3xl bg-gradient-to-b ${theme.header} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[9px] font-black tracking-wider uppercase ${theme.badge}`}
                    >
                      {pkg.badge}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveDetailsModal(pkg)}
                      className="text-slate-400 hover:text-slate-800 transition-colors p-1"
                      title="Ver especificações da oferta"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* 2. VALORES (Logo na sequência do cabeçalho) */}
                <div className="px-5 py-3.5 bg-slate-50/90 border-y border-slate-200/70">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="line-through text-[11px]">
                      De R$ {originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                      Economize R$ {discount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-xs font-bold text-slate-500">Por R$</span>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {Math.floor(promoPrice)}
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      ,{(promoPrice % 1).toFixed(2).substring(2)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">/mês</span>
                  </div>

                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>100% Fibra ({speedOpt.label})</span>
                    <span className="font-bold text-emerald-700">Instalação Grátis</span>
                  </div>
                </div>

                {/* 3. APPS & STREAMINGS (Com ícones maiores conforme montagem e sem quebra nos canais) */}
                <div className="p-5 pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider">
                      APPS & STREAMINGS
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Incluso</span>
                    </span>
                  </div>

                  {/* Quantidade de canais ao vivo garantida sem quebra de linha */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveChannelsModal(pkg)}
                      className="text-[11px] font-bold text-nuvv-purple hover:underline cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Tv className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                      <span className="whitespace-nowrap">{pkg.channelsCount >= 99 ? '100+' : pkg.channelsCount} canais ao vivo (ver grade)</span>
                    </button>
                  </div>

                  {/* Ícones de apps maiores (w-12 h-12) conforme a montagem + Canais Globo no final */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {pkg.heroLogos.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:scale-105 transition-all p-1 flex items-center justify-center flex-shrink-0 overflow-hidden"
                        title={item.name}
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}

                    {/* Canais Globo pill no final */}
                    {pkg.hasCanaisGlobo && (
                      <div
                        className="h-12 px-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:scale-105 transition-all flex items-center justify-center flex-shrink-0"
                        title="Canais Globo"
                      >
                        <img
                          src="/images/external/canais_globo.svg"
                          alt="Canais Globo"
                          className="h-4 sm:h-5 w-auto object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 3.1 CATÁLOGO VOD (Distribuidoras & Estúdios Inclusos) */}
                <div className="px-5 pb-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                      <Film className="w-3 h-3 text-nuvv-purple" />
                      <span>Catálogo VOD Incluso</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">
                      Estúdios & Séries
                    </span>
                  </div>

                  {/* Banner das distribuidoras do catálogo VOD */}
                  <div className="rounded-xl bg-white border border-slate-200/90 p-2 flex items-center justify-start shadow-2xs overflow-hidden min-h-[44px]">
                    <img
                      src={pkg.catalogImage}
                      alt={`Catálogo VOD - ${pkg.title}`}
                      className="max-h-8 sm:max-h-9 w-auto max-w-full object-contain object-left"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* 4. SELETOR DE VELOCIDADE: Apenas 400 e 800 Mega com Wi-Fi Plus incluso */}
                <div className="px-5 py-3 bg-slate-50/70 border-y border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black text-slate-600 uppercase tracking-wider flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-nuvv-purple" />
                      <span>Velocidade da Fibra:</span>
                    </span>
                    <span className="font-bold text-emerald-700">
                      {speedOpt.wifiBadge}
                    </span>
                  </div>

                  {/* 2 Opções de Velocidade: 400 e 800 Mega */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/70 rounded-xl">
                    {SPEED_OPTIONS.map((opt) => {
                      const isSelected = activeSpeedId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSpeedChange(pkg.id, opt.id)}
                          className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-slate-900 font-black shadow-xs ring-1 ring-slate-900/10'
                              : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-white/40'
                          }`}
                        >
                          <span className="text-xs font-black leading-none">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. O QUE VEM NO PLANO (Diferenciais) */}
                <div className="p-5 pt-3 space-y-1.5 flex-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                    Diferenciais inclusos:
                  </span>
                  {pkg.contentHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-700 leading-tight">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* 6. BOTÃO DE CONTRATAÇÃO */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3.5 rounded-2xl flex items-center justify-center space-x-2 text-xs transition-all active:scale-98 shadow-md hover:shadow-lg cursor-pointer ${theme.btn}`}
                  >
                    <span>Assinar {pkg.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SESSÃO CATÁLOGO VOD & DISTRIBUIDORAS INCLUSAS                       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-nuvv-purple/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 max-w-3xl space-y-2.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nuvv-purple/25 border border-nuvv-purple/40 text-purple-300 text-[11px] font-black tracking-wider uppercase">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>CATÁLOGO VOD • GRANDES ESTÚDIOS & DISTRIBUIDORAS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Catálogo de Conteúdo On-Demand{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400">
                incluso no seu pacote.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Além dos canais de TV ao vivo, cada pacote inclui milhares de horas de filmes, séries premiadas e animações sem cobrança de taxa extra no aplicativo NuvvPlay / Watch. As distribuidoras variam de acordo com o nível de TV selecionado.
            </p>
          </div>

          {/* Interactive Catalog Level Selector */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Selecione o nível de TV para conferir o catálogo:</span>
              </span>

              {/* Botão para Abrir a Tabela Oficial ERP */}
              <button
                type="button"
                onClick={() => setIsTableModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white text-xs font-bold border border-white/15 transition-all cursor-pointer shadow-sm hover:scale-102"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Ver Relação Completa ERP (12 Planos)</span>
              </button>
            </div>

            {/* Abas dos Níveis do Catálogo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CATALOG_LEVELS.map((level) => {
                const isSelected = selectedCatalogCategory === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setSelectedCatalogCategory(level.id)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative ${
                      isSelected
                        ? 'bg-nuvv-purple/20 border-nuvv-purple shadow-lg ring-1 ring-nuvv-purple/50'
                        : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black tracking-wider uppercase text-white">
                        {level.title}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${level.badgeColor}`}>
                        {level.badge}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                      {level.summary}
                    </p>

                    <div className="mt-2 text-[10px] text-slate-400 font-medium">
                      {level.plansIncluded}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bloco Ativo do Catálogo Selecionado */}
            {activeCatalogInfo && (
              <div className="mt-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        {activeCatalogInfo.title} Selecionado
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {activeCatalogInfo.headline}
                    </h3>
                    <p className="text-xs sm:text-slate-300 text-slate-400 mt-1 max-w-2xl leading-relaxed">
                      {activeCatalogInfo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPreviewImage({
                          title: `Catálogo VOD - ${activeCatalogInfo.title}`,
                          image: activeCatalogInfo.bannerImage,
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer border border-white/10"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Ampliar Imagem</span>
                    </button>
                  </div>
                </div>

                {/* Banner Oficial das Distribuidoras (Fundo Branco para contraste perfeito dos logotipos) */}
                <div className="rounded-2xl bg-white p-4 sm:p-6 border border-slate-200/40 shadow-inner flex items-center justify-start overflow-hidden min-h-[90px] sm:min-h-[110px]">
                  <img
                    src={activeCatalogInfo.bannerImage}
                    alt={`Distribuidoras VOD - ${activeCatalogInfo.title}`}
                    className="max-h-16 sm:max-h-20 w-auto max-w-full object-contain object-left"
                  />
                </div>

                {/* Distribuidoras & Diferenciais em Destaque */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {activeCatalogInfo.studios.map((studio, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between space-y-1"
                    >
                      <span className="text-xs font-black text-white">{studio.name}</span>
                      <span className="text-[10px] text-slate-400">{studio.tag}</span>
                    </div>
                  ))}
                </div>

                {/* Features Extras do Catálogo */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Até 4 telas simultâneas pelo app</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Lançamentos sem cobrança extra</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Perfis infantis com controle parental</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal: Channels Lineup */}
      <Modal
        isOpen={!!activeChannelsModal}
        onClose={() => setActiveChannelsModal(null)}
        title={activeChannelsModal?.channelsTitle || 'Grade de Canais'}
        subtitle={`Confira os ${activeChannelsModal?.channelsCount} canais em alta definição inclusos`}
        maxWidth="3xl"
      >
        {activeChannelsModal && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-slate-950 p-3 flex items-center justify-center max-h-[52vh] overflow-hidden">
              <img
                src={activeChannelsModal.channelsImage}
                alt={activeChannelsModal.channelsTitle}
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = '/images/external/tv_cortesia.png';
                  if (target.src !== fallback && !target.src.endsWith(fallback)) {
                    target.src = fallback;
                  }
                }}
                className="max-h-[48vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>* Canais transmitidos em 1080p Full HD pelo app NuvvPlay.</span>
              <button
                type="button"
                onClick={() => setActiveChannelsModal(null)}
                className="px-4 py-2 rounded-xl bg-nuvv-purple text-white font-bold cursor-pointer text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Package Details */}
      <Modal
        isOpen={!!activeDetailsModal}
        onClose={() => setActiveDetailsModal(null)}
        maxWidth="2xl"
      >
        {activeDetailsModal && (() => {
          const speedId = sec3Speeds[activeDetailsModal.id] || packageSpeeds[activeDetailsModal.id] || (activeDetailsModal.defaultSpeed as SpeedOptionId) || '400';
          const { promoPrice, originalPrice, speedOpt } = calculatePrice(activeDetailsModal, speedId);

          return (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-nuvv-purple to-indigo-700 text-white p-5 rounded-2xl">
                <span className="text-xs font-black uppercase text-indigo-200">
                  Especificações do Pacote
                </span>
                <h3 className="text-2xl font-black mt-1">{activeDetailsModal.title}</h3>
                <p className="text-xs text-indigo-100 mt-1">{activeDetailsModal.detailsSummary}</p>
              </div>

              {/* Catálogo VOD no Modal */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-slate-900 uppercase">
                  Distribuidoras do Catálogo VOD Incluso:
                </span>
                <div className="rounded-xl bg-white border border-slate-200 p-2.5 flex items-center justify-start">
                  <img
                    src={activeDetailsModal.catalogImage}
                    alt="Catálogo VOD"
                    className="max-h-10 w-auto object-contain object-left"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase">Destaques Inclusos:</span>
                <div className="space-y-1.5">
                  {activeDetailsModal.contentHighlights.map((hl, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through block">
                    De R$ {originalPrice.toFixed(2).replace('.', ',')}/mês
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    R$ {promoPrice.toFixed(2).replace('.', ',')}/mês
                  </span>
                  <span className="text-xs text-emerald-700 font-bold block">
                    {speedOpt.label} • {speedOpt.wifiBadge}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDetailsModal(null);
                    handleSelectPackage(activeDetailsModal);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center space-x-2 shadow-md cursor-pointer"
                >
                  <span>Contratar este Pacote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Modal: Tabela Oficial de Planos de TV & Catálogo ERP */}
      <Modal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        title="Relação Oficial de Planos de TV & Catálogo ERP"
        subtitle="Mapeamento com os 12 planos de TV, canais, inclusões e imagens de grade e catálogo VOD"
        maxWidth="5xl"
      >
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div className="text-slate-600">
              Esta tabela define a equivalência entre os pacotes comerciais e os planos de referência no ERP / Watch.
            </div>

            <a
              href="/downloads/referencias_erp_nuvv.csv"
              download="referencias_erp_nuvv.csv"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar CSV Oficial</span>
            </a>
          </div>

          {/* Tabela Responsiva */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl max-h-[55vh]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] tracking-wider sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Nível / Categoria</th>
                  <th className="py-2.5 px-3">Plano ERP / Watch</th>
                  <th className="py-2.5 px-3 text-center">Canais</th>
                  <th className="py-2.5 px-3">Conteúdo / Inclusões</th>
                  <th className="py-2.5 px-3">Condição / Gatilho</th>
                  <th className="py-2.5 px-3 text-center">Grade TV</th>
                  <th className="py-2.5 px-3 text-center">Catálogo VOD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {TV_PLANS_REFERENCE_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {row.tierCategory}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-indigo-700 font-bold whitespace-nowrap">
                      {row.referencePlan}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-700">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                        {row.channelsCount}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px] min-w-[180px]">
                      {row.content}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px] min-w-[160px]">
                      {row.condition || (row.extraPrice > 0 ? `+ R$ ${row.extraPrice.toFixed(2).replace('.', ',')}/mês` : 'Incluso no plano')}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPreviewImage({
                            title: `Grade de Canais: ${row.referencePlan}`,
                            image: row.channelsImage,
                          })
                        }
                        className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-nuvv-purple font-bold text-[10px] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Ver Grade</span>
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      {row.catalogImage && (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPreviewImage({
                              title: `Catálogo VOD: ${row.tierCategory}`,
                              image: row.catalogImage!,
                            })
                          }
                          className="inline-flex items-center space-x-1.5 p-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                          title="Clique para ampliar o banner do catálogo"
                        >
                          <img
                            src={row.catalogImage}
                            alt="Catálogo"
                            className="h-5 w-auto max-w-[90px] object-contain"
                          />
                          <Maximize2 className="w-2.5 h-2.5 text-slate-400" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsTableModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer hover:bg-slate-800"
            >
              Fechar Tabela
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Ampliação de Imagem (Grade ou Catálogo) */}
      <Modal
        isOpen={!!selectedPreviewImage}
        onClose={() => setSelectedPreviewImage(null)}
        title={selectedPreviewImage?.title || 'Visualização'}
        maxWidth="3xl"
      >
        {selectedPreviewImage && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 flex items-center justify-center max-h-[55vh] overflow-hidden shadow-inner">
              <img
                src={selectedPreviewImage.image}
                alt={selectedPreviewImage.title}
                className="max-h-[50vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>{selectedPreviewImage.title}</span>
              <button
                type="button"
                onClick={() => setSelectedPreviewImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer text-xs hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* ========================================================================= */}
      {/* SEÇÃO 3: PROPOSTA OPÇÃO A (CARD HÍBRIDO "HERO DE VALOR & EXPERIÊNCIA")   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-purple-50/20 to-slate-50 border-t-4 border-nuvv-purple shadow-inner" id="secao-opcao-a">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Conceitual da Opção A */}
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>PROPOSTA OPÇÃO A • CARD HÍBRIDO FOCADO EM VALOR & CONTEÚDO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              O que você e sua família vão <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">curtir de verdade</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Marcas e streamings que você já ama em primeiro plano. A ultravelocidade da fibra entra como garantia de estabilidade, sem poluição de termos técnicos.
            </p>
          </div>

          {/* Seletor de Abas por Nível de TV & Ofertas */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto">
              {[
                { id: 'destaques', label: 'Super Ofertas', sublabel: 'Combos Prontos', icon: Sparkles },
                { id: 'completo', label: 'Completo', sublabel: 'Grade Máxima', icon: Crown },
                { id: 'essencial', label: 'Essencial', sublabel: 'Filmes & Séries', icon: Tv },
                { id: 'basico', label: 'Básico', sublabel: 'Super Econômico', icon: Layers },
                { id: 'internet', label: 'Só Fibra', sublabel: 'TV Cortesia', icon: Wifi },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = sec3Tab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSec3Tab(tab.id as Sec3TabId)}
                    className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-nuvv-dark text-white shadow-md ring-2 ring-nuvv-dark scale-102'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-2xs hover:scale-101'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-nuvv-purple text-white' : 'bg-slate-100 text-nuvv-purple'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block leading-tight">{tab.label}</span>
                      <span
                        className={`text-[10px] font-medium block ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {tab.sublabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subtítulo dinâmico explicativo da categoria selecionada */}
            <div className="text-center text-xs text-slate-500 font-medium max-w-xl mx-auto">
              {sec3Tab === 'destaques' && (
                <span>⭐ Combos prontos mais vantajosos com os melhores streamings e descontos inclusos.</span>
              )}
              {sec3Tab === 'completo' && (
                <span>👑 Grade máxima de canais ao vivo com Premiere, Combate e opção de Telecine.</span>
              )}
              {sec3Tab === 'essencial' && (
                <span>🎯 Canais populares da TV por assinatura com opções modulares de Telecine ou HBO Max.</span>
              )}
              {sec3Tab === 'basico' && (
                <span>💡 Grade essencial com canais abertos e variedades pelo menor custo mensal.</span>
              )}
              {sec3Tab === 'internet' && (
                <span>🚀 Ultravocidade pura 100% fibra óptica com Wi-Fi incluso e 18 canais cortesia.</span>
              )}
            </div>
          </div>

          {/* Grid de Cards Híbridos (Adaptação dinâmica de colunas conforme a quantidade de planos da aba) */}
          {(() => {
            const activeOffers = SEC3_TAB_OFFERS[sec3Tab] || SEC3_TAB_OFFERS.destaques;
            const gridLayoutClass =
              activeOffers.length === 1
                ? 'max-w-md mx-auto'
                : activeOffers.length === 2
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-stretch'
                : 'grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch';

            return (
              <div className={gridLayoutClass}>
                {activeOffers.map((pkg) => {
                  // Se for a aba 'internet' (Só Fibra), exibe cards tradicionais com foco total em velocidade e especificações de fibra
                  if (sec3Tab === 'internet') {
                    const is800 = pkg.defaultSpeed === '800';
                    const speedNumber = is800 ? '800' : '400';
                    const promoPrice = pkg.basePrice400M;
                    const originalPrice = pkg.originalBasePrice;
                    const discount = originalPrice - promoPrice;

                    return (
                      <div
                        key={`sec3-${pkg.id}`}
                        className={`rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 relative border ${
                          is800
                            ? 'border-nuvv-purple shadow-xl ring-2 ring-nuvv-purple/30 md:-translate-y-2'
                            : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-500/40'
                        }`}
                      >
                        {/* Badge de Destaque Superior para 800M */}
                        {is800 && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md ring-2 ring-white">
                              <Sparkles className="w-3.5 h-3.5 fill-current" />
                              <span>MAIS ESCOLHIDO • DOBRO DE VELOCIDADE</span>
                            </span>
                          </div>
                        )}

                        {/* BLOCO SUPERIOR: VELOCIDADE HERO EM DESTAQUE TRADICIONAL */}
                        <div className={`p-6 pb-5 rounded-t-3xl ${is800 ? 'bg-gradient-to-b from-purple-50/70 via-indigo-50/20 to-transparent' : 'bg-gradient-to-b from-emerald-50/60 via-slate-50/30 to-transparent'} text-center space-y-2`}>
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white border ${is800 ? 'border-purple-200 text-nuvv-purple' : 'border-emerald-200 text-emerald-700'} shadow-2xs`}>
                              {pkg.badge}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveDetailsModal(pkg)}
                              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                              title="Ver especificações e benefícios"
                            >
                              <Info className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Número Gigante de Velocidade (Estilo tradicional) */}
                          <div className="py-2">
                            <div className="flex items-baseline justify-center gap-2">
                              <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                                {speedNumber}
                              </span>
                              <span className={`text-2xl sm:text-3xl font-black ${is800 ? 'text-nuvv-purple' : 'text-emerald-600'}`}>
                                MEGA
                              </span>
                            </div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mt-1">
                              100% Fibra Óptica Dedicada
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 min-h-[36px] line-clamp-2 leading-relaxed">
                            {pkg.tagline}
                          </p>
                        </div>

                        {/* BLOCO INTERMEDIÁRIO: ESPECIFICAÇÕES DE HARDWARE & FIBRA */}
                        <div className="px-6 py-3.5 bg-slate-50/90 border-y border-slate-200/80 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-xl ${is800 ? 'bg-purple-100 text-nuvv-purple' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center flex-shrink-0`}>
                              <Wifi className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <span className="text-[10px] uppercase font-black text-slate-400 block leading-none">
                                Roteador Comodato
                              </span>
                              <span className="text-xs font-black text-slate-900 leading-tight">
                                {is800 ? 'Wi-Fi Plus Alta Capacidade' : 'Wi-Fi Incluso'}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="inline-flex items-center text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-md">
                              Instalação 100% grátis
                            </span>
                          </div>
                        </div>

                        {/* BLOCO DE VALORES & BENEFÍCIOS */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-1 text-center">
                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                              <span className="line-through">
                                De R$ {originalPrice.toFixed(2).replace('.', ',')}
                              </span>
                              <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                Economia de R$ {discount.toFixed(2).replace('.', ',')}/mês
                              </span>
                            </div>

                            <div className="flex items-baseline justify-center space-x-1">
                              <span className="text-xs font-bold text-slate-500">Por R$</span>
                              <span className="text-4xl font-black text-slate-900 tracking-tight">
                                {Math.floor(promoPrice)}
                              </span>
                              <span className="text-lg font-black text-slate-900">
                                ,{(promoPrice % 1).toFixed(2).substring(2)}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">/mês</span>
                            </div>

                            <p className="text-[11px] text-slate-400">
                              Preço fixo no Pix ou Boleto até o vencimento
                            </p>
                          </div>

                          {/* DIFERENCIAIS DA FIBRA */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            {pkg.contentHighlights.map((hl, i) => (
                              <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span className="font-medium leading-snug">{hl}</span>
                              </div>
                            ))}
                          </div>

                          {/* TV CORTESIA CALLOUT */}
                          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Tv className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                              <span className="text-xs font-bold text-slate-800">18 Canais Cortesia NuvvPlay (Watch)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveChannelsModal(pkg)}
                              className="text-[11px] font-black text-nuvv-purple hover:underline cursor-pointer"
                            >
                              Ver grade
                            </button>
                          </div>

                          {/* CTA */}
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                const summary = `[Opção A - Só Fibra] ${pkg.title} - R$ ${promoPrice.toFixed(2).replace('.', ',')}/mês`;
                                onOpenLeadModal(summary);
                              }}
                              className={`w-full py-4 rounded-2xl ${
                                is800
                                  ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover text-white shadow-nuvv-purple/25'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                              } font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer`}
                            >
                              <span>Quero {speedNumber} Mega</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="text-center mt-2.5">
                              <button
                                type="button"
                                onClick={() => setActiveDetailsModal(pkg)}
                                className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold underline cursor-pointer"
                              >
                                Ver detalhes técnicos e regulamento
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const activeSpeedId = sec3Speeds[pkg.id] || '400';
              const { promoPrice, originalPrice, speedOpt } = calculatePrice(pkg, activeSpeedId);
              const discount = originalPrice - promoPrice;
              const isPopular = pkg.isPopular;

              // Ordem canônica das marcas: Watch, Awdio, Sony One, Universal+, Premiere, Combate, Telecine, HBO Max
              const BRAND_ORDER = ['watch', 'awdio', 'sony', 'universal', 'premiere', 'combate', 'telecine', 'hbo', 'max'];
              const getBrandRank = (name: string) => {
                const n = name.toLowerCase();
                for (let i = 0; i < BRAND_ORDER.length; i++) {
                  if (n.includes(BRAND_ORDER[i])) return i;
                }
                return 99;
              };

              // Monta a lista completa de apps do pacote
              const isCortesia = pkg.category === 'essencial' || pkg.channelsCount <= 18;
              const isAboveCortesia = pkg.channelsCount > 18;
              const allAppsList: { name: string; logo: string }[] = [];

              // 1. Watch sempre presente
              allAppsList.push({ name: 'Watch', logo: '/images/external/watch-.png' });

              // 2. Awdio sempre logo após a Watch (exceto cortesia)
              if (!isCortesia) {
                allAppsList.push({ name: 'Awdio', logo: '/images/external/awdio.png' });
              }

              // 3. Sony One e Universal+ nos planos acima da cortesia
              if (isAboveCortesia) {
                allAppsList.push({ name: 'Sony One', logo: '/images/external/sony_one.png' });
                allAppsList.push({ name: 'Universal+', logo: '/images/external/universal_plus.png' });
              }

              // 4. Demais apps do pacote (Premiere, Combate, Telecine, HBO Max, TurboMed, Kaspersky, etc.)
              pkg.heroLogos
                .filter(
                  (item) =>
                    item.name.toLowerCase() !== 'watch' &&
                    !item.name.toLowerCase().includes('globo') &&
                    !item.name.toLowerCase().includes('sony') &&
                    !item.name.toLowerCase().includes('universal')
                )
                .forEach((item) => allAppsList.push(item));

              // Ordena conforme hierarquia de inclusão
              allAppsList.sort((a, b) => getBrandRank(a.name) - getBrandRank(b.name));

              // Limite adaptativo de slots visíveis:
              // Em abas com 2 cards (como 'completo'), os cards são mais largos e comportam 8 slots perfeitamente sem quebra.
              // Em abas com 3 cards (como 'destaques'), o limite é 6 slots.
              const isWideCardLayout = activeOffers.length <= 2;
              const maxVisibleSlots = isWideCardLayout ? 8 : 6;
              let visibleApps = allAppsList;
              let hiddenApps: { name: string; logo: string }[] = [];
              let overflowCount = 0;

              if (allAppsList.length > maxVisibleSlots) {
                const tailSlots = maxVisibleSlots - 2; // Mantém Watch no início, diferenciais à direita e +N no final
                overflowCount = allAppsList.length - (1 + tailSlots);
                hiddenApps = allAppsList.slice(1, 1 + overflowCount);
                const tailApps = allAppsList.slice(1 + overflowCount);
                visibleApps = [allAppsList[0], ...tailApps];
              }

              return (
                <div
                  key={`sec3-${pkg.id}`}
                  className={`rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 relative border ${
                    isPopular
                      ? 'border-nuvv-purple shadow-xl ring-2 ring-nuvv-purple/30 md:-translate-y-2'
                      : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-nuvv-purple/40'
                  }`}
                >
                  {/* Badge de Destaque Superior */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md ring-2 ring-white">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        <span>MAIS ESCOLHIDO PARA FAMÍLIA</span>
                      </span>
                    </div>
                  )}

                  {/* BLOCO 1: MARCAS E DESEJO EM PRIMEIRO LUGAR (Topo do Card) */}
                  <div className="p-6 pb-4 rounded-t-3xl bg-gradient-to-b from-indigo-50/60 via-purple-50/20 to-transparent space-y-3.5">
                    {/* Linha de Tag do Pacote */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white border border-slate-200 text-nuvv-purple shadow-2xs">
                        {pkg.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveDetailsModal(pkg)}
                        className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                        title="Ver especificações e benefícios"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Vitrine de Logotipos Oficiais (Watch fixo primeiro, diferenciais à direita e +N no final) */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-h-[44px]">
                        {visibleApps.map((item, idx) => (
                          <div
                            key={idx}
                            className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-2xl overflow-hidden shadow-xs hover:scale-105 transition-all flex items-center justify-center flex-shrink-0 bg-slate-900/5"
                            title={item.name}
                          >
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-2xl"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        ))}

                        {/* Badge +N posicionado no FINAL da fileira: abre mini-modal com apenas os ícones que faltam */}
                        {overflowCount > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMoreAppsModal({
                                title: pkg.title,
                                apps: hiddenApps,
                              })
                            }
                            title={`Ver mais conteúdos inclusos (+${overflowCount})`}
                            className="w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shadow-xs hover:bg-nuvv-purple hover:scale-105 transition-all cursor-pointer flex-shrink-0"
                          >
                            +{overflowCount}
                          </button>
                        )}
                      </div>

                      {/* Botão de Canais ao Vivo sem quebra */}
                      <button
                        type="button"
                        onClick={() => setActiveChannelsModal(pkg)}
                        className="text-[11px] font-bold text-nuvv-purple hover:underline flex items-center gap-1.5 cursor-pointer pt-0.5"
                      >
                        <Tv className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                        <span className="whitespace-nowrap">{pkg.channelsCount >= 99 ? '100+' : pkg.channelsCount} canais ao vivo (ver grade)</span>
                      </button>
                    </div>

                    {/* Título do Combo e Chamada de Experiência (Altura mínima padronizada para alinhamento horizontal perfeito de todos os blocos) */}
                    <div className="pt-0.5 space-y-1 min-h-[76px] flex flex-col justify-start">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>
                  </div>

                  {/* BLOCO 2: BASE FIBRA ÓPTICA (Fibra maior de um lado, Wi-Fi e Instalação Grátis em duas linhas do outro) */}
                  <div className="px-6 py-3.5 bg-slate-50/90 border-y border-slate-200/80">
                    <div className="flex items-center justify-between gap-2">
                      {/* Lado Esquerdo: Fibra Óptica em destaque maior */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center flex-shrink-0">
                          <Wifi className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-black text-slate-400 block leading-none">
                            100% Fibra
                          </span>
                          <span className="text-sm font-black text-slate-900 leading-tight">
                            {speedOpt.label}
                          </span>
                        </div>
                      </div>

                      {/* Lado Direito: Wi-Fi incluso e Instalação grátis em duas linhas */}
                      <div className="text-right space-y-0.5">
                        <span className="inline-flex items-center text-[11px] font-bold text-slate-700 block">
                          Wi-Fi incluso
                        </span>
                        <span className="inline-flex items-center text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          Instalação grátis
                        </span>
                      </div>
                    </div>

                    {/* Micro-seletor elegante de velocidade com animação sutil no +R$ 20 */}
                    <div className="mt-2.5 flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleSec3SpeedToggle(pkg.id, '400')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          activeSpeedId === '400'
                            ? 'bg-nuvv-purple text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        400 Mega
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSec3SpeedToggle(pkg.id, '800')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          activeSpeedId === '800'
                            ? 'bg-nuvv-purple text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span>800 Mega</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black flex items-center gap-0.5 transition-all ${
                          activeSpeedId === '800'
                            ? 'bg-white/25 text-white'
                            : 'bg-emerald-100 text-emerald-700 animate-pulse'
                        }`}>
                          <Sparkles className="w-2.5 h-2.5 inline animate-spin" style={{ animationDuration: '3s' }} />
                          <span>+R$ 30</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* BLOCO 3: PRECIFICAÇÃO CLARA & ECONOMIA (Sem duplicação de instalação grátis) */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="line-through text-xs">
                          De R$ {originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          Economia de R$ {discount.toFixed(2).replace('.', ',')}/mês
                        </span>
                      </div>

                      <div className="flex items-baseline space-x-1">
                        <span className="text-xs font-bold text-slate-500">Por R$</span>
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                          {Math.floor(promoPrice)}
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          ,{(promoPrice % 1).toFixed(2).substring(2)}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">/mês</span>
                      </div>

                      <p className="text-[11px] text-slate-400">
                        Preço fixo no Pix ou Boleto até o vencimento
                      </p>
                    </div>

                    {/* BLOCO 4: DIFERENCIAIS DA EXPERIÊNCIA (Sem jargões técnicos) */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 min-h-[96px]">
                      {pkg.contentHighlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium leading-snug">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* BLOCO 5: CTA DECISIVO */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const summary = `[Opção A - Valor] ${pkg.title} (${speedOpt.label}) - R$ ${promoPrice.toFixed(2).replace('.', ',')}/mês`;
                          onOpenLeadModal(summary);
                        }}
                        className="w-full py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-md hover:shadow-lg shadow-nuvv-purple/25 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                      >
                        <span>Quero esse Combo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="text-center mt-2.5">
                        <button
                          type="button"
                          onClick={() => setActiveDetailsModal(pkg)}
                          className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold underline cursor-pointer"
                        >
                          Ver detalhes técnicos e regulamento
                        </button>
                      </div>

                      {/* Aviso legal sobre marcas Sony One e Universal+ */}
                      {isAboveCortesia && (
                        <p className="text-[9px] text-slate-400 text-center leading-tight pt-2.5 border-t border-slate-100 mt-2.5">
                          Sony One™ e Universal+™ são marcas registradas de seus respectivos titulares. Conteúdos disponibilizados via aplicativo Watch Brasil, sujeitos aos termos e disponibilidade do plano contratado.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
              </div>
            );
          })()}

          {/* GAP DE ADICIONAIS E SERVIÇOS EXTRAS (Fluido, Leve e Elegante) */}
          <div className="max-w-6xl mx-auto pt-4">
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center lg:text-left">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-nuvv-purple text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-nuvv-purple" />
                  <span>Personalize seu Combo • Adicionais a partir de R$ 9,90</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  Quer adicionar mais serviços para sua casa e família?
                </h4>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                  Adicione soluções sob medida ao seu plano — com opção de adesão em taxa única sem mensalidade para Tag e Interfone:
                </p>
              </div>

              {/* Badges dos Serviços Extras em Pílulas Interativas */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 text-xs font-bold text-slate-700">
                {/* 1. Telemedicina 24h */}
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-xs transition-all shadow-2xs cursor-default"
                  title="Consultas online 24h por vídeo com receitas e atestados (com opção presencial no plano premium)"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  <span>Telemedicina 24h <span className="text-slate-400 font-medium">(+R$ 9,90)</span></span>
                </span>

                {/* 2. Câmeras Nuvem */}
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-cyan-300 hover:shadow-xs transition-all shadow-2xs cursor-default"
                  title="Câmera Wi-Fi Full HD em comodato com gravação contínua na nuvem por 7 dias"
                >
                  <Video className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Câmeras Nuvem <span className="text-slate-400 font-medium">(+R$ 39,90)</span></span>
                </span>

                {/* 3. Tag de Rastreamento (com opção Taxa Única sem mensalidade) */}
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-xs transition-all shadow-2xs cursor-default"
                  title="Acompanhe crianças, pets e mochilas pelo app. Disponível por mensalidade ou taxa única sem mensalidade"
                >
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tag de Rastreamento</span>
                  <span className="text-slate-400 font-medium">(+R$ 9,90</span>
                  <span className="text-amber-800 bg-amber-100/90 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md leading-none">ou Taxa Única</span>
                  <span className="text-slate-400 font-medium">)</span>
                </span>

                {/* 4. Interfone Virtual (com opção Taxa Única sem mensalidade) */}
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-xs transition-all shadow-2xs cursor-default"
                  title="Atenda visitantes por vídeo no celular e abra portão via QR Code. Disponível por mensalidade ou taxa única sem mensalidade"
                >
                  <Bell className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Interfone Virtual</span>
                  <span className="text-slate-400 font-medium">(+R$ 9,90</span>
                  <span className="text-indigo-800 bg-indigo-100/90 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md leading-none">ou Taxa Única</span>
                  <span className="text-slate-400 font-medium">)</span>
                </span>

                {/* 5. Segurança Digital */}
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-xs transition-all shadow-2xs cursor-default"
                  title="Proteção antivírus e contra golpes online para até 5 celulares e computadores"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Segurança Digital <span className="text-slate-400 font-medium">(+R$ 9,90)</span></span>
                </span>

                {/* 6. Telefonia Fixa */}
                <span
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-xs transition-all shadow-2xs cursor-default"
                  title="Linha telefônica digital com ligações ilimitadas para fixos de todo o Brasil"
                >
                  <Phone className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>Telefonia Fixa <span className="text-slate-400 font-medium">(+R$ 19,90)</span></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 2: CÓPIA ISOLADA IDÊNTICA AO SELETOR RESIDENCIAL OFICIAL             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-100/90 border-t-4 border-dashed border-indigo-200" id="secao-residencial-copia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Indicativo da Seção de Testes */}
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/10 border border-nuvv-purple/30 text-nuvv-purple text-xs font-black tracking-wider uppercase shadow-xs">
              <Layers className="w-4 h-4 text-nuvv-purple" />
              <span>SEÇÃO 2 • CÓPIA ISOLADA DO SELETOR RESIDENCIAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Seletor Residencial Oficial (Ambiente Isolado de Testes)
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Esta é uma réplica funcional e independente do seletor utilizado na página Residencial oficial. Qualquer interação, seleção de perfil ou abertura de modal aqui não interfere na seção superior nem na página de produção.
            </p>
          </div>

          {/* Quick Profile Selector Idêntico */}
          <QuickProfileSelector
            selectedProfile={resSelectedProfile}
            onSelectProfile={handleResSelectProfile}
          />

          {/* Cards de Planos Idênticos (3 colunas no desktop, carrossel no mobile) */}
          <div className="relative">
            <div
              className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 pt-2 px-2 md:px-0 max-w-6xl mx-auto items-stretch scrollbar-none"
              onScroll={(e) => {
                const scrollLeft = (e.target as HTMLElement).scrollLeft;
                const width = (e.target as HTMLElement).clientWidth;
                const index = Math.round(scrollLeft / (width * 0.85));
                if (index >= 0 && index < RESIDENTIAL_PLANS.length) {
                  setResActiveCardIndex(index);
                }
              }}
            >
              {RESIDENTIAL_PLANS.map((plan) => (
                <div
                  key={`res-copy-${plan.id}`}
                  className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink h-full flex flex-col"
                >
                  <PlanCard
                    plan={plan}
                    selectedTier={resSelectedTier}
                    activeAddons={resActiveAddons}
                    visionConfig={resVisionConfig}
                    activeProfile={resSelectedProfile}
                    onSelectPlan={handleResSelectPlan}
                    onOpenDetails={setResDetailModalPlan}
                    onOpenChannelsModal={(tier) => {
                      setResChannelsModalProfile(resSelectedProfile);
                      setResChannelsModalTier(tier);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicator Dots */}
            <div className="flex md:hidden items-center justify-center space-x-2 mt-2">
              {RESIDENTIAL_PLANS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    resActiveCardIndex === idx ? 'w-6 bg-nuvv-purple' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal: Detalhes do Plano da Cópia Residencial */}
      <Modal
        isOpen={!!resDetailModalPlan}
        onClose={() => setResDetailModalPlan(null)}
        maxWidth="4xl"
        headerBanner={
          resDetailModalPlan ? (
            <div className="bg-gradient-to-r from-nuvv-purple via-indigo-600 to-nuvv-purple text-white px-6 sm:px-8 py-5 sm:py-6 rounded-t-3xl rounded-b-none">
              <div className="pr-14 sm:pr-16">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200">
                    Combo Residencial
                  </span>
                  <span className="text-xs text-indigo-300">•</span>
                  <span className="text-xs font-bold text-emerald-300">
                    {resDetailModalPlan.speed} {resDetailModalPlan.unit} 100% Fibra
                  </span>
                  <span className="text-xs text-indigo-300">•</span>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[11px] font-bold text-white">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>{resDetailModalPlan.wifiBadge}</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Combo {resDetailModalPlan.speed} {resDetailModalPlan.unit} {TIER_CONFIG[resEffectiveTier].label}
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100 font-semibold mt-0.5">
                  {resDetailModalPlan.speed} {resDetailModalPlan.unit} 100% Fibra Óptica • Especificações e Benefícios
                </p>
              </div>
            </div>
          ) : undefined
        }
      >
        {resDetailModalPlan && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Apps & Streamings + Conteúdos Digitais */}
            <div className="md:col-span-7 space-y-5">
              {/* Apps & Streamings */}
              <div>
                <div className="flex items-center space-x-2 text-nuvv-purple font-extrabold text-xs uppercase tracking-wider mb-3">
                  <Tv className="w-4 h-4" />
                  <span>Apps & Streamings Inclusos</span>
                </div>

                <div className="space-y-2.5">
                  {resModalAppsList.map((app) => (
                    <div
                      key={app.id}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/90 flex items-center space-x-3.5 shadow-2xs hover:border-nuvv-purple/40 transition-all"
                    >
                      {app.logo ? (
                        <div className="w-11 h-11 rounded-xl overflow-hidden shadow-xs flex items-center justify-center flex-shrink-0 bg-gray-50">
                          <img
                            src={app.logo}
                            alt={app.name}
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs bg-indigo-50 border border-indigo-200 text-nuvv-purple">
                          {app.category === 'vision' ? (
                            <Video className="w-5 h-5 text-cyan-600" />
                          ) : app.category === 'protecao' ? (
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                          ) : app.category === 'saude' ? (
                            <HeartPulse className="w-5 h-5 text-rose-600" />
                          ) : app.category === 'telefonia' ? (
                            <Phone className="w-5 h-5 text-nuvv-purple" />
                          ) : (
                            <Sparkles className="w-5 h-5 text-nuvv-purple" />
                          )}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-extrabold text-nuvv-dark truncate">
                          {app.name}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 leading-snug">
                          {app.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conteúdos Digitais */}
              <div>
                <div className="flex items-center space-x-2 text-nuvv-purple font-extrabold text-xs uppercase tracking-wider mb-3">
                  <Cloud className="w-4 h-4" />
                  <span>Conteúdos Digitais</span>
                </div>

                <div className="space-y-2.5">
                  {resDetailModalPlan.benefits.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/90 flex items-center space-x-3.5 shadow-2xs hover:border-nuvv-purple/40 transition-all"
                    >
                      <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shadow-xs flex-shrink-0">
                        <img
                          src={b.logo}
                          alt={b.name}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-extrabold text-nuvv-dark truncate">
                          {b.name}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 leading-snug">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Recursos Técnicos, Condições de Pagamento, Taxa, Equipamento & CTA */}
            <div className="md:col-span-5 space-y-4">
              {/* Recursos Técnicos */}
              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                  Recursos Técnicos
                </h4>
                <ul className="space-y-1.5 text-xs font-semibold text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple flex-shrink-0" />
                    <span>{resDetailModalPlan.wifiBadge}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple flex-shrink-0" />
                    <span>{Math.round(resDetailModalPlan.speedNumber * 0.5)} Mega Upload</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nuvv-purple flex-shrink-0" />
                    <span>IP Dinâmico</span>
                  </li>
                  {resDetailModalPlan.priorityTraffic && (
                    <li className="flex items-center space-x-2 text-amber-800 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span>Prioridade de Tráfego & SLA 24h</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* CONDIÇÕES DE PAGAMENTO */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 shadow-2xs space-y-3">
                <div className="flex items-center space-x-2 text-[11px] font-black text-nuvv-purple uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>CONDIÇÕES DE PAGAMENTO</span>
                </div>

                {/* Preço 1: Até o vencimento */}
                <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-xs flex items-center justify-between gap-2.5">
                  <div className="min-w-0">
                    <span className="text-xs font-extrabold text-nuvv-purple block leading-tight">
                      Pix / Boleto (até vencimento)
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Com desconto de pontualidade</span>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-nuvv-purple whitespace-nowrap flex-shrink-0 text-right">
                    R$ {resModalPromoPrice.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                {/* Preço 2: Após vencimento */}
                <div className="pt-2 border-t border-purple-200/60 space-y-1">
                  <div className="flex items-center justify-between px-1 text-xs gap-2">
                    <span className="text-gray-600 font-medium">Valor Original do Plano (após vencimento)</span>
                    <span className="text-gray-700 font-extrabold whitespace-nowrap flex-shrink-0">
                      R$ {resModalOriginalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 px-1 leading-snug">
                    * Perda do desconto de pontualidade de R$ 20,00 da banda larga + incidência de multa e juros por atraso.
                  </p>
                </div>
              </div>

              {/* TAXA DE HABILITAÇÃO */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                  TAXA DE HABILITAÇÃO
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A oferta possui taxa de habilitação isenta mediante permanência de 12 meses. Caso a oferta seja cancelada antes desse período, será cobrado o valor de R$ 480,00 de forma proporcional aos meses restantes.
                </p>
              </div>

              {/* EQUIPAMENTO */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                  EQUIPAMENTO
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Assinante recebe modem em comodato, sem custos, mediante assinatura do respectivo contrato de comodato.
                </p>
              </div>

              {/* BOTÃO ASSINAR AGORA */}
              <button
                type="button"
                onClick={() => {
                  const plan = resDetailModalPlan;
                  setResDetailModalPlan(null);
                  handleResSelectPlan(plan, resModalPromoPrice);
                }}
                className="w-full py-3.5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
              >
                <span>Assinar Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Grade de Canais da Cópia Residencial */}
      {(() => {
        const activeItem = resChannelsModalProfile
          ? RESIDENTIAL_MODAL_CHANNELS.find((item) => item.id === resChannelsModalProfile)
          : RESIDENTIAL_MODAL_CHANNELS.find((item) => item.id === resSelectedProfile) || RESIDENTIAL_MODAL_CHANNELS[0];

        const isModalOpen = !!resChannelsModalTier || !!resChannelsModalProfile;

        return (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setResChannelsModalTier(null);
              setResChannelsModalProfile(null);
            }}
            title={activeItem ? activeItem.channelsTitle : ''}
            subtitle="Confira todos os canais transmitidos em alta definição inclusos no pacote"
            maxWidth="3xl"
          >
            {activeItem && (
              <div className="space-y-4">
                {/* Quick Switcher within Modal */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-3">
                  {RESIDENTIAL_MODAL_CHANNELS.map((item) => {
                    const isSelected = activeItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setResChannelsModalProfile(item.id);
                          setResChannelsModalTier(item.tier);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-nuvv-purple text-white shadow-xs'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {item.label} ({item.channelsCount} Canais)
                      </button>
                    );
                  })}
                </div>

                {/* Channels Lineup Image strictly fitted to viewport */}
                <div className="rounded-2xl border border-gray-200 bg-slate-950 p-2 sm:p-3 flex items-center justify-center max-h-[50vh] sm:max-h-[55vh] overflow-hidden">
                  <img
                    src={activeItem.channelsImage}
                    alt={activeItem.channelsTitle}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = '/images/external/tv_cortesia.png';
                      if (target.src !== fallback && !target.src.endsWith(fallback)) {
                        target.src = fallback;
                      }
                    }}
                    className="max-h-[46vh] sm:max-h-[52vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                  <span>* Canais transmitidos em HD pelo app NuvvPlay.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setResChannelsModalTier(null);
                      setResChannelsModalProfile(null);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </Modal>
        );
      })()}

      {/* Mini-Modal: Conteúdos Inclusos Extras (+N) */}
      <Modal
        isOpen={!!activeMoreAppsModal}
        onClose={() => setActiveMoreAppsModal(null)}
        title={activeMoreAppsModal ? `Também Inclusos no ${activeMoreAppsModal.title}` : ''}
        subtitle="Demais plataformas e aplicativos de entretenimento inclusos no seu combo"
        maxWidth="sm"
      >
        {activeMoreAppsModal && (
          <div className="space-y-4 py-1">
            <div className="flex items-center justify-center gap-3 flex-wrap p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              {activeMoreAppsModal.apps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white transition-all text-center"
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-slate-200/70 bg-white flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setActiveMoreAppsModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white font-bold text-xs transition-all cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
