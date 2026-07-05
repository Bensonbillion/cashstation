import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['index.html', 'privacy-policy.html'],
    },
  },
  publicDir: 'public',
});
