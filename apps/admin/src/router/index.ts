import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '@kangjessy/database'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: () => import('../components/layout/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/Orders.vue')
        },
        {
          path: 'orders/new',
          name: 'order-create',
          component: () => import('../views/OrderEditor.vue')
        },
        {
          path: 'orders/:id/edit',
          name: 'order-edit',
          component: () => import('../views/OrderEditor.vue')
        },
        {
          path: 'orders/:id/preview',
          name: 'order-preview',
          component: () => import('../views/OrderProposal.vue')
        },
        {
          path: 'proposals/:id',
          name: 'proposal-view',
          component: () => import('../views/OrderProposal.vue')
        },
        {
          path: 'proposals',
          name: 'proposals',
          component: () => import('../views/Proposals.vue')
        },
        {
          path: 'proposals/generator',
          name: 'proposal-generator',
          component: () => import('../views/ProposalGenerator.vue')
        },
        {
          path: 'leads',
          name: 'leads',
          component: () => import('../views/Leads.vue')
        },
        {
          path: 'leads/new',
          name: 'lead-create',
          component: () => import('../views/OrderEditor.vue')
        },
        {
          path: 'leads/:id/edit',
          name: 'lead-edit',
          component: () => import('../views/OrderEditor.vue')
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('../views/Blog.vue')
        },
        {
          path: 'blog/new',
          name: 'blog-create',
          component: () => import('../views/BlogEditor.vue')
        },
        {
          path: 'blog/:id/edit',
          name: 'blog-edit',
          component: () => import('../views/BlogEditor.vue')
        },
        {
          path: 'blog/categories',
          name: 'blog-categories',
          component: () => import('../views/BlogCategories.vue')
        },
        {
          path: 'blog/tags',
          name: 'blog-tags',
          component: () => import('../views/BlogTags.vue')
        },
        {
          path: 'media',
          name: 'media',
          component: () => import('../views/Media.vue')
        },
        {
          path: 'portfolio',
          name: 'portfolio',
          component: () => import('../views/Portfolio.vue')
        },
        {
          path: 'portfolio/new',
          name: 'portfolio-create',
          component: () => import('../views/PortfolioEditor.vue')
        },
        {
          path: 'portfolio/:id/edit',
          name: 'portfolio-edit',
          component: () => import('../views/PortfolioEditor.vue')
        },
        {
          path: 'portfolio/areas',
          name: 'portfolio-areas',
          component: () => import('../views/PortfolioAreas.vue')
        },
        {
          path: 'portfolio/tech',
          name: 'portfolio-tech',
          component: () => import('../views/PortfolioTech.vue')
        },
        {
          path: 'finance',
          name: 'finance',
          component: () => import('../views/Finance.vue')
        },
        {
          path: 'vouchers',
          name: 'vouchers',
          component: () => import('../views/Vouchers.vue')
        },
        {
          path: 'blueprint',
          name: 'blueprint-stages',
          component: () => import('../views/Blueprint.vue')
        },
        {
          path: 'seed-data',
          name: 'seed-data',
          component: () => import('../views/SeedData.vue')
        },
        {
          path: 'blueprint/stages/:stageId/steps',
          name: 'blueprint-steps',
          component: () => import('../views/BlueprintSteps.vue')
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('../views/Projects.vue')
        },
        {
          path: 'projects/new',
          name: 'project-create',
          component: () => import('../views/ProjectEditor.vue')
        },
        {
          path: 'projects/:id/edit',
          name: 'project-edit',
          component: () => import('../views/ProjectEditor.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/Settings.vue')
        }
      ]
    }
  ]
})

// Auth guard - ENABLED
router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const { data: { user } } = await auth.getUser()
  
  if (requiresAuth) {
    if (!user) {
      next('/login')
    } else {
      next()
    }
  } else {
    // If already logged in and trying to access login page, redirect to dashboard
    if (user && to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
