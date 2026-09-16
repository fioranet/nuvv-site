import {
  EntertainmentTier,
  ResidentialPlan,
  VisionAddonConfig,
  PLAN_ADDONS,
  TIER_CONFIG,
  resolveTierAndAddons,
  getGuardSetupDetails,
} from '../data/plans';
import {
  BUSINESS_PLANS,
  PABX_PLANS,
  TELEPHONY_PLANS,
  BUSINESS_TV_PLANS,
} from '../data/businessPlans';
import { MULTIATENDIMENTO_PLANS } from '../data/multiatendimentoData';
import { SECURITY_PLANS } from '../data/securityPlans';
import { SOCIAL_WIFI_PLANS } from '../data/socialWifiData';
import { BusinessComboSelection, calculateBusinessCombo } from '../data/businessPricing';
import { siteConfig } from '../data/siteConfig';

export interface OrderOneTimeItem {
  id: string;
  name: string;
  setupFee: number;
  quantity?: number;
  unitPrice?: number;
  notice?: string;
  category: 'guard' | 'hardware' | 'taxa_adesao' | 'instalacao';
}

export interface OrderMonthlyItem {
  id: string;
  name: string;
  price: number;
  isIncluded?: boolean;
  notice?: string;
  category: 'fibra' | 'tv' | 'streaming' | 'saude' | 'protecao' | 'guard' | 'telefonia' | 'vision' | 'outro';
}

export interface ComboLeadSummary {
  planSpeed: number;
  planUnit: string;
  planTitle: string;
  tierKey: EntertainmentTier | string;
  tierLabel: string;
  channelsCount: number;
  referencePlan: string;
  internalCodes: string[];
  cityName: string;
  monthlyTotal: number;
  monthlyItems: OrderMonthlyItem[];
  oneTimeTotal: number;
  oneTimeItems: OrderOneTimeItem[];
  includedStreamings: string[];
  extraAddons: string[];
  rawSummary: string;
  createdAt: string;
  isBusiness?: boolean;
}

export interface BuildComboSummaryParams {
  plan: ResidentialPlan;
  effectiveTier: EntertainmentTier;
  activeAddons: Record<string, boolean>;
  visionConfig: VisionAddonConfig;
  totalPrice: number;
  cityName: string;
}

export const FRIENDLY_ADDON_NAMES: Record<string, string> = {
  'telemed-essencial-ind': 'Essencial Individual (Telemedicina 24h)',
  'telemed-essencial-fam': 'Essencial Familiar (Telemedicina 24h)',
  'telemed-premium-ind': 'Premium Individual (Telemedicina + Presencial)',
  'telemed-premium-fam': 'Premium Familiar (Telemedicina + Presencial)',
  'telefonia-fixa': 'Linha Telefônica Fixa Ilimitado Brasil',
};

export const STORAGE_KEY_CURRENT_QUOTE = 'nuvv_current_quote';
export const STORAGE_KEY_LAST_QUOTE = 'nuvv_last_quote';

/**
 * Monta o resumo estruturado e abrangente do combo residencial selecionado,
 * discriminando claramente a mensalidade recorrente e as taxas únicas (vendas pontuais).
 */
