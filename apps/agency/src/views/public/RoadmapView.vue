<template>
    <div class="min-h-screen bg-bg-primary pt-24 pb-20 overflow-hidden relative">
        <!-- Background Decor -->
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>

        <div class="max-w-[1240px] mx-auto px-6 relative z-10">
            <!-- Header Section -->
            <div class="text-center mb-20" v-if="!selectedStageId">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 rounded-full border border-accent-primary/20 mb-6 group cursor-default">
                    <div class="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></div>
                    <span class="text-[0.65rem] font-black text-accent-primary uppercase tracking-widest">Growth Success Framework</span>
                </div>
                <h1 class="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-text-primary tracking-tighter leading-[1.1] mb-6">
                    Mulai <span class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent pr-1">Journey</span><br/>Digital Bisnis Kamu
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
                        class="group relative bg-bg-secondary border border-border-color rounded-[32px] p-6 text-left transition-all duration-500 hover:border-accent-primary hover:shadow-2xl hover:shadow-accent-primary/10 hover:-translate-y-2 flex flex-col h-full">
                        
                        <div class="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center text-accent-primary mb-8 group-hover:bg-accent-primary group-hover:text-white transition-all shadow-inner">
                            <component :is="getIcon(stage.icon)" :size="32" />
                        </div>

                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="text-[10px] font-black text-accent-secondary uppercase tracking-widest px-2 py-0.5 bg-accent-secondary/10 rounded-md">
                                    {{ stage.steps?.length || 0 }} Langkah
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">{{ stage.name }}</h3>
                            <p class="text-text-secondary text-xs leading-relaxed opacity-70">
                                {{ stage.description }}
                            </p>
                        </div>

                        <div class="mt-8 pt-6 border-t border-border-color/50 flex items-center justify-between">
                            <span class="text-[11px] font-black text-text-primary uppercase tracking-widest">Start Journey</span>
                            <ChevronRightIcon :size="16" class="text-accent-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                    
                    <!-- Consultation CTA -->
                    <div class="lg:col-span-4 p-8 sm:p-12 bg-linear-to-tr from-bg-secondary to-bg-tertiary border border-border-color rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 mt-12 relative overflow-hidden group">
                        <div class="absolute -right-20 -top-20 w-80 h-80 bg-accent-primary/5 blur-[100px] rounded-full group-hover:bg-accent-primary/10 transition-colors"></div>
                        <div class="relative z-10 text-center md:text-left">
                            <h4 class="text-2xl sm:text-3xl font-black text-text-primary mb-3">Bingung Mulai dari Mana?</h4>
                            <p class="text-text-secondary text-base sm:text-lg opacity-80 max-w-xl">
                                Ceritakan masalah bisnis kamu, biar saya bantu susunkan roadmap strategi digital yang paling pas buat kamu. Gratis!
                            </p>
                        </div>
                        <BaseButton variant="primary" size="lg" icon-right="MessageCircle" class="rounded-2xl! shadow-xl shadow-accent-primary/20 relative z-10" 
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
                    <h2 class="text-[clamp(2rem,6vw,3.5rem)] font-black text-text-primary tracking-tighter leading-[1.2] mb-6">
                        {{ currentStage?.name }} <span class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent italic pr-2">Roadmap</span>
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
                                    <div class="bg-bg-secondary border border-border-color rounded-[32px] p-8 md:p-10 shadow-xl group-hover/step:border-accent-primary/40 transition-all duration-500 relative overflow-hidden">
                                        <!-- Ambient Decor -->
                                        <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-accent-primary/5 rounded-full blur-3xl group-hover/step:bg-accent-primary/10 transition-all"></div>

                                        <div class="relative z-10">
                                            <div class="flex items-center justify-between mb-6">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-accent-primary">
                                                        <component :is="getIcon(step.icon)" :size="20" />
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <span class="text-[9px] font-black text-text-tertiary uppercase tracking-widest">{{ step.type }}</span>
                                                        <span class="text-xs font-bold text-text-primary">{{ step.duration }}</span>
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
                        <div class="relative pt-12 text-center md:text-left">
                            <div class="absolute left-6 md:left-1/2 top-12 md:-translate-x-1/2 z-20">
                                <div class="w-16 h-16 rounded-full bg-linear-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white shadow-2xl shadow-accent-primary/50 animate-bounce">
                                    <RocketIcon :size="28" />
                                </div>
                            </div>
                            <div class="pl-16 md:pl-0 md:pt-32 text-center">
                                <h4 class="text-2xl font-black text-text-primary mb-3">Goal Reached!</h4>
                                <p class="text-text-secondary max-w-md mx-auto opacity-70">Kamu telah menyelesaikan fase {{ currentStage?.name }}. Siap untuk level berikutnya atau butuh bantuan eksekusi?</p>
                                <BaseButton variant="primary" size="lg" class="mt-8 rounded-2xl!" @click="popup.openModal(Popups.CHAT_WA)">Hubungi Kang Jessy</BaseButton>
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
