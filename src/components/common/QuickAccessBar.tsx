import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, FileText, HelpCircle, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface QuickAccessBarProps {
  onOpenSpeedTest?: () => void;
  onOpenCitySelector?: () => void;
}

export const QuickAccessBar: React.FC<QuickAccessBarProps> = ({
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const items = [
    {
      title: 'Teste de Velocidade',
      description: 'Verifique sua conexão',
      icon: Gauge,
      color: 'text-nuvv-purple bg-indigo-50',
      action: onOpenSpeedTest,
      href: onOpenSpeedTest ? undefined : '/suporte',
    },
    {
      title: '2ª Via Rápida & PIX',
      description: 'Pague e consulte faturas',
      icon: FileText,
      color: 'text-emerald-600 bg-emerald-50',
      href: '/2via',
      external: false,
    },
    {
      title: 'Central de Ajuda',
      description: 'Tire suas dúvidas',
      icon: HelpCircle,
      color: 'text-blue-600 bg-blue-50',
      href: '/suporte',
    },
    {
      title: 'Área de Cobertura',
      description: 'Consulte disponibilidade',
      icon: MapPin,
      color: 'text-violet-600 bg-violet-50',
      action: onOpenCitySelector,
      href: onOpenCitySelector ? undefined : '/suporte',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-nuvv-dark mb-8">
          Acesso rápido aos nossos serviços
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-nuvv-purple/30 transition-all group h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            );

            if (item.action) {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={item.action}
                  className="text-left w-full focus:outline-none"
                >
                  {content}
                </button>
              );
            }

            if (item.external) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={index} to={item.href || '/'} className="block focus:outline-none">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
