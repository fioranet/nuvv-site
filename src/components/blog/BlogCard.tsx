import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../data/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const categoryColors: Record<string, string> = {
    Tecnologia: 'bg-blue-50 text-blue-600 border-blue-200',
    Segurança: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Entretenimento: 'bg-violet-50 text-violet-600 border-violet-200',
    Dicas: 'bg-amber-50 text-amber-600 border-amber-200',
  };

  const badgeStyle = categoryColors[post.category] || 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        {/* Cover Image */}
        <Link to={`/blog/${post.id}`} className="block relative h-52 overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border shadow-xs ${badgeStyle}`}
            >
              {post.category}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <Link to={`/blog/${post.id}`}>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-nuvv-purple transition-colors line-clamp-2 mb-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer / Read Link */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-50">
        <Link
          to={`/blog/${post.id}`}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-nuvv-purple group-hover:text-nuvv-purple-hover uppercase tracking-wider transition-colors"
        >
          <span>Ler Artigo</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
