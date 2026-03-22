-- Create types for the blueprint
CREATE TYPE roadmap_step_type AS ENUM ('article', 'tool', 'service', 'checklist');
CREATE TYPE blueprint_importance AS ENUM ('critical', 'recommended', 'optional');

-- Create Blueprint Stages table
CREATE TABLE IF NOT EXISTS blueprint_stages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    icon TEXT, -- Lucide icon name as string
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Blueprint Steps table
CREATE TABLE IF NOT EXISTS blueprint_steps (
    id TEXT PRIMARY KEY,
    stage_id TEXT REFERENCES blueprint_stages(id) ON DELETE CASCADE,
    type roadmap_step_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Lucide icon name as string
    link TEXT,
    action_label TEXT,
    content TEXT,
    duration TEXT,
    importance blueprint_importance DEFAULT 'recommended',
    rich_content TEXT[], -- Array of strings for checklist/bullets
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blueprint_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprint_steps ENABLE ROW LEVEL SECURITY;

-- Create policies (Allow Public Read, Authenticated Write)
CREATE POLICY "Allow public read stages" ON blueprint_stages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage stages" ON blueprint_stages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read steps" ON blueprint_steps FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage steps" ON blueprint_steps FOR ALL USING (auth.role() = 'authenticated');
