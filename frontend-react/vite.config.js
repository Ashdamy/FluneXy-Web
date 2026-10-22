import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Las llamadas a /api van al backend Django en desarrollo.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
