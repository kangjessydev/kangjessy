import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Composable for lazy loading images with Intersection Observer
 * Improves initial page load performance by deferring image loading
 */
export function useLazyLoad(elementRef: Ref<HTMLElement | null>, options?: IntersectionObserverInit) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            // Stop observing once visible
            if (observer && elementRef.value) {
              observer.unobserve(elementRef.value)
            }
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before element enters viewport
        threshold: 0.01,
        ...options,
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
    }
    observer = null
  })

  return { isVisible }
}

/**
 * Directive for lazy loading images
 * Usage: v-lazy-img="imageUrl"
 */
export const vLazyImg = {
  mounted(el: HTMLImageElement, binding: { value: string }) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = binding.value
            img.loading = 'lazy'
            observer.unobserve(img)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    observer.observe(el)
  },
}
