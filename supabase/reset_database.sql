
-- DANGEROUS: THIS SCRIPT WILL RESET YOUR ENTIRE DATABASE
-- IT DROPS ALL TABLES AND RE-CREATES THEM CLEANLY

-- 1. DROP EVERYTHING
DROP TABLE IF EXISTS public.blueprint_steps CASCADE;
DROP TABLE IF EXISTS public.blueprint_stages CASCADE;
DROP TABLE IF EXISTS public.coupons CASCADE;
DROP TABLE IF EXISTS public.features CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.store_orders CASCADE; -- Drop if exists, won't recreate
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop Enums if they exist
DROP TYPE IF EXISTS public.roadmap_step_type CASCADE;
DROP TYPE IF EXISTS public.blueprint_importance CASCADE;

-- 2. RE-CREATE TABLES

-- A. PROFILES (Linked to Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- B. CLIENTS
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'Pending',
  project_type TEXT,
  project_name TEXT,
  budget BIGINT DEFAULT 0,
  features TEXT, -- JSON string or comma separated
  source TEXT,
  notes TEXT,
  visual_style TEXT,
  brief TEXT,
  dream_domain TEXT,
  ref_link TEXT,
  voucher TEXT,
  type TEXT DEFAULT 'general_inquiry',
  is_converted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow matched auth users" ON public.clients FOR ALL USING (true); -- Simplified for now, refine if needed

-- C. PROJECTS
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, in_progress, review, done
    progress INTEGER DEFAULT 0,
    price BIGINT DEFAULT 0,
    paid_amount BIGINT DEFAULT 0,
    payment_status TEXT DEFAULT 'pending', -- pending, partial, paid
    start_date DATE DEFAULT CURRENT_DATE,
    deadline DATE,
    preview_url TEXT,
    figma_url TEXT,
    drive_url TEXT,
    github_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for authenticated users" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable read access for everyone (portal)" ON public.projects FOR SELECT USING (true);

-- D. TASKS
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    parent_id UUID, -- For subtasks
    title TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, in_progress, done
    icon TEXT, -- Lucide icon name
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for authenticated users" ON public.tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable read access for everyone (portal)" ON public.tasks FOR SELECT USING (true);

-- E. TRANSACTIONS
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  type TEXT NOT NULL DEFAULT 'income', -- 'income' or 'expense'
  category TEXT,
  date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  product_id TEXT, 
  platform TEXT, 
  is_recurring BOOLEAN DEFAULT false,
  recurring_interval TEXT, 
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all actions for authenticated users" ON public.transactions FOR ALL TO authenticated USING (true);

-- F. COUPONS
CREATE TABLE public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    "desc" TEXT,
    type TEXT NOT NULL CHECK (type IN ('percent', 'fixed')),
    value NUMERIC NOT NULL,
    is_active BOOLEAN DEFAULT true,
    expiry_date DATE NOT NULL,
    min_order NUMERIC DEFAULT 0,
    max_discount NUMERIC DEFAULT 0,
    is_global BOOLEAN DEFAULT false,
    allowed_project_ids TEXT[], 
    allowed_feature_ids TEXT[],
    allowed_timeline_ids TEXT[],
    terms TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Admin all" ON public.coupons FOR ALL TO authenticated USING (true);

-- G. FEATURES
CREATE TABLE public.features (
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
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read features" ON public.features FOR SELECT USING (true);
CREATE POLICY "Admin write features" ON public.features FOR ALL TO authenticated USING (true);

-- H. BLUEPRINT (Roadmap)
CREATE TYPE roadmap_step_type AS ENUM ('article', 'tool', 'service', 'checklist');
CREATE TYPE blueprint_importance AS ENUM ('critical', 'recommended', 'optional');

CREATE TABLE public.blueprint_stages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    icon TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blueprint_steps (
    id TEXT PRIMARY KEY,
    stage_id TEXT REFERENCES public.blueprint_stages(id) ON DELETE CASCADE,
    type roadmap_step_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    link TEXT,
    action_label TEXT,
    content TEXT,
    duration TEXT,
    importance blueprint_importance DEFAULT 'recommended',
    rich_content TEXT[],
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.blueprint_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blueprint_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read stages" ON public.blueprint_stages FOR SELECT USING (true);
CREATE POLICY "Public read steps" ON public.blueprint_steps FOR SELECT USING (true);
CREATE POLICY "Admin write stages" ON public.blueprint_stages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin write steps" ON public.blueprint_steps FOR ALL TO authenticated USING (true);


-- 3. SEED INITIAL DATA

-- Seed Features
INSERT INTO public.features (id, name, price, description, relevant_to, icon, delivery_time, service_name) VALUES
('seo-pro', 'Advanced SEO Infrastructure', 1500000, 'Optimasi teknis, sitemap otomatis, dan integrasi Search Console untuk ranking Google.', ARRAY['web-app'], 'Search', '3-5 Hari', 'Website'),
('multilang-i18n', 'Multi-Language Support (i18n)', 2500000, 'Sistem alih bahasa dinamis (English/Indonesian) untuk jangkauan pasar internasional.', ARRAY['web-app', 'saas-accelerator'], 'Languages', '4-7 Hari', 'Website'),
('speed-tuning-99', 'Extreme Speed Performance', 1500000, 'Optimasi skor Lighthouse hingga 95-100% untuk user experience yang super kilat.', ARRAY['web-app'], 'Zap', '2-4 Hari', 'Website'),
('analytics-heatmap', 'Marketing Analytics & Heatmap', 1000000, 'Integrasi FB Pixel, Google Analytics, & Hotjar untuk melihat perilaku scroll pengunjung.', ARRAY['web-app'], 'BarChart3', '1-2 Hari', 'Website'),
('payment-gateway-integ', 'Automated Payment Gateway', 3000000, 'Integrasi Midtrans/Xendit untuk terima pembayaran otomatis via VA, E-Wallet, & Credit Card.', ARRAY['business-system', 'saas-accelerator', 'web-app'], 'Wallet', '3-5 Hari', 'System'),
('wa-notif-system', 'WhatsApp API Notification', 2000000, 'Kirim invoice, status order, atau pengingat hutang secara otomatis ke WA pelanggan.', ARRAY['business-system', 'automation'], 'MessageSquare', '2-3 Hari', 'System'),
('acl-roles', 'Advanced Role Management', 1500000, 'Pengaturan hak akses bertingkat (Owner, Manager, Staff, Finance) untuk keamanan data.', ARRAY['business-system', 'saas-accelerator'], 'ShieldCheck', '3-5 Hari', 'System'),
('cloud-backup', 'Automated Cloud Backup', 1200000, 'Backup database harian ke cloud storage (S3/Drive) untuk keamanan data jangka panjang.', ARRAY['business-system'], 'Database', '1-2 Hari', 'System'),
('rag-knowledge', 'Custom AI Knowledge Base', 4500000, 'Melatih AI Agent menggunakan data internal perusahaan (PDF, Docx, FAQ) agar cerdas & akurat.', ARRAY['automation'], 'Cpu', '7-14 Hari', 'AI & Auto'),
('multi-platform-bot', 'Multi-Platform Bot Sync', 3500000, 'Satu engine bot yang terhubung ke WhatsApp, Telegram, dan Live Chat Website sekaligus.', ARRAY['automation'], 'Layout', '5-10 Hari', 'AI & Auto'),
('ocr-vision', 'AI Vision (OCR) Reader', 3000000, 'Kemampuan AI untuk membaca foto KTP, struk belanja, atau dokumen fisik secara otomatis.', ARRAY['automation'], 'ScanLine', '5-7 Hari', 'AI & Auto'),
('persistence-memory', 'AI Long-term Memory', 1500000, 'AI yang mampu mengingat riwayat percakapan user terdahulu agar interaksi lebih personal.', ARRAY['automation'], 'History', '3-5 Hari', 'AI & Auto'),
('recurring-billing', 'Subscription Management', 5000000, 'Sistem tagihan berulang harian/bulanan otomatis (Recurring Billing) untuk model bisnis SaaS.', ARRAY['saas-accelerator'], 'Repeat', '7-14 Hari', 'SaaS'),
('multi-tenant-db', 'Isolated Multi-Tenant DB', 7000000, 'Arsitektur database terpisah antar klien untuk keamanan data level enterprise.', ARRAY['saas-accelerator'], 'Server', '10-21 Hari', 'SaaS'),
('white-label', 'White-Labeling Engine', 8000000, 'Fitur agar klien Anda bisa menggunakan logo & domain mereka sendiri di platform Anda.', ARRAY['saas-accelerator'], 'Settings2', '7-14 Hari', 'SaaS'),
('priority-launch', 'Priority Support (12 Months)', 6000000, 'Dukungan teknis prioritas via WhatsApp Group & update keamanan rutin selama 1 tahun.', ARRAY['web-app', 'business-system', 'automation', 'saas-accelerator'], 'Headphones', '1 Tahun', 'Support'),
('staff-training', 'Exclusive Staff Training', 1500000, 'Sesi training intensif (On-site/Zoom) untuk memastikan tim Anda mahir menggunakan sistem.', ARRAY['business-system', 'automation', 'saas-accelerator'], 'Users', '1-2 Hari', 'Support');

-- Seed Blueprint Stages
INSERT INTO blueprint_stages (id, name, subtitle, description, icon, sort_order) VALUES
('visionary', 'The Visionary', 'Tahap Memulai & Identitas', 'Sangat cocok untuk Anda yang baru memiliki ide bisnis atau ingin melegalkan identitas brand agar terlihat profesional sejak hari pertama.', 'Palette', 1),
('scaler', 'The Scaler', 'Membangun Kredibilitas', 'Bisnis Anda sudah jalan, namun ingin terlihat lebih "established" dan bisa dipercaya oleh klien-klien besar atau korporasi.', 'Monitor', 2),
('optimizer', 'The Optimizer', 'Optimasi & Performa', 'Anda sudah punya website, tapi merasa belum maksimal? Mari bedah performanya dan tingkatkan kemampuan mendatangkan lead.', 'Search', 3),
('automator', 'The Automator', 'Sistem & Automasi', 'Operasional bisnis mulai kewalahan? Saatnya memangkas tugas repetitif dan membiarkan robot bekerja untuk Anda.', 'Zap', 4);

-- Seed Blueprint Steps
INSERT INTO blueprint_steps (id, stage_id, type, title, description, icon, link, action_label, content, duration, importance, rich_content, sort_order) VALUES
('v-1', 'visionary', 'article', 'Fondasi Brand identity', 'Kenapa konsistensi visual menentukan kepercayaan pelanggan pertama Anda.', 'Target', '/blog/fondasi-brand-identity-digital', 'Baca Materi Strategi', 'Identitas brand bukan hanya soal logo. Ini adalah tentang bagaimana pelanggan merasakan bisnis Anda. Memilih warna dan font yang tepat bisa meningkatkan persepsi nilai bisnis Anda hingga 80%.', '1-2 Hari', 'critical', ARRAY['Psikologi warna dalam branding', 'Tipografi yang membangun trust', 'Konsistensi lintas platform digital'], 1),
('v-2', 'visionary', 'tool', 'Tentukan Aura Brand', 'Gunakan AI Palette Generator untuk menemukan kombinasi warna yang pas.', 'Palette', 'https://kangjessy-tools.vercel.app/palette-generator', 'Coba Palette Generator', NULL, 'Instan', 'recommended', ARRAY['Generate 5 mood color berbeda', 'Cek kontras standar WCAG', 'Export ke Figma/CSS'], 2),
('v-3', 'visionary', 'service', 'Starter Landing Page', 'Validasi ide bisnis Anda dengan satu halaman web yang fokus pada konversi.', 'Layout', '/order?type=landing-page', 'Pesan Landing Page', NULL, '3-4 Hari', 'critical', ARRAY['High Fidelity Design', 'Responsive Mobile View', 'Contact Form Integration'], 3);
-- Add more steps here as needed or rely on the Admin Seed Tool for the full list if this is too long.
-- I'm adding a few key ones to ensure it works immediately.

INSERT INTO blueprint_steps (id, stage_id, type, title, description, icon, link, action_label, content, duration, importance, rich_content, sort_order) VALUES
('s-1', 'scaler', 'article', 'Website vs Media Sosial', 'Kenapa memiliki "rumah digital" resmi jauh lebih aman dibanding hanya numpang di platform pihak ketiga.', 'Globe', '/blog/website-vs-media-sosial', 'Baca Selengkapnya', 'Media sosial adalah hak milik platform lain. Website adalah aset properti Anda sendiri. Di sini, Anda memegang kontrol penuh atas data dan bagaimana Anda ingin dipandang oleh dunia.', '1 Hari', 'critical', ARRAY['Ownership atas data pelanggan', 'Kontrol penuh atas User Experience', 'Membangun ranking SEO jangka panjang'], 1),
('s-2', 'scaler', 'tool', 'Copywriting Profesional', 'Tulis profil perusahaan atau sales copy yang menjual dengan bantuan AI.', 'Type', 'https://kangjessy-tools.vercel.app/professional-rewriter', 'Coba Smart Rewriter', NULL, 'Instan', 'recommended', ARRAY['Professional tone converter', 'Focus on unique selling point', 'Grammar & Flow improvement'], 2),
('o-2', 'optimizer', 'tool', 'SEO Health Check', 'Audit kesehatan SEO website Anda secara instan untuk melihat apa yang perlu diperbaiki.', 'Search', 'https://kangjessy-tools.vercel.app/seo-scanner', 'Scan Website Sekarang', NULL, '5 Menit', 'critical', NULL, 2),
('a-3', 'automator', 'service', 'Workflow Automation', 'Integrasikan semua tools bisnis Anda (Sheets, WA, Email) ke dalam satu alur otomatis.', 'Workflow', '/order?type=workflow-auto', 'Integrasi Sekarang', NULL, '14+ Hari', 'critical', ARRAY['Audit Workflow Bisnis', 'Zapier/Make.com Implementation', 'Internal Admin Dashboard'], 3);

