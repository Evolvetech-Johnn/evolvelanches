# The Rooster 🐔

[![Tests](https://github.com/Evolvetech-Johnn/The-Rooter/actions/workflows/test.yml/badge.svg)](https://github.com/Evolvetech-Johnn/The-Rooter/actions/workflows/test.yml)
[![Build](https://github.com/Evolvetech-Johnn/The-Rooter/actions/workflows/build.yml/badge.svg)](https://github.com/Evolvetech-Johnn/The-Rooter/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/Evolvetech-Johnn/The-Rooter/branch/main/graph/badge.svg)](https://codecov.io/gh/Evolvetech-Johnn/The-Rooter)

Sistema de delivery para restaurante especializado em frango. Aplicação web moderna com React, gerenciamento de pedidos, controle de estoque e painel administrativo.

## 🚀 Tecnologias

- **Frontend**: React 19.2.0 + Vite
- **Routing**: React Router DOM 7.13.0
- **Styling**: CSS + Framer Motion
- **State Management**: React Context API
- **UI Components**: Lucide React Icons
- **Charts**: Recharts
- **Testing**: Vitest + Testing Library
- **Mobile**: Capacitor (Android)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Evolvetech-Johnn/The-Rooter.git

# Entre no diretório
cd The-Rooter

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com interface visual
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage

# Testes em modo watch
npm test -- --watch
```

**Cobertura de Testes**: 66 testes unitários com 98.5% de taxa de sucesso

## 🏗️ Build

```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## 📱 Estrutura do Projeto

```
src/
├── components/         # Componentes React reutilizáveis
│   ├── layout/        # Header, Footer, Layout
│   ├── product/       # ProductCard
│   ├── home/          # HeroSlider, InstagramFeed
│   └── order/         # OrderTracker
├── contexts/          # React Context (Cart, Products, Store, Stock)
├── pages/             # Páginas da aplicação
├── services/          # Mock data e serviços
├── utils/             # Funções utilitárias
└── test/              # Configuração de testes
```

## 🎯 Funcionalidades

### Para Clientes
- ✅ Catálogo de produtos com filtros por categoria
- ✅ Carrinho de compras com persistência
- ✅ Cálculo automático de subtotal e taxa de entrega
- ✅ Sistema de promoções
- ✅ Rastreamento de pedidos

### Para Administradores
- ✅ Painel administrativo completo
- ✅ Gerenciamento de produtos (CRUD)
- ✅ Controle de estoque
- ✅ Configuração da loja (horários, taxas)
- ✅ Visualização de pedidos
- ✅ Analytics e relatórios

## 🔧 Configuração

### Variáveis de Ambiente

Não são necessárias variáveis de ambiente para desenvolvimento local. A aplicação usa localStorage para persistência de dados.

### Modos de Execução

- **Development**: `npm run dev` - Hot reload habilitado
- **Production**: `npm run build` - Build otimizado
- **Preview**: `npm run preview` - Testa build de produção localmente

## 📊 Performance

- ✅ Code splitting automático
- ✅ Lazy loading de imagens
- ✅ Otimizações de contexto com useMemo/useCallback
- ✅ React.memo para componentes frequentemente renderizados
- ✅ Bundle otimizado com Vite

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**Antes de enviar um PR**:
- Execute os testes: `npm test`
- Execute o linter: `npm run lint`
- Verifique o build: `npm run build`

## 📝 Documentação

- [Component Guide](https://github.com/Evolvetech-Johnn/The-Rooter/blob/main/docs/COMPONENT_GUIDE.md) - Documentação de componentes
- [Context Guide](https://github.com/Evolvetech-Johnn/The-Rooter/blob/main/docs/CONTEXT_GUIDE.md) - Documentação de contextos
- [Phase 3: Optimization](https://github.com/Evolvetech-Johnn/The-Rooter/blob/main/docs/walkthrough.md) - Otimizações implementadas
- [Phase 4: Infrastructure](https://github.com/Evolvetech-Johnn/The-Rooter/blob/main/docs/phase4_walkthrough.md) - Testes e CI/CD

## 📄 Licença

Este projeto está sob a licença especificada no arquivo [LICENSE](LICENSE).

## 👥 Autores

- Desenvolvimento inicial - [Johnn-Evolvetech](https://github.com/Evolvetech-Johnn)

## 🙏 Agradecimentos

- Comunidade React
- Vite team
- Testing Library
- Todos os contribuidores

---
