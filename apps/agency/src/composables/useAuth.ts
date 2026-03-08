import { ref, onMounted } from 'vue'

export const useAuth = () => {
  const user = ref<any | null>(null)
  const role = ref<string | null>(null)
  const loading = ref(true)

  const getUser = async () => {
    // Mock user for hardcoded data environment
    user.value = {
      id: 'mock-client-1',
      email: 'john@example.com',
      user_metadata: { name: 'John Doe' }
    }
    role.value = 'client'
    loading.value = false
  }

  const logout = async () => {
    user.value = null
    role.value = null
  }

  onMounted(() => {
    getUser()
  })

  return { user, role, loading, logout, getUser }
}
