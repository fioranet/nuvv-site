import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';

export interface VisionFaqItem {
  question: string;
  answer: string;
}

export const VISION_FAQS: VisionFaqItem[] = [
  {
    question: 'Preciso de um técnico para mexer no meu roteador ou modem?',
    answer:
      'Não! O Nuvv Vision utiliza tecnologia de conexão direta e automática. Você não precisa abrir portas no modem, alterar regras de firewall ou contratar IP fixo. Basta conectar a câmera à internet e ela começará a transmitir e gravar na nuvem.',
  },
  {
    question: 'O que acontece se levarem ou quebrarem minha câmera?',
    answer:
      'Suas gravações continuam 100% seguras. Como o Nuvv Vision envia o vídeo em tempo real para a nuvem, todas as imagens registradas até o segundo em que a câmera foi desconectada ficam salvas no Data Center e acessíveis pelo seu celular.',
  },
  {
    question: 'Posso usar minhas câmeras ou DVR antigos?',
    answer:
      'Sim! O Nuvv Vision é compatível com mais de 95% dos equipamentos do mercado, incluindo Intelbras, Hikvision, Tapo (TP-Link), Dahua, Giga e qualquer câmera com suporte a protocolos abertos padrão.',
  },
  {
    question: 'Como funciona o plano "Ao Vivo Free"?',
    answer:
      'No plano Free você visualiza todas as suas câmeras ao vivo em tempo real pelo aplicativo ou pelo computador sem pagar nenhuma mensalidade de armazenamento. Se quiser manter histórico de gravação de 3, 7, 15 ou 30 dias, basta assinar o plano correspondente.',
  },
  {
    question: 'O que é a Câmera em Comodato?',
    answer:
      'Se você não tem câmeras e não quer gastar comprando equipamentos, a Nuvv fornece câmeras Full HD de alta durabilidade com visão noturna por apenas R$ 30,00/mês por ponto, com troca e manutenção garantidas durante todo o contrato.',
  },
  {
    question: 'A gravação em nuvem consome muita internet?',
    answer:
      'O Nuvv Vision utiliza compressão moderna de vídeo inteligente, consumindo pouca taxa de upload e sem interferir na navegação da sua casa ou empresa. Com a internet fibra da Nuvv, o funcionamento é imperceptível e 100% estável.',
  },
];

export const VisionFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Tire Suas Dúvidas
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark mt-2">
            Perguntas Frequentes sobre o Nuvv Vision
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Entenda como funciona a gravação em nuvem e a contratação do serviço.
          </p>
        </div>

        <div className="space-y-3.5">
          {VISION_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-nuvv-dark">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/60 pl-12">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
