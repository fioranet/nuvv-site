import React, { useState, useEffect } from 'react';
import {
  BlogPost,
  getStoredBlogPosts,
  saveCustomBlogPost,
  deleteCustomBlogPost,
} from '../../data/blog';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Calendar,
  Clock,
  User,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Code,
  FileText,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  X,
} from 'lucide-react';

export const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'Tecnologia' | 'Segurança' | 'Entretenimento' | 'Dicas'>('Dicas');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('/images/blog/wifi6.png');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState('4 min de leitura');
  const [authorName, setAuthorName] = useState('Equipe Nuvv');
  const [authorRole, setAuthorRole] = useState('Especialistas em Conectividade');
  const [authorAvatar, setAuthorAvatar] = useState('/images/external/user_men_32.jpg');
  const [content, setContent] = useState('');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener('nuvv_blog_updated', handleUpdate);
    return () => window.removeEventListener('nuvv_blog_updated', handleUpdate);
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPostId) {
      setSlug(generateSlug(val));
    }
  };

  const handleOpenNew = () => {
    const nextId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setCategory('Dicas');
    const now = new Date();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    setDate(`${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`);
    setImage('/images/blog/signal.png');
    setExcerpt('');
    setReadTime('4 min de leitura');
    setAuthorName('Equipe Nuvv');
    setAuthorRole('Especialistas em Conectividade');
    setAuthorAvatar('/images/external/user_men_32.jpg');
    setContent(`
<p class="lead text-lg text-gray-700 font-medium mb-6">
  Escreva aqui o parágrafo de introdução impactante do seu novo artigo.
</p>

<h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">1. Primeiro Tópico Principal</h3>
<p>
  Explique detalhadamente as dicas e informações para o leitor.
</p>

<div class="bg-indigo-50/70 border-l-4 border-nuvv-purple p-6 rounded-r-xl my-6">
  <h4 class="text-xl font-bold text-nuvv-purple mb-2">Dica Nuvv:</h4>
  <p class="text-gray-700">
    Insira uma recomendação valiosa de forma destacada.
  </p>
</div>
    `.trim());
    setIsEditing(true);
    setPreviewMode(false);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setDate(post.date);
    setImage(post.image);
    setExcerpt(post.excerpt);
    setReadTime(post.readTime);
    setAuthorName(post.author.name);
    setAuthorRole(post.author.role);
    setAuthorAvatar(post.author.avatar);
    setContent(post.content);
    setIsEditing(true);
    setPreviewMode(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert('Por favor, preencha o título e o slug da URL.');
      return;
    }

    const newId = editingPostId || (posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1);

    const postData: BlogPost = {
      id: newId,
      slug: slug.trim(),
      title: title.trim(),
      category,
      date: date.trim(),
      image: image.trim(),
      excerpt: excerpt.trim(),
      readTime: readTime.trim(),
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        avatar: authorAvatar.trim(),
      },
      content: content.trim(),
    };

    saveCustomBlogPost(postData);
    setSaveFeedback('Artigo salvo e publicado com sucesso!');
    setTimeout(() => {
      setSaveFeedback(null);
      setIsEditing(false);
    }, 1200);
  };

  const handleDelete = (id: number, postTitle: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o artigo "${postTitle}"?`)) {
      deleteCustomBlogPost(id);
    }
  };

  const handleCopyCode = (post: BlogPost) => {
    const codeSnippet = JSON.stringify(post, null, 2);
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCodeId(post.id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const insertSnippet = (template: string) => {
    setContent((prev) => prev + '\n\n' + template);
  };

  const categories = ['all', 'Tecnologia', 'Segurança', 'Entretenimento', 'Dicas'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Gestor de Conteúdo & Artigos do Blog</h2>
              <p className="text-xs text-gray-400">
                Crie, edite e publique artigos no blog institucional da Nuvv
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Artigo</span>
        </button>
      </div>

      {/* Main Content Area */}
      {isEditing ? (
        /* Visual Article Editor Form */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
                title="Voltar à lista"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="text-base font-black text-white">
                  {editingPostId ? 'Editar Artigo' : 'Criar Novo Artigo'}
                </h3>
                <span className="text-xs text-gray-400">
                  {editingPostId ? `Editando ID #${editingPostId}` : 'Preencha os campos abaixo'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                  previewMode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? 'Modo Editor' : 'Visualizar Prévia'}</span>
              </button>
            </div>
          </div>

          {saveFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{saveFeedback}</span>
            </div>
          )}

          {previewMode ? (
            /* Live Preview Mode */
            <div className="p-6 sm:p-10 rounded-3xl bg-white text-gray-900 max-w-4xl mx-auto shadow-2xl space-y-6">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-nuvv-purple/10 text-nuvv-purple text-xs font-black uppercase">
                  {category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-nuvv-dark">{title || 'Título do Artigo'}</h1>
                <p className="text-sm text-gray-500 leading-relaxed italic">{excerpt || 'Resumo do artigo...'}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400 pt-2 border-t border-gray-100">
                  <span>{date}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                  <span>•</span>
                  <span>Por {authorName}</span>
                </div>
              </div>

              {image && (
                <div className="rounded-2xl overflow-hidden max-h-[360px] bg-slate-100 flex items-center justify-center">
                  <img src={image} alt="Capa" className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ) : (
            /* Editor Form */
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-300">Título do Artigo</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Ex: Como configurar sua Smart TV com Wi-Fi 6"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Slug da URL (Link)</label>
                  <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 px-3 py-3 text-xs">
                    <span className="text-gray-500 mr-1">/blog/</span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="como-configurar-smart-tv"
                      className="bg-transparent text-white font-mono text-xs outline-none w-full"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Entretenimento">Entretenimento</option>
                    <option value="Dicas">Dicas</option>
                  </select>
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-300">
                    Resumo / Subtítulo (Aparece nos cards e no Google SEO)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Breve descrição resumida de 1 a 2 linhas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Date & Read Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Data de Publicação</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Ex: 01 Set 2026"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Tempo de Leitura</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Ex: 4 min de leitura"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Cover Image & Presets */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-300">Imagem de Capa (URL ou Caminho)</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/blog/wifi6.png"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono outline-none focus:border-emerald-400 mb-2"
                  />

                  {/* Image Quick Presets */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-gray-400">Sugestões prontas:</span>
                    {[
                      { label: 'Wi-Fi 6', path: '/images/blog/wifi6.png' },
                      { label: 'Segurança', path: '/images/blog/security.png' },
                      { label: 'Streaming', path: '/images/blog/streaming.png' },
                      { label: 'Sinal & Dicas', path: '/images/blog/signal.png' },
                    ].map((p) => (
                      <button
                        key={p.path}
                        type="button"
                        onClick={() => setImage(p.path)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          image === p.path
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-gray-400 hover:text-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Nome do Autor</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Equipe Nuvv"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Cargo / Especialidade do Autor</label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Especialistas em Conectividade"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Rich Content Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-gray-300">
                    Conteúdo do Artigo (Formatação HTML)
                  </label>
                  <span className="text-[11px] text-gray-400">
                    Use os botões de atalho abaixo para inserir blocos com o design oficial da Nuvv
                  </span>
                </div>

                {/* Insertion Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        '<p class="lead text-lg text-gray-700 font-medium mb-6">\n  Parágrafo introdutório em destaque aqui...\n</p>'
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-300 transition-colors cursor-pointer"
                  >
                    + Parágrafo Lead
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        '<h3 class="text-2xl font-bold text-nuvv-dark mt-8 mb-4">Título da Seção</h3>\n<p>\n  Texto explicativo aqui...\n</p>'
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-300 transition-colors cursor-pointer"
                  >
                    + Título H3
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        '<h4 class="text-xl font-bold text-nuvv-purple mt-6 mb-2">Subtítulo Roxinho</h4>\n<p>\n  Texto complementar...\n</p>'
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-300 transition-colors cursor-pointer"
                  >
                    + Subtítulo H4
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        '<div class="bg-indigo-50/70 border-l-4 border-nuvv-purple p-6 rounded-r-xl my-6">\n  <h4 class="text-xl font-bold text-nuvv-purple mb-2">Dica de Ouro</h4>\n  <p class="text-gray-700">\n    Conteúdo de destaque relevante para o cliente.\n  </p>\n</div>'
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/80 text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Caixa Destaque Roxa
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      insertSnippet(
                        '<ul class="list-disc pl-6 space-y-2 my-4 text-gray-700">\n  <li><strong>Item 1:</strong> Descrição do ponto chave.</li>\n  <li><strong>Item 2:</strong> Outro ponto importante.</li>\n</ul>'
                      )
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gray-300 transition-colors cursor-pointer"
                  >
                    + Lista com Marcadores
                  </button>
                </div>

                <textarea
                  rows={12}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-gray-200 font-mono text-xs leading-relaxed outline-none focus:border-emerald-400"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar & Publicar no Blog</span>
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* Blog Articles Table / Cards */
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-900 border border-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Todos os Artigos' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar artigo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Posts List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-700">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">/blog/{post.slug}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white truncate max-w-[320px] sm:max-w-md md:max-w-lg">
                      {post.title}
                    </h4>

                    <div className="flex items-center space-x-3 text-[11px] text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
                    title="Ver no site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ver no Site</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(post)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
                    title="Copiar snippet JSON para blog.ts"
                  >
                    {copiedCodeId === post.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">Copiar Código</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(post)}
                    className="p-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer border border-indigo-500/30"
                    title="Editar"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-400 text-xs font-bold transition-colors flex items-center justify-center cursor-pointer border border-red-800/30"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
