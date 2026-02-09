import { supabase } from '@kangjessy/database';

// Precise definition matching DB 'blueprint_steps' table
export interface RoadmapStep {
  id: string;
  stage_id: string;
  title: string;
  description?: string;
  action_label?: string;
  action_url?: string;
  is_required: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  // Extended fields for richer UI
  status?: string;
  priority?: string;
  type?: string;
  duration?: string;
  metadata?: Record<string, any>;
}

// Precise definition matching DB 'blueprint_stages' table
export interface RoadmapStage {
  id: string;
  name: string;
  subtitle?: string; // Added subtitle
  description?: string;
  icon?: string;
  sort_order: number;
  created_at?: string;
  // Steps come from the join query
  steps?: RoadmapStep[];
}

export const blueprintService = {
    // Stages
    async getAllStages() {
        // We select * from stages, and join steps (ordered by sort_order if possible in post-process)
        const { data, error } = await supabase
            .from('blueprint_stages')
            .select('*, steps:blueprint_steps(*)')
            .order('sort_order', { ascending: true })
        
        if (error) throw error
        
        // Sort individual steps by sort_order locally because Supabase join sorting is tricky
        return data.map(stage => ({
            ...stage,
            steps: (stage.steps || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        })) as RoadmapStage[]
    },

    async upsertStage(stage: Partial<RoadmapStage>) {
        // Destructure safely to avoid sending 'steps' array to the stages table (which would error)
        const { steps, ...sanitizedStage } = stage
        
        const { data, error } = await supabase
            .from('blueprint_stages')
            .upsert(sanitizedStage)
            .select()
            .single()
        
        if (error) throw error
        return data as RoadmapStage
    },

    async deleteStage(id: string) {
        const { error } = await supabase
            .from('blueprint_stages')
            .delete()
            .eq('id', id)
        
        if (error) throw error
    },

    // Steps
    async upsertStep(step: Partial<RoadmapStep>) {
        // Ensure we don't send unknown fields if step object comes from a loose source
        const payload = {
            ...step,
            updated_at: new Date().toISOString()
        }
        
        const { data, error } = await supabase
            .from('blueprint_steps')
            .upsert(payload)
            .select()
            .single()
        
        if (error) throw error
        return data as RoadmapStep
    },

    async deleteStep(id: string) {
        const { error } = await supabase
            .from('blueprint_steps')
            .delete()
            .eq('id', id)
        
        if (error) throw error
    },

    async updateStepOrder(steps: Partial<RoadmapStep>[]) {
        const updates = steps.map(s => ({
            id: s.id,
            sort_order: s.sort_order, // Only updating sort_order for efficiency
            updated_at: new Date().toISOString()
        }))
        
        const { error } = await supabase
            .from('blueprint_steps')
            .upsert(updates)
        
        if (error) throw error
    },

    async updateStageOrder(stages: Partial<RoadmapStage>[]) {
        // Extract only necessary fields for sorting updates
        const updates = stages.map(s => ({
            id: s.id,
            sort_order: s.sort_order,
            name: s.name // Name is required for upsert if it's not a patch
        })).map(s => {
           // Remove 'steps' property to be safe
           const { steps, ...clean } = s as any
           return clean
        })

        const { error } = await supabase
            .from('blueprint_stages')
            .upsert(updates)
        
        if (error) throw error
    }
}
