import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Eye,
  Camera,
  Wifi,
  Users,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Building2,
  Home,
  Store,
  MapPin,
  Megaphone,
  Radio,
  Layers,
  Smartphone,
  Cloud,
  Bell,
  HelpCircle,
  ChevronDown,
  FileText,
  BadgePercent,
  Check,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { organizationSchema } from '../data/seoSchemas';
import { siteConfig } from '../data/siteConfig';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { PartnerCarousel } from '../components/common/PartnerCarousel';

interface PosteInteligentePageProps {
  onOpenLeadModal: (serviceName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const PosteInteligente: React.FC<PosteInteligentePageProps> = ({
  onOpenLeadModal,
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [activeImage, setActiveImage] = useState<'condominio' | 'mapa'>('condominio');
  const [isHovered, setIsHovered] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Auto-slide entre as duas imagens reais
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 'condominio' ? 'mapa' : 'condominio'));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleOpenWhatsApp = (assunto?: string) => {
    const text = assunto
      ? `Olá! Gostaria de informações sobre o Poste de Monitoramento Inteligente Nuvv para: ${assunto}.`
      : 'Olá! Gostaria de saber mais sobre o Poste de Monitoramento Inteligente da Nuvv e solicitar um projeto.';
    window.open(
      `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const handleRequestQuote = (modelo: string) => {
    onOpenLeadModal(`Poste de Monitoramento Inteligente Nuvv - ${modelo}`);
  };

  const POSTE_FAQS = [
    {
      q: 'O que é o Poste de Monitoramento Inteligente Nuvv?',
      a: 'É uma solução integrada de infraestrutura que reúne câmeras de alta resolução 360°, conectividade em fibra óptica dedicada, inteligência artificial para detecção de eventos e gravação contínua em nuvem 24/7. O poste é o meio físico instalado no local de convivência; o produto é o serviço completo de segurança, conectividade e acompanhamento pela plataforma Nuvv.',
    },
    {
      q: 'Como funciona para condomínios residenciais e vilas?',
      a: 'O condomínio contrata o poste para reforçar a vigilância nas áreas internas ou na rua em frente (portaria, calçadas e acessos de pedestres e veículos). As imagens ao vivo e as gravações em nuvem são disponibilizadas diretamente aos condôminos pelo App Nuvv Guard, conforme o regulamento do condomínio, com custo facilmente absorvido na taxa condominial.',
    },
    {
      q: 'Como os moradores de uma rua podem se organizar para implantar o poste?',
      a: 'Um grupo de vizinhos da mesma rua ou travessa pode se reunir e solicitar a implantação de um ou mais postes em pontos estratégicos da via. O investimento e a mensalidade do serviço são compartilhados entre os participantes, permitindo que cada família pague um valor extremamente acessível por um sistema profissional que cobre as esquinas e frentes das casas.',
    },
    {
      q: 'Como funciona a parceria com investimento da Nuvv em áreas públicas e comerciais?',
      a: 'Para praças, centros comerciais, feiras ou vias públicas com grande circulação de pessoas, a Nuvv pode arcar com parte ou a totalidade do investimento de implantação da infraestrutura em troca de contrapartidas, como espaço publicitário no próprio poste, oferta de Wi-Fi público/social integrado e patrocínio de empresas locais.',
    },
    {
      q: 'O que acontece em caso de falta de energia ou vandalismo?',
      a: 'As gravações são enviadas continuamente em tempo real para o Data Center da Nuvv na nuvem. Mesmo que o poste sofra vandalismo físico ou corte de energia, as imagens gravadas até o exato instante permanecem 100% preservadas e seguras na nuvem para consulta imediata.',
    },
  ];

  return (
    <div className="space-y-0 animate-fade-in bg-white text-gray-900">
      <SEO
        title="Poste de Monitoramento Inteligente Nuvv - Segurança para Condomínios, Ruas e Espaços Públicos"
        description="Segurança inteligente onde ela mais importa. Conectividade em fibra óptica, câmeras 360°, inteligência artificial e Wi-Fi integrados em uma infraestrutura para condomínios, bairros e áreas comerciais."
        keywords={[
          'poste de monitoramento inteligente',
          'poste inteligente nuvv',
          'vigilancia colaborativa',
          'segurança para condominios',
          'monitoramento de ruas e bairros',
          'cameras 360 na rua',
          'poste com wifi e camera',
          'nuvv guard postes',
        ]}
        canonicalUrl="https://nuvv.com.br/postes"
        schema={[organizationSchema]}
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-nuvv-dark-deep via-slate-900 to-nuvv-dark text-white pt-10 pb-20 sm:pt-14 sm:pb-28">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-nuvv-purple/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-nuvv-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link to="/guard" className="hover:text-white transition-colors">Nuvv Guard</Link>
            <span>/</span>
            <span className="text-nuvv-green font-bold">Poste de Monitoramento Inteligente</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-nuvv-green/40 text-nuvv-green text-xs font-black uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-nuvv-green" />
                <span>INFRAESTRUTURA INTELIGENTE NUVV</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Segurança inteligente onde ela{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-green via-emerald-300 to-indigo-300">
                  mais importa.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-xl">
                A tecnologia Nuvv agora está na rua. Câmeras, conectividade em fibra óptica, inteligência artificial e Wi-Fi reunidos em uma infraestrutura criada para transformar condomínios, ruas, bairros e áreas de grande circulação em espaços mais protegidos e conectados.
              </p>

              {/* Quick Pillars Pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 font-medium">
                  🏢 Condomínios
                </span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 font-medium">
                  🏘️ Ruas e Bairros
                </span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 font-medium">
                  🏪 Corredores Comerciais
                </span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 font-medium">
                  🏙️ Áreas Públicas
                </span>
              </div>

              {/* Hero Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => handleRequestQuote('Geral')}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-nuvv-green to-emerald-500 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-xl shadow-nuvv-green/20 active:scale-98 cursor-pointer"
                >
                  <span>Solicitar Projeto para Minha Região</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#modelos-implantacao"
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Ver Modelos de Implantação</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hero Right: Auto-alternating Real Visuals */}
            <div
              className="lg:col-span-6 space-y-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-nuvv-purple/40 shadow-2xl shadow-nuvv-purple/20 bg-slate-900 min-h-[440px] sm:min-h-[500px] flex items-center justify-center">
                
                {/* Image 1: Condomínio View */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeImage === 'condominio'
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src="/images/services/poste_nuvv_condominio.jpg"
                    alt="Poste de Monitoramento Nuvv em frente a Condomínio"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Overlays */}
                  <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-nuvv-green/40 flex items-center space-x-2 z-20">
                    <span className="w-2.5 h-2.5 rounded-full bg-nuvv-green animate-ping" />
                    <span className="text-[11px] font-black text-white">Vigilância Condominial 24h</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-nuvv-purple/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center space-x-1.5 text-[11px] font-bold text-white shadow z-20">
                    <Wifi className="w-3.5 h-3.5 text-nuvv-green" />
                    <span>Wi-Fi Integrado</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center justify-between text-xs z-20">
                    <div>
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-nuvv-green" />
                        <span>Rua do Condomínio Monitorada</span>
                      </div>
                      <div className="text-[10px] text-gray-300">
                        Imagens liberadas para todos os condôminos no App Nuvv Guard
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-600 text-white px-2.5 py-1 rounded-lg">
                      FIBRA ÓPTICA
                    </span>
                  </div>
                </div>

                {/* Image 2: App Map View */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    activeImage === 'mapa'
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src="/images/services/poste_nuvv_mapa_app.jpg"
                    alt="Mapa de Postes e Câmeras Nuvv Guard no Celular"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-nuvv-purple/40 flex items-center space-x-2 z-20">
                    <Smartphone className="w-3.5 h-3.5 text-nuvv-purple" />
                    <span className="text-[11px] font-black text-white">App Nuvv Guard • Mapa Ativo</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center justify-between text-xs z-20">
                    <div>
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-nuvv-purple" />
                        <span>Rede de Postes e Câmeras Conectadas</span>
                      </div>
                      <div className="text-[10px] text-gray-300">
                        Acompanhamento em tempo real no mapa pelos moradores
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-nuvv-purple text-white px-2.5 py-1 rounded-lg">
                      MAPA AO VIVO
                    </span>
                  </div>
                </div>

              </div>

              {/* Alternating Controls & Indicator */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImage('condominio')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer relative overflow-hidden ${
                    activeImage === 'condominio'
                      ? 'bg-nuvv-purple text-white border-nuvv-purple shadow-md shadow-nuvv-purple/30'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>1. Visão no Condomínio</span>
                  {activeImage === 'condominio' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-nuvv-green animate-ping ml-1" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveImage('mapa')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer relative overflow-hidden ${
                    activeImage === 'mapa'
                      ? 'bg-nuvv-purple text-white border-nuvv-purple shadow-md shadow-nuvv-purple/30'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>2. Visualização no Mapa do App</span>
                  {activeImage === 'mapa' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-nuvv-green animate-ping ml-1" />
                  )}
                </button>
              </div>

              <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-nuvv-green" />
                <span>Alternando automaticamente a cada 5s (passe o mouse para pausar)</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. O QUE O POSTE NUVV ENTREGA? (A PROPOSTA DE VALOR INTEGRADA) */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-nuvv-purple-light px-3.5 py-1 rounded-full border border-nuvv-purple/20">
              PROPOSTA DE VALOR COMPLETA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark">
              Segurança. Conectividade. Inteligência.{' '}
              <span className="text-nuvv-purple">Em um único ponto.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              O poste é o meio físico; o produto é o serviço de segurança, conectividade e acompanhamento que ele viabiliza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Câmeras de Monitoramento 360°</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Múltiplas lentes Full HD de alta precisão cobrindo toda a circunferência da via, calçadas e portarias, sem pontos cegos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">100% Fibra Óptica Nuvv</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Transmissão dedicada de alta velocidade para gravação e visualização ao vivo sem oscilações e sem travar.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Wi-Fi Hotspot Integrado</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Antena de alta densidade no topo do poste para fornecer internet sem fio onde houver convivência ou circulação.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Recursos Inteligentes & Análise</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Detecção inteligente de pessoas e eventos suspeitos, gerando alertas preventivos e visão noturna de longo alcance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Acesso Coletivo no App Nuvv Guard</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Moradores ou comerciantes têm acesso direto às imagens no smartphone com permissões gerenciadas e mapa interativo.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-nuvv-dark">Gravação Blindada em Nuvem</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Armazenamento 24/7 seguro direto no Data Center da Nuvv, imune a furtos, quebras ou vandalismo do equipamento local.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ONDE PODEMOS INSTALAR? (OS 4 CENÁRIOS DE POSTES.MK) */}
      {/* ============================================================ */}
      <section id="modelos-implantacao" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              VERSATILIDADE DE IMPLANTAÇÃO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark">
              Onde o Poste Inteligente pode ser instalado?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Um mesmo sistema profissional desenvolvido para atender com excelência 4 diferentes cenários:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Cenário 1: Condomínios */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-gray-200/80 shadow-md hover:border-nuvv-purple/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-nuvv-purple/10 text-nuvv-purple px-2.5 py-1 rounded-full border border-nuvv-purple/20">
                    MODELO 01
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-nuvv-dark">Condomínios & Vilas Fechadas</h3>
                  <div className="text-xs font-bold text-nuvv-purple mt-0.5">Segurança dentro e no entorno do condomínio</div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Para condomínios residenciais, comerciais, vilas e conjuntos habitacionais. O condomínio contrata um ou mais postes para monitorar acessos, calçadas, portarias, estacionamentos e pontos estratégicos, disponibilizando as imagens para todos os condôminos no App Nuvv Guard.
                </p>

                <div className="space-y-2 pt-2 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Monitoramento de áreas internas e no entorno da calçada</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Mais segurança nos acessos de pedestres, carros e entregadores</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Imagens disponíveis para consulta conforme as regras do condomínio</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Infraestrutura profissional sem precisar desenvolver solução própria</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRequestQuote('Condomínio')}
                className="w-full py-3.5 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-nuvv-purple/20 cursor-pointer"
              >
                <span>Levar para meu Condomínio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cenário 2: Ruas e Bairros */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-gray-200/80 shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Home className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                    MODELO 02
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-nuvv-dark">Ruas & Bairros Residenciais</h3>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">Uma rua inteira conectada à segurança</div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Para ruas abertas, travessas e comunidades de moradores. Vizinhos se unem para implantar postes em esquinas e pontos estratégicos, com custo compartilhado entre as famílias para viabilizar monitoramento profissional acessível a todos.
                </p>

                <div className="space-y-2 pt-2 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Monitoramento de pontos estratégicos e esquinas da rua</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Mais proteção para moradores, pedestres e veículos estacionados</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Visualização e acompanhamento coletivo pelo aplicativo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-nuvv-green flex-shrink-0 mt-0.5" />
                    <span>Expansão contínua conforme novas ruas vizinhas aderem</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRequestQuote('Rua / Moradores')}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>Quero levar para minha Rua</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cenário 3: Empresas e Corredores Comerciais */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-gray-200/80 shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Store className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
                    MODELO 03
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-nuvv-dark">Empresas & Corredores Comerciais</h3>
                  <div className="text-xs font-bold text-amber-600 mt-0.5">Mais segurança para quem trabalha e circula</div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Lojas, consultórios, galpões e estabelecimentos de uma mesma região podem participar de um projeto coletivo de monitoramento, protegendo vitrines, calçadas, clientes e funcionários, além de possibilitar Wi-Fi e mídia para o comércio.
                </p>

                <div className="space-y-2 pt-2 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Proteção das calçadas, frentes de lojas e pátios de carga</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Divisão de custos entre 10, 20 ou mais estabelecimentos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Wi-Fi para clientes e espaço de publicidade local no poste</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Presença ostensiva que inibe ações criminosas no comércio</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRequestQuote('Corredor Comercial')}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-600/20 cursor-pointer"
              >
                <span>Proteger meu Corredor Comercial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cenário 4: Espaços Públicos e Grande Circulação */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-gray-200/80 shadow-md hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-full border border-cyan-200">
                    MODELO 04 • PARCERIA NUVV
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-nuvv-dark">Espaços Públicos & Convivência</h3>
                  <div className="text-xs font-bold text-cyan-600 mt-0.5">Segurança inteligente para áreas de grande circulação</div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Para praças, centros cívicos, áreas de convivência e espaços urbanos estratégicos. A Nuvv pode assumir parte ou a totalidade do investimento de infraestrutura em troca de espaço publicitário no poste, oferta de Wi-Fi público e apoio local.
                </p>

                <div className="space-y-2 pt-2 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Monitoramento inteligente em pontos de grande fluxo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Wi-Fi gratuito de alta velocidade para a comunidade</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Infraestrutura integrada sem custos de desenvolvimento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Espaço para divulgação e apoio institucional de marcas</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRequestQuote('Espaço Público / Parceria')}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
              >
                <span>Propor uma Parceria</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COMO O PROJETO PODE SER VIABILIZADO? (SEPARANDO ONDE DE COMO PAGAR) */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-nuvv-dark to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-nuvv-green bg-emerald-950/80 border border-nuvv-green/40 px-3.5 py-1 rounded-full">
              MODELOS DE VIABILIZAÇÃO FINANCEIRA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Como o projeto pode ser viabilizado?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              Entendemos que cada localidade tem uma dinâmica própria. Por isso, oferecemos três formas flexíveis de financiamento:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Forma 1: Contratação */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-nuvv-purple/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nuvv-purple/20 text-indigo-300 flex items-center justify-center font-black text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Contratação Direta</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Um condomínio, empresa ou associação assume diretamente a contratação do serviço e a mensalidade, incluindo a manutenção contínua e o suporte Nuvv.
              </p>
              <div className="pt-2 text-[11px] text-gray-400 border-t border-white/10">
                Ideal para condomínios, centros logísticos e empresas com verba definida.
              </div>
            </div>

            {/* Forma 2: Rateio */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-nuvv-green/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-nuvv-green flex items-center justify-center font-black text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Rateio Compartilhado</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Moradores da mesma rua ou comércios vizinhos dividem o valor da mensalidade e da implantação, tornando o investimento individual simbólico.
              </p>
              <div className="pt-2 text-[11px] text-gray-400 border-t border-white/10">
                Ideal para ruas abertas, vilas e grupos de comerciantes parceiros.
              </div>
            </div>

            {/* Forma 3: Parceria Nuvv */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber-500/60 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Parceria Nuvv</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                A Nuvv ou parceiros assumem parte ou todo o investimento em troca de contrapartidas, como espaço publicitário no poste e fornecimento de Wi-Fi.
              </p>
              <div className="pt-2 text-[11px] text-gray-400 border-t border-white/10">
                Ideal para praças, áreas públicas e polos comerciais com grande público.
              </div>
            </div>

          </div>

          {/* Banner Central */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-nuvv-purple/20 via-slate-800 to-nuvv-green/20 border border-white/10 text-center max-w-3xl mx-auto">
            <h4 className="text-base font-bold text-white">Você não compra "um poste com câmera".</h4>
            <p className="text-xs text-gray-300 mt-1">
              Você implanta um <strong>projeto de segurança inteligente completo</strong> planejado sob medida para a sua rua, condomínio ou negócio.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. MONTE UM PROJETO PARA SUA REGIÃO (CTA FINAL) */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-black uppercase tracking-wider text-nuvv-purple bg-nuvv-purple-light px-3.5 py-1 rounded-full border border-nuvv-purple/20">
            PROJETO SOB MEDIDA
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark">
            Conte onde você gostaria de instalar o monitoramento.
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto font-normal">
            Nossa equipe técnica e comercial analisa a viabilidade da via, a disponibilidade de fibra óptica Nuvv e estrutura a proposta ideal para o seu perfil.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => handleRequestQuote('Solicitação Geral de Projeto')}
              className="px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-xl shadow-nuvv-purple/20 cursor-pointer"
            >
              <span>Solicitar Estudo de Implantação</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleOpenWhatsApp('Projeto Poste Inteligente')}
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Falar no WhatsApp com Especialista</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FAQ ESPECÍFICO */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-nuvv-dark">Dúvidas Frequentes sobre o Poste</h3>
            <p className="text-xs text-gray-600">Perguntas comuns sobre instalação, acesso às imagens e viabilização.</p>
          </div>

          <div className="space-y-3">
            {POSTE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm text-nuvv-dark hover:text-nuvv-purple transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-nuvv-purple' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnerCarousel />

      {/* Quick Access */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
