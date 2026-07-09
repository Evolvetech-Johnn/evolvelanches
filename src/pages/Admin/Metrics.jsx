import React from 'react';
import { useOrder } from '../../contexts/OrderContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Metrics = () => {
    const { orders } = useOrder();

    // 1. Weekly Sales Logic
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const salesByDay = days.map(day => ({ name: day, vendas: 0 }));

    orders.forEach(order => {
        if (!['Cancelado'].includes(order.status)) {
            const date = new Date(order.date);
            if (!isNaN(date)) {
                const dayIndex = date.getDay();
                if (salesByDay[dayIndex]) {
                    salesByDay[dayIndex].vendas += order.total;
                }
            }
        }
    });

    // 2. Top Products Logic
    const productCounts = {};
    orders.forEach(order => {
        // Try to use structured itemsList first
        if (order.itemsList && order.itemsList.length > 0) {
            order.itemsList.forEach(item => {
                // Handle both short name and full name if needed, usually item.name is good
                productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
            });
        } 
        // Fallback to parsing string "1x Burger, 2x Coke"
        else if (order.items && typeof order.items === 'string') {
            const parts = order.items.split(',');
            parts.forEach(part => {
                const match = part.trim().match(/^(\d+)x\s+(.+)$/);
                if (match) {
                    const qty = parseInt(match[1]);
                    const name = match[2];
                    productCounts[name] = (productCounts[name] || 0) + qty;
                }
            });
        }
    });

    const topProducts = Object.entries(productCounts)
        .map(([name, qtd]) => ({ name, qtd }))
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 5);

    // If no data, show empty state or zeros to avoid chart errors
    const chartData = salesByDay;
    const barData = topProducts.length > 0 ? topProducts : [{ name: 'Sem dados', qtd: 0 }];

    return (
        <div>
            <div className="section-header-admin">
                <h1>Métricas de Venda</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                
                {/* Weekly Sales Chart */}
                <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Vendas da Semana</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-accent)" />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-primary)', color: 'var(--text-main)' }}
                                    itemStyle={{ color: 'var(--text-main)' }}
                                    formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
                                />
                                <Line type="monotone" dataKey="vendas" stroke="var(--color-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                 {/* Top Products */}
                 <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Produtos Mais Vendidos</h3>
                    <div style={{ height: '250px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-accent)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-primary)' }}
                                    cursor={{fill: 'transparent'}}
                                />
                                <Bar dataKey="qtd" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Metrics;
