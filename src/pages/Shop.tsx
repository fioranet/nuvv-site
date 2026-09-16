import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { MercadoLivreService } from '../services/mercadolivre';
import { PRODUCTS, Product } from '../data/products';
import { CategoryFilter } from '../components/shop/CategoryFilter';
import { ProductCard } from '../components/shop/ProductCard';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { ShoppingBag, ShieldCheck, Sparkles, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface ShopPageProps {
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Shop: React.FC<ShopPageProps> = ({
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const loadCatalog = async (force = false) => {
    setIsSyncing(true);
    try {
      const result = await MercadoLivreService.syncProducts(force);
      setProducts(result.products);
      setLastUpdated(result.lastUpdated);
    } catch {
      // mantém produtos locais
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadCatalog(false);
  }, []);

  const filteredProducts = MercadoLivreService.filterByCategory(products, selectedCategory);

  const formattedDate = lastUpdated
    ? new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(lastUpdated))
    : null;

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Nuvv Shop - Dispositivos Fire TV, Echo Alexa, Câmeras Wi-Fi e Roteadores Amazon"
        description="Compre os melhores dispositivos homologados para a sua fibra Nuvv via Amazon Brasil. Fire TV Stick, Echo Alexa, Câmeras Intelbras e Roteadores Wi-Fi 6 com entrega Prime."
        keywords={[
          'fire tv stick nuvvplay',
          'echo dot alexa nuvv',
          'camera intelbras wifi amazon',
          'roteador wifi 6 tplink amazon',
          'loja oficial nuvv amazon',
        ]}
        canonicalUrl="https://nuvv.com.br/shop"
      />
      {/* Shop Hero */}
      <section className="bg-nuvv-dark text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#5A45DE_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <span>Nuvv Shop</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Os melhores gadgets para sua conexão
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-3">
            Selecionamos os melhores dispositivos para você aproveitar o máximo da sua internet e serviços Nuvv.
          </p>

          {/* Sync Status Badge */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Ofertas oficiais com garantia e entrega rápida Amazon Prime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Showcase Section */}
      <section className="py-16 bg-slate-50/50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Chips */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Trust Banner */}
          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Garantia & Entrega Prime</h4>
                <p className="text-xs text-gray-500">Produtos originais vendidos e entregues com segurança na Amazon Brasil.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">100% Homologados</h4>
                <p className="text-xs text-gray-500">Testados e aprovados pela engenharia de rede da Nuvv Fibra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
