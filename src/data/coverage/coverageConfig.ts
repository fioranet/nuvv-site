import { GeoJSONFeatureCollection } from '../../services/feasibility/pointInPolygon';
import { RESIDENTIAL_COVERAGE_GEOJSON } from './residentialCoverage.geojson';
import { BUSINESS_COVERAGE_GEOJSON } from './businessCoverage.geojson';

export type CoverageServiceType = 'residencial' | 'empresarial' | 'pabx' | 'telefonia' | 'social-wifi';

export interface CoverageLayerInfo {
  id: CoverageServiceType;
  title: string;
  shortName: string;
  description: string;
  badge: string;
  color: string;
  geoJson: GeoJSONFeatureCollection;
  isCustomUploaded?: boolean;
}

// In-memory registry of coverage layers (can be updated dynamically via KMZ/GeoJSON uploads in runtime)
const COVERAGE_REGISTRY: Record<CoverageServiceType, CoverageLayerInfo> = {
  residencial: {
    id: 'residencial',
    title: 'Banda Larga Residencial Fibra',
    shortName: 'Residencial',
    description: 'Rede FTTH de ultravelocidade para residências e condomínios com Wi-Fi 6.',
    badge: 'FIBRA RESIDENCIAL',
    color: '#5A45DE', // Nuvv Purple
    geoJson: RESIDENTIAL_COVERAGE_GEOJSON,
  },
  empresarial: {
    id: 'empresarial',
    title: 'Link Dedicado & Telecom Corporativa',
    shortName: 'Empresarial',
    description: 'Circuitos 100% simétricos, IP Fixo, BGP e SLA de 4 horas para empresas.',
    badge: 'CARRIER-GRADE PJ',
    color: '#00C853', // Nuvv Green / Emerald
    geoJson: BUSINESS_COVERAGE_GEOJSON,
  },
  pabx: {
    id: 'pabx',
    title: 'PABX em Nuvem & Telefonia Digital',
    shortName: 'PABX & Voz',
    description: 'Ativação 100% em nuvem disponível para empresas de todo o Brasil.',
    badge: 'NUVEM NACIONAL',
    color: '#3B82F6', // Blue
    geoJson: BUSINESS_COVERAGE_GEOJSON, // Uses broad national/regional reach
  },
  telefonia: {
    id: 'telefonia',
    title: 'Telefonia IP & Tronco SIP',
    shortName: 'Telefonia IP',
    description: 'Portabilidade e linhas digitais para qualquer região atendida.',
    badge: 'DIGITAL',
    color: '#06B6D4',
    geoJson: BUSINESS_COVERAGE_GEOJSON,
  },
  'social-wifi': {
    id: 'social-wifi',
    title: 'Hotspot Wi-fi Social Marketing',
    shortName: 'Hotspot Social',
    description: 'Plataforma em nuvem para estabelecimentos comerciais físicos.',
    badge: 'SaaS / HOTSPOT',
    color: '#8B5CF6',
    geoJson: BUSINESS_COVERAGE_GEOJSON,
  },
};

export const CoverageConfig = {
  /**
   * Returns list of available service layers
   */
  getAllLayers(): CoverageLayerInfo[] {
    return Object.values(COVERAGE_REGISTRY);
  },

  /**
   * Gets specific layer by service type
   */
  getLayer(serviceType: CoverageServiceType): CoverageLayerInfo {
    return COVERAGE_REGISTRY[serviceType] || COVERAGE_REGISTRY.residencial;
  },

  /**
   * Replaces or registers a custom GeoJSON/KMZ dataset for a specific service
   */
  registerCustomLayer(serviceType: CoverageServiceType, geoJson: GeoJSONFeatureCollection) {
    if (COVERAGE_REGISTRY[serviceType]) {
      COVERAGE_REGISTRY[serviceType].geoJson = geoJson;
      COVERAGE_REGISTRY[serviceType].isCustomUploaded = true;
    }
  },

  /**
   * Resets layers back to default bundled polygons
   */
  resetToDefaults(serviceType?: CoverageServiceType) {
    if (serviceType) {
      if (serviceType === 'residencial') {
        COVERAGE_REGISTRY.residencial.geoJson = RESIDENTIAL_COVERAGE_GEOJSON;
        COVERAGE_REGISTRY.residencial.isCustomUploaded = false;
      } else {
        COVERAGE_REGISTRY[serviceType].geoJson = BUSINESS_COVERAGE_GEOJSON;
        COVERAGE_REGISTRY[serviceType].isCustomUploaded = false;
      }
    } else {
      COVERAGE_REGISTRY.residencial.geoJson = RESIDENTIAL_COVERAGE_GEOJSON;
      COVERAGE_REGISTRY.residencial.isCustomUploaded = false;
      COVERAGE_REGISTRY.empresarial.geoJson = BUSINESS_COVERAGE_GEOJSON;
      COVERAGE_REGISTRY.empresarial.isCustomUploaded = false;
    }
  },

  /**
   * Returns full raw dictionary of layers
   */
  getRegistry(): Record<CoverageServiceType, CoverageLayerInfo> {
    return COVERAGE_REGISTRY;
  },

  /**
   * Loads custom layers from backend API or JSON payload
   */
  loadFromObject(customLayers: Partial<Record<CoverageServiceType, CoverageLayerInfo>>) {
    if (!customLayers) return;
    Object.entries(customLayers).forEach(([key, layer]) => {
      const sKey = key as CoverageServiceType;
      if (COVERAGE_REGISTRY[sKey] && layer?.geoJson?.features) {
        COVERAGE_REGISTRY[sKey] = {
          ...COVERAGE_REGISTRY[sKey],
          ...layer,
          isCustomUploaded: true,
        };
      }
    });
  },

  /**
   * Async initialization from backend
   */
  async initFromBackend() {
    try {
      const res = await fetch('/api/coverage/layers');
      const data = await res.json();
      if (data?.success && data.custom && data.data) {
        this.loadFromObject(data.data);
      }
    } catch {
      // Keep bundled defaults if backend is unavailable
    }
  },
};

