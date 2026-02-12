import { supabase } from '@kangjessy/database'

export interface SystemSetting {
  key: string
  value: any
  updated_at?: string
}

export const systemSettingsService = {
  /**
   * Get all settings
   */
  async getAll(): Promise<Record<string, any>> {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')

    if (error) {
      console.error('Error fetching system settings:', error)
      return {}
    }

    return (data || []).reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, any>)
  },

  /**
   * Get setting by key
   */
  async getByKey(key: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', key)
      .single()

    if (error) {
      if (error.code !== 'PGRST116') { // Not found
        console.error(`Error fetching system setting [${key}]:`, error)
      }
      return null
    }

    return data?.value
  },

  /**
   * Update or create setting
   */
  async set(key: string, value: any): Promise<void> {
    const { error } = await supabase
      .from('system_settings')
      .upsert({ key, value })

    if (error) {
      console.error(`Error saving system setting [${key}]:`, error)
      throw error
    }
  }
}

export default systemSettingsService
