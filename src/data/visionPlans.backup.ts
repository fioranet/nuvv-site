export type VisionSegment = 'residencial' | 'empresarial';

export interface VisionPlan {
  id: string;
  name: string;
  retentionDays: number;
  pricePerCamera: number;
  badge?: string;
  isPopular?: boolean;
  target: 'all' | 'residencial' | 'empresarial';
  shortDescription: string;
  features: string[];
}

export const COMODATO_PRICE_PER_CAMERA = 30.0;

export const VISION_PLANS: VisionPlan[] = [
  {
    id: 'vision-free',
    name: 'Ao Vivo Free',
    retentionDays: 0,
    pricePerCamera: 0.0,
    target: 'all',
    badge: '100% GRÁTIS',
    shortDescription: 'Visualização ao vivo sem gravação na nuvem.',
    features: [
      'Visualização ao vivo em tempo real',
      'Acesso pelo App Nuvv Vision (iOS e Android)',
      'Acesso via navegador web no computador',
      'Sem limite de dispositivos conectados',
      'Zero configuração de roteador ou modem',
    ],
  },
  {
    id: 'vision-3d',
    name: '3 Dias de Gravação',
    retentionDays: 3,
    pricePerCamera: 14.9,
    target: 'residencial',
    shortDescription: 'Gravação contínua na nuvem por 3 dias.',
    features: [
      'Gravação contínua 24h em Nuvem por 3 dias',
      'Linha do tempo inteligente com busca rápida',
      'Download e compartilhamento fácil de vídeos',
      'Detecção de movimento e notificações no celular',
      'Imagens protegidas mesmo se a câmera for danificada',
    ],
  },
  {
    id: 'vision-7d',
    name: '7 Dias de Gravação',
    retentionDays: 7,
    pricePerCamera: 22.9,
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    target: 'all',
    shortDescription: 'Histórico de 7 dias com máxima segurança.',
    features: [
      'Gravação contínua 24h em Nuvem por 7 dias',
      'Inteligência artificial para filtro de eventos',
      'Download de vídeos em alta resolução Full HD',
      'Mosaico ao vivo de múltiplas câmeras',
      'Backup automático em Data Center Nacional',
    ],
  },
  {
    id: 'vision-15d',
    name: '15 Dias de Gravação',
    retentionDays: 15,
    pricePerCamera: 34.9,
    target: 'empresarial',
    badge: 'ALTA RETENÇÃO',
    shortDescription: 'Ideal para lojas, clínicas e escritórios.',
    features: [
      'Gravação contínua 24h em Nuvem por 15 dias',
      'Gestão de múltiplos usuários com níveis de permissão',
      'Linha do tempo avançada com marcação de horários',
      'Exportação de relatórios e registros para auditoria',
      'Armazenamento redundante de alta disponibilidade',
    ],
  },
  {
    id: 'vision-30d',
    name: '30 Dias de Gravação',
    retentionDays: 30,
    pricePerCamera: 49.9,
    target: 'empresarial',
    badge: 'CORPORATIVO',
    shortDescription: 'Máxima retenção para indústrias e empresas.',
    features: [
      'Gravação contínua 24h em Nuvem por 30 dias',
      'Conformidade total com auditorias e seguradoras',
      'Gestão centralizada de múltiplas filiais e galpões',
      'Acesso seguro criptografado ponta a ponta',
      'Suporte técnico e monitoramento prioritário',
    ],
  },
];

export interface CompatibleBrand {
  name: string;
  category: string;
  logoText: string;
  note: string;
}

export const COMPATIBLE_BRANDS: CompatibleBrand[] = [
  {
    name: 'Intelbras',
    category: 'Câmeras IP, Wi-Fi e DVRs',
    logoText: 'intelbras',
    note: 'Compatibilidade nativa com toda a linha Mibo, VIP e DVRs Multi HD.',
  },
  {
    name: 'Hikvision',
    category: 'Câmeras IP e NVRs',
    logoText: 'HIKVISION',
    note: 'Suporte completo a câmeras IP, DVRs Turbo HD e sistemas de vigilância.',
  },
  {
    name: 'TP-Link Tapo',
    category: 'Câmeras Wi-Fi Inteligentes',
    logoText: 'tp-link tapo',
    note: 'Integração direta com câmeras residenciais e comerciais Tapo C200, C310, etc.',
  },
  {
    name: 'Dahua',
    category: 'Câmeras e Gravadores',
    logoText: 'dahua',
    note: 'Suporte a linhas residenciais e industriais Dahua.',
  },
  {
    name: 'Giga Security',
    category: 'Linha Corporativa e Residencial',
    logoText: 'GIGA',
    note: 'Conexão simplificada com gravadores e câmeras Giga.',
  },
  {
    name: 'Ezviz',
    category: 'Câmeras Wi-Fi Residenciais',
    logoText: 'EZVIZ',
    note: 'Compatível com modelos populares de monitoramento sem fio.',
  },
  {
    name: 'Protocolos Padrão',
    category: 'ONVIF / RTSP / RTMP',
    logoText: 'UNIVERSAL',
    note: 'Funciona com qualquer câmera ou gravador compatível com padrões abertos.',
  },
];

export const VISION_SEGMENTS_INFO = {
  residencial: {
    title: 'Nuvv Vision para sua Casa ou Família',
    subtitle: 'Mantenha quem você ama e seu patrimônio protegidos sem complicação técnica.',
    highlights: [
      {
        title: 'Proteção Antifurto Real',
        description: 'Em sistemas tradicionais com DVR, se o ladrão levar o aparelho você perde todas as gravações. No Nuvv Vision, as imagens já estão salvas na nuvem no mesmo segundo.',
      },
      {
        title: 'Zero Configuração de Roteador',
        description: 'Você não precisa abrir portas no modem, nem pagar por IP fixo ou configurar DDNS. Ligou a câmera na tomada e na internet, já está gravando.',
      },
      {
        title: 'Tudo no seu Smartphone',
        description: 'Acompanhe ao vivo, receba alertas no celular e compartilhe gravações pelo WhatsApp com facilidade.',
      },
    ],
  },
  empresarial: {
    title: 'Nuvv Vision para seu Negócio ou Indústria',
    subtitle: 'Auditoria, segurança patrimonial e gestão visual centralizada para empresas de todos os portes.',
    highlights: [
      {
        title: 'Gestão Multi-Unidades',
        description: 'Monitore matriz, filiais, estoques e caixas em uma única tela central, com controle de permissões por funcionário.',
      },
      {
        title: 'Retenção Estendida de 15 a 30 Dias',
        description: 'Histórico contínuo para atendimento a normas de auditoria, fiscalização, seguradoras e controle de processos internos.',
      },
      {
        title: 'Comodato de Câmeras Sem Custo Inicial',
        description: 'Fornecemos câmeras Full HD de alta durabilidade em comodato por apenas R$ 30/mês por ponto, com manutenção inclusa.',
      },
    ],
  },
};
