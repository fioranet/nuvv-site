import React from 'react';
import { SEO } from '../components/common/SEO';
import { BusinessPlanSelector } from '../components/empresarial/BusinessPlanSelector';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import { siteConfig } from '../data/siteConfig';
import {
  Sparkles,
  Building2,
  Receipt,
  Headphones,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Network,
  PhoneCall,
  Radio,
  MessageSquare,
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
  const handleTalkToSpecialist = () => {
    const text = `Olá! Estou na página de montar solução empresarial em ${currentCity} e gostaria de falar com um especialista sobre um projeto customizado para a minha empresa.`;
    window.open(
      `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Monte sua Solução Corporativa Sob Medida em ${currentCity} | Nuvv Tecnologia & Telecom`}
        description={`Personalize a infraestrutura da sua empresa em ${currentCity}. Combine Conectividade (Banda Larga ou Semi-Dedicado com IP Fixo), Comunicação (PABX Cloud, Telefonia IP) e Soluções Digitais (Hotspot Wi-Fi, Multiatendimento) com fatura única consolidada no CNPJ.`}
        cityName={currentCity}
        keywords={[
          'solucao empresarial nuvv',
          'monte seu combo empresas',
          'monte seu plano empresarial',
          'link semi dedicado ip fixo',
          'pabx em nuvem empresas',
          'telefonia ip empresas',
          'hotspot wifi corporativo',
          'multiatendimento empresarial',
          'internet empresarial fibra',
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Solução Corporativa Personalizada Nuvv - ${currentCity}`,
          serviceType: 'Tecnologia e Telecomunicações Corporativas',
          provider: {
            '@type': 'Organization',
            name: 'Nuvv',
            url: 'https://nuvv.com.br/',
          },
          areaServed: {
            '@type': 'City',
            name: currentCity,
          },
          description: `Soluções integradas de conectividade empresarial com IP Fixo, PABX em nuvem, telefonia IP, Hotspot Wi-Fi e CRM multiatendimento para empresas em ${currentCity}.`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-nuvv-green text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONECTIVIDADE • COMUNICAÇÃO • SOLUÇÕES DIGITAIS • {currentCity.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Monte a Solução Ideal para a{' '}
              <span className="text-gradient-green">Sua Empresa</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Tecnologia e telecomunicações sob medida: combine conexão de alta estabilidade (Banda Larga ou Semi-Dedicado com IP Fixo) com PABX em nuvem, telefonia IP, Hotspot Wi-Fi, Multiatendimento com IA e segurança digital com total transparência e fatura única no CNPJ.
            </p>

            {/* Quick Pillars Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs text-gray-200">
              <span className="flex items-center space-x-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl font-bold">
                <Network className="w-3.5 h-3.5 text-emerald-400" />
                <span>Conectividade: Banda Larga & Semi-Dedicado</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl font-bold">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span>Comunicação: PABX Cloud & Telefonia IP</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl font-bold">
                <Radio className="w-3.5 h-3.5 text-indigo-400" />
                <span>Soluções Digitais: Hotspot Wi-Fi & Multiatendimento</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1.5 rounded-xl font-black">
                <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                <span>Faturamento Único no CNPJ</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Planometer Section (Preserved BusinessPlanSelector Tool) */}
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
              Vantagens da Solução Corporativa Integrada
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark mt-2">
              Por que centralizar suas soluções na Nuvv?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Mais eficiência, faturamento simplificado e suporte técnico de engenharia para a sua operação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">Fatura Única no CNPJ</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Todas as soluções (internet, PABX, telefonia fixa, Hotspot Wi-Fi e Multiatendimento) em um único boleto corporativo com faturamento simplificado para a gestão financeira da sua empresa.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">Suporte & Engenharia B2B</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Linha direta com engenheiros e especialistas em telecomunicações, sem atendentes robóticos genéricos ou menus demorados.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">SLA e Garantia Contratual</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Garantia formal de disponibilidade e estabilidade com prazos ágeis de atendimento (SLA 12h no Semi-Dedicado) para manter seus servidores e equipe sempre operando.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 space-y-3 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-nuvv-dark">Escalabilidade Imediata</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Precisa de mais ramais virtuais, novos canais de atendimento ou mais velocidade de banda? Amplie sua estrutura digital instantaneamente sem obras físicas complexas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultative Support Callout */}
      <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>ENGENHARIA E PROJETOS ESPECIAIS B2B</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Precisa de uma arquitetura customizada ou Link Dedicado 1:1?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Se a sua operação requer interligação de filiais Lan to Lan, bloco de IPs públicos, portas ópticas exclusivas ou atendimento de missão crítica com SLA de 4 horas, conte com o nosso time técnico.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleTalkToSpecialist}
              className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar com Especialista Corporativo</span>
            </button>
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
