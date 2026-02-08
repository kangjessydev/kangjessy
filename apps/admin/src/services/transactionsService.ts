import { supabase } from '@kangjessy/database'
import type { Transaction } from '../types'

export const transactionsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, client:clients(name), project:projects(name)')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(transaction: Partial<Transaction>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, transaction: Partial<Transaction>) {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
