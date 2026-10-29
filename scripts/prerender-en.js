import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const templatePath = path.join(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

const pages = [
  {
    route: '/en/',
    outputDir: path.join(distPath, 'en'),
    title: 'Nuvv Global Partners | Wholesale Connectivity & Telecom Infrastructure in Brazil',
    description: 'Wholesale telecom infrastructure partner in Brazil. Providing Local Loop, Last Mile Fiber, Dedicated Internet Access (DIA 1:1), and Multi-site Connectivity for MSPs and Global Carriers.',
    canonical: 'https://nuvv.com.br/en/',
    ptEquivalent: 'https://nuvv.com.br/empresas',
    serviceSchema: null,
  },
  {
    route: '/en/partners/',
    outputDir: path.join(distPath, 'en/partners'),
    title: 'Partner Program | Global MSPs, Carriers & Integrators in Brazil — Nuvv',
    description: 'Expand your connectivity footprint into Brazil without local entity overhead. Turnkey wholesale solutions for MSPs, System Integrators, and Global Carriers.',
    canonical: 'https://nuvv.com.br/en/partners/',
    ptEquivalent: 'https://nuvv.com.br/empresas',
    serviceSchema: {
      name: 'Nuvv Global Partner Program',
      type: 'Wholesale Carrier Partnership',
      description: 'Turnkey network infrastructure partnership for international MSPs, telecom carriers, and aggregators operating in Brazil.',
    },
  },
  {
    route: '/en/wholesale-connectivity/',
    outputDir: path.join(distPath, 'en/wholesale-connectivity'),
    title: 'Wholesale Connectivity & Last Mile Fiber in Brazil | Nuvv Global Partners',
    description: 'Carrier-grade Local Loop, Last Mile Fiber, and Layer 2 Ethernet circuits in Brazil. MEF-aligned, high MTTR, and redundant NNI points for global network operators.',
    canonical: 'https://nuvv.com.br/en/wholesale-connectivity/',
    ptEquivalent: 'https://nuvv.com.br/empresarial',
    serviceSchema: {
      name: 'Wholesale Connectivity & Local Loop Brazil',
      type: 'Carrier Ethernet / Last Mile Fiber',
      description: 'Carrier-grade optical local loop, last mile fiber circuits, and Layer 2 transport in Brazil.',
    },
  },
  {
    route: '/en/dedicated-internet-brazil/',
    outputDir: path.join(distPath, 'en/dedicated-internet-brazil'),
    title: 'Dedicated Internet Access (DIA) in Brazil | 1:1 CIR & BGP — Nuvv',
    description: 'Guaranteed 1:1 CIR Dedicated Internet Access in Brazil. Low-latency IX.br peering, BGP routing, /29 IPv4 blocks, and 99.9% uptime SLA for multinational operations.',
    canonical: 'https://nuvv.com.br/en/dedicated-internet-brazil/',
    ptEquivalent: 'https://nuvv.com.br/link-dedicado',
    serviceSchema: {
      name: 'Dedicated Internet Access (DIA) Brazil',
      type: 'Dedicated Internet Access (DIA)',
      description: '1:1 CIR guaranteed symmetrical Dedicated Internet Access with direct IX.br peering and BGP multi-homing.',
    },
  },
  {
    route: '/en/multi-site-connectivity/',
    outputDir: path.join(distPath, 'en/multi-site-connectivity'),
    title: 'Multi-Site Connectivity & SD-WAN Underlays in Brazil | Nuvv',
    description: 'High-performance multi-site branch interconnection and SD-WAN underlay circuits across Brazil. Fully compatible with Cisco, Fortinet, Versa, and Meraki.',
    canonical: 'https://nuvv.com.br/en/multi-site-connectivity/',
    ptEquivalent: 'https://nuvv.com.br/interligacao',
    serviceSchema: {
      name: 'Multi-Site Interconnection & SD-WAN Underlay Brazil',
      type: 'Enterprise WAN / SD-WAN Underlay',
      description: 'Multi-site branch interconnection and low-latency SD-WAN underlay circuits connecting corporate hubs in Brazil.',
    },
  },
  {
    route: '/en/contact/',
    outputDir: path.join(distPath, 'en/contact'),
    title: 'Request a Quote | International Telecom Feasibility in Brazil — Nuvv',
    description: 'Submit your connectivity requirements, circuit RFP, or partner inquiry for Brazil. Fast technical feasibility feedback within 24 business hours.',
    canonical: 'https://nuvv.com.br/en/contact/',
    ptEquivalent: 'https://nuvv.com.br/suporte',
    serviceSchema: null,
  },
];

console.log('🌐 Starting static pre-rendering for English routes...');

pages.forEach((page) => {
  let html = template;

  // 1. Language attribute
  html = html.replace('<html lang="pt-BR">', '<html lang="en">');

  // 2. Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);

  // 3. Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${page.description}" />`
  );

  // 4. Canonical
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  // 5. Open Graph Meta Tags
  html = html.replace(/<meta property="og:locale" content=".*?" \/>/s, '<meta property="og:locale" content="en_US" />');
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${page.canonical}" />`
  );

  // 6. Twitter Meta Tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  // 7. Inject Hreflang alternates into <head>
  const hreflangTags = `
    <!-- Hreflang International Alternates -->
    <link rel="alternate" hreflang="en" href="${page.canonical}" />
    <link rel="alternate" hreflang="pt-BR" href="${page.ptEquivalent}" />
    <link rel="alternate" hreflang="x-default" href="https://nuvv.com.br/en/" />
  `;

  // 8. Inject Structured Data JSON-LD
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'TelecommunicationsProvider',
    '@id': 'https://nuvv.com.br/#international-organization',
    name: 'Nuvv Global Partners',
    legalName: 'Nuvv Tecnologia LTDA',
    url: 'https://nuvv.com.br/en/',
    logo: 'https://nuvv.com.br/images/external/favicon.png',
    description: page.description,
    telephone: '+55-11-4745-9000',
    email: 'partners@nuvv.com.br',
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
  };

  let schemaScripts = `
    <script type="application/ld+json">
      ${JSON.stringify(orgSchema, null, 2)}
    </script>
  `;

  if (page.serviceSchema) {
    const serviceJson = {
      '@context': 'https://schema.org',
      '@type': 'TelecomService',
      name: page.serviceSchema.name,
      serviceType: page.serviceSchema.type,
      description: page.serviceSchema.description,
      url: page.canonical,
      provider: {
        '@type': 'Organization',
        name: 'Nuvv Global Partners',
        url: 'https://nuvv.com.br/en/',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brazil',
      },
    };
    schemaScripts += `
    <script type="application/ld+json">
      ${JSON.stringify(serviceJson, null, 2)}
    </script>
    `;
  }

  // Insert hreflang and schemas before </head>
  html = html.replace('</head>', `${hreflangTags}\n${schemaScripts}\n</head>`);

  // Create directory if not exists
  if (!fs.existsSync(page.outputDir)) {
    fs.mkdirSync(page.outputDir, { recursive: true });
  }

  const destination = path.join(page.outputDir, 'index.html');
  fs.writeFileSync(destination, html, 'utf-8');
  console.log(`✅ Pre-rendered: ${page.route} -> ${path.relative(distPath, destination)}`);
});

console.log('🎉 Static pre-rendering for English pages completed successfully!');
