import { supabase } from '@kangjessy/database';
import type { RoadmapStep, RoadmapStage } from '@kangjessy/config';

export const blueprintService = {
    // Stages
    async getAllStages() {
        const { data, error } = await supabase
            .from('blueprint_stages')
            .select('*, steps:blueprint_steps(*)')
            .order('sort_order', { ascending: true })
        
        if (error) throw error
        
        // Sort individual steps by sort_order
        return data.map(stage => ({
            ...stage,
            steps: stage.steps?.sort((a: any, b: any) => a.sort_order - b.sort_order)
        })) as RoadmapStage[]
    },

    async upsertStage(stage: Partial<RoadmapStage>) {
        const { steps, ...sanitizedStage } = stage as any
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
        const { data, error } = await supabase
            .from('blueprint_steps')
            .upsert(step)
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
        const { error } = await supabase
            .from('blueprint_steps')
            .upsert(steps)
        
        if (error) throw error
    },

    async updateStageOrder(stages: Partial<RoadmapStage>[]) {
        const sanitizedStages = stages.map(s => {
            const { steps, ...rest } = s as any
            return rest
        })
        const { error } = await supabase
            .from('blueprint_stages')
            .upsert(sanitizedStages)
        
        if (error) throw error
    }
}
