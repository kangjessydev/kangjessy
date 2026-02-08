import { useHead } from '@vueuse/head'
import { computed, unref, type Ref, type ComputedRef } from 'vue'

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

interface SEOProps {
  title?: MaybeRef<string | undefined>
  description?: MaybeRef<string | undefined>
  image?: MaybeRef<string | undefined>
  url?: MaybeRef<string | undefined>
  keywords?: MaybeRef<string | undefined>
}

export function useSEO({ title, description, image, url, keywords }: SEOProps) {
  const siteTitle = 'KangJessy Agency'
  const defaultDesc = 'Bantu bisnis Anda Auto-Pilot dengan Landing Page High-Conversion, Sistem CRM/ERP custom, dan Robot Automasi AI. Eksekusi cepat, hasil serius.'
  const defaultImage = 'https://kangjessy.com/og-image.png'
  const siteUrl = 'https://kangjessy.com'

  const fullTitle = computed(() => {
    const t = unref(title)
    return t ? `${t} | ${siteTitle}` : siteTitle
  })

  // Helper to safely unref other props within computed context
  const getDesc = () => unref(description) || defaultDesc
  const getImage = () => unref(image) || defaultImage
  const getUrl = () => {
    const u = unref(url)
    return u ? `${siteUrl}${u}` : siteUrl
  }

  useHead({
    title: fullTitle,
    meta: [
      {
        name: 'description',
        content: computed(getDesc),
      },
      {
        name: 'keywords',
        content: computed(() => unref(keywords) || ''),
      },
      // Open Graph
      {
        property: 'og:title',
        content: fullTitle,
      },
      {
        property: 'og:description',
        content: computed(getDesc),
      },
      {
        property: 'og:image',
        content: computed(getImage),
      },
      {
        property: 'og:url',
        content: computed(getUrl),
      },
      {
        property: 'og:type',
        content: 'website',
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: fullTitle,
      },
      {
        name: 'twitter:description',
        content: computed(getDesc),
      },
      {
        name: 'twitter:image',
        content: computed(getImage),
      },
      // SEO & Browser
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'theme-color',
        content: '#0A0A0A', // Matching project's dark theme
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      }
    ],
    link: [
        {
            rel: 'canonical',
            href: computed(getUrl)
        }
    ]
  })
}
