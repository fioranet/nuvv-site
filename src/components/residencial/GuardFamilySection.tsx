import React, { useState } from 'react';
import {
  ShieldCheck,
  Video,
  Tag,
  QrCode,
  Smartphone,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  PhoneCall,
  Clock,
  ExternalLink,
  ChevronRight,
  Layers,
  Heart,
  Eye,
  Info,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import {
  GUARD_CAMERA_PLANS,
  GUARD_INTERCOM_RESIDENTIAL,
  GUARD_TRACK_PLAN,
} from '../../data/guardPlans';

interface GuardFamilySectionProps {
  onOpenLeadModal: (planName?: string) => void;
}

type GuardModalType = 'cameras' | 'tag' | 'interfone' | null;

export const GuardFamilySection: React.FC<GuardFamilySectionProps> = ({
  onOpenLeadModal,
}) => {
  const [activeModal, setActiveModal] = useState<GuardModalType>(null);
  const [activeTagGalleryTab, setActiveTagGalleryTab] = useState<'kids' | 'pet' | 'vehicles' | 'luggage' | 'urban'>('kids');

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/80 relative overflow-hidden border-t border-slate-200/80">
      {/* Glow decorativo sutil */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/10 text-nuvv-purple text-xs font-black uppercase tracking-wider border border-nuvv-purple/20">
            <ShieldCheck className="w-4 h-4 text-nuvv-purple" />
            <span>Nuvv Guard • Proteção e Segurança Familiar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            O que você mais ama,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-cyan-600">
              protegido dentro e fora de casa.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
            Câmeras na nuvem para sua casa, interfone virtual que abre o portão pelo celular e tags para acompanhar a rota dos filhos e a segurança dos seus pets. Tudo no mesmo ecossistema Nuvv.
          </p>
        </div>

        {/* Grid de 3 Cards Enxutos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* CARD 1: CÂMERAS EM NUVEM */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200/80">
                  Monitoramento em Nuvem
                </span>
                <div className="w-10 h-10 rounded-2xl bg-cyan-100/70 text-cyan-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Câmeras Inteligentes
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Gravação contínua na nuvem de 3 a 30 dias com visualização ao vivo.
                </p>
              </div>

              {/* Preview da Foto Real de Câmeras */}
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 aspect-video relative group/img">
                <img
                  src="/images/guard/camera-baby-pet-showcase.jpg"
                  alt="Câmeras Nuvv com Monitoramento de Bebê, Pets e Casa ao Vivo no Celular"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-[10px] text-white flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3 text-cyan-400" />
                    Ao Vivo: Bebê, Pets & Casa
                  </span>
                  <span className="text-cyan-300 font-extrabold">Gravação em Nuvem</span>
                </div>
              </div>

              <div className="py-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Gravação contínua 24h:</strong> imagens salvas na nuvem sem risco de perda ou roubo.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Alertas de movimento:</strong> notificações instantâneas no seu celular ao detectar movimentação.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Visão noturna nítida:</strong> acompanhe dia e noite em Full HD.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Comodato Nuvv ou câmera própria:</strong> use seu equipamento atual ou alugue com suporte total.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Planos em Nuvem</span>
                  <span className="text-xs font-semibold text-slate-600">a partir de</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">R$ 19,90</span>
                  <span className="text-xs text-slate-500 font-semibold">/mês</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('cameras')}
                className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Ver Planos e Como Funciona</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 2: NUVV TAG (RASTREAMENTO FAMILIAR & PET) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-400/40 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
              Tranquilidade Familiar
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80">
                  Rastreamento & Proteção
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Tag className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Nuvv Tag
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Acompanhe seus filhos na escola, pets, automóveis e bagagens em tempo real.
                </p>
              </div>

              {/* Preview da Imagem Real de Tag */}
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 aspect-video relative group/img">
                <img
                  src="/images/guard/tag-kids-showcase.jpg"
                  alt="Nuvv Tag com Crianças, Pets, Carros e Malas"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-[10px] text-white flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    Filhos, Pets, Carros & Malas
                  </span>
                  <span className="text-amber-300 font-extrabold">Sem Chip Celular</span>
                </div>
              </div>

              <div className="py-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Sem precisar de iPhone:</strong> compatível com qualquer smartphone Android ou iOS.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Compartilhe com a família:</strong> pais e responsáveis acompanham o mesmo mapa.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Múltiplos dispositivos:</strong> monitore filhos, mochilas e pets no mesmo app.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Venda Taxa Única</span>
                  <span className="text-xs font-semibold text-emerald-700">App 100% Isento no Combo</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">R$ 79,90</span>
                  <span className="text-xs text-slate-500 font-semibold block text-[10px]">por tag adquirida</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('tag')}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Conhecer as Vantagens da Tag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 3: INTERFONE VIRTUAL POR QR CODE */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-nuvv-purple/30 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-purple-50 text-nuvv-purple border border-purple-200/80">
                  Interfonia Sem Fios
                </span>
                <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-nuvv-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  Interfone Virtual
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Atenda o portão no celular por chamada de vídeo e abra à distância.
                </p>
              </div>

              {/* Preview da Foto Real do Interfone */}
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 aspect-video relative group/img">
                <img
                  src="/images/guard/interfone-virtual-showcase.jpg"
                  alt="Interfone Virtual Nuvv com Placa QR Code e App de Chamada"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-[10px] text-white flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1">
                    <PhoneCall className="w-3 h-3 text-emerald-400" />
                    Chamada de Vídeo no Celular
                  </span>
                  <span className="text-nuvv-purple font-black bg-white px-1.5 py-0.2 rounded text-[9px]">Abre o Portão</span>
                </div>
              </div>

              <div className="py-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Atenda onde você estiver:</strong> no trabalho, em viagens ou no sofá.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero obras e quebra-quebra:</strong> placa física inclusa sem fiação externa.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Visitante não precisa de app:</strong> apenas aponta a câmera do próprio celular.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Venda Taxa Única</span>
                  <span className="text-xs font-semibold text-emerald-700">Placa Inclusa • Sem Mensalidade</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">R$ 79,90</span>
                  <span className="text-xs text-slate-500 font-semibold block text-[10px]">pagamento único</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('interfone')}
                className="w-full py-3 px-4 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Ver Demonstração e Detalhes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CÂMERAS DE MONITORAMENTO EM NUVEM */}
      {/* ========================================================================= */}
      <Modal
        isOpen={activeModal === 'cameras'}
        onClose={() => setActiveModal(null)}
        maxWidth="3xl"
      >
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm -mt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Câmeras com Gravação em Nuvem</h3>
                <p className="text-xs text-cyan-100">Proteção 24h sem risco de perder filmagens em caso de furto do equipamento</p>
              </div>
            </div>
          </div>

          {/* Foto Real de Câmeras em Nuvem */}
          <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 max-h-64 sm:max-h-72">
            <img
              src="/images/guard/camera-outdoor-showcase.jpg"
              alt="Acesso remoto ao vivo das câmeras externas, jardim e cozinha pelo celular"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Diferente de sistemas com cartão de memória ou gravadores físicos (DVR) que podem ser roubados ou danificados, as <strong>Câmeras Nuvv Guard</strong> gravam continuamente com segurança e transmitem direto para a nuvem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700 bg-cyan-100/60 px-2 py-0.5 rounded">
                  Opção 1 • Câmera Própria (BYOD)
                </span>
                <h4 className="text-sm font-black text-slate-900">Você já tem câmera?</h4>
                <p className="text-xs text-slate-600">
                  Conecte sua câmera Intelbras, TP-Link, Hikvision ou qualquer modelo compatível ONVIF ao nosso serviço de gravação na nuvem.
                </p>
                <div className="pt-2 font-black text-slate-900 text-sm">
                  Apenas R$ 19,90/mês <span className="text-[11px] font-normal text-slate-500">(plano de 7 dias de nuvem)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  Opção 2 • Câmera em Comodato Nuvv
                </span>
                <h4 className="text-sm font-black text-slate-900">Câmera Wi-Fi Inclusa</h4>
                <p className="text-xs text-slate-600">
                  Receba uma Câmera Full HD com visão noturna, áudio bidirecional e suporte técnico com substituição garantida.
                </p>
                <div className="pt-2 font-black text-cyan-900 text-sm">
                  A partir de R$ 39,90/mês <span className="text-[11px] font-normal text-slate-500">(câmera + nuvem)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Planos de Retenção Disponíveis
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GUARD_CAMERA_PLANS.map((plan) => (
                  <div key={plan.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-black text-slate-800 block">{plan.name}</span>
                    <span className="text-[11px] text-cyan-700 font-bold block mt-0.5">
                      {plan.priceBYOD ? `R$ ${plan.priceBYOD.toFixed(2).replace('.', ',')}/mês (nuvem)` : `R$ ${plan.priceComodato.toFixed(2).replace('.', ',')}/mês (c/ câmera)`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                onOpenLeadModal('Nuvv Guard - Câmeras com Gravação em Nuvem');
              }}
              className="py-2.5 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              Quero Contratar Câmeras Nuvv
            </button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 2: NUVV TAG (RASTREAMENTO DE FILHOS, PETS E PERTENCES) */}
      {/* ========================================================================= */}
      <Modal
        isOpen={activeModal === 'tag'}
        onClose={() => setActiveModal(null)}
        maxWidth="3xl"
      >
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm -mt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/30 flex items-center justify-center">
                <Tag className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Nuvv Tag • Rastreamento Familiar</h3>
                <p className="text-xs font-bold text-amber-950/80">Saiba sempre onde está o que você mais ama, com zero complicação</p>
              </div>
            </div>
          </div>

          {/* Abas de Galeria / Demonstração */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2.5">
              <button
                type="button"
                onClick={() => setActiveTagGalleryTab('kids')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTagGalleryTab === 'kids'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Filhos & Escola
              </button>
              <button
                type="button"
                onClick={() => setActiveTagGalleryTab('pet')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTagGalleryTab === 'pet'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Pets de Estimação
              </button>
              <button
                type="button"
                onClick={() => setActiveTagGalleryTab('vehicles')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTagGalleryTab === 'vehicles'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Automóveis & Veículos
              </button>
              <button
                type="button"
                onClick={() => setActiveTagGalleryTab('luggage')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTagGalleryTab === 'luggage'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Malas & Viagens
              </button>
              <button
                type="button"
                onClick={() => setActiveTagGalleryTab('urban')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTagGalleryTab === 'urban'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Mochilas & Chaves
              </button>
            </div>

            {/* Imagem correspondente à aba */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 max-h-64 sm:max-h-72">
              {activeTagGalleryTab === 'kids' && (
                <img
                  src="/images/guard/tag-kids-showcase.jpg"
                  alt="Nuvv Tag para Crianças e Mochilas Escolares"
                  className="w-full h-full object-cover"
                />
              )}
              {activeTagGalleryTab === 'pet' && (
                <img
                  src="/images/guard/tag-pet-showcase.jpg"
                  alt="Nuvv Tag em Coleiras de Pets"
                  className="w-full h-full object-cover"
                />
              )}
              {activeTagGalleryTab === 'vehicles' && (
                <img
                  src="/images/guard/tag-vehicles-showcase.jpg"
                  alt="Nuvv Tag para Automóveis e Veículos"
                  className="w-full h-full object-cover"
                />
              )}
              {activeTagGalleryTab === 'luggage' && (
                <img
                  src="/images/guard/tag-luggage-showcase.jpg"
                  alt="Nuvv Tag para Malas e Bagagens de Viagem"
                  className="w-full h-full object-cover"
                />
              )}
              {activeTagGalleryTab === 'urban' && (
                <img
                  src="/images/guard/tag-urban-showcase.jpg"
                  alt="Nuvv Tag para Mochilas e Chaves"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Vantagens exclusivas solicitadas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <h5 className="text-xs font-black text-slate-900">Sem Exigência de iPhone</h5>
              <p className="text-[11px] text-slate-600">
                Funciona em qualquer smartphone Android ou iOS, sem obrigar a compra de aparelhos caros.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <Users className="w-4 h-4 text-amber-600" />
              <h5 className="text-xs font-black text-slate-900">Compartilhamento Familiar</h5>
              <p className="text-[11px] text-slate-600">
                Múltiplos membros da família (pai, mãe, responsáveis) podem visualizar e acompanhar simultaneamente.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <Layers className="w-4 h-4 text-amber-600" />
              <h5 className="text-xs font-black text-slate-900">Vários Dispositivos</h5>
              <p className="text-[11px] text-slate-600">
                Gerencie as tags dos filhos, do cachorro e da mochila no mesmo mapa e aplicativo.
              </p>
            </div>
          </div>

          {/* Regras Comerciais Transparentes */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Condições Comerciais Transparentes:</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-black text-[11px]">
                Sem pegadinhas
              </span>
            </div>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li><strong>Clientes Nuvv Fibra:</strong> Taxa única de <strong>R$ 79,90</strong> por tag com acesso ao app <strong>100% gratuito e sem mensalidade</strong> enquanto for cliente.</li>
              <li><strong>Caso cancele a internet Nuvv:</strong> Pode manter o serviço de rastreamento das tags por apenas <strong>R$ 9,90/mês</strong> (cobre <strong>até 8 dispositivos</strong> por esse valor).</li>
              <li><strong>Não-clientes Nuvv de internet:</strong> Anuidade de <strong>R$ 79,90/ano</strong> com a Tag já inclusa.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                onOpenLeadModal('Nuvv Guard - Nuvv Tag (Rastreamento Familiar)');
              }}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-sm cursor-pointer"
            >
              Pedir Minha Nuvv Tag (R$ 79,90)
            </button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 3: INTERFONE VIRTUAL POR QR CODE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={activeModal === 'interfone'}
        onClose={() => setActiveModal(null)}
        maxWidth="3xl"
      >
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-nuvv-purple to-indigo-700 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm -mt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Interfone Virtual por QR Code</h3>
                <p className="text-xs text-purple-200">Mais segurança e conveniência: atenda e abra o portão pelo celular</p>
              </div>
            </div>
          </div>

          {/* Imagem Real de Demonstração */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-64 sm:max-h-72">
            <img
              src="/images/guard/interfone-virtual-showcase.jpg"
              alt="Interfone Virtual Nuvv Placa e Chamada de Vídeo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              O <strong>Interfone Virtual Nuvv</strong> substitui a fiação antiga e os interfones que queimam com raios e chuvas. Uma placa física elegante com QR Code exclusivo é fixada na sua entrada.
            </p>

            {/* Passo a Passo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-slate-800 space-y-1">
                <span className="w-6 h-6 rounded-full bg-nuvv-purple text-white font-black text-xs flex items-center justify-center">1</span>
                <h5 className="font-black text-xs text-slate-900">Visitante Aponta o Celular</h5>
                <p className="text-[11px] text-slate-600">Não precisa baixar nenhum app. Ele só lê a placa com a câmera comum.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-slate-800 space-y-1">
                <span className="w-6 h-6 rounded-full bg-nuvv-purple text-white font-black text-xs flex items-center justify-center">2</span>
                <h5 className="font-black text-xs text-slate-900">Chamada de Vídeo</h5>
                <p className="text-[11px] text-slate-600">Seu celular toca instantaneamente mostrando o rosto de quem está chamando.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-slate-800 space-y-1">
                <span className="w-6 h-6 rounded-full bg-nuvv-purple text-white font-black text-xs flex items-center justify-center">3</span>
                <h5 className="font-black text-xs text-slate-900">Abertura Remota</h5>
                <p className="text-[11px] text-slate-600">Você conversa e pode abrir o portão direto pelo app Nuvv Guard com 1 toque.</p>
              </div>
            </div>

            {/* Regras Comerciais */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Regra de Negócio e Valores:</span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-black text-[11px]">
                  Venda em Taxa Única
                </span>
              </div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li><strong>Taxa única de R$ 79,90:</strong> já acompanha a placa física personalizada de alta resistência e ativação.</li>
                <li><strong>Sem mensalidade para cliente Nuvv:</strong> acesso completo ao app enquanto você for cliente de internet Nuvv Fibra.</li>
                <li><strong>Caso cancele a internet Nuvv:</strong> pode manter o serviço de interfone por apenas <strong>R$ 9,90/mês</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="py-2.5 px-4 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                onOpenLeadModal('Nuvv Guard - Interfone Virtual por QR Code');
              }}
              className="py-2.5 px-5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              Solicitar Interfone Virtual (R$ 79,90)
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
