import React, { useState } from 'react';
import {
  Bot,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Layers,
  Zap,
  Volume2,
  Radio,
  Clock,
  Workflow,
  Cpu,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { SmartCommunicationSection } from '../components/comunicacao/SmartCommunicationSection';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { siteConfig } from '../data/siteConfig';

interface AgenteIaVozProps {
  currentCity?: string;
  onOpenSpeedTest?: () => void;
  onOpenCitySelector?: () => void;
  onOpenLeadModal?: (planOrServiceName?: string) => void;
}

export const AgenteIaVoz: React.FC<AgenteIaVozProps> = ({
  currentCity = 'Suzano',
  onOpenSpeedTest,
  onOpenCitySelector,
  onOpenLeadModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleOpenConsultant = (serviceName: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(`Agente IA de Voz - ${serviceName}`);
    } else {
      const text = `Olá! Gostaria de falar com um consultor corporativo sobre o Agente IA de Voz (${serviceName}) para minha empresa em ${currentCity}.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  const voiceAiFaqs = [
    {
      question: 'Como o Agente IA de Voz se conecta à telefonia da minha empresa?',
      answer:
        'O Agente IA de Voz conecta-se diretamente ao PABX em Nuvem da Nuvv ou à sua central telefônica existente via troncos SIP (SIP Trunk) ou WebRTC. Ele opera como um ramal ou número piloto da sua empresa, atendendo ou realizando ligações instantaneamente.',
    },
    {
      question: 'A voz soa robótica ou natural?',
      answer:
        'A voz é 100% humanizada com tecnologia neural de última geração (TTS com modelos adaptados para o português brasileiro). O agente reproduz entonação realista, pausas expressivas e entende interrupções naturais da fala humana, sem gerar a sensação mecânica de URAs antigas.',
    },
    {
      question: 'O que ocorre quando o cliente faz uma solicitação que a IA não sabe resolver?',
      answer:
        'O agente identifica com precisão os limites operacionais e solicitações complexas. Quando necessário, realiza o transbordo inteligente para um atendente humano do setor correto, transmitindo na tela do operador o áudio, a transcrição completa e os dados já coletados.',
    },
    {
      question: 'O Agente IA de Voz consegue consultar ou salvar informações no meu CRM/ERP?',
      answer:
        'Sim! Através de integrações via APIs e Webhooks, o agente pode consultar dados de clientes, verificar débitos, agendar compromissos na agenda médica, registrar protocolos e disparar comprovantes via WhatsApp ou e-mail durante ou após a chamada telefônica.',
    },
    {
      question: 'O agente pode fazer chamadas ativas ou apenas receber ligações?',
      answer:
        'Ele pode atuar em ambos os sentidos: receptivo (atendimento 24/7 sem fila de espera) e ativo (campanhas de confirmação de presença, lembretes de exames, cobrança amigável e pesquisas de satisfação NPS).',
    },
  ];

  const voiceCapabilities = [
    {
      icon: Cpu,
      title: 'Compreensão Neural em Tempo Real',
      desc: 'Processamento de linguagem natural (NLP) com latência inferior a 1,2 segundo, entendendo gírias, sotaques e intenções variadas em português do Brasil.',
    },
    {
      icon: Clock,
      title: 'Atendimento 24/7 com Zero Fila',
      desc: 'Capacidade de atender dezenas ou centenas de chamadas simultâneas sem espera, reduzindo o abandono de ligações a zero.',
    },
    {
      icon: Workflow,
      title: 'Integração Bidirecional com Sistemas',
      desc: 'Conexão nativa com CRMs (Salesforce, HubSpot, RD Station), ERPs e bancos de dados para consultas e atualizações em tempo real.',
    },
    {
      icon: ShieldCheck,
      title: 'Transbordo Seguro com Histórico',
      desc: 'Transferência suave para operadores humanos quando necessário, entregando na tela do atendente o resumo e o motivo exato do contato.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Agente IA de Voz em ${currentCity} | Atendimento Telefônico Humanizado com Inteligência Artificial | Nuvv`}
        description={`Automatize o atendimento telefônico em ${currentCity} com Agente IA de Voz 24/7 da Nuvv. Voz humanizada, zero filas, integração com PABX em nuvem, CRM e transbordo para atendentes.`}
        keywords={[
          `agente ia de voz ${currentCity}`,
          `agente de voz com ia ${currentCity}`,
          'atendimento telefonico ia',
          'voz humanizada inteligência artificial',
          'ura inteligente com ia',
          'pabx com ia conversacional',
          'call center com ia',
          'bot de voz telefonia empresas',
        ]}
        canonicalUrl="https://nuvv.com.br/agente-ia-voz"
        cityName={currentCity}
      />

      {/* Hero Section - Agente IA de Voz */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>IA CONVERSACIONAL • ATENDIMENTO TELEFÔNICO 24/7</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Voz Humanizada Neural</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Agente IA de Voz <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                  Atendimento Telefônico Humanizado 24 Horas.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Elimine filas de espera e transforme o atendimento da sua empresa. Nosso <strong>Agente IA de Voz</strong> conversa com naturalidade, entende o contexto do cliente, consulta bancos de dados em tempo real e realiza transferências suaves para a sua equipe quando necessário.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenConsultant('Agente IA de Voz')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Falar com um Especialista em IA de Voz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#demonstracao-voz"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-emerald-200 transition-all text-center active:scale-98"
                >
                  Ouvir Demonstração ao Vivo
                </a>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-3 max-w-lg mx-auto lg:mx-0 border-t border-emerald-100 text-left">
                <div>
                  <div className="text-lg sm:text-xl font-black text-emerald-600">24/7</div>
                  <div className="text-[10px] text-gray-500 font-bold">Sem Filas de Espera</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-nuvv-dark">&lt; 1.2s</div>
                  <div className="text-[10px] text-gray-500 font-bold">Tempo de Resposta</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-emerald-700">100%</div>
                  <div className="text-[10px] text-gray-500 font-bold">Integrado ao seu PABX</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                <img
                  src="/images/hero/business_1.png"
                  alt="Agente IA de Voz Corporativo Nuvv"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
                    IA TELEFÔNICA
                  </span>
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="font-black text-white block">Agente IA de Voz 24/7</span>
                      <span className="text-[10px] text-emerald-300">Integração Direta com PABX & CRM</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Voz Humanizada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Showcase (Focused on Voice AI Audio Player & Scenarios) */}
      <div id="demonstracao-voz">
        <SmartCommunicationSection
          defaultTab="voice-ai"
          hideTabs={true}
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* Architecture & Capabilities Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Tecnologia & Desempenho
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark mt-2">
              Como Funciona a Arquitetura do Agente IA de Voz
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Segurança corporativa, baixa latência e flexibilidade para atender os padrões operacionais mais exigentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {voiceCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-50 border border-gray-200/90 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-nuvv-dark">{cap.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Integration Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                PABX NUVV OU SUA ESTRUTURA ATUAL
              </span>
              <h4 className="text-xl sm:text-2xl font-black">
                Compatível com Asterisk, FreePBX, Elastix e PABX Cloud Nuvv
              </h4>
              <p className="text-xs text-slate-300 max-w-xl">
                Não precisa trocar sua central telefônica. Integramos os Agentes IA de Voz diretamente via tronco SIP existente ou fornecemos a solução completa de PABX em Nuvem.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenConsultant('Integração PABX Agente IA de Voz')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-lg transition-transform active:scale-98 cursor-pointer"
            >
              Consultar Compatibilidade
            </button>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Dúvidas Frequentes
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-nuvv-dark mt-2">
              Perguntas Frequentes sobre Agente IA de Voz
            </h3>
          </div>

          <div className="space-y-3">
            {voiceAiFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-nuvv-dark hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
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
