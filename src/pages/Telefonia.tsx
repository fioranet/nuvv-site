import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { telephonyServiceSchema } from '../data/seoSchemas';
import { TELEPHONY_PLANS } from '../data/businessPlans';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { RecommendedDevicesSection } from '../components/common/RecommendedDevicesSection';
import {
  PhoneCall,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneForwarded,
  Headphones,
  Phone,
  Server,
  Smartphone,
  Laptop,
  Network,
  Bot,
  Sparkles,
  Cloud,
  ChevronDown,
  HelpCircle,
  Radio,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface TelefoniaPageProps {
  currentCity?: string;
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Telefonia: React.FC<TelefoniaPageProps> = ({
  currentCity,
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const telephonySlides = [
    {
      image: '/images/services/telephony_sip_hero.png',
      title: 'Tronco SIP Conectado',
      subtitle: 'Portabilidade Numérica Ativa',
      badge: 'Codec G.711 HD',
      tag: 'TRONCO SIP CORPORATIVO',
    },
    {
      image: '/images/services/business_scheduling_meet.png',
      title: 'Atendimento & 0800 Nacional',
      subtitle: 'Qualidade de Áudio Cristalina',
      badge: 'SLA 99.9%',
      tag: 'VOZ HD EM FIBRA',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % telephonySlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, telephonySlides.length]);

  const telephonyFaqs = [
    {
      question: 'Como funciona a Linha IP no aplicativo do celular? Consome muita bateria?',
      answer:
        'A Linha IP Nuvv utiliza tecnologia nativa de Notificação Push (Apple APNs e Google FCM). Isso significa que o aplicativo não precisa ficar aberto em segundo plano gastando bateria nem dados. Quando alguém disca para o seu número fixo, nosso servidor envia um sinal Push seguro que "acorda" o app instantaneamente, fazendo seu smartphone tocar exatamente como uma ligação comum.',
    },
    {
      question: 'Posso manter o mesmo número de telefone fixo que minha empresa já divulga?',
      answer:
        'Sim! A portabilidade numérica para a Nuvv é 100% gratuita, transparente e homologada pela Anatel. Cuidamos de todo o processo burocrático junto à sua operadora anterior para que seus clientes continuem ligando para o mesmo número que já conhecem, sem que sua empresa fique um minuto sequer fora do ar.',
    },
    {
      question: 'Preciso ter internet da Nuvv para contratar a Telefonia IP ou o SIP Trunk?',
      answer:
        'Não obrigatoriamente. Nossos serviços de telefonia funcionam através de qualquer conexão de internet estável no Brasil ou no exterior. Contudo, se sua empresa utilizar a Conectividade Empresarial da Nuvv (Banda Larga ou Link Dedicado), o tráfego de voz recebe priorização automática (QoS) direta em nosso backbone, garantindo latência mínima e ausência total de chiados.',
    },
    {
      question: 'O que é o SIP Trunk e como conecto à minha central telefônica existente?',
      answer:
        'O SIP Trunk (Tronco SIP) é uma conexão digital direta entre a sua central telefônica (PABX IP físico ou em nuvem como Asterisk, FreePBX, Grandstream, Intelbras, Yeastar, etc.) e os servidores de voz da Nuvv. O envio e recebimento de chamadas ocorre via protocolo SIP pela internet ou circuito dedicado, com autenticação por IP ou credenciais, sem a necessidade de placas E1 antigas ou fiação analógica.',
    },
    {
      question: 'Posso utilizar telefones físicos de mesa convencionais na Linha IP?',
      answer:
        'Sim. Você pode utilizar aparelhos telefônicos IP modernos (que se conectam via cabo de rede ou Wi-Fi) ou utilizar um adaptador ATA (adaptador de telefone analógico), que permite plugar telefones de mesa convencionais ou sem fio diretamente na Linha IP da Nuvv.',
    },
    {
      question: 'Qual a diferença entre uma Linha IP e um PABX Virtual?',
      answer:
        'A Linha IP é a linha telefônica em si (o número e os canais de voz para falar e atender). O PABX Virtual é a inteligência que gerencia múltiplos ramais, menus de atendimento (URA), gravação de chamadas e filas. Uma Linha IP pode ser contratada isoladamente para atender no celular com mobilidade e, se sua empresa crescer, pode ser integrada facilmente ao PABX Cloud Nuvv.',
    },
    {
      question: 'O número fixo da Nuvv pode ser cadastrado no WhatsApp Business?',
      answer:
        'Com certeza! Todas as nossas linhas fixas (DIDs) são 100% compatíveis com o WhatsApp Business. Como você recebe chamadas com facilidade no aplicativo ou telefone, basta solicitar o código de verificação por ligação telefônica no WhatsApp e ativar seu perfil comercial oficial com o número fixo.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Telefonia IP Empresarial, Linhas Digitais e Tronco SIP | Nuvv Voice"
        description="Linhas fixas digitais corporativas que você atende no aplicativo com notificação Push ou conecta sua central existente via SIP Trunk. Portabilidade grátis e voz HD."
        keywords={[
          'telefonia ip empresarial',
          'tronco sip',
          'linha digital empresas',
          'sip trunk corporativo',
          'portabilidade numero fixo',
          'voip empresarial aplicativo',
          'telefonia fixa nuvv',
        ]}
        canonicalUrl="https://nuvv.com.br/telefonia"
        schema={telephonyServiceSchema}
      />

      {/* 1. HERO PILOTO B2B (Pilar Comunicação • Nuvv Voice Carrier) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-emerald-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Lado Esquerdo: Mensagem Clara & Posicionamento */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <Link
                  to="/empresarial"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Hub Empresarial</span>
                </Link>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PILAR COMUNICAÇÃO • NUVV VOICE CARRIER</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Telefonia IP Empresarial com <br />
                <span className="text-gradient-green">Infraestrutura Própria.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Atenda sua linha fixa corporativa direto no aplicativo com notificação Push ou conecte sua central existente via SIP Trunk de alta disponibilidade. Voz HD sem chiados, portabilidade gratuita e planos a partir de R$ 9,90/mês.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#planos-telefonia"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all text-center active:scale-98 cursor-pointer"
                >
                  Ver Planos de Linha IP
                </a>
                <a
                  href="#sip-trunk"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-300 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Server className="w-4 h-4 text-emerald-600" />
                  <span>Cotar Tronco SIP</span>
                </a>
              </div>

              {/* Indicadores de Confiança */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-emerald-100 text-xs text-gray-700 max-w-xl mx-auto lg:mx-0">
                <div>
                  <span className="font-black text-base text-emerald-600 block">App & Push</span>
                  <span className="text-[11px] text-gray-500">Zero consumo de bateria</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">Operadora</span>
                  <span className="text-[11px] text-gray-500">Infraestrutura Própria</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-700 block">Grátis</span>
                  <span className="text-[11px] text-gray-500">Portabilidade Numérica</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">SIP Trunk</span>
                  <span className="text-[11px] text-gray-500">Compatibilidade Universal</span>
                </div>
              </div>
            </div>

            {/* Lado Direito: Visual Hero Card */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {telephonySlides.map((slide, idx) => (
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
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
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
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {telephonySlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        heroSlide === i ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
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

      {/* 2. DUAS JORNADAS COMERCIAIS CLARAS */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Duas Formas de Contratar
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Escolha a modalidade ideal para a sua infraestrutura
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Temos a solução perfeita tanto para quem quer uma linha pronta e moderna no celular quanto para quem já tem central telefônica própria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Modalidade A: Linha IP Inteligente */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border-2 border-emerald-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
                  <span>Jornada 01 • Pronta para Usar</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Linha IP Empresarial no Aplicativo</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Para profissionais e empresas que buscam um número fixo oficial no CNPJ com mobilidade total. Você não precisa contratar PABX nem comprar equipamentos: basta baixar o app Nuvv no smartphone ou notebook.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-emerald-200/80 text-xs text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Chamadas chegam via Notificação Push (poupa bateria)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Compatível com WhatsApp Business oficial no número fixo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Opção de portabilidade gratuita do seu número atual</span>
                  </div>
                </div>
              </div>

              <a
                href="#planos-telefonia"
                className="mt-8 inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Ver Planos de Linha Fixa IP</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Modalidade B: SIP Trunk Corporativo */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border-2 border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-extrabold uppercase">
                  <span>Jornada 02 • Para Centrais Existentes</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xs">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">SIP Trunk (Tronco SIP Corporativo)</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Para empresas que já possuem central telefônica própria (PABX IP físico, Asterisk, Grandstream, Intelbras, Call Center ou Discador) e precisam de canais simultâneos de alta disponibilidade e tarifas competitivas.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-700 text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Conexão direta por protocolo SIP padrão de mercado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Múltiplos canais simultâneos (2 a 60+ canais por tronco)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Rotas CLI abertas e certificadas com suporte a Codec G.711</span>
                  </div>
                </div>
              </div>

              <a
                href="#sip-trunk"
                className="mt-8 inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Conhecer Estrutura SIP Trunk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A EXPERIÊNCIA DO APP NUVV (Mobilidade & Push) */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Tecnologia que Transforma
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Uma linha fixa que não te prende à mesa
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Esqueça a velha fiação analógica. A Linha IP Nuvv funciona onde você estiver com qualidade digital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Notificação Push Inteligente</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                O aplicativo não gasta bateria em segundo plano. Quando alguém liga, o Push acorda o celular e toca como uma chamada comum.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Atendimento Multidispositivo</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Atenda no celular (iOS/Android), no computador com headset ou em aparelhos telefônicos IP físicos homologados.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <PhoneForwarded className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Portabilidade 100% Grátis</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Traga seu número fixo de qualquer operadora sem custo e sem interrupção. Seus clientes continuam ligando normalmente.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Voz HD sem Ruídos</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Codecs profissionais de alta fidelidade com priorização de tráfego de voz, eliminando ecos, chiados e cortes de chamada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLANOS DE LINHA FIXA DIGITAL IP (Preservados Rigorosamente) */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100" id="planos-telefonia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Tabela de Planos de Linha Fixa
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-3">
              Planos de Linha Fixa Digital IP
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Escolha entre o plano receptivo econômico para WhatsApp Business ou a linha ilimitada para falar com todo o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {TELEPHONY_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 border flex flex-col justify-between transition-all bg-white ${
                  plan.isPopular
                    ? 'border-emerald-600 shadow-xl ring-2 ring-emerald-500/20 md:-translate-y-2'
                    : 'border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-nuvv-dark">{plan.name}</h3>
                    {plan.badge && (
                      <span className="text-[10px] font-extrabold bg-emerald-500 text-slate-950 px-3 py-1 rounded-full uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mb-4">{plan.subtitle}</p>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <span className="text-3xl sm:text-4xl font-black text-nuvv-dark">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 ml-1">
                      /mês
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-xs sm:text-sm">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenLeadModal(`Telefonia Fixa IP - ${plan.name} (R$ ${plan.price.toFixed(2).replace('.', ',')}/mês)`)
                  }
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
                      : 'bg-nuvv-dark text-white hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Banner de Portabilidade Numérica */}
          <div className="mt-12 max-w-4xl mx-auto p-6 rounded-3xl bg-slate-50 border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <PhoneForwarded className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-nuvv-dark">Já possui um número fixo de outra operadora?</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Migramos seu número atual gratuitamente para a Nuvv sem troca de numeração e sem interrupção das suas ligações.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenLeadModal('Portabilidade Numérica - Telefonia Fixa')}
              className="px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:border-emerald-600 text-slate-800 font-bold text-xs shadow-2xs transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              Pedir Portabilidade Grátis
            </button>
          </div>
        </div>
      </section>

      {/* 5. SIP TRUNK CORPORATIVO EM DESTAQUE */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden" id="sip-trunk">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-xs font-bold">
                <Server className="w-3.5 h-3.5" />
                <span>INTERCONEXÃO CARRIER • SIP TRUNK NUVV</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Conecte sua Central Telefônica <br />
                <span className="text-gradient-green">à Infraestrutura Nuvv via SIP.</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Para empresas que já possuem PABX IP físico ou em nuvem (Asterisk, FreePBX, Grandstream, Intelbras, Elastix, Panasonic, Yeastar ou Call Center) e precisam de canais digitais de alta capacidade com excelente terminação de voz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <Radio className="w-4 h-4" />
                    <span>Múltiplos Canais Simultâneos</span>
                  </div>
                  <p className="text-xs text-gray-400">Dimensione de 2 a mais de 60 canais simultâneos em um único tronco SIP.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Rotas CLI Abertas (Anatel)</span>
                  </div>
                  <p className="text-xs text-gray-400">Bina oficial e rotas homologadas com alta taxa de completamento.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <Network className="w-4 h-4" />
                    <span>Autenticação Flexível</span>
                  </div>
                  <p className="text-xs text-gray-400">Conecte via IP público autenticado ou por Usuário e Senha com criptografia TLS/SRTP.</p>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    <span>Tarifas Corporativas Reduzidas</span>
                  </div>
                  <p className="text-xs text-gray-400">Planos sob medida para alto volume de minutos fixos e móveis Brasil e DDI.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                    `Olá! Gostaria de uma proposta de Tronco SIP corporativo para conectar ao PABX da minha empresa${currentCity ? ` em ${currentCity}` : ''}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Cotar Tronco SIP via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenLeadModal(`SIP Trunk Corporativo - Cotação Técnica${currentCity ? ` (${currentCity})` : ''}`)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Solicitar Cotação por E-mail</span>
                </button>
              </div>
            </div>

            {/* Lado Direito: Box de Compatibilidade de PABX */}
            <div className="lg:col-span-5 p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Compatibilidade Universal Homologada</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Nosso SIP Trunk foi exaustivamente testado e funciona com qualquer software ou appliance de telefonia do mercado:
              </p>

              <div className="grid grid-cols-2 gap-2.5 text-xs font-semibold text-gray-200">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Asterisk / FreePBX</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Grandstream UCM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Intelbras UnniTI / CIP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Yeastar S-Series / P</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Panasonic KX-NS / TDE</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Elastix / Issabel</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                💡 <strong>Engenharia Consultiva:</strong> Nossos engenheiros de voz auxiliam diretamente no apontamento do tronco e nos testes de rota.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NÚMEROS VIRTUAIS (DIDs) E 0800 / 0300 */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Presença Nacional
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Números Locais (DID) e Números Nacionais 0800
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Atenda clientes com a credibilidade de um número fixo local da sua cidade ou ofereça ligação gratuita em todo o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                DID
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Números Fixos Locais (DID)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ative números telefônicos com o DDD da sua região. Ideal para divulgar em sites, cartões de visita e no perfil oficial do WhatsApp Business.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700">A partir de R$ 9,90/mês</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                0800
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Número Nacional 0800</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ligações 100% gratuitas para quem liga de qualquer telefone fixo ou celular do Brasil. Essencial para SACs corporativos e e-commerces.
              </p>
              <div className="pt-2 text-xs font-bold text-purple-700">Sob consulta (tarifação sob medida)</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                0300
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Número Único Nacional 0300</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Custo compartilhado de chamada local entre cliente e empresa. Permite centralizar o atendimento de todo o país em um único número fácil.
              </p>
              <div className="pt-2 text-xs font-bold text-blue-700">Sob consulta técnica</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispositivos Recomendados & Telefones IP */}
      <RecommendedDevicesSection
        category="telefonia"
        badge="Dispositivos Recomendados"
        title="Telefones IP e Adaptadores ATA para Linha Fixa"
        subtitle="Aparelhos VoIP e adaptadores homologados para transformar suas linhas digitais e troncos SIP em alta fidelidade."
      />

      {/* 7. ECOSSISTEMA NUVV (Regra Corrigida - Conexões Comprovadas) */}
      <section className="py-16 sm:py-20 bg-slate-50/80 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Ecossistema Integrado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Como a Telefonia se conecta às outras soluções Nuvv
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Sua linha fixa pode ser a porta de entrada para uma infraestrutura completa de comunicação e inteligência artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Conexão 1: PABX Cloud */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-nuvv-purple flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Evolua para PABX em Nuvem</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Quando sua equipe crescer, transforme sua linha fixa em dezenas de ramais com URA personalizada, gravações e filas de atendimento.
                </p>
              </div>
              <Link
                to="/pabx"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple hover:underline"
              >
                <span>Conhecer PABX Cloud</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 2: Conectividade com QoS */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Fibra com QoS de Voz</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Conecte suas linhas à Banda Larga ou Link Dedicado Nuvv com priorização de pacotes de áudio, sem concorrência com downloads.
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
                  Coloque um atendente virtual com inteligência artificial para atender sua linha, qualificar chamadas e agendar clientes sem espera.
                </p>
              </div>
              <Link
                to="/agente-ia-voz"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:underline"
              >
                <span>Conhecer Agente IA</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 4: Fatura Única no CNPJ */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-teal-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Monte sua Solução</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Consolide internet corporativa, linhas IP, ramais e ferramentas digitais em um único boleto mensal com faturamento no CNPJ.
                </p>
              </div>
              <Link
                to="/empresas/monte-seu-combo"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:underline"
              >
                <span>Montar Combo B2B</span>
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
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Perguntas frequentes sobre Telefonia IP e Tronco SIP
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Esclarecimentos práticos sobre o funcionamento no aplicativo, portabilidade, conectividade e compatibilidade técnica.
            </p>
          </div>

          <div className="space-y-3">
            {telephonyFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/80 overflow-hidden bg-slate-50/50 transition-all hover:border-emerald-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-nuvv-dark flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180 text-emerald-600' : ''
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
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>PRÓXIMO PASSO</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
            Pronto para modernizar a telefonia da sua empresa?
          </h2>

          <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Ative uma Linha IP hoje mesmo no seu celular ou converse com um engenheiro de voz Nuvv para desenhar o Tronco SIP sob medida para a sua central.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                `Olá! Gostaria de falar com um especialista sobre a Telefonia IP e Tronco SIP da Nuvv${currentCity ? ` para minha empresa em ${currentCity}` : ''}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Falar com Consultor via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenLeadModal(`Telefonia IP Empresarial - Atendimento Especializado${currentCity ? ` (${currentCity})` : ''}`)}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-300 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Solicitar Contato Comercial</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
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
