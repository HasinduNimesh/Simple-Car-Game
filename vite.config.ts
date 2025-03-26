import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Simple-Car-Game/',
  plugins: [react()],
  publicDir: 'public',
})