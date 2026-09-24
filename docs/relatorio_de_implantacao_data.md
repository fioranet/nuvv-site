# Relatório de Implantação e Deploy em Produção — Nuvv Telecom

**Data da Implantação:** 18 de Setembro de 2026  
**Ambiente:** Produção (VPS Ubuntu 24.04 LTS)  
**Status da Operação:** Concluído com Sucesso ✅  
**URL Pública:** [http://200.6.48.3](http://200.6.48.3)  
**Domínio Oficial:** `nuvv.com.br` / `www.nuvv.com.br` (Aguardando propagação DNS para ativação SSL)

---

## 1. Dados da Infraestrutura

| Parâmetro | Valor / Especificação |
| :--- | :--- |
| **IP do Servidor (VPS)** | `200.6.48.3` |
| **Porta SSH** | `22` |
| **Sistema Operacional** | Ubuntu 24.04 LTS (Noble Numbat) - Kernel 7.0.6-2-pve |
| **Usuário de Execução** | `nuvv` (com privilégios sudo configurados) |
| **Diretório da Aplicação** | `/var/www/nuvv-site` |
| **Diretório de Persistência** | `/var/www/nuvv-site/data` (Banco SQLite: `nuvv.sqlite`) |
| **Diretório de Logs** | `/var/www/nuvv-site/logs` |

---

## 2. Stack Tecnológica e Runtimes Instalados

* **Node.js:** v22.23.2 LTS (via NodeSource)
* **npm:** v10.9.8
* **Process Manager:** PM2 v7.0.4 (em modo `fork` e configurado no systemd `pm2-nuvv.service`)
* **Web Server & Reverse Proxy:** Nginx 1.24.0
* **Segurança & Firewall:** UFW (Uncomplicated Firewall) + Fail2ban
* **Certificados SSL:** Certbot 2.9.0 com plugin `python3-certbot-nginx`
* **Compilação C/C++:** `build-essential` e `python3` (essenciais para compilação do `better-sqlite3`)

---

## 3. Etapas Realizadas

### 3.1. Repositório e Higienização Local (Git)
1. **Proteção de Dados Sensíveis:** Validação do arquivo `.gitignore` para garantir que `.env`, `node_modules/`, `dist/` e bancos SQLite (`data/*.sqlite*`) nunca sejam versionados.
2. **Template de Variáveis:** Criação do `.env.example` documentando as variáveis de ambiente necessárias (portas, integração ISP Hubsoft, credenciais SMTP Nodemailer).
3. **Correção de Compatibilidade Express 5:** Ajustada a rota de fallback SPA no backend (`server/index.js`) substituindo a sintaxe descontinuada `app.get('*')` por middleware padrão compatível com `path-to-regexp` v8.
4. **Configuração PM2:** Criação do `ecosystem.config.cjs` padronizado para execução em modo `fork` (garantindo integridade concorrente com o modo WAL do SQLite).

### 3.2. Provisionamento do Servidor VPS
1. Elevação de privilégios via `su` e concessão de acesso `sudo` para o usuário de deploy `nuvv`.
2. Atualização dos índices de pacotes do sistema (`apt-get update`).
3. Instalação de dependências essenciais: `build-essential`, `python3`, `git`, `curl`, `ufw`, `fail2ban`, `nginx`, `certbot`.
4. Instalação e configuração do Node.js v22 LTS e PM2 global.

### 3.3. Deploy e Build da Aplicação
1. Clonagem limpa do repositório em `/var/www/nuvv-site` com propriedade de arquivos atribuída a `nuvv:nuvv`.
2. Criação das pastas de dados persistentes `/var/www/nuvv-site/data` e `/var/www/nuvv-site/logs` com permissões `775`.
3. Geração do arquivo de produção `.env` a partir do template `.env.example`.
4. Instalação de dependências e compilação nativa dos módulos C++ (`better-sqlite3`).
5. Compilação do frontend SPA (Vite + React 19 + TypeScript + Tailwind CSS) gerando os artefatos otimizados em `dist/`.
6. Inicialização do serviço via PM2 e ativação do auto-boot no boot da máquina via `systemd`.

### 3.4. Configuração de Rede, Nginx e Firewall
1. **Configuração do Virtual Host Nginx (`/etc/nginx/sites-available/nuvv-site`):**
   - Reverse Proxy para a porta interna do Express (`127.0.0.1:3001`).
   - Habilitação de compressão Gzip para arquivos de texto, CSS, scripts e SVGs.
   - Cache de 30 dias com `Cache-Control: public, no-transform` para ativos em `/assets/`.
   - Suporte completo a WebSockets (`Upgrade` e `Connection`).
   - Limite de corpo de requisições ajustado para `client_max_body_size 30M;` (suporte a uploads de KMZ/GeoJSON).
2. **Firewall UFW Ativado:**
   - Porta `22/tcp` (SSH) — Permitida.
   - Porta `80/tcp` (HTTP) — Permitida.
   - Porta `443/tcp` (HTTPS) — Permitida.

### 3.5. Pipeline de Atualização Contínua (CI/CD)
1. **Script de Deploy Automatizado (`/var/www/nuvv-site/deploy.sh`):**
   - Executa `git pull origin main`.
   - Instala/atualiza dependências do npm.
   - Recompila os estáticos do frontend com Vite.
   - Assegura permissões da pasta `data/`.
   - Realiza o reload suave do PM2 (`pm2 reload nuvv-site`).
2. **Workflow GitHub Actions (`.github/workflows/deploy.yml`):**
   - Configurado para disparar o `deploy.sh` via SSH a cada push na branch `main`.

---

## 4. Testes de Validação e Saúde

* **HTTP Status Code:** Retorno `200 OK` na raiz `http://200.6.48.3/`.
* **Roteamento SPA:** Validadas com sucesso rotas internas (ex: `/residencial`, `/empresarial`).
* **API de Diagnóstico (`/api/health`):**
  ```json
  {
    "status": "ok",
    "database": "connected (SQLite WAL)",
    "records": {
      "pageviews": 2,
      "viability": 0,
      "subscribers": 0,
      "leads": 0
    },
    "smtpConfigured": false,
    "timestamp": "2026-09-18T13:52:07.129Z"
  }
  ```
* **Persistência SQLite:** Testada inserção de telemetria via POST `/api/track/pageview`, confirmando gravação e leitura no banco local.

---

## 5. Ativação do Certificado SSL (HTTPS) — Concluído com Sucesso ✅

O apontamento de DNS foi propagado e o certificado SSL/TLS Let's Encrypt foi instalado e validado com sucesso.

1. **Domínios Cobertos:** `nuvv.com.br` e `www.nuvv.com.br`
2. **Emissor:** Let's Encrypt Authority (Certbot 2.9.0 com plugin `python3-certbot-nginx`)
3. **Caminhos dos Certificados:**
   - Certificado: `/etc/letsencrypt/live/nuvv.com.br/fullchain.pem`
   - Chave Privada: `/etc/letsencrypt/live/nuvv.com.br/privkey.pem`
4. **Redirecionamento Automático:** Todas as requisições em porta 80 (`http://`) são redirecionadas com status `301 Moved Permanently` para `https://`.
5. **Renovação Automática:** Configurada via `certbot.timer` do systemd.
