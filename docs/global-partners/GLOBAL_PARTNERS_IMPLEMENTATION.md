# Nuvv Global Partners — Plano de Implementação Técnica (Fase 1)

> **Documento:** GLOBAL_PARTNERS_IMPLEMENTATION.md  
> **Projeto:** Nuvv Global Partners — "Your Local Connectivity Partner in Brazil"  
> **Data:** 27 de Outubro de 2026  
> **Autor:** Engenheiro Líder de Software & Arquiteto Web  
> **Status:** Concluído / Fase 1 (Planejamento Técnico e Critérios de Aceitação)

---

## 1. Visão Geral da Implementação (Fase 2)

Este documento estabelece o plano de ação detalhado para a execução técnica das páginas do projeto **Nuvv Global Partners**.

> ⚠️ **IMPORTANTE:** Nenhuma implementação de código ou alteração em produção é executada nesta Fase 1. A execução abaixo aguarda aprovação explícita da diretoria.

---

## 2. Separação de Responsabilidades: O que Existe vs O que Será Criado

| Categoria | Itens | Status no Projeto |
| :--- | :--- | :--- |
| **Já Existe (Preservado 100%)** | • Todo o site brasileiro (`/`, `/residencial`, `/empresarial`, `/pabx`, `/telefonia`, etc.)<br>• Backend Express 5 e banco SQLite WAL (`data/nuvv.sqlite`)<br>• Tabela `commercial_leads` e `page_views`<br>• Design tokens Tailwind e fontes Poppins<br>• Infraestrutura VPS (`200.6.48.3`), Nginx, Certbot e PM2 | **Intocado / Reutilizado** |
| **A Desenvolver (Escopo Internacional)** | • Layout internacional dedicado (`GlobalHeader.tsx`, `GlobalFooter.tsx`)<br>• 6 páginas em inglês (`Home`, `Partners`, `Wholesale`, `DedicatedInternet`, `MultiSite`, `Contact`)<br>• Componente `GlobalSEO.tsx` com `<html lang="en">`, tags Open Graph e Schemas internacionais<br>• Script de pré-renderização estática pós-build (`scripts/prerender-en.js`)<br>• Formulário de cotação internacional `InternationalRfqModal.tsx` | **Novo Desenvolvimento** |
| **Depende de Validação Comercial** | • Prazos médios contratuais de ativação para divulgação externa<br>• Política de precificação (faturamento em BRL ou indexação USD)<br>• Canais de comunicação preferenciais para parceiros (WhatsApp corporativo em inglês vs e-mail exclusivo) | **Pendente de Decisão** |
| **Depende de Validação Técnica** | • Confirmação de suporte a Jumbo Frames / VLAN Q-in-Q no backbone de atacado<br>• Lista de Data Centers com conexão direta (ex: Equinix SP2/SP4, Ascenty, Scala) | **Pendente de Validação de Rede** |

---

## 3. Relação Completa de Arquivos

### 3.1. Arquivos a Criar:

1. **Layout e Navegação Internacional:**
   - `src/components/layout/en/GlobalHeader.tsx` (Navegação internacional simplificada B2B)
   - `src/components/layout/en/GlobalFooter.tsx` (Rodapé corporativo internacional com compliance e links)
   - `src/components/common/GlobalSEO.tsx` (Injetor de SEO e metadados específicos para inglês)
2. **Páginas Internacionais:**
   - `src/pages/en/GlobalHome.tsx` (`/en/`)
   - `src/pages/en/Partners.tsx` (`/en/partners/`)
   - `src/pages/en/WholesaleConnectivity.tsx` (`/en/wholesale-connectivity/`)
   - `src/pages/en/DedicatedInternetBrazil.tsx` (`/en/dedicated-internet-brazil/`)
   - `src/pages/en/MultiSiteConnectivity.tsx` (`/en/multi-site-connectivity/`)
   - `src/pages/en/Contact.tsx` (`/en/contact/`)
3. **Componentes e Modais:**
   - `src/components/en/InternationalRfqModal.tsx` (Formulário de viabilidade técnica e RFQ)
   - `src/components/en/NetworkTopologyDiagram.tsx` (Ilustração técnica de topologia de interconexão)
4. **Dados e Conteúdo Estruturado:**
   - `src/data/en/internationalData.ts` (Textos, especificações técnicas de circuitos, certificações e FAQs em inglês)
   - `src/data/en/seoSchemasEn.ts` (Schemas JSON-LD em inglês: `TelecomService`, `LocalBusiness`, `Organization`)
5. **Automação de Build e Pré-Renderização Estática:**
   - `scripts/prerender-en.js` (Script Node.js executado no `npm run build` para gerar os HTMLs estáticos pré-renderizados em `dist/en/...`)

### 3.2. Arquivos Existentes a Alterar:

