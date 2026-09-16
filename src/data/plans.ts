export type EntertainmentTier =
  | 'cortesia'
  | 'basico'
  | 'basico-telecine'
  | 'essencial'
  | 'essencial-telecine'
  | 'essencial-max'
  | 'completo'
  | 'completo-telecine'
  | 'completao-familia'
  | 'mais-cinema'
  | 'mais-esportes';

export type PlanAddonCategory = 'streaming' | 'saude' | 'protecao' | 'vision' | 'telefonia';

export interface PlanAddon {
  id: string;
  name: string;
  category: PlanAddonCategory;
  price: number;
  badge: string;
  internalCode: string;
  icon?: string;
  logo?: string;
  description: string;
  benefits?: string[];
  setupFee?: number;
}

export interface PlanBenefit {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface ResidentialPlan {
  id: string;
  speed: string;
  speedNumber: number;
  unit: string;
  badge?: string;
  isPopular?: boolean;
  priorityTraffic?: boolean;
  slaHours?: number;
  targetAudience?: string;
  tierPricing: Record<EntertainmentTier, {
    originalPrice: number;
    promoPrice: number;
    channelsCount: number;
    includedApps: { name: string; logo: string }[];
    promoBanner?: string;
  }>;
  wifiBadge: string;
  benefits: PlanBenefit[];
}

export const PLAN_ADDONS: Record<string, PlanAddon> = {
  // Streamings
  hboMax: {
    id: 'hboMax',
    name: 'HBO Max',
    category: 'streaming',
    price: 39.90,
    badge: '+ HBO MAX',
    internalCode: 'HBO',
    logo: '/images/external/hbomax.png',
    description: 'Filmes, séries exclusivas da HBO e transmissões esportivas em alta definição.',
  },
  telecine: {
    id: 'telecine',
    name: 'Telecine',
    category: 'streaming',
    price: 29.90,
    badge: '+ TELECINE',
    internalCode: 'TELECINE',
    logo: '/images/external/telecine.png',
    description: '6 canais exclusivos com estreias direto do cinema e catálogo on-demand.',
  },
  premiere: {
    id: 'premiere',
    name: 'Premiere',
    category: 'streaming',
    price: 49.90,
    badge: '+ PREMIERE',
    internalCode: 'PREMIERE',
    logo: '/images/external/premiere.png',
    description: 'O melhor do futebol brasileiro ao vivo: Brasileirão séries A e B e Copa do Brasil.',
  },
  combate: {
    id: 'combate',
    name: 'Combate',
    category: 'streaming',
    price: 39.90,
    badge: '+ COMBATE',
    internalCode: 'COMBATE',
    logo: '/images/external/combate.png',
    description: 'O canal 100% dedicado ao universo dos esportes de combate e artes marciais.',
  },

  // Telemedicina e Saúde (TurboMed)
  'telemed-essencial-ind': {
    id: 'telemed-essencial-ind',
    name: 'Telemedicina Individual',
    category: 'saude',
    price: 9.90,
    badge: '+ SAÚDE INDIVIDUAL',
    internalCode: 'TURBOMED_IND',
    description: 'Telemedicina 24h ilimitada para 1 pessoa, 19 especialidades e até 80% de desconto em exames.',
  },
  'telemed-essencial-fam': {
    id: 'telemed-essencial-fam',
    name: 'Telemedicina Familiar',
    category: 'saude',
    price: 19.90,
    badge: '+ SAÚDE FAMILIAR',
    internalCode: 'TURBOMED_FAM',
    description: 'Telemedicina 24h ilimitada para o titular e dependentes, consultas online em até 10 min.',
  },
  'telemed-premium-ind': {
    id: 'telemed-premium-ind',
    name: 'Telemedicina + Rede Individual',
    category: 'saude',
    price: 14.90,
    badge: '+ SAÚDE REDE IND',
    internalCode: 'TURBOMED_R_IND',
    description: 'Telemedicina 24h + consultas presenciais em 50 especialidades, odontologia e descontos.',
  },
  'telemed-premium-fam': {
    id: 'telemed-premium-fam',
    name: 'Telemedicina + Rede Familiar',
    category: 'saude',
    price: 24.90,
    badge: '+ SAÚDE REDE FAM',
    internalCode: 'TURBOMED_R_FAM',
    description: 'Plano completo para a família toda com telemedicina, consultas presenciais e odontologia.',
  },

  // Segurança Digital (Kaspersky)
  'protecao-familia': {
    id: 'protecao-familia',
    name: 'Proteção Família',
    category: 'protecao',
    price: 9.90,
    badge: '+ PROTEÇÃO FAMÍLIA',
    internalCode: 'SAFE',
    description: '5 Dispositivos Kaspersky Plus + 1 Safe Kids com proteção de identidade.',
  },
  'protecao-familia-plus': {
    id: 'protecao-familia-plus',
    name: 'Proteção Família Plus',
    category: 'protecao',
    price: 15.90,
    badge: '+ PROTEÇÃO PLUS',
    internalCode: 'SAFE_PLUS',
    description: '10 Dispositivos Kaspersky Plus + 2 Safe Kids com antivírus e VPN ilimitada.',
  },

  // Nuvv Guard (Segurança Residencial: Câmeras, Interfone e Tags)
  'guard-camera-3d': {
    id: 'guard-camera-3d',
    name: 'Câmera em Comodato (3 dias nuvem)',
    category: 'vision',
    price: 39.90,
    badge: 'COMODATO INCLUSO',
    internalCode: 'GUARD_CAM_3D',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'Equipamento Nuvv + gravação 3 dias na nuvem (Instalação e ativação isentas).',
  },
  'guard-camera-7d': {
    id: 'guard-camera-7d',
    name: 'Câmera em Comodato (7 dias nuvem)',
    category: 'vision',
    price: 44.90,
    badge: 'MAIS ESCOLHIDO',
    internalCode: 'GUARD_CAM_7D',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'Equipamento Nuvv + gravação 7 dias na nuvem (Instalação e ativação isentas).',
  },
  'guard-camera-15d': {
    id: 'guard-camera-15d',
    name: 'Câmera em Comodato (15 dias nuvem)',
    category: 'vision',
    price: 59.90,
    badge: 'ALTA CAPACIDADE',
    internalCode: 'GUARD_CAM_15D',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'Equipamento Nuvv + gravação 15 dias na nuvem (Instalação e ativação isentas).',
  },
  'guard-byod-7d': {
    id: 'guard-byod-7d',
    name: 'Câmera Própria (BYOD 7 dias)',
    category: 'vision',
    price: 19.90,
    badge: 'CÂMERA PRÓPRIA',
    internalCode: 'GUARD_BYOD_7D',
    setupFee: 15.00,
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'Plataforma Nuvv Guard + gravação de 7 dias (R$ 15,00 ativação por câmera).',
  },
  'guard-intercom-residencial': {
    id: 'guard-intercom-residencial',
    name: 'Interfone Virtual (Casa/Sobrado)',
    category: 'vision',
    price: 0.00,
    setupFee: 79.90,
    badge: 'TAXA ÚNICA R$ 79,90',
    internalCode: 'GUARD_INTERCOM_RES',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'Placa QR code + chamadas de vídeo no app Nuvv Guard (Sem mensalidade enquanto cliente Nuvv, taxa única R$ 79,90).',
  },
  'guard-intercom-mensal': {
    id: 'guard-intercom-mensal',
    name: 'Interfone Virtual (Mensal)',
    category: 'vision',
    price: 9.90,
    setupFee: 15.00,
    badge: 'R$ 9,90/MÊS',
    internalCode: 'GUARD_INTERCOM_MENSAL',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'Interfone virtual no app Nuvv Guard por R$ 9,90/mês (+ R$ 15,00 ativação).',
  },
  'guard-track-tag': {
    id: 'guard-track-tag',
    name: 'Tag de Rastreamento',
    category: 'vision',
    price: 0.00,
    setupFee: 79.90,
    badge: 'TAXA ÚNICA R$ 79,90',
    internalCode: 'GUARD_TRACK_TAG',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'TAG de rastreamento e acesso à plataforma Nuvv Guard (Sem mensalidade enquanto cliente Nuvv, taxa única R$ 79,90).',
  },
  'guard-track-tag-mensal': {
    id: 'guard-track-tag-mensal',
    name: 'Tag de Rastreamento (Mensal)',
    category: 'vision',
    price: 9.90,
    setupFee: 15.00,
    badge: 'R$ 9,90/MÊS',
    internalCode: 'GUARD_TRACK_TAG_MENSAL',
    logo: '/images/apps/app_nuvv_guard_icon.png',
    description: 'TAG de rastreamento e acesso à plataforma por R$ 9,90/mês (+ R$ 15,00 ativação).',
  },

  // Telefonia Fixa
  'telefonia-fixa': {
    id: 'telefonia-fixa',
    name: 'Telefonia Fixa Ilimitada',
    category: 'telefonia',
    price: 19.90,
    badge: '+ VOZ FIXA BRASIL',
    internalCode: 'FIXO_ILIM',
    description: 'Ligações ilimitadas para fixos de todo o Brasil e celulares locais via fibra óptica.',
  },
};

export interface VisionAddonConfig {
  cameraPlanId?: 'guard-camera-3d' | 'guard-camera-7d' | 'guard-camera-15d' | 'guard-byod-7d' | null;
  cameraCount?: number;
  intercomPlanId?: 'guard-intercom-residencial' | 'guard-intercom-mensal' | null;
  tagPlanId?: 'guard-track-tag' | 'guard-track-tag-mensal' | null;
  tagCount?: number;
  planId?: string | null;
  withComodato?: boolean;
}

export function calculateVisionAddonPrice(config?: VisionAddonConfig | null): number {
  if (!config) return 0;
  let total = 0;

  // 1. Câmeras
  const camId =
    config.cameraPlanId ||
    (config.planId &&
    (config.planId.includes('camera') ||
      config.planId.includes('byod') ||
      config.planId.includes('vision'))
      ? (config.planId as any)
      : null);

  if (camId && PLAN_ADDONS[camId]) {
    const camCount = Math.max(1, config.cameraCount || 1);
    total += (PLAN_ADDONS[camId].price || 0) * camCount;
  }

  // 2. Interfone Virtual
  const intercomId =
    config.intercomPlanId ||
    (config.planId && config.planId.includes('intercom')
      ? (config.planId as any)
      : null);

  if (intercomId && PLAN_ADDONS[intercomId]) {
    total += PLAN_ADDONS[intercomId].price || 0;
  }

  // 3. TAG de Acesso e Rastreamento
  const tagId =
    config.tagPlanId ||
    (config.planId && config.planId.includes('tag')
      ? (config.planId as any)
      : null);

  if (tagId && PLAN_ADDONS[tagId]) {
    const tCount = Math.max(1, config.tagCount || 1);
    total += (PLAN_ADDONS[tagId].price || 0) * tCount;
  }

  return Number(total.toFixed(2));
}

export interface GuardSetupItem {
  name: string;
  setupFee: number;
  monthlyPrice: number;
  notice: string;
}

export function getGuardSetupDetails(config?: VisionAddonConfig | null): {
  items: GuardSetupItem[];
  totalSetupFee: number;
} {
  if (!config) return { items: [], totalSetupFee: 0 };
  const items: GuardSetupItem[] = [];
  let totalSetupFee = 0;

  const camId =
    config.cameraPlanId ||
    (config.planId &&
    (config.planId.includes('camera') ||
      config.planId.includes('byod') ||
      config.planId.includes('vision'))
      ? (config.planId as any)
      : null);

  if (camId && PLAN_ADDONS[camId]) {
    const camCount = Math.max(1, config.cameraCount || 1);
    const addon = PLAN_ADDONS[camId];
    const fee = (addon.setupFee || 0) * camCount;
    totalSetupFee += fee;
    items.push({
      name: `${addon.name} (${camCount}x)`,
      setupFee: fee,
      monthlyPrice: addon.price * camCount,
      notice:
        fee > 0
          ? `Taxa de ativação de R$ ${fee.toFixed(2).replace('.', ',')} por câmera.`
          : 'Câmera em comodato com instalação e ativação isentas.',
    });
  }

  const intercomId =
    config.intercomPlanId ||
    (config.planId && config.planId.includes('intercom')
      ? (config.planId as any)
      : null);

  if (intercomId && PLAN_ADDONS[intercomId]) {
    const addon = PLAN_ADDONS[intercomId];
    const fee = addon.setupFee || 0;
    totalSetupFee += fee;
    items.push({
      name: addon.name,
      setupFee: fee,
      monthlyPrice: addon.price,
      notice:
        fee > 0
          ? `Taxa única de confecção e envio da placa QR Code (R$ ${fee.toFixed(2).replace('.', ',')}). Sem mensalidade enquanto cliente da Nuvv.`
          : 'Sem mensalidade enquanto cliente da Nuvv.',
    });
  }

  const tagId =
    config.tagPlanId ||
    (config.planId && config.planId.includes('tag')
      ? (config.planId as any)
      : null);

  if (tagId && PLAN_ADDONS[tagId]) {
    const tCount = Math.max(1, config.tagCount || 1);
    const addon = PLAN_ADDONS[tagId];
    const fee = (addon.setupFee || 0) * tCount;
    totalSetupFee += fee;
    items.push({
      name: `${addon.name} (${tCount}x)`,
      setupFee: fee,
      monthlyPrice: addon.price * tCount,
      notice:
        fee > 0
          ? `Taxa única de envio e ativação das TAGs (R$ ${fee.toFixed(2).replace('.', ',')}). Sem mensalidade enquanto cliente da Nuvv.`
          : 'Sem mensalidade enquanto cliente da Nuvv.',
    });
  }

  return { items, totalSetupFee: Number(totalSetupFee.toFixed(2)) };
}

export interface TelemedicinaPlan {
  id: string;
  name: string;
  type: 'individual' | 'familiar';
  tier: 'essencial' | 'premium';
  price: number;
  badge?: string;
  isPopular?: boolean;
  targetAudience: string;
  features: string[];
}

export const TELEMEDICINA_PLANS: TelemedicinaPlan[] = [
  {
    id: 'telemed-essencial-ind',
    name: 'Plano Essencial Individual',
    type: 'individual',
    tier: 'essencial',
    price: 9.90,
    targetAudience: 'Para você cuidar da sua saúde com agilidade e economia',
    features: [
      'Telemedicina 24 horas por dia, 7 dias por semana',
      'Pronto atendimento por vídeo em até 10 minutos',
      'Acesso a 19 especialidades médicas',
      'Sem limite de consultas (uso ilimitado)',
      'Emissão de receitas, pedidos de exames e atestados médicos válidos',
      'Desconto de até 80% em exames laboratoriais',
      'Desconto de 20% a 80% em farmácias credenciadas',
    ],
  },
  {
    id: 'telemed-essencial-fam',
    name: 'Plano Essencial Familiar',
    type: 'familiar',
    tier: 'essencial',
    price: 19.90,
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    targetAudience: 'Proteção e saúde para o titular e seus dependentes',
    features: [
      'Tudo do Plano Essencial para toda a sua família',
      'Telemedicina 24h ilimitada para titular + dependentes',
      'Pronto atendimento pediátrico e clínico em até 10 minutos',
      '19 especialidades médicas com agendamento direto pelo App',
      'Receitas e atestados médicos digitais com assinatura ICP-Brasil',
      'Desconto de até 80% em exames e procedimentos para todos',
      'Desconto de 20% a 80% em medicamentos nas principais redes',
    ],
  },
  {
    id: 'telemed-premium-ind',
    name: 'Plano Premium Individual',
    type: 'individual',
    tier: 'premium',
    price: 14.90,
    targetAudience: 'Telemedicina online + rede presencial com 50 especialidades',
    features: [
      'Todas as vantagens do Plano Essencial Individual +',
      'Consultas presenciais em até 50 especialidades com preços reduzidos',
      'Rede médica presencial credenciada em todo o Brasil',
      'Tratamentos odontológicos com desconto e parcelamento em até 12x',
      'Desconto em medicamentos de até 70% a 80%',
      'Desconto em exames clínicos e de imagem de até 80%',
    ],
  },
  {
    id: 'telemed-premium-fam',
    name: 'Plano Premium Familiar',
    type: 'familiar',
    tier: 'premium',
    price: 24.90,
    badge: 'COBERTURA COMPLETA',
    targetAudience: 'A máxima cobertura em saúde online e presencial para sua família',
    features: [
      'Todas as vantagens do Plano Premium para toda a família',
      'Telemedicina 24h sem limite de uso com espera média de 10 min',
      'Consultas médicas presenciais em mais de 50 especialidades',
      'Odontologia familiar com tabela diferenciada e parcelamento 12x',
      'Descontos expressivos em farmácias, vacinas e exames complexos',
      'Central de agendamento ágil e suporte dedicado',
    ],
  },
];

export const DEFAULT_BENEFITS: PlanBenefit[] = [
  { id: 'nuvv-plus', name: 'App Nuvv', logo: '/images/apps/app_nuvv_icon.png', description: 'Central do assinante, suporte e facilidades' },
  { id: 'bebanca', name: 'Bebanca', logo: '/images/external/bebanca.jpg', description: 'Jornais, Livros e Revistas' },
  { id: 'begamer', name: 'Begamer', logo: '/images/external/begamer.jpg', description: 'Jogos e conteúdos gamer' },
  { id: 'beeduca', name: 'Beeduca', logo: '/images/external/beeduca.jpg', description: 'Cursos e capacitação online' },
];

/**
 * Default promotional discount offset between originalPrice and promoPrice.
 * originalPrice = promoPrice + DEFAULT_PROMO_DISCOUNT (standard R$ 20,00)
 */
export const DEFAULT_PROMO_DISCOUNT = 20.00;

/**
 * Extra price delta added relative to the base plan (TV Cortesia).
 */
export const TIER_EXTRA_PRICES: Record<EntertainmentTier, number> = {
  cortesia: 0.00,
  basico: 9.90,
  'basico-telecine': 19.90,
  essencial: 29.90,
  'essencial-telecine': 39.90,
  'essencial-max': 49.90,
  completo: 59.90,
  'completo-telecine': 69.90,
  'completao-familia': 89.90,
  'mais-cinema': 29.90,
  'mais-esportes': 39.90,
};

export interface TierConfigItem {
  id: EntertainmentTier;
  label: string;
  categoryGroup: 'cortesia' | 'basico' | 'essencial' | 'completo' | 'destaque';
  description: string;
  channelsCount: number;
  channelsImage: string;
  catalogImage: string;
  channelsTitle: string;
  extraPrice: number;
  extraPriceLabel: string;
  includedApps: { name: string; logo: string }[];
  includedAddons: string[];
  referencePlan: string;
}

export const TIER_CONFIG: Record<EntertainmentTier, TierConfigItem> = {
  cortesia: {
    id: 'cortesia',
    label: 'TV Cortesia',
    categoryGroup: 'cortesia',
    description: '18 canais ao vivo cortesia sem custo no app NuvvPlay (Watch).',
    channelsCount: 18,
    channelsImage: '/images/external/tv_cortesia.png',
    catalogImage: '/images/external/cat_min.png',
    channelsTitle: 'Grade de Canais Cortesia (18 Canais)',
    extraPrice: 0.00,
    extraPriceLabel: 'Incluso no plano',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
    ],
    includedAddons: [],
    referencePlan: 'UP',
  },
  basico: {
    id: 'basico',
    label: 'Básico',
    categoryGroup: 'basico',
    description: '28 canais ao vivo + catálogo sob demanda e app Awdio no NuvvPlay.',
    channelsCount: 28,
    channelsImage: '/images/external/tv_basico.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Básico (28 Canais)',
    extraPrice: 9.90,
    extraPriceLabel: '+ R$ 9,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
    ],
    includedAddons: [],
    referencePlan: 'HUB PLAY LOCAL PRO',
  },
  'basico-telecine': {
    id: 'basico-telecine',
    label: 'Básico + Telecine',
    categoryGroup: 'basico',
    description: '34 canais ao vivo com os 6 canais Telecine e streaming sob demanda.',
    channelsCount: 34,
    channelsImage: '/images/external/tv_hub_ultra_local_pro.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Básico + Telecine (34 Canais)',
    extraPrice: 19.90,
    extraPriceLabel: '+ R$ 19,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
    ],
    includedAddons: ['telecine'],
    referencePlan: 'HUB ULTRA LOCAL PRO',
  },
  essencial: {
    id: 'essencial',
    label: 'Essencial',
    categoryGroup: 'essencial',
    description: '68 canais ao vivo com notícias, variedades e filmes no NuvvPlay.',
    channelsCount: 68,
    channelsImage: '/images/external/tv_essencial.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Essencial (68 Canais)',
    extraPrice: 29.90,
    extraPriceLabel: '+ R$ 29,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
    ],
    includedAddons: [],
    referencePlan: 'POWER PLAY',
  },
  'essencial-telecine': {
    id: 'essencial-telecine',
    label: 'Essencial + Telecine',
    categoryGroup: 'essencial',
    description: '74 canais ao vivo com os 6 canais Telecine + streaming on-demand.',
    channelsCount: 74,
    channelsImage: '/images/external/tv_watch_black_premium.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Essencial + Telecine (74 Canais)',
    extraPrice: 39.90,
    extraPriceLabel: '+ R$ 39,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
    ],
    includedAddons: ['telecine'],
    referencePlan: 'WATCH BLACK PREMIUM',
  },
  'essencial-max': {
    id: 'essencial-max',
    label: 'Essencial + HBO Max',
    categoryGroup: 'essencial',
    description: '68 canais ao vivo e streaming HBO Max com filmes, séries premiadas e Champions.',
    channelsCount: 68,
    channelsImage: '/images/external/tv_essencial.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Essencial + HBO Max (68 Canais)',
    extraPrice: 49.90,
    extraPriceLabel: '+ R$ 49,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'HBO Max', logo: '/images/external/hbomax.png' },
    ],
    includedAddons: ['hboMax'],
    referencePlan: 'WATCH BLACK POWER PLAY',
  },
  completo: {
    id: 'completo',
    label: 'Completo',
    categoryGroup: 'completo',
    description: '93 canais ao vivo com Premiere e Combate inclusos no combo.',
    channelsCount: 93,
    channelsImage: '/images/external/tv_completo.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Completo (93 Canais)',
    extraPrice: 59.90,
    extraPriceLabel: '+ R$ 59,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Premiere', logo: '/images/external/premiere.png' },
      { name: 'Combate', logo: '/images/external/combate.png' },
    ],
    includedAddons: ['premiere', 'combate'],
    referencePlan: 'POWER SELEÇÃO ESPORTES WBD',
  },
  'completo-telecine': {
    id: 'completo-telecine',
    label: 'Completo + Telecine',
    categoryGroup: 'completo',
    description: '100+ canais com Premiere, Combate e os 6 canais Telecine.',
    channelsCount: 100,
    channelsImage: '/images/external/completo_elite.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Completo + Telecine (100+ Canais)',
    extraPrice: 69.90,
    extraPriceLabel: '+ R$ 69,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Premiere', logo: '/images/external/premiere.png' },
      { name: 'Combate', logo: '/images/external/combate.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
    ],
    includedAddons: ['premiere', 'combate', 'telecine'],
    referencePlan: 'POWER ELITE WBD',
  },
  'completao-familia': {
    id: 'completao-familia',
    label: 'Completão Família',
    categoryGroup: 'destaque',
    description: 'O combo supremo com 100+ canais, Premiere, Combate, Telecine e HBO Max.',
    channelsCount: 100,
    channelsImage: '/images/external/completo_elite.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Completão (100+ Canais)',
    extraPrice: 89.90,
    extraPriceLabel: '+ R$ 89,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Premiere', logo: '/images/external/premiere.png' },
      { name: 'Combate', logo: '/images/external/combate.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
      { name: 'HBO Max', logo: '/images/external/hbomax.png' },
    ],
    includedAddons: ['premiere', 'combate', 'telecine', 'hboMax'],
    referencePlan: 'POWER ELITE WBD + HBO Max',
  },
  'mais-cinema': {
    id: 'mais-cinema',
    label: 'Mais Cinema',
    categoryGroup: 'destaque',
    description: '26 canais ao vivo com Telecine e HBO Max inclusos.',
    channelsCount: 26,
    channelsImage: '/images/external/cinema.png',
    catalogImage: '/images/external/cat_completo.png',
    channelsTitle: 'Grade de Canais Mais Cinema (26 Canais)',
    extraPrice: 29.90,
    extraPriceLabel: '+ R$ 29,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Sony One', logo: '/images/external/sony_one.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Telecine', logo: '/images/external/telecine.png' },
      { name: 'HBO Max', logo: '/images/external/hbomax.png' },
    ],
    includedAddons: ['telecine', 'hboMax'],
    referencePlan: 'WATCH BLACK CINEMA LOCAL PRO',
  },
  'mais-esportes': {
    id: 'mais-esportes',
    label: 'Mais Esportes',
    categoryGroup: 'destaque',
    description: '68 canais ao vivo com Premiere e Combate inclusos para curtir futebol e lutas.',
    channelsCount: 68,
    channelsImage: '/images/external/tv_power_esporte_clube.png',
    catalogImage: '/images/external/cat_medio.png',
    channelsTitle: 'Grade de Canais Mais Esportes (68 Canais)',
    extraPrice: 39.90,
    extraPriceLabel: '+ R$ 39,90/mês',
    includedApps: [
      { name: 'Watch', logo: '/images/external/watch-.png' },
      { name: 'Awdio', logo: '/images/external/awdio.png' },
      { name: 'Universal+', logo: '/images/external/universal_plus.png' },
      { name: 'Premiere', logo: '/images/external/premiere.png' },
      { name: 'Combate', logo: '/images/external/combate.png' },
    ],
    includedAddons: ['premiere', 'combate'],
    referencePlan: 'POWER ESPORTE CLUBE',
  },
};

