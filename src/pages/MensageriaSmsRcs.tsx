import React, { useState } from 'react';
import {
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Award,
  ChevronDown,
  Layers,
  Zap,
  Smartphone,
  CheckCheck,
  Bot,
  Phone,
  Cloud,
  HelpCircle,
  Check,
  Code,
  FileText,
  Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenConsultant = (serviceName: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(`Mensageria SMS & RCS - ${serviceName}`);
    } else {
      const text = `Olá! Gostaria de falar com um consultor corporativo sobre Mensageria SMS & RCS (${serviceName}) da Nuvv.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  const messagingFaqs = [
    {
      question: 'Qual a principal diferença entre SMS corporativo e RCS?',
      answer:
        'O SMS comum limita-se a 160 caracteres de texto plano sem elementos visuais, ideal para tokens 2FA e alertas operacionais rápidos. Já o RCS (Rich Communication Services) é a evolução oficial e nativa das mensagens no smartphone: permite envio de logotipo oficial, selo de verificação de autenticidade, carrosséis com fotos de produtos, botões de ação rápida (como Copiar Pix ou Abrir Link) e métricas completas de leitura.',
    },
    {
      question: 'Como funciona o selo oficial verificado no RCS?',
      answer:
        'A Nuvv cuida de todo o processo de validação documental da sua empresa junto às operadoras e aos ecossistemas de mensageria. Quando a mensagem chega no celular do cliente, ela exibe o nome oficial da sua marca, logotipo e o selo de verificação, garantindo que não se trata de golpe ou spam.',
    },
    {
      question: 'O que acontece se o cliente não tiver internet ou aparelho com RCS?',
      answer:
        'Nossa plataforma possui sistema inteligente de fallback automático: caso o dispositivo do destinatário não suporte RCS ou esteja momentaneamente sem conexão de dados, o sistema converte e entrega a mensagem via SMS tradicional com link curto rastreável, garantindo 100% de alcance.',
    },
    {
      question: 'Como funciona a integração técnica com os sistemas da minha empresa?',
      answer:
        'Disponibilizamos APIs RESTful modernas, documentadas e de baixa latência, além de webhooks para atualização de status de entrega (DLR - Delivery Receipts) em tempo real. Para equipes comerciais ou de marketing que não programam, oferecemos um portal web intuitivo para envio de campanhas em lote via planilha.',
    },
    {
      question: 'Qual o modelo de cobrança da Mensageria Nuvv?',
      answer:
        'Trabalhamos com pacotes de mensagens sob medida para o volume da sua operação, com tarifação transparente e decrescente conforme o volume mensal de disparos. Fale com nossos consultores para receber uma simulação para seu volume.',
    },
    {
      question: 'Quais os principais casos de uso recomendados?',
      answer:
        'Autenticação de dois fatores (tokens 2FA/OTP), réguas de cobrança amigável com botões Copia e Cola de Pix, confirmação de agendamentos em clínicas e consultórios, avisos de rastreamento de entregas e campanhas promocionais de alto engajamento no varejo.',
    },
  ];

  const messagingUseCases = [
    {
      industry: 'Varejo & E-commerce',
      benefit: 'Até 3x mais conversão',
      description:
        'Envio de lançamentos com carrossel de fotos em alta resolução, cupons exclusivos e botão de compra direta com link rastreável.',
    },
    {
      industry: 'Financeiro & Cobrança',
      benefit: 'Redução de inadimplência em até 38%',
      description:
        'Lembretes de vencimento com botões para "Copiar Código Pix", 2ª via de fatura e negociação segura com remetente verificado oficial.',
    },
    {
      industry: 'Saúde & Clínicas',
      benefit: 'Queda de 45% no absenteísmo',
      description:
        'Confirmação de consultas e exames com 1 clique (Confirmar ou Reagendar), instruções de preparo e localização da unidade.',
    },
    {
      industry: 'Logística & Serviços',
      benefit: 'Transparência de entrega',
      description:
        'Notificação em tempo real de saída para entrega com mapa, previsão de chegada e canal direto para instrução de recebimento.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Mensageria SMS & RCS Oficial para Empresas | Nuvv Messaging`}
        description={`Envie mensagens com selo de verificação oficial, mídia rica, botões interativos e taxa de abertura superior a 98%. SMS corporativo de alta performance e RCS Nuvv.`}
        keywords={[
          'mensageria sms rcs',
          'sms corporativo empresas',
          'rcs verificado oficial',
          'notificações rcs interativas',
          'selo verificado google rcs',
          'api de sms empresarial',
          'disparo em lote sms rcs',
          'regua de cobranca sms rcs',
        ]}
        canonicalUrl="https://nuvv.com.br/mensageria"
        cityName={currentCity}
      />

      {/* 1. HERO B2B: MENSAGERIA CORPORATIVA NUVV */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-emerald-100/60">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Lado Esquerdo: Mensagem e Posicionamento */}
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
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PILAR COMUNICAÇÃO • NUVV MESSAGING</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
                Mensageria SMS & RCS <br />
                <span className="text-gradient-green">Oficial, Interativa e Verificada.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Vá além do SMS comum. Com a tecnologia <strong>RCS Oficial</strong> e o <strong>SMS de Alta Performance da Nuvv</strong>, sua empresa envia mensagens com o logotipo e selo de verificação da sua marca, carrosséis de produtos e botões interativos, alcançando até 98% de taxa de abertura.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#comparativo-rcs"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all text-center active:scale-98 cursor-pointer"
                >
                  Ver Comparativo SMS vs RCS
                </a>
                <a
                  href="#canais-envio"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-300 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Code className="w-4 h-4 text-emerald-600" />
                  <span>API & Plataforma de Envio</span>
                </a>
              </div>

              {/* Indicadores de Confiança */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-emerald-100 text-xs text-gray-700 max-w-xl mx-auto lg:mx-0">
                <div>
                  <span className="font-black text-base text-emerald-600 block">98%</span>
                  <span className="text-[11px] text-gray-500">Taxa de Abertura</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">Selo Oficial</span>
                  <span className="text-[11px] text-gray-500">Remetente Verificado</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-700 block">100%</span>
                  <span className="text-[11px] text-gray-500">Fallback para SMS</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">API REST</span>
                  <span className="text-[11px] text-gray-500">Integração Imediata</span>
                </div>
              </div>
            </div>

            {/* Lado Direito: Visual Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                <img
                  src="/images/services/smart_communication.png"
                  alt="Mensageria RCS e SMS Nuvv"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
                    NUVV MESSAGING
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="font-black text-white block">RCS Verificado & Mídia Rica</span>
                      <span className="text-[10px] text-emerald-300">Entrega direta na caixa nativa</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Alta Entrega
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTEXTO B2B: POR QUE A MENSAGERIA MODERNA SUPERA OUTROS CANAIS */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Engajamento com o Cliente
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Sua empresa fala, mas seus clientes estão realmente lendo?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Descubra por que o SMS corporativo e o RCS se tornaram canais essenciais para empresas que precisam de certeza de entrega.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">E-mails perdidos no spam</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                A taxa média de abertura de e-mails corporativos não passa de 20%. Já as mensagens SMS e RCS são abertas em até 3 minutos após o recebimento por 98% dos usuários.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Golpes e desconfiança</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mensagens de números desconhecidos geram medo nos clientes. Com o RCS Verificado da Nuvv, o cliente visualiza o logotipo oficial e o selo de autenticidade da sua empresa.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">Ação imediata com 1 clique</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Em vez de digitar links complicados, o cliente clica em botões interativos como "Copiar Código Pix", "Confirmar Presença" ou "Rastrear Pedido" direto na tela da mensagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE INTERATIVO (COMPARATIVO SMS VS RCS) */}
      <div id="comparativo-rcs">
        <SmartCommunicationSection
          defaultTab="messaging"
          hideTabs={true}
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* 4. CANAIS E FORMAS DE ENVIO (API PARA DEVS & PORTAL WEB) */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-t border-b border-gray-100" id="canais-envio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Canais de Disparo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Envie via API ou pelo nosso Portal Web de Gestão
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Integre diretamente no seu software via API RESTful ou utilize nosso Portal Web completo para criação de campanhas personalizadas, agendamentos, relatórios analíticos e acompanhamento em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Opção 1: API RESTful */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase">
                  <span>Para Desenvolvedores & TI</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-xs">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-nuvv-dark">API RESTful & Webhooks</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Conecte seu sistema (ERP, CRM, e-commerce ou aplicativo) para disparos automatizados de tokens 2FA, notificações de compra e confirmações em tempo real.
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Documentação limpa com exemplos em cURL, Node, Python e PHP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Webhooks de confirmação de entrega (DLR) em tempo real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Alta taxa de transferência por segundo (TPS sob medida)</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenConsultant('API de Mensageria para Desenvolvedores')}
                className="mt-8 inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>Solicitar Documentação da API</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Opção 2: Portal Web para Equipes */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold uppercase">
                  <span>Para Marketing, Comercial & Operações</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-nuvv-dark">Portal Web de Gestão & Campanhas</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    Sem necessidade de programadores. Através do portal web da Nuvv, sua equipe gerencia toda a comunicação da marca com autonomia total, agilidade e inteligência de dados.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs text-gray-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Criação de Campanhas Personalizadas:</strong> Editor intuitivo com campos variáveis (nome, valor, links únicos, ofertas e carrossel RCS).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Agendamentos Programados:</strong> Programe data e horário ideal de envio com réguas automatizadas e importação de listas Excel/CSV.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Acompanhamento em Tempo Real:</strong> Monitore ao vivo o status de cada envio segundo a segundo (enviado, entregue, lido e cliques).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Relatórios Analíticos Completos:</strong> Métricas detalhadas de conversão, engajamento, erros de número e exportação com 1 clique.</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenConsultant('Portal Web de Gestão & Campanhas')}
                className="mt-8 inline-flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>Conhecer Portal de Campanhas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CASOS REAIS DE APLICAÇÃO POR SETOR */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100" id="casos-de-uso">
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
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-gray-200/90 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
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

      {/* 6. ECOSSISTEMA NUVV (Regra Corrigida - Conexões Reais) */}
      <section className="py-16 sm:py-20 bg-slate-50/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Ecossistema Integrado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-nuvv-dark tracking-tight">
              Como a Mensageria se conecta às outras soluções Nuvv
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Construa réguas de comunicação completas integrando voz, texto e inteligência artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Conexão 1: Multiatendimento */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-teal-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">WhatsApp Multiatendimento</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Direcione respostas do SMS/RCS para a sua equipe no WhatsApp com múltiplos atendentes e CRM Kanban.
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

            {/* Conexão 2: Agente IA de Voz */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Agente IA de Voz</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dispare automaticamente comprovantes, links Pix ou agendamentos via SMS/RCS logo após a chamada com a IA.
                </p>
              </div>
              <Link
                to="/agente-ia-voz"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:underline"
              >
                <span>Conhecer Agente IA</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 3: Telefonia IP */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-purple-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Telefonia IP & Tronco SIP</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Combine mensagens com linhas fixas digitais oficiais para atendimento de voz receptivo e números 0800.
                </p>
              </div>
              <Link
                to="/telefonia"
                className="mt-5 inline-flex items-center space-x-1.5 text-xs font-bold text-purple-700 hover:underline"
              >
                <span>Conhecer Telefonia IP</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Conexão 4: Monte sua Solução */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-slate-800/40 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-nuvv-dark">Fatura Única CNPJ</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Consolide conectividade de internet, telefonia, mensageria e ferramentas digitais em um único boleto mensal.
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
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Dúvidas Técnicas & Contratação
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-nuvv-dark mt-2">
              Perguntas Frequentes sobre Mensageria SMS & RCS
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Tire dúvidas sobre validação de selo oficial, fallback para SMS, integração de sistemas e pacotes de envio.
            </p>
          </div>

          <div className="space-y-3">
            {messagingFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50/70 border border-gray-200 overflow-hidden shadow-2xs transition-all hover:border-emerald-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-nuvv-dark hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span className="flex items-start space-x-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-200/80">
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
            Pronto para transformar a comunicação com seus clientes?
          </h2>

          <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Converse com um consultor corporativo Nuvv e receba uma cotação sob medida para o volume de mensagens da sua empresa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor corporativo sobre a Mensageria SMS & RCS da Nuvv.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Falar com Consultor via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => handleOpenConsultant('Mensageria SMS & RCS - Proposta Comercial')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-300 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Solicitar Cotação de Volume</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
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
    </div>
  );
};
