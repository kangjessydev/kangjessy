import { allFaqs } from '../faqs/allFaqs';

export interface SupportFAQItem {
    keywords: string[];
    question: string;
    answer: string;
    category: string;
}

// Map allFaqs to SupportFAQItem format, including both 'smart' and 'home' placements for the Bot
export const faqData: SupportFAQItem[] = allFaqs.map(item => ({
    keywords: item.keywords,
    question: item.question,
    answer: item.answer,
    category: item.category
}));

export const quickActions = [
    { label: 'Biaya & Paket', icon: 'DollarSign', trigger: 'berapa biaya membuat website' },
    { label: 'Proses Kerja', icon: 'Clock', trigger: 'berapa lama website saya selesai' },
    { label: 'Tentang Revisi', icon: 'RotateCcw', trigger: 'berapa kali saya bisa minta revisi' },
    { label: 'Keamanan Situs', icon: 'Shield', trigger: 'apakah website saya akan aman dari serangan hacker' },
    { label: 'Mulai Konsultasi (WhatsApp)', icon: 'MessageSquare', trigger: 'bagaimana proses konsultasinya' }
];
