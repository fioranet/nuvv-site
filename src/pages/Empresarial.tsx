import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import {
  organizationSchema,
  enterpriseDedicatedLinkSchema,
  enterpriseSemiDedicatedSchema,
  enterpriseBroadbandSchema,
  businessComboServiceSchema,
  nuvvDigitalServiceSchema,
  createFaqSchema,
} from '../data/seoSchemas';
import {
  BusinessCategory,
  BUSINESS_PLANS,
  BusinessPlan,
  CONNECTIVITY_COMPARISON,
} from '../data/businessPlans';
import { CorporateSolution } from '../data/services';
import { BusinessPlanCard } from '../components/empresarial/BusinessPlanCard';
import { SolutionsGrid } from '../components/empresarial/SolutionsGrid';
import { BusinessLeadModal } from '../components/empresarial/BusinessLeadModal';
import { BusinessCoverageModal } from '../components/empresarial/BusinessCoverageModal';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { Modal } from '../components/common/Modal';
import {
  PhoneCall,
  Check,
  Building2,
  ShieldCheck,
  Network,
  Cpu,
  Clock,
  ArrowRight,
  Sparkles,
  Server,
  Radio,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Layers,
  MapPin,
  Search,
  Globe,
  Wifi,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface EmpresarialPageProps {
  currentCity: string;
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Empresarial: React.FC<EmpresarialPageProps> = ({
  currentCity,
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>('banda-larga');
  const [selectedSolution, setSelectedSolution] = useState<CorporateSolution | null>(null);
  const [detailPlanModal, setDetailPlanModal] = useState<BusinessPlan | null>(null);
  const [isFeasibilityModalOpen, setIsFeasibilityModalOpen] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const heroSlides = [
    {
      src: '/images/hero/business_1.png',
      alt: 'Nuvv Telecom Corporativa e Link Dedicado',
      badge: 'Link Dedicado 100% Simétrico',
      tag: 'SLA 4h, BGP & Portas até 10 Gbps',
      pill: 'Carrier-Grade',
      topBadge: 'Cobertura Nacional',
    },
    {
      src: '/images/hero/business_2.png',
      alt: 'Conectividade Corporativa e PABX Cloud Nuvv',
      badge: 'Banda Larga PJ & Telefonia IP',
      tag: 'Wi-Fi 6, IP Fixo & Multiatendimento',
      pill: 'Empresas & Negócios',
      topBadge: 'Alta Disponibilidade',
    },
  ];

  // Auto-advance hero slides every 5.5 seconds unless hovered
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);

  const categories: { id: BusinessCategory; label: string; badge?: string }[] = [
    { id: 'banda-larga', label: 'Banda Larga Empresarial' },
    { id: 'semi-dedicado', label: 'Semi-Dedicado (IP Fixo)' },
    { id: 'link-dedicado', label: 'Link Dedicado 100%', badge: 'CARRIER GRADE' },
  ];

  const currentPlans = BUSINESS_PLANS[selectedCategory] || BUSINESS_PLANS['banda-larga'];

  const corporateFaqs = [
    {
      question: 'Qual a diferença entre Link Dedicado, Semi-Dedicado e Banda Larga Empresarial?',
      answer:
        'A Banda Larga Empresarial atende demandas gerais com excelente velocidade e Wi-Fi 6 corporativo. O Semi-Dedicado oferece garantia de banda de até 90%, 1 IP Fixo IPv4 (/32) e SLA de 12h, ideal para servidores locais e VPNs. Já o Link Dedicado entrega 100% de garantia de banda simétrica Full-Duplex (1:1), SLA de reparo em até 4h, ASN próprio com BGP e porta óptica exclusiva para operações de missão crítica.',
    },
    {
      question: 'Como funciona a garantia de 100% de banda (CIR) no Link Dedicado?',
      answer:
        'Diferente de conexões compartilhadas, o Link Dedicado reserva uma porta óptica exclusiva no nosso backbone para sua empresa. Se contratar 500 Mbps, terá 500 Mbps reais garantidos 24 horas por dia para download e upload simultâneos, sem qualquer oscilação ou estrangulamento de tráfego.',
    },
    {
      question: 'A Nuvv possui ASN próprio e suporte a roteamento BGP?',
      answer:
        'Sim! A Nuvv é uma operadora de telecomunicações com Sistema Autônomo (ASN) próprio, interconectada diretamente aos principais pontos de troca de tráfego (IX.br/PTT-Metro) e múltiplos fornecedores Tier 1, suportando sessões BGP multihomed e alocação de blocos IP.',
    },
    {
      question: 'Quais os prazos de atendimento e SLA de reparo corporativo?',
      answer:
        'Para Link Dedicado, nosso SLA contratual é de até 4 horas para atendimento e reparo com disponibilidade garantida de 99,9%. Para planos Semi-Dedicados, o SLA é de até 12 horas, ambos com monitoramento ativo 24/7/365 pelo nosso Network Operations Center (NOC).',
    },
    {
      question: 'A Nuvv realiza a interligação de matriz e filiais (Lan to Lan)?',
      answer:
        'Sim. Projetamos redes privadas ponto a ponto e multiponto (Lan to Lan / Camada 2 ou MPLS), conectando sedes, escritórios, centros de distribuição e fábricas em um túnel fechado e ultraveloz sem transitar pela internet pública.',
    },
    {
      question: 'A Nuvv atende empresas de quais portes?',
      answer:
        'Atendemos desde pequenos negócios, comércios e consultórios até médias empresas, indústrias, redes de franquias, hospitais, data centers e grandes corporações multinacionais, sempre com projetos escaláveis e faturamento corporativo direto.',
    },
  ];

  const pageSchema = [
    organizationSchema,
    enterpriseDedicatedLinkSchema,
    enterpriseSemiDedicatedSchema,
    enterpriseBroadbandSchema,
    businessComboServiceSchema,
    nuvvDigitalServiceSchema,
    createFaqSchema(corporateFaqs),
  ];

  const handleSelectPlan = (plan: BusinessPlan) => {
    onOpenLeadModal(`Plano Empresarial ${plan.name} (${plan.speed} ${plan.unit})`);
  };

  const handleSelectSolution = (solution: CorporateSolution) => {
    setSelectedSolution(solution);
  };

  const handleOpenDedicatedContact = () => {
    const text = `Olá! Gostaria de solicitar um estudo de viabilidade e proposta para Link Dedicado Carrier-Grade em ${currentCity}.`;
    window.open(
      `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Operadora Telecom Corporativa em ${currentCity} | Link Dedicado, Semi-Dedicado e Banda Larga | Nuvv`}
        description={`Soluções de Telecomunicações Corporativas em ${currentCity} para empresas de todos os portes: Link Dedicado 100% Simétrico com SLA de 4h e BGP, Semi-Dedicado com IP Fixo e PABX Cloud.`}
        keywords={[
          `link dedicado ${currentCity}`,
          `internet empresarial ${currentCity}`,
          `provedor corporativo ${currentCity}`,
          'link semi dedicado empresas',
          'link dedicado 100 simetrico',
          'operadora de telecom empresas',
          'sla 4 horas internet corporativa',
          'asn proprio bgp nuvv',
          'pabx em nuvem corporativo',
          'lan to lan interligacao matriz filial',
          'internet para industrias e grandes empresas',
          'telecom b2b',
        ]}
        canonicalUrl="https://nuvv.com.br/empresarial"
        schema={pageSchema}
        cityName={currentCity}
      />

      {/* Empresarial Hero - Matching Home & Residencial 2-column layout with image on top */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/50">
        {/* Background glow accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headlines, Highlights & Action Buttons */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>TELECOM CORPORATIVA DE ALCANCE NACIONAL</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Todo o Brasil</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Telecomunicações para Empresas de <br />
                <span className="text-gradient-green">Todos os Portes.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Conectividade de alta performance com <strong>presença em todo o território nacional</strong>. Banda Larga Empresarial, Semi-Dedicado com IP Fixo e Link Dedicado 100% Simétrico com SLA de 4h para sedes e filiais.
              </p>

              {/* Selling Bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-bold text-gray-800">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Todo o Brasil</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>100% Banda CIR</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>SLA de 4 Horas</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>NOC 24/7/365</span>
                </span>
              </div>

              {/* Main CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsFeasibilityModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#009245] hover:bg-[#007a3a] text-white font-black text-sm flex items-center justify-center space-x-2.5 shadow-md shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <span>Consultar Viabilidade PJ</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/empresas/monte-seu-combo')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border-2 border-emerald-400 text-emerald-800 hover:bg-emerald-50/70 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Monte seu Pacote</span>
                </button>

                <a
                  href="#planos-empresa"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>Modalidades</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Slideshow Carousel Card */}
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

                      {/* Top Pill on slide */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white font-extrabold text-[11px] tracking-wide shadow-md">
                          {slide.topBadge}
                        </span>
                      </div>

                      {/* Dynamic Floating Badge on slide bottom */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs transition-all">
                        <div className="flex items-center space-x-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <div>
                            <span className="font-bold text-white block">{slide.badge}</span>
                            <span className="text-[10px] text-emerald-300 font-medium">{slide.tag}</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          {slide.pill}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Slideshow Progress Indicators */}
                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentHeroSlide === idx
                          ? 'w-6 bg-emerald-400'
                          : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segment Solutions by Company Size */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>ESCALABILIDADE CORPORATIVA • DE PMES A GRANDES OPERAÇÕES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Soluções Dimensionadas para a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Realidade da Sua Empresa
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Atendemos demandas específicas para cada estágio e nível de criticidade: desde pequenos comércios e consultórios até indústrias com redes metropolitanas e faturamento corporativo direto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: PMEs & Comércios */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Pequenas Empresas & Comércio</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Conexão ultraveloz e estável para escritórios, clínicas, lojas e restaurantes. Wi-Fi 6 de alta capacidade para funcionários e clientes, além de linha telefônica fixa inclusa.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Banda Larga Empresarial de até 1 Giga</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Wi-Fi 6 corporativo com múltiplos acessos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Suporte prioritário comercial sem filas</span>
                  </li>
                </ul>
              </div>
              <a
                href="#planos-empresa"
                onClick={() => setSelectedCategory('banda-larga')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Ver Banda Larga Empresarial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2: Médias Empresas */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-nuvv-purple flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Médias Empresas & Escritórios</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para empresas que dependem de servidores internos, VPNs corporativas, emissão contínua de NFe e sistemas de PDV/ERP que exigem IP Fixo público e alta garantia de banda.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Semi-Dedicado com 1 IP Fixo IPv4 incluso</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Garantia de Banda de 80% (CIR)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>SLA de atendimento reduzido de 12h</span>
                  </li>
                </ul>
              </div>
              <a
                href="#planos-empresa"
                onClick={() => setSelectedCategory('semi-dedicado')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Ver Planos Semi-Dedicados</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 3: Grandes Corporações & Indústrias */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between hover:border-emerald-400/50 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-nuvv-green flex items-center justify-center border border-emerald-400/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-white">Indústrias & Grandes Corporações</h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Infraestrutura de missão crítica com 100% de garantia de banda simétrica, circuito óptico exclusivo ponto a ponto, ASN próprio com BGP, blocos de IP e SLA de 4h.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-200 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-nuvv-green flex-shrink-0" />
                    <span>Link Dedicado Full-Duplex (1:1) de até 10 Gbps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-nuvv-green flex-shrink-0" />
                    <span>SLA Contratual de 4 Horas (99,9% Uptime)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-nuvv-green flex-shrink-0" />
                    <span>Redes Lan to Lan e Interligação de Filiais</span>
                  </li>
                </ul>
              </div>
              <a
                href="#planos-empresa"
                onClick={() => setSelectedCategory('link-dedicado')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-green hover:underline"
              >
                <span>Ver Soluções Carrier-Grade</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Plans Section */}
      <section className="pt-10 sm:pt-14 pb-16 sm:pb-24 bg-slate-50/70" id="planos-empresa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da Vitrine Empresarial */}
          <div className="max-w-5xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>VITRINE EMPRESARIAL • PLANOS & MODALIDADES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Conectividade Corporativa para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                {currentCity.toUpperCase()}
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Escolha entre Banda Larga Empresarial com Wi-Fi 6 de alta densidade, Conexão Semi-Dedicada com IP Fixo ou Link Dedicado sob medida com SLA de 4h.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center justify-start sm:justify-center p-1.5 bg-gray-200/70 rounded-2xl max-w-3xl mx-auto mb-8 sm:mb-10 overflow-x-auto scrollbar-none gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-1 whitespace-nowrap py-3 px-4 sm:px-6 rounded-xl text-xs sm:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 flex-shrink-0 ${selectedCategory === cat.id
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-gray-600 hover:text-nuvv-dark'
                  }`}
              >
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white tracking-wider flex-shrink-0">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Feasibility Check Action */}
          <div className="max-w-3xl mx-auto mb-8 p-3.5 sm:p-4 bg-white rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-nuvv-dark">Consulte a Disponibilidade no Endereço da sua Empresa</h4>
                <p className="text-[11px] text-gray-500">
                  Verifique a cobertura de Fibra Óptica e circuitos no seu CEP em tempo real.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsFeasibilityModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Consultar Viabilidade</span>
            </button>
          </div>

          {/* Plan Cards: Mobile Carousel (snap-x), Desktop 3-Column Grid */}
          <div className="relative">
            <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 pt-2 px-2 md:px-0 max-w-6xl mx-auto items-stretch scrollbar-none">
              {currentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink h-full flex flex-col"
                >
                  <BusinessPlanCard
                    plan={plan}
                    onSelectPlan={handleSelectPlan}
                    onOpenDetails={setDetailPlanModal}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Planometer Callout Banner - Agora após os planos como opção de personalização */}
          <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-nuvv-green text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PLANÔMETRO CORPORATIVO B2B</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Precisa de algo sob medida? Monte seu Combo Empresarial
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
                Personalize a velocidade da fibra e adicione ramais de PABX, linhas fixas, multiatendimento WhatsApp e câmeras inteligentes com cálculo de preço centralizado.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/empresas/monte-seu-combo')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-2 flex-shrink-0 cursor-pointer"
            >
              <span>Monte seu Pacote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Banner: Dedicated Link Carrier-Grade Architecture */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-nuvv-green text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CIR 100% GARANTIDO • CARRIER-GRADE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Link Dedicado Exclusivo com <br />
                <span className="text-gradient-green">SLA Contratual de 4 Horas</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Projetado para companhias onde cada segundo de estabilidade é crucial. Sua empresa recebe uma porta óptica exclusiva direta no nosso backbone, sem concorrência de tráfego, com simetria total (1:1 de download e upload) e conexão direta ao IX.br (PTT-Metro).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-nuvv-green font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Disponibilidade 99,9%</span>
                  </div>
                  <p className="text-xs text-gray-400">Contrato com cláusula de SLA e penalidade por indisponibilidade.</p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center space-x-2 text-nuvv-green font-bold text-sm">
                    <Network className="w-4 h-4" />
                    <span>ASN Próprio & BGP</span>
                  </div>
                  <p className="text-xs text-gray-400">Roteamento otimizado de baixa latência e blocos de IPs válidos.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOpenDedicatedContact}
                  className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center space-x-2"
                >
                  <span>Solicitar Estudo de Viabilidade e Projeto Dedicado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                  Especificações de Engenharia Telecom
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-700">
                    <span className="text-gray-400">Garantia de Banda (CIR)</span>
                    <span className="font-bold text-white">100% Simétrica (1:1)</span>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-700">
                    <span className="text-gray-400">SLA de Reparo</span>
                    <span className="font-bold text-emerald-400">Até 4 Horas (24/7/365)</span>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-700">
                    <span className="text-gray-400">Endereçamento IP</span>
                    <span className="font-bold text-white">Blocos IPv4 (/30, /29) + IPv6</span>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-700">
                    <span className="text-gray-400">Monitoramento</span>
                    <span className="font-bold text-white">NOC Proativo em Tempo Real</span>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-700">
                    <span className="text-gray-400">Velocidades Disponíveis</span>
                    <span className="font-bold text-white">50 Mbps até 10 Gbps</span>
                  </div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-700">
                    <span className="text-gray-400">Abrangência Geográfica</span>
                    <span className="font-bold text-emerald-400">Disponibilidade Nacional (Todo o Brasil)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Dupla Abordagem</span>
                    <span className="font-bold text-white">Opcional com anel de proteção</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Comparison Table */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>TRANSPARÊNCIA TÉCNICA • CRITÉRIOS DE CONTRATAÇÃO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Banda Larga vs.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Semi-Dedicado vs. Link Dedicado
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Compare as garantias de banda (CIR), limites de latência, endereçamento IP e prazos contratuais de SLA para escolher a modalidade ideal para sua empresa.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm max-w-5xl mx-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                  <th className="p-4 sm:p-5 font-bold">Critério Técnico</th>
                  <th className="p-4 sm:p-5 font-bold">Banda Larga Empresarial</th>
                  <th className="p-4 sm:p-5 font-bold">Semi-Dedicado</th>
                  <th className="p-4 sm:p-5 font-bold bg-emerald-950 text-nuvv-green">
                    Link Dedicado 100%
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {CONNECTIVITY_COMPARISON.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`divide-x divide-gray-100 ${row.highlight ? 'bg-emerald-50/30' : 'hover:bg-slate-50/60'
                      }`}
                  >
                    <td className="p-4 sm:p-5 font-bold text-nuvv-dark">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-gray-600">{row.bandaLarga}</td>
                    <td className="p-4 sm:p-5 text-gray-800 font-medium">{row.semiDedicado}</td>
                    <td className="p-4 sm:p-5 text-emerald-800 font-bold bg-emerald-50/50">
                      {row.linkDedicado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 Pillars of a Real Telecom Operator (Why Nuvv is an Enterprise Carrier) */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Network className="w-4 h-4 text-emerald-600" />
              <span>CARRIER-GRADE TELECOM • ENGENHARIA DE REDE PRÓPRIA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Por que a Nuvv é uma Operadora de Telecom{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                e não apenas um provedor?
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Engenharia autônoma, backbone interconectado ao IX.br (PTT-Metro), múltiplos uplinks Tier 1 e governança operacional para atender aos mais rigorosos padrões corporativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Backbone & ASN com BGP</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sistema Autônomo próprio (ASN) com conexões diretas ao IX.br, rotas redundantes multihomed e baixa latência garantida.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">NOC Proativo 24/7/365</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Centro de Operações de Rede com engenheiros monitorando tráfego, perda de pacotes, jitter e links em tempo real.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-nuvv-purple flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">SLA Rigoroso em Contrato</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Compromisso contratual com tempos de resposta de até 4 horas e disponibilidade de 99,9%, garantindo a continuidade do negócio.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Engenharia Consultiva</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Consultores corporativos e engenheiros de rede dedicados para desenhar projetos sob medida para matrizes, filiais e plantas industriais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Solutions Portfolio Grid */}
      <SolutionsGrid onSelectSolution={handleSelectSolution} />

      {/* Corporate Technical FAQ Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>SUPORTE & CONTRATAÇÃO B2B • DÚVIDAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Perguntas Frequentes de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Gestores de TI e Decisores
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Esclarecimentos técnicos sobre faturamento PJ, prazos de ativação, SLA e garantias contratuais de telecomunicações.
            </p>
          </div>

          <div className="space-y-4">
            {corporateFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-gray-100 space-y-2.5 hover:border-emerald-200 transition-all"
              >
                <h4 className="text-sm sm:text-base font-bold text-nuvv-dark flex items-start space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
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

      {/* General Corporate Solution Modal (3 conversion pathways) */}
      <BusinessLeadModal
        isOpen={!!selectedSolution}
        onClose={() => setSelectedSolution(null)}
        solution={selectedSolution}
        cityName={currentCity}
      />

      {/* Business Plan Details Modal */}
      <Modal
        isOpen={!!detailPlanModal}
        onClose={() => setDetailPlanModal(null)}
        title={detailPlanModal ? `${detailPlanModal.name} - Especificações Técnicas` : ''}
        subtitle="Condições contratuais, SLA e benefícios corporativos inclusos"
        maxWidth="md"
      >
        {detailPlanModal && (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <span className="text-xs text-gray-500 font-medium">Modalidade / Investimento</span>
              {detailPlanModal.priceOnRequest ? (
                <div className="text-2xl font-black text-emerald-800">
                  Projeto Sob Medida
                </div>
              ) : (
                <div className="text-3xl font-black text-emerald-700">
                  R$ {detailPlanModal.promoPrice?.toFixed(2).replace('.', ',')}/mês
                </div>
              )}
              <span className="text-[11px] text-gray-500 block mt-0.5">
                {detailPlanModal.priceNote || 'Pagamento até o Vencimento • Instalação 100% Fibra Óptica'}
              </span>
            </div>

            {(detailPlanModal.cirGuarantee || detailPlanModal.slaHours || detailPlanModal.ipType) && (
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {detailPlanModal.cirGuarantee && (
                  <div className="p-2 bg-slate-50 rounded-xl border border-gray-200/70">
                    <span className="text-[10px] text-gray-400 block font-bold">BANDA (CIR)</span>
                    <span className="font-extrabold text-emerald-700">{detailPlanModal.cirGuarantee}</span>
                  </div>
                )}
                {detailPlanModal.slaHours && (
                  <div className="p-2 bg-slate-50 rounded-xl border border-gray-200/70">
                    <span className="text-[10px] text-gray-400 block font-bold">REPARO (SLA)</span>
                    <span className="font-extrabold text-nuvv-dark">{detailPlanModal.slaHours} Horas</span>
                  </div>
                )}
                {detailPlanModal.ipType && (
                  <div className="p-2 bg-slate-50 rounded-xl border border-gray-200/70">
                    <span className="text-[10px] text-gray-400 block font-bold">ENDEREÇO IP</span>
                    <span className="font-extrabold text-indigo-700">{detailPlanModal.ipType}</span>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Itens e Recursos inclusos</h4>
              {detailPlanModal.features.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-xl flex items-center space-x-2 text-xs font-medium text-gray-800"
                >
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const plan = detailPlanModal;
                setDetailPlanModal(null);
                handleSelectPlan(plan);
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              {detailPlanModal.priceOnRequest ? 'Solicitar Proposta Deste Projeto' : 'Solicitar Contratação Deste Plano'}
            </button>
          </div>
        )}
      </Modal>

      {/* Interactive Visual Coverage Modal for Business */}
      <BusinessCoverageModal
        isOpen={isFeasibilityModalOpen}
        onClose={() => setIsFeasibilityModalOpen(false)}
        onSelectPlanAndHire={(planName, addressSummary) => {
          onOpenLeadModal(`${planName} (Endereço validado: ${addressSummary})`);
        }}
      />
    </div>
  );
};
