import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, MapPin, Clock } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useStore } from "../../contexts/StoreContext";
import { AnimatePresence, motion as Motion } from "framer-motion"; // Animation components
import logoImg from "../../assets/evolvelancheslogo.png";
import "./Header.css";

const Header = () => {
  const { totalItems } = useCart();
  const { isOpen } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`header-wrapper ${isScrolled ? "scrolled" : ""}`}>
        {/* Top Bar for Status */}
        <div className="top-bar">
          <div className="container top-bar-content">
            <div
              className={`status-indicator ${isOpen ? "open" : "closed"}`}
            >
              <Clock size={14} />
              <span>
                {isOpen ? "Aberto Agora" : "Fechado (Abre às 18:00)"}
              </span>
            </div>
            <div className="location-indicator">
              <MapPin size={14} />
              <span>
                Delivery em <strong>Londrina-PR</strong>
              </span>
            </div>
          </div>
        </div>

        <header className="main-header">
          <div className="container header-container">
            {/* Logo Section */}
            <div className="header-logo">
              <Link to="/">
                <div className="logo-glow"></div>
                <img src={logoImg} alt="Lanchonete e Pizzaria Evolve" className="logo-img" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="header-nav">
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "active" : ""}`}
              >
                Home
                {isActive("/") && (
                  <Motion.div layoutId="underline" className="nav-underline" />
                )}
              </Link>
              <Link
                to="/catalogo"
                className={`nav-link ${isActive("/catalogo") ? "active" : ""}`}
              >
                Cardápio
                {isActive("/catalogo") && (
                  <Motion.div layoutId="underline" className="nav-underline" />
                )}
              </Link>
              <Link
                to="/promocoes"
                className={`nav-link ${isActive("/promocoes") ? "active" : ""}`}
              >
                Promoções
                {isActive("/promocoes") && (
                  <Motion.div layoutId="underline" className="nav-underline" />
                )}
              </Link>
            </nav>

            {/* Actions Section */}
            <div className="header-actions">
              <Link
                to="/login"
                className="action-btn icon-btn"
                aria-label="Minha Conta"
                title="Minha Conta"
              >
                <User size={22} />
              </Link>

              <Link
                to="/carrinho"
                className="action-btn icon-btn cart-btn"
                aria-label="Carrinho"
              >
                <ShoppingBag size={22} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <Motion.span
                      className="cart-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {totalItems}
                    </Motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-overlay"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            id="mobile-menu-overlay"
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/") ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/catalogo"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/catalogo") ? "active" : ""}
              >
                Cardápio
              </Link>
              <Link
                to="/promocoes"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/promocoes") ? "active" : ""}
              >
                Promoções
              </Link>
              <div className="mobile-divider"></div>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mobile-action"
              >
                <User size={20} /> Minha Conta
              </Link>
            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
