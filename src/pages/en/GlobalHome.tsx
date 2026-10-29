import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalSEO } from '../../components/common/GlobalSEO';
import { GlobalHeader } from '../../components/layout/en/GlobalHeader';
import { GlobalFooter } from '../../components/layout/en/GlobalFooter';
import { InternationalRfqModal } from '../../components/en/InternationalRfqModal';
import { globalOrganizationSchema } from '../../data/en/seoSchemasEn';
import {
  GLOBAL_NETWORK_STATS,
  INTERNATIONAL_SOLUTIONS,
  PARTNER_MODELS,
  WHY_NUVV_ARGUMENTS,
  INTERNATIONAL_FAQS,
} from '../../data/en/internationalData';
import {
  Network,
  Radio,
  Layers,
  ArrowRight,
  ShieldCheck,
  Server,
  Cpu,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Globe,
  Clock,
  Headphones,
  Zap,
} from 'lucide-react';

export const GlobalHome: React.FC = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Dedicated Internet Access (DIA)');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenRfq = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setRfqModalOpen(true);
  };

  const iconMap: Record<string, any> = {
    Network,
    Radio,
    Layers,
    Server,
    Cpu,
    Briefcase,
    Globe,
    Headphones,
    Clock,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-nuvv-purple selection:text-white">
      <GlobalSEO
        title="Your Local Connectivity Partner in Brazil | Nuvv Global Partners"
        description="Expand your enterprise footprint across Brazil. High-performance Dedicated Internet Access (DIA), carrier-grade last mile fiber, and multi-site underlays for global MSPs, carriers, and integrators."
        canonicalPath="/en/"
        ptEquivalentPath="/"
        schema={globalOrganizationSchema}
      />

      <GlobalHeader onOpenRfqModal={() => handleOpenRfq()} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-nuvv-dark text-white pt-16 sm:pt-24 pb-20 sm:pb-32">
          {/* Ambient light glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-nuvv-purple/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3.5xl mx-auto text-center space-y-6">
              
              {/* Top Pill */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Nuvv Global Partners • Brazil Connectivity</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
                Your Trusted Local <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-400 to-cyan-300">
                  Connectivity Partner
                </span> in Brazil
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-xl text-slate-300 max-w-2.5xl mx-auto font-normal leading-relaxed">
                We empower global <strong>MSPs, System Integrators, and Wholesale Carriers</strong> with mission-critical Dedicated Internet Access (DIA), carrier last mile, and multi-site underlay networks across South America’s primary economic hub.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenRfq('Dedicated Internet Access (DIA)')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <span>Request Feasibility & RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/en/partners/"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center backdrop-blur-md"
                >
                  Explore Partner Program
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ASN 266453 BGP Multihomed</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct IX.br São Paulo Peering</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Strict 4h Enterprise SLA</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Anatel SCM Licensed</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATS BANNER                                                              */}
        {/* ========================================================================= */}
        <section className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-white rounded-3xl shadow-xl border border-slate-200/80">
            {GLOBAL_NETWORK_STATS.map((stat, i) => (
              <div key={i} className="p-4 text-center border-r last:border-r-0 border-slate-100">
                <span className="block text-2xl sm:text-4xl font-black text-nuvv-dark">
                  {stat.value}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 mt-1">
                  {stat.label}
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5 hidden sm:block">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE CONNECTIVITY SOLUTIONS                                               */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Wholesale & B2B Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Engineered for Global Telecom Standards
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We bridge international carriers and system integrators with high-capacity optical fiber infrastructure across Brazil's core economic regions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {INTERNATIONAL_SOLUTIONS.map((sol) => {
              const Icon = iconMap[sol.iconName] || Network;
              return (
                <div
                  key={sol.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-nuvv-purple/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center group-hover:bg-nuvv-purple group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {sol.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-nuvv-purple transition-colors">
                        {sol.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                        {sol.summary}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                        Key Deliverables
                      </span>
                      {sol.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                    <Link
                      to={sol.route}
                      className="text-xs font-black text-nuvv-purple hover:underline flex items-center space-x-1"
                    >
                      <span>Explore Technical Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenRfq(sol.title)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Quote Circuit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY PARTNER WITH NUVV                                                     */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                The Nuvv Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Why Global Providers Choose Nuvv in Brazil
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Avoid multi-month bureaucratic delays. We combine dense metropolitan physical infrastructure with agile carrier engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_NUVV_ARGUMENTS.map((arg, idx) => {
                const Icon = iconMap[arg.iconName] || Zap;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-all space-y-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {arg.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {arg.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PARTNER ENGAGEMENT MODELS                                                 */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Engagement Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Flexible Partnership Models Built for Scalability
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Whether you need transparent white-label underlays, carrier-to-carrier NNI interconnection, or project-based agent referrals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNER_MODELS.map((pm) => {
              const Icon = iconMap[pm.iconName] || Server;
              return (
                <div
                  key={pm.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-nuvv-dark text-white flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-nuvv-purple uppercase tracking-wider block">
                        {pm.audience}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">
                        {pm.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pm.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {pm.benefits.map((b, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      to="/en/partners/"
                      className="w-full py-3 rounded-xl bg-slate-100 hover:bg-nuvv-purple hover:text-white text-slate-900 text-xs font-black transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECHNICAL FAQS                                                            */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-100/70 border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
                Common Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Technical & Operational Questions
              </h2>
            </div>

            <div className="space-y-3">
              {INTERNATIONAL_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 hover:text-nuvv-purple transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-nuvv-purple' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CTA BANNER                                                         */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-nuvv-dark via-slate-900 to-nuvv-purple text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Accelerate Your Client Deployments in Brazil?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Send your circuit coordinates, bandwidth requirements, or master partner inquiry. Our senior wholesale engineering desk will respond within 24 business hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenRfq()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm transition-all shadow-xl cursor-pointer"
              >
                Request Circuit Feasibility (24h)
              </button>
              <Link
                to="/en/contact/"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center"
              >
                Contact Global Telecom Desk
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />

      {/* RFQ Modal */}
      <InternationalRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultService={selectedService}
        sourcePage="/en/"
      />
    </div>
  );
};
