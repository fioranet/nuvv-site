import React from 'react';
import { COMPATIBLE_BRANDS } from '../../data/visionPlans';
import { Camera, CheckCircle2, ShieldCheck, RefreshCw, Cpu, Sparkles } from 'lucide-react';

interface VisionEquipmentSectionProps {
  onOpenComodatoModal: () => void;
}

export const VisionEquipmentSection: React.FC<VisionEquipmentSectionProps> = ({
  onOpenComodatoModal,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Flexibilidade de Hardware
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
            Duas Formas Fáceis de Usar o Nuvv Guard
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Use as câmeras que você já possui ou contrate nossos equipamentos homologados em comodato com gravação em nuvem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
          {/* Option 1: Traga seus Equipamentos */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider">
                  OPÇÃO 01
                </span>
                <h3 className="text-xl font-bold text-nuvv-dark mt-0.5">
                  Traga seus Próprios Equipamentos
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Já tem câmeras ou DVR instalados na sua casa ou empresa? Você não precisa gastar comprando novos aparelhos. O Nuvv Guard se conecta diretamente ao seu sistema existente com planos a partir de R$ 19,90/mês.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start space-x-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Compatível com as principais marcas do mercado nacional</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Sem necessidade de trocar fiação ou infraestrutura</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Configuração rápida com suporte remoto guiado</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-indigo-950 font-medium">
              💡 <strong>Dica:</strong> Basta ter câmeras IP, Wi-Fi ou gravadores DVR/NVR compatíveis com os padrões comuns de mercado.
            </div>
          </div>

          {/* Option 2: Locação / Comodato Nuvv */}
          <div className="bg-white rounded-3xl p-8 border border-emerald-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                SEM CUSTO INICIAL
              </span>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  OPÇÃO 02
                </span>
                <h3 className="text-xl font-bold text-nuvv-dark mt-0.5">
                  Câmeras em Comodato Nuvv
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Não tem câmeras? Nós entregamos equipamentos de alta resolução Full HD já configurados e prontos para uso com gravação em nuvem inclusa a partir de <strong>R$ 39,90/mês</strong>.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start space-x-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Resolução Full HD com visão noturna nítida (infravermelho)</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Sensor de presença com detecção humana inteligente</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Garantia vitalícia: deu defeito, nós trocamos sem custo</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-medium">
              🔒 <strong>Garantia Permanente:</strong> Manutenção e suporte inclusos durante todo o período do contrato.
            </div>
          </div>
        </div>

        {/* Compatible Brands Grid */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Marcas Homologadas e Compatíveis
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {COMPATIBLE_BRANDS.map((brand, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center hover:border-emerald-300 transition-colors"
              >
                <span className="text-xs font-black text-nuvv-dark tracking-wider">
                  {brand.name}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">{brand.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
