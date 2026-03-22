-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- TO SETUP FINANCE MANAGEMENT (PHASE 1)

-- 1. Create transactions table if it doesn't exist
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  type TEXT NOT NULL DEFAULT 'income', -- 'income' or 'expense'
  category TEXT,
  date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  product_id TEXT, -- Reference to product ID in code/sanity
  platform TEXT, -- e.g. Gumroad, Lynk, Direct
  is_recurring BOOLEAN DEFAULT false,
  recurring_interval TEXT, -- 'once', 'monthly', 'yearly'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add missing columns and indices
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'income',
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS product_id TEXT,
ADD COLUMN IF NOT EXISTS platform TEXT,
ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS recurring_interval TEXT;

CREATE INDEX IF NOT EXISTS idx_transactions_project_id ON transactions(project_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);

-- 3. Enable RLS (Recommended)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 4. Create basic policies (Adjust as needed for your project's auth setup)
-- This allows authenticated users (admins) to do everything
CREATE POLICY "Allow all actions for authenticated users" 
ON transactions FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
