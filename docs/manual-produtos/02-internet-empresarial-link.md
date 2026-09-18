# Manual de Produto: Conectividade Corporativa (Banda Larga PME, Semi-Dedicado & Link Dedicado)

> **Classificação:** Produto B2B / Conectividade de Negócios  
> **Área Responsável:** Vendas B2B, Engenharia de Telecomunicações & NOC 24/7  
> **Versão:** 1.0 (Setembro/2026)

---

## 1. O que é o Produto e Para que Serve

A linha de **Conectividade Corporativa da Nuvv** é desenhada especificamente para empresas que dependem de conexão contínua para faturamento, emissão de notas fiscais, sistemas em nuvem (ERP/CRM), VPNs entre filiais, servidores locais e operações de missão crítica.

A Nuvv segmenta a conectividade empresarial em **3 categorias técnicas**, evitando a armadilha de vender planos residenciais para CNPJs:
1. **Banda Larga PME:** Para comércios e escritórios com uso convencional de internet, com prioridade de tráfego superior ao residencial e linha fixa ilimitada inclusa.
2. **Link Semi-Dedicado (com IP Fixo):** Conexão de alta estabilidade com garantia de banda de 80% (CIR), 1 IP Fixo IPv4 público incluso (/32) e SLA de reparo de até 12 horas.
3. **Link Dedicado Carrier-Grade (Enterprise):** Circuito exclusivo ponto a ponto, 100% simétrico (1:1), 100% de banda garantida contratualmente, bloco de IPs públicos (/30, /29, /28), BGP com ASN próprio, conexão direta ao IX.br e SLA contratual de até 4 horas com monitoramento proativo pelo NOC 24/7/365.

---

## 2. Comparativo Técnico entre as Modalidades

| Recurso Técnico | Banda Larga PME | Link Semi-Dedicado | Link Dedicado Carrier-Grade |
| :--- | :--- | :--- | :--- |
| **Garantia de Banda (CIR)** | 50% a 65% | **80% Real Garantida** | **100% Garantida Full Duplex (1:1)** |
| **Simetria (Down / Up)** | Download Prioritário | Alta simetria de upload | **100% Simétrico (Down = Up)** |
| **Endereçamento IP** | IP Dinâmico Corporativo | **1 IP Fixo IPv4 Público (/32)** | **Bloco de IPs Públicos (/30, /29, /28)** |
| **SLA de Reparo Contratual** | 24h a 48h | **Até 12 horas contínuas** | **Até 4 horas contratuais (24/7/365)** |
| **Disponibilidade (Uptime)** | 99,0% | 99,5% | **99,9% com ressarcimento em contrato** |
| **Monitoramento de Rede** | Reativo (sob chamado) | NOC 24/7 ativo | **NOC Proativo 24/7/365 (alerta em <3 min)** |
| **Roteamento & Backbone** | Padrão corporativo | Rotas otimizadas de baixa latência | **ASN Próprio, BGP Multihomed, IX.br direto** |
| **Meio Físico de Entrega** | Fibra GPON compartilhada | Fibra GPON prioritária | **Porta Metro Ethernet / GPON Exclusiva** |

---

## 3. Tabela de Valores e Planos

### 3.1. Banda Larga PME
* **Empresa Start (400 Mega):** R$ 99,90 / mês (De R$ 119,90)
  * *Incluso:* Wi-Fi Plus Corporativo + 1 Linha Fixa Ilimitada Brasil + SLA 48h.
* **Empresa Plus (800 Mega) — Campeão de Vendas PME:** R$ 129,90 / mês (De R$ 149,90)
  * *Incluso:* Wi-Fi Alta Densidade para PDVs/Clientes + 1 Linha Fixa Ilimitada + SLA 48h.
* **Empresa Max 1 Giga (1.000 Mega):** R$ 189,90 / mês (De R$ 209,90)
  * *Incluso:* Garantia 65% CIR + SLA Prioritário 24h + Wi-Fi 6 Ultra + 1 Linha Fixa.

### 3.2. Link Semi-Dedicado (com IP Fixo Público)
* **Semi-Dedicado 300 Mega:** R$ 199,90 / mês (De R$ 219,90)
* **Semi-Dedicado 500 Mega — Melhor Custo-Benefício:** R$ 259,90 / mês (De R$ 279,90)
* **Semi-Dedicado 700 Mega:** R$ 399,90 / mês (De R$ 419,90)
* *Diferencial:* Todos incluem **1 IP Fixo IPv4**, **80% de banda garantida**, SLA 12h e monitoramento pelo NOC.

