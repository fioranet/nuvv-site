import React, { useState } from 'react';
import { GlobalSEO } from '../../components/common/GlobalSEO';
import { GlobalHeader } from '../../components/layout/en/GlobalHeader';
import { GlobalFooter } from '../../components/layout/en/GlobalFooter';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Server,
  Globe,
  Radio,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    partnerType: 'MSP / System Integrator',
    serviceRequired: 'Dedicated Internet Access (DIA)',
    bandwidth: '500 Mbps',
    brazilLocation: '',
    targetTimeline: 'Within 30 Days',
    technicalNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const structuredDetails = [
      `[GLOBAL PARTNER RFQ]`,
      `Partner Type: ${formData.partnerType}`,
      `Service: ${formData.serviceRequired}`,
      `Bandwidth: ${formData.bandwidth}`,
      `Brazil Target Location: ${formData.brazilLocation}`,
      `Timeline: ${formData.targetTimeline}`,
      formData.technicalNotes ? `Notes: ${formData.technicalNotes}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    try {
      const response = await fetch('/api/commercial-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_page: '/en/contact/',
          company: formData.companyName,
          name: formData.contactName,
          email: formData.workEmail,
          phone: formData.phone,
          details: structuredDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RFQ. Please check your information or email partners@nuvv.com.br.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-nuvv-purple selection:text-white">
      <GlobalSEO
        title="Request a Quote | International Telecom Feasibility in Brazil — Nuvv"
        description="Submit your connectivity requirements, circuit RFP, or partner inquiry for Brazil. Fast technical feasibility feedback within 24 business hours."
        canonicalPath="/en/contact/"
        ptEquivalentPath="/suporte"
      />

      <GlobalHeader />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header text */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase text-nuvv-purple tracking-wider">
              Wholesale & Global Desk
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Request Circuit Feasibility & RFQ in Brazil
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Submit your client requirements, site lists, or partnership inquiries. Our wholesale engineering desk evaluates route coordinates, fiber entry, and competitive pricing within 24 business hours.
            </p>
          </div>

          {/* Grid: Form (Left) & Contact Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    RFQ Submitted Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Thank you for contacting Nuvv Global Partners. A senior wholesale telecom engineer has received your parameters and will reply to <strong>{formData.workEmail}</strong> with formal viability analysis and pricing.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Global Telecom Inc."
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Partner Category *
                      </label>
                      <select
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden bg-white cursor-pointer"
                      >
                        <option value="MSP / System Integrator">MSP / System Integrator</option>
                        <option value="Wholesale Carrier / Aggregator">Wholesale Carrier / Aggregator</option>
                        <option value="Telecom Broker / Agent">Telecom Broker / Agent</option>
                        <option value="Enterprise End-User">Enterprise End-User</option>
                        <option value="Other">Other Partner</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Phone / WhatsApp (With Country Code) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 555 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Required Service *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden bg-white cursor-pointer"
                      >
                        <option value="Dedicated Internet Access (DIA)">Dedicated Internet Access (DIA 1:1)</option>
                        <option value="Wholesale Local Loop / Last Mile">Wholesale Local Loop / Last Mile Fiber</option>
                        <option value="Ethernet Private Line (E-Line P2P)">Ethernet Private Line (E-Line P2P)</option>
                        <option value="Multi-Site SD-WAN Underlay">Multi-Site SD-WAN Underlay</option>
                        <option value="Carrier NNI Interconnection">Carrier NNI Interconnection (PoP)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Requested Bandwidth
                      </label>
                      <select
                        value={formData.bandwidth}
                        onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden bg-white cursor-pointer"
                      >
                        <option value="100 Mbps Symmetrical">100 Mbps Symmetrical</option>
                        <option value="300 Mbps Symmetrical">300 Mbps Symmetrical</option>
                        <option value="500 Mbps Symmetrical">500 Mbps Symmetrical</option>
                        <option value="1 Gbps Symmetrical">1 Gbps Symmetrical</option>
                        <option value="2 to 10 Gbps Optical Handoff">2 to 10 Gbps Optical Handoff</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                        Site Location in Brazil (Address or Coordinates) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City, State, or CEP / GPS Coordinates"
                        value={formData.brazilLocation}
                        onChange={(e) => setFormData({ ...formData, brazilLocation: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                      Technical Specifications & Project RFC (Optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify BGP requirements, optical handoff type, required MTU, delivery milestones, or multiple site list..."
                      value={formData.technicalNotes}
                      onChange={(e) => setFormData({ ...formData, technicalNotes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Commercial privacy guaranteed under mutual NDA standards</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Analyzing...</span>
                      ) : (
                        <>
                          <span>Submit Circuit RFQ</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Side: Global Desk Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-b from-slate-900 to-nuvv-dark text-white rounded-3xl p-7 sm:p-8 space-y-6 shadow-xl border border-slate-800">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                    Direct Contact
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    Global Wholesale Desk
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Dedicated engineering and commercial team supporting international partners in North America, Europe, and Asia.
                  </p>
                </div>

                <div className="space-y-4 text-xs pt-4 border-t border-white/10">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-medium">Partner Inquiries:</span>
                      <a href="mailto:partners@nuvv.com.br" className="font-bold text-white hover:underline text-sm">
                        partners@nuvv.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-medium">Carrier Support & NOC:</span>
                      <span className="font-bold text-white text-sm">+55 11 4745-9000</span>
                      <span className="text-[11px] text-slate-400 block">24/7/365 Bilingual Assistance</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block font-medium">Headquarters:</span>
                      <span className="text-slate-200">Rua Portugal Freixo, 242, Suzano, SP - Brazil</span>
                      <span className="text-[11px] text-slate-400 block">Greater São Paulo Economic Metro</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Feasibility Turnaround</span>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed">
                    • Standard routes: <strong>24 business hours</strong><br />
                    • Multi-site state routes: <strong>48 business hours</strong>
                  </p>
                </div>
              </div>

              {/* Network Credentials box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 text-xs space-y-3">
                <span className="font-black uppercase tracking-wider text-slate-900 block">
                  Telecommunications Credentials
                </span>
                <div className="space-y-2 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Autonomous System:</span>
                    <span className="font-bold text-slate-900">ASN 266453</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Brazilian License:</span>
                    <span className="font-bold text-slate-900">Anatel SCM Certified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Direct IX Peering:</span>
                    <span className="font-bold text-slate-900">IX.br São Paulo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MTTR SLA:</span>
                    <span className="font-bold text-slate-900">4 Hours Contractual</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};
