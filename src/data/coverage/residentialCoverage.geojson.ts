import { GeoJSONFeatureCollection } from '../../services/feasibility/pointInPolygon';

/**
 * Coverage Polygons for Residential Broadband (Fibra Óptica Residencial)
 * Includes main urban and residential clusters of Suzano, Poá, Ferraz de Vasconcelos, Mogi das Cruzes and Itaquaquecetuba.
 */
export const RESIDENTIAL_COVERAGE_GEOJSON: GeoJSONFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'res-suzano-centro',
        name: 'Suzano - Região Central, Vila Amorim, Colorado & Boa Vista',
        service: 'residencial',
        maxSpeed: '1 Giga',
        technology: 'FTTH (GPON / XGS-PON)',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.335, -23.515],
            [-46.295, -23.518],
            [-46.282, -23.545],
            [-46.298, -23.575],
            [-46.332, -23.578],
            [-46.348, -23.552],
            [-46.335, -23.515],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-suzano-palmeiras',
        name: 'Suzano - Distrito de Palmeiras & Ouro Fino',
        service: 'residencial',
        maxSpeed: '1 Giga',
        technology: 'FTTH Fibra Óptica',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.345, -23.630],
            [-46.290, -23.632],
            [-46.285, -23.695],
            [-46.340, -23.690],
            [-46.345, -23.630],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-poa-ferraz',
        name: 'Poá & Ferraz de Vasconcelos - Áreas Urbanas',
        service: 'residencial',
        maxSpeed: '1 Giga',
        technology: 'FTTH Fibra Óptica',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.385, -23.510],
            [-46.335, -23.510],
            [-46.335, -23.560],
            [-46.385, -23.560],
            [-46.385, -23.510],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-mogi-urbano',
        name: 'Mogi das Cruzes - Centro, Braz Cubas e Mogi Moderno',
        service: 'residencial',
        maxSpeed: '1 Giga',
        technology: 'FTTH Fibra Óptica',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.235, -23.505],
            [-46.160, -23.505],
            [-46.160, -23.555],
            [-46.235, -23.555],
            [-46.235, -23.505],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'res-itaqua-centro',
        name: 'Itaquaquecetuba - Região Central e Bairros Conectados',
        service: 'residencial',
        maxSpeed: '1 Giga',
        technology: 'FTTH Fibra Óptica',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.375, -23.465],
            [-46.320, -23.465],
            [-46.320, -23.510],
            [-46.375, -23.510],
            [-46.375, -23.465],
          ],
        ],
      },
    },
  ],
};
