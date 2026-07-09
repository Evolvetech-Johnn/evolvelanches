import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ArrowLeft, Star } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useProducts } from "../../contexts/ProductContext";
import { formatCurrency } from "../../utils/formatters";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState({}); // { id: quantity }
  const [observations, setObservations] = useState("");

  // Mock extras options - Expanded for Sauces logic
  const extrasOptions = [
    { id: "bbq", name: "Molho BBQ", price: 3.0, type: "sauce" },
    { id: "alho", name: "Molho de Alho", price: 3.0, type: "sauce" },
    { id: "rose", name: "Molho Rosé", price: 3.0, type: "sauce" },
    { id: "verde", name: "Molho Verde", price: 3.0, type: "sauce" },
    { id: "batata", name: "Batata Frita Média", price: 8.0, type: "side" },
    { id: "bacon", name: "Bacon Extra", price: 4.0, type: "addon" },
  ];

  const product = useMemo(() => {
    return getProductById(id);
  }, [id, getProductById]);

  useEffect(() => {
    if (!product) {
      navigate("/catalogo");
    }
  }, [product, navigate]);

  // Logic: Extract free sauce count from description
  const maxFreeSauces = useMemo(() => {
    if (!product) return 0;
    // Matches "2 molhos", "1 molho", "um molho", "uma molho" (typo handling)
    const match = product.description.match(/(?:(\d+)|um|uma)\s*molho/i);
    if (!match) return 0;

    // If a number is captured in group 1, use it. Otherwise it matched "um"/"uma" so return 1.
    return match[1] ? parseInt(match[1]) : 1;
  }, [product]);

  const handleExtraChange = (extraId, delta) => {
    setSelectedExtras((prev) => {
      const currentQty = prev[extraId] || 0;
      const newQty = Math.max(0, currentQty + delta);

      if (newQty === 0) {
        const { [extraId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [extraId]: newQty };
    });
  };

  // Logic: Calculate total price with free sauces deduction
  const calculateTotalPrice = () => {
    if (!product) return 0;

    let totalPrice = product.price;
    let freeSaucesUsed = 0;

    // Separate sauces from other extras
    const selectedSauces = [];
    const otherExtras = [];

    Object.entries(selectedExtras).forEach(([id, qty]) => {
      const extra = extrasOptions.find((e) => e.id === id);
      if (!extra) return;

      if (extra.type === "sauce") {
        for (let i = 0; i < qty; i++) {
          selectedSauces.push(extra);
        }
      } else {
        otherExtras.push({ ...extra, totalQty: qty });
      }
    });

    // Calculate price for sauces (first N are free)
    selectedSauces.forEach((sauce) => {
      if (freeSaucesUsed < maxFreeSauces) {
        freeSaucesUsed++;
      } else {
        totalPrice += sauce.price;
      }
    });

    // Calculate price for other extras
    otherExtras.forEach((extra) => {
      totalPrice += extra.price * extra.totalQty;
    });

    return totalPrice;
  };

  const currentPrice = calculateTotalPrice();

  const handleAddToCart = () => {
    if (!product) return;

    // Transform selectedExtras map to array for cart
    const extrasList = [];
    Object.entries(selectedExtras).forEach(([id, qty]) => {
      const extra = extrasOptions.find((e) => e.id === id);
      if (extra) {
        extrasList.push({ ...extra, quantity: qty });
      }
    });

    const finalProduct = {
      ...product,
      // Create unique cartId based on ID + Extras + Observations
      cartId: `${product.id}-${JSON.stringify(selectedExtras)}-${observations.trim()}`,
      selectedExtras: extrasList,
      observations: observations.trim(),
      price: currentPrice,
    };

    addToCart(finalProduct, quantity);
    navigate("/carrinho");
  };

  if (!product)
    return (
      <div className="container" style={{ padding: "2rem" }}>
        Carregando...
      </div>
    );

  // Helper to count total selected sauces for display logic
  const totalSelectedSauces = Object.entries(selectedExtras).reduce(
    (total, [id, qty]) => {
      const extra = extrasOptions.find((e) => e.id === id);
      return extra?.type === "sauce" ? total + qty : total;
    },
    0,
  );

  return (
    <div className="container product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} /> Voltar
      </button>

      <div className="product-layout">
        <div className="product-img-large">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-content">
          <h1>{product.name}</h1>
          <div className="rating">
            <Star size={16} fill="var(--color-primary)" stroke="none" />
            <Star size={16} fill="var(--color-primary)" stroke="none" />
            <Star size={16} fill="var(--color-primary)" stroke="none" />
            <Star size={16} fill="var(--color-primary)" stroke="none" />
            <Star size={16} fill="var(--color-primary)" stroke="none" />
            <span>(4.8)</span>
          </div>
          <p className="product-desc-large">{product.description}</p>
          <h2 className="product-price-large">
            {formatCurrency(currentPrice)}
          </h2>

          {/* Observations Section */}
          <div className="observations-section">
            <h3>Observações do Pedido</h3>
            <textarea
              className="observations-input"
              placeholder="Ex: Tirar a cebola, sem mostarda, ponto da carne..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={3}
            />
          </div>

          {/* Extras Section - HIDDEN for BEBIDAS */}
          {product.category !== "bebidas" && (
            <div className="extras-section">
              <h3>
                Adicionar Extras{" "}
                {maxFreeSauces > 0 && (
                  <span className="highlight-free">
                    ({Math.max(0, maxFreeSauces - totalSelectedSauces)} Molhos
                    Restantes Grátis)
                  </span>
                )}
              </h3>
              <div className="extras-list">
                {extrasOptions.map((extra) => {
                  const qty = selectedExtras[extra.id] || 0;
                  return (
                    <div
                      key={extra.id}
                      className={`extra-item ${qty > 0 ? "active" : ""}`}
                    >
                      <div className="extra-info">
                        <span className="extra-name">{extra.name}</span>
                        <span className="extra-price">
                          + {formatCurrency(extra.price)}
                        </span>
                      </div>

                      <div className="extra-controls">
                        <button
                          className="qty-btn-sm"
                          onClick={() => handleExtraChange(extra.id, -1)}
                          disabled={qty === 0}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="extra-qty">{qty}</span>
                        <button
                          className="qty-btn-sm"
                          onClick={() => handleExtraChange(extra.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="product-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus size={20} />
              </button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Adicionar • {formatCurrency(currentPrice * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
