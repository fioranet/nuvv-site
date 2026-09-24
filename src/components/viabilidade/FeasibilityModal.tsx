import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import {
  MapPin,
  Search,
  Building2,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  User,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Wifi,
  Compass,
  Globe,
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeocodingService } from '../../services/feasibility/geocodingService';
import { FeasibilityEngine, FeasibilityResult } from '../../services/feasibility/feasibilityEngine';
import { apiService } from '../../services/apiService';
import { siteConfig } from '../../data/siteConfig';

interface CityPoint {
  id: string;
  name: string;
  type: 'hybrid' | 'exclusive'; // hybrid = Residencial & Empresas (Blue), exclusive = Exclusivo Empresas (Green)
  lat: number;
  lng: number;
}

const COVERAGE_CITIES: CityPoint[] = [
  { id: 'suzano', name: 'SUZANO', type: 'hybrid', lat: -23.5376, lng: -46.3108 },
  { id: 'poa', name: 'POÁ', type: 'hybrid', lat: -23.5236, lng: -46.3475 },
  { id: 'zl', name: 'ZONA LESTE SP', type: 'hybrid', lat: -23.5430, lng: -46.4650 },
  { id: 'sp', name: 'SÃO PAULO', type: 'exclusive', lat: -23.5505, lng: -46.6333 },
  { id: 'guarulhos', name: 'GUARULHOS', type: 'exclusive', lat: -23.4628, lng: -46.5333 },
  { id: 'maua', name: 'MAUÁ', type: 'exclusive', lat: -23.6678, lng: -46.4614 },
  { id: 'f_morato', name: 'FRANCISCO MORATO', type: 'exclusive', lat: -23.2817, lng: -46.7439 },
  { id: 'f_rocha', name: 'FRANCO DA ROCHA', type: 'exclusive', lat: -23.3228, lng: -46.7264 },
  { id: 'taboao', name: 'TABOÃO DA SERRA', type: 'exclusive', lat: -23.6019, lng: -46.7886 },
  { id: 'diadema', name: 'DIADEMA', type: 'exclusive', lat: -23.6865, lng: -46.6228 },
  { id: 'itaqua', name: 'ITAQUAQUECETUBA', type: 'exclusive', lat: -23.4861, lng: -46.3483 },
  { id: 'aruja', name: 'ARUJÁ', type: 'exclusive', lat: -23.3967, lng: -46.3203 },
  { id: 'mogi', name: 'MOGI DAS CRUZES', type: 'exclusive', lat: -23.5208, lng: -46.1854 },
];

export interface FeasibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlanAndHire: (planName: string, addressSummary: string) => void;
  initialService?: 'residencial' | 'empresarial';
  initialCep?: string;
  initialStreet?: string;
  initialNumber?: string;
  initialNeighborhood?: string;
  initialCity?: string;
}

