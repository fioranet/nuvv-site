import React from 'react';
import { RecommendedDevicesSection } from '../common/RecommendedDevicesSection';

export const StreamingDevices: React.FC = () => {
  return (
    <RecommendedDevicesSection
      category="streaming"
      badge="Compra Única • Sem Aluguel de Aparelho"
      title="Turbine sua TV: Transforme qualquer televisor em Smart TV"
      subtitle="Aparelhos de compra única definitiva (sem custo de aluguel ou mensalidade de aparelho), 100% compatíveis com o app Watch Brasil e canais Nuvv. Conecte na entrada HDMI e acesse todos os seus streamings e canais ao vivo com fluidez, controle remoto por voz e resolução até 4K."
    />
  );
};

