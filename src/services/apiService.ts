export interface ViabilityPayload {
  query_id?: number;
  name?: string;
  phone?: string;
  email?: string;
  cep: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  service_type?: string;
  has_feasibility: boolean;
  status?: 'VIAVEL' | 'INVIAVEL' | 'EM_ANALISE';
  plan_interested?: string;
  notes?: string;
}

export interface MatchedPolygonInfo {
  layer_id: string;
  layer_name: string;
  polygon_id?: string;
  polygon_name?: string;
  region?: string;
  pop?: string;
  technology?: string;
  properties?: Record<string, any>;
}

export interface ExternalViabilityCheckRequest {
  query?: string;
  number?: string;
  service_type?: 'residencial' | 'empresarial';
  latitude?: number;
  longitude?: number;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  plan_interested?: string;
}

export interface ExternalViabilityCheckResponse {
  success: boolean;
  query_id?: number;
  status: 'VIAVEL' | 'INVIAVEL' | 'EM_ANALISE';
  isAvailable: boolean;
  service_type: 'residencial' | 'empresarial';
  configured_layer: string;
  location: { latitude: number; longitude: number };
  display_name: string;
  matched_polygon?: MatchedPolygonInfo | null;
  all_matched_polygons?: MatchedPolygonInfo[];
  distance_to_nearest_meters: number;
  consulted_layers: string[];
  message: string;
  error?: string;
  details?: string;
}

export interface ExternalViabilityLayerInfo {
  id: string;
  filename: string;
  name: string;
  technology: string;
  color: string;
  polygon_count: number;
  enabled: boolean;
  is_primary: boolean;
  pop_id?: string;
  pop_name?: string;
}

export interface ExternalViabilityLayersResponse {
  success: boolean;
  externalApiUrl: string;
  layers: ExternalViabilityLayerInfo[];
  config: {
    residencial_layer: string;
    empresarial_layer: string;
  };
}

export interface CommercialLeadPayload {
  source_page: string;
  name?: string;
  company?: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  details?: string;
}

export interface AdminMetricsResponse {
  kpis: {
    totalPageviews: number;
    todayPageviews: number;
    uniqueVisitors: number;
    todayUniqueVisitors: number;
    totalViability: number;
    totalSubscribers: number;
    totalLeads: number;
  };
  topPages: Array<{ path: string; views: number }>;
  devices: Array<{ device: string; count: number }>;
  topCities: Array<{ city: string; count: number }>;
  last7Days: Array<{ date: string; views: number }>;
}

