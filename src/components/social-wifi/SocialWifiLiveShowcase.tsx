import React, { useState } from 'react';
import {
  Wifi,
  Users,
  Smartphone,
  Shield,
  Star,
  Activity,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Mail,
  Lock,
  ArrowRight,
  ExternalLink,
  Laptop,
} from 'lucide-react';

export const SocialWifiLiveShowcase: React.FC = () => {
  const currentBrand = {
    name: 'FitZone',
    category: 'Academia & Performance',
    logo: '🏋️‍♂️',
    themeColor: '#5A45DE',
    reviewHighlight: 'Wi-Fi ótimo durante o treino e sinal forte em todos os aparelhos!',
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white overflow-hidden relative border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/50 text-indigo-200 text-xs font-black tracking-wider uppercase backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-nuvv-green" />
            <span>ECOSSISTEMA COMPLETO EM TEMPO REAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Da conexão do cliente ao seu{' '}
            <span className="text-gradient-hero">painel de inteligência</span>.
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-gray-300">
            Veja como funciona a experiência do usuário ao se conectar e como os dados alimentam instantaneamente o seu dashboard gerencial.
          </p>
        </div>

        {/* Big Interactive Flow Display (Avatars -> Phone Captive Portal -> Desktop Dashboard) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/80 rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-xl">
          
          {/* Left Column (lg: 4 cols): Avatars & Mobile Captive Portal */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4">
            
            {/* Connection sources avatars */}
            <div className="flex sm:flex-col gap-3 justify-center items-center">
              <div className="flex items-center space-x-2 bg-slate-900 border border-blue-500/40 px-3 py-1.5 rounded-2xl text-[11px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-blue-300 font-bold">Facebook Login</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900 border border-emerald-500/40 px-3 py-1.5 rounded-2xl text-[11px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-300 font-bold">WhatsApp 1-Click</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900 border border-red-500/40 px-3 py-1.5 rounded-2xl text-[11px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-300 font-bold">Google Auth</span>
              </div>
            </div>

            {/* Smartphone Mockup with Dynamic Captive Portal */}
            <div className="w-full max-w-[290px] bg-slate-900 rounded-[38px] p-3 border-4 border-slate-700 shadow-2xl relative">
              {/* Dynamic Island / Speaker */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-black/80" />
              </div>

              <div className="bg-slate-950 rounded-[30px] p-3.5 space-y-3 text-center border border-white/5">
                {/* Brand Header */}
                <div className="space-y-0.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-xl mx-auto shadow-inner">
                    {currentBrand.logo}
                  </div>
                  <h4 className="text-sm font-black text-white">{currentBrand.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{currentBrand.category}</p>
                </div>

                <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                  Acesse a rede Wi-Fi:
                </div>

                {/* Social Login Buttons List matching reference image */}
                <div className="space-y-1.5 text-xs font-bold text-white">
                  <div className="py-2 px-3 rounded-xl bg-[#1877F2] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xs cursor-pointer">
                    <span>Facebook</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-[#EA4335] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xs cursor-pointer">
                    <span>Google</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-[#25D366] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xs cursor-pointer">
                    <span>WhatsApp</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-[#0A66C2] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xs cursor-pointer">
                    <span>LinkedIn</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-[#0078D4] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xs cursor-pointer">
                    <span>Office 365</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-[#8B5CF6] hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-xs cursor-pointer">
                    <span>SMS</span>
                  </div>
                  <div className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2 border border-white/10 shadow-xs cursor-pointer">
                    <span>E-mail</span>
                  </div>
                </div>

                <div className="text-[9px] text-gray-500 font-mono pt-1">
                  ★ painel.hotspotsocial.com.br
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (lg: 8 cols): Full Desktop Analytics Dashboard Frame */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
            
            {/* Top Browser Bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <div className="ml-2 px-3 py-1 rounded-lg bg-slate-900 text-gray-300 font-mono text-[11px] flex items-center space-x-1.5 border border-white/5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Conexão segura • painel.hotspotsocial.com.br</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>● 31 usuários online agora</span>
              </div>
            </div>

            {/* Dashboard Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-nuvv-dark via-slate-900 to-indigo-950 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                  <span>Hotspot Social • {currentBrand.name}</span>
                </h3>
                <p className="text-xs text-indigo-200">Conexões, perfil demográfico e comportamento</p>
              </div>

              {/* Provider Quick Counters */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-blue-900/60 border border-blue-500/30 text-blue-200 font-bold">
                  Facebook: 47
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-red-900/60 border border-red-500/30 text-red-200 font-bold">
                  Google: 39
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 font-bold">
                  WhatsApp: 62
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-gray-300 font-bold">
                  E-mail: 31
                </span>
              </div>
            </div>

            {/* Dashboard Grid Content */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950/60">
              
              {/* Left Column: Demographic Donuts & Traffic Graph */}
              <div className="md:col-span-7 space-y-6">
                
                {/* 2 Donut Charts: Faixa Etária & Gênero */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Faixa Etária */}
                  <div className="p-3.5 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-gray-300 block text-center">Faixa Etária</span>
                    <div className="flex items-center justify-center">
                      <div className="relative w-20 h-20 rounded-full border-4 border-nuvv-purple flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-xs font-black text-white">52%</span>
                          <span className="text-[8px] text-gray-400 block leading-none">Adulto</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[9px] text-gray-400 space-y-0.5 pt-1">
                      <div className="flex justify-between"><span>• Adulto (25-45)</span><span className="font-bold text-white">52%</span></div>
                      <div className="flex justify-between"><span>• Jovem (18-24)</span><span className="font-bold text-yellow-400">24%</span></div>
                      <div className="flex justify-between"><span>• Idoso (45+)</span><span className="font-bold text-blue-400">14%</span></div>
                    </div>
                  </div>

                  {/* Gênero */}
                  <div className="p-3.5 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-gray-300 block text-center">Gênero</span>
                    <div className="flex items-center justify-center">
                      <div className="relative w-20 h-20 rounded-full border-4 border-pink-500 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-xs font-black text-white">52%</span>
                          <span className="text-[8px] text-gray-400 block leading-none">Mulher</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[9px] text-gray-400 space-y-0.5 pt-1">
                      <div className="flex justify-between"><span>• Mulher</span><span className="font-bold text-pink-400">52%</span></div>
                      <div className="flex justify-between"><span>• Homem</span><span className="font-bold text-blue-400">44%</span></div>
                      <div className="flex justify-between"><span>• Outros</span><span className="font-bold text-gray-400">4%</span></div>
                    </div>
                  </div>
                </div>

                {/* Traffic Curve: Usuários online ao longo do tempo */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Usuários online ao longo do tempo</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">Pico: 12h & 19h</span>
                  </div>
                  
                  {/* SVG Line Curve */}
                  <div className="h-16 w-full flex items-end pt-2">
                    <svg viewBox="0 0 300 60" className="w-full h-full text-nuvv-purple stroke-current fill-none">
                      <path
                        d="M 0,50 Q 50,45 80,35 T 150,10 T 220,38 T 300,20"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 0,50 Q 50,45 80,35 T 150,10 T 220,38 T 300,20 L 300,60 L 0,60 Z"
                        className="fill-nuvv-purple/20 stroke-none"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>08h</span>
                    <span>10h</span>
                    <span className="text-white font-bold">12h (pico)</span>
                    <span>14h</span>
                    <span>17h</span>
                    <span className="text-white font-bold">19h (pico)</span>
                    <span>22h</span>
                  </div>
                </div>

                {/* Connection Preference Bars */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white block">Preferência de Login</span>
                  <div className="space-y-1.5 text-[10px]">
                    <div>
                      <div className="flex justify-between text-gray-300 mb-0.5">
                        <span>WhatsApp / 1-Click</span>
                        <span className="font-bold text-emerald-400">38%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[38%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-gray-300 mb-0.5">
                        <span>Google</span>
                        <span className="font-bold text-red-400">27%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[27%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-gray-300 mb-0.5">
                        <span>Facebook</span>
                        <span className="font-bold text-blue-400">22%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[22%]" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Key Stats, Users Table & Reviews */}
              <div className="md:col-span-5 space-y-4">
                
                {/* 3 Metric Summary Boxes */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5">
                    <span className="text-sm sm:text-base font-black text-white">142</span>
                    <span className="text-[9px] text-gray-400 block leading-tight">Conexões hoje</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5">
                    <span className="text-sm sm:text-base font-black text-emerald-400">31/80</span>
                    <span className="text-[9px] text-gray-400 block leading-tight">Online agora</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5">
                    <span className="text-sm sm:text-base font-black text-amber-400">4.9 ★</span>
                    <span className="text-[9px] text-gray-400 block leading-tight">Avaliação média</span>
                  </div>
                </div>

                {/* Active Users Table */}
                <div className="p-3 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-300">
                    <span>Usuários Online</span>
                    <span className="text-emerald-400 text-[10px]">Tempo • Consumo</span>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div className="p-1.5 bg-slate-950 rounded-lg flex justify-between items-center text-gray-300">
                      <span className="font-bold text-white">M. Rodrigues (iPhone)</span>
                      <span className="text-gray-400">16min • 134MB • <strong className="text-emerald-400">4ª visita</strong></span>
                    </div>
                    <div className="p-1.5 bg-slate-950 rounded-lg flex justify-between items-center text-gray-300">
                      <span className="font-bold text-white">J. Lima (Android)</span>
                      <span className="text-gray-400">19min • 142MB • <strong className="text-emerald-400">5ª visita</strong></span>
                    </div>
                    <div className="p-1.5 bg-slate-950 rounded-lg flex justify-between items-center text-gray-300">
                      <span className="font-bold text-white">D. Torres (Notebook)</span>
                      <span className="text-gray-400">42min • 311MB • <strong className="text-indigo-300">3ª visita</strong></span>
                    </div>
                    <div className="p-1.5 bg-slate-950 rounded-lg flex justify-between items-center text-gray-300">
                      <span className="font-bold text-white">B. Alves (iPhone)</span>
                      <span className="text-gray-400">11min • 68MB • <strong className="text-yellow-400">1ª visita</strong></span>
                    </div>
                  </div>
                </div>

                {/* Latest Reviews (NPS / Google Review) */}
                <div className="p-3 bg-slate-900 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold text-gray-300 block">Últimas Avaliações Recebidas</span>

                  <div className="space-y-2 text-[10px]">
                    <div className="p-2 bg-slate-950 rounded-xl border border-white/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">Marcos Rodrigues</span>
                        <span className="text-amber-400">★★★★★</span>
                      </div>
                      <p className="text-gray-300 italic">"{currentBrand.reviewHighlight}"</p>
                    </div>

                    <div className="p-2 bg-slate-950 rounded-xl border border-white/5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">Juliana Lima</span>
                        <span className="text-amber-400">★★★★★</span>
                      </div>
                      <p className="text-gray-300 italic">"Conectou rapidinho, adorei o benefício!"</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
