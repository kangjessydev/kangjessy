<template>
    <div class="min-h-screen bg-bg-primary pt-24 pb-20 overflow-hidden relative">
        <!-- Grid Pattern overlay -->
        <div class="absolute inset-x-0 top-0 h-[800px] opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 40px 40px;">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary"></div>
        </div>

        <div class="max-w-[1240px] mx-auto px-6 relative z-10">
            <!-- Header Section -->
            <div class="text-center mb-20" v-if="!selectedStageId">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 rounded-full border border-accent-primary/20 mb-6 group cursor-default">
                    <div class="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></div>
                    <span class="text-[0.65rem] font-black text-accent-primary uppercase tracking-widest">Growth Success Framework</span>
                </div>
                <h1 class="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-text-primary tracking-tighter leading-[1.1] mb-6">
                    Mulai Journey <br class="hidden md:block" /> Digital Bisnis Kamu
                </h1>
                <p class="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
                    Bukan sekadar website, kami merancang peta jalan strategis untuk memastikan setiap rupiah yang kamu investasikan menghasilkan dampak nyata bagi bisnis.
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-text-tertiary font-black uppercase tracking-widest text-[10px]">Loading Blueprint...</p>
            </div>

            <!-- Stage Selector (Grid Style inspired by BWA) -->
            <Transition enter-active-class="transition-all duration-700 ease-out"
                enter-from-class="opacity-0 translate-y-10 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition-all duration-500 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-10 scale-95">
                <div v-if="!selectedStageId && !loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button v-for="stage in roadmapData" :key="stage.id" @click="selectStage(stage.id)"
                        class="group relative bg-bg-secondary border border-border-color rounded-[24px] p-8 text-left transition-all duration-300 hover:border-accent-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                        
                        <!-- Accent Top Line -->
                        <div class="absolute top-0 left-8 right-8 h-[2px] bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                        <div class="w-14 h-14 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-secondary group-hover:text-accent-primary transition-all mb-8">
                            <component :is="getIcon(stage.icon)" :size="28" />
                        </div>

                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="text-[10px] font-bold text-accent-primary uppercase tracking-widest px-2 py-1 bg-accent-primary/5 border border-accent-primary/10 rounded-md">
                                    {{ stage.steps?.length || 0 }} Langkah
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-text-primary mb-3">{{ stage.name }}</h3>
                            <p class="text-text-secondary text-[0.8rem] leading-relaxed opacity-70">
                                {{ stage.description }}
                            </p>
                        </div>

                        <div class="mt-8 pt-6 border-t border-border-color flex items-center justify-between">
                            <span class="text-[11px] font-bold text-text-primary uppercase tracking-widest">Mulai Eksplorasi</span>
                            <ChevronRightIcon :size="16" class="text-accent-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                    
                    <!-- Consultation CTA -->
                    <div class="lg:col-span-4 p-8 sm:p-12 bg-bg-secondary border border-border-color rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 mt-12 relative overflow-hidden group">
                        <div class="relative z-10 text-center md:text-left">
                            <h4 class="text-2xl sm:text-3xl font-bold text-text-primary mb-3 tracking-tight">Bingung Mulai dari Mana?</h4>
                            <p class="text-text-secondary text-base sm:text-lg opacity-80 max-w-xl">
                                Ceritakan masalah bisnis kamu, biar saya bantu susunkan roadmap strategi digital yang paling pas buat kamu secara personal.
                            </p>
                        </div>
                        <BaseButton variant="primary" size="lg" icon-right="MessageCircle" class="rounded-xl! shadow-lg shadow-accent-primary/10 relative z-10" 
                            @click="popup.openModal(Popups.CHAT_WA, { initialMessage: 'Halo Kang Jessy, saya ingin konsultasi posisi digital bisnis saya.' })">
                            Konsultasi Sekarang
                        </BaseButton>
                    </div>
                </div>
            </Transition>

            <!-- Roadmap Timeline Detail View -->
            <div v-if="selectedStageId" class="animate-fade-in-up">
                <!-- Top Tabs (Navigation like Dicoding) -->
                <div class="sticky top-20 z-50 mb-12 py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-border-color -mx-6 px-6 hidden md:block">
                    <div class="max-w-5xl mx-auto flex items-center justify-center gap-2">
                        <button v-for="stage in roadmapData" :key="'tab-'+stage.id" 
                            @click="selectStage(stage.id)"
                            class="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            :class="selectedStageId === stage.id ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-105' : 'text-text-tertiary hover:bg-bg-secondary hover:text-text-primary'">
                            {{ stage.name }}
                        </button>
                    </div>
                </div>

                <!-- Back to List (Mobile/General) -->
                <button @click="selectedStageId = null" 
                    class="flex items-center gap-2 text-text-tertiary hover:text-accent-primary transition-colors text-[10px] font-black uppercase tracking-widest mb-12 group md:hidden">
                    <ArrowLeftIcon :size="14" class="group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </button>

                <!-- Stage Content Header -->
                <div class="max-w-4xl mx-auto mb-20 text-center md:text-left">
                    <div class="inline-flex items-center gap-3 px-3 py-1 bg-accent-secondary/10 border border-accent-secondary/20 rounded-lg text-[10px] font-black text-accent-secondary uppercase tracking-widest mb-6">
                        <component :is="getIcon(currentStage?.icon || '')" :size="14" />
                        {{ currentStage?.subtitle }}
                    </div>
                    <h2 class="text-[clamp(2rem,6vw,4rem)] font-bold text-text-primary tracking-tighter leading-[1.2] mb-6">
                        {{ currentStage?.name }} Roadmap
                    </h2>
                    <p class="text-text-secondary text-lg leading-relaxed opacity-80">
                        {{ currentStage?.description }}
                    </p>
                </div>

                <!-- Vertical Path (Rich Detailed Style) -->
                <div class="max-w-4xl mx-auto">
                    <div class="relative pl-12 md:pl-0">
                        <!-- Connecting Line -->
                        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-dashed border-l-2 border-border-color md:-translate-x-1/2"></div>

                        <div v-for="(step, index) in currentStage?.steps" :key="step.id" 
                            class="relative mb-24 last:mb-0 group/step">
                            
                            <!-- Step Marker (The Node) -->
                            <div class="absolute left-[-24px] md:left-1/2 top-0 md:-translate-x-1/2 z-20">
                                <div class="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-bg-secondary border-4 border-bg-primary shadow-2xl flex items-center justify-center text-accent-primary group-hover/step:scale-110 group-hover/step:border-accent-primary transition-all duration-500">
                                    <span class="text-xl md:text-2xl font-black">{{ index + 1 }}</span>
                                </div>
                            </div>

                            <!-- Content Row -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start">
                                <!-- Left side: Card (Alternating logic could be added, but keeping it consistent for now) -->
                                <div :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2 md:text-left'">
                                    <div class="bg-bg-secondary border border-border-color rounded-[24px] p-8 md:p-12 transition-all duration-300 relative overflow-hidden">
                                        <!-- Vertical Accent -->
                                        <div class="absolute top-0 left-0 w-[4px] h-full bg-accent-primary opacity-0 group-hover/step:opacity-100 transition-opacity duration-300"></div>

                                        <div class="relative z-10">
                                            <div class="flex items-center justify-between mb-8">
                                                <div class="flex items-center gap-4">
                                                    <div class="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-secondary group-hover/step:text-accent-primary transition-colors">
                                                        <component :is="getIcon(step.icon)" :size="24" />
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <span class="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em] mb-1">{{ step.type }}</span>
                                                        <span class="text-sm font-bold text-text-primary">{{ step.duration }}</span>
                                                    </div>
                                                </div>
                                                <div v-if="step.importance" 
                                                    class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border"
                                                    :class="{
                                                        'bg-red-500/10 text-red-500 border-red-500/20': step.importance === 'critical',
                                                        'bg-blue-500/10 text-blue-500 border-blue-500/20': step.importance === 'recommended',
                                                        'bg-gray-500/10 text-gray-500 border-gray-500/20': step.importance === 'optional'
                                                    }">
                                                    {{ step.importance }}
                                                </div>
                                            </div>

                                            <h3 class="text-2xl font-black text-text-primary mb-4 leading-tight group-hover/step:text-accent-primary transition-colors">{{ step.title }}</h3>
                                            
                                            <p class="text-sm text-text-secondary leading-relaxed mb-8 opacity-80">
                                                {{ step.description }}
                                            </p>

                                            <div v-if="step.rich_content" class="space-y-3 mb-8">
                                                <div v-for="item in step.rich_content" :key="item" class="flex items-center gap-3">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-accent-primary"></div>
                                                    <span class="text-xs font-medium text-text-primary/90">{{ item }}</span>
                                                </div>
                                            </div>

                                            <BaseButton variant="outline" size="md" class="w-full rounded-xl! font-bold" 
                                                :to="step.link">
                                                {{ step.action_label || 'Lihat Detail' }}
                                                <ArrowRightIcon :size="16" class="ml-2 group-hover/step:translate-x-1 transition-transform" />
                                            </BaseButton>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right side: Description/Context (Desktop Only) -->
                                <div :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1 md:text-right md:pr-4'">
                                    <div class="hidden md:block pt-4 space-y-4">
                                        <div class="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em]">Phase {{ index + 1 }}</div>
                                        <div v-if="step.content" class="text-lg text-text-secondary leading-relaxed font-medium italic opacity-70 border-l-4 border-accent-primary/20 pl-6 h-full flex items-center"
                                            :class="index % 2 !== 0 ? 'md:border-l-0 md:border-r-4 md:pl-0 md:pr-6 md:text-right' : ''">
                                            "{{ step.content }}"
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Final Success Milestone -->
                        <div class="relative pt-12 text-center">
                            <div class="flex flex-col items-center">
                                <div class="w-20 h-20 rounded-[24px] bg-accent-primary flex items-center justify-center text-white shadow-[0_10px_40px_rgba(59,130,246,0.3)] mb-10">
                                    <RocketIcon :size="32" />
                                </div>
                                <h4 class="text-3xl font-bold text-text-primary mb-4 tracking-tight">Kemenangan Terukur!</h4>
                                <p class="text-text-secondary max-w-md mx-auto leading-relaxed">Kamu telah mengamankan fondasi di fase {{ currentStage?.name }}. Langkah berikutnya adalah eksekusi teknis yang presisi.</p>
                                <BaseButton variant="primary" size="lg" class="mt-10 rounded-xl shadow-lg shadow-accent-primary/10" @click="popup.openModal(Popups.CHAT_WA)">Hubungi Untuk Eksekusi</BaseButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as LucideIcons from 'lucide-vue-next';
