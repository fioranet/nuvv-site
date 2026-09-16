import React from 'react';
import { SEO } from '../components/common/SEO';
import { organizationSchema, socialWifiServiceSchema } from '../data/seoSchemas';
import { SocialWifiHero } from '../components/social-wifi/SocialWifiHero';
import { SocialWifiLiveShowcase } from '../components/social-wifi/SocialWifiLiveShowcase';
import { SocialWifiFeatureExplorer } from '../components/social-wifi/SocialWifiFeatureExplorer';
import { SocialWifiSegments } from '../components/social-wifi/SocialWifiSegments';
import { SocialWifiPlans } from '../components/social-wifi/SocialWifiPlans';
import { SocialWifiFaq } from '../components/social-wifi/SocialWifiFaq';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { SocialWifiPlan } from '../data/socialWifiData';

interface SocialWifiPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const SocialWifi: React.FC<SocialWifiPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const handleScrollToFeatures = () => {
    const el = document.getElementById('recursos-wifi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPlans = () => {
    const el = document.getElementById('planos-social-wifi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (plan: SocialWifiPlan) => {
    if (plan.priceOnRequest) {
      onOpenLeadModal(`Projeto Especial Hotspot Wi-fi Social (Até 10.000 Acessos)`);
    } else {
      onOpenLeadModal(`Plano ${plan.name}: ${plan.simultaneousUsers} (R$ ${plan.price.toFixed(2).replace('.', ',')}/mês)`);
    }
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Hotspot Wi-fi Social & Wi-Fi Marketing Inteligente para Negócios | Nuvv"
        description="Transforme o Wi-Fi do seu estabelecimento em um poderoso canal de marketing e vendas. Captive portal personalizado, captação de leads via WhatsApp, remarketing e 100% LGPD."
        keywords={[
          'hotspot wifi social',
          'wifi marketing',
          'captive portal personalizado',
          'hotspot para clientes',
          'wifi comercial',
          'captura de leads wifi',
          'wifi marketing suzano',
          'wifi para restaurantes e clinicas',
          'marco civil wifi',
        ]}
        canonicalUrl="https://nuvv.com.br/social-wifi"
        schema={[organizationSchema, socialWifiServiceSchema]}
      />

      {/* Hero Section */}
      <SocialWifiHero
        onScrollToFeatures={handleScrollToFeatures}
        onScrollToPlans={handleScrollToPlans}
      />

      {/* Live Ecosystem Showcase (Phone Captive Portal -> Real-time Analytics Dashboard) */}
      <SocialWifiLiveShowcase />

      {/* 10-Feature Interactive Explorer */}
      <SocialWifiFeatureExplorer />

      {/* Market Segments Grid */}
      <SocialWifiSegments />

      {/* Plan Cards */}
      <SocialWifiPlans onSelectPlan={handleSelectPlan} />

      {/* FAQs */}
      <SocialWifiFaq />

      {/* Recommended Access Points & Hotspot Hardware Carousel */}
      <RecommendedDevicesSection
        category="access-point"
        badge="Dispositivos Recomendados"
        title="Access Points e Roteadores Recomendados para Hotspot"
        subtitle="Access Points corporativos de alta densidade e longo alcance para oferecer a melhor conexão e Wi-Fi Marketing aos seus clientes."
      />

      {/* Partner Carousel */}
      <PartnerCarousel />

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
