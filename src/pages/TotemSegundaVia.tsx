import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { SEO } from '../components/common/SEO';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Zap,
  RotateCcw,
  Printer,
  Copy,
  Check,
  Search,
  RefreshCw,
  Delete,
  X,
  FileText,
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

export const TotemSegundaVia: React.FC = () => {
  const [docInput, setDocInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<ConsultaResult | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(90);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Relógio em tempo real
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Temporizador de inatividade para auto-reset (90s)
  const resetInactivityTimer = () => {
    setSecondsRemaining(90);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleReset();
          return 90;
        }
        return prev - 1;
      });
    }, 1000);

    const onUserAction = () => resetInactivityTimer();
    window.addEventListener('touchstart', onUserAction);
    window.addEventListener('mousemove', onUserAction);

    return () => {
      clearInterval(timer);
      window.removeEventListener('touchstart', onUserAction);
      window.removeEventListener('mousemove', onUserAction);
    };
  }, [result]);

  // Formata o documento
  const formatDocument = (rawDigits: string) => {
    const raw = rawDigits.slice(0, 14);
    if (raw.length <= 11) {
      return raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return raw
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  };

  const handleKeypadPress = (val: string) => {
    resetInactivityTimer();
    setErrorMsg(null);
    const cleanCurrent = docInput.replace(/\D/g, '');

    if (val === 'CLEAR') {
      setDocInput('');
      return;
    }

    if (val === 'BACKSPACE') {
      const updated = cleanCurrent.slice(0, -1);
      setDocInput(formatDocument(updated));
      return;
    }

    if (cleanCurrent.length < 14) {
      const updated = cleanCurrent + val;
      setDocInput(formatDocument(updated));
    }
  };

  const handleConsultar = async () => {
    resetInactivityTimer();
    const cleanDoc = docInput.replace(/\D/g, '');

    if (!cleanDoc) {
      setErrorMsg('Por favor, informe seu CPF ou CNPJ no teclado abaixo.');
      return;
    }

    if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
      setErrorMsg('Documento incompleto. Digite todos os números do seu CPF ou CNPJ.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/segunda-via/consultar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf_cnpj: cleanDoc }),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Nenhum contrato encontrado para este CPF/CNPJ.');
      }

      setResult(data.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Não foi possível consultar suas faturas no momento. Solicite ajuda no balcão.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Suporte a digitação via Teclado Físico / Leitor de Código de Barras
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetInactivityTimer();

      // Se estiver na tela de resultado, Escape ou Enter reinicia o atendimento
      if (result) {
        if (e.key === 'Escape') {
          handleReset();
        }
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleKeypadPress(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeypadPress('BACKSPACE');
      } else if (e.key === 'Delete' || e.key === 'Escape') {
        e.preventDefault();
        handleKeypadPress('CLEAR');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!loading && docInput) {
          handleConsultar();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docInput, result, loading]);

  const handleReset = () => {
    setDocInput('');
    setResult(null);
    setErrorMsg(null);
    setCopiedId(null);
    setSecondsRemaining(90);
  };

  const handleCopyText = (text: string, id: string | number) => {
    resetInactivityTimer();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(String(id));
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handlePrintPdf = (url: string) => {
    resetInactivityTimer();
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between selection:bg-nuvv-purple select-none overflow-x-hidden">
      <SEO
        title="Totem de Autoatendimento | Nuvv 2ª Via & PIX"
        description="Terminal de autoatendimento interativo para consulta rápida de 2ª via e pagamento instantâneo via PIX QR Code."
      />

      {/* 1. Header do Totem (Fullscreen Kiosk Header) */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 sm:px-12 py-4 flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <img
            src="/images/external/nuvv_logo_dark.png"
            alt="Nuvv"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <div className="hidden sm:block border-l border-slate-700 pl-4">
            <span className="text-xs font-black uppercase tracking-widest text-nuvv-green block">
              Terminal de Autoatendimento
            </span>
            <span className="text-sm font-semibold text-gray-300">
              2ª Via de Fatura & Pagamento PIX
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Live Digital Clock */}
          <div className="text-right hidden sm:block">
            <div className="text-2xl font-black text-white tracking-wider">{currentTime}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase">Horário de Brasília</div>
          </div>

          {/* Reset / Sair Button */}
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-rose-950 border border-slate-700 hover:border-rose-600 text-gray-300 hover:text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Novo Atendimento</span>
          </button>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col justify-center">
        {!result ? (
          /* Tela 1: Teclado Virtual & Consulta */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Instructions */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-nuvv-purple/30 border border-nuvv-purple/50 text-indigo-200 text-xs font-black uppercase tracking-wider">
                <Zap className="w-4 h-4 text-nuvv-green" />
                <span>Rápido, Fácil e Seguro</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Consulte sua fatura e pague com{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nuvv-purple via-indigo-300 to-nuvv-green">
                  PIX na tela
                </span>
                .
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Digite o número do <strong>CPF</strong> ou <strong>CNPJ</strong> do titular usando a tela sensível ao toque.
              </p>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2 font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Baixa e Desbloqueio Instantâneo</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Ao pagar pelo QR Code PIX, a liberação de velocidade ocorre de forma 100% automática em seu sinal de internet.
                </p>
              </div>
            </div>

            {/* Right Display & Virtual Keypad */}
            <div className="lg:col-span-7 bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              {/* Document Display */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                  CPF ou CNPJ do Titular:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={docInput}
                    onChange={(e) => {
                      resetInactivityTimer();
                      setDocInput(formatDocument(e.target.value.replace(/\D/g, '')));
                    }}
                    placeholder="000.000.000-00"
                    maxLength={18}
                    disabled={loading}
                    className="w-full py-4 px-5 rounded-2xl bg-slate-900 border-2 border-nuvv-purple/80 text-white font-black text-2xl sm:text-3xl tracking-wider text-center min-h-[72px] focus:outline-none focus:ring-4 focus:ring-nuvv-purple/40 focus:border-nuvv-green transition-all placeholder:text-slate-600 placeholder:font-bold shadow-inner cursor-text"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-950/90 border border-rose-600/80 flex items-start space-x-3 text-xs text-rose-200 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {/* Touch Virtual Numpad (Totem Keypad) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKeypadPress(num)}
                    disabled={loading}
                    className="py-4 sm:py-5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-nuvv-purple border border-slate-700 text-2xl sm:text-3xl font-black text-white shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    {num}
                  </button>
                ))}

                {/* Clear */}
                <button
                  type="button"
                  onClick={() => handleKeypadPress('CLEAR')}
                  disabled={loading}
                  className="py-4 sm:py-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:bg-rose-900 border border-slate-700 text-xs sm:text-sm font-black uppercase text-gray-300 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Limpar
                </button>

                {/* Zero */}
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                  disabled={loading}
                  className="py-4 sm:py-5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-nuvv-purple border border-slate-700 text-2xl sm:text-3xl font-black text-white shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  0
                </button>

                {/* Backspace */}
                <button
                  type="button"
                  onClick={() => handleKeypadPress('BACKSPACE')}
                  disabled={loading}
                  className="py-4 sm:py-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:bg-amber-900 border border-slate-700 text-xs sm:text-sm font-black uppercase text-gray-300 shadow-md active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Apagar"
                >
                  <Delete className="w-6 h-6 text-amber-400" />
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleConsultar}
                disabled={loading || !docInput}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-nuvv-purple to-indigo-600 hover:from-indigo-600 hover:to-nuvv-purple text-white font-black text-lg sm:text-xl uppercase tracking-wider shadow-xl shadow-nuvv-purple/30 active:scale-98 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin text-nuvv-green" />
                    <span>Consultando faturas no sistema...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6 text-nuvv-green" />
                    <span>Consultar Faturas</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Tela 2: Resultados com QR Code Gigante na Tela */
          <div className="space-y-6 animate-fade-in max-w-5xl mx-auto w-full">
            {/* Header com Identificação */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center space-x-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-nuvv-purple/30 text-nuvv-green border border-nuvv-purple/50 flex items-center justify-center font-black text-xl">
                  N+
                </div>
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">
                    Titular Identificado
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {result.cliente.nome_mascarado}
                  </h2>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {result.esta_em_dia ? (
                  <span className="px-4 py-2 bg-emerald-950 border border-emerald-500 text-emerald-300 font-black text-sm rounded-full flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CONTA EM DIA</span>
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-rose-950 border border-rose-500 text-rose-300 font-black text-sm rounded-full flex items-center space-x-2 animate-pulse">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>
                      {result.total_vencidas} {result.total_vencidas === 1 ? 'FATURA VENCIDA' : 'FATURAS VENCIDAS'}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* If No Invoices */}
            {result.faturamentos.length === 0 && (
              <div className="p-12 rounded-3xl bg-slate-950 border border-emerald-500/50 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Tudo 100% em dia!
                  </h3>
                  <p className="text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
                    Não identificamos débitos pendentes em aberto para o seu documento. Muito obrigado por ser cliente Nuvv!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-4 rounded-2xl bg-nuvv-purple hover:bg-nuvv-purple-hover text-white font-black text-base uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  Finalizar Atendimento
                </button>
              </div>
            )}

            {/* Invoices List with Large QR Code */}
            <div className="grid grid-cols-1 gap-6">
              {result.faturamentos.map((fat) => {
                const isCopied = copiedId === String(fat.id_faturamento);

                return (
                  <div
                    key={fat.id_faturamento}
                    className={`p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 transition-all shadow-2xl space-y-6 ${
                      fat.esta_vencido
                        ? 'border-rose-500/90 shadow-rose-950/50'
                        : 'border-nuvv-purple/80 shadow-indigo-950/50'
                    }`}
                  >
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-800 gap-2">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                          Serviço / Referência
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {fat.referencia}
                        </h3>
                      </div>

                      <span
                        className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider ${
                          fat.status_rotulo === 'VENCIDO'
                            ? 'bg-rose-900 text-rose-200 border border-rose-500'
                            : fat.status_rotulo === 'VENCE HOJE'
                            ? 'bg-amber-900 text-amber-200 border border-amber-500 animate-pulse'
                            : 'bg-indigo-950 text-indigo-200 border border-indigo-500'
                        }`}
                      >
                        {fat.status_rotulo}
                      </span>
                    </div>

                    {/* QR Code & Payment Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      {/* Left: Giant QR Code */}
                      {fat.pix_copia_cola && (
                        <div className="md:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-950 text-center space-y-3 shadow-xl">
                          <div className="p-2 bg-white rounded-xl">
                            <QRCodeSVG
                              value={fat.pix_copia_cola}
                              size={230}
                              level="M"
                              includeMargin={true}
                            />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-sm font-black text-nuvv-purple uppercase tracking-wider block flex items-center justify-center space-x-1.5">
                              <QrCode className="w-4 h-4" />
                              <span>Pague com PIX pelo Celular</span>
                            </span>
                            <span className="text-xs text-gray-600 block">
                              Abra o app do seu banco e aponte a câmera
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Right: Values, Barcode and Print */}
                      <div className={`space-y-4 ${fat.pix_copia_cola ? 'md:col-span-6' : 'md:col-span-12'}`}>
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-bold">Vencimento:</span>
                            <span className="text-base font-extrabold text-white flex items-center space-x-1.5">
                              <Clock className="w-4 h-4 text-nuvv-green" />
                              <span>{fat.data_vencimento}</span>
                            </span>
                          </div>

                          <div className="flex justify-between items-center border-t border-slate-800 pt-2">
                            <span className="text-xs text-gray-400 font-bold">Valor Total:</span>
                            <span className="text-3xl font-black text-nuvv-green">
                              {fat.valor}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2.5">
                          {fat.pix_copia_cola && (
                            <button
                              type="button"
                              onClick={() => handleCopyText(fat.pix_copia_cola, fat.id_faturamento)}
                              className={`w-full py-4 px-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                                isCopied
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-nuvv-purple hover:bg-nuvv-purple-hover text-white shadow-lg'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-5 h-5" />
                                  <span>Código PIX Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-5 h-5" />
                                  <span>Copiar Código PIX</span>
                                </>
                              )}
                            </button>
                          )}

                          {fat.url_pdf && (
                            <button
                              type="button"
                              onClick={() => handlePrintPdf(fat.url_pdf)}
                              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-gray-200 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                            >
                              <Printer className="w-4 h-4 text-nuvv-purple" />
                              <span>Imprimir Boleto / Visualizar PDF</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer do Totem com Temporizador de Privacidade */}
      <footer className="bg-slate-950/80 border-t border-slate-800 px-6 sm:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2 z-30">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Ambiente Seguro • Proteção de Dados LGPD</span>
        </div>

        <div className="flex items-center space-x-3">
          <span>Tempo de sessão:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-white font-mono font-bold text-xs border border-slate-700">
            {secondsRemaining}s
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-nuvv-green hover:underline cursor-pointer"
          >
            Encerrar
          </button>
        </div>
      </footer>
    </div>
  );
};
