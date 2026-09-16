import { Eye, Smartphone, Tag, Video, QrCode, Shield, CheckCircle2, Lock, Bell, Wifi, Sparkles, Building, Home, Users } from 'lucide-react';

export type GuardSegment = 'residencial' | 'condominio' | 'empresarial';
export type GuardModule = 'vision' | 'intercom' | 'track';

// --- MÓDULO VISION (CÂMERAS E GRAVAÇÃO EM NUVEM) ---
export interface GuardCameraPlan {
  id: string;
  name: string;
  retentionDays: number;
  priceComodato: number; // Preço por câmera com equipamento em comodato incluso
  priceBYOD: number | null; // Preço para quem já possui câmera própria (apenas nuvem)
  isPopular?: boolean;
  badge?: string;
  description: string;
  features: string[];
}

export const GUARD_CAMERA_PLANS: GuardCameraPlan[] = [
  {
    id: 'camera-3d',
    name: '3 Dias de Gravação',
    retentionDays: 3,
    priceComodato: 39.9,
    priceBYOD: null, // Apenas comodato
    description: 'Ideal para residências e pequenos comércios com fluxo diário.',
    features: [
      'Gravação contínua 24h na nuvem por 3 dias',
      'Câmera Wi-Fi Full HD inteligente em comodato',
      'Visão noturna com infravermelho nítido',
      'Alertas de movimento direto no celular',
      'Acesso ao vivo e gravações pelo App Nuvv Guard',
      'Garantia e substituição rápida pela Nuvv',
    ],
  },
  {
    id: 'camera-7d',
    name: '7 Dias de Gravação',
    retentionDays: 7,
    priceComodato: 44.9,
    priceBYOD: 19.9, // Câmera própria: R$ 19,90
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    description: 'O plano perfeito para uma semana inteira de histórico protegido.',
    features: [
      'Gravação contínua 24h na nuvem por 7 dias',
      'Disponível com Câmera Nuvv ou com sua própria câmera',
      'Linha do tempo prática com busca por horários',
      'Download e compartilhamento rápido de trechos em Full HD',
      'Alertas de movimento instantâneos no smartphone',
      'Imagens 100% blindadas mesmo em caso de furto do equipamento',
    ],
  },
  {
    id: 'camera-15d',
    name: '15 Dias de Gravação',
    retentionDays: 15,
    priceComodato: 59.9,
    priceBYOD: null,
    description: 'Segurança estendida para quem viaja com frequência ou tem comércio.',
    features: [
      'Gravação contínua 24h na nuvem por 15 dias',
      'Câmera Full HD em comodato com áudio bidirecional',
      'Histórico de duas semanas disponível em segundos',
      'Armazenamento redundante em Data Center Brasileiro certificado',
      'Notificações de movimento no celular',
      'Suporte técnico e manutenção inclusos',
    ],
  },
  {
    id: 'camera-30d',
    name: '30 Dias de Gravação',
    retentionDays: 30,
    priceComodato: 74.9,
    priceBYOD: 59.9, // Câmera própria: R$ 59,90
    badge: 'MÁXIMA COBERTURA',
    description: '1 mês completo de armazenamento em nuvem com alta conformidade.',
    features: [
      'Gravação contínua 24h na nuvem por 30 dias',
      'Disponível com Câmera Nuvv ou com sua própria câmera',
      'Histórico completo para residências, condomínios e comércios',
      'Exportação e visualização rápida no app',
      'Segurança jurídica e proteção contra vandalismo ou roubo',
      'Atendimento prioritário de suporte',
    ],
  },
];

// --- MÓDULO INTERCOM (INTERFONIA VIRTUAL VIA QR CODE) ---
export interface GuardIntercomResidentialPlan {
  oneTimePrice: number; // R$ 79,90 taxa única (placa inclusa)
  monthlyPriceCustomer: number; // R$ 0,00 para cliente Nuvv Fibra
  postCancelMonthlyPrice: number; // R$ 9,90/mês caso cancele o serviço Nuvv
  promoOneTimePrice: number;
  monthlyPrice: number;
  activationFee: number;
}

export const GUARD_INTERCOM_RESIDENTIAL: GuardIntercomResidentialPlan = {
  oneTimePrice: 79.9,
  monthlyPriceCustomer: 0,
  postCancelMonthlyPrice: 9.9,
  promoOneTimePrice: 79.9,
  monthlyPrice: 0,
  activationFee: 79.9,
};

export interface GuardIntercomCondoTier {
  id: string;
  minAptos: number;
  maxAptos: number | null;
  label: string;
  pricePerApto: number;
  activationFee: number; // R$ 0,00 para condomínios
}

