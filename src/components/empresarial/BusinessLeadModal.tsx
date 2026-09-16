import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { siteConfig } from '../../data/siteConfig';
import { apiService } from '../../services/apiService';
import { CorporateSolution } from '../../data/services';
import {
  Calendar,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Send,
  Cloud,
  Router,
  Network,
  Clock,
  MessageSquare,
  Wifi,
  ShieldCheck,
  Radio,
  Server,
  Cpu,
  Bot,
  Sparkles,
} from 'lucide-react';

interface BusinessLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: CorporateSolution | null;
  cityName?: string;
}

export const BusinessLeadModal: React.FC<BusinessLeadModalProps> = ({
  isOpen,
  onClose,
  solution,
  cityName = 'Suzano',
}) => {
  const navigate = useNavigate();
  const [selectedFlow, setSelectedFlow] = useState<'overview' | 'email' | 'meeting' | 'success'>('overview');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');

  if (!solution) return null;

  const iconMap: Record<string, React.ElementType> = {
    Router,
    Cloud,
    PhoneCall,
    Network,
    Clock,
    MessageSquare,
    Wifi,
    ShieldCheck,
    Radio,
    Send,
    Server,
    Cpu,
    Bot,
  };

  const IconComponent = iconMap[solution.iconName] || Cloud;

  const handleReset = () => {
    setSelectedFlow('overview');
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setCnpj('');
    onClose();
  };

  const handleWhatsAppDirect = (actionText: string = 'Consultoria Corporativa') => {
    const text = `Olá! Gostaria de falar sobre a solução corporativa *${solution.title}* (${actionText}) para minha empresa em ${cityName}.`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
    handleReset();
  };

  const sId = solution.id.toLowerCase();
  const sTitle = solution.title.toLowerCase();

  // Determine if this solution has a dedicated page
  const isPabx = sId.includes('pabx') || sTitle.includes('pabx');
  const isTelefonia = sId.includes('telefonia') || sTitle.includes('telefonia') || sId.includes('tronco');
  const isVision = sId.includes('vision') || sTitle.includes('vision') || sTitle.includes('cftv');
  const isSocialWifi =
    sId.includes('social') ||
    sId.includes('hotspot') ||
    sTitle.includes('social') ||
    sTitle.includes('hotspot');
  const isSegurancaDigital =
    sId.includes('seguranca') ||
    sId.includes('antivirus') ||
    sTitle.includes('segurança') ||
    sTitle.includes('kaspersky');
  const isComunicacao =
    sId.includes('comunicacao') ||
    sId.includes('mensageria') ||
    sTitle.includes('comunicação') ||
    sTitle.includes('mensageria');
  const isMultiatendimento =
    sId.includes('multi') ||
    sId.includes('chatbot') ||
    sTitle.includes('multi') ||
    sTitle.includes('chatbot');
  const isDataCenter =
    sId.includes('data-center') ||
    sId.includes('colocation') ||
    sTitle.includes('data center') ||
    sTitle.includes('co-location');

  const hasDedicatedPage =
    isPabx ||
    isTelefonia ||
    isVision ||
    isSocialWifi ||
    isSegurancaDigital ||
    isComunicacao ||
    isMultiatendimento;

  const getExploreButtonText = () => {
    if (isPabx) return 'Explorar PABX & Planos';
    if (isTelefonia) return 'Explorar Telefonia & Planos';
    if (isVision) return 'Explorar Nuvv Guard & Planos';
    if (isSocialWifi) return 'Explorar Hotspot Wi-Fi & Planos';
    if (isMultiatendimento) return 'Explorar Multiatendimento & Planos';
    if (isSegurancaDigital) return 'Explorar Segurança Digital & Planos';
    if (isComunicacao) return 'Explorar Comunicação & Planos';
    return 'Explorar Solução & Planos';
  };

  const handleNavigateToDedicatedPage = () => {
    handleReset();

    if (isPabx) {
      navigate('/pabx');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isTelefonia) {
      navigate('/telefonia');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isVision) {
      navigate('/guard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isSocialWifi) {
      navigate('/social-wifi');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isMultiatendimento) {
      navigate('/multiatendimento');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isSegurancaDigital) {
      navigate('/seguranca-digital');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isComunicacao) {
      navigate('/comunicacao-inteligente');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to corporate plans section
      const el = document.getElementById('planos-empresa');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiService.logCommercialLead({
      source_page: `B2B Soluções - ${solution.title}`,
      name,
      company,
      cnpj,
      phone,
      email,
      details: `Cidade: ${cityName} | Solução: ${solution.title} (${solution.shortDescription})`,
    });
    setSelectedFlow('success');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} maxWidth="4xl" showCloseButton={true}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch p-2 sm:p-4">
        {/* Left Side: Solution Card, Description & Clean Benefit Cards */}
        <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header Image with Overlay Icon & Title */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 sm:h-52 bg-slate-900">
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-5 text-white">
                <div className="flex items-center space-x-2.5">
                  <IconComponent className="w-5 h-5 text-nuvv-green flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">{solution.title}</h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {solution.fullDescription}
            </p>
          </div>

          {/* Benefits / Services Separation Section */}
          {solution.serviceItems && solution.featureItems ? (
            <div className="space-y-4 pt-1">
              <div>
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
                  <Server className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SERVIÇOS DE DATA CENTER & CO-LOCATION</span>
                </span>
                <div className="space-y-2">
                  {solution.serviceItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white border border-gray-200/80 rounded-2xl shadow-2xs flex items-center space-x-2.5 text-xs font-semibold text-gray-800 hover:border-emerald-300 transition-colors"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-black text-indigo-800 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>INFRAESTRUTURA, SEGURANÇA & ACESSO</span>
                </span>
                <div className="space-y-2">
                  {solution.featureItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white border border-gray-200/80 rounded-2xl shadow-2xs flex items-center space-x-2.5 text-xs font-medium text-gray-700 hover:border-indigo-300 transition-colors"
                    >
                      <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block mb-3">
                PRINCIPAIS BENEFÍCIOS
              </span>
              <div className="space-y-2.5">
                {solution.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-gray-200/80 rounded-2xl shadow-2xs flex items-center space-x-3 text-xs sm:text-sm font-medium text-gray-800 hover:border-emerald-300 transition-colors"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Decision & Plan Navigation Hub */}
        <div className="md:col-span-6 md:border-l md:border-gray-100 md:pl-8 flex flex-col justify-start pt-1 sm:pt-2">
          {selectedFlow === 'overview' && (
            <div className="space-y-5 text-center py-2 sm:py-4">
              <div className="space-y-2 max-w-sm mx-auto">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark">
                  {isDataCenter
                    ? 'Data Center & Co-location'
                    : isMultiatendimento
                    ? 'WhatsApp Multi-Atendente'
                    : isComunicacao
                    ? 'Mensageria RCS & Agente de Voz IA'
                    : isSegurancaDigital
                    ? 'Kaspersky Small Office'
                    : hasDedicatedPage
                    ? 'Conheça Nossos Planos'
                    : 'Soluções Sob Medida'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {isDataCenter
                    ? 'Hospede seus servidores físicos, crie VPS em nuvem ou proteja seus dados com backups automáticos em infraestrutura Tier III segura.'
                    : isPabx
                    ? 'Descubra a solução ideal para o tamanho da sua empresa, desde pequenos escritórios até grandes call centers.'
                    : isTelefonia
                    ? 'Linhas IP, 0800 e SIP Trunk com a melhor qualidade e economia do mercado.'
                    : isVision
                    ? 'Gravação de câmeras em nuvem sem abrir portas no roteador, com acesso ao vivo grátis e opção de comodato.'
                    : isSocialWifi
                    ? 'Transforme seu Wi-Fi em uma máquina de captação de leads, automação no WhatsApp e vendas recorrentes.'
                    : isMultiatendimento
                    ? 'Conecte múltiplos atendentes em 1 número oficial de WhatsApp com CRM Kanban, Chatbots No-Code e IA de Voz 24/7.'
                    : isSegurancaDigital
                    ? 'Proteção avançada Kaspersky contra ransomware, cofres de senhas blindados e VPNs Premium para 5 a 50 usuários.'
                    : isComunicacao
                    ? 'Eleve suas vendas e atendimento com Mensageria RCS/SMS oficial e Agentes de Voz com Inteligência Artificial 24/7 integrados ao PABX.'
                    : `Projetos desenhados sob medida para atender a infraestrutura e a criticidade do seu negócio em ${cityName}.`}
                </p>
              </div>

              {/* Main Action Buttons */}
              <div className="space-y-3.5 max-w-xs mx-auto">
                {hasDedicatedPage ? (
                  <>
                    <button
                      type="button"
                      onClick={handleNavigateToDedicatedPage}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white font-black text-sm shadow-md hover:shadow-lg shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all active:scale-98"
                    >
                      <span>{getExploreButtonText()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="space-y-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppDirect('Atendimento Comercial Consultivo')}
                        className="text-xs sm:text-sm font-bold text-gray-500 hover:text-emerald-700 transition-colors block mx-auto py-1"
                      >
                        Falar com Consultor agora
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedFlow('email')}
                        className="text-xs font-semibold text-gray-400 hover:text-nuvv-dark transition-colors block mx-auto"
                      >
                        Ou receber proposta por e-mail
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleWhatsAppDirect(isDataCenter ? 'Proposta Data Center & Co-location' : 'Consultoria Corporativa')}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-black text-sm shadow-md hover:shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-100" />
                      <span>
                        {isDataCenter
                          ? 'Falar com Especialista em Data Center'
                          : 'Falar com Consultor no WhatsApp'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFlow('email')}
                      className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                    >
                      <Mail className="w-4 h-4 text-slate-600" />
                      <span>Solicitar Proposta por E-mail</span>
                    </button>

                    <a
                      href={`tel:${siteConfig.phoneRaw || '1147998080'}`}
                      className="text-xs font-semibold text-gray-400 hover:text-emerald-700 transition-colors block mx-auto pt-1"
                    >
                      Ou ligue: {siteConfig.phone || '(11) 4799-8080'}
                    </a>
                  </>
                )}
              </div>
            </div>
          )}

          {selectedFlow === 'email' && (
            <form onSubmit={handleSubmitEmail} className="space-y-3.5 my-auto py-4">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                <h4 className="text-sm font-bold text-nuvv-dark">Receber Proposta por E-mail</h4>
                <button
                  type="button"
                  onClick={() => setSelectedFlow('overview')}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  Voltar
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome da empresa"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">CNPJ (Opcional)</label>
                  <input
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">WhatsApp / Celular com DDD *</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                Solicitar Apresentação e Proposta
              </button>
            </form>
          )}

          {selectedFlow === 'success' && (
            <div className="text-center py-8 space-y-4 my-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-lg font-bold text-nuvv-dark">Solicitação Enviada com Sucesso!</h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                Enviamos os detalhes da solução <strong>{solution.title}</strong> para <strong>{email}</strong>. Um consultor corporativo entrará em contato em breve.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-700 transition-all"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
