<template>
    <div class="min-h-screen bg-bg-primary pt-24 pb-20">
        <div class="container mx-auto px-4">
            <SectionHeader badge="Gratis & Terbuka" title="Smart Tools"
                subtitle="Koleksi alat bantu digital praktis untuk membantu akselerasi bisnis dan produktivitas harian Anda."
                align="left" class="mb-16">
                <template #title>
                    Smart <span
                        class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Tools</span>
                </template>
            </SectionHeader>

            <!-- Category Filters (SOP: Consistent with Projects/Store pattern) -->
            <div
                class="flex mb-12 -mx-4 px-4 md:mx-0 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <nav
                    class="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-3 pb-4 w-full">
                    <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id"
                        class="px-6 py-2.5 rounded-full border text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shrink-0 whitespace-nowrap"
                        :class="activeCategory === cat.id
                            ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]'
                            : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:border-accent-primary/30 hover:text-text-primary hover:bg-bg-secondary'">
                        {{ cat.name }}
                    </button>
                </nav>
            </div>

            <!-- Grid of Tools -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
                <TransitionGroup enter-active-class="transition duration-500 ease-out"
                    enter-from-class="opacity-0 translate-y-8 scale-95"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transition duration-300 ease-in absolute"
                    leave-from-class="opacity-100 translate-y-0 scale-100"
                    leave-to-class="opacity-0 translate-y-4 scale-95" move-class="transition duration-500 ease-in-out">
                    <router-link v-for="tool in filteredTools" :key="tool.id"
                        :to="tool.status === 'active' ? tool.url : '#'"
                        class="group relative bg-bg-secondary border border-border-color rounded-3xl p-8 transition-all duration-200 ease-out hover:border-accent-primary/80 hover:shadow-md hover:bg-bg-secondary/80 overflow-hidden"
                        :class="{ 'opacity-60 cursor-not-allowed': tool.status === 'upcoming' }">
                        <!-- Status Badge -->
                        <div class="absolute top-6 right-8">
                            <span v-if="tool.status === 'active'"
                                class="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shrink-0"></span>
                                Live
                            </span>
                            <span v-else
                                class="px-2.5 py-1 bg-bg-tertiary text-text-tertiary rounded-full text-[10px] font-black uppercase tracking-wider">
                                Coming Soon
                            </span>
                        </div>

                        <!-- Icon Area -->
                        <div class="w-14 h-14 mb-8 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shrink-0"
                            :class="tool.status === 'active' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-tertiary'">
                            <component :is="tool.icon" :size="28" class="shrink-0" />
                        </div>

                        <!-- Content -->
                        <h3
                            class="text-[clamp(1.1rem,1.5vw,1.25rem)] font-black text-text-primary mb-3 tracking-tight group-hover:text-accent-primary transition-colors">
                            {{ tool.name }}
                        </h3>
                        <p class="text-text-secondary text-[clamp(0.85rem,1vw,0.95rem)] leading-relaxed mb-8">
                            {{ tool.description }}
                        </p>

                        <!-- Footer/Action -->
                        <div class="mt-auto flex items-center gap-2 text-[clamp(0.75rem,0.9vw,0.85rem)] font-bold"
                            :class="tool.status === 'active' ? 'text-accent-primary' : 'text-text-tertiary'">
                            <span>{{ tool.status === 'active' ? 'Buka Tool' : 'Segera Hadir' }}</span>
                            <ArrowRight v-if="tool.status === 'active'" :size="16"
                                class="transition-transform group-hover:translate-x-1 shrink-0" />
                        </div>

                        <!-- Subtle background decorative name -->
                        <span
                            class="absolute -bottom-4 -right-2 text-[5rem] font-black text-white/2 select-none pointer-events-none uppercase italic leading-none group-hover:opacity-10 opacity-5 transition-opacity">
                            {{ tool.id }}
                        </span>
                    </router-link>
                </TransitionGroup>

                <!-- Empty State (if needed) -->
                <div v-show="filteredTools.length === 0"
                    class="col-span-full py-20 text-center animate-in fade-in zoom-in duration-500">
                    <Wrench :size="48" class="mx-auto mb-4 text-text-tertiary opacity-20 shrink-0" />
                    <p class="text-text-tertiary font-bold text-[clamp(0.85rem,1vw,1rem)]">Belum ada tool untuk kategori
                        ini.</p>
                </div>
            </div>

            <!-- Call to Action / Support -->
            <div
                class="mt-24 p-12 bg-linear-to-br from-bg-secondary to-bg-tertiary border border-border-color rounded-[3rem] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden group">
                <!-- SOP: Background overlay should not block pointer events -->
                <div
                    class="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                </div>

                <!-- Content Container with Z-Index for stability -->
                <div class="relative z-10">
                    <div
                        class="w-16 h-16 bg-accent-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <Wrench :size="32" />
                    </div>
                    <h2 class="text-[clamp(1.5rem,4vw,2rem)] font-black text-text-primary mb-4 tracking-tight">Punya Ide
                        Tool Lain?</h2>
                    <p class="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                        Saya selalu terbuka untuk membuat tools yang mempermudah bisnis Anda. Bagikan ide Anda dan
                        mungkin
                        tool tersebut
                        akan hadir di sini minggu depan!
                    </p>
                    <button @click="handleSuggestIdea"
                        class="inline-flex items-center gap-3 px-8 py-4 bg-text-primary text-bg-primary rounded-2xl font-black transition-all hover:bg-accent-primary hover:text-white shadow-xl active:scale-95 cursor-pointer relative z-10">
                        Kirim Saran Ide
                        <Send :size="20" class="shrink-0" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    ArrowRight, MessageSquare, Search, Palette,
    Type, Wrench, Send, Image, FileText,
    Sparkles, TrendingUp, Terminal, Briefcase,
    Wand2, Languages, Smartphone, Waves, QrCode, ShieldCheck
} from 'lucide-vue-next';
import SectionHeader from '@/components/SectionHeader.vue';
import { usePopupManager } from '@/composables/usePopupManager';

