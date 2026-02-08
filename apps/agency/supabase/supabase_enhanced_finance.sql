-- ENHANCED FINANCE MANAGEMENT SCHEMA
-- Adds support for project-specific and product-related transactions

-- 1. Ensure project_id and product_id columns exist in transactions
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS product_id TEXT; -- Reference to product ID in our code/sanity

-- 2. Add indices for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_project_id ON transactions(project_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);
