Documento de Requisitos do Produto (PRD) Técnico: E-commerce de Camisas de Seleções
1. Visão Geral do Produto
O objetivo deste documento é estabelecer as diretrizes de engenharia e negócios para o desenvolvimento de uma plataforma de e-commerce escalável de alta performance, especializada na venda de camisas de seleções de futebol (nacionais e internacionais). A plataforma será composta por uma arquitetura desacoplada, oferecendo autenticação robusta, um painel administrativo completo (Dashboard) para operações de CRUD e gestão, e um fluxo de checkout transparente totalmente integrado ao gateway de pagamento Stripe. A segurança da informação é o pilar central da infraestrutura, exigindo criptografia ponta a ponta, proteção rígida de rotas e isolamento completo de credenciais através de variáveis de ambiente.  
MD
+ 2

2. Objetivos Estratégicos e KPIs Técnico-Comerciais
Eficiência de Canal: Estabelecer um funil de vendas online otimizado para camisas de seleções, minimizando o abandono de carrinho.  
MD

Performance de UX: Proporcionar uma experiência de navegação ultra-rápida e intuitiva, guiando o usuário do catálogo ao checkout em poucos passos.  
MD

Segurança Baseada em Confiança Zero (Zero Trust): Mitigar riscos de vazamento de dados corporativos ou de clientes e fraudes financeiras utilizando padrões modernos de criptografia de back-end.  
MD

3. Público-Alvo e Segmentação
Colecionadores e Entusiastas: Usuários exigentes que buscam camisas oficiais, edições históricas (retrô) ou peças raras de seleções específicas.  
MD

Consumidores Sazonais: Compradores impulsionados por grandes eventos do futebol mundial (ex: Copa do Mundo, Eurocopa, Copa América).  
MD

4. Escopo Detalhado do Sistema e Especificações Técnicas
4.1. Arquitetura de Autenticação e Gestão de Identidade (IAM)
Cadastro e Autenticação Nativa: Fluxo de criação de conta e login baseado nas credenciais de e-mail e senha do usuário.  
MD

Ciclo de Vida de Sessão Seguro (JWT):

Access Token: Emitido em formato JSON Web Token (JWT), com tempo de expiração curto (ex: 15 minutos), armazenado em memória no lado do cliente.

Refresh Token: Armazenado exclusivamente em um cookie HttpOnly, Secure e SameSite=Strict, permitindo a renovação silenciosa da sessão sem expor credenciais a ataques de Cross-Site Scripting (XSS).

Fluxo de Recuperação de Senha: Geração de um token randômico criptografado e de uso único (Single-use Token) com validade restrita (ex: 10 minutos), disparado assincronamente via serviço de e-mail integrado.  
MD

Controle de Acesso Baseado em Funções (RBAC):

Nível CLIENTE: Escopo limitado à leitura do catálogo, gerenciamento do próprio carrinho, edição de dados cadastrais e visualização de seu histórico de pedidos.  
MD

Nível ADMIN: Escopo irrestrito para gerenciamento operacional e acesso total ao painel administrativo da aplicação.  
MD

4.2. Catálogo Dinâmico e Motor de Busca
Página Inicial (Storefront): Vitrine dinâmica com suporte a paginação do lado do servidor (Server-side Pagination), exibindo destaques, lançamentos e filtros avançados baseados em agrupamentos geográficos (Continente, País/Seleção).  
MD

Página de Detalhes do Produto: Exibição de imagens em alta resolução otimizadas (WebP com lazy loading), grade dinâmica de tamanhos disponíveis (P, M, G, GG), inputs para personalização de camisas (Nome e Número - opcional) e descrição detalhada do produto.  
MD

Engine do Carrinho de Compras: Estado persistido localmente ou via API, permitindo adição, mutação de quantidade, remoção de itens e consulta dinâmica a provedores de logística para cálculo em tempo real de frete e prazos de entrega.  
MD

4.3. Arquitetura de Pagamentos (Integração Stripe Enterprise)
Interface de Checkout Transparente: Implementação utilizando Stripe Elements ou Stripe Checkout para coletar dados de pagamento em conformidade estrita com o padrão PCI-DSS, garantindo que os dados do cartão do cliente nunca toquem diretamente os servidores da aplicação. Suporte a múltiplos métodos de pagamento (Cartão de Crédito, Pix e Boleto Bancário).  
MD
+ 1

