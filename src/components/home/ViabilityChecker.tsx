import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeocodingService } from '../../services/feasibility/geocodingService';
import {
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Loader2,
  Home,
  Check,
} from 'lucide-react';

interface ViabilityCheckerProps {
  onOpenLeadModal: (planName?: string) => void;
  onSelectCity?: (cityName: string) => void;
  onOpenFeasibilityModal?: (
    initialCep?: string,
    initialStreet?: string,
    initialNumber?: string,
    initialNeighborhood?: string,
    initialCity?: string
  ) => void;
}

export const ViabilityChecker: React.FC<ViabilityCheckerProps> = ({
  onOpenLeadModal,
  onSelectCity,
  onOpenFeasibilityModal,
}) => {
  const [cep, setCep] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addressData, setAddressData] = useState<{
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCepChange = async (value: string) => {
    const rawDigits = value.replace(/\D/g, '').slice(0, 8);
    const masked = rawDigits.length > 5 ? `${rawDigits.slice(0, 5)}-${rawDigits.slice(5)}` : rawDigits;
    setCep(masked);
    setErrorMsg(null);

    if (rawDigits.length === 8) {
      setIsLoading(true);
      setAddressData(null);

      const data = await GeocodingService.fetchAddressByCep(rawDigits);
      setIsLoading(false);

      if (data && !data.erro) {
        setAddressData({
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || 'Suzano',
          state: data.uf || 'SP',
        });
        if (onSelectCity && data.localidade) {
          onSelectCity(data.localidade);
        }
      } else {
        setErrorMsg('CEP não localizado. Por favor, verifique os dígitos digitados.');
      }
    } else {
      setAddressData(null);
    }
  };

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cep || cep.replace(/\D/g, '').length < 8) {
      setErrorMsg('Por favor, digite um CEP válido com 8 dígitos.');
      return;
    }

    if (!number.trim() && addressData?.street) {
      setErrorMsg('Por favor, informe o número do imóvel para verificar a viabilidade com precisão.');
      return;
    }

    if (onOpenFeasibilityModal) {
      onOpenFeasibilityModal(
        cep,
        addressData?.street || '',
        number.trim(),
        addressData?.neighborhood || '',
        addressData?.city || 'Suzano'
      );
    } else {
      const addressInfo = addressData
        ? `${addressData.street} nº ${number}, ${addressData.neighborhood} - ${addressData.city}/${addressData.state}`
        : `CEP ${cep}`;
      onOpenLeadModal(`Consulta de Viabilidade: ${addressInfo}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-nuvv-dark via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 overflow-hidden max-w-5xl mx-auto my-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-nuvv-green/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold text-nuvv-green uppercase tracking-widest bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-500/30 inline-flex items-center space-x-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consulta em Tempo Real</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Consulte a Viabilidade no seu Endereço
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Digite seu CEP para autopreenchimento imediato do endereço e validação georreferenciada da nossa rede de fibra óptica.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleConsult} className="max-w-3xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-lg">
            {/* CEP Input */}
            <div className="relative flex-1">
              <MapPin className="w-5 h-5 text-nuvv-green absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Digite seu CEP (ex: 08674-000)"
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                maxLength={9}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 text-white placeholder-gray-400 text-sm font-semibold outline-none focus:bg-white/20 focus:ring-2 focus:ring-nuvv-green transition-all"
              />
              {isLoading && (
                <Loader2 className="w-4 h-4 text-nuvv-green animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
            </div>

            {/* Número (Habilitado / Focado ao identificar endereço) */}
            <div className="sm:w-36">
              <input
                type="text"
                placeholder="Nº da casa *"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setErrorMsg(null);
                }}
                className={`w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-400 text-sm font-semibold outline-none transition-all ${
                  addressData
                    ? 'bg-emerald-500/20 border border-emerald-400/50 focus:ring-2 focus:ring-emerald-400'
                    : 'bg-white/10 border border-transparent focus:ring-2 focus:ring-nuvv-green'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="py-3.5 px-6 rounded-xl bg-nuvv-green hover:bg-emerald-400 text-nuvv-dark font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 transition-all whitespace-nowrap active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>Verificar Cobertura</span>
            </button>
          </div>

          {/* Autopreenchimento Confirmado */}
          {addressData && (
            <div className="p-3.5 bg-emerald-500/15 border border-emerald-400/30 rounded-2xl flex items-center justify-between text-xs text-emerald-200 animate-fade-in">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Endereço Localizado:</strong> {addressData.street || 'Logradouro'}, {addressData.neighborhood} – {addressData.city}/{addressData.state}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-300 hidden sm:inline">
                {number ? `Nº ${number}` : 'Insira o número acima'}
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-500/20 border border-red-400/40 rounded-xl text-xs text-red-200 flex items-center space-x-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