export interface AddonPricingDetails {
  addonId: string;
  name: string;
  originalPrice: number;
  effectivePrice: number;
  isIncluded: boolean;
  isPromo: boolean;
  promoBadge?: string;
  promoDescription?: string;
}

export interface TierResolutionResult {
  tier: EntertainmentTier;
  referencePlan: string;
  channelsImage: string;
  catalogImage: string;
  channelsTitle: string;
  channelsCount: number;
  effectiveAddonPrices: Record<string, AddonPricingDetails>;
  totalAddonPrice: number;
  internalCodes: string[];
}

export interface TvPlanReference {
  id: EntertainmentTier;
  tierCategory: string;
  referencePlan: string;
  channelsCount: number;
  content: string;
  extraPrice: number;
  extraCode?: string;
  condition?: string;
  channelsImage: string;
  catalogImage?: string;
  includedAddons: string[];
}

export const TV_PLANS_REFERENCE_TABLE: TvPlanReference[] = [
  {
    id: 'cortesia',
    tierCategory: 'Cortesia',
    referencePlan: 'UP',
    channelsCount: 18,
    content: '18 canais abertos/cortesia',
    extraPrice: 0.00,
    channelsImage: '/images/external/tv_cortesia.png',
    catalogImage: '/images/external/cat_min.png',
    includedAddons: [],
  },
  {
    id: 'basico',
    tierCategory: 'Básico',
    referencePlan: 'HUB PLAY LOCAL PRO',
    channelsCount: 28,
    content: '28 canais + Watch + Awdio',
    extraPrice: 9.90,
    channelsImage: '/images/external/tv_basico.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: [],
  },
  {
    id: 'basico-telecine',
    tierCategory: 'Básico + Telecine',
    referencePlan: 'HUB ULTRA LOCAL PRO',
    channelsCount: 34,
    content: '34 canais (Telecine)',
    extraPrice: 19.90,
    channelsImage: '/images/external/tv_hub_ultra_local_pro.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['telecine'],
  },
  {
    id: 'essencial',
    tierCategory: 'Essencial',
    referencePlan: 'POWER PLAY',
    channelsCount: 68,
    content: '68 canais ao vivo',
    extraPrice: 29.90,
    channelsImage: '/images/external/tv_essencial.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: [],
  },
  {
    id: 'essencial-telecine',
    tierCategory: 'Essencial + Telecine',
    referencePlan: 'WATCH BLACK PREMIUM',
    channelsCount: 74,
    content: '74 canais (Telecine)',
    extraPrice: 39.90,
    channelsImage: '/images/external/tv_watch_black_premium.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['telecine'],
  },
  {
    id: 'essencial-max',
    tierCategory: 'Essencial + HBO Max',
    referencePlan: 'WATCH BLACK POWER PLAY',
    channelsCount: 68,
    content: '68 canais (HBO Max)',
    extraPrice: 49.90,
    channelsImage: '/images/external/tv_essencial.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['hboMax'],
  },
  {
    id: 'completo',
    tierCategory: 'Completo',
    referencePlan: 'POWER SELEÇÃO ESPORTES WBD',
    channelsCount: 93,
    content: '93 canais (Premiere e Combate)',
    extraPrice: 59.90,
    channelsImage: '/images/external/tv_completo.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['premiere', 'combate'],
  },
  {
    id: 'completo-telecine',
    tierCategory: 'Completo + Telecine',
    referencePlan: 'POWER ELITE WBD',
    channelsCount: 100,
    content: '100+ canais (Premiere, Combate e Telecine)',
    extraPrice: 69.90,
    channelsImage: '/images/external/completo_elite.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['premiere', 'combate', 'telecine'],
  },
  {
    id: 'completao-familia',
    tierCategory: 'Completão Família',
    referencePlan: 'POWER ELITE WBD + HBO Max',
    channelsCount: 100,
    content: '100+ canais (Premiere, Combate, Telecine e HBO Max)',
    extraPrice: 89.90,
    extraCode: 'HBO Max',
    channelsImage: '/images/external/completo_elite.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['premiere', 'combate', 'telecine', 'hboMax'],
  },
  {
    id: 'mais-cinema',
    tierCategory: 'Mais Cinema',
    referencePlan: 'WATCH BLACK CINEMA LOCAL PRO',
    channelsCount: 26,
    content: '26 canais + Telecine + HBO Max',
    extraPrice: 29.90,
    channelsImage: '/images/external/cinema.png',
    catalogImage: '/images/external/cat_completo.png',
    includedAddons: ['telecine', 'hboMax'],
  },
  {
    id: 'mais-esportes',
    tierCategory: 'Mais Esportes',
    referencePlan: 'POWER ESPORTE CLUBE',
    channelsCount: 68,
    content: '68 canais (Premiere e Combate)',
    extraPrice: 39.90,
    channelsImage: '/images/external/tv_power_esporte_clube.png',
    catalogImage: '/images/external/cat_medio.png',
    includedAddons: ['premiere', 'combate'],
  },
];

