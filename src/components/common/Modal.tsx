import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  headerBanner?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  showCloseButton?: boolean;
  bodyClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  headerBanner,
  children,
  maxWidth = '2xl',
  showCloseButton = true,
  bodyClassName,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  }[maxWidth];

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthClasses} bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[min(90vh,880px)] flex flex-col my-auto border border-gray-100 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Caso 1: Cabeçalho com banner colorido customizado fixo no topo com base reta */}
        {headerBanner ? (
          <div className="flex-shrink-0 relative z-20 rounded-t-3xl rounded-b-none border-b border-gray-200/80 overflow-hidden bg-white">
            {headerBanner}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-5 z-30 p-2 text-white/90 hover:text-white bg-black/25 hover:bg-black/45 active:scale-95 backdrop-blur-md rounded-full transition-all shadow-md cursor-pointer flex items-center justify-center ring-1 ring-white/25"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : title ? (
          /* Caso 2: Título padrão fixo no topo com fundo branco e base reta */
          <div className="flex items-center justify-between px-6 sm:px-8 pt-5 pb-4 border-b border-gray-100 flex-shrink-0 bg-white sticky top-0 z-20 rounded-t-3xl rounded-b-none">
            <div className="pr-10 sm:pr-14">
              <h3 className="text-base sm:text-xl font-extrabold text-nuvv-dark leading-tight">{title}</h3>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{subtitle}</p>}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-auto cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : showCloseButton ? (
          /* Caso 3: Botão flutuante quando não há cabeçalho */
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2 text-white bg-slate-900/50 hover:bg-slate-900/80 active:scale-95 backdrop-blur-md rounded-full transition-all shadow-md cursor-pointer flex items-center justify-center ring-1 ring-white/20"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        ) : null}

        {/* Scrollable Content Body with Viewport Limits: rola apenas após o cabeçalho e com margens laterais confortáveis */}
        <div
          className={`overflow-y-auto overscroll-contain flex-1 custom-scrollbar ${
            bodyClassName || 'px-6 sm:px-8 py-5 sm:py-6'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
