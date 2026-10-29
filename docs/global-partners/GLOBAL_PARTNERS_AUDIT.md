# Nuvv Global Partners — Auditoria Técnica e Diagnóstico (Fase 1)

> **Documento:** GLOBAL_PARTNERS_AUDIT.md  
> **Projeto:** Nuvv Global Partners — "Your Local Connectivity Partner in Brazil"  
> **Data:** 27 de Outubro de 2026  
> **Autor:** Equipe de Arquitetura de Software & SEO Técnico Internacional  
> **Status:** Concluído / Fase 1 (Auditoria e Diagnóstico)

---

## 1. Resumo Executivo da Auditoria

A presente auditoria técnica inspecionou integralmente o repositório `nuvv-site`, analisando arquitetura de software, dependências, pipelines de build/deploy, infraestrutura de hospedagem na VPS de produção, mecânica de indexação de SEO, desempenho (Core Web Vitals) e segurança.

### Principais Conclusões:
1. **Base Técnica Sólida e Moderna:** O projeto utiliza React 19, TypeScript 5.7, Tailwind CSS 3.4 e Vite 6.2, com um backend Express 5 e banco de dados SQLite (`better-sqlite3` em modo WAL). A performance local e de bundle é excelente.
2. **Gargalo Crítico de SEO Internacional no Modelo Atual:** O site é 100% Client-Side Rendered (CSR SPA). Todas as requisições recebem o mesmo arquivo estático `dist/index.html` com metadados fixos em português (`<html lang="pt-BR">`, títulos, descrições e Schema.org em português). Embora o Googlebot renderize JavaScript em fila secundária (*second wave*), o **Bingbot** possui suporte a CSR severamente limitado ou nulo para indexação primária, e rastreadores B2B (LinkedIn unfurl, Slack, WhatsApp, ferramentas de procurement de telecom) não executam JavaScript.
3. **Viabilidade Sem Migração:** É plenamente viável criar a presença internacional `/en/*` **sem migrar para Next.js**, sem adquirir serviços pagos de terceiros e sem alterar a infraestrutura existente, utilizando **Pré-renderização Estática de Rotas Específicas no Build do Vite (SSG)** acoplada ao Express estático já existente.
4. **Isolamento Total do Site Brasileiro:** A expansão internacional pode ser desenvolvida com impacto zero nas páginas brasileiras, mantendo rotas, componentes e bases de dados preservadas.

---

## 2. Diagnóstico Arquitetural do Repositório

### 2.1. Stack Tecnológico e Versões

| Componente | Tecnologia | Versão | Observações Técnicas |
| :--- | :--- | :--- | :--- |
| **Core Frontend** | React / React DOM | `^19.0.0` | Versão moderna; exige compatibilidade de hooks e tipagens. |
| **Linguagem** | TypeScript | `^5.7.3` | Tipagem estrita com target `ES2020` e resolução de módulos `bundler`. |
| **Roteamento** | React Router DOM | `^7.2.0` | Configurado em modo declarativo client-side (`<Routes>`, `<Route>`). |
| **Build Tool** | Vite | `^6.2.0` | Plugin `@vitejs/plugin-react` v4.3.4; build rápido (~12-22s). |
| **Estilização** | Tailwind CSS / PostCSS | `^3.4.17` | Utility-first; design tokens bem definidos em `tailwind.config.js`. |
| **Ícones** | Lucide React | `^1.16.0` | Biblioteca de ícones SVG consistente e leve. |
| **Mapas / Geo** | Leaflet / React Leaflet | `^1.9.4` | Usado para renderização de mapas de viabilidade e polígonos. |
| **Backend API** | Node.js / Express | `^5.2.1` | API interna, tracking de analytics e envio de leads comerciais. |
| **Banco de Dados** | SQLite via `better-sqlite3` | `^13.0.3` | Arquivo `data/nuvv.sqlite` em modo WAL (Write-Ahead Logging). |
| **E-mail / Notificação** | Nodemailer | `^9.0.6` | Despacho de alertas SMTP para equipe comercial. |
| **Infraestrutura** | VPS Ubuntu 24.04 LTS | `200.6.48.3` | Nginx 1.24 como proxy reverso + SSL Let's Encrypt + PM2 na porta 3001. |

### 2.2. Estrutura de Diretórios Atual

