import { supabase } from '@kangjessy/database';

export interface PricingItem {
    id: string;
    slug: string;
    category: 'style_vibe' | 'project_deadline' | 'additional_feature' | 'service_type' | 'project_type' | string;
    name: string;
    description: string | null;
    image_url: string | null;
    icon: string | null;
    base_price: number;
    multiplier: number;
    is_active: boolean;
    sort_order: number;
    metadata: Record<string, any>;
    created_at?: string;
    updated_at?: string;
}

export const pricingService = {
    // Generic fetch by category
    async getByCategory(category: PricingItem['category']) {
        const { data, error } = await supabase
            .from('pricing_master')
            .select('*')
            .eq('category', category)
            .order('sort_order', { ascending: true });
        
        if (error) throw error;
        return data as PricingItem[];
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from('pricing_master')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data as PricingItem;
    },

    // Upsert (Create/Update based on ID)
    async upsertItem(item: Partial<PricingItem>) {
        const { data, error } = await supabase
            .from('pricing_master')
            .upsert({
                ...item,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();
        
        if (error) throw error;
        return data as PricingItem;
    },

    // Delete
    async deleteItem(id: string) {
        const { error } = await supabase
            .from('pricing_master')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    // Update order
    async updateItemOrder(items: { id: string, sort_order: number }[]) {
        const promises = items.map(item => 
            supabase
                .from('pricing_master')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id)
        );
        
        const results = await Promise.all(promises);
        const error = results.find(r => r.error);
        if (error) throw error.error;
    }
};
