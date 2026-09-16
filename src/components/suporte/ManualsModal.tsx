import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { USER_MANUALS, ManualItem } from '../../data/support';
import {
  PlayCircle,
  Film,
  Tv,
  Radio,
  Smartphone,
  Wifi,
  FileText,
  Shield,
  Phone,
  PhoneForwarded,
  Cloud,
  Headphones,
  Server,
  ArrowUpRight,
  ExternalLink,
  ArrowLeft,
  X,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface ManualsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualsModal: React.FC<ManualsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'residencial' | 'empresarial'>('residencial');
  const [selectedManual, setSelectedManual] = useState<ManualItem | null>(null);
  const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>({});
  const [preloadedUrls, setPreloadedUrls] = useState<Record<string, boolean>>({});

  const iconMap: Record<string, React.ElementType> = {
    PlayCircle,
    Film,
    Tv,
    Radio,
    Smartphone,
    Wifi,
    FileText,
    Shield,
    Phone,
    PhoneForwarded,
    Cloud,
    Headphones,
    Server,
  };

  // Pre-warm the top streaming tutorial connection when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const topManual = USER_MANUALS.find((m) => m.link && m.link.startsWith('http'));
      if (topManual && !preloadedUrls[topManual.id]) {
        setPreloadedUrls((prev) => ({ ...prev, [topManual.id]: true }));
      }
    }
  }, [isOpen]);

  const handlePreload = (item: ManualItem) => {
    if (item.link && item.link.startsWith('http') && !preloadedUrls[item.id]) {
      setPreloadedUrls((prev) => ({ ...prev, [item.id]: true }));
    }
  };

  const handleOpenManual = (item: ManualItem) => {
    if (item.link && item.link !== '#') {
      setSelectedManual(item);
      handlePreload(item);
    }
  };

  const handleCloseViewer = () => {
    setSelectedManual(null);
  };

  const handleCloseModal = () => {
    setSelectedManual(null);
    onClose();
  };

  const filteredManuals = USER_MANUALS.filter(
    (m) => m.target === activeTab || m.target === 'ambos'
  );

  const streamingManuals = filteredManuals.filter((m) => m.category === 'streaming');
  const wifiManuals = filteredManuals.filter((m) => m.category === 'wifi');
  const telManuals = filteredManuals.filter((m) => m.category === 'telefonia');
  const empManuals = filteredManuals.filter((m) => m.category === 'empresarial');

  // List of all items that are either preloaded or currently active
  const activeIframeItems = USER_MANUALS.filter(
    (m) => (preloadedUrls[m.id] || selectedManual?.id === m.id) && m.link && m.link.startsWith('http')
  );

  const renderSection = (title: string, items: ManualItem[]) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-nuvv-purple uppercase tracking-wider border-b border-gray-100 pb-1.5 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[10px] text-gray-400 font-normal lowercase">guias oficiais</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || FileText;
            const hasLink = item.link && item.link !== '#';
            const isReady = loadedIframes[item.id];

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => handlePreload(item)}
                onFocus={() => handlePreload(item)}
                onClick={() => handleOpenManual(item)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group relative overflow-hidden ${
                  hasLink
                    ? 'border-gray-200 hover:border-nuvv-purple/50 bg-white hover:bg-indigo-50/50 shadow-2xs hover:shadow-xs cursor-pointer'
                    : 'border-gray-100 bg-gray-50/60 opacity-80 cursor-default'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-nuvv-purple flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors line-clamp-2">
                      {item.title}
                    </span>
                  </div>
                </div>

                {hasLink && (
                  <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                    {isReady && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Pré-carregado" />
                    )}
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-nuvv-purple transition-colors" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      maxWidth={selectedManual ? '6xl' : '3xl'}
      showCloseButton={!selectedManual}
    >
      {selectedManual ? (
        /* Manual Full Reader View */
        <div className="flex flex-col -m-6 sm:-m-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-2xs">
            <div className="flex items-center space-x-3 min-w-0 pr-4">
              <button
                type="button"
                onClick={handleCloseViewer}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                title="Voltar aos manuais"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-black text-nuvv-dark truncate max-w-[250px] sm:max-w-md md:max-w-lg">
                  {selectedManual.title}
                </h3>
                <span className="text-[10px] text-gray-400 hidden sm:block">Descubra Watch Brasil • Guia Passo a Passo</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <a
                href={selectedManual.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-nuvv-purple font-bold text-xs transition-colors cursor-pointer"
                title="Abrir página oficial em nova aba"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Abrir no navegador</span>
              </a>

              <button
                type="button"
                onClick={handleCloseViewer}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Fechar leitor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Iframe Viewport with Keep-Alive Cache Pool */}
          <div className="relative bg-slate-950 w-full h-[74vh] sm:h-[80vh] overflow-hidden">
            {/* Loading Indicator while current active iframe is finishing initial load */}
            {!loadedIframes[selectedManual.id] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white z-10 space-y-3 animate-fade-in">
                <Loader2 className="w-8 h-8 text-nuvv-purple animate-spin" />
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-200">Carregando tutorial oficial...</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Otimizando conteúdo e imagens</p>
                </div>
              </div>
            )}

            {/* Persistent Iframe Pool (Loaded once, kept in DOM for instant re-access) */}
            {activeIframeItems.map((item) => {
              const isSelected = selectedManual.id === item.id;
              return (
                <iframe
                  key={item.id}
                  src={item.link}
                  title={item.title}
                  loading="eager"
                  onLoad={() =>
                    setLoadedIframes((prev) => ({
                      ...prev,
                      [item.id]: true,
                    }))
                  }
                  className={`w-full h-full border-0 bg-white transition-opacity duration-300 ${
                    isSelected ? 'block opacity-100' : 'hidden opacity-0 pointer-events-none'
                  }`}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              );
            })}
          </div>

          {/* Reader Footer Bar */}
          <div className="px-6 py-2.5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-nuvv-purple" />
              <span>Tutorial oficial Watch Brasil. Se preferir, use o botão superior para abrir em nova aba.</span>
            </span>
            <button
              type="button"
              onClick={handleCloseViewer}
              className="text-xs font-bold text-nuvv-purple hover:underline"
            >
              ← Voltar para lista de manuais
            </button>
          </div>
        </div>
      ) : (
        /* Manuals List View */
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-nuvv-dark">
              Manuais & Tutoriais
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Guias oficiais passo a passo para configurar seus aplicativos, TVs e serviços.
            </p>
          </div>

          {/* Tab switchers */}
          <div className="flex items-center justify-center p-1 bg-gray-100 rounded-2xl max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('residencial')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'residencial'
                  ? 'bg-nuvv-purple text-white shadow-sm'
                  : 'text-gray-600 hover:text-nuvv-dark'
              }`}
            >
              Residencial
            </button>
            <button
              onClick={() => setActiveTab('empresarial')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'empresarial'
                  ? 'bg-nuvv-purple text-white shadow-sm'
                  : 'text-gray-600 hover:text-nuvv-dark'
              }`}
            >
              Empresarial
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            {activeTab === 'residencial' ? (
              <>
                {renderSection('Streaming & TV (Watch, HBO Max e Smart TVs)', streamingManuals)}
                {renderSection('Internet & Wi-Fi', wifiManuals)}
                {renderSection('Telefonia Fixa', telManuals)}
              </>
            ) : (
              <>
                {renderSection('PABX & Troncos SIP', empManuals)}
                {renderSection('Telefonia Corporativa', telManuals)}
                {renderSection('Rede & Wi-Fi', wifiManuals)}
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
