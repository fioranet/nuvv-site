export interface SlaItem {
  id: string;
  serviceType: string;
  description: string;
  timeLimit: string;
  highlight?: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'pdf' | 'link';
  fileUrl: string;
}

export interface ManualItem {
  id: string;
  title: string;
  category: 'streaming' | 'wifi' | 'telefonia' | 'empresarial';
  target: 'residencial' | 'empresarial' | 'ambos';
  icon: string;
  link: string;
}

export interface CirSlaItem {
  id: string;
  category: 'empresarial' | 'corporativo' | 'residencial' | 'servicos';
  serviceType: string;
  cirGuarantee: string;
  cirValueNumber: number;
  slaTimeLimit: string;
  slaHours: number;
  ipType: string;
  description: string;
  recommendedFor: string;
  badge?: string;
  isPopular?: boolean;
}

export const CIR_SLA_TABLE: CirSlaItem[] = [
  {
    id: 'sla-res-standard',
    category: 'residencial',
    serviceType: 'Fibra Residencial (400 a 800 Mega)',
    cirGuarantee: '>40% (Superior à média)',
    cirValueNumber: 45,
    slaTimeLimit: 'Até 48h',
    slaHours: 48,
    ipType: 'IP Dinâmico',
    description: 'Banda larga residencial FTTH de alta velocidade para streaming 4K, downloads e navegação familiar.',
    recommendedFor: 'Residências, home office básico e entretenimento digital.',
  },
  {
    id: 'sla-res-1giga',
    category: 'residencial',
    serviceType: 'Fibra Residencial 1 Giga Pro',
    cirGuarantee: 'Alta Prioridade QoS',
    cirValueNumber: 60,
    slaTimeLimit: 'Até 24h (Prioritário)',
    slaHours: 24,
    ipType: 'IP Dinâmico com QoS',
    description: 'Plano residencial de ultra performance com roteamento de baixa latência e atendimento técnico prioritário.',
    recommendedFor: 'Gamers competitivos, criadores de conteúdo, streamers e profissionais remotos.',
    badge: 'SLA 24H VIP',
  },
  {
    id: 'sla-emp-standard',
    category: 'empresarial',
    serviceType: 'Empresarial (500 e 700 Mega)',
    cirGuarantee: '50% a 60% Garantido',
    cirValueNumber: 55,
    slaTimeLimit: 'Até 48h',
    slaHours: 48,
    ipType: 'IPv6 /48 Fixo + IP Dinâmico',
    description: 'Conexão para pequenos e médios negócios com garantia de banda muito superior ao padrão residencial.',
    recommendedFor: 'Comércios, escritórios, consultórios e lojas com fluxo diário de transações.',
  },
  {
    id: 'sla-emp-1giga',
    category: 'empresarial',
    serviceType: 'Empresarial 1 Giga Pro',
    cirGuarantee: '65% Garantido (Superior)',
    cirValueNumber: 65,
    slaTimeLimit: 'Até 24h (Prioritário)',
    slaHours: 24,
    ipType: 'IPv6 /48 Fixo + Roteamento VIP',
    description: 'Máxima performance empresarial com garantia contratual de 65% de banda e SLA 24h prioritário.',
    recommendedFor: 'Empresas em expansão, transferências em nuvem e trabalho colaborativo intenso.',
    badge: 'CIR 65% • SLA 24H',
    isPopular: true,
  },
  {
    id: 'sla-semi-dedicado',
    category: 'corporativo',
    serviceType: 'Semi-Dedicado Corporativo',
    cirGuarantee: '80% Garantido Contínuo',
    cirValueNumber: 80,
    slaTimeLimit: 'Até 12h',
    slaHours: 12,
    ipType: '1 IP Fixo IPv4 (/32) + IPv6',
    description: 'Conexão avançada para infraestruturas locais, servidores, VPNs seguras e sistemas de CFTV em nuvem.',
    recommendedFor: 'Médias empresas, indústrias, servidores locais e interligação matriz-filial.',
    badge: 'CIR 80% • 1 IP FIXO',
  },
  {
    id: 'sla-link-dedicado',
    category: 'corporativo',
    serviceType: 'Link Dedicado 100% Simétrico',
    cirGuarantee: '100% Garantido (1:1 Full)',
    cirValueNumber: 100,
    slaTimeLimit: 'Até 4h (Missão Crítica)',
    slaHours: 4,
    ipType: 'Bloco IPv4 Fixo + IPv6 + BGP',
    description: 'Conexão corporativa exclusiva de altíssima disponibilidade, redundância em anel óptico e NOC 24/7.',
    recommendedFor: 'Grandes corporações, Data Centers, hospitais, financeiras e operações críticas.',
    badge: 'CIR 100% • SLA 4H',
    isPopular: true,
  },
  {
    id: 'sla-telefonia-pabx',
    category: 'servicos',
    serviceType: 'Telefonia SIP / PABX Cloud',
    cirGuarantee: 'QoS Dedicado de Voz',
    cirValueNumber: 100,
    slaTimeLimit: 'Até 24h',
    slaHours: 24,
    ipType: 'Tronco SIP / Servidor Cloud',
    description: 'Comunicação empresarial em nuvem com alta fidelidade de áudio, filas de atendimento e ramais.',
    recommendedFor: 'Call centers, escritórios de advocacia, clínicas e equipes de vendas.',
  },
];

