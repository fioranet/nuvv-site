/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRAL DE PLANOS E COMBOS RESIDENCIAIS - NUVV
 * ============================================================================
 * 
 * 💡 DICA PARA EDIÇÃO DIRETA:
 * Qualquer alteração feita neste arquivo (textos, valores, nomes de planos,
 * itens inclusos) reflete AUTOMATICAMENTE na tela em tempo real (via Vite HMR)
 * SEM a necessidade de recompilar ou reiniciar o servidor!
 * 
 * Estrutura de cada plano:
 * - title: Nome exibido no card principal
 * - badge: Etiqueta superior (ex: "COMPLETO", "FIBRA 400 MEGA")
 * - tagline: Descrição curta explicativa logo abaixo do título
 * - basePrice400M: Preço promocional do plano em 400 Mega (ou preço final em Só Fibra)
 * - originalBasePrice: Preço riscado ("De R$ ...")
 * - contentHighlights: Lista de diferenciais (bullet points com ícone de check)
 * - detailsSummary: Resumo exibido ao abrir o modal de detalhes técnicos
 */

export type SpeedOptionId = '400' | '800';

export interface SpeedOption {
  id: SpeedOptionId;
  label: string;
  priceOffset: number;
  wifiBadge: string;
  recommendedFor: string;
}

// Opções de velocidade disponíveis no seletor de combos
export const SPEED_OPTIONS: SpeedOption[] = [
  {
    id: '400',
    label: '400 Mega',
    priceOffset: 0,
    wifiBadge: 'Wi-Fi Incluso',
    recommendedFor: 'Navegação, streaming em Full HD e home office ágil',
  },
  {
    id: '800',
    label: '800 Mega',
    priceOffset: 30.0, // +R$ 30 para o dobro de velocidade (R$ 99,90 -> R$ 129,90)
    wifiBadge: 'Roteador Wi-Fi de Alta Capacidade',
    recommendedFor: 'Múltiplos aparelhos simultâneos, streaming 4K e games competitivos',
  },
];

export interface DigitalAppInfo {
  name: string;
  tag: string;
  description: string;
  logo: string;
}

export interface PackageOffer {
  id: string;
  category: 'cinema' | 'esportes' | 'completo' | 'saude' | 'seguranca' | 'essencial';
  badge: string;
  badgeColor: 'amber' | 'purple' | 'emerald' | 'cyan' | 'slate' | 'blue';
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
  digitalApps?: DigitalAppInfo[];
  basePrice400M: number;
  originalBasePrice: number;
  defaultSpeed: SpeedOptionId;
  detailsSummary: string;
}

/**
 * Retorna a lista de conteúdos digitais e streamings inclusos no pacote.
 * Se o pacote tiver 'digitalApps' customizado, usa diretamente; caso contrário,
 * deduz de forma inteligente a partir dos logos e diferenciais do plano.
 */
