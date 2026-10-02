import { CITIES, SupportedCity } from '../data/cities';

export interface GeolocationResult {
  cityName: string;
  isSupported: boolean;
  state?: string;
  source: 'gps' | 'ip' | 'default';
}

export const GeolocationService = {
  /**
   * Encontra uma cidade suportada na lista oficial comparando nomes (sem acentos/case-insensitive)
   */
  matchSupportedCity(detectedName: string): SupportedCity | undefined {
    const clean = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    const normalizedTarget = clean(detectedName);
    return CITIES.find((c) => clean(c.name) === normalizedTarget || clean(c.name).includes(normalizedTarget));
  },

  /**
   * Tenta detectar a cidade do usuário via endereço IP (silencioso, sem prompt de permissão)
   */
  async detectFromIp(): Promise<GeolocationResult> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('https://get.geojs.io/v1/ip/geo.json', {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('IP Geolocation request failed');
      const data = await res.json();
      const rawCity = data.city || '';

      if (rawCity) {
        const matched = this.matchSupportedCity(rawCity);
        if (matched) {
          return {
            cityName: matched.name,
            isSupported: true,
            state: matched.state,
            source: 'ip',
          };
        }
        return {
          cityName: rawCity,
          isSupported: false,
          state: data.region || 'SP',
          source: 'ip',
        };
      }
    } catch {
      // Falha silenciosa
    }

    return { cityName: 'Suzano', isSupported: false, source: 'default' };
  },

  /**
   * Detecta a localização recomendada para o primeiro carregamento:
   * Prioriza IP (sem popup invasivo de permissão para o usuário)
   */
  async detectUserLocation(): Promise<GeolocationResult> {
    const ipResult = await this.detectFromIp();
    if (ipResult.isSupported && ipResult.cityName) {
      return ipResult;
    }
    return ipResult;
  },

  /**
   * Tenta detectar a cidade do usuário utilizando a API de Geolocalização do Navegador (GPS)
   * Usado quando o usuário clica expressamente em "Usar minha localização atual (GPS)"
   */
  async detectFromBrowser(): Promise<GeolocationResult> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        this.detectFromIp().then(resolve);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'Accept-Language': 'pt-BR,pt;q=0.9',
                },
              }
            );

            if (!res.ok) throw new Error('Geocoding request failed');
            const data = await res.json();

            const rawCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.municipality ||
              data.address?.county ||
              '';

            const matched = this.matchSupportedCity(rawCity);

            if (matched) {
              resolve({
                cityName: matched.name,
                isSupported: true,
                state: matched.state,
                source: 'gps',
              });
            } else if (rawCity) {
              resolve({
                cityName: rawCity,
                isSupported: false,
                source: 'gps',
              });
            } else {
              // Tenta IP como fallback do geocoding
              const ipFallback = await this.detectFromIp();
              resolve(ipFallback);
            }
          } catch {
            const ipFallback = await this.detectFromIp();
            resolve(ipFallback);
          }
        },
        async () => {
          // Erro ou permissão negada pelo usuário: tenta IP silencioso
          const ipFallback = await this.detectFromIp();
          resolve(ipFallback);
        },
        { timeout: 7000, enableHighAccuracy: false }
      );
    });
  },
};