```
nuvv-site/
├── .agents/                    # Memórias, regras, agentes e workflows operacionais
├── data/                       # Banco de dados nuvv.sqlite e uploads locais
├── dist/                       # Artefatos gerados pelo build de produção
├── docs/                       # Apresentações técnicas e treinamentos comerciais
├── public/                     # Imagens, robots.txt, sitemap.xml, assets estáticos
├── server/                     # Backend Express, SQLite, controladores e rotas de API
│   ├── db.js                   # Inicialização de tabelas e conexões SQLite
│   ├── index.js                # Servidor principal, APIs e fallback estático do SPA
│   └── smtp.js                 # Configuração de envio de e-mails comerciais
└── src/
    ├── assets/                 # CSS global (index.css)
    ├── components/             # Componentes modulares
    │   ├── admin/              # Dashboard de analytics, contatos e blog
    │   ├── common/             # Modais, LeadModal, QuickAccess, SEO, mapas
    │   ├── empresarial/        # Cards de planos PJ, modais de PABX e soluções B2B
    │   ├── layout/             # Header com SuperMenu, Footer institucional, CitySelector
    │   ├── residencial/        # Vitrine de planos fibra, streaming e telemedicina
    │   └── suporte/            # Teste de velocidade, SAC e 2ª via
    ├── data/                   # Catálogos de dados estruturados
    │   ├── businessPlans.ts    # Especificações de DIA, CIR, SLA, IP fixo e simetria
    │   ├── residentialOffers.ts# Catálogo da vitrine residencial
    │   ├── services.ts         # Lista de soluções corporativas
    │   ├── seoSchemas.ts       # Schemas JSON-LD da Nuvv para SEO local
    │   └── siteConfig.ts       # Metadados institucionais, contatos e redes sociais
    ├── hooks/                  # Hooks customizados (analytics, tracking de pageviews)
    ├── pages/                  # 28 páginas e landing pages do site
    ├── services/               # Motores de viabilidade, geocoding e sumarização
    ├── App.tsx                 # Mapeamento central de rotas do React Router
    └── main.tsx                # Ponto de entrada do React
```

---

## 3. Auditoria Detalhada de SEO e Indexação

### 3.1. O Mecanismo Atual de SEO (`SEO.tsx`)

O componente `src/components/common/SEO.tsx` é renderizado dentro de cada página React. Ele utiliza um hook `useEffect` para manipular o DOM no navegador do usuário:

- Modifica `document.title`.
- Localiza ou cria `<meta name="description">`, `<meta name="keywords">`, `<meta property="og:...">` e `<meta name="twitter:...">`.
- Localiza ou cria `<link rel="canonical">`.
- Injeta um `<script id="nuvv-schema-jsonld" type="application/ld+json">`.

#### 🔴 Diagnóstico de Falhas do Mecanismo Atual para Mercado Internacional:
1. **Hardcoded Language & Locale:**
   - Em `SEO.tsx` (linhas 76 e 94), os atributos estão fixados:
     ```typescript
     setMeta('language', 'Portuguese');
     setMeta('og:locale', 'pt_BR', true);
     ```
   - O schema padrão injeta `'inLanguage': 'pt-BR'` (linha 178).
   - O arquivo `index.html` estático possui `<html lang="pt-BR">`.
   - Se uma rota `/en/*` usar o componente atual sem refatoração, o cabeçalho estático e os dados estruturados informarão aos motores de busca que o documento é em português, arruinando a classificação geográfica e semântica no Google e no Bing.

2. **Déficit Crítico de CSR no Bingbot e Crawlers Corporativos:**
   - O Googlebot executa scripts através do *Evergreen Chromium*, mas submete o site a um processo de duas etapas (crawling do HTML inicial seguido por fila de renderização).
   - O **Bingbot** (motor que alimenta o ecossistema corporativo da Microsoft, Windows Search, Copilot corporativo e Edge em empresas dos EUA/Europa) possui restrições severas de execução de scripts em sites SPA puros. Se o HTML inicial chegar vazio (`<div id="root"></div>`), o Bing frequentemente indexa apenas o título em português do template genérico ou descarta a página.
   - Crawlers de redes sociais (LinkedIn Post Inspector, WhatsApp, Slack, Teams) **não executam JavaScript**. O compartilhamento de qualquer link `/en/...` exibirá o thumbnail e o texto da home em português.

3. **Ausência de Hreflang:**
   - Não existe nenhuma tag `<link rel="alternate" hreflang="..." href="...">` configurada.
   - O Google precisa entender expressamente quando uma página em inglês é uma oferta internacional direcionada a parceiros globais e quando ela se relaciona ao ecossistema da Nuvv.

