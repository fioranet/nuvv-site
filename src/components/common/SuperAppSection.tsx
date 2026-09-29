import React, { useState } from 'react';
import {
  Wifi,
  Tv,
  CreditCard,
  Gift,
  FileSignature,
  Download,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Check,
  Activity,
  Film,
  BookOpen,
  Gamepad2,
  Newspaper,
  Barcode,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export type NuvvAppTab = 'wifi' | 'financeiro' | 'indique' | 'apps' | 'contratos';

export const SuperAppSection: React.FC = () => {
  const [nuvvTab, setNuvvTab] = useState<NuvvAppTab>('wifi');

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-nuvv-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-nuvv-purple/20 border border-nuvv-purple/40 text-indigo-300 text-xs font-black tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
            <span>APLICATIVO OFICIAL NUVV</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Controle total da sua conexão{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-400 to-emerald-400">
              na palma da sua mão.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            O <strong>App Nuvv</strong> foi desenvolvido para você ter autonomia completa. Gerencie faturas, altere nome e senha do Wi-Fi, acesse seus streamings e desbloqueie sua conexão em instantes.
          </p>

          {/* Quick Official App Showcase Pill */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex items-center space-x-2.5 px-4 py-2 rounded-2xl bg-slate-900/80 border border-nuvv-purple/40 shadow-md shadow-nuvv-purple/10 backdrop-blur-md">
              <img
                src="/images/apps/app_nuvv_icon.png"
                alt="App Nuvv"
                className="w-8 h-8 rounded-lg object-cover shadow-sm ring-1 ring-white/20"
              />
              <div className="text-left">
                <span className="text-xs font-black text-white block leading-tight">App Nuvv</span>
                <span className="text-[10px] text-indigo-300 font-semibold block leading-tight">Central do Assinante & Conexão</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central App Feature Box */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-900/50 rounded-3xl p-6 sm:p-10 border border-nuvv-purple/30 shadow-2xl shadow-nuvv-purple/10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-80 h-80 bg-nuvv-purple/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 bg-nuvv-purple/30 border border-nuvv-purple/50 px-3 py-1 rounded-full">
                  CENTRAL DO ASSINANTE & AUTONOMIA TOTAL
                </span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  100% Gratuito
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="/images/apps/app_nuvv_icon.png"
                  alt="Ícone App Nuvv"
                  className="w-16 h-16 rounded-2xl shadow-xl shadow-nuvv-purple/40 border-2 border-indigo-400/30 object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    App Nuvv
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Sua conexão, Wi-Fi, faturas simplificadas, suporte e benefícios em um só lugar.
                  </p>
                </div>
              </div>

              {/* Feature Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 py-4 border-y border-white/10 my-6">
                <button
                  type="button"
                  onClick={() => setNuvvTab('wifi')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    nuvvTab === 'wifi'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-black">Meu Wi-Fi</span>
                  <span className="text-[9px] opacity-80">Nome & Senha</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('financeiro')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    nuvvTab === 'financeiro'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-black">Faturas & Pix</span>
                  <span className="text-[9px] opacity-80">2ª Via Rápida</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('indique')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    nuvvTab === 'indique'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-black">Indique Amigos</span>
                  <span className="text-[9px] opacity-80">Ganhe R$ 100</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('apps')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    nuvvTab === 'apps'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Tv className="w-4 h-4 text-purple-400" />
                  <span className="text-[11px] font-black">Streamings</span>
                  <span className="text-[9px] opacity-80">Hub de Benefícios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNuvvTab('contratos')}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer col-span-2 sm:col-span-1 ${
                    nuvvTab === 'contratos'
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <FileSignature className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px] font-black">Contratos</span>
                  <span className="text-[9px] opacity-80">Assinatura Digital</span>
                </button>
              </div>

              {/* Interactive Phone Mockup Frame */}
              <div className="flex justify-center my-6">
                <div className="w-full max-w-[300px] sm:max-w-[320px] aspect-[9/18] bg-slate-950 rounded-[44px] p-3.5 border-4 border-slate-700 shadow-2xl shadow-black ring-1 ring-white/10 relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-950" />
                  </div>

                  {/* Screen Content Container */}
                  <div className="w-full h-full bg-slate-900 rounded-[34px] overflow-hidden p-3.5 pt-8 flex flex-col justify-between relative border border-white/5">
                    
                    {/* Screen 1: Wi-Fi Management */}
                    {nuvvTab === 'wifi' && (
                      <div className="space-y-2.5 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-nuvv-purple to-indigo-700 -mx-3.5 -mt-8 p-3 pt-7 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Gestão da Rede</span>
                            <h4 className="text-xs font-black">MEU WI-FI NUVV</h4>
                          </div>

                          <div className="mt-3 p-3 bg-slate-800/80 rounded-xl border border-white/10 space-y-2">
                            <div>
                              <span className="text-[9px] text-gray-400 block">Nome da Rede (SSID):</span>
                              <div className="text-xs font-black text-white flex items-center justify-between">
                                <span>Nuvv_Fibra_Casa</span>
                                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded">Ativo</span>
                              </div>
                            </div>
                            <div className="pt-1 border-t border-white/10">
                              <span className="text-[9px] text-gray-400 block">Senha Atual:</span>
                              <div className="text-xs font-mono font-bold text-indigo-300">
                                ••••••••••••
                              </div>
                            </div>
                          </div>

                          <div className="mt-2.5 p-2 bg-indigo-950/60 rounded-lg border border-indigo-500/20 text-[10px] text-indigo-200 text-center">
                            <span>Alteração instantânea sem precisar reiniciar o roteador</span>
                          </div>
                        </div>

                        <div className="p-2 bg-slate-800/90 rounded-lg text-center">
                          <span className="text-[9px] text-gray-300 font-bold">Dispositivos conectados: 8</span>
                        </div>
                      </div>
                    )}

                    {/* Screen 2: Financeiro */}
                    {nuvvTab === 'financeiro' && (
                      <div className="space-y-2.5 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 -mx-3.5 -mt-8 p-3 pt-7 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Financeiro</span>
                            <h4 className="text-xs font-black">MINHAS FATURAS</h4>
                          </div>

                          <div className="mt-3 p-3 bg-slate-800/90 rounded-xl border border-white/10 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-gray-300 font-semibold">Mensalidade Fibra</span>
                              <span className="text-xs font-black text-emerald-400">Em dia</span>
                            </div>
                            <div className="text-sm font-black text-white">
                              R$ 109,90 <span className="text-[9px] font-normal text-gray-400">/ Venc. 10/10</span>
                            </div>
                            <div className="pt-2 flex gap-1.5">
                              <div className="flex-1 py-1.5 bg-emerald-600 rounded text-center text-[10px] font-black text-white flex items-center justify-center gap-1 shadow-sm">
                                <span>Pix Copia e Cola</span>
                              </div>
                              <div className="py-1.5 px-2 bg-slate-700 rounded text-center text-[10px] font-black text-gray-200 flex items-center justify-center">
                                <Barcode className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </div>

                          <div className="mt-2.5 p-2 bg-slate-800/60 rounded-lg text-[9px] text-gray-300 text-center">
                            Desbloqueio em confiança em 1 clique se esquecer de pagar
                          </div>
                        </div>

                        <span className="text-[8px] text-gray-500 text-center block">Sem burocracia ou filas de atendimento</span>
                      </div>
                    )}

                    {/* Screen 3: Indique Amigos */}
                    {nuvvTab === 'indique' && (
                      <div className="space-y-2.5 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-amber-600 to-orange-600 -mx-3.5 -mt-8 p-3 pt-7 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Programa Amigo</span>
                            <h4 className="text-xs font-black">INDIQUE E GANHE</h4>
                          </div>

                          <div className="mt-3 p-3 bg-slate-800/90 rounded-xl border border-amber-500/30 text-center space-y-1.5">
                            <span className="text-[10px] text-amber-300 font-bold block">Seu saldo acumulado:</span>
                            <div className="text-xl font-black text-amber-400">R$ 200,00</div>
                            <span className="text-[9px] text-gray-300 block">Aplicado como desconto automático na sua fatura</span>
                          </div>

                          <div className="mt-2 p-2 bg-slate-800 rounded-lg border border-white/5 space-y-1">
                            <span className="text-[8px] text-gray-400 block">Seu código exclusivo:</span>
                            <div className="text-xs font-mono font-black text-white bg-slate-900 py-1 rounded text-center">
                              NUVV-TOP-50
                            </div>
                          </div>
                        </div>

                        <span className="text-[8px] text-amber-300 text-center block font-semibold">Quanto mais amigos indicar, menos você paga</span>
                      </div>
                    )}

                    {/* Screen 4: Streamings & Benefícios */}
                    {nuvvTab === 'apps' && (
                      <div className="space-y-2 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-violet-700 to-indigo-700 -mx-3.5 -mt-8 p-3 pt-7 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Conteúdo & Saúde</span>
                            <h4 className="text-xs font-black">STREAMINGS & BENEFÍCIOS</h4>
                          </div>

                          <div className="mt-2 space-y-1 overflow-y-auto max-h-[220px] pr-0.5">
                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Tv className="w-3 h-3 text-nuvv-green" />
                                <span className="text-[9px] font-bold text-white">NuvvPlay (TV ao Vivo)</span>
                              </div>
                              <span className="text-[8px] text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded">Incluso</span>
                            </div>

                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Film className="w-3 h-3 text-indigo-400" />
                                <span className="text-[9px] font-bold text-white">Max (HBO Max)</span>
                              </div>
                              <span className="text-[8px] text-indigo-300 font-bold bg-indigo-950/60 px-1 py-0.5 rounded">Ativo</span>
                            </div>

                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Activity className="w-3 h-3 text-rose-400" />
                                <span className="text-[9px] font-bold text-white">Telemedicina 24h</span>
                              </div>
                              <span className="text-[8px] text-rose-300 font-bold bg-rose-950/60 px-1 py-0.5 rounded">Saúde</span>
                            </div>

                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Newspaper className="w-3 h-3 text-amber-400" />
                                <span className="text-[9px] font-bold text-white">Bebanca (Revistas)</span>
                              </div>
                              <span className="text-[8px] text-amber-300 font-bold bg-amber-950/60 px-1 py-0.5 rounded">Liberado</span>
                            </div>

                            <div className="p-1.5 bg-slate-800 rounded-lg border border-white/5 flex items-center justify-between">
                              <div className="flex items-center space-x-1.5">
                                <Gamepad2 className="w-3 h-3 text-emerald-400" />
                                <span className="text-[9px] font-bold text-white">Begames (Jogos)</span>
                              </div>
                              <span className="text-[8px] text-emerald-300 font-bold bg-emerald-950/60 px-1 py-0.5 rounded">Liberado</span>
                            </div>

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
                      <div className="space-y-2.5 animate-fade-in flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <div className="bg-gradient-to-r from-blue-700 to-cyan-700 -mx-3.5 -mt-8 p-3 pt-7 text-white text-center rounded-b-xl shadow">
                            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 block">Documentos Digitais</span>
                            <h4 className="text-xs font-black">ASSINATURA ELETRÔNICA</h4>
                          </div>

                          <div className="mt-3 p-3 bg-slate-800/90 rounded-xl border border-white/10 space-y-2">
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

              {/* Highlights Bullets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300 mb-6 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Troque a senha e o nome do seu Wi-Fi direto pelo celular</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Faturas em Boleto, Pix Copia e Cola e Cartão de Crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Indique amigos e ganhe R$ 100 de desconto cumulativo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-nuvv-green flex-shrink-0" />
                  <span>Hub com NuvvPlay TV, Max, Telemedicina 24h, Bebanca e Begames</span>
                </div>
              </div>
            </div>

            {/* Download Row */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                <a
                  href={siteConfig.appGooglePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2.5 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-nuvv-green" />
                  <div className="text-left">
                    <div className="text-[9px] text-gray-400 leading-tight">Baixar no</div>
                    <div className="text-xs font-black leading-tight">Google Play</div>
                  </div>
                </a>

                <a
                  href={siteConfig.appAppleStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center space-x-2.5 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <div className="text-left">
                    <div className="text-[9px] text-gray-400 leading-tight">Baixar na</div>
                    <div className="text-xs font-black leading-tight">App Store</div>
                  </div>
                </a>
              </div>

              <a
                href={siteConfig.areaClienteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-nuvv-purple hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-nuvv-purple/20"
              >
                <span>Acessar Central Web</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