/**
 * Resolves the dynamic tier configuration with automatic bundle inclusion:
 * Addons already included in the selected TV package are marked as active with effectivePrice = 0.00.
 * Other addons retain their standard prices.
 */
export function resolveTierAndAddons(
  tier: EntertainmentTier = 'cortesia',
  activeAddonKeys: string[] | Record<string, boolean> = {}
): TierResolutionResult {
  const config = TIER_CONFIG[tier] || TIER_CONFIG['cortesia'];
  const includedSet = new Set<string>(config.includedAddons || []);

  const activeSet = new Set<string>(
    Array.isArray(activeAddonKeys)
      ? activeAddonKeys
      : Object.entries(activeAddonKeys)
          .filter(([_, active]) => active)
          .map(([k]) => k)
  );

  // Todo addon incluso no pacote é garantido como selecionado
  for (const inc of includedSet) {
    activeSet.add(inc);
  }

  const effectivePrices: Record<string, AddonPricingDetails> = {};
  for (const [key, addon] of Object.entries(PLAN_ADDONS)) {
    const isIncluded = includedSet.has(key);
    effectivePrices[key] = {
      addonId: key,
      name: addon.name,
      originalPrice: addon.price,
      effectivePrice: isIncluded ? 0.00 : addon.price,
      isIncluded,
      isPromo: isIncluded,
      promoBadge: isIncluded ? 'INCLUSO' : undefined,
      promoDescription: isIncluded ? 'Incluso no Pacote (R$ 0,00)' : undefined,
    };
  }

  const internalCodes: string[] = [];
  for (const key of activeSet) {
    const addon = PLAN_ADDONS[key];
    if (addon && !internalCodes.includes(addon.internalCode)) {
      internalCodes.push(addon.internalCode);
    }
  }

  // Soma apenas os addons ativos que NÃO estão inclusos no pacote de TV
  let totalAddonPrice = 0;
  for (const key of activeSet) {
    const details = effectivePrices[key];
    if (details && !details.isIncluded) {
      totalAddonPrice += details.effectivePrice;
    }
  }
  totalAddonPrice = Number(totalAddonPrice.toFixed(2));

  return {
    tier,
    referencePlan: config.referencePlan,
    channelsImage: config.channelsImage,
    catalogImage: config.catalogImage,
    channelsTitle: config.channelsTitle,
    channelsCount: config.channelsCount,
    effectiveAddonPrices: effectivePrices,
    totalAddonPrice,
    internalCodes,
  };
}

