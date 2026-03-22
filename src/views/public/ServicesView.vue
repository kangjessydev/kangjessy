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

        <!-- Services Grid (Bento Style from Home) -->
        <BentoServices :show-header="false" padding-class="py-[100px]" />

        <!-- Calculator Section -->
        <div id="calculator">
            <CostCalculator />
        </div>

        <!-- Methodology Section -->
        <section class="py-[100px] bg-bg-primary/30">
            <div class="container">
                <SectionHeader badge="How I Work" title="My Design & Development Methodology"
                    subtitle="Proses kerja transparan dan terukur untuk memastikan kualitas terbaik di setiap tahap."
                    align="center" />

                <!-- Timeline -->
                <div class="flex justify-between mt-20 relative">
                    <div v-for="(step, idx) in methodology" :key="step.title"
                        class="flex-1 flex flex-col items-center text-center relative z-10">
                        <!-- Number -->
                        <div
                            class="w-12 h-12 bg-accent-primary text-white rounded-full flex items-center justify-center font-extrabold text-[clamp(1.1rem,2vw,1.3rem)] mb-6 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                            {{ idx + 1 }}
                        </div>

                        <!-- Content -->
                        <div
                            class="bg-white/[0.02] border border-border-color rounded-[20px] p-6 w-[calc(100%-20px)] backdrop-blur-[10px]">
                            <h4 class="mb-3 text-text-primary text-[clamp(1rem,1.5vw,1.125rem)] font-semibold">{{ step.title }}</h4>
                            <p class="text-[0.85rem] text-text-secondary leading-relaxed">{{ step.desc }}</p>
                        </div>

                        <!-- Connector -->
                        <div v-if="idx < methodology.length - 1"
                            class="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-linear-to-r from-accent-primary to-border-color opacity-30">
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
                            class="mt-10 p-[30px] bg-white/[0.02] border border-border-color rounded-[20px] text-center backdrop-blur-[10px]">
                            <p class="mb-5 text-text-primary font-semibold">Punya kebutuhan spesifik?</p>
                            <BaseButton variant="primary" size="md" @click="isConsultationOpen = true"
                                class="w-full justify-center">
                                Diskusi Sekarang
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
        <section class="py-[100px]">
            <div class="container">
                <div
                    class="bg-white/[0.03] border border-border-color rounded-[40px] p-20 text-center relative overflow-hidden backdrop-blur-[20px]">
                    <h2 class="text-[clamp(2rem,5vw,3rem)] font-extrabold mb-5 tracking-[-0.02em] text-text-primary">
                        Ready to Start Your Next Big Project?
                    </h2>
                    <p class="text-[clamp(1.1rem,2vw,1.2rem)] text-text-secondary max-w-[600px] mx-auto mb-10">
                        Mari bangun sistem digital yang akan membawa bisnis Anda ke level berikutnya.
                    </p>
                    <div class="flex justify-center gap-5 flex-wrap">
                        <BaseButton variant="primary" size="lg" @click="isConsultationOpen = true"
                            class="inline-flex items-center gap-2">
                            Book Free Consultation
                            <ArrowRightIcon :size="18" />
                        </BaseButton>
                        <BaseButton variant="secondary" size="lg" @click="$router.push('/projects')">
                            View Portfolio
                        </BaseButton>
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
import BentoServices from '../../components/sections/home/BentoServices.vue';
import { BaseButton } from "@kangjessy/ui";
import WhatsAppModal from '../../components/modals/WhatsAppModal.vue';
import CostCalculator from '../../components/sections/CostCalculator.vue';
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
