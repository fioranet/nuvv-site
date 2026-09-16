import React from 'react';
import { Modal } from '../common/Modal';
import { CONTRACTS_DOCUMENTS } from '../../data/support';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface ContractsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContractsModal: React.FC<ContractsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Contratos & Licenças"
      subtitle="Documentos regulatórios registrados e autorizações da Anatel."
      maxWidth="lg"
    >
      <div className="space-y-3">
        {CONTRACTS_DOCUMENTS.map((doc) => (
          <a
            key={doc.id}
            href={doc.fileUrl}
            target={doc.type === 'link' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-gray-200 hover:border-nuvv-purple/40 hover:bg-gray-50/50 transition-all flex items-center justify-between group block"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors">
                  {doc.title}
                </h4>
                <p className="text-xs text-gray-500">{doc.subtitle}</p>
              </div>
            </div>

            <div className="text-gray-400 group-hover:text-nuvv-purple transition-colors flex-shrink-0 ml-3">
              {doc.type === 'pdf' ? (
                <Download className="w-4 h-4" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
            </div>
          </a>
        ))}
      </div>
    </Modal>
  );
};