export const GUARD_INTERCOM_CONDO_TIERS: GuardIntercomCondoTier[] = [
  {
    id: 'condo-8-24',
    minAptos: 8,
    maxAptos: 24,
    label: '8 a 24 apartamentos',
    pricePerApto: 7.9,
    activationFee: 0,
  },
  {
    id: 'condo-25-60',
    minAptos: 25,
    maxAptos: 60,
    label: '25 a 60 apartamentos',
    pricePerApto: 6.9,
    activationFee: 0,
  },
  {
    id: 'condo-61-120',
    minAptos: 61,
    maxAptos: 120,
    label: '61 a 120 apartamentos',
    pricePerApto: 5.9,
    activationFee: 0,
  },
  {
    id: 'condo-120-plus',
    minAptos: 121,
    maxAptos: null,
    label: 'Mais de 120 apartamentos',
    pricePerApto: 4.9,
    activationFee: 0,
  },
];

// --- MÓDULO TRACK / TAG (RASTREAMENTO DE CRIANÇAS, PETS E OBJETOS) ---
export interface GuardTrackPlan {
  oneTimePricePerTag: number; // R$ 79,90 taxa única por cada Tag
  monthlyPriceCustomer: number; // R$ 0,00 para cliente Nuvv Fibra
  postCancelMonthlyPrice: number; // R$ 9,90/mês caso cancele o serviço Nuvv
  maxDevicesCovered: number; // Até 8 dispositivos por R$ 9,90/mês
  nonCustomerAnnualPrice: number; // R$ 79,90 ao ano com Tag inclusa para não clientes Nuvv
  promoOneTimePrice: number;
  promoBulkPrice3Plus: number;
  monthlyPrice: number;
  activationFee: number;
}

export const GUARD_TRACK_PLAN: GuardTrackPlan = {
  oneTimePricePerTag: 79.9,
  monthlyPriceCustomer: 0,
  postCancelMonthlyPrice: 9.9,
  maxDevicesCovered: 8,
  nonCustomerAnnualPrice: 79.9,
  promoOneTimePrice: 79.9,
  promoBulkPrice3Plus: 79.9,
  monthlyPrice: 0,
  activationFee: 79.9,
};

// --- MARCAS HOMOLOGADAS (BYOD) ---
export interface CompatibleBrand {
  name: string;
  category: string;
  supportedProtocols: string;
}

export const COMPATIBLE_BRANDS: CompatibleBrand[] = [
  { name: 'Intelbras', category: 'Câmeras IP / DVR / NVR', supportedProtocols: 'RTSP / ONVIF' },
  { name: 'Hikvision', category: 'Câmeras IP / DVR', supportedProtocols: 'RTSP / ONVIF' },
  { name: 'Dahua', category: 'Câmeras IP / DVR', supportedProtocols: 'RTSP / ONVIF' },
  { name: 'Giga Security', category: 'DVRs Híbridos / IP', supportedProtocols: 'RTSP / ONVIF' },
  { name: 'TP-Link (Tapo)', category: 'Câmeras Wi-Fi', supportedProtocols: 'ONVIF Profile S' },
  { name: 'Positivo', category: 'Câmeras Smart Wi-Fi', supportedProtocols: 'RTSP / ONVIF' },
  { name: 'Padrão ONVIF', category: 'Qualquer marca homologada', supportedProtocols: 'Perfil S / G' },
];

// --- VANTAGENS DO INTERFONE VIRTUAL VS FÍSICO ---
export const INTERCOM_COMPARISON = [
  {
    benefit: 'Obras e Quebra-paredes',
    virtual: 'Zero obra. Instalação limpa em minutos sem quebrar nada.',
    physical: 'Necessita quebrar calçadas, paredes e passar eletrodutos.',
  },
  {
    benefit: 'Atendimento fora de casa',
    virtual: 'Atenda pelo celular de qualquer lugar do mundo com vídeo e áudio.',
    physical: 'Só toca dentro de casa. Se estiver fora, você perde a visita/encomenda.',
  },
  {
    benefit: 'Resistência a Chuva e Raios',
    virtual: 'Placa resistente sem fiação eletrônica externa sujeita a queima.',
    physical: 'Placas e interfones queimam com facilidade em chuvas e descargas elétricas.',
  },
  {
    benefit: 'Abertura Remota de Portão',
    virtual: 'Abra a fechadura pelo smartphone com autenticação e segurança.',
    physical: 'Exige caminhar até o interfone da parede ou ter chave física.',
  },
  {
    benefit: 'Instalação do Visitante',
    virtual: 'Não precisa baixar app! O visitante apenas aponta a câmera para o QR Code.',
    physical: 'Toca campainha analógica sem identificação visual prévia.',
  },
  {
    benefit: 'Custo de Manutenção',
    virtual: 'Praticamente nulo. Sem cabos partidos ou interfones estragados.',
    physical: 'Alto custo recorrente de técnicos e troca de fiação em condomínios.',
  },
];
