# Auditoria e Planejamento: Dashboard Administrativo "The Rooster"

Este documento detalha o estado atual do painel administrativo, identifica lacunas funcionais e propõe um plano de desenvolvimento estruturado para transformar os protótipos atuais em um sistema de gestão completo.

---

## 1. Auditoria do Estado Atual

Atualmente, o dashboard possui uma interface visual bem estruturada (`AdminLayout`, `Admin.jsx`), mas a maioria das funcionalidades opera com dados fictícios (`mockData`) ou sem lógica de persistência.

| Módulo | Funcionalidade | Estado Atual | O que Falta (Gap) |
| :--- | :--- | :--- | :--- |
| **Visão Geral** | Cards de Estatísticas | 🟡 Parcial | Dados estáticos (mock). Precisa conectar com dados reais de pedidos/faturamento. |
| | Lista de "Últimos Produtos" | 🟡 Parcial | Exibição ok, mas botões "Novo Produto" e "Editar" não funcionam. |
| **Gestão de Pedidos** | Kanban (Recebido -> Pronto) | 🟢 Bom | Lógica visual funciona. Falta: impressão de comandas, histórico de finalizados, persistência real. |
| **Produtos** | CRUD (Criar, Ler, Atualizar, Deletar) | 🔴 Inexistente | Não há formulários para adicionar/editar produtos, fotos, preços ou categorias. |
| **Estoque** | Listagem de Ingredientes | 🟡 Parcial | Visual ok com mock. Botões "Novo Item" e "Ajustar" sem ação. Sem vínculo com vendas. |
| **Financeiro** | Relatórios e Despesas | 🟡 Parcial | Gráficos bonitos (Recharts) mas com dados falsos. CRUD de despesas inexistente. |
| **Configurações** | Abertura/Fechamento Loja | 🔴 Inexistente | Não há como fechar a loja (impedir pedidos) ou configurar taxas de entrega. |
| **Métricas** | Gráficos de Vendas | 🟡 Parcial | Visual ok, dados estáticos. |

---

## 2. Funcionalidades Necessárias (Backlog)

Lista de funcionalidades que **devem** ser implementadas para o sistema ser funcional em produção:

### Prioridade Alta (Essencial para Operação)
1.  **Gestão de Produtos (Cardápio Digital):**
    *   Formulário para adicionar/editar produtos (Nome, Descrição, Preço, Categoria, Imagem).
    *   Controle de disponibilidade (Ativar/Desativar produto instantaneamente).
    *   Gestão de Adicionais/Complementos.
2.  **Controle da Loja:**
    *   **Botão "Abrir/Fechar Loja":** Toggle global que bloqueia o checkout no app do cliente.
    *   Definição de Horário de Funcionamento automático.
    *   Configuração de Taxa de Entrega e Tempo Estimado.
3.  **Gestão de Pedidos (Aprimoramento):**
    *   Persistência dos pedidos (atualmente se recarregar a página, perde-se o estado se não houver backend real).
    *   **Impressão de Comanda:** Gerar layout térmico (80mm) para cozinha/motoboy.
    *   Detalhes do Pedido: Modal com endereço completo do cliente e telefone.

### Prioridade Média (Gestão Tática)
4.  **Controle de Estoque:**
    *   CRUD de Ingredientes (ex: Pão, Hambúrguer, Queijo).
    *   Ajuste manual de quantidades (Entrada de compras / Perdas).
    *   *(Opcional)* Baixa automática baseada na ficha técnica do produto vendido.
5.  **Financeiro Real:**
    *   Registro de Entradas (Automático via Pedidos).
    *   Registro de Saídas (Pagamento de fornecedores, contas, funcionários).
    *   Relatório de Lucro Líquido (Receita - Despesas).

### Prioridade Baixa (Estratégico/Longo Prazo)
6.  **Métricas Avançadas:**
    *   Produtos mais vendidos (Pareto).
    *   Horários de pico.
    *   Ticket médio por cliente.
7.  **Gestão de Usuários:**
    *   Criar outros administradores/funcionários com permissões limitadas.

---

## 3. Planejamento de Desenvolvimento (Roadmap)

Sugiro dividirmos o desenvolvimento nas seguintes fases:

### **Fase 1: O Coração da Operação (Foco no Cardápio e Loja)**
*Objetivo: Permitir que o dono gerencie o que vende e quando vende.*

1.  **Criar Contexto de Produtos (`ProductContext`):** Migrar de `mockData` para um estado gerenciável onde possamos adicionar/remover itens.
2.  **Implementar Formulário de Produto:** Criar página `/admin/produtos/novo` e `/admin/produtos/editar/:id`.
3.  **Implementar Configurações da Loja (`StoreContext`):** Criar estado global para `isOpen`, `deliveryFee`, `waitTime`.
4.  **Criar Painel de Controle (Home Admin):** Adicionar os controles de "Loja Aberta/Fechada" na tela inicial do Admin.

### **Fase 2: Refinamento de Pedidos**
*Objetivo: Melhorar a experiência da cozinha e entrega.*

1.  **Detalhes do Pedido:** Criar modal ao clicar no card do pedido com dados completos do cliente.
2.  **Impressão:** Criar função para gerar PDF simples ou janela de impressão formatada para impressoras térmicas.
3.  **Histórico:** Criar aba "Histórico" para ver pedidos de dias anteriores (não apenas o Kanban do dia).

### **Fase 3: Gestão Administrativa (Estoque e Financeiro)**
*Objetivo: Controle de custos e insumos.*

1.  **CRUD de Estoque:** Implementar lógica real para a tela `Inventory.jsx`.
2.  **CRUD de Despesas:** Implementar lógica real para adicionar contas a pagar em `Financials.jsx`.
3.  **Dashboard Financeiro:** Conectar os gráficos aos dados reais somados.

---

## 4. Próximos Passos Imediatos

Recomendo começarmos pela **Fase 1**, especificamente:
1.  Criar o **Gerenciamento de Produtos** (para você não depender de código para mudar um preço).
2.  Criar o botão de **Abrir/Fechar Loja**.

*Aguardando sua aprovação para iniciar a execução da Fase 1.*
