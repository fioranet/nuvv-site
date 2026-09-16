import {
  BUSINESS_PLANS,
  BusinessPlan,
  PABX_PLANS,
  PabxPlan,
  TELEPHONY_PLANS,
  TelephonyPlan,
  BUSINESS_TV_PLANS,
  BusinessTvPlan,
} from './businessPlans';
import { MULTIATENDIMENTO_PLANS, MultiAtendimentoPlan } from './multiatendimentoData';
import { PLAN_ADDONS } from './plans';
import { SECURITY_PLANS, SecurityPlan } from './securityPlans';
import { SOCIAL_WIFI_PLANS, SocialWifiPlan } from './socialWifiData';

export type BusinessConnectivityType = 'banda-larga' | 'semi-dedicado';

export interface BusinessComboSelection {
  connectivityType: BusinessConnectivityType;
  planId: string;
  pabxPlanId: string | null;
  telephonyPlanId: string | null;
  telephonyLinesCount: number;
  multiatendimentoPlanId: string | null;
  // Nuvv Guard (Sincronizado com Residencial / Sem 'Ao Vivo')
  guardCameraPlanId: string | null;
  guardCameraCount: number;
  guardIntercomPlanId: string | null;
  guardTagPlanId: string | null;
  guardTagCount: number;
  // TV Corporativa (Esporte e Notícia)
  tvPlanId: string | null;
  // Campos legados para compatibilidade
  visionPlanId?: string | null;
  visionCamerasCount?: number;
  visionWithComodato?: boolean;
  securityPlanId: string | null;
  socialWifiPlanId: string | null;
}