Arquitetura de Webhooks Resiliente:

Criação de um endpoint dedicado e exposto (/api/v1/payments/webhook) configurado para ouvir os eventos disparados pela infraestrutura do Stripe, incluindo payment_intent.succeeded e charge.failed.  
MD

Tratamento de Idempotência: Armazenamento do ID de evento do Stripe em uma camada de cache ou tabela de controle para evitar o reprocessamento de transações e cobranças duplicadas.

4.4. Painel de Controle Administrativo (Backoffice Dashboard)
Módulo CRUD de Estoque: Painel exclusivo para o perfil ADMIN gerenciar o catálogo de camisas, controlando preços, descrições, upload de mídia para CDN e atualização granular de estoque por tamanho.  
MD

Módulo de Orquestração de Pedidos: Tela centralizada para triagem de pedidos recebidos, permitindo a transição manual ou automatizada dos status logísticos (Pendente, Pago, Enviado, Entregue).  
MD

Módulo Analítico (Métricas Gerais): Dashboards interativos exibindo faturamento agregado mensal, ranking de camisas mais vendidas e taxa de conversão de novos usuários cadastrados.  
MD

5. Arquitetura de Segurança, Criptografia e Infraestrutura (Foco Crítico)
5.1. Proteção Hierárquica de Rotas e Pipeline de Middlewares
Todas as requisições direcionadas a endpoints privados ou administrativos passarão por uma cadeia sequencial de Middlewares interceptadores antes de atingirem a camada de controle (Controllers):  
MD

[Requisição HTTP] ──> [Middleware: Rate Limiter] ──> [Middleware: JWT Auth] ──> [Middleware: RBAC Check] ──> [Controller]
Middleware de Autenticação (JWT Auth): Intercepta os cabeçalhos das requisições privadas buscando pela chave Authorization: Bearer <TOKEN>. Decodifica o token utilizando a chave secreta da aplicação, validando a assinatura e o tempo de expiração. Se inválido ou ausente, interrompe a requisição com código HTTP 401 Unauthorized.  
MD

