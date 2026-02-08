import { supabase } from '@kangjessy/database'
import type { Project } from '../types'

export const projectsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*, client:clients(name, email, phone)')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*, client:clients(*)')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(project: Partial<Project>) {
    // Whitelist only fields that exist in Supabase schema
    const allowedFields = [
      'client_id', 'name', 'description', 'status', 'progress', 
      'price', 'deadline', 'preview_url', 'start_date', 
      'paid_amount', 'payment_status', 'figma_url', 'github_url', 
      'drive_url', 'brief', 'visual_style', 'timeline_notes'
    ];
    
    // Filter payload
    const projectData: any = {};
    for (const key of allowedFields) {
      if ((project as any)[key] !== undefined) {
        projectData[key] = (project as any)[key];
      }
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single()
    
    if (error) throw error

    // If we have a client_id, mark that client (order) as converted
    if (project.client_id) {
      await supabase
        .from('clients')
        .update({ is_converted: true })
        .eq('id', project.client_id)
    }

    return data
  },

  async update(id: string, project: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
