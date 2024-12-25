import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import path from 'path';

export default defineConfig({
  plugins: [
    svelte(),
  ],
  build: {
    minify: 'esbuild', // Use 'esbuild' for faster builds or 'terser' for more compression
    rollupOptions: {
      output: {
        manualChunks: {
          // Split dependencies into separate chunks
          vendor: ['svelte', 'svelte-spa-router', 'swiper', 'tslib'],
        },
      },
    },
    sourcemap: false, // Disable sourcemaps in production for smaller build size
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB to reduce HTTP requests
    chunkSizeWarningLimit: 500, // Adjust chunk size warning threshold (default 500 KB)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Create an alias for cleaner imports
    },
  },
});
