-- Add payment_accounts column to proposals table
ALTER TABLE public.proposals
ADD COLUMN IF NOT EXISTS payment_accounts JSONB DEFAULT '[]';

-- Update the existing proposals if needed (optional, they will just have empty array)
