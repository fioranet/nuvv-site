import { GeoJSONFeatureCollection } from '../../services/feasibility/pointInPolygon';

/**
 * Coverage Polygons for Corporate Connectivity (Link Dedicado, Semi-Dedicado & Telecom Empresarial)
 * Covers extensive industrial hubs, commercial centers, corporate parks, and high-density fiber rings in Alto Tietê and Greater SP.
 */
export const BUSINESS_COVERAGE_GEOJSON: GeoJSONFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'biz-anel-metropolitano-leste',
        name: 'Anel Óptico Metropolitano Alto Tietê (Suzano, Mogi, Poá, Ferraz, Itaquá)',
        service: 'empresarial',
        slaHours: 4,
        maxSpeed: '10 Gbps Simétrico',
        technology: 'Circuito Dedicado Ponto a Ponto (DWDM / Metro-Ethernet / BGP)',
        cirGuarantee: '100% Simétrica (1:1)',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.420, -23.440],
            [-46.120, -23.440],
            [-46.120, -23.680],
            [-46.420, -23.680],
            [-46.420, -23.440],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'biz-corredor-industrial-aruja-guarulhos',
        name: 'Corredor Industrial Ayrton Senna & Dutra (Arujá / Guarulhos / Santa Isabel)',
        service: 'empresarial',
        slaHours: 4,
        maxSpeed: '10 Gbps Simétrico',
        technology: 'Fibra Óptica Dedicada Subterrânea',
        cirGuarantee: '100% Garantida',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.550, -23.360],
            [-46.200, -23.360],
            [-46.200, -23.470],
            [-46.550, -23.470],
            [-46.550, -23.360],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'biz-sp-leste-conectividade',
        name: 'Grande São Paulo Leste - Polo Comercial & Logístico',
        service: 'empresarial',
        slaHours: 4,
        maxSpeed: '10 Gbps Simétrico',
        technology: 'Interligação Lan-to-Lan / Nuvem Direta',
        cirGuarantee: '100% Garantida',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.650, -23.500],
            [-46.410, -23.500],
            [-46.410, -23.620],
            [-46.650, -23.620],
            [-46.650, -23.500],
          ],
        ],
      },
    },
  ],
};
