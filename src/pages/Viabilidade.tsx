import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { organizationSchema } from '../data/seoSchemas';
import { FeasibilityModal } from '../components/viabilidade/FeasibilityModal';
import { CoverageServiceType } from '../data/coverage/coverageConfig';
import { CITIES } from '../data/cities';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import {
  MapPin,
  Search,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Wifi,
  Building2,
  PhoneCall,
  Sparkles,
  Server,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ViabilidadePageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Viabilidade: React.FC<ViabilidadePageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [feasibilityModalOpen, setFeasibilityModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<'residencial' | 'empresarial'>('residencial');

  const handleOpenCheck = (service: 'residencial' | 'empresarial') => {
    setSelectedService(service);
    setFeasibilityModalOpen(true);
  };

  const handleSelectPlanAndHire = (planName: string, addressSummary: string) => {
    onOpenLeadModal(`${planName} (Endereço validado: ${addressSummary})`);
  };

  const handleWhatsAppDemand = (serviceTitle: string) => {
    const text = `Olá! Gostaria de solicitar um estudo de viabilidade sob demanda para ${serviceTitle}.`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const feasibilitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Consulta de Viabilidade Técnica e Cobertura Nuvv',
    serviceType: 'Consulta de Cobertura de Fibra Óptica e Telecom',
    provider: {
      '@id': 'https://nuvv.com.br/#organization',
    },
    areaServed: organizationSchema.areaServed,
    description:
      'Consulte a viabilidade técnica de fibra óptica residencial e empresarial georreferenciada por CEP e polígonos de cobertura.',
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Consulta de Viabilidade Técnica & Cobertura de Fibra | Nuvv"
        description="Consulte a viabilidade técnica georreferenciada para seu endereço. Saiba se a fibra óptica residencial ou empresarial estão disponíveis no seu CEP."
        keywords={[
          'consulta de viabilidade',
          'cobertura fibra optica',
          'viabilidade internet suzano',
          'cobertura nuvv telecom',
          'link dedicado cobertura',
          'mapa de cobertura fibra',
          'viabilidade cep',
        ]}
        canonicalUrl="https://nuvv.com.br/viabilidade"
        schema={[organizationSchema, feasibilitySchema]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-nuvv-dark text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-nuvv-purple/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/50 text-indigo-200 text-xs font-black tracking-wider uppercase backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-nuvv-green" />
              <span>SISTEMA GEORREFERENCIADO DE COBERTURA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Consulte a viabilidade técnica da{' '}
              <span className="text-gradient-hero">fibra no seu endereço</span>.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl">
              Nossa rede óptica é mapeada com alta precisão georreferenciada. Digite seu endereço para verificar instantaneamente a disponibilidade de <strong>Fibra Residencial</strong> ou <strong>Fibra Empresarial / Semi-Dedicado</strong>.
            </p>

            {/* Quick Service Check Triggers */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleOpenCheck('residencial')}
                className="px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-sm shadow-lg shadow-nuvv-purple/30 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
              >
                <Wifi className="w-4 h-4" />
                <span>Consultar Fibra Residencial</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenCheck('empresarial')}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Consultar Fibra Empresarial</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate On-Demand Services Callout Banner */}
      <section className="py-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/30">
                <Zap className="w-3.5 h-3.5" />
                <span>Projetos Especiais & Telecom Corporativa</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Link Dedicado 1:1, Internet para Eventos ou LAN-to-LAN?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
                Esses serviços de missão crítica possuem análise técnica sob demanda e cotação customizada de acordo com a rota óptica, SLA contratual e capacidade desejada.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleWhatsAppDemand('Link Dedicado e Projetos Especiais')}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 whitespace-nowrap active:scale-95 cursor-pointer flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Falar com Engenheiro de Redes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Georeferenced Accuracy */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-nuvv-dark">Checagem Instantânea</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Integração direta com o cadastro de caixas de atendimento óptico (CTOs) e rotas de anel metropolitano.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-nuvv-dark">Camadas por Serviço</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Polígonos independentes para conexões residenciais FTTH e anéis corporativos de alta criticidade (SLA 4h).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-nuvv-dark">Projetos Sob Medida</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mesmo fora do polígono padrão, nossa engenharia projeta extensões de fibra dedicadas ponto a ponto para empresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Covered Cities Grid */}
      <section className="py-16 sm:py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              Municípios Atendidos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
              Presença e Infraestrutura na Sua Região
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Consulte a viabilidade técnica nos principais municípios do Alto Tietê e Grande São Paulo.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {CITIES.map((city) => (
              <div
                key={city.id}
                onClick={() => handleOpenCheck('residencial')}
                className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:border-nuvv-purple hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-4 h-4 text-nuvv-purple group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-xs font-bold text-nuvv-dark">{city.name}</h4>
                    <span className="text-[10px] text-gray-400 font-semibold">{city.state}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-nuvv-purple transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Carousel */}
      <PartnerCarousel />

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />

      {/* Interactive Feasibility Modal */}
      <FeasibilityModal
        isOpen={feasibilityModalOpen}
        onClose={() => setFeasibilityModalOpen(false)}
        initialService={selectedService}
        onSelectPlanAndHire={handleSelectPlanAndHire}
      />
    </div>
  );
};
