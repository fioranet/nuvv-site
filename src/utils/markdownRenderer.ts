/**
 * Utilitário leve e seguro para converter Markdown em HTML estilizado com Tailwind CSS
 * Suporta: Títulos (H1-H4), Listas, Tabelas completas com cabeçalhos, Blocos de código, Citações e Ênfases.
 */

export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Normalizar quebras de linha
  html = html.replace(/\r\n/g, '\n');

  // 1. Blocos de Código (```lang ... ```)
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<div class="my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 font-mono text-xs">
      ${lang ? `<div class="bg-slate-900 px-4 py-1 text-[11px] text-cyan-400 font-bold border-b border-slate-800 uppercase tracking-wider">${lang}</div>` : ''}
      <pre class="p-4 overflow-x-auto text-slate-200"><code>${escapedCode}</code></pre>
    </div>`;
  });

  // 2. Tabelas Markdown (| th | th | ... |)
  html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableBlock) => {
    const lines = tableBlock.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return tableBlock;

    const parseRow = (rowStr: string) => {
      return rowStr
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map(cell => cell.trim());
    };

    const headerCells = parseRow(lines[0]);
    // Checar se linha 1 é o divisor (|---|---|)
    const isDivider = /^\|?[\s-:]+\|[\s-:|]+$/.test(lines[1]);
    const bodyLines = isDivider ? lines.slice(2) : lines.slice(1);

    const thead = `<thead class="bg-slate-950/80 border-b border-slate-800 text-slate-300 font-mono text-[11px] uppercase tracking-wider">
      <tr>
        ${headerCells.map(h => `<th class="px-4 py-3 font-bold text-left">${h}</th>`).join('')}
      </tr>
    </thead>`;

    const tbodyRows = bodyLines.map((line, idx) => {
      const cells = parseRow(line);
      const bgClass = idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/80';
      return `<tr class="${bgClass} border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
        ${cells.map(c => `<td class="px-4 py-2.5 text-xs text-slate-300">${c}</td>`).join('')}
      </tr>`;
    }).join('');

    return `<div class="my-5 overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
      <table class="w-full text-left border-collapse">
        ${thead}
        <tbody>${tbodyRows}</tbody>
      </table>
    </div>`;
  });

  // 3. Títulos (Headers)
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4 border-b border-slate-800 pb-3 flex items-center gap-2"><span class="text-cyan-400">#</span> $1</h1>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-white mt-7 mb-3 text-cyan-300">$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-base sm:text-lg font-bold text-teal-300 mt-5 mb-2">$1</h3>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-sm sm:text-base font-bold text-slate-200 mt-4 mb-2">$1</h4>');

  // 4. Citações e Alertas (> ...)
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="my-3 pl-4 py-1.5 border-l-4 border-cyan-400 bg-cyan-950/20 text-cyan-200 rounded-r-xl text-xs italic">$1</blockquote>');

  // 5. Linhas Horizontais (---)
  html = html.replace(/^---$/gm, '<hr class="my-6 border-slate-800" />');

  // 6. Listas Não-Ordenadas (- ou *)
  html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li class="flex items-start gap-2 my-1 text-slate-300"><span class="text-cyan-400 font-bold mt-1 text-[10px]">•</span><span>$1</span></li>');

  // 7. Listas Ordenadas (1. ...)
  html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<li class="flex items-start gap-2 my-1 text-slate-300"><span class="text-teal-400 font-mono font-bold text-xs">$1.</span><span>$2</span></li>');

  // 8. Negrito e Itálico
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic text-slate-200">$1</em>');

  // 9. Código Inline (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]">$1</code>');

  // 10. Links Markdown [texto](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline font-medium">$1</a>');

  // 11. Parágrafos gerais (linhas que não são tags HTML)
  const paragraphs = html.split('\n\n');
  const formatted = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || 
        trimmed.startsWith('<div') || 
        trimmed.startsWith('<blockquote') || 
        trimmed.startsWith('<table') || 
        trimmed.startsWith('<hr') || 
        trimmed.startsWith('<li')) {
      return trimmed;
    }
    return `<p class="my-3 text-xs sm:text-sm text-slate-300 leading-relaxed">${trimmed}</p>`;
  }).join('\n');

  return formatted;
}