Middleware de Autorização (RBAC Check): Aplicado estritamente nas rotas administrativas (ex: /api/v1/admin/*). Extrai a claim role do payload do JWT verificado anteriormente. Caso o valor seja diferente de ADMIN, aborta imediatamente a operação retornando código HTTP 403 Forbidden.  
MD
+ 1

5.2. Padrões de Criptografia de Dados e Segurança de Rede
Criptografia de Senhas (At-Rest): Proibido o armazenamento de senhas em texto limpo. Aplicação obrigatória do algoritmo adaptativo bcrypt (ou Argon2id) utilizando um fator de custo estrutural (salt) mínimo de 10. O hash gerado é o único dado persistido na coluna correspondente do banco de dados.  
MD
+ 1

Segurança em Trânsito: Implementação obrigatória e exclusiva do protocolo HTTPS utilizando criptografia TLS 1.3 em todo o ecossistema da aplicação, mitigando riscos de ataques Man-in-the-Middle (MitM).  
MD

Headers de Segurança Global: Configuração de políticas rígidas de CORS (Cross-Origin Resource Sharing) restringindo as origens permitidas, e injeção de cabeçalhos de segurança (via biblioteca Helmet ou equivalente), como Content Security Policy (CSP) e X-Content-Type-Options.

5.3. Isolamento de Credenciais e Arquivo de Configuração Ambiental (.env)
Nenhum dado confidencial, token de API ou string de conexão pode ser exposto diretamente no código-fonte sob pena de comprometimento do repositório. A aplicação utilizará um arquivo .env local na raiz do ambiente de desenvolvimento, obrigatoriamente mapeado no arquivo .gitignore.  
MD
+ 1

Validação de Ambiente em Runtime:
A aplicação deve implementar um script de bootstrap (utilizando bibliotecas de validação como Zod ou Joi) para interceptar a inicialização do servidor. Caso alguma variável listada no modelo abaixo esteja ausente ou malformatada, o processo deve lançar uma exceção crítica e abortar a execução do servidor imediatamente.  
MD

Snippet de código
# ==============================================================================
# CONFIGURAÇÕES DE AMBIENTE E SERVIDOR (BACK-END)
# ==============================================================================
PORT=5000
NODE_ENV=production
APP_SECRET=9e3a6f1b4c8d2e5f0a7b6c3d2e1f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f # Token de alta entropia (SHA-256)

# ==============================================================================
# PERSISTÊNCIA DE DADOS (CRIPTOGRAFADA EM TRÂNSITO)
# ==============================================================================
# String de conexão exigindo criptografia SSL/TLS ativa no banco de dados
DATABASE_URL=postgresql://db_admin_user:Pass_Strong_1020@prod-cluster-db.cluster-xyz.us-east-1.rds.amazonaws.com:5432/ecommerce_selecoes?sslmode=require

# ==============================================================================
# GATEWAY DE PAGAMENTOS (STRIPE PRODUCTION INTEGRATION)
# ==============================================================================
STRIPE_PUBLIC_KEY=pk_live_51Nx... # Utilizada exclusivamente no client-side
STRIPE_SECRET_KEY=sk_live_51Nx... # Chave privada restrita ao ambiente de back-end
STRIPE_WEBHOOK_SECRET=whsec_...   # Chave de validação de assinatura de payloads recebidos

# ==============================================================================
# PROTOCOLO DE COMUNICAÇÃO ASSÍNCRONA (SMTP / TRANSACTIONAL MAILS)
# ==============================================================================
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.secure_mail_gateway_token_here
6. Modelagem de Dados Resumida (Abstração das Entidades)
Para suportar as operações descritas, o banco de dados relacional deve conter as seguintes tabelas estruturadas com integridade referencial ativa:

users: id (PK), email (Unique), password_hash, role (ENUM: CLIENT, ADMIN), created_at.

products: id (PK), name, description, price_cents (Integer para evitar erros de ponto flutuante), sku, image_url, created_at.

inventory: id (PK), product_id (FK), size (ENUM: P, M, G, GG), quantity.

orders: id (PK), user_id (FK), stripe_payment_intent_id (Unique), status (ENUM: PENDING, PAID, SHIPPED, DELIVERED), total_price_cents, created_at.

order_items: id (PK), order_id (FK), product_id (FK), size, quantity, custom_name, custom_number, price_at_purchase_cents.

7. Requisitos Não-Funcionais (NFRs)
Latência e Desempenho: Páginas públicas estáticas (Home e Detalhes) devem possuir tempo de resposta (First Contentful Paint) inferior a 2 segundos em conexões 4G estáveis através de estratégias de SSG/ISR ou cache agressivo na CDN.  
MD

Escalabilidade do Banco de Dados: Uso obrigatório de indexação nas colunas de busca frequente do PostgreSQL (products.sku, users.email, orders.stripe_payment_intent_id).  
MD

Resiliência e Disponibilidade: Arquitetura candidata a deploy automatizado via pipelines de CI/CD em infraestruturas elásticas (ex: AWS ECS, Vercel ou Railway), garantindo uma SLA de disponibilidade mínima de 99.9%.  
MD

8. Critérios de Aceite para Homologação e Garantia de Qualidade (QA)
Validação de Isolamento Admin: Tentativas de acesso direto por requisição HTTP aos endpoints mapeados sob o prefixo /admin ou /api/v1/admin/* originadas por usuários sem a claim ADMIN no JWT ou por usuários não autenticados devem falhar imediatamente com códigos HTTP 403 ou 401.  
MD

Mitigação de Enumeração de Contas: Em tentativas incorretas de login, o endpoint de autenticação deve retornar um erro opaco genérico (ex: "E-mail ou senha inválidos") com tempo de resposta normalizado para evitar ataques de timing e engenharia reversa de e-mails cadastrados.  
MD

Validação de Assinatura de Webhook (Anti-Spoofing): O endpoint de webhook do Stripe deve verificar matematicamente o cabeçalho Stripe-Signature usando o segredo contido em STRIPE_WEBHOOK_SECRET. Se a assinatura for inválida, a transação deve ser rejeitada imediatamente com código 400 Bad Request. Transações legítimas simuladas em ambiente de testes devem transicionar o status do pedido para "PAID" de forma assíncrona em menos de 3 segundos após o recebimento.  
MD
+ 1

Validação de Inicialização Segura: O servidor deve emitir um log de erro crítico e abortar o processo de boot (process.exit(1)) caso qualquer variável descrita na seção 5.3 esteja ausente do ambiente do sistema operacional.  
MD