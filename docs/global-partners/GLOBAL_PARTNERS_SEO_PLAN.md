# Nuvv Global Partners — Plano Estratégico de SEO Internacional e Editorial (Fase 1)

> **Documento:** GLOBAL_PARTNERS_SEO_PLAN.md  
> **Projeto:** Nuvv Global Partners — "Your Local Connectivity Partner in Brazil"  
> **Data:** 27 de Outubro de 2026  
> **Autor:** Especialista em SEO Técnico Internacional e Estratégia B2B de Telecomunicações  
> **Status:** Concluído / Fase 1 (Planejamento Editorial & SEO)

---

## 1. Estratégia de SEO Internacional

### 1.1. Princípios e Diretrizes Globais
1. **Idioma & Localização:**
   - Todo o conteúdo das páginas sob `/en/` será redigido em **inglês americano nativo corporativo (US English)**, focado na terminologia padrão de operadoras globais (Carrier-grade, DIA, Local Loop, NNI, SLA, MTTR, Underlay, PoP).
   - A tag do cabeçalho HTML será `<html lang="en">` em todas as rotas `/en/*`.
2. **Canonicalização Rigorosa:**
   - Cada página internacional terá seu próprio `<link rel="canonical" href="https://nuvv.com.br/en/..."/>` autorreferencial, eliminando risco de conteúdo duplicado com páginas locais em português.
3. **Estratégia de Hreflang:**
   - Páginas que possuem equivalência conceitual receberão anotações bidirecionais de hreflang:
     ```html
     <link rel="alternate" hreflang="en" href="https://nuvv.com.br/en/wholesale-connectivity/" />
     <link rel="alternate" hreflang="pt-BR" href="https://nuvv.com.br/empresarial" />
     <link rel="alternate" hreflang="x-default" href="https://nuvv.com.br/" />
     ```
   - Páginas de escopo exclusivamente internacional (ex: `/en/partners/`) terão hreflang apontando para si mesmas ou sem equivalência direta para evitar falsas correspondências.
4. **Sitemap Internacional:**
   - Criação de um índice de sitemap ou integração no `public/sitemap.xml` com `<loc>https://nuvv.com.br/en/...</loc>` e prioridades elevadas (`0.90` a `1.0`).
5. **Schema.org Específico de Telecomunicações:**
   - Inclusão dos tipos Schema.org `Organization`, `TelecomService`, `ServiceChannel` e `ContactPage`, vinculando a Nuvv à jurisdição brasileira e sua capacidade de entrega de conectividade.

---

## 2. Matriz de Palavras-Chave e Intenção de Busca

| Cluster de Busca | Termos Principais | Intenção de Busca | Volume Estimado & Concorrência | Página de Destino Recomendada |
| :--- | :--- | :--- | :--- | :--- |
| **Wholesale & Local Access** | `brazil local loop provider`<br>`brazil last mile fiber`<br>`local access provider brazil` | Comercial / Investigativa (Carriers e Agregadores buscando saída local) | Baixo volume, altíssimo valor comercial por lead (High ACV) | `/en/wholesale-connectivity/` |
| **Parcerias & Canal B2B** | `telecom partner in brazil`<br>`brazil connectivity partner`<br>`msp connectivity brazil` | Transacional / Parceria (MSPs e Integradores precisando de parceiro em solo) | Nicho B2B internacional | `/en/partners/` |
| **Internet Dedicada (DIA)** | `dedicated internet access brazil`<br>`brazil DIA provider`<br>`metro ethernet brazil` | Transacional (Empresas e integradores contratando link corporativo) | Médio volume internacional B2B | `/en/dedicated-internet-brazil/` |
| **Redes Multi-ponto / SD-WAN** | `multi site connectivity brazil`<br>`sd wan underlay brazil`<br>`mpls p2p brazil` | Investigativa / Solução de Projeto (Interligação de filiais no Brasil) | Baixo volume, contratos de longo prazo | `/en/multi-site-connectivity/` |
| **Visão Geral Nuvv Brasil** | `brazil telecom operator`<br>`nuvv brazil connectivity` | Navegacional / Institucional | Institucional | `/en/` |

---

## 3. Planejamento Editorial Detalhado por Página

---

### Página 1: Home Internacional (`/en/`)

