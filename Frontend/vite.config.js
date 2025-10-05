import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your backend URL
        changeOrigin: true,
      },
      // This is the new, crucial part for WebSocket proxying
      '/socket.io': {
        target: 'ws://localhost:8000',
        ws: true,
      },
    },
  },
});