1. `src/App.tsx`:
   - Adicionar as 6 rotas `/en/*` encapsuladas no `<Routes>`.
2. `server/index.js`:
   - Ajustar o parser do endpoint `POST /api/commercial-leads` para aceitar formulários internacionais sem exigir CNPJ brasileiro (marcando `is_international: true`).
3. `public/sitemap.xml`:
   - Adicionar as novas URLs com `<xhtml:link rel="alternate" hreflang="en" ...>` e `<xhtml:link rel="alternate" hreflang="pt-BR" ...>`.
4. `package.json`:
   - Atualizar o script de build: `"build": "tsc && vite build && node scripts/prerender-en.js"`.

---

## 4. Ordem Cronológica de Execução (Roadmap da Fase 2)

### **Sprint 1: Fundação Estrutural e Layout Internacional**
1. Criar dados estruturados em `src/data/en/internationalData.ts` e `src/data/en/seoSchemasEn.ts`.
2. Construir `GlobalSEO.tsx`, garantindo atualização dinâmica e compatibilidade com tags `<html lang="en">`.
3. Desenvolver `GlobalHeader.tsx` e `GlobalFooter.tsx`, focados na experiência de parceiros estrangeiros.
4. Conectar as novas rotas em `src/App.tsx` com componentes esqueleto (Lazy loaded).

### **Sprint 2: Desenvolvimento Editorial das Páginas de Produto e Parceria**
1. Construir a Home Internacional (`/en/`).
2. Construir o Hub de Parcerias (`/en/partners/`).
3. Construir as páginas técnicas de atacado:
   - `/en/wholesale-connectivity/`
   - `/en/dedicated-internet-brazil/`
   - `/en/multi-site-connectivity/`
4. Implementar componentes visuais de alto nível (tabelas comparativas de SLA, diagramas de topologia, cards de arquitetura de rede).

### **Sprint 3: Captação de Leads, RFQ e Backend**
1. Desenvolver a página de contato `/en/contact/` e o modal `InternationalRfqModal.tsx`.
2. Atualizar o backend Express para receber leads internacionais e despachar alertas customizados por e-mail via `server/smtp.js`.
3. Validar a persistência no SQLite e verificar se o analytics interno (`page_views`) captura adequadamente os acessos em `/en/*`.

### **Sprint 4: Pré-Renderização Estática (SSG) e Auditoria de SEO Técnico**
1. Desenvolver e testar `scripts/prerender-en.js` para gerar `dist/en/**/*.html`.
2. Atualizar `public/sitemap.xml` com as URLs indexáveis.
3. Testar a compilação de produção (`npm run build`).
4. Testar a entrega dos HTMLs pré-renderizados através do Express local (`npm run preview` ou `npm run server`).

---

## 5. Testes e Critérios de Aceitação Técnica

Antes de qualquer deploy em produção na Fase 2, os seguintes critérios deverão ser comprovados:

### 1. Integridade de Código e Tipagem
- [ ] `npx tsc --noEmit` executa com código 0 (sem erros de TypeScript).
- [ ] `npm run build` conclui com sucesso gerando os artefatos em `dist/en/`.
- [ ] O tamanho do bundle principal não deve crescer mais de 10% (uso de lazy loading nas rotas `/en/*`).

### 2. Validação de SEO Internacional (Googlebot & Bingbot)
- [ ] **HTML Estático Inicial:** Ao executar `curl http://localhost:3001/en/partners/`, a resposta deve conter HTML legível com `<h1>`, `<title>`, `<meta name="description">` e conteúdo textual em inglês (não apenas `<div id="root"></div>`).
- [ ] **Idioma:** A tag raiz do HTML estático para rotas `/en/*` deve ser `<html lang="en">`.
- [ ] **Canonicais:** Cada página internacional deve apontar para si mesma em `https://nuvv.com.br/en/...`.
- [ ] **Open Graph:** Ao inspecionar com curl simulando o Facebook/LinkedIn bot (`User-Agent: facebookexternalhit`), as meta tags devem retornar título e descrição em inglês.
- [ ] **Schema.org:** O validador oficial Schema.org (ou Google Rich Results Test) deve validar o JSON-LD sem erros de sintaxe.

### 3. Preservação do Site Brasileiro
- [ ] As rotas existentes (`/`, `/residencial`, `/empresarial`, `/viabilidade`, etc.) continuam funcionando de forma 100% idêntica.
- [ ] A navegação entre páginas em português não é afetada.
- [ ] Os formulários e o sistema de viabilidade residencial e empresarial permanecem intactos.

### 4. Captação de Leads
- [ ] Submissão do formulário internacional grava o registro na tabela `commercial_leads` com `source_page` correta.
- [ ] O e-mail de notificação de lead internacional é gerado com formatação em inglês/português contendo os dados do parceiro.
