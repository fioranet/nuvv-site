import React, { useState } from 'react';
import {
  Bot,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Layers,
  Zap,
  Volume2,
  Radio,
  Clock,
  Workflow,
  Cpu,
  Phone,
  Server,
  Smartphone,
  Headphones,
  Building2,
  HelpCircle,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  currentCity = '',
  onOpenSpeedTest,
  onOpenCitySelector,
  onOpenLeadModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenConsultant = (serviceName: string) => {
    const citySuffix = currentCity ? ` (${currentCity})` : '';
    if (onOpenLeadModal) {
      onOpenLeadModal(`Agente IA de Voz - ${serviceName}${citySuffix}`);
    } else {
      const cityPart = currentCity ? ` para minha empresa em ${currentCity}` : '';
      const text = `Olá! Gostaria de falar com um consultor corporativo sobre o Agente IA de Voz (${serviceName}) da Nuvv${cityPart}.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  const voiceAiFaqs = [
    {
      question: 'Como funciona a cobrança do Agente IA de Voz?',
      answer:
        'A cobrança é realizada de forma previsível por pacotes de minutos de atendimento consumidos. Você não precisa contratar licenças individuais de inteligência artificial ou integrar chaves de API: a Nuvv entrega a infraestrutura completa de telefonia e IA em um único serviço corporativo.',
    },
    {
      question: 'Minha empresa pode usar a telefonia que já possui?',
      answer:
        'Sim! Temos duas modalidades: você pode contratar a solução completa pronta com a Telefonia Nuvv, ou conectar o Agente IA diretamente ao seu PABX ou central existente através de um Tronco SIP próprio, sem precisar trocar de operadora.',
    },
    {
      question: 'A voz soa natural ou parece uma URA robótica tradicional?',
      answer:
        'A voz é 100% humanizada com tecnologia neural de última geração em português brasileiro. O agente compreende sotaques, gírias e intenções, responde em menos de 1,2 segundo e permite que o cliente fale naturalmente e até interrompa a fala para tirar dúvidas.',
    },
    {
      question: 'O que acontece quando o cliente precisa falar com uma pessoa da minha equipe?',
      answer:
        'O Agente IA realiza o transbordo inteligente instantâneo para o setor ou atendente correto (seja no celular, ramal de PABX ou telefone fixo), transferindo a ligação com o histórico do que foi conversado para evitar que o cliente repita informações.',
    },
    {
      question: 'O Agente IA consegue consultar informações no sistema da minha empresa?',
      answer:
        'Sim. O agente pode ser integrado via API e Webhooks a CRMs, ERPs e agendas (Google Calendar, sistemas médicos, etc.), consultando horários livres, localizando cadastros e registrando o resumo de cada atendimento em tempo real.',
    },
    {
      question: 'O agente pode fazer chamadas ativas ou apenas receber ligações?',
      answer:
        'Ele atua nas duas frentes: receptivo (atendimento 24/7 de dúvidas, agendamentos e suporte de primeiro nível) e ativo (ligações cordiais de confirmação de presença, lembretes de consultas e pesquisas de satisfação NPS).',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Agente IA de Voz Empresarial | Atendimento Telefônico por Minutos | Nuvv Voice`}
        description={`Automatize o atendimento telefônico da sua empresa com Agente IA de Voz 24/7 da Nuvv. Voz humanizada, zero filas, cobrança por minutos consumidos com Telefonia Nuvv ou SIP Trunk próprio.`}
        keywords={[
          'agente ia de voz',
          'atendimento telefonico ia',
          'voz humanizada inteligencia artificial',
          'ura com ia',
          'ia de voz por minuto',
          'bot de voz telefonia empresas',
          'atendente virtual telefone',
        ]}
        canonicalUrl="https://nuvv.com.br/agente-ia-voz"
        cityName={currentCity}
      />

      {/* 1. HERO B2B: AGENTE IA DE VOZ NUVV */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-emerald-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Lado Esquerdo: Hierarquia Clara B2B */}
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
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PILAR COMUNICAÇÃO • AGENTE IA DE VOZ NUVV</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Atendimento Telefônico Humanizado <br />
                <span className="text-gradient-green">Contabilizado por Minutos.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Sua empresa não precisa contratar plataformas complexas ou configurar APIs. O <strong>Agente IA de Voz Nuvv</strong> atende ligações 24 horas por dia com voz humanizada em português, resolve dúvidas, agenda compromissos e transfere chamadas, com cobrança simples pelo tempo que você utiliza.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#modalidades"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all text-center active:scale-98 cursor-pointer"
                >
                  Conhecer Modalidades
                </a>
                <a
                  href="#demonstracao-voz"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-300 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Ouvir Demonstração de Áudio</span>
                </a>
              </div>

              {/* Indicadores de Confiança */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-emerald-100 text-xs text-gray-700 max-w-xl mx-auto lg:mx-0">
                <div>
                  <span className="font-black text-base text-emerald-600 block">24/7/365</span>
                  <span className="text-[11px] text-gray-500">Zero fila de espera</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">Por Minutos</span>
                  <span className="text-[11px] text-gray-500">Sem surpresas na fatura</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-700 block">&lt; 1.2s</span>
                  <span className="text-[11px] text-gray-500">Resposta em tempo real</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">Voz Neural</span>
                  <span className="text-[11px] text-gray-500">Português humanizado</span>
                </div>
              </div>
            </div>

            {/* Lado Direito: Visual Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                <img
                  src="/images/hero/business_1.png"
                  alt="Agente IA de Voz Nuvv"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
                    NUVV VOICE AI
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="font-black text-white block">Atendente Inteligente Ativa</span>
                      <span className="text-[10px] text-emerald-300">Voz humanizada e transbordo suave</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    24h no Ar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAS MODALIDADES COMERCIAIS CLARAS */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-100" id="modalidades">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Flexibilidade de Contratação
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Duas formas práticas de usar o Agente IA na sua empresa
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Atendemos desde negócios que querem a solução completa e pronta até empresas que já possuem central telefônica própria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Modalidade 1: Solução Completa Nuvv */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border-2 border-emerald-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
                  <span>Modalidade 01 • Solução Completa</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">Com a Telefonia Nuvv</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Ideal para empresas que querem tudo pronto, sem burocracia. Você recebe um número fixo oficial (ou faz portabilidade gratuita do seu número atual) e o Agente IA atende as chamadas com tarifação simples por minutos consumidos.
                </p>

                {/* Fluxo Visual da Modalidade 1 */}
                <div className="p-4 rounded-2xl bg-white/80 border border-emerald-200/80 space-y-2 text-xs font-semibold text-gray-700">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                    <span>Fluxo:</span>
                    <span>Cliente Liga</span>
                    <span>➔</span>
                    <span>Telefonia Nuvv</span>
                    <span>➔</span>
                    <span>Agente IA Nuvv</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-normal">
                    Se o cliente preferir atendimento humano, a chamada é transferida para o celular ou computador da sua equipe no app Nuvv.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Número fixo local ou 0800 incluso</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Aplicativo para atendimento humano complementar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Cobrança simples por pacote de minutos</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenConsultant('Modalidade 1 - Com Telefonia Nuvv')}
                className="mt-8 inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>Contratar com Telefonia Nuvv</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Modalidade 2: SIP Trunk do Cliente */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border-2 border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-extrabold uppercase">
                  <span>Modalidade 02 • Para Centrais Existentes</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xs">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Com seu SIP Trunk Atual</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Para empresas que já possuem sua central telefônica (PABX IP, Asterisk, Call Center ou Tronco SIP de outra operadora). Você conecta sua estrutura à Nuvv via SIP e utiliza o Agente IA apenas pagando pelos minutos de IA consumidos.
                </p>

                {/* Fluxo Visual da Modalidade 2 */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700 space-y-2 text-xs font-semibold text-gray-200">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <span>Fluxo:</span>
                    <span>Sua Central</span>
                    <span>➔</span>
                    <span>Infra Nuvv</span>
                    <span>➔</span>
                    <span>Agente IA Nuvv</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-normal">
                    Não precisa trocar de operadora nem mexer na rotina da sua equipe. O agente atende como um ramal ou transbordo da sua central.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Conexão direta por protocolo SIP padrão</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Compatível com qualquer PABX IP de mercado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Cobrança exclusiva dos minutos de IA utilizados</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenConsultant('Modalidade 2 - Conexão SIP Trunk')}
                className="mt-8 inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>Conectar ao meu SIP Trunk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEMONSTRAÇÃO INTERATIVA DE ÁUDIO */}
      <div id="demonstracao-voz">
        <SmartCommunicationSection
          defaultTab="voice-ai"
          hideTabs={true}
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* 4. COMO FUNCIONA NA PRÁTICA (3 PASSOS) */}
      <section className="py-14 sm:py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Implementação Rápida
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Como o Agente IA entra em operação na sua empresa
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Você define as regras do seu negócio e a equipe Nuvv cuida de toda a engenharia de voz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <span className="text-3xl font-black text-emerald-600/30 block mb-2">01</span>
              <h3 className="text-base font-bold text-nuvv-dark">Personalização com seus dados</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mapeamos as dúvidas frequentes, horários de funcionamento, cardápio ou tabela de serviços e critérios de transferência para atendentes humanos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <span className="text-3xl font-black text-emerald-600/30 block mb-2">02</span>
              <h3 className="text-base font-bold text-nuvv-dark">Ativação no número telefônico</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ativamos o agente em um número novo Nuvv (local ou 0800), por portabilidade do seu fixo atual ou apontando o ramal do seu PABX via SIP Trunk.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <span className="text-3xl font-black text-emerald-600/30 block mb-2">03</span>
              <h3 className="text-base font-bold text-nuvv-dark">Atendimento 24/7 com relatórios</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                O agente passa a atender as chamadas instantaneamente. Você acompanha transcrições de áudio, métricas e o consumo de minutos pelo portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAPACIDADES OPERACIONAIS DE NEGÓCIO */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Produtividade Real
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              O que o Agente IA de Voz resolve na prática
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Casos de uso comprovados para operações que precisam de agilidade e escala.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Agendamento & Triagem</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Consulta datas disponíveis, marca consultas ou reuniões e envia lembrete automático por WhatsApp e e-mail.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Qualificação de Leads</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Atende potenciais clientes de campanhas, identifica o perfil de compra e passa a ligação já qualificada para o vendedor.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Dúvidas Frequentes (FAQ)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Responde sobre preços, endereço, prazos de entrega e políticas da empresa sem ocupar o tempo da equipe humana.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Transbordo Humanizado</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Quando necessário, transfere para um atendente humano transmitindo o resumo de tudo o que foi conversado até então.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ECOSSISTEMA NUVV (Regra Corrigida - Conexões Reais) */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Ecossistema Nuvv
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Como o Agente IA se conecta às outras soluções
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Integração fluida entre inteligência artificial, telefonia de operadora e ferramentas corporativas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Conexão 1: Telefonia IP */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Telefonia IP & Tronco SIP</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Conecte seu agente a números fixos oficiais locais (DID) ou 0800 nacional com voz em alta definição via fibra óptica.
                </p>
              </div>
              <Link
                to="/telefonia"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:underline"
              >
                <span>Conhecer Telefonia IP</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 2: PABX Cloud */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-nuvv-purple/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-nuvv-purple flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">PABX Virtual em Nuvem</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Coloque a IA como primeira linha de atendimento da sua URA e distribua para ramais no celular e computador.
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

            {/* Conexão 3: Multiatendimento */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-teal-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">WhatsApp Multiatendimento</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dispare confirmações por WhatsApp durante ou após a chamada de voz para manter o cliente engajado no canal escrito.
                </p>
              </div>
              <Link
                to="/multiatendimento"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:underline"
              >
                <span>Ver Multiatendimento</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 4: Monte sua Solução */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Fatura Única CNPJ</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Consolide conectividade de internet, telefonia, minutos de IA e ferramentas digitais em um único boleto mensal.
                </p>
              </div>
              <Link
                to="/empresas/monte-seu-combo"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 hover:underline"
              >
                <span>Montar Combo B2B</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ DE DECISÃO (Acordeão Interativo) */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Perguntas frequentes sobre o Agente IA de Voz
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Tire dúvidas sobre a cobrança por minutos, transbordo, compatibilidade com sua telefonia e integração.
            </p>
          </div>

          <div className="space-y-3">
            {voiceAiFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200/80 overflow-hidden bg-white shadow-2xs transition-all hover:border-emerald-200"
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

      {/* 8. CTA FINAL DECISIVO */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>PRÓXIMO PASSO</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
            Pronto para colocar a inteligência artificial para atender seus clientes?
          </h2>

          <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Converse com um especialista Nuvv e receba uma demonstração customizada com as regras e o vocabulário da sua empresa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                `Olá! Gostaria de falar com um especialista sobre o Agente IA de Voz da Nuvv${currentCity ? ` para minha empresa em ${currentCity}` : ''}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Falar com Especialista via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => handleOpenConsultant('Agente IA de Voz - Cotação de Minutos')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-300 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Solicitar Demonstração Comercial</span>
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
