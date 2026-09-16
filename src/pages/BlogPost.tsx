import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStoredBlogPosts, BlogPost } from '../data/blog';
import { BlogCard } from '../components/blog/BlogCard';
import { NewsletterBox } from '../components/blog/NewsletterBox';
import { QuickAccessBar } from '../components/common/QuickAccessBar';
import { SEO } from '../components/common/SEO';
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from 'lucide-react';

interface BlogPostPageProps {
  onOpenSpeedTest: () => void;
  onOpenCitySelector: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  onOpenSpeedTest,
  onOpenCitySelector,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener('nuvv_blog_updated', handleUpdate);
    return () => window.removeEventListener('nuvv_blog_updated', handleUpdate);
  }, []);

  const post = posts.find((p) => String(p.id) === id || p.slug === id);

  if (!post) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-nuvv-dark">Artigo não encontrado</h2>
        <p className="text-sm text-gray-500">O post que você está procurando não existe ou foi movido.</p>
        <Link
          to="/blog"
          className="inline-block px-6 py-3 rounded-xl bg-nuvv-purple text-white text-xs font-bold"
        >
          Voltar ao Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do artigo copiado para a área de transferência!');
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image?.startsWith('http') ? post.image : `https://nuvv.com.br${post.image || '/images/hero/home_1.png'}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nuvv Internet e Tecnologia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nuvv.com.br/images/external/favicon.png',
      },
    },
  };

  return (
    <div className="space-y-0 animate-fade-in">
      <SEO
        title={`${post.title} | Blog Nuvv`}
        description={post.excerpt}
        ogImage={post.image?.startsWith('http') ? post.image : `https://nuvv.com.br${post.image || '/images/hero/home_1.png'}`}
        ogType="article"
        schema={articleSchema}
      />
      {/* Header Container */}
      <div className="bg-slate-50/70 py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para todos os artigos</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-indigo-50 text-nuvv-purple border border-indigo-100">
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-nuvv-dark leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-gray-500 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-nuvv-purple" />
                <span>{post.author.name}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-nuvv-purple" />
                <span>{post.date}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-nuvv-purple" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-600 hover:text-nuvv-purple bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Post Article Body */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Cover Hero Image */}
          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 max-h-[420px]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rendered HTML Content */}
          <div
            className="prose prose-slate max-w-none text-sm sm:text-base text-gray-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Category Chip */}
          <div className="pt-6 border-t border-gray-100 flex items-center space-x-2 flex-wrap gap-y-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
              #{post.category}
            </span>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-slate-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-nuvv-dark mb-8 text-center sm:text-left">
            Artigos Relacionados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rPost) => (
              <BlogCard key={rPost.id} post={rPost} />
            ))}
          </div>

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