export interface BasePlanConfig {
  id: string;
  speed: string;
  speedNumber: number;
  unit: string;
  basePromoPrice: number; // Base promo price for Cortesia tier (e.g. 99.90 for 400 Mega)
  discountOffset?: number; // Promo discount relative to original price (default: 20.00)
  badge?: string;
  isPopular?: boolean;
  priorityTraffic?: boolean;
  slaHours?: number;
  targetAudience?: string;
  wifiBadge: string;
  benefits?: PlanBenefit[];
}

/**
 * Builds the complete pricing matrix dynamically from the basePromoPrice.
 * Ensures consistent math across all speeds and tiers.
 */
export function buildTierPricing(
  basePromoPrice: number,
  discountOffset: number = DEFAULT_PROMO_DISCOUNT
): ResidentialPlan['tierPricing'] {
  const tiers: EntertainmentTier[] = [
    'cortesia',
    'basico',
    'basico-telecine',
    'essencial',
    'essencial-telecine',
    'essencial-max',
    'completo',
    'completo-telecine',
    'completao-familia',
    'mais-cinema',
    'mais-esportes',
  ];
  const pricing: Partial<ResidentialPlan['tierPricing']> = {};

  for (const tier of tiers) {
    const config = TIER_CONFIG[tier];
    if (!config) continue;
    const promoPrice = Number((basePromoPrice + config.extraPrice).toFixed(2));
    const originalPrice = Number((promoPrice + discountOffset).toFixed(2));

    pricing[tier] = {
      originalPrice,
      promoPrice,
      channelsCount: config.channelsCount,
      includedApps: config.includedApps,
    };
  }

  return pricing as ResidentialPlan['tierPricing'];
}

