import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Wifi,
  Video,
  Tv,
  CreditCard,
  Gift,
  FileSignature,
  Download,
  CheckCircle2,
  ExternalLink,
  Key,
  Share2,
  Sparkles,
  ShieldCheck,
  QrCode,
  Tag,
  PhoneCall,
  Lock,
  Unlock,
  MapPin,
  Check,
  Heart,
  Users,
  Activity,
  Film,
  BookOpen,
  Gamepad2,
  Newspaper,
  Barcode,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export type NuvvAppTab = 'wifi' | 'financeiro' | 'indique' | 'apps' | 'contratos';
export type GuardAppTab = 'vision' | 'intercom' | 'track';

export const SuperAppSection: React.FC = () => {
  const [nuvvTab, setNuvvTab] = useState<NuvvAppTab>('wifi');
  const [guardTab, setGuardTab] = useState<GuardAppTab>('vision');
  const [doorUnlocked, setDoorUnlocked] = useState(false);

  const handleToggleDoor = () => {
    setDoorUnlocked(true);
    setTimeout(() => setDoorUnlocked(false), 2500);
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-nuvv-purple/20 border border-nuvv-purple/40 text-indigo-300 text-xs font-black tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
            <span>NOVO ECOSSISTEMA DIGITAL NUVV</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Dois aplicativos dedicados.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-400 to-emerald-400">
              Controle total da sua conexão e da sua segurança.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Separamos os serviços para oferecer uma experiência ágil e intuitiva. Gerencie faturas, Wi-Fi e streamings no <strong>App Nuvv</strong>. Monitore câmeras, interfone virtual e tags da família no <strong>App Nuvv Guard</strong>.
          </p>

          {/* Quick Official Apps Showcase Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 border border-nuvv-purple/40 shadow-md shadow-nuvv-purple/10 backdrop-blur-md">
              <img
                src="/images/apps/app_nuvv_icon.png"
                alt="App Nuvv"
                className="w-7 h-7 rounded-lg object-cover shadow-sm ring-1 ring-white/20"
              />
              <div className="text-left">
                <span className="text-xs font-black text-white block leading-tight">App Nuvv</span>
                <span className="text-[9px] text-indigo-300 font-semibold block leading-tight">Central & Conexão</span>
              </div>
            </div>

            <span className="text-gray-500 font-bold text-xs">+</span>

            <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 border border-emerald-500/40 shadow-md shadow-emerald-500/10 backdrop-blur-md">
              <img
                src="/images/apps/app_nuvv_guard_icon.png"
                alt="App Nuvv Guard"
                className="w-7 h-7 rounded-lg object-cover shadow-sm ring-1 ring-white/20"
              />
              <div className="text-left">
                <span className="text-xs font-black text-white block leading-tight">App Nuvv Guard</span>
                <span className="text-[9px] text-emerald-300 font-semibold block leading-tight">Segurança & Câmeras</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* ============================================================ */}
          {/* COLUMN 1: APP NUVV (CENTRAL DO ASSINANTE) */}
          {/* ============================================================ */}
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-900/50 rounded-3xl p-6 sm:p-8 border border-nuvv-purple/30 shadow-xl shadow-nuvv-purple/10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md hover:border-nuvv-purple/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-nuvv-purple/10 rounded-full blur-2xl pointer-events-none" />

            {/* Column Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 bg-nuvv-purple/30 border border-nuvv-purple/50 px-3 py-1 rounded-full">
                  CENTRAL DO ASSINANTE & CONEXÃO
                </span>
                <span className="text-xs text-gray-400 font-semibold">Uso diário</span>
              </div>

              <div className="flex items-center space-x-3.5 mb-3">
                <img
                  src="/images/apps/app_nuvv_icon.png"
                  alt="Ícone App Nuvv"
                  className="w-14 h-14 rounded-2xl shadow-xl shadow-nuvv-purple/40 border-2 border-indigo-400/30 object-cover flex-shrink-0 transition-transform hover:scale-105"
                />
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    App Nuvv
                    <span className="text-xs font-bold text-nuvv-green bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">Gratuito</span>
                  </h3>
                  <p className="text-xs text-gray-300">
                    Sua conexão, Wi-Fi, faturas simplificadas e benefícios.
                  </p>
                </div>
              </div>

              {/* Feature Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 py-4 border-y border-white/10 my-4">
                <button
                  type="button"
                  onClick={() => setNuvvTab('wifi')}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    nuvvTab === 'wifi'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Wifi className="w-4 h-4" />
                  <span className="text-[10px] leading-tight">Wi-Fi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('financeiro')}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    nuvvTab === 'financeiro'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[10px] leading-tight">Faturas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('indique')}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    nuvvTab === 'indique'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span className="text-[10px] leading-tight">Indique</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('apps')}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    nuvvTab === 'apps'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span className="text-[10px] leading-tight">Benefícios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('contratos')}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    nuvvTab === 'contratos'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <FileSignature className="w-4 h-4" />
                  <span className="text-[10px] leading-tight">Contratos</span>
                </button>
              </div>

              {/* Phone Mockup Frame for App Nuvv */}
              <div className="flex justify-center my-4">
                <div className="w-full max-w-[280px] sm:max-w-[300px] aspect-[9/18] bg-slate-950 rounded-[40px] p-3 border-4 border-slate-700 shadow-2xl shadow-black ring-1 ring-white/10 relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-950" />
                  </div>

                  <div className="w-full h-full bg-slate-900 rounded-[30px] overflow-hidden flex flex-col justify-between pt-6 pb-2 px-2.5 border border-white/5 text-left">
                    
                    {/* Screen 1: Wi-Fi */}
                    {nuvvTab === 'wifi' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-indigo-700 to-nuvv-purple -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow flex items-center justify-center gap-2">
                            <img src="/images/apps/app_nuvv_icon.png" alt="App Nuvv" className="w-5 h-5 rounded-md border border-white/20 shadow-xs flex-shrink-0" />
                            <div className="text-left">
                              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block leading-tight">Minha Rede</span>
                              <h4 className="text-xs font-black leading-tight">NUVV WI-FI 6 MESH</h4>
                            </div>
                          </div>

                          <div className="mt-2.5 p-2.5 bg-slate-800/90 rounded-xl border border-white/10 space-y-2">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-gray-400">Status da Rede</span>
                              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">ONLINE • 100%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="text-xs font-bold text-white">Nuvv_Casa_5GHz</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 pt-1">
                              <button type="button" className="p-1 bg-slate-700/80 rounded text-[9px] text-white flex items-center justify-center gap-1">
                                <Key className="w-2.5 h-2.5 text-amber-400" /> Trocar Senha
                              </button>
                              <button type="button" className="p-1 bg-slate-700/80 rounded text-[9px] text-white flex items-center justify-center gap-1">
                                <Share2 className="w-2.5 h-2.5 text-sky-400" /> Compartilhar
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 p-2 bg-slate-800/60 rounded-lg text-[10px] space-y-1 text-gray-300">
                            <div className="flex justify-between">
                              <span>Dispositivos conectados:</span>
                              <span className="font-bold text-white">12 aparelhos</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Velocidade contratada:</span>
                              <span className="font-bold text-emerald-400">800 Mega Fibra</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] text-gray-500 text-center block">Sem necessidade de suporte técnico</span>
                      </div>
                    )}

                    {/* Screen 2: Faturas (Boleto, Pix e Cartão de Crédito) */}
                    {nuvvTab === 'financeiro' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-indigo-700 to-nuvv-purple -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Central do Assinante</span>
                            <h4 className="text-xs font-black">MINHAS FATURAS</h4>
                          </div>

                          <div className="mt-2.5 p-2.5 bg-slate-800/90 rounded-xl border border-white/10 space-y-2">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-gray-400">Fatura Aberta</span>
                              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">EM DIA</span>
                            </div>
                            <div>
                              <div className="text-base font-black text-white">R$ 109,90</div>
                              <div className="text-[9px] text-gray-400">Vence em 10 de cada mês</div>
                            </div>

                            {/* 3 Payment Methods */}
                            <div className="pt-1 space-y-1">
                              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Pague fácil e automático por:</span>
                              <div className="grid grid-cols-3 gap-1">
                                <div className="p-1 rounded bg-slate-700/80 text-center border border-white/10">
                                  <span className="text-[8px] font-black text-emerald-400 block">PIX</span>
                                  <span className="text-[7px] text-gray-300">Instantâneo</span>
                                </div>
                                <div className="p-1 rounded bg-slate-700/80 text-center border border-white/10">
                                  <span className="text-[8px] font-black text-indigo-300 block">CARTÃO</span>
                                  <span className="text-[7px] text-gray-300">Crédito</span>
                                </div>
                                <div className="p-1 rounded bg-slate-700/80 text-center border border-white/10">
                                  <span className="text-[8px] font-black text-amber-300 block">BOLETO</span>
                                  <span className="text-[7px] text-gray-300">PDF / Código</span>
                                </div>
                              </div>
                            </div>

                            <button type="button" className="w-full py-1.5 bg-nuvv-purple hover:bg-nuvv-purple-hover rounded-lg text-[10px] font-bold text-white flex items-center justify-center gap-1 shadow">
                              <Sparkles className="w-3 h-3 text-emerald-300" /> Pagar Agora
                            </button>
                          </div>

                          <div className="mt-1.5 p-1.5 bg-slate-800/60 rounded-lg text-[9px] space-y-0.5 text-gray-300">
                            <div className="flex justify-between text-emerald-400 font-medium">
                              <span>Auto-desbloqueio em confiança:</span>
                              <span>Ativo</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Baixa bancária:</span>
                              <span className="text-indigo-300">100% Automática</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] text-gray-500 text-center block">Tudo fácil, rápido e automático</span>
                      </div>
                    )}

                    {/* Screen 3: Indique (R$ 100 de desconto) */}
                    {nuvvTab === 'indique' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-purple-700 to-pink-600 -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Programa de Vantagens</span>
                            <h4 className="text-xs font-black">INDIQUE E GANHE R$ 100</h4>
                          </div>

                          <div className="mt-2.5 p-2.5 bg-slate-800/90 rounded-xl border border-white/10 space-y-2 text-center">
                            <Gift className="w-7 h-7 text-pink-400 mx-auto animate-bounce" />
                            <div>
                              <div className="text-xs font-extrabold text-white">R$ 100 de Desconto</div>
                              <div className="text-[8px] text-pink-300 font-medium">Na sua próxima mensalidade!</div>
                            </div>
                            <p className="text-[9px] text-gray-300 leading-tight">
                              A cada amigo indicado que instalar e pagar a Nuvv Fibra, você ganha <strong>R$ 100,00 de desconto</strong> cumulativo.
                            </p>
                            <button type="button" className="w-full py-1.5 bg-pink-600 hover:bg-pink-500 rounded-lg text-[10px] font-bold text-white shadow">
                              Enviar Link no WhatsApp
                            </button>
                          </div>
                        </div>
                        <span className="text-[8px] text-gray-400 text-center block font-medium">Quanto mais amigos indicar, menos você paga!</span>
                      </div>
                    )}

                    {/* Screen 4: Streamings & Benefícios (Telemedicina, HBO Max, NuvvPlay, Bebanca, Begames, Beeduca) */}
                    {nuvvTab === 'apps' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-violet-700 to-indigo-700 -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Conteúdo & Saúde</span>
                            <h4 className="text-xs font-black">STREAMINGS & BENEFÍCIOS</h4>
                          </div>

                          <div className="mt-2 space-y-1 overflow-y-auto max-h-[220px] pr-0.5">
                            {/* NuvvPlay */}
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Tv className="w-3 h-3 text-nuvv-green" />
                                <span className="text-[9px] font-bold text-white">NuvvPlay (TV ao Vivo)</span>
                              </div>
                              <span className="text-[8px] text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded">Incluso</span>
                            </div>

                            {/* Max (HBO Max) */}
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Film className="w-3 h-3 text-indigo-400" />
                                <span className="text-[9px] font-bold text-white">Max (HBO Max)</span>
                              </div>
                              <span className="text-[8px] text-indigo-300 font-bold bg-indigo-950/60 px-1 py-0.5 rounded">Ativo</span>
                            </div>

                            {/* Telemedicina */}
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Activity className="w-3 h-3 text-rose-400" />
                                <span className="text-[9px] font-bold text-white">Telemedicina 24h</span>
                              </div>
                              <span className="text-[8px] text-rose-300 font-bold bg-rose-950/60 px-1 py-0.5 rounded">Saúde</span>
                            </div>

                            {/* Bebanca */}
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Newspaper className="w-3 h-3 text-amber-400" />
                                <span className="text-[9px] font-bold text-white">Bebanca (Revistas)</span>
                              </div>
                              <span className="text-[8px] text-amber-300 font-bold bg-amber-950/60 px-1 py-0.5 rounded">Liberado</span>
                            </div>

                            {/* Begames */}
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Gamepad2 className="w-3 h-3 text-emerald-400" />
                                <span className="text-[9px] font-bold text-white">Begames (Jogos)</span>
                              </div>
                              <span className="text-[8px] text-emerald-300 font-bold bg-emerald-950/60 px-1 py-0.5 rounded">Liberado</span>
                            </div>

                            {/* Beeduca */}
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <BookOpen className="w-3 h-3 text-cyan-400" />
                                <span className="text-[9px] font-bold text-white">Beeduca (Cursos)</span>
                              </div>
                              <span className="text-[8px] text-cyan-300 font-bold bg-cyan-950/60 px-1 py-0.5 rounded">Liberado</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] text-gray-500 text-center block">Login único sem senhas complicadas</span>
                      </div>
                    )}

                    {/* Screen 5: Contratos */}
                    {nuvvTab === 'contratos' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Documentos Digitais</span>
                            <h4 className="text-xs font-black">ASSINATURA ELETRÔNICA</h4>
                          </div>

                          <div className="mt-2.5 p-2.5 bg-slate-800/90 rounded-xl border border-white/10 space-y-1.5">
                            <div className="flex items-center space-x-2 text-[10px] text-white font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Contrato Fibra Óptica Assinado</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[10px] text-white font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Termo de Comodato Wi-Fi</span>
                            </div>
                            <p className="text-[9px] text-gray-400 pt-1">
                              Validade jurídica nacional sem necessidade de imprimir ou autenticar em cartório.
                            </p>
                          </div>
                        </div>
                        <span className="text-[8px] text-gray-500 text-center block">Conformidade com a legislação</span>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2 text-xs text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Troque a senha e o nome do seu Wi-Fi direto pelo celular</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Faturas com pagamento em Boleto, Pix e Cartão de Crédito automático</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Indique amigos e ganhe R$ 100 de desconto cumulativo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Hub com NuvvPlay TV, Max, Telemedicina 24h, Bebanca, Begames e Beeduca</span>
                </div>
              </div>
            </div>

            {/* Download Row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={siteConfig.appGooglePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-nuvv-green" />
                  <div className="text-left">
                    <div className="text-[8px] text-gray-400 leading-tight">Baixar no</div>
                    <div className="text-[11px] font-black leading-tight">Google Play</div>
                  </div>
                </a>

                <a
                  href={siteConfig.appAppleStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <div className="text-left">
                    <div className="text-[8px] text-gray-400 leading-tight">Baixar na</div>
                    <div className="text-[11px] font-black leading-tight">App Store</div>
                  </div>
                </a>
              </div>

              <a
                href={siteConfig.areaClienteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-nuvv-purple/80 hover:bg-nuvv-purple text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Central Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* COLUMN 2: APP NUVV GUARD (SEGURANÇA INTELIGENTE & FAMÍLIA) */}
          {/* ============================================================ */}
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-900/50 rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md hover:border-emerald-500/60 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Column Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  SEGURANÇA PATRIMONIAL & FAMÍLIA
                </span>
                <span className="text-xs text-emerald-400 font-bold">Novo App</span>
              </div>

              <div className="flex items-center space-x-3.5 mb-3">
                <img
                  src="/images/apps/app_nuvv_guard_icon.png"
                  alt="Ícone App Nuvv Guard"
                  className="w-14 h-14 rounded-2xl shadow-xl shadow-emerald-500/40 border-2 border-emerald-400/30 object-cover flex-shrink-0 transition-transform hover:scale-105"
                />
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    App Nuvv Guard
                    <span className="text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full">3 Módulos</span>
                  </h3>
                  <p className="text-xs text-gray-300">
                    Câmeras em nuvem, interfonia por QR Code e tags da família.
                  </p>
                </div>
              </div>

              {/* Guard Feature Tabs (Vision, Intercom, Track) */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 my-4">
                <button
                  type="button"
                  onClick={() => setGuardTab('vision')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    guardTab === 'vision'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-extrabold">1. Vision</span>
                  <span className="text-[9px] text-gray-300">Câmeras Nuvem</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGuardTab('intercom')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    guardTab === 'intercom'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-extrabold">2. Intercom</span>
                  <span className="text-[9px] text-gray-300">Interfone QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGuardTab('track')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    guardTab === 'track'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-extrabold">3. Track</span>
                  <span className="text-[9px] text-gray-300">Nuvv Tags</span>
                </button>
              </div>

              {/* Phone Mockup Frame for App Nuvv Guard */}
              <div className="flex justify-center my-4">
                <div className="w-full max-w-[280px] sm:max-w-[300px] aspect-[9/18] bg-slate-950 rounded-[40px] p-3 border-4 border-slate-700 shadow-2xl shadow-black ring-1 ring-emerald-500/30 relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-950" />
                  </div>

                  <div className="w-full h-full bg-slate-900 rounded-[30px] overflow-hidden flex flex-col justify-between pt-6 pb-2 px-2.5 border border-white/5 text-left">
                    
                    {/* Screen 1: Vision (Câmeras Gravando em Nuvem) */}
                    {guardTab === 'vision' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow flex items-center justify-center gap-2">
                            <img src="/images/apps/app_nuvv_guard_icon.png" alt="App Nuvv Guard" className="w-5 h-5 rounded-md border border-white/20 shadow-xs flex-shrink-0" />
                            <div className="text-left">
                              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block leading-tight">Módulo Vision</span>
                              <h4 className="text-xs font-black leading-tight">CÂMERA GRAVANDO NA NUVEM</h4>
                            </div>
                          </div>

                          {/* Live Security Camera Frame with Recording Simulation */}
                          <div className="mt-2.5 rounded-xl overflow-hidden border border-emerald-500/40 bg-black relative">
                            <img
                              src="/images/services/vision_image.gif"
                              alt="Câmera Entrada Ao Vivo"
                              className="w-full h-28 object-cover"
                            />
                            <div className="absolute top-1.5 left-1.5 flex items-center space-x-1 bg-red-600/90 px-1.5 py-0.5 rounded text-[7px] font-black text-white shadow">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>REC NUVEM 24H</span>
                            </div>
                            <div className="absolute bottom-1 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[7px] text-emerald-400 font-mono font-bold border border-emerald-500/30">
                              1080p Full HD
                            </div>
                          </div>

                          {/* AI Detection and Timeline */}
                          <div className="mt-2 p-2 bg-slate-800 rounded-lg border border-white/5 space-y-1.5 text-[9px]">
                            <div className="flex justify-between items-center text-gray-300">
                              <span className="font-semibold">Linha do Tempo em Nuvem:</span>
                              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded">7 Dias Salvos</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden flex">
                              <div className="bg-emerald-500 w-2/5" />
                              <div className="bg-amber-400 w-1/12" />
                              <div className="bg-emerald-500 w-1/2" />
                            </div>
                            <div className="text-[8px] text-emerald-300 font-medium">
                              ✓ IA: Detecção humana na entrada às 14:32
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] text-emerald-400 text-center block font-semibold">Sem risco de roubo ou queima do gravador DVR</span>
                      </div>
                    )}

                    {/* Screen 2: Intercom (Interfone com entregador no vídeo e botão de abertura) */}
                    {guardTab === 'intercom' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-cyan-700 to-teal-700 -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Módulo Intercom</span>
                            <h4 className="text-xs font-black">CHAMADA DO INTERFONE</h4>
                          </div>

                          {/* Video Call with Delivery Person at Gate */}
                          <div className="mt-2.5 p-2.5 bg-slate-800/95 rounded-xl border border-cyan-500/40 text-center space-y-2 relative overflow-hidden">
                            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                              <span className="text-[8px] font-bold text-cyan-300 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                Chamada em Vídeo Ativa
                              </span>
                              <span className="text-[7px] text-gray-400">Portão Social</span>
                            </div>

                            <div className="flex items-center space-x-2.5 text-left py-0.5">
                              <div className="w-10 h-10 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-lg shadow">
                                📦
                              </div>
                              <div>
                                <div className="text-[11px] font-black text-white">Entregador com Pacote</div>
                                <div className="text-[8px] text-cyan-200">Escaneou o QR Code no portão</div>
                              </div>
                            </div>

                            {/* Remote Unlock Trigger */}
                            <button
                              type="button"
                              onClick={handleToggleDoor}
                              className={`w-full py-2 rounded-lg text-[10px] font-black flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer ${
                                doorUnlocked
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                              }`}
                            >
                              {doorUnlocked ? (
                                <>
                                  <Unlock className="w-3 h-3 animate-bounce" />
                                  <span>PORTÃO DESTRAVADO!</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3" />
                                  <span>ABRIR PORTÃO PELO APP</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="mt-1.5 p-1.5 bg-slate-800/60 rounded-lg text-[9px] space-y-0.5 text-gray-300">
                            <div className="flex justify-between">
                              <span>Instalação no portão:</span>
                              <span className="text-emerald-400 font-bold">Zero fiação</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Atendimento:</span>
                              <span className="text-cyan-300 font-bold">Pelo celular em qualquer lugar</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] text-cyan-300 text-center block">Total praticidade e segurança para receber visitas</span>
                      </div>
                    )}

                    {/* Screen 3: Track (Mapa de Localização de Tags da Família) */}
                    {guardTab === 'track' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-amber-700 to-orange-700 -mx-2.5 -mt-6 p-3 pt-6 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Módulo Track</span>
                            <h4 className="text-xs font-black">MAPA DE LOCALIZAÇÃO</h4>
                          </div>

                          {/* Map Simulation with Street Grid */}
                          <div className="mt-2.5 p-2 bg-slate-800/95 rounded-xl border border-amber-500/40 space-y-2 relative overflow-hidden">
                            <div className="flex justify-between items-center text-[9px] border-b border-white/10 pb-1">
                              <span className="text-amber-300 font-bold flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-amber-400" />
                                Tags da Família
                              </span>
                              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded text-[7px]">AO VIVO</span>
                            </div>

                            {/* Marker 1: Kids Backpack */}
                            <div className="p-1.5 bg-slate-900 rounded-lg border border-indigo-500/30 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs">🎒</span>
                                <div>
                                  <div className="text-[9px] font-bold text-white">Mochila Filhos</div>
                                  <div className="text-[7px] text-gray-400">Escola • Chegada 07:45</div>
                                </div>
                              </div>
                              <span className="text-[7px] text-indigo-300 font-bold">Seguro</span>
                            </div>

                            {/* Marker 2: Pet */}
                            <div className="p-1.5 bg-slate-900 rounded-lg border border-rose-500/30 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs">🐕</span>
                                <div>
                                  <div className="text-[9px] font-bold text-white">Pet Thor (Coleira)</div>
                                  <div className="text-[7px] text-gray-400">Praça • há 1 min</div>
                                </div>
                              </div>
                              <span className="text-[7px] text-emerald-400 font-bold">Localizado</span>
                            </div>
                          </div>

                          <div className="mt-1.5 p-1.5 bg-slate-800/60 rounded-lg text-[8px] space-y-0.5 text-gray-300">
                            <div className="flex justify-between">
                              <span>Compatibilidade:</span>
                              <span className="text-emerald-400 font-bold">Qualquer smartphone</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Compartilhamento:</span>
                              <span className="text-amber-300 font-bold">Toda a família acessa</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] text-amber-300 text-center block">Sem precisar de iPhone • Sem mensalidade de chip</span>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2 text-xs text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Câmeras com gravação contínua na nuvem 24h sem risco de roubo de DVR</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Interfone Virtual por QR Code com vídeo e liberação remota de portão</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Nuvv Tags para acompanhar crianças, pets e veículos em qualquer celular</span>
                </div>
              </div>
            </div>

            {/* Download & Explore Row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={siteConfig.appGooglePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[8px] text-gray-400 leading-tight">Baixar no</div>
                    <div className="text-[11px] font-black leading-tight">Google Play</div>
                  </div>
                </a>

                <a
                  href={siteConfig.appAppleStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <div className="text-left">
                    <div className="text-[8px] text-gray-400 leading-tight">Baixar na</div>
                    <div className="text-[11px] font-black leading-tight">App Store</div>
                  </div>
                </a>
              </div>

              <Link
                to="/guard"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
              >
                <span>Conhecer Nuvv Guard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
