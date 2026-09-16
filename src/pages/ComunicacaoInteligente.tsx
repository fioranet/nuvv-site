import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Bot,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  PhoneCall,
  Radio,
  Send,
  Building2,
  Users,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { SmartCommunicationSection } from '../components/comunicacao/SmartCommunicationSection';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { BusinessLeadModal } from '../components/empresarial/BusinessLeadModal';
import { INDUSTRY_USE_CASES } from '../data/communicationData';
import { siteConfig } from '../data/siteConfig';

interface ComunicacaoInteligenteProps {
  currentCity?: string;
  onOpenSpeedTest?: () => void;
  onOpenCitySelector?: () => void;
  onOpenLeadModal?: (planOrServiceName?: string) => void;
}

export const ComunicacaoInteligente: React.FC<ComunicacaoInteligenteProps> = ({
  currentCity = 'Suzano',
  onOpenSpeedTest,
  onOpenCitySelector,
  onOpenLeadModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedSolutionForModal, setSelectedSolutionForModal] = useState<any | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const smartSlides = [
    {
      image: '/images/services/smart_communication.png',
      title: 'RCS Verificado & Mídia Rica',
      subtitle: 'Taxa de Abertura de até 98%',
      badge: 'Google & Meta',
      tag: 'MENSAGERIA B2B',
    },
    {
      image: '/images/hero/business_1.png',
      title: 'Agente de Voz IA 24/7',
      subtitle: 'Integração Direta com PABX & CRM',
      badge: 'Voz Humanizada',
      tag: 'IA CONVERSACIONAL',
    },
  ];

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % smartSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered, smartSlides.length]);

  const handleOpenConsultant = (serviceName: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(`Comunicação Inteligente - ${serviceName}`);
    } else {
      const text = `Olá! Gostaria de falar com um consultor corporativo sobre ${serviceName} para minha empresa em ${currentCity}.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  const communicationFaqs = [
    {
      question: 'Qual a principal diferença entre SMS e RCS?',
      answer:
        'O SMS tradicional trafega apenas textos simples e links. O RCS (Rich Communication Services) é a evolução nativa do SMS que permite enviar mensagens com logotipo oficial e selo de verificação da marca, imagens em alta resolução, carrosséis de produtos, botões interativos e relatórios detalhados de leitura e clique.',
    },
    {
      question: 'Como o Agente de Voz IA se integra ao sistema da minha empresa?',
      answer:
        'O Agente de Voz com IA conecta-se diretamente à infraestrutura telefônica da sua empresa através de troncos SIP ou do PABX em Nuvem da Nuvv. Ele pode consultar e atualizar seu banco de dados, CRM e ERP via API em tempo real durante a chamada telefônica.',
    },
    {
      question: 'O que acontece quando o cliente faz uma pergunta complexa para a IA?',
      answer:
        'O agente foi treinado para identificar quando uma solicitação exige julgamento humano. Nesses casos, ele realiza a transferência suave (transbordo) da chamada para o atendente correto, passando na tela do operador o resumo e o histórico da conversa.',
    },
    {
      question: 'As mensagens RCS e SMS possuem remetente oficial verificado?',
      answer:
        'Sim! Para o RCS, realizamos o processo de verificação da marca junto às operadoras e ao Google, garantindo que o cliente veja o nome, logotipo e o selo de autenticidade da sua empresa, aumentando a taxa de abertura e eliminando riscos de desconfiança.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Comunicação Digital em ${currentCity} | Mensageria RCS, SMS e Agentes de Voz IA | Nuvv`}
        description={`Soluções de Comunicação Digital em ${currentCity}: Mensageria com Mídia Rica (RCS/SMS Oficial) e Agentes de Voz com IA integrados ao PABX para atendimento corporativo humanizado 24/7.`}
        keywords={[
          `comunicacao digital ${currentCity}`,
          `comunicacao inteligente ${currentCity}`,
          'whatsapp api oficial empresas',
          'multiatendimento whatsapp crm',
          'rcs corporativo empresas',
          'sms em massa api',
          'agente de voz ia telefonia',
          'atendimento inteligente com ia',
          'ura inteligente ia',
          'pabx com inteligencia artificial',
        ]}
        canonicalUrl="https://nuvv.com.br/comunicacao-inteligente"
        cityName={currentCity}
      />

      {/* Hero Section - Comunicação Inteligente */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-indigo-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-nuvv-purple text-xs font-black uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>COMUNICAÇÃO DIGITAL • MÍDIA RICA & IA DE VOZ</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Remetente Verificado</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Comunicação Digital <br />
                <span className="text-gradient-hero">Mensageria RCS, SMS & Voz com IA.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Transforme a maneira como sua empresa se relaciona com os clientes com a plataforma de <strong>Comunicação Digital</strong>. Dispare mensagens interativas em <strong>RCS e SMS</strong> com até 98% de taxa de abertura e atenda chamadas telefônicas <strong>24 horas por dia com Agentes de Voz Humanizados</strong> integrados ao seu PABX.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenConsultant('Comunicação Digital')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-md shadow-nuvv-purple/30 transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Falar com um Consultor de Comunicação Digital</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#comunicacao-inteligente"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-indigo-200 transition-all text-center active:scale-98"
                >
                  Ver Comparativo e Áudio IA
                </a>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-3 max-w-lg mx-auto lg:mx-0 border-t border-indigo-100 text-left">
                <div>
                  <div className="text-lg sm:text-xl font-black text-emerald-600">98%</div>
                  <div className="text-[10px] text-gray-500 font-bold">Abertura Mensagens</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-nuvv-dark">24/7</div>
                  <div className="text-[10px] text-gray-500 font-bold">Voz IA Sem Filas</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-nuvv-purple">100%</div>
                  <div className="text-[10px] text-gray-500 font-bold">Selo Verificado</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card (Slideshow) */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {smartSlides.map((slide, idx) => (
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

                    {/* Top Pill */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-indigo-300 border border-white/10">
                        {slide.tag}
                      </span>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="font-black text-white block">{slide.title}</span>
                          <span className="text-[10px] text-emerald-300">{slide.subtitle}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-500/30">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Slideshow Indicators */}
                <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {smartSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        heroSlide === i ? 'w-5 bg-nuvv-purple' : 'w-1.5 bg-white/40 hover:bg-white/70'
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

      {/* Main Interactive Showcase Component (SMS vs RCS & Audio Player) */}
      <SmartCommunicationSection onOpenLeadModal={onOpenLeadModal} />

      {/* Industry Use Cases Breakdown */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full">
              Aplicações Práticas
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark mt-2">
              Casos de Uso por Segmento de Mercado
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Descubra como empresas de diferentes portes aceleram resultados com Mensageria RCS e Agentes de Voz IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {INDUSTRY_USE_CASES.map((uc) => (
              <div
                key={uc.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-gray-200/90 shadow-sm hover:border-nuvv-purple/40 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-nuvv-dark">{uc.industry}</span>
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {uc.benefit}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600">
                    <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                      <div className="font-bold text-nuvv-purple mb-0.5 flex items-center space-x-1">
                        <Send className="w-3 h-3" />
                        <span>Mensageria RCS:</span>
                      </div>
                      <p>{uc.rcsUse}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                      <div className="font-bold text-emerald-600 mb-0.5 flex items-center space-x-1">
                        <Bot className="w-3 h-3" />
                        <span>Agente de Voz IA:</span>
                      </div>
                      <p>{uc.voiceAiUse}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenConsultant(`Solução para ${uc.industry}`)}
                  className="w-full py-2.5 rounded-xl bg-white border border-gray-200 hover:border-nuvv-purple text-nuvv-purple font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
                >
                  <span>Solicitar proposta para {uc.industry}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Dúvidas Técnicas & Contratação
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-nuvv-dark mt-2">
              Perguntas Frequentes sobre Comunicação Inteligente
            </h3>
          </div>

          <div className="space-y-3">
            {communicationFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-nuvv-dark hover:text-nuvv-purple transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-nuvv-purple' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
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
    </div>
  );
};
