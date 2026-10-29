/**
 * Nuvv Global Partners - Data & Technical Specifications
 * Structured content for international carriers, MSPs, system integrators, and telecom brokers.
 */

export interface InternationalSolution {
  id: string;
  title: string;
  shortTag: string;
  badge: string;
  summary: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  route: string;
  iconName: string;
}

export interface PartnerModel {
  id: string;
  title: string;
  audience: string;
  description: string;
  benefits: string[];
  iconName: string;
}

export interface NetworkFeature {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const GLOBAL_NETWORK_STATS = [
  { value: '100%', label: 'Dedicated CIR 1:1 Bandwidth', subtext: 'Zero oversubscription on DIA circuits' },
  { value: '< 4h', label: 'Enterprise MTTR SLA', subtext: '24/7/365 bilingual carrier NOC' },
  { value: '99.9%', label: 'Network Uptime SLA', subtext: 'Contractual financial backed guarantee' },
  { value: '10 Gbps', label: 'Port Capacity Available', subtext: 'Fast Ethernet, 1GE and 10GE optical handoffs' },
];

export const INTERNATIONAL_SOLUTIONS: InternationalSolution[] = [
  {
    id: 'wholesale-connectivity',
    title: 'Carrier-Grade Local Loop & Last Mile Fiber',
    shortTag: 'Last Mile & Local Loop',
    badge: 'Carrier Wholesale',
    summary: 'Direct physical fiber access connecting enterprise customer premises, industrial facilities, and logistics hubs across Greater São Paulo and Brazil.',
    highlights: [
      'FTTB, FTTO and dedicated metro fiber drop architectures',
      'Point-to-Point (P2P) Ethernet Private Lines (E-Line)',
      'MEF-aligned Layer 2 transparent transport with QinQ (802.1ad)',
      'Interconnection with major Tier-3 Data Centers and PTTs',
    ],
    specs: [
      { label: 'Interfaces', value: '100M, 1GE, 10GE Optical SFP/SFP+' },
      { label: 'Protocols', value: 'Ethernet Layer 2, QinQ, Transparent MTU' },
      { label: 'SLA Repair', value: 'Under 4 Hours (24/7/365 NOC)' },
      { label: 'Topology', value: 'Ring Redundancy & Protected Local Loop' },
    ],
    route: '/en/wholesale-connectivity',
    iconName: 'Network',
  },
  {
    id: 'dedicated-internet-access',
    title: 'Mission-Critical Dedicated Internet Access (DIA)',
    shortTag: 'Dedicated Internet (DIA)',
    badge: '100% Guaranteed 1:1 CIR',
    summary: 'Uncompromised symmetrical enterprise internet connectivity with full BGP routing, public IPv4/IPv6 blocks, and direct low-latency peering at IX.br (São Paulo).',
    highlights: [
      '100% committed information rate (CIR 1:1) — No oversubscription',
      'Direct multi-gigabit peering with IX.br (São Paulo exchange)',
      'Full BGP multihomed routing with primary & secondary transit paths',
      'Dedicated proactive monitoring with automated ticket escalation',
    ],
    specs: [
      { label: 'Bandwidth', value: '100 Mbps to 10 Gbps Symmetrical' },
      { label: 'IP Addressing', value: 'Public IPv4 (/30, /29, /28) & IPv6 /48' },
      { label: 'Availability', value: '99.9% Uptime with Financial SLA' },
      { label: 'Routing', value: 'Own Autonomous System (ASN) with BGP Peering' },
    ],
    route: '/en/dedicated-internet-brazil',
    iconName: 'Radio',
  },
  {
    id: 'multi-site-connectivity',
    title: 'Multi-Site Interconnection & SD-WAN Underlay',
    shortTag: 'Multi-Site & SD-WAN',
    badge: 'Enterprise SD-WAN Underlay',
    summary: 'High-availability Brazilian fiber underlay designed for global SD-WAN overlays, interconnecting corporate headquarters, branch offices, and regional warehouses.',
    highlights: [
      'Low-jitter and deterministic latency across Brazilian metros',
      'Clean Layer 2 and Layer 3 transport optimized for SD-WAN appliances',
      'Single consolidated contract and management point for nationwide operations',
      'Hybrid topology options with diverse secondary fiber entries',
    ],
    specs: [
      { label: 'Overlay Compatibility', value: 'Cisco, Fortinet, Versa, Aruba, Velocloud' },
      { label: 'Management', value: 'Centralized Billing & Consolidated Technical NOC' },
      { label: 'Latency Profile', value: 'Optimized Intra-metro & Inter-state routing' },
      { label: 'Redundancy', value: 'Optional Dual-entry & Dual-path physical fiber' },
    ],
    route: '/en/multi-site-connectivity',
    iconName: 'Layers',
  },
];

export const PARTNER_MODELS: PartnerModel[] = [
  {
    id: 'msps-system-integrators',
    title: 'Managed Service Providers (MSPs) & Global SIs',
    audience: 'Global MSPs, IT Outsourcers, Cloud Integrators',
    description: 'We act as your trusted in-country telecom engineering and physical network extension. You own the customer relationship, contract, and upper IT stack; Nuvv engineers, deploys, and maintains the mission-critical Brazilian fiber underlay.',
    benefits: [
      'Fast feasibility response (under 24h turnaround for standardized sites)',
      'Co-branded or transparent white-label delivery options',
      'Dedicated English-speaking technical partner manager',
      'Bilingual 24/7/365 NOC escalation matrix',
    ],
    iconName: 'Server',
  },
  {
    id: 'wholesale-carriers',
    title: 'Wholesale Telecommunications Carriers & Aggregators',
    audience: 'Tier-1/2 International Carriers, Network Aggregators',
    description: 'Bridge your global network into Brazil without capital-intensive physical builds. Interconnect via carrier-to-carrier NNI at leading São Paulo data centers and extend your footprint with our high-density metropolitan fiber.',
    benefits: [
      'NNI interconnection at Equinix (SP2, SP4), Ascenty, and IX.br PoPs',
      'MEF-compliant Ethernet access and transparent Layer 2 transport',
      'Standardized Carrier-to-Carrier MSAs and Master Service Agreements',
      'Strict contractual MTTR commitments with SLA penalties',
    ],
    iconName: 'Cpu',
  },
  {
    id: 'telecom-brokers',
    title: 'Telecom Brokers & Technology Agents',
    audience: 'Independent Agents, Telecom Advisors, Sourcing Consultants',
    description: 'Assist your international enterprise clients expanding into Latin America. Receive competitive quotation support, dedicated technical pre-sales engineering, and reliable circuit activation without administrative friction.',
    benefits: [
      'Transparent quoting with zero hidden Brazilian telecom taxes (ICMS/FUST built-in)',
      'Pre-sales engineering support on client discovery calls',
      'Structured referral and agency compensation models',
      'Project management tracking from purchase order to live circuit acceptance',
    ],
    iconName: 'Briefcase',
  },
];

export const WHY_NUVV_ARGUMENTS = [
  {
    title: 'Dense Metropolitan Fiber Footprint',
    description: 'Nuvv operates owned, high-density optical fiber infrastructure across the Greater São Paulo industrial belt, combined with strategic nationwide carrier interconnections (NNI) across all 26 Brazilian states.',
    iconName: 'Network',
  },
  {
    title: 'Direct IX.br Peering & Data Center Connectivity',
    description: 'Direct multi-10Gbps cross-connects with IX.br (São Paulo) — the largest internet exchange in the world by traffic volume — ensuring ultra-low latency routing to international submarine cables and hyperscalers.',
    iconName: 'Globe',
  },
  {
    title: 'Carrier-Grade 24/7/365 NOC Support',
    description: 'Bilingual network operations center (NOC) with continuous telemetry, proactive threshold alerting, automated optical OTDR diagnosis, and a 4-hour contractual Mean Time to Repair (MTTR).',
    iconName: 'Headphones',
  },
  {
    title: 'Agile Delivery vs. Legacy Bureaucracy',
    description: 'Avoid the multi-month bureaucratic delays typical of legacy South American incumbents. We deliver fast technical feasibility turnaround, flexible project staging, and transparent communication.',
    iconName: 'Clock',
  },
];

export const INTERNATIONAL_FAQS = [
  {
    question: 'How fast can Nuvv provide technical feasibility and pricing for Brazilian addresses?',
    answer: 'For standard enterprise locations within Greater São Paulo and major metropolitan corridors, our wholesale team returns verified GPS coordinates, route feasibility, and formal commercial pricing within 24 business hours. For complex multi-site projects across remote Brazilian states, turnaround is typically 48 to 72 hours.',
  },
  {
    question: 'Where can international carriers interconnect with Nuvv (NNI)?',
    answer: 'We maintain direct interconnection presence and carrier cross-connect availability at major carrier-neutral data centers in the São Paulo metropolitan area (including Equinix SP2 / SP4, Ascenty, and core IX.br exchanges), as well as direct physical interconnects at our primary central offices.',
  },
  {
    question: 'What SLAs does Nuvv provide for Dedicated Internet Access (DIA) and Local Loops?',
    answer: 'Our standard enterprise DIA circuits carry a 99.9% availability SLA with a 4-hour contractual Mean Time to Repair (MTTR), backed by financial credit penalties. We offer 24/7/365 proactive monitoring with automated ticket generation upon loss of signal.',
  },
  {
    question: 'Does Nuvv support transparent Layer-2 QinQ and Jumbo Frames for carrier aggregation?',
    answer: 'Yes. Our wholesale Ethernet private line (E-Line) and local loop services fully support IEEE 802.1ad (QinQ) double tagging, transparent VLAN pass-through, and configurable MTU sizes up to 9000 bytes (Jumbo Frames) for cloud and carrier interconnection.',
  },
  {
    question: 'Can contracts and invoices be issued in foreign currency (USD)?',
    answer: 'Yes. For qualified international service providers, MSPs, and global carriers, we provide quotation references and contractual agreements structured in US Dollars (USD) or local Brazilian Reais (BRL), adhering to international compliance and cross-border billing frameworks.',
  },
];
