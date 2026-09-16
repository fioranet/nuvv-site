import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

export const SOCIAL_WIFI_FAQS = [
  {
    question: 'Como os clientes se conectam ao Wi-Fi?',
    answer:
      'Ao selecionar a rede Wi-Fi do seu estabelecimento, o smartphone do cliente abre automaticamente uma tela personalizada (Captive Portal). Ele pode se conectar em 1 clique via WhatsApp, Google, Facebook ou preenchendo um formulário rápido com nome, WhatsApp e data de aniversário.',
  },
  {
    question: 'Preciso trocar os meus roteadores atuais?',
    answer:
      'Não necessariamente. O Nuvv Hotspot Wi-fi Social é compatível com os principais Access Points do mercado (como Ubiquiti UniFi, MikroTik, TP-Link Omada, Intelbras e Huawei). Se preferir, a Nuvv pode fornecer e instalar equipamentos profissionais homologados em comodato ou venda.',
  },
  {
    question: 'O serviço está em conformidade com a LGPD e o Marco Civil da Internet?',
    answer:
      'Sim, 100%! O Marco Civil exige que estabelecimentos que fornecem internet pública guardem os registros de conexão por pelo menos 1 ano. Nossa plataforma armazena esses logs com segurança e criptografia, além de coletar o consentimento explícito dos usuários nos termos da LGPD, blindando sua empresa contra multas e responsabilidades civis.',
  },
  {
    question: 'Como funciona a integração com Facebook Ads e Google Ads?',
    answer:
      'Nossa plataforma se conecta via API com sua conta de anúncios. Todos os visitantes que se conectam ao Wi-Fi são adicionados automaticamente a uma Audiência Personalizada (Custom Audience) para que você possa fazer remarketing e criar públicos semelhantes (Lookalike) com alto retorno sobre investimento.',
  },
  {
    question: 'Como funcionam as mensagens automáticas de aniversário e retorno?',
    answer:
      'Você configura os gatilhos no painel uma única vez: por exemplo, enviar um cupom de aniversário 3 dias antes da data, ou uma mensagem de "Sentimos sua falta" para clientes que não visitam seu espaço há mais de 30 dias. Os envios acontecem de forma 100% automática.',
  },
  {
    question: 'Posso usar o Hotspot Wi-fi Social tendo internet de outro provedor?',
    answer:
      'Sim! O Nuvv Hotspot Wi-fi Social funciona em qualquer conexão de internet existente, embora tenha desempenho e suporte ainda mais integrados quando combinado com a Fibra Óptica Empresarial da Nuvv.',
  },
];

export const SocialWifiFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-nuvv-purple uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            Dúvidas Frequentes
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-nuvv-dark mt-2">
            Perguntas Frequentes sobre o Hotspot Wi-fi Social
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Entenda tudo sobre instalação, captação de leads e regras de privacidade.
          </p>
        </div>

        <div className="space-y-3.5">
          {SOCIAL_WIFI_FAQS.map((faq, idx) => {
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
                    <CheckCircle2 className="w-4 h-4 text-nuvv-purple flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-nuvv-dark">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-nuvv-purple' : ''
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
