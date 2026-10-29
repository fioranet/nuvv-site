import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalSEO } from '../../components/common/GlobalSEO';
import { GlobalHeader } from '../../components/layout/en/GlobalHeader';
import { GlobalFooter } from '../../components/layout/en/GlobalFooter';
import { InternationalRfqModal } from '../../components/en/InternationalRfqModal';
import { createTelecomServiceSchema } from '../../data/en/seoSchemasEn';
import { PARTNER_MODELS } from '../../data/en/internationalData';
import {
  Server,
  Cpu,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileCheck,
  Headphones,
  Zap,
  Globe,
} from 'lucide-react';

export const Partners: React.FC = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState('MSP / System Integrator');

  const handleOpenRfq = (category?: string) => {
    if (category) setSelectedPartnerCategory(category);
    setRfqModalOpen(true);
  };

  const partnerJourneySteps = [
    {
      step: '01',
      title: 'Fast Feasibility & Route Viability',
      description: 'Submit your client’s GPS coordinates or address. Our wholesale engineering desk returns verified route viability, fiber distance, and pricing within 24 business hours.',
      icon: Clock,
    },
    {
      step: '02',
      title: 'Transparent Pricing & Strict SLAs',
      description: 'Zero hidden local telecom taxes (ICMS/FUST built-in). Choose between BRL or USD-referenced contracts with contractual 99.9% availability and 4h MTTR SLAs.',
      icon: FileCheck,
    },
    {
      step: '03',
      title: 'Rapid Staging & Carrier Acceptance',
      description: 'Circuit activation performed by certified field technicians. Comprehensive RFC 2544 / ITU-T Y.1564 test reports provided for complete carrier-grade acceptance.',
      icon: Zap,
    },
    {
      step: '04',
      title: 'Proactive 24/7/365 NOC Assurance',
      description: 'Round-the-clock telemetry, automated optical loss detection, bilingual engineering NOC, and dedicated technical account managers for your global team.',
      icon: Headphones,
    },
  ];

  const iconMap: Record<string, any> = {
    Server,
    Cpu,
    Briefcase,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-nuvv-purple selection:text-white">
      <GlobalSEO
        title="Partner Program | Wholesale & Channel Partnerships in Brazil — Nuvv"
        description="Designed for MSPs, System Integrators, Carriers, and Telecom Brokers. Expand your global reach with reliable last mile, DIA, and seamless delivery in Brazil."
        canonicalPath="/en/partners/"
        ptEquivalentPath="/empresarial"
        schema={createTelecomServiceSchema(
          'Nuvv Global Partner Program',
          'Wholesale & Channel Telecommunications Partnership',
          'Structured partnership models for international carriers, MSPs, and telecom brokers requiring local circuit delivery across Brazil.',
          'https://nuvv.com.br/en/partners/'
        )}
      />

      <GlobalHeader onOpenRfqModal={() => handleOpenRfq()} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-nuvv-dark text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Nuvv Partner Ecosystem</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Empowering Global MSPs, Integrators & Carriers <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-400 to-cyan-300">
                  Across Brazil
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
                We serve as your seamless in-country network infrastructure extension. Deliver high-performance fiber connectivity to your enterprise clients without the complexity of establishing a local telecom entity.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenRfq()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  Apply to Partner Program
                </button>
                <Link
                  to="/en/wholesale-connectivity/"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center"
                >
                  View Wholesale Solutions
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THREE ENGAGEMENT MODELS                                                   */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Tailored Frameworks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Flexible Partnership Models Built for Scalability
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We align with your specific commercial, technical, and operational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PARTNER_MODELS.map((pm) => {
              const Icon = iconMap[pm.iconName] || Server;
              return (
                <div
                  key={pm.id}
                  id={pm.id.replace('msps-system-integrators', 'msps').replace('wholesale-carriers', 'carriers').replace('telecom-brokers', 'brokers')}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-nuvv-purple/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-nuvv-dark text-white flex items-center justify-center">
                      <Icon className="w-7 h-7 text-nuvv-green" />
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-nuvv-purple block">
                        {pm.audience}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 mt-1">
                        {pm.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pm.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                        Program Advantages
                      </span>
                      {pm.benefits.map((b, i) => (
                        <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 mt-8">
                    <button
                      type="button"
                      onClick={() => handleOpenRfq(pm.title)}
                      className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Inquire as {pm.audience.split(',')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE PARTNER JOURNEY (STEP BY STEP)                                        */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                Operational Lifecycle
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                The Partner Journey: From Quotation to Ongoing Assurance
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                A predictable, standardized delivery pipeline engineered to minimize project friction and keep your global engineering stakeholders informed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerJourneySteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="p-7 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-emerald-400/40 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-emerald-400/40 font-mono">
                          {step.step}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CTA                                                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white text-center border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Start Expanding in Brazil Today
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Schedule an introduction call with our wholesale partnerships director or submit your active Brazilian circuit requirements for immediate feasibility.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenRfq()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg cursor-pointer"
              >
                Submit Partner Inquiry
              </button>
              <Link
                to="/en/contact/"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-all text-center"
              >
                Contact Global Desk Directly
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />

      <InternationalRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultService={`Partner Program: ${selectedPartnerCategory}`}
        sourcePage="/en/partners/"
      />
    </div>
  );
};
