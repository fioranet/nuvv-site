export interface SecurityPlan {
  id: string;
  name: string;
  userCount: number;
  devicesBreakdown: {
    workstations: string;
    mobiles: string;
    fileServers: string;
    passwords: string;
    vpn: string;
  };
  price: number;
  badge?: string;
  isPopular?: boolean;
  targetAudience: string;
  features: string[];
}

export const SECURITY_PLANS: SecurityPlan[] = [
  {
    id: 'sec-5-users',
    name: '05 Usuários',
    userCount: 5,
    devicesBreakdown: {
      workstations: '5 PCs / Macs',
      mobiles: '5 Dispositivos Móveis',
      fileServers: '1 Servidor de Arquivos',
      passwords: '5 Gerenciadores de Senhas',
      vpn: '5 VPNs Premium Ilimitadas',
    },
    price: 29.90,
    targetAudience: 'Microempresas, escritórios e consultórios',
    features: [
      'Proteção contra Ransomware com Rollback de arquivos',
      'Proteção para Pagamentos Online & Transações Bancárias (Safe Money)',
      '1 Servidor de Arquivos (Windows Server) Protegido',
      '5 Licenças de VPN Premium com tráfego ilimitado',
      '5 Contas de Gerenciador de Senhas Corporativo',
      'Criptografia de Dados & Backup Local e em Nuvem',
      'Console Único 100% em Nuvem (Instale e Esqueça)',
    ],
  },
  {
    id: 'sec-10-users',
    name: '10 Usuários',
    userCount: 10,
    devicesBreakdown: {
      workstations: '10 PCs / Macs',
      mobiles: '10 Dispositivos Móveis',
      fileServers: '1 Servidor de Arquivos',
      passwords: '10 Gerenciadores de Senhas',
      vpn: '10 VPNs Premium Ilimitadas',
    },
    price: 39.90,
    isPopular: true,
    badge: 'MAIS ESCOLHIDO',
    targetAudience: 'Pequenas empresas com múltiplos setores e computadores',
    features: [
      'Tudo do plano de 5 usuários para até 10 colaboradores',
      '10 PCs/Macs + 10 Smartphones protegidos simultaneamente',
      '1 Servidor de Arquivos Corporativo com Proteção Avançada',
      '10 Licenças de VPN Premium Ilimitada de alta velocidade',
      '10 Contas de Gerenciador de Senhas com cofre blindado',
      'Defesa contra Golpes Financeiros e Fraudes de Boletos',
      'Suporte Técnico Prioritário Nuvv Telecom',
    ],
  },
  {
    id: 'sec-25-users',
    name: '25 Usuários',
    userCount: 25,
    devicesBreakdown: {
      workstations: '25 PCs / Macs',
      mobiles: '25 Dispositivos Móveis',
      fileServers: '3 Servidores de Arquivos',
      passwords: '25 Gerenciadores de Senhas',
      vpn: '25 VPNs Premium Ilimitadas',
    },
    price: 69.90,
    targetAudience: 'Empresas em expansão, comércios e clínicas estruturadas',
    features: [
      'Proteção para até 25 Estações de Trabalho e 25 Celulares',
      '3 Servidores de Arquivos (Windows Server) Inclusos',
      '25 Licenças de VPN Premium com conexão ultrarrápida',
      '25 Gerenciadores de Senhas para toda a equipe',
      'Detecção de Ameaças em Tempo Real sem deixar o PC lento',
      'Políticas de Segurança Centralizadas no Portal Web',
      'Atendimento Corporativo com Especialista em Cibersegurança',
    ],
  },
  {
    id: 'sec-50-users',
    name: '50 Usuários',
    userCount: 50,
    devicesBreakdown: {
      workstations: '50 PCs / Macs',
      mobiles: '50 Dispositivos Móveis',
      fileServers: '5 Servidores de Arquivos',
      passwords: '50 Gerenciadores de Senhas',
      vpn: '50 VPNs Premium Ilimitadas',
    },
    price: 99.90,
    badge: 'MÁXIMA CAPACIDADE',
    targetAudience: 'Médias empresas e redes com infraestrutura distribuída',
    features: [
      'Proteção Completa para 50 Colaboradores (PCs + Mobiles)',
      'Até 5 Servidores de Arquivos Protegidos',
      '50 Licenças de VPN Premium Ilimitada para conexão segura',
      '50 Contas de Gerenciador de Senhas Corporativo',
      'Gestão em Lote e Instalação Remota Rápida',
      'Auditoria de Segurança e Relatórios de Conformidade LGPD',
      'Gerente de Contas Dedicado e SLA Especial de Suporte',
    ],
  },
];

