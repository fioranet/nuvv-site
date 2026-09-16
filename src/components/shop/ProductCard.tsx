import React, { useState } from 'react';
import { Product } from '../../data/products';
import { ShoppingBag, Check, Tv, Home, Wifi, PhoneCall, Zap, Video, Radio } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'streaming':
      return Tv;
    case 'casa-inteligente':
      return Home;
    case 'cameras':
      return Video;
    case 'telefonia':
    case 'comunicacao':
      return PhoneCall;
    case 'access-point':
      return Radio;
    case 'conectividade':
    default:
      return Wifi;
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const IconComponent = getCategoryIcon(product.category);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group h-full">
      <div>
        {/* Visual Box with Badges */}
        <div className="relative h-36 bg-gray-50 rounded-xl p-3 flex items-center justify-center mb-3 group-hover:bg-amber-50/20 transition-colors overflow-hidden">
          {/* Offer / Category Badge - Top Right */}
          {product.badge && (
            <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase bg-slate-900/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-md shadow-xs z-10">
              {product.badge}
            </span>
          )}

          {/* Prime Badge - Bottom Right */}
          {product.shippingInfo && (
            <span className="absolute bottom-2 right-2 inline-flex items-center space-x-1 text-[9px] font-bold text-sky-800 bg-sky-50/95 backdrop-blur-sm px-2 py-0.5 rounded-md border border-sky-200/80 shadow-xs z-10">
              <Zap className="w-2.5 h-2.5 text-sky-600 fill-sky-600" />
              <span>{product.shippingInfo}</span>
            </span>
          )}

          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-28 max-w-full object-contain transition-transform group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <IconComponent className="w-9 h-9 mb-1 text-amber-500 opacity-70" />
              <span className="text-[10px] font-semibold text-gray-400">{product.brand}</span>
            </div>
          )}
        </div>

        {/* Brand Tag */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">
          {product.brand}
        </span>

        {/* Title & Desc */}
        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1" title={product.name}>
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-500 mb-3 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Highlight specs chips (Compact - Top 2) */}
        <div className="space-y-1 mb-3">
          {product.highlightSpecs.slice(0, 2).map((spec, idx) => (
            <div key={idx} className="flex items-center space-x-1.5 text-[10px] text-gray-600">
              <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span className="truncate">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-3 border-t border-gray-100 space-y-2">
        <div>
          {product.originalPriceFormatted ? (
            <div className="flex items-center space-x-1 text-[10px] text-gray-400">
              <span>De</span>
              <span className="line-through">{product.originalPriceFormatted}</span>
              <span>por</span>
            </div>
          ) : (
            <span className="text-[10px] text-gray-400 block">Preço na Amazon</span>
          )}

          <div className="text-xl font-black text-slate-900 tracking-tight">
            {product.priceFormatted}
          </div>

          {product.installments && (
            <span className="text-[10px] text-emerald-600 font-semibold block">
              {product.installments}
            </span>
          )}
        </div>

        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-[#FF9900] hover:bg-[#FF8800] text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Comprar na Amazon</span>
        </a>
      </div>
    </div>
  );
};
