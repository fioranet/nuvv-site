import React from 'react';
import { SOCIAL_WIFI_SEGMENTS } from '../../data/socialWifiData';
import {
  Utensils,
  HeartPulse,
  Dumbbell,
  ShoppingBag,
  Building,
  Scissors,
  Car,
  Users,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Utensils,
  HeartPulse,
  Dumbbell,
  ShoppingBag,
  Building,
  Scissors,
  Car,
  Users,
};

export const SocialWifiSegments: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            Segmentos de Mercado
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
            Perfeito para Qualquer Estabelecimento Físico
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Descubra como o Hotspot Wi-fi Social gera resultados específicos para o seu tipo de negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {SOCIAL_WIFI_SEGMENTS.map((segment, idx) => {
            const Icon = ICON_MAP[segment.iconName] || Users;

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-nuvv-purple/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-nuvv-dark">{segment.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {segment.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/60">
                  <span className="text-[11px] font-bold text-nuvv-purple flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-nuvv-green flex-shrink-0" />
                    <span>{segment.exampleMetric}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
