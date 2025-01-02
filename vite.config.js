import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/scrabble',
  },
  assetsInclude: ['src/fonts/*.otf'],
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
