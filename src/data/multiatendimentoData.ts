export interface MultiAtendimentoPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  isPopular?: boolean;
  badge?: string;
  usersLimit: string;
  connectionsLimit: string;
  features: string[];
  ctaText: string;
}

export interface MultiAtendimentoFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface AdvancedChannelFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  category: 'whatsapp' | 'social' | 'automation';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export const MULTIATENDIMENTO_METRICS = [
  {
    value: '50.000+',
    label: 'Equipes Conectadas',
    desc: 'Empresas acelerando vendas no WhatsApp todos os dias.',
  },
  {
    value: '99.9%',
    label: 'Disponibilidade',
    desc: 'SLA garantido com infraestrutura em nuvem de alta escala.',
  },
  {
    value: '< 1,2s',
    label: 'Tempo de Resposta IA',
    desc: 'Atendimento instantâneo 24/7 sem filas de espera.',
  },
  {
    value: '94%',
    label: 'Taxa de Leitura',
    desc: 'Em campanhas e transmissões oficiais aprovadas pela Meta.',
  },
];

export const INTEGRATION_LOGOS = [
  { name: 'WhatsApp Official API', category: 'Mensageria' },
  { name: 'Instagram Direct', category: 'Redes Sociais' },
  { name: 'Facebook Messenger', category: 'Redes Sociais' },
  { name: 'Telegram', category: 'Mensageria' },
  { name: 'Google Services (Sheets, Drive, Calendar, Docs)', category: 'Produtividade' },
  { name: 'Webhooks & APIs (Shopify / WooCommerce)', category: 'Desenvolvedores' },
  { name: 'RD Station', category: 'CRM & Marketing' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Pipedrive', category: 'Vendas' },
  { name: 'Hotmart & Kiwify', category: 'E-commerce' },
];

export const ADVANCED_CHANNELS_AND_FEATURES: AdvancedChannelFeature[] = [
  {
    id: 'whatsapp-coexistence',
    title: 'Coexistência do WhatsApp',
    subtitle: 'Ambos os sistemas. Zero interrupções.',
    description: 'Utilize o aplicativo móvel do WhatsApp Business junto com a plataforma Nuvv simultaneamente sem desconexões ou perdas de mensagens.',
    iconName: 'Smartphone',
    badge: 'Sem Quedas',
    category: 'whatsapp',
  },
  {
    id: 'instagram-automation',
    title: 'Automação do Instagram',
    subtitle: 'Comentários para DM e Chatbot com IA.',
    description: 'Transforme comentários em posts e Reels em conversas privadas imediatas na DM com qualificação automática e direcionamento comercial.',
    iconName: 'Instagram',
    badge: 'Engajamento',
    category: 'social',
  },
  {
    id: 'webhook-automation',
    title: 'Automação Webhook',
    subtitle: 'Conecte Shopify, WooCommerce e qualquer plataforma.',
    description: 'Receba eventos de compras aprovadas, carrinhos abandonados, boletos gerados e acione notificações imediatas no WhatsApp do cliente.',
    iconName: 'Zap',
    badge: 'API & E-commerce',
    category: 'automation',
  },
  {
    id: 'whatsapp-forms',
    title: 'Formulários do WhatsApp',
    subtitle: 'Envie formulários interativos nativos.',
    description: 'Colete respostas estruturadas, agendamentos e cadastros diretamente dentro da janela de conversa do WhatsApp (WhatsApp Flows).',
    iconName: 'CheckSquare',
    badge: 'WhatsApp Flows',
    category: 'whatsapp',
  },
  {
    id: 'qr-whatsapp-login',
    title: 'QR WhatsApp Login',
    subtitle: 'Conecte contas comuns instantaneamente.',
    description: 'Vincule números existentes de WhatsApp em segundos por meio de leitura de QR Code, sem burocracia para início imediato.',
    iconName: 'QrCode',
    badge: 'Ativação Rápida',
    category: 'whatsapp',
  },
  {
    id: 'embedded-whatsapp',
    title: 'WhatsApp Incorporado (Embedded Signup)',
    subtitle: 'Autenticação oficial com 1 clique no Meta.',
    description: 'Aprovação oficial instantânea da Meta Business API com selo de verificação e criação simplificada de canais corporativos.',
    iconName: 'ShieldCheck',
    badge: 'Meta Oficial',
    category: 'whatsapp',
  },
  {
    id: 'telegram-inbox',
    title: 'Telegram Integrado',
    subtitle: 'Caixa de entrada completa e bots.',
    description: 'Gerencie conversas de canais e grupos do Telegram com fluxos automatizados de chatbot e distribuição entre seus operadores.',
    iconName: 'Send',
    badge: 'Omnichannel',
    category: 'social',
  },
  {
    id: 'web-push-notifications',
    title: 'Web Push Notifications',
    subtitle: 'Notificações push em tempo real no navegador.',
    description: 'Engaje e fidelize usuários enviando notificações push instantâneas no desktop ou mobile com ofertas e avisos de suporte.',
    iconName: 'Bell',
    badge: 'Retenção',
    category: 'automation',
  },
  {
    id: 'facebook-messenger',
    title: 'Facebook Messenger',
    subtitle: 'Chatbot e automação com IA para Messenger.',
    description: 'Atenda clientes da sua página do Facebook com menus interativos, triagem automatizada e transferência rápida para humanos.',
    iconName: 'MessageCircle',
    badge: 'Meta Ads',
    category: 'social',
  },
];

export const MULTIATENDIMENTO_CORE_FEATURES: MultiAtendimentoFeature[] = [
  {
    id: 'multi-agents',
    title: 'Atendimento Simultâneo',
    description: 'Conecte 2, 10 ou mais de 50 operadores em um único número oficial de WhatsApp com transferência interna de conversas e filas por departamento.',
    iconName: 'Users',
    badge: '1 Número Oficial',
  },
  {
    id: 'crm-kanban',
    title: 'CRM e Funil Kanban',
    description: 'Organize leads visualmente por etapas (Novo Contato, Proposta Enviada, Fechamento). Arraste conversas, adicione tags e anotações privadas.',
    iconName: 'Layers',
    badge: 'Funil Visual',
  },
  {
    id: 'smart-chatbot',
    title: 'Chatbot e Agente IA',
    description: 'Crie fluxos de triagem automática sem código ou deixe um Agente de IA com GPT treinado responder dúvidas e agendar reuniões 24 horas por dia.',
    iconName: 'Bot',
    badge: 'No-Code + IA',
  },
  {
    id: 'analytics-reports',
    title: 'Métricas & Relatórios',
    description: 'Painel completo com tempo médio de primeira resposta (TMR), tempo de resolução (TMA), volume de conversas por operador e notas de satisfação (CSAT).',
    iconName: 'BarChart3',
    badge: 'Tempo Real',
  },
];

export const MULTIATENDIMENTO_PLANS: MultiAtendimentoPlan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    tagline: 'Ideal para profissionais autônomos e pequenos negócios em crescimento.',
    monthlyPrice: 149.9,
    annualPrice: 119.9,
    usersLimit: 'Até 3 Usuários/Atendentes',
    connectionsLimit: '1 Conexão WhatsApp Oficial ou QR Code',
    features: [
      'Até 3 atendentes simultâneos',
      '1 Conexão WhatsApp (API Oficial ou QR Code)',
      'Coexistência do WhatsApp no celular e web',
      'Caixa de entrada unificada',
      'CRM Visual Kanban básico',
      'Chatbot com respostas automáticas e menus',
      'Histórico de conversas por 12 meses',
      'Disparos rápidos de mensagens pré-formatadas',
      'Suporte via WhatsApp e Ticket',
    ],
    ctaText: 'Começar com Essencial',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'A solução mais recomendada para equipes comerciais e suporte escalável.',
    monthlyPrice: 299.9,
    annualPrice: 239.9,
    isPopular: true,
    badge: 'Mais Escolhido',
    usersLimit: 'Até 10 Usuários/Atendentes',
    connectionsLimit: 'Até 3 Conexões (WhatsApp + Instagram + Messenger + Telegram)',
    features: [
      'Até 10 atendentes simultâneos',
      'Conexões multi-canais (WhatsApp, Instagram, Messenger e Telegram)',
      'Automação do Instagram (Comentários para DM)',
      'Construtor de Fluxo No-Code ilimitado',
      'Agente de IA Integrado (GPT) para respostas inteligentes',
      'CRM Kanban completo com múltiplos funis',
      'Transmissão de campanhas em massa aprovadas',
      'Automação com Webhooks (Shopify/WooCommerce)',
      'Integração com Google Services (Sheets, Drive, Calendar, Docs)',
      'Formulários interativos nativos do WhatsApp (Flows)',
      'Web Push Notifications no navegador',
      'Relatórios avançados de desempenho e produtividade',
      'Atribuição automática de conversas (Round-Robin)',
      'Suporte prioritário via WhatsApp',
    ],
    ctaText: 'Testar Plano Pro Grátis',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Para operações de grande porte com múltiplos números e demandas sob medida.',
    monthlyPrice: null,
    annualPrice: null,
    badge: 'Customizado',
    usersLimit: 'Usuários Ilimitados',
    connectionsLimit: 'Múltiplos números e canais dedicados',
    features: [
      'Usuários e operadores ilimitados',
      'Múltiplas linhas de WhatsApp e números 0800',
      'Agente de Voz com IA para chamadas no WhatsApp',
      'SLA de atendimento 24/7 com gerente de contas',
      'Integração customizada com ERPs e bancos de dados legados',
      'Ambiente dedicado e conformidade total com LGPD',
      'Treinamento e onboarding presencial ou remoto da equipe',
      'Consultoria mensal de otimização de conversão',
    ],
    ctaText: 'Falar com Consultor Enterprise',
  },
];

