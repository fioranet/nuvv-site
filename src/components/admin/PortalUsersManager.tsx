import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  RefreshCw,
  Phone,
  Mail,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { apiService, PortalUser } from '../../services/apiService';

export const PortalUsersManager: React.FC = () => {
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Consultor Comercial',
    user_type: 'usuario' as 'admin' | 'usuario',
    status: 'ativo' as 'ativo' | 'bloqueado',
    password: '',
  });
  const [saving, setSaving] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await apiService.getPortalUsers();
      if (res.success && res.users) {
        setUsers(res.users);
      } else {
        setFeedback({ type: 'error', message: res.message || 'Erro ao carregar usuários.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Falha de conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openNewModal = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Consultor Comercial',
      user_type: 'usuario',
      status: 'ativo',
      password: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: PortalUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role || 'Colaborador',
      user_type: user.user_type,
      status: user.status,
      password: '', // em branco para manter a atual
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      if (editingUser) {
        // Atualizar
        const payload: any = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          user_type: formData.user_type,
          status: formData.status,
        };
        if (formData.password.trim()) {
          payload.password = formData.password.trim();
        }

        const res = await apiService.updatePortalUser(editingUser.id, payload);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Usuário atualizado com sucesso!' });
          setIsModalOpen(false);
          loadUsers();
        } else {
          setFeedback({ type: 'error', message: res.message || 'Erro ao atualizar.' });
        }
      } else {
        // Criar Novo
        if (!formData.password.trim()) {
          setFeedback({ type: 'error', message: 'A senha é obrigatória para novos usuários.' });
          setSaving(false);
          return;
        }

        const res = await apiService.createPortalUser(formData);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Novo usuário criado com sucesso!' });
          setIsModalOpen(false);
          loadUsers();
        } else {
          setFeedback({ type: 'error', message: res.message || 'Erro ao cadastrar.' });
        }
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Erro ao processar requisição.' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (user: PortalUser) => {
    const newStatus = user.status === 'ativo' ? 'bloqueado' : 'ativo';
    try {
      const res = await apiService.updatePortalUser(user.id, { status: newStatus });
      if (res.success) {
        setFeedback({
          type: 'success',
          message: `Usuário ${user.name} foi ${newStatus === 'ativo' ? 'desbloqueado' : 'bloqueado'}.`,
        });
        loadUsers();
      } else {
        setFeedback({ type: 'error', message: res.message || 'Erro ao alterar status.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Falha de comunicação.' });
    }
  };

  const handleDelete = async (user: PortalUser) => {
    if (!window.confirm(`Tem certeza que deseja excluir o acesso de "${user.name}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const res = await apiService.deletePortalUser(user.id);
      if (res.success) {
        setFeedback({ type: 'success', message: 'Usuário excluído com sucesso.' });
        loadUsers();
      } else {
        setFeedback({ type: 'error', message: res.message || 'Erro ao excluir usuário.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Falha de conexão.' });
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.role && u.role.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-cyan-400" />
            Gestão de Usuários do Portal do Colaborador
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Controle de credenciais, cargos e níveis de acesso (Admin / Usuário) para manuais e treinamentos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Recarregar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
          <button
            onClick={openNewModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Alertas de Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 border ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
              : 'bg-red-950/40 text-red-300 border-red-800/60'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Barra de Busca e Estatísticas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>
            Total: <strong className="text-white">{users.length}</strong>
          </span>
          <span>•</span>
          <span>
            Ativos:{' '}
            <strong className="text-emerald-400">{users.filter((u) => u.status === 'ativo').length}</strong>
          </span>
          <span>•</span>
          <span>
            Admins:{' '}
            <strong className="text-amber-400">{users.filter((u) => u.user_type === 'admin').length}</strong>
          </span>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Colaborador</th>
                <th className="px-6 py-3.5">Contato</th>
                <th className="px-6 py-3.5">Cargo / Função</th>
                <th className="px-6 py-3.5">Nível</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyan-400 mb-2" />
                    Carregando usuários do portal...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Nenhum colaborador encontrado com os critérios digitados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center font-bold text-cyan-300 text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{user.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {user.phone || '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-medium text-slate-200">{user.role || 'Colaborador'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.user_type === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <ShieldCheck className="w-3 h-3" />
                          ADMINISTRADOR
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          <Shield className="w-3 h-3" />
                          USUÁRIO
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === 'ativo' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 font-semibold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                          Bloqueado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            user.status === 'ativo'
                              ? 'text-amber-400 hover:bg-amber-950/40 border-slate-700 hover:border-amber-500/40'
                              : 'text-emerald-400 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/40'
                          }`}
                          title={user.status === 'ativo' ? 'Bloquear Acesso' : 'Desbloquear Acesso'}
                        >
                          {user.status === 'ativo' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
                          title="Editar Dados e Senha"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-slate-700 hover:border-red-500/40 transition-colors"
                          title="Excluir Usuário"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro / Edição */}
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
                <Users className="w-5 h-5 text-cyan-400" />
                {editingUser ? 'Editar Usuário do Portal' : 'Cadastrar Novo Usuário'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {editingUser
                  ? 'Altere os dados cadastrais ou redefina a senha de acesso.'
                  : 'Preencha os dados do colaborador para liberar o acesso ao Portal.'}
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carlos@nuvv.com.br"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Telefone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cargo / Função</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ex: Consultor Comercial"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nível de Acesso</label>
                  <select
                    value={formData.user_type}
                    onChange={(e) => setFormData({ ...formData, user_type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="usuario">Usuário Comum (Apenas Portal)</option>
                    <option value="admin">Administrador (Admin + Portal)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {editingUser ? 'Redefinir Senha (opcional)' : 'Senha de Acesso *'}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUser ? 'Deixe vazio para manter atual' : 'Mínimo 6 caracteres'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status da Conta</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ativo">Ativo (Pode logar)</option>
                    <option value="bloqueado">Bloqueado (Acesso revogado)</option>
                  </select>
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
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : editingUser ? 'Atualizar Dados' : 'Criar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