export function buildComboSummary({
  plan,
  effectiveTier,
  activeAddons,
  visionConfig,
  totalPrice,
  cityName,
}: BuildComboSummaryParams): ComboLeadSummary {
  const resolution = resolveTierAndAddons(effectiveTier, activeAddons);
  const tierConfig = TIER_CONFIG[effectiveTier] || TIER_CONFIG['cortesia'];
  const tierPricing = plan.tierPricing[effectiveTier] || plan.tierPricing['cortesia'];

  const monthlyItems: OrderMonthlyItem[] = [];
  const oneTimeItems: OrderOneTimeItem[] = [];
  const includedStreamings: string[] = [];
  const extraAddons: string[] = [];

  // 1. Fibra Base
  monthlyItems.push({
    id: `fibra-${plan.id}`,
    name: `Internet Fibra Óptica ${plan.speed} ${plan.unit}`,
    price: tierPricing.promoPrice,
    category: 'fibra',
    notice: '100% Fibra Óptica com Wi-Fi alta velocidade e modem comodato grátis',
  });

  // 2. TV & Streamings Inclusos
  const includedAppsNames = tierPricing.includedApps?.map((a) => a.name) || [];
  includedAppsNames.forEach((appName) => {
    includedStreamings.push(appName);
  });

  // Identifica addons inclusos vs extras
  Object.entries(activeAddons)
    .filter(([_, active]) => active)
    .forEach(([key]) => {
      const addon = PLAN_ADDONS[key];
      if (!addon) return;

      const friendlyName = FRIENDLY_ADDON_NAMES[key] || addon.name;
      const details = resolution.effectiveAddonPrices[key];
      const isIncluded = details?.isIncluded;

      if (isIncluded) {
        if (!includedStreamings.includes(friendlyName)) {
          includedStreamings.push(friendlyName);
        }
      } else {
        const effectivePrice = details?.effectivePrice ?? addon.price;
        extraAddons.push(`${friendlyName} (+R$ ${effectivePrice.toFixed(2).replace('.', ',')}/mês)`);
        monthlyItems.push({
          id: addon.id,
          name: friendlyName,
          price: effectivePrice,
          isIncluded: false,
          category: addon.category,
          notice: details?.isPromo ? 'Preço promocional no combo' : undefined,
        });
      }
    });

  // 3. Nuvv Guard - Câmeras Mensais (Nuvem / Comodato)
  const camId =
    visionConfig.cameraPlanId ||
    (visionConfig.planId &&
    (visionConfig.planId.includes('camera') ||
      visionConfig.planId.includes('byod') ||
      visionConfig.planId.includes('vision'))
      ? (visionConfig.planId as any)
      : null);

  if (camId && PLAN_ADDONS[camId]) {
    const camCount = Math.max(1, visionConfig.cameraCount || 1);
    const addon = PLAN_ADDONS[camId];
    const totalCamMonthly = addon.price * camCount;
    monthlyItems.push({
      id: addon.id,
      name: `Câmera Nuvv Guard (${camCount}x)`,
      price: totalCamMonthly,
      category: 'guard',
      notice: `Gravação em nuvem para ${camCount} câmera${camCount > 1 ? 's' : ''}`,
    });
    extraAddons.push(`Câmeras Nuvv Guard (${camCount}x) - R$ ${totalCamMonthly.toFixed(2).replace('.', ',')}/mês`);
  }

  // 4. Nuvv Guard - TAXAS ÚNICAS ("Vendas" de Hardware, Placas e Adesões sem mensalidade)
  const guardSetup = getGuardSetupDetails(visionConfig);
  guardSetup.items.forEach((item, idx) => {
    if (item.setupFee > 0) {
      oneTimeItems.push({
        id: `guard-setup-${idx}`,
        name: item.name,
        setupFee: item.setupFee,
        notice: item.notice,
        category: 'guard',
      });
    }
  });

  const oneTimeTotal = Number(
    oneTimeItems.reduce((acc, curr) => acc + curr.setupFee, 0).toFixed(2)
  );

  const extrasPayload = resolution.internalCodes.length
    ? ` | Extras: ${resolution.internalCodes.join(', ')}`
    : '';

  const activeAddonNamesDisplay = [
    ...extraAddons,
    ...oneTimeItems.map((ot) => `${ot.name} (Taxa única R$ ${ot.setupFee.toFixed(2).replace('.', ',')})`),
  ];

  const rawSummary = `${plan.speed} ${plan.unit} (${tierConfig.label}) [Ref: ${resolution.referencePlan}${extrasPayload}] - R$ ${totalPrice.toFixed(2).replace('.', ',')}/mês${
    activeAddonNamesDisplay.length ? ` [+ Adicionais: ${activeAddonNamesDisplay.join(', ')}]` : ''
  }`;

  return {
    planSpeed: plan.speedNumber,
    planUnit: plan.unit,
    planTitle: `${plan.speed} ${plan.unit} 100% Fibra Óptica`,
    tierKey: effectiveTier,
    tierLabel: tierConfig.label,
    channelsCount: tierPricing.channelsCount,
    referencePlan: resolution.referencePlan,
    internalCodes: resolution.internalCodes,
    cityName,
    monthlyTotal: totalPrice,
    monthlyItems,
    oneTimeTotal,
    oneTimeItems,
    includedStreamings,
    extraAddons,
    rawSummary,
    createdAt: new Date().toISOString(),
  };
}

