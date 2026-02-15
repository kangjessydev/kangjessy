import { ref } from 'vue'
import { systemSettingsService } from '../services/systemSettingsService'

export interface MarketingStats {
  projectsCompleted: number
  happyClients: number
  yearsExperience: number
  awardsWon: number
}

const STORAGE_KEY = 'kgj_marketing_stats'
const DB_KEY = 'marketing_stats'

const defaultStats: MarketingStats = {
  projectsCompleted: 0,
  happyClients: 0,
  yearsExperience: 0,
  awardsWon: 0
}

const stats = ref<MarketingStats>({ ...defaultStats })

// Load initial state from LocalStorage
const stored = localStorage.getItem(STORAGE_KEY)
if (stored) {
  try {
    const parsed = JSON.parse(stored)
    stats.value = { ...defaultStats, ...parsed }
  } catch (e) {
    console.error('Failed to parse marketing stats', e)
  }
}

export const useMarketingStats = () => {
  const initMarketingStats = async () => {
    try {
      const dbValue = await systemSettingsService.getByKey(DB_KEY)
      if (dbValue) {
        stats.value = { ...defaultStats, ...dbValue }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats.value))
      }
    } catch (e) {
      console.error('Failed to init marketing stats from DB', e)
    }
  }

  const saveMarketingStats = async (newStats: MarketingStats) => {
    stats.value = { ...newStats }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats.value))
    
    try {
      await systemSettingsService.set(DB_KEY, stats.value)
    } catch (e) {
      console.error('Failed to sync marketing stats to DB', e)
      throw e
    }
  }

  return {
    stats,
    initMarketingStats,
    saveMarketingStats
  }
}
