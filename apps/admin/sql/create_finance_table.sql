-- FINANCE & LEDGER SYSTEM
-- This table handles all financial movements: Income, Expenses, Debts, and Receivables.

-- Drop existing if needed (be careful in production)
-- DROP TABLE IF EXISTS public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Core Transaction Data
    transaction_date DATE DEFAULT CURRENT_DATE,
    title TEXT NOT NULL,
    description TEXT,
    amount NUMERIC(15,2) NOT NULL DEFAULT 0,
    
    -- Transaction Categorization
    -- type: 'income' (masuk), 'expense' (keluar), 'debt' (hutang kita), 'receivable' (piutang klien)
    type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'debt', 'receivable')),
    
    -- category: 'project_payment', 'project_capital', 'operational', 'marketing', 'salary', 'software', 'tax', etc.
    category TEXT NOT NULL DEFAULT 'general',
    
    -- Relations
    project_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    
    -- Tracking
    status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'void', 'repaid')),
    payment_method TEXT DEFAULT 'bank_transfer', -- 'cash', 'bank_transfer', 'credit_card', 'e_wallet'
    
    -- Metadata (for flexibility)
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Dynamic Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Policies for authenticated users
CREATE POLICY "Enable all for authenticated users" ON public.transactions
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- View for Financial Summary (Aggregation)
CREATE OR REPLACE VIEW financial_summary AS
SELECT
    SUM(CASE WHEN type = 'income' AND status = 'completed' THEN amount ELSE 0 END) as total_income,
    SUM(CASE WHEN type = 'expense' AND status = 'completed' THEN amount ELSE 0 END) as total_expenses,
    SUM(CASE WHEN type = 'receivable' AND status = 'pending' THEN amount ELSE 0 END) as total_receivables,
    SUM(CASE WHEN type = 'debt' AND status = 'pending' THEN amount ELSE 0 END) as total_debts,
    (SUM(CASE WHEN type = 'income' AND status = 'completed' THEN amount ELSE 0 END) - 
     SUM(CASE WHEN type = 'expense' AND status = 'completed' THEN amount ELSE 0 END)) as net_cashflow
FROM public.transactions;