export const MULTIATENDIMENTO_FAQS = [
  {
    question: 'Como funciona múltiplos atendentes no mesmo número de WhatsApp?',
    answer:
      'Utilizamos a API Oficial do WhatsApp (Meta Business API) com suporte a Coexistência e QR Code. Sua empresa utiliza apenas 1 número de telefone e todos os seus atendentes acessam a plataforma web ou aplicativo simultaneamente, visualizando as mensagens em tempo real e transferindo conversas entre si sem precisar de vários celulares.',
  },
  {
    question: 'O que é a Coexistência do WhatsApp?',
    answer:
      'A Coexistência permite que você mantenha o aplicativo oficial do WhatsApp Business funcionando no smartphone da empresa ao mesmo tempo em que a plataforma Nuvv Multiatendimento opera na nuvem com dezenas de operadores, com zero interrupção.',
  },
  {
    question: 'Como funciona a Automação do Instagram e Telegram?',
    answer:
      'Nossa plataforma integra nativamente o Direct do Instagram e canais/grupos do Telegram. Você pode configurar para que qualquer comentário feito em seus posts ou Reels acione automaticamente uma mensagem direta na DM enviando o link de compra ou iniciando um atendimento com IA.',
  },
  {
    question: 'O que é o Construtor de Fluxo No-Code e Google Services?',
    answer:
      'É uma ferramenta visual onde você cria árvores de decisão e chatbots apenas arrastando blocos e ligando etapas. Você pode integrar dados com Google Services (Sheets, Drive, Calendar, Docs), validar opções, acionar webhooks (Shopify/WooCommerce) e direcionar para o atendente correto sem código.',
  },
  {
    question: 'Como funciona a IA de Voz nas chamadas do WhatsApp?',
    answer:
      'Nosso Agente de Voz com IA atende as ligações feitas pelos clientes diretamente no WhatsApp. Ele entende a fala em português do Brasil em menos de 1,2 segundos, conversa de forma humanizada, tira dúvidas e registra tudo no seu CRM.',
  },
  {
    question: 'Existe fidelidade ou contrato de longo prazo?',
    answer:
      'Nos planos mensais, você pode cancelar a qualquer momento sem multas. Para o plano anual, oferecemos até 20% de desconto no pagamento antecipado.',
  },
];

export const MULTIATENDIMENTO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Renata Albuquerque',
    role: 'Head de Vendas',
    company: 'Imobiliária Prime',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      'Centralizamos 14 corretores no mesmo WhatsApp da imobiliária. O funil Kanban e as respostas automáticas triplicaram nossa velocidade de atendimento de novos clientes.',
  },
  {
    id: '2',
    name: 'Felipe Mendonça',
    role: 'Diretor de Operações',
    company: 'AutoPeças Brasil',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      'O construtor de fluxo tirou mais de 60% das dúvidas repetitivas de cotação de peças. A equipe agora foca apenas em fechar vendas de alto valor.',
  },
  {
    id: '3',
    name: 'Camila Zanin',
    role: 'Gerente de Atendimento',
    company: 'Clínica OdontoLife',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content:
      'As mensagens de confirmação e a integração com o Instagram e WhatsApp reduziram nosso no-show em quase 50%. A plataforma é super intuitiva.',
  },
];
