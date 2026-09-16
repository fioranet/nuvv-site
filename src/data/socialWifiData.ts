export interface SocialWifiFeature {
  id: string;
  stepNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  realBenefit: string;
  statHighlight: string;
  mockupType: 'captacao' | 'marca' | 'remarketing' | 'automacao' | 'campanhas' | 'inteligencia' | 'satisfacao' | 'conhecimento' | 'monetizacao' | 'infraestrutura';
}

export const SOCIAL_WIFI_FEATURES: SocialWifiFeature[] = [
  {
    id: 'captacao',
    stepNumber: '01',
    tag: 'CAPTAÇÃO',
    title: 'Captura Inteligente de Leads',
    subtitle: 'Transforme visitantes anônimos em contatos qualificados',
    description:
      'Login social rápido e simplificado via WhatsApp, Google, Facebook, Instagram ou formulário customizado. Colete nome, WhatsApp, e-mail, data de aniversário e perfil em conformidade total com a LGPD e Marco Civil.',
    realBenefit: 'Base própria de contatos qualificados que cresce todos os dias de forma legal e consentida.',
    statHighlight: '+2.800 LEADS NOVOS/MÊS EM MÉDIA',
    mockupType: 'captacao',
  },
  {
    id: 'marca',
    stepNumber: '02',
    tag: 'MARCA',
    title: 'Captive Portal Personalizável',
    subtitle: 'Sua marca aparece quando o cliente está mais atento',
    description:
      'A tela de conexão ao Wi-Fi é 100% personalizada com logo, cores e mensagens da sua empresa. Suporta banner rotativo para campanhas ativas no momento exato da conexão.',
    realBenefit: 'Reforço de marca gratuito a cada conexão. Publicidade nativa sem custo por impressão.',
    statHighlight: '+4.200 IMPRESSÕES DE MARCA/MÊS',
    mockupType: 'marca',
  },
  {
    id: 'remarketing',
    stepNumber: '03',
    tag: 'REMARKETING',
    title: 'Audiências Automáticas',
    subtitle: 'Anúncio certeiro para quem já esteve no seu negócio',
    description:
      'Os dados coletados no Wi-Fi alimentam audiências no Facebook Ads e Google Ads em tempo real, sem configuração manual. Lookalike automático dos seus melhores clientes.',
    realBenefit: 'Custo por lead menor, conversão mais alta, sem depender de base de terceiros.',
    statHighlight: '3.2x ROAS MÉDIO DAS CAMPANHAS',
    mockupType: 'remarketing',
  },
  {
    id: 'automacao',
    stepNumber: '04',
    tag: 'AUTOMAÇÃO',
    title: 'Mensagens Automáticas',
    subtitle: 'Marketing rodando enquanto você dorme',
    description:
      'Configure uma vez: boas-vindas imediatas, mensagem de aniversário, reativação após 30 dias de ausência. Disparo automático por e-mail, SMS e WhatsApp.',
    realBenefit: 'Retenção e reativação de clientes sem esforço de equipe de marketing.',
    statHighlight: '68% TAXA DE ABERTURA MÉDIA',
    mockupType: 'automacao',
  },
  {
    id: 'campanhas',
    stepNumber: '05',
    tag: 'CAMPANHAS',
    title: 'Campanhas de Marketing',
    subtitle: 'Promoção certa para a pessoa certa, na hora certa',
    description:
      'Crie e dispare campanhas segmentadas para sua base inteira ou para segmentos específicos, por faixa etária, frequência de visita, gênero ou data de cadastro. Sem ferramenta externa.',
    realBenefit: 'Campanhas com targeting real, sem comprar lista de terceiros e sem gastar mídia paga para quem já é cliente.',
    statHighlight: '1.240 CLIENTES IMPACTADOS POR CAMPANHA',
    mockupType: 'campanhas',
  },
  {
    id: 'inteligencia',
    stepNumber: '06',
    tag: 'INTELIGÊNCIA',
    title: 'Analytics e Métricas de Visitação',
    subtitle: 'Entenda o comportamento real de quem frequenta seu espaço',
    description:
      'Horários de pico, tempo médio de permanência, taxa de retorno de clientes e perfil demográfico completo em gráficos intuitivos e relatórios exportáveis.',
    realBenefit: 'Decisões estratégicas de compras, promoções e escalas de funcionários baseadas em dados reais.',
    statHighlight: '94% PRECISÃO DE MÉTRICAS',
    mockupType: 'inteligencia',
  },
  {
    id: 'satisfacao',
    stepNumber: '07',
    tag: 'SATISFAÇÃO',
    title: 'Pesquisas de Satisfação & NPS',
    subtitle: 'Ouça seu cliente no momento em que a experiência acontece',
    description:
      'Envie pesquisas de NPS ou satisfação imediatamente após a visita. Identifique detratores a tempo e incentive promotores a avaliar no Google Meu Negócio.',
    realBenefit: 'Melhoria contínua do atendimento e mais avaliações 5 estrelas no Google.',
    statHighlight: '4.9 NOTA MÉDIA GOOGLE REVIEW',
    mockupType: 'satisfacao',
  },
  {
    id: 'conhecimento',
    stepNumber: '08',
    tag: 'CONHECIMENTO',
    title: 'Perfil Detalhado do Consumidor',
    subtitle: 'Descubra quem são seus clientes mais fiéis',
    description:
      'Identifique clientes VIPs, clientes novos e clientes em risco de abandono (churn) através de frequência e histórico de visitas.',
    realBenefit: 'Ações direcionadas para fidelização dos 20% de clientes que geram 80% do seu faturamento.',
    statHighlight: '+35% RECORRÊNCIA DE VISITAS',
    mockupType: 'conhecimento',
  },
  {
    id: 'monetizacao',
    stepNumber: '09',
    tag: 'MONETIZAÇÃO',
    title: 'Banners e Espaços Patrocinados',
    subtitle: 'Monetize sua rede com marcas e parceiros comerciais',
    description:
      'Exiba anúncios de fornecedores, patrocinadores ou marcas parceiras na tela de login e gere uma nova linha de receita para o seu estabelecimento.',
    realBenefit: 'Transforme o custo da internet em centro de lucro vendendo espaços de publicidade.',
    statHighlight: '100% VISIBILIDADE GARANTIDA',
    mockupType: 'monetizacao',
  },
  {
    id: 'infraestrutura',
    stepNumber: '10',
    tag: 'INFRAESTRUTURA',
    title: 'Segurança, Conformidade LGPD & Marco Civil',
    subtitle: 'Seu estabelecimento 100% blindado juridicamente',
    description:
      'Armazenamento de logs de conexão conforme exigido pelo Marco Civil da Internet e gestão de consentimento de privacidade rigorosamente alinhada à LGPD.',
    realBenefit: 'Zero risco de multas ou processos por uso indevido da rede Wi-Fi do seu estabelecimento.',
    statHighlight: '100% CONFORMIDADE LEGAL',
    mockupType: 'infraestrutura',
  },
];

