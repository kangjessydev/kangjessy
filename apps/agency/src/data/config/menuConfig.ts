import { 
    Monitor, 
    Layers, 
    Globe, 
    Search, 
    Briefcase,
    BookOpen,
    // ShoppingCart, // Store removed
    FileText,
    Users,
    // History,
    Calculator,
    // Package, // Store removed
    // Layout, // Store removed
    // GraduationCap, // Store removed
    Send,
    // HelpCircle,
    Info,
    // Star,
    Mail,
    Zap,
    // Puzzle, // Store removed
    Cpu,
    // Gift, // Store removed
    Rocket,
    Palette,
    MessageSquare,
    Settings
} from 'lucide-vue-next';

export interface MenuItem {
    text: string;
    url?: string;
    isMegaMenu?: boolean;
    isDropdown?: boolean;
    isAction?: boolean;
    trigger?: 'whatsapp' | 'email' | 'ai' | 'link';
    triggerProps?: Record<string, any>;
    icon?: any;
    children?: { text: string; url?: string; trigger?: 'whatsapp' | 'email' | 'ai' | 'link'; icon?: any; comingSoon?: boolean }[];
    groups?: {
        title: string;
        items: { text: string; desc: string; url?: string; trigger?: 'whatsapp' | 'email' | 'ai' | 'link'; triggerProps?: Record<string, any>; icon?: any; comingSoon?: boolean }[];
    }[];
}

export const menuItems: MenuItem[] = [
    {
        text: 'Services',
        url: '/services',
        icon: Monitor,
        isMegaMenu: true,
        groups: [
            {
                title: 'Core Services',
                items: [
                    { text: 'Website High-Conv', desc: 'Landing page & Company Profile.', url: '/service/website-high-conversion', icon: Monitor },
                    { text: 'Sistem Manajemen', desc: 'ERP, CRM, LMS & Internal Tools.', url: '/service/business-system', icon: Layers },
                    { text: 'AI Agent & Bot', desc: 'AI Custom Data & Automation.', url: '/service/ai-agent', icon: Cpu },
                    { text: 'Robot Automasi', desc: 'Otomatisasi tugas & Integrasi.', url: '/service/automation', icon: Zap },
                    { text: 'Maintenance & Rakitan', desc: 'Update fitur & System care.', url: '/service/maintenance-custom', icon: Settings }
                ]
            },
            {
                title: 'Micro-Services',
                items: [
                    { text: 'Lihat Semua Fitur', desc: 'Katalog lengkap fitur instan.', url: '/#microservices', icon: Zap },
                    { text: 'SEO Infrastructure', desc: 'Optimasi ranking Google otomatis.', url: '/order?type=custom-maintenance&addFeature=seo-pro', icon: Search },
                    { text: 'WA Notification', desc: 'Kirim invoice & notif via WA.', url: '/order?type=custom-maintenance&addFeature=wa-notif-system', icon: MessageSquare },
                    { text: 'AI Knowledge Base', desc: 'Latih AI dengan data internal.', url: '/order?type=custom-maintenance&addFeature=rag-knowledge', icon: Cpu }
                ]
            },
            {
                title: 'Strategy & Tools',
                items: [
                    { text: 'Cost Calculator', desc: 'Estimasi biaya proyek Anda.', url: '/services#calculator', icon: Calculator },
                    { 
                        text: 'IT Consultation', 
                        desc: 'Diskusi strategi teknologi via WA.', 
                        trigger: 'whatsapp', 
                        triggerProps: { initialMessage: 'Halo Kang Jessy, saya mau konsultasi tentang strategi teknologi bisnis saya.' },
                        icon: Globe 
                    },
                    { 
                        text: 'SEO Audit', 
                        desc: 'Dapatkan audit website gratis secara instan.', 
                        url: 'https://kangjessy-tools.vercel.app/seo-scanner',
                        icon: Search 
                    }
                ]
            }
        ]
    },
    /*
    {
        text: 'Store',
        url: '/store',
        icon: ShoppingCart,
        isMegaMenu: true,
        groups: [
            {
                title: 'Shop Collection',
                items: [
                    { text: 'Browse All Store', desc: 'Lihat semua koleksi aset digital.', url: '/store', icon: ShoppingCart },
                    { text: 'E-Course', desc: 'Video tutorial terpilih & terarah.', url: '/store#ecourse', icon: GraduationCap },
                    { text: 'E-Book', desc: 'Panduan teknis dalam format digital.', url: '/store#ebook', icon: BookOpen },
                    { text: 'Free Resources', desc: 'Kumpulan aset gratis pilihan.', url: '/store#free', icon: Gift }
                ]
            },
            {
                title: 'Digital Assets',
                items: [
                    { text: 'Template', desc: 'Ready-to-use Figma & Notion kit.', url: '/store#template', icon: Layout },
                    { text: 'Source Code', desc: 'Premium boilerplates (Vue, Laravel).', url: '/store#source-code', icon: Package },
                    { text: 'WP Theme', desc: 'Customizable WordPress themes.', url: '/store#wp-theme', icon: Globe },
                    { text: 'WP Plugin', desc: 'Powerfull WordPress plugins.', url: '/store#wp-plugin', icon: Puzzle }
                ]
            }
        ]
    },
    */
    { text: 'Projects', url: '/projects', icon: Briefcase },
    {
        text: 'The Blueprint',
        url: '/blueprint',
        icon: Rocket,
        isMegaMenu: true,
        groups: [
            {
                title: 'Your Journey',
                items: [
                    { text: 'All Stages', desc: 'Lihat peta jalan lengkap.', url: '/blueprint', icon: Rocket },
                    { text: 'Visionary', desc: 'Tahap Memulai & Identitas.', url: '/blueprint?stage=visionary', icon: Palette },
                    { text: 'Scaler', desc: 'Membangun Kredibilitas.', url: '/blueprint?stage=scaler', icon: Monitor },
                    { text: 'Optimizer', desc: 'Optimasi & Performa.', url: '/blueprint?stage=optimizer', icon: Search },
                    { text: 'Automator', desc: 'Sistem & Automasi.', url: '/blueprint?stage=automator', icon: Zap }
                ]
            },
            {
                title: 'Expert Help',
                items: [
                    { 
                        text: 'Consultation', 
                        desc: 'Tanya jawab strategi bisnis.', 
                        trigger: 'whatsapp', 
                        triggerProps: { initialMessage: 'Halo Kang Jessy, saya ingin konsultasi strategi digital.' },
                        icon: MessageSquare 
                    },
                    { text: 'ROI Calculator', desc: 'Hitung potensi profit Anda.', url: 'https://kangjessy-tools.vercel.app/roi-calculator', icon: Calculator }
                ]
            }
        ]
    },
    { text: 'Blog', url: '/blog', icon: BookOpen },
    {
        text: 'Resources',
        url: '#',
        icon: FileText,
        isDropdown: true,
        children: [
            // { text: 'Documentation', url: '/docs', icon: FileText },
            { text: 'Client Portal', url: '/portal', icon: Users },
            { text: 'Price Calculator', url: '/services#calculator', icon: Calculator },
            { text: 'Documentation', url: 'https://kangjessy-docs.vercel.app', icon: FileText, trigger: 'link' }
        ]
    },
    {
        text: 'Hire Me',
        url: '/order',
        isAction: true,
        icon: Send
    }
]

