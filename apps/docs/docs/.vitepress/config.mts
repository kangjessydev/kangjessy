import { defineConfig } from "vitepress"

export default defineConfig({
  title: "KangJessy Docs",
  description: "Dokumentasi Layanan KangJessy Agency",
  
  ignoreDeadLinks: true,

  themeConfig: {
  	search: {
      provider: 'local'
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Services", link: "/services/" },
      { text: "Main Site", link: "https://kangjessy.com" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/" }
        ]
      },
      {
        text: "Services", // ← Tambah group baru
        items: [
          { 
            text: "Website Development", 
            link: "/services/website-development" 
          },
          { 
            text: "Business System", 
            link: "/services/business-system" 
          }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/kangjessy" }
    ],
    
  },
  head: [
     ['link', { rel: 'icon', href: '/favicon.ico' }],
     ['link', { rel: 'apple-touch-icon', href: '/logo-128.png' }],
     ['meta', { name: 'theme-color', content: '#3b82f6' }],
     ['meta', { property: 'og:type', content: 'website' }],
     ['meta', { property: 'og:title', content: 'KangJessy Docs' }],
   ]
})