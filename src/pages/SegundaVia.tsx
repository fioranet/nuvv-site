import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';
import {
  FileText,
  QrCode,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Download,
  Smartphone,
  HelpCircle,
  Lock,
  RefreshCw,
  Search,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';

interface FaturamentoItem {
  id_faturamento: string | number;
  referencia: string;
  data_vencimento: string;
  esta_vencido: boolean;
  status_rotulo: 'VENCIDO' | 'VENCE HOJE' | 'A VENCER';
  valor: string;
  valor_num: number;
  linha_digitavel: string;
  pix_copia_cola: string;
  url_pdf: string;
}

interface ConsultaResult {
  cliente: {
    nome_mascarado: string;
  };
  esta_em_dia: boolean;
  total_vencidas: number;
  total_pendentes: number;
  faturamentos: FaturamentoItem[];
}

export const SegundaVia: React.FC = () => {
  const [docInput, setDocInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<ConsultaResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'pix' | 'barcode' | null>(null);
  const [openQrId, setOpenQrId] = useState<string | null>(null);

  // Formata o input com máscara de CPF (11) ou CNPJ (14)
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 14);
    let formatted = raw;

    if (raw.length <= 11) {
      // CPF: 000.000.000-00
      formatted = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ: 00.000.000/0000-00
      formatted = raw
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    setDocInput(formatted);
    setErrorMsg(null);
  };

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDoc = docInput.replace(/\D/g, '');

    if (!cleanDoc) {
      setErrorMsg('Por favor, digite o CPF ou CNPJ do titular da assinatura.');
      return;
    }

    if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
      setErrorMsg('Documento incompleto. Digite um CPF (11 números) ou CNPJ (14 números) válido.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setHasSearched(false);

    try {
      const response = await fetch('/api/segunda-via/consultar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf_cnpj: cleanDoc }),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Nenhum cadastro de assinante localizado para este CPF/CNPJ.');
      }

      setResult(data.data);
      setHasSearched(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Não foi possível consultar as faturas. Verifique o número digitado ou tente novamente em instantes.');
      setResult(null);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, id: string | number, type: 'pix' | 'barcode') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(String(id));
    setCopiedType(type);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType(null);
    }, 3000);
  };

  const handleReset = () => {
    setDocInput('');
    setResult(null);
    setErrorMsg(null);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pb-20 selection:bg-nuvv-purple selection:text-white">
      <SEO
        title="2ª Via Rápida de Boleto & PIX | Nuvv Fibra"
        description="Acesse sua 2ª via de fatura Nuvv Fibra de forma rápida e segura digitando apenas o CPF ou CNPJ. Pague via PIX Copia e Cola ou código de barras."
      />

      {/* 1. Hero Section */}
      <section className="bg-gradient-to-b from-nuvv-dark via-slate-900 to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-nuvv-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/40 text-indigo-200 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-nuvv-green" />
            <span>AUTOATENDIMENTO • 2ª VIA RÁPIDA & PIX</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Pague sua fatura em segundos.{' '}
            <span className="text-gradient-hero">PIX ou Código de Barras</span>.
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Consulte seus débitos pendentes de forma segura informando apenas o <strong>CPF</strong> ou <strong>CNPJ</strong> do titular da assinatura. Sem senhas extras.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 pt-2 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ambiente Seguro 256-bit</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-nuvv-green" />
              <span>Baixa Automática no PIX</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Sem necessidade de login</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Search Card */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/90 space-y-6">
          <form onSubmit={handleConsultar} className="space-y-4">
            <div>
              <label htmlFor="doc-input" className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
                Informe o CPF ou CNPJ do Titular:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="doc-input"
                  type="text"
                  value={docInput}
                  onChange={handleDocChange}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  maxLength={18}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 font-extrabold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-nuvv-purple focus:border-transparent transition-all placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-xs text-rose-800 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg shadow-nuvv-purple/20 transition-all flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Buscando faturas no sistema...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Consultar 2ª Via</span>
                  </>
                )}
              </button>

              {hasSearched && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
                >
                  Nova Consulta
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* 3. Results Section */}
      {result && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 space-y-6 animate-fade-in">
          {/* Client Header Identification */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-nuvv-purple flex items-center justify-center flex-shrink-0 font-black text-sm">
                N+
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wider block">
                  Titular da Conexão
                </span>
                <h2 className="text-base sm:text-lg font-black text-gray-900">
                  {result.cliente.nome_mascarado}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              {result.esta_em_dia ? (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black rounded-full flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Conta em Dia</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-rose-100 text-rose-800 border border-rose-300 text-xs font-black rounded-full flex items-center space-x-1.5 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>
                    {result.total_vencidas} {result.total_vencidas === 1 ? 'Fatura Vencida' : 'Faturas Vencidas'}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Overdue Alert or Up-to-Date Notice */}
          {!result.esta_em_dia && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="block font-bold">Débitos Pendentes Localizados:</strong>
                <span>
                  Efetue o pagamento da fatura vencida via PIX para confirmação e restabelecimento automático do sinal em instantes.
                </span>
              </div>
            </div>
          )}

          {result.esta_em_dia && result.faturamentos.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="block font-bold">Suas mensalidades estão em dia!</strong>
                <span>
                  Abaixo está disponível a fatura do seu próximo ciclo de vencimento, caso deseje antecipar o pagamento:
                </span>
              </div>
            </div>
          )}

          {/* If No Invoices are Open */}
          {result.faturamentos.length === 0 && (
            <div className="p-8 rounded-3xl bg-white border border-emerald-200 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-gray-900">Nenhuma fatura pendente!</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Todas as suas faturas estão 100% quitadas e não há débitos em aberto para o seu contrato. Obrigado por ser cliente Nuvv!
                </p>
              </div>
            </div>
          )}

          {/* Invoices List */}
          {result.faturamentos.map((fat) => {
            const isPixCopied = copiedId === String(fat.id_faturamento) && copiedType === 'pix';
            const isBarcodeCopied = copiedId === String(fat.id_faturamento) && copiedType === 'barcode';

            return (
              <div
                key={fat.id_faturamento}
                className={`p-6 rounded-3xl bg-white border transition-all shadow-sm space-y-5 ${
                  fat.esta_vencido
                    ? 'border-rose-300 ring-2 ring-rose-500/10 hover:border-rose-400'
                    : fat.status_rotulo === 'VENCE HOJE'
                    ? 'border-amber-300 ring-2 ring-amber-500/10 hover:border-amber-400'
                    : 'border-gray-200 hover:border-nuvv-purple/40'
                }`}
              >
                {/* Top Info Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                      Referência
                    </span>
                    <h3 className="text-base font-black text-gray-900">{fat.referencia}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                        fat.status_rotulo === 'VENCIDO'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : fat.status_rotulo === 'VENCE HOJE'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : 'bg-indigo-50 text-nuvv-purple border border-indigo-200'
                      }`}
                    >
                      {fat.status_rotulo}
                    </span>
                  </div>
                </div>

                {/* Value & Due Date */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">Data de Vencimento</span>
                    <span className="text-sm sm:text-base font-extrabold text-gray-900 flex items-center space-x-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-nuvv-purple" />
                      <span>{fat.data_vencimento}</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-medium block">Valor do Pagamento</span>
                    <span className="text-lg sm:text-2xl font-black text-nuvv-purple block mt-0.5">
                      {fat.valor}
                    </span>
                  </div>
                </div>

                {/* Primary Action: PIX Copia e Cola & QR Code */}
                {fat.pix_copia_cola && (
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/90 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-extrabold text-nuvv-purple uppercase tracking-wider">
                        <QrCode className="w-4 h-4" />
                        <span>Pagar via PIX (Baixa Imediata)</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                        Recomendado
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Botão Copiar PIX */}
                      <button
                        type="button"
                        onClick={() => handleCopyText(fat.pix_copia_cola, fat.id_faturamento, 'pix')}
                        className={`w-full py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer ${
                          isPixCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-nuvv-purple hover:bg-nuvv-purple-hover text-white'
                        }`}
                      >
                        {isPixCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Código PIX Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar Código PIX</span>
                          </>
                        )}
                      </button>

                      {/* Botão Mostrar / Ocultar QR Code */}
                      <button
                        type="button"
                        onClick={() => setOpenQrId(openQrId === String(fat.id_faturamento) ? null : String(fat.id_faturamento))}
                        className={`w-full py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 border transition-all cursor-pointer ${
                          openQrId === String(fat.id_faturamento)
                            ? 'bg-purple-100 border-purple-300 text-nuvv-purple'
                            : 'bg-white hover:bg-gray-50 border-purple-200 text-nuvv-purple'
                        }`}
                      >
                        {openQrId === String(fat.id_faturamento) ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>Ocultar QR Code</span>
                          </>
                        ) : (
                          <>
                            <QrCode className="w-4 h-4" />
                            <span>Ver QR Code na Tela</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* QR Code Container */}
                    {openQrId === String(fat.id_faturamento) && (
                      <div className="pt-2 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                        <div className="p-4 bg-white rounded-2xl border-2 border-purple-200/90 shadow-md">
                          <QRCodeSVG
                            value={fat.pix_copia_cola}
                            size={210}
                            level="M"
                            includeMargin={true}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-gray-800 block">
                            Abra o app do seu banco e escaneie o código acima
                          </span>
                          <span className="text-[11px] text-gray-500 block max-w-sm">
                            A confirmação do pagamento e a liberação de velocidade ocorrem automaticamente em poucos segundos.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Secondary Actions: Código de Barras & PDF */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Copiar Código de Barras */}
                  {fat.linha_digitavel && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(fat.linha_digitavel, fat.id_faturamento, 'barcode')}
                      className={`w-full py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        isBarcodeCopied
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {isBarcodeCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Linha Digitável Copiada!</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span>Copiar Código de Barras</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Baixar / Ver Boleto PDF */}
                  {fat.url_pdf && (
                    <a
                      href={fat.url_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-2xs hover:text-nuvv-purple hover:border-nuvv-purple/40"
                    >
                      <Download className="w-4 h-4 text-nuvv-purple" />
                      <span>Baixar Boleto em PDF</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 4. Self-Service Helpers & App Nuvv+ Callout */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card Desbloqueio em Confiança */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-nuvv-purple flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">
                Auto-Desbloqueio em Confiança
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Sua conexão foi reduzida por atraso? Acesse o <strong>App Nuvv+</strong> e libere seu sinal imediatamente com o desbloqueio em confiança.
              </p>
            </div>
          </div>

          {/* Card Central de Atendimento Financeiro */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">
                Dúvidas ou Negociação?
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Fale diretamente com nossa equipe financeira pelo WhatsApp oficial para parcelamentos ou esclarecimento de faturas.
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Olá, preciso de ajuda com uma fatura Nuvv')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 pt-1"
            >
              <span>Falar no WhatsApp Financeiro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