4. **Sitemap Atual (`public/sitemap.xml`):**
   - Possui 203 URLs, todas do escopo brasileiro (`pt-BR`).
   - Não há menção a rotas em inglês ou anotações `xhtml:link rel="alternate"` para internacionalização.
   - Algumas URLs listadas no sitemap são redirects ou âncoras (ex: `/residencial/monte-seu-combo`).

5. **Robots.txt (`public/robots.txt`):**
   - Configurado adequadamente com `Allow: /` e `Disallow: /admin/`, apontando para o sitemap principal. Não há impedimentos para novas rotas `/en/`.

---

## 4. Auditoria de Backend e Fluxo de Dados

### 4.1. Servidor Express (`server/index.js`)
- **Porta:** 3001 (gerenciado pelo PM2 com auto-restart).
- **Tratamento de Rotas do SPA:**
  ```javascript
  app.use(express.static(distPath, { ... }));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Endpoint não encontrado' });
    if (req.method === 'GET' || req.method === 'HEAD') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
  ```
- **Comportamento Atual:** Qualquer rota como `/en/partners` que não seja um arquivo estático existente na pasta `dist/` é capturada pelo fallback e recebe o `index.html` raiz.
- **Oportunidade Arquitetural:** Se o build gerar arquivos HTML físicos dentro de `dist/en/...`, o Express os servirá nativamente através do `express.static(distPath)` antes de atingir o fallback, garantindo entrega imediata de HTML 100% legível por qualquer bot sem alterar o código do servidor!

### 4.2. Sistema de Captação de Leads (`server/db.js`)
- A tabela `commercial_leads` já armazena:
  - `source_page TEXT NOT NULL`
  - `name TEXT`
  - `company TEXT`
  - `cnpj TEXT` (para parceiros internacionais, precisará aceitar VAT / Tax ID / Company Reg Number ou ser opcional)
  - `phone TEXT`
  - `email TEXT`
  - `details TEXT`
  - `created_at DATETIME`
- O backend já possui suporte a rastreamento de analytics em `page_views` com captura de `referrer`, `utm_source`, `utm_medium`, `user_agent` e detecção de bots.

---

## 5. Componentes Reutilizáveis Identificados

A arquitetura atual possui componentes de alto nível visual que podem ser aproveitados sem retrabalho de design:

| Componente | Localização | Como será aproveitado na área internacional |
| :--- | :--- | :--- |
| **`Modal`** | `src/components/common/Modal.tsx` | Base para formulários de RFQ, cotação e especificações técnicas. |
| **`PartnerCarousel`** | `src/components/common/PartnerCarousel.tsx` | Vitrine de ecossistema de infraestrutura e trânsito IP (IX.br, fornecedores de fibra). |
| **`QuickAccessBar`** | `src/components/common/QuickAccessBar.tsx` | Barra de ação rápida para contato direto via WhatsApp comercial / e-mail B2B. |
| **`BusinessLeadModal`** | `src/components/empresarial/BusinessLeadModal.tsx` | Base conceitual para o futuro modal de cotação de circuitos para parceiros. |
| **Card de Soluções** | `src/components/empresarial/SolutionsGrid.tsx` | Estrutura de grid para apresentar E-Line, DIA, Local Loop e Multi-site. |
| **Tokens Tailwind** | `tailwind.config.js` | Paleta de cores corporativa (`nuvv-purple`, `nuvv-dark`, `nuvv-green`), sombras e tipografia Poppins. |

---

## 6. Riscos Técnicos e Limitações Identificadas

1. **Risco de Falso Bilinguismo no Cabeçalho:** O `Header.tsx` possui 700+ linhas de código com menus, busca de cidades brasileiras (`CitySelectorModal`) e atalhos de SAC (2ª via). **Não se deve** tentar forçar a navegação internacional dentro do header residencial brasileiro. O ecossistema internacional requer um header limpo, focado em parceiros B2B e telecom wholesale, com troca de idioma explícita.
2. **Risco de Cache em Produção:** Como evidenciado nas atualizações anteriores, Nginx e navegadores realizam cache de assets estáticos. Rotas e metadados internacionais exigem política rigorosa de versionamento de assets (hashing do Vite) e cabeçalhos adequados.
3. **Validação de Cobertura Geográfica:** A comunicação não pode induzir o parceiro estrangeiro a acreditar que a Nuvv possui rede física própria de última milha em todos os 5.570 municípios do Brasil. O posicionamento deve deixar claro a combinação de **Rede Própria de Alta Densidade (Grande São Paulo e Alto Tietê)** somada à **Capacidade de Agregação Nacional via Redes Neutras e Acordos de Interconexão (NNI)**.
