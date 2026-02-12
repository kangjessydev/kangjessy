import { ref } from 'vue'
import { systemSettingsService } from '../services/systemSettingsService'

export interface UserProfile {
  name: string
  email: string
  avatar: string
  role: string
}

const STORAGE_KEY = 'kgj_user_profile'
const DB_KEY = 'admin_profile'

const defaultProfile: UserProfile = {
  name: 'Kang Jessy',
  email: 'admin@kangjessy.com',
  avatar: '',
  role: 'Super Admin'
}

const profile = ref<UserProfile>({ ...defaultProfile })

// Load initial state from LocalStorage for immediate UI
const stored = localStorage.getItem(STORAGE_KEY)
if (stored) {
  try {
    const parsed = JSON.parse(stored)
    profile.value = { ...defaultProfile, ...parsed }
  } catch (e) {
    console.error('Failed to parse user profile', e)
  }
}

export const useProfile = () => {
  const initProfile = async () => {
    try {
      const dbValue = await systemSettingsService.getByKey(DB_KEY)
      if (dbValue) {
        profile.value = { ...dbValue }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile.value))
      }
    } catch (e) {
      console.error('Failed to init profile from DB', e)
    }
  }

  const saveProfile = async (newProfile: UserProfile) => {
    profile.value = { ...newProfile }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile.value))

    try {
      await systemSettingsService.set(DB_KEY, profile.value)
    } catch (e) {
      console.error('Failed to sync profile to DB', e)
    }
  }

  const updateProfile = async (partial: Partial<UserProfile>) => {
    profile.value = { ...profile.value, ...partial }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile.value))

    try {
      await systemSettingsService.set(DB_KEY, profile.value)
    } catch (e) {
      console.error('Failed to sync profile to DB', e)
    }
  }

  return {
    profile,
    initProfile,
    saveProfile,
    updateProfile
  }
}
