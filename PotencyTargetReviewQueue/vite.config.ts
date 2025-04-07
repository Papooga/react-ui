import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/react/',
    build: {
        outDir: '../NCLims.App/NCLims.React'
    },
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://lims5000-qa.azurewebsites.net",
                changeOrigin: true,
                secure: false,
            },
        },
    }
})
