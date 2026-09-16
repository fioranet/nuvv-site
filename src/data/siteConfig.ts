export interface SiteConfig {
  name: string;
  slogan: string;
  description: string;
  cnpj: string;
  address: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  centralAjudaUrl: string;
  faturaUrl: string;
  areaClienteUrl: string;
  appGooglePlayUrl: string;
  appAppleStoreUrl: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    x: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Nuvv",
  slogan: "A internet que potencializa seu mundo.",
  description: "Navegue com ultravelocidade e estabilidade incomparável. A tecnologia que sua casa precisa e a segurança que sua empresa exige.",
  cnpj: "47.698.135/0001-36",
  address: "Av. Paulista, 1106 – Sala 01 Andar 16 – Bela Vista, São Paulo – SP, 01310-914",
  phone: "0800 800 6888",
  phoneRaw: "08008006888",
  whatsapp: "(11) 99999-9999",
  whatsappRaw: "5511999999999",
  email: "contato@nuvv.com.br",
  centralAjudaUrl: "/suporte",
  faturaUrl: "/suporte",
  areaClienteUrl: "https://central.nuvv.com.br",
  appGooglePlayUrl: "https://play.google.com/store/apps/details?id=br.com.nuvv.app",
  appAppleStoreUrl: "https://apps.apple.com/br/app/nuvv-fibra/id123456789",
  social: {
    instagram: "https://instagram.com/nuvvfibra",
    facebook: "https://facebook.com/nuvvfibra",
    linkedin: "https://linkedin.com/company/nuvv",
    youtube: "https://youtube.com/@nuvvfibra",
    x: "https://x.com/nuvvfibra",
  }
};
