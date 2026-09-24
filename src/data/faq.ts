export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'conexao' | 'financeiro' | 'equipamentos' | 'servicos';
  keywords: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'conexao',
    question: 'Minha internet está lenta, o que fazer?',
    answer: 'Primeiro, desligue o roteador da tomada por cerca de 30 segundos e ligue-o novamente. Verifique se o cabo de fibra ótica (amarelo) está bem conectado sem dobras bruscas. Para testes de velocidade precisos, desconecte outros dispositivos e use a rede 5GHz ou cabo de rede direto.',
    keywords: ['lenta', 'velocidade', 'reiniciar', 'roteador', 'cabo', 'conexao', 'oscilando', 'queda'],
  },
  {
    id: 'faq-2',
    category: 'financeiro',
    question: 'Como emito a 2ª via do boleto ou código Pix?',
    answer: 'Você pode emitir sua fatura atualizada em menos de 1 minuto acessando a Área do Cliente em nosso site ou solicitando diretamente pelo WhatsApp no número 0800 800 6888 informando seu CPF/CNPJ.',
    keywords: ['2 via', 'segunda via', 'boleto', 'pix', 'fatura', 'pagamento', 'debito', 'vencimento', 'financeiro'],
  },
  {
    id: 'faq-3',
    category: 'equipamentos',
    question: 'Como mudo o nome ou a senha do meu Wi-Fi?',
    answer: 'Você pode solicitar a alteração diretamente ao nosso suporte técnico via WhatsApp ou acessar as configurações do roteador pelo endereço padrão indicado na etiqueta inferior do aparelho.',
    keywords: ['senha', 'wifi', 'wi-fi', 'nome', 'ssid', 'mudar senha', 'trocar senha', 'roteador'],
  },
  {
    id: 'faq-4',
    category: 'financeiro',
    question: 'O que é e como funciona o Desbloqueio de Confiança?',
    answer: 'Caso tenha ocorrido um imprevisto com o pagamento, você pode solicitar a liberação temporária do sinal por 48 horas enquanto o pagamento é compensado pelo banco. Basta solicitar na Área do Cliente ou no WhatsApp.',
    keywords: ['desbloqueio', 'confianca', 'bloqueado', 'liberar', 'temporario', 'atraso', 'sinal'],
  },
  {
    id: 'faq-5',
    category: 'servicos',
    question: 'Como assistir ao NuvvPlay na minha Smart TV?',
    answer: 'Baixe o aplicativo NuvvPlay na loja de apps da sua Smart TV (Samsung, LG, Android TV ou Roku), abra o aplicativo e faça login com o usuário e senha enviados para o seu e-mail de cadastro no momento da ativação do plano.',
    keywords: ['nuvvplay', 'tv', 'smart tv', 'canais', 'streaming', 'app', 'assistir', 'login'],
  },
  {
    id: 'faq-6',
    category: 'conexao',
    question: 'Qual a diferença entre a rede 2.4GHz e 5GHz do Wi-Fi?',
    answer: 'A rede 5GHz oferece a máxima velocidade e menor interferência, sendo ideal para jogos, filmes em 4K e downloads perto do roteador. A rede 2.4GHz tem maior alcance físico, conseguindo atravessar mais paredes com velocidade moderada.',
    keywords: ['2.4ghz', '5ghz', 'frequencia', 'alcance', 'parede', 'dual band'],
  },
];
