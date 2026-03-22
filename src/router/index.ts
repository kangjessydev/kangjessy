import { type RouterScrollBehavior } from 'vue-router'
import HomeView from '@/views/public/HomeView.vue'

export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
    return new Promise((resolve) => {
      // Small delay to ensure components are mounted and page has some height
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else if (to.hash) {
          resolve({ el: to.hash, behavior: 'smooth' })
        } else if (to.path !== from.path) {
          resolve({ top: 0, left: 0, behavior: 'instant' as any })
        } else {
          // If none of the above, just resolve to current
          resolve(false as any)
        }
      }, 400)
    })
}

export const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/public/ProjectOrder.vue')
    },
    {
      path: '/service/:id',
      name: 'service-detail',
      component: () => import('../views/public/ServiceDetail.vue')
    },
    {
      path: '/project/:slug',
      name: 'project-detail',
      component: () => import('../views/public/ProjectDetail.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/public/ProjectList.vue')
    },
    {
      path: '/portal',
      name: 'client-portal',
      component: () => import('../views/client/ClientPortal.vue')
    },
    {
      path: '/blog',
      name: 'blog-list',
      component: () => import('../views/public/BlogList.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('../views/public/BlogDetail.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/public/ServicesView.vue')
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/public/AboutView.vue')
    },

    {
      path: '/lp/:slug',
      name: 'landing-page',
      component: () => import('../views/public/LandingPageView.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/public/PrivacyPolicy.vue')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('../views/public/TermsOfService.vue')
    },
    {
      path: '/blueprint',
      name: 'blueprint',
      component: () => import('../views/public/RoadmapView.vue')
    },
    {
      path: '/p/:id',
      name: 'proposal-view',
      component: () => import('../views/public/ProposalView.vue')
    },
    {
      path: '/get-estimate',
      name: 'get-estimate',
      component: () => import('../views/public/EstimateView.vue')
    }
]

// Routes and ScrollBehavior are exported and used by ViteSSG in main.ts
