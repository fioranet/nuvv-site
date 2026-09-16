import { maskName, formatDate, formatCurrency, parseDateLocal } from './validatorService.js';

// Cache do Token Bearer em memória
let cachedToken = null;
let tokenExpiresAt = 0;

/**
 * Obter as configurações do Hubsoft a partir de variáveis de ambiente ou fallbacks seguros
 */
export function getHubsoftConfig() {
  return {
    baseUrl: (process.env.HUBSOFT_BASE_URL || 'https://api.nuvv.hubsoft.com.br/').replace(/\/+$/, ''),
    clientId: process.env.HUBSOFT_CLIENT_ID || '30',
    clientSecret: process.env.HUBSOFT_CLIENT_SECRET || 'yWaznm8lpW6kGEuO1sOh5Kb5fw9UkqQ0WlshgHSu',
    username: process.env.HUBSOFT_USERNAME || 'meusapps@nuvv.com.br',
    password: process.env.HUBSOFT_PASSWORD || 'Nuvv@2026',
  };
}

/**
 * Formata CPF (11 dig) ou CNPJ (14 dig) com pontuação tradicional
 * @param {string} cleanStr 
 * @returns {string}
 */
function formatCpfCnpjString(cleanStr) {
  if (cleanStr.length === 11) {
    return cleanStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleanStr.length === 14) {
    return cleanStr.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return cleanStr;
}

/**
 * Obtém ou renova o Token Bearer de Autenticação OAuth 2.0 do ERP Hubsoft.
 * @returns {Promise<string>} Token de acesso Bearer
 */
export async function getAccessToken() {
  const now = Date.now();
  
  if (cachedToken && now < tokenExpiresAt - 300000) {
    return cachedToken;
  }

  const { baseUrl, clientId, clientSecret, username, password } = getHubsoftConfig();

  const payload = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password
  };

  const authEndpoints = [`${baseUrl}/oauth/token`, `${baseUrl}/api/v1/oauth/token`];
  let lastAuthError = null;

  for (const endpoint of authEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, expires_in } = data;

        if (access_token) {
          cachedToken = access_token;
          tokenExpiresAt = now + (expires_in ? expires_in * 1000 : 86400 * 1000);
          return cachedToken;
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        lastAuthError = new Error(`HTTP ${response.status}: ${JSON.stringify(errData)}`);
      }
    } catch (err) {
      lastAuthError = err;
    }
  }

  console.error('[HUBSOFT AUTH ERROR]:', lastAuthError?.message || lastAuthError);
  throw new Error('HUBSOFT_AUTH_FAILED: Não foi possível autenticar no sistema ERP Hubsoft.');
}

/**
 * Consulta faturas e dados financeiros no endpoint /api/v1/integracao/cliente/financeiro
 * @param {string} termoBusca 
 * @param {string} token 
 * @returns {Promise<Array>}
 */
async function fetchClienteFinanceiro(termoBusca, token) {
  const { baseUrl } = getHubsoftConfig();
  const variations = [
    { busca: 'cpf_cnpj', termo_busca: termoBusca },
    { busca: 'cpf_cnpj', termo_busca: termoBusca, status: 'pendente' },
    { busca: 'cpf_cnpj', termo_busca: termoBusca, quitado: '0' }
  ];

  for (const params of variations) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${baseUrl}/api/v1/integracao/cliente/financeiro?${queryParams}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        let faturas = [];

        if (Array.isArray(data)) faturas = data;
        else if (data && Array.isArray(data.data)) faturas = data.data;
        else if (data && Array.isArray(data.faturas)) faturas = data.faturas;
        else if (data && Array.isArray(data.itens)) faturas = data.itens;

        if (faturas && faturas.length > 0) {
          return faturas;
        }
      }
    } catch (err) {
      // Tenta próxima variação
    }
  }
  return [];
}

/**
 * Busca dados do cliente para extrair nome caso o financeiro não traga nome
 */
/**
 * Busca dados do cliente para extrair nome caso o financeiro não traga nome
 */
