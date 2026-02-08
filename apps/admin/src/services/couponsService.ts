import { supabase } from '@kangjessy/database'

export interface Coupon {
  id?: string;
  code: string;
  label: string;
  desc: string;
  type: 'percent' | 'fixed';
  value: number;
  is_active: boolean;
  expiry_date: string;
  min_order?: number;
  max_discount?: number;
  is_global: boolean;
  allowed_project_ids?: string[];
  allowed_feature_ids?: string[];
  allowed_timeline_ids?: string[];
  terms?: string;
  created_at?: string;
}

export const couponsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Coupon[]
  },

  async create(coupon: Omit<Coupon, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('coupons')
      .insert([coupon])
      .select()
      .single()
    
    if (error) throw error
    return data as Coupon
  },

  async update(id: string, coupon: Partial<Coupon>) {
    const { data, error } = await supabase
      .from('coupons')
      .update(coupon)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Coupon
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
