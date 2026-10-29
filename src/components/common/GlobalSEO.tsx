import React, { useEffect } from 'react';

export interface GlobalSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string; // e.g. '/en/' or '/en/wholesale-connectivity/'
  ptEquivalentPath?: string; // e.g. '/' or '/empresarial'
  schema?: Record<string, any> | Record<string, any>[];
  ogImage?: string;
}

export const GlobalSEO: React.FC<GlobalSEOProps> = ({
  title,
  description,
  keywords = [
    'brazil telecom partner',
    'dedicated internet access brazil',
    'brazil local loop provider',
    'last mile fiber brazil',
    'wholesale connectivity brazil',
    'sd-wan underlay brazil',
  ],
  canonicalPath,
  ptEquivalentPath,
  schema,
  ogImage = 'https://nuvv.com.br/images/external/favicon.png',
}) => {
  useEffect(() => {
    // 1. Language HTML attribute
    document.documentElement.lang = 'en';

    // 2. Title
    const fullTitle = title.includes('Nuvv') ? title : `${title} | Nuvv Global Partners Brazil`;
    document.title = fullTitle;

    // Helper to set meta tags
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

    // Helper to set link tags
    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard meta tags
    setMeta('description', description);
    setMeta('keywords', keywords.join(', '));
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('author', 'Nuvv Global Partners');
    setMeta('publisher', 'Nuvv Tecnologia LTDA');
    setMeta('language', 'English');
    setMeta('classification', 'Telecommunications, Dedicated Internet Access, Last Mile Fiber, Wholesale Carrier');

    // Geo Meta Tags (Brazil / São Paulo Economic Hub)
    setMeta('geo.region', 'BR-SP');
    setMeta('geo.placename', 'São Paulo, Brazil');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:secure_url', ogImage, true);
    setMeta('og:type', 'website', true);
    setMeta('og:locale', 'en_US', true);
    setMeta('og:site_name', 'Nuvv Global Partners', true);

    const fullCanonicalUrl = `https://nuvv.com.br${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setMeta('og:url', fullCanonicalUrl, true);
    setLink('canonical', fullCanonicalUrl);

    // Hreflang Tags
    setLink('alternate', fullCanonicalUrl, 'en');
    if (ptEquivalentPath) {
      const ptFullUrl = `https://nuvv.com.br${ptEquivalentPath.startsWith('/') ? ptEquivalentPath : `/${ptEquivalentPath}`}`;
      setLink('alternate', ptFullUrl, 'pt-BR');
    }
    setLink('alternate', 'https://nuvv.com.br/en/', 'x-default');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Schema.org JSON-LD
    const scriptId = 'nuvv-global-schema-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) {
      script.remove();
    }
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    const schemaContent = schema
      ? Array.isArray(schema)
        ? { '@context': 'https://schema.org', '@graph': schema }
        : schema
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: fullTitle,
          description: description,
          url: fullCanonicalUrl,
          inLanguage: 'en',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Nuvv Global Partners',
            url: 'https://nuvv.com.br/en/',
          },
        };
    script.text = JSON.stringify(schemaContent);
    document.head.appendChild(script);

    // Cleanup on unmount (restore pt-BR default if navigating back to main site)
    return () => {
      document.documentElement.lang = 'pt-BR';
      const jsonScript = document.getElementById(scriptId);
      if (jsonScript) jsonScript.remove();
    };
  }, [title, description, keywords, canonicalPath, ptEquivalentPath, schema, ogImage]);

  return null;
};
