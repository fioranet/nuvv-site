import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { organizationSchema } from '../data/seoSchemas';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { SuperAppSection } from '../components/common/SuperAppSection';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { ViabilityChecker } from '../components/home/ViabilityChecker';
import { FeasibilityModal } from '../components/viabilidade/FeasibilityModal';
import { ShieldCheck, Users, Cpu, Home as HomeIcon, Building2, Sparkles, MapPin } from 'lucide-react';

interface HomePageProps {
  currentCity: string;
  onOpenCitySelector: () => void;
  onOpenSpeedTest: () => void;
  onOpenLeadModal: (planName?: string) => void;
  onSelectCity?: (cityName: string) => void;
}

export const Home: React.FC<HomePageProps> = ({
  currentCity,
  onOpenCitySelector,
  onOpenSpeedTest,
  onOpenLeadModal,
  onSelectCity,
}) => {
  const [currentHeroSlide, setCurrentHeroSlide] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFeasibilityModalOpen, setIsFeasibilityModalOpen] = React.useState(false);
  const [feasibilityCep, setFeasibilityCep] = React.useState('');
  const [feasibilityStreet, setFeasibilityStreet] = React.useState('');
  const [feasibilityNumber, setFeasibilityNumber] = React.useState('');
  const [feasibilityNeighborhood, setFeasibilityNeighborhood] = React.useState('');
  const [feasibilityCity, setFeasibilityCity] = React.useState(currentCity || 'Suzano');

  const heroSlides = [
    {
      src: '/images/hero/home_1.png',
      alt: 'Conexão Nuvv Fibra Residencial e Corporativa',
      badge: 'Ultra Conexão 100% Fibra Óptica',
      tag: 'Wi-Fi 6 de Alta Performance',
    },
    {
      src: '/images/hero/home_2.png',
      alt: 'Soluções Digitais & Conectividade Inteligente Nuvv',
      badge: 'Soluções Corporativas & Inovação',
      tag: 'PABX, Multiatendimento & TI',
    },
  ];

  // Auto-advance hero slides every 5.5 seconds unless hovered
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, heroSlides.length]);

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Nuvv - Fibra Óptica Residencial & Soluções Corporativas em ${currentCity}`}
        description={`Internet 100% fibra óptica de até 1 Giga com Wi-Fi 6 e TV no App Watch em ${currentCity}. Soluções corporativas completas: Link Dedicado, Semi-Dedicado com IP Fixo, PABX em Nuvem, Nuvv Guard e Nuvv Digital.`}
        keywords={[
          `internet fibra ${currentCity}`,
          `provedor de internet ${currentCity}`,
          'fibra optica residencial',
          'link dedicado empresas',
          'semi dedicado ip fixo',
          'pabx em nuvem',
          'nuvv digital',
          'nuvv guard',
          'app watch tv',
        ]}
        canonicalUrl="https://nuvv.com.br/"
        schema={organizationSchema}
        cityName={currentCity}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-indigo-100/30">
        {/* Background glow accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headlines & Action Buttons */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-nuvv-purple text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
                <span>Bem-vindo ao futuro da conexão</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                A internet que{' '}
                <span className="text-gradient-hero">potencializa</span> seu mundo.
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Navegue com ultravelocidade e estabilidade incomparável. A tecnologia que sua casa precisa e a segurança que sua empresa exige em <strong>{currentCity}</strong> e região.
              </p>

              {/* Main Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link
                  to="/residencial"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md shadow-nuvv-purple/25 transition-all active:scale-98"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Sou Residencial</span>
                </Link>

                <Link
                  to="/empresarial"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border-2 border-emerald-400 text-emerald-700 hover:bg-emerald-50/60 font-bold text-sm flex items-center justify-center space-x-2 shadow-xs transition-all active:scale-98"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Sou Empresa</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsFeasibilityModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-indigo-50/60 border-2 border-indigo-200/90 hover:border-nuvv-purple text-nuvv-dark font-extrabold text-sm flex items-center justify-center space-x-2 shadow-sm shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all hover:-translate-y-0.5 active:scale-98 cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 text-nuvv-purple flex items-center justify-center transition-colors">
                    <MapPin className="w-3 h-3 text-nuvv-purple" />
                  </div>
                  <span className="group-hover:text-nuvv-purple transition-colors">Consultar Cobertura</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Slideshow Carousel */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {heroSlides.map((slide, idx) => {
                  const isActive = currentHeroSlide === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 pointer-events-none z-0'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Dynamic Floating Badge on slide */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs transition-all">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <div>
                            <span className="font-bold text-white block">{slide.badge}</span>
                            <span className="text-[10px] text-emerald-300">{slide.tag}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-white bg-nuvv-purple/80 px-2.5 py-1 rounded-full border border-nuvv-purple/40">
                          Nuvv Fibra
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Carousel Navigation Indicators */}
                <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentHeroSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`transition-all rounded-full ${
                        currentHeroSlide === idx
                          ? 'w-6 h-1.5 bg-emerald-400'
                          : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent High-Converting Viability Checker Section */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <ViabilityChecker
          onOpenLeadModal={onOpenLeadModal}
          onSelectCity={onSelectCity}
          onOpenFeasibilityModal={(cep, street, num, neigh, city) => {
            setFeasibilityCep(cep || '');
            setFeasibilityStreet(street || '');
            setFeasibilityNumber(num || '');
            setFeasibilityNeighborhood(neigh || '');
            setFeasibilityCity(city || currentCity || 'Suzano');
            setIsFeasibilityModalOpen(true);
          }}
        />
      </section>

      {/* Partner Trust Carousel */}
      <PartnerCarousel />

      {/* 3 Core Value Pillars */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Ampla Cobertura */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Ampla Cobertura</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Conectividade de alta velocidade onde você mais precisa, com expansão constante de rede 100% fibra.
              </p>
            </div>

            {/* Suporte Humanizado */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Suporte Humanizado</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Atendimento rápido, eficiente e próximo, com uma equipe local pronta para resolver tudo sem complicação.
              </p>
            </div>

            {/* Tecnologia Própria */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 text-nuvv-violet flex items-center justify-center mx-auto">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Tecnologia Própria</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Infraestrutura de ponta garantindo estabilidade, baixa latência, segurança e ultravelocidade real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Super App Showcase Section */}
      <SuperAppSection />

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />

      {/* Visual Coverage & Feasibility Modal */}
      <FeasibilityModal
        isOpen={isFeasibilityModalOpen}
        onClose={() => setIsFeasibilityModalOpen(false)}
        initialService="residencial"
        initialCep={feasibilityCep}
        initialStreet={feasibilityStreet}
        initialNumber={feasibilityNumber}
        initialNeighborhood={feasibilityNeighborhood}
        initialCity={feasibilityCity}
        onSelectPlanAndHire={(planName, addressSummary) => {
          onOpenLeadModal(`${planName} (Endereço validado: ${addressSummary})`);
        }}
      />
    </div>
  );
};
