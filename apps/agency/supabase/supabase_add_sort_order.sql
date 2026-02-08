-- ADD SORT_ORDER COLUMN TO TASKS TABLE
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- Optional: Add index for performance
CREATE INDEX IF NOT EXISTS idx_tasks_sort_order ON tasks(sort_order);
