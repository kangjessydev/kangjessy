export interface FAQItem {
    keywords: string[];
    question: string;
    answer: string;
    category: 'service' | 'pricing' | 'process' | 'general' | 'follow_up';
    nextSteps?: string[]; // Labels of quickActions to show after this answer
}

export const faqData: FAQItem[] = [
    {
        category: 'service',
        keywords: ['buat', 'bikin', 'website', 'layanan', 'service', 'apa saja'],
        question: 'Layanan apa saja yang ditawarkan?',
        answer: 'Saya menawarkan layanan pembuatan website premium mulai dari Landing Page, Company Profile, hingga Web App (SaaS). Semua sudah termasuk optimasi SEO, desain modern, dan performa tinggi.',
        nextSteps: ['💰 Cek Harga', '🚀 Alur Kerja']
    },
    {
        category: 'pricing',
        keywords: ['harga', 'biaya', 'price', 'berapa', 'murah', 'biaya'],
        question: 'Berapa biaya pembuatan website?',
        answer: 'Untuk memberikan estimasi harga yang akurat, saya perlu tahu dulu nih tipe website seperti apa yang Anda butuhkan? Apakah Landing Page untuk jualan, Company Profile perusahaan, atau Toko Online (Ecommerce)?',
        nextSteps: ['📄 Landing Page', '🏢 Company Profile', '🛒 Toko Online']
    },
    {
        category: 'pricing',
        keywords: ['landing page', 'jualan'],
        question: 'Harga Landing Page',
        answer: 'Untuk **Starter Landing Page**, biayanya mulai dari **Rp 1.5jt**. Ini sudah termasuk desain high-conversion, mobile friendly, dan integrasi WhatsApp. Cocok untuk validasi produk atau jualan single-product.',
        nextSteps: ['🚀 Alur Kerja', '👨‍💻 Konsultasi WA']
    },
    {
        category: 'pricing',
        keywords: ['company profile', 'perusahaan'],
        question: 'Harga Company Profile',
        answer: 'Untuk **Premium Company Profile**, biayanya mulai dari **Rp 3jt**. Fokusnya adalah branding eksklusif dan kredibilitas bisnis. Sudah termasuk Admin Panel untuk update konten secara mandiri.',
        nextSteps: ['🚀 Alur Kerja', '👨‍💻 Konsultasi WA']
    },
    {
        category: 'pricing',
        keywords: ['toko online', 'ecommerce', 'shop'],
        question: 'Harga Toko Online',
        answer: 'Untuk **Ecommerce Ecosystem**, biayanya mulai dari **Rp 7.5jt**. Lengkap dengan sistem katalog produk, manajemen stok, dan integrasi Payment Gateway (VA, E-Wallet otomatis).',
        nextSteps: ['🚀 Alur Kerja', '👨‍💻 Konsultasi WA']
    },
    {
        category: 'process',
        keywords: ['lama', 'durasi', 'berapa hari', 'berapa lama', 'waktu'],
        question: 'Berapa lama proses pengerjaannya?',
        answer: 'Untuk Landing Page standar biasanya 3-7 hari. Untuk Company Profile atau Web App yang lebih kompleks bisa memakan waktu 2-4 minggu.',
        nextSteps: ['🚀 Alur Kerja', '👨‍💻 Konsultasi WA']
    },
    {
        category: 'general',
        keywords: ['anda', 'siapa', 'kang jessy', 'domisili', 'lokasi'],
        question: 'Siapa itu Kang Jessy?',
        answer: 'Saya adalah seorang Fullstack Developer & Technical Architect yang berfokus pada pembangunan solusi digital yang tidak hanya estetik, tapi juga cerdas dan impactful.',
        nextSteps: ['🌐 Layanan', '🚀 Alur Kerja']
    },
    {
        category: 'process',
        keywords: ['alur', 'cara kerja', 'workflow', 'bagaimana', 'mulai'],
        question: 'Bagaimana alur kerja pembuatan proyek di sini?',
        answer: 'Alurnya simpel: 1. Konsultasi (WA) -> 2. Penawaran & Kontrak -> 3. Riset & Desain -> 4. Pengembangan -> 5. Review -> 6. Launching.',
        nextSteps: ['👨‍💻 Konsultasi WA', '🌐 Layanan']
    }
];

export const quickActions = [
    { label: '💰 Cek Harga', icon: 'DollarSign', trigger: 'berapa harga pembuatan website' },
    { label: '🚀 Alur Kerja', icon: 'Workflow', trigger: 'bagaimana alur kerja' },
    { label: '🌐 Layanan', icon: 'Globe', trigger: 'layanan apa saja' },
    { label: '👨‍💻 Siapa KangJessy?', icon: 'User', trigger: 'siapa itu kang jessy' },
    { label: '📄 Landing Page', icon: 'Zap', trigger: 'harga landing page' },
    { label: '🏢 Company Profile', icon: 'Layout', trigger: 'harga company profile' },
    { label: '🛒 Toko Online', icon: 'ShoppingCart', trigger: 'harga toko online' },
    { label: '👨‍💻 Konsultasi WA', icon: 'MessageCircle', trigger: 'hubungi via whatsapp' }
];