export interface SecurityFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  badge: string;
}

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: 'vpn',
    title: 'VPN Premium Ilimitada',
    tagline: 'Conexão ultrarrápida, segura e criptografada em qualquer rede',
    description: 'Navegação protegida com tráfego ilimitado e alta velocidade. Oculte o IP da sua empresa e proteja dados confidenciais de colaboradores em home office ou conectados ao Wi-Fi público de cafés, hotéis e aeroportos.',
    iconName: 'ShieldCheck',
    badge: 'Tráfego Ilimitado',
  },
  {
    id: 'ransomware',
    title: 'Defesa Anti-Ransomware & Rollback',
    tagline: 'Recuperação instantânea de arquivos criptografados por vírus',
    description: 'Caso um arquivo seja atacado por ransomware, o Kaspersky Small Office Security bloqueia o processo malicioso e reverte automaticamente os arquivos afetados ao seu estado original.',
    iconName: 'ShieldAlert',
    badge: 'Rollback Automático',
  },
  {
    id: 'safemoney',
    title: 'Pagamentos Seguros (Safe Money)',
    tagline: 'Blindagem para transações bancárias e compras corporativas',
    description: 'Abre navegadores protegidos com teclado virtual seguro para operações bancárias, emissão de notas fiscais e pagamentos, impedindo a captura de senhas por keyloggers e spywares.',
    iconName: 'CreditCard',
    badge: 'Proteção Financeira',
  },
  {
    id: 'fileserver',
    title: 'Proteção para Servidores de Arquivos',
    tagline: 'Segurança robusta para Windows Server sem sobrecarregar a rede',
    description: 'Garante que os arquivos compartilhados no servidor da empresa fiquem livres de contaminações, ataques de rede e tentativas de sequestro de dados.',
    iconName: 'Server',
    badge: 'Windows Server',
  },
  {
    id: 'passwords',
    title: 'Gerenciador de Senhas Corporativo',
    tagline: 'Senhas fortes e autofill blindado para cada funcionário',
    description: 'Armazene credenciais de sistemas, contas bancárias e logins corporativos em cofres criptografados individuais para cada usuário.',
    iconName: 'Key',
    badge: 'Cofre Blindado',
  },
  {
    id: 'backup',
    title: 'Backup Automático & Criptografia',
    tagline: 'Seus dados confidenciais protegidos contra perdas acidentais',
    description: 'Programe rotinas de cópias de segurança em nuvem (Dropbox/OneDrive) ou discos locais, com criptografia de ponta a ponta que protege informações estratégicas da sua empresa.',
    iconName: 'HardDrive',
    badge: 'Proteção LGPD',
  },
];

export const SECURITY_FAQS = [
  {
    question: 'O que é o Kaspersky Small Office Security?',
    answer: 'É a solução de cibersegurança da Kaspersky projetada especialmente para empresas de 1 a 50 funcionários. Ela combina proteção de nível corporativo com facilidade de uso do tipo "instale e esqueça", dispensando administradores de TI dedicados.',
  },
  {
    question: 'A VPN Premium inclusa tem limite de dados diário?',
    answer: 'Não! No Kaspersky Small Office Security, cada usuário recebe uma licença de VPN Premium Ilimitada com conexões ultrarrápidas, sem restrição de tráfego de dados e com servidores globais de alta performance.',
  },
  {
    question: 'Quantos dispositivos cada licença de usuário cobre?',
    answer: 'Cada usuário tem direito a: 1 computador (PC Windows ou Mac) + 1 dispositivo móvel (Android ou iOS) + 1 conta do Kaspersky Password Manager + 1 licença de VPN Premium Ilimitada, além do número de servidores de arquivos definidos no plano.',
  },
  {
    question: 'Como funciona a instalação nos computadores dos funcionários?',
    answer: 'A instalação é extremamente simples. Através do portal web do Kaspersky, você gera um link de convite e envia por WhatsApp ou e-mail. Ao clicar, o instalador já configura tudo automaticamente sem intervenção técnica.',
  },
  {
    question: 'A solução deixa os computadores ou a rede lentos?',
    answer: 'Não. O Kaspersky Small Office Security opera em segundo plano com baixíssimo consumo de memória e CPU, garantindo que suas máquinas e servidores continuem trabalhando com velocidade máxima.',
  },
  {
    question: 'Como é feita a cobrança e o suporte?',
    answer: 'O serviço é faturado mensalmente na sua fatura da Nuvv Telecom, com suporte técnico prioritário e especializado fornecido pela nossa equipe de engenharia corporativa.',
  },
];
