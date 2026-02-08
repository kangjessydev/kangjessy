import { supabase } from '@kangjessy/database'

export interface Project {
  id: string
  client_id: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'review' | 'done'
  progress: number
  price: number
  paid_amount: number
  payment_status: 'pending' | 'partial' | 'paid'
  start_date: string
  deadline: string
  preview_url?: string
  figma_url?: string
  drive_url?: string
  github_url?: string
}

export const projectService = {
  async getProjectTasks(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true })
    if (error) throw error
    return data
  },

  // Ambil proyek spesifik untuk Client Portal
  async getClientProjects(clientId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*, tasks(*)')
      .eq('client_id', clientId)
    if (error) throw error
    return data
  },

  // Ambil detail satu project berdasarkan ID (Public Portal)
  async getProjectById(projectId: string) {
    if (!projectId) return null;

    // Cek apakah input berupa UUID valid
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId);
    
    let query = supabase
        .from('projects')
        .select('*, clients(*), tasks(*)')
    
    if (isUUID) {
        query = query.eq('id', projectId)
    } else {
        // Fallback: search by name partial or assume it's a short ID if we ever add one
        query = query.ilike('name', `%${projectId}%`)
    }

    const { data, error } = await query
        .order('sort_order', { foreignTable: 'tasks', ascending: true })
        .maybeSingle()
    
    if (error) throw error
    return data
  },

  // Buat proyek baru (saat order masuk)
  async createProject(projectData: any) {
    try {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const payload = {
        name: projectData.name || 'Project Baru',
        client_id: projectData.client_id,
        description: projectData.description || '-',
        status: projectData.status || 'pending',
        progress: projectData.progress || 0,
        price: projectData.price || 0,
        paid_amount: 0,
        payment_status: 'pending',
        start_date: projectData.start_date || today.toISOString().split('T')[0],
        deadline: projectData.deadline || nextWeek.toISOString().split('T')[0],
        preview_url: projectData.preview_url || '-'
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([payload])
        .select('*, clients(*)')
      
      if (error) throw error
      return data[0]
    } catch (e) {
      console.error('Gagal membuat project di Supabase:', e)
      throw e
    }
  }
}
