import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalSEO } from '../../components/common/GlobalSEO';
import { GlobalHeader } from '../../components/layout/en/GlobalHeader';
import { GlobalFooter } from '../../components/layout/en/GlobalFooter';
import { InternationalRfqModal } from '../../components/en/InternationalRfqModal';
import { createTelecomServiceSchema } from '../../data/en/seoSchemasEn';
import {
  Radio,
  Network,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Activity,
  Globe,
  Clock,
  Cpu,
} from 'lucide-react';

export const DedicatedInternetBrazil: React.FC = () => {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);

  const diaFeatures = [
    {
      title: '100% Guaranteed 1:1 CIR Bandwidth',
      description: 'Zero contention and zero oversubscription. Every bit of bandwidth purchased is strictly dedicated to your customer circuit, guaranteed by contract.',
      icon: Zap,
    },
    {
      title: 'Full Symmetrical Throughput',
      description: 'Equal download and upload speeds from 100 Mbps up to 10 Gbps, engineered for enterprise backups, VoIP trunks, videoconferencing, and cloud workloads.',
      icon: Activity,
    },
    {
      title: 'Autonomous System ASN & Direct IX.br',
      description: 'Nuvv operates its own Autonomous System (ASN 266453) with direct high-capacity interconnects at IX.br (São Paulo), providing minimal latency to global hyperscalers.',
      icon: Globe,
    },
    {
      title: 'Carrier-Grade Public IP Allocation',
      description: 'Fixed public IPv4 blocks (/30, /29, /28) and native dual-stack IPv6 (/48 subnets). Full BGP peering support for clients running their own AS routing.',
      icon: Server,
    },
    {
      title: 'Contractual 99.9% Uptime & 4h MTTR',
      description: 'Enterprise Service Level Agreement backed by contractual financial penalties. In the rare event of fiber cut, our emergency teams respond with a 4-hour MTTR.',
      icon: Clock,
    },
    {
      title: 'Bilingual Carrier NOC 24/7/365',
      description: 'Continuous proactive SNMP and telemetry monitoring. Our network engineers detect physical threshold variations and dispatch field crews before circuit degradation occurs.',
      icon: ShieldCheck,
    },
  ];

  const useCases = [
    {
      title: 'Direct Cloud On-Ramp (AWS, Azure, GCP)',
      description: 'São Paulo hosts the primary cloud regions for AWS (sa-east-1), Microsoft Azure (Brazil South), and Google Cloud (southamerica-east1). Our low-latency routes ensure optimal interconnectivity.',
    },
    {
      title: 'Multinational Corporate Headquarters & Hubs',
      description: 'Provide uncompromising uptime for Fortune 500 offices, financial institutions, and global consultancy firms operating corporate infrastructure in Brazil.',
    },
    {
      title: 'Logistics Parks & Critical Manufacturing Plants',
      description: 'Ensure automated supply chains, RFID tracking systems, and centralized ERPs (SAP, Oracle) maintain continuous, uninhibited cloud synchronization.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-nuvv-purple selection:text-white">
      <GlobalSEO
        title="Dedicated Internet Access (DIA) in Brazil | 100% CIR Fiber — Nuvv"
        description="Mission-critical Dedicated Internet Access (DIA) across Brazil. Guaranteed 100% 1:1 CIR bandwidth, direct IX.br peering, BGP routing, public IPs, and 4-hour SLA."
        canonicalPath="/en/dedicated-internet-brazil/"
        ptEquivalentPath="/empresarial?categoria=link-dedicado#planos-empresa"
        schema={createTelecomServiceSchema(
          'Dedicated Internet Access (DIA) Brazil',
          'Enterprise Dedicated Internet Access & BGP Peering',
          'Symmetrical 1:1 CIR dedicated optical fiber internet with BGP multihomed routing, IX.br direct peering, and 4-hour contractual SLA in Brazil.',
          'https://nuvv.com.br/en/dedicated-internet-brazil/'
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
                <Radio className="w-3.5 h-3.5" />
                <span>100% CIR Dedicated Internet</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Mission-Critical Dedicated <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-400 to-cyan-300">
                  Internet Access (DIA)
                </span> in Brazil
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
                Guaranteed 100% CIR symmetrical fiber internet. Engineered for international operators, MSPs, and global enterprises requiring zero packet loss and rock-solid Brazilian connectivity.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setRfqModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-sm transition-all shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  Request a DIA Proposal (24h)
                </button>
                <Link
                  to="/en/wholesale-connectivity/"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center"
                >
                  Explore Local Loop & Last Mile
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECHNICAL PILLARS                                                         */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Technical Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Enterprise Specifications That Set Nuvv Apart
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Transparent network architecture designed to meet the rigorous compliance standards of international Fortune 500 enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diaFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-nuvv-purple/40 transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* USE CASES & CLOUD REACH                                                   */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                Enterprise Applications
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Built for High-Throughput Enterprise Workloads
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                From low-latency cloud interconnection to financial transactions, our circuits deliver deterministic throughput.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((uc, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-emerald-400/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {uc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SLA COMPARISON TABLE                                                      */}
        {/* ========================================================================= */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              SLA Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Standard Broadband vs. Nuvv Dedicated Internet (DIA)
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-white font-bold">
                  <tr>
                    <th className="p-4 sm:p-5">Feature</th>
                    <th className="p-4 sm:p-5 text-slate-300">Standard Business Broadband</th>
                    <th className="p-4 sm:p-5 text-emerald-400 bg-slate-800">Nuvv Dedicated Access (DIA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">CIR Bandwidth Guarantee</td>
                    <td className="p-4 text-slate-500">Shared (Best Effort / 40-50%)</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/40">100% Guaranteed 1:1 (Committed)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Throughput Symmetry</td>
                    <td className="p-4 text-slate-500">Asymmetrical (Low Upload)</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/40">100% Symmetrical (Down = Up)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Network Availability SLA</td>
                    <td className="p-4 text-slate-500">99.0% (Non-Financial)</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/40">99.9% Contractual with Credit Penalties</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Mean Time to Repair (MTTR)</td>
                    <td className="p-4 text-slate-500">24h to 48h</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/40">Under 4 Hours (24/7/365 NOC)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">IP Addressing</td>
                    <td className="p-4 text-slate-500">Dynamic or Single IP</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/40">Dedicated Public Blocks (/30, /29, /28) + BGP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM CTA                                                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-nuvv-dark to-slate-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Request Your Dedicated Circuit in Brazil
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Submit your client’s site address or GPS coordinates. We return technical route feasibility, fiber entrance details, and formal wholesale pricing in under 24 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setRfqModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-nuvv-green hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl cursor-pointer"
              >
                Request DIA Quotation (24h)
              </button>
              <Link
                to="/en/contact/"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center"
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
        defaultService="Dedicated Internet Access (DIA 1:1)"
        sourcePage="/en/dedicated-internet-brazil/"
      />
    </div>
  );
};
