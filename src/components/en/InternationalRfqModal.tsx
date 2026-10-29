import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock, Server, ArrowRight } from 'lucide-react';

interface InternationalRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  sourcePage?: string;
}

export const InternationalRfqModal: React.FC<InternationalRfqModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Dedicated Internet Access (DIA)',
  sourcePage = '/en/',
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    partnerType: 'MSP / System Integrator',
    serviceRequired: defaultService,
    bandwidth: '500 Mbps',
    brazilLocation: '',
    targetTimeline: 'Within 30 Days',
    technicalNotes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

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
          source_page: sourcePage,
          company: formData.companyName,
          name: formData.contactName,
          email: formData.workEmail,
          phone: formData.phone,
          details: structuredDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RFQ. Please try again or email partners@nuvv.com.br directly.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error sending request. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-nuvv-dark to-slate-900 text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>24h Technical Turnaround</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Request Circuit Feasibility & RFQ in Brazil
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
            Provide your technical requirements. Our wholesale telecom desk will return route viability, coordinates, and pricing.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Inquiry Received Successfully!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Nuvv Global Partners. Our senior wholesale engineering desk will analyze your request and reply to <strong>{formData.workEmail}</strong> within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-nuvv-purple text-white font-bold text-sm transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Company & Partner Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Global Telecom Networks Inc."
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

              {/* Contact Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
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
                    placeholder="john@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Phone & Service Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Phone / WhatsApp (With Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
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

              {/* Bandwidth & Target Location in Brazil */}
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
                    <option value="2 to 10 Gbps High Capacity">2 to 10 Gbps High Capacity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                    Target Location in Brazil *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City, State, or CEP / Address if known"
                    value={formData.brazilLocation}
                    onChange={(e) => setFormData({ ...formData, brazilLocation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Technical Notes */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  Project Details / SLA Requirements / RFC (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify BGP requirements, interface types, delivery milestones or multiple site lists..."
                  value={formData.technicalNotes}
                  onChange={(e) => setFormData({ ...formData, technicalNotes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/10 text-sm font-medium outline-hidden transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential NDA & direct carrier engineering desk</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Submit RFQ Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
