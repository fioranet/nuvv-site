import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  PhoneCall,
  Bot,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Phone,
  Smartphone,
  Check,
  Zap,
  Globe,
  Radio,
  Clock,
  Layers,
  FileCode,
  Share2,
} from 'lucide-react';
import {
  RCS_VS_SMS_METRICS,
  VOICE_AI_SCENARIOS,
  VoiceScenario,
} from '../../data/communicationData';
import { siteConfig } from '../../data/siteConfig';

interface SmartCommunicationSectionProps {
  onOpenLeadModal?: (planOrServiceName?: string) => void;
}

export const SmartCommunicationSection: React.FC<SmartCommunicationSectionProps> = ({
  onOpenLeadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'messaging' | 'voice-ai'>('messaging');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [activeSpeechBubble, setActiveSpeechBubble] = useState<number>(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('0:00');

  const scenario = VOICE_AI_SCENARIOS[selectedScenarioIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio playback with dialogue stepper
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    const progressPct = Math.min((current / duration) * 100, 100);
    setAudioProgress(progressPct);

    // Format current time
    const mins = Math.floor(current / 60);
    const secs = Math.floor(current % 60);
    setCurrentTimeFormatted(`${mins}:${secs < 10 ? '0' : ''}${secs}`);

    // Map time to current dialogue turn
    const fraction = current / duration;
    const bubbleIndex = Math.min(
      Math.floor(fraction * scenario.dialogue.length),
      scenario.dialogue.length - 1
    );
    setActiveSpeechBubble(bubbleIndex);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
    setActiveSpeechBubble(0);
    setCurrentTimeFormatted('0:00');
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(true);
        });
    }
  };

  const handleSelectScenario = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setAudioProgress(0);
    setActiveSpeechBubble(0);
    setCurrentTimeFormatted('0:00');
    setSelectedScenarioIndex(index);
  };

  const handleConsultantClick = (serviceName: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(`Comunicação Inteligente - ${serviceName}`);
    } else {
      const text = `Olá! Gostaria de uma consultoria sobre a solução de ${serviceName} da Nuvv.`;
      window.open(
        `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden" id="comunicacao-inteligente">
      {/* Background Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-500/10 via-emerald-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-nuvv-purple text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
            <span>Ecossistema de Mensageria & IA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-tight">
            Revolucione o Atendimento e as Vendas da sua Empresa
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
            Conecte sua marca aos clientes pelos canais mais eficientes. Combine o impacto visual do <strong>RCS/SMS Verificado</strong> com o atendimento telefônico humanizado do nosso <strong>Agente de Voz IA 24/7</strong>.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-md rounded-2xl mt-8 border border-slate-300/60 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setActiveTab('messaging');
                setIsPlaying(false);
              }}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'messaging'
                  ? 'bg-white text-nuvv-purple shadow-md shadow-nuvv-purple/10'
                  : 'text-gray-600 hover:text-nuvv-dark hover:bg-white/50'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Mensageria (SMS & RCS)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('voice-ai')}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'voice-ai'
                  ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30'
                  : 'text-gray-600 hover:text-nuvv-dark hover:bg-white/50'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Agente de Voz com IA</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MENSAGERIA (SMS VS RCS SHOWCASE) */}
        {activeTab === 'messaging' && (
          <div className="space-y-12 animate-fade-in">
            {/* Visual Comparison: Traditional SMS vs Rich RCS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
              {/* Left Column: Traditional SMS Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm rounded-[32px] bg-slate-900 p-4 shadow-2xl border-4 border-slate-800">
                  {/* Phone Speaker & Camera Notch */}
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-slate-100 rounded-[24px] p-4 min-h-[380px] flex flex-col justify-between border border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-xs">
                            SMS
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-800 block">28400 (Shortcode)</span>
                            <span className="text-[10px] text-gray-400">SMS Transacional</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400">Hoje 14:10</span>
                      </div>

                      {/* SMS Text Bubble */}
                      <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-xs space-y-1">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Nuvv Telecom: Seu codigo de confirmacao para acesso seguro e <strong>839201</strong>. Valido por 5 minutos. Nao compartilhe este codigo.
                        </p>
                        <span className="text-[9px] text-gray-400 block text-right">14:10</span>
                      </div>

                      <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-xs space-y-1">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Lembrete: Sua fatura de R$ 129,90 vence hoje. Acesse nuvv.link/fatura para obter a 2a via.
                        </p>
                        <span className="text-[9px] text-gray-400 block text-right">14:12</span>
                      </div>
                    </div>

                    {/* Bottom Feature Tag */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-[11px] font-bold text-gray-500 text-center flex items-center justify-center space-x-1">
                        <span>SMS Tradicional: Texto puro e 2FA</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                    SMS Convencional
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">Ideal para alertas urgentes, códigos 2FA e transações críticas.</p>
                </div>
              </div>

              {/* Center VS Indicator */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-3 py-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nuvv-purple to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-nuvv-purple/30">
                  VS
                </div>
                <span className="text-[11px] font-bold text-nuvv-purple bg-indigo-50 px-2.5 py-1 rounded-full text-center">
                  Evolução Digital
                </span>
              </div>

              {/* Right Column: RCS Rich Media Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm rounded-[32px] bg-slate-900 p-4 shadow-2xl border-4 border-nuvv-purple/60 ring-4 ring-nuvv-purple/20">
                  {/* Phone Speaker & Camera Notch */}
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-slate-50 rounded-[24px] p-4 min-h-[380px] flex flex-col justify-between border border-indigo-100">
                    <div className="space-y-3">
                      {/* Verified Brand Header */}
                      <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-nuvv-purple text-white flex items-center justify-center font-black text-xs shadow-xs">
                            N
                          </div>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-black text-gray-900">Nuvv Telecom</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600">Remetente Verificado Oficial</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400">Agora</span>
                      </div>

                      {/* RCS Rich Card with Image & Action Chips */}
                      <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden space-y-2.5 pb-2">
                        {/* Visual Banner */}
                        <div className="h-28 bg-gradient-to-r from-nuvv-dark via-slate-900 to-nuvv-purple p-3 flex flex-col justify-end text-white relative overflow-hidden">
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-[9px] font-extrabold uppercase">
                            Wi-Fi 6 Incluso
                          </div>
                          <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Fibra 1 Giga Especial</span>
                          <h4 className="text-sm font-black leading-tight">Ultravelocidade para sua Empresa</h4>
                        </div>

                        <div className="px-3 space-y-2">
                          <p className="text-xs text-gray-600 leading-tight">
                            Olá Juliana! Sua empresa foi selecionada para upgrade de velocidade com SLA prioritário de 24h.
                          </p>

                          {/* Action Buttons */}
                          <div className="space-y-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => handleConsultantClick('RCS Interativo')}
                              className="w-full py-1.5 px-3 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-[11px] font-bold flex items-center justify-center space-x-1 shadow-xs transition-colors"
                            >
                              <span>🚀 Ativar Upgrade Imediato</span>
                            </button>
                            <div className="grid grid-cols-2 gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleConsultantClick('RCS Pix')}
                                className="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 text-[10px] font-bold text-center transition-colors"
                              >
                                💳 Pagar com Pix
                              </button>
                              <button
                                type="button"
                                onClick={() => handleConsultantClick('RCS Atendimento')}
                                className="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 text-[10px] font-bold text-center transition-colors"
                              >
                                💬 Falar no WhatsApp
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Tag */}
                    <div className="pt-2 border-t border-indigo-100 text-center">
                      <span className="text-[11px] font-black text-nuvv-purple flex items-center justify-center space-x-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        <span>RCS: Mídia rica, botões e alta conversão</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs font-black text-nuvv-purple uppercase tracking-wider">
                    RCS Oficial (Rich Communication Services)
                  </span>
                  <p className="text-xs text-gray-600 mt-0.5">Comunicação interativa com botões, imagens, remetente verificado e métricas completas.</p>
                </div>
              </div>
            </div>

            {/* Metrics & Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-6">
              {RCS_VS_SMS_METRICS.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-2 hover:border-nuvv-purple/40 hover:shadow-md transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-nuvv-purple">{item.metric}</div>
                  <h4 className="text-sm font-black text-nuvv-dark">{item.label}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Box for Messaging */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-nuvv-dark to-slate-900 text-white max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-indigo-500/20">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">API de Mensageria Corporativa</span>
                <h3 className="text-2xl font-black">Pronto para acelerar a comunicação da sua empresa?</h3>
                <p className="text-xs sm:text-sm text-gray-300">Integração simplificada com CRMs, ERPs e e-commerces com faturamento por volume enviado.</p>
              </div>
              <button
                type="button"
                onClick={() => handleConsultantClick('Mensageria SMS/RCS')}
                className="px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-sm shadow-lg shadow-nuvv-purple/30 whitespace-nowrap transition-all flex items-center space-x-2 flex-shrink-0"
              >
                <span>Falar com um Consultor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AGENTE DE VOZ COM IA (TELEFONIA & SIP) */}
        {activeTab === 'voice-ai' && (
          <div className="space-y-12 animate-fade-in">
            {/* Top Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Atendimento 24/7 Imediato',
                  desc: 'Zero tempo de espera. O agente atende dezenas de ligações simultâneas no primeiro toque.',
                  icon: Clock,
                },
                {
                  title: 'Linguagem Natural (Sem Menus)',
                  desc: 'Compreende sotaques, gírias e contexto. Esqueça as antigas URAs mecânicas "digite 1 ou 2".',
                  icon: Bot,
                },
                {
                  title: 'Integração PABX & SIP',
                  desc: 'Conectado nativamente ao PABX em Nuvem Nuvv. Faz e recebe chamadas pela sua linha telefônica.',
                  icon: PhoneCall,
                },
                {
                  title: 'Transbordo Humanizado',
                  desc: 'Se necessário, transfere a chamada para um atendente humano repassando todo o contexto prévio.',
                  icon: ShieldCheck,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-3 hover:border-nuvv-purple/40 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-black text-nuvv-dark">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Interactive Audio Experience ("Ouça nosso Agente IA em Ação") */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl max-w-5xl mx-auto space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />

              {/* Player Top Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/50 text-emerald-400 text-xs font-bold mb-2">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>DEMONSTRAÇÃO DE VOZ E TELEFONIA IA</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black">Ouça nosso Agente IA em Ação</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Selecione um cenário de negócio e acompanhe a conversa natural entre o cliente e nosso agente virtual.
                  </p>
                </div>

                {/* Scenarios Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  {VOICE_AI_SCENARIOS.map((sc, idx) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => handleSelectScenario(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedScenarioIndex === idx
                          ? 'bg-nuvv-purple text-white shadow-md shadow-nuvv-purple/30 ring-1 ring-white/20'
                          : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {sc.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Controls & Waveform Bar */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                {/* Hidden Real HTML5 Audio Element */}
                <audio
                  ref={audioRef}
                  src={scenario.audioSrc}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleAudioEnded}
                  preload="auto"
                />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="w-14 h-14 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white flex items-center justify-center shadow-lg shadow-nuvv-purple/40 transition-transform active:scale-95 flex-shrink-0"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-white">{scenario.title}</h4>
                      <p className="text-xs text-gray-400">{scenario.tagline}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {scenario.category}
                    </span>
                    <span className="text-xs text-emerald-400 block mt-1 font-mono">
                      {isPlaying ? currentTimeFormatted : '0:00'} / {scenario.duration}
                    </span>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className="flex items-center space-x-1 h-12 px-2 bg-slate-900/90 rounded-xl overflow-hidden">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const activeBar = (i / 48) * 100 <= audioProgress;
                    const baseHeight = ((Math.sin(i * 0.4) + 1.2) / 2.2) * 80 + 15;
                    const animatedHeight = isPlaying
                      ? `${Math.max(20, Math.min(95, baseHeight + Math.sin(Date.now() / 200 + i) * 15))}%`
                      : `${baseHeight}%`;

                    return (
                      <div
                        key={i}
                        style={{ height: animatedHeight }}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          activeBar ? 'bg-emerald-400 shadow-xs shadow-emerald-400/50' : 'bg-slate-700/60'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Live Interactive Transcript Dialog */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 px-1">
                  <span>Transcrição da Chamada em Tempo Real</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Linguagem Natural Português (Brasil)</span>
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {scenario.dialogue.map((item, idx) => {
                    const isAgent = item.speaker === 'agent';
                    const isCurrent = isPlaying && activeSpeechBubble === idx;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl text-xs transition-all flex items-start space-x-3 ${
                          isAgent
                            ? isCurrent
                              ? 'bg-nuvv-purple/30 border border-nuvv-purple text-white shadow-md'
                              : 'bg-slate-800/80 text-gray-200 border border-slate-700/60'
                            : isCurrent
                            ? 'bg-emerald-950/60 border border-emerald-500/80 text-emerald-100 shadow-md ml-6 sm:ml-12'
                            : 'bg-slate-950/60 text-gray-300 border border-slate-800/80 ml-6 sm:ml-12'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            isAgent ? 'bg-nuvv-purple text-white' : 'bg-slate-700 text-gray-200'
                          }`}
                        >
                          {isAgent ? <Bot className="w-4 h-4 text-emerald-400" /> : 'C'}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-gray-300">{item.speakerName}</span>
                            <span className="text-[10px] text-gray-500 font-mono">{item.time}</span>
                          </div>
                          <p className="leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA Button inside Voice AI Box */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400 text-center sm:text-left">
                  Implantamos e treinamos o agente com a base de conhecimento e regras da sua empresa em poucos dias.
                </p>
                <button
                  type="button"
                  onClick={() => handleConsultantClick('Agente de Voz IA')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-emerald-500/20 transition-all active:scale-98 flex items-center space-x-2"
                >
                  <span>Agendar Demonstração ao Vivo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
