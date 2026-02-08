import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tiptap')) return 'vendor-editor';
            if (id.includes('chart.js') || id.includes('vue-chartjs')) return 'vendor-charts';
            if (id.includes('@sanity')) return 'vendor-sanity';
            if (id.includes('@supabase')) return 'vendor-supabase';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // @ts-ignore - vite-ssg options
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() { 
      console.log('Static Site Generation finished.') 
    },
  }
}))