/**
 * Factory to create a fully initialized ResidentialPlan
 */
export function createResidentialPlan(config: BasePlanConfig): ResidentialPlan {
  return {
    id: config.id,
    speed: config.speed,
    speedNumber: config.speedNumber,
    unit: config.unit,
    badge: config.badge,
    isPopular: config.isPopular,
    priorityTraffic: config.priorityTraffic,
    slaHours: config.slaHours,
    targetAudience: config.targetAudience,
    wifiBadge: config.wifiBadge,
    benefits: config.benefits || DEFAULT_BENEFITS,
    tierPricing: buildTierPricing(
      config.basePromoPrice,
      config.discountOffset ?? DEFAULT_PROMO_DISCOUNT
    ),
  };
}

/**
 * Base configuration for residential fiber plans.
 * Apenas 400 Mega e 800 Mega conforme alinhado (sem 1 Giga).
 */
export const BASE_RESIDENTIAL_PLANS_CONFIG: BasePlanConfig[] = [
  {
    id: 'plan-400-mega',
    speed: '400',
    speedNumber: 400,
    unit: 'Mega',
    basePromoPrice: 99.90, // Cortesia: R$ 99,90
    wifiBadge: '+ WI-FI PLUS',
  },
  {
    id: 'plan-800-mega',
    speed: '800',
    speedNumber: 800,
    unit: 'Mega',
    basePromoPrice: 129.90, // Cortesia: R$ 129,90 (+R$ 30,00)
    badge: 'MAIS ESCOLHIDO',
    isPopular: true,
    wifiBadge: '+ WI-FI DE ALTA CAPACIDADE',
  },
];

