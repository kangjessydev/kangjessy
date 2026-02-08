// Database Types - Matching Existing Supabase Schema

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: string
  notes?: string
  created_at: string
  type?: string
  project_type?: string
  budget?: number
  source?: 'web_order' | 'web_contact' | 'whatsapp' | 'instagram' | 'manual' | string
  brief?: string
  features?: string
  project_name?: string
  ref_link?: string
  dream_domain?: string
  visual_style?: string
  voucher?: string
  total_amount?: number
  paid_amount?: number
  payment_status?: 'unpaid' | 'down_payment' | 'paid' | 'overpaid'
  payment_notes?: string
  project_status?: string
  is_converted?: boolean
  selected_timeline?: string
  deadline?: string
  external_link?: string
  lead_id?: string | null
  projects?: any[]
}

export interface Profile {
  id: string
  client_id?: string
  full_name: string
  avatar_url?: string
  role: string
}

export interface Project {
  id: string
  client_id: string
  order_id?: string
  name: string
  description?: string
  status: 'planning' | 'in_progress' | 'done' | 'pending' | 'hold'
  progress?: number
  price?: number
  deadline?: string
  preview_url?: string
  created_at: string
  start_date?: string
  paid_amount?: number
  payment_status?: string
  figma_url?: string
  drive_url?: string
  github_url?: string
  client_portal_token?: string
  brief?: string
  visual_style?: string
  timeline_notes?: string
}

export interface Task {
  id: string
  project_id: string
  title: string
  description?: string
  status: string
  is_completed: boolean
  completed_at?: string
  priority?: string
  due_date?: string
  created_at: string
  phase?: string
  parent_id?: string
  icon?: string
  sort_order?: number
}

export interface Transaction {
  id: string
  project_id?: string
  category: 'services' | 'store' | 'subscription' | 'other'
  sub_category?: string // hosting, domain, ads, tools, etc.
  amount: number
  type: 'income' | 'expense'
  date: string
  description?: string
  created_at: string
  notes?: string
  client_id?: string
  is_recurring?: boolean
  recurring_interval?: string
  title?: string
  product_id?: string
  platform?: string
  source?: string // Manual, Web, Stripe, Midtrans
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content?: string
  excerpt?: string
  featured_image?: string
  featured_image_alt?: string
  // Can be string[] (IDs from getById) or {id, name}[] (objects from getAll)
  categories?: (string | { id: string; name: string })[]
  tags?: (string | { id: string; name: string })[]
  read_time?: number
  author?: string
  status: 'draft' | 'published' | 'scheduled' | 'local-draft'
  publish_schedule?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  social_title?: string
  social_description?: string
  social_image?: string
  social_image_ref?: string
  published_at?: string
  created_at: string
  updated_at: string
  is_local?: boolean
  featured_image_ref?: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
}

export interface PortfolioArea {
  id: string
  name: string
  slug: string
}

export interface Technology {
  id: string
  name: string
  slug: string
}

// Legacy - keeping for backward compatibility
export interface Order extends Client {}
export interface Lead extends Client {}

// UI Types
export type BadgeVariant = 'success' | 'warning' | 'danger' | 'gray'
export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

// Stats
export interface DashboardStats {
  totalClients: number
  totalRevenue: number
  activeProjects: number
  completedProjects: number
}

export interface MediaFolder {
  id: string
  name: string
  parentId: string | null
  createdAt: string
}

export interface MediaItem {
  id: string
  name: string
  alt?: string
  url: string
  size: number
  folderId: string | null
  createdAt: string
  assetId?: string
  type?: string
}
