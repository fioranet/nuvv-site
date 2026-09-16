export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: 'Tecnologia' | 'Segurança' | 'Entretenimento' | 'Dicas';
  date: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'wifi-6-por-que-voce-precisa-dessa-tecnologia',
    title: 'Wi-Fi 6: Por que você precisa dessa tecnologia?',
    category: 'Tecnologia',
    date: '12 Nov 2025',
    image: '/images/blog/wifi6.png',
    readTime: '4 min de leitura',
    excerpt: 'Descubra como a nova geração de internet sem fio pode transformar a conexão da sua casa inteligente.',
    author: {
      name: 'Equipe de Engenharia Nuvv',
      role: 'Especialistas em Conectividade',
      avatar: '/images/external/user_men_32.jpg',
    },
    content: `
      <p class="lead text-lg text-gray-700 font-medium mb-6">
        Se você tem notado que a internet da sua casa fica lenta quando muita gente está conectada ao mesmo tempo, ou se seus jogos online sofrem com atrasos (lag), o problema pode não ser a velocidade contratada, mas sim a tecnologia do seu roteador. É aí que entra o <strong>Wi-Fi 6</strong>.
      </p>

      <p>
        Também conhecido como <strong>802.11ax</strong>, o Wi-Fi 6 é a mais moderna geração de conexão sem fio, projetada especificamente para lidar com a realidade de lares hiperconectados, onde operam simultaneamente smartphones, smart TVs 4K, consoles de videogame, notebooks e dispositivos de casa inteligente.
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">Mas o que muda na prática?</h3>

      <div class="bg-indigo-50/70 border-l-4 border-nuvv-purple p-6 rounded-r-xl my-6">
        <h4 class="text-xl font-bold text-nuvv-purple mb-2">1. Mais velocidade e máxima eficiência</h4>
        <p class="text-gray-700">
          Embora o Wi-Fi 6 seja teoricamente até 40% mais rápido que o Wi-Fi 5, seu grande trunfo é a <strong>eficiência</strong>. Pense no Wi-Fi antigo como uma estrada de pista única: os dados de cada aparelho precisam esperar sua vez. O Wi-Fi 6 funciona como uma rodovia de múltiplas pistas com tecnologia MU-MIMO e canais OFDMA, permitindo que vários aparelhos recebam dados no mesmo milissegundo.
        </p>
      </div>

      <h4 class="text-xl font-bold text-nuvv-purple mt-6 mb-2">2. Menor Latência (Ping Baixo para Gamers)</h4>
      <p>
        Para os gamers e profissionais em videoconferências, essa é a maior vantagem. A tecnologia OFDMA divide os canais de dados em subcanais menores, garantindo que o sinal chegue sem gargalos. O resultado é a extinção do lag em jogos competitivos e reuniões sem congelamento de tela.
      </p>

      <h4 class="text-xl font-bold text-nuvv-purple mt-6 mb-2">3. Economia de Bateria dos Dispositivos (TWT)</h4>
      <p>
        Uma inovação inteligente é o <em>Target Wake Time</em> (TWT). Com ele, o roteador e seus celulares/sensores combinam horários exatos para transmitir dados. Enquanto não estão enviando pacotes, o rádio Wi-Fi entra em repouso temporário, poupando a bateria do seu smartphone.
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">Vale a pena o upgrade?</h3>
      <p>
        Com certeza. Na <strong>Nuvv Fibra</strong>, todos os nossos planos de alta velocidade a partir de 800 Mega já incluem roteadores compatíveis com Wi-Fi 6 de fábrica, garantindo que você extraia 100% do potencial da sua fibra óptica.
      </p>
    `,
  },
  {
    id: 2,
    slug: 'como-proteger-seus-filhos-na-internet',
    title: 'Como proteger seus filhos na internet',
    category: 'Segurança',
    date: '20 Out 2025',
    image: '/images/blog/security.png',
    readTime: '5 min de leitura',
    excerpt: 'Dicas essenciais de controle parental e configuração segura para garantir uma navegação saudável.',
    author: {
      name: 'Mariana Souza',
      role: 'Segurança da Informação',
      avatar: '/images/external/user_women_44.jpg',
    },
    content: `
      <p class="lead text-lg text-gray-700 font-medium mb-6">
        A internet é uma ferramenta educacional e de entretenimento fantástica, mas como pais e responsáveis, sabemos que ela também esconde armadilhas. Conteúdos impróprios, cyberbullying e contatos suspeitos são preocupações reais. Felizmente, com boas práticas e ferramentas certas, é possível blindar o ambiente digital da sua família.
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">1. Controle Parental: Seu Primeiro Aliado</h3>
      <p>
        A maioria das plataformas modernas oferece mecanismos de proteção nativos. Não hesite em utilizá-los:
      </p>

      <ul class="list-disc pl-6 space-y-3 my-4 text-gray-700">
        <li><strong>Google Family Link:</strong> Essencial para aparelhos Android. Permite aprovar apps antes de serem baixados, definir limites de tela e rastrear a localização do aparelho.</li>
        <li><strong>Kaspersky Safe Kids (Incluso no Nuvv +Proteção):</strong> Bloqueia automaticamente buscas por conteúdos adultos, monitora redes sociais e alerta sobre termos suspeitos pesquisados.</li>
        <li><strong>YouTube Kids:</strong> Filtra automaticamente vídeos impróprios para faixas etárias específicas.</li>
      </ul>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">2. A Regra do 'Uso em Ambientes Comuns'</h3>
      <p>
        Computadores, tablets e videogames usados em áreas sociais da casa (sala, escritório aberto) proporcionam uma supervisão passiva e acolhedora, onde você pode acompanhar casualmente o que é consumido sem ser invasivo.
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">3. Diálogo e Conscientização</h3>
      <p>
        Nenhum filtro substitui a conversa aberta. Ensine seus filhos a nunca compartilhar nomes de escolas, rotinas diárias ou endereços em chats de jogos multiplayer, e construa uma relação de confiança onde eles saibam que podem procurar ajuda a qualquer momento.
      </p>
    `,
  },
  {
    id: 3,
    slug: 'streaming-vs-tv-a-cabo-qual-vale-mais-a-pena',
    title: 'Streaming vs TV a Cabo: Qual vale mais a pena?',
    category: 'Entretenimento',
    date: '05 Set 2025',
    image: '/images/blog/streaming.png',
    readTime: '3 min de leitura',
    excerpt: 'Uma análise comparativa de custos e benefícios para ajudar você a decidir o melhor para sua família.',
    author: {
      name: 'Lucas Ferreira',
      role: 'Especialista em Mídia Digital',
      avatar: '/images/external/user_men_85.jpg',
    },
    content: `
      <p class="lead text-lg text-gray-700 font-medium mb-6">
        A era de ouro do entretenimento na sala de estar mudou. Se antes ficávamos presos a horários fixos de TV a cabo com planos caros e cheios de canais que ninguém assistia, hoje o streaming reina absoluto. Mas será que vale a pena cancelar a TV por assinatura de vez?
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">Custo-Benefício e Liberdade</h3>
      <p>
        Uma assinatura comum de TV a cabo passa facilmente de R$ 160,00 mensais com aluguel de decodificador. Com essa mesma quantia e uma conexão de fibra de alta performance, você aproveita múltiplos catálogos sob demanda, assiste na TV, no tablet ou no celular e pode pausar ou trocar de plano quando desejar.
      </p>

      <div class="bg-indigo-50/70 border-l-4 border-nuvv-purple p-6 rounded-r-xl my-6">
        <h4 class="text-xl font-bold text-nuvv-purple mb-2">A Solução Ideal: NuvvPlay+</h4>
        <p class="text-gray-700">
          Para quem não quer abrir mão dos canais ao vivo de notícias e esportes mas ama a facilidade dos aplicativos, a Nuvv oferece o <strong>NuvvPlay</strong> direto no plano de internet. São dezenas de canais lineares em HD sem precisar furar paredes ou pagar por aluguel de aparelhos extras.
        </p>
      </div>
    `,
  },
  {
    id: 4,
    slug: 'dicas-para-melhorar-o-sinal-do-wi-fi-em-casa',
    title: 'Dicas para melhorar o sinal do Wi-Fi em casa',
    category: 'Dicas',
    date: '10 Ago 2025',
    image: '/images/blog/signal.png',
    readTime: '4 min de leitura',
    excerpt: 'Posicionamento do roteador e barreiras físicas podem estar atrapalhando sua conexão. Veja como resolver.',
    author: {
      name: 'Equipe de Suporte Nuvv',
      role: 'Atendimento Técnico',
      avatar: '/images/external/user_men_32.jpg',
    },
    content: `
      <p class="lead text-lg text-gray-700 font-medium mb-6">
        Você contratou uma internet super veloz, mas no quarto dos fundos o vídeo demora para carregar? Muitas vezes o sinal sem fio encontra obstáculos físicos dentro de casa que reduzem o alcance das ondas de rádio.
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">1. Posicionamento Estratégico</h3>
      <p>
        O roteador irradia o sinal em formato esférico. Se você colocá-lo no chão, escondido atrás da TV ou dentro de um armário, grande parte do sinal é absorvida antes de chegar aos quartos. Prefira deixá-lo no cômodo mais central e a meia altura (em cima de uma mesa ou estante).
      </p>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">2. Inimigos do Sinal Wi-Fi</h3>
      <ul class="list-disc pl-6 space-y-2 my-4 text-gray-700">
        <li><strong>Espelhos e metais:</strong> Refletem as ondas e criam zonas de sombra.</li>
        <li><strong>Aquários:</strong> A água atua como um bloqueador natural de radiofrequência.</li>
        <li><strong>Micro-ondas e telefones antigos:</strong> Geram interferência na frequência de 2.4GHz.</li>
      </ul>

      <h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">3. Use Redes Mesh para Grandes Áreas</h3>
      <p>
        Para sobrados ou imóveis com mais de 100m², a tecnologia <strong>Wi-Fi Mesh</strong> é a melhor escolha. Ela interliga múltiplos pontos criando uma única rede sem cortes ou quedas ao transitar pelos cômodos.
      </p>
    `,
  },
];

const STORAGE_KEY = 'nuvv_custom_blog_posts';

export const getStoredBlogPosts = (): BlogPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Erro ao ler posts customizados:', err);
  }
  return BLOG_POSTS;
};

export const saveCustomBlogPost = (post: BlogPost): BlogPost[] => {
  try {
    const current = getStoredBlogPosts();
    const existingIndex = current.findIndex((p) => p.id === post.id || p.slug === post.slug);
    let updated: BlogPost[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('nuvv_blog_updated'));
    return updated;
  } catch (err) {
    console.error('Erro ao salvar post do blog:', err);
    return BLOG_POSTS;
  }
};

export const deleteCustomBlogPost = (id: number): BlogPost[] => {
  try {
    const current = getStoredBlogPosts();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('nuvv_blog_updated'));
    return updated;
  } catch (err) {
    console.error('Erro ao excluir post do blog:', err);
    return BLOG_POSTS;
  }
};