export const getPackageDigitalApps = (pkg: PackageOffer): DigitalAppInfo[] => {
  if (pkg.digitalApps && pkg.digitalApps.length > 0) {
    return pkg.digitalApps;
  }

  const apps: DigitalAppInfo[] = [];

  // 1. NuvvPlay (Watch)
  const hasWatch =
    pkg.heroLogos.some((l) => l.name.toLowerCase().includes('watch')) || pkg.channelsCount > 0;
  if (hasWatch) {
    apps.push({
      name: 'NuvvPlay (Watch)',
      tag: `${pkg.channelsCount} Canais`,
      description: 'TV ao vivo em Full HD e filmes/séries on-demand.',
      logo: '/images/external/watch-.png',
    });
  }

  // 2. Awdio
  const hasAwdio =
    pkg.heroLogos.some((l) => l.name.toLowerCase().includes('awdio')) ||
    pkg.contentHighlights.some((h) => h.toLowerCase().includes('awdio'));
  if (hasAwdio) {
    apps.push({
      name: 'Awdio',
      tag: 'Áudio & Livros',
      description: 'Audiobooks, podcasts e conteúdos em áudio.',
      logo: '/images/external/awdio.png',
    });
  }

  // 3. Sony One (incluso nos planos acima da cortesia, exceto no Mais Esportes)
  const isCortesia = pkg.category === 'essencial' || pkg.channelsCount <= 18;
  const isMaisEsportes =
    pkg.id.toLowerCase().includes('esportes') ||
    pkg.title.toLowerCase().includes('mais esportes');

  if (!isCortesia && !isMaisEsportes) {
    apps.push({
      name: 'Sony One',
      tag: 'Filmes & Séries',
      description: 'Catálogo completo de filmes e séries da Sony via app Watch Brasil.',
      logo: '/images/external/sony_one.png',
    });
  }

  // 4. Universal+ (incluso em todos os planos acima da cortesia)
  if (!isCortesia) {
    apps.push({
      name: 'Universal+',
      tag: 'Filmes & Séries',
      description: 'Filmes de sucesso e séries exclusivas da Universal via app Watch Brasil.',
      logo: '/images/external/universal_plus.png',
    });
  }

  // 5. Telecine
  const hasTelecine =
    pkg.heroLogos.some((l) => l.name.toLowerCase().includes('telecine')) ||
    pkg.contentHighlights.some((h) => h.toLowerCase().includes('telecine'));
  if (hasTelecine) {
    apps.push({
      name: 'Telecine',
      tag: '6 Canais + Streaming',
      description: '6 canais ao vivo e streaming de filmes sob demanda.',
      logo: '/images/external/telecine.png',
    });
  }

  // 6. HBO Max
  const hasMax =
    pkg.heroLogos.some((l) => l.name.toLowerCase().includes('max')) ||
    pkg.contentHighlights.some((h) => h.toLowerCase().includes('max'));
  if (hasMax) {
    apps.push({
      name: 'HBO Max',
      tag: 'Streaming Premium',
      description: 'Filmes, séries exclusivas HBO e esportes ao vivo.',
      logo: '/images/external/hbomax.png',
    });
  }

  // 7. Premiere
  const hasPremiere =
    pkg.heroLogos.some((l) => l.name.toLowerCase().includes('premiere')) ||
    pkg.contentHighlights.some((h) => h.toLowerCase().includes('premiere'));
  if (hasPremiere) {
    apps.push({
      name: 'Premiere',
      tag: 'Futebol Ao Vivo',
      description: 'Brasileirão Séries A e B ao vivo com o melhor do futebol.',
      logo: '/images/external/premiere.png',
    });
  }

  // 8. Combate
  const hasCombate =
    pkg.heroLogos.some((l) => l.name.toLowerCase().includes('combate')) ||
    pkg.contentHighlights.some((h) => h.toLowerCase().includes('combate'));
  if (hasCombate) {
    apps.push({
      name: 'Combate',
      tag: 'Lutas & UFC',
      description: 'Canal 100% dedicado aos maiores eventos de luta.',
      logo: '/images/external/combate.png',
    });
  }

  return apps;
};

export type ResidentialTabId = 'destaques' | 'completo' | 'essencial' | 'basico' | 'internet';

/**
 * CATÁLOGO DE PLANOS ORGANIZADOS POR ABA
 */
