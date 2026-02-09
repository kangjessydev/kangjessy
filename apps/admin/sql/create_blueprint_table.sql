-- BLUEPRINT DATABASE STRUCTURE
-- The Digital Business Roadmap Syllabus
-- This is a centralized repository of educational content.
-- No user-specific progress is tracked here. It is a read-only resource for clients.

-- 1. STAGES TABLE (The main phases/chapters, e.g., "The Visionary", "The Architect")
CREATE TABLE IF NOT EXISTS public.blueprint_stages (
    id TEXT PRIMARY KEY, -- Slug, e.g., 'visionary' to keep URLs clean
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    icon TEXT DEFAULT 'Layers', -- Lucide icon name
    sort_order INTEGER DEFAULT 0 -- Defines the sequential order of chapters
);

-- 2. STEPS TABLE (The lessons/sub-chapters within each stage)
CREATE TABLE IF NOT EXISTS public.blueprint_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    stage_id TEXT REFERENCES public.blueprint_stages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT, -- Rich text content or brief description
    action_label TEXT, -- Optional: "Download Worksheet", "Watch Video"
    action_url TEXT,   -- Optional: Link to resource
    is_required BOOLEAN DEFAULT TRUE, -- Just a visual indicator if it's mandatory
    sort_order INTEGER DEFAULT 0,
    
    -- Metadata flexibility (e.g. video_url, duration, tags)
    metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS POLICIES (Security)
-- Enable RLS
ALTER TABLE public.blueprint_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blueprint_steps ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users (Admin) can manage content
CREATE POLICY "Admin can manage stages" ON public.blueprint_stages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage steps" ON public.blueprint_steps FOR ALL USING (auth.role() = 'authenticated');

-- Policy: Public access (Read Only)
-- Anyone can read the syllabus structure
CREATE POLICY "Public can view stages" ON public.blueprint_stages FOR SELECT USING (true);
CREATE POLICY "Public can view steps" ON public.blueprint_steps FOR SELECT USING (true);

-- SEED INITIAL DATA (Optional - uncomment if needed)
/*
INSERT INTO public.blueprint_stages (id, name, subtitle, icon, sort_order) VALUES
('visionary', 'The Visionary', 'Research & Strategy Phase', 'Telescope', 1),
('architect', 'The Architect', 'Structure & Design Phase', 'Ruler', 2);
*/
