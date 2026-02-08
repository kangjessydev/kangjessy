-- =============================================
-- PROPOSALS TABLE
-- Tabel terpisah untuk menyimpan proposal
-- Bisa dihubungkan dengan clients (leads)
-- =============================================

CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relasi ke Lead (opsional)
    lead_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    
    -- Info Klien (bisa di-copy dari lead atau manual input)
    client_name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    
    -- Info Proyek
    project_name TEXT NOT NULL,
    project_type TEXT,  -- The Foundation (Web), The Foundation (System), dll
    
    -- Narasi Strategis
    background TEXT,    -- Latar belakang
    problem TEXT,       -- Masalah yang dihadapi
    solution TEXT,      -- Solusi yang ditawarkan
    
    -- Pricing
    features TEXT[],           -- Array of feature IDs
    selected_timeline TEXT DEFAULT 'Standard',  -- Standard, Express, Urgent
    voucher_code TEXT,
    base_price NUMERIC DEFAULT 0,
    feature_total NUMERIC DEFAULT 0,
    discount_amount NUMERIC DEFAULT 0,
    final_total NUMERIC DEFAULT 0,
    
    -- Status & Origin
    status TEXT DEFAULT 'draft',  -- draft, sent, viewed, negotiation, approved, rejected
    origin_type TEXT DEFAULT 'independent',  -- independent, from_lead
    
    -- Meta
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    sent_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    
    -- Tracking
    version INTEGER DEFAULT 1,
    notes TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_proposals_lead_id ON proposals(lead_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_created ON proposals(created_at DESC);

-- RLS Policy (pastikan Supabase settings-nya sesuai)
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to do everything
CREATE POLICY "Enable all operations for authenticated users" ON proposals
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_proposals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER proposals_updated_at_trigger
    BEFORE UPDATE ON proposals
    FOR EACH ROW
    EXECUTE FUNCTION update_proposals_updated_at();

-- =============================================
-- CONTOH INSERT
-- =============================================
-- INSERT INTO proposals (client_name, project_name, project_type, status)
-- VALUES ('Budi Santoso', 'Revamp E-Commerce TokoBaju', 'The Foundation (Web)', 'draft');