export interface BuildBusinessComboSummaryParams {
  selection: BusinessComboSelection;
  cityName: string;
}

/**
 * Monta o resumo estruturado e abrangente do combo corporativo selecionado,
 * discriminando claramente a conectividade base, os adicionais recorrentes e as vendas de hardware/placas.
 */
export function buildBusinessComboSummary({
  selection,
  cityName,
}: BuildBusinessComboSummaryParams): ComboLeadSummary {
  const pricing = calculateBusinessCombo(selection);
  const monthlyItems: OrderMonthlyItem[] = [];
  const oneTimeItems: OrderOneTimeItem[] = [];
  const extraAddons: string[] = [];
  const internalCodes: string[] = [];

  // 1. Conectividade Base
  const connectivityPlans = BUSINESS_PLANS[selection.connectivityType] || [];
  const basePlan = connectivityPlans.find((p) => p.id === selection.planId) || connectivityPlans[0];

  if (basePlan) {
    const promo = basePlan.promoPrice ?? basePlan.originalPrice ?? 0;
    monthlyItems.push({
      id: basePlan.id,
      name: `${basePlan.name} (${basePlan.speed} ${basePlan.unit})`,
      price: promo,
      category: 'fibra',
      notice:
        selection.connectivityType === 'semi-dedicado'
          ? 'Link Semi-Dedicado com 1 IP Fixo IPv4 (/32) e SLA 12h'
          : 'Banda Larga Empresarial com Wi-Fi Plus e Linha Fixa Inclusa',
    });
    internalCodes.push(basePlan.id);
  }

  // 2. PABX em Nuvem (incremento no preço)
  if (selection.pabxPlanId) {
    const pabx = PABX_PLANS.find((p) => p.id === selection.pabxPlanId);
    if (pabx) {
      monthlyItems.push({
        id: pabx.id,
        name: `PABX em Nuvem (${pabx.name})`,
        price: pabx.price,
        category: 'telefonia',
        notice: `${pabx.extensionCount} + URA + Gravação em Nuvem`,
      });
      extraAddons.push(`PABX em Nuvem ${pabx.name} (+R$ ${pabx.price.toFixed(2).replace('.', ',')}/mês)`);
      internalCodes.push(`pabx-${pabx.id}`);
    }
  }

  // 3. Telefonia IP (incremento no preço por linha)
  if (selection.telephonyPlanId) {
    const tel = TELEPHONY_PLANS.find((t) => t.id === selection.telephonyPlanId);
    if (tel) {
      const count = Math.max(1, selection.telephonyLinesCount || 1);
      const totalTel = tel.price * count;
      monthlyItems.push({
        id: tel.id,
        name: `Telefonia IP: ${tel.name}${count > 1 ? ` (${count}x linhas)` : ''}`,
        price: totalTel,
        category: 'telefonia',
        notice: count > 1 ? `${count} linhas com tarifação unificada` : undefined,
      });
      extraAddons.push(`Telefonia IP ${tel.name} (${count}x) (+R$ ${totalTel.toFixed(2).replace('.', ',')}/mês)`);
      internalCodes.push(`tel-${tel.id}x${count}`);
    }
  }

  // 4. Nuvv Digital Multiatendimento (CRM / WhatsApp) (incremento no preço)
  if (selection.multiatendimentoPlanId) {
    const multi = MULTIATENDIMENTO_PLANS.find((m) => m.id === selection.multiatendimentoPlanId);
    if (multi && multi.monthlyPrice) {
      monthlyItems.push({
        id: multi.id,
        name: `Multiatendimento (${multi.name})`,
        price: multi.monthlyPrice,
        category: 'outro',
        notice: `${multi.usersLimit} • ${multi.connectionsLimit}`,
      });
      extraAddons.push(`Multiatendimento ${multi.name} (+R$ ${multi.monthlyPrice.toFixed(2).replace('.', ',')}/mês)`);
      internalCodes.push(`multi-${multi.id}`);
    }
  }

  // 5. Nuvv Guard Câmeras (incremento no preço) e Instalação BYOD (se houver)
  const camId = selection.guardCameraPlanId || selection.visionPlanId || null;
  const camCount = Math.max(1, selection.guardCameraCount || selection.visionCamerasCount || 1);
  if (camId && PLAN_ADDONS[camId]) {
    const addon = PLAN_ADDONS[camId];
    const totalCam = addon.price * camCount;
    monthlyItems.push({
      id: addon.id,
      name: `Câmeras Nuvv Guard (${addon.name})${camCount > 1 ? ` (${camCount}x)` : ''}`,
      price: totalCam,
      category: 'guard',
      notice: `Gravação em nuvem para ${camCount} câmera${camCount > 1 ? 's' : ''}`,
    });
    extraAddons.push(`Câmeras Nuvv Guard (${addon.name} ${camCount}x) (+R$ ${totalCam.toFixed(2).replace('.', ',')}/mês)`);
    internalCodes.push(`guard-cam-${camId}x${camCount}`);

    // Se for BYOD (câmera própria do cliente), taxa única de configuração técnica R$ 15 por câmera
    if (camId.includes('byod')) {
      const setupFee = 15 * camCount;
      oneTimeItems.push({
        id: 'guard-byod-setup',
        name: `Ativação Técnica Câmeras Próprias (${camCount}x)`,
        setupFee,
        category: 'guard',
        notice: 'Taxa única de configuração técnica (R$ 15,00 por câmera)',
      });
    }
  }

  // 6. Nuvv Guard Interfone Virtual (Placa QR Code / Mensal)
  if (selection.guardIntercomPlanId) {
    const intercom = PLAN_ADDONS[selection.guardIntercomPlanId];
    if (intercom) {
      if (intercom.setupFee && intercom.setupFee > 0) {
        oneTimeItems.push({
          id: 'guard-intercom-qr',
          name: intercom.name,
          setupFee: intercom.setupFee,
          category: 'hardware',
          notice: intercom.description,
        });
      }
      if (intercom.price > 0) {
        monthlyItems.push({
          id: intercom.id,
          name: intercom.name,
          price: intercom.price,
          category: 'guard',
          notice: intercom.description,
        });
        extraAddons.push(`${intercom.name} (+R$ ${intercom.price.toFixed(2).replace('.', ',')}/mês)`);
      }
      internalCodes.push(`guard-intercom-${intercom.id}`);
    }
  }

  // 7. Nuvv Guard TAGs de Rastreamento (Venda unitária / Mensal)
  if (selection.guardTagPlanId) {
    const tag = PLAN_ADDONS[selection.guardTagPlanId];
    if (tag) {
      const tagCount = Math.max(1, selection.guardTagCount || 1);
      if (tag.setupFee && tag.setupFee > 0) {
        const totalSetup = tag.setupFee * tagCount;
        oneTimeItems.push({
          id: 'guard-tag-item',
          name: `${tag.name} (${tagCount}x)`,
          setupFee: totalSetup,
          category: 'hardware',
          notice: tag.description,
        });
      }
      if (tag.price > 0) {
        const totalTagMonthly = tag.price * tagCount;
        monthlyItems.push({
          id: tag.id,
          name: `${tag.name} (${tagCount}x)`,
          price: totalTagMonthly,
          category: 'guard',
          notice: tag.description,
        });
        extraAddons.push(`${tag.name} (${tagCount}x) (+R$ ${totalTagMonthly.toFixed(2).replace('.', ',')}/mês)`);
      }
      internalCodes.push(`guard-tag-${tag.id}x${tagCount}`);
    }
  }

  // 8. TV Corporativa (Esporte e Notícia)
  if (selection.tvPlanId) {
    const tv = BUSINESS_TV_PLANS.find((t) => t.id === selection.tvPlanId);
    if (tv) {
      monthlyItems.push({
        id: tv.id,
        name: `TV Corporativa: ${tv.name}`,
        price: tv.price,
        category: 'tv',
        notice: `${tv.channelsCount} canais ao vivo (Jornalismo 24h & Esportes) via Watch`,
      });
      extraAddons.push(`TV Corporativa ${tv.name} (+R$ ${tv.price.toFixed(2).replace('.', ',')}/mês)`);
      internalCodes.push(`tv-${tv.id}`);
    }
  }

  // 9. Segurança Digital (Endpoint / Antivírus)
  if (selection.securityPlanId) {
    const sec = SECURITY_PLANS.find((s) => s.id === selection.securityPlanId);
    if (sec) {
      monthlyItems.push({
        id: sec.id,
        name: `Segurança Digital (${sec.name})`,
        price: sec.price,
        category: 'protecao',
        notice: `Proteção para ${sec.userCount} dispositivos / computadores`,
      });
      extraAddons.push(`Segurança Digital ${sec.name} (+R$ ${sec.price.toFixed(2).replace('.', ',')}/mês)`);
      internalCodes.push(`sec-${sec.id}`);
    }
  }

  // 10. Hotspot Wi-Fi Social
  if (selection.socialWifiPlanId) {
    const wifi = SOCIAL_WIFI_PLANS.find((w) => w.id === selection.socialWifiPlanId);
    if (wifi && wifi.price > 0) {
      monthlyItems.push({
        id: wifi.id,
        name: `Hotspot Wi-Fi Social (${wifi.name})`,
        price: wifi.price,
        category: 'outro',
        notice: `${wifi.simultaneousUsers} • Captive portal com coleta LGPD`,
      });
      extraAddons.push(`Hotspot Wi-Fi ${wifi.name} (+R$ ${wifi.price.toFixed(2).replace('.', ',')}/mês)`);
      internalCodes.push(`wifi-${wifi.id}`);
    }
  }

  const oneTimeTotal = Number(
    oneTimeItems.reduce((acc, curr) => acc + curr.setupFee, 0).toFixed(2)
  );

  const rawSummary = `Empresarial ${basePlan ? basePlan.name : 'Fibra'} (${basePlan ? basePlan.speed + ' ' + basePlan.unit : ''}) - R$ ${pricing.totalMonthly.toFixed(2).replace('.', ',')}/mês${
    extraAddons.length ? ` [+ Soluções: ${extraAddons.join(', ')}]` : ''
  }${oneTimeItems.length ? ` [+ Vendas/Taxas Únicas: ${oneTimeItems.map((o) => `${o.name} (R$ ${o.setupFee.toFixed(2).replace('.', ',')})`).join(', ')}]` : ''}`;

  return {
    planSpeed: basePlan ? parseInt(basePlan.speed, 10) || 800 : 800,
    planUnit: basePlan ? basePlan.unit : 'Mega',
    planTitle: basePlan ? `${basePlan.name} (${basePlan.speed} ${basePlan.unit})` : 'Conectividade Empresarial',
    tierKey: selection.tvPlanId ? 'esporte-noticia' : 'b2b-corporate',
    tierLabel: selection.connectivityType === 'semi-dedicado' ? 'Semi-Dedicado (IP Fixo + SLA)' : 'Banda Larga PME',
    channelsCount: selection.tvPlanId ? 68 : 0,
    referencePlan: basePlan ? basePlan.id : 'biz-combo',
    internalCodes,
    cityName,
    monthlyTotal: pricing.totalMonthly,
    monthlyItems,
    oneTimeTotal,
    oneTimeItems,
    includedStreamings: [],
    extraAddons,
    rawSummary,
    createdAt: new Date().toISOString(),
    isBusiness: true,
  };
}

