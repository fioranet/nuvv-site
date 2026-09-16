import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { siteConfig } from '../../data/siteConfig';
import { apiService } from '../../services/apiService';
import {
  Send,
  CheckCircle2,
  MessageCircle,
  Phone,
  User,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';
import {
  ComboLeadSummary,
  getStoredComboSummary,
  generateWhatsAppComboMessage,
} from '../../services/comboSummary';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  cityName?: string;
  source?: string;
  summaryData?: ComboLeadSummary | null;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  planName = 'Plano de Fibra Óptica',
  cityName = 'Suzano',
  source = 'Site Nuvv',
  summaryData,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Identifica o resumo ativo do pedido (via prop ou recuperado do storage)
  const activeSummary = useMemo(() => {
    if (summaryData) return summaryData;
    const stored = getStoredComboSummary();
    if (stored && planName && (planName.includes(stored.referencePlan) || planName.includes(`${stored.planSpeed} ${stored.planUnit}`))) {
      return stored;
    }
    return null;
  }, [summaryData, planName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const leadDetails = activeSummary
      ? `Cidade: ${cityName} | CEP: ${cep} | Mensalidade: R$ ${activeSummary.monthlyTotal.toFixed(2)} | Vendas/Taxas Únicas: R$ ${activeSummary.oneTimeTotal.toFixed(2)} | ${activeSummary.rawSummary}`
      : `Cidade: ${cityName} | CEP: ${cep}`;

    // Save lead to SQLite
    await apiService.logCommercialLead({
      source_page: `${source} - ${activeSummary ? activeSummary.planTitle : planName}`,
      name,
      phone,
      email,
      details: leadDetails,
    });

    // Save lead in localStorage as fallback
    try {
      const storedLeads = JSON.parse(localStorage.getItem('nuvv_leads') || '[]');
      storedLeads.push({
        name,
        phone,
        email,
        cep,
        planName: activeSummary ? activeSummary.rawSummary : planName,
        cityName,
        source,
        summary: activeSummary || undefined,
        date: new Date().toISOString(),
      });
      localStorage.setItem('nuvv_leads', JSON.stringify(storedLeads));
    } catch {
      // ignore
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = async () => {
    let text = '';
    if (activeSummary) {
      text = generateWhatsAppComboMessage(activeSummary, { name, phone, cep });
    } else {
      text = `Olá! Gostaria de contratar o ${planName} para a cidade de ${cityName}. Meu nome é ${name || 'Cliente'}.`;
    }

    // Registra lead de abertura direta de whatsapp
    try {
      await apiService.logCommercialLead({
        source_page: `${source} - WhatsApp Direto`,
        name: name || 'Cliente WhatsApp',
        phone: phone || undefined,
        email: email || undefined,
        details: `Cidade: ${cityName} | CEP: ${cep || 'Não informado'} | ${
          activeSummary
            ? `Mensalidade: R$ ${activeSummary.monthlyTotal.toFixed(2)} | Vendas/Taxas Únicas: R$ ${activeSummary.oneTimeTotal.toFixed(2)} | ${activeSummary.rawSummary}`
            : planName
        }`,
      });
    } catch {
      // ignore
    }

    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setCep('');
    setIsSubmitted(false);
    onClose();
  };

  const userFacingPlanName = activeSummary
    ? `${activeSummary.planTitle} - ${activeSummary.tierLabel}`
    : planName.replace(/\[Ref:.*?\]\s*/g, '').trim();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      maxWidth="lg"
      headerBanner={
        <div className={`px-6 sm:px-8 py-5 sm:py-6 rounded-t-3xl rounded-b-none text-white border-b border-white/10 ${
          activeSummary?.isBusiness
            ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950'
            : 'bg-gradient-to-r from-nuvv-purple via-indigo-600 to-nuvv-purple'
        }`}>
          <div className="pr-14 sm:pr-16">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[11px] font-black uppercase tracking-wider ${
                activeSummary?.isBusiness ? 'text-emerald-400' : 'text-indigo-200'
              }`}>
                {activeSummary?.isBusiness ? 'NUVV EMPRESAS' : 'NUVV FIBRA'}
              </span>
              <span className="text-xs opacity-50">•</span>
              <span className={`text-xs font-bold ${
                activeSummary?.isBusiness ? 'text-emerald-300' : 'text-emerald-300'
              }`}>
                {cityName}
              </span>
              {activeSummary?.planSpeed && (
                <>
                  <span className="text-xs opacity-50">•</span>
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[11px] font-bold text-white">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>{activeSummary.planSpeed} {activeSummary.planUnit || 'Mega'}</span>
                  </div>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {isSubmitted ? 'Solicitação Recebida!' : 'Contratar Online'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200/90 mt-1 max-w-2xl leading-relaxed">
              {isSubmitted
                ? 'Recebemos seus dados e entraremos em contato em instantes para concluir sua ativação.'
                : `Você escolheu: ${userFacingPlanName}`}
            </p>
          </div>
        </div>
      }
    >
      {isSubmitted ? (
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-nuvv-dark">Obrigado pelo interesse, {name}!</h4>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            Recebemos seu pedido de contratação do <strong>{userFacingPlanName}</strong> para <strong>{cityName}</strong>. Nossa equipe técnica entrará em contato via WhatsApp ou telefone em breve.
          </p>

          {activeSummary && (
            <div className="max-w-md mx-auto p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-800 pb-1.5 border-b border-slate-200">
                <span>Plano Contratado:</span>
                <span className="text-nuvv-purple font-black">{activeSummary.planTitle} ({activeSummary.tierLabel})</span>
              </div>
              {activeSummary.monthlyItems.filter((i) => i.category !== 'fibra' && !i.isIncluded).length > 0 && (
                <div className="space-y-1 text-slate-700 py-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Adicionais Contratados:</span>
                  {activeSummary.monthlyItems.filter((i) => i.category !== 'fibra' && !i.isIncluded).map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-slate-800">• {item.name}</span>
                      <span className="font-bold text-nuvv-purple">+ R$ {item.price.toFixed(2).replace('.', ',')}/mês</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Mensalidade Total:</span>
                <span className="text-nuvv-purple font-black">R$ {activeSummary.monthlyTotal.toFixed(2).replace('.', ',')}/mês</span>
              </div>
              {activeSummary.oneTimeTotal > 0 && (
                <div className="flex justify-between font-bold text-amber-900 pt-1 border-t border-slate-200">
                  <span>Vendas / Taxas Únicas:</span>
                  <span>R$ {activeSummary.oneTimeTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
            </div>
          )}

          {/* Botões de Ação na Tela de Confirmação - Em linha única sem descer */}
          <div className="pt-2 flex flex-row items-center gap-2.5 sm:gap-3 justify-center">
            <button
              onClick={handleWhatsAppDirect}
              className="flex-1 py-3 px-3 sm:px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 shadow-md cursor-pointer transition-all whitespace-nowrap active:scale-98"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Agilizar no WhatsApp</span>
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-3 px-3 sm:px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm cursor-pointer transition-all whitespace-nowrap active:scale-98 text-center"
            >
              <span>Fechar</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Visual Order Summary Box when available */}
          {activeSummary && (
            <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-nuvv-purple/10 text-nuvv-purple flex items-center justify-center font-black text-xs">
                    {activeSummary.planSpeed}M
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                      {activeSummary.planTitle}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {activeSummary.tierLabel}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Mensalidade
                  </span>
                  <span className="text-base sm:text-lg font-black text-nuvv-purple">
                    R$ {activeSummary.monthlyTotal.toFixed(2).replace('.', ',')}
                    <span className="text-xs font-semibold text-slate-500">/mês</span>
                  </span>
                </div>
              </div>

              {/* SERVIÇOS & ADICIONAIS CONTRATADOS (ex: Telemedicina, Câmeras, Streamings extras) */}
              {activeSummary.monthlyItems.filter((i) => i.category !== 'fibra' && !i.isIncluded).length > 0 && (
                <div className="bg-white rounded-xl p-3 border border-purple-100/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-nuvv-purple flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-nuvv-purple" />
                      <span>Serviços e Adicionais Selecionados</span>
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-400">
                      {activeSummary.monthlyItems.filter((i) => i.category !== 'fibra' && !i.isIncluded).length} item(s)
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {activeSummary.monthlyItems
                      .filter((i) => i.category !== 'fibra' && !i.isIncluded)
                      .map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between font-bold text-slate-800">
                          <span className="flex items-center space-x-1.5 min-w-0 pr-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                          </span>
                          <span className="text-nuvv-purple font-extrabold flex-shrink-0">
                            + R$ {item.price.toFixed(2).replace('.', ',')}/mês
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Taxas Únicas / Vendas de Hardware e Placas */}
              {activeSummary.oneTimeItems.length > 0 ? (
                <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-2.5 sm:p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-black text-amber-950">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>Vendas / Taxas Únicas (Pagamento Único)</span>
                    </div>
                    <span className="text-xs font-black text-amber-950">
                      R$ {activeSummary.oneTimeTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] text-amber-900/90 pt-0.5">
                    {activeSummary.oneTimeItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>• {item.name}</span>
                        <span className="font-bold">R$ {item.setupFee.toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-amber-700 leading-tight pt-0.5">
                    * Vendas e adesões pontuais sem acréscimo na mensalidade recorrente enquanto cliente Nuvv.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs font-medium text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 rounded-xl px-3 py-1.5">
                  <span>Taxa de adesão / instalação</span>
                  <span className="font-black text-emerald-600">100% Isenta</span>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nome Completo *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  WhatsApp / Telefone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  CEP de Instalação
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Ações do Formulário - Estritamente em uma única linha sem descer */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Agilizar no WhatsApp</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 shadow-md shadow-nuvv-purple/20 transition-all whitespace-nowrap active:scale-98 disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Solicitar Ligação</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-gray-400 pt-0.5">
              Seus dados estão 100% seguros e protegidos em conformidade com a LGPD.
            </p>
          </form>
        </div>
      )}
    </Modal>
  );
};
