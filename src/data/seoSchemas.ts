import { cities } from './cities';

export const BASE_URL = 'https://nuvv.com.br';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'TelecommunicationsProvider', 'InternetServiceProvider'],
  '@id': `${BASE_URL}/#organization`,
  name: 'Nuvv Telecomunicações e Tecnologia',
  alternateName: ['Nuvv', 'Nuvv Fibra', 'Nuvv Business Telecom'],
  legalName: 'Nuvv Internet e Tecnologia Ltda',
  url: BASE_URL,
  logo: `${BASE_URL}/images/brand/logo.png`,
  image: `${BASE_URL}/images/hero/home_1.png`,
  description:
    'Operadora de Telecomunicações e Infraestrutura Digital. Soluções corporativas de Link Dedicado 100% Simétrico, Banda Larga Semi-Dedicada com IP Fixo, Banda Larga Empresarial, Lan to Lan, PABX em Nuvem, Telefonia IP, Data Center e Internet 100% Fibra Óptica Residencial.',
  telephone: '+55-11-4741-9000',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Brasil',
    addressLocality: 'Suzano',
    addressRegion: 'SP',
    postalCode: '08674-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.5376,
    longitude: -46.3108,
  },
  areaServed: cities.map((c) => ({
    '@type': 'City',
    name: `${c.name}, ${c.state}`,
  })),
  sameAs: [
    'https://www.instagram.com/nuvvfibra',
    'https://www.facebook.com/nuvvfibra',
    'https://www.linkedin.com/company/nuvv-tecnologia',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo de Soluções de Telecomunicações e Conectividade Nuvv',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Conectividade Corporativa e Link Dedicado',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Link Dedicado 100% Simétrico Carrier-Grade (50Mbps a 10Gbps)',
              description: 'Garantia integral de 100% de banda (1:1), SLA contratual de até 4 horas, ASN próprio com BGP e bloco de IPs válidos.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Internet Semi-Dedicada com IP Fixo IPv4',
              description: 'Conexão corporativa de alta performance com 1 IP Fixo público (/32), garantia de 80% de banda (CIR) e SLA de 12h.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Banda Larga Empresarial para PMEs e Escritórios',
              description: 'Planos de 400 Mega a 1 Giga com Wi-Fi 6 de alta densidade e linha fixa corporativa inclusa.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Lan to Lan / Interligação de Filiais',
              description: 'Conexão ponto a ponto em camada 2 privada de altíssima segurança e baixa latência.',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Comunicação Unificada & Cloud Telecom',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'PABX Virtual em Nuvem com Ramais Móveis',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Telefonia IP, 0800 e Tronco SIP Corporativo',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Internet Residencial Fibra Óptica',
      },
    ],
  },
};

export const enterpriseDedicatedLinkSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/empresarial#link-dedicado`,
  serviceType: 'Link Dedicado de Fibra Óptica para Empresas (Carrier-Grade)',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Link Dedicado Nuvv Enterprise - Conectividade de Missão Crítica',
  description:
    'Circuito exclusivo de fibra óptica ponto a ponto com 100% de garantia de banda simétrica (1:1), SLA de reparo de 4 horas, ASN próprio com roteamento BGP, bloco de IPs fixos públicos e monitoramento proativo pelo NOC 24/7/365.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'BRL',
    price: '0.00',
    description: 'Orçamento personalizado conforme viabilidade e largura de banda solicitada (50Mbps a 10Gbps)',
    url: `${BASE_URL}/empresarial`,
    availability: 'https://schema.org/InStock',
  },
  areaServed: organizationSchema.areaServed,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Especificações Técnicas do Link Dedicado',
    itemListElement: [
      'Garantia de 100% da banda contratada (CIR 1:1 Full Duplex)',
      'SLA de atendimento e reparo em até 4 horas com 99,9% de disponibilidade',
      'Bloco de IPs públicos fixos válidos (/30 ou /29)',
      'Interconexão direta ao IX.br (PTT-Metro) e múltiplos links upstream',
      'Monitoramento proativo 24/7/365 via Network Operations Center (NOC)',
    ],
  },
};

export const enterpriseSemiDedicatedSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/empresarial#semi-dedicado`,
  serviceType: 'Internet Semi-Dedicada Empresarial com IP Fixo',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Internet Semi-Dedicada Nuvv Business',
  description:
    'Conexão de alta estabilidade para empresas com servidores locais, VPNs, sistemas de PDV/ERP e CFTV. Inclui 1 IP Fixo IPv4 válido (/32), garantia de banda de 80% (CIR), SLA de 12 horas e monitoramento NOC 24/7.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '199.90',
    highPrice: '399.90',
    offerCount: '3',
    url: `${BASE_URL}/empresarial`,
  },
  areaServed: organizationSchema.areaServed,
};

export const enterpriseBroadbandSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/empresarial#banda-larga`,
  serviceType: 'Banda Larga Fibra Óptica Empresarial',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Banda Larga Empresarial Nuvv PME',
  description:
    'Planos de internet fibra óptica de 400 Mega a 1 Giga para pequenos e médios negócios, lojas e escritórios, com Wi-Fi 6 de alta densidade, telefonia fixa inclusa e suporte comercial prioritário.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '99.99',
    highPrice: '159.99',
    offerCount: '3',
    url: `${BASE_URL}/empresarial`,
  },
  areaServed: organizationSchema.areaServed,
};

export const residentialPlansSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Planos de Internet Fibra Óptica Residencial Nuvv',
  description:
    'Planos de ultravelocidade 100% fibra óptica de 400 Mega a 1 Giga com Wi-Fi 6 de alta potência, canais ao vivo e streaming no App Watch, Max, Telecine, Premiere e Telemedicina 24h.',
  brand: {
    '@type': 'Brand',
    name: 'Nuvv Fibra',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '89.90',
    highPrice: '149.90',
    offerCount: '4',
    offers: [
      {
        '@type': 'Offer',
        name: 'Plano Fibra 400 Mega Essencial',
        price: '89.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/residencial`,
      },
      {
        '@type': 'Offer',
        name: 'Plano Fibra 600 Mega Turbo',
        price: '99.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/residencial`,
      },
      {
        '@type': 'Offer',
        name: 'Plano Fibra 800 Mega Família',
        price: '129.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/residencial`,
      },
      {
        '@type': 'Offer',
        name: 'Plano Fibra 1 Giga Ultra Power',
        price: '149.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/residencial`,
      },
    ],
  },
};

export const pabxServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'PABX Virtual em Nuvem Corporativo',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'PABX Cloud Inteligente Nuvv',
  description:
    'Telefonia corporativa em nuvem com ramais em smartphones, gravação de chamadas, URA personalizada, relatórios em tempo real e redução de até 70% de custos.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '99.99',
    highPrice: '399.99',
  },
  areaServed: organizationSchema.areaServed,
};

export const telephonyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Telefonia IP Corporativa e Tronco SIP',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Telefonia Digital e Tronco SIP Nuvv',
  description:
    'Linhas fixas digitais (DID), 0800 e Troncos SIP com alta fidelidade de voz via fibra óptica, portabilidade gratuita e planos ilimitados Brasil.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '9.90',
    highPrice: '29.90',
  },
  areaServed: organizationSchema.areaServed,
};

export const guardServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/guard#service`,
  serviceType: 'Segurança Inteligente, CFTV em Nuvem, Interfone Virtual e Rastreamento',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Nuvv Guard - Segurança Inteligente: Câmeras, Interfone Virtual e Tags',
  description:
    'Plataforma completa de segurança inteligente da Nuvv: Câmeras com gravação em nuvem contínua sem risco de furto do DVR, Interfone Virtual por QR Code sem custos de fiação com atendimento em vídeo no celular, e Tags de rastreamento para crianças, pets e veículos.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '9.90',
    highPrice: '74.90',
    offerCount: '6',
    url: `${BASE_URL}/guard`,
  },
  areaServed: organizationSchema.areaServed,
};

