import { ViteSSG } from 'vite-ssg'
import { createHead } from '@vueuse/head'
import './style.css'
import App from './App.vue'
import { routes, scrollBehavior } from './router'

export const createApp = ViteSSG(
  App,
  { 
    routes, 
    scrollBehavior,
    base: import.meta.env.BASE_URL 
  },
  ({ app }) => {
    const head = createHead()
    app.use(head)
  }
)
