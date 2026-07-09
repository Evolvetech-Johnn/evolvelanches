import React from "react";
import { useOrder } from "../../contexts/OrderContext";
import {
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  ShoppingBag,
  ChefHat,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import "./OrderManager.css";

const OrderManager = () => {
  const { orders, updateOrderStatus, removeOrder } = useOrder();

  const columns = [
    {
      id: "Recebido",
      title: "Recebidos",
      icon: <AlertCircle size={20} />,
      color: "#3b82f6",
    },
    {
      id: "Preparando",
      title: "Em Preparo",
      icon: <ChefHat size={20} />,
      color: "#f59e0b",
    },
    {
      id: "Pronto",
      title: "Pronto",
      icon: <CheckCircle size={20} />,
      color: "#10b981",
    },
    {
      id: "Entregue",
      title: "Finalizados",
      icon: <Truck size={20} />,
      color: "#6b7280",
    }, // Unified for Delivered/Picked up
  ];

  const getNextStatus = (currentStatus, type) => {
    switch (currentStatus) {
      case "Recebido":
        return "Preparando";
      case "Preparando":
        return "Pronto";
      case "Pronto":
        return type === "delivery" ? "Saiu p/ Entrega" : "Pronto p/ Retirada";
      case "Saiu p/ Entrega":
        return "Entregue";
      case "Pronto p/ Retirada":
        return "Retirado";
      default:
        return null;
    }
  };

  const handleAdvance = (order) => {
    const next = getNextStatus(order.status, order.type);
    if (next) {
      updateOrderStatus(order.id, next);
    } else if (
      order.status === "Saiu p/ Entrega" ||
      order.status === "Pronto p/ Retirada"
    ) {
      // Final step to 'Entregue' or 'Retirado'
      const finalStatus = order.type === "delivery" ? "Entregue" : "Retirado";
      updateOrderStatus(order.id, finalStatus);
    }
  };

  const getColumnOrders = (columnId) => {
    return orders.filter((order) => {
      if (columnId === "Entregue") {
        return [
          "Entregue",
          "Retirado",
          "Saiu p/ Entrega",
          "Pronto p/ Retirada",
        ].includes(order.status);
      }
      return order.status === columnId;
    });
  };

  // Stats
  const activeOrdersCount = orders.filter(
    (o) => !["Entregue", "Retirado", "Cancelado"].includes(o.status),
  ).length;
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard de Pedidos</h1>
          <p>Gerencie o fluxo de produção e entrega</p>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-label">Pedidos Ativos</span>
            <span className="stat-value">{activeOrdersCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Receita Total</span>
            <span className="stat-value">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map((col) => (
          <div key={col.id} className="kanban-column">
            <div
              className="column-header"
              style={{ borderBottomColor: col.color }}
            >
              <div className="column-title">
                {col.icon}
                <span>{col.title}</span>
              </div>
              <span className="column-count">
                {getColumnOrders(col.id).length}
              </span>
            </div>

            <div className="column-content">
              {getColumnOrders(col.id).map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className="order-time">{order.time}</span>
                  </div>

                  <div className="order-customer">
                    <strong>{order.customer}</strong>
                    <span className={`order-type type-${order.type}`}>
                      {order.type === "delivery" ? (
                        <Truck size={12} />
                      ) : (
                        <ShoppingBag size={12} />
                      )}
                      {order.type === "delivery" ? "Entrega" : "Retirada"}
                    </span>
                  </div>

                  <p className="order-items">{order.items}</p>

                  <div className="order-footer">
                    <span className="order-total">
                      {formatCurrency(order.total)}
                    </span>
                    <div className="order-actions">
                      {col.id !== "Entregue" && (
                        <button
                          className="action-btn btn-advance"
                          onClick={() => handleAdvance(order)}
                          title="Avançar Etapa"
                        >
                          <ArrowRight size={16} />
                        </button>
                      )}
                      <button
                        className="action-btn btn-delete"
                        onClick={() => removeOrder(order.id)}
                        title={col.id === "Entregue" ? "Arquivar" : "Cancelar"}
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Show detailed status for the 'Finalizados' column which mixes statuses */}
                  {col.id === "Entregue" && (
                    <div className="status-badge-small">{order.status}</div>
                  )}
                </div>
              ))}
              {getColumnOrders(col.id).length === 0 && (
                <div className="empty-column">Sem pedidos</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManager;