export const visionServiceSchema = guardServiceSchema;

export const socialWifiServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/social-wifi#service`,
  serviceType: 'Social Wi-Fi Marketing e Captação de Leads',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Nuvv Social Wi-Fi - Wi-Fi Inteligente e Marketing para Negócios',
  description:
    'Plataforma de Social Wi-Fi Marketing para empresas e estabelecimentos físicos. Captive portal personalizado, captação de leads (WhatsApp e E-mail), remarketing automático no Meta Ads e Google Ads, pesquisas NPS e 100% de conformidade com LGPD e Marco Civil.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '39.90',
    highPrice: '89.90',
    offerCount: '4',
    url: `${BASE_URL}/social-wifi`,
  },
  areaServed: organizationSchema.areaServed,
};

export const nuvvDigitalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/nuvv-digital#service`,
  serviceType: 'Comunicação Digital Corporativa, Multiatendimento WhatsApp Oficial, RCS e Inteligência Artificial',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Nuvv Digital - Multiatendimento WhatsApp Oficial, RCS e Agentes de Voz IA',
  description:
    'Plataforma corporativa omnichannel da Nuvv: Atendimento centralizado no WhatsApp Oficial com múltiplos atendentes no mesmo número, Automação de Instagram e Messenger, Mensageria RCS/SMS oficial e Agentes de Voz Inteligentes com IA para telefonia corporativa.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '149.90',
    highPrice: '299.90',
    offerCount: '3',
    url: `${BASE_URL}/nuvv-digital`,
  },
  areaServed: organizationSchema.areaServed,
};

export const businessComboServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/empresas/monte-seu-combo#service`,
  serviceType: 'Planômetro Corporativo e Combos Personalizados de Telecomunicações',
  provider: {
    '@id': `${BASE_URL}/#organization`,
  },
  name: 'Planômetro Corporativo Nuvv - Monte o Combo da sua Empresa',
  description:
    'Simulador e contratador sob medida de conectividade empresarial (Banda Larga ou Semi-Dedicado com IP Fixo e SLA 12h) combinado com PABX em Nuvem, Telefonia IP, Nuvv Digital CRM, Câmeras Nuvv Guard, TV Corporativa e Segurança Digital Endpoint.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'BRL',
    lowPrice: '99.90',
    highPrice: '1999.90',
    url: `${BASE_URL}/empresas/monte-seu-combo`,
  },
  areaServed: organizationSchema.areaServed,
};

export const createCitySchema = (cityName: string, state: string = 'SP') => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'TelecommunicationsProvider', 'InternetServiceProvider'],
  name: `Nuvv Telecomunicações - Fibra Óptica Residencial e Link Dedicado Empresarial em ${cityName} / ${state}`,
  url: `${BASE_URL}/cidade/${cityName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`,
  image: `${BASE_URL}/images/hero/home_1.png`,
  telephone: '+55-11-4745-9000',
  description: `Operadora de Telecomunicações em ${cityName} - ${state}. Planos Residenciais de até 1 Giga com Wi-Fi 6 e TV no App Watch, e Soluções Corporativas completas: Link Dedicado 100% simétrico com SLA de 4h, Banda Larga Semi-Dedicada com IP Fixo, PABX em Nuvem, Nuvv Digital e Nuvv Guard para empresas de todos os portes.`,
  areaServed: {
    '@type': 'City',
    name: `${cityName}, ${state}`,
  },
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Portugal Freixo, 242 – Sala 151 – Centro',
    addressLocality: cityName,
    addressRegion: state,
    postalCode: '08674-170',
    addressCountry: 'BR',
  },
});

export const createFaqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
