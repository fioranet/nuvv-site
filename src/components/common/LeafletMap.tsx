import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { GeoJSONFeatureCollection, Coordinate } from '../../services/feasibility/pointInPolygon';
import { CoverageLayerInfo } from '../../data/coverage/coverageConfig';
import {
  Layers,
  Flame,
  Globe,
  Compass,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Sparkles,
} from 'lucide-react';

export interface HeatmapPoint {
  lat: number;
  lng: number;
  count: number;
  weight?: number;
  cep?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  lastRequestAt?: string;
}

interface LeafletMapProps {
  layers: Record<string, CoverageLayerInfo>;
  selectedService?: string;
  heatmapPoints?: HeatmapPoint[];
  initialCenter?: [number, number]; // [lat, lng]
  initialZoom?: number;
  height?: string;
  showControls?: boolean;
  showHeatmapByDefault?: boolean;
  highlightUserCoord?: Coordinate; // [lng, lat]
  onZoneClick?: (zoneProperties: any) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  layers,
  selectedService = 'residencial',
  heatmapPoints = [],
  initialCenter = [-23.535, -46.315], // Suzano / Alto Tietê center
  initialZoom = 13,
  height = '500px',
  showControls = true,
  showHeatmapByDefault = true,
  highlightUserCoord,
  onZoneClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const tileLayerGroupRef = useRef<L.TileLayer | null>(null);
  const geoJsonLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerGroupRef = useRef<L.LayerGroup | null>(null);

  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite' | 'streets'>('dark');
  const [showCoverage, setShowCoverage] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(showHeatmapByDefault);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default Leaflet icon paths in React bundle
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Create Layer Groups
    geoJsonLayerGroupRef.current = L.layerGroup().addTo(map);
    heatmapLayerGroupRef.current = L.layerGroup().addTo(map);
    userMarkerGroupRef.current = L.layerGroup().addTo(map);

