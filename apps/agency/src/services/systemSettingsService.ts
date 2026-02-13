import { supabase } from '@kangjessy/database'

export const systemSettingsService = {
  async getByKey(key: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', key)
      .single()

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error(`Error fetching system setting [${key}]:`, error)
      }
      return null
    }

    return data?.value
  }
}