import { 
    ChevronRight as ChevronRightIcon, 
    ArrowLeft as ArrowLeftIcon, 
    Rocket as RocketIcon,
    ArrowRight as ArrowRightIcon,
    HelpCircle
} from 'lucide-vue-next';
import { blueprintService, type RoadmapStage } from '../../services/blueprintService';
import { BaseButton } from "@kangjessy/ui";
import { usePopupManager, Popups } from '../../composables/usePopupManager';
import { useSEO } from '../../composables/useSEO';

const popup = usePopupManager();
const route = useRoute();
const router = useRouter();

const loading = ref(true);
const roadmapData = ref<RoadmapStage[]>([]);
const selectedStageId = ref<string | null>(null);

const currentStage = computed(() => 
    roadmapData.value.find((s: RoadmapStage) => s.id === selectedStageId.value)
);

// Helper to get Lucide Icon from string name
const getIcon = (name: string) => {
    return (LucideIcons as any)[name] || HelpCircle;
};

// SEO Setup
useSEO({
    title: computed(() => currentStage.value ? `${currentStage.value.name} - The Blueprint` : 'The Blueprint | Digital Business Roadmap'),
    description: computed(() => currentStage.value?.description || 'Peta jalan strategis untuk membangun bisnis digital auto-pilot. Dari start-up hingga enterprise.'),
    url: computed(() => selectedStageId.value ? `/blueprint?stage=${selectedStageId.value}` : '/blueprint')
});

