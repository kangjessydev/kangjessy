import { supabase } from '@kangjessy/database'
import type { Interaction } from '../types'

export const interactionsService = {
  // Get all interactions for a client
  async getByClientId(clientId: string) {
    const { data, error } = await supabase
      .from('client_interactions')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Interaction[]
  },

  // Add an interaction
  async create(interaction: Omit<Interaction, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('client_interactions')
      .insert([interaction])
      .select()
      .single()
    
    if (error) throw error
    return data as Interaction
  },

  // Delete an interaction
  async delete(id: string) {
    const { error } = await supabase
      .from('client_interactions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
