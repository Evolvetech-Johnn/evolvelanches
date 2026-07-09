# Roadmap Premium - The Rooster

Transformação do sistema em um produto SaaS/white-label premium vendável por **R$ 8.000,00** por licença/implantação.

---

## 1. Definição do Pacote Premium R$ 8.000,00

### 1.1 Funcionalidades Essenciais (Obrigatórias para Justificar o Valor)
Essas funcionalidades são fundamentais para que o sistema seja considerado um produto profissional completo:

| ID | Funcionalidade | Descrição |
|---|---|---|
| E1 | Backend Completo | API REST com Express + MongoDB, com rotas para todos os recursos (produtos, pedidos, clientes, auth, estoque, financeiro) |
| E2 | Autenticação Segura | JWT, login seguro, recuperação de senha, controle de sessão |
| E3 | Persistência Real | Migração de dados de localStorage para MongoDB, com backup automático |
| E4 | CRM Completo | Ficha do cliente, histórico de pedidos, ticket médio, frequência, tags/segmentação |
| E5 | Dashboard Premium | Métricas de clientes, vendas, produtos mais vendidos, taxa de conversão |
| E6 | Funil de Pedidos Integrado | Status de pedidos vinculados ao cliente, com notificações automáticas |
| E7 | Exportação de Dados | Exportar relatórios (pedidos, clientes, financeiro) em CSV/Excel |
| E8 | Identidade Visual Consistente | Correção de lang, título, favicon e todas as referências à marca |

### 1.2 Funcionalidades Diferenciais (O que Impressiona no Fechamento de Venda)
Essas funcionalidades dão o "toque premium" e diferenciam o produto de soluções básicas:

| ID | Funcionalidade | Descrição |
|---|---|---|
| D1 | Integração WhatsApp | Notificações automáticas de status de pedido via WhatsApp |
| D2 | Integração Pagamento (PIX, Mercado Pago, etc.) | Integração real com gateways de pagamento |
| D3 | Modo Demo | Dados fictícios para apresentar o produto sem expor dados reais |
| D4 | Onboarding Profissional | Guia passo a passo para novos clientes e administradores |
| D5 | SEO & Meta Tags Completo | Otimização para motores de busca e compartilhamento social |
| D6 | Loading & Empty States | Estados consistentes e alinhados à identidade visual |
| D7 | White-label Básico | Opção de customizar logo e cores da marca |

---

## 2. Roadmap em Etapas Incrementais

Cada etapa é pequena o suficiente para ser testada isoladamente, sem dependências que forcem reescrever etapas anteriores.

---

### Etapa 1: Correção de Vulnerabilidades e Identidade Visual
**Objetivo**: Corrigir problemas de segurança e identidade visual sem alterar funcionalidades.

**Tarefas**:
1. Executar `npm audit fix` para corrigir vulnerabilidades de dependências
2. Corrigir `index.html`:
   - Alterar `lang="en"` para `lang="pt-BR"`
   - Alterar título para "The Rooster - Delivery de Frango"
3. Atualizar favicon para usar a marca The Rooster
4. Remover pasta não utilizada `free-tailwind-admin-dashboard-template-main`

**Critérios de Aceite**:
- `npm audit` não retorna vulnerabilidades críticas/altas
- `index.html` com lang e título corretos
- Favicon alinhado à marca The Rooster
- Pasta `free-tailwind-admin-dashboard-template-main` removida

**Plano de Rollback**:
- Reverter commit com `git revert`
- Restaurar dependências com `npm install` do package.json original

---

### Etapa 2: Implementar Backend Básico (Auth e Produtos)
**Objetivo**: Criar API REST com autenticação e CRUD de produtos.

**Tarefas**:
1. Criar models MongoDB para User e Product
2. Implementar rotas de auth (login, registro, logout, recuperação de senha)
3. Implementar rotas de produtos (CRUD)
4. Atualizar `authService` e `productService` para consumir a API real
5. Criar migrations/seeds para dados iniciais

**Critérios de Aceite**:
- API responde em `/api/health`
- Usuários conseguem se cadastrar e logar
- Produtos são armazenados no MongoDB
- Frontend consome API real para produtos e auth

**Plano de Rollback**:
- Reverter commit com `git revert`
- Voltar a usar mock services e localStorage

---

### Etapa 3: Migrar Pedidos e Carrinho para Backend
**Objetivo**: Persistir pedidos e carrinho no MongoDB.

**Tarefas**:
1. Criar models MongoDB para Order e Cart
2. Implementar rotas de pedidos (CRUD, atualizar status)
3. Implementar rotas de carrinho
4. Atualizar `OrderContext` e `CartContext` para consumir API real
5. Migrar dados existentes do localStorage para MongoDB

**Critérios de Aceite**:
- Pedidos são armazenados no MongoDB
- Carrinho persiste entre sessões via backend
- Status de pedidos pode ser atualizado pelo admin

**Plano de Rollback**:
- Reverter commit com `git revert`
- Voltar a usar localStorage para pedidos e carrinho

---

### Etapa 4: Implementar CRM Básico
**Objetivo**: Criar ficha do cliente e histórico de pedidos.

**Tarefas**:
1. Atualizar model User para incluir dados do cliente (endereço, telefone, etc.)
2. Criar rota para obter ficha do cliente com histórico de pedidos
3. Implementar tela de ficha do cliente no painel admin
4. Calcular ticket médio e frequência de compra automaticamente

**Critérios de Aceite**:
- Admin consegue visualizar ficha completa do cliente
- Histórico de pedidos é exibido na ficha do cliente
- Ticket médio e frequência são calculados corretamente

