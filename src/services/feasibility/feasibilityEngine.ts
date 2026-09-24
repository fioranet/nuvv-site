import { apiService, MatchedPolygonInfo } from '../apiService';
import { GeocodingService, AddressData } from './geocodingService';
import { RESIDENTIAL_PLANS } from '../../data/plans';
import { BUSINESS_PLANS } from '../../data/businessPlans';

export type CoverageServiceType = 'residencial' | 'empresarial';
export type Coordinate = [number, number]; // [lng, lat]

export interface FeasibilityCheckRequest {
  serviceType: CoverageServiceType;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  coordinates?: Coordinate; // [lng, lat]
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  planInterested?: string;
}

export interface FeasibilityResult {
  queryId?: number;
  isAvailable: boolean;
  status: 'covered' | 'expansion' | 'custom_project';
  rawStatus: 'VIAVEL' | 'INVIAVEL' | 'EM_ANALISE';
  serviceType: CoverageServiceType;
  serviceName: string;
  matchedZone?: string;
  matchedPolygon?: MatchedPolygonInfo | null;
  distanceMeters: number;
  address: AddressData;
  coordinates: Coordinate;
  availablePlans: any[];
  headline: string;
  message: string;
}

export const FeasibilityEngine = {
  /**
   * Executa a checagem de viabilidade conectando-se ao motor externo geoespacial (Shapely 2.0)
   */
  async checkFeasibility(request: FeasibilityCheckRequest): Promise<FeasibilityResult> {
    const serviceTitle = request.serviceType === 'residencial' ? 'Fibra Residencial' : 'Fibra Empresarial';

    let addressData: AddressData = {
      street: request.street || '',
      number: request.number || '',
      neighborhood: request.neighborhood || '',
      city: request.city || (request.serviceType === 'empresarial' ? 'São Paulo' : 'Suzano'),
      state: request.state || 'SP',
      cep: request.cep ? request.cep.replace(/\D/g, '') : '',
      formattedAddress: '',
    };

    // 1. Se CEP foi fornecido e faltam dados textuais, busca dados no ViaCEP para melhor exibição
    if (request.cep && (!addressData.street || !addressData.neighborhood)) {
      try {
        const viaCep = await GeocodingService.fetchAddressByCep(request.cep);
        if (viaCep && !viaCep.erro) {
          addressData.street = viaCep.logradouro || addressData.street;
          addressData.neighborhood = viaCep.bairro || addressData.neighborhood;
          addressData.city = viaCep.localidade || addressData.city;
          addressData.state = viaCep.uf || addressData.state;
        }
      } catch {
        // Fallback silencioso
      }
    }

    // 2. Monta query de consulta para o motor geoespacial
    let searchQuery = '';
    if (addressData.street) {
      searchQuery = `${addressData.street}${addressData.number ? `, ${addressData.number}` : ''}, ${addressData.neighborhood ? `${addressData.neighborhood}, ` : ''}${addressData.city} - ${addressData.state}`;
    } else if (request.cep) {
      searchQuery = request.cep;
    } else if (request.coordinates) {
      searchQuery = `${request.coordinates[1]}, ${request.coordinates[0]}`;
    }

    const payloadLat = request.coordinates ? request.coordinates[1] : undefined;
    const payloadLng = request.coordinates ? request.coordinates[0] : undefined;

    // 3. Consulta a API externa através do backend do site (salva histórico automaticamente)
    const apiRes = await apiService.checkViability({
      query: searchQuery || request.cep,
      number: addressData.number || request.number,
      service_type: request.serviceType,
      latitude: payloadLat,
      longitude: payloadLng,
      name: request.name,
      phone: request.phone,
      email: request.email,
      notes: request.notes,
      plan_interested: request.planInterested,
    });

    const rawStatus = apiRes.status || (apiRes.isAvailable ? 'VIAVEL' : 'INVIAVEL');
    const coords: Coordinate = [
      apiRes.location?.longitude || request.coordinates?.[0] || -46.3108,
      apiRes.location?.latitude || request.coordinates?.[1] || -23.5425,
    ];

    addressData.coordinates = coords;
    addressData.formattedAddress = apiRes.display_name || `${addressData.street ? addressData.street : 'Endereço informado'}${
      addressData.number ? `, ${addressData.number}` : ''
    }${addressData.neighborhood ? ` - ${addressData.neighborhood}` : ''}, ${addressData.city} - ${addressData.state}`;

    // 4. Seleciona os planos apropriados para o cliente
    let availablePlans: any[] = [];
    if (request.serviceType === 'residencial') {
      availablePlans = RESIDENTIAL_PLANS.slice(0, 3);
    } else {
      availablePlans = [
        ...(BUSINESS_PLANS['semi-dedicado'] || []),
        ...(BUSINESS_PLANS['banda-larga'] || []),
      ].slice(0, 3);
    }

    const matchedPolygonName = apiRes.matched_polygon?.polygon_name || apiRes.matched_polygon?.polygon_id;
    const matchedZone = matchedPolygonName
      ? `${matchedPolygonName}${apiRes.matched_polygon?.pop ? ` (${apiRes.matched_polygon.pop})` : ''}`
      : (rawStatus === 'VIAVEL' ? `${addressData.city} - Rede Ativa` : undefined);

    const distanceMeters = apiRes.distance_to_nearest_meters || 0;

    // 5. Mapeia o status do resultado
    if (rawStatus === 'VIAVEL') {
      return {
        queryId: apiRes.query_id,
        isAvailable: true,
        status: 'covered',
        rawStatus: 'VIAVEL',
        serviceType: request.serviceType,
        serviceName: serviceTitle,
        matchedZone,
        matchedPolygon: apiRes.matched_polygon,
        distanceMeters,
        address: addressData,
        coordinates: coords,
        availablePlans,
        headline: 'Viabilidade Técnica Confirmada!',
        message: apiRes.message || `Excelente notícia! Temos cobertura de Fibra Óptica de ultravelocidade para o seu endereço. Planos disponíveis para instalação imediata.`,
      };
    }

    if (rawStatus === 'EM_ANALISE') {
      return {
        queryId: apiRes.query_id,
        isAvailable: false,
        status: 'custom_project',
        rawStatus: 'EM_ANALISE',
        serviceType: request.serviceType,
        serviceName: serviceTitle,
        matchedZone,
        matchedPolygon: apiRes.matched_polygon,
        distanceMeters,
        address: addressData,
        coordinates: coords,
        availablePlans,
        headline: 'Consulta em Análise Técnica',
        message: apiRes.message || `Seu endereço foi encaminhado para análise técnica da nossa equipe para verificar as condições de atendimento.`,
      };
    }

    // Se for INVIAVEL
    if (request.serviceType === 'empresarial') {
      return {
        queryId: apiRes.query_id,
        isAvailable: false,
        status: 'custom_project',
        rawStatus: 'INVIAVEL',
        serviceType: request.serviceType,
        serviceName: serviceTitle,
        matchedZone,
        matchedPolygon: apiRes.matched_polygon,
        distanceMeters,
        address: addressData,
        coordinates: coords,
        availablePlans,
        headline: 'Projeto Corporativo sob Medida',
        message: apiRes.message || `Para empresas e links corporativos, nossa engenharia desenvolve projetos personalizados de atendimento sob medida.`,
      };
    }

    return {
      queryId: apiRes.query_id,
      isAvailable: false,
      status: 'expansion',
      rawStatus: 'INVIAVEL',
      serviceType: request.serviceType,
      serviceName: serviceTitle,
      matchedZone,
      matchedPolygon: apiRes.matched_polygon,
      distanceMeters,
      address: addressData,
      coordinates: coords,
      availablePlans: [],
      headline: 'Área em Expansão de Rede',
      message: apiRes.message || `No momento ainda não identificamos disponibilidade imediata para este endereço. Registramos seu contato com prioridade para expansões futuras.`,
    };
  },
};
