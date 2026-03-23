<template>
    <div class="min-h-screen bg-bg-primary pb-[120px]">
        <!-- Hero Section -->
        <header class="relative pt-[180px] pb-[100px] overflow-hidden border-b border-border-color">
            <!-- Background Glow -->
            <div
                class="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-primary/15 rounded-full blur-[80px] pointer-events-none">
            </div>

            <div class="container relative z-10">
                <SectionHeader badge="Expertise & Solutions" title="Elevate Your Business With High-End Development"
                    subtitle="Saya membantu founder dan pemilik bisnis membangun sistem digital yang scalable, otomatis, dan berorientasi pada hasil."
                    align="center" />

                <!-- Stats -->
                <div class="flex justify-center gap-[60px] mt-[60px] flex-wrap">
                    <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center gap-2">
                        <span
                            class="text-[clamp(2.5rem,5vw,3rem)] font-extrabold bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                            {{ stat.value }}
                        </span>
                        <span class="text-[0.9rem] text-text-secondary uppercase tracking-wider">{{ stat.label
                            }}</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Pricing Section -->
        <PricingSwitcher @consultation="isConsultationOpen = true" />

        <!-- Methodology Section -->
        <section class="py-[100px] bg-bg-primary/30">
            <div class="container">
                <SectionHeader badge="How I Work" title="My Design & Development Methodology"
                    subtitle="Proses kerja transparan dan terukur untuk memastikan kualitas terbaik di setiap tahap."
                    align="center" />

                <!-- Timeline Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-20 relative">
                    <!-- Base Connector line behind for desktop -->
                    <div class="hidden lg:block absolute top-14 left-[10%] w-[80%] h-[1px] bg-linear-to-r from-accent-primary/0 via-accent-primary/30 to-accent-primary/0 z-0"></div>
                    
                    <div v-for="(step, idx) in methodology" :key="step.title"
                        class="group flex flex-col items-start relative z-10 px-8 py-10 rounded-[32px] bg-white/[0.02] border border-border-color hover:bg-gradient-to-b hover:from-white/[0.04] hover:to-transparent hover:border-accent-primary/40 transition-all duration-500 backdrop-blur-xl hover:-translate-y-2 overflow-hidden">
                        
                        <!-- Glow effect -->
                        <div class="absolute -right-10 -top-10 w-32 h-32 bg-accent-primary/10 rounded-full blur-[40px] group-hover:bg-accent-primary/20 transition-all duration-500"></div>

                        <!-- Huge Faded Number -->
                        <div class="absolute top-4 right-6 text-7xl font-black text-white/[0.02] group-hover:text-accent-primary/[0.05] transition-colors duration-500 select-none">
                            0{{ idx + 1 }}
                        </div>

                        <!-- Number Indicator -->
                        <div class="w-12 h-12 bg-bg-secondary border border-border-color text-text-secondary group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary transition-all duration-500 rounded-2xl flex items-center justify-center font-bold text-lg mb-8 shadow-lg relative z-10">
                            {{ idx + 1 }}
                        </div>

                        <!-- Content -->
                        <div class="relative z-10">
                            <h4 class="mb-3 text-text-primary text-xl font-bold group-hover:text-accent-primary transition-colors">{{ step.title }}</h4>
                            <p class="text-[0.9rem] text-text-secondary leading-relaxed">{{ step.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-[120px]">
            <div class="container">
                <div class="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-20">
                    <!-- Left Info -->
                    <div class="flex flex-col">
                        <SectionHeader badge="FAQ" title="Common Questions"
                            subtitle="Punya pertanyaan? Berikut adalah beberapa jawaban untuk hal-hal yang sering ditanyakan klien."
                            align="left" />

                        <div
                            class="mt-10 p-8 bg-gradient-to-br from-accent-primary/[0.08] to-transparent border border-accent-primary/20 hover:border-accent-primary/50 transition-all duration-500 rounded-[32px] text-left backdrop-blur-xl relative overflow-hidden group shadow-lg">
                            <!-- Shine effect -->
                            <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-accent-primary/20 rounded-full blur-[50px] group-hover:bg-accent-primary/40 transition-all duration-500"></div>
                            
                            <div class="relative z-10">
                                <h4 class="mb-3 text-text-primary font-bold text-2xl tracking-tight">Kebutuhan spesifik?</h4>
                                <p class="text-[0.9rem] text-text-secondary mb-8 leading-relaxed">Jangan ragu menghubungi saya untuk merancang paket atau solusi khusus di luar FAQ.</p>
                                <BaseButton variant="primary" size="md" @click="isConsultationOpen = true"
                                    class="w-full justify-center shadow-[0_0_20px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow">
                                    Mulai Diskusi
                                </BaseButton>
                            </div>
                        </div>
                    </div>

                    <!-- Right FAQ List -->
                    <div class="flex flex-col gap-4">
                        <AccordionItem v-for="(item, idx) in allFaqs" :key="idx" :title="item.question"
                            :isOpen="activeFaqIndex === idx" @toggle="toggleFaq(idx)">
                            <p class="text-text-secondary">{{ item.answer }}</p>
                        </AccordionItem>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA -->
        <section class="py-[120px] px-4 md:px-0">
            <div class="container max-w-[1000px] mx-auto">
                <div
                    class="bg-gradient-to-b from-accent-primary/[0.1] to-transparent border border-accent-primary/30 rounded-[48px] p-10 md:p-24 text-center relative overflow-hidden backdrop-blur-3xl shadow-[0_0_80px_rgba(59,130,246,0.15)] group hover:border-accent-primary/50 transition-colors duration-700">
                    
                    <!-- Core Glow -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent-primary/20 transition-all duration-1000"></div>

                    <div class="relative z-10">
                        <h2 class="text-[clamp(2.5rem,5vw,4rem)] font-black mb-6 tracking-tight text-white leading-[1.1]">
                            Siap Elevasi Bisnis <br class="hidden md:block" />ke Level Berikutnya?
                        </h2>
                        <p class="text-[clamp(1rem,1.5vw,1.15rem)] text-text-secondary max-w-[600px] mx-auto mb-12 leading-relaxed">
                            Ayo berhenti membuang waktu dengan solusi template generik. Mari rancang dan bangun arsitektur digital memukau yang benar-benar mewakili kualitas bisnis Anda.
                        </p>
                        <div class="flex justify-center gap-4 flex-wrap">
                            <BaseButton variant="primary" size="lg" @click="isConsultationOpen = true"
                                class="inline-flex items-center gap-2 group/btn shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                                Jadwalkan Konsultasi
                                <ArrowRightIcon :size="18" class="group-hover/btn:translate-x-1 transition-transform" />
                            </BaseButton>
                            <BaseButton variant="secondary" size="lg" @click="$router.push('/projects')"
                                class="inline-flex items-center">
                                Jelajahi Portfolio
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- WhatsApp Modal -->
        <WhatsAppModal :isOpen="isConsultationOpen"
            initialMessage="Halo Kang Jessy! Saya tertarik untuk konsultasi mengenai project saya."
            category="Services Consultation" @close="isConsultationOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { commonServicesFaq } from '../../data/faqs/servicesFaq';
import SectionHeader from '../../components/ui/SectionHeader.vue';
import { BaseButton } from "@kangjessy/ui";
import WhatsAppModal from '../../components/modals/WhatsAppModal.vue';
import PricingSwitcher from '../../components/sections/PricingSwitcher.vue';
import AccordionItem from '../../components/ui/AccordionItem.vue';
import { useSEO } from '../../composables/useSEO';
import {
    ArrowRight as ArrowRightIcon
} from 'lucide-vue-next';

// SEO Setup
useSEO({
    title: 'High-End Development Services',
    description: 'Layanan jasa pengembangan website, aplikasi mobile, dan sistem SaaS professional oleh Kang Jessy.',
    url: '/services'
});

const isConsultationOpen = ref(false);

const stats = [
    { label: 'Successful Projects', value: '50+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Tech Stack Proficiency', value: '12+' },
    { label: 'Average Delivery', value: '14 Days' }
];

const methodology = [
    { title: 'Discovery', desc: 'Memahami visi, target market, dan requirement teknik untuk memastikan akurasi solusi.' },
    { title: 'Strategic Design', desc: 'Penyusunan wireframe, UI/UX, dan arsitektur database yang scalable.' },
    { title: 'Development', desc: 'Coding dengan standar industri tinggi menggunakan stack terbaru dan performa optimal.' },
    { title: 'Final Launch', desc: 'Testing ketat dan deployment ke infra terbaik untuk kestabilan jangka panjang.' }
];



const allFaqs = computed(() => {
    return commonServicesFaq;
});

const activeFaqIndex = ref<number | null>(null);
const toggleFaq = (index: number) => {
    activeFaqIndex.value = activeFaqIndex.value === index ? null : index;
};

const handleHashChange = () => {
    if (typeof window === 'undefined') return;
    const id = window.location.hash.slice(1);
    if (id) {
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
};

onMounted(() => {
    // Handle initial scroll/hash - Client side only behavior
    if (typeof window !== 'undefined') {
        if (window.location.hash) {
            handleHashChange();
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' } as any);
        }
    }
});
</script>

<style scoped>
/* Mobile responsive for methodology timeline */
@media (max-width: 1024px) {
    .flex.justify-between {
        flex-direction: column;
        gap: 2.5rem;
    }

    .flex-1.flex.flex-col.items-center {
        align-items: flex-start;
        text-align: left;
    }

    .w-\[calc\(100\%-20px\)\] {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .flex.gap-\[60px\] {
        gap: 1.875rem;
    }
}
</style>
