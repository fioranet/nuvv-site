import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, Server, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Positioning (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/en/" className="inline-block">
              <img
                src="/images/external/nuvv_logo.png"
                alt="Nuvv Global Partners"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted carrier-grade connectivity partner in Brazil. We provide Dedicated Internet Access (DIA), wholesale local loop circuits, and high-availability SD-WAN underlays for global MSPs, carriers, and enterprise integrators.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>Autonomous System ASN 266453</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-nuvv-purple" />
                <span>Anatel SCM Licensed</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/en/dedicated-internet-brazil/" className="hover:text-white transition-colors">
                  Dedicated Internet Access (DIA)
                </Link>
              </li>
              <li>
                <Link to="/en/wholesale-connectivity/" className="hover:text-white transition-colors">
                  Local Loop & Last Mile Fiber
                </Link>
              </li>
              <li>
                <Link to="/en/wholesale-connectivity/" className="hover:text-white transition-colors">
                  Ethernet Private Lines (E-Line)
                </Link>
              </li>
              <li>
                <Link to="/en/multi-site-connectivity/" className="hover:text-white transition-colors">
                  Multi-Site SD-WAN Underlay
                </Link>
              </li>
              <li>
                <Link to="/en/wholesale-connectivity/#nni" className="hover:text-white transition-colors">
                  Carrier-to-Carrier NNI
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Partnerships */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Partner Programs
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/en/partners/#msps" className="hover:text-white transition-colors">
                  For Managed Service Providers (MSPs)
                </Link>
              </li>
              <li>
                <Link to="/en/partners/#carriers" className="hover:text-white transition-colors">
                  For Wholesale Carriers
                </Link>
              </li>
              <li>
                <Link to="/en/partners/#brokers" className="hover:text-white transition-colors">
                  For Telecom Brokers & Agents
                </Link>
              </li>
              <li>
                <Link to="/en/contact/" className="hover:text-white transition-colors">
                  Request Circuit Feasibility (RFQ)
                </Link>
              </li>
              <li>
                <Link to="/" className="text-nuvv-green hover:underline flex items-center space-x-1 pt-2">
                  <Globe className="w-3 h-3" />
                  <span>Versão em Português (Brasil)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Global Telecom Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Global Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-nuvv-purple flex-shrink-0 mt-0.5" />
                <span>Greater São Paulo Metro Area & National Underlay, Brazil</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                <a href="mailto:partners@nuvv.com.br" className="hover:text-white transition-colors">
                  partners@nuvv.com.br
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                <span>+55 11 4745-9000 (Carrier NOC 24/7)</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/en/contact/"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-nuvv-purple text-white text-xs font-bold transition-all"
                >
                  <span>Submit an RFQ</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Nuvv Tecnologia LTDA. All rights reserved. Brazilian Telecommunications Operator.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacidade" className="hover:text-slate-300 transition-colors">
              Privacy Policy (LGPD)
            </Link>
            <Link to="/termos" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/en/contact/" className="hover:text-slate-300 transition-colors">
              International Inquiries
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
