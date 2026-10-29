import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Globe,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Radio,
  Network,
  Layers,
  Users,
  Send,
} from 'lucide-react';

interface GlobalHeaderProps {
  onOpenRfqModal?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onOpenRfqModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Overview', path: '/en/' },
    { label: 'Partner Program', path: '/en/partners/' },
    { label: 'Contact & RFQ', path: '/en/contact/' },
  ];

  const solutions = [
    {
      title: 'Dedicated Internet Access (DIA)',
      description: '100% Guaranteed 1:1 CIR, BGP Peering, SLA 4h & IX.br direct',
      path: '/en/dedicated-internet-brazil/',
      icon: Radio,
    },
    {
      title: 'Wholesale & Last Mile Fiber',
      description: 'Local Loop, E-Line P2P, Metro Ethernet & Carrier NNI',
      path: '/en/wholesale-connectivity/',
      icon: Network,
    },
    {
      title: 'Multi-Site & SD-WAN Underlay',
      description: 'Nationwide branch interconnection & low-latency underlay',
      path: '/en/multi-site-connectivity/',
      icon: Layers,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/en/') return location.pathname === '/en' || location.pathname === '/en/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      {/* Top Banner: Global Desk Alert */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center font-medium border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>International Telecom Desk • 24-Hour Feasibility Turnaround for Brazil</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-slate-400">
            <span>Bilingual NOC 24/7/365</span>
            <span>•</span>
            <span className="text-white font-semibold">Autonomous System ASN 266453</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <Link to="/en/" className="flex items-center space-x-2 group">
              <img
                src="/images/external/Nuvv_verde_black(c).png"
                alt="Nuvv Global Partners"
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
              />
              <div className="hidden lg:flex flex-col pl-2 border-l border-slate-200">
                <span className="text-[11px] font-black uppercase tracking-wider text-nuvv-dark">Global Partners</span>
                <span className="text-[10px] text-slate-500 font-medium leading-none">Brazil Connectivity</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/en/"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isActive('/en/')
                  ? 'text-nuvv-purple bg-nuvv-purple/5'
                  : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
              }`}
            >
              Overview
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  location.pathname.includes('/wholesale') ||
                  location.pathname.includes('/dedicated-internet') ||
                  location.pathname.includes('/multi-site')
                    ? 'text-nuvv-purple bg-nuvv-purple/5'
                    : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
                }`}
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                aria-expanded={solutionsDropdownOpen}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-fade-in-up">
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        onClick={() => setSolutionsDropdownOpen(false)}
                      >
                        <div className="w-9 h-9 rounded-lg bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center flex-shrink-0 group-hover:bg-nuvv-purple group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-900 group-hover:text-nuvv-purple transition-colors">
                            {item.title}
                          </span>
                          <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/en/partners/"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isActive('/en/partners/')
                  ? 'text-nuvv-purple bg-nuvv-purple/5'
                  : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
              }`}
            >
              Partner Program
            </Link>

            <Link
              to="/en/contact/"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isActive('/en/contact/')
                  ? 'text-nuvv-purple bg-nuvv-purple/5'
                  : 'text-slate-700 hover:text-nuvv-purple hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Area: Language Switcher & Request a Quote CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50/80">
              <Globe className="w-3.5 h-3.5 text-nuvv-purple" />
              <span className="text-nuvv-purple font-black">EN</span>
              <span className="text-slate-300">|</span>
              <Link
                to="/"
                className="hover:text-nuvv-purple transition-colors"
                title="Versão em Português (Brasil)"
              >
                PT
              </Link>
            </div>

            {/* CTA Button */}
            {onOpenRfqModal ? (
              <button
                type="button"
                onClick={onOpenRfqModal}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/en/contact/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/"
              className="text-xs font-bold text-slate-600 px-2 py-1 rounded bg-slate-100"
            >
              PT
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="space-y-1">
            <Link
              to="/en/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Overview
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-3 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                Connectivity Solutions
              </span>
              <div className="space-y-1 mt-1">
                {solutions.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-nuvv-purple"
                  >
                    • {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/en/partners/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50 border-t border-slate-100"
            >
              Partner Program
            </Link>

            <Link
              to="/en/contact/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Contact & RFQ
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <Link
              to="/en/contact/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-nuvv-purple text-white text-sm font-black shadow-md text-center"
            >
              <span>Request a Quote / Circuit Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