async function fetchClienteNome(cpfCnpjClean, token) {
  const { baseUrl } = getHubsoftConfig();
  const variations = [cpfCnpjClean, formatCpfCnpjString(cpfCnpjClean)];

  for (const doc of variations) {
    try {
      const queryParams = new URLSearchParams({ busca: 'cpf_cnpj', termo_busca: doc }).toString();
      const url = `${baseUrl}/api/v1/integracao/cliente?${queryParams}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const clientes = data?.clientes || data?.data || (Array.isArray(data) ? data : []);
        if (clientes.length > 0) {
          const c = clientes[0];
          const name = c.nome_razaosocial || c.nome_fantasia || c.nome || c.razao_social || null;
          if (name) return name;
        }
      }
    } catch (err) {
      // Ignora e tenta próxima variação
    }
  }
  return null;
}

/**
 * Orquestra a consulta completa de segunda via e PIX por CPF ou CNPJ
 * @param {string} cpfCnpjClean 
 * @returns {Promise<{ cliente: { nome_mascarado: string }, esta_em_dia: boolean, total_vencidas: number, total_pendentes: number, faturamentos: Array }>}
 */
export async function buscarDadosSegundaVia(cpfCnpjClean) {
  const token = await getAccessToken();

  // 1. Buscar dados cadastrais do cliente
  let rawName = await fetchClienteNome(cpfCnpjClean, token);

  // 2. Buscar faturas no endpoint de financeiro pelo número limpo
  let faturasRaw = await fetchClienteFinanceiro(cpfCnpjClean, token);

  // 3. Se vazio, tenta com pontuação (ex: 31.808.063/0001-00)
  if (faturasRaw.length === 0) {
    const formattedDoc = formatCpfCnpjString(cpfCnpjClean);
    if (formattedDoc !== cpfCnpjClean) {
      faturasRaw = await fetchClienteFinanceiro(formattedDoc, token);
    }
  }

  // Se o nome não foi encontrado na consulta de cliente, busca na fatura
  if (!rawName && faturasRaw.length > 0) {
    const firstFat = faturasRaw[0];
    rawName = firstFat.cliente?.nome_razaosocial || firstFat.cliente?.nome || firstFat.nome_cliente || firstFat.razao_social;
  }

  // Se não encontrou cadastro de cliente nem faturas
  if (!rawName && faturasRaw.length === 0) {
    const error = new Error('Nenhum cadastro de cliente encontrado com o CPF/CNPJ informado.');
    error.statusCode = 404;
    error.code = 'CLIENT_NOT_FOUND';
    throw error;
  }

  const nomeMascarado = maskName(rawName || 'CLIENTE IDENTIFICADO');

  // Configura a data de HOJE no fuso horário local às 00:00:00
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // 4. Filtrar e formatar apenas faturas não quitadas e com saldo a pagar
  const todasFaturasAbertas = [];
  const { baseUrl } = getHubsoftConfig();

  for (const f of faturasRaw) {
    if (f.quitado === true || f.pago === true || f.paga === true || f.liquidado === true) {
      continue;
    }

    const status = String(f.status || f.situacao || f.status_pagamento || '').toLowerCase();
    if (status.includes('pago') || status.includes('liquidad') || status.includes('cancelad') || status.includes('recebid')) {
      continue;
    }

    const valorNum = parseFloat(f.valor || f.valor_aberto || f.saldo || f.valor_total || 0);
    if (valorNum <= 0) continue;

    const idFaturamento = f.id_fatura || f.id_faturamento || f.id || f.numero_documento;
    const dataVencimentoStr = f.data_vencimento || f.vencimento;
    const dtVenc = parseDateLocal(dataVencimentoStr);

    if (!dtVenc) continue;
    dtVenc.setHours(0, 0, 0, 0);

    // Determina status correto ("VENCIDO", "VENCE HOJE", "A VENCER")
    let estaVencido = false;
    let statusRotulo = 'A VENCER';

    if (dtVenc < hoje) {
      estaVencido = true;
      statusRotulo = 'VENCIDO';
    } else if (dtVenc.getTime() === hoje.getTime()) {
      estaVencido = false;
      statusRotulo = 'VENCE HOJE';
    } else {
      estaVencido = false;
      statusRotulo = 'A VENCER';
    }

    const linhaDigitavel = f.linha_digitavel || f.codigo_barras || f.linha_digitavel_formatada || '';
    const pixCopiaCola = f.pix_copia_cola || f.cod_pix || f.pix?.copia_e_cola || '';
    const urlPdf = f.link || f.url_pdf || f.url_impressao || `${baseUrl}/boleto/imprimir/${idFaturamento}`;
    
    let referencia = f.referencia || f.mes_referencia;
    if (!referencia && f.detalhamento && f.detalhamento.length > 0) {
      referencia = f.detalhamento[0].descricao;
    }
    if (!referencia && dataVencimentoStr) {
      referencia = `Mensalidade ${formatDate(dataVencimentoStr)}`;
    }

    todasFaturasAbertas.push({
      id_faturamento: idFaturamento,
      referencia: referencia || 'Mensalidade Fibra Óptica',
      data_vencimento: formatDate(dataVencimentoStr),
      dtVencObj: dtVenc,
      esta_vencido: estaVencido,
      status_rotulo: statusRotulo,
      valor: formatCurrency(valorNum),
      valor_num: valorNum,
      linha_digitavel: linhaDigitavel,
      pix_copia_cola: pixCopiaCola,
      url_pdf: urlPdf
    });
  }

  // Ordenar faturas por data de vencimento
  todasFaturasAbertas.sort((a, b) => a.dtVencObj - b.dtVencObj);

  // 5. APLICAR REGRA DE NEGÓCIO ISP (Apenas Vencidos + Próximo Vencimento/Ciclo Ativo)
  const faturasVencidas = todasFaturasAbertas.filter(f => f.dtVencObj < hoje);
  const faturasFuturasOuHoje = todasFaturasAbertas.filter(f => f.dtVencObj >= hoje);

  let faturamentosFinais = [...faturasVencidas];

  if (faturasFuturasOuHoje.length > 0) {
    const proximaData = faturasFuturasOuHoje[0].dtVencObj;
    const proximoMes = proximaData.getMonth();
    const proximoAno = proximaData.getFullYear();

    // Incluir todos os boletos que pertencem a esse mesmo mês/ciclo do próximo vencimento (suporta múltiplos contratos)
    const faturasProximoCiclo = faturasFuturasOuHoje.filter(f => {
      return f.dtVencObj.getMonth() === proximoMes && f.dtVencObj.getFullYear() === proximoAno;
    });

    faturamentosFinais = faturamentosFinais.concat(faturasProximoCiclo);
  }

  const temVencidas = faturasVencidas.length > 0;
  const faturamentosFormatados = faturamentosFinais.map(({ dtVencObj, ...resto }) => resto);

  return {
    cliente: {
      nome_mascarado: nomeMascarado
    },
    esta_em_dia: !temVencidas,
    total_vencidas: faturasVencidas.length,
    total_pendentes: faturamentosFormatados.length,
    faturamentos: faturamentosFormatados
  };
}

/**
 * Busca ou gera payload PIX sob demanda no Hubsoft
 * @param {string|number} idFaturamento 
 * @returns {Promise<{ pix_copia_cola: string, qr_code?: string }|null>}
 */
export async function obterPixFaturamento(idFaturamento) {
  const token = await getAccessToken();
  const { baseUrl } = getHubsoftConfig();

  const endpoints = [
    `${baseUrl}/api/v1/integracao/cliente/financeiro/pix?id_fatura=${idFaturamento}`,
    `${baseUrl}/api/v1/integracao/cliente/financeiro/pix?id_faturamento=${idFaturamento}`,
    `${baseUrl}/api/v1/integracao/cliente/fatura/${idFaturamento}/pix`
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const pixCopiaCola = data.pix_copia_cola || data.cod_pix || data.copia_e_cola || data.pix?.copia_e_cola || data.data?.pix_copia_cola;
        if (pixCopiaCola) {
          return {
            pix_copia_cola: pixCopiaCola,
            qr_code: data.qr_code || data.pix?.qr_code || data.data?.qr_code || null
          };
        }
      }
    } catch (err) {
      // Continua
    }
  }

  return null;
}
