-- Create Client Interactions table for manual CRM logs
CREATE TABLE IF NOT EXISTS public.client_interactions (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'note', -- 'whatsapp', 'call', 'meeting', 'note'
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_client_interactions_client_id ON public.client_interactions(client_id);

-- Enable RLS
ALTER TABLE public.client_interactions ENABLE ROW LEVEL SECURITY;

-- Create policy
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.client_interactions;
CREATE POLICY "Allow all for authenticated users" ON public.client_interactions
    FOR ALL USING (auth.role() = 'authenticated');
