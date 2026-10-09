import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  Phone,
  Mail,
  MessageSquare,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Save,
  RotateCcw,
} from 'lucide-react';
import { apiService, PortalContactItem } from '../../services/apiService';

export const ContactsManager: React.FC = () => {
  const [contacts, setContacts] = useState<PortalContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<PortalContactItem | null>(null);
  const [formData, setFormData] = useState<Omit<PortalContactItem, 'id'>>({
    name: '',
    department: 'Suporte & Engenharia',
    role: '',
    extension: '',
    phone: '(11) 4741-9000',
    whatsapp: '',
    email: '',
    notes: '',
    isEmergency: false,
  });

  const loadContacts = async () => {
    setLoading(true);
    try {
      const res = await apiService.getAdminContacts();
      if (res.success && res.contacts) {
        setContacts(res.contacts);
      } else {
        setFeedback({ type: 'error', message: res.message || 'Erro ao carregar contatos.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Falha de conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      department: 'Suporte & Engenharia',
      role: '',
      extension: '',
      phone: '(11) 4741-9000',
      whatsapp: '',
      email: '',
      notes: '',
      isEmergency: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact: PortalContactItem) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      department: contact.department,
      role: contact.role,
      extension: contact.extension,
      phone: contact.phone,
      whatsapp: contact.whatsapp || '',
      email: contact.email,
      notes: contact.notes || '',
      isEmergency: Boolean(contact.isEmergency),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja remover este contato da listagem corporativa?')) return;

    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    await persistContacts(updated, 'Contato removido com sucesso!');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.extension.trim()) {
      showFeedback('error', 'Nome e ramal interno são obrigatórios.');
      return;
    }

    let updated: PortalContactItem[];
    if (editingContact) {
      updated = contacts.map((c) =>
        c.id === editingContact.id ? { ...c, ...formData } : c
      );
    } else {
      const newId = contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;
      const newContact: PortalContactItem = {
        id: newId,
        ...formData,
      };
      updated = [...contacts, newContact];
    }

    setContacts(updated);
    setIsModalOpen(false);
    await persistContacts(updated, editingContact ? 'Contato atualizado com sucesso!' : 'Novo contato adicionado!');
  };

  const persistContacts = async (list: PortalContactItem[], successMsg: string) => {
    setSaving(true);
    try {
      const res = await apiService.saveAdminContacts(list);
      if (res.success) {
        showFeedback('success', successMsg);
      } else {
        showFeedback('error', res.message || 'Erro ao sincronizar com o servidor.');
      }
    } catch {
      showFeedback('error', 'Erro ao salvar alterações no servidor.');
    } finally {
      setSaving(false);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const s = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(s) ||
      c.department.toLowerCase().includes(s) ||
      c.extension.includes(s) ||
      (c.role && c.role.toLowerCase().includes(s)) ||
      (c.notes && c.notes.toLowerCase().includes(s))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-teal-400" />
              Contatos & Ramais Corporativos
            </h2>
            <span className="text-[10px] font-mono font-bold bg-teal-950 text-teal-400 px-2 py-0.5 rounded border border-teal-500/30">
              {contacts.length} REGISTROS
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Gerencie os telefones, ramais e horários exibidos aos colaboradores no Portal do Colaborador.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadContacts}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            title="Recarregar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Atualizar</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Contato</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 border ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
              : 'bg-red-950/40 text-red-300 border-red-800/60'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Barra de Busca */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filtrar por nome, setor, ramal ou observações..."
          className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
        />
      </div>

      {/* Tabela de Contatos */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-500 space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-400" />
          <p>Carregando contatos corporativos...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl space-y-2">
          <Phone className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">Nenhum contato encontrado</h3>
          <p className="text-xs text-slate-400">Clique em "Adicionar Contato" para incluir novos ramais.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-4">Nome & Função</th>
                  <th className="px-5 py-4">Departamento</th>
                  <th className="px-5 py-4">Ramal</th>
                  <th className="px-5 py-4 hidden md:table-cell">Telefone / WhatsApp</th>
                  <th className="px-5 py-4 hidden lg:table-cell">E-mail</th>
                  <th className="px-5 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{contact.name}</span>
                          {contact.isEmergency && (
                            <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-black uppercase">
                              Plantão 24h
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{contact.role || '—'}</div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-teal-300 text-[11px] font-semibold border border-slate-700/60">
                        {contact.department}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono font-black text-teal-300 text-xs bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                        {contact.extension}
                      </span>
                    </td>

                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <div className="text-white font-medium">{contact.phone}</div>
                        {contact.whatsapp && (
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp: {contact.whatsapp}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-slate-400 font-mono text-[11px]">{contact.email || '—'}</span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(contact)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-teal-400" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors border border-red-800/40"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Adição / Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-teal-400" />
                {editingContact ? 'Editar Contato Corporativo' : 'Adicionar Novo Contato'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Preencha os dados de contato e ramal interno da Nuvv Telecom.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Nome / Setor Principal *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: NOC / Central de Operações"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Departamento *</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Ex: Suporte & Engenharia"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Função / Cargo</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ex: Plantão Técnico 24x7"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ramal Interno *</label>
                  <input
                    type="text"
                    required
                    value={formData.extension}
                    onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                    placeholder="Ex: 2001"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefone Principal</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ex: (11) 4741-9000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp (DDD + Número)</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="Ex: 11947419000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-mail Corporativo</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: noc@nuvv.com.br"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Observações / Horário</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ex: Plantão 24h para escalonamento de incidentes de rede..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.isEmergency}
                      onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-800 text-rose-500 focus:ring-0"
                    />
                    <span className="text-slate-300 font-semibold">Marcar como Plantão 24h / Emergência</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Salvando...' : 'Salvar Contato'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
