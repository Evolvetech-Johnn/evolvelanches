import React from "react";
import { Link } from "react-router-dom";
import {
  Drumstick,
  UtensilsCrossed,
  Sandwich,
  Package,
  Pizza,
  IceCream,
  Baby,
  Coffee,
  Flame,
  Star,
  Maximize2,
  X,
} from "lucide-react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import HeroSlider from "../../components/home/HeroSlider";
import InstagramFeed from "../../components/home/InstagramFeed";
import { useProducts } from "../../contexts/ProductContext";
import { formatCurrency } from "../../utils/formatters";
import "./Home.css";

const Home = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  // Define OnePage Sections based on User Request
  const sections = [
    {
      id: "mais-pedidos",
      title: "Os Mais Pedidos",
      icon: <Star size={20} />,
      products: products.filter((p) => p.isBestSeller), // Needs isBestSeller in mockData
    },
    {
      id: "ofertas",
      title: "O Galo Ficou Doido - Super Ofertas",
      icon: <Flame size={20} />,
      products: products.filter((p) => p.category === "ofertas"),
    },
    {
      id: "lanches",
      title: "Lanches Premium",
      icon: <Sandwich size={20} />,
      products: products.filter((p) => p.category === "lanches"),
    },
    {
      id: "combos",
      title: "Combos Premium",
      icon: <UtensilsCrossed size={20} />,
      products: products.filter((p) => p.category === "combos"),
    },
    {
      id: "baldes",
      title: "Baldes de Frango",
      icon: <Drumstick size={20} />,
      products: products.filter((p) => p.category === "baldes"),
    },
    {
      id: "porcoes",
      title: "Porções",
      icon: <Package size={20} />,
      products: products.filter((p) => p.category === "porcoes"),
    },
    {
      id: "molhos",
      title: "Molhos Adicionais",
      icon: <Pizza size={20} />,
      products: products.filter((p) => p.category === "molhos"),
    },
    {
      id: "bebidas",
      title: "Bebidas Geladas",
      icon: <Coffee size={20} />,
      products: products.filter((p) => p.category === "bebidas"),
    },
    {
      id: "sobremesas",
      title: "Sobremesas",
      icon: <IceCream size={20} />,
      products: products.filter((p) => p.category === "sobremesas"),
    },
    {
      id: "kids",
      title: "Kids",
      icon: <Baby size={20} />,
      products: products.filter((p) => p.category === "kids"),
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* 1. Hero Slider */}
        <HeroSlider />

        <InstagramFeed />

        {/* 2. Sticky Category Nav */}
        <div className="sticky-nav-container">
          <div className="category-nav">
            {sections
              .filter((section) => section.products.length > 0)
              .map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="cat-nav-btn"
                >
                  {section.icon}
                  <span>{section.title.split(" - ")[0]}</span>{" "}
                  {/* Shorten title for nav */}
                </button>
              ))}
          </div>
        </div>

        {/* 3. Render Sections */}
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="menu-sections"
        >
          {sections.map(
            (section) =>
              section.products.length > 0 && (
                <section
                  key={section.id}
                  id={section.id}
                  className="home-section menu-section"
                >
                  <div className="section-header">
                    <h2>{section.title}</h2>
                  </div>
                  <div className="best-sellers-list">
                    {section.products.map((product) => (
                      <Motion.div
                        key={product.id}
                        className={`best-seller-item ${product.category === "bebidas" ? "item-drink" : ""}`}
                        variants={itemVariants}
                      >
                        <div className="bs-image">
                          <img src={product.image} alt={product.name} />
                          <button
                            className="zoom-btn"
                            onClick={() => setSelectedProduct(product)}
                            aria-label="Ampliar imagem e ver detalhes"
                          >
                            <Maximize2 size={20} />
                          </button>
                        </div>
                        <div className="bs-info">
                          <h4>{product.name}</h4>
                          <p className="bs-description">
                            {product.description}
                          </p>
                          <div className="bs-footer">
                            <p className="bs-price">
                              {product.originalPrice && (
                                <span className="original-price">
                                  {formatCurrency(product.originalPrice)}
                                </span>
                              )}
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/produto/${product.id}`}
                          className="btn btn-outline btn-sm btn-icon"
                          aria-label={`Ver detalhes de ${product.name}`}
                        >
                          +
                        </Link>
                      </Motion.div>
                    ))}
                  </div>
                </section>
              ),
          )}
        </Motion.div>

        <AnimatePresence>
          {selectedProduct && (
            <Motion.div
              className="product-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <Motion.div
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
              </Motion.div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