const selectStage = (id: string) => {
    selectedStageId.value = id;
    router.push({ query: { stage: id } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// const handleStepAction = (step: any) => {
//     if (step.link && step.link.startsWith('http')) {
//         window.open(step.link, '_blank');
//     } else if (step.link) {
//         router.push(step.link);
//     }
// };

const fetchBlueprint = async () => {
    loading.value = true;
    try {
        const data = await blueprintService.getAllStages();
        roadmapData.value = data;
        
        // Handle initial stage from query param after data is loaded
        const stageFromQuery = route.query.stage;
        const stageId = Array.isArray(stageFromQuery) ? stageFromQuery[0] : stageFromQuery;
        if (stageId && data.find((s: RoadmapStage) => s.id === stageId)) {
            selectedStageId.value = stageId as string;
        }
    } catch (err) {
        console.error('Failed to load blueprint:', err);
    } finally {
        loading.value = false;
    }
};

// Handle initial stage from query param
onMounted(fetchBlueprint);

// Watch for route changes to update stage
watch(() => route.query.stage, (newStage) => {
    const stageId = Array.isArray(newStage) ? newStage[0] : newStage;
    if (stageId && roadmapData.value.find((s: RoadmapStage) => s.id === stageId)) {
        selectedStageId.value = stageId as string;
    } else if (!stageId) {
        selectedStageId.value = null;
    }
});
</script>

<style scoped>
.bg-dashed {
    background-image: linear-gradient(to bottom, var(--border-color) 40%, rgba(255, 255, 255, 0) 0%);
    background-position: left;
    background-size: 2px 12px;
    background-repeat: repeat-y;
}

/* Custom shadow for premium feel */
.shadow-2xl {
    --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

@media (max-width: 768px) {
    .bg-dashed {
        left: 24px;
    }
}
</style>
