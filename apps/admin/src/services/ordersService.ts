import { supabase } from '@kangjessy/database'
import type { Order } from '../types'

export const ordersService = {
  // Get all orders
  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Order[]
  },

  // Get order by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Order
  },

  // Create order
  async create(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()
    
    if (error) throw error
    return data as Order
  },

  // Update order
  async update(id: string, order: Partial<Order>) {
    const { data, error } = await supabase
      .from('orders')
      .update({ ...order, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Order
  },

  // Delete order
  async delete(id: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get orders by status
  async getByStatus(status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Order[]
  },

  // Search orders
  async search(query: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .or(`client_name.ilike.%${query}%,client_email.ilike.%${query}%,service_type.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Order[]
  }
}
