-- SAMPLE SEED DATA FOR THE BLUEPRINT
-- New Data Structure: Visionary -> Architect -> Builder -> Launcher -> Growth Hacker

-- 1. Insert Stages
INSERT INTO public.blueprint_stages (id, name, subtitle, description, icon, sort_order) VALUES
('stage-1-visionary', 'The Visionary', 'Research & DNA Phase', 'Tahap paling fundamendal: Menemukan "Jiwa" dari bisnis kamu. Tanpa ini, marketing cuma bakar duit.', 'Telescope', 1),
('stage-2-architect', 'The Architect', 'Design System & UI/UX', 'Menerjemahkan strategi abstrak menjadi visual yang memikat dan sistem yang kokoh.', 'Ruler', 2),
('stage-3-builder', 'The Builder', 'Development & Integrations', 'Saatnya ngoding! Membangun infrastruktur digital yang cepat, aman, dan scalable.', 'Hammer', 3),
('stage-4-launcher', 'The Launcher', 'Deployment & Go-Live', 'Proses peluncuran nir-stres. Memastikan semua checklist keamanan dan performa hijau semua.', 'Rocket', 4),
('stage-5-growth', 'The Growth Hacker', 'Data-Driven Optimization', 'Website sudah live bukan akhir. Ini awal dari perang data: Analytics, SEO, dan Konversi.', 'TrendingUp', 5)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Steps for "The Visionary"
INSERT INTO public.blueprint_steps (stage_id, title, description, action_label, action_url, is_required, sort_order) VALUES
('stage-1-visionary', 'Brand Archetype Discovery', 'Menentukan kepribadian brand kamu (Hero, Sage, Rebel, dll) agar komunikasi lebih manusiawi.', 'Download Worksheet', '#', true, 1),
('stage-1-visionary', 'Competitor Reconnaissance', 'Membedah strategi 3 kompetitor teratas: Apa senjata mereka dan di mana celah kelemahannya?', 'Lihat Template Audit', '#', true, 2),
('stage-1-visionary', 'User Persona Mapping', 'Siapa sebenarnya yang mau beli produkmu? Jangan bilang "Semua Orang". Kita butuh target spesifik.', 'Mapping Tool', '#', true, 3);

-- 3. Insert Steps for "The Architect"
INSERT INTO public.blueprint_steps (stage_id, title, description, action_label, action_url, is_required, sort_order) VALUES
('stage-2-architect', 'Wireframing & User Flow', 'Sketsa kasar perjalanan user (Customer Journey) dari mendarat sampai checkout.', 'Lihat Contoh', '#', true, 1),
('stage-2-architect', 'High-Fidelity Mockups', 'Desain visual final yang sudah kinclong, pixel-perfect sebelum disentuh programmer.', 'Figma Preview', '#', false, 2),
('stage-2-architect', 'Design System Setup', 'Membuat kamus visual: Warna, Typography, Spacing, agar desain konsisten selamanya.', NULL, NULL, true, 3);

-- 4. Insert Steps for "The Builder"
INSERT INTO public.blueprint_steps (stage_id, title, description, action_label, action_url, is_required, sort_order) VALUES
('stage-3-builder', 'Database Architecture', 'Merancang skema database Supabase yang efisien dan relasional.', NULL, NULL, true, 1),
('stage-3-builder', 'Frontend Component Library', 'Coding komponen UI (Button, Card, Modal) yang reusable pakai Vue 3 & Tailwind.', NULL, NULL, true, 2),
('stage-3-builder', 'API Integration & Logic', 'Menyambungkan "Otak" (Logic) dengan "Wajah" (UI) aplikasi.', NULL, NULL, true, 3);

-- 5. Insert Steps for "The Launcher"
INSERT INTO public.blueprint_steps (stage_id, title, description, action_label, action_url, is_required, sort_order) VALUES
('stage-4-launcher', 'SEO Technical Audit', 'Memastikan Google bot bisa membaca situs kita dengan lahap. Sitemap, Robots.txt, Meta tags.', 'Checklist SEO', '#', true, 1),
('stage-4-launcher', 'Performance Stress Test', 'Uji kecepatan loading pakai Lighthouse. Target skor hijau (90+).', NULL, NULL, true, 2),
('stage-4-launcher', 'Domain & DNS Propagation', 'Menghubungkan domain cantikmu ke server Vercel/Netlify.', NULL, NULL, true, 3);

-- 6. Insert Steps for "The Growth Hacker"
INSERT INTO public.blueprint_steps (stage_id, title, description, action_label, action_url, is_required, sort_order) VALUES
('stage-5-growth', 'Google Analytics 4 Setup', 'Pasang CCTV digital buat intip perilaku pengunjung.', 'Setup Guide', '#', true, 1),
('stage-5-growth', 'A/B Testing Experiments', 'Tes judul A vs judul B. Mana yang lebih banyak diklik?', NULL, NULL, false, 2);
