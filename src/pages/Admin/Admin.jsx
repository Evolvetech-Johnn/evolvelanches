import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { useStock } from '../../contexts/StockContext';
import {
  ShoppingBag,
  DollarSign,
  UtensilsCrossed,
  Package,
  AlertTriangle,
  TrendingUp,
  Plus,
  Edit,
} from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import Card from '../../components/admin/ui/Card';
import Button from '../../components/admin/ui/Button';
import Badge from '../../components/admin/ui/Badge';

const Admin = () => {
  const { products } = useProducts();
  const { stockItems } = useStock();
  const navigate = useNavigate();

  const lowStockCount = stockItems.filter(
    (item) => item.quantity <= item.minThreshold
  ).length;

  // TODO: Replace with real data from OrderContext
  const todayOrders = 32;
  const todayRevenue = 2850.0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Visão geral do seu negócio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pedidos Hoje"
          value={todayOrders}
          icon={ShoppingBag}
          trend="up"
          trendValue="+12%"
          onClick={() => navigate('/admin/pedidos')}
        />
        
        <StatsCard
          title="Faturamento Hoje"
          value={`R$ ${todayRevenue.toFixed(2)}`}
          icon={DollarSign}
          trend="up"
          trendValue="+8%"
          variant="primary"
          onClick={() => navigate('/admin/financeiro')}
        />
        
        <StatsCard
          title="Itens no Cardápio"
          value={products.length}
          icon={UtensilsCrossed}
          onClick={() => navigate('/admin/cardapio')}
        />
        
        <StatsCard
          title={lowStockCount > 0 ? 'Alertas de Estoque' : 'Estoque OK'}
          value={lowStockCount > 0 ? `${lowStockCount} Baixos` : stockItems.length}
          icon={lowStockCount > 0 ? AlertTriangle : Package}
          variant={lowStockCount > 0 ? 'danger' : 'success'}
          onClick={() => navigate('/admin/estoque')}
        />
      </div>

      {/* Quick Actions */}
      <Card title="Ações Rápidas">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/cardapio')}
            icon={UtensilsCrossed}
            className="flex-col h-24 gap-2"
          >
            <span className="text-center">Gerenciar Cardápio</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/admin/produtos/novo')}
            icon={Plus}
            className="flex-col h-24 gap-2"
          >
            <span className="text-center">Novo Produto</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/admin/estoque')}
            icon={Package}
            className="flex-col h-24 gap-2"
          >
            <span className="text-center">Controle Estoque</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/admin/pedidos')}
            icon={ShoppingBag}
            className="flex-col h-24 gap-2"
          >
            <span className="text-center">Ver Pedidos</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/admin/metricas')}
            icon={TrendingUp}
            className="flex-col h-24 gap-2"
          >
            <span className="text-center">Métricas</span>
          </Button>
        </div>
      </Card>

      {/* Recent Products */}
      <Card 
        title="Últimos Produtos" 
        subtitle="Produtos adicionados recentemente"
        headerAction={
          <Button
            size="sm"
            onClick={() => navigate('/admin/produtos/novo')}
            icon={Plus}
          >
            Novo Produto
          </Button>
        }
      >
        <div className="space-y-3">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={product.available ? 'success' : 'danger'}>
                  {product.available ? 'Disponível' : 'Indisponível'}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`/admin/produtos/editar/${product.id}`)}
                  icon={Edit}
                >
                  Editar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Admin;
