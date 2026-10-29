/**
 * Schema.org Structured Data in English for Nuvv Global Partners
 */

export const globalOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TelecommunicationsProvider',
  '@id': 'https://nuvv.com.br/#international-organization',
  name: 'Nuvv Global Partners',
  legalName: 'Nuvv Tecnologia LTDA',
  url: 'https://nuvv.com.br/en/',
  logo: 'https://nuvv.com.br/images/external/favicon.png',
  description: 'Brazilian carrier-grade telecommunications and enterprise connectivity provider. Dedicated Internet Access (DIA), Last Mile Fiber, and Local Loop partner for global MSPs, carriers, and system integrators.',
  telephone: '+55-11-4745-9000',
  email: 'partners@nuvv.com.br',
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
  knowsAbout: [
    'Dedicated Internet Access Brazil',
    'Carrier Ethernet & Local Loop Brazil',
    'Last Mile Optical Fiber',
    'SD-WAN Underlay Networks',
    'BGP Peering & Autonomous System (ASN)',
    'Wholesale Telecommunications Interconnection',
  ],
  sameAs: [
    'https://www.linkedin.com/company/nuvvfibra',
    'https://www.instagram.com/nuvvfibra',
  ],
};

export const createTelecomServiceSchema = (
  serviceName: string,
  serviceType: string,
  description: string,
  url: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'TelecomService',
  name: serviceName,
  serviceType: serviceType,
  provider: {
    '@type': 'Organization',
    name: 'Nuvv Global Partners',
    url: 'https://nuvv.com.br/en/',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
  description: description,
  url: url,
  serviceChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://nuvv.com.br/en/contact/',
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: '+55-11-4745-9000',
      contactType: 'Wholesale & Global Partner Desk',
      availableLanguage: ['English', 'Portuguese', 'Spanish'],
    },
  },
});
