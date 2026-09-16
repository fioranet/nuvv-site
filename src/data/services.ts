export interface CorporateSolution {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  benefits: string[];
  serviceItems?: string[];
  featureItems?: string[];
  pricingNote?: string;
  featured?: boolean;
  route?: string;
  categoryPill?: string;
}

export interface SvaService {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  image: string;
  price?: number;
  benefits: string[];
  isIncluded?: boolean;
}

export const CORPORATE_SOLUTIONS: CorporateSolution[] = [
  {
    id: 'link-dedicado',
    title: 'Link Dedicado',
    shortDescription: 'De 20Mbps a 10Gbps com 100% de garantia.',
    fullDescription: 'Internet de alta performance com 100% da banda garantida, simetria total de download e upload, e redundância direta de backbone. Escalabilidade total para companhias de todos os portes.',
    iconName: 'Router',
    image: '/images/hero/business_1.png',
    categoryPill: 'Conectividade',
    benefits: [
      'Velocidades escaláveis de até 10Gbps',
      'SLA agressivo de reparo em 4 horas',
      'Monitoramento ativo pelo NOC 24/7/365',
      'Bloco de IPs públicos fixos válidos inclusos',
    ],
    pricingNote: 'Projetos sob medida',
  },
  {
    id: 'pabx-nuvem',
    title: 'PABX em Nuvem',
    shortDescription: 'A partir de R$ 99,99 (5 Ramais inclusos).',
    fullDescription: 'Modernize sua telefonia com um sistema 100% digital. Crie ramais, grave chamadas, configure URA e atenda ligações do escritório direto no celular. Planos flexíveis que crescem com sua empresa.',
    iconName: 'Cloud',
    image: '/images/pabx/adicionais_tarifas.png',
    route: '/pabx',
    categoryPill: 'Voz & PABX',
    benefits: [
      'Gravação de chamadas',
      'URA personalizada',
      'App Softphone',
      'Relatórios gerenciais',
    ],
    pricingNote: 'A partir de R$ 99,99/mês',
  },
  {
    id: 'telefonia-ip',
    title: 'Telefonia IP',
    shortDescription: 'Linhas digitais corporativas de alta qualidade.',
    fullDescription: 'Modernize sua telefonia com linhas IP e números virtuais. Reduza custos, ganhe mobilidade e integre com seu PABX ou Teams. Qualidade de voz superior e tarifas competitivas.',
    iconName: 'PhoneCall',
    image: '/images/external/telephony.jpg',
    route: '/telefonia',
    categoryPill: 'Voz & PABX',
    benefits: [
      'Portabilidade Numérica',
      '0800 e Números Nacionais',
      'Tronco SIP',
      'Tarifas Reduzidas',
    ],
    pricingNote: 'A partir de R$ 9,90/mês',
  },
  {
    id: 'nuvv-guard',
    title: 'Nuvv Guard (Segurança Inteligente)',
    shortDescription: 'Câmeras em nuvem, interfonia virtual por QR Code e rastreamento de tags.',
    fullDescription: 'Ecossistema completo de segurança patrimonial e familiar: gravação de câmeras na nuvem sem DVR físico, interfone virtual sem fiação via QR Code no portão e tags de rastreamento para crianças, pets e veículos.',
    iconName: 'ShieldCheck',
    image: '/images/services/security_office_hero.png',
    route: '/guard',
    categoryPill: 'Segurança',
    benefits: [
      'Gravação contínua em nuvem de 3 a 30 dias',
      'Interfone virtual por QR Code com vídeo no celular',
      'Tags para acompanhar crianças, pets e veículos',
      'Poste de Monitoramento Inteligente para ruas e condomínios',
      'Câmeras Full HD com gravação ou uso de câmeras próprias',
    ],
    pricingNote: 'Planos a partir de R$ 9,90/mês',
  },
  {
    id: 'lan-to-lan',
    title: 'Lan to Lan',
    shortDescription: 'Interligação de filiais e matriz com segurança máxima.',
    fullDescription: 'Conecte sua matriz, filiais e centros de distribuição em uma rede privada ponto a ponto de alta velocidade (camada 2), sem transitar pela internet pública.',
    iconName: 'Network',
    image: '/images/services/office_1.png',
    categoryPill: 'Conectividade',
    benefits: [
      'Comunicação em rede privada segura e isolada',
      'Baixíssima latência para troca de dados e ERPs',
      'Largura de banda dedicada entre unidades',
      'Disponibilidade garantida de 99,8%',
    ],
  },
  {
    id: 'link-temporario',
    title: 'Link Temporário',
    shortDescription: 'Internet de alta velocidade para eventos, transmissões e feiras.',
    fullDescription: 'Conexão de fibra óptica temporária para congressos, transmissões ao vivo, lives, feiras de negócios, eventos esportivos ou obras de construção civil.',
    iconName: 'Clock',
    image: '/images/services/business_scheduling_meet.png',
    categoryPill: 'Conectividade',
    benefits: [
      'Instalação rápida com equipe técnica dedicada no local',
      'Banda garantida para streaming e credenciamento',
      'Wi-Fi de alta densidade para milhares de pessoas',
      'Planos de locação por dia, semana ou mês',
    ],
  },
  {
    id: 'nuvv-multiatendimento',
    title: 'Multiatendimento',
    shortDescription: 'WhatsApp e Redes Sociais.',
    fullDescription: 'Centralize todos os atendimentos da sua empresa em um único número de WhatsApp. Vários atendentes no mesmo número, CRM Kanban, construtor de fluxos e automação com inteligência artificial.',
    iconName: 'MessageSquare',
    image: '/images/services/multiatendimento_hero.png',
    route: '/multiatendimento',
    categoryPill: 'Atendimento & CRM',
    benefits: [
      'Múltiplos atendentes em um único número de WhatsApp',
      'Construtor de Fluxo No-Code e Chatbot com IA',
      'CRM visual Kanban e múltiplos funis de vendas',
      'Métricas de tempo de resposta e satisfação (CSAT)',
    ],
    pricingNote: 'A partir de R$ 149,90/mês',
  },
  {
    id: 'hotspot-wifi-social',
    title: 'Hotspot Wi-fi Social',
    shortDescription: 'Wi-Fi Inteligente & Marketing para clientes.',
    fullDescription: 'Transforme seu Wi-Fi gratuito em uma poderosa ferramenta de marketing e captação de leads em conformidade com a LGPD e Marco Civil.',
    iconName: 'Wifi',
    image: '/images/services/social_wifi_hero.png',
    route: '/social-wifi',
    categoryPill: 'Marketing & Wi-Fi',
    benefits: [
      'Login social simplificado (WhatsApp, Google, Facebook)',
      'Captura de leads qualificados para remarketing',
      'Exibição de banners, promoções e pesquisas de satisfação',
      'Painel analítico com dados demográficos e comportamento',
    ],
    pricingNote: 'A partir de R$ 39,90/mês',
  },
  {
    id: 'seguranca-digital',
    title: 'Segurança Digital',
    shortDescription: 'Proteção avançada para endpoints e servidores corporativos.',
    fullDescription: 'Blindagem total para os dispositivos da sua empresa contra ransomware, phishing e ataques cibernéticos com a consagrada tecnologia Kaspersky Small Office Security.',
    iconName: 'ShieldCheck',
    image: '/images/services/security_office_hero.png',
    route: '/seguranca-digital',
    categoryPill: 'Segurança',
    benefits: [
      'Proteção contra ransomware e vazamento de dados',
      'Gerenciamento centralizado via nuvem',
      'VPN corporativa ilimitada e segura',
      'Controle de acesso e proteção para transações bancárias',
    ],
    pricingNote: 'A partir de R$ 29,90/mês',
  },
  {
    id: 'comunicacao-inteligente',
    title: 'Comunicação Digital',
    shortDescription: 'Mensageria e Agentes de Voz IA.',
    fullDescription: 'Dispare notificações com mídia rica e botões interativos via RCS/SMS e atenda ligações com inteligência artificial humanizada integrada ao seu PABX em nuvem com a plataforma de Comunicação Digital.',
    iconName: 'Bot',
    image: '/images/services/smart_communication.png',
    route: '/comunicacao-inteligente',
    categoryPill: 'Inovação & IA',
    benefits: [
      'RCS Oficial Verificado com botões de ação e mídia rica',
      'SMS corporativo de alta entrega para alertas e 2FA',
      'Agente de Voz IA para atendimento telefônico 24/7 sem filas',
      'Integração nativa com PABX em Nuvem, SIP e APIs REST',
    ],
  },
  {
    id: 'data-center',
    title: 'Data Center & Co-location',
    shortDescription: 'Servidores Dedicados, Cloud VPS, Co-location e Backup em Nuvem.',
    fullDescription: 'Infraestrutura de Data Center robusta com climatização de precisão, geradores redundantes e conectividade ultrarrápida para hospedar servidores, racks e dados críticos.',
    iconName: 'Server',
    image: '/images/services/tech_1.png',
    categoryPill: 'Cloud & Data Center',
    serviceItems: [
      'Servidores Dedicados e Bare Metal de alta performance',
      'Cloud VPS corporativos altamente escaláveis',
      'Co-location (espaço em rack, energia estabilizada e links dedicados)',
      'Backups automáticos em nuvem com retenção imutável',
    ],
    featureItems: [
      'Ambiente Tier III com geradores e no-breaks redundantes',
      'Segurança física e controle de acesso biométrico 24/7/365',
      'Climatização de precisão com monitoramento térmico contínuo',
      'Conectividade direta ao backbone óptico Nuvv e baixa latência',
    ],
    benefits: [
      'Servidores Dedicados e Cloud VPS escaláveis',
      'Co-location com energia ininterrupta e espaço em rack',
      'Backups automáticos com retenção imutável',
      'Ambiente seguro Tier III com monitoramento 24/7/365',
    ],
  },
  {
    id: 'projetos-personalizados',
    title: 'Projetos Personalizados',
    shortDescription: 'Soluções de infraestrutura e conectividade sob medida.',
    fullDescription: 'Engenharia de telecomunicações dedicada para desenhar, implantar e gerenciar projetos complexos de conectividade, fibra apagada, DWDM e redes metropolitanas.',
    iconName: 'Cpu',
    image: '/images/services/security_1.png',
    categoryPill: 'Engenharia',
    benefits: [
      'Consultoria especializada e análise de viabilidade técnica',
      'Implantação ponta a ponta com equipamentos de primeira linha',
      'Contratos de SLA personalizados conforme a criticidade',
      'Atendimento consultivo e suporte de engenharia sênior',
    ],
  },
];

