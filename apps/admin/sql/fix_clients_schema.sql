-- Add missing columns to clients table for CRM expansion
-- Status: Required for Leads to Order/Project conversion

ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'general_inquiry';
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS is_converted BOOLEAN DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN public.clients.type IS 'Kategori klien (misal: general_inquiry, digital_store, custom_dev)';
COMMENT ON COLUMN public.clients.is_converted IS 'Menandakan apakah lead ini sudah dikonversi menjadi order aktif atau proyek';