### 3.3. Link Dedicado Carrier-Grade (Enterprise)
* **Dedicado Enterprise 50 Mega Simétrico:** Sob Consulta (Projeto Especial de Engenharia)
* **Dedicado Enterprise 500 Mega Simétrico:** Sob Consulta (Porta Exclusiva + BGP)
* **Dedicado 1 Gbps a 10 Gbps (Missão Crítica):** Engenharia Customizada com Dupla Abordagem e Anéis de Proteção.
* *Diferencial:* Bloco de IPs (/30, /29, /28), SLA de 4h, BGP, Uptime 99,9% com ressarcimento financeiro contratual.

---

## 4. Públicos-Alvo e Indicação de Solução

| Segmento da Empresa | Perfil Operacional | Solução Indicada | Por que essa Solução? |
| :--- | :--- | :--- | :--- |
| **Comércio Varejista / Restaurantes** | PDVs, máquinas de cartão, emissão de NF-e, Wi-Fi para clientes. | Banda Larga 800M ou Semi-Dedicado 300M | Evita que travamentos no Wi-Fi travem a maquininha no caixa. |
| **Escritórios Contábeis / Advocacia** | Upload pesado de arquivos, acesso à Receita Federal, tribunais e backup. | Semi-Dedicado 500M | IP fixo para liberação em firewalls e alta velocidade de envio (upload). |
| **Clínicas Médicas e Laboratórios** | Envio de exames pesados (tomografias, raio-x), prontuário eletrônico. | Semi-Dedicado 500M ou Dedicado 100M | Tráfego seguro, sem perdas de pacotes e IP fixo para conexões PACS. |
| **Indústrias e Centros de Distribuição** | Operação 24h, ERP SAP/Totvs, WMS, VPN matriz-filiais e CFTV central. | Link Dedicado 100M a 500M Simétrico | SLA de 4 horas é obrigatório para não parar linha de produção ou carregamento. |
| **ISPs, Data Centers e Empresas de TI** | Servidores próprios, ASNs, roteamento BGP e virtualização. | Link Dedicado com Bloco de IPs /28 ou /29 | BGP multi-homed, peering com IX.br e baixa latência internacional. |

---

## 5. Como Vender (Abordagem Comercial e Roteiro de Vendas)

### 5.1. Perguntas de Diagnóstico Consultivo
1. *"Se a internet da sua empresa cair por 4 horas em uma terça-feira à tarde, qual é o prejuízo financeiro e operacional estimado?"*
2. *"A sua empresa possui servidores locais, câmeras de segurança externas ou filial interligada por VPN que precise de IP Fixo?"*
3. *"Vocês enviam muitos arquivos pesados para a nuvem ou fazem backups diários?"*
4. *"A sua operadora atual oferece contrato com SLA garantido de atendimento ou o suporte é tratado como cliente residencial comum?"*

### 5.2. Pitch de Vendas B2B
> *"Diferente das grandes operadoras de massa, onde sua empresa é apenas mais um número de contrato e fica horas presa em ura eletrônica quando precisa de socorro, na Nuvv você conta com infraestrutura de fibra proprietária, atendimento corporativo direto via WhatsApp ou telefone com a nossa engenharia, e planos desenhados para a sua realidade. Se o seu negócio precisa de IP fixo para servidores ou de um Link Dedicado com SLA de 4 horas e 100% de garantia de banda, nós entregamos a estabilidade que a sua operação exige para não parar."*

---

## 6. Argumentos de Vendas (Diferenciais Competitivos)

1. **IP Fixo sem Burocracia:** No plano Semi-Dedicado, o IP fixo IPv4 público é fornecido imediatamente na instalação, viabilizando acesso remoto a DVRs/CFTV, PABX e sistemas ERP.
2. **Atendimento Direto com Engenharia / NOC:** Contato direto com a equipe técnica local que opera a rede no Alto Tietê, sem terceirizações ou scripts engessados.
3. **SLA Contratual Real:** Garantia em contrato de tempo máximo de reparo (12h no semi-dedicado e 4h no dedicado).
4. **Infraestrutura com Roteamento BGP e IX.br:** Conexão direta aos maiores pontos de troca de tráfego do Brasil (São Paulo - IX.br), reduzindo o tempo de resposta (ping) para servidores da AWS, Google Cloud, Microsoft Azure e Oracle.
5. **Portabilidade e Combo Integrado:** A empresa pode contratar no mesmo pacote o Link de Internet, o PABX em Nuvem com ramais virtuais e o Hotspot Social para clientes com faturamento unificado em nota fiscal de telecomunicações.

---

## 7. Como Contornar Objeções

