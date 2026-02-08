-- Create Coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    "desc" TEXT,
    type TEXT NOT NULL CHECK (type IN ('percent', 'fixed')),
    value NUMERIC NOT NULL,
    is_active BOOLEAN DEFAULT true,
    expiry_date DATE NOT NULL,
    min_order NUMERIC DEFAULT 0,
    max_discount NUMERIC DEFAULT 0,
    is_global BOOLEAN DEFAULT false,
    allowed_project_ids TEXT[], 
    allowed_feature_ids TEXT[],
    allowed_timeline_ids TEXT[],
    terms TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to active coupons"
ON public.coupons FOR SELECT
TO anon
USING (is_active = true AND expiry_date >= CURRENT_DATE);

CREATE POLICY "Allow authenticated full access to coupons"
ON public.coupons FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
