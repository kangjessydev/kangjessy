import { supabase } from '@kangjessy/database'

export interface Client {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  status: string // 'New' | 'Pending' | 'Follow Up' | 'Deal' | 'Cancel' etc.
  type?: 'project_order' | 'general_inquiry'
  project_type?: string
  project_name?: string
  budget?: number
  source?: string
  brief?: string
  notes?: string
  ref_link?: string
  visual_style?: string
  dream_domain?: string
  features?: string[] | any
  voucher?: string
  created_at?: string
}

export const clientService = {
  // Tambah Leads (biasanya dari Contact Form)
  async addLead(clientData: Partial<Client>) {
    // 1. Cek apakah klien dengan email ini sudah ada
    if (clientData.email && clientData.email !== '-') {
      try {
        const { data: existingClient } = await supabase
          .from('clients')
          .select('*')
          .eq('email', clientData.email)
          .maybeSingle();
        
        if (existingClient) {
          console.log('Client already exists, using existing ID:', existingClient.id);
          return existingClient;
        }
      } catch (e) {
        console.warn('Error checking existing client, proceeding with creation...');
      }
    }

    const payload: any = {
      name: clientData.name || 'Unknown',
      email: clientData.email || (clientData.phone ? `wa-${clientData.phone.replace(/[^0-9]/g, '')}@client.kangjessy.com` : `guest-${Date.now()}@client.kangjessy.com`),
      phone: clientData.phone || '-',
      company: clientData.company || '-',
      status: clientData.status || 'New',
      notes: clientData.notes || '-',
      type: clientData.type || 'project_order',
      brief: clientData.brief || '-',
      project_type: clientData.project_type || '-',
      project_name: clientData.project_name || '-',
      budget: clientData.budget || 0,
      source: clientData.source || 'web_contact',
      ref_link: clientData.ref_link || '-',
      visual_style: clientData.visual_style || '-',
      dream_domain: clientData.dream_domain || '-',
      features: clientData.features || [],
      voucher: clientData.voucher || null
    }

    // Attempt insert
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([payload])
        .select()
      
      if (error) throw error
      return data ? data[0] : null
    } catch (e) {
      console.error('Failed to create lead:', e)
      throw e
    }
  },

  async getClientById(id: string) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data as Client
  }
}
