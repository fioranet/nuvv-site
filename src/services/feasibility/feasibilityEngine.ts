import { Coordinate, isPointInGeoJSON, GeoJSONFeature } from './pointInPolygon';
import { GeocodingService, AddressData } from './geocodingService';
import { CoverageConfig, CoverageServiceType } from '../../data/coverage/coverageConfig';
import { RESIDENTIAL_PLANS } from '../../data/plans';
import { BUSINESS_PLANS } from '../../data/businessPlans';

export interface FeasibilityCheckRequest {
  serviceType: CoverageServiceType;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  coordinates?: Coordinate; // [lng, lat]
}

export interface FeasibilityResult {
  isAvailable: boolean;
  status: 'covered' | 'expansion' | 'custom_project';
  serviceType: CoverageServiceType;
  serviceName: string;
  matchedZone?: string;
  matchedFeature?: GeoJSONFeature;
  address: AddressData;
  coordinates: Coordinate;
  availablePlans: any[];
  headline: string;
  message: string;
}

export const FeasibilityEngine = {
  /**
   * Executes a complete feasibility lookup for a service and address/coordinates
   */
  async checkFeasibility(request: FeasibilityCheckRequest): Promise<FeasibilityResult> {
    const serviceLayer = CoverageConfig.getLayer(request.serviceType);

    let coords: Coordinate | null = request.coordinates || null;
    let addressData: AddressData = {
      street: request.street || '',
      number: request.number || '',
      neighborhood: request.neighborhood || '',
      city: request.city || 'Suzano',
      state: request.state || 'SP',
      cep: request.cep || '',
      formattedAddress: '',
    };

    // 1. If CEP was provided, fetch address via ViaCEP if missing details
    if (request.cep && (!addressData.street || !addressData.city)) {
      const viaCep = await GeocodingService.fetchAddressByCep(request.cep);
      if (viaCep) {
        addressData.street = viaCep.logradouro || addressData.street;
        addressData.neighborhood = viaCep.bairro || addressData.neighborhood;
        addressData.city = viaCep.localidade || addressData.city;
        addressData.state = viaCep.uf || addressData.state;
      }
    }

    // 2. Geocode address to [lng, lat] coordinates if not already provided
    if (!coords) {
      coords = await GeocodingService.geocodeAddress(
        addressData.street,
        addressData.neighborhood,
        addressData.city,
        addressData.state,
        addressData.number
      );
    }

    // Fallback coordinates (Suzano center) if geocoding failed
    if (!coords) {
      coords = [-46.3108, -23.5425];
    }

    addressData.coordinates = coords;
    addressData.formattedAddress = `${addressData.street ? addressData.street : 'Endereço informado'}${
      addressData.number ? `, ${addressData.number}` : ''
    }${addressData.neighborhood ? ` - ${addressData.neighborhood}` : ''}, ${addressData.city} - ${
      addressData.state
    }`;

    // 3. Test if point is inside the active service's coverage GeoJSON
    const { isInside, matchedFeature } = isPointInGeoJSON(coords, serviceLayer.geoJson);

    // 4. Select appropriate plans to recommend based on service type
    let availablePlans: any[] = [];
    if (request.serviceType === 'residencial') {
      availablePlans = RESIDENTIAL_PLANS.slice(0, 3);
    } else {
      availablePlans = [
        ...(BUSINESS_PLANS['semi-dedicado'] || []),
        ...(BUSINESS_PLANS['banda-larga'] || []),
      ].slice(0, 3);
    }

    const zoneName = matchedFeature?.properties?.name || (isInside ? `${addressData.city} - Região Atendida` : undefined);

    if (isInside) {
      return {
        isAvailable: true,
        status: 'covered',
        serviceType: request.serviceType,
        serviceName: serviceLayer.title,
        matchedZone: zoneName,
        matchedFeature,
        address: addressData,
        coordinates: coords,
        availablePlans,
        headline: 'Viabilidade Técnica Confirmada!',
        message: `Excelente notícia! Seu endereço está 100% dentro da nossa área de cobertura para ${serviceLayer.title}. Fibra óptica disponível para instalação imediata.`,
      };
    }

    // If outside polygon:
    if (request.serviceType === 'empresarial') {
      return {
        isAvailable: false,
        status: 'custom_project',
        serviceType: request.serviceType,
        serviceName: serviceLayer.title,
        address: addressData,
        coordinates: coords,
        availablePlans,
        headline: 'Estudo de Viabilidade Especial para Empresas',
        message: `Seu endereço está próximo da nossa rede. Para conexões corporativas (Link Dedicado e Semi-Dedicado), nossa engenharia elabora projetos especiais de extensão de fibra e anel óptico dedicado.`,
      };
    }

    return {
      isAvailable: false,
      status: 'expansion',
      serviceType: request.serviceType,
      serviceName: serviceLayer.title,
      address: addressData,
      coordinates: coords,
      availablePlans: [],
      headline: 'Área em Expansão de Rede',
      message: `Ainda não temos cabeamento residencial ativo neste ponto exato, mas nossa equipe de expansão está constantemente ativando novas caixas FTTH. Cadastre-se na lista de espera prioritária para ser avisado!`,
    };
  },
};
