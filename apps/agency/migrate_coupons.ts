import { createClient } from '@supabase/supabase-js'
import { COUPONS } from './src/data/config/order/coupons'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  console.log('Migrating coupons to Supabase...')
  
  for (const c of COUPONS) {
    const payload = {
      code: c.code,
      label: c.label,
      desc: c.desc,
      type: c.type,
      value: c.value,
      is_active: c.isActive,
      expiry_date: c.expiryDate,
      min_order: c.minOrder || 0,
      max_discount: c.maxDiscount || 0,
      is_global: c.isGlobal || false,
      allowed_project_ids: c.allowedProjectIds || [],
      allowed_feature_ids: c.allowedFeatureIds || [],
      allowed_timeline_ids: c.allowedTimelineIds || [],
      terms: c.terms || ''
    }
    
    const { error } = await supabase.from('coupons').upsert([payload], { onConflict: 'code' })
    if (error) {
      console.error(`Failed to migrate ${c.code}:`, error.message)
    } else {
      console.log(`Migrated ${c.code}`)
    }
  }
}

migrate()
