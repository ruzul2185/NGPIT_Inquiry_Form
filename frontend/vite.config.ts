import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:"0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
