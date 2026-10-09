import React, { useState, useEffect, useRef } from 'react';
import {
  Folder,
  FolderPlus,
  Upload,
  FileCode,
  FileText,
  Image as ImageIcon,
  File,
  Search,
  RefreshCw,
  Copy,
  ExternalLink,
  Trash2,
  Edit3,
  Check,
  ChevronRight,
  HardDrive,
  Eye,
  Code2,
  X,
  AlertTriangle,
  FolderOpen,
  LayoutGrid,
  List,
} from 'lucide-react';
import {
  apiService,
  AdminFileItem,
  AdminFileBreadcrumb,
  AdminFileStats,
} from '../../services/apiService';

export const FileManager: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [breadcrumbs, setBreadcrumbs] = useState<AdminFileBreadcrumb[]>([
    { name: 'Raiz (/uploads)', path: '' },
  ]);
  const [items, setItems] = useState<AdminFileItem[]>([]);
  const [stats, setStats] = useState<AdminFileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'html' | 'pdf' | 'image' | 'other'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Feedback Toast
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modais
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editorFilename, setEditorFilename] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [savingFile, setSavingFile] = useState(false);

  const [renameItem, setRenameItem] = useState<AdminFileItem | null>(null);
  const [renameInput, setRenameInput] = useState('');

  // Drag and Drop Upload
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const loadFiles = async (folder: string = currentFolder) => {
    setLoading(true);
    try {
      const res = await apiService.getAdminFiles(folder);
      if (res.success) {
        setItems(res.items || []);
        setBreadcrumbs(res.breadcrumbs || [{ name: 'Raiz (/uploads)', path: '' }]);
        setCurrentFolder(res.currentFolder || '');
        setStats(res.stats || null);
      } else {
        showNotification('error', res.message || 'Erro ao carregar lista de arquivos.');
      }
    } catch (err: any) {
      showNotification('error', 'Falha ao conectar com o servidor para listar arquivos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles(currentFolder);
  }, [currentFolder]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      await handleUploadFiles(droppedFiles);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      await handleUploadFiles(selected);
      e.target.value = '';
    }
  };

  const handleUploadFiles = async (files: File[]) => {
    setUploading(true);
    try {
      const res = await apiService.uploadAdminFiles(currentFolder, files);
      if (res.success) {
        showNotification('success', res.message || `${files.length} arquivo(s) enviado(s) com sucesso.`);
        loadFiles(currentFolder);
      } else {
        showNotification('error', res.message || 'Erro ao enviar arquivo(s).');
      }
    } catch (err: any) {
      showNotification('error', 'Erro durante o upload de arquivos.');
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const res = await apiService.createAdminFolder(currentFolder, newFolderName.trim());
      if (res.success) {
        showNotification('success', res.message);
        setIsFolderModalOpen(false);
        setNewFolderName('');
        loadFiles(currentFolder);
      } else {
        showNotification('error', res.message);
      }
    } catch (err: any) {
      showNotification('error', 'Erro ao criar pasta.');
    }
  };

  const openNewHtmlEditor = () => {
    setEditorFilename('pagina-exemplo.html');
    setEditorContent(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentação Nuvv Telecom</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .container {
      max-width: 800px;
      width: 100%;
      background: #1e293b;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      border: 1px solid #334155;
    }
    h1 {
      color: #38bdf8;
      border-bottom: 2px solid #334155;
      padding-bottom: 12px;
    }
    p {
      line-height: 1.6;
      color: #cbd5e1;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">Nuvv Documentação</span>
    <h1>Termo / Documento Oficial</h1>
    <p>Esta página foi gerada diretamente pelo painel administrativo da Nuvv Telecom.</p>
    <p>Você pode editar este conteúdo livremente no painel e compartilhar a URL pública direta com seus clientes ou colaboradores.</p>
  </div>
</body>
</html>`);
    setEditorMode('edit');
    setIsEditorModalOpen(true);
  };

  const openEditFile = async (item: AdminFileItem) => {
    try {
      const res = await apiService.getAdminFileContent(item.relativePath);
      if (res.success) {
        setEditorFilename(item.name);
        setEditorContent(res.content);
        setEditorMode('edit');
        setIsEditorModalOpen(true);
      } else {
        showNotification('error', res.message || 'Não foi possível carregar o arquivo para edição.');
      }
    } catch (err: any) {
      showNotification('error', 'Falha ao buscar conteúdo do arquivo.');
    }
  };

  const handleSaveEditorFile = async () => {
    if (!editorFilename.trim()) {
      showNotification('error', 'Digite um nome para o arquivo.');
      return;
    }

    setSavingFile(true);
    try {
      const res = await apiService.saveAdminFile(currentFolder, editorFilename.trim(), editorContent);
      if (res.success) {
        showNotification('success', res.message);
        setIsEditorModalOpen(false);
        loadFiles(currentFolder);
      } else {
        showNotification('error', res.message);
      }
    } catch (err: any) {
      showNotification('error', 'Erro ao salvar arquivo.');
    } finally {
      setSavingFile(false);
    }
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameItem || !renameInput.trim()) return;

    try {
      const res = await apiService.renameAdminFile(renameItem.relativePath, renameInput.trim());
      if (res.success) {
        showNotification('success', res.message);
        setRenameItem(null);
        setRenameInput('');
        loadFiles(currentFolder);
      } else {
        showNotification('error', res.message);
      }
    } catch (err: any) {
      showNotification('error', 'Erro ao renomear item.');
    }
  };

  const handleDelete = async (item: AdminFileItem) => {
    const isDir = item.isDirectory;
    const confirmMsg = isDir
      ? `Tem certeza que deseja excluir a pasta "${item.name}" e todo o seu conteúdo?`
      : `Tem certeza que deseja excluir o arquivo "${item.name}"?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await apiService.deleteAdminFile(item.relativePath);
      if (res.success) {
        showNotification('success', res.message);
        loadFiles(currentFolder);
      } else {
        showNotification('error', res.message);
      }
    } catch (err: any) {
      showNotification('error', 'Erro ao excluir item.');
    }
  };

  const copyPublicUrl = (publicUrl?: string) => {
    if (!publicUrl) return;
    const origin = window.location.origin;
    const fullUrl = `${origin}${publicUrl}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedPath(publicUrl);
      showNotification('success', 'URL pública copiada para a área de transferência!');
      setTimeout(() => setCopiedPath(null), 2500);
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (bytes === undefined || bytes === null) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isEditable = (ext?: string) => {
    if (!ext) return false;
    const e = ext.toLowerCase();
    return ['.html', '.htm', '.txt', '.md', '.css', '.js', '.json', '.xml', '.svg'].includes(e);
  };

  const isImage = (ext?: string) => {
    if (!ext) return false;
    const e = ext.toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.ico'].includes(e);
  };

  const isPdf = (ext?: string) => {
    return ext?.toLowerCase() === '.pdf';
  };

  const isHtml = (ext?: string) => {
    const e = ext?.toLowerCase();
    return e === '.html' || e === '.htm';
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      if (!item.name.toLowerCase().includes(s)) return false;
    }

    if (item.isDirectory) return true; // keep folders visible

    if (typeFilter === 'html') return isHtml(item.extension);
    if (typeFilter === 'pdf') return isPdf(item.extension);
    if (typeFilter === 'image') return isImage(item.extension);
    if (typeFilter === 'other') return !isHtml(item.extension) && !isPdf(item.extension) && !isImage(item.extension);

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl text-sm font-bold shadow-2xl flex items-center space-x-2 transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-600 text-white shadow-emerald-500/20'
              : 'bg-rose-600 text-white shadow-rose-500/20'
          }`}
        >
          {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center space-x-2">
                <span>Gerenciador de Arquivos & FTP Online</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800/60 font-mono">
                  /uploads
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Suba páginas HTML, PDFs, contratos e imagens. Cada arquivo tem sua URL pública direta e permanente na web.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
          >
            <Upload className={`w-4 h-4 ${uploading ? 'animate-bounce' : ''}`} />
            <span>{uploading ? 'Enviando...' : 'Enviar Arquivos'}</span>
          </button>

          <button
            type="button"
            onClick={openNewHtmlEditor}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span>Criar Página HTML</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setNewFolderName('');
              setIsFolderModalOpen(true);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-amber-400" />
            <span>Nova Pasta</span>
          </button>

          <button
            type="button"
            onClick={() => loadFiles(currentFolder)}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 text-xs transition-colors cursor-pointer"
            title="Atualizar pasta"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400">
              <File className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Total Arquivos</span>
              <span className="text-lg font-black text-white">{stats.totalFiles}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Páginas HTML</span>
              <span className="text-lg font-black text-emerald-400">{stats.htmlFiles}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Documentos PDF</span>
              <span className="text-lg font-black text-rose-400">{stats.pdfFiles}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Imagens</span>
              <span className="text-lg font-black text-purple-400">{stats.imageFiles}</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block font-medium">Armazenamento</span>
              <span className="text-lg font-black text-white">{formatFileSize(stats.totalSize)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Breadcrumb & Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Breadcrumb Path */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-bold custom-scrollbar py-1">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.path}>
                <button
                  type="button"
                  onClick={() => setCurrentFolder(crumb.path)}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isLast
                      ? 'bg-slate-800 text-sky-400 font-black'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {idx === 0 ? <HardDrive className="w-3.5 h-3.5" /> : <Folder className="w-3.5 h-3.5" />}
                  <span>{crumb.name}</span>
                </button>
                {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Search & View Mode Controls */}
        <div className="flex items-center space-x-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar no diretório..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 w-44 sm:w-56"
            />
          </div>

          {/* Type Filters */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
            {(['all', 'html', 'pdf', 'image', 'other'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-lg transition-all capitalize cursor-pointer ${
                  typeFilter === t
                    ? 'bg-sky-500 text-slate-950 font-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t === 'all' ? 'Todos' : t === 'html' ? 'HTML' : t === 'pdf' ? 'PDF' : t === 'image' ? 'Imagens' : 'Outros'}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-800 text-sky-400' : 'text-gray-400 hover:text-white'
              }`}
              title="Visualização em Grade"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-800 text-sky-400' : 'text-gray-400 hover:text-white'
              }`}
              title="Visualização em Lista"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Drag & Drop Dropzone Overlay Wrapper */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative transition-all ${
          isDragging
            ? 'border-2 border-dashed border-sky-400 bg-sky-950/20 rounded-2xl p-4 scale-[1.005]'
            : ''
        }`}
      >
        {isDragging && (
          <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center space-y-3 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-sky-400 animate-pulse">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-black text-white">Solte os arquivos aqui para enviar</p>
            <p className="text-xs text-sky-300">Eles serão salvos diretamente na pasta atual: /{currentFolder || 'uploads'}</p>
          </div>
        )}

        {/* Content State: Loading, Empty or Items */}
        {loading ? (
          <div className="p-16 text-center text-gray-400 space-y-3 bg-slate-900/50 rounded-2xl border border-slate-800">
            <RefreshCw className="w-8 h-8 mx-auto animate-spin text-sky-400" />
            <p className="text-sm font-bold">Lendo arquivos e diretórios...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 text-center text-gray-400 space-y-4 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center text-gray-500">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-300">Esta pasta está vazia</p>
              <p className="text-xs text-gray-500 mt-1">
                Arraste arquivos para cá, clique em "Enviar Arquivos" ou "Criar Página HTML".
              </p>
            </div>
            <div className="flex justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs font-bold hover:bg-sky-500/30 transition-all cursor-pointer"
              >
                Enviar Primeiro Arquivo
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              if (item.isDirectory) {
                return (
                  <div
                    key={item.relativePath}
                    className="group p-4 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between space-y-3 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-amber-500/5"
                    onClick={() => setCurrentFolder(item.relativePath)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                        <Folder className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            setRenameItem(item);
                            setRenameInput(item.name);
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          title="Renomear pasta"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="p-1.5 rounded-lg hover:bg-rose-950/60 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Excluir pasta"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-gray-400">
                        <span>{item.itemsCount || 0} item(ns)</span>
                        <span>•</span>
                        <span>{formatDate(item.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // FILE CARD
              const isItemHtml = isHtml(item.extension);
              const isItemPdf = isPdf(item.extension);
              const isItemImg = isImage(item.extension);
              const isItemEdit = isEditable(item.extension);

              return (
                <div
                  key={item.relativePath}
                  className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                >
                  {/* File Preview / Header */}
                  <div className="relative">
                    {isItemImg ? (
                      <div className="w-full h-32 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden relative flex items-center justify-center group-hover:border-purple-500/40 transition-colors">
                        <img
                          src={item.publicUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-purple-950/80 text-purple-300 border border-purple-500/30">
                          {item.extension?.toUpperCase().replace('.', '')}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`w-full h-24 rounded-xl flex items-center justify-center relative border transition-colors ${
                          isItemHtml
                            ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/40'
                            : isItemPdf
                            ? 'bg-rose-950/20 border-rose-500/20 text-rose-400 group-hover:border-rose-500/40'
                            : 'bg-slate-950 border-slate-800 text-sky-400 group-hover:border-sky-500/40'
                        }`}
                      >
                        {isItemHtml ? (
                          <FileCode className="w-10 h-10" />
                        ) : isItemPdf ? (
                          <FileText className="w-10 h-10" />
                        ) : (
                          <File className="w-10 h-10" />
                        )}

                        <span
                          className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black border ${
                            isItemHtml
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                              : isItemPdf
                              ? 'bg-rose-950 text-rose-300 border-rose-500/30'
                              : 'bg-slate-900 text-gray-300 border-slate-700'
                          }`}
                        >
                          {item.extension?.toUpperCase().replace('.', '') || 'FILE'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="min-w-0">
                    <h3
                      className="font-bold text-sm text-white truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1 text-[11px] text-gray-400">
                      <span>{formatFileSize(item.size)}</span>
                      <span>•</span>
                      <span>{formatDate(item.updatedAt)}</span>
                    </div>

                    {/* Online Public URL Pill */}
                    <div className="mt-2.5 p-1.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between space-x-1.5">
                      <span className="text-[10px] text-sky-400 font-mono truncate select-all">
                        {item.publicUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyPublicUrl(item.publicUrl)}
                        className={`p-1 rounded flex-shrink-0 transition-colors cursor-pointer ${
                          copiedPath === item.publicUrl
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'hover:bg-slate-800 text-gray-400 hover:text-white'
                        }`}
                        title="Copiar URL Completa"
                      >
                        {copiedPath === item.publicUrl ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {/* Open in New Tab */}
                      <a
                        href={item.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 text-gray-300 hover:text-sky-300 transition-colors text-xs flex items-center space-x-1"
                        title="Abrir página / arquivo em nova aba"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">Abrir</span>
                      </a>

                      {/* Edit Inline (HTML, TXT, MD, etc.) */}
                      {isItemEdit && (
                        <button
                          type="button"
                          onClick={() => openEditFile(item)}
                          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-emerald-500/20 text-gray-300 hover:text-emerald-300 transition-colors text-xs flex items-center space-x-1 cursor-pointer"
                          title="Editar código / conteúdo online"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">Editar</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => {
                          setRenameItem(item);
                          setRenameInput(item.name);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Renomear"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="p-1.5 rounded-lg hover:bg-rose-950/60 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Excluir arquivo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-gray-400 uppercase font-black tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Caminho Online</th>
                    <th className="py-3 px-4">Tamanho</th>
                    <th className="py-3 px-4">Última Modificação</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-gray-200">
                  {filteredItems.map((item) => {
                    const isDir = item.isDirectory;
                    const isItemHtml = isHtml(item.extension);
                    const isItemPdf = isPdf(item.extension);
                    const isItemEdit = isEditable(item.extension);

                    return (
                      <tr
                        key={item.relativePath}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div
                            className={`flex items-center space-x-2.5 ${
                              isDir ? 'cursor-pointer hover:text-amber-400' : ''
                            }`}
                            onClick={() => isDir && setCurrentFolder(item.relativePath)}
                          >
                            {isDir ? (
                              <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            ) : isItemHtml ? (
                              <FileCode className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            ) : isItemPdf ? (
                              <FileText className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            ) : isImage(item.extension) ? (
                              <ImageIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            ) : (
                              <File className="w-4 h-4 text-sky-400 flex-shrink-0" />
                            )}
                            <span className="font-bold text-white">{item.name}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          {isDir ? (
                            <span className="text-gray-500 font-mono text-[11px]">pasta interna</span>
                          ) : (
                            <div className="flex items-center space-x-1.5 max-w-xs">
                              <span className="text-[11px] text-sky-400 font-mono truncate select-all">
                                {item.publicUrl}
                              </span>
                              <button
                                type="button"
                                onClick={() => copyPublicUrl(item.publicUrl)}
                                className="p-1 rounded hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                                title="Copiar URL"
                              >
                                {copiedPath === item.publicUrl ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 text-gray-400 font-mono">
                          {isDir ? `${item.itemsCount || 0} itens` : formatFileSize(item.size)}
                        </td>

                        <td className="py-3 px-4 text-gray-400">
                          {formatDate(item.updatedAt)}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            {!isDir && (
                              <>
                                <a
                                  href={item.publicUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg hover:bg-slate-800 text-sky-400 transition-colors"
                                  title="Abrir em nova aba"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                {isItemEdit && (
                                  <button
                                    type="button"
                                    onClick={() => openEditFile(item)}
                                    className="p-1.5 rounded-lg hover:bg-slate-800 text-emerald-400 transition-colors cursor-pointer"
                                    title="Editar Código"
                                  >
                                    <Code2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setRenameItem(item);
                                setRenameInput(item.name);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                              title="Renomear"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              className="p-1.5 rounded-lg hover:bg-rose-950/60 text-gray-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Excluir"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: NOVA PASTA */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <FolderPlus className="w-5 h-5 text-amber-400" />
                <span>Criar Nova Pasta</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsFolderModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Nome da Pasta
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="ex: documentos, manuais, contratos"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                />
                <span className="text-[11px] text-gray-500 mt-1 block">
                  A pasta será criada em: <strong>/uploads/{currentFolder ? `${currentFolder}/` : ''}</strong>
                </span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20"
                >
                  Criar Pasta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RENOMEAR ITEM */}
      {renameItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-sky-400" />
                <span>Renomear {renameItem.isDirectory ? 'Pasta' : 'Arquivo'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setRenameItem(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRename} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">
                  Novo Nome
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRenameItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-gray-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20"
                >
                  Salvar Nome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITOR HTML & CÓDIGO ONLINE COM LIVE PREVIEW */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <FileCode className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editorFilename}
                      onChange={(e) => setEditorFilename(e.target.value)}
                      placeholder="nome-do-arquivo.html"
                      className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-emerald-500 max-w-xs"
                    />
                    <span className="text-[11px] text-gray-400 hidden sm:inline">
                      (em: /{currentFolder || 'uploads'})
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">
                    URL Online: /uploads/{currentFolder ? `${currentFolder}/` : ''}{editorFilename || 'arquivo.html'}
                  </span>
                </div>
              </div>

              {/* View Switcher: Code vs Preview */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditorMode('edit')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      editorMode === 'edit'
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Código</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('preview')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      editorMode === 'preview'
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar Página</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSaveEditorFile}
                  disabled={savingFile}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{savingFile ? 'Salvando...' : 'Salvar Página'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick HTML Boilerplate Helper Bar */}
            {editorMode === 'edit' && (
              <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[11px] text-gray-400">
                <span className="font-bold text-gray-500 flex-shrink-0">Inserir rápido:</span>
                <button
                  type="button"
                  onClick={() => setEditorContent((prev) => prev + '\n<div class="card">\n  <h2>Título</h2>\n  <p>Texto</p>\n</div>')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono transition-colors"
                >
                  + Bloco Card
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent((prev) => prev + '\n<button style="padding: 10px 20px; background: #38bdf8; color: #000; font-weight: bold; border-radius: 8px; border: none; cursor: pointer;">Clique Aqui</button>')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono transition-colors"
                >
                  + Botão CTA
                </button>
                <button
                  type="button"
                  onClick={() => setEditorContent((prev) => prev + '\n<img src="URL_DA_IMAGEM" alt="Foto" style="max-width: 100%; border-radius: 8px;">')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono transition-colors"
                >
                  + Imagem
                </button>
              </div>
            )}

            {/* Modal Body: Code or Live Iframe */}
            <div className="flex-1 bg-slate-950 overflow-hidden relative">
              {editorMode === 'edit' ? (
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  placeholder="Escreva seu código HTML, CSS ou texto aqui..."
                  className="w-full h-full p-4 bg-slate-950 text-gray-200 font-mono text-xs sm:text-sm leading-relaxed outline-none resize-none selection:bg-emerald-500/30 selection:text-white"
                  spellCheck={false}
                />
              ) : (
                <iframe
                  title="Pré-visualização da página"
                  srcDoc={editorContent}
                  sandbox="allow-scripts"
                  className="w-full h-full bg-white border-0"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-gray-400">
              <div>
                <span>Linhas: <strong>{editorContent.split('\n').length}</strong></span>
                <span className="mx-2">•</span>
                <span>Tamanho: <strong>{formatFileSize(new Blob([editorContent]).size)}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditorFile}
                  disabled={savingFile}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                >
                  {savingFile ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
