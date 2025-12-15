import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/comp_sci_degree/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  build: {
    target: 'esnext',
  },
});
