import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Geral' | 'Câmeras' | 'Interfone' | 'Tags' | 'Poste Inteligente';
}

const GUARD_FAQS: FaqItem[] = [
  {
    category: 'Geral',
    question: 'O que é o Nuvv Guard e qual a diferença para o antigo Nuvv Vision?',
    answer:
      'O Nuvv Guard é o ecossistema completo de segurança inteligente da Nuvv. Ele expande o monitoramento de câmeras (Módulo Vision) integrando agora a Interfonia Virtual por QR Code (Módulo Intercom) e o Rastreamento de objetos e veículos (Módulo Track) em um único aplicativo de segurança dedicado e ultra-otimizado.',
  },
  {
    category: 'Geral',
    question: 'Por que agora existem dois aplicativos: App Nuvv e App Nuvv Guard?',
    answer:
      'Para garantir o máximo de agilidade, privacidade e foco. O App Nuvv é o super app para o seu dia a dia (trocar senha do Wi-Fi, pagar faturas via Pix, indicar amigos e acessar streamings). Já o App Nuvv Guard é blindado e focado exclusivamente na sua segurança patrimonial: transmissão contínua de câmeras, notificações de interfone com vídeo em tempo real e mapa de localização das suas tags.',
  },
  {
    category: 'Câmeras',
    question: 'Como funciona a gravação em nuvem? Preciso de DVR ou computador ligado?',
    answer:
      'Não precisa de DVR, HD externo nem computador ligado. As câmeras se conectam diretamente ao nosso Data Center Nacional através da sua internet fibra Nuvv. O fluxo é gravado 24 horas por dia de forma criptografada.',
  },
  {
    category: 'Câmeras',
    question: 'Se invadirem meu imóvel e roubarem a câmera, perco as imagens gravadas?',
    answer:
      'Não! Esta é a grande vantagem do Nuvv Guard sobre sistemas com DVR físico. Em um sistema tradicional com gravador local, o intruso leva o DVR e você perde todas as provas. No Nuvv Guard, cada segundo de vídeo já foi enviado para a nuvem no mesmo instante, acessível imediatamente pelo seu celular.',
  },
  {
    category: 'Câmeras',
    question: 'Posso utilizar minhas próprias câmeras ou preciso contratar as da Nuvv?',
    answer:
      'Você tem total liberdade! Se você já possui câmeras IP ou DVR compatíveis (Intelbras, Hikvision, Dahua, TP-Link Tapo, Positivo ou protocolo ONVIF), pode contratar apenas os planos de armazenamento em nuvem (7 ou 30 dias). Se preferir comodidade, oferecemos câmeras Full HD de última geração em regime de comodato com troca rápida e suporte contínuo.',
  },
  {
    category: 'Interfone',
    question: 'Como funciona o Interfone Virtual por QR Code? O visitante precisa baixar app?',
    answer:
      'O visitante NÃO precisa baixar nenhum aplicativo! Ele simplesmente aponta a câmera do próprio celular para a placa com QR Code instalada na sua entrada. Uma página leve e segura abre no navegador do visitante e faz uma chamada de vídeo direta para o seu smartphone através do App Nuvv Guard.',
  },
  {
    category: 'Interfone',
    question: 'Como funciona a oferta de Taxa Única de R$ 79,90 para o Interfone Virtual (Casa ou Sobrado)?',
    answer:
      'Para clientes com plano de internet Fibra Nuvv ativo em casa ou sobrado, oferecemos a condição especial de taxa única de R$ 79,90 (que já cobre a placa personalizada com QR Code resistente a intempéries). Com isso, você não paga nenhuma mensalidade de interfonia enquanto for assinante Nuvv Fibra!',
  },
  {
    category: 'Interfone',
    question: 'Como funciona a interfonia virtual para condomínios e prédios?',
    answer:
      'Para condomínios residenciais ou comerciais, não há taxa de ativação (mínimo de 8 apartamentos). Cada morador recebe acesso individual no app para sua própria unidade, com valores progressivos por apartamento (a partir de R$ 4,90/mês por unidade para condomínios maiores). Elimina totalmente custos com cabeamento estragado e queima de interfones por raios.',
  },
  {
    category: 'Tags',
    question: 'Como funciona a Nuvv Tag e por que ela é ideal para a família?',
    answer:
      'A Nuvv Tag é um rastreador inteligente compacto ideal para colocar na mochila dos filhos, na coleira dos pets ou em chaves e veículos. A grande vantagem é que você não precisa ter um iPhone nem se preocupar com marcas caras de smartphones: ela funciona com qualquer celular e múltiplos membros da família podem acompanhar a localização juntos no mesmo App Nuvv Guard, sem mensalidades de chip de celular.',
  },
  {
    category: 'Tags',
    question: 'Qual a duração da bateria da Tag e como funciona o desconto progressivo?',
    answer:
      'A bateria tem duração de até 1 ano e utiliza uma pilha padrão tipo moeda (CR2032), fácil de substituir em qualquer relojoaria ou papelaria. Promocionalmente, clientes Nuvv podem adquirir por R$ 99,90 (taxa única sem mensalidade), e na compra de 3 ou mais tags o valor cai para apenas R$ 79,90 por unidade.',
  },
  {
    category: 'Poste Inteligente',
    question: 'O que é o Poste de Monitoramento Inteligente da Nuvv e como funciona para ruas e condomínios?',
    answer:
      'É uma estrutura autônoma equipada com câmeras de alta resolução 360°, detecção inteligente com inteligência artificial, visão noturna de longo alcance e gravação contínua em nuvem 24/7, conectada diretamente à Fibra Óptica Nuvv. O poste é instalado em pontos estratégicos de ruas ou condomínios, e os custos podem ser rateados entre os vizinhos participantes, transformando a via em uma rede comunitária de segurança.',
  },
  {
    category: 'Poste Inteligente',
    question: 'Quem pode acessar as imagens das câmeras do Poste Inteligente?',
    answer:
      'Todos os moradores da rua ou condomínio cadastrados no projeto têm acesso simultâneo às imagens ao vivo e à linha do tempo de gravações diretamente pelo App Nuvv Guard em seus smartphones, sem limite de visualizadores simultâneos.',
  },
  {
    category: 'Poste Inteligente',
    question: 'Como funciona o modelo com investimento da própria Nuvv em áreas públicas?',
    answer:
      'Para praças, centros comerciais e áreas públicas estratégicas de alta circulação, a Nuvv pode arcar com o investimento de instalação e infraestrutura do poste em troca da veiculação de mídia no espaço publicitário do próprio poste e fornecimento de Wi-Fi Hotspot gratuito para os pedestres.',
  },
];

export const GuardFaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Geral', 'Câmeras', 'Interfone', 'Tags', 'Poste Inteligente'];

  const filteredFaqs = GUARD_FAQS.filter((item) => {
    if (selectedCategory === 'Todas') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="py-20 sm:py-28 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-nuvv-dark">
            Perguntas Frequentes sobre o Nuvv Guard
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Tudo o que você precisa saber sobre câmeras em nuvem, interfone por QR Code e tags de rastreamento.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-nuvv-dark text-white shadow-md'
                  : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-emerald-500/50 bg-slate-50/90 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 transition-colors"
                >
                  <span className="text-sm sm:text-base font-extrabold text-nuvv-dark flex items-center gap-2.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-fade-in">
                    <p>{faq.answer}</p>
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