export const apiService = {
  // 1. Page View Tracking
  trackPageView: async (path: string, title?: string, city?: string) => {
    try {
      let sessionId = sessionStorage.getItem('nuvv_session_id');
      if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
        sessionStorage.setItem('nuvv_session_id', sessionId);
      }

      await fetch('/api/track/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          path,
          title: title || document.title,
          referrer: document.referrer || '',
          city: city || 'Suzano',
        }),
      });
    } catch {
      // Fail silently for tracking
    }
  },

  // 2. External Geospatial Viability Engine
  checkViability: async (params: ExternalViabilityCheckRequest): Promise<ExternalViabilityCheckResponse> => {
    try {
      const res = await fetch('/api/viability/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      console.error('Falha ao conectar com endpoint /api/viability/check:', err);
      return {
        success: false,
        status: 'EM_ANALISE',
        isAvailable: false,
        service_type: params.service_type || 'residencial',
        configured_layer: params.service_type === 'empresarial' ? 'ihs___sp' : 'suzano_poa',
        location: { latitude: params.latitude || -23.5425, longitude: params.longitude || -46.3108 },
        display_name: params.query || '',
        distance_to_nearest_meters: 0,
        consulted_layers: [],
        message: 'Falha temporária ao consultar viabilidade. Nossa equipe técnica analisará seu endereço.',
        error: err.message,
      };
    }
  },

  getExternalViabilityLayers: async (): Promise<ExternalViabilityLayersResponse> => {
    try {
      const res = await fetch('/api/viability/layers');
      return await res.json();
    } catch (err: any) {
      console.warn('Could not fetch external viability layers:', err);
      return {
        success: false,
        externalApiUrl: 'https://nuvv-digital-viabilidade.yuajnb.easypanel.host',
        layers: [],
        config: {
          residencial_layer: 'suzano_poa',
          empresarial_layer: 'ihs___sp',
        },
      };
    }
  },

  updateViabilityConfig: async (config: { residencial_layer?: string; empresarial_layer?: string }) => {
    const res = await fetch('/api/admin/viability/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return await res.json();
  },

  // 2.1 Viability Logging & Lead Enrichment
  logViabilityQuery: async (data: ViabilityPayload) => {
    try {
      const res = await fetch('/api/viability/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.warn('API logging viability offline, stored locally:', err);
      return { success: false };
    }
  },

  // 3. Newsletter Subscription
  subscribeNewsletter: async (email: string, name?: string, source: string = 'footer') => {
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source }),
      });
      return await res.json();
    } catch (err) {
      console.warn('Newsletter API offline, saving to localStorage:', err);
      return { success: true, localOnly: true };
    }
  },

  // 4. Commercial Lead
  logCommercialLead: async (lead: CommercialLeadPayload) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      return await res.json();
    } catch (err) {
      console.warn('API leads offline:', err);
      return { success: false };
    }
  },

  // 5. Admin Endpoints
  getHealth: async () => {
    const res = await fetch('/api/health');
    return await res.json();
  },

  getMetrics: async (): Promise<{ success: boolean; data: AdminMetricsResponse }> => {
    const res = await fetch('/api/admin/metrics');
    return await res.json();
  },

  getViability: async (filters: { status?: string; city?: string; limit?: number }) => {
    const query = new URLSearchParams();
    if (filters.status) query.append('status', filters.status);
    if (filters.city) query.append('city', filters.city);
    if (filters.limit) query.append('limit', String(filters.limit));

    const res = await fetch(`/api/admin/viability?${query.toString()}`);
    return await res.json();
  },

  getNewsletter: async () => {
    const res = await fetch('/api/admin/newsletter');
    return await res.json();
  },

  broadcastBlogPost: async (post: { title: string; excerpt?: string; category?: string; slug?: string }) => {
    const res = await fetch('/api/admin/newsletter/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return await res.json();
  },

  getLeads: async () => {
    const res = await fetch('/api/admin/leads');
    return await res.json();
  },

  getSmtpConfig: async () => {
    const res = await fetch('/api/admin/smtp');
    return await res.json();
  },

  saveSmtpConfig: async (config: {
    host?: string;
    port?: number;
    secure?: boolean;
    user?: string;
    pass?: string;
    from?: string;
    adminEmail?: string;
  }) => {
    const res = await fetch('/api/admin/smtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return await res.json();
  },

  testSmtp: async (targetEmail: string) => {
    const res = await fetch('/api/admin/smtp/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetEmail }),
    });
    return await res.json();
  },

  // 6. Coverage & GeoJSON Layers Management
  getCoverageLayers: async () => {
    try {
      const res = await fetch('/api/coverage/layers');
      return await res.json();
    } catch (err) {
      console.warn('Could not fetch remote coverage layers:', err);
      return { success: false, custom: false, data: null };
    }
  },

  saveCoverageLayers: async (layers: any) => {
    const res = await fetch('/api/admin/coverage/layers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ layers }),
    });
    return await res.json();
  },

  resetCoverageLayers: async () => {
    const res = await fetch('/api/admin/coverage/reset', {
      method: 'POST',
    });
    return await res.json();
  },

  getViabilityHeatmap: async () => {
    try {
      const res = await fetch('/api/admin/viability/heatmap');
      return await res.json();
    } catch (err) {
      console.warn('Could not fetch viability heatmap:', err);
      return { success: false, points: [] };
    }
  },

  // 7. Portal do Colaborador & Usuários
  portalLogin: async (email: string, password: string) => {
    const res = await fetch('/api/portal/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  },

  portalChangePassword: async (email: string, currentPassword: string, newPassword: string) => {
    const res = await fetch('/api/portal/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, currentPassword, newPassword }),
    });
    return await res.json();
  },

  getPortalUsers: async () => {
    const res = await fetch('/api/portal/users');
    return await res.json();
  },

  createPortalUser: async (userData: any) => {
    const res = await fetch('/api/portal/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await res.json();
  },

  updatePortalUser: async (id: number, userData: any) => {
    const res = await fetch(`/api/portal/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await res.json();
  },

  deletePortalUser: async (id: number) => {
    const res = await fetch(`/api/portal/users/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  },

  getPortalDocs: async () => {
    const res = await fetch('/api/portal/docs');
    return await res.json();
  },

  getPortalDoc: async (slug: string) => {
    const res = await fetch(`/api/portal/docs/${slug}`);
    return await res.json();
  },
};

export interface PortalUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  user_type: 'admin' | 'usuario';
  status: 'ativo' | 'bloqueado';
  created_at?: string;
  updated_at?: string;
}

export interface PortalDocSummary {
  slug: string;
  filename: string;
  title: string;
  size: number;
  updatedAt?: string;
}

export interface PortalDocDetail {
  slug: string;
  filename: string;
  title: string;
  content: string;
}


