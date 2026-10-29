import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalSEO } from '../../components/common/GlobalSEO';
import { GlobalHeader } from '../../components/layout/en/GlobalHeader';
import { GlobalFooter } from '../../components/layout/en/GlobalFooter';
import { InternationalRfqModal } from '../../components/en/InternationalRfqModal';
import { createTelecomServiceSchema } from '../../data/en/seoSchemasEn';
import {
  Network,
  Radio,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
  MapPin,
  Clock,
  Activity,
} from 'lucide-react';

export const WholesaleConnectivity: React.FC = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Wholesale Local Loop / Last Mile');

  const handleOpenRfq = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setRfqModalOpen(true);
  };

  const wholesaleProducts = [
    {
      title: 'Local Loop & Metro Access',
      badge: 'FTTB / FTTO / Last Mile',
      tagline: 'Direct physical optical fiber drops connecting enterprise branches, corporate towers, and data centers.',
      description: 'Engineered for international operators requiring dedicated physical local access. We deliver dedicated single-mode optical fiber directly to the customer demarcation point, avoiding congested copper or wireless handoffs.',
      specs: [
        { label: 'Fiber Medium', value: 'ITU-T G.652.D Single-Mode Optical Fiber' },
        { label: 'Handoff Ports', value: '100Base-TX, 1000Base-LX, 10GBase-LR' },
        { label: 'Topology', value: 'Underground & Aerial Protected Metro Rings' },
        { label: 'Demarcation', value: 'Carrier-Grade Layer-2 Optical NID / Switch' },
      ],
      icon: Network,
    },
    {
      title: 'Ethernet Private Lines (E-Line / P2P)',
      badge: 'MEF 2.0 Aligned',
      tagline: 'Transparent point-to-point Layer-2 transport across metropolitan and regional business centers.',
      description: 'Clean, unchannelized bandwidth for critical point-to-point connections. Enjoy ultra-low latency, zero packet inspection, transparent VLAN pass-through (802.1Q / 802.1ad QinQ), and deterministic throughput.',
      specs: [
        { label: 'Service Type', value: 'E-Line Point-to-Point (EPL & EVPL)' },
        { label: 'MTU Support', value: 'Up to 9000 Bytes (Jumbo Frames)' },
        { label: 'VLAN Tagging', value: 'Transparent 802.1Q & QinQ (802.1ad)' },
        { label: 'Throughput', value: '100% Guaranteed Non-Oversubscribed' },
      ],
      icon: Layers,
    },
    {
      title: 'Carrier-to-Carrier NNI Interconnection',
      badge: 'PoP Cross-Connects',
      tagline: 'Standardized Network-to-Network Interface (NNI) at core carrier-neutral data centers in São Paulo.',
      description: 'Streamline wholesale service provisioning across Brazil by establishing a high-capacity optical NNI. Provision multiple enterprise customer circuits over a single, redundant interconnect pipe.',
      specs: [
        { label: 'PoP Locations', value: 'Equinix (SP2, SP4), Ascenty, IX.br Metro PoPs' },
        { label: 'Capacity', value: '1 Gbps & 10 Gbps Redundant Optical Trunks' },
        { label: 'Protection', value: 'LACP (802.3ad) Link Aggregation & Diverse Paths' },
        { label: 'SLA Repair', value: 'Under 4 Hours Contractual (24/7/365 NOC)' },
      ],
      icon: Cpu,
    },
  ];

  const technicalSpecsTable = [
    { feature: 'Physical Layer', specification: 'Single-mode 9/125 μm fiber, dual-ring protected routes' },
    { feature: 'Interface Options', specification: '100 Mbps, 1 Gbps, and 10 Gbps optical SFP/SFP+' },
    { feature: 'VLAN & Layer-2 Transparency', specification: 'Full 802.1Q tag preservation & 802.1ad (QinQ double-tagging)' },
    { feature: 'Maximum Transmission Unit (MTU)', specification: 'Standard 1500 to Jumbo 9000 bytes configurable' },
    { feature: 'Network Availability (Uptime)', specification: '99.9% Contractual SLA with financial credit structure' },
    { feature: 'Mean Time to Repair (MTTR)', specification: 'Under 4 hours (Strict 24/7/365 bilingual carrier NOC)' },
    { feature: 'Testing Standards', specification: 'RFC 2544 & ITU-T Y.1564 BER certification report provided' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-nuvv-purple selection:text-white">
      <GlobalSEO
        title="Brazil Local Loop & Last Mile Fiber Provider | Wholesale — Nuvv"
        description="Reliable carrier-grade local access, local loop circuits, and last mile fiber across Greater São Paulo and Brazil. MEF-aligned Ethernet, E-Line, and high-capacity transport."
        canonicalPath="/en/wholesale-connectivity/"
        ptEquivalentPath="/empresarial"
        schema={createTelecomServiceSchema(
          'Carrier Wholesale Local Loop & Last Mile Fiber Brazil',
          'Wholesale Telecommunications Circuit Delivery',
          'Physical optical fiber local loop, E-Line point-to-point, and carrier NNI connectivity across Brazilian metropolitan areas.',
          'https://nuvv.com.br/en/wholesale-connectivity/'
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
                <Network className="w-3.5 h-3.5" />
                <span>Wholesale Infrastructure</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Carrier-Grade Local Loop & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-400 to-cyan-300">
                  Last Mile Fiber
                </span> in Brazil
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
                Connect your global enterprise clients across Brazil’s most demanding industrial, logistical, and commercial corridors with high-capacity, low-latency optical circuits.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenRfq('Wholesale Local Loop / Last Mile')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  Request Circuit Feasibility & Pricing
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
        {/* THREE WHOLESALE PRODUCTS                                                  */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Wholesale Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Physical Fiber & Layer-2 Transport Services
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Standardized MEF architectures, transparent QinQ support, and enterprise demarcations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {wholesaleProducts.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-nuvv-purple/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-nuvv-dark text-white flex items-center justify-center">
                        <Icon className="w-6 h-6 text-nuvv-green" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {p.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-slate-900">
                        {p.title}
                      </h3>
                      <p className="text-xs font-bold text-nuvv-purple mt-1">
                        {p.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                        Technical Specifications
                      </span>
                      {p.specs.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-1 border-b last:border-b-0 border-slate-50">
                          <span className="text-slate-500 font-medium">{s.label}:</span>
                          <span className="font-bold text-slate-900">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <button
                      type="button"
                      onClick={() => handleOpenRfq(p.title)}
                      className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Check Viability for {p.title.split('(')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECHNICAL SPECIFICATIONS MATRIX                                           */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                Engineering Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Carrier-Grade SLA & Protocol Compliance
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Every circuit delivered is tested to strict international RFC and ITU-T telecommunications standards before customer handoff.
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-xl">
              <div className="divide-y divide-white/10">
                {technicalSpecsTable.map((row, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/5 transition-colors">
                    <span className="text-sm font-bold text-emerald-300 sm:w-1/3">
                      {row.feature}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 sm:w-2/3 sm:text-right font-medium">
                      {row.specification}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOOTPRINT & COVERAGE CLARITY                                              */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-nuvv-dark to-slate-900 rounded-3xl p-8 sm:p-14 text-white space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-black uppercase text-nuvv-green tracking-wider">
                Footprint Coverage
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                High-Density Metro Core & Strategic Nationwide Delivery
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Nuvv owns and operates hundreds of kilometers of high-density metropolitan fiber throughout the Greater São Paulo region and the Alto Tietê industrial belt. To serve our global partners across the rest of Brazil, we leverage carrier-to-carrier interconnections (NNI) with Brazil's primary neutral network operators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400">Core Owned Metro Area</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Suzano, Mogi das Cruzes, Poá, Ferraz de Vasconcelos, Itaquaquecetuba, Arujá, Santa Isabel, Guarulhos, and Metropolitan São Paulo.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400">Major Data Center PoPs</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct cross-connect access at Equinix (SP2, SP4), Ascenty, and core IX.br São Paulo peering exchanges.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-emerald-400">Nationwide Aggregation</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Single contract and unified SLA for inter-state circuits connecting secondary facilities in Rio de Janeiro, Minas Gerais, Curitiba, and beyond.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenRfq('Wholesale Feasibility Check')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-nuvv-green hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-md cursor-pointer"
              >
                Send GPS Coordinates for 24h Feasibility
              </button>
              <Link
                to="/en/contact/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center"
              >
                Contact Telecom Desk
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />

      <InternationalRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultService={selectedService}
        sourcePage="/en/wholesale-connectivity/"
      />
    </div>
  );
};
