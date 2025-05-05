import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Make sure this is '/' for Vercel
  server:{
    host: true,
    port: 5173
  }
})