/**
 * Generated list of residential plans ready for UI consumption
 */
export const RESIDENTIAL_PLANS: ResidentialPlan[] = BASE_RESIDENTIAL_PLANS_CONFIG.map(createResidentialPlan);

/**
 * Dynamic Calculation Engine / Planômetro
 * Calculates full price breakdown for any plan, tier, addons, and custom promo discounts.
 */
export interface PlanometerResult {
  planId: string;
  speed: string;
  unit: string;
  speedNumber: number;
  tier: EntertainmentTier;
  tierLabel: string;
  referencePlan: string;
  basePrice: number;
  tierExtra: number;
  addonTotal: number;
  promoPrice: number;
  originalPrice: number;
  monthlySavings: number;
  formattedPromoPrice: string;
  formattedOriginalPrice: string;
  channelsCount: number;
  channelsDescription: string;
  channelsImage: string;
  channelsTitle: string;
  includedApps: { name: string; logo: string }[];
  activeAddonsList: PlanAddon[];
}

export function calculatePlanometer(
  planOrSpeed: ResidentialPlan | number,
  tier: EntertainmentTier = 'cortesia',
  activeAddonKeys: string[] | Record<string, boolean> = {},
  customDiscountOffset: number = DEFAULT_PROMO_DISCOUNT
): PlanometerResult {
  let plan: ResidentialPlan;
  if (typeof planOrSpeed === 'number') {
    plan = RESIDENTIAL_PLANS.find((p) => p.speedNumber === planOrSpeed) || RESIDENTIAL_PLANS[0];
  } else {
    plan = planOrSpeed;
  }

  const basePromoPrice = plan.tierPricing.cortesia.promoPrice;
  const tierConfig = TIER_CONFIG[tier || 'cortesia'];
  const tierExtra = tierConfig.extraPrice;

  // Resolve tier and addons dynamically
  const resolution = resolveTierAndAddons(tier || 'cortesia', activeAddonKeys);
  const addonTotal = resolution.totalAddonPrice;

  let activeKeys: string[] = [];
  if (Array.isArray(activeAddonKeys)) {
    activeKeys = activeAddonKeys;
  } else {
    activeKeys = Object.entries(activeAddonKeys)
      .filter(([_, active]) => active)
      .map(([k]) => k);
  }

  const activeAddonsList = activeKeys.map((k) => PLAN_ADDONS[k]).filter(Boolean);

  const promoPrice = Number((basePromoPrice + tierExtra + addonTotal).toFixed(2));
  const originalPrice = Number((promoPrice + customDiscountOffset).toFixed(2));
  const monthlySavings = Number((originalPrice - promoPrice).toFixed(2));

  return {
    planId: plan.id,
    speed: plan.speed,
    unit: plan.unit,
    speedNumber: plan.speedNumber,
    tier,
    tierLabel: tierConfig.label,
    referencePlan: resolution.referencePlan,
    basePrice: basePromoPrice,
    tierExtra,
    addonTotal,
    promoPrice,
    originalPrice,
    monthlySavings,
    formattedPromoPrice: `R$ ${promoPrice.toFixed(2).replace('.', ',')}`,
    formattedOriginalPrice: `R$ ${originalPrice.toFixed(2).replace('.', ',')}`,
    channelsCount: resolution.channelsCount,
    channelsDescription: tierConfig.description,
    channelsImage: resolution.channelsImage,
    channelsTitle: resolution.channelsTitle,
    includedApps: tierConfig.includedApps,
    activeAddonsList,
  };
}

/**
 * Format helper for currency (BRL)
 */
export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

/**
 * Helper to generate promotional combo payloads for marketing landing pages & campaigns
 */
export function generatePromoCombo(
  speedNumber: number,
  tier: EntertainmentTier = 'basico',
  addonKeys: string[] = [],
  customDiscountOffset: number = DEFAULT_PROMO_DISCOUNT
) {
  return calculatePlanometer(speedNumber, tier, addonKeys, customDiscountOffset);
}
