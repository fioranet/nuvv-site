import React from 'react';
import { Modal } from '../common/Modal';
import { Gauge, ExternalLink } from 'lucide-react';

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeedTestModal: React.FC<SpeedTestModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Teste de Velocidade"
      subtitle="Meça a velocidade de download, upload e latência da sua conexão Nuvv"
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Fast.com frame wrapper */}
        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gray-200 bg-white relative">
          <iframe
            src="https://fast.com/pt/"
            title="Fast.com Speed Test"
            className="w-full h-full border-0"
            allow="geolocation"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 px-1">
          <span>Para resultados mais precisos, use conexão via cabo de rede direto no roteador.</span>
          <a
            href="https://fast.com/pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nuvv-purple font-semibold flex items-center space-x-1 hover:underline"
          >
            <span>Abrir em tela cheia</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </Modal>
  );
};
