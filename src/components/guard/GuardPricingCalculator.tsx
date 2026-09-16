import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  QrCode,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Building,
  Home,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  GUARD_CAMERA_PLANS,
  GUARD_INTERCOM_RESIDENTIAL,
  GUARD_INTERCOM_CONDO_TIERS,
  GUARD_TRACK_PLAN,
  GuardCameraPlan,
} from '../../data/guardPlans';

interface GuardPricingCalculatorProps {
  onSelectPlan: (planDetail: string) => void;
}

type CalculatorTab = 'cameras' | 'intercom' | 'track' | 'combo';
type CameraHardwareType = 'comodato' | 'byod';

export const GuardPricingCalculator: React.FC<GuardPricingCalculatorProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('cameras');

  // Cameras State
  const [cameraHardware, setCameraHardware] = useState<CameraHardwareType>('comodato');
  const [cameraCount, setCameraCount] = useState<number>(1);
  const [selectedCameraPlanId, setSelectedCameraPlanId] = useState<string>('camera-7d');

  // Intercom State
  const [intercomType, setIntercomType] = useState<'residencial' | 'condominio'>('residencial');
  const [intercomPaymentType, setIntercomPaymentType] = useState<'promo_taxa_unica' | 'mensal'>('promo_taxa_unica');
  const [condoAptos, setCondoAptos] = useState<number>(16);

  // Track State
  const [trackTagCount, setTrackTagCount] = useState<number>(1);
  const [trackPaymentType, setTrackPaymentType] = useState<'promo_taxa_unica' | 'mensal'>('promo_taxa_unica');

  // Available camera plans based on hardware
  const availableCameraPlans = GUARD_CAMERA_PLANS.filter((p) => {
    if (cameraHardware === 'byod') return p.priceBYOD !== null;
    return true;
  });

  const activeCameraPlan = GUARD_CAMERA_PLANS.find((p) => p.id === selectedCameraPlanId) || GUARD_CAMERA_PLANS[1];

  // Price calculations
  const cameraPricePerUnit = cameraHardware === 'comodato'
    ? activeCameraPlan.priceComodato
    : (activeCameraPlan.priceBYOD || 19.9);
  const totalCameraMonthly = cameraPricePerUnit * cameraCount;

  // Intercom condo calculation
  const getCondoTier = (aptos: number) => {
    if (aptos <= 24) return GUARD_INTERCOM_CONDO_TIERS[0];
    if (aptos <= 60) return GUARD_INTERCOM_CONDO_TIERS[1];
    if (aptos <= 120) return GUARD_INTERCOM_CONDO_TIERS[2];
    return GUARD_INTERCOM_CONDO_TIERS[3];
  };

  const currentCondoTier = getCondoTier(condoAptos);
  const totalCondoMonthly = condoAptos * currentCondoTier.pricePerApto;

  // Track Tag calculation
  const tagUnitPrice = trackTagCount >= 3 ? GUARD_TRACK_PLAN.promoBulkPrice3Plus : GUARD_TRACK_PLAN.promoOneTimePrice;
  const totalTagOneTime = trackPaymentType === 'promo_taxa_unica' ? tagUnitPrice * trackTagCount : 0;
  const totalTagMonthly = trackPaymentType === 'mensal' ? GUARD_TRACK_PLAN.monthlyPrice * trackTagCount : 0;

  // Combo calculation (combining selected elements)
  const comboMonthly = totalCameraMonthly + (intercomType === 'residencial' && intercomPaymentType === 'mensal' ? GUARD_INTERCOM_RESIDENTIAL.monthlyPrice : 0) + totalTagMonthly;
  const comboOneTime = (intercomType === 'residencial' && intercomPaymentType === 'promo_taxa_unica' ? GUARD_INTERCOM_RESIDENTIAL.promoOneTimePrice : (intercomType === 'residencial' ? GUARD_INTERCOM_RESIDENTIAL.activationFee : 0)) + totalTagOneTime;

  // Submission handlers
  const handleHireCamera = (plan: GuardCameraPlan) => {
    const hwText = cameraHardware === 'comodato' ? 'Câmera com Gravação (Acompanha Câmera Wi-Fi em Comodato)' : 'Câmera Própria (Apenas Nuvem)';
    const price = cameraHardware === 'comodato' ? plan.priceComodato : (plan.priceBYOD || 0);
    const total = price * cameraCount;
    const detail = `Nuvv Guard Vision: ${plan.name} (${cameraCount}x ${hwText}) - R$ ${total.toFixed(2).replace('.', ',')}/mês`;
    onSelectPlan(detail);
  };

  const handleHireIntercom = () => {
    if (intercomType === 'residencial') {
      if (intercomPaymentType === 'promo_taxa_unica') {
        onSelectPlan(`Nuvv Guard Intercom: Residencial (Casa/Sobrado) PROMO TAXA ÚNICA R$ ${GUARD_INTERCOM_RESIDENTIAL.promoOneTimePrice.toFixed(2).replace('.', ',')} (Sem mensalidade para cliente Fibra)`);
      } else {
        onSelectPlan(`Nuvv Guard Intercom: Residencial Mensal R$ 9,90/mês (+ R$ 15,00 ativação da placa)`);
      }
    } else {
      onSelectPlan(`Nuvv Guard Intercom: Condomínio (${condoAptos} apartamentos a R$ ${currentCondoTier.pricePerApto.toFixed(2).replace('.', ',')}/apto/mês) - Total R$ ${totalCondoMonthly.toFixed(2).replace('.', ',')}/mês sem taxa de ativação`);
    }
  };

  const handleHireTrack = () => {
    if (trackPaymentType === 'promo_taxa_unica') {
      onSelectPlan(`Nuvv Guard Track: ${trackTagCount}x Nuvv Tags (Taxa Única R$ ${totalTagOneTime.toFixed(2).replace('.', ',')} sem mensalidade)`);
    } else {
      onSelectPlan(`Nuvv Guard Track: ${trackTagCount}x Nuvv Tags (Mensal R$ ${totalTagMonthly.toFixed(2).replace('.', ',')}/mês + R$ 15 ativação)`);
    }
  };

  const handleHireCombo = () => {
    const detail = `Combo Nuvv Guard Personalizado: ${cameraCount}x Câmeras (${activeCameraPlan.name}) + Interfone ${intercomType} + ${trackTagCount}x Nuvv Tags - Mensal: R$ ${comboMonthly.toFixed(2).replace('.', ',')} | Taxa Única: R$ ${comboOneTime.toFixed(2).replace('.', ',')}`;
    onSelectPlan(detail);
  };

  return (
    <section id="calculadora-guard" className="py-20 sm:py-28 bg-slate-50/80 text-nuvv-dark relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-3.5 py-1.5 rounded-full">
            TABELA DE PREÇOS & SIMULADOR OFICIAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-nuvv-dark">
            Escolha os módulos perfeitos para você
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Transparência total: contrate câmeras com equipamento em comodato ou traga as suas, adquira interfones virtuais para casas ou condomínios e proteja seus pertences com as tags.
          </p>
        </div>

        {/* Master Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('cameras')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'cameras'
                ? 'bg-nuvv-dark text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Video className="w-4 h-4 text-emerald-400" />
            <span>1. Câmeras (Vision)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('intercom')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'intercom'
                ? 'bg-nuvv-dark text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>2. Interfone Virtual</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'track'
                ? 'bg-nuvv-dark text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Tag className="w-4 h-4 text-amber-500" />
            <span>3. Nuvv Tags</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('combo')}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'combo'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Simulador Combo Total</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: CÂMERAS & GRAVAÇÃO (VISION) */}
        {/* ============================================================ */}
        {activeTab === 'cameras' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hardware Mode Toggle & Camera Counter */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Comodato vs BYOD Selector */}
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Formato do Equipamento:</span>
                <div className="flex p-1 bg-slate-100 rounded-2xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setCameraHardware('comodato');
                      setSelectedCameraPlanId('camera-7d');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                      cameraHardware === 'comodato'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Câmeras com Gravação
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCameraHardware('byod');
                      setSelectedCameraPlanId('camera-7d');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                      cameraHardware === 'byod'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Já Tenho Câmera Própria
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2 text-center md:text-right">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Quantidade de Câmeras:</span>
                <div className="flex items-center justify-center md:justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setCameraCount(Math.max(1, cameraCount - 1))}
                    disabled={cameraCount <= 1}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-black flex items-center justify-center disabled:opacity-40 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-black text-nuvv-dark w-12 text-center">
                    {cameraCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCameraCount(cameraCount + 1)}
                    className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center justify-center transition-all shadow-md shadow-emerald-600/20"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Camera Plans Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${cameraHardware === 'comodato' ? 'lg:grid-cols-4' : 'lg:grid-cols-2 max-w-4xl mx-auto'} gap-6`}>
              {availableCameraPlans.map((plan) => {
                const isSelected = selectedCameraPlanId === plan.id;
                const price = cameraHardware === 'comodato' ? plan.priceComodato : (plan.priceBYOD || 0);
                const totalPrice = price * cameraCount;

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl'
                        : 'border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-3 py-1 rounded-full shadow-md">
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {plan.retentionDays} DIAS DE NUVEM
                        </span>
                        <h3 className="text-xl font-extrabold text-nuvv-dark mt-0.5">{plan.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
                      </div>

                      <div className="py-3 border-y border-gray-100">
                        <div className="text-xs text-gray-400 font-semibold">
                          {cameraCount > 1 ? `R$ ${price.toFixed(2).replace('.', ',')} / câmera / mês` : 'Valor mensal por câmera:'}
                        </div>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="text-xs font-bold text-gray-500">R$</span>
                          <span className="text-3xl font-black text-nuvv-dark">
                            {totalPrice.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-xs font-semibold text-gray-400">/mês</span>
                        </div>
                        {cameraHardware === 'comodato' && (
                          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                            ✓ Acompanha Câmera Wi-Fi Full HD em comodato
                          </span>
                        )}
                        {cameraHardware === 'byod' && (
                          <span className="text-[11px] text-indigo-600 font-bold block mt-1">
                            ✓ Armazenamento e App Nuvv Guard
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs text-gray-600">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleHireCamera(plan)}
                      className="mt-6 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-600/20 active:scale-98 cursor-pointer"
                    >
                      <span>
                        {cameraHardware === 'comodato'
                          ? `Contratar Câmeras com Gravação (${plan.retentionDays}D)`
                          : `Contratar Nuvem Câmera Própria (${plan.retentionDays}D)`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Live Camera App Demonstration Card */}
            <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-black aspect-video shadow-2xl flex items-center justify-center">
                <img
                  src="/images/services/vision_image.gif"
                  alt="Demonstração da imagem gerada pelas câmeras no App Nuvv Guard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center space-x-1.5 bg-red-600/90 text-white px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>TRANSMISSÃO AO VIVO</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-mono font-bold border border-emerald-500/30">
                  1080p Full HD
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  <Video className="w-3.5 h-3.5" />
                  <span>VISUALIZAÇÃO EM TEMPO REAL NO APP</span>
                </div>
                <h4 className="text-xl font-black text-white">
                  Veja exatamente o que acontece, de onde você estiver.
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  Transmissão contínua em alta definição direto no seu celular pelo <strong>App Nuvv Guard</strong>. Acompanhe a linha do tempo de gravações na nuvem, receba alertas inteligentes e compartilhe o acesso com toda a sua família sem custo extra.
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Gravação contínua 24h na nuvem blindada no Data Center</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: INTERFONE VIRTUAL (INTERCOM) */}
        {/* ============================================================ */}
        {activeTab === 'intercom' && (
          <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
            {/* Segment Switcher: Residencial vs Condominio */}
            <div className="flex justify-center">
              <div className="p-1.5 bg-white rounded-2xl border border-gray-200 shadow-sm flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIntercomType('residencial')}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    intercomType === 'residencial'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Para Casa ou Sobrado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIntercomType('condominio')}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
                    intercomType === 'condominio'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Para Condomínios & Prédios</span>
                </button>
              </div>
            </div>

            {/* RESIDENCIAL VIEW */}
            {intercomType === 'residencial' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Option 1: Taxa Única (PROMOÇÃO FIBRA NUVV) */}
                <div className="bg-white rounded-3xl p-8 border-2 border-cyan-500 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
                      RECOMENDADO NUVV
                    </span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase text-cyan-700 tracking-wider">
                      OFERTA PROMOCIONAL CLIENTE FIBRA
                    </span>
                    <h3 className="text-2xl font-black text-nuvv-dark">Taxa Única Sem Mensalidade</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Adquira sua placa com QR Code e utilize o interfone virtual sem pagar nenhuma mensalidade enquanto mantiver seu plano de internet Fibra Nuvv ativo!
                    </p>

                    <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
                      <div className="text-xs text-gray-500 font-semibold">Valor Único Promocional:</div>
                      <div className="text-4xl font-black text-nuvv-dark my-1">
                        R$ {GUARD_INTERCOM_RESIDENTIAL.promoOneTimePrice.toFixed(2).replace('.', ',')}{' '}
                        <span className="text-xs font-semibold text-gray-500">taxa única</span>
                      </div>
                      <span className="text-xs font-bold text-cyan-800 block">
                        ✓ Mensalidade: R$ 0,00 (Gratuita)
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex items-center space-x-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Placa personalizada durável inclusa</span>
                      </div>
                      <div className="flex items-center space-x-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Vídeo chamadas no App Nuvv Guard</span>
                      </div>
                      <div className="flex items-center space-x-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Abertura remota de portão ou fechadura</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIntercomPaymentType('promo_taxa_unica');
                      handleHireIntercom();
                    }}
                    className="mt-6 w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-cyan-600/20 active:scale-98"
                  >
                    <span>Quero Taxa Única por R$ {GUARD_INTERCOM_RESIDENTIAL.promoOneTimePrice.toFixed(2).replace('.', ',')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Option 2: Mensalidade Padrão */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold uppercase text-gray-400 tracking-wider">
                      OPÇÃO MENSAL
                    </span>
                    <h3 className="text-2xl font-black text-nuvv-dark">Assinatura Mensal</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Pague uma mensalidade suave com taxa de ativação única para produção da placa personalizada.
                    </p>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200">
                      <div className="text-xs text-gray-500 font-semibold">Valor mensal:</div>
                      <div className="text-4xl font-black text-nuvv-dark my-1">
                        R$ 9,90 <span className="text-xs font-semibold text-gray-500">/mês</span>
                      </div>
                      <span className="text-xs text-gray-600 block">
                        + Taxa de ativação da placa: <strong>R$ 15,00</strong> (cobrança única)
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex items-center space-x-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Cancelamento flexível quando quiser</span>
                      </div>
                      <div className="flex items-center space-x-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Todas as funcionalidades do Interfone Virtual</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIntercomPaymentType('mensal');
                      handleHireIntercom();
                    }}
                    className="mt-6 w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98"
                  >
                    <span>Contratar Plano Mensal (R$ 9,90/mês)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* CONDOMINIOS VIEW */}
            {intercomType === 'condominio' && (
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
                    SEM TAXA DE ATIVAÇÃO • MÍNIMO DE 8 APARTAMENTOS
                  </span>
                  <h3 className="text-2xl font-black text-nuvv-dark">
                    Tabela Progressiva para Condomínios
                  </h3>
                  <p className="text-xs text-gray-500">
                    Quanto mais apartamentos no prédio, menor o valor mensal por unidade.
                  </p>
                </div>

                {/* Interactive Slider for Aptos */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">Quantos apartamentos no condomínio?</span>
                    <span className="text-2xl font-black text-cyan-700 bg-cyan-50 px-3 py-1 rounded-xl border border-cyan-200">
                      {condoAptos} apartamentos
                    </span>
                  </div>

                  <input
                    type="range"
                    min="8"
                    max="200"
                    step="1"
                    value={condoAptos}
                    onChange={(e) => setCondoAptos(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
                  />

                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Mínimo: 8 aptos</span>
                    <span>Faixa: {currentCondoTier.label}</span>
                    <span>200+ aptos</span>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-100 rounded-2xl border border-gray-200">
                    <div className="text-xs text-gray-500">Valor por Apartamento</div>
                    <div className="text-2xl font-black text-nuvv-dark mt-1">
                      R$ {currentCondoTier.pricePerApto.toFixed(2).replace('.', ',')}
                      <span className="text-xs font-normal text-gray-500"> /mês</span>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-200">
                    <div className="text-xs text-cyan-800 font-bold">Total Mensal do Condomínio</div>
                    <div className="text-3xl font-black text-cyan-900 mt-1">
                      R$ {totalCondoMonthly.toFixed(2).replace('.', ',')}
                      <span className="text-xs font-normal text-cyan-800"> /mês</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-center">
                    <div className="text-xs text-emerald-800 font-bold">Taxa de Ativação</div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">
                      GRÁTIS (R$ 0,00)
                    </div>
                  </div>
                </div>

                {/* Tiers Reference Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {GUARD_INTERCOM_CONDO_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      className={`p-3 rounded-xl border text-xs ${
                        tier.id === currentCondoTier.id
                          ? 'bg-cyan-50 border-cyan-500 font-bold text-cyan-900'
                          : 'bg-slate-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      <div>{tier.label}</div>
                      <div className="text-base font-black mt-1">
                        R$ {tier.pricePerApto.toFixed(2).replace('.', ',')} /apto
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleHireIntercom}
                  className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-cyan-600/20 active:scale-98"
                >
                  <span>Solicitar Proposta para Condomínio ({condoAptos} aptos)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: TAGS DE RASTREAMENTO (TRACK) */}
        {/* ============================================================ */}
        {activeTab === 'track' && (
          <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-8">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    SEGURANÇA DA FAMÍLIA • SEM MENSALIDADE
                  </span>
                  <h3 className="text-2xl font-black text-nuvv-dark mt-1">
                    Quantas Tags Nuvv você deseja?
                  </h3>
                  <p className="text-xs text-gray-500">
                    Acompanhe crianças, pets e veículos. Aproveite o desconto progressivo para a família.
                  </p>
                </div>

                {/* Counter */}
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setTrackTagCount(Math.max(1, trackTagCount - 1))}
                    disabled={trackTagCount <= 1}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-black flex items-center justify-center disabled:opacity-40 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-black text-nuvv-dark w-12 text-center">
                    {trackTagCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTrackTagCount(trackTagCount + 1)}
                    className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center justify-center transition-all shadow-md shadow-amber-500/20"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Offer Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  onClick={() => setTrackPaymentType('promo_taxa_unica')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all space-y-3 ${
                    trackPaymentType === 'promo_taxa_unica'
                      ? 'bg-amber-50/70 border-amber-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-800 uppercase">Promoção Fibra Nuvv</span>
                    {trackTagCount >= 3 && (
                      <span className="text-[10px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded-full">
                        DESCONTO PROGRESSIVO
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-black text-nuvv-dark">Taxa Única Sem Mensalidade</div>
                  <div className="text-3xl font-black text-nuvv-dark">
                    R$ {totalTagOneTime.toFixed(2).replace('.', ',')}
                    <span className="text-xs font-normal text-gray-500"> taxa única</span>
                  </div>
                  <div className="text-xs text-emerald-700 font-bold">
                    {trackTagCount >= 3
                      ? `R$ 79,90 por tag (economia de R$ 20 por unidade!)`
                      : `R$ 99,90 por tag inclusa sem mensalidade`}
                  </div>
                </div>

                <div
                  onClick={() => setTrackPaymentType('mensal')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all space-y-3 ${
                    trackPaymentType === 'mensal'
                      ? 'bg-amber-50/70 border-amber-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-bold text-gray-400 uppercase">Assinatura Mensal</span>
                  <div className="text-xl font-black text-nuvv-dark">Plano Mensal Recorrente</div>
                  <div className="text-3xl font-black text-nuvv-dark">
                    R$ {totalTagMonthly.toFixed(2).replace('.', ',')}
                    <span className="text-xs font-normal text-gray-500"> /mês</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    + Taxa de ativação de R$ 15,00 por tag
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleHireTrack}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-amber-500/20 active:scale-98 cursor-pointer"
              >
                <span>Contratar {trackTagCount}x Nuvv Tag(s)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: COMBO TOTAL NUVV GUARD */}
        {/* ============================================================ */}
        {activeTab === 'combo' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-500/30 shadow-2xl max-w-4xl mx-auto animate-fade-in space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                MONTE SEU PACOTE DE SEGURANÇA INTEGRADO
              </span>
              <h3 className="text-3xl font-black text-white">
                Resumo da Sua Proteção Nuvv Guard
              </h3>
              <p className="text-xs text-gray-300">
                Combine Câmeras, Interfone e Tags em uma fatura unificada com suporte centralizado.
              </p>
            </div>

            <div className="divide-y divide-white/10 space-y-4 pt-2">
              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-emerald-400" />
                    Câmeras Nuvv Guard ({activeCameraPlan.name})
                  </div>
                  <div className="text-xs text-gray-400">{cameraCount} câmera(s) em {cameraHardware === 'comodato' ? 'comodato' : 'câmera própria'}</div>
                </div>
                <div className="text-base font-black text-emerald-400">
                  R$ {totalCameraMonthly.toFixed(2).replace('.', ',')}/mês
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    Interfone Virtual ({intercomType === 'residencial' ? (intercomPaymentType === 'promo_taxa_unica' ? 'Residencial Taxa Única' : 'Residencial Mensal') : `Condomínio ${condoAptos} aptos`})
                  </div>
                  <div className="text-xs text-gray-400">Atendimento por vídeo no celular</div>
                </div>
                <div className="text-base font-black text-cyan-400">
                  {intercomType === 'residencial'
                    ? (intercomPaymentType === 'promo_taxa_unica' ? 'R$ 0,00/mês' : 'R$ 9,90/mês')
                    : `R$ ${totalCondoMonthly.toFixed(2).replace('.', ',')}/mês`}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-400" />
                    Tags de Rastreamento ({trackTagCount} unidades)
                  </div>
                  <div className="text-xs text-gray-400">{trackPaymentType === 'promo_taxa_unica' ? 'Taxa única sem mensalidade' : 'Plano mensal'}</div>
                </div>
                <div className="text-base font-black text-amber-400">
                  {trackPaymentType === 'promo_taxa_unica' ? 'R$ 0,00/mês' : `R$ ${totalTagMonthly.toFixed(2).replace('.', ',')}/mês`}
                </div>
              </div>
            </div>

            {/* Total Display */}
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <div className="text-xs text-gray-400 uppercase font-bold">Investimento Estimado:</div>
                <div className="text-3xl font-black text-white">
                  R$ {comboMonthly.toFixed(2).replace('.', ',')} <span className="text-xs font-semibold text-gray-400">/mês</span>
                </div>
                {comboOneTime > 0 && (
                  <div className="text-xs text-amber-300 font-semibold mt-0.5">
                    + R$ {comboOneTime.toFixed(2).replace('.', ',')} de taxa única inicial promocional
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleHireCombo}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 active:scale-98"
              >
                <span>Finalizar Contratação no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Smart Pole Community Callout Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-teal-900/90 via-slate-900 to-teal-950 text-white border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 text-xl font-black shadow">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500/30 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-500/40">
                  PROJETO ESPECIAL
                </span>
                <span className="text-xs text-amber-300 font-bold">Vigilância Colaborativa</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white mt-1">
                Poste de Monitoramento Inteligente Nuvv
              </h4>
              <p className="text-xs text-gray-300 max-w-xl mt-0.5">
                Proteção 360° perimetral com detecção inteligente por IA, visão noturna e gravação contínua em nuvem para ruas fechadas, bairros e condomínios com custo rateado entre vizinhos.
              </p>
            </div>
          </div>

          <Link
            to="/postes"
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-teal-500/20 flex-shrink-0 cursor-pointer"
          >
            <span>Conhecer o Poste Inteligente</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
