import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  base: '/arts-gallery/',
  server: { 
    proxy: {
      '/proxy-wiki': {
        target: 'https://upload.wikimedia.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy-wiki/, ''),
        headers: {
          'Referer': 'https://upload.wikimedia.org/',
          'User-Agent': 'Mozilla/5.0 (compatible; YourApp/1.0)'
        }
      }
    }
  }
})