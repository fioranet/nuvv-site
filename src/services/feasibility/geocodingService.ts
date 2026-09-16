import { Coordinate } from './pointInPolygon';

export interface AddressData {
  cep?: string;
  street: string;
  number?: string;
  neighborhood: string;
  city: string;
  state: string;
  coordinates?: Coordinate; // [lng, lat]
  formattedAddress: string;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

// Centroids for fallback approximate coordinates in Nuvv coverage cities
const CITY_CENTROIDS: Record<string, Coordinate> = {
  suzano: [-46.3108, -23.5425],
  'mogi das cruzes': [-46.1882, -23.5244],
  poa: [-46.3458, -23.5228],
  'ferraz de vasconcelos': [-46.3683, -23.5414],
  itaquaquecetuba: [-46.3486, -23.4861],
  aruja: [-46.3208, -23.3967],
  'santa isabel': [-46.2239, -23.3156],
  guarulhos: [-46.5333, -23.4542],
  'sao paulo': [-46.6333, -23.5505],
};

export const GeocodingService = {
  /**
   * Cleans a CEP string by removing any non-digit character
   */
  cleanCep(rawCep: string): string {
    return rawCep.replace(/\D/g, '');
  },

  /**
   * Fetches address details from ViaCEP
   */
  async fetchAddressByCep(cep: string): Promise<ViaCepResponse | null> {
    const clean = this.cleanCep(cep);
    if (clean.length !== 8) return null;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      if (!res.ok) return null;
      const data: ViaCepResponse = await res.json();
      if (data.erro) return null;
      return data;
    } catch {
      return null;
    }
  },

  /**
   * Geocodes an address string to [longitude, latitude] coordinates via Nominatim OSM
   */
  async geocodeAddress(
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    number?: string
  ): Promise<Coordinate | null> {
    const queries = [
      // 1. Exact query with street, number and city
      `${street} ${number || ''}, ${neighborhood}, ${city} - ${state}, Brasil`,
      // 2. Street and city
      `${street}, ${city} - ${state}, Brasil`,
      // 3. Neighborhood and city
      `${neighborhood}, ${city} - ${state}, Brasil`,
      // 4. City only
      `${city} - ${state}, Brasil`,
    ];

    for (const q of queries) {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}&limit=1&countrycodes=br`;

        const res = await fetch(url, {
          headers: {
            'Accept-Language': 'pt-BR,pt;q=0.9',
          },
        });

        if (res.ok) {
          const results = await res.json();
          if (results && results.length > 0) {
            const lat = parseFloat(results[0].lat);
            const lon = parseFloat(results[0].lon);
            if (!isNaN(lat) && !isNaN(lon)) {
              return [lon, lat]; // [longitude, latitude]
            }
          }
        }
      } catch {
        // continue to next fallback
      }
    }

    // Fallback to city centroid
    const normalizedCity = city
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    if (CITY_CENTROIDS[normalizedCity]) {
      return CITY_CENTROIDS[normalizedCity];
    }

    return null;
  },

  /**
   * Resolves coordinates from browser GPS
   */
  async getBrowserPosition(): Promise<{ coords: Coordinate; address?: AddressData } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const coords: Coordinate = [lng, lat];

          // Reverse geocode
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
              {
                headers: {
                  'Accept-Language': 'pt-BR,pt;q=0.9',
                },
              }
            );

            if (res.ok) {
              const data = await res.json();
              const road = data.address?.road || '';
              const houseNumber = data.address?.house_number || '';
              const suburb = data.address?.suburb || data.address?.neighbourhood || '';
              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.municipality ||
                'Suzano';
              const state = data.address?.state_code || 'SP';
              const postcode = data.address?.postcode || '';

              const address: AddressData = {
                cep: postcode,
                street: road,
                number: houseNumber,
                neighborhood: suburb,
                city,
                state,
                coordinates: coords,
                formattedAddress: `${road}${houseNumber ? `, ${houseNumber}` : ''}${
                  suburb ? ` - ${suburb}` : ''
                }, ${city} - ${state}`,
              };

              resolve({ coords, address });
              return;
            }
          } catch {
            // fallback
          }

          resolve({ coords });
        },
        () => {
          resolve(null);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  },
};
