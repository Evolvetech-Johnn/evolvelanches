import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

describe('CartContext', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  const mockProduct = {
    id: '1',
    name: 'Frango Assado',
    price: 25.90,
    description: 'Delicioso frango assado',
    image: '/img/frango.jpg',
    category: 'lanches',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      expect(result.current.cartItems).toEqual([]);
      expect(result.current.subtotal).toBe(0);
      expect(result.current.totalItems).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]).toMatchObject({
        id: '1',
        name: 'Frango Assado',
        price: 25.90,
        quantity: 1,
      });
    });

    it('should update quantity for existing item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(3);
    });

    it('should handle products with cartId', () => {
      const productWithCartId = {
        ...mockProduct,
        cartId: 'product-1-variant',
      };

      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(productWithCartId, 1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].cartId).toBe('product-1-variant');
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      expect(result.current.cartItems).toHaveLength(1);

      act(() => {
        result.current.removeFromCart('1');
      });

      expect(result.current.cartItems).toHaveLength(0);
    });

    it('should handle removing non-existent item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.removeFromCart('999');
      });

      expect(result.current.cartItems).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('should remove item when quantity is less than 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      act(() => {
        result.current.updateQuantity('1', 0);
      });

      expect(result.current.cartItems).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should empty the cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1);
        result.current.addToCart({ ...mockProduct, id: '2' }, 2);
      });

      expect(result.current.cartItems).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cartItems).toHaveLength(0);
      expect(result.current.subtotal).toBe(0);
      expect(result.current.totalItems).toBe(0);
    });
  });

  describe('Computed Values', () => {
    it('should calculate subtotal correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2); // 25.90 * 2 = 51.80
        result.current.addToCart({ ...mockProduct, id: '2', price: 15.00 }, 3); // 15.00 * 3 = 45.00
      });

      expect(result.current.subtotal).toBe(96.80);
    });

    it('should calculate totalItems correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2);
        result.current.addToCart({ ...mockProduct, id: '2' }, 3);
        result.current.addToCart({ ...mockProduct, id: '3' }, 1);
      });

      expect(result.current.totalItems).toBe(6);
    });
  });

  describe('localStorage Persistence', () => {
    it('should save cart to localStorage when items change', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      const savedCart = localStorage.getItem('theRoosterCart');
      expect(savedCart).toBeDefined();
      
      const parsedCart = JSON.parse(savedCart);
      expect(parsedCart).toHaveLength(1);
      expect(parsedCart[0].id).toBe('1');
    });
  });
});
