import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
  Layers,
  Zap,
  Smartphone,
  CheckCheck,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { SmartCommunicationSection } from '../components/comunicacao/SmartCommunicationSection';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { siteConfig } from '../data/siteConfig';

interface MensageriaSmsRcsProps {
  currentCity?: string;
  onOpenSpeedTest?: () => void;
  onOpenCitySelector?: () => void;
  onOpenLeadModal?: (planOrServiceName?: string) => void;
}

export const MensageriaSmsRcs: React.FC<MensageriaSmsRcsProps> = ({
  currentCity = 'Suzano',
  onOpenSpeedTest,
  onOpenCitySelector,
  onOpenLeadModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleOpenConsultant = (serviceName: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(`Mensageria SMS & RCS - ${serviceName}`);
    } else {
      const text = `Olá! Gostaria de falar com um consultor corporativo sobre Mensageria SMS & RCS (${serviceName}) para minha empresa em ${currentCity}.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  const messagingFaqs = [
    {
      question: 'Qual a principal diferença entre SMS tradicional e RCS?',
      answer:
        'O SMS comum limita-se a 160 caracteres de texto plano sem elementos visuais. Já o RCS (Rich Communication Services) é a evolução oficial e nativa da mensageria no Android: permite envio de logotipo oficial, selo de verificação Google, carrosséis com fotos em alta definição, botões de resposta rápida, links de pagamento e métricas completas de leitura.',
    },
    {
      question: 'Como funciona o selo verificado do Google no RCS?',
      answer:
        'A Nuvv realiza o processo formal de validação da sua empresa junto às operadoras e ao Google. Ao receber a mensagem, seu cliente visualiza o nome exato da sua marca, as cores institucionais e o selo de autenticidade, eliminando desconfiança de golpes e aumentando drasticamente as taxas de abertura.',
    },
    {
      question: 'O que acontece se o destinatário não tiver aparelho compatível com RCS?',
      answer:
        'Nossa plataforma possui sistema inteligente de fallback automático: caso o dispositivo do destinatário não suporte RCS ou esteja momentaneamente sem internet, o sistema entrega automaticamente a mensagem via SMS tradicional com link curto rastreável, garantindo 100% de alcance.',
    },
    {
      question: 'Como a Mensageria se integra ao sistema da minha empresa (ERP/CRM)?',
      answer:
        'Disponibilizamos APIs RESTful modernas, documentadas e de baixa latência, além de webhooks para atualização de status de entrega (DLR - Delivery Receipts) em tempo real. Também oferecemos suporte para disparos em lote via painel web intuitivo.',
    },
    {
      question: 'Quais os principais casos de uso recomendados para SMS & RCS?',
      answer:
        'Autenticação de dois fatores (2FA/OTP), régua de cobrança preventiva e reativa com links de Pix/boleto, confirmação de agendamentos em clínicas e salões, avisos de rastreio de logística e campanhas promocionais de varejo com carrosséis visuais.',
    },
  ];

  const messagingUseCases = [
    {
      industry: 'Varejo & E-commerce',
      benefit: 'Até 3x mais conversão',
      description:
        'Envio de catálogo em carrossel, lançamentos com fotos em alta resolução, cupons exclusivos e botão de compra direta no WhatsApp ou site.',
    },
    {
      industry: 'Financeiro & Cobrança',
      benefit: 'Redução de inadimplência em até 38%',
      description:
        'Lembretes de vencimento com botões para "Copiar Código Pix", download de 2ª via de boleto e negociação com remetente oficial verificado.',
    },
    {
      industry: 'Saúde & Clínicas',
      benefit: 'Queda de 45% no no-show',
      description:
        'Confirmação de consultas e exames com 1 clique (Confirmar / Reagendar), instruções de preparo em PDF e geolocalização da unidade.',
    },
    {
      industry: 'Logística & Transportes',
      benefit: 'Transparência de entrega',
      description:
        'Notificação em tempo real de saída para entrega com mapa, horário estimado e canal direto para instrução de recebimento.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Mensageria SMS & RCS em ${currentCity} | Disparo em Massa e Notificações Oficiais | Nuvv`}
        description={`Potencialize o engajamento com Mensageria SMS & RCS em ${currentCity}. Notificações interativas, selo de verificação Google, mídia rica, 2FA/OTP e taxa de entrega superior a 98%.`}
        keywords={[
          `mensageria sms rcs ${currentCity}`,
          `sms em massa ${currentCity}`,
          'rcs corporativo empresas',
          'notificações rcs interativas',
          'selo verificado google rcs',
          'api de sms empresarial',
          'campanhas de marketing rcs',
          '2fa sms nuvv',
          'regua de cobranca sms rcs',
        ]}
        canonicalUrl="https://nuvv.com.br/mensageria"
        cityName={currentCity}
      />

      {/* Hero Section - Mensageria SMS & RCS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/60">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider shadow-2xs">
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MENSAGERIA CORPORATIVA • SMS & RCS</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Remetente Oficial Verificado Google</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Mensageria SMS & RCS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                  Mídia Rica, Alta Entrega e Confiança Oficial.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Vá além do SMS comum. Com a tecnologia <strong>RCS (Rich Communication Services)</strong> e <strong>SMS de Alta Performance da Nuvv</strong>, sua empresa envia carrosséis de produtos, botões interativos e mensagens com logotipo oficial e selo de verificação. Aumente em até 3x o engajamento e proteja sua marca.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenConsultant('Mensageria SMS & RCS')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Falar com um Consultor de Mensageria</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#comparativo-rcs"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-emerald-200 transition-all text-center active:scale-98"
                >
                  Ver Comparativo SMS vs RCS
                </a>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-3 max-w-lg mx-auto lg:mx-0 border-t border-emerald-100 text-left">
                <div>
                  <div className="text-lg sm:text-xl font-black text-emerald-600">98%</div>
                  <div className="text-[10px] text-gray-500 font-bold">Taxa de Abertura</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-nuvv-dark">3x Mais</div>
                  <div className="text-[10px] text-gray-500 font-bold">Cliques com RCS</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-emerald-700">100%</div>
                  <div className="text-[10px] text-gray-500 font-bold">Fallback para SMS</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                <img
                  src="/images/services/smart_communication.png"
                  alt="Mensageria RCS e SMS Nuvv"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
                    MENSAGERIA B2B
                  </span>
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="font-black text-white block">RCS Verificado & Mídia Rica</span>
                      <span className="text-[10px] text-emerald-300">Taxa de Abertura de até 98%</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Google & Meta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Showcase (Focused on SMS vs RCS) */}
      <div id="comparativo-rcs">
        <SmartCommunicationSection
          defaultTab="messaging"
          hideTabs={true}
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* Segment Breakdown */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Casos Reais de Conversão
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark mt-2">
              Aplicações Práticas da Mensageria por Setor
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Veja como negócios de todos os portes aumentam receitas e reduzem custos operacionais com SMS e RCS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {messagingUseCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-gray-200/90 shadow-sm hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-nuvv-dark">{uc.industry}</span>
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      {uc.benefit}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {uc.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenConsultant(`Mensageria para ${uc.industry}`)}
                  className="w-full py-2.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-600 text-emerald-700 font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
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
              Perguntas Frequentes sobre Mensageria SMS & RCS
            </h3>
          </div>

          <div className="space-y-3">
            {messagingFaqs.map((faq, idx) => {
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
