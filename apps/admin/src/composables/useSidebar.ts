import { ref } from 'vue'

const isCollapsed = ref(localStorage.getItem('sidebar-collapsed') === 'true')
const isMobileOpen = ref(false)

export function useSidebar() {
  const toggleSidebar = () => {
    // If mobile, toggle using isMobileOpen
    if (window.innerWidth < 1024) { // lg breakpoint
      isMobileOpen.value = !isMobileOpen.value
    } else {
      isCollapsed.value = !isCollapsed.value
      localStorage.setItem('sidebar-collapsed', String(isCollapsed.value))
    }
  }

  const closeMobileSidebar = () => {
    isMobileOpen.value = false
  }

  return {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    closeMobileSidebar
  }
}
