import React, { useState } from "react";
import "./OrderTracker.css";
import { CheckCircle, Clock, Truck, ShoppingBag, ChefHat, Utensils } from "lucide-react";

const OrderTracker = ({ orderType = "delivery", currentStep = 1 }) => {
  // Use state to freeze the start time on mount, ensuring stable rendering
  const [baseTime] = useState(() => Date.now());

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const steps = [
    {
      id: 1,
      label: "Recebido",
      // Simulated time logic for demo purposes
      time: formatTime(baseTime),
      icon: <CheckCircle size={24} />,
    },
    {
      id: 2,
      label: "Preparando",
      time: formatTime(baseTime + 5 * 60000),
      icon: <ChefHat size={24} />,
    },
    {
      id: 3,
      label: "Pronto",
      time: formatTime(baseTime + 25 * 60000),
      icon: <Clock size={24} />,
    },
    {
      id: 4,
      label:
        orderType === "delivery" 
          ? "Saiu p/ Entrega" 
          : orderType === "dine_in" 
            ? "Servido" 
            : "Pronto p/ Retirada",
      time: formatTime(baseTime + 35 * 60000),
      icon:
        orderType === "delivery" ? (
          <Truck size={24} />
        ) : orderType === "dine_in" ? (
          <Utensils size={24} />
        ) : (
          <ShoppingBag size={24} />
        ),
    },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="order-tracker-container">
      <h3>Acompanhe seu Pedido</h3>
      <div className="tracker-timeline">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <div key={step.id} className={`tracker-step ${status}`}>
              <div className="step-icon-container">
                <div className="step-line"></div>
                <div className="step-icon">{step.icon}</div>
              </div>
              <div className="step-content">
                <span className="step-time">
                  {status !== "pending" ? step.time : "--:--"}
                </span>
                <span className="step-label">{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
