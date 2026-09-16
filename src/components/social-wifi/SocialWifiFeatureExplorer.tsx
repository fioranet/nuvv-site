import React, { useState } from 'react';
import { SOCIAL_WIFI_FEATURES, SocialWifiFeature } from '../../data/socialWifiData';
import {
  CheckCircle2,
  Users,
  Wifi,
  Target,
  Zap,
  Send,
  BarChart3,
  Star,
  UserCheck,
  DollarSign,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const SocialWifiFeatureExplorer: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('marca');

  const currentFeature =
    SOCIAL_WIFI_FEATURES.find((f) => f.id === activeFeatureId) || SOCIAL_WIFI_FEATURES[1];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-y border-gray-100" id="recursos-wifi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            Tecnologia Completa de Ponta a Ponta
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
            Cada recurso pensado para gerar resultado real.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Veja o que muda na prática ao transformar seu Wi-Fi em uma máquina de marketing e fidelização.
          </p>
        </div>

        {/* 10-Feature Interactive Explorer Box */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: 10 Feature Tabs (01 to 10) */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-gray-100 bg-slate-50/50 p-2 sm:p-3 overflow-y-auto max-h-[640px] space-y-1">
            {SOCIAL_WIFI_FEATURES.map((feature) => {
              const isActive = feature.id === activeFeatureId;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveFeatureId(feature.id)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl text-left transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/20'
                      : 'hover:bg-white text-gray-600 hover:text-nuvv-dark'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs font-black tracking-wider ${
                        isActive ? 'text-indigo-200' : 'text-gray-400 group-hover:text-nuvv-purple'
                      }`}
                    >
                      {feature.stepNumber}
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                      {feature.tag}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold hidden sm:inline-block ${
                      isActive ? 'text-indigo-100' : 'text-gray-400'
                    }`}
                  >
                    {feature.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Feature Details & Live Visual Mockup */}
          <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Feature Text and Stats */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-block px-3 py-1 rounded-md bg-nuvv-purple text-white text-[11px] font-black uppercase tracking-wider">
                  {currentFeature.tag}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-nuvv-dark tracking-tight">
                  {currentFeature.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-nuvv-purple italic">
                  "{currentFeature.subtitle}"
                </p>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {currentFeature.description}
                </p>

                {/* Real Benefit Box */}
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100/80 text-xs text-indigo-950 flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-nuvv-purple text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-nuvv-purple block font-bold">Benefício real:</strong>
                    <span className="text-gray-700 leading-snug">{currentFeature.realBenefit}</span>
                  </div>
                </div>

                {/* Metric Stat Box */}
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-xl text-xs font-black text-nuvv-dark">
                    <Sparkles className="w-4 h-4 text-nuvv-purple" />
                    <span>{currentFeature.statHighlight}</span>
                  </div>
                </div>
              </div>

              {/* Live Interactive Mockup Card */}
              <div className="md:col-span-5">
                <div className="bg-slate-900 rounded-3xl p-4 shadow-xl border-2 border-slate-700 text-white space-y-3">
                  
                  {/* Mockup 1: Captação */}
                  {currentFeature.mockupType === 'captacao' && (
                    <div className="space-y-3">
                      <div className="text-center p-2 bg-slate-800 rounded-xl">
                        <span className="text-[10px] text-gray-400 block font-semibold">FORMULÁRIO INTELIGENTE</span>
                        <h4 className="text-xs font-black text-white">Conecte-se ao Wi-Fi</h4>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-slate-950 rounded-lg border border-white/10 text-gray-300">
                          Nome: <span className="text-white font-bold">Marina Silva</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-white/10 text-gray-300">
                          WhatsApp: <span className="text-emerald-400 font-bold">(11) 98765-4321</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-white/10 text-gray-300">
                          Aniversário: <span className="text-white font-bold">14 de Setembro</span>
                        </div>
                      </div>
                      <button type="button" className="w-full py-2 bg-nuvv-purple text-white font-bold text-xs rounded-xl shadow-sm">
                        Cadastrar e Liberar Internet
                      </button>
                    </div>
                  )}

                  {/* Mockup 2: Marca (Captive Portal) */}
                  {currentFeature.mockupType === 'marca' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-nuvv-purple to-indigo-800 rounded-2xl text-center space-y-1">
                        <div className="w-7 h-7 rounded-lg bg-white/20 text-white font-black text-xs flex items-center justify-center mx-auto">
                          RC
                        </div>
                        <h4 className="text-xs font-bold text-white">Restaurante Central</h4>
                        <span className="text-[10px] text-indigo-200">Wi-Fi gratuito para clientes</span>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-center text-white text-xs font-bold shadow-sm">
                        Peça pelo app e ganhe 10% OFF
                        <span className="block text-[9px] font-normal text-white/90">Promoção válida hoje</span>
                      </div>
                      <button type="button" className="w-full py-2.5 bg-nuvv-purple text-white font-black text-xs rounded-xl shadow-md">
                        Conectar ao Wi-Fi
                      </button>
                      <span className="text-[9px] text-gray-400 text-center block">Ao conectar, você aceita os termos</span>
                    </div>
                  )}

                  {/* Mockup 3: Remarketing */}
                  {currentFeature.mockupType === 'remarketing' && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        META ADS • AUDIÊNCIA PERSONALIZADA
                      </div>
                      <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300">Visitantes últimos 30 dias:</span>
                          <span className="text-orange-400 font-bold">1.842</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full w-3/4" />
                        </div>
                        <div className="flex justify-between text-xs pt-1">
                          <span className="text-gray-300">Lookalike 2% (Semelhantes):</span>
                          <span className="text-sky-400 font-bold">~184k</span>
                        </div>
                      </div>
                      <div className="p-2 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-300 text-center font-bold">
                        ✓ Sincronizado automaticamente com Meta Ads
                      </div>
                    </div>
                  )}

                  {/* Mockup 4: Automação */}
                  {currentFeature.mockupType === 'automacao' && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        AUTOMAÇÕES ATIVAS
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">Boas-vindas</div>
                          <div className="text-[10px] text-gray-400">Imediato no WhatsApp</div>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">ATIVO</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">Aniversário</div>
                          <div className="text-[10px] text-gray-400">Cupom de presente</div>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">ATIVO</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">Reativação 30 dias</div>
                          <div className="text-[10px] text-gray-400">"Saudades de você!"</div>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">ATIVO</span>
                      </div>
                    </div>
                  )}

                  {/* Mockup 5: Campanhas */}
                  {currentFeature.mockupType === 'campanhas' && (
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        DISPARO DE CAMPANHA
                      </div>
                      <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 space-y-1.5">
                        <div className="text-[10px] text-gray-400">Segmento selecionado:</div>
                        <div className="text-xs font-bold text-white">Clientes 25–40 anos (842 pessoas)</div>
                        <div className="flex gap-1.5 pt-1">
                          <span className="px-2 py-0.5 bg-slate-800 text-[9px] rounded text-gray-300">E-mail</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-[9px] rounded text-gray-300">SMS</span>
                          <span className="px-2 py-0.5 bg-emerald-600 text-[9px] rounded text-white font-bold">WhatsApp</span>
                        </div>
                      </div>
                      <div className="p-2 bg-slate-800/80 rounded-xl text-[10px] text-gray-300 italic">
                        "Oi [Nome]! Temos uma novidade especial esperando por você hoje..."
                      </div>
                      <button type="button" className="w-full py-2 bg-nuvv-purple text-white font-bold text-xs rounded-xl">
                        Disparar Campanha
                      </button>
                    </div>
                  )}

                  {/* Mockup 6: Inteligência / Analytics */}
                  {currentFeature.mockupType === 'inteligencia' && (
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        MÉTRICAS DE FLUXO
                      </div>
                      <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Horário de Pico:</span>
                          <span className="text-white font-bold">12h às 14h / 19h às 21h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Permanência Média:</span>
                          <span className="text-emerald-400 font-bold">48 minutos</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Taxa de Retorno:</span>
                          <span className="text-nuvv-purple font-bold">64% dos clientes</span>
                        </div>
                      </div>
                      <div className="p-2 bg-slate-800/70 rounded-xl text-[10px] text-center text-gray-300">
                        📊 Relatórios exportáveis em PDF e Excel
                      </div>
                    </div>
                  )}

                  {/* Mockup 7: Satisfação / NPS */}
                  {currentFeature.mockupType === 'satisfacao' && (
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        PESQUISA DE SATISFAÇÃO
                      </div>
                      <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 space-y-2 text-center">
                        <div className="text-xs font-bold text-white">Como foi sua experiência hoje?</div>
                        <div className="flex justify-center space-x-1.5 text-amber-400 text-sm">
                          ★★★★★
                        </div>
                        <p className="text-[10px] text-gray-400">Avaliou 5 estrelas? Direcionado automaticamente para o Google Review!</p>
                      </div>
                      <div className="p-2 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-[10px] text-emerald-300 text-center font-bold">
                        ⭐ +120 novas avaliações no Google este mês
                      </div>
                    </div>
                  )}

                  {/* Mockup 8: Conhecimento / Fidelidade */}
                  {currentFeature.mockupType === 'conhecimento' && (
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        SEGMENTAÇÃO DE CLIENTES
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="p-2 bg-slate-950 rounded-xl border border-white/10 flex justify-between">
                          <span className="text-white font-bold">Clientes VIP (4+ visitas/mês)</span>
                          <span className="text-emerald-400 font-bold">342</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl border border-white/10 flex justify-between">
                          <span className="text-white font-bold">Novos Visitantes</span>
                          <span className="text-sky-400 font-bold">780</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-xl border border-white/10 flex justify-between">
                          <span className="text-white font-bold">Em risco de abandono (30d+)</span>
                          <span className="text-orange-400 font-bold">115</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mockup 9: Monetização */}
                  {currentFeature.mockupType === 'monetizacao' && (
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        ESPAÇO PUBLICITÁRIO NATIVO
                      </div>
                      <div className="p-3 bg-gradient-to-r from-nuvv-purple to-indigo-900 rounded-2xl text-center space-y-1">
                        <span className="text-[9px] text-indigo-200 uppercase font-semibold">Banner Patrocinado</span>
                        <div className="text-xs font-black text-white">Parceiro Oficial de Vinhos & Carnes</div>
                        <span className="text-[9px] text-emerald-300 font-bold">100% de visualização garantida</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-xl border border-white/10 text-[10px] text-gray-300 text-center">
                        Venda anúncios para fornecedores e parceiros locais
                      </div>
                    </div>
                  )}

                  {/* Mockup 10: Infraestrutura */}
                  {currentFeature.mockupType === 'infraestrutura' && (
                    <div className="space-y-2.5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        CONFORMIDADE JURÍDICA
                      </div>
                      <div className="p-3 bg-slate-950 rounded-2xl border border-white/10 space-y-2 text-xs">
                        <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Lei Geral de Proteção de Dados (LGPD)</span>
                        </div>
                        <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Marco Civil da Internet (Guarda de Logs)</span>
                        </div>
                      </div>
                      <div className="p-2 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-[10px] text-indigo-200 text-center">
                        🔒 Armazenamento criptografado em Data Center Nacional
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
