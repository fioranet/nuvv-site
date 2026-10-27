import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/common/Modal';
import {
  SPEED_OPTIONS,
  SpeedOptionId,
} from '../data/residentialOffers';
import {
  Sparkles,
  ArrowRight,
  Tv,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  HeartPulse,
  ShieldCheck,
  Wifi,
  Zap,
  Info,
  ArrowLeft,
  Film,
  Layers,
  Phone,
  Video,
  Bell,
  Tag,
  SlidersHorizontal,
  Stethoscope,
  Pill,
  Lock,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export type NewTestTabId = 'principais' | 'saude' | 'fibra';

export interface TestPackageOffer {
  id: string;
  category: 'cinema' | 'completo' | 'esportes' | 'saude' | 'fibra';
  badge: string;
  badgeColor: 'amber' | 'purple' | 'emerald' | 'cyan' | 'slate' | 'rose';
  isPopular?: boolean;
  popularLabel?: string;
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
  solutionHighlight?: {
    icon: string;
    label: string;
  };
}

export const NEW_TEST_OFFERS: Record<NewTestTabId, TestPackageOffer[]> = {
  // ABA 1: COMBOS PRINCIPAIS (TV & STREAMING)
  principais: [
    {
      id: 'combo-mais-cinema',
      category: 'cinema',
      badge: 'MAIS CINEMA & SÉRIES',
      badgeColor: 'amber',
      title: 'Mais Cinema',
      tagline: 'Telecine (6 canais ao vivo + streaming sob demanda) e HBO Max (sem anúncios), filmes, séries e Champions League.',
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
        'Telecine incluso com 6 canais ao vivo + catálogo sob demanda',
        'HBO Max incluso 100% sem anúncios (filmes, séries e Champions)',
        'Sony One e Universal+ inclusos no NuvvPlay (Watch)',
        '26 canais de TV ao vivo em Full HD',
      ],
      basePrice400M: 129.80,
      originalBasePrice: 179.90,
      defaultSpeed: '400',
      detailsSummary: 'Combo ideal para quem busca os melhores filmes do cinema mundial, séries consagradas e TV por assinatura com economia.',
    },
    {
      id: 'combo-completao-familia',
      category: 'completo',
      badge: 'TUDO INCLUSO • FAMÍLIA',
      badgeColor: 'purple',
      isPopular: true,
      popularLabel: 'MAIS ESCOLHIDO PARA FAMÍLIA',
      title: 'Completão Família',
      tagline: 'A experiência máxima: 100+ canais de TV ao vivo com Premiere, Combate, HBO Max e Telecine inclusos na mesma assinatura.',
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
        'Premiere incluso com todos os jogos do Brasileirão e Copa do Brasil',
        'Combate com lutas internacionais e eventos de artes marciais',
        'Telecine (6 canais) + HBO Max (sem propagandas) inclusos',
        '100+ canais de TV ao vivo com infantis, notícias e variedades',
      ],
      basePrice400M: 189.80,
      originalBasePrice: 249.90,
      defaultSpeed: '400',
      detailsSummary: 'O combo supremo de entretenimento com futebol, lutas, cinema premium e dezenas de canais de TV para agradar a casa toda.',
    },
    {
      id: 'combo-mais-esportes',
      category: 'esportes',
      badge: 'MAIS ESPORTES & FUTEBOL',
      badgeColor: 'emerald',
      title: 'Mais Esportes',
      tagline: 'O melhor do futebol e lutas com Premiere e Combate ao vivo, canais esportivos, jornalismo e variedades.',
      channelsCount: 68,
      channelsTitle: 'Grade de Canais Mais Esportes (68 Canais)',
      channelsImage: '/images/external/tv_power_esporte_clube.png',
      catalogImage: '/images/external/cat_medio.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'Premiere', logo: '/images/external/premiere.png' },
        { name: 'Combate', logo: '/images/external/combate.png' },
      ],
      contentHighlights: [
        'Premiere com transmissões exclusivas do Brasileirão e Copa do Brasil',
        'Combate ao vivo para fãs de boxe, MMA e artes marciais',
        'Sportv, ESPN, Band Sports e N Sports em alta definição',
        '68 canais de TV ao vivo transmitidos no NuvvPlay (Watch)',
      ],
      basePrice400M: 139.80,
      originalBasePrice: 189.90,
      defaultSpeed: '400',
      detailsSummary: 'Focado em quem não abre mão de acompanhar cada rodada do futebol brasileiro e as principais transmissões esportivas do país.',
    },
  ],

  // ABA 2: COMBO SAÚDE & SOLUÇÕES DE CUIDADO
  saude: [
    {
      id: 'combo-familia-protegida',
      category: 'saude',
      badge: 'TELEMEDICINA 24H & PROTEÇÃO',
      badgeColor: 'cyan',
      isPopular: true,
      popularLabel: 'MAIS VENDIDO EM SAÚDE',
      title: 'Família Protegida & Saúde 24h',
      tagline: 'TurboMed Telemedicina 24h por vídeo para toda a família + Segurança Digital para até 5 celulares e computadores.',
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
        'Telemedicina 24h por vídeo para titular e até 4 dependentes',
        '19 especialidades médicas, receitas e atestados ICP-Brasil no celular',
        'Descontos de até 80% em farmácias credenciadas e laboratórios',
        'Segurança Digital para até 5 dispositivos contra vírus e golpes',
        '18 canais cortesia NuvvPlay e 100% fibra ultraestável',
      ],
      basePrice400M: 129.70,
      originalBasePrice: 169.90,
      defaultSpeed: '400',
      detailsSummary: 'Tranquilidade e segurança médica para a família com pronto atendimento sem filas 24h por dia e proteção digital dos aparelhos.',
    },
    {
      id: 'combo-saude-cinema',
      category: 'saude',
      badge: 'SAÚDE + TELECINE',
      badgeColor: 'rose',
      title: 'Saúde Total + Telecine',
      tagline: 'O cuidado médico da Telemedicina 24h somado aos 6 canais e catálogo streaming do Telecine.',
      channelsCount: 34,
      channelsTitle: 'Grade de Canais Básico + Telecine (34 Canais)',
      channelsImage: '/images/external/tv_hub_ultra_local_pro.png',
      catalogImage: '/images/external/cat_completo.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'TurboMed 24h', logo: '/images/apps/turbomed_icon.svg' },
        { name: 'Telecine', logo: '/images/external/telecine.png' },
      ],
      contentHighlights: [
        'TurboMed Telemedicina 24h ilimitada para titular e dependentes',
        'Telecine incluso com 6 canais ao vivo + acervo sob demanda',
        'Descontos em medicamentos e exames laboratoriais',
        '34 canais de TV ao vivo com abertos e variedades no NuvvPlay',
      ],
      basePrice400M: 149.80,
      originalBasePrice: 199.90,
      defaultSpeed: '400',
      detailsSummary: 'A combinação que une a tranquilidade de consultas médicas a qualquer hora com o entretenimento das estreias do Telecine.',
    },
    {
      id: 'combo-turbomed-essencial',
      category: 'saude',
      badge: 'SAÚDE ACESSÍVEL',
      badgeColor: 'emerald',
      title: 'TurboMed Essencial Fibra',
      tagline: 'Conexão 100% fibra com Wi-Fi incluso e Telemedicina 24h para você e seus familiares pelo menor custo mensal.',
      channelsCount: 18,
      channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
      channelsImage: '/images/external/tv_cortesia.png',
      catalogImage: '/images/external/cat_min.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'TurboMed 24h', logo: '/images/apps/turbomed_icon.svg' },
      ],
      contentHighlights: [
        'Consultas médicas por vídeo ilimitadas dia e noite sem carência',
        'Médicos clínicos gerais prontos para atendimento em minutos',
        'Receitas digitais válidas em todas as farmácias do Brasil',
        '100% Fibra Óptica com roteador Wi-Fi incluso e 18 canais cortesia',
      ],
      basePrice400M: 119.80,
      originalBasePrice: 149.90,
      defaultSpeed: '400',
      detailsSummary: 'Acesso imediato à saúde de qualidade na tela do smartphone ou computador com internet rápida e econômica.',
    },
  ],

  // ABA 3: SOMENTE FIBRA (INTERNET PURA)
  fibra: [
    {
      id: 'so-fibra-400',
      category: 'fibra',
      badge: 'FIBRA 400 MEGA',
      badgeColor: 'emerald',
      title: 'Fibra 400 Mega',
      tagline: 'Internet 100% fibra óptica de alta estabilidade com Wi-Fi incluso em comodato e 18 canais cortesia.',
      channelsCount: 18,
      channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
      channelsImage: '/images/external/tv_cortesia.png',
      catalogImage: '/images/external/cat_min.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
      ],
      contentHighlights: [
        '400 Mega de velocidade com banda garantida e baixa latência',
        'Roteador Wi-Fi de alta performance incluso em comodato',
        '18 canais cortesia de TV aberta no aplicativo NuvvPlay',
        'Instalação 100% grátis e suporte técnico local humanizado',
      ],
      basePrice400M: 99.90,
      originalBasePrice: 119.90,
      defaultSpeed: '400',
      detailsSummary: 'Plano perfeito para navegar, assistir vídeos em Full HD, reuniões de home office e estudos.',
    },
    {
      id: 'so-fibra-800',
      category: 'fibra',
      badge: 'FIBRA 800 MEGA',
      badgeColor: 'purple',
      isPopular: true,
      popularLabel: 'MAIS ESCOLHIDO • DOBRO DE VELOCIDADE',
      title: 'Fibra 800 Mega',
      tagline: 'O dobro de velocidade com roteador Wi-Fi 6 incluso, capacidade para dezenas de aparelhos e games competitivos.',
      channelsCount: 18,
      channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
      channelsImage: '/images/external/tv_cortesia.png',
      catalogImage: '/images/external/cat_min.png',
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
      ],
      contentHighlights: [
        '800 Mega (o dobro de velocidade) para downloads instantâneos',
        'Roteador Wi-Fi 6 de última geração incluso em comodato',
        'Ideal para múltiplos aparelhos conectados e streaming 4K sem travamentos',
        '18 canais cortesia de TV aberta e instalação grátis',
      ],
      basePrice400M: 129.90,
      originalBasePrice: 159.90,
      defaultSpeed: '800',
      detailsSummary: 'Máxima capacidade de banda larga para famílias numerosas, residências conectadas, criadores de conteúdo e gamers.',
    },
  ],
};

