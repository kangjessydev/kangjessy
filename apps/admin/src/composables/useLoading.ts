import { ref } from 'vue'

const activeLoadings = ref<Set<string>>(new Set())

export const useLoading = (namespace = 'default') => {
  const isLoading = ref(false)

  /**
   * Start loading state
   */
  const startLoading = () => {
    isLoading.value = true
    activeLoadings.value.add(namespace)
  }

  /**
   * Stop loading state
   */
  const stopLoading = () => {
    isLoading.value = false
    activeLoadings.value.delete(namespace)
  }

  /**
   * Check if any loading is active globally
   */
  const hasActiveLoading = () => {
    return activeLoadings.value.size > 0
  }

  /**
   * Wrap async function with loading state
   */
  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    startLoading()
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  /**
   * Execute multiple async tasks with loading state
   */
  const withLoadingBatch = async <T>(tasks: (() => Promise<T>)[]): Promise<T[]> => {
    startLoading()
    try {
      return await Promise.all(tasks.map(task => task()))
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    hasActiveLoading,
    withLoading,
    withLoadingBatch
  }
}