    // Initial base tile layer (OpenStreetMap with Dark CSS Filter)
    const baseTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map);

    tileLayerGroupRef.current = baseTile;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer based on mapStyle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerGroupRef.current) {
      map.removeLayer(tileLayerGroupRef.current);
    }

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let options: L.TileLayerOptions = { maxZoom: 19, subdomains: ['a', 'b', 'c'] };

    if (mapStyle === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      options = { maxZoom: 19 };
    } else if (mapStyle === 'streets' || mapStyle === 'dark') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      options = { maxZoom: 19, subdomains: ['a', 'b', 'c'] };
    }

    const newTile = L.tileLayer(url, options).addTo(map);
    tileLayerGroupRef.current = newTile;
  }, [mapStyle]);

  // Render Coverage Polygons
  useEffect(() => {
    const geoGroup = geoJsonLayerGroupRef.current;
    if (!geoGroup) return;

    geoGroup.clearLayers();

    if (!showCoverage) return;

    const layerInfo = layers[selectedService] || layers.residencial;
    if (!layerInfo?.geoJson?.features) return;

    const color = layerInfo.color || '#10B981';

    const geoJsonLayer = L.geoJSON(layerInfo.geoJson as any, {
      style: () => ({
        color: color,
        weight: 2.5,
        opacity: 0.9,
        fillColor: color,
        fillOpacity: 0.28,
        dashArray: '3, 4',
      }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        const popupContent = `
          <div style="font-family: 'Poppins', sans-serif; padding: 4px; color: #0F172A; min-width: 180px;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${color}; letter-spacing: 0.5px;">
              ● ${props.service ? props.service.toUpperCase() : 'COBERTURA FIBRA'}
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin: 3px 0;">
              ${props.name || 'Área de Atendimento'}
            </div>
            <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
              📍 ${props.city || 'Suzano/SP'}
            </div>
            <div style="background: #F1F5F9; padding: 6px 8px; border-radius: 8px; font-size: 11px;">
              <div>⚡ <strong>Velocidade:</strong> ${props.maxSpeed || '1 Giga'}</div>
              <div>🛠️ <strong>Tecnologia:</strong> ${props.technology || 'FTTH Fibra Óptica'}</div>
            </div>
          </div>
        `;

        layer.bindPopup(popupContent);

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3.5,
              fillOpacity: 0.55,
              dashArray: '',
            });
          },
          mouseout: (e) => {
            geoJsonLayer.resetStyle(e.target);
          },
          click: () => {
            if (onZoneClick) onZoneClick(props);
          },
        });
      },
    });

    geoGroup.addLayer(geoJsonLayer);
  }, [layers, selectedService, showCoverage, onZoneClick]);

  // Render Heatmap / Thermal Circles of Unmet Demand
  useEffect(() => {
    const heatGroup = heatmapLayerGroupRef.current;
    if (!heatGroup) return;

    heatGroup.clearLayers();

    if (!showHeatmap || !heatmapPoints || heatmapPoints.length === 0) return;

    heatmapPoints.forEach((pt) => {
      const radius = Math.min(Math.max(pt.count * 12, 14), 45);
      const intensity = Math.min(pt.count / 5, 1);

      // Outer glow circle
      const outerCircle = L.circleMarker([pt.lat, pt.lng], {
        radius: radius * 1.5,
        fillColor: '#EF4444',
        fillOpacity: 0.15 * (0.5 + intensity * 0.5),
        color: '#F59E0B',
        weight: 0,
      });

      // Core demand marker
      const coreCircle = L.circleMarker([pt.lat, pt.lng], {
        radius: radius,
        fillColor: pt.count > 3 ? '#DC2626' : '#EA580C',
        fillOpacity: 0.65,
        color: '#FDE047',
        weight: 1.5,
      });

      const popupHtml = `
        <div style="font-family: 'Poppins', sans-serif; padding: 4px; color: #0F172A; min-width: 190px;">
          <div style="font-size: 11px; font-weight: 800; color: #DC2626; display: flex; align-items: center; gap: 4px;">
            🔥 DEMANDA REPRIMIDA
          </div>
          <div style="font-size: 14px; font-weight: 800; color: #0F172A; margin: 3px 0;">
            ${pt.count} ${pt.count === 1 ? 'Pedido de Viabilidade' : 'Pedidos de Viabilidade'}
          </div>
          <div style="font-size: 11px; color: #475569;">
            📍 <strong>${pt.neighborhood || 'Bairro Não Mapeado'}</strong>, ${pt.city || 'Suzano'}
          </div>
          ${pt.cep ? `<div style="font-size: 10px; color: #64748B; margin-top: 2px;">CEP: ${pt.cep}</div>` : ''}
          <div style="margin-top: 6px; font-size: 10px; background: #FEF2F2; color: #991B1B; padding: 4px 6px; border-radius: 6px;">
            Sem cobertura de fibra no momento da busca
          </div>
        </div>
      `;

      coreCircle.bindPopup(popupHtml);
      outerCircle.bindPopup(popupHtml);

      heatGroup.addLayer(outerCircle);
      heatGroup.addLayer(coreCircle);
    });
  }, [heatmapPoints, showHeatmap]);

  // Render Highlight User Coordinate (if provided, e.g. from CEP search)
  useEffect(() => {
    const userGroup = userMarkerGroupRef.current;
    const map = mapInstanceRef.current;
    if (!userGroup || !map) return;

    userGroup.clearLayers();

    if (highlightUserCoord && highlightUserCoord.length === 2) {
      const [lng, lat] = highlightUserCoord;
      const userMarker = L.circleMarker([lat, lng], {
        radius: 10,
        fillColor: '#10B981',
        fillOpacity: 0.9,
        color: '#FFFFFF',
        weight: 3,
      }).addTo(userGroup);

      userMarker.bindPopup('📍 <strong>Endereço Selecionado</strong>').openPopup();
      map.flyTo([lat, lng], 15, { duration: 1.2 });
    }
  }, [highlightUserCoord]);

  // Zoom Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetCenter = () => mapInstanceRef.current?.setView(initialCenter, initialZoom);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height }}
        className={`z-10 ${mapStyle === 'dark' ? 'leaflet-dark-mode' : ''}`}
      />

      {/* Floating Control Toolbar */}
      {showControls && (
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Coverage Layer Toggle */}
          <button
            type="button"
            onClick={() => setShowCoverage(!showCoverage)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 backdrop-blur-md border transition-all shadow-lg ${
              showCoverage
                ? 'bg-emerald-500/90 text-slate-950 border-emerald-400 font-black'
                : 'bg-slate-900/80 text-gray-400 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Polígonos de Fibra</span>
          </button>

          {/* Heatmap Toggle */}
          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 backdrop-blur-md border transition-all shadow-lg ${
              showHeatmap
                ? 'bg-amber-500/90 text-slate-950 border-amber-400 font-black'
                : 'bg-slate-900/80 text-gray-400 border-slate-700 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Mapa de Calor (Demanda: {heatmapPoints.length})</span>
          </button>

          {/* Map Base Tile Switcher */}
          <div className="flex bg-slate-900/85 backdrop-blur-md border border-slate-700 rounded-xl p-1 shadow-lg text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setMapStyle('dark')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                mapStyle === 'dark' ? 'bg-slate-800 text-emerald-400 font-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Dark Cyber
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                mapStyle === 'satellite' ? 'bg-slate-800 text-emerald-400 font-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Satélite
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('streets')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                mapStyle === 'streets' ? 'bg-slate-800 text-emerald-400 font-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Ruas
            </button>
          </div>
        </div>
      )}

      {/* Floating Zoom & Center Controls (Right side) */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-20 flex flex-col space-y-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-gray-200 border border-slate-700 backdrop-blur-md shadow-lg transition-all"
            title="Aproximar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-gray-200 border border-slate-700 backdrop-blur-md shadow-lg transition-all"
            title="Afastar Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetCenter}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-slate-700 backdrop-blur-md shadow-lg transition-all"
            title="Recentralizar no Alto Tietê"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Heatmap Legend Bar (Bottom Left) */}
      {showHeatmap && (
        <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 border border-slate-800 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl flex items-center space-x-3 text-[11px]">
          <span className="text-gray-400 font-bold flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Demanda Reprimida:</span>
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-gray-300">1-2 pedidos</span>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ml-2" />
            <span className="text-gray-300">3-5 pedidos</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 ml-2" />
            <span className="text-gray-300 font-bold text-red-400">&gt; 5 pedidos</span>
          </div>
        </div>
      )}
    </div>
  );
};
