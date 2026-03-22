
-- Create enum types if they don't exist
DO $$ BEGIN
    CREATE TYPE roadmap_step_type AS ENUM ('article', 'tool', 'service', 'checklist');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE blueprint_importance AS ENUM ('critical', 'recommended', 'optional');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Truncate tables to ensure clean seed
TRUNCATE TABLE blueprint_steps CASCADE;
TRUNCATE TABLE blueprint_stages CASCADE;

-- Insert Blueprint Stages
INSERT INTO blueprint_stages (id, name, subtitle, description, icon, sort_order) VALUES
('visionary', 'The Visionary', 'Tahap Memulai & Identitas', 'Sangat cocok untuk Anda yang baru memiliki ide bisnis atau ingin melegalkan identitas brand agar terlihat profesional sejak hari pertama.', 'Palette', 1),
('scaler', 'The Scaler', 'Membangun Kredibilitas', 'Bisnis Anda sudah jalan, namun ingin terlihat lebih "established" dan bisa dipercaya oleh klien-klien besar atau korporasi.', 'Monitor', 2),
('optimizer', 'The Optimizer', 'Optimasi & Performa', 'Anda sudah punya website, tapi merasa belum maksimal? Mari bedah performanya dan tingkatkan kemampuan mendatangkan lead.', 'Search', 3),
('automator', 'The Automator', 'Sistem & Automasi', 'Operasional bisnis mulai kewalahan? Saatnya memangkas tugas repetitif dan membiarkan robot bekerja untuk Anda.', 'Zap', 4);

-- Insert Blueprint Steps
INSERT INTO blueprint_steps (id, stage_id, type, title, description, icon, link, action_label, content, duration, importance, rich_content, sort_order) VALUES
-- The Visionary Steps
('v-1', 'visionary', 'article', 'Fondasi Brand identity', 'Kenapa konsistensi visual menentukan kepercayaan pelanggan pertama Anda.', 'Target', '/blog/fondasi-brand-identity-digital', 'Baca Materi Strategi', 'Identitas brand bukan hanya soal logo. Ini adalah tentang bagaimana pelanggan merasakan bisnis Anda. Memilih warna dan font yang tepat bisa meningkatkan persepsi nilai bisnis Anda hingga 80%.', '1-2 Hari', 'critical', ARRAY['Psikologi warna dalam branding', 'Tipografi yang membangun trust', 'Konsistensi lintas platform digital'], 1),
('v-2', 'visionary', 'tool', 'Tentukan Aura Brand', 'Gunakan AI Palette Generator untuk menemukan kombinasi warna yang pas.', 'Palette', 'https://kangjessy-tools.vercel.app/palette-generator', 'Coba Palette Generator', NULL, 'Instan', 'recommended', ARRAY['Generate 5 mood color berbeda', 'Cek kontras standar WCAG', 'Export ke Figma/CSS'], 2),
('v-3', 'visionary', 'service', 'Starter Landing Page', 'Validasi ide bisnis Anda dengan satu halaman web yang fokus pada konversi.', 'Layout', '/order?type=landing-page', 'Pesan Landing Page', NULL, '3-4 Hari', 'critical', ARRAY['High Fidelity Design', 'Responsive Mobile View', 'Contact Form Integration'], 3),

-- The Scaler Steps
('s-1', 'scaler', 'article', 'Website vs Media Sosial', 'Kenapa memiliki "rumah digital" resmi jauh lebih aman dibanding hanya numpang di platform pihak ketiga.', 'Globe', '/blog/website-vs-media-sosial', 'Baca Selengkapnya', 'Media sosial adalah hak milik platform lain. Website adalah aset properti Anda sendiri. Di sini, Anda memegang kontrol penuh atas data dan bagaimana Anda ingin dipandang oleh dunia.', '1 Hari', 'critical', ARRAY['Ownership atas data pelanggan', 'Kontrol penuh atas User Experience', 'Membangun ranking SEO jangka panjang'], 1),
('s-2', 'scaler', 'tool', 'Copywriting Profesional', 'Tulis profil perusahaan atau sales copy yang menjual dengan bantuan AI.', 'Type', 'https://kangjessy-tools.vercel.app/professional-rewriter', 'Coba Smart Rewriter', NULL, 'Instan', 'recommended', ARRAY['Professional tone converter', 'Focus on unique selling point', 'Grammar & Flow improvement'], 2),
('s-3', 'scaler', 'service', 'Premium Company Profile', 'Tampil elegan dan kredibel dengan arsitektur website modern multipage.', 'Rocket', '/order?type=company-profile', 'Bangun Company Profile', NULL, '7-10 Hari', 'critical', ARRAY['Up to 7 Core Pages', 'Custom CMS Implementation', 'Professional SEO Foundation'], 3),
('s-4', 'scaler', 'checklist', 'Digital Trust Audit', 'Pastikan semua aset digital Anda memancarkan profesionalisme.', 'Target', NULL, 'Lihat Checklist Audit', NULL, '1 Hari', 'recommended', ARRAY['Review SSL & Security Header', 'Audit Google Business Profile', 'Analisis testimoni & social proof'], 4),

