import { supabase } from '@kangjessy/database'

export type TransactionType = 'income' | 'expense' | 'debt' | 'receivable';
export type TransactionStatus = 'completed' | 'pending' | 'void' | 'repaid';

export interface FinanceTransaction {
  id: string;
  created_at?: string;
  transaction_date: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  category: string;
  project_id?: string;
  client_id?: string;
  status: TransactionStatus;
  payment_method?: string;
  metadata?: any;
  // Joins
  client?: { name: string };
  project?: { project_name: string };
}

export const transactionsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, client:clients(name), project:projects(name)')
      .order('transaction_date', { ascending: false })
    
    if (error) throw error
    return data as FinanceTransaction[]
  },

  async getSummary() {
    const { data, error } = await supabase
      .from('financial_summary')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  async create(transaction: Partial<FinanceTransaction>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()
    
    if (error) throw error
    return data as FinanceTransaction
  },

  async update(id: string, transaction: Partial<FinanceTransaction>) {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as FinanceTransaction
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
