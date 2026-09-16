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
   * Tenta detectar a cidade do usuário utilizando a API de Geolocalização do Navegador (GPS)
   */
  async detectFromBrowser(): Promise<GeolocationResult> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ cityName: 'Suzano', isSupported: true, source: 'default' });
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
              resolve({ cityName: 'Suzano', isSupported: true, source: 'default' });
            }
          } catch {
            resolve({ cityName: 'Suzano', isSupported: true, source: 'default' });
          }
        },
        () => {
          // Erro ou permissão negada
          resolve({ cityName: 'Suzano', isSupported: true, source: 'default' });
        },
        { timeout: 7000, enableHighAccuracy: false }
      );
    });
  },
};