export const SLA_TABLE: SlaItem[] = [
  {
    id: 'sla-res',
    serviceType: 'BDL Residencial',
    description: 'Planos residenciais de fibra óptica (FTTH)',
    timeLimit: 'Até 48 horas',
  },
  {
    id: 'sla-emp',
    serviceType: 'BDL Empresarial',
    description: 'Planos empresariais de fibra óptica (FTTH)',
    timeLimit: 'Até 48 horas',
  },
  {
    id: 'sla-pro',
    serviceType: 'BDL Empresa Pro (1 Giga)',
    description: 'Planos PME com CIR 65% e suporte prioritário',
    timeLimit: 'Até 24 horas',
    highlight: true,
  },
  {
    id: 'sla-semi',
    serviceType: 'Semi-Dedicado',
    description: 'Conexão com 80% de garantia de banda e 1 IP Fixo IPv4',
    timeLimit: 'Até 12 horas',
    highlight: true,
  },
  {
    id: 'sla-dedicado',
    serviceType: 'Link Dedicado',
    description: 'Conexão 100% garantida (1:1) com SLA de 4 horas',
    timeLimit: 'Até 4 horas',
    highlight: true,
  },
  {
    id: 'sla-pabx',
    serviceType: 'Telefonia / PABX Cloud',
    description: 'Problemas de voz digital, URA e ramais corporativos',
    timeLimit: 'Até 24 horas',
  },
];

export const CONTRACTS_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-scm',
    title: 'Contrato de Prestação SCM',
    subtitle: 'Termos do Serviço de Comunicação Multimídia registrado em cartório',
    type: 'pdf',
    fileUrl: '#',
  },
  {
    id: 'doc-sva',
    title: 'Termo de Adesão SVA',
    subtitle: 'Serviços de Valor Adicionado (Aplicativos e Streamings parceiros)',
    type: 'pdf',
    fileUrl: '#',
  },
  {
    id: 'doc-anatel',
    title: 'Licença Anatel',
    subtitle: 'Ato de autorização oficial de funcionamento e outorga SCM',
    type: 'link',
    fileUrl: 'https://sistemas.anatel.gov.br',
  },
];

export const USER_MANUALS: ManualItem[] = [
  // Residencial - Streaming
  {
    id: 'man-watch',
    title: 'Como realizar o primeiro acesso ao app da Watch',
    category: 'streaming',
    target: 'residencial',
    icon: 'PlayCircle',
    link: 'https://descubra.watch.tv.br/tutorial/como-realizar-o-primeiro-acesso-a-watch-brasil/',
  },
  {
    id: 'man-samsung',
    title: 'Como instalar Watch na minha TV Samsung',
    category: 'streaming',
    target: 'residencial',
    icon: 'Tv',
    link: 'https://descubra.watch.tv.br/tutorial/como-instalar-watch-na-minha-tv-samsung/',
  },
  {
    id: 'man-roku',
    title: 'Como baixar a Watch na Roku Express',
    category: 'streaming',
    target: 'residencial',
    icon: 'Radio',
    link: 'https://descubra.watch.tv.br/tutoriais/#:~:text=Saiba%20como%20baixar%20a%20Watch%20na%20Roku%20Express',
  },
  {
    id: 'man-hbo',
    title: 'Como acessar a HBO Max com a conta Watch',
    category: 'streaming',
    target: 'residencial',
    icon: 'Film',
    link: 'https://descubra.watch.tv.br/tutorial/como-acessar-a-max-com-a-minha-conta-watch-brasil/',
  },
  {
    id: 'man-lg',
    title: 'Como instalar Watch na minha TV LG',
    category: 'streaming',
    target: 'residencial',
    icon: 'Tv',
    link: 'https://descubra.watch.tv.br/tutorial/como-instalar-watch-na-minha-tv-lg/',
  },
  {
    id: 'man-android',
    title: 'Como instalar o APPTV da Watch na sua Android TV',
    category: 'streaming',
    target: 'residencial',
    icon: 'Smartphone',
    link: 'https://descubra.watch.tv.br/tutoriais/#:~:text=Saiba%20como%20instalar%20o%20APPTV%20da%20Watch%20Brasil%20na%20sua%20Android%20TV',
  },

  // Residencial - Wi-Fi
  {
    id: 'man-wifi6',
    title: 'Manual do Roteador Wi-Fi 6 Gigabit',
    category: 'wifi',
    target: 'residencial',
    icon: 'Wifi',
    link: '#',
  },
  {
    id: 'man-pos',
    title: 'Dicas de posicionamento do roteador para máximo sinal',
    category: 'wifi',
    target: 'residencial',
    icon: 'FileText',
    link: '#',
  },
  {
    id: 'man-pais',
    title: 'Configurando Controle dos Pais e Segurança Digital',
    category: 'wifi',
    target: 'residencial',
    icon: 'Shield',
    link: '#',
  },

  // Telefonia
  {
    id: 'man-codigos',
    title: 'Guia de códigos de operadora e chamadas',
    category: 'telefonia',
    target: 'ambos',
    icon: 'Phone',
    link: '#',
  },
  {
    id: 'man-sigame',
    title: 'Ativando e configurando o Siga-me no telefone fixo',
    category: 'telefonia',
    target: 'ambos',
    icon: 'PhoneForwarded',
    link: '#',
  },

  // Empresarial
  {
    id: 'man-pabx-app',
    title: 'Configuração do Softphone PABX no Celular e PC',
    category: 'empresarial',
    target: 'empresarial',
    icon: 'Cloud',
    link: '#',
  },
  {
    id: 'man-ura',
    title: 'Como gravar áudios e personalizar os menus da URA',
    category: 'empresarial',
    target: 'empresarial',
    icon: 'Headphones',
    link: '#',
  },
  {
    id: 'man-sip',
    title: 'Parâmetros de autenticação Tronco SIP e ATA Grandstream',
    category: 'empresarial',
    target: 'empresarial',
    icon: 'Server',
    link: '#',
  },
];
