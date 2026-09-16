/**
 * Valida o número de CPF pelo algoritmo oficial da Receita Federal (dígitos verificadores)
 * @param {string} cpf 
 * @returns {boolean}
 */
export function validateCPF(cpf) {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10), 10)) return false;

  return true;
}

/**
 * Valida o número de CNPJ pelo algoritmo oficial da Receita Federal (dígitos verificadores)
 * @param {string} cnpj 
 * @returns {boolean}
 */
export function validateCNPJ(cnpj) {
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(clean)) return false;

  let size = clean.length - 2;
  let numbers = clean.substring(0, size);
  const digits = clean.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) return false;

  size = size + 1;
  numbers = clean.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) return false;

  return true;
}

/**
 * Identifica e valida CPF ou CNPJ
 * @param {string} input 
 * @returns {{ valid: boolean, type: 'CPF' | 'CNPJ' | 'INVALID', clean: string }}
 */
export function validateCpfCnpj(input) {
  if (!input || typeof input !== 'string') {
    return { valid: false, type: 'INVALID', clean: '' };
  }

  const clean = input.replace(/\D/g, '');

  if (clean.length === 11) {
    return {
      valid: validateCPF(clean),
      type: 'CPF',
      clean
    };
  } else if (clean.length === 14) {
    return {
      valid: validateCNPJ(clean),
      type: 'CNPJ',
      clean
    };
  }

  return { valid: false, type: 'INVALID', clean };
}

/**
 * Mascara o nome do cliente para conformidade com a LGPD (ex: "MARIA SILVA" -> "M**** S****")
 * @param {string} name 
 * @returns {string}
 */
export function maskName(name) {
  if (!name || typeof name !== 'string') return 'CLIENTE IDENTIFICADO';

  const parts = name.trim().split(/\s+/);
  return parts.map(part => {
    if (part.length <= 2) return part;
    return part[0] + '*'.repeat(Math.max(part.length - 1, 3));
  }).join(' ');
}

/**
 * Formata data no padrão brasileiro DD/MM/AAAA
 * @param {string|Date} dateVal 
 * @returns {string}
 */
export function formatDate(dateVal) {
  if (!dateVal) return '';
  const d = parseDateLocal(dateVal);
  if (!d) return String(dateVal);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Converte data string (AAAA-MM-DD ou AAAA-MM-DDTHH:mm:ss) para Date preservando fuso local
 * @param {string|Date} dateInput 
 * @returns {Date|null}
 */
export function parseDateLocal(dateInput) {
  if (!dateInput) return null;
  if (dateInput instanceof Date) return dateInput;

  const str = String(dateInput).split('T')[0].split(' ')[0].trim();
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
  } else if (str.includes('-')) {
    const parts = str.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
  }
  return new Date(dateInput);
}

/**
 * Formata valor numérico para Moeda BRL (R$ 0,00)
 * @param {number} val 
 * @returns {string}
 */
export function formatCurrency(val) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(val || 0);
}
