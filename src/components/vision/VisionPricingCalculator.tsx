import React, { useRef, useState, useEffect } from 'react';
import { VisionPlan, VISION_PLANS, VisionSegment, COMODATO_PRICE_PER_CAMERA } from '../../data/visionPlans';
import { VisionPlanCard } from './VisionPlanCard';
import { Camera, Plus, Minus, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Smartphone, Lock, Cloud } from 'lucide-react';

interface VisionPricingCalculatorProps {
  segment: VisionSegment;
  cameraCount: number;
  onCameraCountChange: (count: number) => void;
  hasComodato: boolean;
  onHasComodatoChange: (enabled: boolean) => void;
  onSelectPlan: (plan: VisionPlan, totalMonthly: number) => void;
}

export const VisionPricingCalculator: React.FC<VisionPricingCalculatorProps> = ({
  segment,
  cameraCount,
  onCameraCountChange,
  hasComodato,
  onHasComodatoChange,
  onSelectPlan,
}) => {
  const quickPresets = [1, 2, 3, 4, 8, 16, 32];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIncrement = () => {
    if (cameraCount < 64) onCameraCountChange(cameraCount + 1);
  };

  const handleDecrement = () => {
    if (cameraCount > 1) onCameraCountChange(cameraCount - 1);
  };

  const updateScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Estimate active index based on scroll position
      const itemWidth = 280; // card width + gap
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), VISION_PLANS.length - 1));
    }
  };

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollToPlanIndex = (index: number) => {
    if (carouselRef.current) {
      const itemWidth = 280;
      carouselRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="calculadora-vision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Calculadora Interativa de Planos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
            Escolha o Histórico de Gravação Ideal
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Ajuste a quantidade de câmeras e selecione o plano de armazenamento em nuvem desejado.
          </p>
        </div>

        {/* Calculator Control Bar (2 Columns: Counter + Comodato) */}
        <div className="bg-slate-50 border border-gray-200/80 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Camera Count Stepper & Centered Presets */}
            <div className="space-y-4 text-center">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                Quantas câmeras você deseja monitorar?
              </label>

              <div className="flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={cameraCount <= 1}
                  className="w-12 h-12 rounded-2xl bg-white border border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 font-bold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  aria-label="Diminuir quantidade de câmeras"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex-1 max-w-[180px] h-12 bg-white rounded-2xl border-2 border-emerald-500 flex items-center justify-center px-4 shadow-sm">
                  <span className="text-2xl font-black text-nuvv-dark tracking-tight">
                    {cameraCount}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold ml-2">
                    {cameraCount === 1 ? 'câmera' : 'câmeras'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={cameraCount >= 64}
                  className="w-12 h-12 rounded-2xl bg-white border border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 font-bold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  aria-label="Aumentar quantidade de câmeras"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Preset Buttons (Centered) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                <span className="text-[11px] text-gray-400 font-medium mr-1">Atalhos:</span>
                {quickPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onCameraCountChange(preset)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cameraCount === preset
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-400'
                    }`}
                  >
                    {preset} {preset === 1 ? 'câm' : 'câms'}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Comodato Switch Card */}
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-sm font-bold text-nuvv-dark">Câmeras em Comodato Nuvv</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-snug">
                    Não tem câmeras? Fornecemos equipamentos Full HD sem custo de compra inicial.
                  </p>
                </div>
              </div>

              <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 cursor-pointer hover:bg-emerald-50 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    checked={hasComodato}
                    onChange={(e) => onHasComodatoChange(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-emerald-900">
                    Incluir {cameraCount} {cameraCount === 1 ? 'câmera' : 'câmeras'} em comodato
                  </span>
                </div>
                <span className="text-xs font-black text-emerald-700 whitespace-nowrap ml-2">
                  + R$ {(COMODATO_PRICE_PER_CAMERA * cameraCount).toFixed(2).replace('.', ',')}/mês
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Carousel Header Controls */}
        <div className="flex items-center justify-between mb-4 max-w-6xl mx-auto px-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Deslize para comparar os planos
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs cursor-pointer"
              aria-label="Plano anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs cursor-pointer"
              aria-label="Próximo plano"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Plans Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={carouselRef}
            onScroll={updateScrollState}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-6 pb-6 px-3 no-scrollbar items-stretch scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {VISION_PLANS.map((plan) => (
              <VisionPlanCard
                key={plan.id}
                plan={plan}
                cameraCount={cameraCount}
                hasComodato={hasComodato}
                onSelectPlan={onSelectPlan}
              />
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-1.5 pt-3">
            {VISION_PLANS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToPlanIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-6 bg-emerald-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para plano ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Common Features Inclusions Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 text-center">
          <div className="text-xs font-bold text-emerald-900 mb-2 uppercase tracking-wider">
            Incluso em todos os planos Nuvv Vision:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-emerald-800">
            <div className="flex items-center justify-center space-x-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>App iOS & Android</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Zero Abertura de Portas</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Cloud className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Nuvem no Brasil (LGPD)</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Backup Anti-Sabotagem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
