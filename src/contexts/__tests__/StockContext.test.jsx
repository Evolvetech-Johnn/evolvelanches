import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { StockProvider, useStock } from '../StockContext';

describe('StockContext', () => {
  const wrapper = ({ children }) => <StockProvider>{children}</StockProvider>;

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should load default stock items', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      expect(result.current.stockItems).toHaveLength(5);
      expect(result.current.stockItems[0].name).toBe('Frango em Pedaços');
    });
  });

  describe('addStockItem', () => {
    it('should add new stock item', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const newItem = {
        name: 'Molho Especial',
        quantity: 50,
        unit: 'unidades',
        minThreshold: 10,
      };

      act(() => {
        result.current.addStockItem(newItem);
      });

      expect(result.current.stockItems).toHaveLength(6);
      const addedItem = result.current.stockItems[5];
      expect(addedItem.name).toBe('Molho Especial');
      expect(addedItem.id).toBeDefined();
    });
  });

  describe('updateStockItem', () => {
    it('should update existing stock item', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;

      act(() => {
        result.current.updateStockItem(itemId, { minThreshold: 20 });
      });

      const updatedItem = result.current.stockItems.find((item) => item.id === itemId);
      expect(updatedItem.minThreshold).toBe(20);
    });
  });

  describe('deleteStockItem', () => {
    it('should remove stock item', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;

      act(() => {
        result.current.deleteStockItem(itemId);
      });

      expect(result.current.stockItems).toHaveLength(4);
      const deletedItem = result.current.stockItems.find((item) => item.id === itemId);
      expect(deletedItem).toBeUndefined();
    });
  });

  describe('addQuantity', () => {
    it('should increase stock quantity', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;
      const initialQuantity = result.current.stockItems[0].quantity;

      act(() => {
        result.current.addQuantity(itemId, 10);
      });

      const updatedItem = result.current.stockItems.find((item) => item.id === itemId);
      expect(updatedItem.quantity).toBe(initialQuantity + 10);
    });

    it('should handle string amounts', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;
      const initialQuantity = result.current.stockItems[0].quantity;

      act(() => {
        result.current.addQuantity(itemId, '15');
      });

      const updatedItem = result.current.stockItems.find((item) => item.id === itemId);
      expect(updatedItem.quantity).toBe(initialQuantity + 15);
    });
  });

  describe('removeQuantity', () => {
    it('should decrease stock quantity', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;
      const initialQuantity = result.current.stockItems[0].quantity;

      act(() => {
        result.current.removeQuantity(itemId, 5);
      });

      const updatedItem = result.current.stockItems.find((item) => item.id === itemId);
      expect(updatedItem.quantity).toBe(initialQuantity - 5);
    });

    it('should not go below zero', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;

      act(() => {
        result.current.removeQuantity(itemId, 1000);
      });

      const updatedItem = result.current.stockItems.find((item) => item.id === itemId);
      expect(updatedItem.quantity).toBe(0);
    });
  });

  describe('getLowStockItems', () => {
    it('should return items below minimum threshold', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      // Set an item to low stock
      const itemId = result.current.stockItems[0].id;
      const minThreshold = result.current.stockItems[0].minThreshold;

      act(() => {
        result.current.updateStockItem(itemId, { quantity: minThreshold - 1 });
      });

      const lowStockItems = result.current.getLowStockItems();

      expect(lowStockItems.length).toBeGreaterThan(0);
      expect(lowStockItems.some((item) => item.id === itemId)).toBe(true);
    });

    it('should not return items at or above threshold', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;
      const minThreshold = result.current.stockItems[0].minThreshold;

      act(() => {
        result.current.updateStockItem(itemId, { quantity: minThreshold + 10 });
      });

      const lowStockItems = result.current.getLowStockItems();

      expect(lowStockItems.some((item) => item.id === itemId)).toBe(false);
    });
  });

  describe('localStorage Persistence', () => {
    it('should save stock items to localStorage', () => {
      const { result } = renderHook(() => useStock(), { wrapper });

      const itemId = result.current.stockItems[0].id;

      act(() => {
        result.current.addQuantity(itemId, 20);
      });

      const savedStock = localStorage.getItem('theRoosterStock');
      expect(savedStock).toBeDefined();

      const parsedStock = JSON.parse(savedStock);
      expect(parsedStock).toHaveLength(5);
    });
  });
});
