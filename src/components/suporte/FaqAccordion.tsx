import React, { useState } from 'react';
import { FAQ_ITEMS, FaqItem } from '../../data/faq';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FaqAccordionProps {
  searchTerm: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ searchTerm }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.question.toLowerCase().includes(term) ||
      item.answer.toLowerCase().includes(term) ||
      item.keywords.some((k) => k.toLowerCase().includes(term))
    );
  });

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-nuvv-dark">Dúvidas Frequentes</h3>
        {searchTerm && (
          <p className="text-xs text-gray-500 mt-1">
            Exibindo resultados para: &quot;<strong>{searchTerm}</strong>&quot;
          </p>
        )}
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden bg-white ${
                isOpen ? 'border-nuvv-purple/40 shadow-sm' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
              >
                <span className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-nuvv-purple' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-6 space-y-3">
            <HelpCircle className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-sm font-semibold text-gray-700">Nenhuma resposta encontrada para sua busca.</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Nossa equipe está disponível 24 horas por dia no WhatsApp para tirar qualquer dúvida imediatamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
