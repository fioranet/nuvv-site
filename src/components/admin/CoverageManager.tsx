import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Upload,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Zap,
  Globe,
  Save,
  Check,
  Search,
  Eye,
  FileCode,
  Gauge,
  Cpu,
  Building,
  Radio,
  FileSpreadsheet,
} from 'lucide-react';
import { CoverageConfig, CoverageServiceType, CoverageLayerInfo } from '../../data/coverage/coverageConfig';
import { GeoJSONFeatureCollection, GeoJSONFeature, Coordinate } from '../../services/feasibility/pointInPolygon';
import { parseKmlToGeoJSON, readKmzOrKmlFile } from '../../services/feasibility/kmlParser';
import { apiService } from '../../services/apiService';
import { CITIES } from '../../data/cities';
import { LeafletMap, HeatmapPoint } from '../common/LeafletMap';

export const CoverageManager: React.FC = () => {
  // State for all coverage layers
  const [layers, setLayers] = useState<Record<CoverageServiceType, CoverageLayerInfo>>(() => {
    return { ...CoverageConfig.getRegistry() };
  });

  const [selectedService, setSelectedService] = useState<CoverageServiceType>('residencial');
  const [activeSubTab, setActiveSubTab] = useState<'zones' | 'import' | 'manual' | 'map'>('zones');
  const [searchQuery, setSearchQuery] = useState('');
  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>([]);


  // Import states
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importRawText, setImportRawText] = useState('');
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importPreviewCount, setImportPreviewCount] = useState<number | null>(null);

  // Manual Zone Form State
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);
  const [formZoneName, setFormZoneName] = useState('');
  const [formCity, setFormCity] = useState('Suzano');
  const [formMaxSpeed, setFormMaxSpeed] = useState('1 Giga');
  const [formTechnology, setFormTechnology] = useState('FTTH (GPON)');
  const [formService, setFormService] = useState<CoverageServiceType>('residencial');
  const [formCoordinatesRaw, setFormCoordinatesRaw] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Persistence State
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string; updatedAt?: string } | null>(null);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(null);

  // Load layers from remote on mount
  useEffect(() => {
    loadRemoteLayers();
  }, []);

  const loadRemoteLayers = async () => {
    try {
      const [covRes, heatRes] = await Promise.allSettled([
        apiService.getCoverageLayers(),
        apiService.getViabilityHeatmap(),
      ]);

      if (covRes.status === 'fulfilled' && covRes.value?.success && covRes.value.custom && covRes.value.data) {
        CoverageConfig.loadFromObject(covRes.value.data);
        setLayers({ ...CoverageConfig.getRegistry() });
        setLastSyncDate(covRes.value.updatedAt ? new Date(covRes.value.updatedAt).toLocaleString('pt-BR') : 'Salvo no banco');
      }

      if (heatRes.status === 'fulfilled' && heatRes.value?.success && heatRes.value.points) {
        setHeatmapPoints(heatRes.value.points);
      }
    } catch {
      // Use in-memory defaults
    }
  };

  // Currently selected layer
  const currentLayer = layers[selectedService] || layers.residencial;
  const currentFeatures = currentLayer.geoJson?.features || [];

  // Filtered features for search
  const filteredFeatures = useMemo(() => {
    if (!searchQuery.trim()) return currentFeatures;
    const q = searchQuery.toLowerCase();
    return currentFeatures.filter((f) => {
      const name = f.properties?.name?.toLowerCase() || '';
      const city = f.properties?.city?.toLowerCase() || '';
      const tech = f.properties?.technology?.toLowerCase() || '';
      const speed = f.properties?.maxSpeed?.toLowerCase() || '';
      return name.includes(q) || city.includes(q) || tech.includes(q) || speed.includes(q);
    });
  }, [currentFeatures, searchQuery]);

  // Total stats across all layers
  const totalStats = useMemo(() => {
    let totalZones = 0;
    const citiesSet = new Set<string>();

    Object.values(layers).forEach((l) => {
      const features = l.geoJson?.features || [];
      totalZones += features.length;
      features.forEach((f) => {
        if (f.properties?.city) citiesSet.add(f.properties.city);
        if (f.properties?.name) {
          // Extract city if present in name
          CITIES.forEach((c) => {
            if (f.properties?.name?.toLowerCase().includes(c.name.toLowerCase())) {
              citiesSet.add(c.name);
            }
          });
        }
      });
    });

    return {
      totalZones,
      coveredCitiesCount: Math.max(citiesSet.size, 5),
    };
  }, [layers]);

  // Handle KMZ / KML / GeoJSON File Selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImportFile(file);
      setImportError(null);
      setImportPreviewCount(null);

      try {
        setImportLoading(true);
        const text = await readKmzOrKmlFile(file);
        setImportRawText(text);

        // Try parsing to preview count
        let parsed: GeoJSONFeatureCollection;
        if (text.trim().startsWith('{')) {
          parsed = JSON.parse(text);
        } else {
          parsed = parseKmlToGeoJSON(text);
        }

        if (parsed.features && parsed.features.length > 0) {
          setImportPreviewCount(parsed.features.length);
        } else {
          setImportError('Nenhum polígono válido foi encontrado neste arquivo.');
        }
      } catch (err: any) {
        setImportError(err.message || 'Erro ao ler arquivo. Formatos suportados: .kmz, .kml ou .geojson');
      } finally {
        setImportLoading(false);
      }
    }
  };

  // Execute Import into Current Layer
  const handleExecuteImport = () => {
    if (!importRawText.trim()) {
      setImportError('Por favor, selecione um arquivo ou cole o conteúdo KML/GeoJSON.');
      return;
    }

    try {
      setImportLoading(true);
      setImportError(null);

      let importedGeoJson: GeoJSONFeatureCollection;
      if (importRawText.trim().startsWith('{')) {
        importedGeoJson = JSON.parse(importRawText);
        if (importedGeoJson.type !== 'FeatureCollection') {
          throw new Error('O arquivo precisa ser um GeoJSON FeatureCollection.');
        }
      } else {
        importedGeoJson = parseKmlToGeoJSON(importRawText);
      }

      if (!importedGeoJson.features || importedGeoJson.features.length === 0) {
        throw new Error('Nenhum polígono encontrado.');
      }

      // Enhance imported features with default properties if missing
      const enhancedFeatures: GeoJSONFeature[] = importedGeoJson.features.map((feat, idx) => ({
        ...feat,
        properties: {
          id: feat.properties?.id || `zone-${selectedService}-${Date.now()}-${idx}`,
          name: feat.properties?.name || `Zona Importada ${idx + 1}`,
          service: selectedService,
          maxSpeed: feat.properties?.maxSpeed || (selectedService === 'empresarial' ? '10 Giga Dedicado' : '1 Giga'),
          technology: feat.properties?.technology || 'FTTH (GPON)',
          city: feat.properties?.city || 'Suzano',
          ...feat.properties,
        },
      }));

      // Update in layers state
      const updatedLayer: CoverageLayerInfo = {
        ...currentLayer,
        geoJson: {
          type: 'FeatureCollection',
          features: [...currentFeatures, ...enhancedFeatures],
        },
        isCustomUploaded: true,
      };

      const updatedLayers = {
        ...layers,
        [selectedService]: updatedLayer,
      };

      setLayers(updatedLayers);
      CoverageConfig.registerCustomLayer(selectedService, updatedLayer.geoJson);

      setImportFile(null);
      setImportRawText('');
      setActiveSubTab('zones');
    } catch (err: any) {
      setImportError(err.message || 'Erro ao processar arquivo.');
    } finally {
      setImportLoading(false);
    }
  };

  // Save manual zone (New or Edit)
  const handleSaveManualZone = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formZoneName.trim()) {
      setFormError('Informe o nome da área/bairro.');
      return;
    }

    let parsedCoords: Coordinate[][];
    try {
      if (formCoordinatesRaw.trim().startsWith('[')) {
        const rawJson = JSON.parse(formCoordinatesRaw);
        if (Array.isArray(rawJson) && Array.isArray(rawJson[0]) && typeof rawJson[0][0] === 'number') {
          parsedCoords = [rawJson as Coordinate[]];
        } else if (Array.isArray(rawJson) && Array.isArray(rawJson[0]) && Array.isArray(rawJson[0][0])) {
          parsedCoords = rawJson as Coordinate[][];
        } else {
          throw new Error('Formato de coordenadas inválido.');
        }
      } else {
        throw new Error('As coordenadas devem ser um array JSON de pontos [longitude, latitude].');
      }
    } catch (err: any) {
      setFormError(err.message || 'Coordenadas JSON inválidas.');
      return;
    }

    const newFeature: GeoJSONFeature = {
      type: 'Feature',
      properties: {
        id: editingZoneId || `zone-${formService}-${Date.now()}`,
        name: formZoneName,
        service: formService,
        maxSpeed: formMaxSpeed,
        technology: formTechnology,
        city: formCity,
      },
      geometry: {
        type: 'Polygon',
        coordinates: parsedCoords,
      },
    };

    const targetLayer = layers[formService];
    let updatedFeatures = targetLayer.geoJson?.features ? [...targetLayer.geoJson.features] : [];

    if (editingZoneId) {
      updatedFeatures = updatedFeatures.map((f) => (f.properties?.id === editingZoneId ? newFeature : f));
    } else {
      updatedFeatures.push(newFeature);
    }

    const updatedLayers = {
      ...layers,
      [formService]: {
        ...targetLayer,
        geoJson: {
          type: 'FeatureCollection' as const,
          features: updatedFeatures,
        },
        isCustomUploaded: true,
      },
    };

    setLayers(updatedLayers);
    CoverageConfig.registerCustomLayer(formService, {
      type: 'FeatureCollection',
      features: updatedFeatures,
    });

    setFormSuccess(editingZoneId ? 'Zona atualizada com sucesso!' : 'Nova zona adicionada com sucesso!');
    resetManualForm();
    setActiveSubTab('zones');
  };

  // Reset form fields
  const resetManualForm = () => {
    setEditingZoneId(null);
    setFormZoneName('');
    setFormCity('Suzano');
    setFormMaxSpeed('1 Giga');
    setFormTechnology('FTTH (GPON)');
    setFormCoordinatesRaw('');
    setFormError(null);
  };

  // Start editing a zone
  const handleEditZone = (feature: GeoJSONFeature) => {
    setEditingZoneId(feature.properties?.id || null);
    setFormZoneName(feature.properties?.name || '');
    setFormCity(feature.properties?.city || 'Suzano');
    setFormMaxSpeed(feature.properties?.maxSpeed || '1 Giga');
    setFormTechnology(feature.properties?.technology || 'FTTH (GPON)');
    setFormService(selectedService);
    if (feature.geometry.type === 'Polygon') {
      setFormCoordinatesRaw(JSON.stringify(feature.geometry.coordinates, null, 2));
    }
    setActiveSubTab('manual');
  };

  // Delete a zone
  const handleDeleteZone = (zoneId?: string) => {
    if (!zoneId) return;
    if (!window.confirm('Tem certeza de que deseja remover esta zona de cobertura?')) return;

    const updatedFeatures = currentFeatures.filter((f) => f.properties?.id !== zoneId);
    const updatedLayers = {
      ...layers,
      [selectedService]: {
        ...currentLayer,
        geoJson: {
          type: 'FeatureCollection' as const,
          features: updatedFeatures,
        },
        isCustomUploaded: true,
      },
    };

    setLayers(updatedLayers);
    CoverageConfig.registerCustomLayer(selectedService, {
      type: 'FeatureCollection',
      features: updatedFeatures,
    });
  };

  // Save everything to SQLite Backend
  const handleSaveToDatabase = async () => {
    setSaveLoading(true);
    setSaveStatus(null);

    try {
      const res = await apiService.saveCoverageLayers(layers);
      if (res?.success) {
        setSaveStatus({
          success: true,
          message: 'Base de cobertura salva no SQLite e publicada no site com sucesso!',
          updatedAt: new Date().toLocaleString('pt-BR'),
        });
        setLastSyncDate(new Date().toLocaleString('pt-BR'));
      } else {
        throw new Error(res?.error || 'Erro ao salvar no servidor.');
      }
    } catch (err: any) {
      setSaveStatus({
        success: false,
        message: err.message || 'Não foi possível salvar no banco.',
      });
    } finally {
      setSaveLoading(false);
    }
  };

  // Reset to default bundled polygons
  const handleResetToDefaults = async () => {
    if (!window.confirm('Deseja restaurar todos os polígonos para o padrão original de fábrica?')) return;
    try {
      await apiService.resetCoverageLayers();
      CoverageConfig.resetToDefaults();
      setLayers({ ...CoverageConfig.getRegistry() });
      setSaveStatus({
        success: true,
        message: 'Polígonos restaurados para o padrão do sistema.',
        updatedAt: new Date().toLocaleString('pt-BR'),
      });
    } catch (err: any) {
      alert('Erro ao restaurar: ' + err.message);
    }
  };

  // Export full GeoJSON
  const handleExportGeoJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentLayer.geoJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nuvv-cobertura-${selectedService}.geojson`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Map Preview SVG generator
  const mapPreviewData = useMemo(() => {
    const allRings: Coordinate[][] = [];
    let minLng = -46.45;
    let maxLng = -46.25;
    let minLat = -23.70;
    let maxLat = -23.45;

    let hasCoords = false;

    currentFeatures.forEach((f) => {
      if (f.geometry.type === 'Polygon') {
        const ring = f.geometry.coordinates[0];
        if (ring && ring.length > 0) {
          allRings.push(ring);
          ring.forEach(([lng, lat]) => {
            if (!hasCoords) {
              minLng = maxLng = lng;
              minLat = maxLat = lat;
              hasCoords = true;
            } else {
              if (lng < minLng) minLng = lng;
              if (lng > maxLng) maxLng = lng;
              if (lat < minLat) minLat = lat;
              if (lat > maxLat) maxLat = lat;
            }
          });
        }
      }
    });

    const lngMargin = Math.max((maxLng - minLng) * 0.15, 0.03);
    const latMargin = Math.max((maxLat - minLat) * 0.15, 0.03);

    const mapMinLng = minLng - lngMargin;
    const mapMaxLng = maxLng + lngMargin;
    const mapMinLat = minLat - latMargin;
    const mapMaxLat = maxLat + latMargin;

    const width = 640;
    const height = 360;

    const project = (coord: Coordinate): [number, number] => {
      const x = ((coord[0] - mapMinLng) / (mapMaxLng - mapMinLng)) * width;
      const y = height - ((coord[1] - mapMinLat) / (mapMaxLat - mapMinLat)) * height;
      return [x, y];
    };

    const paths = allRings.map((ring) => {
      const projected = ring.map(project);
      if (projected.length === 0) return '';
      return `M ${projected[0][0]},${projected[0][1]} ` + projected.slice(1).map((p) => `L ${p[0]},${p[1]}`).join(' ') + ' Z';
    });

    return { width, height, paths };
  }, [currentFeatures]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & KPI Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white tracking-tight">Gestor de Cobertura & Viabilidade</h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  KMZ / KML / GeoJSON
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Cadastre e atualize polígonos, cidades atendidas, velocidades máximas e tecnologias de rede.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleSaveToDatabase}
              disabled={saveLoading}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              {saveLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Salvar e Publicar no Site</span>
            </button>

            <button
              type="button"
              onClick={handleExportGeoJSON}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold text-xs flex items-center space-x-1.5 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exportar GeoJSON</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefaults}
              className="px-3.5 py-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-300 font-bold text-xs flex items-center space-x-1.5 border border-red-800/30 transition-colors"
              title="Restaurar polígonos originais"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        {saveStatus && (
          <div
            className={`p-3.5 rounded-2xl text-xs flex items-center justify-between border ${
              saveStatus.success
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              {saveStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{saveStatus.message}</span>
            </div>
            {saveStatus.updatedAt && (
              <span className="text-[11px] text-gray-400">Atualizado às {saveStatus.updatedAt}</span>
            )}
          </div>
        )}

        {/* Mini KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-gray-400 font-bold block">Total de Zonas Ativas</span>
            <div className="text-2xl font-black text-white mt-1">{totalStats.totalZones}</div>
            <span className="text-[10px] text-emerald-400">Polígonos Geográficos</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-gray-400 font-bold block">Zonas nesta Categoria</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{currentFeatures.length}</div>
            <span className="text-[10px] text-gray-400 capitalize">{currentLayer.title}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-gray-400 font-bold block">Cidades Atendidas</span>
            <div className="text-2xl font-black text-white mt-1">{totalStats.coveredCitiesCount}</div>
            <span className="text-[10px] text-emerald-400">Alto Tietê & Grande SP</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-gray-400 font-bold block">Status do Banco SQLite</span>
            <div className="text-xs font-black text-emerald-400 mt-2 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lastSyncDate ? `Sincronizado (${lastSyncDate})` : 'Integrado'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Category Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 text-xs font-bold custom-scrollbar">
        {CoverageConfig.getAllLayers().map((layer) => {
          const isSelected = selectedService === layer.id;
          const count = layers[layer.id]?.geoJson?.features?.length || 0;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setSelectedService(layer.id)}
              className={`px-4 py-2.5 rounded-2xl flex items-center space-x-2.5 transition-all flex-shrink-0 border ${
                isSelected
                  ? 'bg-slate-800 text-white border-emerald-500 shadow-md ring-1 ring-emerald-500'
                  : 'bg-slate-900/60 text-gray-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: layer.color || '#10B981' }}
              />
              <span>{layer.title}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-950 text-[10px] font-mono text-emerald-400 border border-slate-800">
                {count} {count === 1 ? 'zona' : 'zonas'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-Navigation: Zonas Cadastradas | Importar KMZ/GeoJSON | Nova Zona Manual | Mapa Interativo */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveSubTab('zones')}
              className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all ${
                activeSubTab === 'zones'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Zonas da Categoria ({currentFeatures.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('import')}
              className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all ${
                activeSubTab === 'import'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar KMZ / GeoJSON</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetManualForm();
                setActiveSubTab('manual');
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all ${
                activeSubTab === 'manual'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Zona Manual</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('map')}
              className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all ${
                activeSubTab === 'map'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visualizar Mapa</span>
            </button>
          </div>

          {activeSubTab === 'zones' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por bairro, cidade, velocidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* SUBTAB 1: LISTAGEM DE ZONAS */}
        {/* ---------------------------------------------------- */}
        {activeSubTab === 'zones' && (
          <div className="space-y-4">
            {filteredFeatures.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Nome da Área / Bairro</th>
                      <th className="py-3 px-4 font-bold">Cidade / Localidade</th>
                      <th className="py-3 px-4 font-bold">Velocidade Máxima</th>
                      <th className="py-3 px-4 font-bold">Tecnologia</th>
                      <th className="py-3 px-4 font-bold">Qtd. Pontos</th>
                      <th className="py-3 px-4 font-bold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {filteredFeatures.map((feat, i) => {
                      const pointsCount =
                        feat.geometry.type === 'Polygon' ? feat.geometry.coordinates[0]?.length || 0 : 0;
                      return (
                        <tr key={feat.properties?.id || i} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4">
                            <strong className="text-white block font-medium">
                              {feat.properties?.name || `Zona ${i + 1}`}
                            </strong>
                            <span className="text-[10px] text-gray-500 font-mono">
                              ID: {feat.properties?.id || '—'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            <span className="inline-flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-emerald-400" />
                              <span>{feat.properties?.city || 'Suzano/SP'}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              <Gauge className="w-3 h-3" />
                              <span>{feat.properties?.maxSpeed || '1 Giga'}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            <span className="inline-flex items-center space-x-1 text-[11px] text-gray-400">
                              <Cpu className="w-3 h-3 text-blue-400" />
                              <span>{feat.properties?.technology || 'FTTH Fibra'}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-gray-400">
                            {pointsCount} vértices
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditZone(feat)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
                              title="Editar Parâmetros"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteZone(feat.properties?.id)}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                              title="Remover Zona"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-3">
                <Layers className="w-10 h-10 text-gray-600 mx-auto" />
                <p className="text-sm font-bold text-gray-400">Nenhum polígono encontrado nesta categoria.</p>
                <p className="text-xs text-gray-500">
                  Clique em "Importar KMZ / GeoJSON" ou "Nova Zona Manual" para cadastrar áreas de atendimento.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* SUBTAB 2: IMPORTADOR KMZ / KML / GEOJSON */}
        {/* ---------------------------------------------------- */}
        {activeSubTab === 'import' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-white">Importar Arquivo de Cobertura</h3>
              <p className="text-xs text-gray-400">
                Selecione um arquivo <strong>.KMZ</strong>, <strong>.KML</strong> (Google Earth / QGIS) ou <strong>.GeoJSON</strong>.
              </p>
            </div>

            {/* Drag and drop upload box */}
            <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-3xl p-8 text-center bg-slate-950/50 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs inline-flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all">
                  <span>Selecionar Arquivo .KMZ / .KML / .GeoJSON</span>
                  <input
                    type="file"
                    accept=".kmz,.kml,.json,.geojson,text/xml,application/json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-gray-500 mt-2">Suporte a KMZ compactado, KML puro e GeoJSON</p>
              </div>

              {importFile && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-bold inline-flex items-center space-x-2">
                  <FileCode className="w-4 h-4" />
                  <span>{importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}

              {importPreviewCount !== null && (
                <div className="text-xs text-emerald-400 font-bold">
                  ✅ {importPreviewCount} polígonos detectados e prontos para importar!
                </div>
              )}
            </div>

            {/* Raw code paste textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300">
                Ou cole o conteúdo XML/KML ou GeoJSON diretamente:
              </label>
              <textarea
                rows={5}
                placeholder="<kml xmlns=...> ou { 'type': 'FeatureCollection', ... }"
                value={importRawText}
                onChange={(e) => {
                  setImportRawText(e.target.value);
                  setImportPreviewCount(null);
                }}
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-gray-200 outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {importError && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveSubTab('zones')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-gray-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleExecuteImport}
                disabled={importLoading || (!importFile && !importRawText.trim())}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                {importLoading ? 'Processando Polígonos...' : `Integrar à Camada ${currentLayer.shortName}`}
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* SUBTAB 3: NOVA ZONA / EDIÇÃO MANUAL */}
        {/* ---------------------------------------------------- */}
        {activeSubTab === 'manual' && (
          <form onSubmit={handleSaveManualZone} className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-white">
                {editingZoneId ? 'Editar Parâmetros da Zona' : 'Cadastrar Nova Zona de Cobertura'}
              </h3>
              <p className="text-xs text-gray-400">
                Configure as propriedades exibidas ao cliente quando o endereço for localizado dentro deste polígono.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                  Nome da Área / Bairro *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Suzano - Centro, Vila Amorim e Colorado"
                  value={formZoneName}
                  onChange={(e) => setFormZoneName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                  Cidade Principal *
                </label>
                <select
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                  Velocidade Máxima Suportada
                </label>
                <select
                  value={formMaxSpeed}
                  onChange={(e) => setFormMaxSpeed(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="500 Mega">500 Mega Fibra</option>
                  <option value="600 Mega">600 Mega Fibra</option>
                  <option value="800 Mega">800 Mega Fibra</option>
                  <option value="1 Giga">1 Giga (1000 Mbps)</option>
                  <option value="2.5 Giga">2.5 Giga XGS-PON</option>
                  <option value="10 Giga Dedicado">10 Giga Dedicado (Carrier-grade)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                  Tecnologia de Infraestrutura
                </label>
                <select
                  value={formTechnology}
                  onChange={(e) => setFormTechnology(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="FTTH (GPON)">FTTH (GPON)</option>
                  <option value="FTTH (XGS-PON)">FTTH (XGS-PON de Ultra Baixa Latência)</option>
                  <option value="Fibra Metro BGP">Fibra Metro Dedicada (BGP / SLA 4h)</option>
                  <option value="Rádio Digital 5GHz">Rádio Digital 5GHz (Backup)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase">
                Coordenadas do Polígono (Array de [Longitude, Latitude]) *
              </label>
              <textarea
                rows={6}
                required
                placeholder={`[\n  [\n    [-46.335, -23.515],\n    [-46.295, -23.518],\n    [-46.282, -23.545],\n    [-46.335, -23.515]\n  ]\n]`}
                value={formCoordinatesRaw}
                onChange={(e) => setFormCoordinatesRaw(e.target.value)}
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-gray-200 outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-gray-500 block">
                * Dica: o primeiro e o último ponto do polígono devem ser idênticos para fechar o anel geográfico.
              </span>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                {formError}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  resetManualForm();
                  setActiveSubTab('zones');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-gray-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all"
              >
                {editingZoneId ? 'Salvar Alterações' : 'Adicionar Zona'}
              </button>
            </div>
          </form>
        )}

        {/* ---------------------------------------------------- */}
        {/* SUBTAB 4: MAPA VISUALIZADOR INTERATIVO LEAFLET */}
        {/* ---------------------------------------------------- */}
        {activeSubTab === 'map' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-white">Mapa Interativo de Cobertura & Demanda (Leaflet)</h3>
                <span className="text-xs text-gray-400">
                  Exibindo {currentFeatures.length} polígonos de fibra e {heatmapPoints.length} focos de demanda reprimida
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30 self-start">
                OpenStreetMap + CartoDB Dark (Custo Zero)
              </span>
            </div>

            <LeafletMap
              layers={layers}
              selectedService={selectedService}
              heatmapPoints={heatmapPoints}
              height="540px"
              showControls={true}
            />

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentLayer.color }} />
                  <span className="text-white font-bold">{currentLayer.title}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Focos Térmicos de Demanda ({heatmapPoints.length})</span>
                </div>
              </div>
              <span className="text-[11px]">
                Navegue pelo mapa, alterne entre visão Dark/Satélite e clique nas áreas para inspecionar os detalhes.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
