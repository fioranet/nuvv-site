import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { guardServiceSchema, organizationSchema } from '../data/seoSchemas';
import { GuardHero } from '../components/guard/GuardHero';
import { GuardPricingCalculator } from '../components/guard/GuardPricingCalculator';
import { GuardIntercomSection } from '../components/guard/GuardIntercomSection';
import { GuardTrackSection } from '../components/guard/GuardTrackSection';
import { GuardSmartPoleSection } from '../components/guard/GuardSmartPoleSection';
import { GuardFaqSection } from '../components/guard/GuardFaqSection';
import { VisionEquipmentSection } from '../components/vision/VisionEquipmentSection';
import { VisionTechHighlights } from '../components/vision/VisionTechHighlights';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import { SuperAppSection } from '../components/common/SuperAppSection';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';

interface GuardPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Guard: React.FC<GuardPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculadora-guard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planDetail: string) => {
    onOpenLeadModal(planDetail);
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Nuvv Guard - Segurança Inteligente: Câmeras em Nuvem, Interfone Virtual e Tags"
        description="Proteção completa para sua família e patrimônio: Câmeras com gravação contínua na nuvem de 3 a 30 dias, Interfone Virtual por QR Code sem fios, Nuvv Tags para acompanhar crianças e pets, e Poste de Monitoramento Inteligente para ruas e condomínios."
        keywords={[
          'nuvv guard',
          'poste de monitoramento inteligente',
          'vigilância comunitária ruas',
          'segurança residencial nuvem',
          'interfone virtual qr code',
          'interfone sem fio',
          'interfone para condominio',
          'cftv em nuvem',
          'gravacao de cameras na nuvem',
          'tag rastreamento criancas pets',
          'cameras com gravacao',
          'seguranca patrimonial suzano',
        ]}
        canonicalUrl="https://nuvv.com.br/guard"
        schema={[organizationSchema, guardServiceSchema]}
      />

      {/* 1. Hero Section */}
      <GuardHero
        onScrollToCalculator={handleScrollToCalculator}
        onOpenLeadModal={onOpenLeadModal}
      />

      {/* 2. Real-time Pricing Calculator & Simulator */}
      <GuardPricingCalculator onSelectPlan={handleSelectPlan} />

      {/* 3. Deep Dive: Interfone Virtual por QR Code */}
      <GuardIntercomSection onSelectPlan={handleSelectPlan} />

      {/* 4. Deep Dive: Nuvv Tags (Rastreamento da Família) */}
      <GuardTrackSection onSelectPlan={handleSelectPlan} />

      {/* 5. Solução Comunitária: Poste de Monitoramento Inteligente Nuvv */}
      <GuardSmartPoleSection onOpenLeadModal={onOpenLeadModal} />

      {/* 6. Equipment Flexibility (BYOD vs. Comodato) */}
      <VisionEquipmentSection onOpenComodatoModal={handleScrollToCalculator} />

      {/* 6. Tech & Cloud DVR Security Highlights */}
      <VisionTechHighlights />

      {/* 7. Recommended Devices & Cameras */}
      <RecommendedDevicesSection
        category="cameras"
        badge="Hardware Homologado"
        title="Câmeras e Dispositivos Compatíveis com Nuvv Guard"
        subtitle="Equipamentos testados para máxima performance com inteligência artificial e gravação criptografada em nuvem."
      />

      {/* 8. Super App Showcase (Dual Columns: App Nuvv + App Nuvv Guard) */}
      <SuperAppSection />

      {/* 9. FAQs */}
      <GuardFaqSection />

      {/* 10. Partner Carousel */}
      <PartnerCarousel />

      {/* 11. Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
