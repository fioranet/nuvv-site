import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { Gauge, FileText, UserCheck } from 'lucide-react';

interface FooterProps {
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadModal }) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const isEmpresarial =
    location.pathname.startsWith('/empresarial') ||
    location.pathname.startsWith('/empresas') ||
    location.pathname.startsWith('/monte-seu-combo-empresarial') ||
    location.pathname.startsWith('/pabx') ||
    location.pathname.startsWith('/telefonia') ||
    location.pathname.startsWith('/social-wifi') ||
    location.pathname.startsWith('/multiatendimento') ||
    location.pathname.startsWith('/seguranca-digital') ||
    location.pathname.startsWith('/comunicacao-inteligente');

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 12-Column Responsive Grid to keep all 5 sections in 1 row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-100 items-start">
          
          {/* Column 1: Brand Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={isEmpresarial ? "/images/external/Nuvv_verde_black(c).png" : "/images/external/nuvv_logo.png"}
                alt="Nuvv"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Na Nuvv, somos mais do que um provedor de internet. Conectamos pessoas, empresas e comunidades com inovação e ultravelocidade.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-2 pt-1">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-nuvv-purple hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-2xs"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-nuvv-purple hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-2xs"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-nuvv-purple hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-nuvv-purple hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-2xs"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-nuvv-purple hover:text-white flex items-center justify-center text-gray-600 transition-all shadow-2xs"
                aria-label="X"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: A Nuvv (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold text-nuvv-dark uppercase tracking-wider mb-3">A Nuvv</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/#sobre" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de enviar meu currículo para trabalhar na Nuvv.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-nuvv-purple transition-colors"
                >
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/viabilidade" className="text-emerald-700 font-bold hover:text-emerald-800 transition-colors">
                  Consulta de Viabilidade
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  Nuvv Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Serviços (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold text-nuvv-dark uppercase tracking-wider mb-3">Serviços</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/residencial" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  Para sua casa
                </Link>
              </li>
              <li>
                <Link to="/empresarial" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  Para sua empresa
                </Link>
              </li>
              <li>
                <Link to="/pabx" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  PABX em Nuvem
                </Link>
              </li>
              <li>
                <Link to="/telefonia" className="text-gray-500 hover:text-nuvv-purple transition-colors">
                  Telefonia Fixa
                </Link>
              </li>
              <li>
                <Link to="/guard" className="text-gray-500 hover:text-nuvv-purple transition-colors font-medium">
                  Nuvv Guard (Segurança)
                </Link>
              </li>
              <li>
                <Link to="/postes" className="text-gray-500 hover:text-nuvv-purple transition-colors font-medium">
                  Poste Inteligente
                </Link>
              </li>
              <li>
                <Link to="/social-wifi" className="text-gray-500 hover:text-nuvv-purple transition-colors font-medium">
                  Hotspot Wi-fi Social
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Cidades Atendidas (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold text-nuvv-dark uppercase tracking-wider mb-3">Cidades</h4>
            <ul className="space-y-1.5 text-[11px] text-gray-500">
              <li>
                <Link to="/cidade/suzano" className="hover:text-nuvv-purple transition-colors">
                  Suzano
                </Link>
              </li>
              <li>
                <Link to="/cidade/mogi-das-cruzes" className="hover:text-nuvv-purple transition-colors">
                  Mogi das Cruzes
                </Link>
              </li>
              <li>
                <Link to="/cidade/poa" className="hover:text-nuvv-purple transition-colors">
                  Poá
                </Link>
              </li>
              <li>
                <Link to="/cidade/ferraz-de-vasconcelos" className="hover:text-nuvv-purple transition-colors">
                  Ferraz de Vasc.
                </Link>
              </li>
              <li>
                <Link to="/cidade/itaquaquecetuba" className="hover:text-nuvv-purple transition-colors">
                  Itaquaquecetuba
                </Link>
              </li>
              <li>
                <Link to="/cidade/sao-paulo" className="hover:text-nuvv-purple transition-colors">
                  São Paulo
                </Link>
              </li>
              <li>
                <Link to="/cidade/guarulhos" className="hover:text-nuvv-purple transition-colors">
                  Guarulhos
                </Link>
              </li>
              <li>
                <Link to="/cidade/aruja" className="hover:text-nuvv-purple transition-colors">
                  Arujá
                </Link>
              </li>
              <li>
                <Link to="/cidade/santa-isabel" className="hover:text-nuvv-purple transition-colors">
                  Santa Isabel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Fale Conosco & CTAs (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold text-nuvv-dark uppercase tracking-wider mb-3">Fale Conosco</h4>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <Link to="/suporte" className="text-gray-500 hover:text-nuvv-purple transition-colors flex items-center space-x-2">
                  <Gauge className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>Teste de Velocidade</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/2via"
                  className="text-gray-600 hover:text-nuvv-purple font-bold transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>2ª Via Rápida & PIX</span>
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.areaClienteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-nuvv-purple transition-colors flex items-center space-x-2"
                >
                  <UserCheck className="w-3.5 h-3.5 text-nuvv-purple" />
                  <span>Área do Cliente</span>
                </a>
              </li>
            </ul>

            <div className="space-y-2">
              <button
                onClick={onOpenLeadModal}
                className="w-full py-2.5 px-4 bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-xs font-bold rounded-xl shadow-md transition-all text-center"
              >
                Assinar Agora
              </button>
              <Link
                to="/suporte"
                className="w-full py-2 px-4 bg-white border border-nuvv-purple/40 text-nuvv-purple hover:bg-indigo-50/50 text-xs font-bold rounded-xl transition-all block text-center"
              >
                Precisa de Suporte?
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, CNPJ and Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 space-y-4 sm:space-y-0">
          <div>
            <span>Nuvv © {currentYear}. Todos os direitos reservados. </span>
            <span className="font-medium text-gray-500">NUVV TECNOLOGIA LTDA – CNPJ: {siteConfig.cnpj}</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/termos" className="hover:text-nuvv-purple transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="hover:text-nuvv-purple transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
