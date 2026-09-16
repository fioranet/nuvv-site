import { ProductCategory } from './products';

export interface ShopItemConfig {
  id: string;
  category: ProductCategory;
  brand: string;
  badge?: string;
  customAffiliateUrl?: string;
  fallback: {
    name: string;
    description: string;
    priceFormatted: string;
    priceValue: number;
    originalPriceFormatted?: string;
    installments?: string;
    shippingInfo?: string;
    image: string;
    affiliateUrl: string;
    highlightSpecs: string[];
  };
}

export const SHOP_CATALOG_CONFIG: ShopItemConfig[] = [
  {
    "id": "roku-streaming-stick-2025",
    "category": "streaming",
    "brand": "Roku",
    "badge": "Lançamento 2025",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0FH7LY3R4?tag=nuvv09-20",
    "fallback": {
      "name": "Roku Streaming Stick (Modelo 2025) com Controle Remoto",
      "description": "Dispositivo portátil de streaming rápido em alta definição, compatível nativamente com NuvvPlay e todos os apps.",
      "priceFormatted": "R$ 299,00",
      "priceValue": 299,
      "originalPriceFormatted": "R$ 349,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/roku-stick-plus-4k.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0FH7LY3R4?tag=nuvv09-20",
      "highlightSpecs": [
        "Compatível com NuvvPlay",
        "Instalação Plug & Play HDMI"
      ]
    }
  },
  {
    "id": "roku-streaming-stick-4k",
    "category": "streaming",
    "brand": "Roku",
    "badge": "4K Ultra HD",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0FH7CY2WK?tag=nuvv09-20",
    "fallback": {
      "name": "Roku Streaming Stick+ 4K HDR com Controle por Voz",
      "description": "Streaming portátil em 4K HDR com receptor de Wi-Fi de longo alcance para transmissões ultrarrápidas.",
      "priceFormatted": "R$ 349,00",
      "priceValue": 349,
      "originalPriceFormatted": "R$ 449,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/roku-stick-plus-4k.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0FH7CY2WK?tag=nuvv09-20",
      "highlightSpecs": [
        "Resolução 4K HDR10+",
        "Wi-Fi de Longo Alcance"
      ]
    }
  },
  {
    "id": "amazon-fire-tv-hd",
    "category": "streaming",
    "brand": "Amazon",
    "badge": "Mais Vendido • NuvvPlay",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0DVK166SV?tag=nuvv09-20",
    "fallback": {
      "name": "Amazon Fire TV Stick HD com Controle por Voz Alexa",
      "description": "Streaming em Full HD rápido com comandos de voz Alexa, botões dedicados e compatibilidade total com o app NuvvPlay.",
      "priceFormatted": "R$ 289,00",
      "priceValue": 289,
      "originalPriceFormatted": "R$ 349,00",
      "installments": "em até 10x de R$ 28,90 sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/amazon-fire-tv-hd.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0DVK166SV?tag=nuvv09-20",
      "highlightSpecs": [
        "App NuvvPlay Nativo",
        "Controle com Alexa por Voz"
      ]
    }
  },
  {
    "id": "amazon-fire-tv-4k",
    "category": "streaming",
    "brand": "Amazon",
    "badge": "4K Ultra HD • Wi-Fi 6",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0CJLFQP4W?tag=nuvv09-20",
    "fallback": {
      "name": "Amazon Fire TV Stick 4K com Controle por Voz Alexa",
      "description": "Imagens impressionantes em 4K Ultra HD com suporte a Dolby Vision, Dolby Atmos e conectividade Wi-Fi avançada.",
      "priceFormatted": "R$ 449,00",
      "priceValue": 449,
      "originalPriceFormatted": "R$ 499,00",
      "installments": "em até 10x de R$ 44,90 sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/amazon-fire-tv-4k.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0CJLFQP4W?tag=nuvv09-20",
      "highlightSpecs": [
        "Resolução 4K Dolby Vision",
        "Áudio Imersivo Dolby Atmos"
      ]
    }
  },
  {
    "id": "intelbras-fr101",
    "category": "casa-inteligente",
    "brand": "Intelbras",
    "badge": "Segurança & Praticidade",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B076HWLP7P?tag=nuvv09-20",
    "fallback": {
      "name": "Fechadura Digital de Sobrepor Intelbras FR 101 Preta",
      "description": "Abertura por senha touch screen, travamento automático da porta e alarme contra arrombamento.",
      "priceFormatted": "R$ 389,00",
      "priceValue": 389,
      "originalPriceFormatted": "R$ 449,00",
      "installments": "em até 10x de R$ 38,90 sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-fr101.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B076HWLP7P?tag=nuvv09-20",
      "highlightSpecs": [
        "Até 4 Senhas de Acesso",
        "Sensor de Travamento Automático"
      ]
    }
  },
  {
    "id": "intelbras-fr221v",
    "category": "casa-inteligente",
    "brand": "Intelbras",
    "badge": "Com Visor Digital",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0GJTTTG1W?tag=nuvv09-20",
    "fallback": {
      "name": "Fechadura Digital Intelbras FR 221V de Sobrepor com Visor",
      "description": "Design premium com display touchscreen de alta sensibilidade e chaveiro de aproximação RFID.",
      "priceFormatted": "R$ 549,00",
      "priceValue": 549,
      "originalPriceFormatted": "R$ 629,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-fr101.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0GJTTTG1W?tag=nuvv09-20",
      "highlightSpecs": [
        "Abertura por Senha ou Tag RFID",
        "Alarme Sonoro de Violação"
      ]
    }
  },
  {
    "id": "intelbras-im3c",
    "category": "cameras",
    "brand": "Intelbras",
    "badge": "Mais Vendida",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B09Q3JVDYS?tag=nuvv09-20",
    "fallback": {
      "name": "Câmera Inteligente Interna Intelbras iM3 C Wi-Fi Full HD",
      "description": "Monitoramento interno em Full HD 1080p com áudio bidirecional e inteligência artificial para detecção de pessoas.",
      "priceFormatted": "R$ 219,00",
      "priceValue": 219,
      "originalPriceFormatted": "R$ 259,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-im3c.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B09Q3JVDYS?tag=nuvv09-20",
      "highlightSpecs": [
        "Full HD 1080p com Visão Noturna",
        "Áudio Bidirecional (Fale e Ouça)"
      ]
    }
  },
  {
    "id": "intelbras-im5sc",
    "category": "cameras",
    "brand": "Intelbras",
    "badge": "Visão Noturna Colorida",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B09SPGZHMP?tag=nuvv09-20",
    "fallback": {
      "name": "Câmera Inteligente Intelbras iM5 SC Wi-Fi Full HD Color",
      "description": "Segurança externa com proteção IP67 contra sol e chuva, holofote integrado e visão noturna 100% colorida.",
      "priceFormatted": "R$ 329,00",
      "priceValue": 329,
      "originalPriceFormatted": "R$ 389,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-im5sc.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B09SPGZHMP?tag=nuvv09-20",
      "highlightSpecs": [
        "Visão Noturna Colorida com Holofote",
        "Proteção IP67 para Uso Externo"
      ]
    }
  },
  {
    "id": "intelbras-im5-plus",
    "category": "cameras",
    "brand": "Intelbras",
    "badge": "Externa IP67",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0B3S5YHDX?tag=nuvv09-20",
    "fallback": {
      "name": "Câmera Externa de Segurança Intelbras iM5 Full HD",
      "description": "Câmera Wi-Fi externa robusta para fachadas, portões e empresas com alcance infravermelho de 30 metros.",
      "priceFormatted": "R$ 349,00",
      "priceValue": 349,
      "originalPriceFormatted": "R$ 399,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-im5sc.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0B3S5YHDX?tag=nuvv09-20",
      "highlightSpecs": [
        "Alcance Noturno de até 30 Metros",
        "Microfone Integrado & Alerta no App"
      ]
    }
  },
  {
    "id": "intelbras-im4c",
    "category": "cameras",
    "brand": "Intelbras",
    "badge": "Giro 360° Pan-Tilt",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B09Q3K3VR1?tag=nuvv09-20",
    "fallback": {
      "name": "Câmera Inteligente 360° Intelbras iM4 C Wi-Fi Full HD",
      "description": "Cobertura 360° interna com rastreamento inteligente de movimento para você não perder nenhum detalhe.",
      "priceFormatted": "R$ 269,00",
      "priceValue": 269,
      "originalPriceFormatted": "R$ 319,00",
      "installments": "em até 8x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-im1.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B09Q3K3VR1?tag=nuvv09-20",
      "highlightSpecs": [
        "Giro 360° com Auto-Tracking",
        "Detector de Barulhos e Choro de Bebê"
      ]
    }
  },
  {
    "id": "intelbras-im7",
    "category": "cameras",
    "brand": "Intelbras",
    "badge": "360° Externa 2K",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0B9D7LT36?tag=nuvv09-20",
    "fallback": {
      "name": "Câmera Inteligente 360° Intelbras iM7 3MP 2K Full Color",
      "description": "Câmera externa 360° com resolução 2K 3MP, rastreamento de pessoas e holofotes integrados.",
      "priceFormatted": "R$ 459,00",
      "priceValue": 459,
      "originalPriceFormatted": "R$ 549,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/intelbras-im7.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0B9D7LT36?tag=nuvv09-20",
      "highlightSpecs": [
        "Resolução Ultra 2K (3 Megapixels)",
        "Giro 360° com Auto-Tracking"
      ]
    }
  },
  {
    "id": "amazon-echo-dot",
    "category": "casa-inteligente",
    "brand": "Amazon",
    "badge": "Mais Vendido Alexa",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B09B8VGCR8?tag=nuvv09-20",
    "fallback": {
      "name": "Amazon Echo Dot 5ª Geração Smart Speaker com Alexa - Preto",
      "description": "O Echo Dot com o melhor som já lançado: vocais nítidos, graves potentes e sensor de temperatura integrado.",
      "priceFormatted": "R$ 429,00",
      "priceValue": 429,
      "originalPriceFormatted": "R$ 499,00",
      "installments": "em até 10x de R$ 42,90 sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/amazon-echo-dot.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B09B8VGCR8?tag=nuvv09-20",
      "highlightSpecs": [
        "Comandos de Voz com Alexa",
        "Som Imersivo com Graves Potentes"
      ]
    }
  },
  {
    "id": "amazon-echo-pop",
    "category": "casa-inteligente",
    "brand": "Amazon",
    "badge": "Alexa Integrada",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0H7T7SLNZ?tag=nuvv09-20",
    "fallback": {
      "name": "Amazon Echo Pop Smart Speaker compacto com Alexa",
      "description": "Smart speaker compacto com som envolvente ideal para quartos e escritórios. Controle automações e músicas.",
      "priceFormatted": "R$ 349,00",
      "priceValue": 349,
      "originalPriceFormatted": "R$ 399,00",
      "installments": "em até 10x de R$ 34,90 sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/amazon-echo-pop.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0H7T7SLNZ?tag=nuvv09-20",
      "highlightSpecs": [
        "Comandos de Voz com Alexa",
        "Design Compacto e Elegante"
      ]
    }
  },
  {
    "id": "tplink-archer-be550",
    "category": "conectividade",
    "brand": "TP-Link",
    "badge": "Topo de Linha Wi-Fi 7",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0D3619JX7?tag=nuvv09-20",
    "fallback": {
      "name": "Roteador Wi-Fi 7 Tri-Band TP-Link Archer BE550 BE9300",
      "description": "Roteador Wi-Fi 7 Tri-Band de 9.3 Gbps com 5 portas 2.5G Multi-Gigabit e tecnologia MLO.",
      "priceFormatted": "R$ 1.699,00",
      "priceValue": 1699,
      "originalPriceFormatted": "R$ 1.999,00",
      "installments": "em até 10x sem juros de R$ 169,90",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/tplink-archer-be550.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0D3619JX7?tag=nuvv09-20",
      "highlightSpecs": [
        "Wi-Fi 7 Tri-Band BE9300 (9.3 Gbps)",
        "5 Portas 2.5G Multi-Gigabit"
      ]
    }
  },
  {
    "id": "tplink-archer-ax12",
    "category": "conectividade",
    "brand": "TP-Link",
    "badge": "Wi-Fi 6 Gigabit",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0CZ5XKNXD?tag=nuvv09-20",
    "fallback": {
      "name": "Roteador Wi-Fi 6 TP-Link Archer AX12 Gigabit AX1500",
      "description": "Roteador Wi-Fi 6 de alta velocidade com tecnologia OFDMA, portas Full Gigabit e 4 antenas externas.",
      "priceFormatted": "R$ 279,00",
      "priceValue": 279,
      "originalPriceFormatted": "R$ 349,00",
      "installments": "em até 8x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/tplink-archer-be220.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0CZ5XKNXD?tag=nuvv09-20",
      "highlightSpecs": [
        "Tecnologia Wi-Fi 6 AX1500",
        "Portas Full Gigabit 10/100/1000"
      ]
    }
  },
  {
    "id": "tplink-ex521v",
    "category": "conectividade",
    "brand": "TP-Link",
    "badge": "Ultra Velocidade AX3000",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B0FVMK6QZF?tag=nuvv09-20",
    "fallback": {
      "name": "Roteador Wi-Fi 6 TP-Link EX521v AX3000 Gigabit Mesh",
      "description": "Roteador Wi-Fi 6 corporativo e residencial de alta performance AX3000 com tecnologia EasyMesh e portas Gigabit.",
      "priceFormatted": "R$ 499,00",
      "priceValue": 499,
      "originalPriceFormatted": "R$ 599,00",
      "installments": "em até 10x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/tplink-archer-be220.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B0FVMK6QZF?tag=nuvv09-20",
      "highlightSpecs": [
        "Velocidade AX3000 até 3 Gbps",
        "Compatível com Tecnologia Mesh"
      ]
    }
  },
  {
    "id": "mercusys-ms105g",
    "category": "conectividade",
    "brand": "Mercusys",
    "badge": "Gigabit 1000 Mbps",
    "customAffiliateUrl": "https://www.amazon.com.br/dp/B07RK6CVS3?tag=nuvv09-20",
    "fallback": {
      "name": "Switch de Mesa Mercusys MS105G 5 Portas Gigabit",
      "description": "Expanda a rede da sua casa ou escritório com 5 portas Full Gigabit e gabinete compacto.",
      "priceFormatted": "R$ 89,90",
      "priceValue": 89.9,
      "originalPriceFormatted": "R$ 119,00",
      "installments": "em até 3x sem juros",
      "shippingInfo": "Frete Grátis Prime",
      "image": "/images/shop/mercusys-ms105gs.jpg",
      "affiliateUrl": "https://www.amazon.com.br/dp/B07RK6CVS3?tag=nuvv09-20",
      "highlightSpecs": [
        "5 Portas RJ45 Gigabit 1000 Mbps",
        "Instalação Plug and Play"
      ]
    }
  }
];
