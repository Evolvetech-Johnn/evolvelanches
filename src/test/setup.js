
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

/**
 * Cleanup do DOM após cada teste
 */
afterEach(() => {
  cleanup();
});

/**
 * Mock de localStorage estável e resetável
 */
const createLocalStorageMock = () => {
  let store = {};

  return {
    getItem: vi.fn((key) => (key in store ? store[key] : null)),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
};

// Define o mock global UMA ÚNICA VEZ
Object.defineProperty(globalThis, 'localStorage', {
  value: createLocalStorageMock(),
  writable: true,
});

/**
 * Reset do localStorage antes de cada teste
 */
beforeEach(() => {
  globalThis.localStorage.clear();
});
