# 🐔 The Rooster - Guia Completo do Sistema

Este documento apresenta uma visão geral de todas as funcionalidades implementadas no sistema de pedidos digital do **The Rooster**. O sistema foi desenvolvido para oferecer uma experiência fluida, moderna e inteligente tanto para o cliente quanto para a operação do restaurante.

---

## 1. 📱 Experiência do Cliente (Front-end)

### Catálogo e Menu Digital

- **Navegação Visual:** Menu organizado por categorias (Lanches, Bebidas, Sobremesas, Combos, etc.) com fotos de alta qualidade.
- **Busca e Filtros:** Facilidade para encontrar produtos específicos.

### Detalhes do Produto Inteligente

Ao clicar em um produto, o cliente tem acesso a funcionalidades avançadas:

- **Lógica de Itens Grátis:** O sistema lê a descrição do produto (ex: "Acompanha 2 molhos grátis") e desconta automaticamente o valor desses itens ao serem selecionados. O cliente só paga se exceder a quantidade gratuita.
- **Controle de Adicionais:** Seletores de quantidade (➕/➖) para adicionar ingredientes extras (bacon, queijo, molhos).
- **Campo de Observações:** Espaço dedicado para personalizar o item (ex: "Sem cebola", "Ponto da carne bem passado").

### Ofertas e Engajamento

- **Área de Promoções:** Página dedicada a produtos com preços especiais, destacando descontos (De/Por).
- **Conexão Social:** Integração visual com o Instagram na página inicial, exibindo as últimas postagens para engajar o cliente com a marca.

### Carrinho de Compras

- **Gestão de Itens:** Adicionar, remover ou alterar quantidades facilmente.

* **Identificação Única:** O sistema diferencia itens iguais com observações diferentes (ex: um lanche "sem cebola" e outro "com tudo" ficam separados no carrinho).
* **Subtotal Dinâmico:** Cálculo em tempo real.

---

## 2. 🛒 Checkout e Finalização (3 Modalidades)

O sistema suporta três fluxos distintos de operação, adaptando o formulário para cada situação:

### A. 🛵 Entrega (Delivery)

- **Endereço Completo:** Validação de campos obrigatórios (Rua, Número, Bairro, CEP).
- **Taxa de Entrega:** Cálculo automático da taxa configurada no sistema.

### B. 🛍️ Retirada (Takeaway)

- **Simplicidade:** Remove a necessidade de endereço.
- **Informação:** Exibe o endereço da loja e o tempo estimado de preparo.

### C. 🍽️ Mesa (Consumo no Local)

- **Novo!** Opção dedicada para clientes dentro da loja.
- **Identificação:** Solicita apenas o **Número da Mesa**.
- **Sem Taxas:** Remove automaticamente taxas de entrega.

---

## 3. 💳 Pagamentos e Financeiro

- **PIX:** Exibição clara da chave PIX e instruções.
- **Cartão:** Opção para selecionar pagamento na maquininha (entrega/balcão).
- **Dinheiro:** Campo inteligente para **Troco**, onde o cliente informa com quanto vai pagar, facilitando o caixa.

---

## 4. 🔢 Gestão de Pedidos e Acompanhamento

### Sistema de Senhas (Comanda)

- **Numeração Sequencial:** Gera um ID curto e fácil (ex: `#001`, `#002`) para facilitar a comunicação na cozinha e na entrega.
- **Reset Diário:** A numeração reinicia automaticamente a cada novo dia, mantendo a organização.

### Rastreamento em Tempo Real (Order Tracker)

O cliente acompanha o progresso através de uma linha do tempo visual que muda conforme o tipo de pedido:

1.  **Recebido** ✅
2.  **Preparando** 👨‍🍳
3.  **Pronto** 🕒
4.  **Finalização Personalizada:**
    - Delivery: _"Saiu para Entrega"_ 🛵
    - Retirada: _"Pronto para Retirada"_ 🛍️
    - Mesa: _"Servido"_ 🍽️

---

## 5. ⚙️ Diferenciais Técnicos

- **Design Responsivo:** Funciona perfeitamente em celulares, tablets e computadores.
- **Validações de Segurança:** Impede pedidos sem telefone ou endereço (no caso de delivery).
- **Persistência de Dados:** Se o cliente fechar o navegador, o carrinho e o pedido atual permanecem salvos (LocalStorage).
- **Observações Gerais:** Campo extra no final do pedido para instruções de entrega (ex: "Campainha quebrada").

---

## 6. 📊 Painel Administrativo (Dashboard)

O sistema conta com uma área restrita para gestão completa do negócio, oferecendo ferramentas para controle financeiro, de estoque e operacional.

### 💰 Financeiro

- **Visão Geral:** Cards com Receita Total, Despesas Totais e Contas a Pagar.
- **Fluxo de Caixa:** Acompanhamento de entradas (pedidos realizados) e saídas.
- **Controle de Despesas:** Tabela para cadastro e gestão de contas (Fornecedores, Energia, etc.) com status de pagamento (Pendente/Pago).

### 📦 Gestão de Estoque e Cardápio

- **Catálogo de Produtos:** Adicionar, editar ou remover itens do cardápio.
- **Controle de Insumos:** Gestão de matérias-primas (ex: estoque de pães, carnes, embalagens).
- **Busca Rápida:** Facilidade para encontrar produtos para edição de preços ou descrições.

### 👨‍🍳 Gerenciador de Pedidos (Kanban)

- **Visualização em Colunas:** Organização visual do fluxo de produção:
  1.  **Recebidos:** Pedidos novos aguardando aceite.
  2.  **Em Preparo:** Pedidos na cozinha.
  3.  **Pronto:** Aguardando entregador ou retirada.
  4.  **Finalizados:** Histórico de entregas concluídas.
- **Ações Rápidas:** Botões para avançar o status do pedido com um clique.

---

## 7. ⚠️ ALERTA ESTRATÉGICO: Registro de Marca

**Importância Crítica:**
O registro da marca "The Rooster" no INPI (Instituto Nacional da Propriedade Industrial) é fundamental para garantir a exclusividade do nome e proteger o patrimônio da empresa. Sem o registro, a marca está vulnerável a cópias, uso indevido e até processos judiciais que podem impedir o uso do nome.

**Cenário Atual (Pesquisa INPI):**
Uma pesquisa recente na base de dados do INPI revelou que **3 outras empresas já tentaram registrar a marca "The Rooster"**. Isso indica um alto interesse no nome e um risco real de conflito de propriedade intelectual.

**Recomendação:**
Sugerimos iniciar o processo de registro o mais breve possível para assegurar o direito de uso exclusivo e evitar a necessidade de um _rebranding_ forçado no futuro, o que acarretaria prejuízos financeiros e perda de identidade no mercado.

---

> **Status do Sistema:** ✅ Pronto para Operação / Deploy.
