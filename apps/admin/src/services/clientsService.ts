import { supabase } from '@kangjessy/database'
import type { Client } from '../types'

export const clientsService = {
  // Get all clients
  async getAll() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Client[]
  },

  // Get client by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Client
  },

  // Create client
  async create(client: Omit<Client, 'id' | 'created_at'>) {
    // Filter out fields that are not in DB schema to prevent Schema Cache errors
    const {
      external_link,
      payment_notes,
      projects,
      deliverables,
      terms,
      terms_payment,
      terms_copyright,
      terms_revision,
      payment_accounts,
      ...clientData
    } = client as any;

    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single()
    
    if (error) throw error
    return data as Client
  },

  // Update client
  async update(id: string, client: Partial<Client>) {
    // Filter out fields that are not in DB schema to prevent Schema Cache errors
    const {
      external_link,
      payment_notes,
      projects,
      deliverables,
      terms,
      terms_payment,
      terms_copyright,
      terms_revision,
      payment_accounts,
      ...clientData
    } = client as any;

    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Client
  },

  // Delete client with safety for linked data
  async delete(id: string) {
    // 1. Delete linked transactions
    await supabase.from("transactions").delete().eq("client_id", id);

    // 2. Delete linked projects
    await supabase.from("projects").delete().eq("client_id", id);

    // 3. Finally delete the client
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) throw error;
  },

  async deleteMany(ids: string[]) {
    // 1. Delete linked transactions for all selected clients
    await supabase.from("transactions").delete().in("client_id", ids);

    // 2. Delete linked projects for all selected clients
    await supabase.from("projects").delete().in("client_id", ids);

    // 3. Finally delete the clients
    const { error } = await supabase.from("clients").delete().in("id", ids);

    if (error) throw error;
  },

  // Get clients by status
  async getByStatus(status: string) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Client[]
  },

  // Search clients
  async search(query: string) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,company.ilike.%${query}%,project_type.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Client[]
  },

  // Get leads (calon klien dari contact form - type = general_inquiry)
  async getLeads() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .or("type.eq.general_inquiry,is_converted.eq.true")
      .order('created_at', { ascending: false})
    
    if (error) throw error
    return data as Client[]
  },

  // Get orders (klien yang sudah tau mau pesan dari order form - type = project_order OR converted leads)
  async getOrders() {
    const { data, error } = await supabase
      .from("clients")
      .select("*, projects(id)")
      .or("type.eq.project_order,is_converted.eq.true")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Client[];
  },

  // Get Deal orders that DON'T have a project yet
  async getDealOrdersWithoutProject() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('status', 'Deal')
      .eq('is_converted', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Client[]
  },

  // Real-time subscription helper
  subscribeToClients(callback: (payload: any) => void) {
    return supabase
      .channel('clients-realtime')
      .on(
        'postgres_changes',
        { event: '*', table: 'clients', schema: 'public' },
        (payload) => callback(payload)
      )
      .subscribe()
  }
}
