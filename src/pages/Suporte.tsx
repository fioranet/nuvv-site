import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaqAccordion } from '../components/suporte/FaqAccordion';
import { SlaModal } from '../components/suporte/SlaModal';
import { SpeedTestModal } from '../components/suporte/SpeedTestModal';
import { ContractsModal } from '../components/suporte/ContractsModal';
import { ManualsModal } from '../components/suporte/ManualsModal';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';
import {
  LifeBuoy,
  Search,
  Gauge,
  ShieldCheck,
  FileText,
  BookOpen,
  MessageCircle,
  Phone,
  UserCheck,
  Sparkles,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface SuportePageProps {
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
  isSpeedTestOpen: boolean;
  onCloseSpeedTest: () => void;
}

export const Suporte: React.FC<SuportePageProps> = ({
  onOpenSpeedTest,
  onOpenCitySelector,
  isSpeedTestOpen,
  onCloseSpeedTest,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSlaOpen, setIsSlaOpen] = useState(false);
  const [isContractsOpen, setIsContractsOpen] = useState(false);
  const [isManualsOpen, setIsManualsOpen] = useState(false);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como emitir a 2ª via da minha fatura Nuvv?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Você pode emitir sua 2ª via facilmente informando seu CPF/CNPJ na Central do Assinante ou através do nosso WhatsApp oficial.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como testar a velocidade da minha conexão?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Utilize o Velocímetro Nuvv SpeedTest integrado em nosso site para medir latência (Ping), velocidade de Download e Upload.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual o SLA de atendimento para empresas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para clientes corporativos e Link Dedicado, oferecemos SLA de reparo de até 4 horas com monitoramento proativo 24/7/365.',
        },
      },
    ],
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Central de Ajuda, Manuais e Suporte Técnico | Nuvv"
        description="Central de Suporte Nuvv: 2ª via de fatura, teste de velocidade de internet, manuais de configuração de roteadores, contratos e atendimento via WhatsApp."
        keywords={[
          'suporte nuvv',
          'segunda via nuvv',
          'teste de velocidade internet',
          'speedtest nuvv',
          'manuais roteador wifi',
          'central do assinante',
        ]}
        schema={faqSchema}
      />
      {/* Support Hero */}
      <section className="bg-nuvv-dark text-white pt-8 pb-10 sm:pt-10 sm:pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:18px_18px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-nuvv-green text-xs font-bold mb-3">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Central de Ajuda e Suporte</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Como podemos te ajudar hoje?
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-2">
            Acesse manuais de configuração, teste sua velocidade, consulte contratos e tire todas as suas dúvidas.
          </p>

          {/* FAQ Search Bar */}
          <div className="max-w-xl mx-auto mt-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: 2ª via, wi-fi, roteador, tv...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-gray-900 placeholder-gray-400 text-sm shadow-md outline-none focus:ring-2 focus:ring-nuvv-green transition-all"
            />
          </div>
        </div>
      </section>

      {/* 4 Main Action Service Cards (Triggering Modals) */}
      <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {/* 1. Teste de Velocidade */}
            <button
              type="button"
              onClick={onOpenSpeedTest}
              className="p-6 rounded-3xl bg-white border border-gray-100 hover:border-nuvv-purple/40 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors">
                  Teste de Velocidade
                </h3>
                <p className="text-xs text-gray-500 mt-1">Meça seu download, upload e ping em tempo real.</p>
              </div>
              <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider mt-4 inline-block">
                Iniciar Teste →
              </span>
            </button>

            {/* 2. Tabela de CIR & SLA */}
            <button
              type="button"
              onClick={() => setIsSlaOpen(true)}
              className="p-6 rounded-3xl bg-white border border-gray-100 hover:border-nuvv-purple/40 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors">
                  Tabela de CIR & SLA
                </h3>
                <p className="text-xs text-gray-500 mt-1">Garantia mínima de banda (CIR) e prazos de reparo técnico.</p>
              </div>
              <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider mt-4 inline-block">
                Ver Garantias & Prazos →
              </span>
            </button>

            {/* 3. Contratos & Licenças */}
            <button
              type="button"
              onClick={() => setIsContractsOpen(true)}
              className="p-6 rounded-3xl bg-white border border-gray-100 hover:border-nuvv-purple/40 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors">
                  Contratos & Licenças
                </h3>
                <p className="text-xs text-gray-500 mt-1">Termos de adesão, autorização Anatel e SCM.</p>
              </div>
              <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider mt-4 inline-block">
                Acessar Documentos →
              </span>
            </button>

            {/* 4. Manuais de Uso */}
            <button
              type="button"
              onClick={() => setIsManualsOpen(true)}
              className="p-6 rounded-3xl bg-white border border-gray-100 hover:border-nuvv-purple/40 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-nuvv-violet flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors">
                  Manuais de Uso
                </h3>
                <p className="text-xs text-gray-500 mt-1">Guias de instalação de Apps, Wi-Fi e Telefonia.</p>
              </div>
              <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider mt-4 inline-block">
                Ver Guias →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2ª Via Rápida & PIX Banner (Autoatendimento) */}
      <section className="py-8 bg-slate-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-nuvv-dark via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/40 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>Autoatendimento Instantâneo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Precisa da 2ª Via de Fatura ou Código PIX?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Consulte débitos, copie o código PIX Copia e Cola ou linha digitável apenas com o CPF/CNPJ do titular.
              </p>
            </div>
            <Link
              to="/2via"
              className="px-6 py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm shadow-lg shadow-nuvv-purple/30 transition-all flex items-center space-x-2 whitespace-nowrap active:scale-95 cursor-pointer z-10"
            >
              <span>Consultar 2ª Via Rápida</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion searchTerm={searchTerm} />
        </div>
      </section>

      {/* Direct Contact Channels */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-nuvv-dark">Ainda precisa de ajuda?</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fale diretamente com nosso time pelos canais de atendimento oficial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Preciso de suporte técnico da Nuvv.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 text-center hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950">WhatsApp Oficial</h4>
              <p className="text-xs text-emerald-700 mt-0.5">{siteConfig.whatsapp}</p>
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mt-3">
                Chamar no WhatsApp →
              </span>
            </a>

            {/* Telefone */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 text-center hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-nuvv-purple text-white flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-indigo-950">Central Telefônica</h4>
              <p className="text-xs text-indigo-700 mt-0.5">{siteConfig.phone}</p>
              <span className="text-[11px] font-bold text-nuvv-purple uppercase tracking-wider block mt-3">
                Ligar Agora →
              </span>
            </a>

            {/* Área do Cliente */}
            <a
              href={siteConfig.areaClienteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 text-center hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Área do Cliente</h4>
              <p className="text-xs text-blue-700 mt-0.5">2ª via, faturas e autoatendimento</p>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mt-3">
                Acessar Portal →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />

      {/* Modals */}
      <SpeedTestModal isOpen={isSpeedTestOpen} onClose={onCloseSpeedTest} />
      <SlaModal isOpen={isSlaOpen} onClose={() => setIsSlaOpen(false)} />
      <ContractsModal isOpen={isContractsOpen} onClose={() => setIsContractsOpen(false)} />
      <ManualsModal isOpen={isManualsOpen} onClose={() => setIsManualsOpen(false)} />
    </div>
  );
};
