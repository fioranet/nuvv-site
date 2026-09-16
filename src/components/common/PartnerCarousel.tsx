import React from 'react';

export const PartnerCarousel: React.FC = () => {
  const partners = [
    { name: 'Prosegur', logo: '/images/external/partner_prosegur.png' },
    { name: 'CPTM', logo: '/images/external/partner_cptm.png' },
    { name: 'McDonalds', logo: '/images/external/partner_mcdonalds.png' },
    { name: 'Komatsu', logo: '/images/external/partner_komatsu.png' },
    { name: 'Sicoob', logo: '/images/external/partner_sicoob.png' },
    { name: 'Correios', logo: '/images/external/partner_correios.png' },
    { name: 'CET', logo: '/images/external/partner_cet.png' },
    { name: 'Shopee', logo: '/images/external/partner_shopee.png' },
    { name: 'Outback', logo: '/images/external/partner_outback.png' },
  ];

  return (
    <section className="py-10 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Empresas que confiam na Nuvv
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling strip */}
        <div className="flex items-center space-x-12 animate-scroll w-max">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all px-4"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-8 max-w-[130px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
