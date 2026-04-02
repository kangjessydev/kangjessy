<template>
    <section id="why-choose" class="bg-bg-primary py-32">
        <div class="container mx-auto px-4">
            <SectionHeader title="Why Choose Me" subtitle="Solusi nyata. Sistem bersih. Hasil serius.">
                <template #title>
                    Kenapa <span
                        class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Beda?</span>
                </template>
            </SectionHeader>

            <!-- Features Section -->
            <div class="relative">
                <!-- Mobile View: Dual-Row Infinity Sliders -->
                <div class="md:hidden flex flex-col gap-2">
                    <!-- Row 1: Left to Right -->
                    <div class="overflow-hidden py-2 flex relative group/row1">
                        <div
                            class="flex animate-[infinityScroll_25s_linear_infinite] group-hover/row1:[animation-play-state:paused] gap-4 items-center whitespace-nowrap px-4">
                            <article v-for="(feature, index) in [...features.slice(0, 3), ...features.slice(0, 3)]"
                                :key="'f1-' + index"
                                class="w-full max-w-[280px] shrink-0 bg-bg-secondary border border-border-color rounded-2xl p-6 shadow-sm flex flex-col transition-transform duration-300">
                                <div
                                    class="w-10 h-10 mb-4 bg-bg-tertiary rounded-xl flex items-center justify-center text-accent-primary">
                                    <component :is="feature.icon" :size="22" />
                                </div>
                                <h3
                                    class="mb-2 text-[clamp(0.875rem,2vw,1rem)] font-bold text-text-primary whitespace-normal">
                                    {{ feature.title }}
                                </h3>
                                <p
                                    class="text-text-secondary leading-normal text-[clamp(0.75rem,1.5vw,0.875rem)] whitespace-normal">
                                    {{ feature.description }}
                                </p>
                            </article>
                        </div>
                    </div>

                    <!-- Row 2: Right to Left -->
                    <div class="overflow-hidden py-2 flex relative group/row2">
                        <div
                            class="flex animate-[infinityScrollReverse_30s_linear_infinite] group-hover/row2:[animation-play-state:paused] gap-4 items-center whitespace-nowrap px-4">
                            <article v-for="(feature, index) in [...features.slice(3), ...features.slice(3)]"
                                :key="'f2-' + index"
                                class="w-full max-w-[280px] shrink-0 bg-bg-secondary border border-border-color rounded-2xl p-6 shadow-sm flex flex-col transition-transform duration-300">
                                <div
                                    class="w-10 h-10 mb-4 bg-bg-tertiary rounded-xl flex items-center justify-center text-accent-primary">
                                    <component :is="feature.icon" :size="22" />
                                </div>
                                <h3
                                    class="mb-2 text-[clamp(0.875rem,2vw,1rem)] font-bold text-text-primary whitespace-normal">
                                    {{ feature.title }}
                                </h3>
                                <p
                                    class="text-text-secondary leading-normal text-[clamp(0.75rem,1.5vw,0.875rem)] whitespace-normal">
                                    {{ feature.description }}
                                </p>
                            </article>
                        </div>
                    </div>
                </div>

                <!-- Desktop View: Grid Layout -->
                <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <article v-for="(feature, index) in features" :key="'desk-' + index"
                        class="group bg-bg-secondary border border-border-color rounded-2xl p-8 transition-all duration-300 hover:border-accent-primary hover:-translate-y-1 shadow-sm">
                        <div
                            class="w-12 h-12 mb-6 bg-bg-tertiary rounded-xl flex items-center justify-center text-accent-primary transition-colors group-hover:bg-accent-primary group-hover:text-white">
                            <component :is="feature.icon" :size="26" />
                        </div>
                        <h3 class="mb-3 text-[clamp(1rem,2vw,1.25rem)] font-bold text-text-primary">{{ feature.title }}
                        </h3>
                        <p class="text-text-secondary leading-relaxed text-[clamp(0.875rem,1.5vw,1rem)]">{{
                            feature.description }}
                        </p>
                    </article>
                </div>
            </div>

            <!-- Tech Stack: Infinity Loop (Always visible, but optimized) -->
            <footer class="mt-16 md:mt-20 overflow-hidden">
                <!-- <h3
                    class="mb-8 text-[clamp(0.7rem,1.5vw,0.75rem)] uppercase tracking-[0.2em] font-bold text-text-tertiary text-center">
                    Tech Stack I Master</h3> -->

                <div class="flex flex-col gap-4 md:gap-6">
                    <!-- Row 1 -->
                    <div class="flex relative overflow-hidden group/t1 py-4">
                        <div
                            class="flex animate-[infinityScroll_35s_linear_infinite] group-hover/t1:[animation-play-state:paused] gap-4 items-center whitespace-nowrap px-4">
                            <div v-for="(tech, i) in [...techStackItems.slice(0, 9), ...techStackItems.slice(0, 9)]"
                                :key="'t1-' + i"
                                class="flex items-center gap-3 px-5 py-2.5 md:px-7 md:py-3 bg-bg-secondary border border-border-color hover:border-accent-primary hover:text-accent-primary hover:-translate-y-1 transition-all duration-300 cursor-default rounded-xl text-[clamp(0.8rem,1.5vw,0.9rem)] font-bold text-text-secondary shadow-sm group/badge shrink-0">
                                <TechLogo :name="tech.name" :size="18"
                                    class="text-text-tertiary group-hover/badge:text-accent-primary transition-colors" />
                                <span>{{ tech.name }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Row 2 -->
                    <div class="flex relative overflow-hidden group/t2 py-4">
                        <div
                            class="flex animate-[infinityScrollReverse_40s_linear_infinite] group-hover/t2:[animation-play-state:paused] gap-4 items-center whitespace-nowrap px-4">
                            <div v-for="(tech, i) in [...techStackItems.slice(9), ...techStackItems.slice(9)]"
                                :key="'t2-' + i"
                                class="flex items-center gap-3 px-5 py-2.5 md:px-7 md:py-3 bg-bg-secondary border border-border-color hover:border-accent-primary hover:text-accent-primary hover:-translate-y-1 transition-all duration-300 cursor-default rounded-xl text-[clamp(0.8rem,1.5vw,0.9rem)] font-bold text-text-secondary shadow-sm group/badge shrink-0">
                                <TechLogo :name="tech.name" :size="18"
                                    class="text-text-tertiary group-hover/badge:text-accent-primary transition-colors" />
                                <span>{{ tech.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    Zap, Briefcase, Layout, ShieldCheck, Cpu, MessageSquare
} from 'lucide-vue-next';
import SectionHeader from '../../ui/SectionHeader.vue';
import TechLogo from '../../ui/TechLogo.vue';

const features = [
    { icon: Zap, title: 'Eksekusi Anti-Lama', description: 'Gak perlu nunggu berbulan-bulan. Kita kerjain cepat dan hasilnya langsung bisa dipakai — tanpa kompromi kualitas.' },
    { icon: Briefcase, title: 'Website yang Kerja, Bukan Cuma Tampil', description: 'Bukan cuma desain cantik — tapi sistem fitur yang dirancang khusus untuk mendatangkan pelanggan dan menghasilkan pendapatan nyata.' },
    { icon: Layout, title: 'Desain yang Mengajak Beli', description: 'Tampilan modern yang memandu pengunjung jadi pelanggan setia — dengan alur yang mulus dan nyaman di semua perangkat.' },
    { icon: ShieldCheck, title: 'Aman & Siap Scale', description: 'Sistem tangguh yang tidak gampang tumbang. Siap menampung trafik tinggi seiring bisnis kamu makin berkembang.' },
    { icon: Cpu, title: 'Biar Sistemnya yang Kerja Keras', description: 'Biar sistem yang capek, kamu jangan. Kita otomatisasi seluruh alur kerja manual yang menguras energi dan waktu kamu.' },
    { icon: MessageSquare, title: 'Diskusi Tanpa Sekat', description: 'Bebas dari ribetnya CS atau sales. Kamu diskusi langsung dengan yang mengerjakan kodenya — lebih cepat, lebih jelas, lebih tepat sasaran.' }
];

const techStackItems = [
    { name: 'Laravel' },
    { name: 'Vue.js' },
    { name: 'Filament' },
    { name: 'Go' },
    { name: 'Javascript' },
    { name: 'PHP' },
    { name: 'Tailwind CSS' },
    { name: 'n8n' },
    { name: 'Google Apps Script' },
    { name: 'MySQL' },
    { name: 'PostgreSQL' },
    { name: 'Docker' },
    { name: 'Wordpress' },
    { name: 'Vite' },
    { name: 'Git/Github' },
    { name: 'Vercel' },
    { name: 'CPanel' }
];
</script>
