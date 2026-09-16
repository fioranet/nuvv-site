import React, { useState, useEffect } from 'react';
import {
  Video,
  QrCode,
  Tag,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Lock,
  Unlock,
  Sparkles,
  MapPin,
  Heart,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface GuardHeroProps {
  onScrollToCalculator: () => void;
  onOpenLeadModal?: (planName?: string) => void;
}

export const GuardHero: React.FC<GuardHeroProps> = ({
  onScrollToCalculator,
  onOpenLeadModal,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [doorUnlocked, setDoorUnlocked] = useState<boolean>(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleOpenWhatsApp = () => {
    const text = 'Olá! Gostaria de saber mais sobre o Nuvv Guard (Câmeras com gravação, Interfone Virtual e Tags) e solicitar um orçamento.';
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTestDoor = () => {
    setDoorUnlocked(true);
    setTimeout(() => setDoorUnlocked(false), 2500);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/15 to-white pt-6 pb-12 sm:pt-8 sm:pb-14 border-b border-emerald-100/50">
      {/* Background Ambient Light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Value Props */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NUVV GUARD • SEGURANÇA INTELIGENTE & FAMÍLIA</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-nuvv-dark tracking-tight leading-[1.15]">
              Proteção completa para <br />
              <span className="text-gradient-green">sua casa, seus filhos e seu patrimônio.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Câmeras com gravação contínua na nuvem sem risco de roubo do DVR, interfone virtual por QR Code no portão e tags para saber onde estão seus filhos, pets e veículos. Tudo integrado no <strong>App Nuvv Guard</strong>.
            </p>

            {/* 4 Core Value Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5 text-xs font-bold text-gray-800">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Video className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Câmeras com Gravação Nuvem</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <QrCode className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Interfone Virtual QR Code</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Heart className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span>Tags para Crianças & Pets</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                <span>Toda a Família Conectada</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onScrollToCalculator}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
              >
                <span>Calcular Meu Plano Guard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-200 text-slate-800 font-bold text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Falar com Especialista</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Interactive Simulated Screens (Camera, Intercom Call, Location Map) */}
          <div
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group aspect-[4/3] flex flex-col justify-between">
              
              {/* SLIDE 1: SIMULAÇÃO CÂMERA DE GRAVAÇÃO (VISION) */}
              {activeSlide === 0 && (
                <div className="relative w-full h-full flex flex-col justify-between p-4 animate-fade-in overflow-hidden">
                  {/* Real animated camera recording gif */}
                  <img
                    src="/images/services/vision_image.gif"
                    alt="Câmera de Segurança Nuvv Guard Ao Vivo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-red-600/90 text-white px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider shadow">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>AO VIVO • REC NUVEM 24H</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      1080p FULL HD
                    </span>
                  </div>

                  {/* Motion Detection Box Overlay */}
                  <div className="relative z-10 my-auto self-center p-2.5 rounded-xl border border-emerald-400/80 bg-slate-950/60 backdrop-blur-xs text-center max-w-[210px] shadow-lg">
                    <span className="text-[9px] font-black uppercase text-emerald-300 block tracking-wider">
                      IA: Detecção Ativa
                    </span>
                    <span className="text-xs font-bold text-white">Visualização no App</span>
                  </div>

                  {/* Bottom Bar */}
                  <div className="relative z-10 flex items-end justify-between text-white">
                    <div>
                      <div className="text-xs font-black">Câmera 01 • Transmissão em Nuvem</div>
                      <div className="text-[10px] text-gray-300">Imagens protegidas no Data Center</div>
                    </div>
                    <span className="text-[9px] text-emerald-300 font-semibold bg-black/70 px-2 py-1 rounded-lg border border-white/10">
                      App Nuvv Guard
                    </span>
                  </div>
                </div>
              )}

              {/* SLIDE 2: SIMULAÇÃO CHAMADA DE INTERFONE (INTERCOM) */}
              {activeSlide === 1 && (
                <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white animate-fade-in">
                  {/* Top Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center space-x-2">
                      <QrCode className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-300">Interfone Virtual • Portão Social</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      EM VÍDEO
                    </span>
                  </div>

                  {/* Center Video Call Frame (Simulating delivery person at gate) */}
                  <div className="my-auto p-3 rounded-2xl bg-slate-800/90 border border-cyan-500/40 text-center space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-xl font-black text-cyan-300">
                        📦
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-extrabold text-white">Entregador com Encomenda</div>
                        <div className="text-[10px] text-gray-300">Escaneou o QR Code no portão da frente</div>
                      </div>
                    </div>

                    {/* Remote Unlock Trigger */}
                    <button
                      type="button"
                      onClick={handleTestDoor}
                      className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                        doorUnlocked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                      }`}
                    >
                      {doorUnlocked ? (
                        <>
                          <Unlock className="w-3.5 h-3.5 animate-bounce" />
                          <span>PORTÃO DESTRAVADO!</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>ABRIR PORTÃO PELO APP</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom notice */}
                  <div className="text-[10px] text-gray-400 text-center">
                    Atenda chamadas de qualquer lugar sem precisar passar fios ou tubulação
                  </div>
                </div>
              )}

              {/* SLIDE 3: SIMULAÇÃO MAPA DE LOCALIZAÇÃO (TRACK TAG) */}
              {activeSlide === 2 && (
                <div className="relative w-full h-full flex flex-col justify-between p-4 bg-slate-950 text-white animate-fade-in overflow-hidden">
                  {/* Simulated Map Background with Grid and Streets */}
                  <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
                  
                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300">Nuvv Tag • Segurança da Família</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      AO VIVO
                    </span>
                  </div>

                  {/* Center Map Markers */}
                  <div className="relative z-10 my-auto space-y-2">
                    {/* Pet Marker */}
                    <div className="p-2.5 rounded-xl bg-slate-800/90 border border-amber-500/40 flex items-center justify-between shadow-lg">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                          🐕
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Pet Thor (Coleira)</div>
                          <div className="text-[10px] text-gray-300">Praça do Bairro • há 2 min</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                        Perto de Casa
                      </span>
                    </div>

                    {/* Children Backpack Marker */}
                    <div className="p-2.5 rounded-xl bg-slate-800/90 border border-indigo-500/40 flex items-center justify-between shadow-lg">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                          🎒
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Filhos (Mochila Escolar)</div>
                          <div className="text-[10px] text-gray-300">Chegada confirmada na escola • 07:45</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded">
                        Seguro
                      </span>
                    </div>
                  </div>

                  {/* Bottom Notice */}
                  <div className="relative z-10 text-[10px] text-amber-300 text-center font-medium">
                    Sem precisar ter iPhone • Acessível por toda a família no App Nuvv Guard
                  </div>
                </div>
              )}

              {/* Bottom Mini-Tab Selectors to navigate between the 3 slides */}
              <div className="p-2 bg-slate-950/95 border-t border-white/10 grid grid-cols-3 gap-1 z-20">
                <button
                  type="button"
                  onClick={() => setActiveSlide(0)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeSlide === 0
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Video className="w-3 h-3 text-emerald-400" />
                  <span>1. Câmera Nuvem</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSlide(1)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeSlide === 1
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <QrCode className="w-3 h-3 text-cyan-400" />
                  <span>2. Interfone QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSlide(2)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeSlide === 2
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>3. Tag Família</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
