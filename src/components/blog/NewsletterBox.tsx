import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/apiService';

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !acceptedPolicy) return;

    setLoading(true);
    // Store via API to SQLite + trigger welcome email
    await apiService.subscribeNewsletter(email, '', 'blog_box');

    // Local fallback
    try {
      const storedNews = JSON.parse(localStorage.getItem('nuvv_newsletter') || '[]');
      storedNews.push({ email, date: new Date().toISOString() });
      localStorage.setItem('nuvv_newsletter', JSON.stringify(storedNews));
    } catch {
      // ignore
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-nuvv-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden max-w-4xl mx-auto my-16">
      {/* Background Decorative Glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-nuvv-purple/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-nuvv-green/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-nuvv-green flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Nuvv News</h3>
        <p className="text-xs sm:text-sm text-gray-300">
          Receba conteúdos exclusivos sobre tecnologia, dicas de streaming e ofertas especiais diretamente no seu e-mail.
        </p>

        {submitted ? (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center space-x-2 text-emerald-300 text-sm font-semibold animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Inscrição confirmada com sucesso! Bem-vindo à Nuvv News.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm outline-none focus:border-nuvv-green focus:ring-1 focus:ring-nuvv-green transition-all"
              />
              <button
                type="submit"
                disabled={!acceptedPolicy}
                className="py-3.5 px-6 rounded-xl bg-nuvv-purple hover:bg-nuvv-purple-hover disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all whitespace-nowrap active:scale-98"
              >
                Quero Receber
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-1 text-xs text-gray-400">
              <input
                type="checkbox"
                id="policy-check"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
                className="rounded border-gray-600 text-nuvv-purple focus:ring-nuvv-purple w-4 h-4 cursor-pointer"
              />
              <label htmlFor="policy-check" className="cursor-pointer text-[11px]">
                Concordo em receber comunicações da Nuvv e aceito a{' '}
                <Link to="/privacidade" className="underline hover:text-white">
                  Política de Privacidade
                </Link>
                .
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
