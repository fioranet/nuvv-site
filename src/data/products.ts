export type ProductCategory =
  | 'streaming'
  | 'casa-inteligente'
  | 'conectividade'
  | 'cameras'
  | 'telefonia'
  | 'access-point';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  officialStore?: string;
  description: string;
  priceFormatted: string;
  priceValue: number;
  originalPriceFormatted?: string;
  installments?: string;
  shippingInfo?: string;
  image: string;
  affiliateUrl: string;
  badge?: string;
  highlightSpecs: string[];
}

export const PRODUCT_CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'streaming', label: 'Streaming & TV', icon: 'Tv' },
  { id: 'casa-inteligente', label: 'Casa Inteligente & Alexa', icon: 'Home' },
  { id: 'conectividade', label: 'Conectividade & Wi-Fi', icon: 'Wifi' },
  { id: 'cameras', label: 'Câmeras de Segurança', icon: 'Video' },
  { id: 'telefonia', label: 'Telefonia & VoIP', icon: 'PhoneCall' },
  { id: 'access-point', label: 'Access Points', icon: 'Radio' },
];

/**
 * 🛒 Catálogo Oficial do Nuvv Shop (Parceria Amazon Brasil)
 * 
 * 👉 Para editar qualquer item manualmente:
 * - Nome: name
 * - Preço à vista: priceFormatted
 * - Preço 'De': originalPriceFormatted
 * - Condição de Parcelamento: installments
 * - Selo de Frete: shippingInfo (ex: 'Frete Grátis Prime')
 * - Imagem: image (salve o arquivo .jpg na pasta public/images/shop/)
 * - Link: affiliateUrl (com seu código ?tag=nuvv09-20)
 */
