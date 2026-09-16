import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { cities } from '../data/cities';
import { SEO } from '../components/common/SEO';
import { createCitySchema, createFaqSchema } from '../data/seoSchemas';
import { ViabilityChecker } from '../components/home/ViabilityChecker';
import { RESIDENTIAL_PLANS } from '../data/plans';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  Tv,
  ArrowRight,
  Building2,
  Home,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface CityLandingPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
  onSelectCity?: (cityName: string) => void;
}

export const CityLandingPage: React.FC<CityLandingPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
  onSelectCity,
}) => {
  const { citySlug } = useParams<{ citySlug: string }>();

  // Find city in supported list
  const city = cities.find((c) => c.id === citySlug?.toLowerCase());

  if (!city) {
    return <Navigate to="/" replace />;
  }

  const localFaqs = [
    {
      question: `Como funciona a instalação da internet fibra óptica da Nuvv em ${city.name}?`,
      answer: `A instalação da Nuvv em ${city.name} é 100% fibra óptica até dentro da sua casa ou empresa (FTTH). Nossos técnicos realizam a instalação com roteador Wi-Fi de alta potência e configuração completa no mesmo dia ou em até 24 horas.`,
    },
    {
      question: `Quais os planos de internet mais contratados em ${city.name}?`,
      answer: `Os planos mais populares em ${city.name} são o de 800 Mega Turbo com Wi-Fi 6 e TV inclusa, e o plano de 1 Giga Ultra para quem precisa de máxima performance em jogos, streaming 4K e home office.`,
    },
    {
      question: `A Nuvv atende empresas e comércios em ${city.name}?`,
      answer: `Sim! Em ${city.name} oferecemos soluções corporativas completas: Link Dedicado com garantia de 100% de banda, PABX Virtual em Nuvem, Telefonia IP e suporte corporativo com SLA reduzido.`,
    },
    {
      question: `Como consultar a viabilidade técnica na minha rua em ${city.name}?`,
      answer: `Basta digitar seu CEP no campo de consulta acima. Nosso sistema valida instantaneamente a disponibilidade de fibra na sua rua em ${city.name}.`,
    },
  ];

  const citySchemaData = [
    createCitySchema(city.name, city.state),
    createFaqSchema(localFaqs),
  ];

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`Internet Fibra Óptica em ${city.name} - SP | Planos de até 1 Giga`}
        description={`Contrate a melhor internet 100% fibra óptica em ${city.name} - SP. Ultravelocidade de até 1 Giga, Wi-Fi 6, TV ao vivo e suporte humanizado. Consulte seu CEP!`}
        keywords={[
          `internet fibra ${city.name}`,
          `provedor de internet ${city.name}`,
          `melhor internet ${city.name}`,
          `fibra optica ${city.name} sp`,
          `link dedicado ${city.name}`,
          `pabx virtual ${city.name}`,
        ]}
        canonicalUrl={`https://nuvv.com.br/cidade/${city.id}`}
        schema={citySchemaData}
        cityName={city.name}
      />

      {/* Breadcrumb Navigation for SEO */}
      <div className="bg-slate-900 text-gray-400 text-xs py-2.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-white transition-colors">
            Início
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300">Cidades Atendidas</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-nuvv-green font-bold">{city.name} - {city.state}</span>
        </div>
      </div>

      {/* Hero Section Scoped to City */}
      <section className="relative overflow-hidden bg-nuvv-dark text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-nuvv-green text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>COBERTURA FIBRA ÓPTICA EM {city.name.toUpperCase()} - {city.state}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              A Melhor Internet Fibra Óptica em <br />
              <span className="text-gradient-green">{city.name}</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Conexão ultraveloz com estabilidade incomparável e baixa latência para sua residência ou empresa em <strong>{city.name} e bairros vizinhos</strong>. Planos de até 1 Giga com Wi-Fi 6 de alta potência e TV ao vivo.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/residencial"
                className="px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-sm shadow-lg shadow-nuvv-purple/30 transition-all flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Planos Residenciais</span>
              </Link>
              <Link
                to="/empresarial"
                className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center space-x-2 transition-all"
              >
                <Building2 className="w-4 h-4 text-nuvv-green" />
                <span>Planos para Empresas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Viability Checker Pre-scoped to this city */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <ViabilityChecker
          onOpenLeadModal={onOpenLeadModal}
          onSelectCity={onSelectCity}
        />
      </section>

      {/* Featured Plans for this City */}
      <section className="py-16 sm:py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-nuvv-dark">
              Planos Mais Populares em {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Instalação grátis 100% fibra com Wi-Fi de alta potência e canais ao vivo inclusos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {RESIDENTIAL_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-3xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black text-nuvv-purple bg-indigo-50 px-3 py-1 rounded-full uppercase">
                    {plan.wifiBadge}
                  </span>
                  <div className="text-4xl font-black text-nuvv-dark mt-3">
                    {plan.speed} <span className="text-2xl font-bold">{plan.unit}</span>
                  </div>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-2xl font-black text-emerald-600">
                      R$ {plan.tierPricing.cortesia.promoPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      R$ {plan.tierPricing.cortesia.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">/mês</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    100% Fibra Óptica com {plan.tierPricing.cortesia.channelsCount} canais ao vivo no NuvvPlay (Watch)
                  </p>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    onClick={() =>
                      onOpenLeadModal(`Plano ${plan.speed} ${plan.unit} em ${city.name}`)
                    }
                    className="w-full py-3 rounded-xl bg-nuvv-purple text-white font-bold text-xs shadow hover:bg-nuvv-purple-hover transition-all"
                  >
                    Assinar em {city.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Telecom Section for Local Businesses in this City */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 rounded-3xl p-8 sm:p-12 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-nuvv-green text-xs font-bold border border-emerald-500/30">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>SOLUÇÕES CORPORATIVAS EM {city.name.toUpperCase()}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Sua Empresa em {city.name} Precisa de Alta Disponibilidade?
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                  A Nuvv é uma operadora de telecomunicações com rede própria em {city.name}. Atendemos desde comércios e escritórios até indústrias e grandes empresas com <strong>Link Dedicado 100% Simétrico</strong> (SLA de 4h), <strong>Semi-Dedicado com IP Fixo</strong> e <strong>PABX em Nuvem</strong>.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-nuvv-green" />
                    <span>Garantia de Banda 100% Full-Duplex</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-nuvv-green" />
                    <span>SLA de Atendimento em 4h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-nuvv-green" />
                    <span>NOC 24/7 Ativo</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to="/empresarial"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md text-center transition-all flex items-center justify-center space-x-2"
                >
                  <span>Ver Planos Empresariais</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenLeadModal(`Link Dedicado Empresarial em ${city.name}`)}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 text-center transition-all"
                >
                  Consultar Viabilidade PJ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ Section with Schema */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark">
              Perguntas Frequentes sobre a Nuvv em {city.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Tire suas dúvidas sobre cobertura, prazos de instalação e benefícios.
            </p>
          </div>

          <div className="space-y-4">
            {localFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-gray-100 space-y-2"
              >
                <h4 className="text-sm sm:text-base font-bold text-nuvv-dark flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-nuvv-green flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Served Cities Links for SEO Internal Linking */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Conheça a Fibra Nuvv em Outras Cidades
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {cities
              .filter((c) => c.id !== city.id)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/cidade/${c.id}`}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 hover:text-white transition-all"
                >
                  Internet em {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <PartnerCarousel />

      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
