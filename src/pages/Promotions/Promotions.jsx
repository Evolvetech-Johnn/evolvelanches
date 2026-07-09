import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from '../../components/product/ProductCard';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Flame } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import '../Menu/Menu.css'; // Reusing Menu grid styles
import './Promotions.css';

const Promotions = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products that are in 'ofertas' category OR have a discount (originalPrice > price)
  const promoProducts = products.filter(p => 
    p.category === 'ofertas' || (p.originalPrice && p.originalPrice > p.price)
  );

  return (
    <div className="promotions-page container page-padding">
      <div className="section-header text-center promo-header">
        <div className="promo-icon-wrapper">
          <Flame size={48} className="promo-icon-pulse" />
        </div>
        <h1>Promoções Imperdíveis</h1>
        <p>Aproveite nossas ofertas especiais por tempo limitado!</p>
      </div>

      {promoProducts.length > 0 ? (
        <motion.div layout className="menu-grid">
          <AnimatePresence mode='popLayout'>
            {promoProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onZoom={setSelectedProduct} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="no-products text-center">
          <p>Nenhuma promoção ativa no momento. Fique ligado!</p>
        </div>
      )}

       {/* Product Modal (Reused) */}
       <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="product-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="product-modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-modal-btn"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X size={24} />
                </button>
                <div className="modal-image-container">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
                </div>
                <div className="modal-info">
                  <h3>{selectedProduct.name}</h3>
                  <p className="modal-description">
                    {selectedProduct.description}
                  </p>
                  <div className="modal-price">
                    {formatCurrency(selectedProduct.price)}
                  </div>
                  <Link
                    to={`/produto/${selectedProduct.id}`}
                    className="btn btn-primary btn-block"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Ver Detalhes Completos
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default Promotions;