- **Objetivo Comercial:** Estabelecer autoridade imediata da Nuvv como o parceiro ágil e confiável para conectividade de dados e telecom no Brasil. Converter visitantes em solicitações de parcerias e RFQs de viabilidade.
- **Persona Principal:** VP de Operações Internacionais ou Diretor de Parcerias Globais de MSPs dos EUA/Europa e Agregadores de Conectividade.
- **Intenção de Busca:** Navegacional e Institucional B2B ("Reliable telecom connectivity partner in Brazil").
- **Palavra-chave Principal:** `Brazil Telecom Connectivity Partner`
- **Palavras-chave Secundárias:** `local network partner brazil`, `telecom infrastructure brazil`, `brazil data connectivity`.
- **Title Tag Sugerido:** `Nuvv Global Partners | Your Local Connectivity Partner in Brazil`
- **Meta Description:** `Expand your enterprise footprint across Brazil. High-performance Dedicated Internet Access (DIA), carrier-grade last mile fiber, and multi-site underlays for global MSPs and carriers.`
- **H1:** `Your Trusted Local Connectivity Partner in Brazil`
- **Estrutura de Cabeçalhos:**
  - `H2: Simplify Enterprise Connectivity in South America's Largest Economy`
  - `H2: Core Wholesale & B2B Capabilities`
    - `H3: Dedicated Internet Access (DIA 1:1)`
    - `H3: Carrier-Grade Last Mile & Local Loop`
    - `H3: Multi-Site Underlay & Private Ethernet`
  - `H2: Why Global Operators & Integrators Partner with Nuvv`
    - `H3: Native Metro Fiber Network & Strategic Neutral Host Integration`
    - `H3: Direct Peering at IX.br (São Paulo) & Tier-3 Data Centers`
    - `H3: 24/7/365 Bilingual NOC Support with Strict 4h Enterprise SLAs`
  - `H2: Tailored Partnership Models for Global Service Providers`
  - `H2: Ready to Connect Your Clients in Brazil?`
- **Principais Argumentos Comerciais:**
  - Eliminação da burocracia e lentidão das operadoras legadas tradicionais brasileiras.
  - Velocidade no retorno de viabilidade técnica (turnaround de até 24h para cotações).
  - SLA contratual agressivo (4 horas para circuitos dedicados).
  - Presença em São Paulo (capital econômica da América Latina).
- **CTA Principal:** `Request a Quote / Check Feasibility` & `Explore Partnership Models`
- **Links Internos:** `/en/partners/`, `/en/wholesale-connectivity/`, `/en/dedicated-internet-brazil/`, `/en/contact/`.
- **Validação Técnica Necessária:** Confirmar tempos médios reais de ativação de circuitos para parceiros internacionais.

---

### Página 2: Hub de Parcerias (`/en/partners/`)

- **Objetivo Comercial:** Explicar claramente como a Nuvv se relaciona com agentes do mercado internacional, demonstrando modelos operacionais (Carrier-to-Carrier, NNI, White-label para MSPs, Indicação Comercial comissionada).
- **Persona Principal:** Channel Managers, Gerentes de Parcerias de Telecom, Brokers Internacionais e Diretores de MSPs.
- **Intenção de Busca:** Parceria Comercial ("How to partner with a Brazilian telecom operator").
- **Palavra-chave Principal:** `Telecom Partnership in Brazil`
- **Palavras-chave Secundárias:** `MSP connectivity partner brazil`, `telecom channel partner brazil`, `wholesale carrier agreement brazil`.
- **Title Tag Sugerido:** `Partner Program | Wholesale & Channel Partnerships in Brazil — Nuvv`
- **Meta Description:** `Designed for MSPs, System Integrators, Carriers, and Telecom Brokers. Expand your global reach with reliable last mile, DIA, and seamless delivery in Brazil.`
- **H1:** `Empowering Global MSPs, Integrators & Telecom Carriers Across Brazil`
- **Estrutura de Cabeçalhos:**
  - `H2: Flexible Engagement Models Built for Global Scalability`
    - `H3: 1. Managed Service Providers (MSPs) & Global SIs`
    - `H3: 2. Wholesale Telecommunications Carriers & Aggregators`
    - `H3: 3. Telecom Brokers & Technology Agents`
  - `H2: What We Bring to Your Service Portfolio`
    - `H3: Fast Technical Turnaround & Instant Feasibility`
    - `H3: Carrier-to-Carrier Interconnection (NNI)`
    - `H3: Transparent SLAs and Proactive 24/7 Monitoring`
    - `H3: Clean Invoicing and Multi-currency Contracting Options`
  - `H2: The Partner Journey: From Quotation to Ongoing Assurance`
  - `H2: Apply to the Nuvv Global Partner Program`
- **Principais Argumentos Comerciais:**
  - A Nuvv atua como o braço de campo e de infraestrutura do parceiro em solo brasileiro.
  - O parceiro mantém o relacionamento e a fatura com o cliente final; a Nuvv entrega e garante a camada de conectividade (underlay).
