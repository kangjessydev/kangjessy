<template>
    <div class="min-h-screen bg-bg-primary pb-[120px]">
        <!-- Hero Section -->
        <header class="relative pt-[180px] pb-[80px] overflow-hidden border-b border-border-color">
            <!-- Grid Pattern -->
            <div class="absolute inset-x-0 top-0 h-[800px] opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 40px 40px;">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary"></div>
            </div>

            <div class="container relative z-10">
                <SectionHeader 
                    badge="Industries & Solutions" 
                    title="Digital Transformation Across High-Impact Industries" 
                    subtitle="Saya membangun solusi digital spesifik untuk tantangan unik di setiap industri. Bukan sekadar website, tapi instrumen bisnis yang serius."
                    align="center" 
                />
            </div>
        </header>

        <!-- Industries Grid -->
        <section class="py-[100px]">
            <div class="container max-w-[1100px] mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <router-link 
                        v-for="industry in Object.values(industryData)" 
                        :key="industry.slug"
                        :to="`/industry/${industry.slug}`"
                        class="group relative bg-bg-secondary border border-border-color rounded-[24px] p-10 flex flex-col h-full hover:border-accent-primary/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        <!-- Accent Top Line -->
                        <div class="absolute top-0 left-10 right-10 h-[2px] bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                        <div class="mb-10 w-16 h-16 rounded-2xl bg-bg-primary border border-border-color flex items-center justify-center text-text-secondary group-hover:text-accent-primary transition-colors duration-300">
                            <component :is="industry.icon" :size="32" />
                        </div>

                        <div class="flex-1">
                            <h3 class="text-2xl font-bold text-text-primary mb-4">{{ industry.name }}</h3>
                            <p class="text-[0.95rem] text-text-secondary leading-relaxed opacity-80">
                                {{ industry.description }}
                            </p>
                        </div>

                        <div class="mt-12 pt-8 border-t border-border-color flex items-center justify-between">
                            <span class="text-[11px] font-bold text-text-primary uppercase tracking-widest">Eksplorasi Solusi</span>
                            <div class="w-8 h-8 rounded-full bg-accent-primary/5 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all">
                                <ArrowRightIcon :size="16" />
                            </div>
                        </div>
                    </router-link>
                </div>

                <!-- Consultation Box -->
                <div class="mt-20 p-12 bg-bg-secondary border border-border-color rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div class="text-center md:text-left">
                        <h4 class="text-2xl font-bold text-text-primary mb-3">Industri Anda belum terdaftar di atas?</h4>
                        <p class="text-text-secondary max-w-xl">
                            Tenang, sistem pengembangan saya bersifat agnostik dan scalable untuk industri apa pun. Mari diskusikan tantangan spesifik bisnis Anda.
                        </p>
                    </div>
                    <BaseButton variant="primary" size="lg" @click="popup.openModal(Popups.CHAT_WA)" class="rounded-xl! shadow-lg shadow-accent-primary/10">
                        Diskusi Kustom Project
                    </BaseButton>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight as ArrowRightIcon } from 'lucide-vue-next';
import SectionHeader from '../../components/ui/SectionHeader.vue';
import { BaseButton } from "@kangjessy/ui";
import { industryData } from '../../data/config/industryData';
import { usePopupManager, Popups } from '../../composables/usePopupManager';
import { useSEO } from '../../composables/useSEO';

const popup = usePopupManager();

useSEO({
    title: 'Industries & Specialized Solutions | Digital Architect',
    description: 'Solusi digital high-end khusus untuk industri Dental, Architeture, dan E-learning (LMS).',
    url: '/industries'
});
</script>
