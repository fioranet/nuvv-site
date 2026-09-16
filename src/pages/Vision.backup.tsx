import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { visionServiceSchema, organizationSchema } from '../data/seoSchemas';
import { VisionSegment, VisionPlan } from '../data/visionPlans';
import { VisionHero } from '../components/vision/VisionHero';
import { VisionSegmentToggle } from '../components/vision/VisionSegmentToggle';
import { VisionPricingCalculator } from '../components/vision/VisionPricingCalculator';
import { VisionEquipmentSection } from '../components/vision/VisionEquipmentSection';
import { VisionTechHighlights } from '../components/vision/VisionTechHighlights';
import { VisionFaqSection } from '../components/vision/VisionFaqSection';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import { SuperAppSection } from '../components/common/SuperAppSection';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';

interface VisionPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Vision: React.FC<VisionPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [segment, setSegment] = useState<VisionSegment>('residencial');
  const [cameraCount, setCameraCount] = useState<number>(1);
  const [hasComodato, setHasComodato] = useState<boolean>(false);

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculadora-vision');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: VisionPlan, totalMonthly: number) => {
    const comodatoText = hasComodato ? 'com Câmeras em Comodato' : 'câmeras próprias';
    const leadDetail = `Nuvv Vision: ${plan.name} (${cameraCount} ${cameraCount === 1 ? 'câmera' : 'câmeras'} ${comodatoText}) - R$ ${totalMonthly.toFixed(2).replace('.', ',')}/mês`;
    onOpenLeadModal(leadDetail);
  };

  const handleOpenComodatoModal = () => {
    setHasComodato(true);
    handleScrollToCalculator();
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Nuvv Vision - CFTV e Gravação de Câmeras em Nuvem | Segurança Inteligente"
        description="Conecte suas câmeras direto à nuvem sem abrir portas no roteador. Acesso ao vivo grátis, gravação de 3 a 30 dias em Data Center Nacional e câmeras em comodato."
        keywords={[
          'cftv em nuvem',
          'gravacao de cameras na nuvem',
          'camera de seguranca nuvem',
          'nuvv vision',
          'monitoramento residencial nuvem',
          'cftv empresarial suzano',
          'cameras em comodato',
          'camera ip sem abrir porta',
        ]}
        canonicalUrl="https://nuvv.com.br/vision"
        schema={[organizationSchema, visionServiceSchema]}
      />

      {/* Hero Section */}
      <VisionHero onScrollToCalculator={handleScrollToCalculator} />

      {/* Residential vs. Enterprise Segment Switcher */}
      <VisionSegmentToggle segment={segment} onSegmentChange={setSegment} />

      {/* Real-time Pricing Calculator */}
      <VisionPricingCalculator
        segment={segment}
        cameraCount={cameraCount}
        onCameraCountChange={setCameraCount}
        hasComodato={hasComodato}
        onHasComodatoChange={setHasComodato}
        onSelectPlan={handleSelectPlan}
      />

      {/* Equipment & Brands Section (BYOD vs. Comodato) */}
      <VisionEquipmentSection onOpenComodatoModal={handleOpenComodatoModal} />

      {/* Tech & Security Highlights (Cloud vs. Traditional DVR) */}
      <VisionTechHighlights />

      {/* Recommended Cameras Carousel */}
      <RecommendedDevicesSection
        category="cameras"
        badge="Dispositivos Recomendados"
        title="Câmeras Wi-Fi Homologadas para Nuvv Vision"
        subtitle="Câmeras inteligentes 100% compatíveis com a gravação em nuvem Nuvv Vision, detecção por IA e garantia oficial Amazon Prime."
      />

      {/* FAQs */}
      <VisionFaqSection />

      {/* Super App Showcase */}
      <SuperAppSection />

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
