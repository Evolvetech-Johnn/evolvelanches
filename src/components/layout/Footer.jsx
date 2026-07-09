import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, ShieldCheck, FileText } from "lucide-react";
import "./Footer.css";
import logoImg from "../../assets/evolvelancheslogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="container footer-container">
        {/* Top Section: Brand & About */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <img src={logoImg} alt="Lanchonete e Pizzaria Evolve" className="footer-logo" />
            <p className="footer-tagline">
              As melhores pizzas e lanches da cidade. Sabores irresistíveis preparados com carinho.
            </p>
            <div className="social-links">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h3>Navegação</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#cardapio">Cardápio</Link>
              </li>
              <li>
                <Link to="/#promocoes">Promoções</Link>
              </li>
              <li>
                <Link to="/login">Minha Conta</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h3>Contato & Localização</h3>
            <div className="contact-item">
              <MapPin size={20} className="contact-icon" />
              <p>
                Rua Exemplo, 123 - Bairro Modelo,
                <br />
                Cidade Exemplo, UF - CEP 00000-000
                <br />
                Brasil
              </p>
            </div>
            <div className="contact-item">
              <Phone size={20} className="contact-icon" />
              <div>
                <p className="franchise-highlight">
                  <strong>Seja um franqueado:</strong>
                  <br />
                  (XX) XXXXX-XXXX
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear} Lanchonete e Pizzaria Evolve. Todos os direitos reservados.
            </p>
          </div>

          <div className="legal-links">
            <Link to="/politica-de-privacidade" className="legal-link">
              <ShieldCheck size={14} /> Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="legal-link">
              <FileText size={14} /> Termos de Uso
            </Link>
          </div>

          <div className="developer-credit">
            Desenvolvido com <span style={{ color: "#f43f5e" }}>❤</span> por
            Evolvetech
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