- **CTA Principal:** `Join Our Partner Network`
- **Links Internos:** `/en/wholesale-connectivity/`, `/en/contact/`, `/en/`.
- **Validação Comercial Necessária:** Alinhar com a diretoria comercial as modalidades contratuais aceitas (faturamento direto em BRL vs cotação referenciada em USD).

---

### Página 3: Conectividade de Atacado & Last Mile (`/en/wholesale-connectivity/`)

- **Objetivo Comercial:** Capturar tráfego de busca altamente técnico de operadoras globais e agregadores que precisam de saída de rede física para clientes multinacionais no Brasil.
- **Persona Principal:** Engenheiros de Planejamento de Rede (Capacity Planners), Gerentes de Compras de Redes de Operadoras Globais (Procurement Telecom).
- **Intenção de Busca:** Transacional Técnica ("Buy local loop circuit in Brazil", "Last mile fiber access São Paulo").
- **Palavra-chave Principal:** `Brazil Local Loop Provider`
- **Palavras-chave Secundárias:** `brazil last mile connectivity`, `carrier ethernet brazil`, `wholesale fiber circuits brazil`, `e-line p2p brazil`.
- **Title Tag Sugerido:** `Brazil Local Loop & Last Mile Fiber Provider | Wholesale — Nuvv`
- **Meta Description:** `Reliable carrier-grade local access, local loop circuits, and last mile fiber across Greater São Paulo and Brazil. MEF-aligned Ethernet, E-Line, and high-capacity transport.`
- **H1:** `Carrier-Grade Local Loop & Last Mile Connectivity in Brazil`
- **Estrutura de Cabeçalhos:**
  - `H2: Overcoming Last-Mile Challenges in Brazilian Enterprise Deployments`
  - `H2: Wholesale Connectivity Portfolio`
    - `H3: Local Loop & Metro Access (FTTB / FTTO)`
    - `H3: Ethernet Private Lines (E-Line / Point-to-Point P2P)`
    - `H3: Carrier-to-Carrier NNI Interconnection`
  - `H2: Technical Specifications & Network Topology`
    - `H3: Protocol & Interfaces (Fast Ethernet, 1GE, 10GE optical ports)`
    - `H3: Low-Latency Routing & Ring Redundancy`
    - `H3: MTTR Commitments & Proactive NOC Monitoring`
  - `H2: Footprint Coverage: Core Dense Metro Network & Nationwide Aggregation`
  - `H2: Request Wholesale Pricing & Circuit Feasibility`
- **Principais Argumentos Comerciais:**
  - Alta capilaridade na região metropolitana de São Paulo e Alto Tietê, conectando polos industriais, galpões logísticos e centros empresariais.
  - Entrega de ponta a ponta com equipamentos homologados (Cisco, Huawei, Datacom).
- **CTA Principal:** `Request Circuit Feasibility & Pricing`
- **Links Internos:** `/en/dedicated-internet-brazil/`, `/en/contact/`, `/en/partners/`.
- **Validação Técnica Necessária:** Confirmar se há suporte a jumbo frames (MTU 9000) e VLAN Q-in-Q (802.1ad) para clientes wholesale.

---

### Página 4: Acesso Dedicado à Internet (`/en/dedicated-internet-brazil/`)

- **Objetivo Comercial:** Posicionar a Nuvv como fornecedora premium de link dedicado (DIA) para clientes corporativos de parceiros internacionais que exigem altíssima performance.
- **Persona Principal:** Arquitetos de Rede Globais, Consultores de TI Corporativa, Engenheiros de Telecomunicações de Multinacionais.
- **Intenção de Busca:** Transacional de Alta Performance ("Dedicated internet access Brazil 1:1 CIR").
- **Palavra-chave Principal:** `Dedicated Internet Access Brazil`
- **Palavras-chave Secundárias:** `brazil DIA link`, `symmetric fiber internet brazil`, `bgp peering brazil isp`, `enterprise internet access são paulo`.
- **Title Tag Sugerido:** `Dedicated Internet Access (DIA) in Brazil | 100% CIR Fiber — Nuvv`
- **Meta Description:** `Mission-critical Dedicated Internet Access (DIA) across Brazil. Guaranteed 100% 1:1 CIR bandwidth, direct IX.br peering, BGP routing, public IPs, and 4-hour SLA.`
- **H1:** `Mission-Critical Dedicated Internet Access (DIA) in Brazil`
- **Estrutura de Cabeçalhos:**
  - `H2: The Uncompromised Digital Backbone for Global Enterprises`
  - `H2: Technical Standards That Set Nuvv Apart`
    - `H3: 100% Guaranteed 1:1 Bandwidth (CIR - Committed Information Rate)`
    - `H3: Symmetrical Speeds from 100 Mbps to 10 Gbps`
    - `H3: Strategic ASN with Direct IX.br (São Paulo) Peering`
    - `H3: Full BGP Routing (IPv4 & IPv6 Allocated Blocks)`
  - `H2: Enterprise SLA Commitments`
    - `H3: 99.9% Uptime with Financial Guarantees`
    - `H3: 4-Hour Mean Time to Repair (MTTR)`
    - `H3: 24/7/365 Dedicated Engineering NOC Support`
  - `H2: Ideal Use Cases: Cloud On-Ramp, Financial Operations, and Global ERPs`
  - `H2: Secure Your Dedicated Circuit in Brazil`
