-- SEED DATA for pricing_master (FULL COMPREHENSIVE - AGENCY SYNC)
-- WARNING: This seed will update existing rows if 'category' and 'slug' match.

-- 1. LAYANAN UTAMA (SERVICE CATEGORIES)
INSERT INTO public.pricing_master (category, slug, name, description, icon, sort_order, metadata) VALUES
('service_type', 'web-app', 'Website High-Conversion', 'Bukan sekadar website cantik, tapi mesin penjual yang meyakinkan dalam 3 detik.', 'Monitor', 1, '{
    "tagline": "Bukan sekadar website cantik, tapi mesin penjual yang meyakinkan dalam 3 detik.",
    "badge": "Premium Quality",
    "technologies": ["WordPress", "Elementor", "Vue.js", "Laravel", "React"],
    "faq": [
        {"question": "Apa bedanya dengan website biasa?", "answer": "Website kami dirancang dengan psikologi user journey agar pengunjung mau membeli."},
        {"question": "Apakah saya dapat source code?", "answer": "Ya, 100% milik Anda. Tanpa biaya langganan bulanan."}
    ],
    "workflow": [
        {"title": "Deep Discovery", "description": "Sesi konsultasi mendalam model bisnis & USP Anda."},
        {"title": "Wireframing", "description": "Merancang User Journey agar alur informasi mengalir alami."},
        {"title": "Visual Design", "description": "Pembangunan visual mewah dengan micro-animations."},
        {"title": "Development", "description": "Coding & Integrasi sistem (Payment, CRM)."},
        {"title": "Launch", "description": "Serah terima aset & training operasional."}
    ]
}'),

('service_type', 'business-system', 'Sistem Manajemen Bisnis', 'Hentikan kebocoran profit. Bangun sistem otonom untuk kendali penuh bisnis Anda.', 'Layers', 2, '{
    "tagline": "Hentikan kebocoran profit. Bangun sistem otonom untuk kendali penuh bisnis Anda.",
    "badge": "Recommended for Scaling",
    "technologies": ["Node.js", "PostgreSQL", "Docker", "Redis", "Vue Admin"],
    "faq": [
        {"question": "Apakah data saya aman?", "answer": "Sangat aman. Database terenkripsi & backup harian."},
        {"question": "Bisa custom sesuai alur kantor saya?", "answer": "Tentu. Sistem dibuat 100% mengikuti SOP unik bisnis Anda."}
    ],
    "workflow": [
        {"title": "Audit SOP", "description": "Membedah alur kerja manual Anda saat ini."},
        {"title": "Blueprinting", "description": "Merancang arsitektur database & logic flow."},
        {"title": "Agile Dev", "description": "Pembangunan bertahap per modul dengan demo rutin."},
        {"title": "Migration", "description": "Pemindahan data lama ke sistem baru."},
        {"title": "Go-Live", "description": "Peluncuran & pendampingan intensif."}
    ]
}'),

('service_type', 'automation', 'Robot Automasi Bisnis', 'Lipatgandakan Output Anda. Biarkan sistem bekerja 24/7 selagi Anda fokus ekspansi.', 'Zap', 3, '{
    "tagline": "Lipatgandakan Output Anda. Biarkan sistem bekerja 24/7 selagi Anda fokus ekspansi.",
    "badge": "Efficiency Hero",
    "technologies": ["Python", "Selenium", "OpenAI API", "n8n", "WhatsApp API"],
    "faq": [
        {"question": "Laptop harus nyala terus?", "answer": "Tidak. Robot berjalan di Cloud Server (VPS) 24 jam."},
        {"question": "Aman dari banned WA?", "answer": "Kami menggunakan delay & human-behavior emulation agar aman."}
    ],
    "workflow": [
        {"title": "Logic Mapping", "description": "Menerjemahkan langkah manual menjadi algoritma."},
        {"title": "Scripting", "description": "Penulisan kode robot automasi."},
        {"title": "Stress Test", "description": "Uji coba dengan ribuan data dummy."},
        {"title": "Deployment", "description": "Pemasangan robot di server awan (VPS)."}
    ]
}'),

