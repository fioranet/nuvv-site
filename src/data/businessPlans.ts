export type BusinessCategory = 'banda-larga' | 'semi-dedicado' | 'link-dedicado' | 'banda-larga-pro';

export interface BusinessPlan {
  id: string;
  name: string;
  speed: string;
  unit: string;
  originalPrice?: number;
  promoPrice?: number;
  priceOnRequest?: boolean;
  priceNote?: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  slaHours?: number;
  cirGuarantee?: string;
  ipType?: string;
  symmetry?: string;
}

export interface PabxPlan {
  id: string;
  name: string;
  extensionCount: string;
  targetAudience: string;
  price: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface TelephonyPlan {
  id: string;
  name: string;
  price: number;
  badge?: string;
  isPopular?: boolean;
  subtitle: string;
  description: string;
  channelsCount: number;
  channelsInfo: string;
  callType: string;
  features: string[];
}

export interface BusinessTvPlan {
  id: string;
  name: string;
  price: number;
  channelsCount: number;
  badge?: string;
  isPopular?: boolean;
  description: string;
  subtitle: string;
  features: string[];
  referenceTierId: string;
}

export interface ConnectivityComparisonRow {
  feature: string;
  bandaLarga: string;
  semiDedicado: string;
  linkDedicado: string;
  highlight?: boolean;
}

export const CONNECTIVITY_COMPARISON: ConnectivityComparisonRow[] = [
  {
    feature: 'Garantia de Banda (CIR)',
    bandaLarga: '50% a 65% (acima dos 40% residencial)',
    semiDedicado: '80% garantida (alta estabilidade)',
    linkDedicado: '100% Real Garantida (CIR 1:1)',
    highlight: true,
  },
  {
    feature: 'Simetria (Download / Upload)',
    bandaLarga: 'Download prioritário',
    semiDedicado: 'Alta simetria de upload',
    linkDedicado: '100% Simétrico (Down = Up)',
    highlight: true,
  },
  {
    feature: 'Endereçamento IP',
    bandaLarga: 'IP Dinâmico corporativo',
    semiDedicado: '1 IP Fixo IPv4 Público (/32)',
    linkDedicado: 'Bloco de IPs Públicos (/30, /29, /28)',
  },
  {
    feature: 'SLA de Atendimento / Reparo',
    bandaLarga: '24h a 48h (Atendimento prioritário B2B)',
    semiDedicado: 'Até 12h contínuas',
    linkDedicado: 'Até 4h contratuais (24/7/365)',
    highlight: true,
  },
  {
    feature: 'Disponibilidade (Uptime)',
    bandaLarga: '99,0%',
    semiDedicado: '99,5%',
    linkDedicado: '99,9% com ressarcimento em contrato',
  },
  {
    feature: 'Monitoramento de Rede',
    bandaLarga: 'Reativo (sob chamado)',
    semiDedicado: 'Monitoramento NOC 24/7',
    linkDedicado: 'Monitoramento Proativo NOC 24/7/365',
  },
  {
    feature: 'Roteamento e Backbone',
    bandaLarga: 'Roteamento padrão corporativo',
    semiDedicado: 'Rotas otimizadas com baixa latência',
    linkDedicado: 'ASN Próprio, BGP Multihomed e IX.br direto',
  },
  {
    feature: 'Porte Recomendado',
    bandaLarga: 'PMEs, Lojas, Consultórios e Escritórios',
    semiDedicado: 'Empresas com Servidores, PDVs e VPNs',
    linkDedicado: 'Indústrias, Médias e Grandes Corporações',
  },
];

export const BUSINESS_PLANS: Record<BusinessCategory, BusinessPlan[]> = {
  'banda-larga': [
    {
      id: 'biz-start-400',
      name: 'Empresa Start',
      speed: '400',
      unit: 'Mega',
      originalPrice: 119.90,
      promoPrice: 99.90,
      slaHours: 48,
      cirGuarantee: '50%',
      ipType: 'IP Dinâmico',
      symmetry: 'Alta velocidade',
      features: [
        'Wi-Fi Plus Corporativo',
        'IP Dinâmico com Baixa Latência',
        '1 Linha Telefônica Fixa Ilimitada Brasil Inclusa',
        'Suporte Comercial Prioritário',
        'Instalação 100% Fibra Óptica Grátis',
      ],
    },
    {
      id: 'biz-plus-800',
      name: 'Empresa Plus',
      speed: '800',
      unit: 'Mega',
      originalPrice: 149.90,
      promoPrice: 129.90,
      isPopular: true,
      badge: 'MAIS ESCOLHIDO',
      slaHours: 48,
      cirGuarantee: '50%',
      ipType: 'IP Dinâmico',
      symmetry: 'Alta velocidade',
      features: [
        'Wi-Fi Plus Corporativo de Alta Densidade',
        'IP Dinâmico Otimizado para Cloud & PDV',
        '1 Linha Telefônica Fixa Ilimitada Brasil Inclusa',
        'Atendimento Prioritário em Horário Comercial',
        'Instalação 100% Fibra Óptica Grátis',
      ],
    },
    {
      id: 'biz-max-1000',
      name: 'Empresa Max 1 Giga',
      speed: '1',
      unit: 'Giga',
      originalPrice: 209.90,
      promoPrice: 189.90,
      badge: 'MÁXIMA POTÊNCIA',
      slaHours: 24,
      cirGuarantee: '65%',
      ipType: 'IP Dinâmico',
      symmetry: 'Ultravelocidade',
      features: [
        'SLA Prioritário de 24h (Metade do tempo de reparo)',
        'Garantia de Banda de 65% (CIR Superior)',
        'Wi-Fi 6 Ultra Alta Densidade para Múltiplos Dispositivos',
        'Tráfego Ilimitado sem Franquia de Dados',
        '1 Linha Telefônica Fixa Ilimitada Brasil Inclusa',
        'Suporte Técnico Comercial Dedicado',
        'Instalação 100% Fibra Óptica Grátis',
      ],
    },
  ],
  'semi-dedicado': [
    {
      id: 'biz-semi-300',
      name: 'Semi-Dedicado 300M',
      speed: '300',
      unit: 'Mega',
      originalPrice: 219.90,
      promoPrice: 199.90,
      slaHours: 12,
      cirGuarantee: '80% Garantida',
      ipType: '1 IP Fixo IPv4 (/32)',
      symmetry: 'Upload Reforçado',
      features: [
        '1 IP Fixo IPv4 Válido e Público (/32)',
        'Garantia de Banda de 80% (CIR)',
        'SLA de Atendimento e Reparo em até 12 Horas',
        'Monitoramento Ativo pelo NOC 24/7',
        'Ideal para Servidores Locais, CFTV e VPN',
      ],
    },
    {
      id: 'biz-semi-500',
      name: 'Semi-Dedicado 500M',
      speed: '500',
      unit: 'Mega',
      originalPrice: 279.90,
      promoPrice: 259.90,
      isPopular: true,
      badge: 'MELHOR CUSTO-BENEFÍCIO',
      slaHours: 12,
      cirGuarantee: '80% Garantida',
      ipType: '1 IP Fixo IPv4 (/32)',
      symmetry: 'Upload Elevado',
      features: [
        '1 IP Fixo IPv4 Válido e Público (/32)',
        'Garantia de Banda de 80% (CIR)',
        'SLA de Atendimento e Reparo em até 12 Horas',
        'Monitoramento Ativo pelo NOC 24/7',
        'Ideal para Servidores Locais, CFTV e VPN',
      ],
    },
    {
      id: 'biz-semi-700',
      name: 'Semi-Dedicado 700M',
      speed: '700',
      unit: 'Mega',
      originalPrice: 419.90,
      promoPrice: 399.90,
      badge: 'ALTA DISPONIBILIDADE',
      slaHours: 12,
      cirGuarantee: '80% Garantida',
      ipType: '1 IP Fixo IPv4 (/32)',
      symmetry: 'Simetria Estendida',
      features: [
        '1 IP Fixo IPv4 Válido e Público (/32)',
        'Garantia de Banda de 80% (CIR)',
        'SLA de Reparo em até 12 Horas',
        'Monitoramento NOC 24/7 em Tempo Real',
        'Gerente de Contas e Suporte Engenharia B2B',
      ],
    },
  ],
  'link-dedicado': [
    {
      id: 'biz-dedicado-50',
      name: 'Link Dedicado Enterprise 50M',
      speed: '50',
      unit: 'Mega',
      priceOnRequest: true,
      priceNote: 'Projeto sob Medida',
      slaHours: 4,
      cirGuarantee: '100% Simétrico Real',
      ipType: 'Bloco /30 ou /29 IPv4',
      symmetry: '100% Simétrico (1:1)',
      features: [
        '100% de Garantia de Banda Full Duplex (1:1)',
        'SLA de Reparo Contratual em até 4 Horas',
        'Bloco de IPs Públicos Fixos Válidos (/30 ou /29)',
        'Conexão Direta ao Backbone Óptico e IX.br',
        'Monitoramento Proativo pelo NOC 24/7/365',
      ],
    },
    {
      id: 'biz-dedicado-500',
      name: 'Link Dedicado Enterprise 500M',
      speed: '500',
      unit: 'Mega',
      priceOnRequest: true,
      priceNote: 'Projeto sob Medida',
      isPopular: true,
      badge: 'CARRIER GRADE',
      slaHours: 4,
      cirGuarantee: '100% Simétrico Real',
      ipType: 'Bloco /30 ou /29 IPv4',
      symmetry: '100% Simétrico (1:1)',
      features: [
        '100% de Garantia de Banda Full Duplex (1:1)',
        'SLA de Atendimento em até 4 Horas (99,9% Uptime)',
        'ASN Próprio, BGP Multihomed e Rotas Redundantes',
        'Porta Óptica Exclusiva sem Compartilhamento',
        'Gerente de Contas e Engenheiro de Telecom Dedicado',
      ],
    },
    {
      id: 'biz-dedicado-custom',
      name: 'Link Dedicado 1 Giga a 10 Gbps',
      speed: '1 a 10',
      unit: 'Gbps',
      priceOnRequest: true,
      priceNote: 'Engenharia Customizada',
      badge: 'MISSÃO CRÍTICA',
      slaHours: 4,
      cirGuarantee: '100% Simétrico Real',
      ipType: 'Bloco /30 /29 IPv4 ou Customizados /28 /27',
      symmetry: '100% Simétrico (1:1)',
      features: [
        'Capacidade de 1 Gbps até 10 Gbps Escalável',
        'Dupla Abordagem Óptica e Anéis de Proteção',
        'SLA de Reparo 4h com Ressarcimento em Contrato',
        'Interligação Lan to Lan / MPLS Multilocais',
        'Projetos para Indústrias, Hospitais e Data Centers',
      ],
    },
  ],
  'banda-larga-pro': [
    {
      id: 'biz-pro-400',
      name: 'Empresa Pro 400',
      speed: '400',
      unit: 'Mega',
      originalPrice: 169.99,
      promoPrice: 139.99,
      features: [
        '1 IP Fixo IPv6 Dedicado',
        'SLA de Atendimento em até 24h',
        'Wi-Fi 6 Profissional',
        '2 Linhas Fixas PME Ilimitadas',
        'Garantia de Banda 50%',
      ],
    },
    {
      id: 'biz-pro-800',
      name: 'Empresa Pro 800',
      speed: '800',
      unit: 'Mega',
      originalPrice: 209.99,
      promoPrice: 179.99,
      isPopular: true,
      badge: 'MAIS ESCOLHIDO',
      features: [
        '1 IP Fixo IPv6 Dedicado',
        'SLA de Atendimento em até 24h',
        'Wi-Fi 6 Profissional Mesh',
        '3 Linhas Fixas PME Ilimitadas',
        'Garantia de Banda 60%',
      ],
    },
    {
      id: 'biz-pro-1000',
      name: 'Empresa Pro 1 Giga',
      speed: '1',
      unit: 'Giga',
      originalPrice: 269.99,
      promoPrice: 229.99,
      badge: 'ALTA PERFORMANCE',
      features: [
        '1 IP Fixo IPv6 Dedicado',
        'SLA de Atendimento em até 24h',
        'Wi-Fi 6 Ultra Empresarial',
        '4 Linhas Fixas PME Ilimitadas',
        'Garantia de Banda 70%',
      ],
    },
  ],
};

export const PABX_PLANS: PabxPlan[] = [
  {
    id: 'pabx-2',
    name: '2 Ramais Virtuais',
    extensionCount: '2 Ramais (Web/App/IP)',
    targetAudience: 'Profissionais Liberais e Pequenos Negócios',
    price: 59.90,
    features: [
      '2 Ramais Virtuais (Web, Celular ou Telefone IP)',
      'URA de Atendimento Inteligente com Menu por Voz',
      'Ligações Ilimitadas para Fixos e Celulares no Brasil',
      'Gravação de Chamadas e Histórico em Nuvem',
      'Música de Espera Personalizada e Transferência',
      'Painel de Controle Web com Relatórios em Tempo Real',
    ],
  },
  {
    id: 'pabx-5',
    name: '5 Ramais Virtuais',
    extensionCount: '5 Ramais (Web/App/IP)',
    targetAudience: 'Pequenas Equipes e Escritórios',
    price: 129.90,
    features: [
      '5 Ramais Virtuais (Web, Celular ou Telefone IP)',
      'URA Inteligente com Horários de Atendimento',
      'Ligações Ilimitadas para Fixos e Celulares no Brasil',
      'Gravação de Chamadas e Histórico em Nuvem',
      'Grupos de Atendimento e Fila de Espera',
      'Painel de Gestão e Monitoramento de Ramais',
    ],
  },
  {
    id: 'pabx-10',
    name: '10 Ramais Virtuais',
    extensionCount: '10 Ramais (Web/App/IP)',
    targetAudience: 'Empresas em Crescimento e Clínicas',
    price: 249.90,
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    features: [
      '10 Ramais Virtuais (Web, Celular ou Telefone IP)',
      'URA Inteligente com Redirecionamento Dinâmico',
      'Ligações Ilimitadas para Fixos e Celulares no Brasil',
      'Gravação de Todas as Chamadas em Nuvem Segura',
      'Filas de Atendimento e Distribuição Automática',
      'Relatórios Avançados de Produtividade e Métricas',
    ],
  },
  {
    id: 'pabx-20',
    name: '20 Ramais Virtuais',
    extensionCount: '20 Ramais (Web/App/IP)',
    targetAudience: 'Médias Empresas e Setores de Suporte',
    price: 449.90,
    features: [
      '20 Ramais Virtuais com Mobilidade Total',
      'URA Multi-nível com Áudio Profissional',
      'Ligações Ilimitadas para Fixos e Celulares no Brasil',
      'Gravação Contínua com Download de Áudios',
      'Relatórios Detalhados por Departamento e Atendente',
      'Suporte Técnico B2B com Atendimento Prioritário',
    ],
  },
  {
    id: 'pabx-30',
    name: '30 Ramais Virtuais',
    extensionCount: '30 Ramais (Web/App/IP)',
    targetAudience: 'Operações Comerciais e Escritórios Médios',
    price: 649.90,
    features: [
      '30 Ramais Virtuais de Alta Performance',
      'URA Avançada e Transbordo de Chamadas',
      'Ligações Ilimitadas Brasil e Tarifas Reduzidas',
      'Painel em Tempo Real (Wallboard de Atendimento)',
      'Múltiplas Filas e Pesquisa de Satisfação',
      'SLA Corporativo de Suporte e Treinamento da Equipe',
    ],
  },
  {
    id: 'pabx-50',
    name: '50 Ramais Virtuais',
    extensionCount: '50 Ramais (Web/App/IP)',
    targetAudience: 'Centrais de Atendimento e Grandes Equipes',
    price: 999.90,
    badge: 'ALTA CAPACIDADE',
    features: [
      '50 Ramais Virtuais Simultâneos',
      'URA com Reconhecimento e Integração Webhook/API',
      'Gravação e Armazenamento Estendido em Nuvem',
      'Wallboard de Supervisão em Tempo Real',
      'Discador e Distribuição Balanceada',
      'Gerente de Contas Dedicado e SLA Especial',
    ],
  },
  {
    id: 'pabx-100',
    name: '100 Ramais Virtuais',
    extensionCount: '100 Ramais (Web/App/IP)',
    targetAudience: 'Grandes Empresas e Call Centers',
    price: 1699.90,
    badge: 'ENTERPRISE',
    features: [
      '100 Ramais Virtuais com Capacidade Escalável',
      'Arquitetura em Nuvem com Alta Disponibilidade e Redundância',
      'Gravação Total, Transcrição e Relatórios Gerenciais',
      'Integrações com CRMs e Sistemas Corporativos',
      'Supervisão ao Vivo (Escuta, Sussurro e Intervenção)',
      'Gerente de Contas e Engenharia de Telecom Exclusiva',
    ],
  },
];

export const TELEPHONY_PLANS: TelephonyPlan[] = [
  {
    id: 'tel-basica',
    name: 'Linha Básica',
    price: 9.90,
    subtitle: 'DID Fixo Receptivo com 2 Canais Simultâneos',
    description:
      'Número fixo exclusivo (DID) que recebe até 2 chamadas simultâneas. Ideal para atendimento receptivo de clientes e ativação no WhatsApp Business (não realiza chamadas saintes).',
    channelsCount: 2,
    channelsInfo: 'Recebe até 2 chamadas por vez',
    callType: 'Apenas Receptivo (Recebe até 2 chamadas)',
    features: [
      'Número Fixo Exclusivo da sua cidade (DID)',
      'Quantidade de Canais: 2 (Recebe 2 chamadas por vez)',
      'Recebe Ligações Ilimitadas sem custo por minuto',
      'Não Efetua Chamadas (Apenas Receptivo)',
      'Compatível com WhatsApp Business',
      'Ativação imediata com opção de portabilidade grátis',
    ],
  },
  {
    id: 'tel-ilimitada',
    name: 'Linha Ilimitada',
    price: 19.90,
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    subtitle: '1 Canal Ativo com Minutos Ilimitados para Todo o Brasil',
    description:
      'Linha completa para efetuar 1 chamada por vez com minutos ilimitados para qualquer fixo e celular do Brasil, além de receber chamadas ilimitadas sem custos adicionais.',
    channelsCount: 1,
    channelsInfo: 'Efetua 1 chamada por vez com minutos ilimitados',
    callType: 'Ativo & Receptivo (Minutos Ilimitados Brasil)',
    features: [
      'Número Fixo Exclusivo da sua cidade',
      'Quantidade de Canais: 1 chamada simultânea por vez',
      'Ligações Ilimitadas para qualquer Fixo e Celular do Brasil',
      'Recebimento ilimitado de chamadas',
      'Compatível com WhatsApp Business',
      'Zero custo de DDD nacional e ativação no mesmo dia',
    ],
  },
];

export const BUSINESS_TV_PLANS: BusinessTvPlan[] = [
  {
    id: 'esporte-noticia',
    name: 'Esporte e Notícia',
    price: 39.90,
    channelsCount: 68,
    badge: 'IDEAL PARA EMPRESAS',
    isPopular: true,
    subtitle: '68 canais ao vivo com notícias 24h e esportes de ponta',
    description:
      'Pacote corporativo com 68 canais ao vivo, incluindo os principais canais de jornalismo e esportes. Perfeito para manter a TV ligada em recepções, salas de espera, consultórios, academias e ambientes corporativos.',
    features: [
      '68 Canais ao vivo em HD no App Watch (NuvvPlay) / Smart TV',
      'Jornalismo 24 horas: CNN Brasil, GloboNews, CNBC, BM&C News, NEW Brasil e BandNews',
      'Cobertura Esportiva: Premiere com Brasileirão, ESPN, SporTV, NSports e Combate',
      'Ideal para recepções, salas de espera, refeitórios e escritórios',
      'Acesso via Smart TV, TV Box, computadores e smartphones',
      'Sem necessidade de cabeamento de antena ou taxa de adesão',
    ],
    referenceTierId: 'mais-esportes',
  },
];
