import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Mejora el rendimiento en producción
    minify: 'esbuild', // Comprime el código
  },
  server: {
    port: 3000, // Puerto para desarrollo
    open: true, // Abre automáticamente el navegador
  }
})