- **Principais Argumentos Comerciais:**
  - Sem sobreposição ou gargalo (*oversubscription* zero).
  - Suporte de engenharia para configuração de sessões BGP diretamente com a matriz do cliente.
- **CTA Principal:** `Request a DIA Proposal`
- **Links Internos:** `/en/wholesale-connectivity/`, `/en/multi-site-connectivity/`, `/en/contact/`.
- **Validação Técnica Necessária:** Confirmar capacidade máxima de porta de entrega (1 Gbps vs 10 Gbps) no backbone atual.

---

### Página 5: Redes Corporativas & SD-WAN Underlay (`/en/multi-site-connectivity/`)

- **Objetivo Comercial:** Apresentar a Nuvv como o provedor de infraestrutura de conectividade física (underlay) para empresas com múltiplas plantas, centros de distribuição ou escritórios no Brasil.
- **Persona Principal:** Diretores de TI Globais, Provedores de SD-WAN (ex: Cisco Meraki, Fortinet, Versa) buscando fibra local para suas caixas.
- **Intenção de Busca:** Solução Corporativa ("Multi-site corporate connectivity in Brazil", "Brazil SD-WAN underlay provider").
- **Palavra-chave Principal:** `Multi-Site Connectivity Brazil`
- **Palavras-chave Secundárias:** `sd-wan underlay brazil`, `intercompany vpn brazil`, `corporate network interconnection brazil`.
- **Title Tag Sugerido:** `Multi-Site Connectivity & SD-WAN Underlay in Brazil | Nuvv`
- **Meta Description:** `Interconnect branches, warehouses, and headquarters across Brazil. High-availability fiber underlays engineered for global SD-WAN, MPLS, and hybrid networks.`
- **H1:** `High-Availability Multi-Site Connectivity & SD-WAN Underlay in Brazil`
- **Estrutura de Cabeçalhos:**
  - `H2: Connecting Distributed Enterprise Operations Across Brazil`
  - `H2: Underlay Engineered for Global SD-WAN Overlays`
    - `H3: Low-Jitter, Low-Latency Fiber Paths`
    - `H3: Diverse Dual-Route Redundancy Options`
    - `H3: Transparent Layer-2 & Layer-3 Delivery`
  - `H2: Branch-to-Branch & Branch-to-Cloud Topology`
  - `H2: Centralized Management & Single Point of Accountability`
  - `H2: Plan Your Brazilian Multi-Site Network`
- **Principais Argumentos Comerciais:**
  - Simplificação para empresas estrangeiras que enfrentam dificuldades para contratar 5 ou 10 provedores regionais diferentes no Brasil. A Nuvv centraliza o contrato e a gestão técnica.
- **CTA Principal:** `Schedule a Multi-Site Network Consultation`
- **Links Internos:** `/en/dedicated-internet-brazil/`, `/en/contact/`, `/en/partners/`.

---

### Página 6: Contato & Solicitação de Cotação (`/en/contact/`)

- **Objetivo Comercial:** Converter as intenções de busca em dados estruturados de projetos (RFQ) para atendimento ágil pelo time de atacado da Nuvv.
- **Persona Principal:** Compradores corporativos, engenheiros de telecom e consultores internacionais.
- **Intenção de Busca:** Transacional direta ("Request telecom quote Brazil", "Nuvv Global Partners contact").
- **Palavra-chave Principal:** `Request Telecom Quote Brazil`
- **Title Tag Sugerido:** `Request a Quote | International Telecom Feasibility in Brazil — Nuvv`
- **Meta Description:** `Submit your connectivity requirements, circuit RFP, or partner inquiry for Brazil. Fast technical feasibility feedback within 24 business hours.`
- **H1:** `Connect with Our Global Telecom Desk in Brazil`
- **Campos do Formulário de Alta Conversão:**
  - Company & Partner Profile (MSP, Carrier, Enterprise)
  - Work Email & Business Phone
  - City / State / Address of the Circuit in Brazil
  - Service Type (DIA, Local Loop, Multi-Site)
  - Required Bandwidth
  - Desired Installation Timeline
- **CTA Principal:** `Submit Feasibility Request (24h Turnaround)`
