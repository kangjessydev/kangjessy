import { ref, onMounted } from 'vue'
import { supabase } from '@kangjessy/database'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const user = ref<User | null>(null)
  const role = ref<string | null>(null)
  const loading = ref(true)

  const getUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser

      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single()
        
        role.value = profile?.role || 'client'
      }
    } catch (e) {
      user.value = null
      role.value = null
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    role.value = null
  }

  onMounted(() => {
    getUser()
  })

  return { user, role, loading, logout, getUser }
}
