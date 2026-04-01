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
    hmr: true,
  },
  optimizeDeps: {
    force: false, // jangan re-bundle tiap restart
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
      '@kangjessy/config': path.resolve(__dirname, './src/lib/config/index.ts'),
      '@kangjessy/database': path.resolve(__dirname, './src/lib/database/index.ts'),
      '@kangjessy/ui': path.resolve(__dirname, './src/lib/ui/index.ts'),
    },
  },
  // @ts-ignore - vite-ssg options
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths: string[]) {
      // Basic routes
      const staticPaths = paths.filter((p: string) => !p.includes(':') && !p.includes('*'))
      
      // Dynamic routes for Projects
      const projectSlugs = [
        'hijiru-company-profile',
        'landing-page-generator',
        'pos-kasir-cloud',
        // Add more slugs as needed or fetch them dynamically if possible in build context
        // Ideally we import projectsData but simpler to list key projects to fix the immediate issue
      ]
      
      const projectPaths = projectSlugs.map(slug => `/project/${slug}`)
      
      return [...staticPaths, ...projectPaths]
    },
    onFinished() { 
      console.log('Static Site Generation finished.') 
    },
  },
}))
