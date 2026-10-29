import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalSEO } from '../../components/common/GlobalSEO';
import { GlobalHeader } from '../../components/layout/en/GlobalHeader';
import { GlobalFooter } from '../../components/layout/en/GlobalFooter';
import { InternationalRfqModal } from '../../components/en/InternationalRfqModal';
import { createTelecomServiceSchema } from '../../data/en/seoSchemasEn';
import {
  Layers,
  Network,
  Radio,
  Server,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Activity,
  Globe,
  Building2,
  Cpu,
} from 'lucide-react';

export const MultiSiteConnectivity: React.FC = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  const underlayBenefits = [
    {
      title: 'Optimized for Global SD-WAN Overlays',
      description: 'Clean, transparent Layer-2 and Layer-3 physical transport that seamlessly supports SD-WAN tunnels (IPsec, GRE) from Cisco Meraki, Fortinet, Versa, and Aruba.',
      icon: Cpu,
    },
    {
      title: 'Low Latency & Jitter Determinism',
      description: 'Engineered optical paths connecting Brazil’s core commercial hubs with predictable round-trip times (RTT), eliminating voice packet loss and video stutter.',
      icon: Activity,
    },
    {
      title: 'Single Point of Contact & Invoicing',
      description: 'Eliminate the headache of managing 10+ fragmented regional telecom providers in Brazil. Nuvv acts as your single accountable partner with unified billing and SLA.',
      icon: Building2,
    },
    {
      title: 'Physical Diverse Route Options',
      description: 'For mission-critical hubs and regional datacenters, we engineer redundant dual-entry fiber paths avoiding single points of failure on public conduits.',
      icon: Network,
    },
  ];

  const sdwanPartners = [
    'Cisco / Meraki / Viptela',
    'Fortinet FortiGate Secure SD-WAN',
    'VMware VeloCloud',
    'Aruba EdgeConnect / Silver Peak',
    'Versa Networks',
    'Palo Alto Prisma SD-WAN',
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-nuvv-purple selection:text-white">
      <GlobalSEO
        title="Multi-Site Connectivity & SD-WAN Underlay in Brazil | Nuvv"
        description="Interconnect branches, warehouses, and headquarters across Brazil. High-availability fiber underlays engineered for global SD-WAN, MPLS, and hybrid networks."
        canonicalPath="/en/multi-site-connectivity/"
        ptEquivalentPath="/empresarial"
        schema={createTelecomServiceSchema(
          'Multi-Site Interconnection & SD-WAN Underlay Brazil',
          'Enterprise Multi-Site Telecommunications & SD-WAN Underlay',
          'Multi-site private connectivity, branch interconnection, and low-latency optical underlays for global SD-WAN deployments in Brazil.',
          'https://nuvv.com.br/en/multi-site-connectivity/'
        )}
      />

      <GlobalHeader onOpenRfqModal={() => setRfqModalOpen(true)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-nuvv-dark text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Enterprise Multi-Site Networking</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                High-Availability Multi-Site & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-400 to-cyan-300">
                  SD-WAN Underlay
                </span> in Brazil
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
                Connect branch offices, corporate campuses, logistics centers, and retail chains across Brazil with a robust, SLA-backed optical fiber underlay network.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setRfqModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  Schedule a Multi-Site Consultation
                </button>
                <Link
                  to="/en/dedicated-internet-brazil/"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center"
                >
                  Explore Dedicated Internet (DIA)
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* UNDERLAY BENEFITS                                                         */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Underlay Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Global SD-WAN Overlays Need a Robust Local Underlay
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              An SD-WAN edge appliance is only as good as the physical connectivity feeding it. We ensure zero packet loss and predictable transport across Brazil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {underlayBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-nuvv-purple/40 transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-nuvv-dark text-white flex items-center justify-center">
                    <Icon className="w-6 h-6 text-nuvv-green" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SD-WAN APPLIANCE COMPATIBILITY                                            */}
        {/* ========================================================================= */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div>
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                Appliance Agnostic
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                Seamless Compatibility with Leading Global SD-WAN Stacks
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {sdwanPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-bold text-slate-200 flex items-center justify-center"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CTA                                                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white text-center border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Design Your Brazilian Multi-Site Network
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Send your complete branch list (cities, addresses, or CEPs). Our telecom architects will evaluate routing topologies, redundant paths, and consolidated wholesale pricing.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setRfqModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg cursor-pointer"
              >
                Submit Multi-Site RFP / Site List
              </button>
              <Link
                to="/en/contact/"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-all text-center"
              >
                Contact Global Desk
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />

      <InternationalRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultService="Multi-Site SD-WAN Underlay"
        sourcePage="/en/multi-site-connectivity/"
      />
    </div>
  );
};