export const PRODUCTS: Product[] = [
  {
    "id": "roku-streaming-stick-2025",
    "name": "Streaming Stick HD",
    "category": "streaming",
    "brand": "Roku",
    "description": "Dispositivo portátil de streaming rápido em alta definição, compatível nativamente com NuvvPlay e todos os apps.",
    "priceFormatted": "R$ 246,05",
    "priceValue": 246.05,
    "originalPriceFormatted": "R$ 289,90",
    "installments": "em até 6x de R$ 42,13/mês",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/roku-stick-hd.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0FH7LY3R4?tag=nuvv09-20",
    "badge": "Lançamento 2025",
    "highlightSpecs": [
      "Compatível com NuvvPlay",
      "Instalação Plug & Play HDMI"
    ]
  },
  {
    "id": "roku-streaming-stick-4k",
    "name": "Streaming Stick Plus 4K",
    "category": "streaming",
    "brand": "Roku",
    "description": "Streaming portátil em 4K HDR com receptor de Wi-Fi de longo alcance para transmissões ultrarrápidas.",
    "priceFormatted": "R$ 399,90",
    "priceValue": 399.90,
    "originalPriceFormatted": "R$ 449,00",
    "installments": "em até 8x de R$ 50,04 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/roku-stick-plus-4k.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0FH7CY2WK?tag=nuvv09-20",
    "badge": "4K Ultra HD",
    "highlightSpecs": [
      "Resolução 4K HDR10+",
      "Wi-Fi de Longo Alcance"
    ]
  },
  {
    "id": "amazon-fire-tv-hd",
    "name": "Fire TV Stick HD",
    "category": "streaming",
    "brand": "Amazon",
    "description": "Streaming em Full HD rápido com comandos de voz Alexa, botões dedicados e compatibilidade total com o app NuvvPlay.",
    "priceFormatted": "R$ 248,99",
    "priceValue": 248.99,
    "originalPriceFormatted": "R$ 349,00",
    "installments": "em até 6x de R$ 44,85 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/amazon-fire-tv-hd.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0DVK166SV?tag=nuvv09-20",
    "badge": "Mais Vendido • NuvvPlay",
    "highlightSpecs": [
      "App NuvvPlay Nativo",
      "Controle com Alexa por Voz"
    ]
  },
  {
    "id": "amazon-fire-tv-4k",
    "name": "Fire TV Stick 4K ",
    "category": "streaming",
    "brand": "Amazon",
    "description": "Imagens impressionantes em 4K Ultra HD com suporte a Dolby Vision, Dolby Atmos e conectividade Wi-Fi avançada.",
    "priceFormatted": "R$ 449,00",
    "priceValue": 449,
    "originalPriceFormatted": "R$ 499,00",
    "installments": "em até 8x de R$ 56,16 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/amazon-fire-tv-4k.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0CJLFQP4W?tag=nuvv09-20",
    "badge": "4K Ultra HD • Wi-Fi 6",
    "highlightSpecs": [
      "Resolução 4K Dolby Vision",
      "Áudio Imersivo Dolby Atmos"
    ]
  },
  {
    "id": "intelbras-fr101",
    "name": "Fechadura Digital de Sobrepor FR 101",
    "category": "casa-inteligente",
    "brand": "Intelbras",
    "description": "Abertura por senha touch screen, travamento automático da porta e alarme contra arrombamento.",
    "priceFormatted": "R$ 254,02",
    "priceValue": 254.02,
    "originalPriceFormatted": "R$ 449,00",
    "installments": "em até 106x de R$ 44,59 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-fr101.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B076HWLP7P?tag=nuvv09-20",
    "badge": "Segurança & Praticidade",
    "highlightSpecs": [
      "Até 4 Senhas de Acesso",
      "Sensor de Travamento Automático"
    ]
  },
  {
    "id": "intelbras-fr221v",
    "name": "Fechadura Digital FR 221V",
    "category": "casa-inteligente",
    "brand": "Intelbras",
    "description": "Design premium com display touchscreen de alta sensibilidade e chaveiro de aproximação RFID.",
    "priceFormatted": "R$ 364,86",
    "priceValue": 364.86,
    "originalPriceFormatted": "R$ 599,00",
    "installments": "em até 8x de R$ 50,71 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-fr221v.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0GJTTTG1W?tag=nuvv09-20",
    "badge": "Com Visor Digital",
    "highlightSpecs": [
      "Abertura por Senha ou Tag RFID",
      "Alarme Sonoro de Violação"
    ]
  },
  {
    "id": "intelbras-im3c",
    "name": "Câmera Wi-Fi Full HD iM3 C",
    "category": "cameras",
    "brand": "Intelbras",
    "description": "Monitoramento interno em Full HD 1080p com áudio bidirecional e inteligência artificial para detecção de pessoas.",
    "priceFormatted": "R$ 161,90",
    "priceValue": 161.90,
    "originalPriceFormatted": "R$ 259,00",
    "installments": "em até 5x de R$ 36,00 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-im3c.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B09Q3JVDYS?tag=nuvv09-20",
    "badge": "Mais Vendida",
    "highlightSpecs": [
      "Full HD 1080p com Visão Noturna",
      "Áudio Bidirecional (Fale e Ouça)"
    ]
  },
  {
    "id": "intelbras-im5sc",
    "name": "Câmera Wi-Fi Full HD iM5 SC",
    "category": "cameras",
    "brand": "Intelbras",
    "description": "Segurança externa com proteção IP67 contra sol e chuva, holofote integrado e visão noturna 100% colorida.",
    "priceFormatted": "R$ 253,71",
    "priceValue": 253.71,
    "originalPriceFormatted": "R$ 389,00",
    "installments": "em até 6x de R$ 44,98 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-im5sc.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B09SPGZHMP?tag=nuvv09-20",
    "badge": "Visão Noturna Colorida",
    "highlightSpecs": [
      "Visão Noturna Colorida com Holofote",
      "Proteção IP67 para Uso Externo"
    ]
  },
  {
    "id": "intelbras-im5-plus",
    "name": "Câmera iM5 +Color",
    "category": "cameras",
    "brand": "Intelbras",
    "description": "Câmera Wi-Fi externa robusta para fachadas, portões e empresas com alcance infravermelho de 30 metros.",
    "priceFormatted": "R$ 386,23",
    "priceValue": 386.23,
    "originalPriceFormatted": "R$ 399,00",
    "installments": "em até 7x de R$ 55,21 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-im5sc-plus.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0B3S5YHDX?tag=nuvv09-20",
    "badge": "Externa IP67",
    "highlightSpecs": [
      "Alcance Noturno de até 30 Metros",
      "Microfone Integrado & Alerta no App"
    ]
  },
  {
    "id": "intelbras-im4c",
    "name": "Câmera Inteligente 360° Intelbras iM4 C Wi-Fi Full HD",
    "category": "cameras",
    "brand": "Intelbras",
    "description": "Cobertura 360° interna com rastreamento inteligente de movimento para você não perder nenhum detalhe.",
    "priceFormatted": "R$ 369,00",
    "priceValue": 369,
    "originalPriceFormatted": "R$ 459,90",
    "installments": "em até 7x de R$ 52,74 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-im4.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B09Q3K3VR1?tag=nuvv09-20",
    "badge": "Giro 360° Pan-Tilt",
    "highlightSpecs": [
      "Giro 360° com Auto-Tracking",
      "Detector de Barulhos e Choro de Bebê"
    ]
  },
  {
    "id": "intelbras-im7",
    "name": "Câmera 360° Externa iM7 3MP 2K Full Color",
    "category": "cameras",
    "brand": "Intelbras",
    "description": "Câmera externa 360° com resolução 2K 3MP, rastreamento de pessoas e holofotes integrados.",
    "priceFormatted": "R$ 515,00",
    "priceValue": 515,
    "originalPriceFormatted": "R$ 549,00",
    "installments": "em até 10x de R$ 51,50 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-im7.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0B9D7LT36?tag=nuvv09-20",
    "badge": "360° Externa 2K",
    "highlightSpecs": [
      "Resolução Ultra 2K (3 Megapixels)",
      "Giro 360° com Auto-Tracking"
    ]
  },
  {
    "id": "amazon-echo-dot",
    "name": "Echo Dot 5ª Geração Smart Speaker com Alexa - Preto",
    "category": "casa-inteligente",
    "brand": "Amazon",
    "description": "O Echo Dot com o melhor som já lançado: vocais nítidos, graves potentes e sensor de temperatura integrado.",
    "priceFormatted": "R$ 329,00",
    "priceValue": 329,
    "originalPriceFormatted": "R$ 499,00",
    "installments": "em até 6x de R$ 54,85 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/amazon-echo-dot.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B09B8VGCR8?tag=nuvv09-20",
    "badge": "Mais Vendido Alexa",
    "highlightSpecs": [
      "Comandos de Voz com Alexa",
      "Som Imersivo com Graves Potentes"
    ]
  },
  {
    "id": "tplink-archer-be550",
    "name": "Archer Wi-Fi 7 BE550",
    "category": "conectividade",
    "brand": "TP-Link",
    "description": "Roteador Wi-Fi 7 Tri-Band de 9.3 Gbps com 5 portas 2.5G Multi-Gigabit e tecnologia MLO.",
    "priceFormatted": "R$ 1.558,98",
    "priceValue": 1558.98,
    "originalPriceFormatted": "R$ 1.999,00",
    "installments": "em até 10x de R$ 159,08 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tplink-archer-be550.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0D3619JX7?tag=nuvv09-20",
    "badge": "Topo de Linha Wi-Fi 7",
    "highlightSpecs": [
      "Wi-Fi 7 Tri-Band BE9300 (9.3 Gbps)",
      "5 Portas 2.5G Multi-Gigabit"
    ]
  },
  {
    "id": "tplink-archer-ex141",
    "name": "Roteador EX141 WI-FI 6 AX1500",
    "category": "conectividade",
    "brand": "TP-Link",
    "description": "Roteador Wi-Fi 6 de alta velocidade com tecnologia OFDMA, portas Full Gigabit e 4 antenas externas.",
    "priceFormatted": "R$ 185,00",
    "priceValue": 185,
    "originalPriceFormatted": "R$ 216,00",
    "installments": "em até 6x de R$ 30,85 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tplink-archer-ex141.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0CZ5XKNXD?tag=nuvv09-20",
    "badge": "Wi-Fi 6 Gigabit",
    "highlightSpecs": [
      "Tecnologia Wi-Fi 6 AX1500",
      "Portas Full Gigabit 10/100/1000"
    ]
  },
  {
    "id": "tplink-ex521v",
    "name": "Roteador Wi-Fi 6 TP-Link EX521v AX3000 Gigabit Mesh",
    "category": "conectividade",
    "brand": "TP-Link",
    "description": "Roteador Wi-Fi 6 corporativo e residencial de alta performance AX3000 com tecnologia EasyMesh e portas Gigabit.",
    "priceFormatted": "R$ 236,90",
    "priceValue": 236.90,
    "originalPriceFormatted": "R$ 399,00",
    "installments": "em até 6x de R$ 39,50 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tplink-archer-ex521v.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0FVMK6QZF?tag=nuvv09-20",
    "badge": "Ultra Velocidade AX3000",
    "highlightSpecs": [
      "Velocidade AX3000 até 3 Gbps",
      "Compatível com Tecnologia Mesh"
    ]
  },
  {
    "id": "tplink-eb3600",
    "name": "Roteador Wi-Fi 7 EB3600",
    "category": "conectividade",
    "brand": "TP-Link",
    "description": "Roteador Wi-Fi 7 BE3600 Dual Band, 5 Portas Gigabit, MLO, EasyMesh, VPN, Cobertura de Até 180 m².",
    "priceFormatted": "R$ 429,00",
    "priceValue": 429,
    "originalPriceFormatted": "R$ 499,00",
    "installments": "em até 8x de R$ 53,66 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tplink-eb3600.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0H7T7SLNZ?tag=nuvv09-20",
    "badge": "Ultra Velocidade AX3000",
    "highlightSpecs": [
      "Conexão para Até 128 Dispositivos",
      "Compatível com Tecnologia Mesh"
    ]
  },
  {
    "id": "intelbras-tip125i",
    "name": "Telefone Tip 125i",
    "category": "telefonia",
    "brand": "Intelbras",
    "description": "O TIP 125i é um telefone VoIP, possui display para identificação de chamadas, alta qualidade de áudio, viva-voz de qualidade e uma conta SIP e suporte a PoE.",
    "priceFormatted": "R$ 204,01",
    "priceValue": 204.01,
    "originalPriceFormatted": "R$ 265,00",
    "installments": "em até 6x de R$ 36,20 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-tip125i.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B07KGYQRZ4?tag=nuvv09-20",
    "badge": "Telefone IP",
    "highlightSpecs": [
      "Display blacklight e a função Viva-voz",
      "Suporte a uma conta SIP"
    ]
  },
  {
    "id": "intelbras-efb1201",
    "name": "Fonte Nobreak 12V 1A EFB 1201",
    "category": "conectividade",
    "brand": "Intelbras",
    "description": "Pode ser utilizada em cenários de CFTV, redes, controle de acesso e automação.",
    "priceFormatted": "R$ 144,10",
    "priceValue": 144.10,
    "originalPriceFormatted": "R$ 188,00",
    "installments": "em até 4x de R$ 37,49 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-efb1201.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B099TJXFW3?tag=nuvv09-20",
    "badge": "Não desliga nunca",
    "highlightSpecs": [
      "Bateria de lítio de 2.500 mAh.",
      "Saída 12 V 1 A com conector P4"
    ]
  },
  {
    "id": "intelbras-efb0501",
    "name": "Fonte Nobreak 5v 1A EFB 0501",
    "category": "conectividade",
    "brand": "Intelbras",
    "description": "Pode ser utilizada em cenários de CFTV, redes, controle de acesso e automação.",
    "priceFormatted": "R$ 89,90",
    "priceValue": 89.90,
    "originalPriceFormatted": "R$ 99,00",
    "installments": "em até 3x de R$ 29,98 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-efb0501.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0FG8C54GJ?tag=nuvv09-20",
    "badge": "Ultra Velocidade AX3000",
    "highlightSpecs": [
      "Função DC Start - religada automaticamente",
      "Saída: 5 Vdc 1 A (5 W), conexão USB-A "
    ]
  },
  {
    "id": "tp-link-tl-er605",
    "name": "Gigabit Multi-WAN VPN SafeStream TL-ER605",
    "category": "conectividade",
    "brand": "TP-Link",
    "description": "Multi-WAN e VPN para gerenciamento de redes em ambientes profissionais.",
    "priceFormatted": "R$ 427,40",
    "priceValue": 427.40,
    "originalPriceFormatted": "R$ 499,00",
    "installments": "em até 9x de R$ 50,06 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tp-link-tl-er605.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B08QTXNWZ1?tag=nuvv09-20",
    "badge": "Multi-WAN VPN",
    "highlightSpecs": [
      "Até quatro portas WAN",
      "Recursos de segurança abundantes"
    ]
  },
  {
    "id": "grandstream-gs-ht814",
    "name": "Ata com 4 portas Fxs GS-HT814",
    "category": "telefonia",
    "brand": "Grandstream",
    "description": "O HT814 oferece excelente tecnologia VoIP e recursos de roteamento.",
    "priceFormatted": "R$ 521,55",
    "priceValue": 521.55,
    "originalPriceFormatted": "R$ 599,99",
    "installments": "em até 10x de R$ 54,90 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/grandstream-gs-ht814.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B01MTSYDKH?tag=nuvv09-20",
    "badge": "Até 4 Portas FXS",
    "highlightSpecs": [
      "ncluir arquivos TR-069 e XML Confit Failover",
      "Suporta 4 perfis SIP através de 4 portas FXS"
    ]
  },
  {
    "id": "intelbras-v3001",
    "name": "Telefone IP V3001",
    "category": "telefonia",
    "brand": "Intelbras",
    "description": "Pode ser utilizada em cenários de CFTV, redes, controle de acesso e automação.",
    "priceFormatted": "R$ 421,63",
    "priceValue": 421.63,
    "originalPriceFormatted": "R$ 498,89",
    "installments": "em até 8x de R$ 52,73 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/intelbras-v3001.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B08F7YMFZF?tag=nuvv09-20",
    "badge": "Compativel PABX Nuvv",
    "highlightSpecs": [
      "Display blacklight e a função Viva-voz",
      "Suporte a 2 (duas) contas SIP"
    ]
  },
  {
    "id": "tp-link-eap650",
    "name": "Access Point EAP650",
    "category": "access-point",
    "brand": "TP-Link",
    "description": "WiFi6 AX3000 Uso interno/externo — O invólucro durável e à prova de intempéries.",
    "priceFormatted": "R$ 1.027,00",
    "priceValue": 1.027,
    "originalPriceFormatted": "R$ 1.260,00",
    "installments": "em até 10x de R$ 102,70 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tp-link-eap650.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0BJ2BQJD1?tag=nuvv09-20",
    "badge": "Solução Business Wifi",
    "highlightSpecs": [
      "Wi-Fi 6 AX3000 Dual Band com porta Gigabit",
      "Compatível com POE, facilita a instalação e oferece rede estável e veloz."
    ]
  },
  {
    "id": "tp-link-eap225",
    "name": "Access Point Outdoor EAP225",
    "category": "access-point",
    "brand": "TP-Link",
    "description": "AC1200 Uso interno/externo — O invólucro durável e à prova de intempéries.",
    "priceFormatted": "R$ 748,00",
    "priceValue": 748,
    "originalPriceFormatted": "R$ 799,00",
    "installments": "em até 12x de R$ 62,37 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tp-link-eap225.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B07953S2FD?tag=nuvv09-20",
    "badge": "Solução Business Wifi",
    "highlightSpecs": [
      "Poe Alimentado | Sdn Integrado",
      "Suporte Mesh, Roaming Contínuo E Mu-Mimo"
    ]
  },
  {
    "id": "tp-link-eap613",
    "name": "Access Point Indoor EAP613",
    "category": "access-point",
    "brand": "TP-Link",
    "description": "Access Point de teto WiFi6 AX1800 Band Gigabit S/Injetor.",
    "priceFormatted": "R$ 759,90",
    "priceValue": 759.90,
    "originalPriceFormatted": "R$ 899,00",
    "installments": "em até 12x de R$ 66,75 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tp-link-eap613.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0HDTSK5NM?tag=nuvv09-20",
    "badge": "Solução Business Wifi",
    "highlightSpecs": [
      "Wi-Fi 6 AX1800 Dual Band Gigabit",
      "Montagem em teto, proporciona cobertura estável e de longo alcance."
    ]
  },
  {
    "id": "tp-link-eap610",
    "name": "Access Point Indoor EAP610",
    "category": "access-point",
    "brand": "TP-Link",
    "description": "Ultrafino | Wifi 6 Ax1800 Wireless Gigabit Business Access Point.",
    "priceFormatted": "R$ 900,60",
    "priceValue": 900.60,
    "originalPriceFormatted": "R$ 1.099,00",
    "installments": "em até 12x de R$ 79,00 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tp-link-eap610.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B09XM74VQL?tag=nuvv09-20",
    "badge": "Solução Business Wifi",
    "highlightSpecs": [
      "O design compacto garante uma instalação simples e economiza espaço.",
      "Tecnologia sem fio Wi-Fi 6 com 1024-QAM e símbolo OFDM longo."
    ]
  },
  {
    "id": "tp-link-be22",
    "name": "Deco BE22 (3 un.)",
    "category": "conectividade",
    "brand": "TP-Link",
    "description": "Roteador Mesh Wi-Fi 7 BE3600 Dual Band, Cobertura de Até 600 m².",
    "priceFormatted": "R$ 1.479,00",
    "priceValue": 1479.00,
    "originalPriceFormatted": "R$ 1.689,00",
    "installments": "em até 12x de R$ 123,25 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/tp-link-be22.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B0FG2MD49G?tag=nuvv09-20",
    "badge": "Mesh Gerenciado por IA",
    "highlightSpecs": [
      "Mais de 150 Dispositivos, 2 Portas Gigabit por Unidade.",
      "Três unidades ajudam a ampliar o sinal em diferentes ambientes."
    ]
  },
  {
    "id": "mercusys-ms105g",
    "name": "Switch 5 Portas Gigabit",
    "category": "conectividade",
    "brand": "Mercusys",
    "description": "Expanda a rede da sua casa ou escritório com 5 portas Full Gigabit e gabinete compacto.",
    "priceFormatted": "R$ 59,00",
    "priceValue": 59,
    "originalPriceFormatted": "R$ 89,00",
    "installments": "em até 2x de R$ 29,50 sem juros",
    "shippingInfo": "Frete Grátis Prime",
    "image": "/images/shop/mercusys-ms105gs.jpg",
    "affiliateUrl": "https://www.amazon.com.br/dp/B07RK6CVS3?tag=nuvv09-20",
    "badge": "Gigabit 1000 Mbps",
    "highlightSpecs": [
      "5 Portas RJ45 Gigabit 1000 Mbps",
      "Instalação Plug and Play"
    ]
  }
];
