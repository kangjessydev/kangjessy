-- RUN THIS IN YOUR SUPABASE SQL EDITOR TO FIX DELETE & PERMISSIONS
-- This script ensures all tables have proper DELETE policies

-- 1. Enable RLS for all tables (if not already)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 2. Add DELETE policies for all tables
-- Note: Replace 'true' with 'auth.role() = ''authenticated''' for more security if the dashboard uses Supabase Auth.
-- But for local development/internal tools, 'true' will allow all.

DROP POLICY IF EXISTS "Allow All Deletes" ON clients;
CREATE POLICY "Allow All Deletes" ON clients FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow All Deletes" ON projects;
CREATE POLICY "Allow All Deletes" ON projects FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow All Deletes" ON tasks;
CREATE POLICY "Allow All Deletes" ON tasks FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow All Deletes" ON transactions;
CREATE POLICY "Allow All Deletes" ON transactions FOR DELETE USING (true);

-- 3. Also ensure other permissions are active if you haven't yet
DROP POLICY IF EXISTS "Allow All Actions" ON clients;
CREATE POLICY "Allow All Actions" ON clients FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow All Actions" ON projects;
CREATE POLICY "Allow All Actions" ON projects FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow All Actions" ON tasks;
CREATE POLICY "Allow All Actions" ON tasks FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow All Actions" ON transactions;
CREATE POLICY "Allow All Actions" ON transactions FOR ALL USING (true);

-- 4. FIX FOREIGN KEY CASCADE (Optional but Recommended)
-- This ensures that when you delete a Project, its Tasks are deleted automatically.
ALTER TABLE tasks 
DROP CONSTRAINT IF EXISTS tasks_project_id_fkey,
ADD CONSTRAINT tasks_project_id_fkey 
    FOREIGN KEY (project_id) 
    REFERENCES projects(id) 
    ON DELETE CASCADE;