export interface SocialWifiSegment {
  name: string;
  iconName: string;
  description: string;
  exampleMetric: string;
}

export const SOCIAL_WIFI_SEGMENTS: SocialWifiSegment[] = [
  {
    name: 'Restaurantes, Bares e Cafés',
    iconName: 'Utensils',
    description: 'Cardápio digital no login, cupons de retorno e avaliações no Google após a refeição.',
    exampleMetric: '+40% de avaliações 5 estrelas',
  },
  {
    name: 'Clínicas e Consultórios',
    iconName: 'HeartPulse',
    description: 'Wi-Fi confortável na recepção com cadastro de pacientes e pesquisa de atendimento.',
    exampleMetric: 'Captação automática de WhatsApp',
  },
  {
    name: 'Academias e Estúdios',
    iconName: 'Dumbbell',
    description: 'Controle de frequência de alunos, mensagens de motivação e reativação de ausentes.',
    exampleMetric: 'Redução de 25% no churn',
  },
  {
    name: 'Lojas e Redes de Varejo',
    iconName: 'ShoppingBag',
    description: 'Banners com promoções do dia, campanhas de aniversário e integração com CRM.',
    exampleMetric: '3.2x retorno em anúncios',
  },
  {
    name: 'Hotéis e Pousadas',
    iconName: 'Building',
    description: 'Check-in digital, divulgação de serviços do hotel e pesquisa de satisfação da estadia.',
    exampleMetric: '100% LGPD e Marco Civil',
  },
  {
    name: 'Salões de Beleza e Barbearias',
    iconName: 'Scissors',
    description: 'Lembrete de retorno após 20 dias e promoções personalizadas por perfil de cliente.',
    exampleMetric: '+30% de agendamentos recorrentes',
  },
  {
    name: 'Concessionárias e Oficinas',
    iconName: 'Car',
    description: 'Entretenimento durante a espera, agendamento de revisões e ofertas de novos modelos.',
    exampleMetric: 'Fidelização pós-venda',
  },
  {
    name: 'Coworkings e Eventos',
    iconName: 'Users',
    description: 'Alta densidade de conexões simultâneas, controle de banda e captação de leads B2B.',
    exampleMetric: 'Até 1.000 conexões por AP',
  },
];

