import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ToolsListView.vue')
    },
    {
      path: '/whatsapp-generator',
      name: 'wa-generator',
      component: () => import('../views/WaGenerator.vue')
    },
    {
      path: '/meta-previewer',
      name: 'meta-previewer',
      component: () => import('../views/MetaPreviewer.vue')
    },
    {
      path: '/palette-generator',
      name: 'palette-generator',
      component: () => import('../views/PaletteGenerator.vue')
    },
    {
      path: '/indo-lorem',
      name: 'indo-lorem',
      component: () => import('../views/IndoLorem.vue')
    },
    {
      path: '/webp-converter',
      name: 'webp-converter',
      component: () => import('../views/WebPConverter.vue')
    },
    {
      path: '/invoice-generator',
      name: 'invoice-generator',
      component: () => import('../views/InvoiceGenerator.vue')
    },
    {
      path: '/ai-prompt-builder',
      name: 'ai-prompt-builder',
      component: () => import('../views/AiPromptBuilder.vue')
    },
    {
      path: '/seo-scanner',
      name: 'seo-scanner',
      component: () => import('../views/SeoScanner.vue')
    },
    {
      path: '/roi-calculator',
      name: 'roi-calculator',
      component: () => import('../views/ConversionROICalculator.vue')
    },
    {
      path: '/wave-generator',
      name: 'wave-generator',
      component: () => import('../views/WaveGenerator.vue')
    },
    {
      path: '/professional-rewriter',
      name: 'professional-rewriter',
      component: () => import('../views/ProfessionalRewriter.vue')
    },
    {
      path: '/qr-customizer',
      name: 'qr-customizer',
      component: () => import('../views/QrCustomizer.vue')
    },
    {
      path: '/safe-zone',
      name: 'safe-zone',
      component: () => import('../views/SafeZone.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
