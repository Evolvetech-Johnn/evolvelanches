import React, { createContext, useContext, useState, useEffect } from "react";


const OrderContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("evolve_orders");
    if (savedOrders) {
      return JSON.parse(savedOrders);
    }
    // Initialize with empty array for real persistence
    return [];
  });

  useEffect(() => {
    localStorage.setItem("evolve_orders", JSON.stringify(orders));
  }, [orders]);

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

  const addOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: generateOrderId(), // Sequential daily ID
      status: "Recebido",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toISOString(),
    };
    setOrders((prevOrders) => [orderWithId, ...prevOrders]);
    return orderWithId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const removeOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId),
    );
  };

  const getActiveOrders = () => {
    return orders.filter(
      (order) => !["Entregue", "Retirado", "Cancelado"].includes(order.status),
    );
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    removeOrder,
    getActiveOrders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