export const SVA_SERVICES: SvaService[] = [
  {
    id: 'nuvvplay',
    title: 'Watch (NuvvPlay)',
    subtitle: 'Sua TV e streaming em qualquer lugar',
    tag: 'ENTRETENIMENTO',
    description: 'Leve seus canais favoritos e milhares de filmes no bolso. O Watch (NuvvPlay) é o aplicativo oficial de streaming da Nuvv que permite assistir à programação ao vivo, filmes e séries na sua Smart TV, Celular ou Tablet, sem decodificadores.',
    image: '/images/services/nuvvplay.png',
    benefits: [
      'Incluso em todos os planos de internet',
      'Acesso em até 4 telas simultâneas',
      'Não consome sua franquia de dados',
      'Compatível com Android TV, Samsung, LG, Fire TV e Roku',
    ],
    isIncluded: true,
  },
  {
    id: 'telefonia-fixa',
    title: 'Telefonia Fixa Ilimitada',
    subtitle: 'Voz digital de alta fidelidade',
    tag: 'COMUNICAÇÃO',
    description: 'Substitua sua linha fixa tradicional por uma solução moderna. Tenha ligações ilimitadas para fixo e DDD, identificador de chamadas e secretária eletrônica, tudo via fibra óptica.',
    image: '/images/external/telephony.jpg',
    price: 9.90,
    benefits: [
      'Portabilidade numérica gratuita do seu número antigo',
      'Ligações ilimitadas para telefones fixos de todo o Brasil',
      'Qualidade de voz digital (VoIP) sem ruídos',
      'Aplicativo opcional para atender no smartphone',
    ],
  },
  {
    id: 'nuvv-protecao',
    title: 'Nuvv +Proteção',
    subtitle: 'Segurança Digital Kaspersky',
    tag: 'SEGURANÇA',
    description: 'Proteja sua família contra ameaças digitais, vírus, golpes de WhatsApp e roubo de senhas com as soluções líderes mundiais da Kaspersky.',
    image: '/images/services/security_hero.png',
    price: 9.99,
    benefits: [
      'Kaspersky Standard e Plus com antivírus em tempo real',
      'Safe Kids: Controle parental avançado para proteger as crianças',
      'VPN ilimitada e cofre seguro de senhas',
      'Até 5 licenças para computadores e celulares',
    ],
  },
  {
    id: 'nuvv-saude',
    title: 'Nuvv +Saúde',
    subtitle: 'Telemedicina e Bem-Estar 24h',
    tag: 'SAÚDE',
    description: 'Consultas médicas online quando você precisar sem filas de espera, com clínicos gerais e especialistas disponíveis no conforto da sua casa.',
    image: '/images/hero/home_2.png',
    benefits: [
      'Consultas Médicas Online (Telemedicina) 24h',
      'Receitas digitais e atestados válidos em todo o país',
      'App de fitness e acompanhamento nutricional incluso',
      'Cuidado completo para toda a família sem sair de casa',
    ],
  },
];
