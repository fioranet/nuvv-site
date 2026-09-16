import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CITIES, SupportedCity } from '../../data/cities';
import { GeolocationService } from '../../services/geolocation';
import { Search, MapPin, Check, Navigation, Loader2 } from 'lucide-react';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onSelectCity: (cityName: string) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState<string | null>(null);

  const filteredCities = CITIES.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (cityName: string) => {
    onSelectCity(cityName);
    onClose();
  };

  const handleDetectGPS = async () => {
    setIsDetecting(true);
    setDetectionMessage(null);
    try {
      const result = await GeolocationService.detectFromBrowser();
      if (result.isSupported) {
        onSelectCity(result.cityName);
        setDetectionMessage(`Localizado em ${result.cityName}!`);
        setTimeout(() => {
          onClose();
          setDetectionMessage(null);
        }, 1000);
      } else {
        setDetectionMessage(`Detectamos ${result.cityName}, mas ainda não temos fibra óptica nesta cidade.`);
      }
    } catch {
      setDetectionMessage('Não foi possível obter sua localização. Por favor, selecione na lista abaixo.');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecione sua Cidade"
      subtitle="Escolha sua localização para ver os planos e ofertas disponíveis"
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* GPS Auto Detection Button */}
        <button
          type="button"
          onClick={handleDetectGPS}
          disabled={isDetecting}
          className="w-full p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-nuvv-purple transition-all flex items-center justify-between text-left group disabled:opacity-60"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-nuvv-purple text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              {isDetecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-nuvv-dark block">
                {isDetecting ? 'Identificando sua localização...' : 'Usar minha localização atual (GPS)'}
              </span>
              <span className="text-[11px] text-gray-500">Detecta automaticamente sua cidade</span>
            </div>
          </div>
          <span className="text-xs font-bold text-nuvv-purple">Detectar</span>
        </button>

        {detectionMessage && (
          <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-700 text-center animate-fade-in">
            {detectionMessage}
          </div>
        )}

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar cidade atendida..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:bg-white focus:border-nuvv-purple focus:ring-2 focus:ring-nuvv-purple/20 outline-none transition-all"
          />
        </div>

        {/* Cities Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
          {filteredCities.map((city: SupportedCity) => {
            const isSelected = currentCity.toLowerCase() === city.name.toLowerCase();
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => handleSelect(city.name)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-nuvv-purple bg-indigo-50/60 text-nuvv-purple font-bold shadow-2xs'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-nuvv-purple' : 'text-gray-400'}`} />
                  <span className="text-xs">{city.name}, {city.state}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-nuvv-purple flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
