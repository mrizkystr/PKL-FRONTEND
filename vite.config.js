import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    'import.meta.env.VITE_HOST_API': JSON.stringify(process.env.VITE_HOST_API)
  }
})