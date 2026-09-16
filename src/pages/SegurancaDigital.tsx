import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { SECURITY_PLANS, SECURITY_FEATURES, SECURITY_FAQS, SecurityPlan } from '../data/securityPlans';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';
import {
  ShieldCheck,
  Shield,
  Lock,
  Server,
  CreditCard,
  HardDrive,
  Cloud,
  Check,
  ArrowRight,
  ArrowLeft,
  Phone,
  Sparkles,
  Laptop,
  Smartphone,
  Key,
  ShieldAlert,
  ChevronDown,
  Building2,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface SegurancaDigitalPageProps {
  onOpenLeadModal: (serviceName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const SegurancaDigital: React.FC<SegurancaDigitalPageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 2);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return ShieldAlert;
      case 'CreditCard':
        return CreditCard;
      case 'Server':
        return Server;
      case 'Cloud':
        return Cloud;
      case 'Key':
        return Key;
      case 'HardDrive':
        return HardDrive;
      default:
        return ShieldCheck;
    }
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Segurança Digital para Empresas | Kaspersky Small Office Security | Nuvv"
        description="Proteja os computadores, celulares e servidores de arquivos da sua empresa contra ransomware, vírus e fraudes financeiras com Kaspersky Small Office Security. Planos a partir de R$ 29,90/mês."
        keywords={[
          'kaspersky small office security',
          'antivirus empresas',
          'segurança digital corporativa',
          'protecao contra ransomware',
          'antivirus para servidor',
          'kaspersky nuvv',
        ]}
        canonicalUrl="https://nuvv.com.br/seguranca-digital"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/50">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/empresarial"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Soluções</span>
                </Link>

                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>KASPERSKY SMALL OFFICE</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.12]">
                Cibersegurança Completa <br className="hidden sm:inline" />
                <span className="text-gradient-green">para Pequenas e Médias Empresas.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Proteção premiada desenvolvida especificamente para empresas de 1 a 50 funcionários. Instalação rápida, fácil de usar (“instale e esqueça”) e sem necessidade de equipe de TI dedicada.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <a
                  href="#planos-seguranca"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all text-center active:scale-98"
                >
                  Ver Planos de Segurança
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre o Kaspersky Small Office Security para minha empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Falar com Consultor B2B</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-emerald-100 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="font-black text-base text-emerald-600 block">100%</span>
                  <span className="text-[10px] text-gray-500 font-medium">Anti-Ransomware</span>
                </div>
                <div>
                  <span className="font-black text-base text-nuvv-dark block">Zero TI</span>
                  <span className="text-[10px] text-gray-500 font-medium">Instalação Simples</span>
                </div>
                <div>
                  <span className="font-black text-base text-emerald-600 block">1 a 50+</span>
                  <span className="text-[10px] text-gray-500 font-medium">Licenças Flexíveis</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card (Slideshow) */}
            <div
              className="lg:col-span-5 relative"
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                {/* Slide 0: Protection Status Checklist */}
                <div
                  className={`absolute inset-0 p-6 sm:p-7 space-y-4 transition-all duration-1000 ease-in-out ${
                    heroSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Status de Proteção Ativa</div>
                        <div className="text-[11px] text-emerald-400 flex items-center space-x-1 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Sistemas Blindados Kaspersky</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      'Defesa Anti-Ransomware com Rollback',
                      'Proteção Bancária Safe Money Ativa',
                      'Servidor de Arquivos Windows Server',
                      'Gerenciador de Senhas & VPN',
                      'Backup Automático em Nuvem',
                    ].map((item, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-between text-xs">
                        <span className="text-gray-200 font-medium text-[11px]">{item}</span>
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 1: Enterprise Security Image */}
                <div
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    heroSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <img
                    src="/images/services/security_1.png"
                    alt="Kaspersky Endpoint Security"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-white/10">
                      KASPERSKY LAB CERTIFIED
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-20">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <span className="font-black text-white block">Blindagem em Tempo Real</span>
                        <span className="text-[10px] text-emerald-300">Detecção Heurística de Ameaças Zero-Day</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      100% Protegido
                    </span>
                  </div>
                </div>

                {/* Slideshow Indicators */}
                <div className="absolute top-4 right-4 z-30 flex space-x-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                  {[0, 1].map((i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlide(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        heroSlide === i ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Value Pillars */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nuvv-dark">Instale e Esqueça</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pronto para uso imediato em computadores, celulares e servidores. A instalação leva minutos e você não precisa entender de TI para manter tudo blindado.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-nuvv-purple text-white flex items-center justify-center shadow-md">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nuvv-dark">Proteção Financeira Safe Money</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Camada extra de segurança para pagamentos, compras corporativas e acesso bancário, protegendo contra roubo de senhas, boletos falsos e clonagem.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-nuvv-dark">Rollback de Arquivos</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Se alguém na sua empresa clicar em um anexo malicioso ou link suspeito, o Kaspersky bloqueia a ameaça e reverte qualquer arquivo alterado para o estado seguro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 sm:py-24 bg-slate-50/70" id="planos-seguranca">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
              Tabela de Planos Corporativos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-3">
              Planos Kaspersky Small Office Security
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Escolha de acordo com o número de computadores e colaboradores da sua empresa. Faturamento mensal direto na fatura Nuvv.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {SECURITY_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between transition-all bg-white ${
                  plan.isPopular
                    ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/30 md:-translate-y-2'
                    : 'border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="min-h-[28px] mb-2">
                    {plan.badge && (
                      <span className="text-[10px] font-extrabold text-white bg-emerald-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-nuvv-dark">{plan.name}</h3>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">{plan.targetAudience}</p>

                  <div className="mb-4 pb-4 border-b border-gray-100 whitespace-nowrap">
                    <span className="text-3xl font-black text-nuvv-dark">
                      R$&nbsp;{plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold ml-1">/mês</span>
                  </div>

                  {/* Dispositivos Protegidos com Tooltips Informativos */}
                  <div className="space-y-3 mb-5">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200/80 space-y-2">
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                        <span>Dispositivos Protegidos</span>
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="flex items-center justify-between gap-1 text-xs font-black text-gray-800">
                        {/* Desktop Tooltip */}
                        <div className="group/item relative flex-1 flex items-center justify-center space-x-1 bg-white px-2 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-xs transition-all cursor-help">
                          <Laptop className="w-3.5 h-3.5 text-emerald-600" />
                          <span>× {plan.userCount}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-900/95 backdrop-blur-sm text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-50 text-left">
                            <div className="font-bold text-emerald-400 mb-0.5">{plan.userCount} Computadores (PC / Mac)</div>
                            <div>Proteção completa de estações de trabalho e notebooks contra vírus, ransomware e vazamento de dados.</div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                          </div>
                        </div>

                        {/* Mobile Tooltip */}
                        <div className="group/item relative flex-1 flex items-center justify-center space-x-1 bg-white px-2 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-xs transition-all cursor-help">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>× {plan.userCount}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-900/95 backdrop-blur-sm text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-50 text-left">
                            <div className="font-bold text-emerald-400 mb-0.5">{plan.userCount} Dispositivos Móveis</div>
                            <div>Antivírus, antirroubo e navegação protegida para smartphones e tablets corporativos (Android / iOS).</div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                          </div>
                        </div>

                        {/* Server Tooltip */}
                        <div className="group/item relative flex-1 flex items-center justify-center space-x-1 bg-white px-2 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-xs transition-all cursor-help">
                          <Server className="w-3.5 h-3.5 text-emerald-600" />
                          <span>× {plan.userCount === 50 ? 5 : plan.userCount === 25 ? 3 : 1}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-900/95 backdrop-blur-sm text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-50 text-left">
                            <div className="font-bold text-emerald-400 mb-0.5">{plan.userCount === 50 ? '5 Servidores' : plan.userCount === 25 ? '3 Servidores' : '1 Servidor'} de Arquivos</div>
                            <div>Proteção dedicada para Windows Server contra invasões e sequestro de arquivos compartilhados na rede da empresa.</div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Serviços Inclusos (VPN Premium + Gerenciador de Senhas) */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200/80 space-y-1.5 text-[11px] text-gray-800 font-bold">
                      <div className="text-[10px] uppercase font-extrabold text-gray-500 tracking-wider mb-1 flex items-center justify-between">
                        <span>Serviços Inclusos</span>
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                      </div>

                      {/* Password Manager Tooltip */}
                      <div className="group/item relative flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 transition-all cursor-help">
                        <div className="flex items-center space-x-1.5">
                          <Key className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="font-semibold text-gray-800">Gerenciador de senhas</span>
                        </div>
                        <span className="font-black text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">× {plan.userCount}</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-900/95 backdrop-blur-sm text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-50 text-left">
                          <div className="font-bold text-emerald-400 mb-0.5">{plan.userCount} Gerenciadores de Senha</div>
                          <div>Cofre blindado para gerar e guardar senhas seguras e preencher acessos corporativos automaticamente.</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>

                      {/* VPN Tooltip */}
                      <div className="group/item relative flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 transition-all cursor-help">
                        <div className="flex items-center space-x-1.5">
                          <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="font-semibold text-gray-800">VPN Premium Ilimitada</span>
                        </div>
                        <span className="font-black text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">× {plan.userCount}</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-slate-900/95 backdrop-blur-sm text-white text-[11px] font-normal leading-relaxed rounded-xl shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-50 text-left">
                          <div className="font-bold text-emerald-400 mb-0.5">{plan.userCount} Licenças de VPN Premium</div>
                          <div>Navegação 100% criptografada e tráfego ilimitado de alta velocidade para conexões seguras em qualquer rede Wi-Fi.</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-gray-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenLeadModal(
                      `Kaspersky Small Office Security - ${plan.name} (R$ ${plan.price.toFixed(2).replace('.', ',')}/mês)`
                    )
                  }
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 ${
                    plan.isPopular
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
                      : 'bg-nuvv-dark text-white hover:bg-nuvv-dark/90 shadow-nuvv-dark/20'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Visual Specification Comparison Breakdown */}
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Comparativo de Dispositivos & Serviços
                </span>
                <h3 className="text-xl font-black text-nuvv-dark mt-1">
                  O que está incluso em cada licença?
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Kaspersky Small Office Security</span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Row 1: Quantidade de dispositivos protegidos */}
              <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start space-x-3 w-full lg:w-80 flex-shrink-0">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-nuvv-dark">Quantidade de dispositivos protegidos</h4>
                    <p className="text-xs text-gray-500">Passe o mouse ou toque nos ícones para ver detalhes de cada tipo de dispositivo.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 w-full lg:flex-1">
                  {SECURITY_PLANS.map((p) => (
                    <div key={p.id} className="p-3.5 bg-slate-50/90 rounded-2xl border border-gray-200/80 text-center flex flex-col justify-between shadow-2xs">
                      <span className="text-xs font-black text-gray-800 block mb-2">{p.name}</span>
                      <div className="grid grid-cols-3 gap-1.5 text-gray-800">
                        {/* Desktop */}
                        <div className="group/tab relative p-1.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 cursor-help flex flex-col items-center justify-center shadow-2xs transition-colors">
                          <Laptop className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                          <span className="text-[11px] font-black leading-tight">×{p.userCount}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-normal leading-tight rounded-lg shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/tab:opacity-100 group-hover/tab:visible transition-all duration-150 z-50 text-left">
                            <span className="font-bold text-emerald-400 block mb-0.5">{p.userCount} PCs / Macs</span>
                            Proteção completa para computadores Windows e Mac.
                          </div>
                        </div>

                        {/* Mobile */}
                        <div className="group/tab relative p-1.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 cursor-help flex flex-col items-center justify-center shadow-2xs transition-colors">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                          <span className="text-[11px] font-black leading-tight">×{p.userCount}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-normal leading-tight rounded-lg shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/tab:opacity-100 group-hover/tab:visible transition-all duration-150 z-50 text-left">
                            <span className="font-bold text-emerald-400 block mb-0.5">{p.userCount} Celulares</span>
                            Antivírus e proteção para Android e iOS.
                          </div>
                        </div>

                        {/* Server */}
                        <div className="group/tab relative p-1.5 rounded-xl bg-white border border-gray-200 hover:border-emerald-500 cursor-help flex flex-col items-center justify-center shadow-2xs transition-colors">
                          <Server className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
                          <span className="text-[11px] font-black leading-tight">×{p.userCount === 50 ? 5 : p.userCount === 25 ? 3 : 1}</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-normal leading-tight rounded-lg shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/tab:opacity-100 group-hover/tab:visible transition-all duration-150 z-50 text-left">
                            <span className="font-bold text-emerald-400 block mb-0.5">{p.userCount === 50 ? '5 Servidores' : p.userCount === 25 ? '3 Servidores' : '1 Servidor'} de Arquivo</span>
                            Proteção dedicada para Windows Server.
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Serviços incluídos (VPN Premium + Gerenciador de Senhas) */}
              <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start space-x-3 w-full lg:w-80 flex-shrink-0">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-nuvv-dark">Serviços e Recursos Inclusos</h4>
                    <p className="text-xs text-gray-500">VPN Premium ilimitada e cofres de senhas blindados individuais.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 w-full lg:flex-1">
                  {SECURITY_PLANS.map((p) => (
                    <div key={p.id} className="p-3.5 bg-slate-50/90 rounded-2xl border border-gray-200/80 text-center flex flex-col justify-between shadow-2xs">
                      <span className="text-xs font-black text-gray-800 block mb-2">{p.name}</span>
                      <div className="space-y-1.5">
                        {/* Password manager row */}
                        <div className="group/tab relative text-xs font-bold text-gray-700 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 cursor-help flex items-center justify-between shadow-2xs transition-colors">
                          <div className="flex items-center space-x-1.5 min-w-0">
                            <Key className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="text-[11px] truncate">Senhas</span>
                          </div>
                          <strong className="text-[11px] font-black text-gray-900 ml-1">×{p.userCount}</strong>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-normal leading-tight rounded-lg shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/tab:opacity-100 group-hover/tab:visible transition-all duration-150 z-50 text-left">
                            <span className="font-bold text-emerald-400 block mb-0.5">{p.userCount} Gerenciadores de Senha</span>
                            Cofre blindado para guardar senhas de sistemas e bancos.
                          </div>
                        </div>

                        {/* VPN row */}
                        <div className="group/tab relative text-xs font-bold text-gray-700 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-500 cursor-help flex items-center justify-between shadow-2xs transition-colors">
                          <div className="flex items-center space-x-1.5 min-w-0">
                            <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="text-[11px] truncate">VPN</span>
                          </div>
                          <strong className="text-[11px] font-black text-gray-900 ml-1">×{p.userCount}</strong>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-normal leading-tight rounded-lg shadow-xl border border-slate-700 pointer-events-none opacity-0 invisible group-hover/tab:opacity-100 group-hover/tab:visible transition-all duration-150 z-50 text-left">
                            <span className="font-bold text-emerald-400 block mb-0.5">{p.userCount} Licenças VPN Premium</span>
                            Conexão criptografada de alta velocidade sem limites de dados.
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Proteção Gerenciada */}
              <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start space-x-3 w-full lg:w-80 flex-shrink-0">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-nuvv-dark">Proteção Gerenciada em Nuvem</h4>
                    <p className="text-xs text-gray-500">Portal web centralizado, instalação remota por link e monitoramento 24/7.</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50/90 rounded-2xl border border-gray-200/80 flex items-center space-x-3 text-xs font-bold text-emerald-700 w-full lg:flex-1 shadow-2xs">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Incluso nativamente em todos os planos (Sem necessidade de servidor local de TI)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner for Custom / Enterprise Projects */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-nuvv-dark text-white max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Projetos Especiais Corporativos
              </span>
              <h3 className="text-2xl font-black">Sua empresa possui mais de 50 computadores?</h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Atendemos redes corporativas de grande porte com Kaspersky Endpoint Security Cloud Plus e gestão SOC 24/7.
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá! Gostaria de consultar uma proposta de segurança digital para mais de 50 computadores.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm whitespace-nowrap shadow-md transition-all flex items-center space-x-2 flex-shrink-0"
            >
              <span>Falar com Especialista</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Recursos de Ponta a Ponta
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-3">
              Tudo o que sua Empresa Precisa para Ficar Segura
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Tecnologia de cibersegurança mais testada e mais premiada do mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SECURITY_FEATURES.map((feat) => {
              const Icon = getFeatureIcon(feat.iconName);
              return (
                <div
                  key={feat.id}
                  className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 hover:border-emerald-400 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/60 px-2.5 py-0.5 rounded-full uppercase">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-nuvv-dark">{feat.title}</h3>
                  <p className="text-xs font-bold text-emerald-700">{feat.tagline}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark">
              Perguntas Frequentes sobre Segurança Digital
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Tire suas dúvidas sobre a implantação do Kaspersky Small Office Security.
            </p>
          </div>

          <div className="space-y-3">
            {SECURITY_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-nuvv-dark hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PartnerCarousel />

      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
