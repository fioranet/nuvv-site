import React, { useState, useEffect, useRef } from 'react';
import {
  Inbox,
  GitFork,
  Megaphone,
  PhoneCall,
  Bot,
  Zap,
  CheckCircle2,
  Layers,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  Radio,
  FileText,
  User,
  Users,
  Send,
  Plus,
  MoreVertical,
  Check,
  Smartphone,
  Mic,
  Volume2,
  PhoneOff,
  Database,
  Table,
  Mail,
  Shield,
  HelpCircle,
  TrendingUp,
  Play,
  Pause,
  Bell,
  CheckCheck,
} from 'lucide-react';

interface MultiAtendimentoTabsShowcaseProps {
  onOpenDemo?: (featureTitle?: string) => void;
}

export const MultiAtendimentoTabsShowcase: React.FC<MultiAtendimentoTabsShowcaseProps> = ({
  onOpenDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'builder' | 'campaigns' | 'voice-ai'>('inbox');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Tab 01 Live Simulation State (Inbox)
  const [inboxStep, setInboxStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Tab 04 Live Voice AI Simulation State
  const [voiceStep, setVoiceStep] = useState<number>(0);
  const [voiceAiStatus, setVoiceAiStatus] = useState<'listening' | 'processing' | 'speaking'>('speaking');

  const tabsConfig = [
    {
      id: 'inbox',
      number: '01',
      title: 'Caixa de entrada inteligente',
      icon: Inbox,
    },
    {
      id: 'builder',
      number: '02',
      title: 'Construtor de Fluxo',
      icon: GitFork,
    },
    {
      id: 'campaigns',
      number: '03',
      title: 'Campanhas e Webhooks',
      icon: Megaphone,
    },
    {
      id: 'voice-ai',
      number: '04',
      title: 'Chamadas de voz com IA',
      icon: PhoneCall,
    },
  ] as const;

  const DURATION_PER_TAB = 8500; // 8.5 seconds per tab

  // Auto rotation timer with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 100;
    const stepIncrement = (intervalTime / DURATION_PER_TAB) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Switch to next tab
          setActiveTab((current) => {
            const currentIndex = tabsConfig.findIndex((t) => t.id === current);
            const nextIndex = (currentIndex + 1) % tabsConfig.length;
            return tabsConfig[nextIndex].id;
          });
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeTab]);

  // Reset progress when manual click
  const handleSelectTab = (tabId: 'inbox' | 'builder' | 'campaigns' | 'voice-ai') => {
    setActiveTab(tabId);
    setProgress(0);
  };

  // Inbox live message simulation loop
  useEffect(() => {
    if (activeTab !== 'inbox') return;

    const inboxInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setInboxStep((prev) => (prev + 1) % 4);
      }, 1400);
    }, 4500);

    return () => clearInterval(inboxInterval);
  }, [activeTab]);

  // Voice AI Live transcript simulation loop
  useEffect(() => {
    if (activeTab !== 'voice-ai') return;

    const voiceInterval = setInterval(() => {
      setVoiceAiStatus('listening');
      setTimeout(() => {
        setVoiceAiStatus('processing');
        setTimeout(() => {
          setVoiceAiStatus('speaking');
          setVoiceStep((prev) => (prev + 1) % 3);
        }, 1000);
      }, 1200);
    }, 4800);

    return () => clearInterval(voiceInterval);
  }, [activeTab]);

  return (
    <section
      className="py-16 sm:py-24 bg-slate-50/60 relative overflow-hidden"
      id="funcionalidades"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 4 Pill/Card Navigation Tabs matching reference */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-2.5 rounded-3xl border border-gray-200/90 shadow-sm">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTab(tab.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl flex items-center space-x-3 text-left transition-all relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-100/90 text-nuvv-dark border-2 border-slate-300/80 shadow-2xs font-black'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-slate-50 border-2 border-transparent font-medium'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? 'bg-nuvv-dark text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                      {tab.number}
                    </span>
                    <span className="text-xs sm:text-xs leading-tight line-clamp-2">{tab.title}</span>
                  </div>

                  {/* Active tab auto-advance progress indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subtitle helper indicator */}
          <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400 mt-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isPaused ? 'Demonstração pausada (passe o mouse para interagir)' : 'Avanço automático a cada 8s'}
            </span>
          </div>
        </div>

        {/* TAB 01: CAIXA DE ENTRADA INTELIGENTE COM ANIMAÇÃO LIVE */}
        {activeTab === 'inbox' && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
                Todas as conversas, <span className="text-emerald-600">um só lugar</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Conecte WhatsApp, Instagram Direct, Facebook Messenger e Telegram em uma caixa de entrada compartilhada com múltiplos atendentes e CRM Kanban integrado.
              </p>
            </div>

            {/* Browser Frame Mockup with Chat Inbox & Pipeline */}
            <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden">
              {/* Browser Top Bar */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-gray-400 pl-4 flex-1 truncate">
                    app.nuvv.com.br/inbox/central-vendas
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp Oficial Conectado (Coexistência Ativa)</span>
                </div>
              </div>

              {/* Inbox Application Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[490px] text-xs">
                {/* Left Sidebar: Conversations List */}
                <div className="md:col-span-4 border-r border-gray-100 p-3 space-y-2 bg-slate-50/50">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      readOnly
                      placeholder="Buscar por cliente, tag ou telefone..."
                      className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-[11px] outline-none"
                    />
                  </div>

                  {/* Live Lead Alert Badge */}
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-[11px] text-emerald-800 animate-pulse">
                    <span className="flex items-center space-x-1.5 font-bold">
                      <Bell className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Novo lead via WhatsApp!</span>
                    </span>
                    <span className="text-[9px] bg-emerald-200 px-1.5 py-0.5 rounded font-black">Agora</span>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      {
                        name: 'Juliana Costa (Nexus Corp)',
                        msg:
                          inboxStep >= 2
                            ? 'Contrato assinado! Quando iniciamos a instalação?'
                            : 'Podemos fechar a proposta com 15 ramais?',
                        time: '14:22',
                        unread: inboxStep % 2 === 0 ? 1 : 0,
                        tag: inboxStep >= 2 ? 'Fechado' : 'Proposta Enviada',
                        tagColor: inboxStep >= 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-700',
                        active: true,
                      },
                      {
                        name: 'Dr. Marcos Silveira',
                        msg: 'Gostaria de agendar a demonstração da IA',
                        time: '14:10',
                        unread: 0,
                        tag: 'Lead Quente',
                        tagColor: 'bg-indigo-100 text-nuvv-purple',
                      },
                      {
                        name: 'AutoPeças Paulista',
                        msg: 'Comprovante Pix de ativação em anexo',
                        time: '13:54',
                        unread: 0,
                        tag: 'Fechado',
                        tagColor: 'bg-emerald-100 text-emerald-800',
                      },
                      {
                        name: 'Lucas Ferreira (Instagram DM)',
                        msg: 'Vi o post no Insta! Qual o valor do plano Pro?',
                        time: '12:30',
                        unread: 2,
                        tag: 'Instagram Direct',
                        tagColor: 'bg-pink-100 text-pink-700',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${
                          item.active
                            ? 'bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                            : 'bg-white/60 hover:bg-white border-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900 truncate max-w-[140px]">{item.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                        </div>
                        <p className="text-gray-500 text-[11px] truncate mb-1.5">{item.msg}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                            {item.tag}
                          </span>
                          {item.unread > 0 && (
                            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white font-bold text-[9px] flex items-center justify-center animate-bounce">
                              {item.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle: Active Chat Window */}
                <div className="md:col-span-8 p-4 flex flex-col justify-between bg-white">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-nuvv-dark text-white flex items-center justify-center font-bold text-xs relative">
                        JC
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-gray-900 text-xs">Juliana Costa</span>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            WhatsApp Oficial
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400">Atendente: Rafael Silva (Vendas)</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-nuvv-purple bg-indigo-50 px-2 py-1 rounded-lg">
                        Funil: Negociação (R$ 4.500)
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenDemo && onOpenDemo('Caixa de Entrada')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                      >
                        Transferir
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages Stream with Live Incoming Updates */}
                  <div className="py-4 space-y-3 flex-1 overflow-y-auto">
                    <div className="flex justify-start">
                      <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm max-w-sm text-gray-700 space-y-1">
                        <p className="leading-relaxed">
                          Olá Rafael! Analisamos a proposta do Nuvv Multiatendimento com os 15 ramais para nossa filial em Suzano.
                        </p>
                        <span className="text-[9px] text-gray-400 block text-right">14:18</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-emerald-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-sm space-y-1">
                        <p className="leading-relaxed">
                          Excelente, Juliana! O contrato inclui as integrações com WhatsApp, Instagram e CRM ilimitado com ativação em até 24h.
                        </p>
                        <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200">
                          <span>14:20</span>
                          <CheckCheck className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm max-w-sm text-gray-700 space-y-1">
                        <p className="leading-relaxed">
                          Podemos fechar a proposta com 15 ramais? Pode enviar o link de assinatura digital.
                        </p>
                        <span className="text-[9px] text-gray-400 block text-right">14:22</span>
                      </div>
                    </div>

                    {/* Animated dynamic incoming message */}
                    {inboxStep >= 1 && (
                      <div className="flex justify-end animate-fade-in">
                        <div className="bg-emerald-600 text-white p-3 rounded-2xl rounded-tr-sm max-w-sm space-y-1 shadow-sm">
                          <p className="leading-relaxed font-medium">
                            Perfeito! Segue o link com 10% de desconto no Pix: <strong>nuvv.com.br/assinar/nexus-489</strong>
                          </p>
                          <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200">
                            <span>14:23</span>
                            <CheckCheck className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {inboxStep >= 2 && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm max-w-sm text-gray-700 space-y-1 border border-emerald-200">
                          <p className="leading-relaxed font-medium text-emerald-900">
                            🎉 Assinatura e Pix confirmados! Muito obrigada pela agilidade!
                          </p>
                          <span className="text-[9px] text-gray-400 block text-right">14:24</span>
                        </div>
                      </div>
                    )}

                    {/* Live Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 px-3 py-2 rounded-2xl rounded-tl-sm flex items-center space-x-1 text-gray-400">
                          <span className="text-[10px] mr-1">Cliente digitando</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input Bar */}
                  <div className="pt-3 border-t border-gray-100 flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value="Seja bem-vinda à Nuvv! Nossos técnicos já iniciaram a configuração..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-[11px] outline-none text-gray-700"
                    />
                    <button
                      type="button"
                      className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center flex-shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 02: CONSTRUTOR DE FLUXO (CORRIGIDO: INÍCIO VISÍVEL E UNCLIPPED) */}
        {activeTab === 'builder' && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
                Crie automações <span className="text-gray-400">sem código</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Arraste nós, conecte etapas e inicie fluxos de chatbot em minutos. Automatize respostas no WhatsApp e Telegram, direcione conversas e acione webhooks — sem precisar de nenhum desenvolvedor.
              </p>
            </div>

            {/* Workflow Canvas Mockup (Fixed width and left visibility) */}
            <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
              {/* Browser Window Header */}
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-300 pl-2">
                    <span className="text-emerald-400">⚡</span>
                    <span>automation-flows / triagem-atendimento-vendas</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-gray-400 bg-slate-800 px-2 py-1 rounded">
                    Salvo automaticamente
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenDemo && onOpenDemo('Construtor de Fluxo')}
                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors"
                  >
                    Publicar Fluxo
                  </button>
                </div>
              </div>

              {/* Canvas Area with Flow Nodes & Right Menu */}
              <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[460px] bg-slate-950">
                {/* Visual Grid Canvas: Ensure Left Item is 100% visible */}
                <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-start lg:justify-center gap-3.5 relative overflow-x-auto">
                  {/* Node 1: Initial Node (Totalmente visível, sem corte) */}
                  <div className="w-56 sm:w-60 bg-slate-900/95 border border-emerald-500/70 rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-2.5 flex-shrink-0 ring-2 ring-emerald-500/20">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Initial Node</span>
                      </div>
                      <span className="text-[9px] text-gray-400 uppercase bg-slate-800 px-1.5 py-0.5 rounded">
                        WA Chatbot
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] text-gray-300">
                      <span className="text-[10px] text-gray-400 block font-bold">Variáveis Capturadas:</span>
                      <div className="p-1.5 bg-slate-950 rounded-lg font-mono text-[10px] text-emerald-300 border border-slate-800">
                        {'{{senderName}}'} | {'{{senderPhone}}'}
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow Connection 1 */}
                  <div className="flex items-center justify-center text-emerald-400 font-bold flex-shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </div>

                  {/* Node 2: Condition Router */}
                  <div className="w-56 sm:w-60 bg-slate-900/95 border border-indigo-500/70 rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-2.5 flex-shrink-0 ring-2 ring-indigo-500/20">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>Condition Router</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="space-y-1.5 text-[11px] text-gray-300">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                        <span className="text-[10px] text-gray-400 block">Mensagem contém:</span>
                        <div className="font-bold text-white bg-slate-900 px-2 py-1 rounded text-[10px]">
                          "quero assinar" OR "planos"
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold block text-right">➔ Rota Vendas</span>
                    </div>
                  </div>

                  {/* Flow Arrow Connection 2 */}
                  <div className="flex items-center justify-center text-emerald-400 font-bold flex-shrink-0">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </div>

                  {/* Node 3: Send Message / AI Transfer */}
                  <div className="w-56 sm:w-60 bg-slate-900/95 border border-nuvv-purple/70 rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-2.5 flex-shrink-0 ring-2 ring-nuvv-purple/20">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple">
                        <Bot className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AI Transfer & Resposta</span>
                      </div>
                      <span className="text-[9px] font-black text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/30">
                        PRO
                      </span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-gray-300">
                      <p className="text-xs text-gray-200 bg-slate-950 p-2 rounded-lg border border-slate-800 leading-tight">
                        "Olá {'{{senderName}}'}! Vi que você quer conhecer nossos planos..."
                      </p>
                      <div className="grid grid-cols-2 gap-1 text-[10px] font-bold">
                        <span className="bg-slate-800 p-1 rounded text-center text-gray-300">🔘 Ver Planos</span>
                        <span className="bg-slate-800 p-1 rounded text-center text-gray-300">🔘 Falar Humano</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Node Menu (Atualizado com Google Services) */}
                <div className="lg:col-span-4 bg-slate-950 border-l border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-black text-white flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Node Menu</span>
                    </span>
                    <span className="text-[10px] text-gray-400">Arraste para o canvas</span>
                  </div>

                  <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar text-xs">
                    {[
                      { name: 'Send Message', desc: 'Texto, imagem ou botões interativos', icon: Send, color: 'text-emerald-400' },
                      { name: 'Condition', desc: 'Roteamento condicional lógico', icon: GitFork, color: 'text-indigo-400' },
                      { name: 'Response Saver', desc: 'Salva variáveis no CRM', icon: Database, color: 'text-blue-400' },
                      { name: 'Make Request (API)', desc: 'Chama webhooks (Shopify/Woo)', icon: Zap, color: 'text-amber-400' },
                      { name: 'Delay / Espera', desc: 'Pausa humanizada de X segundos', icon: Clock, color: 'text-yellow-400' },
                      {
                        name: 'Google Services',
                        desc: 'Sheets, Drive, Calendar, Docs',
                        icon: Table,
                        color: 'text-emerald-400',
                      },
                      { name: 'WhatsApp Forms', desc: 'Formulários nativos WhatsApp Flows', icon: CheckCircle2, color: 'text-teal-400' },
                      { name: 'Agent Transfer', desc: 'Encaminha para operador humano', icon: User, color: 'text-amber-400' },
                      { name: 'AI Transfer (GPT)', desc: 'Assistente inteligente IA', icon: Bot, color: 'text-purple-400', isPro: true },
                    ].map((node, idx) => {
                      const Icon = node.icon;
                      return (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-3.5 h-3.5 ${node.color} flex-shrink-0`} />
                            <div>
                              <span className="font-bold text-white block text-[11px]">{node.name}</span>
                              <span className="text-[9px] text-gray-400">{node.desc}</span>
                            </div>
                          </div>
                          {node.isPro && (
                            <span className="text-[8px] font-black text-amber-300 bg-amber-950 px-1 py-0.5 rounded border border-amber-500/30">
                              PRO
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Chips Bar */}
              <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-gray-300 border border-slate-800 flex items-center space-x-1.5">
                  <Send className="w-3 h-3 text-emerald-400" />
                  <span>Enviar mensagem</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-gray-300 border border-slate-800 flex items-center space-x-1.5">
                  <GitFork className="w-3 h-3 text-indigo-400" />
                  <span>Condição</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-gray-300 border border-slate-800 flex items-center space-x-1.5">
                  <Table className="w-3 h-3 text-emerald-400" />
                  <span>Google Services</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-purple-300 border border-purple-800/40 flex items-center space-x-1.5">
                  <Bot className="w-3 h-3 text-emerald-400" />
                  <span>Transferência de IA</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 03: CAMPANHAS E WEBHOOKS */}
        {activeTab === 'campaigns' && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
                Automatize o contato <span className="text-amber-500">e as integrações</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Envie campanhas em massa, colete leads de formulários do WhatsApp, acione webhooks e conecte seu espaço de trabalho a ferramentas externas em tempo real.
              </p>
            </div>

            {/* 3 Feature Cards matching Screenshot 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card 1: Transmissão em massa */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-400 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-nuvv-dark">Transmissão em massa</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Crie modelos aprovados pela Meta, agende campanhas, personalize variáveis com nome do cliente e acompanhe a entrega em tempo real.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-xs font-bold text-amber-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Taxa de leitura de 94%</span>
                </div>
              </div>

              {/* Card 2: Automação de Webhook */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-nuvv-dark">Automação de Webhook</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Receba eventos de compras (Shopify, WooCommerce, Hotmart), acione fluxos automáticos e sincronize dados com seu CRM ou sistemas internos.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-xs font-bold text-blue-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Eventos em tempo real</span>
                </div>
              </div>

              {/* Card 3: Formulários do WhatsApp */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-400 transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Send className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-nuvv-dark">Formulários do WhatsApp</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Colete leads por meio de formulários nativos do WhatsApp (WhatsApp Flows) e envie as respostas diretamente para suas automações e funis.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Captura de leads nativa</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 04: CHAMADAS DE VOZ COM IA COM TRANSCRIÇÃO ANIMADA EM TEMPO REAL */}
        {activeTab === 'voice-ai' && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-nuvv-dark tracking-tight">
                Inteligência artificial que atende <span className="text-blue-600">todas as chamadas do WhatsApp</span>.
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Implante um agente de IA de voz que atende chamadas do WhatsApp 24 horas por dia, qualificando leads, resolvendo dúvidas de suporte e agendando reuniões automaticamente.
              </p>
            </div>

            {/* Side-by-side: 4 Cards on Left & Phone Mockup on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
              {/* Left Column: 4 Feature Cards */}
              <div className="lg:col-span-7 space-y-3">
                {[
                  {
                    title: 'Agente de voz autônomo',
                    desc: 'Atende chamadas 24 horas por dia, 7 dias por semana, usando sua base de conhecimento treinada — sem necessidade de um agente humano.',
                    icon: Bot,
                  },
                  {
                    title: 'Resposta em menos de um segundo',
                    desc: 'Respostas em menos de 1,2 segundos, mais rápido do que qualquer equipe de suporte humano.',
                    icon: Zap,
                  },
                  {
                    title: 'Transcrição ao vivo',
                    desc: 'Todas as chamadas são transcritas e sincronizadas com seu CRM em tempo real.',
                    icon: FileText,
                  },
                  {
                    title: 'Roteamento inteligente de chamadas',
                    desc: 'Encaminha consultas complexas para agentes humanos e lida com o resto automaticamente.',
                    icon: GitFork,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex items-start space-x-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-black text-nuvv-dark">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: WhatsApp Phone Call Mockup with Live Streaming Transcript */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-xs rounded-[36px] bg-slate-950 p-4 shadow-2xl border-4 border-slate-900">
                  {/* Phone Screen in Dark Green WhatsApp Theme */}
                  <div className="bg-[#0b2b26] rounded-[28px] p-4 text-white min-h-[470px] flex flex-col justify-between border border-emerald-800/40 relative overflow-hidden">
                    {/* Top Status */}
                    <div className="flex items-center justify-between text-[10px] text-gray-300">
                      <span className="font-bold">9:41</span>
                      <span className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>WhatsApp • Criptografado</span>
                      </span>
                    </div>

                    {/* Center Avatar & Call Status */}
                    <div className="text-center space-y-2 py-3 my-auto">
                      <div className="w-18 h-18 rounded-full bg-[#128c7e] text-white flex items-center justify-center mx-auto shadow-xl ring-4 ring-emerald-400/30 animate-pulse">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black">Assistente de IA Nuvv</h4>
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center justify-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>
                            {voiceAiStatus === 'listening'
                              ? 'Ouvindo cliente...'
                              : voiceAiStatus === 'processing'
                              ? 'Processando com IA...'
                              : 'Falando com cliente • 00:14'}
                          </span>
                        </span>
                      </div>

                      {/* Soundwave effect */}
                      <div className="flex items-center justify-center space-x-1 py-1.5 h-6">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 bg-emerald-400/80 rounded-full transition-all duration-150 ${
                              voiceAiStatus === 'speaking' ? 'animate-pulse' : 'h-1.5 opacity-40'
                            }`}
                            style={{ height: voiceAiStatus === 'speaking' ? `${8 + (i % 5) * 4}px` : '4px' }}
                          />
                        ))}
                      </div>

                      {/* Live Streaming Transcript Box */}
                      <div className="bg-slate-950/80 p-3 rounded-2xl border border-emerald-500/30 text-left text-[11px] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider">
                            ● Transcrição ao Vivo
                          </span>
                          <span className="text-[9px] text-gray-400 font-mono">Tempo real</span>
                        </div>

                        <p className="text-gray-300">
                          <strong>Você:</strong> Olá, gostaria de saber o status da minha internet.
                        </p>

                        <p className="text-emerald-300 font-medium animate-fade-in">
                          <strong>IA:</strong> Olá! O link de fibra óptica da sua empresa está 100% operacional com 0ms de perda de pacotes.
                        </p>

                        {voiceStep >= 1 && (
                          <p className="text-gray-300 animate-fade-in">
                            <strong>Você:</strong> Posso agendar uma visita técnica preventiva?
                          </p>
                        )}

                        {voiceStep >= 2 && (
                          <p className="text-emerald-300 font-medium animate-fade-in">
                            <strong>IA:</strong> Claro! Agendado com sucesso para amanhã às 10h com o técnico Rafael.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Call Action Icons */}
                    <div className="flex items-center justify-around pt-3 border-t border-emerald-800/40">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-9 h-9 rounded-full bg-slate-800 text-gray-300 flex items-center justify-center">
                          <Mic className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] text-gray-400">Mudo</span>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
                          <PhoneOff className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] text-gray-300 font-bold">Fim</span>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-9 h-9 rounded-full bg-slate-800 text-gray-300 flex items-center justify-center">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] text-gray-400">Palestrante</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
