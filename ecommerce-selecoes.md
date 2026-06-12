# E-commerce de Camisas de Seleções

## Overview
Desenvolvimento de uma plataforma de e-commerce completa para venda de camisas de seleções, seguindo as diretrizes do PRD.md. O banco de dados PostgreSQL já está rodando e as variáveis estão no `.env`. As imagens atuais em `imagens.png/` serão utilizadas, e novas imagens serão geradas para popular o catálogo.

## Project Type
WEB

## Success Criteria
- Funcionalidades de catálogo, carrinho e checkout (Stripe) operacionais.
- Autenticação e RBAC (ADMIN vs CLIENT) robustas e seguras (Zero Trust).
- Painel administrativo para CRUD de estoque e pedidos em funcionamento.
- Validação de segurança (senhas criptografadas, middlewares de rota, isolamento de credenciais).
- Interface de usuário (UI) premium e dinâmica, sem uso de templates padrão.

## Tech Stack
- **Framework Full-Stack**: Next.js (App Router) - Permite SSR/SSG/ISR conforme PRD e facilita a integração de rotas de API.
- **Banco de Dados**: PostgreSQL (já rodando) + Prisma ORM (para modelagem segura e tipagem forte).
- **Estilização**: Tailwind CSS v4 (Customizado, sem templates clichês) + Framer Motion (Micro-interações).
- **Autenticação e Segurança**: JWT (Access Token) + Cookies HttpOnly (Refresh Token), Bcrypt para senhas.
- **Pagamentos**: Stripe Enterprise Integration (Checkout Transparente + Webhooks idempotentes).

## File Structure
```text
/
├── prisma/
│   └── schema.prisma        # Definição do banco de dados
├── public/
│   └── images/              # Imagens das camisas (migradas de imagens.png/)
├── src/
│   ├── app/
│   │   ├── (store)/         # Vitrine pública (Home, Produto, Carrinho)
│   │   ├── (admin)/         # Dashboard administrativo (Restrito)
│   │   ├── api/             # Rotas REST e Webhooks
│   │   └── layout.tsx       # Layout Global
│   ├── components/          # Componentes reutilizáveis (UI, Forms, Cart)
│   ├── lib/                 # Utilitários (Stripe, Prisma client, JWT, etc.)
│   └── middleware.ts        # Interceptação de rotas para Rate Limit, JWT e RBAC
└── tailwind.config.ts
```

## Task Breakdown

### 1. Modelagem de Dados e Configuração
- **Agent**: `database-architect` (Skill: `database-design`)
- **Task**: Inicializar Prisma, definir schema (users, products, inventory, orders, order_items) e conectar ao PostgreSQL via `DATABASE_URL`.
- **INPUT**: `PRD.md` (Seção 6)
- **OUTPUT**: `prisma/schema.prisma` e migrações.
- **VERIFY**: Conexão bem-sucedida e tabelas criadas no PostgreSQL.

### 2. Autenticação, Middlewares e Segurança
- **Agent**: `security-auditor` (Skill: `clean-code`)
- **Task**: Implementar login/cadastro, middlewares JWT e verificação RBAC (Admin). Proteger rotas da API.
- **INPUT**: `PRD.md` (Seção 4.1 e 5)
- **OUTPUT**: `src/middleware.ts`, `src/lib/auth.ts`, `src/app/api/auth/`
- **VERIFY**: Testar isolamento de rotas Admin, bloqueando acessos não autorizados (401/403).

### 3. Rotas de API (Catálogo e Pedidos)
- **Agent**: `backend-specialist` (Skill: `api-patterns`)
- **Task**: Criar endpoints REST para listagem de produtos, CRUD de Admin para estoque e geração do Checkout/Webhook do Stripe.
- **INPUT**: Schema do banco e chaves do Stripe no `.env`.
- **OUTPUT**: `src/app/api/products`, `src/app/api/orders`, `src/app/api/webhooks/stripe`
- **VERIFY**: Criação de `payment_intent` e resposta correta do webhook.

### 4. Design System e Interface (UI/UX)
- **Agent**: `frontend-specialist` (Skill: `frontend-design`)
- **Task**: Implementar tokens de design premium, interface dinâmica e sem layouts padrão. Utilizar as imagens da pasta `imagens.png`. Gerar mais imagens de camisas virtuais conforme solicitado pelo usuário.
- **INPUT**: Diretrizes de Design do AG Kit, imagens locais.
- **OUTPUT**: `src/app/globals.css`, componentes base (botões, cards).
- **VERIFY**: Inspeção visual do design, contraste, e ausência de violeta/layouts clichês.

### 5. Vitrine, Carrinho e Checkout (Storefront)
- **Agent**: `frontend-specialist` (Skill: `frontend-design`)
- **Task**: Construir página inicial, detalhes de produto com paginação/lazy loading e integração completa com Stripe Elements.
- **INPUT**: Rotas da API.
- **OUTPUT**: Páginas em `src/app/(store)/`
- **VERIFY**: Fluxo completo desde adicionar ao carrinho até finalizar o pagamento via Stripe (Modo Teste).

### 6. Painel de Controle (Admin Backoffice)
- **Agent**: `frontend-specialist` (Skill: `frontend-design`)
- **Task**: Desenvolver Dashboard para CRUD de camisas (upload, preço, tamanhos) e transição de status de pedidos.
- **INPUT**: Rotas Admin da API.
- **OUTPUT**: Páginas em `src/app/(admin)/`
- **VERIFY**: Apenas Admin consegue gerenciar estoque e ver métricas.

## Phase X: Verification
- [ ] Segurança: `python .agents/skills/vulnerability-scanner/scripts/security_scan.py .`
- [ ] UX/Design: Inspeção manual e scripts `ux_audit.py`
- [ ] Teste de Isolamento Admin: Verificar logs de tentativas 403 HTTP.
- [ ] Compilação: `npm run build` bem sucedido.
