import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/proposals-app/',
  server: {
    port: 3457,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})