/**
 * Salva a cotação/resumo do combo no localStorage
 */
export function saveComboSummaryToStorage(summary: ComboLeadSummary): void {
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT_QUOTE, JSON.stringify(summary));
    localStorage.setItem(STORAGE_KEY_LAST_QUOTE, JSON.stringify(summary));
  } catch (err) {
    console.warn('Erro ao salvar resumo no localStorage:', err);
  }
}

/**
 * Recupera o último resumo salvo no localStorage
 */
export function getStoredComboSummary(): ComboLeadSummary | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_QUOTE) || localStorage.getItem(STORAGE_KEY_LAST_QUOTE);
    if (!raw) return null;
    return JSON.parse(raw) as ComboLeadSummary;
  } catch {
    return null;
  }
}

/**
 * Gera a mensagem oficial do WhatsApp com formatação elegante,
 * discriminando com clareza a mensalidade e as taxas únicas de venda.
 */
export function generateWhatsAppComboMessage(
  summary: ComboLeadSummary,
  customer?: { name?: string; phone?: string; cep?: string }
): string {
  const lines: string[] = [];

  if (summary.isBusiness) {
    lines.push('🏢 *PEDIDO DE CONTRATAÇÃO CORPORATIVA - NUVV EMPRESAS*');
    lines.push(`📍 *Cidade:* ${summary.cityName}`);

    if (customer?.name?.trim()) {
      lines.push(`👤 *Empresa / Contato:* ${customer.name.trim()}`);
    }
    if (customer?.phone?.trim()) {
      lines.push(`📱 *WhatsApp/Tel:* ${customer.phone.trim()}`);
    }
    if (customer?.cep?.trim()) {
      lines.push(`📮 *CEP de Instalação:* ${customer.cep.trim()}`);
    }

    lines.push('');
    lines.push('🌐 *CONECTIVIDADE EMPRESARIAL:*');
    lines.push(`• *${summary.planTitle}*`);
    lines.push(`• Modalidade: ${summary.tierLabel}`);
    lines.push('• Instalação técnica e modem corporativo inclusos');

    if (summary.channelsCount > 0) {
      lines.push('');
      lines.push('📺 *TV CORPORATIVA (ESPORTE E NOTÍCIA):*');
      lines.push(`• *${summary.channelsCount} canais ao vivo* (Jornalismo 24h & Esportes) via App Watch`);
    }

    if (summary.extraAddons.length > 0) {
      lines.push('');
      lines.push('💼 *SOLUÇÕES INTEGRADAS CONTRATADAS:*');
      summary.extraAddons.forEach((addon) => {
        lines.push(`• ${addon}`);
      });
    }

    lines.push('');
    lines.push('💳 *VALOR DA MENSALIDADE RECORRENTE:*');
    lines.push(`👉 *R$ ${summary.monthlyTotal.toFixed(2).replace('.', ',')} / mês* (Fatura unificada com NF)`);

    if (summary.oneTimeItems.length > 0) {
      lines.push('');
      lines.push('🛍️ *VENDAS / TAXAS ÚNICAS (PAGAMENTO ÚNICO):*');
      summary.oneTimeItems.forEach((item) => {
        lines.push(`• ${item.name}: *R$ ${item.setupFee.toFixed(2).replace('.', ',')}*`);
        if (item.notice) {
          lines.push(`  _${item.notice}_`);
        }
      });
      lines.push(`👉 *Total em Vendas/Taxas Únicas: R$ ${summary.oneTimeTotal.toFixed(2).replace('.', ',')}*`);
    } else {
      lines.push('');
      lines.push('🎁 *TAXAS DE ADESÃO / HARDWARE:* Isentas');
    }

    lines.push('');
    const extrasPayload = summary.internalCodes.length
      ? ` | Itens: ${summary.internalCodes.join(', ')}`
      : '';
    lines.push(`📝 *Referência B2B:* ${summary.referencePlan}${extrasPayload}`);
    lines.push('----------------------------------');
    lines.push('Olá! Gostaria de receber a proposta formal e agilizar a contratação corporativa para minha empresa.');

    return lines.join('\n');
  }

  // Fluxo Residencial
  lines.push('🚀 *PEDIDO DE CONTRATAÇÃO - NUVV FIBRA*');
  lines.push(`📍 *Cidade:* ${summary.cityName}`);

  if (customer?.name?.trim()) {
    lines.push(`👤 *Cliente:* ${customer.name.trim()}`);
  }
  if (customer?.phone?.trim()) {
    lines.push(`📱 *WhatsApp/Tel:* ${customer.phone.trim()}`);
  }
  if (customer?.cep?.trim()) {
    lines.push(`📮 *CEP de Instalação:* ${customer.cep.trim()}`);
  }

  lines.push('');
  lines.push('🌐 *PLANO DE INTERNET:*');
  lines.push(`• *${summary.planSpeed} ${summary.planUnit} 100% Fibra Óptica*`);
  lines.push('• Wi-Fi alta estabilidade incluso');
  lines.push('• Instalação e modem em comodato 100% isentos');

  lines.push('');
  lines.push('📺 *PACOTE DE TV:*');
  lines.push(`• *${summary.tierLabel}*${summary.channelsCount > 0 ? ` (${summary.channelsCount} canais ao vivo)` : ''}`);

  if (summary.extraAddons.length > 0) {
    lines.push('');
    lines.push('⭐ *SERVIÇOS / ADICIONAIS CONTRATADOS:*');
    summary.extraAddons.forEach((addon) => {
      lines.push(`• ${addon}`);
    });
  }

  lines.push('');
  lines.push('💳 *VALOR DA MENSALIDADE RECORRENTE:*');
  lines.push(`👉 *R$ ${summary.monthlyTotal.toFixed(2).replace('.', ',')} / mês* (no Pix ou boleto até o vencimento)`);

  if (summary.oneTimeItems.length > 0) {
    lines.push('');
    lines.push('🛍️ *VENDAS / TAXAS ÚNICAS (PAGAMENTO ÚNICO):*');
    summary.oneTimeItems.forEach((item) => {
      lines.push(`• ${item.name}: *R$ ${item.setupFee.toFixed(2).replace('.', ',')}* (taxa única sem mensalidade)`);
      if (item.notice) {
        lines.push(`  _${item.notice}_`);
      }
    });
    lines.push(`👉 *Total em Vendas/Taxas Únicas: R$ ${summary.oneTimeTotal.toFixed(2).replace('.', ',')}*`);
  } else {
    lines.push('');
    lines.push('🎁 *TAXA DE ADESÃO / HARDWARE:* Isenta');
  }

  lines.push('');
  const extrasPayload = summary.internalCodes.length
    ? ` | Extras: ${summary.internalCodes.join(', ')}`
    : '';
  lines.push(`📝 *Referência:* ${summary.referencePlan}${extrasPayload}`);
  lines.push('----------------------------------');
  lines.push('Olá! Gostaria de agilizar minha contratação com os serviços escolhidos acima.');

  return lines.join('\n');
}

/**
 * Abre o WhatsApp diretamente com a mensagem formatada
 */
export function openWhatsAppDirect(
  summary: ComboLeadSummary,
  customer?: { name?: string; phone?: string; cep?: string }
): void {
  const message = generateWhatsAppComboMessage(summary, customer);
  const url = `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
