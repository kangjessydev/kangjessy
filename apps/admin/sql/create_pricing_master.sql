-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the PRICING MASTER table
CREATE TABLE IF NOT EXISTS public.pricing_master (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL, -- "modern-dark", "minimalist-luxury"
    category TEXT NOT NULL, -- 'style_vibe', 'project_deadline', 'additional_feature', 'service_type', 'project_type'
    name TEXT NOT NULL, -- Display Name
    description TEXT, -- Rich description
    image_url TEXT, -- For styles/vibes thumbnails
    icon TEXT, -- Lucide Icon name (for features/deadlines)
    base_price NUMERIC DEFAULT 0, -- Base price addition (can be 0 for styles)
    multiplier NUMERIC DEFAULT 1.0, -- Multiplier (e.g. 1.5x for Express)
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb, -- Flexible metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure unique slug per category
    UNIQUE(category, slug)
);

-- Trigger for update timestamp
DROP TRIGGER IF EXISTS update_pricing_master_updated_at ON public.pricing_master;
CREATE TRIGGER update_pricing_master_updated_at
BEFORE UPDATE ON public.pricing_master
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.pricing_master ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public Read Pricing" ON public.pricing_master;
CREATE POLICY "Public Read Pricing" ON public.pricing_master FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Manage Pricing" ON public.pricing_master;
CREATE POLICY "Admin Manage Pricing" ON public.pricing_master FOR ALL USING (auth.role() = 'authenticated');
