import { supabase } from '@kangjessy/database'

export interface Proposal {
  id: string
  lead_id?: string | null
  client_name: string
  company?: string
  email?: string
  phone?: string
  project_name: string
  project_type?: string
  background?: string
  problem?: string
  solution?: string
  features?: string[]
  deliverables?: string[]
  terms?: string
  terms_payment?: string
  terms_copyright?: string
  terms_revision?: string
  selected_timeline?: string
  voucher_code?: string
  base_price?: number
  feature_total?: number
  discount_amount?: number
  final_total?: number
  status: 'draft' | 'sent' | 'viewed' | 'negotiation' | 'approved' | 'rejected'
  origin_type: 'independent' | 'from_lead'
  created_at?: string
  updated_at?: string
  sent_at?: string
  approved_at?: string
  version?: number
  notes?: string
}

export type ProposalInput = Omit<Proposal, 'id' | 'created_at' | 'updated_at'>

const TABLE = 'proposals'

export const proposalService = {
  /**
   * Get all proposals with optional filters
   */
  async getAll(filters?: { status?: string; search?: string }): Promise<Proposal[]> {
    let query = supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    if (filters?.search) {
      query = query.or(`client_name.ilike.%${filters.search}%,project_name.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching proposals:', error)
      throw error
    }

    return (data || []) as Proposal[]
  },

  /**
   * Get single proposal by ID
   */
  async getById(id: string): Promise<Proposal | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching proposal:', error)
      return null
    }

    return data as Proposal
  },

  /**
   * Get proposals by lead ID
   */
  async getByLeadId(leadId: string): Promise<Proposal[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching proposals by lead:', error)
      throw error
    }

    return (data || []) as Proposal[]
  },

  /**
   * Create new proposal
   */
  async create(proposal: ProposalInput): Promise<Proposal> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(proposal)
      .select()
      .single()

    if (error) {
      console.error('Error creating proposal:', error)
      throw error
    }

    return data as Proposal
  },

  /**
   * Update existing proposal
   */
  async update(id: string, updates: Partial<ProposalInput>): Promise<Proposal> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating proposal:', error)
      throw error
    }

    return data as Proposal
  },

  /**
   * Delete proposal
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting proposal:', error)
      throw error
    }
  },

  /**
   * Create proposal from a lead
   */
  async createFromLead(leadId: string, proposalData: Partial<ProposalInput>): Promise<Proposal> {
    // Get lead data first
    const { data: lead, error: leadError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', leadId)
      .single()

    if (leadError || !lead) {
      throw new Error('Lead not found')
    }

    // Create proposal with lead data merged
    const proposal: ProposalInput = {
      lead_id: leadId,
      client_name: lead.name || proposalData.client_name || '',
      company: lead.company || proposalData.company,
      email: lead.email || proposalData.email,
      phone: lead.phone || proposalData.phone,
      project_name: proposalData.project_name || lead.project_name || `Proposal untuk ${lead.name}`,
      project_type: proposalData.project_type || lead.project_type,
      background: proposalData.background || lead.brief,
      problem: proposalData.problem,
      solution: proposalData.solution,
      features: proposalData.features,
      deliverables: proposalData.deliverables,
      terms: proposalData.terms,
      terms_payment: proposalData.terms_payment,
      terms_copyright: proposalData.terms_copyright,
      terms_revision: proposalData.terms_revision,
      selected_timeline: proposalData.selected_timeline || 'Standard',
      voucher_code: proposalData.voucher_code,
      base_price: proposalData.base_price || 0,
      feature_total: proposalData.feature_total || 0,
      discount_amount: proposalData.discount_amount || 0,
      final_total: proposalData.final_total || 0,
      status: 'draft',
      origin_type: 'from_lead',
      notes: proposalData.notes
    }

    return this.create(proposal)
  },

  /**
   * Send proposal (update status)
   */
  async send(id: string): Promise<Proposal> {
    return this.update(id, {
      status: 'sent',
      // sent_at will be set by trigger or we can set manually
    } as any) // TypeScript workaround for sent_at
  },

  /**
   * Approve proposal
   */
  async approve(id: string): Promise<Proposal> {
    return this.update(id, {
      status: 'approved',
    } as any)
  },

  /**
   * Reject proposal
   */
  async reject(id: string, reason?: string): Promise<Proposal> {
    return this.update(id, {
      status: 'rejected',
      notes: reason
    } as any)
  },

  /**
   * Get statistics
   */
  async getStats(): Promise<{
    total: number
    draft: number
    sent: number
    approved: number
    rejected: number
  }> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('status')

    if (error) {
      console.error('Error fetching stats:', error)
      return { total: 0, draft: 0, sent: 0, approved: 0, rejected: 0 }
    }

    const proposals = data || []
    return {
      total: proposals.length,
      draft: proposals.filter(p => p.status === 'draft').length,
      sent: proposals.filter(p => p.status === 'sent' || p.status === 'viewed').length,
      approved: proposals.filter(p => p.status === 'approved').length,
      rejected: proposals.filter(p => p.status === 'rejected').length
    }
  }
}

export default proposalService
