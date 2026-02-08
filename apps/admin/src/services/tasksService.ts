import { supabase } from '@kangjessy/database'
import type { Task } from '../types'

export const tasksService = {
  async getByProject(projectId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data as Task[]
  },

  async create(task: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  async bulkCreate(tasks: Partial<Task>[]) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(tasks)
      .select()
    
    if (error) throw error
    return data as Task[]
  },

  async update(id: string, task: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async toggleComplete(id: string, isCompleted: boolean) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ 
        status: isCompleted ? 'done' : 'in_progress'
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  }
}
