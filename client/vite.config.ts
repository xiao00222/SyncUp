import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  build:{
    outDir: process.env.VERCEL ? 'dist' : '../API/wwwroot',
    chunkSizeWarningLimit:1700,
    emptyOutDir:true
  },
  plugins: [react()],
})