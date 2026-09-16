import React from 'react';
import { XCircle, CheckCircle2, ShieldAlert, CloudCheck, Lock, Wifi, Server } from 'lucide-react';

export const VisionTechHighlights: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Comparativo de Segurança
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nuvv-dark mt-2">
            Por que o Armazenamento em Nuvem é Superior ao Gravador Tradicional?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Entenda como o Nuvv Guard resolve os maiores problemas dos sistemas antigos de câmeras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Legacy / Traditional CCTV Box */}
          <div className="bg-red-50/40 rounded-3xl p-8 border border-red-200/80 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-950">CFTV Tradicional com DVR Local</h3>
                <p className="text-xs text-red-700">Sistema antigo sujeito a falhas físicas e roubos</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Se o DVR for roubado ou queimar:</strong> Você perde todas as gravações e evidências no mesmo instante.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Configuração complicada de roteador:</strong> Exige abrir portas no modem, configurar DDNS que vive caindo ou pagar caro por IP fixo.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Acesso externo instável:</strong> Aplicativos antigos que travam fora de casa quando a conexão muda.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Manutenção constante de HD:</strong> Discos rígidos que estragam sem aviso prévio e param de gravar.
                </span>
              </li>
            </ul>
          </div>

          {/* Nuvv Vision Cloud Box */}
          <div className="bg-emerald-50/50 rounded-3xl p-8 border-2 border-emerald-500 shadow-md space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-2xs">
                TECNOLOGIA MODERNA
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <CloudCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950">Nuvv Guard em Nuvem</h3>
                <p className="text-xs text-emerald-700 font-medium">Gravação instantânea e protegida fora do local</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-gray-800">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Imagens salvas na hora:</strong> Mesmo que destruam a câmera ou o roteador, o vídeo já está seguro no Data Center.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Zero dor de cabeça na rede:</strong> Conexão direta e automática. Não precisa abrir portas no modem nem mexer no firewall.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Acesso rápido pelo celular:</strong> Aplicativo fluido para assistir de onde estiver, com linha do tempo fácil de buscar.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Segurança e Privacidade:</strong> Transmissão criptografada de ponta a ponta em servidores no Brasil.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
