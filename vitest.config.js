/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,

    exclude: [
      '**/node_modules/**',
      '**/free-tailwind-admin-dashboard-template-main/**',
    ],
  },
});