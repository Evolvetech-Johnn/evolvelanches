import React, { useState, useEffect } from 'react';
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
  Download,
  Users,
} from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import Card from '../../components/admin/ui/Card';
import Button from '../../components/admin/ui/Button';
import Badge from '../../components/admin/ui/Badge';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

const Admin = () => {
  const { products } = useProducts();
  const { stockItems } = useStock();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const lowStockCount = stockItems.filter(
    (item) => item.quantity <= item.minThreshold
  ).length;

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get('/metrics');
        if (response.data.success) {
          setMetrics(response.data.metrics);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const handleExportOrders = async () => {
    try {
      const response = await api.get('/metrics/export/orders', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pedidos.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting orders:', error);
    }
  };

  const handleExportCustomers = async () => {
    try {
      const response = await api.get('/metrics/export/customers', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clientes.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting customers:', error);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#111827', margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
            Visão geral do seu negócio
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={handleExportOrders} icon={Download}>
            Exportar Pedidos
          </Button>
          <Button onClick={handleExportCustomers} icon={Download}>
            Exportar Clientes
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
      }}>
        <StatsCard
          title="Pedidos Hoje"
          value={metrics?.todayOrders || 0}
          icon={ShoppingBag}
          trend="up"
          trendValue={metrics ? `Total ${metrics.totalOrders}` : ''}
          onClick={() => navigate('/admin/pedidos')}
        />
        <StatsCard
          title="Faturamento Hoje"
          value={formatCurrency(metrics?.todayRevenue || 0)}
          icon={DollarSign}
          trend="up"
          trendValue={metrics ? `Total ${formatCurrency(metrics.totalRevenue)}` : ''}
          variant="primary"
          onClick={() => navigate('/admin/financeiro')}
        />
        <StatsCard
          title="Clientes Totais"
          value={metrics?.totalCustomers || 0}
          icon={Users}
          trend="up"
          trendValue={metrics ? `+${metrics.newCustomers} na semana` : ''}
          variant="success"
          onClick={() => navigate('/admin/clientes')}
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { label: 'Gerenciar Cardápio', icon: UtensilsCrossed, path: '/admin/cardapio' },
            { label: 'Novo Produto',        icon: Plus,            path: '/admin/produtos/novo' },
            { label: 'Controle Estoque',    icon: Package,         path: '/admin/estoque' },
            { label: 'Ver Pedidos',         icon: ShoppingBag,     path: '/admin/pedidos' },
            { label: 'Métricas',            icon: TrendingUp,      path: '/admin/metricas' },
          ].map(({ label, icon: Icon, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                height: '6rem',
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 500,
                color: '#374151',
                fontSize: '0.875rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#F05A28';
                e.currentTarget.style.backgroundColor = '#fff4f0';
                e.currentTarget.style.color = '#F05A28';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#374151';
              }}
            >
              <Icon size={22} />
              <span style={{ textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Top Products */}
      {metrics && metrics.topProducts && metrics.topProducts.length > 0 && (
        <Card title="Produtos Mais Vendidos" subtitle="Top 10 produtos mais vendidos">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {metrics.topProducts.map((product, index) => (
              <div
                key={product.productId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    borderRadius: '0.5rem', 
                    backgroundColor: '#F05A28', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 600 
                  }}>
                    {index + 1}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }}
                  />
                  <div>
                    <h4 style={{ fontWeight: 500, color: '#111827', margin: 0 }}>{product.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
                      {product.quantity} vendidos - {formatCurrency(product.total)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#F05A28'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }}
                />
                <div>
                  <h4 style={{ fontWeight: 500, color: '#111827', margin: 0 }}>{product.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