export const FeasibilityModal: React.FC<FeasibilityModalProps> = ({
  isOpen,
  onClose,
  onSelectPlanAndHire,
  initialService = 'residencial',
  initialCep = '',
  initialStreet = '',
  initialNumber = '',
  initialNeighborhood = '',
  initialCity = 'Suzano',
}) => {
  const [selectedService, setSelectedService] = useState<'residencial' | 'empresarial'>(initialService);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  // Form states (E-mail removed as requested)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState(initialCep);
  const [street, setStreet] = useState(initialStreet);
  const [number, setNumber] = useState(initialNumber);
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState(initialNeighborhood);
  const [city, setCity] = useState(initialCity || 'Suzano');
  const [state, setState] = useState('SP');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [contactAuthorized, setContactAuthorized] = useState(true);

  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<FeasibilityResult | null>(null);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialCep) setCep(initialCep);
    if (initialStreet) setStreet(initialStreet);
    if (initialNumber) setNumber(initialNumber);
    if (initialNeighborhood) setNeighborhood(initialNeighborhood);
    if (initialCity) setCity(initialCity);
  }, [initialCep, initialStreet, initialNumber, initialNeighborhood, initialCity]);

  // Initialize or invalidate Leaflet map when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        // Initialize Map
        const map = L.map(mapContainerRef.current, {
          center: selectedService === 'residencial' ? [-23.535, -46.33] : [-23.51, -46.45],
          zoom: selectedService === 'residencial' ? 10 : 9,
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
        });

        // Add Light Tile Layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 18,
          subdomains: 'abcd',
        }).addTo(map);

        const markersGroup = L.layerGroup().addTo(map);
        markersGroupRef.current = markersGroup;
        mapInstanceRef.current = map;

        // Custom Pin Icons
        COVERAGE_CITIES.forEach((c) => {
          const isHybrid = c.type === 'hybrid';
          const pinColor = isHybrid ? '#2563EB' : '#10B981';

          const customIcon = L.divIcon({
            className: 'custom-coverage-marker',
            html: `
              <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                <div style="
                  width: 22px;
                  height: 22px;
                  background-color: ${pinColor};
                  border-radius: 50% 50% 50% 0;
                  transform: rotate(-45deg);
                  border: 2px solid #ffffff;
                  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <div style="width: 6px; height: 6px; background: #ffffff; border-radius: 50%;"></div>
                </div>
                <span style="
                  background: rgba(15, 23, 42, 0.85);
                  color: #ffffff;
                  font-size: 9px;
                  font-weight: 800;
                  padding: 1px 5px;
                  border-radius: 4px;
                  margin-top: 2px;
                  white-space: nowrap;
                  letter-spacing: 0.3px;
                ">${c.name}</span>
              </div>
            `,
            iconSize: [30, 42],
            iconAnchor: [15, 28],
          });

          const marker = L.marker([c.lat, c.lng], { icon: customIcon });
          marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 11px;">
              <strong style="color: #0f172a; font-size: 12px;">${c.name}</strong><br/>
              <span style="color: ${pinColor}; font-weight: bold;">
                ${isHybrid ? '🔵 Residencial & Empresas' : '🟢 Exclusivo Empresas'}
              </span>
            </div>
          `);
          markersGroup.addLayer(marker);
        });
      } else {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, selectedService]);

  const handleSelectCityFromPill = (c: CityPoint) => {
    setCity(c.name.charAt(0) + c.name.slice(1).toLowerCase());
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([c.lat, c.lng], 11, { duration: 1 });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    } else if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }
    setPhone(formatted);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    }
    setCep(formatted);

    if (raw.length === 8) {
      setCepLoading(true);
      const data = await GeocodingService.fetchAddressByCep(raw);
      if (data) {
        setStreet(data.logradouro || '');
        setNeighborhood(data.bairro || '');
        setCity(data.localidade || 'Suzano');
        setState(data.uf || 'SP');
      }
      setCepLoading(false);
    }
  };

  const handleUseGps = async () => {
    if (!name.trim()) {
      setFormError('Por favor, informe seu Nome Completo antes de usar o GPS.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe seu WhatsApp antes de usar o GPS.');
      return;
    }

    setGpsLoading(true);
    setFormError(null);
    const data = await GeocodingService.getBrowserPosition();
    if (data) {
      if (data.address) {
        setCep(data.address.cep ? data.address.cep.replace(/\D/g, '').slice(0, 8) : '');
        setStreet(data.address.street);
        setNumber(data.address.number || '');
        setNeighborhood(data.address.neighborhood);
        setCity(data.address.city);
        setState(data.address.state);
      }

      const res = await FeasibilityEngine.checkFeasibility({
        serviceType: selectedService,
        coordinates: data.coords,
        street: data.address?.street,
        neighborhood: data.address?.neighborhood,
        city: data.address?.city,
        state: data.address?.state,
        number: data.address?.number,
        name: name.trim(),
        phone: phone.trim(),
      });

      setResult(res);

      if (res.queryId) {
        apiService.logViabilityQuery({
          query_id: res.queryId,
          name: name.trim(),
          phone: phone.trim(),
          plan_interested: res.availablePlans?.[0]?.name,
          notes: `GPS | Zona: ${res.matchedZone || 'Fora da Mancha'} | Distância: ${res.distanceMeters}m`,
          has_feasibility: res.isAvailable,
          cep: (data.address?.cep || 'GPS').replace(/\D/g, ''),
        });
      }
    } else {
      alert('Não foi possível obter sua localização GPS. Digite o CEP ou endereço.');
    }
    setGpsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Por favor, preencha seu Nome Completo.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe um WhatsApp ou celular válido com DDD.');
      return;
    }
    if (!termsAccepted) {
      setFormError('É necessário concordar com os Termos de Uso e Privacidade.');
      return;
    }

    setFormError(null);
    setLoading(true);

    try {
      const res = await FeasibilityEngine.checkFeasibility({
        serviceType: selectedService,
        cep,
        street,
        number,
        neighborhood,
        city,
        state,
        name: name.trim(),
        phone: phone.trim(),
        notes: complement ? `Complemento: ${complement}` : undefined,
      });

      setResult(res);

      if (res.queryId) {
        apiService.logViabilityQuery({
          query_id: res.queryId,
          name: name.trim(),
          phone: phone.trim(),
          plan_interested: res.availablePlans?.[0]?.name,
          notes: `Complemento: ${complement || 'N/A'} | Zona: ${res.matchedZone || 'Manual'} | Distância: ${res.distanceMeters}m`,
          has_feasibility: res.isAvailable,
          cep: cep.replace(/\D/g, '') || 'S/CEP',
        });
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormError(null);
  };

  const handleHirePlan = (plan: any) => {
    const addressSummary = `${street}${number ? `, ${number}` : ''} - ${neighborhood}, ${city}`;
    onSelectPlanAndHire(plan.name || plan.title, addressSummary);
    onClose();
  };

  const handleWhatsAppContact = () => {
    const addressSummary = `${street}${number ? `, ${number}` : ''} - ${neighborhood}, ${city}`;
    const serviceLabel = selectedService === 'residencial' ? 'Fibra Residencial' : 'Fibra Empresarial';
    const text = `Olá! Meu nome é ${name}. Solicito estudo de viabilidade para ${serviceLabel} no endereço: ${addressSummary}. Contato: ${phone}`;
    window.open(`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const isResidencial = selectedService === 'residencial';
  const headerBgClass = isResidencial
    ? 'bg-gradient-to-r from-nuvv-purple to-indigo-700'
    : 'bg-[#009245]';

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="5xl" showCloseButton={false}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className={`${headerBgClass} px-6 py-4 flex items-center justify-between text-white transition-colors duration-300`}>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {isResidencial ? 'Consultar Cobertura Fibra Residencial' : 'Consultar Cobertura Empresarial'}
            </h3>
            <p className="text-xs text-white/90 font-medium">
              Confira onde já estamos presentes e consulte seu endereço.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Map & Cities */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Mapa de Atuação */}
            <div>
              <div className="flex items-center space-x-2 mb-2 text-nuvv-purple">
                <MapPin className="w-4 h-4 text-nuvv-purple" />
                <h4 className="text-sm font-extrabold text-slate-800">Mapa de Atuação</h4>
              </div>

              <div className="w-full h-52 sm:h-56 rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative bg-slate-100">
                <div ref={mapContainerRef} className="w-full h-full" />
              </div>
            </div>

            {/* Cidades Atendidas */}
            <div>
              <div className="flex items-center space-x-2 mb-2 text-nuvv-purple">
                <Building2 className="w-4 h-4 text-nuvv-purple" />
                <h4 className="text-sm font-extrabold text-slate-800">Cidades Atendidas</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {COVERAGE_CITIES.map((c) => {
                  const isHybrid = c.type === 'hybrid';
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCityFromPill(c)}
                      className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-gray-200 rounded-xl text-left flex items-center space-x-2 text-[11px] font-bold text-slate-700 transition-all cursor-pointer group"
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isHybrid ? 'bg-blue-600' : 'bg-emerald-500'
                        }`}
                      />
                      <span className="truncate group-hover:text-nuvv-purple">{c.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend Box & National Coverage Indicator */}
              <div className="mt-3 space-y-2">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-gray-200 flex items-center space-x-4 text-[10px] font-semibold text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Residencial & Empresas</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Exclusivo Empresas</span>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-[10px] text-emerald-800 font-bold">
                  <Globe className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Presença Nacional: Serviços Corporativos e Links Dedicados em todo o Brasil.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feasibility Form or Result */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Service Switcher Tabs inside modal */}
                <div className="flex items-center space-x-2 pb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedService('residencial')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 cursor-pointer border ${
                      isResidencial
                        ? 'bg-indigo-50 border-nuvv-purple text-nuvv-purple shadow-xs'
                        : 'bg-slate-50 border-gray-200 text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Residencial</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedService('empresarial')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1.5 cursor-pointer border ${
                      !isResidencial
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                        : 'bg-slate-50 border-gray-200 text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Empresarial</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                  <div className="flex items-center space-x-2 text-slate-800">
                    <Search className="w-4 h-4 text-nuvv-purple" />
                    <h4 className="text-sm font-extrabold">Consultar Viabilidade</h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleUseGps}
                    disabled={gpsLoading}
                    className="text-[11px] font-bold text-nuvv-purple hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{gpsLoading ? 'Obtendo GPS...' : 'Usar GPS'}</span>
                  </button>
                </div>

                {/* Nome Completo */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu Nome Completo"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple focus:border-nuvv-purple outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Celular/WhatsApp & CEP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Celular/WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 98765-4321"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple focus:border-nuvv-purple outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      CEP *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="00000-000"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple focus:border-nuvv-purple outline-none transition-all placeholder:text-gray-400"
                      />
                      {cepLoading && (
                        <span className="absolute right-2.5 top-2.5 text-[10px] text-gray-400 font-bold animate-pulse">
                          ...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                    Endereço (Rua / Avenida)
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Nome da sua rua"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Número & Complemento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Ex: 120"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Complemento (Opcional)
                    </label>
                    <input
                      type="text"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      placeholder="Apto, Bloco, Sala"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Bairro, Cidade, UF */}
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Bairro</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Bairro"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <div className="col-span-5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Cidade</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Cidade"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-nuvv-purple outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">UF</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="UF"
                      className="w-full px-2 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold text-center focus:bg-white focus:ring-2 focus:ring-nuvv-purple outline-none"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-1.5 pt-1 text-[11px] text-gray-600">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-nuvv-purple focus:ring-nuvv-purple"
                    />
                    <span>
                      Concordo com os{' '}
                      <a href="/termos" target="_blank" className="text-nuvv-purple font-bold hover:underline">
                        Termos de Uso
                      </a>{' '}
                      e{' '}
                      <a href="/privacidade" target="_blank" className="text-nuvv-purple font-bold hover:underline">
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contactAuthorized}
                      onChange={(e) => setContactAuthorized(e.target.checked)}
                      className="mt-0.5 rounded text-nuvv-purple focus:ring-nuvv-purple"
                    />
                    <span>Autorizo contato comercial via WhatsApp ou Telefone.</span>
                  </label>
                </div>

                {formError && (
                  <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-[11px] font-bold rounded-xl flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 active:scale-98 ${
                    isResidencial
                      ? 'bg-nuvv-purple hover:bg-nuvv-purple-hover'
                      : 'bg-[#009245] hover:bg-[#007a3a]'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? 'Consultando Disponibilidade...' : 'Consultar Disponibilidade'}</span>
                </button>
              </form>
            ) : (
              /* Results view */
              <div className="space-y-4 animate-fade-in p-4 bg-slate-50 rounded-2xl border border-gray-200">
                <div
                  className={`p-4 rounded-2xl border ${
                    result.isAvailable
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : result.rawStatus === 'EM_ANALISE'
                      ? 'bg-blue-50 border-blue-300 text-blue-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {result.isAvailable ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    ) : result.rawStatus === 'EM_ANALISE' ? (
                      <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                    )}
                    <div>
                      <h5 className="text-sm font-black">
                        {result.headline}
                      </h5>
                      <p className="text-xs opacity-90 mt-0.5">
                        {street ? `${street}${number ? `, ${number}` : ''} - ${neighborhood}, ${city}` : city}
                      </p>
                      {result.matchedZone && (
                        <div className="mt-1.5 inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-white/70 border border-current text-[10px] font-bold">
                          <span>Mancha Atendida:</span>
                          <span className="font-extrabold">{result.matchedZone}</span>
                        </div>
                      )}
                      {!result.isAvailable && result.distanceMeters > 0 && (
                        <div className="mt-1 text-[11px] text-gray-600 font-semibold">
                          Distância até a mancha mais próxima: <strong>{result.distanceMeters > 1000 ? `${(result.distanceMeters / 1000).toFixed(1)} km` : `${result.distanceMeters}m`}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {result.isAvailable ? (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      Planos Recomendados para {name || 'você'}:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.availablePlans?.slice(0, 2).map((plan) => (
                        <div
                          key={plan.id}
                          className="p-3 rounded-xl bg-white border border-gray-200 hover:border-nuvv-purple transition-all flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[9px] font-bold text-nuvv-purple bg-indigo-50 px-1.5 py-0.5 rounded uppercase">
                              {plan.badge || 'Fibra'}
                            </span>
                            <h6 className="text-xs font-black text-nuvv-dark mt-1">{plan.name}</h6>
                            <div className="text-sm font-black text-nuvv-purple mt-0.5">
                              R$ {plan.price?.toFixed(2).replace('.', ',')}
                              <span className="text-[10px] text-gray-400 font-medium">/mês</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleHirePlan(plan)}
                            className="mt-2 w-full py-1.5 bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <span>Contratar</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-700">
                    Olá <strong>{name}</strong>, registramos sua consulta. Nossa equipe técnica entrará em contato pelo WhatsApp <strong>{phone}</strong> para avaliar viabilidade prioritária.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppContact}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Falar com Atendimento no WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Nova Consulta</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
