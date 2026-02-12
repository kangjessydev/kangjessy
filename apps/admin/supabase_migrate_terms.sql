-- Add columns for split terms in proposals table
ALTER TABLE proposals 
ADD COLUMN IF NOT EXISTS terms_payment TEXT,
ADD COLUMN IF NOT EXISTS terms_copyright TEXT,
ADD COLUMN IF NOT EXISTS terms_revision TEXT;

-- Migration of existing data (Optional: Split existing terms if possible, but usually better to do manually)
-- For now, we skip auto-migration to avoid mess, as we are in development.
