
-- Create features table
create table if not exists public.features (
  id text primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  description text,
  relevant_to text[] not null default '{}',
  icon text,
  delivery_time text,
  service_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.features enable row level security;

-- Policies
create policy "Allow public read access" on public.features for select using (true);
create policy "Allow authenticated insert" on public.features for insert with check (auth.role() = 'authenticated');
create policy "Allow authenticated update" on public.features for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete" on public.features for delete using (auth.role() = 'authenticated');
