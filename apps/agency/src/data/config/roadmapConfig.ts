import { 
    Palette, 
    Type, 
    Layout, 
    Globe, 
    Search, 
    Zap, 
    Workflow, 
    Rocket,
    MessageCircle,
    ShoppingCart,
    Monitor,
    Cpu,
    Target,
    Filter
} from 'lucide-vue-next';

export interface RoadmapStep {
    id: string;
    type: 'article' | 'tool' | 'service' | 'checklist';
    title: string;
    desc: string;
    icon: any;
    link?: string;
    actionLabel?: string;
    content?: string;
    duration?: string; // e.g. "3-5 Hari"
    importance?: 'critical' | 'recommended' | 'optional';
    richContent?: string[]; // Checklist or bullet points
}

export interface RoadmapStage {
    id: string;
    name: string;
    subtitle: string;
    desc: string;
    icon: any;
    steps: RoadmapStep[];
}

export const roadmapData: RoadmapStage[] = [
    {
        id: 'visionary',
        name: 'The Visionary',
        subtitle: 'Tahap Memulai & Identitas',
        icon: Palette,
        desc: 'Sangat cocok untuk Anda yang baru memiliki ide bisnis atau ingin melegalkan identitas brand agar terlihat profesional sejak hari pertama.',
        steps: [
            {
                id: 'v-1',
                type: 'article',
                title: 'Fondasi Brand identity',
                desc: 'Kenapa konsistensi visual menentukan kepercayaan pelanggan pertama Anda.',
                icon: Target,
                duration: '1-2 Hari',
                importance: 'critical',
                richContent: [
                    'Psikologi warna dalam branding',
                    'Tipografi yang membangun trust',
                    'Konsistensi lintas platform digital'
                ],
                content: 'Identitas brand bukan hanya soal logo. Ini adalah tentang bagaimana pelanggan merasakan bisnis Anda. Memilih warna dan font yang tepat bisa meningkatkan persepsi nilai bisnis Anda hingga 80%.',
                link: '/blog/fondasi-brand-identity-digital',
                actionLabel: 'Baca Materi Strategi'
            },
            {
                id: 'v-2',
                type: 'tool',
                title: 'Tentukan Aura Brand',
                desc: 'Gunakan AI Palette Generator untuk menemukan kombinasi warna yang pas.',
                icon: Palette,
                duration: 'Instan',
                importance: 'recommended',
                richContent: [
                    'Generate 5 mood color berbeda',
                    'Cek kontras standar WCAG',
                    'Export ke Figma/CSS'
                ],
                link: 'https://kangjessy-tools.vercel.app/palette-generator',
                actionLabel: 'Coba Palette Generator'
            },
            {
                id: 'v-3',
                type: 'service',
                title: 'Starter Landing Page',
                desc: 'Validasi ide bisnis Anda dengan satu halaman web yang fokus pada konversi.',
                icon: Layout,
                duration: '3-4 Hari',
                importance: 'critical',
                richContent: [
                    'High Fidelity Design',
                    'Responsive Mobile View',
                    'Contact Form Integration'
                ],
                link: '/order?type=landing-page',
                actionLabel: 'Pesan Landing Page'
            }
        ]
    },
    {
        id: 'scaler',
        name: 'The Scaler',
        subtitle: 'Membangun Kredibilitas',
        icon: Monitor,
        desc: 'Bisnis Anda sudah jalan, namun ingin terlihat lebih "established" dan bisa dipercaya oleh klien-klien besar atau korporasi.',
        steps: [
            {
                id: 's-1',
                type: 'article',
                title: 'Website vs Media Sosial',
                desc: 'Kenapa memiliki "rumah digital" resmi jauh lebih aman dibanding hanya numpang di platform pihak ketiga.',
                icon: Globe,
                duration: '1 Hari',
                importance: 'critical',
                richContent: [
                    'Ownership atas data pelanggan',
                    'Kontrol penuh atas User Experience',
                    'Membangun ranking SEO jangka panjang'
                ],
                content: 'Media sosial adalah hak milik platform lain. Website adalah aset properti Anda sendiri. Di sini, Anda memegang kontrol penuh atas data dan bagaimana Anda ingin dipandang oleh dunia.',
                link: '/blog/website-vs-media-sosial',
                actionLabel: 'Baca Selengkapnya'
            },
            {
                id: 's-2',
                type: 'tool',
                title: 'Copywriting Profesional',
                desc: 'Tulis profil perusahaan atau sales copy yang menjual dengan bantuan AI.',
                icon: Type,
                duration: 'Instan',
                importance: 'recommended',
                richContent: [
                    'Professional tone converter',
                    'Focus on unique selling point',
                    'Grammar & Flow improvement'
                ],
                link: 'https://kangjessy-tools.vercel.app/professional-rewriter',
                actionLabel: 'Coba Smart Rewriter'
            },
            {
                id: 's-3',
                type: 'service',
                title: 'Premium Company Profile',
                desc: 'Tampil elegan dan kredibel dengan arsitektur website modern multipage.',
                icon: Rocket,
                duration: '7-10 Hari',
                importance: 'critical',
                richContent: [
                    'Up to 7 Core Pages',
                    'Custom CMS Implementation',
                    'Professional SEO Foundation'
                ],
                link: '/order?type=company-profile',
                actionLabel: 'Bangun Company Profile'
            },
            {
                id: 's-4',
                type: 'checklist',
                title: 'Digital Trust Audit',
                desc: 'Pastikan semua aset digital Anda memancarkan profesionalisme.',
                icon: Target,
                duration: '1 Hari',
                importance: 'recommended',
                richContent: [
                    'Review SSL & Security Header',
                    'Audit Google Business Profile',
                    'Analisis testimoni & social proof'
                ],
                actionLabel: 'Lihat Checklist Audit'
            }
        ]
    },
    {
        id: 'optimizer',
        name: 'The Optimizer',
        subtitle: 'Optimasi & Performa',
        icon: Search,
        desc: 'Anda sudah punya website, tapi merasa belum maksimal? Mari bedah performanya dan tingkatkan kemampuan mendatangkan lead.',
        steps: [
            {
                id: 'o-1',
                type: 'article',
                title: 'Data-Driven Growth',
                desc: 'Memahami perilaku pengunjung website untuk menaikkan average order value.',
                icon: Filter,
                duration: '2 Hari',
                importance: 'recommended',
                richContent: [
                    'Heatmap analysis sederhana',
                    'Conversion Rate Optimization (CRO)',
                    'A/B Testing fundamental'
                ],
                content: 'Banyak orang punya traffic tapi tidak ada sales. Optimasi konversi (CRO) adalah seni memindahkan orang dari "melihat" menjadi "membeli".',
                link: '/blog/data-driven-growth-cro',
                actionLabel: 'Pelajari CRO'
            },
            {
                id: 'o-2',
                type: 'tool',
                title: 'SEO Health Check',
                desc: 'Audit kesehatan SEO website Anda secara instan untuk melihat apa yang perlu diperbaiki.',
                icon: Search,
                duration: '5 Menit',
                importance: 'critical',
                link: 'https://kangjessy-tools.vercel.app/seo-scanner',
                actionLabel: 'Scan Website Sekarang'
            },
            {
                id: 'o-3',
                type: 'service',
                title: 'Sales Funnel System',
                desc: 'Ubah website statis menjadi mesin penjualan otomatis yang didesain khusus untuk closing.',
                icon: ShoppingCart,
                duration: '10-14 Hari',
                importance: 'critical',
                richContent: [
                    'Automated Lead Capture',
                    'Direct Checkout Integration',
                    'Retargeting Pixel Setup'
                ],
                link: '/order?type=sales-funnel',
                actionLabel: 'Buat Sales Funnel'
            },
            {
                id: 'o-4',
                type: 'article',
                title: 'Speed & UX Optimization',
                desc: 'Website lambat membunuh konversi. Pelajari cara mencapai skor Core Web Vitals yang hijau.',
                icon: Zap,
                duration: '1 Hari',
                importance: 'recommended',
                richContent: [
                    'Image lazy loading & compression',
                    'Critical CSS rendering',
                    'Font loading optimization'
                ],
                content: 'Setiap delay 1 detik pada loading website dapat menurunkan tingkat konversi hingga 7%. Kecepatan bukan sekadar kemewahan, tapi kebutuhan.',
                actionLabel: 'Baca Panduan Speed'
            }
        ]
    },
    {
        id: 'automator',
        name: 'The Automator',
        subtitle: 'Sistem & Automasi',
        icon: Zap,
        desc: 'Operasional bisnis mulai kewalahan? Saatnya memangkas tugas repetitif dan membiarkan robot bekerja untuk Anda.',
        steps: [
            {
                id: 'a-1',
                type: 'article',
                title: 'The Power of Automation',
                desc: 'Bagaimana memangkas 10 jam kerja per minggu dengan mengkoneksikan antar aplikasi.',
                icon: Cpu,
                duration: '1 Hari',
                importance: 'recommended',
                richContent: [
                    'Integrasi Sheets ke WhatsApp',
                    'Auto-Invoicing system',
                    'CRM Sync Automation'
                ],
                content: 'Automasi bukan soal mengganti manusia, tapi soal membebaskan manusia dari tugas membosankan agar bisa fokus pada strategi besar.',
                link: '/blog/power-of-automation-business',
                actionLabel: 'Baca Studi Kasus'
            },
            {
                id: 'a-2',
                type: 'tool',
                title: 'Link WA Generator',
                desc: 'Buat link WhatsApp profesional dengan pesan kustom untuk memudahkan CS Anda.',
                icon: MessageCircle,
                duration: 'Instan',
                importance: 'optional',
                link: 'https://kangjessy-tools.vercel.app/whatsapp-generator',
                actionLabel: 'Buat Link WA'
            },
            {
                id: 'a-3',
                type: 'service',
                title: 'Workflow Automation',
                desc: 'Integrasikan semua tools bisnis Anda (Sheets, WA, Email) ke dalam satu alur otomatis.',
                icon: Workflow,
                duration: '14+ Hari',
                importance: 'critical',
                richContent: [
                    'Audit Workflow Bisnis',
                    'Zapier/Make.com Implementation',
                    'Internal Admin Dashboard'
                ],
                link: '/order?type=workflow-auto',
                actionLabel: 'Integrasi Sekarang'
            }
        ]
    }
];
