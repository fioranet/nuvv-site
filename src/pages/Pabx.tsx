import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { pabxServiceSchema } from '../data/seoSchemas';
import { PABX_PLANS } from '../data/businessPlans';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import {
  Cloud,
  Check,
  Smartphone,
  PhoneCall,
  ShieldCheck,
  Headphones,
  Zap,
  ArrowRight,
  ArrowLeft,
  Phone,
  Layers,
  Sparkles,
  Building2,
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  Bot,
  Network,
  Laptop,
  Users,
  Radio,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface PabxPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Pabx: React.FC<PabxPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'small' | 'corp'>('all');
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pabxSlides = [
    {
      image: '/images/pabx/pabx_cloud_hero.png',
      title: 'Central Telefônica Ativa',
      subtitle: 'URA & Gravação em Nuvem',
      badge: 'SLA 99.9%',
      tag: 'NUVV VOICE CLOUD',
    },
    {
      image: '/images/pabx/dashboard_1.png',
      title: 'Painel Web & Softphone',
      subtitle: 'Ramais no Celular e Computador',
      badge: 'Gestão em Tempo Real',
      tag: 'APP IOS & ANDROID',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % pabxSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, pabxSlides.length]);

  const filteredPlans = PABX_PLANS.filter((plan) => {
    if (selectedFilter === 'small') {
      return ['pabx-2', 'pabx-5', 'pabx-10'].includes(plan.id);
    }
    if (selectedFilter === 'corp') {
      return ['pabx-20', 'pabx-30', 'pabx-50', 'pabx-100'].includes(plan.id);
    }
    return true;
  });

  const allFeatures = [
    'Gravação de chamadas em Nuvem',
    'Secretária virtual – URA personalizada',
    'Reach me - Siga-me inteligente',
    'Chat interno corporativo com troca de arquivos',
    'Transferência de chamadas assistida e direta',
    'Música de chamadas em espera personalizada',
    'Grupos de captura e busca de ramais',
    'Transbordos inteligentes de chamadas',
    'Histórico detalhado de chamadas e gravações',
    'Sala de Conferência virtual',
    'Videoconferência integrada em HD',
    'Multidispositivo (Android, iOS, Windows, Mac)',
    'Correio de voz integrado ao aplicativo',
    'Handoff - Troca de dispositivo durante a chamada',
    'Fila de Atendimento com métricas em tempo real',
    'Painel Web de monitoramento em tempo real de ramais',
  ];

  const pabxFaqs = [
    {
      question: 'O que é o PABX Virtual Cloud e como ele funciona na prática?',
      answer:
        'É uma central telefônica completa hospedada na nuvem de alta disponibilidade da Nuvv. Em vez de instalar equipamentos caros e fios físicos na sua empresa, seus ramais funcionam através da internet em aplicativos no computador, smartphones (Android/iOS) ou aparelhos telefônicos IP homologados.',
    },
    {
      question: 'Preciso comprar novos aparelhos telefônicos para usar o PABX?',
      answer:
        'Não! Sua equipe pode usar notebooks, computadores e smartphones através de nossos aplicativos (softphone) gratuitos com fones comuns. Se a sua empresa preferir aparelhos físicos de mesa, é possível utilizar telefones IP homologados ou adaptadores (ATAs) para reaproveitar telefones convencionais.',
    },
    {
      question: 'Posso manter o mesmo número de telefone fixo que minha empresa já possui?',
      answer:
        'Sim! A portabilidade numérica é 100% gratuita e transparente. Cuidamos de todo o processo junto à sua operadora atual para que seus clientes continuem ligando para o mesmo número que já conhecem, sem interrupção do atendimento.',
    },
    {
      question: 'Qual a conexão de internet necessária para os ramais funcionarem com boa qualidade?',
      answer:
        'Cada chamada de voz simultânea em alta definição (HD Voice) consome apenas cerca de 64 a 100 Kbps. Qualquer conexão de banda larga estável suporta múltiplos ramais. Se sua empresa utiliza a Internet Empresarial da Nuvv, o tráfego de voz recebe priorização automática (QoS) na rede.',
    },
    {
      question: 'Como funciona a gravação das chamadas e como tenho acesso aos áudios?',
      answer:
        'Todas as chamadas recebidas e realizadas pelos ramais podem ser gravadas automaticamente e armazenadas de forma criptografada em nuvem. Os gestores acessam o histórico, escutam ou baixam as gravações a qualquer momento pelo Painel Web administrativo.',
    },
    {
      question: 'Se minha empresa contratar mais funcionários, posso adicionar novos ramais facilmente?',
      answer:
        'Sim! O PABX Cloud é totalmente escalável. Sua empresa pode migrar para planos com maior quantidade de ramais a qualquer momento ou solicitar ampliações sob medida junto ao suporte técnico corporativo da Nuvv.',
    },
    {
      question: 'E se a minha operação precisar de mais de 100 ramais ou integração com CRM?',
      answer:
        'Desenvolvemos projetos customizados para operações de grande porte, contact centers e hospitais. Oferecemos servidores dedicados, integração com CRMs e ERPs via API, troncos SIP com centenas de canais simultâneos e SLA de atendimento de até 4 horas com NOC dedicado.',
    },
    {
      question: 'A Nuvv oferece suporte e treinamento para a minha equipe?',
      answer:
        'Sim. Todo o processo de configuração inicial de ramais, URA de atendimento e regras de horário é acompanhado por nossos especialistas. Seu time conta com suporte técnico corporativo e treinamentos para uso prático do sistema.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="PABX Virtual Cloud Inteligente para Empresas | Nuvv Voice"
        description="Centralize a telefonia da sua empresa com PABX em Nuvem Nuvv. 2 a 100+ ramais virtuais no celular e PC, gravação de chamadas, URA profissional e planos a partir de R$ 59,90/mês."
        keywords={[
          'pabx virtual',
          'pabx em nuvem',
          'telefonia voip empresas',
          'ramais no celular',
          'ura de atendimento',
          'pabx cloud corporativo',
        ]}
        canonicalUrl="https://nuvv.com.br/pabx"
        schema={pabxServiceSchema}
      />

      {/* 1. HERO PILOTO B2B (Pilar Comunicação + Nuvv Voice Cloud) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-indigo-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Lado Esquerdo: Hierarquia Clara (Pilar -> Solução -> Problema/Resultado -> CTAs) */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <Link
                  to="/empresarial"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-nuvv-purple transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Hub Empresarial</span>
                </Link>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-nuvv-purple text-xs font-bold shadow-2xs">
                  <Cloud className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>PILAR COMUNICAÇÃO • NUVV VOICE CLOUD</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                PABX Virtual em Nuvem para <br />
                <span className="text-gradient-hero">Empresas Modernas.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Centralize o atendimento telefônico, elimine custos com centrais físicas obsoletas e dê mobilidade total à sua equipe. Ramais no celular ou computador, URA inteligente e gravação de chamadas em planos a partir de R$ 59,90/mês.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#planos-pabx"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-md shadow-nuvv-purple/30 transition-all text-center active:scale-98 cursor-pointer"
                >
                  Ver Planos e Preços
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um especialista sobre o PABX Virtual Cloud da Nuvv.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-indigo-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-nuvv-purple" />
                  <span>Falar com Especialista</span>
                </a>
              </div>

              {/* Indicadores de Confiança sem sobrecarga de siglas técnicas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-indigo-100 text-xs text-gray-700 max-w-xl mx-auto lg:mx-0">
                <div>
                  <span className="font-black text-base text-nuvv-purple block">2 a 100+</span>
                  <span className="text-[11px] text-gray-500">Ramais Virtuais</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">100% Cloud</span>
                  <span className="text-[11px] text-gray-500">Sem Central Física</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-600 block">Grátis</span>
                  <span className="text-[11px] text-gray-500">Portabilidade Numérica</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-purple block">99.9%</span>
                  <span className="text-[11px] text-gray-500">SLA Garantido</span>
                </div>
              </div>
            </div>

            {/* Lado Direito: Carrossel do Dashboard / Softphone */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {pabxSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      heroSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-indigo-300 border border-white/10">
                        {slide.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="font-black text-white block">{slide.title}</span>
                          <span className="text-[10px] text-emerald-300">{slide.subtitle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-nuvv-green bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {pabxSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        heroSlide === i ? 'w-5 bg-nuvv-green' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTEXTO: PROBLEMA RESOLVIDO & PARA QUEM É */}
      <section className="py-14 sm:py-18 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Diagnóstico Empresarial
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Sua empresa ainda perde vendas por limitações de telefonia?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Descubra como o PABX Cloud substitui problemas crônicos de centrais físicas por uma gestão moderna e eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Ramais presos a mesas físicas</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Funcionários em trabalho remoto, visitas ou filiais não conseguiam atender o número fixo da empresa. Com o PABX Cloud, o ramal toca direto no smartphone ou notebook.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Linhas ocupadas e chamadas perdidas</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Clientes desistem ao encontrar sinal de ocupado. A URA inteligente do PABX Cloud atende instantaneamente, distribui em fila ou transborda para outros atendentes sem espera.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Falta de controle e custos com manutenção</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Sem saber quantas ligações foram atendidas ou o que foi falado. No PABX Cloud, você tem histórico em tempo real, gravação de áudio em nuvem e zero custo com peças físicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFÍCIOS EMPRESARIAIS */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Resultados Práticos
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Benefícios que transformam o dia a dia da sua operação
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Mais produtividade para a equipe e uma experiência de atendimento de alto nível para os seus clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Mobilidade Total',
                desc: 'Atenda e faça ligações pelo ramal da empresa no aplicativo (iOS/Android) ou computador em qualquer lugar com internet.',
                icon: Smartphone,
              },
              {
                title: 'URA de Atendimento',
                desc: 'Autoatendimento profissional com mensagens de voz personalizadas, menu numérico e divisão de equipes por departamento.',
                icon: Headphones,
              },
              {
                title: 'Gravação em Nuvem',
                desc: 'Segurança jurídica, auditoria e controle de qualidade com armazenamento seguro de todas as ligações recebidas e efetuadas.',
                icon: ShieldCheck,
              },
              {
                title: 'Gestão em Tempo Real',
                desc: 'Painel web intuitivo com métricas de filas, relatórios detalhados, status de ramais online e transbordos automáticos.',
                icon: Zap,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md hover:border-nuvv-purple/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-nuvv-dark mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. COMO FUNCIONA NA PRÁTICA (3 PASSOS) */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Implementação Descomplicada
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Como funciona a migração para o PABX Cloud
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Sem quebrar paredes, sem fios adicionais e sem interromper o atendimento da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 relative">
              <span className="text-3xl font-black text-nuvv-purple/30 block mb-3">01</span>
              <h3 className="text-base font-bold text-nuvv-dark mb-2">Defina ramais e números</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Escolha a quantidade de ramais para a sua equipe. Solicite a portabilidade gratuita do seu fixo atual ou ative um novo número oficial (DID local ou 0800).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 relative">
              <span className="text-3xl font-black text-nuvv-purple/30 block mb-3">02</span>
              <h3 className="text-base font-bold text-nuvv-dark mb-2">Ativação remota em nuvem</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Nossa equipe técnica configura a sua central virtual, gravações de saudação da URA, filas de atendimento e regras de horário sem necessidade de visita técnica demorada.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 relative">
              <span className="text-3xl font-black text-nuvv-purple/30 block mb-3">03</span>
              <h3 className="text-base font-bold text-nuvv-dark mb-2">Sua equipe conectada</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Instale o aplicativo nos computadores e celulares da equipe ou plugue telefones IP homologados. Pronto: seu atendimento corporativo já está funcionando em qualquer lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OFERTA & TABELA OFICIAL DE PLANOS (Preservada Rigorosamente) */}
      <section className="py-16 sm:py-24 bg-slate-50/70" id="planos-pabx">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Tabela Oficial de Planos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-3">
              Planos PABX Virtual Cloud
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Escolha a quantidade de ramais necessária para sua empresa. Upgrade ou downgrade a qualquer momento sem burocracia.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {[
                { id: 'all', label: 'Todos os Planos' },
                { id: 'small', label: 'Iniciais (2 a 10 Ramais)' },
                { id: 'corp', label: 'Médias & Grandes (20 a 100 Ramais)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-nuvv-purple text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between transition-all bg-white ${
                  plan.isPopular
                    ? 'border-nuvv-purple shadow-nuvv-hover ring-2 ring-nuvv-purple/30 md:-translate-y-1'
                    : 'border-gray-200 shadow-sm hover:shadow-md hover:border-nuvv-purple/40'
                }`}
              >
                <div>
                  <div className="min-h-[28px] mb-2">
                    {plan.badge && (
                      <span className="text-[10px] font-extrabold text-white bg-nuvv-purple px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-nuvv-dark">{plan.name}</h3>
                  <p className="text-xs font-bold text-nuvv-purple mb-1">{plan.extensionCount}</p>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">{plan.targetAudience}</p>

                  <div className="mb-4 pb-4 border-b border-gray-100 whitespace-nowrap">
                    <span className="text-2xl sm:text-3xl font-black text-nuvv-dark">
                      R$&nbsp;{plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold ml-1">/mês</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-gray-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenLeadModal(`PABX Virtual - ${plan.name} (R$ ${plan.price.toFixed(2).replace('.', ',')}/mês)`)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-nuvv-purple text-white hover:bg-nuvv-purple-hover shadow-nuvv-purple/30'
                      : 'bg-nuvv-dark text-white hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            ))}

            {/* Custom Enterprise Card (Acima de 100 Ramais) */}
            <div className="rounded-3xl p-6 border-2 border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50/70 to-purple-50/50 flex flex-col justify-between transition-all hover:border-nuvv-purple">
              <div>
                <div className="min-h-[28px] mb-2">
                  <span className="text-[10px] font-extrabold text-nuvv-purple bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block border border-indigo-200">
                    PROJETOS ESPECIAIS
                  </span>
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Acima de 100 Ramais</h3>
                <p className="text-xs font-bold text-nuvv-purple mb-1">Capacidade Ilimitada</p>
                <p className="text-xs text-gray-500 mb-4">Para grandes corporações, contact centers, indústrias e operações multilocais.</p>

                <div className="mb-4 pb-4 border-b border-indigo-100/80">
                  <span className="text-2xl font-black text-nuvv-purple">Consulte</span>
                  <span className="text-xs text-gray-500 font-medium block mt-0.5">Engenharia personalizada</span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs text-gray-700">
                  {[
                    'Servidores dedicados de alta disponibilidade',
                    'Troncos SIP com centenas de canais simultâneos',
                    'Integração profunda com SAP, Salesforce e CRMs',
                    'SLA de Atendimento em até 4 horas com NOC dedicado',
                    'Treinamento e implantação assistida para toda a equipe',
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-nuvv-purple flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de consultar um projeto corporativo de PABX Virtual com mais de 100 ramais.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-nuvv-purple text-white hover:bg-nuvv-purple-hover text-center shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Falar com Especialista</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Adicionais & Tarifas Transparentes */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-nuvv-dark flex items-center space-x-2">
                <Zap className="w-5 h-5 text-nuvv-purple" />
                <span>Adicionais e Tarifas Transparentes</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Sem contratos engessados. Adicione números virtuais e canais corporativos conforme sua demanda e acompanhe o consumo em tempo real pelo portal.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                  <span className="text-xs text-gray-500 block font-semibold">Número Virtual Adicional (DID)</span>
                  <span className="text-lg font-black text-nuvv-purple whitespace-nowrap">A partir de R$&nbsp;9,90</span>
                  <span className="text-xs text-gray-500"> /mês por número</span>
                </div>
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                  <span className="text-xs text-gray-500 block font-semibold">Números Nacionais 0300 / 0800</span>
                  <span className="text-lg font-black text-nuvv-purple whitespace-nowrap">Consultar</span>
                  <span className="text-xs text-gray-500"> ativação e tarifas sob medida</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0">
              <img
                src="/images/pabx/dashboard_3.png"
                alt="Painel de Controle PABX Cloud Nuvv"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECURSOS TÉCNICOS DETALHADOS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Funcionalidades Inclusas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark mt-3">
              Todos os Recursos Inclusos na Plataforma
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Sem taxas extras por recursos essenciais de produtividade e colaboração corporativa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto">
            {allFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex items-center space-x-3 text-xs font-semibold text-gray-800">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispositivos e Telefones IP Homologados */}
      <RecommendedDevicesSection
        category="telefonia"
        badge="Hardware Homologado"
        title="Telefones IP & ATAs Homologados para seu PABX"
        subtitle="Aparelhos VoIP, adaptadores ATA e roteadores multi-WAN testados para máxima qualidade de voz e estabilidade nos ramais Nuvv."
      />

      {/* 7. ECOSSISTEMA NUVV (Regra Corrigida - Conexões Comprovadas) */}
      <section className="py-16 sm:py-20 bg-slate-50/80 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Soluções Integradas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Como o PABX Cloud se conecta ao ecossistema Nuvv
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Integrações reais para empresas que buscam conectividade, comunicação e automação inteligente no mesmo provedor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Conexão 1: Telefonia IP */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-nuvv-purple/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-nuvv-purple flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Telefonia IP & Tronco SIP</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Conecte seu PABX a linhas digitais com tarifas corporativas reduzidas, números 0800 e múltiplos canais de chamadas simultâneas.
                </p>
              </div>
              <Link
                to="/telefonia"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple hover:underline"
              >
                <span>Conhecer Telefonia IP</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 2: Conectividade com QoS */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Conectividade com QoS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Banda Larga ou Link Dedicado Nuvv com priorização de tráfego de voz na fibra óptica, garantindo chamadas cristalinas sem cortes ou atrasos.
                </p>
              </div>
              <Link
                to="/empresarial?categoria=semi-dedicado#planos-empresa"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:underline"
              >
                <span>Ver Conectividade PJ</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 3: Agente IA de Voz */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-indigo-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Agente IA de Voz 24/7</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Integre inteligência artificial na URA para atender chamadas automaticamente, tirar dúvidas em linguagem natural e transferir para o ramal certo.
                </p>
              </div>
              <Link
                to="/agente-ia-voz"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:underline"
              >
                <span>Conhecer Agente de Voz</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 4: Combo Personalizado / Fatura Única */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-teal-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Monte sua Solução</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Combine ramais de PABX, internet corporativa e ferramentas digitais em uma fatura única mensal no CNPJ da sua empresa.
                </p>
              </div>
              <Link
                to="/empresas/monte-seu-combo"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:underline"
              >
                <span>Simular Combo B2B</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ DE DECISÃO (Acordeão Interativo) */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Perguntas frequentes sobre o PABX Cloud
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Tire suas principais dúvidas sobre implantação, funcionamento dos ramais, portabilidade e requisitos técnicos.
            </p>
          </div>

          <div className="space-y-3">
            {pabxFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/80 overflow-hidden bg-slate-50/50 transition-all hover:border-indigo-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-nuvv-dark flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-nuvv-purple flex-shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180 text-nuvv-purple' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-gray-600 pl-12 sm:pl-14 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL DECISIVO */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-indigo-50/30 border-t border-indigo-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-nuvv-purple text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRÓXIMO PASSO</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
            Pronto para modernizar o atendimento da sua empresa?
          </h2>

          <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Fale com um consultor corporativo Nuvv e agende uma demonstração prática ou ative seu plano de ramais em poucos minutos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor corporativo sobre a implantação do PABX Cloud na minha empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-nuvv-purple/25 transition-all active:scale-98 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Falar com Consultor via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenLeadModal('PABX Virtual Cloud - Contato Comercial')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-indigo-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Solicitar Contato Comercial</span>
              <ArrowRight className="w-4 h-4 text-nuvv-purple" />
            </button>
          </div>
        </div>
      </section>

      {/* Carrossel de Clientes & Barra de Acesso Rápido */}
      <PartnerCarousel />

      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
