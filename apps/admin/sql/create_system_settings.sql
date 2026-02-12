-- Create system_settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all for authenticated users (admin)
-- Note: Assuming only admin can access the admin app and they are authenticated.
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.system_settings;
CREATE POLICY "Allow all for authenticated users" ON public.system_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_system_settings_updated_at ON public.system_settings;
CREATE TRIGGER update_system_settings_updated_at
    BEFORE UPDATE ON public.system_settings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
