import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  Check,
  Search,
  Server,
  Activity,
  ExternalLink,
  RefreshCw,
  Terminal,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { apiService, ExternalViabilityLayerInfo, ExternalViabilityCheckResponse } from '../../services/apiService';

export const CoverageManager: React.FC = () => {
  const [layers, setLayers] = useState<ExternalViabilityLayerInfo[]>([]);
  const [apiUrl, setApiUrl] = useState('https://nuvv-digital-viabilidade.yuajnb.easypanel.host');
  const [loadingLayers, setLoadingLayers] = useState(false);
  const [errorLayers, setErrorLayers] = useState<string | null>(null);

  // Active layer mapping configuration
  const [residentialLayer, setResidentialLayer] = useState('suzano_poa');
  const [businessLayer, setBusinessLayer] = useState('ihs___sp');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Test bench / Simulator state
  const [testAddress, setTestAddress] = useState('Rua General Francisco Glicerio, Suzano');
  const [testNumber, setTestNumber] = useState('100');
  const [testServiceType, setTestServiceType] = useState<'residencial' | 'empresarial'>('residencial');
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<ExternalViabilityCheckResponse | null>(null);

  useEffect(() => {
    loadLayers();
  }, []);

  const loadLayers = async () => {
    setLoadingLayers(true);
    setErrorLayers(null);
    try {
      const res = await apiService.getExternalViabilityLayers();
      if (res.success && res.layers) {
        setLayers(res.layers);
        if (res.externalApiUrl) setApiUrl(res.externalApiUrl);
        if (res.config?.residencial_layer) setResidentialLayer(res.config.residencial_layer);
        if (res.config?.empresarial_layer) setBusinessLayer(res.config.empresarial_layer);
      } else {
        setErrorLayers('Não foi possível carregar as camadas da API remota.');
      }
    } catch (err: any) {
      setErrorLayers(err.message || 'Erro ao carregar dados do servidor.');
    } finally {
      setLoadingLayers(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess(false);
    try {
      const res = await apiService.updateViabilityConfig({
        residencial_layer: residentialLayer,
        empresarial_layer: businessLayer,
      });
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch {
      alert('Erro ao salvar configuração.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testAddress.trim()) return;

    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await apiService.checkViability({
        query: testAddress.trim(),
        number: testNumber.trim() || undefined,
        service_type: testServiceType,
      });
      setTestResult(res);
    } catch (err: any) {
      alert(`Falha na simulação: ${err.message}`);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* 1. Header Banner & Status */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-wider uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Motor Geoespacial Ativo (Shapely 2.0)</span>
          </div>
          <h2 className="text-xl font-black text-white">Integração do Sistema de Viabilidade Técnica</h2>
          <p className="text-xs text-gray-400">
            As consultas são processadas em tempo real na nuvem e os retornos são gravados no banco SQLite local.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={loadLayers}
            disabled={loadingLayers}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLayers ? 'animate-spin' : ''}`} />
            <span>Sincronizar Camadas</span>
          </button>

          <a
            href={`${apiUrl}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Manual da API (Swagger)</span>
          </a>
        </div>
      </div>

      {/* 2. Layer Assignment Section (Residencial vs Empresarial) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-nuvv-purple" />
              <span>Determinação de Manchas por Tipo de Serviço</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Defina qual mancha espacial será consultada em cada caso (área compacta para residencial e cobertura metropolitana para empresarial).
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveConfig} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Residencial */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-nuvv-purple/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
                  🏠
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Fibra Residencial</h4>
                  <span className="text-[10px] text-gray-400">Área compacta urbana</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                Local
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 block">
                Mancha de Cobertura Associada
              </label>
              <select
                value={residentialLayer}
                onChange={(e) => setResidentialLayer(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-nuvv-purple outline-none"
              >
                {layers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.polygon_count} polígonos{l.pop_name ? ` - ${l.pop_name}` : ''})
                  </option>
                ))}
                {!layers.some((l) => l.id === 'suzano_poa') && (
                  <option value="suzano_poa">Suzano-Poa (Padrão Recomendado)</option>
                )}
              </select>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              Configuração atual: <strong>{residentialLayer}</strong>. Destinada a conexões FTTH residenciais com foco nas cidades centrais de atuação direta (Suzano e Poá).
            </p>
          </div>

          {/* Card Empresarial */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                  🏢
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Fibra Empresarial & Corporativo</h4>
                  <span className="text-[10px] text-gray-400">Rede ampla metropolitana</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Metropolitana
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 block">
                Mancha de Cobertura Associada
              </label>
              <select
                value={businessLayer}
                onChange={(e) => setBusinessLayer(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {layers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.polygon_count} polígonos{l.pop_name ? ` - ${l.pop_name}` : ''})
                  </option>
                ))}
                {!layers.some((l) => l.id === 'ihs___sp') && (
                  <option value="ihs___sp">IHS - SP (Grande SP - Padrão Recomendado)</option>
                )}
              </select>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              Configuração atual: <strong>{businessLayer}</strong>. Destinada a empresas, link dedicado e projetos corporativos cobrindo toda a rede metropolitana da Grande São Paulo.
            </p>
          </div>

          <div className="md:col-span-2 flex items-center justify-between pt-2">
            <span className="text-xs text-gray-400">
              * O mapeamento é persistido no banco e aplicado instantaneamente a todas as consultas do site.
            </span>

            <button
              type="submit"
              disabled={saveLoading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors flex items-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Configuração Salva!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{saveLoading ? 'Salvando...' : 'Salvar Mapeamento de Manchas'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Remote Layers Catalog Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Camadas Geográficas Cadastradas no Motor ({layers.length})</span>
            </h3>
            <span className="text-xs text-gray-400">
              Manchas de fibra e polígonos gerenciados no servidor de viabilidade
            </span>
          </div>

          <div className="text-[11px] text-gray-400">
            Endpoint: <code className="text-indigo-300 font-mono text-[10px]">{apiUrl}/api/layers</code>
          </div>
        </div>

        {errorLayers ? (
          <div className="p-4 rounded-xl bg-red-900/30 border border-red-700/50 text-red-200 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorLayers}</span>
          </div>
        ) : layers.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-xs">
            {loadingLayers ? 'Carregando camadas do servidor...' : 'Nenhuma camada encontrada no servidor.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-gray-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Identificador</th>
                  <th className="px-4 py-3">Nome da Camada</th>
                  <th className="px-4 py-3">POP / Operadora</th>
                  <th className="px-4 py-3">Tecnologia</th>
                  <th className="px-4 py-3 text-center">Qtd. Polígonos</th>
                  <th className="px-4 py-3 text-center">Uso no Site</th>
                  <th className="px-4 py-3 rounded-r-xl text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-gray-200">
                {layers.map((l) => {
                  const isRes = l.id === residentialLayer;
                  const isBus = l.id === businessLayer;

                  return (
                    <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-[11px] text-indigo-300 font-bold">{l.id}</td>
                      <td className="px-4 py-3 font-bold text-white flex items-center space-x-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: l.color || '#3b82f6' }}
                        />
                        <span>{l.name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{l.pop_name || 'Rede Geral'}</td>
                      <td className="px-4 py-3 text-gray-400">{l.technology}</td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-emerald-400">
                        {l.polygon_count.toLocaleString('pt-BR')}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isRes && (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold mr-1">
                            Residencial
                          </span>
                        )}
                        {isBus && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            Empresarial
                          </span>
                        )}
                        {!isRes && !isBus && (
                          <span className="text-gray-500 text-[10px]">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            l.enabled
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          {l.enabled ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Live Test Bench & Simulator */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-nuvv-green" />
              <span>Simulador / Test Bench de Viabilidade em Tempo Real</span>
            </h3>
            <span className="text-xs text-gray-400">
              Teste qualquer endereço ou CEP para verificar a resposta imediata da API do Shapely 2.0
            </span>
          </div>
        </div>

        <form onSubmit={handleRunSimulation} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
              Endereço ou CEP para Consulta
            </label>
            <input
              type="text"
              value={testAddress}
              onChange={(e) => setTestAddress(e.target.value)}
              placeholder="Ex: Rua General Francisco Glicerio, Suzano ou 08674-040"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-nuvv-purple outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
              Número (Opcional)
            </label>
            <input
              type="text"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
              placeholder="Ex: 100"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:ring-2 focus:ring-nuvv-purple outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
              Perfil de Serviço
            </label>
            <select
              value={testServiceType}
              onChange={(e) => setTestServiceType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:ring-2 focus:ring-nuvv-purple outline-none"
            >
              <option value="residencial">Residencial ({residentialLayer})</option>
              <option value="empresarial">Empresarial ({businessLayer})</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={testLoading}
              className="w-full py-2.5 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{testLoading ? 'Consultando...' : 'Testar Agora'}</span>
            </button>
          </div>
        </form>

        {/* Test Result Display */}
        {testResult && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
                    testResult.status === 'VIAVEL'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : testResult.status === 'EM_ANALISE'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  Status: {testResult.status}
                </span>

                <span className="text-xs text-gray-400">
                  Mancha Consultada: <strong className="text-white">{testResult.configured_layer}</strong>
                </span>
              </div>

              {testResult.query_id && (
                <span className="text-[11px] text-gray-500">
                  Gravado no banco SQLite sob ID #{testResult.query_id}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Geocodificação</span>
                <p className="text-gray-200 line-clamp-2">{testResult.display_name || testAddress}</p>
                <p className="font-mono text-[10px] text-indigo-300">
                  Lat: {testResult.location?.latitude?.toFixed(6)}, Lon: {testResult.location?.longitude?.toFixed(6)}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Polígono / POP Correspondente</span>
                <p className="font-bold text-white">
                  {testResult.matched_polygon?.polygon_name || testResult.matched_polygon?.polygon_id || 'Nenhum polígono sobreposto'}
                </p>
                <p className="text-gray-400 text-[11px]">
                  {testResult.matched_polygon?.pop ? `POP: ${testResult.matched_polygon.pop}` : 'Fora da mancha'}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Distância até a Rede</span>
                <p className="text-base font-black text-emerald-400 font-mono">
                  {testResult.distance_to_nearest_meters > 1000
                    ? `${(testResult.distance_to_nearest_meters / 1000).toFixed(2)} km`
                    : `${testResult.distance_to_nearest_meters} metros`}
                </p>
                <p className="text-gray-400 text-[11px]">{testResult.message}</p>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Resposta JSON Bruta da API:
              </span>
              <pre className="p-3 bg-slate-900 rounded-xl text-[10px] font-mono text-indigo-200 overflow-x-auto max-h-40">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