export const RESIDENTIAL_TAB_OFFERS: Record<ResidentialTabId, PackageOffer[]> = {
  // --------------------------------------------------------------------------
  // ABA 1: SUPER OFERTAS (Combos de maior valor e conversão)
  // --------------------------------------------------------------------------
  destaques: [
    {
      id: 'destaque-cinema',
      category: 'cinema',
      badge: 'MAIS CINEMA',
      badgeColor: 'amber',
      title: 'Mais Cinema',
      tagline: 'Os 6 canais Telecine com streaming incluso, HBO Max, app Awdio e 26 canais ao vivo.',
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
        'HBO Max incluso com filmes, séries Warner e esportes',
        'App Awdio com audiobooks, podcasts e conteúdos em áudio',
        '26 canais de TV ao vivo no NuvvPlay (Watch)',
      ],
      basePrice400M: 129.80,
      originalBasePrice: 169.90,
      defaultSpeed: '400',
      detailsSummary: 'Combo de cinema e séries com Telecine e HBO Max para maratonar.',
    },
    {
      id: 'destaque-familia',
      category: 'completo',
      badge: 'COMPLETÃO FAMÍLIA',
      badgeColor: 'purple',
      isPopular: true, // Destaque visual "Mais Escolhido"
      title: 'Completão Família',
      tagline: 'O combo supremo com 100+ canais ao vivo, Premiere, Combate, HBO Max e Telecine.',
      channelsCount: 100,
      channelsTitle: 'Grade de Canais Completão (100+ Canais)',
      channelsImage: '/images/external/completo_elite.png',
      catalogImage: '/images/external/cat_completo.png',
      hasCanaisGlobo: false,
      heroLogos: [
        { name: 'Watch', logo: '/images/external/watch-.png' },
        { name: 'Premiere', logo: '/images/external/premiere.png' },
        { name: 'Combate', logo: '/images/external/combate.png' },
        { name: 'Telecine', logo: '/images/external/telecine.png' },
        { name: 'HBO Max', logo: '/images/external/hbomax.png' },
      ],
      contentHighlights: [
        'HBO Max e Telecine inclusos (séries premiadas e filmes)',
        'Premiere e Combate ao vivo na mesma assinatura',
        '100+ canais de TV ao vivo em Full HD',
        'App Awdio com audiobooks e podcasts no NuvvPlay (Watch)',
      ],
      basePrice400M: 189.80,
      originalBasePrice: 249.90,
      defaultSpeed: '400',
      detailsSummary: 'Grade máxima com infantis, variedades, Premiere, Combate, HBO Max e Telecine.',
    },
    {
      id: 'destaque-esportes',
      category: 'esportes',
      badge: 'MAIS ESPORTES',
      badgeColor: 'emerald',
      title: 'Mais Esportes',
      tagline: 'O melhor do futebol e lutas com Premiere e Combate ao vivo, canais esportivos e variedades.',
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
        'Premiere incluso com jogos ao vivo do Brasileirão e Copa do Brasil',
        'Combate incluso com transmissões de lutas e artes marciais',
        'Canais Sportv, ESPN, Band Sports, N Sports e notícias',
        '68 canais de TV ao vivo transmitidos pelo NuvvPlay (Watch)',
        'App Awdio incluso com conteúdos em áudio',
      ],
      basePrice400M: 139.80,
      originalBasePrice: 189.90,
      defaultSpeed: '400',
      detailsSummary: 'Cobertura esportiva completa com Premiere e Combate para não perder nenhum jogo ou luta.',
    },
  ],

  // --------------------------------------------------------------------------
  // ABA 2: COMPLETO (Grade máxima de canais ao vivo)
  // --------------------------------------------------------------------------
  completo: [
    {
      id: 'completo-padrao',
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
      id: 'completo-telecine',
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
      // Telecine estritamente por último
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

  // --------------------------------------------------------------------------
  // ABA 3: ESSENCIAL (Grade popular com opções modulares)
  // --------------------------------------------------------------------------
  essencial: [
    {
      id: 'essencial-padrao',
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

  // --------------------------------------------------------------------------
  // ABA 4: BÁSICO (Econômico com canais abertos)
  // --------------------------------------------------------------------------
  basico: [
    {
      id: 'basico-padrao',
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

  // --------------------------------------------------------------------------
  // ABA 5: SÓ FIBRA (Cards tradicionais dedicados por velocidade)
  // --------------------------------------------------------------------------
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
      basePrice400M: 99.90, // Preço R$ 99,90/mês
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
      basePrice400M: 129.90, // Preço com pontualidade R$ 129,90/mês
      originalBasePrice: 149.90, // Preço normal R$ 149,90/mês
      defaultSpeed: '800',
      detailsSummary: 'Alta capacidade para famílias conectadas, downloads pesados, streaming em 4K e jogos competitivos.',
    },
  ],
};