export interface BusinessComboBreakdownItem {
  id: string;
  category: 'connectivity' | 'pabx' | 'telefonia' | 'multiatendimento' | 'vision' | 'seguranca' | 'socialWifi' | 'tv';
  title: string;
  subtitle?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface BusinessComboSummary {
  items: BusinessComboBreakdownItem[];
  totalMonthly: number;
  totalOriginal: number;
  economyMonthly: number;
  itemCount: number;
  leadSummaryText: string;
}

export const DEFAULT_BUSINESS_COMBO: BusinessComboSelection = {
  connectivityType: 'banda-larga',
  planId: 'biz-plus-800', // 800 Mega PME (Most Popular)
  pabxPlanId: null,
  telephonyPlanId: null,
  telephonyLinesCount: 1,
  multiatendimentoPlanId: null,
  guardCameraPlanId: null,
  guardCameraCount: 1,
  guardIntercomPlanId: null,
  guardTagPlanId: null,
  guardTagCount: 1,
  tvPlanId: null,
  visionPlanId: null,
  visionCamerasCount: 1,
  visionWithComodato: false,
  securityPlanId: null,
  socialWifiPlanId: null,
};

/**
 * Calculates the complete breakdown and total monthly price of a custom business combo,
 * pulling prices directly from the respective single sources of truth.
 */
export function calculateBusinessCombo(selection: BusinessComboSelection): BusinessComboSummary {
  const items: BusinessComboBreakdownItem[] = [];
  let totalMonthly = 0;
  let totalOriginal = 0;

  // 1. Base Connectivity
  const connectivityPlans = BUSINESS_PLANS[selection.connectivityType] || [];
  const basePlan = connectivityPlans.find((p) => p.id === selection.planId) || connectivityPlans[0];

  if (basePlan) {
    const promo = basePlan.promoPrice ?? basePlan.originalPrice ?? 0;
    const original = basePlan.originalPrice ?? promo;

    items.push({
      id: basePlan.id,
      category: 'connectivity',
      title: `${basePlan.name} (${basePlan.speed} ${basePlan.unit})`,
      subtitle:
        selection.connectivityType === 'semi-dedicado'
          ? 'Link Semi-Dedicado com 1 IP Fixo IPv4 (/32) + SLA 12h'
          : 'Banda Larga Empresarial com Wi-Fi Plus + Linha Fixa',
      unitPrice: promo,
      quantity: 1,
      totalPrice: promo,
    });

    totalMonthly += promo;
    totalOriginal += original;
  }

  // 2. PABX em Nuvem
  if (selection.pabxPlanId) {
    const pabx = PABX_PLANS.find((p) => p.id === selection.pabxPlanId);
    if (pabx) {
      items.push({
        id: pabx.id,
        category: 'pabx',
        title: `PABX em Nuvem: ${pabx.name}`,
        subtitle: `${pabx.extensionCount} + URA + Gravação em Nuvem`,
        unitPrice: pabx.price,
        quantity: 1,
        totalPrice: pabx.price,
      });

      totalMonthly += pabx.price;
      totalOriginal += pabx.price;
    }
  }

  // 3. Telefonia IP / Linhas Fixas
  if (selection.telephonyPlanId) {
    const tel = TELEPHONY_PLANS.find((t) => t.id === selection.telephonyPlanId);
    if (tel) {
      const count = Math.max(1, selection.telephonyLinesCount || 1);
      const telTotal = tel.price * count;

      items.push({
        id: tel.id,
        category: 'telefonia',
        title: `Telefonia IP: ${tel.name}`,
        subtitle: count > 1 ? `${count}x Linhas (${tel.name})` : tel.name,
        unitPrice: tel.price,
        quantity: count,
        totalPrice: telTotal,
      });

      totalMonthly += telTotal;
      totalOriginal += telTotal;
    }
  }

  // 4. Nuvv Multiatendimento (WhatsApp & CRM)
  if (selection.multiatendimentoPlanId) {
    const multi = MULTIATENDIMENTO_PLANS.find((m) => m.id === selection.multiatendimentoPlanId);
    if (multi && multi.monthlyPrice) {
      items.push({
        id: multi.id,
        category: 'multiatendimento',
        title: `Multiatendimento: Plano ${multi.name}`,
        subtitle: `${multi.usersLimit} • ${multi.connectionsLimit}`,
        unitPrice: multi.monthlyPrice,
        quantity: 1,
        totalPrice: multi.monthlyPrice,
      });

      totalMonthly += multi.monthlyPrice;
      totalOriginal += multi.monthlyPrice;
    }
  }

  // 5. Nuvv Guard (Câmeras, Interfone e Tags - Sincronizado com Residencial)
  const effectiveCameraPlanId = selection.guardCameraPlanId || selection.visionPlanId || null;
  const effectiveCameraCount = Math.max(1, selection.guardCameraCount || selection.visionCamerasCount || 1);

  if (effectiveCameraPlanId) {
    const addon = PLAN_ADDONS[effectiveCameraPlanId];
    if (addon) {
      const cameraTotal = addon.price * effectiveCameraCount;
      items.push({
        id: addon.id,
        category: 'vision',
        title: `Nuvv Guard: ${addon.name}`,
        subtitle:
          effectiveCameraCount > 1
            ? `${effectiveCameraCount}x Câmeras • ${addon.description}`
            : addon.description,
        unitPrice: addon.price,
        quantity: effectiveCameraCount,
        totalPrice: cameraTotal,
      });

      totalMonthly += cameraTotal;
      totalOriginal += cameraTotal;
    }
  }

  // Interfone Virtual QR Code
  if (selection.guardIntercomPlanId) {
    const intercom = PLAN_ADDONS[selection.guardIntercomPlanId];
    if (intercom) {
      items.push({
        id: intercom.id,
        category: 'vision',
        title: `Nuvv Guard: ${intercom.name}`,
        subtitle: intercom.price === 0 ? 'Sem mensalidade (Taxa única R$ 79,90)' : intercom.description,
        unitPrice: intercom.price,
        quantity: 1,
        totalPrice: intercom.price,
      });
      totalMonthly += intercom.price;
      totalOriginal += intercom.price;
    }
  }

  // Tags de Rastreamento
  if (selection.guardTagPlanId) {
    const tag = PLAN_ADDONS[selection.guardTagPlanId];
    if (tag) {
      const tagCount = Math.max(1, selection.guardTagCount || 1);
      const tagTotal = tag.price * tagCount;
      items.push({
        id: tag.id,
        category: 'vision',
        title: `Nuvv Guard: ${tag.name}`,
        subtitle: tag.price === 0 ? `${tagCount}x Tag(s) sem mensalidade (Taxa única)` : tag.description,
        unitPrice: tag.price,
        quantity: tagCount,
        totalPrice: tagTotal,
      });
      totalMonthly += tagTotal;
      totalOriginal += tagTotal;
    }
  }

  // 6. TV Corporativa (Esporte e Notícia)
  if (selection.tvPlanId) {
    const tv = BUSINESS_TV_PLANS.find((t) => t.id === selection.tvPlanId);
    if (tv) {
      items.push({
        id: tv.id,
        category: 'tv',
        title: `TV Corporativa: ${tv.name}`,
        subtitle: `${tv.channelsCount} Canais ao vivo (Jornalismo 24h & Esportes) via NuvvPlay`,
        unitPrice: tv.price,
        quantity: 1,
        totalPrice: tv.price,
      });

      totalMonthly += tv.price;
      totalOriginal += tv.price;
    }
  }

  // 7. Segurança Digital & Endpoint
  if (selection.securityPlanId) {
    const sec = SECURITY_PLANS.find((s) => s.id === selection.securityPlanId);
    if (sec) {
      items.push({
        id: sec.id,
        category: 'seguranca',
        title: `Segurança Digital: ${sec.name}`,
        subtitle: `Proteção Anti-Ransomware, VPN e Gerenciador para ${sec.userCount} usuários`,
        unitPrice: sec.price,
        quantity: 1,
        totalPrice: sec.price,
      });

      totalMonthly += sec.price;
      totalOriginal += sec.price;
    }
  }

  // 8. Hotspot Wi-Fi Social
  if (selection.socialWifiPlanId) {
    const wifi = SOCIAL_WIFI_PLANS.find((w) => w.id === selection.socialWifiPlanId);
    if (wifi && wifi.price > 0) {
      items.push({
        id: wifi.id,
        category: 'socialWifi',
        title: `Hotspot: ${wifi.name}`,
        subtitle: `${wifi.simultaneousUsers} • Captive Portal Personalizado & LGPD`,
        unitPrice: wifi.price,
        quantity: 1,
        totalPrice: wifi.price,
      });

      totalMonthly += wifi.price;
      totalOriginal += wifi.price;
    }
  }

  const roundedTotal = Number(totalMonthly.toFixed(2));
  const roundedOriginal = Number(totalOriginal.toFixed(2));
  const economyMonthly = Math.max(0, Number((roundedOriginal - roundedTotal).toFixed(2)));

  const leadSummaryText = items
    .map((item) => `${item.title} (R$ ${item.totalPrice.toFixed(2).replace('.', ',')})`)
    .join(' + ');

  return {
    items,
    totalMonthly: roundedTotal,
    totalOriginal: roundedOriginal,
    economyMonthly,
    itemCount: items.length,
    leadSummaryText: `Combo Personalizado B2B [Total: R$ ${roundedTotal.toFixed(2).replace('.', ',')}/mês]: ${leadSummaryText}`,
  };
}
