import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import {
  Phone,
  Tv,
  ShieldCheck,
  Check,
  ArrowRight,
  Shield,
  Smartphone,
  Lock,
  Wifi,
  Eye,
  HeartPulse,
  Sparkles,
  Film,
  Users,
  Laptop,
  CheckCircle2,
} from 'lucide-react';

interface ValueAddedModalsProps {
  onOpenLeadModal: (serviceName?: string) => void;
  externalActiveModal?: 'telefonia' | 'nuvvplay' | 'protecao' | null;
  onCloseExternalModal?: () => void;
}

export const ValueAddedModals: React.FC<ValueAddedModalsProps> = ({
  onOpenLeadModal,
  externalActiveModal,
  onCloseExternalModal,
}) => {
  const [internalModal, setInternalModal] = useState<'telefonia' | 'nuvvplay' | 'protecao' | null>(null);

  const activeModal = externalActiveModal ? externalActiveModal : internalModal;

  const setActiveModal = (modal: 'telefonia' | 'nuvvplay' | 'protecao' | null) => {
    setInternalModal(modal);
    if (modal === null) {
      onCloseExternalModal?.();
    }
  };

  const closeModal = () => {
    setInternalModal(null);
    onCloseExternalModal?.();
  };

  const handleAcquire = (serviceName: string) => {
    closeModal();
    onOpenLeadModal(serviceName);
  };

  return (
    <>
      {/* SVA Section Triggers */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/80 relative overflow-hidden border-t border-slate-200/80">
        {/* Glow decorativo sutil */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Cabeçalho da Seção */}
          <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/10 text-nuvv-purple text-xs font-black uppercase tracking-wider border border-nuvv-purple/20">
              <Sparkles className="w-4 h-4 text-nuvv-purple" />
              <span>Serviços Adicionais • Conectividade & Conveniência</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Mais conveniência, segurança e entretenimento{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-cyan-600">
                para o seu dia a dia.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              Turbine sua experiência residencial com voz digital sem limites, catálogo completo de filmes e proteção antivírus premium para todos os dispositivos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-7xl mx-auto">
            {/* 1. Telefonia Fixa */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-50 text-nuvv-purple border border-indigo-200/80">
                    Voz Digital 100% Fibra
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100/80 text-nuvv-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    Telefonia Fixa Ilimitada
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fale à vontade com fixos de todo o Brasil sem surpresas na fatura.
                  </p>
                </div>

                <div className="py-2 space-y-2 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Ligações Ilimitadas:</strong> para telefones fixos de qualquer operadora no Brasil.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Portabilidade Gratuita:</strong> traga o seu número atual sem burocracia.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Identificador de chamadas:</strong> veja quem está ligando direto no aparelho.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Mensalidade</span>
                    <span className="text-xs font-semibold text-slate-600">Plano Ilimitado Brasil</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">R$ 19,90</span>
                    <span className="text-xs text-slate-500 font-semibold">/mês</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('telefonia')}
                  className="w-full py-3 px-4 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Conhecer Telefonia Fixa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Watch Streaming (NuvvPlay) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200/80">
                    Streaming by Watch
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Tv className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    Watch (TV & Streaming)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Filmes, séries e canais ao vivo para curtir no aplicativo Watch (NuvvPlay).
                  </p>
                </div>

                <div className="py-2 space-y-2 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>+30 mil horas:</strong> filmes premiados, documentários e lançamentos no Watch.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Até 4 telas simultâneas:</strong> assista na Smart TV, celular, tablet e PC.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Até 8 perfis:</strong> recomendações personalizadas para cada familiar.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Disponibilidade</span>
                    <span className="text-xs font-semibold text-slate-600">Incluso no Combo ou Avulso</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/70">
                      Multi-telas
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('nuvvplay')}
                  className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Explorar Watch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. Nuvv +Proteção Kaspersky */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    Kaspersky Premium
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    Nuvv +Proteção Digital
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Blindagem contra vírus, golpes online e controle parental.
                  </p>
                </div>

                <div className="py-2 space-y-2 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Antivírus Avançado:</strong> proteção em tempo real contra malwares e phishing.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>VPN Ilimitada:</strong> navegue com privacidade absoluta e dados criptografados.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Safe Kids:</strong> controle de tempo de tela e localização para os filhos.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Mensalidade</span>
                    <span className="text-xs font-semibold text-slate-600">Pacote Plus Familiar</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">R$ 9,90</span>
                    <span className="text-xs text-slate-500 font-semibold">/mês</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('protecao')}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Ver Recursos de Proteção</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL TELEFONIA FIXA */}
      <Modal isOpen={activeModal === 'telefonia'} onClose={closeModal} maxWidth="3xl" showCloseButton={true}>
        <div className="p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Clean Image + Price Box Below */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 h-56 sm:h-64">
                <img
                  src="/images/external/telephony.jpg"
                  alt="Telefonia Fixa Residencial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center space-x-1.5 shadow-sm">
                  <Phone className="w-3.5 h-3.5 text-nuvv-green" />
                  <span>Voz 100% Fibra</span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-extrabold text-nuvv-purple tracking-wider block">
                    Plano Ilimitado Brasil
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Exclusivo para assinantes Fibra</span>
                </div>
                <div className="text-right flex-shrink-0 whitespace-nowrap">
                  <div className="text-xl sm:text-2xl font-black text-nuvv-purple whitespace-nowrap inline-flex items-baseline">
                    <span>R$&nbsp;19,90</span>
                    <span className="text-xs text-gray-500 font-semibold ml-0.5">/mês</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="space-y-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-nuvv-purple text-[10px] font-extrabold uppercase tracking-wider mb-1">
                  <span>TELEFONIA FIXA DIGITAL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">Voz Digital em Alta Definição</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                  Substitua sua linha fixa antiga por tecnologia digital em fibra óptica. Fale à vontade com telefones fixos de todo o Brasil sem sustos na fatura.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  'Portabilidade numérica 100% gratuita do seu número atual',
                  'Ligações Ilimitadas para Telefones Fixos de todo o Brasil',
                  'Identificador de chamadas e secretária eletrônica inclusos',
                  'Qualidade de áudio cristalina direto pelo roteador Wi-Fi',
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-indigo-50/60 rounded-xl flex items-center space-x-2.5 text-xs font-semibold text-gray-800">
                    <Check className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAcquire('Telefonia Fixa Ilimitada R$ 19,90')}
                className="w-full py-3.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-sm shadow-md transition-all active:scale-98"
              >
                Adicionar Telefonia Fixa por R$ 19,90/mês
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL NUVVPLAY STREAMING BY WATCH */}
      <Modal isOpen={activeModal === 'nuvvplay'} onClose={closeModal} maxWidth="4xl" showCloseButton={true}>
        <div className="p-5 sm:p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Tv className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-extrabold uppercase tracking-wider mb-1 border border-orange-100">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  <span>TECNOLOGIA STREAMING BY WATCH</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">
                  Watch: TV & Streaming para Clientes Nuvv
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Mais de 30 mil horas de filmes, séries, esportes e canais ao vivo reunidos no aplicativo Watch (NuvvPlay).
                </p>
              </div>
            </div>

            <div className="hidden sm:block flex-shrink-0">
              <div className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                <img
                  src="/images/services/streaming_by_watch.png"
                  alt="Streaming by Watch"
                  className="max-h-6 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Hero Banner Showcase (Devices & Watch Branding) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-violet-900 p-6 sm:p-8 text-white shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-3 z-10">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
                  Hub de Entretenimento Completo
                </span>
                <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Toda a sua programação favorita onde e quando quiser.
                </h4>
                <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
                  Sem aparelhos decodificadores ou fios extras. Baixe o app <strong>Watch (NuvvPlay)</strong> e aproveite o catálogo completo integrado diretamente à sua conexão 100% fibra óptica.
                </p>
                <div className="pt-2 flex items-center space-x-2">
                  <img
                    src="/images/services/streaming_by_watch.png"
                    alt="Watch TV"
                    className="h-7 bg-white/90 px-2 py-1 rounded-lg object-contain shadow-xs"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <img
                  src="/images/services/watch_devices.png"
                  alt="Watch (NuvvPlay) em Múltiplos Dispositivos"
                  className="w-full max-h-56 sm:max-h-64 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Features Grid from Watch Screenshot */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
              Recursos e Vantagens Exclusivas para Você
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                  30k
                </div>
                <h5 className="text-xs font-bold text-gray-900">+ 30 mil horas de conteúdo</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Filmes consagrados, séries em alta, realities, transmissões de esportes e novidades para todos os gostos.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-100/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-nuvv-violet text-white flex items-center justify-center font-black text-xs shadow-2xs">
                  8P
                </div>
                <h5 className="text-xs font-bold text-gray-900">8 Perfis e 4 Telas Simultâneas</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Crie até 8 perfis personalizados para cada membro da família e assista em até 4 telas ao mesmo tempo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-nuvv-purple text-white flex items-center justify-center shadow-2xs">
                  <Tv className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-gray-900">Canais ao Vivo em HD</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Programação variada reunida em uma única plataforma inteligente, rápida e intuitiva.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-gray-900">Perfil Kids e Controle Parental</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Ambiente seguro e protegido para garantir uma experiência digital tranquila e divertida às crianças.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-2xs">
                  <Film className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-gray-900">Lançamentos para Alugar</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Grandes sucessos recém-saídos do cinema disponíveis para aluguel sob demanda com máxima definição.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100/80 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h5 className="text-xs font-bold text-gray-900">Novidades Semanais</h5>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Novos conteúdos, episódios e filmes adicionados na plataforma semanalmente para maratonar.
                </p>
              </div>
            </div>
          </div>

          {/* Compatibility */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center space-x-2.5">
              <Laptop className="w-5 h-5 text-nuvv-purple flex-shrink-0" />
              <span>
                <strong className="text-gray-900 font-bold">Dispositivos Compatíveis:</strong> Smart TVs (Samsung Tizen, LG webOS, Android TV, Roku TV, Apple TV, Fire TV), Smartphones/Tablets (Android e iOS) e Navegadores.
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={() => handleAcquire('NuvvPlay Streaming by Watch')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              <span>Conhecer Planos com NuvvPlay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL NUVV +PROTEÇÃO (KASPERSKY PLUS & SAFE KIDS) */}
      <Modal isOpen={activeModal === 'protecao'} onClose={closeModal} maxWidth="4xl" showCloseButton={true}>
        <div className="p-5 sm:p-6 md:p-8 space-y-6">

          {/* Header */}
          <div className="flex items-start space-x-3.5 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>SEGURANÇA CIBERNÉTICA PREMIADA KASPERSKY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">
                Nuvv +Proteção: Kaspersky Plus & Safe Kids
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Proteja todos os dispositivos da sua casa contra golpes, vírus, invasões e garanta a segurança online das crianças.
              </p>
            </div>
          </div>

          {/* 2 Main Kaspersky Offerings (Informative, without prices) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kaspersky Plus */}
            <div className="p-5 rounded-3xl bg-emerald-50/40 border border-emerald-100 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">Antivírus & Privacidade</span>
                    <h4 className="text-base font-black text-gray-900">Kaspersky Plus</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Proteção completa de última geração contra malwares, ransomware, spyware e proteção de pagamentos e compras online com VPN ultra-rápida ilimitada.
                </p>
                <div className="space-y-1.5 pt-1">
                  {[
                    'Antivírus em tempo real e proteção anti-ransomware',
                    'Navegação segura e proteção contra sites falsos (Phishing)',
                    'VPN rápida e ilimitada para proteger sua privacidade',
                    'Firewall bidirecional e detecção de invasores de rede',
                    'Gerenciador de senhas seguro e proteção de pagamentos',
                    'Otimização de desempenho para PC, Mac e Smartphones',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[11px] text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kaspersky Safe Kids */}
            <div className="p-5 rounded-3xl bg-indigo-50/40 border border-indigo-100 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-nuvv-purple text-white flex items-center justify-center shadow-2xs">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-nuvv-purple block">Controle Parental Completo</span>
                    <h4 className="text-base font-black text-gray-900">Kaspersky Safe Kids</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Mantenha seus filhos seguros tanto no mundo digital quanto no mundo real com rastreamento GPS e filtros inteligentes de conteúdo.
                </p>
                <div className="space-y-1.5 pt-1">
                  {[
                    'Filtro inteligente de conteúdo adulto e pesquisas seguras no YouTube',
                    'Gerenciamento e limite de tempo de uso de telas e aplicativos',
                    'Rastreamento de localização GPS da criança em tempo real',
                    'Alertas de bateria fraca no celular do seu filho',
                    'Criação de áreas seguras no mapa com notificações de chegada/saída',
                    'Relatórios detalhados de atividades direto no app dos pais',
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[11px] text-gray-700">
                      <Check className="w-3.5 h-3.5 text-nuvv-purple flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Purchasing Options */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Opções para Assinar no seu Plano
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-emerald-500 transition-all flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-black text-gray-900 truncate">Nuvv +Proteção Família</div>
                  <div className="text-[11px] text-gray-500 truncate">5 Dispositivos Kaspersky Plus + 1 Safe Kids</div>
                </div>
                <div className="text-right flex-shrink-0 whitespace-nowrap">
                  <div className="text-sm font-black text-emerald-600 whitespace-nowrap">
                    <span>R$&nbsp;9,90</span><span className="text-[10px] text-gray-400 font-medium ml-0.5">/mês</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAcquire('Nuvv +Proteção Família (R$ 9,90)')}
                    className="text-[11px] font-bold text-nuvv-purple hover:underline whitespace-nowrap"
                  >
                    Adicionar
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 hover:border-emerald-500 transition-all flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-black text-gray-900 truncate">Nuvv +Proteção Família Plus</div>
                  <div className="text-[11px] text-gray-500 truncate">10 Dispositivos Kaspersky Plus + 2 Safe Kids</div>
                </div>
                <div className="text-right flex-shrink-0 whitespace-nowrap">
                  <div className="text-sm font-black text-emerald-600 whitespace-nowrap">
                    <span>R$&nbsp;15,90</span><span className="text-[10px] text-gray-400 font-medium ml-0.5">/mês</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAcquire('Nuvv +Proteção Família Plus (R$ 15,90)')}
                    className="text-[11px] font-bold text-nuvv-purple hover:underline whitespace-nowrap"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
