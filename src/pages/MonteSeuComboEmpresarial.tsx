import React from 'react';
import { SEO } from '../components/common/SEO';
import { BusinessPlanSelector } from '../components/empresarial/BusinessPlanSelector';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import {
  Sparkles,
  Building2,
  Receipt,
  Headphones,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

import { ComboLeadSummary } from '../services/comboSummary';

interface MonteSeuComboEmpresarialProps {
  currentCity: string;
  onOpenLeadModal: (planName?: string, summaryData?: ComboLeadSummary | null) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const MonteSeuComboEmpresarial: React.FC<MonteSeuComboEmpresarialProps> = ({
  currentCity,
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Monte seu Combo Empresarial Sob Medida em ${currentCity} | Nuvv Empresas`}
        description={`Personalize a conectividade e soluções da sua empresa em ${currentCity}. Combine Banda Larga ou Semi-Dedicado (IP Fixo IPv4 e SLA 12h) com PABX em Nuvem, Telefonia IP, Nuvv Digital CRM, Câmeras Nuvv Guard e TV Corporativa Esporte e Notícia.`}
        cityName={currentCity}
        keywords={[
          'combo empresarial',
          'monte seu combo empresas',
          'link semi dedicado ip fixo',
          'pabx em nuvem empresas',
          'telefonia ip empresas',
          'nuvv digital multiatendimento',
          'câmeras nuvv guard corporativo',
          'tv corporativa esporte e noticia',
          'internet empresarial fibra',
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Combo Empresarial Personalizado Nuvv - ${currentCity}`,
          serviceType: 'Telecomunicações e TI Corporativa',
          provider: {
            '@type': 'Organization',
            name: 'Nuvv Telecomunicações',
            url: 'https://nuvv.com.br/',
          },
          areaServed: {
            '@type': 'City',
            name: currentCity,
          },
          description: `Soluções integradas de conectividade semi-dedicada, PABX em nuvem, telefonia IP, CRM multiatendimento e segurança eletrônica para empresas em ${currentCity}.`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-nuvv-green text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLANÔMETRO CORPORATIVO B2B • {currentCity.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Monte o Combo Perfeito para{' '}
              <span className="text-gradient-green">Sua Empresa</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Personalize sua conexão de internet (Banda Larga ou Semi-Dedicado com IP Fixo) e adicione ramais de PABX, telefonia, atendimento com IA, câmeras e segurança digital com total transparência.
            </p>

            {/* Quick Pillars */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300">
              <span className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fatura Única Consolidada</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SLA Dedicado de Atendimento</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Fibra Óptica</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Planometer Section */}
      <section className="py-12 sm:py-16 bg-slate-50 relative -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BusinessPlanSelector
            currentCity={currentCity}
            onOpenLeadModal={onOpenLeadModal}
          />
        </div>
      </section>

      {/* Corporate Advantages Grid */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Vantagens do Combo Corporativo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark mt-2">
              Por que centralizar suas soluções na Nuvv?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Mais economia, menos burocracia e suporte técnico especializado para a sua operação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">Fatura Única</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Todas as soluções (internet, PABX, linhas telefônicas e câmeras) em um único boleto corporativo com faturamento simplificado para o seu setor financeiro.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-nuvv-purple flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">Suporte B2B Prioritário</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Linha direta com engenheiros e especialistas em telecomunicações, sem passar por atendentes gerais ou menus demorados.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">SLA Contratual</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Garantia de disponibilidade e prazos de reparo ágeis definidos em contrato para manter seus servidores e equipe sempre operando.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">Escalabilidade Imediata</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Precisa de mais ramais virtuais, novas câmeras ou mais banda? Aumente sua estrutura digital instantaneamente sem obras físicas complexas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Carousel */}
      <PartnerCarousel />

      {/* Quick Access Floating Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