### Objeção 1: *"Por que pagar R$ 199 no Semi-Dedicado se tem internet residencial por R$ 99?"*
* **Resposta:** *"A diferença está no contrato e na tecnologia da rota. No plano residencial, a operadora só garante 40% de velocidade pela Anatel, usa IP dinâmico que muda constantemente e o prazo de reparo pode levar até 48 horas úteis. No Semi-Dedicado, você recebe 1 IP Fixo público para seus sistemas, 80% de garantia real de banda e um SLA de 12 horas com atendimento corporativo. Um único dia de operação parada no seu comércio custa muito mais do que a diferença de R$ 3,30 por dia entre os planos."*

### Objeção 2: *"A Claro/Vivo me ofereceu o dobro de velocidade pelo mesmo preço."*
* **Resposta:** *"Eles oferecem velocidade nominal de download em rede compartilhada, mas não entregam simetria nem garantia de banda de upload. Para empresas, o upload e a latência estável são fundamentais para sistemas em nuvem e reuniões em vídeo. Além disso, quando você tem um problema com essas empresas, você fala com atendentes terceirizados em outros estados. Na Nuvv, o técnico que atende a sua empresa está sediado a poucos minutos de você."*

### Objeção 3: *"Não preciso de IP Fixo."*
* **Resposta:** *"Perfeito, nesse caso o plano ideal para você é o nosso **Banda Larga PME Empresa Plus de 800 Mega por apenas R$ 129,90/mês**. Você tem uma ultravelocidade corporativa com Wi-Fi de alta densidade e linha fixa ilimitada inclusa, sem pagar pelo IP fixo que você não utiliza hoje."*

---

## 8. Requisitos de Informações do Cliente para Contratação B2B

Para cadastro no ERP Hubsoft, análise de viabilidade e elaboração contratual:
- [ ] **Razão Social e Nome Fantasia**
- [ ] **CNPJ e Inscrição Estadual (ou Isento)**
- [ ] **Contrato Social / Requerimento de Empresário / CCMEI**
- [ ] **Dados do Sócio Administrador / Procurador:** Nome, CPF, RG, E-mail e WhatsApp
- [ ] **Endereço Completo de Instalação:** CEP, Logradouro, Número, Complemento, Bairro, Cidade
- [ ] **Responsável Técnico / TI Local (se houver):** Nome, E-mail e Telefone de contato
- [ ] **Necessidade de IP Fixo ou Bloco de IPs?** (Sim/Não e quantidade)
- [ ] **Portabilidade de Números Fixos Existentes?** (Anexar última fatura da operadora atual)
- [ ] **Vencimento Preferencial:** Dias 05, 10, 15, 20 ou 25

---

## 9. Como Implementar (Processo Técnico e Suporte B2B)

### 9.1. Ativação Técnica de Banda Larga PME & Semi-Dedicado
1. **Viabilidade Física:** Validação de porta em CTO com reserva técnica corporativa.
2. **Instalação do Cabo Drop Óptico:** Lançamento de cabo reforçado com identificação de etiqueta B2B.
3. **Instalação da ONU Bridge / Roteador Corporativo:** No Semi-Dedicado, o IP fixo é alocado estaticamente na WAN ou entregue em modo Bridge para o firewall/MikroTik/Fortinet do cliente.
4. **Validação de Roteamento:** Teste de ping bidirecional, teste de portas abertas (se aplicável) e medição de jitter e perda de pacotes.

### 9.2. Ativação de Link Dedicado Enterprise
1. **Vistoria de Infraestrutura:** Levantamento de rota, entrada subterrânea/aérea, sala técnica/rack de telecom e aterramento.
2. **Lançamento de Fibra Exclusiva (AS-Built):** Cabo óptico direto da central/anel de backbone até o DIO no rack do cliente.
3. **Instalação de Switch L2/L3 Gerenciado (Cisco/Datacom/Huawei):** Configuração de VLAN de gerência e porta de entrega elétrica (RJ45) ou óptica (SFP/SFP+).
4. **Configuração de BGP / Roteamento Estático:** Estabelecimento de sessões BGP IPv4/IPv6 com os roteadores de borda do cliente ou rota default para o bloco alocado.
5. **Homologação e RFC 2544:** Teste de estresse com emissão de laudo técnico de latência, throughput e ausência de descarte de pacotes.

### 9.3. Diretrizes para o Suporte Técnico B2B
* **Priorização no Helpdesk:** Chamados abertos com CNPJs de Semi-Dedicado ou Dedicado caem na fila prioritária do NOC.
* **Queda de Link Dedicado:** Acionamento imediato da equipe de campo em até 30 minutos se o teste óptico apontar atenuação ou corte de fibra.
* **Manutenções Programadas:** Obrigatoriamente notificadas por e-mail e WhatsApp com no mínimo 72 horas de antecedência, sempre na janela da madrugada (00h às 06h).
