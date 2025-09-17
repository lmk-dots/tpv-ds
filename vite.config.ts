import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/tpv-ds/', // <-- ¡Esta línea es la clave!
  plugins: [react()],
})