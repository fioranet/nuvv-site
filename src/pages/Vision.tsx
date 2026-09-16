import React from 'react';
import { Guard } from './Guard';

interface VisionPageProps {
  onOpenLeadModal: (planName?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

/**
 * Nuvv Vision foi atualizado e expandido para Nuvv Guard.
 * Mantemos o componente Vision renderizando Guard para preservar
 * rotas legadas (/vision) e links existentes no ecossistema Nuvv.
 * A cópia original histórica está preservada em src/pages/VisionOriginal.tsx.
 */
export const Vision: React.FC<VisionPageProps> = (props) => {
  return <Guard {...props} />;
};