**Plano de Rollback**:
- Reverter commit com `git revert`
- Remover tela de ficha do cliente do admin

---

### Etapa 5: Dashboard Premium e Exportação de Dados
**Objetivo**: Adicionar métricas de clientes e exportação de relatórios.

**Tarefas**:
1. Implementar endpoints para métricas (clientes novos vs recorrentes, produtos mais vendidos, etc.)
2. Atualizar dashboard admin com gráficos e cards de métricas de clientes
3. Implementar exportação de relatórios em CSV/Excel (pedidos, clientes, financeiro)
4. Adicionar botões de exportação nas telas relevantes

**Critérios de Aceite**:
- Dashboard exibe métricas de clientes atualizadas em tempo real
- Relatórios são exportados em CSV/Excel corretamente
- Dados exportados são consistentes com o banco de dados

**Plano de Rollback**:
- Reverter commit com `git revert`
- Voltar ao dashboard original

---

### Etapa 6: Segmentação de Clientes e Tags
**Objetivo**: Permitir categorizar clientes com tags.

**Tarefas**:
1. Atualizar model User para incluir tags
2. Implementar rota para adicionar/remover tags de clientes
3. Adicionar interface para gerenciar tags no painel admin
4. Implementar filtro de clientes por tags

**Critérios de Aceite**:
- Admin consegue adicionar/remover tags de clientes
- Clientes podem ser filtrados por tags
- Tags são salvas no MongoDB

**Plano de Rollback**:
- Reverter commit com `git revert`
- Remover interface de tags do admin

---

### Etapa 7: Integração WhatsApp (Notificações)
**Objetivo**: Enviar notificações automáticas de status de pedido via WhatsApp.

**Tarefas**:
1. Integrar com API de WhatsApp (ex: Z-API, Twilio, ou similar)
2. Criar função para enviar notificações de status de pedido
3. Adicionar configuração no painel admin para chave da API WhatsApp
4. Testar envio de notificações para diferentes status de pedido

**Critérios de Aceite**:
- Notificações são enviadas automaticamente quando o status do pedido muda
- Admin consegue configurar a chave da API WhatsApp
- Logs de envio são armazenados

**Plano de Rollback**:
- Reverter commit com `git revert`
- Desativar integração WhatsApp

---

### Etapa 8: Modo Demo e Onboarding
**Objetivo**: Criar modo demo com dados fictícios e guia de onboarding.

**Tarefas**:
1. Criar script para gerar dados fictícios (produtos, pedidos, clientes)
2. Implementar rota/toggle para ativar modo demo
3. Criar componente de onboarding (guia passo a passo) para novos clientes
4. Criar componente de onboarding para novos administradores
5. Adicionar botão "Modo Demo" na tela de login

**Critérios de Aceite**:
- Modo demo carrega dados fictícios sem afetar dados reais
- Onboarding é exibido para novos usuários
- Onboarding pode ser pulado

**Plano de Rollback**:
- Reverter commit com `git revert`
- Remover modo demo e onboarding

---

### Etapa 9: SEO, Meta Tags e Estados Consistentes
**Objetivo**: Otimizar para busca e adicionar loading/empty states.

**Tarefas**:
1. Adicionar meta tags (Open Graph, description, keywords) em todas as páginas
2. Implementar sitemap.xml
3. Adicionar loading states em todas as telas que carregam dados
4. Adicionar empty states em todas as telas que podem estar vazias
5. Testar responsividade em todos os dispositivos

**Critérios de Aceite**:
- Meta tags são exibidas corretamente no compartilhamento social
- Loading states são exibidos durante carregamento
- Empty states são exibidos quando não há dados
- Site funciona perfeitamente em mobile, tablet e desktop

**Plano de Rollback**:
- Reverter commit com `git revert`
- Remover meta tags e estados

---

### Etapa 10: White-label Básico e QA Final
**Objetivo**: Permitir customização de marca e testar tudo.

**Tarefas**:
1. Criar tela de configuração de marca no painel admin
2. Permitir upload de logo customizado
3. Permitir alterar cores principais da marca
4. Executar checklist de regressão completo
5. Rodar Lighthouse e comparar com auditoria inicial
6. Revisar segurança

**Critérios de Aceite**:
- Admin consegue customizar logo e cores
- Customizações são aplicadas em todo o sistema
- Checklist de regressão 100% aprovado
- Scores Lighthouse melhorados em relação à auditoria inicial

**Plano de Rollback**:
- Reverter commit com `git revert`
- Voltar à identidade visual original

---

## 3. Ordem Sugerida de Execução
Seguindo a prioridade de reduzir risco primeiro (correção de bugs críticos) e depois agregar valor percebido:

1. Etapa 1 (Correção de Vulnerabilidades e Identidade Visual)
2. Etapa 2 (Backend Básico - Auth e Produtos)
3. Etapa 3 (Migrar Pedidos e Carrinho)
4. Etapa 4 (CRM Básico)
5. Etapa 5 (Dashboard Premium e Exportação)
6. Etapa 6 (Segmentação de Clientes)
7. Etapa 7 (Integração WhatsApp)
8. Etapa 8 (Modo Demo e Onboarding)
9. Etapa 9 (SEO e Estados Consistentes)
10. Etapa 10 (White-label e QA Final)

---

## 4. Pronto para Iniciar?
Aguardo confirmação para prosseguir com a **Etapa 1 - Correção de Vulnerabilidades e Identidade Visual**!
