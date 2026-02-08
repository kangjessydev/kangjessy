import { supabase } from '@kangjessy/database';
import type { Coupon } from '@kangjessy/config';
export type { Coupon };

const mapCoupon = (dbCoupon: any): Coupon => ({
  id: dbCoupon.id,
  code: dbCoupon.code,
  label: dbCoupon.label,
  desc: dbCoupon.desc,
  type: dbCoupon.type,
  value: dbCoupon.value,
  isActive: dbCoupon.is_active,
  expiryDate: dbCoupon.expiry_date,
  minOrder: dbCoupon.min_order,
  maxDiscount: dbCoupon.max_discount,
  isGlobal: dbCoupon.is_global,
  allowedProjectIds: dbCoupon.allowed_project_ids,
  allowedFeatureIds: dbCoupon.allowed_feature_ids,
  allowedTimelineIds: dbCoupon.allowed_timeline_ids,
  terms: dbCoupon.terms,
});

export const couponService = {
  async validateCoupon(code: string) {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .maybeSingle()
    
    if (error) throw error
    return data ? mapCoupon(data) : null
  },

  async getAllActive() {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map(mapCoupon)
  }
}
