export const useProducts = () => {
    const products = ref([
      {
        id: 1,
        title: 'SaaS Starter Kit (Pro)',
        category: 'Source Code',
        rating: 4.8,
        reviews: 124,
        price: '$149',
        description: 'The ultimate boilerplate for building production-ready SaaS applications with Nuxt 3 and Supabase. Includes Auth, Stripe, and rich components.',
        fullDescription: `
          Stop wasting time on setup. This SaaS Starter Kit is the most comprehensive Nuxt 3 boilerplate available. 
          It comes pre-configured with Supabase Auth, Stripe Subscriptions, and a beautiful dashboard UI.
          
          Features:
          - Nuxt 3 + Tailwind CSS
          - Supabase Auth & Database
          - Stripe Payment Integration
          - Dark Mode Support
          - 50+ Pre-built Components
        `,
        features: ['Nuxt 3 SSR', 'Supabase Auth', 'Stripe Payments', 'Dashboard layout', 'Dark Mode'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 2,
        title: 'Modern Agency Portfolio',
        category: 'UI Template',
        rating: 4.9,
        reviews: 85,
        price: '$49',
        description: 'A sleek, high-performance portfolio template meant to convert visitors into clients.',
        fullDescription: `
          First impressions matter. This Agency Portfolio template is designed to wow your potential clients with smooth animations and a premium feel.
          Built with performance in mind to ensure 100/100 Lighthouse scores.
        `,
        features: ['GSAP Animations', 'Clean Typography', 'CMS Integration Ready', 'Responsive Design', 'SEO Optimized'],
        image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 3,
        title: 'Mastering Nuxt 3',
        category: 'E-Book',
        rating: 5.0,
        reviews: 210,
        price: '$29',
        description: 'Deep dive into Nuxt 3 internals, architectural patterns, and performance optimization.',
        fullDescription: `
          Become a Nuxt 3 expert. This guide covers everything from basic setup to advanced concepts like custom renderers, module creation, and server-side optimization.
        `,
        features: ['300+ Pages', 'Code Examples', 'Video Walkthroughs', 'Best Practices', 'Regular Updates'],
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 4,
        title: 'Crypto Dashboard UI',
        category: 'UI Template',
        rating: 4.7,
        reviews: 42,
        price: '$59',
        description: 'A data-heavy, complex dashboard template optimized for financial data visualization.',
        fullDescription: 'Perfect for fintech apps.',
        features: ['Chart.js Integration', 'Real-time Data placeholders', 'Dark Mode Only'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 5,
        title: 'Developer Blog CMS',
        category: 'Source Code',
        rating: 4.8,
        reviews: 18,
        price: '$89',
        description: 'A markdown-based blogging platform suitable for developers who love writing.',
        fullDescription: 'Write in Markdown, deploy anywhere.',
        features: ['Nuxt Content', 'Tailwind Typography', 'SEO Meta Tags', 'RSS Feed'],
        image: 'https://images.unsplash.com/photo-1499750310159-53f0f614530f?auto=format&fit=crop&q=80&w=800'
      }
    ]);
  
    const getProductById = (id: number) => {
        return products.value.find(p => p.id == id);
    }

    return {
      products,
      getProductById
    }
  }
  