// Specialized menu for Mobile BottomSheet (Flat Structure)
export const mobileNavItems = [
    { text: 'Services', url: '/services', icon: Monitor },
    { text: 'Tools', url: 'https://kangjessy-tools.vercel.app', icon: Zap },
    { text: 'Portfolio', url: '/projects', icon: Briefcase },
    // { text: 'Store', url: '/store', icon: ShoppingCart },
    { text: 'Blog', url: '/blog', icon: BookOpen },
    { text: 'About', url: '/about', icon: Info },
    // { text: 'Reviews', url: '/testimonials', icon: Star },
    // { text: 'FAQ', url: '/faq', icon: HelpCircle },
    { text: 'Contact', trigger: 'whatsapp', icon: Mail },
];

export const mobileResourceLinks = [
    { text: 'Price Calculator', url: '/services#calculator', icon: Calculator },
    // { text: 'Documentation', url: '/docs', icon: FileText },
    // { text: 'Changelog', url: '/changelog', icon: History },
];

export const mobileMenuGroups: {
    title: string;
    items: { text: string; url?: string; trigger?: 'whatsapp' | 'email' | 'ai' | 'link'; icon?: any }[];
}[] = [
    {
        title: 'Daily Business',
        items: [
            { text: 'Services', url: '/services', icon: Monitor },
            { text: 'Portfolio', url: '/projects', icon: Briefcase },
            // { text: 'Store', url: '/store', icon: ShoppingCart },
            { text: 'Blog', url: '/blog', icon: BookOpen },
            { text: 'Tools', url: 'https://kangjessy-tools.vercel.app', icon: Zap },
            { text: 'About', url: '/about', icon: Info },
        ]
    },
    {
        title: 'Strategy & Tools',
        items: [
            { text: 'The Blueprint', url: '/blueprint', icon: Rocket },
            { text: 'Estimator', url: '/services#calculator', icon: Calculator },
            { text: 'Portal', url: '/portal', icon: Users },
        ]
    }
];
