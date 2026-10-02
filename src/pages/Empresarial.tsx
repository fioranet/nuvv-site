import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  MessageSquare,
  Bot,
  Send,
  Shield,
  Share2,
  Headphones,
  Users,
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
  const location = useLocation();

  // Sincroniza categoria e âncora vindas da navegação do SuperMenu
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('categoria');
    if (cat === 'banda-larga' || cat === 'semi-dedicado' || cat === 'link-dedicado') {
      setSelectedCategory(cat);
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.search, location.hash]);

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
        'A Banda Larga Empresarial atende demandas gerais com excelente velocidade e Wi-Fi 6 corporativo. O Semi-Dedicado oferece garantia de banda de 70% (CIR), 1 IP Fixo IPv4 (/32) e SLA de 12h, ideal para servidores locais e VPNs. Já o Link Dedicado entrega 100% de garantia de banda simétrica Full-Duplex (1:1), SLA de reparo em até 4h, ASN próprio com BGP e porta óptica exclusiva para operações de missão crítica.',
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
      question: 'Como o PABX Cloud e a Telefonia IP funcionam e posso manter meus números atuais?',
      answer:
        'Sim! A portabilidade numérica é 100% gratuita e transparente. Com o PABX Cloud Nuvv, sua empresa atende e realiza chamadas via ramais no computador, smartphone ou telefone IP, com URA inteligente, gravação de ligações e faturamento consolidado.',
    },
    {
      question: 'Como as Soluções Digitais (Social Wi-Fi e Segurança) se integram à operação da empresa?',
      answer:
        'O Hotspot Social Wi-Fi separa a rede de clientes da rede interna da empresa, gerando leads em total conformidade com a LGPD. Já a Segurança Digital Corporativa protege seus endpoints e servidores contra ransomware, invasões e vazamento de dados confidenciais.',
    },
    {
      question: 'A Nuvv atende empresas de quais portes e permite fatura unificada?',
      answer:
        'Atendemos desde comércios locais e consultórios até indústrias, redes de franquias, data centers e grandes corporações, permitindo consolidar conectividade, comunicação e licenças digitais em um único faturamento mensal no CNPJ.',
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

  const handleTalkToSpecialist = (contextTopic?: string) => {
    const topic = contextTopic ? `sobre ${contextTopic}` : 'sobre soluções corporativas';
    const text = `Olá! Gostaria de falar com um especialista corporativo da Nuvv ${topic} para minha empresa em ${currentCity}.`;
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
                  <span>CONECTIVIDADE • COMUNICAÇÃO • SOLUÇÕES DIGITAIS</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Presença Nacional</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Tecnologia e Telecomunicações para <br />
                <span className="text-gradient-green">Empresas e Negócios.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Soluções corporativas completas para a sua operação: <strong>Banda Larga Empresarial</strong> com Wi-Fi 6, <strong>Semi-Dedicado com IP Fixo</strong>, <strong>Link Dedicado 100% Simétrico</strong> com SLA de 4h, <strong>PABX Cloud</strong> e Soluções Digitais integradas.
              </p>

              {/* Selling Bullets */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-bold text-gray-800">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Banda Larga com Wi-Fi 6</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Link Dedicado com SLA 4h</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Telefonia & PABX Cloud</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Faturamento Único no CNPJ</span>
                </span>
              </div>

              {/* Main CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleTalkToSpecialist()}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#009245] hover:bg-[#007a3a] text-white font-black text-sm flex items-center justify-center space-x-2.5 shadow-md shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Falar com Especialista</span>
                </button>

                <a
                  href="/empresarial/monte-seu-combo"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-slate-900/20 transition-all active:scale-98 cursor-pointer border border-slate-700"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Montar Minha Solução</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsFeasibilityModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white border-2 border-emerald-500 text-emerald-800 hover:bg-emerald-50/70 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Consultar Viabilidade PJ</span>
                </button>

                <a
                  href="#planos-empresa"
                  className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>Ver Planos</span>
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

      {/* 1. Desafios / Necessidades Corporativas ("O que sua empresa precisa resolver?") */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>DIAGNÓSTICO CORPORATIVO • SOLUÇÃO SOB MEDIDA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              O que a sua empresa precisa{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                resolver hoje?
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              Identifique o seu momento operacional. Direcionamos sua empresa para a solução exata com o nível de suporte e tecnologia que seu negócio exige.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Desafio 1: Conexão Estável & Wi-Fi */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Wifi className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Conectar minha empresa com estabilidade</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para lojas, escritórios, consultórios e equipes que precisam de internet rápida, roteador corporativo Wi-Fi 6 e atendimento sem filas.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700">
                  Solução: Banda Larga Empresarial (600M a 1 Giga)
                </div>
              </div>
              <a
                href="#planos-empresa"
                onClick={() => setSelectedCategory('banda-larga')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Ver planos de banda larga</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Desafio 2: Servidores, VPN & IP Fixo */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Servidores locais, VPN e IP Fixo</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Para empresas que utilizam ERP, emissão fiscal contínua, acesso remoto seguro ou câmeras com endereço IPv4 público exclusivo.
                </p>
                <div className="pt-2 text-xs font-semibold text-indigo-700">
                  Solução: Semi-Dedicado (IP Fixo IPv4 + SLA 12h)
                </div>
              </div>
              <a
                href="#planos-empresa"
                onClick={() => setSelectedCategory('semi-dedicado')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800"
              >
                <span>Ver planos semi-dedicados</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Desafio 3: Operação Crítica & 100% Simetria */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between hover:border-emerald-400/50 hover:shadow-xl transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Operação de missão crítica com SLA 4h</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Para indústrias, hospitais, data centers e grandes sedes onde a conexão não pode parar, com 100% de banda simétrica CIR e BGP.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400">
                  Solução: Link Dedicado 1:1 Carrier-Grade
                </div>
              </div>
              <a
                href="#link-dedicado-section"
                onClick={() => setSelectedCategory('link-dedicado')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>Ver link dedicado 100%</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Desafio 4: Modernizar Telefonia & Atendimento */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Modernizar telefonia e atendimento</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Elimine centrais antigas com PABX em nuvem, ramais no celular e computador, URA profissional e agentes inteligentes por voz.
                </p>
                <div className="pt-2 text-xs font-semibold text-teal-700">
                  Solução: PABX Cloud, Telefonia IP & Agente IA de Voz
                </div>
              </div>
              <a
                href="#comunicacao"
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Conhecer soluções de comunicação</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Desafio 5: Segurança & Wi-Fi para Clientes */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Proteger a rede e engajar clientes</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ofereça Wi-Fi legal para clientes captando contatos via check-in social (LGPD) e proteja computadores contra ransomware e invasões.
                </p>
                <div className="pt-2 text-xs font-semibold text-amber-700">
                  Solução: Hotspot Social Wi-Fi & Kaspersky
                </div>
              </div>
              <a
                href="#solucoes-digitais"
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                <span>Ver soluções digitais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Desafio 6: Solução Personalizada */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950">Combinar várias soluções sob medida</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Sua empresa precisa de internet, ramais de PABX e ferramentas digitais consolidados em uma única fatura mensal no CNPJ?
                </p>
                <div className="pt-2 text-xs font-bold text-emerald-800">
                  Solução: Monte sua Solução Corporativa
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/empresas/monte-seu-combo')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-black text-emerald-800 hover:text-emerald-900 cursor-pointer"
              >
                <span>Configurar combo personalizado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Os Três Pilares Nuvv (Apresentação Clara e Equilibrada) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>ARQUITETURA DE VALOR • NUVV = TECNOLOGIA + TELECOM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Os 3 Pilares da Nuvv para a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                Sua Empresa
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              Uma abordagem integrada de engenharia onde infraestrutura de rede, comunicação em nuvem e segurança digital convergem com faturamento único.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1: Conectividade */}
            <div className="p-8 rounded-3xl bg-white border-2 border-emerald-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold uppercase">
                  <span>Pilar 01</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Conectividade</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Rede de alta disponibilidade para interligar sedes, unidades, pessoas e operações com estabilidade contratual.
                </p>
                <div className="pt-2 border-t border-gray-100 space-y-2 text-xs font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Banda Larga Empresarial (Wi-Fi 6)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Semi-Dedicado com IP Fixo IPv4</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Link Dedicado 1:1 Simétrico com SLA 4h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Redes Lan-to-Lan & Interligação</span>
                  </div>
                </div>
              </div>
              <a
                href="#planos-empresa"
                className="mt-6 inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition-colors"
              >
                <span>Explorar Conectividade</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Pilar 2: Comunicação */}
            <div className="p-8 rounded-3xl bg-white border-2 border-teal-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-extrabold uppercase">
                  <span>Pilar 02</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Comunicação</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Soluções para atendimento profissional, telefonia corporativa em nuvem, mobilidade de ramais e inteligência por voz.
                </p>
                <div className="pt-2 border-t border-gray-100 space-y-2 text-xs font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>PABX Cloud & URA Inteligente</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Telefonia IP com Portabilidade Grátis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Agente IA de Voz para Atendimento 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Mensageria Corporativa SMS & RCS</span>
                  </div>
                </div>
              </div>
              <a
                href="#comunicacao"
                className="mt-6 inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-xs transition-colors"
              >
                <span>Explorar Comunicação</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Pilar 3: Soluções Digitais */}
            <div className="p-8 rounded-3xl bg-white border-2 border-indigo-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-extrabold uppercase">
                  <span>Pilar 03</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Soluções Digitais</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ferramentas inteligentes para aumentar a segurança das informações corporativas e impulsionar vendas no ponto de atendimento.
                </p>
                <div className="pt-2 border-t border-gray-100 space-y-2 text-xs font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Hotspot Social Wi-Fi (Check-in LGPD)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Segurança Digital Endpoint Kaspersky</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Multiatendimento WhatsApp Centralizado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Gestão Integrada com Fatura Única</span>
                  </div>
                </div>
              </div>
              <a
                href="#solucoes-digitais"
                className="mt-6 inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-indigo-50 text-indigo-800 hover:bg-indigo-100 font-bold text-xs transition-colors"
              >
                <span>Explorar Soluções Digitais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Conectividade & Banda Larga Empresarial (Planos Existentes Preservados) */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 bg-slate-50/70" id="planos-empresa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da Vitrine Empresarial com Contexto Claro */}
          <div className="max-w-5xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>CONECTIVIDADE EMPRESARIAL • COMECE PELO QUE SUA EMPRESA PRECISA HOJE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Banda Larga e Conectividade para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                {currentCity.toUpperCase()}
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Se você procura internet rápida, estável e com suporte corporativo sem complicações para a sua equipe, escolha a velocidade ideal abaixo ou consulte a viabilidade no seu endereço.
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

          {/* Quick Actions Bar: Feasibility & Custom Solution */}
          <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Box 1: Feasibility */}
            <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-emerald-200/80 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-nuvv-dark truncate">Consultar Viabilidade no CEP</h4>
                  <p className="text-[11px] text-gray-500 truncate">
                    Cobertura e circuitos disponíveis no endereço.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFeasibilityModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Consultar</span>
              </button>
            </div>

            {/* Box 2: Montar Minha Solução */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl border border-slate-700 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">Prefere Montar sua Solução?</h4>
                  <p className="text-[11px] text-gray-300 truncate">
                    Combine internet, PABX, telefonia e IA.
                  </p>
                </div>
              </div>
              <a
                href="/empresarial/monte-seu-combo"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                <span>Montar Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Plan Cards: Mobile Carousel (snap-x), Desktop 3-Column Grid */}
          <div className="relative">
            <div className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 pt-2 px-2 md:px-0 max-w-7xl mx-auto items-stretch scrollbar-none">
              {currentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="min-w-[88vw] sm:min-w-[380px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink h-full flex flex-col"
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

          {/* Banner Convite para Montar Solução Customizada */}
          <div className="mt-8 max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-500/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">Precisa de um pacote sob medida para o tamanho da sua equipe?</h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  Escolha sua velocidade com IP Fixo ou Dinâmico e adicione ramais de PABX, linhas, atendimento com IA e segurança em fatura única.
                </p>
              </div>
            </div>
            <a
              href="/empresarial/monte-seu-combo"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              <span>Montar Minha Solução</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Banner: Dedicated Link Carrier-Grade Architecture */}
      <section id="link-dedicado-section" className="py-16 bg-slate-900 text-white relative overflow-hidden">
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

      {/* 5. Comunicação Corporativa (Conecte sua empresa às pessoas certas) */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100" id="comunicacao">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <PhoneCall className="w-4 h-4 text-teal-600" />
              <span>PILAR 02 • COMUNICAÇÃO CORPORATIVA INTELIGENTE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Conecte sua empresa às{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700">
                pessoas certas
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              Telefonia moderna em nuvem, agentes inteligentes por voz e mensageria corporativa para escalar o atendimento ao cliente com qualidade e redução de custos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* PABX Cloud */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">PABX Cloud</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ramais virtuais no computador ou smartphone, URA profissional de autoatendimento, filas inteligentes e gravação de chamadas sem precisar de fiação física.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>Mobilidade total para trabalho híbrido</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>Relatórios completos de chamadas</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/pabx')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                <span>Conhecer PABX Cloud</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Telefonia IP */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Telefonia IP Fixa</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Linhas fixas digitais corporativas (DDR e SIP Trunk) com portabilidade 100% gratuita do seu número atual e economia de até 60% em ligações.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Portabilidade sem interrupção</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Tarifas corporativas ultra-reduzidas</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/telefonia')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <span>Conhecer Telefonia IP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Agente IA de Voz */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Agente IA de Voz</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Atendimento telefônico automatizado com inteligência artificial e voz natural humanizada para qualificar leads, agendar compromissos e prestar suporte 24/7.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>Voz humanizada de alta fluidez</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>Disponibilidade 24 horas sem esperas</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/agente-ia-voz')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-purple-700 hover:text-purple-800 cursor-pointer"
              >
                <span>Conhecer IA de Voz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mensageria SMS & RCS */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col justify-between hover:border-teal-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Mensageria SMS & RCS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Disparos transacionais e promocionais com altíssima taxa de abertura para lembretes de cobrança, códigos de segurança (2FA) e avisos a clientes.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Taxa de abertura superior a 95%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Integração simples via API corporativa</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/mensageria')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
              >
                <span>Conhecer Mensageria</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Soluções Digitais (Tecnologia para tornar sua operação mais eficiente e segura) */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-t border-gray-100" id="solucoes-digitais">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-800 text-xs font-black tracking-wider uppercase shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>PILAR 03 • SOLUÇÕES DIGITAIS & PRODUTIVIDADE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Tecnologia para tornar sua operação{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-emerald-600 to-indigo-700">
                mais eficiente e protegida
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              Soluções complementares que agregam inteligência de atendimento, captação de clientes e proteção cibernética de padrão internacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Social Wi-Fi */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Hotspot Social Wi-Fi</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ofereça internet para seus clientes com check-in social ou cadastro rápido, captando contatos qualificados e cumprindo 100% das obrigações do Marco Civil e da LGPD.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Rede de visitantes isolada da empresa</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Controle de banda e portal customizável</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/social-wifi')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <span>Conhecer Social Wi-Fi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Segurança Digital Kaspersky */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Segurança Digital Kaspersky</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Proteção corporativa em tempo real para computadores, notebooks e servidores contra ameaças cibernéticas, vírus, spyware e ataques de sequestro de dados (ransomware).
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>Console de gerenciamento centralizada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>Backup de dados e proteção de navegadores</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/seguranca-digital')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800 cursor-pointer"
              >
                <span>Conhecer Segurança Digital</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Multiatendimento WhatsApp */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-nuvv-dark">Multiatendimento WhatsApp</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Conecte toda a sua equipe de vendas e suporte em um único número oficial de WhatsApp. Distribua atendimentos por setores, departamentos e filas automáticas.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>Múltiplos atendentes em um único número</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>Histórico centralizado de conversas</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => navigate('/multiatendimento')}
                className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                <span>Conhecer Multiatendimento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Portfólio Completo de Soluções Corporativas (Categorizado por Pilares) */}
      <SolutionsGrid onSelectSolution={handleSelectSolution} />

      {/* 8. Monte sua Solução (Protagonismo B2B) */}
      <section className="py-14 sm:py-18 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MONTE SUA SOLUÇÃO • PORTA DE ENTRADA CONSULTIVA</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Sua empresa não precisa se encaixar <br />
                <span className="text-gradient-green">em uma solução pronta.</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                Combine <strong>conectividade</strong>, <strong>comunicação</strong> e <strong>soluções digitais</strong> de acordo com a sua necessidade real. Escolha a velocidade da fibra, adicione ramais de PABX, linhas telefônicas e proteção digital com cálculo centralizado e fatura única no CNPJ.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/empresas/monte-seu-combo')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Montar minha solução</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleTalkToSpecialist('montar um combo sob medida')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Falar com Especialista</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Diferenciais de Engenharia de Rede Própria (Why Nuvv is an Enterprise Carrier) */}
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

      {/* 10. Corporate Technical FAQ Section */}
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
              Esclarecimentos técnicos sobre conectividade, PABX em nuvem, soluções digitais e faturamento corporativo no CNPJ.
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

      {/* 11. CTA Final Decisivo B2B */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>ATENDIMENTO CORPORATIVO DEDICADO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Precisa de uma solução para sua empresa? <br />
            <span className="text-gradient-green">Converse com nossos especialistas corporativos.</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Seja para ativar uma conexão de alta performance em poucos dias ou estruturar uma rede privada interligando filiais com PABX em nuvem, temos a equipe certa para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleTalkToSpecialist()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#009245] hover:bg-[#007a3a] text-white font-black text-sm flex items-center justify-center space-x-2.5 shadow-lg shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Falar com Especialista</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/empresas/monte-seu-combo')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border-2 border-emerald-500 text-emerald-800 hover:bg-emerald-50/70 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Montar minha solução</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFeasibilityModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Consultar Viabilidade PJ</span>
            </button>
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
