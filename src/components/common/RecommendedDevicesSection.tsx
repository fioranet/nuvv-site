import React, { useRef, useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Check, Zap, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, Product, ProductCategory } from '../../data/products';

interface RecommendedDevicesSectionProps {
  category?: ProductCategory | ProductCategory[];
  specificIds?: string[];
  badge?: string;
  title: string;
  subtitle: string;
  shopCategory?: ProductCategory;
  bgClassName?: string;
}

export const RecommendedDevicesSection: React.FC<RecommendedDevicesSectionProps> = ({
  category,
  specificIds,
  badge = 'Dispositivos Recomendados',
  title,
  subtitle,
  shopCategory,
  bgClassName = 'bg-white',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter products by category or specific IDs
  const filteredProducts: Product[] = React.useMemo(() => {
    if (specificIds && specificIds.length > 0) {
      return PRODUCTS.filter((p) => specificIds.includes(p.id));
    }
    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      return PRODUCTS.filter((p) => categories.includes(p.category));
    }
    return PRODUCTS;
  }, [category, specificIds]);

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide index
    const cardWidth = 320;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(index, filteredProducts.length - 1)));
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [filteredProducts.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-carousel-card]');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const targetCategory = shopCategory || (Array.isArray(category) ? category[0] : category);
  const shopUrl = targetCategory ? `/shop?category=${targetCategory}` : '/shop';

  if (filteredProducts.length === 0) return null;

  const hasFewerThanFour = filteredProducts.length < 4;

  // Render title with gradient for subtitle/emphasis if colon present
  const renderFormattedTitle = () => {
    if (title.includes(':')) {
      const [prefix, ...rest] = title.split(':');
      const suffix = rest.join(':').trim();
      return (
        <>
          <span>{prefix.trim()}: </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-600 to-purple-600">
            {suffix}
          </span>
        </>
      );
    }
    return title;
  };

  return (
    <section className={`py-16 sm:py-24 ${bgClassName} relative overflow-hidden`}>
      {/* Glow de ambientação suave */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-nuvv-purple/5 to-transparent pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Cabeçalho da Sessão no novo padrão do site */}
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/10 border border-nuvv-purple/20 text-nuvv-purple text-xs font-black tracking-wider uppercase shadow-2xs">
            <Tv className="w-4 h-4 text-nuvv-purple" />
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {renderFormattedTitle()}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto font-normal">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container with Floating Navigation Arrows */}
        <div className="relative max-w-6xl mx-auto">
          {/* Floating Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              aria-label="Dispositivo anterior"
              className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/80 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Floating Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              aria-label="Próximo dispositivo"
              className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/80 shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Carousel Track - Centered when fewer than 4 items */}
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollState}
            className={`flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-1 scrollbar-none items-stretch ${
              hasFewerThanFour ? 'justify-start md:justify-center' : 'justify-start'
            }`}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                data-carousel-card
                className="w-[280px] sm:w-[320px] lg:w-[330px] flex-shrink-0 snap-center bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-44 bg-gray-50/80 rounded-2xl p-4 flex items-center justify-center mb-4 group-hover:bg-amber-50/25 transition-colors overflow-hidden">
                    {/* Badge Top-Right */}
                    {product.badge && (
                      <span className="absolute top-2.5 right-2.5 text-[9px] font-extrabold uppercase bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-md shadow-xs z-10">
                        {product.badge}
                      </span>
                    )}

                    {/* Prime Shipping Badge Bottom-Right */}
                    {product.shippingInfo && (
                      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center space-x-1 text-[9px] font-bold text-sky-800 bg-sky-50/95 backdrop-blur-sm px-2 py-0.5 rounded-md border border-sky-200/80 shadow-xs z-10">
                        <Zap className="w-2.5 h-2.5 text-sky-600 fill-sky-600" />
                        <span>{product.shippingInfo}</span>
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-36 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Brand */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    {product.brand}
                  </span>

                  {/* Name */}
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1" title={product.name}>
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs Chips */}
                  {product.highlightSpecs && product.highlightSpecs.length > 0 && (
                    <div className="space-y-1.5 mb-5">
                      {product.highlightSpecs.slice(0, 2).map((spec, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-[11px] text-gray-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & CTA Button */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div>
                    {product.originalPriceFormatted ? (
                      <div className="flex items-center space-x-1 text-[11px] text-gray-400">
                        <span>De</span>
                        <span className="line-through">{product.originalPriceFormatted}</span>
                        <span>por</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400 block">Preço à vista</span>
                    )}

                    <div className="flex items-baseline justify-between gap-1">
                      <div className="text-2xl font-black text-slate-900 tracking-tight">
                        {product.priceFormatted}
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        Compra Única
                      </span>
                    </div>

                    {product.installments && (
                      <span className="text-[11px] text-emerald-600 font-semibold block">
                        {product.installments}
                      </span>
                    )}
                  </div>

                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#FF9900] hover:bg-[#FF8800] text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Comprar na Amazon</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Arrows Controls (below track on small screens) */}
          <div className="flex md:hidden items-center justify-center space-x-3 mt-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Dispositivo anterior"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                canScrollLeft
                  ? 'bg-white text-gray-700 border-gray-200 active:scale-95'
                  : 'bg-gray-100/50 text-gray-300 border-gray-100 opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Mobile Dots */}
            <div className="flex items-center space-x-1.5 px-2">
              {filteredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === idx ? 'w-5 bg-nuvv-purple' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Próximo dispositivo"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                canScrollRight
                  ? 'bg-nuvv-purple text-white border-nuvv-purple active:scale-95'
                  : 'bg-gray-100/50 text-gray-300 border-gray-100 opacity-50'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Link to Nuvv Shop */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to={shopUrl}
            className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200/90 hover:border-slate-900 text-xs sm:text-sm font-black tracking-wide transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer group"
          >
            <span>Ver todos os equipamentos no Nuvv Shop</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
