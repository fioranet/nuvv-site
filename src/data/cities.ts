export interface City {
  id: string;
  name: string;
  state: string;
  isPopular?: boolean;
}

export type SupportedCity = City;

export const cities: City[] = [
  { id: "suzano", name: "Suzano", state: "SP", isPopular: true },
  { id: "mogi-das-cruzes", name: "Mogi das Cruzes", state: "SP", isPopular: true },
  { id: "poa", name: "Poá", state: "SP", isPopular: true },
  { id: "ferraz-de-vasconcelos", name: "Ferraz de Vasconcelos", state: "SP", isPopular: true },
  { id: "itaquaquecetuba", name: "Itaquaquecetuba", state: "SP", isPopular: true },
  { id: "sao-paulo", name: "São Paulo", state: "SP", isPopular: false },
  { id: "guarulhos", name: "Guarulhos", state: "SP", isPopular: false },
  { id: "aruja", name: "Arujá", state: "SP", isPopular: false },
  { id: "santa-isabel", name: "Santa Isabel", state: "SP", isPopular: false },
];

export const CITIES = cities;

export const DEFAULT_CITY = "Suzano";
