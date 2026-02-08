import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'kangjessy-admin-theme'
const currentTheme = ref<Theme>('light')

export const useDarkMode = () => {
  /**
   * Initialize theme from localStorage or system preference
   */
  const initTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    
    if (stored) {
      currentTheme.value = stored
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = prefersDark ? 'dark' : 'light'
    }
    
    applyTheme(currentTheme.value)
  }

  /**
   * Apply theme to document
   */
  const applyTheme = (theme: Theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Toggle between light and dark
   */
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  /**
   * Set specific theme
   */
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
  }

  /**
   * Get current theme
   */
  const isDark = () => currentTheme.value === 'dark'

  // Watch for theme changes and persist
  watch(currentTheme, (newTheme) => {
    localStorage.setItem(STORAGE_KEY, newTheme)
    applyTheme(newTheme)
  })

  return {
    theme: currentTheme,
    isDark,
    toggleTheme,
    setTheme,
    initTheme
  }
}
