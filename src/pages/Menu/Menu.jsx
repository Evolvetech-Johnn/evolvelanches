import React, { useState, useMemo } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from '../../components/product/ProductCard';
import { categories } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import '../Home/Home.css'; // Reusing Home styles for consistency
import './Menu.css';

const Menu = () => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="menu-page container page-padding">
      <div className="section-header text-center">
        <h1>Nosso Cardápio Completo</h1>
        <p>Explore todas as nossas delícias</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter-container">
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div layout className="menu-grid">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onZoom={setSelectedProduct} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="no-products text-center">
          <p>Nenhum produto encontrado nesta categoria.</p>
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

export default Menu;