export interface SocialWifiPlan {
  id: string;
  name: string;
  simultaneousUsers: string;
  price: number;
  priceOnRequest?: boolean;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export const SOCIAL_WIFI_PLANS: SocialWifiPlan[] = [
  {
    id: 'wifi-10',
    name: 'Hotspot Wi-fi Social 10',
    simultaneousUsers: 'Até 10 Acessos Simultâneos',
    price: 39.9,
    description: 'Ideal para consultórios, estúdios, escritórios e pequenas lojas.',
    features: [
      'Até 10 conexões simultâneas ativas',
      'Captive Portal com Logo e Cores da sua marca',
      'Login social via WhatsApp, Google, Facebook e E-mail',
      'Relatório de visitantes e novos cadastros',
      '100% de conformidade com Marco Civil e LGPD',
      'Suporte técnico Nuvv',
    ],
  },
  {
    id: 'wifi-50',
    name: 'Hotspot Wi-fi Social 50',
    simultaneousUsers: 'Até 50 Acessos Simultâneos',
    price: 59.9,
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    description: 'Perfeito para restaurantes, bares, academias e clínicas médicas.',
    features: [
      'Até 50 conexões simultâneas ativas',
      'Tudo do plano de 10 acessos +',
      'Automações de mensagens de Boas-vindas e Aniversário',
      'Pesquisas de Satisfação & NPS integradas ao Google Review',
      'Banners rotativos com promoções ativas no portal',
      'Exportação da base de leads em CSV / Excel',
    ],
  },
  {
    id: 'wifi-100',
    name: 'Hotspot Wi-fi Social 100',
    simultaneousUsers: 'Até 100 Acessos Simultâneos',
    price: 89.9,
    badge: 'ALTO FLUXO',
    description: 'Para estabelecimentos com grande fluxo de clientes e atendimento rápido.',
    features: [
      'Até 100 conexões simultâneas ativas',
      'Tudo do plano de 50 acessos +',
      'Sincronização de Audiências com Meta Ads e Google Ads',
      'Segmentação avançada por perfil, gênero e frequência',
      'Disparo de campanhas promocionais segmentadas',
      'Relatórios detalhados com mapa de calor e permanência',
    ],
  },
  {
    id: 'wifi-custom',
    name: 'Projetos Especiais',
    simultaneousUsers: 'De 100 a 10.000 Acessos',
    price: 0,
    priceOnRequest: true,
    badge: 'ENTERPRISE',
    description: 'Para shoppings, faculdades, grandes eventos, estádios e redes com filiais.',
    features: [
      'De 100 até 10.000 conexões simultâneas sob medida',
      'Gestão centralizada de múltiplas unidades e filiais',
      'APIs de integração com CRM, ERP e sistemas de fidelidade',
      'Monetização com venda de espaços publicitários na rede',
      'SLA de atendimento prioritário e consultoria técnica',
    ],
  },
];
