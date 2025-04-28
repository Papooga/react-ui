import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/react/PTRQ/',  // This is the critical part
    build: {
        outDir: 'dist',
    },
  server: {
    proxy: {
      "/api": {
        /*target: "https://lims5000-qa.azurewebsites.net",*/
        target: "http://localhost:50511/",
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
