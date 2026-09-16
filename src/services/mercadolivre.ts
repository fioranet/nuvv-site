import { Product, PRODUCTS } from '../data/products';
import { SHOP_CATALOG_CONFIG, ShopItemConfig } from '../data/shopCatalogConfig';

const CACHE_KEY = 'nuvv_shop_amazon_cache_v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

export interface ShopSyncResult {
  products: Product[];
  lastUpdated: string;
  isLive: boolean;
}

export const MercadoLivreService = {
  /**
   * Converte preço numérico em string brasileira (Ex: R$ 199,90)
   */
  formatBrl(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },

  /**
   * Retorna os produtos configurados da Amazon Brasil
   */
  async syncProducts(_forceRefresh = false): Promise<ShopSyncResult> {
    const now = Date.now();
    return {
      products: PRODUCTS,
      lastUpdated: new Date(now).toISOString(),
      isLive: true,
    };
  },

  /**
   * Filtra lista de produtos por categoria
   */
  filterByCategory(products: Product[], category: string): Product[] {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  },
};
