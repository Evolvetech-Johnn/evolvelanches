import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { StoreProvider, useStore } from '../StoreContext';

describe('StoreContext', () => {
  const wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>;

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should initialize with default configuration', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      expect(result.current.storeConfig).toEqual({
        isOpen: true,
        deliveryFee: 5.00,
        minOrder: 20.00,
        waitTime: '40-60 min',
      });
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('toggleStoreOpen', () => {
    it('should toggle isOpen from true to false', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggleStoreOpen();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.storeConfig.isOpen).toBe(false);
    });

    it('should toggle isOpen from false to true', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.toggleStoreOpen();
        result.current.toggleStoreOpen();
      });

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('updateStoreSettings', () => {
    it('should update single setting', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.updateStoreSettings({ deliveryFee: 8.00 });
      });

      expect(result.current.storeConfig.deliveryFee).toBe(8.00);
      expect(result.current.storeConfig.isOpen).toBe(true); // Other settings unchanged
    });

    it('should update multiple settings', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.updateStoreSettings({
          deliveryFee: 10.00,
          minOrder: 30.00,
          waitTime: '30-45 min',
        });
      });

      expect(result.current.storeConfig.deliveryFee).toBe(10.00);
      expect(result.current.storeConfig.minOrder).toBe(30.00);
      expect(result.current.storeConfig.waitTime).toBe('30-45 min');
    });
  });

  describe('localStorage Persistence', () => {
    it('should save configuration to localStorage', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.updateStoreSettings({ deliveryFee: 12.00 });
      });

      const savedConfig = localStorage.getItem('therooster_store_config');
      expect(savedConfig).toBeDefined();

      const parsedConfig = JSON.parse(savedConfig);
      expect(parsedConfig.deliveryFee).toBe(12.00);
    });
  });

  describe('useStore Hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useStore());
      }).toThrow('useStore must be used within a StoreProvider');

      consoleSpy.mockRestore();
    });
  });
});
