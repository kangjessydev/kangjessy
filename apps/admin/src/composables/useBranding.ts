import { ref } from 'vue'
import { systemSettingsService } from '../services/systemSettingsService'

export interface BrandingSettings {
  name: string
  logo: string
}

const STORAGE_KEY = 'kgj_branding_settings'
const DB_KEY = 'branding'

const defaultBranding: BrandingSettings = {
  name: 'KANG JESSY',
  logo: '/logo-agency.png'
}

const branding = ref<BrandingSettings>({ ...defaultBranding })

// Load initial state from LocalStorage for immediate UI
const stored = localStorage.getItem(STORAGE_KEY)
if (stored) {
  try {
    const parsed = JSON.parse(stored)
    branding.value = { ...defaultBranding, ...parsed }
  } catch (e) {
    console.error('Failed to parse branding settings', e)
  }
}

export const useBranding = () => {
  const initBranding = async () => {
    try {
      const dbValue = await systemSettingsService.getByKey(DB_KEY)
      if (dbValue) {
        branding.value = { ...dbValue }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(branding.value))
      }
    } catch (e) {
      console.error('Failed to init branding from DB', e)
    }
  }

  const saveBranding = async (settings: BrandingSettings) => {
    branding.value = { ...settings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(branding.value))
    
    try {
      await systemSettingsService.set(DB_KEY, branding.value)
    } catch (e) {
      console.error('Failed to sync branding to DB', e)
    }
  }

  const updateBranding = async (partial: Partial<BrandingSettings>) => {
    branding.value = { ...branding.value, ...partial }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(branding.value))
    
    try {
      await systemSettingsService.set(DB_KEY, branding.value)
    } catch (e) {
      console.error('Failed to sync branding to DB', e)
    }
  }

  return {
    branding,
    initBranding,
    saveBranding,
    updateBranding
  }
}
