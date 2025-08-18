import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern' // or "modern-compiler"
            }
        }
    },
    server: {
        host: '0.0.0.0',
    }
})