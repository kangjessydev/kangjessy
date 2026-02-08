-- Clear existing data if needed
-- TRUNCATE blueprint_stages, blueprint_steps CASCADE;

-- Insert Stages
INSERT INTO blueprint_stages (id, name, subtitle, description, icon, sort_order) VALUES
('visionary', 'The Visionary', 'Tahap Memulai & Identitas', 'Sangat cocok untuk Anda yang baru memiliki ide bisnis atau ingin melegalkan identitas brand agar terlihat profesional sejak hari pertama.', 'Palette', 0),
('scaler', 'The Scaler', 'Membangun Kredibilitas', 'Bisnis Anda sudah jalan, namun ingin terlihat lebih "established" dan bisa dipercaya oleh klien-klien besar atau korporasi.', 'Monitor', 1),
('optimizer', 'The Optimizer', 'Optimasi & Performa', 'Anda sudah punya website, tapi merasa belum maksimal? Mari bedah performanya dan tingkatkan kemampuan mendatangkan lead.', 'Search', 2),
('automator', 'The Automator', 'Sistem & Automasi', 'Operasional bisnis mulai kewalahan? Saatnya memangkas tugas repetitif dan membiarkan robot bekerja untuk Anda.', 'Zap', 3)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order;

-- Insert Steps for Visionary
INSERT INTO blueprint_steps (id, stage_id, type, title, description, icon, duration, importance, rich_content, content, link, action_label, sort_order) VALUES
('v-1', 'visionary', 'article', 'Fondasi Brand identity', 'Kenapa konsistensi visual menentukan kepercayaan pelanggan pertama Anda.', 'Target', '1-2 Hari', 'critical', ARRAY['Psikologi warna dalam branding', 'Tipografi yang membangun trust', 'Konsistensi lintas platform digital'], 'Identitas brand bukan hanya soal logo. Ini adalah tentang bagaimana pelanggan merasakan bisnis Anda. Memilih warna dan font yang tepat bisa meningkatkan persepsi nilai bisnis Anda hingga 80%.', '/blog/fondasi-brand-identity-digital', 'Baca Materi Strategi', 0),
('v-2', 'visionary', 'tool', 'Tentukan Aura Brand', 'Gunakan AI Palette Generator untuk menemukan kombinasi warna yang pas.', 'Palette', 'Instan', 'recommended', ARRAY['Generate 5 mood color berbeda', 'Cek kontras standar WCAG', 'Export ke Figma/CSS'], null, 'https://kangjessy-tools.vercel.app/palette-generator', 'Coba Palette Generator', 1),
('v-3', 'visionary', 'service', 'Starter Landing Page', 'Validasi ide bisnis Anda dengan satu halaman web yang fokus pada konversi.', 'Layout', '3-4 Hari', 'critical', ARRAY['High Fidelity Design', 'Responsive Mobile View', 'Contact Form Integration'], null, '/order?type=landing-page', 'Pesan Landing Page', 2)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    duration = EXCLUDED.duration,
    importance = EXCLUDED.importance,
    rich_content = EXCLUDED.rich_content,
    content = EXCLUDED.content,
    link = EXCLUDED.link,
    action_label = EXCLUDED.action_label,
    sort_order = EXCLUDED.sort_order;

-- Insert Steps for Scaler
INSERT INTO blueprint_steps (id, stage_id, type, title, description, icon, duration, importance, rich_content, content, link, action_label, sort_order) VALUES
('s-1', 'scaler', 'article', 'Website vs Media Sosial', 'Kenapa memiliki "rumah digital" resmi jauh lebih aman dibanding hanya numpang di platform pihak ketiga.', 'Globe', '1 Hari', 'critical', ARRAY['Ownership atas data pelanggan', 'Kontrol penuh atas User Experience', 'Membangun ranking SEO jangka panjang'], 'Media sosial adalah hak milik platform lain. Website adalah aset properti Anda sendiri. Di sini, Anda memegang kontrol penuh atas data dan bagaimana Anda ingin dipandang oleh dunia.', '/blog/website-vs-media-sosial', 'Baca Selengkapnya', 0),
('s-2', 'scaler', 'tool', 'Copywriting Profesional', 'Tulis profil perusahaan atau sales copy yang menjual dengan bantuan AI.', 'Type', 'Instan', 'recommended', ARRAY['Professional tone converter', 'Focus on unique selling point', 'Grammar & Flow improvement'], null, 'https://kangjessy-tools.vercel.app/professional-rewriter', 'Coba Smart Rewriter', 1),
('s-3', 'scaler', 'service', 'Premium Company Profile', 'Tampil elegan dan kredibel dengan arsitektur website modern multipage.', 'Rocket', '7-10 Hari', 'critical', ARRAY['Up to 7 Core Pages', 'Custom CMS Implementation', 'Professional SEO Foundation'], null, '/order?type=company-profile', 'Bangun Company Profile', 2),
('s-4', 'scaler', 'checklist', 'Digital Trust Audit', 'Pastikan semua aset digital Anda memancarkan profesionalisme.', 'Target', '1 Hari', 'recommended', ARRAY['Review SSL & Security Header', 'Audit Google Business Profile', 'Analisis testimoni & social proof'], null, null, 'Lihat Checklist Audit', 3)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    duration = EXCLUDED.duration,
    importance = EXCLUDED.importance,
    rich_content = EXCLUDED.rich_content,
    content = EXCLUDED.content,
    link = EXCLUDED.link,
    action_label = EXCLUDED.action_label,
    sort_order = EXCLUDED.sort_order;