-- The Optimizer Steps
('o-1', 'optimizer', 'article', 'Data-Driven Growth', 'Memahami perilaku pengunjung website untuk menaikkan average order value.', 'Filter', '/blog/data-driven-growth-cro', 'Pelajari CRO', 'Banyak orang punya traffic tapi tidak ada sales. Optimasi konversi (CRO) adalah seni memindahkan orang dari "melihat" menjadi "membeli".', '2 Hari', 'recommended', ARRAY['Heatmap analysis sederhana', 'Conversion Rate Optimization (CRO)', 'A/B Testing fundamental'], 1),
('o-2', 'optimizer', 'tool', 'SEO Health Check', 'Audit kesehatan SEO website Anda secara instan untuk melihat apa yang perlu diperbaiki.', 'Search', 'https://kangjessy-tools.vercel.app/seo-scanner', 'Scan Website Sekarang', NULL, '5 Menit', 'critical', NULL, 2),
('o-3', 'optimizer', 'service', 'Sales Funnel System', 'Ubah website statis menjadi mesin penjualan otomatis yang didesain khusus untuk closing.', 'ShoppingCart', '/order?type=sales-funnel', 'Buat Sales Funnel', NULL, '10-14 Hari', 'critical', ARRAY['Automated Lead Capture', 'Direct Checkout Integration', 'Retargeting Pixel Setup'], 3),
('o-4', 'optimizer', 'article', 'Speed & UX Optimization', 'Website lambat membunuh konversi. Pelajari cara mencapai skor Core Web Vitals yang hijau.', 'Zap', NULL, 'Baca Panduan Speed', 'Setiap delay 1 detik pada loading website dapat menurunkan tingkat konversi hingga 7%. Kecepatan bukan sekadar kemewahan, tapi kebutuhan.', '1 Hari', 'recommended', ARRAY['Image lazy loading & compression', 'Critical CSS rendering', 'Font loading optimization'], 4),

-- The Automator Steps
('a-1', 'automator', 'article', 'The Power of Automation', 'Bagaimana memangkas 10 jam kerja per minggu dengan mengkoneksikan antar aplikasi.', 'Cpu', '/blog/power-of-automation-business', 'Baca Studi Kasus', 'Automasi bukan soal mengganti manusia, tapi soal membebaskan manusia dari tugas membosankan agar bisa fokus pada strategi besar.', '1 Hari', 'recommended', ARRAY['Integrasi Sheets ke WhatsApp', 'Auto-Invoicing system', 'CRM Sync Automation'], 1),
('a-2', 'automator', 'tool', 'Link WA Generator', 'Buat link WhatsApp profesional dengan pesan kustom untuk memudahkan CS Anda.', 'MessageCircle', 'https://kangjessy-tools.vercel.app/whatsapp-generator', 'Buat Link WA', NULL, 'Instan', 'optional', NULL, 2),
('a-3', 'automator', 'service', 'Workflow Automation', 'Integrasikan semua tools bisnis Anda (Sheets, WA, Email) ke dalam satu alur otomatis.', 'Workflow', '/order?type=workflow-auto', 'Integrasi Sekarang', NULL, '14+ Hari', 'critical', ARRAY['Audit Workflow Bisnis', 'Zapier/Make.com Implementation', 'Internal Admin Dashboard'], 3);
