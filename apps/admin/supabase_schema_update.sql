-- Add missing columns to proposals table
ALTER TABLE public.proposals
ADD COLUMN IF NOT EXISTS deliverables text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS terms text DEFAULT '',
ADD COLUMN IF NOT EXISTS origin_type text DEFAULT 'independent',
ADD COLUMN IF NOT EXISTS lead_id uuid REFERENCES public.clients(id);

-- Ensure updated_at trigger exists (best practice)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_proposals_updated_at ON public.proposals;

CREATE TRIGGER update_proposals_updated_at
    BEFORE UPDATE ON public.proposals
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
