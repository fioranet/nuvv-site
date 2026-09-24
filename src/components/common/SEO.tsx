import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  schema?: Record<string, any> | Record<string, any>[];
  cityName?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [
    'internet fibra optica',
    'provedor de internet',
    'fibra residencial',
    'link dedicado',
    'pabx em nuvem',
    'telefonia ip',
    'nuvv fibra',
    'internet rapida',
  ],
  canonicalUrl,
  ogImage = 'https://nuvv.com.br/images/external/favicon.png',
  ogType = 'website',
  schema,
  cityName,
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes('Nuvv') ? title : `${title} | Nuvv Fibra & Tecnologia`;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create canonical link
    const setCanonical = (url: string) => {
      let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', url);
    };

    // 2. Standard Meta Tags
    setMeta('description', description);
    const combinedKeywords = cityName
      ? [
          `internet fibra em ${cityName}`,
          `provedor ${cityName}`,
          `melhor internet ${cityName}`,
          `plano de internet empresarial ${cityName}`,
          ...keywords,
        ]
      : keywords;
    setMeta('keywords', combinedKeywords.join(', '));
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('author', 'Nuvv');
    setMeta('publisher', 'Nuvv');
    setMeta('language', 'Portuguese');
    setMeta('classification', 'Internet Fibra Óptica, TI Corporativa, Segurança e Telefonia');

    // Geo Meta Tags (Local SEO & GEO)
    const effectiveCity = cityName || 'Suzano';
    setMeta('geo.region', 'BR-SP');
    setMeta('geo.placename', effectiveCity);

    // 3. Open Graph / Facebook / WhatsApp
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:secure_url', ogImage, true);
    setMeta('og:image:type', 'image/png', true);
    setMeta('og:image:width', '300', true);
    setMeta('og:image:height', '300', true);
    setMeta('og:image:alt', fullTitle, true);
    setMeta('og:type', ogType, true);
    setMeta('og:locale', 'pt_BR', true);
    setMeta('og:site_name', 'Nuvv', true);

    const currentUrl = canonicalUrl || window.location.href;
    setMeta('og:url', currentUrl, true);
    setCanonical(currentUrl);

    // 4. Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:image:alt', fullTitle);

    // 5. Schema.org JSON-LD Structured Data
    const existingScript = document.getElementById('nuvv-schema-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    // Cria schema padrão caso a página não especifique um personalizado
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://nuvv.com.br/',
      },
    ];

    let currentPath = 'https://nuvv.com.br';
    pathSegments.forEach((segment, idx) => {
      currentPath += `/${segment}`;
      const segmentName =
        segment === 'residencial'
          ? 'Fibra Residencial'
          : segment === 'empresarial' || segment === 'empresas'
          ? 'Nuvv Empresas'
          : segment === 'monte-seu-combo'
          ? 'Monte seu Combo'
          : segment === 'pabx'
          ? 'PABX em Nuvem'
          : segment === 'telefonia'
          ? 'Telefonia IP'
          : segment === 'guard'
          ? 'Nuvv Guard'
          : segment === 'nuvv-digital' || segment === 'comunicacao-inteligente'
          ? 'Comunicação Digital'
          : segment === 'seguranca-digital'
          ? 'Segurança Digital'
          : segment === 'social-wifi'
          ? 'Hotspot Social Wi-Fi'
          : segment === 'viabilidade'
          ? 'Consulta de Cobertura'
          : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

      breadcrumbItems.push({
        '@type': 'ListItem',
        position: idx + 2,
        name: segmentName,
        item: currentPath,
      });
    });

    const defaultSchemaGraph = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description: description,
        url: currentUrl,
        inLanguage: 'pt-BR',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Nuvv',
          url: 'https://nuvv.com.br/',
        },
      },
    ];

    const finalSchema = schema ? (Array.isArray(schema) ? schema : [schema]) : defaultSchemaGraph;

    const script = document.createElement('script');
    script.id = 'nuvv-schema-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(finalSchema.length === 1 ? finalSchema[0] : { '@context': 'https://schema.org', '@graph': finalSchema });
    document.head.appendChild(script);

    return () => {
      const jsonLd = document.getElementById('nuvv-schema-jsonld');
      if (jsonLd) jsonLd.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema, cityName]);

  return null;
};
