<template>
    <div class="min-h-screen bg-bg-primary pb-[120px]">
        <!-- Hero Section -->
        <header class="relative pt-[180px] pb-[100px] overflow-hidden border-b border-border-color">
            <!-- Grid Pattern overlay -->
            <div class="absolute inset-x-0 top-0 h-[800px] opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 40px 40px;">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary"></div>
            </div>

            <div class="container relative z-10">
                <SectionHeader badge="Expertise & Solutions" title="Elevate Your Business With High-End Development"
                    subtitle="Saya membantu founder dan pemilik bisnis membangun sistem digital yang scalable, otomatis, dan berorientasi pada hasil."
                    align="center" />

                <!-- Stats -->
                <div class="flex justify-center gap-[60px] mt-[60px] flex-wrap">
                    <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center gap-2">
                        <span
                            class="text-[clamp(2.5rem,5vw,3rem)] font-extrabold text-text-primary tracking-tight">
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
                        class="group flex flex-col items-start px-8 py-10 rounded-[20px] bg-bg-secondary border border-border-color hover:-translate-y-1 hover:border-border-color hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 relative overflow-hidden">
                        
                        <!-- Accent Line -->
                        <div class="absolute top-0 left-8 right-8 h-[2px] bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                        <!-- Header -->
                        <div class="flex flex-row items-center gap-5 mb-6">
                            <!-- Number Indicator -->
                            <div class="w-12 h-12 bg-bg-primary border border-border-color text-text-secondary group-hover:text-accent-primary transition-colors duration-300 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                                0{{ idx + 1 }}
                            </div>
                            <h4 class="text-text-primary text-lg font-bold">{{ step.title }}</h4>
                        </div>

                        <!-- Content -->
                        <div>
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
                            class="mt-10 p-8 border border-border-color bg-bg-secondary rounded-[20px] text-left">
                            <h4 class="mb-3 text-text-primary font-bold text-xl">Kebutuhan spesifik?</h4>
                            <p class="text-[0.9rem] text-text-secondary mb-8 leading-relaxed">Jangan ragu menghubungi saya untuk merancang paket atau solusi khusus di luar skema FAQ yang tersedia.</p>
                            <BaseButton variant="primary" size="md" @click="isConsultationOpen = true"
                                class="w-full justify-center">
                                Mulai Diskusi
                            </BaseButton>
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
                    class="bg-bg-secondary border border-border-color rounded-[32px] p-10 md:p-20 text-center">
                    
                    <h2 class="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold mb-6 tracking-tight text-white leading-[1.1]">
                        Siap Elevasi Bisnis <br class="hidden md:block" />ke Level Berikutnya?
                    </h2>
                    <p class="text-[clamp(1rem,1.5vw,1.15rem)] text-text-secondary max-w-[600px] mx-auto mb-12 leading-relaxed">
                        Ayo mulai dengan konsultasi bebas biaya. Mari bahas ruang lingkup proyek, target waktu, dan pastikan kita sejalan secara pemikiran.
                    </p>
                    <div class="flex justify-center gap-4 flex-wrap">
                        <BaseButton variant="primary" size="lg" @click="isConsultationOpen = true"
                            class="inline-flex items-center gap-2 group/btn">
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
