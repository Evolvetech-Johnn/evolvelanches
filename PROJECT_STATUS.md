# Status do Projeto The Rooster

## Visão Geral

Projeto Fullstack (em migração) para delivery de alimentos.

- **Frontend**: React 19 + Vite + TypeScript (parcial) + Capacitor (Android)
- **Backend**: Node.js + TypeScript + MongoDB Atlas (Em desenvolvimento)
- **Infra**: Render (Planejado)

## Mapeamento de Funcionalidades

### 1. Autenticação

- **Frontend**:
  - Contexto refatorado para TypeScript (`AuthContext.tsx`).
  - Serviço de autenticação criado (`authService.ts`).
  - Telas de Login/Cadastro funcionais.
  - **Estado**: ✅ Implementado (Mockado).
- **Backend**:
  - API de Login/Register.
  - Middleware de Auth (JWT).
  - **Estado**: 🔴 Pendente (Inexistente).

### 2. Catálogo de Produtos

- **Frontend**:
  - `ProductContext` refatorado para TypeScript (`ProductContext.tsx`) e Camada de Serviço (`productService.ts`).
  - Dados mockados via serviço (preparado para API).
  - UI de Listagem e Detalhes implementada.
  - **Estado**: ✅ Implementado (Service Layer).
- **Backend**:
  - API CRUD de Produtos.
  - Banco de Dados MongoDB.
  - **Estado**: � Em andamento (Setup inicial concluído).

### 3. Carrinho e Pedidos

- **Frontend**:
  - `CartContext` e `OrderContext` funcionais com localStorage.
  - Checkout envia pedido via WhatsApp (feature atual) ou mock.
  - **Estado**: ⚠️ Parcial (Lógica no cliente, JS).
- **Backend**:
  - Processamento de Pedidos.
  - Webhooks de Pagamento.
  - **Estado**: 🔴 Pendente (Inexistente).

### 4. Admin Dashboard

- **Frontend**:
  - Layout Admin implementado.
  - Métricas e Gráficos (Recharts) com dados mockados.
  - **Estado**: ⚠️ Parcial (Apenas UI).
- **Backend**:
  - Agregação de dados para dashboard.
  - **Estado**: 🔴 Pendente (Inexistente).

## Riscos Técnicos e Débitos

1.  **Ausência de Backend**: Toda a lógica de negócio reside no Frontend (risco de segurança e consistência). Backend iniciado em `server/`.
2.  **Migração TypeScript**: Projeto misto JS/TS. Restam `CartContext` e `OrderContext`.
3.  **Persistência**: Dados dependem do `localStorage`. Conexão com MongoDB configurada mas não integrada.
4.  **Testes**: Cobertura parcial (`ProductCard` e `ProductContext` validados).

## Próximos Passos (Plano de Ação)

1.  [x] Configurar ESLint e TypeScript.
2.  [x] Criar Camada de Serviço (`api.ts`, `authService.ts`).
3.  [x] Refatorar `AuthContext` para TypeScript.
4.  [x] Migrar `ProductContext` para TypeScript e Service Layer.
5.  [x] Criar Backend (Setup inicial Node+TS em `server/`).
6.  [ ] Implementar API de Autenticação no Backend (Substituir Mock).
7.  [ ] Migrar `CartContext` para TypeScript.
