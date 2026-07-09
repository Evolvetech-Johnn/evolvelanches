import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useStore } from "../../contexts/StoreContext";
import { formatCurrency } from "../../utils/formatters";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();
  const { isAuthenticated } = useAuth();
  const { storeConfig } = useStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "EVOLVE10") {
      setDiscount(subtotal * 0.1);
      setCouponMessage({
        type: "success",
        text: "Cupom aplicado com sucesso!",
      });
    } else if (couponCode.trim() === "") {
      setCouponMessage({ type: "error", text: "Digite um código." });
    } else {
      setDiscount(0);
      setCouponMessage({ type: "error", text: "Cupom inválido." });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container cart-empty">
        <h2>Seu carrinho está vazio 🍕</h2>
        <p>Que tal adicionar algumas delícias?</p>
        <Link to="/catalogo" className="btn btn-primary">
          Ver Cardápio
        </Link>
      </div>
    );
  }

  const deliveryFee = storeConfig.deliveryFee;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="container cart-page">
      <h1>Seu Carrinho</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.cartId || item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                {item.selectedExtras && item.selectedExtras.length > 0 && (
                  <p className="item-extras">
                    + {item.selectedExtras.map((e) => e.name).join(", ")}
                  </p>
                )}
                <p className="item-price">{formatCurrency(item.price)}</p>
              </div>
              <div className="item-actions">
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId || item.id, item.quantity - 1)
                    }
                    aria-label="Diminuir"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId || item.id, item.quantity + 1)
                    }
                    aria-label="Aumentar"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.cartId || item.id)}
                  aria-label="Remover"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline btn-sm clear-cart-btn"
            onClick={clearCart}
          >
            Esvaziar Carrinho
          </button>
        </div>

        <div className="cart-summary">
          <h3>Resumo do Pedido</h3>

          <div className="coupon-section">
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Cupom de desconto"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleApplyCoupon}
              >
                Aplicar
              </button>
            </div>
            {couponMessage && (
              <p className={`coupon-msg ${couponMessage.type}`}>
                {couponMessage.text}
              </p>
            )}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Taxa de Entrega</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Desconto</span>
              <span>- {formatCurrency(discount)}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <button
            className="btn btn-primary btn-full checkout-btn"
            onClick={handleCheckout}
          >
            Finalizar Pedido
          </button>

          <Link to="/catalogo" className="continue-shopping">
            <ArrowLeft size={16} /> Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
