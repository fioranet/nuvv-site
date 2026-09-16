import React from 'react';
import { Home, Building2, ShieldCheck, CheckCircle2, Lock, Users } from 'lucide-react';
import { VisionSegment, VISION_SEGMENTS_INFO } from '../../data/visionPlans';

interface VisionSegmentToggleProps {
  segment: VisionSegment;
  onSegmentChange: (segment: VisionSegment) => void;
}

export const VisionSegmentToggle: React.FC<VisionSegmentToggleProps> = ({
  segment,
  onSegmentChange,
}) => {
  const currentInfo = VISION_SEGMENTS_INFO[segment];

  return (
    <section className="py-14 bg-slate-50/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Bar */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Personalize sua Experiência
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark mt-2">
            Qual a sua necessidade de monitoramento?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Alterne entre o perfil Residencial e Empresarial para ver os recursos ideais.
          </p>

          <div className="flex items-center justify-center p-1.5 bg-gray-200/80 rounded-2xl max-w-md mx-auto mt-6 shadow-inner">
            <button
              type="button"
              onClick={() => onSegmentChange('residencial')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center space-x-2 ${
                segment === 'residencial'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-nuvv-dark'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Para Minha Casa</span>
            </button>

            <button
              type="button"
              onClick={() => onSegmentChange('empresarial')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center space-x-2 ${
                segment === 'empresarial'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-nuvv-dark'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Para Minha Empresa</span>
            </button>
          </div>
        </div>

        {/* Dynamic 3 Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-2">
          {currentInfo.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {idx === 0 ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : idx === 1 ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              <h3 className="text-base font-bold text-nuvv-dark">{highlight.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
