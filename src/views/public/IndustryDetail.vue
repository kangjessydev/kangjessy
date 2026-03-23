<template>
    <div v-if="industry" class="min-h-screen bg-bg-primary pb-[120px] font-sans">
        <!-- Hero Section -->
        <header class="relative pt-[160px] pb-[80px] md:pb-[120px] overflow-hidden">
            <!-- Grid Pattern (Subtle) -->
            <div class="absolute inset-x-0 top-0 h-screen opacity-[0.05] pointer-events-none" 
                 style="background-image: linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px); background-size: 80px 80px;">
                <div class="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-bg-primary to-transparent"></div>
            </div>

            <div class="container relative z-10">
                <div class="max-w-[1200px] mx-auto">
                    <div class="flex flex-col lg:flex-row gap-20 items-center">
                        <!-- Hero Text -->
                        <div class="flex-1 text-left">
                            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full border border-accent-primary/20 mb-8">
                                <component :is="industry.icon" :size="14" class="text-accent-primary" />
                                <span class="text-[0.65rem] font-black text-accent-primary uppercase tracking-[0.2em]">{{ industry.badge }}</span>
                            </div>
                            
                            <h1 class="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white tracking-tighter leading-[1.1] mb-8">
                                {{ industry.heroTitle }}
                            </h1>
                            
                            <p class="text-text-secondary text-lg md:text-xl leading-relaxed opacity-80 mb-10 max-w-xl">
                                {{ industry.heroSubtitle }}
                            </p>

                            <div class="flex gap-4">
                                <BaseButton variant="primary" size="lg" @click="popup.openModal(Popups.CHAT_WA, { initialMessage: industry.waMessage })"
                                    class="h-14 px-8 rounded-xl! font-black shadow-xl shadow-accent-primary/20">
                                    Konsultasi Sekarang
                                </BaseButton>
                            </div>
                        </div>

                        <!-- Hero Visual -->
                        <div class="flex-1 w-full relative">
                            <div class="relative bg-bg-secondary border border-border-color rounded-[32px] overflow-hidden shadow-2xl group cursor-pointer" @click="showVideoModal = !!industry.heroVideoUrl">
                                <img :src="industry.heroImage" :alt="industry.name" class="w-full h-auto object-cover transform scale-[1.01] transition-transform duration-700 group-hover:scale-102" />
                                
                                <div v-if="industry.heroVideoUrl" class="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                                    <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30 transform transition-transform group-hover:scale-110">
                                        <PlayCircle :size="32" />
                                    </div>
                                    <div class="absolute bottom-6 left-6 text-white text-[10px] font-black uppercase tracking-[0.3em] bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                                        Watch System Preview
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Business Insight -->
        <section class="py-[120px] bg-bg-secondary/30">
            <div class="container max-w-[1100px]">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div class="lg:col-span-4 lg:sticky lg:top-40">
                        <span class="text-[0.6rem] font-black text-text-tertiary uppercase tracking-[0.4em] mb-4 block">The Business Gap</span>
                        <h2 class="text-3xl font-black text-white leading-tight">MENGAPA SISTEM ANDA HARUS BERBEDA?</h2>
                        <div class="w-20 h-1 bg-accent-primary mt-8"></div>
                    </div>

                    <div class="lg:col-span-8 space-y-12">
                        <div class="space-y-6">
                            <h3 class="text-xl font-bold text-rose-400 flex items-center gap-3">
                                <AlertCircle :size="20" /> Masalah Yang Sering Terjadi
                            </h3>
                            <p class="text-2xl font-bold text-white leading-relaxed opacity-90 border-l-4 border-rose-500/30 pl-8">
                                "{{ industry.businessInsight.problem }}"
                            </p>
                        </div>

                        <div class="space-y-6">
                            <h3 class="text-xl font-bold text-emerald-400 flex items-center gap-3">
                                <Target :size="20" /> Solusi Transformasi Kami
                            </h3>
                            <p class="text-2xl font-bold text-white leading-relaxed opacity-90 border-l-4 border-emerald-500/30 pl-8">
                                "{{ industry.businessInsight.solution }}"
                            </p>
                        </div>

                        <div class="p-8 bg-accent-primary/5 border border-accent-primary/10 rounded-[24px]">
                            <p class="text-text-secondary italic leading-relaxed">
                                {{ industry.businessInsight.highlight }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dynamic Core Modules -->
        <section class="py-[120px]">
            <div class="container">
                <div class="max-w-[1000px] mx-auto text-center mb-24">
                    <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">The High-Impact Ecosystem</h2>
                    <p class="text-text-secondary text-lg opacity-80 max-w-2xl mx-auto">Kami membangun sistem inti yang relevan secara fungsional untuk pertumbuhan skala besar.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1300px] mx-auto">
                    <div v-for="(module, idx) in industry.coreModules" :key="idx" class="group relative bg-bg-secondary border border-border-color rounded-[40px] p-10 transition-all hover:border-accent-primary/40 overflow-hidden">
                        <span class="absolute -top-4 -right-4 text-9xl font-black text-white/5 pointer-events-none">{{ idx + 1 }}</span>
                        
                        <div class="relative z-10">
                            <div class="w-16 h-16 rounded-2xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-primary mb-10 group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                <component :is="module.icon" :size="28" />
                            </div>
                            <h4 class="text-xl font-black text-white mb-4 uppercase tracking-tight">{{ module.title }}</h4>
                            <p class="text-text-secondary leading-relaxed opacity-70">
                                {{ module.desc }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ROI & Benefits Section -->
        <section class="py-[120px] border-t border-border-color">
            <div class="container">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-[1200px] mx-auto">
                    <!-- Left: Metrics -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="benefit in industry.roiBenefits" :key="benefit.title" class="bg-bg-secondary border border-border-color rounded-[32px] p-8 group transition-all hover:bg-white/[0.02]">
                            <div class="text-3xl font-black text-accent-primary mb-2">{{ benefit.metric }}</div>
                            <h4 class="text-sm font-black text-white uppercase tracking-widest mb-4 opacity-70">{{ benefit.title }}</h4>
                            <p class="text-text-secondary text-xs leading-relaxed opacity-60">{{ benefit.desc }}</p>
                        </div>
                        <div class="bg-accent-primary/5 border border-dashed border-accent-primary/30 rounded-[32px] p-8 flex flex-col justify-center items-center text-center">
                            <Sparkles class="text-accent-primary mb-4" :size="24" />
                            <h4 class="text-sm font-black text-white uppercase">Custom ROI Report</h4>
                        </div>
                    </div>

                    <!-- Right: ROI Narrative -->
                    <div class="space-y-10">
                        <header>
                            <span class="text-[0.65rem] font-bold text-accent-primary/60 uppercase tracking-[0.4em] mb-4 block">Business Outcome</span>
                            <h2 class="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-10 uppercase">INVESTASI <br />BERDAMPAK NYATA.</h2>
                        </header>
                        <p class="text-lg text-text-secondary opacity-80 leading-relaxed font-medium">
                            Sebuah sistem digital dikatakan sukses jika ia menjadi **profit-center**. Kita berfokus pada metrik peningkatan revenue yang bisa diukur dan dipertanggungjawabkan.
                        </p>
                        <BaseButton variant="outline" @click="popup.openModal(Popups.CHAT_WA, { initialMessage: 'Halo Kang Jessy, saya ingin membahas estimasi biaya & estimasi ROI untuk bisnis saya.' })"
                            class="h-14 px-8 border-white/20 text-white hover:bg-white/5 rounded-xl!">
                            DISKUSIKAN ROI BISNIS ANDA
                            <ArrowRight class="ml-2" :size="18" />
                        </BaseButton>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final Vision Large CTA -->
        <section class="py-[60px] px-4 md:px-0">
            <div class="container max-w-[1200px] mx-auto text-center">
                <div class="bg-accent-primary rounded-[64px] p-12 md:p-32 text-bg-primary relative overflow-hidden group shadow-2xl">
                    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 30px 30px;"></div>
                    
                    <div class="relative z-10 flex flex-col items-center">
                        <div class="w-16 h-16 bg-bg-primary rounded-full mb-10 flex items-center justify-center text-accent-primary animate-bounce">
                            <Rocket :size="32" />
                        </div>
                        <h2 class="text-4xl md:text-7xl font-black tracking-tighter mb-10 leading-[1.1]">
                            DOMAINASI PASAR <br />DIMULAI DARI SINI.
                        </h2>
                        <BaseButton @click="popup.openModal(Popups.CHAT_WA, { initialMessage: industry.waMessage })"
                            class="h-14 px-12 bg-bg-primary text-white rounded-xl! text-lg font-black hover:scale-105 transition-transform uppercase tracking-widest">
                            Hubungi Saya Sekarang
                        </BaseButton>
                    </div>
                </div>
            </div>
        </section>

        <!-- Video Modal -->
        <div v-if="showVideoModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div @click="showVideoModal = false" class="absolute inset-0 bg-black/95 backdrop-blur-xl"></div>
            
            <div class="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20">
                <!-- Loading State -->
                <div v-if="isVideoLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary">
                    <div class="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin mb-4"></div>
                    <span class="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Preparing System Preview...</span>
                </div>

                <iframe 
                    class="w-full h-full transition-opacity duration-700"
                    :class="isVideoLoading ? 'opacity-0' : 'opacity-100'"
                    :src="industry.heroVideoUrl" 
                    title="Industry Preview" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                    @load="isVideoLoading = false">
                </iframe>
                
                <button @click="showVideoModal = false" class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                    <X :size="24" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { 
    PlayCircle,
    X,
    Target,
    AlertCircle,
    ArrowRight,
    Rocket,
    Sparkles,
    Check
} from 'lucide-vue-next';
import { BaseButton } from "@kangjessy/ui";
import { industryData } from '../../data/config/industryData';
import { usePopupManager, Popups } from '../../composables/usePopupManager';
import { useSEO } from '../../composables/useSEO';

const route = useRoute();
const popup = usePopupManager();
const showVideoModal = ref(false);
const isVideoLoading = ref(true);

// Watch for modal open and reset loading
watch(showVideoModal, (newVal) => {
    if (newVal) isVideoLoading.value = true;
});

const industrySlug = computed(() => route.params.slug as string);
const industry = computed(() => industryData[industrySlug.value]);

// Silence unused warnings for template usage (some compilers need this)
// @ts-ignore
const _templateUsed = [Check];

useSEO({
    title: computed(() => industry.value ? `${industry.value.name} Solutions | Kang Jessy` : 'Industry Solutions'),
    description: computed(() => industry.value?.description || 'Solusi digital spesifik industri.'),
    url: computed(() => `/industry/${industrySlug.value}`)
});
</script>

<style scoped>
.container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto;
}
</style>
