import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base URL is root
  build: {
    outDir: 'dist', // Where build files go
    emptyOutDir: true // Clear folder before build
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://maternal-survey-backend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})