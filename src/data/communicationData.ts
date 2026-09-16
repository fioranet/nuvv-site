export interface CommunicationFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  metric?: string;
  metricLabel?: string;
}

export interface VoiceScenario {
  id: string;
  title: string;
  tagline: string;
  category: string;
  duration: string;
  audioSrc: string;
  dialogue: Array<{
    speaker: 'agent' | 'client';
    speakerName: string;
    text: string;
    time: string;
  }>;
}

export interface IndustryUseCase {
  id: string;
  industry: string;
  iconName: string;
  rcsUse: string;
  voiceAiUse: string;
  benefit: string;
}

export const RCS_VS_SMS_METRICS = [
  {
    metric: '98%',
    label: 'Taxa de Abertura',
    description: 'Mensagens lidas nos primeiros 3 minutos após o envio.',
  },
  {
    metric: '35x',
    label: 'Mais Engajamento no RCS',
    description: 'Botões interativos e imagens aumentam cliques e conversões.',
  },
  {
    metric: '100%',
    label: 'Remetente Verificado',
    description: 'Selo oficial que elimina desconfiança e combate golpes de phishing.',
  },
  {
    metric: '24/7',
    label: 'Automação Omnichannel',
    description: 'Disparos automáticos via API acionados por eventos no seu ERP/CRM.',
  },
];

export const VOICE_AI_SCENARIOS: VoiceScenario[] = [
  {
    id: 'health-booking',
    title: 'Clínica & Saúde',
    tagline: 'Confirmação e reagendamento inteligente de consultas',
    category: 'Saúde & Clínicas',
    duration: '0:26',
    audioSrc: '/audio/voice-ai/health-booking.mp3',
    dialogue: [
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Olá, Carlos! Aqui é a assistente virtual da Clínica Viva. Você tem uma consulta agendada com o Dr. Eduardo para amanhã às 14h30. Você confirma sua presença?',
        time: '0:05',
      },
      {
        speaker: 'client',
        speakerName: 'Carlos (Cliente)',
        text: 'Oi! Amanhã às 14h30 eu tive um imprevisto. Vocês teriam algum horário disponível na quinta-feira de manhã?',
        time: '0:11',
      },
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Com certeza! Tenho quinta-feira às 09h15 ou às 11h00. Qual desses horários fica melhor para você?',
        time: '0:17',
      },
      {
        speaker: 'client',
        speakerName: 'Carlos (Cliente)',
        text: 'Às 11h00 fica perfeito.',
        time: '0:20',
      },
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Prontinho, Carlos! Sua consulta foi remarcada para quinta-feira, às 11h00. Acabei de te enviar a confirmação com a localização no seu WhatsApp e RCS. Tenha um ótimo dia!',
        time: '0:26',
      },
    ],
  },
  {
    id: 'b2b-qualification',
    title: 'Qualificação Comercial B2B',
    tagline: 'Triagem e agendamento de reuniões para equipe de vendas',
    category: 'Vendas & Pré-vendas',
    duration: '0:24',
    audioSrc: '/audio/voice-ai/b2b-qualification.mp3',
    dialogue: [
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Olá, Mariana! Sou a assistente executiva da Nexus Tech. Vi que você baixou nossa proposta de Link Dedicado e PABX em Nuvem. Posso te fazer duas perguntas rápidas?',
        time: '0:06',
      },
      {
        speaker: 'client',
        speakerName: 'Mariana (Diretora TI)',
        text: 'Oi, pode sim! Estamos precisando interligar duas filiais em Suzano.',
        time: '0:10',
      },
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Excelente! Quantos computadores e ramais vocês pretendem conectar nessa operação?',
        time: '0:15',
      },
      {
        speaker: 'client',
        speakerName: 'Mariana (Diretora TI)',
        text: 'Cerca de 45 computadores e 20 ramais telefônicos.',
        time: '0:18',
      },
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Perfeito! Nosso especialista em engenharia telecom já pode apresentar o projeto com topologia e valores amanhã às 15h. Posso enviar o convite para o seu e-mail corporativo?',
        time: '0:24',
      },
    ],
  },
  {
    id: 'support-tier1',
    title: 'Suporte & Cobrança Consultiva',
    tagline: 'Segunda via de fatura e resolução imediata sem fila',
    category: 'Financeiro & Suporte',
    duration: '0:22',
    audioSrc: '/audio/voice-ai/support-tier1.mp3',
    dialogue: [
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Olá! Bem-vindo à central de atendimento. Como posso te ajudar hoje?',
        time: '0:03',
      },
      {
        speaker: 'client',
        speakerName: 'Roberto (Cliente)',
        text: 'Olá, preciso do código Pix da minha fatura que vence hoje, não recebi no e-mail.',
        time: '0:08',
      },
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Localizei seu cadastro pelo número de telefone. O valor da sua fatura deste mês é de R$ 129,90. Acabei de enviar o código Pix Copia e Cola e o boleto em PDF para o seu celular via RCS e SMS.',
        time: '0:16',
      },
      {
        speaker: 'client',
        speakerName: 'Roberto (Cliente)',
        text: 'Já chegou aqui, muito obrigado!',
        time: '0:19',
      },
      {
        speaker: 'agent',
        speakerName: 'Agente IA Nuvv',
        text: 'Por nada, Roberto! Precisando de qualquer outra coisa, estamos à disposição 24 horas.',
        time: '0:22',
      },
    ],
  },
];

export const INDUSTRY_USE_CASES: IndustryUseCase[] = [
  {
    id: 'varejo',
    industry: 'Varejo & E-commerce',
    iconName: 'ShoppingBag',
    rcsUse: 'Ofertas com carrossel de fotos, rastreamento de entregas em mapa interativo e recuperação de carrinho.',
    voiceAiUse: 'Atendimento telefônico para status de pedidos, suporte a trocas e devoluções com transferência direta.',
    benefit: '+32% em conversão de campanhas e -60% no tempo de espera no SAC.',
  },
  {
    id: 'saude',
    industry: 'Clínicas & Hospitais',
    iconName: 'Activity',
    rcsUse: 'Confirmação de consultas com botão de 1 clique, preparo de exames em PDF e localização da clínica.',
    voiceAiUse: 'Agendamento e reagendamento telefônico humanizado em linguagem natural 24/7 sem ocupar a recepção.',
    benefit: '-45% em faltas (no-show) e atendimento imediato de pacientes.',
  },
  {
    id: 'servicos',
    industry: 'Empresas B2B & Serviços',
    iconName: 'Briefcase',
    rcsUse: 'Avisos de cobrança com Pix copia e cola, lembretes de reuniões e comunicados institucionais verificados.',
    voiceAiUse: 'Qualificação inicial de leads comerciais, triagem de chamadas e roteamento para o executivo de contas.',
    benefit: 'Aumento de 4x na velocidade de contato com novos leads.',
  },
  {
    id: 'educacao',
    industry: 'Escolas & Faculdades',
    iconName: 'GraduationCap',
    rcsUse: 'Avisos de matrícula, envio de boletos e comunicados pedagógicos com a identidade visual oficial da instituição.',
    voiceAiUse: 'Tira-dúvidas sobre vestibulares, cursos e confirmação de presença em eventos acadêmicos.',
    benefit: 'Comunicação oficial sem risco de golpes e alta taxa de leitura.',
  },
];