('service_type', 'saas-accelerator', 'SaaS Product Accelerator', 'Wujudkan Ide Startup Anda jadi Produk Nyata di Pasar dalam 30 Hari.', 'Rocket', 4, '{
    "tagline": "Wujudkan Ide Startup Anda jadi Produk Nyata di Pasar dalam 30 Hari.",
    "badge": "For Founders",
    "technologies": ["Next.js", "Supabase", "Stripe/Midtrans", "TailwindCSS"],
    "faq": [
        {"question": "IP/Source Code milik siapa?", "answer": "100% Milik Anda untuk valuasi investor."},
        {"question": "Berapa user bisa ditampung?", "answer": "Arsitektur awal siap untuk 10k-50k user."}
    ],
    "workflow": [
        {"title": "Features Lockdown", "description": "Validasi fitur ''Must-Have'' vs ''Nice-to-Have''."},
        {"title": "Prototyping", "description": "Desain clickable untuk demo investor."},
        {"title": "MVP Dev", "description": "Coding fitur inti & payment system."},
        {"title": "Launch", "description": "Rilis ke publik + Analytics setup."}
    ]
}')
ON CONFLICT (category, slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order,
    metadata = EXCLUDED.metadata;

-- 2. FITUR TAMBAHAN (FEATURES)
-- Note: Keys updated to camelCase to match Agency Frontend (relevantTo)
INSERT INTO public.pricing_master (category, slug, name, description, base_price, icon, sort_order, metadata) VALUES
-- Website Features
('feature', 'seo-pro', 'Advanced SEO Infrastructure', 'Optimasi teknis & sitemap Google.', 1500000, 'Search', 1, '{"relevantTo": ["web-app"]}'),
('feature', 'speed-tuning', 'Extreme Speed Performance', 'Optimasi skor Lighthouse 90+.', 1500000, 'Zap', 2, '{"relevantTo": ["web-app"]}'),
('feature', 'analytics-heatmap', 'Marketing Analytics & Heatmap', 'FB Pixel, GTM, Hotjar setup.', 1000000, 'BarChart3', 3, '{"relevantTo": ["web-app"]}'),
('feature', 'multilang', 'Multi-Language Support', 'Sistem bahasa ganda (ID/EN).', 2500000, 'Languages', 4, '{"relevantTo": ["web-app", "saas-accelerator"]}'),

-- System Features
('feature', 'payment-gateway', 'Automated Payment Gateway', 'Integrasi Midtrans/Xendit.', 3000000, 'Wallet', 5, '{"relevantTo": ["web-app", "business-system", "saas-accelerator"]}'),
('feature', 'wa-notif', 'WhatsApp Notification System', 'Kirim invoice/notif ke WA.', 2000000, 'MessageSquare', 6, '{"relevantTo": ["business-system", "automation"]}'),
('feature', 'acl-roles', 'Advanced Role Management', 'Hak akses bertingkat (Admin/Staff).', 1500000, 'ShieldCheck', 7, '{"relevantTo": ["business-system", "saas-accelerator"]}'),
('feature', 'cloud-backup', 'Automated Cloud Backup', 'Backup database harian aman.', 1200000, 'Database', 8, '{"relevantTo": ["business-system"]}'),

-- AI Features
('feature', 'ai-chat', 'Custom AI Knowledge Base', 'Latih AI dengan data PDF Anda.', 4500000, 'Brain', 9, '{"relevantTo": ["automation", "business-system"]}'),
('feature', 'ocr-vision', 'AI Vision (OCR) Reader', 'Baca KTP/Struk otomatis.', 3000000, 'ScanLine', 10, '{"relevantTo": ["automation", "business-system"]}'),

-- SaaS Features
('feature', 'recurring-billing', 'Subscription Engine', 'Sistem tagihan berulang otomatis.', 5000000, 'Repeat', 11, '{"relevantTo": ["saas-accelerator"]}'),
('feature', 'white-label', 'White-Label Branding', 'Klien bisa pakai logo sendiri.', 8000000, 'Settings2', 12, '{"relevantTo": ["saas-accelerator"]}'),

-- Support
('feature', 'priority-support', 'Priority Support (1 Year)', 'Support WA Group & Update.', 6000000, 'Headphones', 13, '{"relevantTo": ["all"]}'),
('feature', 'staff-training', 'Exclusive Staff Training', 'Training penggunaan sistem.', 1500000, 'Users', 14, '{"relevantTo": ["business-system", "saas-accelerator"]}')
ON CONFLICT (category, slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    base_price = EXCLUDED.base_price,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order,
    metadata = EXCLUDED.metadata;

-- 3. TIPE PROYEK (PROJECT TYPES)
-- Keys updated: serviceId, maxPages, deliveryTime, includedFeatureIds, detailedFeatures
INSERT INTO public.pricing_master (category, slug, name, description, base_price, icon, sort_order, metadata) VALUES
-- The Core (Foundation)
('project_type', 'foundation-web', 'The Foundation (Web)', 'Pondasi dasar infrastruktur web modern.', 1500000, 'Layout', 1, '{
    "serviceId": "web-app",
    "isFoundation": true,
    "maxPages": "1 Halaman Utama",
    "deliveryTime": "3-5 Hari",
    "revisions": "2x Revisi",
    "includedFeatureIds": [],
    "detailedFeatures": [
        {"title": "Pondasi Infrastruktur", "icon": "Database", "items": ["CMS Setup", "Clean Architecture", "Access Control"]},
        {"title": "Kesiapan Publik", "icon": "Globe", "items": ["Landing Page Standar", "Mobile Ready", "SSL Security"]}
    ]
}'),

('project_type', 'foundation-sys', 'The Foundation (System)', 'Kerangka dasar sistem manajemen bisnis.', 3500000, 'Cpu', 2, '{
    "serviceId": "business-system",
    "isFoundation": true,
    "maxPages": "System Core",
    "deliveryTime": "7-10 Hari",
    "revisions": "3x Revisi",
    "includedFeatureIds": ["acl-roles"],
    "detailedFeatures": [
        {"title": "Core Engine", "icon": "Cpu", "items": ["Auth System", "Dashboard Shell", "DB Schema"]}
    ]
}'),

-- Web Apps
('project_type', 'landing-page', 'Starter Landing Page', 'Halaman tunggal fokus konversi.', 2000000, 'Zap', 3, '{
    "serviceId": "web-app",
    "badge": "Best Value",
    "maxPages": "1 Halaman Panjang",
    "deliveryTime": "3-7 Hari",
    "revisions": "2x Revisi",
    "includedFeatureIds": ["speed-tuning", "analytics-heatmap"],
    "detailedFeatures": [
        {"title": "Sales Funnel", "icon": "TrendingUp", "items": ["Copywriting Persuasif", "CTA Optimization"]},
        {"title": "Performance", "icon": "Zap", "items": ["Load < 2 Detik", "Mobile First"]}
    ]
}'),

('project_type', 'company-profile', 'Premium Company Profile', 'Website kredibilitas bisnis.', 3000000, 'Globe', 4, '{
    "serviceId": "web-app",
    "maxPages": "3-5 Halaman",
    "deliveryTime": "7-14 Hari",
    "revisions": "3x Revisi",
    "includedFeatureIds": ["seo-pro"],
    "detailedFeatures": [
        {"title": "Branding", "icon": "ShieldCheck", "items": ["Professional Look", "Identity Integration"]},
        {"title": "Content Mgmt", "icon": "FileText", "items": ["Easy CMS", "Dynamic Portfolio"]}
    ]
}'),

('project_type', 'ecommerce', 'Ecommerce Ecosystem', 'Toko online lengkap & stabil.', 7500000, 'ShoppingCart', 5, '{
    "serviceId": "web-app",
    "maxPages": "Unlimited Products",
    "deliveryTime": "14-21 Hari",
    "revisions": "5x Revisi",
    "includedFeatureIds": ["payment-gateway", "wa-notif", "seo-pro"],
    "detailedFeatures": [
        {"title": "Sales Auto", "icon": "Zap", "items": ["Auto Payment Check", "Shipping Calc", "Invoice Email"]},
        {"title": "Inventory", "icon": "Box", "items": ["Stock Sync", "Sales Report"]}
    ]
}'),

-- Business Systems
('project_type', 'pms', 'PMS (Property/Project)', 'Sistem manajemen operasional.', 8500000, 'Activity', 6, '{
    "serviceId": "business-system",
    "maxPages": "Ops Infrastructure",
    "deliveryTime": "21-30 Hari",
    "revisions": "4x Revisi",
    "includedFeatureIds": ["acl-roles", "cloud-backup"],
    "detailedFeatures": [
        {"title": "Project Control", "icon": "Activity", "items": ["Timeline Gantt", "Resource Planning", "Cost Tracking"]}
    ]
}'),

('project_type', 'lms', 'LMS Academy', 'Platform edukasi online.', 9500000, 'BookOpen', 7, '{
    "serviceId": "business-system",
    "maxPages": "Education Platform",
    "deliveryTime": "21-30 Hari",
    "revisions": "5x Revisi",
    "includedFeatureIds": ["payment-gateway", "wa-notif", "acl-roles"],
    "detailedFeatures": [
        {"title": "Learning Exp", "icon": "BookOpen", "items": ["Video Streaming Aman", "Quiz System", "Certificate Gen"]}
    ]
}'),

-- Micro-Services
('project_type', 'speed-opt', 'Speed Optimization Pro', 'Optimasi performa website hingga skor 90+.', 1500000, 'Zap', 50, '{
    "serviceId": "web-app",
    "isMicro": true,
    "maxPages": "1 Website",
    "deliveryTime": "2-3 Hari",
    "revisions": "1x Revisi",
    "includedFeatureIds": ["speed-tuning"],
    "workflow": [
        {"title": "Audit", "description": "Cek skor GTMetrix awal."},
        {"title": "Backup", "description": "Amankan data website."},
        {"title": "Optimization", "description": "Kompresi gambar & cache."},
        {"title": "Testing", "description": "Cek skor akhir."}
    ]
}')
ON CONFLICT (category, slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    base_price = EXCLUDED.base_price,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order,
    metadata = EXCLUDED.metadata;

-- 4. STYLE VIBES
INSERT INTO public.pricing_master (category, slug, name, description, image_url, sort_order) VALUES
('style_vibe', 'modern-dark', 'Modern Dark Tech', 'Efek Glassmorphism & aksen neon.', 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800&auto=format&fit=crop', 1),
('style_vibe', 'minimalist-luxury', 'Minimalist Luxury', 'Tipografi high-end & animasi elegan.', 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=800&auto=format&fit=crop', 2),
('style_vibe', 'playful-vibrant', 'Playful & Vibrant', 'Warna cerah & ilustrasi kustom.', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop', 3)
ON CONFLICT (category, slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    sort_order = EXCLUDED.sort_order;

-- 5. DEADLINES
INSERT INTO public.pricing_master (category, slug, name, description, multiplier, sort_order) VALUES
('project_deadline', 'standard', 'Normal Speed', 'Sesuai estimasi paket.', 1.0, 1),
('project_deadline', 'priority', 'Priority Speed', 'Lebih cepat 25%.', 1.25, 2),
('project_deadline', 'express', 'Express Speed', 'Lebih cepat 50% (Rata kiri).', 1.5, 3)
ON CONFLICT (category, slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    multiplier = EXCLUDED.multiplier,
    sort_order = EXCLUDED.sort_order;
