import React, { useState } from 'react';
import {
  QrCode,
  Smartphone,
  PhoneCall,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Home,
  Building,
  Store,
  Warehouse,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { INTERCOM_COMPARISON, GUARD_INTERCOM_RESIDENTIAL, GUARD_INTERCOM_CONDO_TIERS } from '../../data/guardPlans';

interface GuardIntercomSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export const GuardIntercomSection: React.FC<GuardIntercomSectionProps> = ({ onSelectPlan }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [doorOpened, setDoorOpened] = useState<boolean>(false);

  const handleTestDoor = () => {
    setDoorOpened(true);
    setTimeout(() => setDoorOpened(false), 3000);
  };

  return (
    <section id="intercom-section" className="py-20 sm:py-28 bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-cyan-600" />
            MÓDULO INTERCOM • INTERFONIA VIRTUAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-nuvv-dark tracking-tight">
            Interfone Virtual por QR Code.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">
              Sem tubulação, sem fios e sem quebrar paredes.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Uma placa moderna com QR Code na sua entrada substitui o interfone convencional. O visitante aponta o celular, você recebe a chamada de vídeo onde estiver e abre o portão com 1 toque.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 hover:border-cyan-500/40 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100/80 text-cyan-700 flex items-center justify-center font-bold">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-nuvv-dark">Atendimento a Distância</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Atenda entregadores, visitas e prestadores de serviço pelo celular, mesmo quando estiver no trabalho ou viajando.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 hover:border-cyan-500/40 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100/80 text-teal-700 flex items-center justify-center font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-nuvv-dark">Validação por QR Code</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Placa física exclusiva e personalizada. O visitante só precisa apontar a câmera do celular: não precisa baixar nenhum aplicativo.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 hover:border-cyan-500/40 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-nuvv-dark">Chamada de Vídeo HD</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Veja o rosto de quem está chamando com alta nitidez antes de atender, garantindo segurança total para toda a família.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-gray-200/80 hover:border-cyan-500/40 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold">
              <Unlock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-nuvv-dark">Você no Total Controle</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Abra a fechadura elétrica ou o portão de veículos direto pelo App Nuvv Guard com confirmação criptografada.
            </p>
          </div>
        </div>

        {/* Interactive 3-Step Demonstration */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-[36px] p-8 sm:p-12 text-white border border-cyan-500/20 shadow-2xl mb-16 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
              COMO FUNCIONA NA PRÁTICA
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold">Simples para quem visita, seguro para quem mora</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1: Escaneamento */}
            <div
              onClick={() => setActiveStep(1)}
              className={`cursor-pointer p-6 rounded-3xl transition-all border flex flex-col justify-between ${
                activeStep === 1
                  ? 'bg-slate-800/95 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-cyan-500/30">
                    1
                  </span>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    Escaneamento
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Visitante toca o interfone</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  O visitante escaneia a placa QR Code personalizada instalada no portão. A chamada é disparada de forma instantânea.
                </p>
              </div>

              {/* Micro Illustration 1: QR Code Scanning */}
              <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-cyan-500/30 relative overflow-hidden flex items-center justify-around">
                <div className="p-2.5 bg-cyan-950/80 rounded-xl border border-cyan-400/40 flex flex-col items-center">
                  <QrCode className="w-8 h-8 text-cyan-300 animate-pulse" />
                  <span className="text-[8px] font-bold text-cyan-400 mt-1">Placa no Portão</span>
                </div>
                <div className="h-0.5 w-6 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
                <div className="p-2.5 bg-slate-800 rounded-xl border border-white/10 flex flex-col items-center">
                  <Smartphone className="w-8 h-8 text-emerald-400" />
                  <span className="text-[8px] font-bold text-emerald-300 mt-1">Câmera Celular</span>
                </div>
              </div>
            </div>

            {/* Step 2: Notificação Push & Vídeo */}
            <div
              onClick={() => setActiveStep(2)}
              className={`cursor-pointer p-6 rounded-3xl transition-all border flex flex-col justify-between ${
                activeStep === 2
                  ? 'bg-slate-800/95 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-cyan-500/30">
                    2
                  </span>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    Notificação Push
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Morador atende em vídeo</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Seu smartphone toca com a chamada de vídeo. Você visualiza a imagem nítida, conversa com a pessoa e decide a liberação.
                </p>
              </div>

              {/* Micro Illustration 2: Video Call Screen */}
              <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-cyan-500/30 relative overflow-hidden flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 flex items-center justify-center text-sm font-bold text-white shadow">
                    📦
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white flex items-center gap-1">
                      <span>Entregador</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="text-[8px] text-cyan-300">Chamada de vídeo HD</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-lg bg-emerald-600/90 text-[8px] font-black text-white flex items-center gap-1 shadow">
                  <PhoneCall className="w-2.5 h-2.5" /> Atendendo
                </div>
              </div>
            </div>

            {/* Step 3: Acesso Seguro & Abertura Remota */}
            <div
              onClick={() => setActiveStep(3)}
              className={`cursor-pointer p-6 rounded-3xl transition-all border flex flex-col justify-between ${
                activeStep === 3
                  ? 'bg-slate-800/95 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-cyan-500/30">
                    3
                  </span>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    Acesso Seguro
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Portão liberado com 1 clique</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Com apenas um clique no botão do app, a fechadura é destravada imediatamente. Praticidade absoluta.
                </p>
              </div>

              {/* Micro Illustration 3: Remote Lock Unlock */}
              <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-cyan-500/30 relative overflow-hidden flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white">Fechadura Destravada</div>
                    <div className="text-[8px] text-emerald-400 font-semibold">Comando Criptografado</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-lg bg-cyan-600/90 text-[8px] font-black text-white">
                  1 Clique
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Action Tester */}
          <div className="mt-10 p-4 sm:p-6 bg-slate-900/90 rounded-2xl border border-white/10 max-w-md mx-auto text-center space-y-3">
            <span className="text-xs text-gray-400 block font-medium">Teste o clique de abertura:</span>
            <button
              type="button"
              onClick={handleTestDoor}
              className={`w-full py-3 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                doorOpened
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-cyan-600/30'
              }`}
            >
              {doorOpened ? (
                <>
                  <Unlock className="w-5 h-5 animate-pulse" />
                  <span>PORTÃO LIBERADO COM SUCESSO!</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>SIMULAR ABERTURA REMOTA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Comparison: Interfone Virtual vs Físico */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark">
              Vantagens do Interfone Virtual vs Interfone Físico Tradicional
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Economia real de infraestrutura, elegância e fim dos problemas com chuvas e queima de equipamentos.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 font-bold text-xs uppercase tracking-wider">
              <div className="col-span-12 sm:col-span-4">Critério</div>
              <div className="col-span-12 sm:col-span-4 text-cyan-400 font-black">Interfone Virtual Nuvv Guard</div>
              <div className="col-span-12 sm:col-span-4 text-gray-400">Interfone Físico Convencional</div>
            </div>

            <div className="divide-y divide-gray-100">
              {INTERCOM_COMPARISON.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center hover:bg-slate-50/70 transition-colors">
                  <div className="col-span-12 sm:col-span-4 font-extrabold text-nuvv-dark mb-1 sm:mb-0">
                    {row.benefit}
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-emerald-800 font-semibold flex items-start gap-2 mb-2 sm:mb-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{row.virtual}</span>
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-gray-500 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{row.physical}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scenarios of Use */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col items-center text-center space-y-2">
            <Home className="w-6 h-6 text-nuvv-purple" />
            <h4 className="text-xs font-black text-nuvv-dark">Casas & Sobrados</h4>
            <p className="text-[11px] text-gray-500">Atenda entregas sem precisar sair do sofá ou de casa.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col items-center text-center space-y-2">
            <Building className="w-6 h-6 text-cyan-600" />
            <h4 className="text-xs font-black text-nuvv-dark">Condomínios</h4>
            <p className="text-[11px] text-gray-500">Elimine manutenções de cabeamento e interfones quebrados.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col items-center text-center space-y-2">
            <Store className="w-6 h-6 text-emerald-600" />
            <h4 className="text-xs font-black text-nuvv-dark">Comércios & Escritórios</h4>
            <p className="text-[11px] text-gray-500">Controle de acesso seguro para clientes e fornecedores.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col items-center text-center space-y-2">
            <Warehouse className="w-6 h-6 text-amber-600" />
            <h4 className="text-xs font-black text-nuvv-dark">Galpões & Indústrias</h4>
            <p className="text-[11px] text-gray-500">Portões distantes operados remotamente pela portaria ou celular.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
