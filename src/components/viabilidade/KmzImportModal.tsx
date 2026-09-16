import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CoverageConfig, CoverageServiceType } from '../../data/coverage/coverageConfig';
import { parseKmlToGeoJSON, readKmzOrKmlFile } from '../../services/feasibility/kmlParser';
import { GeoJSONFeatureCollection } from '../../services/feasibility/pointInPolygon';
import { Upload, CheckCircle2, AlertTriangle, FileCode, Layers, RotateCcw } from 'lucide-react';

interface KmzImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (serviceType: CoverageServiceType, count: number) => void;
}

export const KmzImportModal: React.FC<KmzImportModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedService, setSelectedService] = useState<CoverageServiceType>('residencial');
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setError(null);
      setSuccessCount(null);

      try {
        const text = await readKmzOrKmlFile(selected);
        setRawText(text);
      } catch (err: any) {
        setError('Não foi possível ler o arquivo. Certifique-se de que é um .kmz, .kml ou .geojson válido.');
      }
    }
  };

  const handleProcessImport = () => {
    if (!rawText.trim()) {
      setError('Por favor, selecione um arquivo ou cole o conteúdo KML/GeoJSON.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let geoJson: GeoJSONFeatureCollection;

      // Check if it's already GeoJSON
      if (rawText.trim().startsWith('{')) {
        geoJson = JSON.parse(rawText);
        if (geoJson.type !== 'FeatureCollection') {
          throw new Error('O GeoJSON precisa ser um FeatureCollection com polígonos.');
        }
      } else {
        // Parse KML / KMZ string
        geoJson = parseKmlToGeoJSON(rawText);
      }

      if (!geoJson.features || geoJson.features.length === 0) {
        throw new Error('Nenhum polígono válido foi encontrado no arquivo.');
      }

      // Register the custom layer into CoverageConfig
      CoverageConfig.registerCustomLayer(selectedService, geoJson);

      setSuccessCount(geoJson.features.length);
      onSuccess(selectedService, geoJson.features.length);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar arquivo KML/GeoJSON.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetDefaults = () => {
    CoverageConfig.resetToDefaults(selectedService);
    setSuccessCount(null);
    setFile(null);
    setRawText('');
    alert(`Camada de ${selectedService} restaurada para os polígonos padrão.`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl" showCloseButton={true}>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-nuvv-dark">
              Importar Polígonos de Cobertura (KMZ / KML / GeoJSON)
            </h3>
            <p className="text-xs text-gray-500">
              Defina áreas de cobertura personalizadas para cada serviço.
            </p>
          </div>
        </div>

        {/* Target Service Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 block">
            Selecione o Serviço para Aplicar o Polígono:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedService('residencial');
                setSuccessCount(null);
              }}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left flex items-center space-x-2.5 ${
                selectedService === 'residencial'
                  ? 'border-nuvv-purple bg-indigo-50 text-nuvv-purple'
                  : 'border-gray-200 text-gray-600 hover:bg-slate-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-nuvv-purple" />
              <span>Banda Larga Residencial</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedService('empresarial');
                setSuccessCount(null);
              }}
              className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left flex items-center space-x-2.5 ${
                selectedService === 'empresarial'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-gray-200 text-gray-600 hover:bg-slate-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Link Dedicado Empresarial</span>
            </button>
          </div>
        </div>

        {/* File Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 block">
            Arquivo KMZ, KML ou GeoJSON (.json):
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-nuvv-purple transition-colors bg-slate-50/50">
            <FileCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              accept=".kmz,.kml,.geojson,.json"
              onChange={handleFileChange}
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-nuvv-purple file:text-white hover:file:bg-nuvv-purple-hover cursor-pointer"
            />
            {file && (
              <span className="text-xs font-bold text-nuvv-purple block mt-2">
                Arquivo selecionado: {file.name}
              </span>
            )}
          </div>
        </div>

        {/* Success Message */}
        {successCount !== null && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              Sucesso! <strong>{successCount} polígonos</strong> foram carregados com sucesso para a camada <strong>{selectedService.toUpperCase()}</strong>.
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-center space-x-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-bold text-gray-500 hover:text-red-600 flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleProcessImport}
              disabled={loading || !rawText}
              className="px-6 py-2.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Aplicar Polígono'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
