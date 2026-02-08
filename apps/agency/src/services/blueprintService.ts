import { supabase } from '@kangjessy/database';
import type { RoadmapStep, RoadmapStage } from '@kangjessy/config';

export const blueprintService = {
    async getAllStages() {
        try {
            const { data, error } = await supabase
                .from('blueprint_stages')
                .select('*, steps:blueprint_steps(*)')
                .order('sort_order', { ascending: true });
            
            if (error) throw error;
            
            // Sort individual steps by sort_order
            return data.map(stage => ({
                ...stage,
                steps: (stage.steps || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
            })) as RoadmapStage[];
        } catch (err) {
            console.error('Error fetching blueprint stages:', err);
            return [];
        }
    },

    async getStageById(id: string) {
        try {
            const { data, error } = await supabase
                .from('blueprint_stages')
                .select('*, steps:blueprint_steps(*)')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            
            if (data && data.steps) {
                data.steps.sort((a: any, b: any) => a.sort_order - b.sort_order);
            }
            
            return data as RoadmapStage;
        } catch (err) {
            console.error(`Error fetching stage by id (${id}):`, err);
            return null;
        }
    }
};
