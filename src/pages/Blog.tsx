import React, { useState, useEffect } from 'react';
import { getStoredBlogPosts, BlogPost } from '../data/blog';
import { BlogCard } from '../components/blog/BlogCard';
import { NewsletterBox } from '../components/blog/NewsletterBox';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { SEO } from '../components/common/SEO';
import { BookOpen, Search, Sparkles } from 'lucide-react';

interface BlogPageProps {
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const Blog: React.FC<BlogPageProps> = ({
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener('nuvv_blog_updated', handleUpdate);
    return () => window.removeEventListener('nuvv_blog_updated', handleUpdate);
  }, []);

  const categories = ['all', 'Tecnologia', 'Segurança', 'Entretenimento', 'Dicas'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title="Blog Nuvv - Tecnologia, Wi-Fi 6, Streaming e Dicas de Conexão"
        description="Fique por dentro das novidades do mundo digital, tutoriais de tecnologia, dicas para turbinar seu Wi-Fi e os melhores lançamentos do entretenimento em streaming."
        keywords={[
          'blog nuvv',
          'dicas wifi',
          'tecnologia fibra optica',
          'tutoriais internet',
          'streaming watch brasil',
          'hbo max com provedor',
        ]}
        ogType="website"
      />
      {/* Blog Hero */}
      <section className="bg-nuvv-dark text-white py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/40 text-indigo-200 text-xs font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-nuvv-green" />
            <span>Blog Nuvv</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Conexão, Tecnologia e Entretenimento
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mt-3">
            Fique por dentro das novidades do mundo digital, dicas para aproveitar melhor sua internet e lançamentos do streaming.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar artigos e dicas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm outline-none focus:bg-white/15 focus:border-nuvv-green transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50/50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-nuvv-purple text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat === 'all' ? 'Todos os Artigos' : cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-lg mx-auto p-8 space-y-2">
              <Sparkles className="w-8 h-8 text-gray-400 mx-auto" />
              <h4 className="text-base font-bold text-gray-800">Nenhum artigo encontrado</h4>
              <p className="text-xs text-gray-500">Tente buscar por outro termo ou selecione todas as categorias.</p>
            </div>
          )}

          {/* Nuvv News capture box */}
          <NewsletterBox />
        </div>
      </section>

      {/* Quick Access Bar */}
      <QuickAccessBar
        onOpenSpeedTest={onOpenSpeedTest}
        onOpenCitySelector={onOpenCitySelector}
      />
    </div>
  );
};
