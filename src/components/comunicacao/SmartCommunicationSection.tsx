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
  defaultTab?: 'messaging' | 'voice-ai';
  hideTabs?: boolean;
}

export const SmartCommunicationSection: React.FC<SmartCommunicationSectionProps> = ({
  onOpenLeadModal,
  defaultTab = 'messaging',
  hideTabs = false,
}) => {
  const [activeTab, setActiveTab] = useState<'messaging' | 'voice-ai'>(defaultTab);
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
          {!hideTabs && (
            <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-md rounded-2xl mt-8 border border-slate-300/60 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('messaging');
                  setIsPlaying(false);
                }}
                className={`flex items-center space-x-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'messaging'
                    ? 'bg-white text-emerald-700 shadow-md shadow-emerald-700/10'
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
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-gray-600 hover:text-nuvv-dark hover:bg-white/50'
                }`}
              >
                <Bot className="w-4 h-4 text-emerald-300" />
                <span>Agente IA de Voz</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: MENSAGERIA (SMS VS RCS SHOWCASE) */}
        {activeTab === 'messaging' && (
          <div className="space-y-12 animate-fade-in">
            {/* Visual Comparison: Traditional SMS vs Rich RCS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
              {/* Left Column: Traditional SMS Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center">
                {/* Smartphone Device Frame - Slim 19.5:9 Real-device aspect ratio */}
                <div className="w-[285px] sm:w-[305px] rounded-[48px] bg-slate-950 p-3 shadow-2xl border-[6px] border-slate-800 ring-1 ring-white/10 relative transition-transform duration-300 hover:scale-[1.01]">
                  {/* Speaker & Dynamic Island / Camera Notch */}
                  <div className="flex justify-between items-center px-3 pt-0.5 pb-1.5 text-[10px] text-gray-400 font-semibold select-none">
                    <span>14:10</span>
                    <div className="w-16 h-3.5 bg-slate-900 rounded-full flex items-center justify-center space-x-1 border border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-[9px] font-mono">4G</span>
                      <div className="w-2.5 h-1.5 border border-gray-400 rounded-xs" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-slate-100 rounded-[36px] p-3 sm:p-3.5 min-h-[500px] sm:min-h-[520px] flex flex-col justify-between border border-gray-200/90 shadow-inner">
                    <div className="space-y-2.5">
                      {/* App Header */}
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-[10px]">
                            SMS
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-800 block leading-tight">28400</span>
                            <span className="text-[9px] text-gray-500 font-medium">SMS Transacional (Shortcode)</span>
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-400">Hoje</span>
                      </div>

                      {/* SMS Text Bubble 1: 2FA */}
                      <div className="bg-white p-2.5 rounded-2xl rounded-tl-xs border border-gray-200/90 shadow-2xs space-y-1">
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          Nuvv Telecom: Seu código de confirmação para acesso seguro é <strong className="font-mono text-gray-900 bg-gray-100 px-1 py-0.5 rounded">839201</strong>. Válido por 5 minutos. Não compartilhe.
                        </p>
                        <span className="text-[8px] text-gray-400 block text-right">14:10</span>
                      </div>

                      {/* SMS Text Bubble 2: Billing Reminder */}
                      <div className="bg-white p-2.5 rounded-2xl rounded-tl-xs border border-gray-200/90 shadow-2xs space-y-1">
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          Lembrete Nuvv: Sua fatura de R$ 129,90 vence hoje. Acesse nuvv.link/fatura para 2ª via sem juros.
                        </p>
                        <span className="text-[8px] text-gray-400 block text-right">14:12</span>
                      </div>

                      {/* SMS Text Bubble 3: Appointment Confirmation */}
                      <div className="bg-white p-2.5 rounded-2xl rounded-tl-xs border border-gray-200/90 shadow-2xs space-y-1">
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          Agendamento confirmado para 03/10 entre 08h e 12h. Responda 1 para confirmar.
                        </p>
                        <span className="text-[8px] text-gray-400 block text-right">14:15</span>
                      </div>
                    </div>

                    {/* Bottom Area: Input Fake + Feature Tag */}
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      {/* Fake SMS Input Field */}
                      <div className="bg-white rounded-full px-3 py-1.5 border border-gray-300 flex items-center justify-between text-[10px] text-gray-400 shadow-2xs">
                        <span>Mensagem de texto (SMS)...</span>
                        <Send className="w-3 h-3 text-gray-400" />
                      </div>

                      {/* Bottom Feature Tag */}
                      <div className="text-[10px] font-bold text-gray-500 text-center">
                        <span>SMS Tradicional: Texto puro e 2FA</span>
                      </div>
                    </div>
                  </div>

                  {/* Smartphone Home Indicator Bar */}
                  <div className="pt-2 pb-0.5 flex justify-center">
                    <div className="w-24 h-1 bg-slate-500/40 rounded-full" />
                  </div>
                </div>

                <div className="mt-3.5 text-center max-w-[290px]">
                  <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                    SMS Convencional
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">Ideal para alertas urgentes, códigos 2FA e transações críticas em qualquer celular.</p>
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
                {/* Smartphone Device Frame - Slim 19.5:9 Real-device aspect ratio */}
                <div className="w-[285px] sm:w-[305px] rounded-[48px] bg-slate-950 p-3 shadow-2xl border-[6px] border-slate-800 ring-2 ring-nuvv-purple/40 relative transition-transform duration-300 hover:scale-[1.01]">
                  {/* Speaker & Dynamic Island / Camera Notch */}
                  <div className="flex justify-between items-center px-3 pt-0.5 pb-1.5 text-[10px] text-gray-400 font-semibold select-none">
                    <span>14:10</span>
                    <div className="w-16 h-3.5 bg-slate-900 rounded-full flex items-center justify-center space-x-1 border border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-[9px] font-bold text-emerald-400">5G</span>
                      <div className="w-2.5 h-1.5 border border-emerald-400 rounded-xs bg-emerald-400/40" />
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-slate-50 rounded-[36px] p-3 sm:p-3.5 min-h-[500px] sm:min-h-[520px] flex flex-col justify-between border border-indigo-100 shadow-inner">
                    <div className="space-y-2.5">
                      {/* Verified Brand Header */}
                      <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-nuvv-purple text-white flex items-center justify-center font-black text-xs shadow-xs">
                            N
                          </div>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-black text-gray-900 leading-tight">Nuvv Telecom</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            </div>
                            <span className="text-[9px] font-bold text-emerald-600 block leading-none">Remetente Verificado Oficial</span>
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-400">Agora</span>
                      </div>

                      {/* RCS Rich Card with Image & Action Chips */}
                      <div className="bg-white rounded-2xl border border-indigo-100 shadow-xs overflow-hidden space-y-2 pb-2">
                        {/* Visual Banner */}
                        <div className="h-24 bg-gradient-to-r from-nuvv-dark via-slate-900 to-nuvv-purple p-2.5 flex flex-col justify-end text-white relative overflow-hidden">
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[8px] font-extrabold uppercase">
                            Wi-Fi 6 Incluso
                          </div>
                          <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">Fibra 1 Giga Especial</span>
                          <h4 className="text-xs font-black leading-tight">Ultravelocidade para sua Empresa</h4>
                        </div>

                        <div className="px-2.5 space-y-2">
                          <p className="text-[11px] text-gray-600 leading-tight">
                            Olá Juliana! Sua empresa foi selecionada para upgrade com SLA prioritário de 24h.
                          </p>

                          {/* Action Buttons */}
                          <div className="space-y-1.5 pt-0.5">
                            <button
                              type="button"
                              onClick={() => handleConsultantClick('RCS Interativo')}
                              className="w-full py-1.5 px-2.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-[10px] font-bold flex items-center justify-center space-x-1 shadow-xs transition-colors cursor-pointer"
                            >
                              <span>🚀 Ativar Upgrade Imediato</span>
                            </button>
                            <div className="grid grid-cols-2 gap-1">
                              <button
                                type="button"
                                onClick={() => handleConsultantClick('RCS Pix')}
                                className="py-1 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-800 text-[9px] font-bold text-center transition-colors cursor-pointer"
                              >
                                💳 Pagar com Pix
                              </button>
                              <button
                                type="button"
                                onClick={() => handleConsultantClick('RCS Atendimento')}
                                className="py-1 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-800 text-[9px] font-bold text-center transition-colors cursor-pointer"
                              >
                                💬 WhatsApp
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-1 text-[8px] text-gray-400 pt-0.5">
                            <span>Lido 14:11</span>
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Area: Fake RCS Input + Feature Tag */}
                    <div className="space-y-2 pt-2 border-t border-indigo-100">
                      {/* Fake RCS Input Field */}
                      <div className="bg-white rounded-full px-3 py-1.5 border border-indigo-200 flex items-center justify-between text-[10px] text-gray-400 shadow-2xs">
                        <span className="text-gray-500">Mensagem RCS...</span>
                        <div className="flex items-center space-x-1.5">
                          <Sparkles className="w-3 h-3 text-nuvv-purple" />
                          <Send className="w-3 h-3 text-nuvv-purple" />
                        </div>
                      </div>

                      {/* Bottom Tag */}
                      <div className="text-[10px] font-black text-nuvv-purple text-center flex items-center justify-center space-x-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        <span>RCS: Mídia rica, botões e alta conversão</span>
                      </div>
                    </div>
                  </div>

                  {/* Smartphone Home Indicator Bar */}
                  <div className="pt-2 pb-0.5 flex justify-center">
                    <div className="w-24 h-1 bg-slate-500/40 rounded-full" />
                  </div>
                </div>

                <div className="mt-3.5 text-center max-w-[290px]">
                  <span className="text-xs font-black text-nuvv-purple uppercase tracking-wider">
                    RCS Oficial (Rich Communication)
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
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">API & Portal Web de Campanhas</span>
                <h3 className="text-2xl font-black">Pronto para acelerar a comunicação da sua empresa?</h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Integre via API com seus sistemas ou use nosso <strong>Portal Web</strong> para criar campanhas personalizadas, programar agendamentos e acompanhar tudo em tempo real com relatórios completos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleConsultantClick('Mensageria SMS/RCS')}
                className="px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-bold text-sm shadow-lg shadow-nuvv-purple/30 whitespace-nowrap transition-all flex items-center space-x-2 flex-shrink-0 cursor-pointer"
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
                    <span>DEMONSTRAÇÃO DE AGENTE IA DE VOZ</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black">Ouça nosso Agente IA de Voz em Ação</h3>
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
                  onClick={() => handleConsultantClick('Agente IA de Voz')}
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
