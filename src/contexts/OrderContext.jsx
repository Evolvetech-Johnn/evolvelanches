import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import authService from "../services/authService";


const OrderContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = authService.getCurrentUser();
  const isAuthenticated = !!user;

  const fetchOrders = async () => {
    if (!isAuthenticated) {
      const savedOrders = localStorage.getItem("evolve_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/orders");
      if (response.data.orders) {
        setOrders(response.data.orders.map(order => ({
          ...order,
          id: order._id
        })));
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      const savedOrders = localStorage.getItem("evolve_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  // Fallback to localStorage for guests
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("evolve_orders", JSON.stringify(orders));
    }
  }, [orders, isAuthenticated]);

  const generateOrderId = () => {
    const today = new Date().toISOString().split('T')[0];
    const sequenceData = localStorage.getItem("evolve_order_sequence");
    
    let count = 1;
    
    if (sequenceData) {
      const { date, lastCount } = JSON.parse(sequenceData);
      if (date === today) {
        count = lastCount + 1;
      }
    }
    
    localStorage.setItem("evolve_order_sequence", JSON.stringify({
      date: today,
      lastCount: count
    }));
    
    return `#${String(count).padStart(3, '0')}`;
  };

  const addOrder = async (newOrder) => {
    const orderItems = newOrder.items.map(item => ({
      productId: item.id || item.cartId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    const orderData = {
      ...newOrder,
      items: orderItems,
      subtotal: newOrder.subtotal,
      status: "Recebido",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toISOString(),
    };

    if (!isAuthenticated) {
      const orderWithId = {
        ...orderData,
        id: generateOrderId(),
      };
      setOrders((prevOrders) => [orderWithId, ...prevOrders]);
      return orderWithId;
    }

    try {
      const response = await api.post("/orders", orderData);
      if (response.data.order) {
        const savedOrder = {
          ...response.data.order,
          id: response.data.order._id
        };
        setOrders((prevOrders) => [savedOrder, ...prevOrders]);
        return savedOrder;
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      const orderWithId = {
        ...orderData,
        id: generateOrderId(),
      };
      setOrders((prevOrders) => [orderWithId, ...prevOrders]);
      return orderWithId;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (isAuthenticated) {
      try {
        await api.put(`/orders/${orderId}/status`, { status: newStatus });
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        (order.id === orderId || order._id === orderId) ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const removeOrder = async (orderId) => {
    if (isAuthenticated) {
      try {
        await api.delete(`/orders/${orderId}`);
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId && order._id !== orderId),
    );
  };

  const getActiveOrders = () => {
    return orders.filter(
      (order) => !["Entregue", "Retirado", "Cancelado"].includes(order.status),
    );
  };

  const value = {
    orders,
    loading,
    addOrder,
    updateOrderStatus,
    removeOrder,
    getActiveOrders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
