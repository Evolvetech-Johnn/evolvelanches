import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { ProductProvider, useProducts } from '../ProductContext';
import productService from '../../services/productService';

// Mock the productService module
vi.mock('../../services/productService', () => ({
  default: {
    getProducts: vi.fn(),
    getCategories: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    toggleAvailability: vi.fn(),
  }
}));

const mockProducts = [
  { id: 1, name: 'Product 1', price: 10, category: 'lanches', description: 'Test', available: true },
  { id: 2, name: 'Product 2', price: 20, category: 'bebidas', description: 'Test', available: true },
];

const mockCategories = [
  { id: 'todos', name: 'Todos' },
  { id: 'lanches', name: 'Lanches' },
  { id: 'bebidas', name: 'Bebidas' },
];

describe('ProductContext', () => {
  const wrapper = ({ children }) => <ProductProvider>{children}</ProductProvider>;

  beforeEach(() => {
    vi.clearAllMocks();
    productService.getProducts.mockResolvedValue([...mockProducts]);
    productService.getCategories.mockResolvedValue([...mockCategories]);
  });

  describe('Initial State', () => {
    it('should load products and categories from service', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.products).toHaveLength(2);
      expect(result.current.products[0].name).toBe('Product 1');
      expect(result.current.categories).toHaveLength(3);
    });
  });

  describe('addProduct', () => {
    it('should add new product via service', async () => {
      const newProduct = {
        id: 'new-id',
        name: 'New Product',
        price: 30,
        category: 'lanches',
        description: 'New test product',
        available: true
      };
      
      productService.createProduct.mockResolvedValue(newProduct);

      const { result } = renderHook(() => useProducts(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let addedProduct;
      await act(async () => {
        addedProduct = await result.current.addProduct({
          name: 'New Product',
          price: 30,
          category: 'lanches',
          description: 'New test product',
        });
      });

      expect(productService.createProduct).toHaveBeenCalled();
      expect(result.current.products).toHaveLength(3);
      expect(addedProduct.id).toBe('new-id');
    });
  });

  describe('updateProduct', () => {
    it('should update existing product', async () => {
      const updatedProduct = { ...mockProducts[0], name: 'Updated Product', price: 15 };
      productService.updateProduct.mockResolvedValue(updatedProduct);

      const { result } = renderHook(() => useProducts(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.updateProduct(1, { name: 'Updated Product', price: 15 });
      });

      expect(productService.updateProduct).toHaveBeenCalledWith(1, { name: 'Updated Product', price: 15 });
      
      const foundProduct = result.current.products.find((p) => String(p.id) === '1');
      expect(foundProduct.name).toBe('Updated Product');
    });
  });

  describe('deleteProduct', () => {
    it('should remove product', async () => {
      productService.deleteProduct.mockResolvedValue(true);

      const { result } = renderHook(() => useProducts(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.deleteProduct(1);
      });

      expect(productService.deleteProduct).toHaveBeenCalledWith(1);
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].id).toBe(2);
    });
  });

  describe('toggleProductAvailability', () => {
    it('should toggle product availability', async () => {
      const toggledProduct = { ...mockProducts[0], available: false };
      productService.toggleAvailability.mockResolvedValue(toggledProduct);

      const { result } = renderHook(() => useProducts(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.toggleProductAvailability(1);
      });

      expect(productService.toggleAvailability).toHaveBeenCalledWith(1);
      const foundProduct = result.current.products.find((p) => String(p.id) === '1');
      expect(foundProduct.available).toBe(false);
    });
  });
});