const { Popups, openModal } = usePopupManager();

const handleSuggestIdea = () => {
    openModal(Popups.CHAT_WA, {
        title: 'Saran Ide Tool',
        bubbleMessage: 'Halo Kang! saya punya ide tool keren nih buat ditambahin ke Tools...',
        initialMessage: 'Halo Kang! Saya punya ide tool keren nih...',
        actionText: 'Kirim Ide ke WhatsApp',
        category: 'Tools Idea'
    });
};

const activeCategory = ref('all');

const categories = [
    { id: 'all', name: 'Semua', icon: Sparkles },
    { id: 'marketer', name: 'Marketer', icon: TrendingUp },
    { id: 'designer', name: 'Designer', icon: Palette },
    { id: 'developer', name: 'Developer', icon: Terminal },
    { id: 'business', name: 'Business Owner', icon: Briefcase }
];

const tools = [
    {
        id: 'wa',
        name: 'WhatsApp Link Generator',
        description: 'Buat link chat otomatis dengan custom message untuk mempermudah pelanggan menghubungi Anda.',
        icon: MessageSquare,
        url: 'whatsapp-generator',
        status: 'active',
        categories: ['marketer', 'business']
    },
    {
        id: 'seo',
        name: 'Meta Tag Previewer',
        description: 'Simulasikan tampilan website Anda di Google Search, WhatsApp, dan Media Sosial secara instan.',
        icon: Search,
        url: 'meta-previewer',
        status: 'active',
        categories: ['marketer', 'developer']
    },
    {
        id: 'seo-scanner',
        name: 'Technical SEO Scanner',
        description: 'Audit kesehatan teknis website Anda: Cek struktur Heading, Alt-Text Gambar, dan standar SEO Google.',
        icon: ShieldCheck,
        url: 'seo-scanner',
        status: 'active',
        categories: ['marketer', 'developer', 'business']
    },
    {
        id: 'palette',
        name: 'Palette Generator',
        description: 'Ekstrak palet warna profesional dari foto produk Anda untuk estetika brading yang konsisten.',
        icon: Palette,
        url: 'palette-generator',
        status: 'active',
        categories: ['designer']
    },
    {
        id: 'lorem',
        name: 'Indo Lorem Ipsum',
        description: 'Generator teks placeholder bahasa Indonesia (Jaksel, Formal, Santai) untuk desain mockup lokal.',
        icon: Type,
        url: 'indo-lorem',
        status: 'active',
        categories: ['designer', 'marketer']
    },
    {
        id: 'webp',
        name: 'WebP Converter',
        description: 'Optimasi gambar Anda ke format WebP super ringan. Tanpa upload server, 100% aman di browser.',
        icon: Image,
        url: 'webp-converter',
        status: 'active',
        categories: ['designer', 'developer']
    },
    {
        id: 'invoice',
        name: 'Invoice Generator',
        description: 'Buat invoice profesional dan estetik dalam hitungan detik. Download PDF siap kirim ke klien.',
        icon: FileText,
        url: 'invoice-generator',
        status: 'active',
        categories: ['business']
    },
    {
        id: 'ai-prompt',
        name: 'AI Image Prompt Builder',
        description: 'Racik prompt AI yang artistik dan detail secara instan untuk hasil gambar yang lebih estetik.',
        icon: Wand2,
        url: 'ai-prompt-builder',
        status: 'active',
        categories: ['designer', 'marketer']
    },
    {
        id: 'professional-rewriter',
        name: 'Professional Rewriter',
        description: 'Ubah pesan santai atau draft acak-acakan jadi email profesional atau proposal Upwork yang persuasif.',
        icon: Languages,
        url: 'professional-rewriter',
        status: 'active',
        categories: ['marketer', 'business']
    },
    {
        id: 'safe-zone',
        name: 'Social Media Safe Zone',
        description: 'Overlay preview untuk memastikan elemen desain Anda tidak tertutup UI Instagram Reels atau TikTok.',
        icon: Smartphone,
        url: 'safe-zone',
        status: 'active',
        categories: ['designer']
    },
    {
        id: 'wave-gen',
        name: 'SVG Wave & Blob Gen',
        description: 'Generate bentuk gelombang dan blob unik untuk background website. Copy kode SVG sekali klik.',
        icon: Waves,
        url: 'wave-generator',
        status: 'active',
        categories: ['developer', 'designer']
    },
    {
        id: 'qr-custom',
        name: 'QR Code Customizer',
        description: 'Bikin QR Code estetik dengan custom warna, sudut, dan logo. Cocok untuk branding premium.',
        icon: QrCode,
        url: 'qr-customizer',
        status: 'active',
        categories: ['business', 'marketer']
    },
    {
        id: 'roi-calc',
        name: 'Conversion ROI Calculator',
        description: 'Hitung potensi kenaikan profit bisnis Anda hanya dengan menaikkan 1% konversi website.',
        icon: TrendingUp,
        url: 'roi-calculator',
        status: 'active',
        categories: ['business', 'marketer']
    }
];

const filteredTools = computed(() => {
    if (activeCategory.value === 'all') return tools;
    return tools.filter(tool => tool.categories.includes(activeCategory.value));
});
</script>
