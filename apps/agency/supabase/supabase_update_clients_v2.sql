-- Add missing columns to clients table
DO $$
BEGIN
    -- Add status column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'status') THEN
        ALTER TABLE clients ADD COLUMN status TEXT DEFAULT 'Pending';
    END IF;

    -- Add project_type column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'project_type') THEN
        ALTER TABLE clients ADD COLUMN project_type TEXT;
    END IF;

    -- Add voucher column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'voucher') THEN
        ALTER TABLE clients ADD COLUMN voucher TEXT;
    END IF;

    -- Add dream_domain column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'dream_domain') THEN
        ALTER TABLE clients ADD COLUMN dream_domain TEXT;
    END IF;

    -- Add ref_link column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'ref_link') THEN
        ALTER TABLE clients ADD COLUMN ref_link TEXT;
    END IF;

    -- Add source column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'source') THEN
        ALTER TABLE clients ADD COLUMN source TEXT;
    END IF;

    -- Add visual_style column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'visual_style') THEN
        ALTER TABLE clients ADD COLUMN visual_style TEXT;
    END IF;

    -- Add brief column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'brief') THEN
        ALTER TABLE clients ADD COLUMN brief TEXT;
    END IF;

    -- Add notes column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'notes') THEN
        ALTER TABLE clients ADD COLUMN notes TEXT;
    END IF;

    -- Add project_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'project_name') THEN
        ALTER TABLE clients ADD COLUMN project_name TEXT;
    END IF;

    -- Add budget column (using BIGINT for currency)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'budget') THEN
        ALTER TABLE clients ADD COLUMN budget BIGINT DEFAULT 0;
    END IF;

    -- Add features column (if not exists)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'features') THEN
        ALTER TABLE clients ADD COLUMN features TEXT;
    END IF;
END $$;