// Soluções e Serviços Adicionais Nuvv para exibição estratégica
export const OTHER_NUVV_SOLUTIONS = [
  {
    id: 'solucao-turbomed',
    icon: Stethoscope,
    badge: 'SAÚDE & TELEMEDICINA',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    title: 'TurboMed Telemedicina 24h',
    tagline: 'Pronto atendimento médico por vídeo 24h sem filas, com 19 especialidades para titular e dependentes.',
    priceText: '+R$ 19,90/mês',
    highlight: 'Receitas digitais válidas e descontos de até 80% em farmácias',
    iconColor: 'text-emerald-600',
    bgColor: 'from-emerald-50/80 to-transparent',
  },
  {
    id: 'solucao-seguranca',
    icon: ShieldCheck,
    badge: 'CIBERSEGURANÇA',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    title: 'Segurança Digital Nuvv',
    tagline: 'Proteção antivírus corporativa para até 5 celulares e computadores contra golpes, phishing e vírus.',
    priceText: '+R$ 9,90/mês',
    highlight: 'Navegação segura para proteger contas bancárias e dados pessoais',
    iconColor: 'text-indigo-600',
    bgColor: 'from-indigo-50/80 to-transparent',
  },
  {
    id: 'solucao-cameras',
    icon: Video,
    badge: 'MONITORAMENTO & NUVEM',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    title: 'Câmeras Inteligentes Nuvv Guard',
    tagline: 'Câmeras Wi-Fi com visão noturna, detecção de movimento e gravação protegida em nuvem.',
    priceText: 'A partir de +R$ 29,90/mês',
    highlight: 'Acompanhe a movimentação da sua casa direto pelo smartphone',
    iconColor: 'text-purple-600',
    bgColor: 'from-purple-50/80 to-transparent',
  },
  {
    id: 'solucao-interfone',
    icon: Bell,
    badge: 'CONTROLE DE ACESSO',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    title: 'Interfone Virtual por Vídeo',
    tagline: 'Atenda visitantes no celular de onde estiver e libere acesso pelo portão via QR Code dinâmico.',
    priceText: '+R$ 9,90/mês ou Taxa Única',
    highlight: 'Dispensa fiação e interfones antigos com tecnologia digital',
    iconColor: 'text-amber-600',
    bgColor: 'from-amber-50/80 to-transparent',
  },
  {
    id: 'solucao-tag',
    icon: Tag,
    badge: 'RASTREAMENTO PESSOAL',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    title: 'Tag de Rastreamento Nuvv',
    tagline: 'Localize pertences, chaves, mochilas de crianças e animais de estimação em tempo real.',
    priceText: '+R$ 9,90/mês ou Taxa Única',
    highlight: 'Bateria de longa duração e aplicativo leve de mapa',
    iconColor: 'text-rose-600',
    bgColor: 'from-rose-50/80 to-transparent',
  },
  {
    id: 'solucao-telefonia',
    icon: Phone,
    badge: 'COMUNICAÇÃO FIXA',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    title: 'Telefonia Fixa Digital',
    tagline: 'Linha digital de alta definição com ligações ilimitadas para telefones fixos de todo o Brasil.',
    priceText: '+R$ 19,90/mês',
    highlight: 'Mantenha seu número atual através da portabilidade gratuita',
    iconColor: 'text-cyan-600',
    bgColor: 'from-cyan-50/80 to-transparent',
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
  onOpenCitySelector,
}) => {
  const navigate = useNavigate();

  // Seletor de Abas Reduzido e Direto:
  // 1. Principais (Mais Cinema, Completão, Mais Esportes)
  // 2. Combo Saúde (Telemedicina 24h, Saúde + Cinema, Saúde Essencial)
  // 3. Somente Fibra (400 Mega e 800 Mega)
  const [activeTab, setActiveTab] = useState<NewTestTabId>('principais');

  // Estado para armazenar a velocidade selecionada em cada pacote (400M ou 800M)
  const [packageSpeeds, setPackageSpeeds] = useState<Record<string, SpeedOptionId>>(() => {
    const initial: Record<string, SpeedOptionId> = {};
    Object.values(NEW_TEST_OFFERS).forEach((offers) => {
      offers.forEach((pkg) => {
        initial[pkg.id] = (pkg.defaultSpeed as SpeedOptionId) || '400';
      });
    });
    return initial;
  });

  // Modais de detalhes e grade de canais
  const [activeChannelsModal, setActiveChannelsModal] = useState<TestPackageOffer | null>(null);
  const [activeDetailsModal, setActiveDetailsModal] = useState<TestPackageOffer | null>(null);

  const handleSpeedToggle = (pkgId: string, speedId: SpeedOptionId) => {
    setPackageSpeeds((prev) => ({
      ...prev,
      [pkgId]: speedId,
    }));
  };

  const calculateOfferPrice = (pkg: TestPackageOffer, speedId: SpeedOptionId) => {
    const speedOpt = SPEED_OPTIONS.find((s) => s.id === speedId) || SPEED_OPTIONS[0];
    const promoPrice = pkg.basePrice400M + speedOpt.priceOffset;
    const originalPrice = pkg.originalBasePrice + speedOpt.priceOffset;
    return { promoPrice, originalPrice, speedOpt };
  };

  const handleSelectPackage = (pkg: TestPackageOffer) => {
    if (pkg.category === 'fibra') {
      const is800 = pkg.defaultSpeed === '800';
      const summary = `[Novo Modelo - Só Fibra] ${pkg.title} - R$ ${pkg.basePrice400M.toFixed(2).replace('.', ',')}/mês em ${currentCity}`;
      onOpenLeadModal(summary);
      return;
    }

    const activeSpeedId = packageSpeeds[pkg.id] || '400';
    const { promoPrice, speedOpt } = calculateOfferPrice(pkg, activeSpeedId);
    const summary = `[Novo Modelo - ${activeTab.toUpperCase()}] ${pkg.title} (${speedOpt.label}) - R$ ${promoPrice
      .toFixed(2)
      .replace('.', ',')}/mês em ${currentCity}`;
    onOpenLeadModal(summary);
  };

  // Cores de temas para badges
  const getThemeClasses = (color: TestPackageOffer['badgeColor']) => {
    switch (color) {
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
      case 'rose':
        return {
          badge: 'bg-rose-500/15 border-rose-500/30 text-rose-900',
          btn: 'bg-rose-600 hover:bg-rose-700 text-white font-black shadow-rose-600/25',
          header: 'from-rose-500/10 via-pink-500/5 to-transparent',
        };
      default:
        return {
          badge: 'bg-slate-200 border-slate-300 text-slate-800',
          btn: 'bg-slate-900 hover:bg-slate-800 text-white font-black shadow-slate-900/20',
          header: 'from-slate-200/50 via-gray-100/40 to-transparent',
        };
    }
  };

  const currentTabOffers = NEW_TEST_OFFERS[activeTab] || NEW_TEST_OFFERS.principais;

  return (
    <div className="min-h-screen bg-slate-50/80 pb-20 selection:bg-nuvv-purple selection:text-white">
      {/* Barra de Aviso de Ambiente de Testes (Protótipo Simplificado) */}
      <div className="bg-slate-950 text-white border-b border-indigo-500/30 py-2.5 px-4 sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-black text-emerald-400 uppercase tracking-wider">
              Página de Testes (Novo Formato de Apresentação)
            </span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">
              Seletor Simplificado: <strong>Principais</strong>, <strong>Combo Saúde</strong> e <strong>Somente Fibra</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/residencial/monte-seu-combo')}
              className="text-xs text-indigo-300 hover:text-white underline font-semibold cursor-pointer"
            >
              Testar Montador Detalhado
            </button>

            <button
              type="button"
              onClick={() => navigate('/residencial')}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center space-x-1.5 transition-all text-xs cursor-pointer border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Residencial Atual</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero da Seção de Planos */}
      <section className="pt-10 pb-6 px-4 max-w-5xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/10 border border-nuvv-purple/20 text-nuvv-purple text-xs font-black tracking-wider uppercase shadow-2xs">
          <Sparkles className="w-4 h-4 text-nuvv-purple" />
          <span>NOVA EXPERIÊNCIA DE ESCOLHA • {currentCity.toUpperCase()}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          A conexão certa com o que{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">
            você realmente precisa.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Sem complexidade: escolha entre os <strong>combos principais</strong> com streamings consagrados, o inovador <strong>Combo Saúde</strong> com telemedicina 24h ou <strong>somente fibra</strong> de alta velocidade.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* NOVO SELETOR DE ABAS ESTRATÉGICO: 3 ABAS VISÍVEIS                         */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2 px-1">
            {[
              {
                id: 'principais',
                label: 'Principais',
                sublabel: 'TV & Streamings',
                icon: Sparkles,
                badge: 'MAIS POPULARES',
              },
              {
                id: 'saude',
                label: 'Combo Saúde',
                sublabel: 'Telemedicina 24h & Cuidado',
                icon: HeartPulse,
                badge: 'INOVAÇÃO',
              },
              {
                id: 'fibra',
                label: 'Somente Fibra',
                sublabel: '100% Fibra Pura',
                icon: Wifi,
                badge: 'ECONÔMICO',
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as NewTestTabId)}
                  className={`flex items-center space-x-3.5 px-5 py-3.5 sm:px-7 sm:py-4 rounded-2xl transition-all cursor-pointer flex-shrink-0 relative ${
                    isSelected
                      ? 'bg-nuvv-dark text-white shadow-xl ring-2 ring-nuvv-dark scale-102'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200/90 shadow-xs hover:border-slate-300 hover:scale-101'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                      isSelected
                        ? tab.id === 'saude'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-nuvv-purple text-white shadow-sm'
                        : 'bg-slate-100 text-nuvv-purple'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="block text-sm sm:text-base font-black leading-tight tracking-tight">
                        {tab.label}
                      </span>
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    </div>
                    <span
                      className={`text-xs sm:text-[13px] font-semibold block mt-0.5 leading-tight ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
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
          <div className="text-center text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto px-4 bg-white/60 backdrop-blur-sm py-2 rounded-xl border border-slate-200/60 shadow-2xs">
            {activeTab === 'principais' && (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Os combos de entretenimento mais assinados com Telecine, HBO Max, Premiere e até 100+ canais ao vivo.</span>
              </span>
            )}
            {activeTab === 'saude' && (
              <span className="flex items-center justify-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Cuidado médico 24h por vídeo para a família sem filas, receitas válidas, descontos em farmácias e fibra ultraestável.</span>
              </span>
            )}
            {activeTab === 'fibra' && (
              <span className="flex items-center justify-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ultravelocidade 100% fibra óptica pura com roteador incluso e 18 canais cortesia pelo menor custo mensal.</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GRID DE CARDS DOS PLANOS (Com visual idêntico ao modelo da Residencial)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {(() => {
          const gridLayoutClass =
            currentTabOffers.length === 2
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-stretch'
              : 'grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 xl:gap-8 max-w-7xl xl:max-w-[1360px] mx-auto items-stretch';

          return (
            <div className={gridLayoutClass}>
              {currentTabOffers.map((pkg) => {
                // SE FOR ABA SÓ FIBRA: Cards focados em velocidade
                if (activeTab === 'fibra') {
                  const is800 = pkg.defaultSpeed === '800';
                  const speedNumber = is800 ? '800' : '400';
                  const promoPrice = pkg.basePrice400M;
                  const originalPrice = pkg.originalBasePrice;
                  const discount = originalPrice - promoPrice;

                  return (
                    <div
                      key={`test-plan-${pkg.id}`}
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
                            <span>{pkg.popularLabel || 'MAIS ESCOLHIDO • DOBRO DE VELOCIDADE'}</span>
                          </span>
                        </div>
                      )}

                      {/* BLOCO SUPERIOR: VELOCIDADE HERO EM DESTAQUE */}
                      <div
                        className={`p-6 pb-5 rounded-t-3xl ${
                          is800
                            ? 'bg-gradient-to-b from-purple-50/70 via-indigo-50/20 to-transparent'
                            : 'bg-gradient-to-b from-emerald-50/60 via-slate-50/30 to-transparent'
                        } text-center space-y-2`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white border ${
                              is800
                                ? 'border-purple-200 text-nuvv-purple'
                                : 'border-emerald-200 text-emerald-700'
                            } shadow-2xs`}
                          >
                            {pkg.badge}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveDetailsModal(pkg)}
                            className="text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                            title="Ver especificações e benefícios"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Número Gigante de Velocidade */}
                        <div className="py-2">
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                              {speedNumber}
                            </span>
                            <span
                              className={`text-2xl sm:text-3xl font-black ${
                                is800 ? 'text-nuvv-purple' : 'text-emerald-600'
                              }`}
                            >
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
                          <div
                            className={`w-8 h-8 rounded-xl ${
                              is800
                                ? 'bg-purple-100 text-nuvv-purple'
                                : 'bg-emerald-100 text-emerald-700'
                            } flex items-center justify-center flex-shrink-0`}
                          >
                            <Wifi className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] uppercase font-black text-slate-400 block leading-none">
                              Roteador Comodato
                            </span>
                            <span className="text-xs font-black text-slate-900 leading-tight">
                              {is800 ? 'Wi-Fi 6 de Alta Capacidade' : 'Wi-Fi Incluso'}
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
                            <span className="text-xs font-bold text-slate-800">
                              18 Canais Cortesia NuvvPlay (Watch)
                            </span>
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
                            onClick={() => handleSelectPackage(pkg)}
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

                // SE FOR ABA DE COMBOS (PRINCIPAIS OU SAÚDE): Cards de valor com marcas no topo e micro-seletor de velocidade
                const activeSpeedId = packageSpeeds[pkg.id] || '400';
                const { promoPrice, originalPrice, speedOpt } = calculateOfferPrice(pkg, activeSpeedId);
                const discount = originalPrice - promoPrice;
                const isPopular = pkg.isPopular;
                const theme = getThemeClasses(pkg.badgeColor);

                return (
                  <div
                    key={`test-plan-${pkg.id}`}
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
                          <span>{pkg.popularLabel || 'MAIS ESCOLHIDO'}</span>
                        </span>
                      </div>
                    )}

                    {/* BLOCO 1: MARCAS E DESEJO EM PRIMEIRO LUGAR (Topo do Card) */}
                    <div
                      className={`p-6 pb-4 rounded-t-3xl bg-gradient-to-b ${theme.header} space-y-3.5`}
                    >
                      {/* Linha de Tag do Pacote */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-white border ${theme.badge} shadow-2xs`}
                        >
                          {pkg.badge}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveDetailsModal(pkg)}
                          className="text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                          title="Ver especificações e benefícios"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Vitrine de Logotipos Oficiais Inclusos */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-h-[48px] pb-1">
                          {pkg.heroLogos.map((item, idx) => (
                            <div
                              key={idx}
                              className="w-11 h-11 rounded-2xl overflow-hidden shadow-xs hover:scale-105 transition-all flex items-center justify-center flex-shrink-0 bg-white border border-slate-200/90 p-1"
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

                          {/* Se tiver canais Globo */}
                          {pkg.hasCanaisGlobo && (
                            <div
                              className="h-11 px-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:scale-105 transition-all flex items-center justify-center flex-shrink-0"
                              title="Canais Globo"
                            >
                              <img
                                src="/images/external/canais_globo.svg"
                                alt="Canais Globo"
                                className="h-4 sm:h-5 w-auto object-contain"
                              />
                            </div>
                          )}
                        </div>

                        {/* Botão de Canais ao Vivo */}
                        <div className="flex items-center justify-between pt-0.5">
                          <button
                            type="button"
                            onClick={() => setActiveChannelsModal(pkg)}
                            className="text-[11px] font-bold text-nuvv-purple hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            <Tv className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                            <span>
                              {pkg.channelsCount >= 99 ? '100+' : pkg.channelsCount} canais ao vivo (ver grade)
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Título do Combo e Chamada de Experiência */}
                      <div className="pt-0.5 space-y-1 min-h-[74px] flex flex-col justify-start">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>
                    </div>

                    {/* BLOCO 2: BASE FIBRA ÓPTICA (Micro-seletor elegante 400M e 800M) */}
                    <div className="px-6 py-3.5 bg-slate-50/90 border-y border-slate-200/80">
                      <div className="flex items-center justify-between gap-2">
                        {/* Lado Esquerdo: Fibra Óptica */}
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

                        {/* Lado Direito: Wi-Fi incluso e Instalação grátis */}
                        <div className="text-right space-y-0.5">
                          <span className="inline-flex items-center text-[11px] font-bold text-slate-700 block">
                            Wi-Fi incluso
                          </span>
                          <span className="inline-flex items-center text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                            Instalação grátis
                          </span>
                        </div>
                      </div>

                      {/* Micro-seletor de velocidade 400M vs 800M */}
                      <div className="mt-2.5 flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleSpeedToggle(pkg.id, '400')}
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
                          onClick={() => handleSpeedToggle(pkg.id, '800')}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            activeSpeedId === '800'
                              ? 'bg-nuvv-purple text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <span>800 Mega</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full font-black flex items-center gap-0.5 transition-all ${
                              activeSpeedId === '800'
                                ? 'bg-white/25 text-white'
                                : 'bg-emerald-100 text-emerald-700 animate-pulse'
                            }`}
                          >
                            <Sparkles className="w-2.5 h-2.5 inline" />
                            <span>+R$ 30</span>
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* BLOCO 3: PRECIFICAÇÃO CLARA & ECONOMIA */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
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

                      {/* DIFERENCIAIS INCLUSOS */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {pkg.contentHighlights.map((hl, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA DE CONTRATAÇÃO */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleSelectPackage(pkg)}
                          className={`w-full py-4 rounded-2xl ${
                            isPopular
                              ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover text-white shadow-nuvv-purple/30'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                          } font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer`}
                        >
                          <span>Assinar {pkg.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="text-center mt-2">
                          <button
                            type="button"
                            onClick={() => setActiveDetailsModal(pkg)}
                            className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold underline cursor-pointer"
                          >
                            Ver detalhes e regulamento completo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO DESTAQUE: "MONTE SEU PLANO DETALHADO / CUSTOMIZADO"                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-nuvv-dark via-slate-900 to-indigo-950 p-6 sm:p-10 text-white border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-black uppercase tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                <span>PERSONALIZAÇÃO TOTAL À LA CARTE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Quer montar um combo sob medida?{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                  Combine cada detalhe você mesmo.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                No nosso simulador de planos, você escolhe a velocidade da fibra e adiciona exatamente os canais, streamings ou serviços complementares (Telemedicina, Antivírus, Telefonia e Câmeras) que quiser, vendo o valor em tempo real.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/residencial/monte-seu-combo')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/25 transition-all active:scale-98 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Abrir Montador de Planos Detalhado</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO: MAIS OFERTAS DE OUTRAS SOLUÇÕES NUVV                               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-nuvv-purple text-xs font-black tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5 text-nuvv-purple" />
            <span>ECOSSISTEMA COMPLETO DE CONVENIÊNCIA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Mais soluções inteligentes para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">
              o seu dia a dia e sua família.
            </span>
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Turbine qualquer plano com serviços de proteção, saúde, segurança patrimonial e comunicação em uma única fatura simplificada.
          </p>
        </div>

        {/* Grid de Outras Soluções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OTHER_NUVV_SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.id}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-nuvv-purple/40 transition-all space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border ${sol.badgeColor}`}
                    >
                      {sol.badge}
                    </span>
                    <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl">
                      {sol.priceText}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform ${sol.iconColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-tight">
                        {sol.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Disponível como adicional</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sol.tagline}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 font-medium leading-snug">
                    💡 {sol.highlight}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenLeadModal(`[Interesse em Solução] ${sol.title} (${sol.priceText}) em ${currentCity}`)
                  }
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <span>Incluir no meu plano</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SESSÃO CATÁLOGO VOD ON-DEMAND & ESTÚDIOS INCLUSOS                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-2.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nuvv-purple/25 border border-nuvv-purple/40 text-purple-300 text-[11px] font-black tracking-wider uppercase">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>CATÁLOGO VOD • GRANDES ESTÚDIOS DE HOLLYWOOD</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Mais de 10.000 horas de entretenimento{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400">
                inclusos sem custo adicional.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Produções premiadas da Warner Bros., Universal Pictures, Sony Pictures, Lionsgate e BBC Studios prontas para assistir a qualquer hora no aplicativo NuvvPlay (Watch) na Smart TV, TV Box, smartphone ou computador.
            </p>
          </div>

          {/* Banner Oficial das Distribuidoras */}
          <div className="mt-8 rounded-2xl bg-white p-4 sm:p-6 border border-white/20 shadow-inner flex items-center justify-start overflow-hidden">
            <img
              src="/images/external/cat_completo.png"
              alt="Estúdios e Distribuidoras VOD NuvvPlay"
              className="max-h-16 sm:max-h-20 w-auto max-w-full object-contain object-left"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL: GRADE DE CANAIS EM ALTA DEFINIÇÃO                                  */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* MODAL: DETALHES TÉCNICOS E REGULAMENTO DA OFERTA                          */}
      {/* ========================================================================= */}
      <Modal
        isOpen={!!activeDetailsModal}
        onClose={() => setActiveDetailsModal(null)}
        maxWidth="2xl"
      >
        {activeDetailsModal && (() => {
          const speedId = packageSpeeds[activeDetailsModal.id] || (activeDetailsModal.defaultSpeed as SpeedOptionId) || '400';
          const { promoPrice, originalPrice, speedOpt } = calculateOfferPrice(activeDetailsModal, speedId);

          return (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-nuvv-purple to-indigo-700 text-white p-5 rounded-2xl">
                <span className="text-xs font-black uppercase text-indigo-200">
                  Especificações do Pacote
                </span>
                <h3 className="text-2xl font-black mt-1">{activeDetailsModal.title}</h3>
                <p className="text-xs text-indigo-100 mt-1">{activeDetailsModal.detailsSummary}</p>
              </div>

              {/* Distribuidoras VOD no Modal */}
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
                <span className="text-xs font-black text-slate-900 uppercase">
                  Destaques Inclusos no Pacote:
                </span>
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
    </div>
  );
};

export default TestePlanos;
