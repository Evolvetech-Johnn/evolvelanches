import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { CartProvider } from '../../../contexts/CartContext';
import { StoreProvider } from '../../../contexts/StoreContext';

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }) => children,
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

// Mock the logo image
vi.mock('../../../assets/logotherooster-nobg.png', () => ({ default: '/mock-logo.png' }));

describe('Header', () => {
  const renderWithProviders = () => {
    return render(
      <BrowserRouter>
        <StoreProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </StoreProvider>
      </BrowserRouter>
    );
  };

  describe('Logo and Branding', () => {
    it('should render logo/branding', () => {
      renderWithProviders();
      
      const logo = screen.getByAltText(/the rooster/i);
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/mock-logo.png');
    });

    it('should link to home page', () => {
      renderWithProviders();
      
      const logoLink = screen.getByRole('link', { name: /the rooster/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Navigation', () => {
    it('should render navigation links', () => {
      renderWithProviders();
      
      expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /cardápio/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /promoções/i })).toBeInTheDocument();
    });

    it('should render cart link', () => {
      renderWithProviders();
      
      const cartLinks = screen.getAllByRole('link', { name: /carrinho/i });
      expect(cartLinks.length).toBeGreaterThan(0);
      expect(cartLinks[0]).toHaveAttribute('href', '/carrinho');
    });

    it('should render user/login link', () => {
      renderWithProviders();
      
      const loginLinks = screen.getAllByRole('link', { name: /minha conta/i });
      expect(loginLinks.length).toBeGreaterThan(0);
      expect(loginLinks[0]).toHaveAttribute('href', '/login');
    });
  });

  describe('Store Status', () => {
    it('should display store status', () => {
      renderWithProviders();
      
      const statusText = screen.getByText(/aberto agora|fechado/i);
      expect(statusText).toBeInTheDocument();
    });

    it('should display delivery location', () => {
      renderWithProviders();
      
      const locationText = screen.getByText(/indaiatuba/i);
      expect(locationText).toBeInTheDocument();
    });
  });
});
