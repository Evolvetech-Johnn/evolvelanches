import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Clock, TrendingUp } from 'lucide-react';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import Card from '../../components/admin/ui/Card';
import Badge from '../../components/admin/ui/Badge';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/users');
      if (response.data.success) {
        setCustomers(response.data.users);
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await api.get(`/users/${customerId}`);
      if (response.data.success) {
        setSelectedCustomer(response.data.user);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do cliente:', error);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: 'calc(100vh - 200px)' }}>
      {/* Lista de Clientes */}
      <Card title="Clientes">
        <div style={{ overflowY: 'auto', height: '100%', paddingRight: '0.5rem' }}>
          {customers.map(customer => (
            <div
              key={customer._id}
              onClick={() => fetchCustomerDetails(customer._id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: selectedCustomer?._id === customer._id ? '2px solid #F05A28' : '1px solid #e5e7eb',
                marginBottom: '0.75rem',
                cursor: 'pointer',
                backgroundColor: selectedCustomer?._id === customer._id ? '#fff4f0' : '#fff',
                transition: 'all 0.2s'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <User size={16} style={{ color: '#6b7280' }} />
                  <span style={{ fontWeight: 500, color: '#111827' }}>{customer.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280', fontSize: '0.875rem' }}>
                  <Phone size={12} />
                  <span>{customer.phone || 'Não informado'}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                  {customer.ordersCount} pedidos
                </div>
                <div style={{ fontWeight: 500, color: '#111827' }}>
                  {formatCurrency(customer.totalSpent)}
                </div>
              </div>
            </div>
          ))}
          {customers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              Nenhum cliente encontrado
            </div>
          )}
        </div>
      </Card>

      {/* Detalhes do Cliente */}
      <Card title="Detalhes do Cliente">
        {selectedCustomer ? (
          <div style={{ overflowY: 'auto', height: '100%', paddingRight: '0.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: '#111827' }}>
                {selectedCustomer.name}
              </h2>
              <p style={{ margin: '0.5rem 0 0', color: '#6b7280' }}>{selectedCustomer.email}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <Phone size={16} />
                  <span>Telefone</span>
                </div>
                <div style={{ fontWeight: 500, color: '#111827' }}>
                  {selectedCustomer.phone || 'Não informado'}
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <MapPin size={16} />
                  <span>Endereço</span>
                </div>
                <div style={{ fontWeight: 500, color: '#111827' }}>
                  {selectedCustomer.address || 'Não informado'}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#fff4f0', borderRadius: '0.5rem', textAlign: 'center' }}>
                <TrendingUp size={24} style={{ color: '#F05A28', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Gasto</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>
                  {formatCurrency(selectedCustomer.totalSpent)}
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', textAlign: 'center' }}>
                <User size={24} style={{ color: '#10b981', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Pedidos</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>
                  {selectedCustomer.ordersCount}
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', textAlign: 'center' }}>
                <Clock size={24} style={{ color: '#3b82f6', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Ticket Médio</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>
                  {formatCurrency(selectedCustomer.averageTicket)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>
                Histórico de Pedidos
              </h3>
              {selectedCustomer.orders.map(order => (
                <div
                  key={order._id}
                  style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 500, color: '#111827' }}>
                      Pedido {order._id.substring(order._id.length - 8)}
                    </span>
                    <Badge variant={order.status === 'Cancelado' ? 'danger' : 'success'}>
                      {order.status}
                    </Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '0.875rem' }}>
                    <span>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                    <span style={{ fontWeight: 500, color: '#111827' }}>
                      {formatCurrency(order.subtotal)}
                    </span>
                  </div>
                  <div style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                  </div>
                </div>
              ))}
              {selectedCustomer.orders.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  Nenhum pedido encontrado
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <User size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Selecione um cliente para ver os detalhes</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerManager;
