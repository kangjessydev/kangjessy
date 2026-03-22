
-- Seed data for features table

INSERT INTO public.features (id, name, price, description, relevant_to, icon, delivery_time, service_name) VALUES
-- WEBSITE HIGH-CONVERSION
('seo-pro', 'Advanced SEO Infrastructure', 1500000, 'Optimasi teknis, sitemap otomatis, dan integrasi Search Console untuk ranking Google.', ARRAY['web-app'], 'Search', '3-5 Hari', 'Website'),
('multilang-i18n', 'Multi-Language Support (i18n)', 2500000, 'Sistem alih bahasa dinamis (English/Indonesian) untuk jangkauan pasar internasional.', ARRAY['web-app', 'saas-accelerator'], 'Languages', '4-7 Hari', 'Website'),
('speed-tuning-99', 'Extreme Speed Performance', 1500000, 'Optimasi skor Lighthouse hingga 95-100% untuk user experience yang super kilat.', ARRAY['web-app'], 'Zap', '2-4 Hari', 'Website'),
('analytics-heatmap', 'Marketing Analytics & Heatmap', 1000000, 'Integrasi FB Pixel, Google Analytics, & Hotjar untuk melihat perilaku scroll pengunjung.', ARRAY['web-app'], 'BarChart3', '1-2 Hari', 'Website'),

-- BUSINESS SYSTEM
('payment-gateway-integ', 'Automated Payment Gateway', 3000000, 'Integrasi Midtrans/Xendit untuk terima pembayaran otomatis via VA, E-Wallet, & Credit Card.', ARRAY['business-system', 'saas-accelerator', 'web-app'], 'Wallet', '3-5 Hari', 'System'),
('wa-notif-system', 'WhatsApp API Notification', 2000000, 'Kirim invoice, status order, atau pengingat hutang secara otomatis ke WA pelanggan.', ARRAY['business-system', 'automation'], 'MessageSquare', '2-3 Hari', 'System'),
('acl-roles', 'Advanced Role Management', 1500000, 'Pengaturan hak akses bertingkat (Owner, Manager, Staff, Finance) untuk keamanan data.', ARRAY['business-system', 'saas-accelerator'], 'ShieldCheck', '3-5 Hari', 'System'),
('cloud-backup', 'Automated Cloud Backup', 1200000, 'Backup database harian ke cloud storage (S3/Drive) untuk keamanan data jangka panjang.', ARRAY['business-system'], 'Database', '1-2 Hari', 'System'),

-- AUTOMATION & AI
('rag-knowledge', 'Custom AI Knowledge Base', 4500000, 'Melatih AI Agent menggunakan data internal perusahaan (PDF, Docx, FAQ) agar cerdas & akurat.', ARRAY['automation'], 'Cpu', '7-14 Hari', 'AI & Auto'),
('multi-platform-bot', 'Multi-Platform Bot Sync', 3500000, 'Satu engine bot yang terhubung ke WhatsApp, Telegram, dan Live Chat Website sekaligus.', ARRAY['automation'], 'Layout', '5-10 Hari', 'AI & Auto'),
('ocr-vision', 'AI Vision (OCR) Reader', 3000000, 'Kemampuan AI untuk membaca foto KTP, struk belanja, atau dokumen fisik secara otomatis.', ARRAY['automation'], 'ScanLine', '5-7 Hari', 'AI & Auto'),
('persistence-memory', 'AI Long-term Memory', 1500000, 'AI yang mampu mengingat riwayat percakapan user terdahulu agar interaksi lebih personal.', ARRAY['automation'], 'History', '3-5 Hari', 'AI & Auto'),

-- SAAS ACCELERATOR
('recurring-billing', 'Subscription Management', 5000000, 'Sistem tagihan berulang harian/bulanan otomatis (Recurring Billing) untuk model bisnis SaaS.', ARRAY['saas-accelerator'], 'Repeat', '7-14 Hari', 'SaaS'),
('multi-tenant-db', 'Isolated Multi-Tenant DB', 7000000, 'Arsitektur database terpisah antar klien untuk keamanan data level enterprise.', ARRAY['saas-accelerator'], 'Server', '10-21 Hari', 'SaaS'),
('white-label', 'White-Labeling Engine', 8000000, 'Fitur agar klien Anda bisa menggunakan logo & domain mereka sendiri di platform Anda.', ARRAY['saas-accelerator'], 'Settings2', '7-14 Hari', 'SaaS'),

-- GLOBAL
('priority-launch', 'Priority Support (12 Months)', 6000000, 'Dukungan teknis prioritas via WhatsApp Group & update keamanan rutin selama 1 tahun.', ARRAY['web-app', 'business-system', 'automation', 'saas-accelerator'], 'Headphones', '1 Tahun', 'Support'),
('staff-training', 'Exclusive Staff Training', 1500000, 'Sesi training intensif (On-site/Zoom) untuk memastikan tim Anda mahir menggunakan sistem.', ARRAY['business-system', 'automation', 'saas-accelerator'], 'Users', '1-2 Hari', 'Support')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  relevant_to = EXCLUDED.relevant_to,
  icon = EXCLUDED.icon,
  delivery_time = EXCLUDED.delivery_time,
  service_name = EXCLUDED.service_name;
