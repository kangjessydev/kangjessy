<template>
    <ToolLayout title="Advanced Brand Tone & Copy Architect"
        subtitle="Rancang identitas verbal brand Anda dengan generator teks strategis berbasis kearifan lokal & psikologi audiens."
        badge="Enterprise Brand Tool" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-12 pb-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <!-- Sidebar: Architecture Controls -->
                <div class="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <!-- Style Architect Selection -->
                    <div class="space-y-4">
                        <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                            <Palette :size="14" class="text-accent-primary shrink-0" />
                            Pilih Gaya Identitas
                        </label>
                        <div class="grid grid-cols-1 gap-3">
                            <button v-for="option in styleOptions" :key="option.id" @click="selectedStyle = option.id"
                                class="group relative w-full text-left p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] border transition-all duration-300 overflow-hidden shrink-0"
                                :class="selectedStyle === option.id
                                    ? 'bg-bg-secondary border-accent-primary shadow-xl shadow-accent-primary/10'
                                    : 'bg-bg-tertiary border-border-color hover:border-accent-primary/40 hover:bg-bg-secondary'">
                                
                                <div class="relative z-10 flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
                                        :class="selectedStyle === option.id ? 'bg-accent-primary text-white rotate-6' : 'bg-bg-primary text-text-tertiary group-hover:bg-accent-primary/10 group-hover:text-accent-primary'">
                                        <component :is="option.icon" :size="20" class="shrink-0" />
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <div class="font-black text-[clamp(0.85rem,2.2vw,0.95rem)] tracking-tight mb-0.5"
                                            :class="selectedStyle === option.id ? 'text-text-primary' : 'text-text-secondary'">
                                            {{ option.label }}</div>
                                        <div class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black text-text-tertiary leading-none uppercase tracking-widest">{{ option.vibe }}</div>
                                    </div>
                                </div>
                                <div v-if="selectedStyle === option.id" class="absolute -right-2 -bottom-2 opacity-10 text-accent-primary">
                                    <component :is="option.icon" :size="80" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Layout & Structure -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-3xl md:rounded-[2rem] p-0 md:p-8 md:shadow-sm space-y-8">
                        <div class="space-y-6">
                            <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                <FileText :size="14" class="text-accent-primary shrink-0" />
                                Struktur Copy
                            </label>
                            
                            <!-- Type Selector -->
                            <div class="flex flex-wrap gap-2 shrink-0">
                                <button v-for="type in copyTypes" :key="type.id" @click="selectedType = type.id"
                                    class="px-4 py-2 rounded-xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest border transition-all shrink-0"
                                    :class="selectedType === type.id ? 'bg-text-primary text-bg-primary border-text-primary' : 'bg-transparent border-border-color text-text-tertiary hover:border-text-primary hover:text-text-primary'">
                                    {{ type.label }}
                                </button>
                            </div>

                            <!-- Dynamic Ranges based on type -->
                             <div v-if="selectedType === 'paragraph'" class="space-y-6 pt-4 border-t border-border-color/50">
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between">
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-secondary uppercase tracking-widest">Jumlah Paragraf</span>
                                        <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-mono font-black text-accent-primary">{{ paragraphCount }}</span>
                                    </div>
                                    <input type="range" min="1" max="10" v-model.number="paragraphCount"
                                        class="w-full h-1.5 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary">
                                </div>
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between">
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-secondary uppercase tracking-widest">Kepadatan Kalimat</span>
                                        <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-mono font-black text-accent-primary">{{ sentencesPerPara }}</span>
                                    </div>
                                    <input type="range" min="2" max="12" v-model.number="sentencesPerPara"
                                        class="w-full h-1.5 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary">
                                </div>
                            </div>
                            <div v-else class="pt-4 border-t border-border-color/50">
                                <div class="flex items-center gap-3 p-4 bg-bg-tertiary/50 rounded-xl border border-border-color/30 shrink-0">
                                    <Sparkles :size="14" class="text-accent-primary shrink-0" />
                                    <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary leading-relaxed font-medium">
                                        Mode <strong>{{ selectedType.toUpperCase() }}</strong> dioptimalkan untuk engagement tinggi pada target audiens <strong>{{ selectedStyle.toUpperCase() }}</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <BaseButton @click="generateAndAnimate" variant="primary" class="w-full h-14 rounded-2xl font-black text-[clamp(0.85rem,2.2vw,0.9rem)] shadow-xl shadow-accent-primary/20 hover:-translate-y-1 transition-all shrink-0">
                            <RefreshCw :size="18" class="mr-3 shrink-0" :class="{ 'animate-spin': isGenerating }" />
                            Bangun Ulang Copy
                        </BaseButton>
                    </div>
                </div>

                <!-- Main Content: Canvas & Intelligence -->
                <div class="lg:col-span-8 space-y-10">
                    <!-- The Canvas -->
                    <div class="flex flex-col relative h-full animate-in fade-in slide-in-from-right-4 duration-700">
                        <div class="flex items-center justify-between mb-4 px-2">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                                <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-tertiary">
                                    Kanvas Copy Live
                                </label>
                            </div>
                            <button @click="copyText"
                                class="flex items-center gap-2 px-6 py-2 bg-text-primary text-bg-primary rounded-xl hover:bg-accent-primary hover:text-white transition-all text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest shadow-lg shrink-0">
                                <Copy :size="14" class="shrink-0" />
                                {{ copied ? 'Berhasil Disalin' : 'Salin Hasil' }}
                            </button>
                        </div>
 
                        <div class="md:bg-bg-secondary md:border md:border-border-color rounded-3xl md:rounded-[2.5rem] p-0 md:p-1 relative overflow-hidden md:shadow-2xl group/canvas transition-all duration-500 shrink-0"
                            :class="{ 'ring-4 ring-accent-primary/5': !isGenerating }">
                            <!-- Mac Window Controls -->
                            <div class="h-12 bg-bg-tertiary/50 border-b border-border-color flex items-center px-6 gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500/40"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500/40"></div>
                                <div class="flex-1 flex justify-center opacity-30">
                                    <div class="h-4 w-32 bg-bg-primary rounded-md"></div>
                                </div>
                            </div>

                            <!-- Text Display -->
                            <div class="p-6 md:p-14 min-h-[500px] max-h-[80vh] overflow-y-auto custom-scrollbar font-serif transition-all duration-500"
                                :class="[
                                    isGenerating ? 'opacity-20 blur-xl scale-[0.98]' : 'opacity-100 blur-0 scale-100',
                                    selectedStyle === 'jaksel' ? 'font-sans italic text-text-primary' : '',
                                    selectedStyle === 'formal' ? 'font-serif text-text-primary' : '',
                                    selectedStyle === 'santai' ? 'font-sans text-text-primary tracking-tight' : ''
                                ]">
                                <div v-if="selectedType === 'hero'" class="space-y-8">
                                    <h1 class="text-[clamp(1.75rem,5vw,3.75rem)] font-black leading-tight text-accent-primary">{{ heroTitle }}</h1>
                                    <p class="text-[clamp(1rem,2.5vw,1.5rem)] text-text-secondary leading-relaxed max-w-2xl">{{ heroSub }}</p>
                                    <div class="pt-4 shrink-0">
                                        <button class="px-8 py-4 bg-accent-primary text-white rounded-2xl font-black text-[clamp(0.75rem,1.8vw,0.85rem)] uppercase tracking-widest shadow-xl shrink-0">{{ heroCta }}</button>
                                    </div>
                                </div>
                                <div v-else class="text-xl md:text-2xl leading-[1.6] transition-all duration-700">
                                    {{ outputText }}
                                </div>
                            </div>

                             <!-- Floating Intelligence Overlay -->
                            <div v-if="!isGenerating && outputText" class="absolute bottom-4 left-4 right-4 md:left-auto md:bottom-10 md:right-10 w-auto md:w-full md:max-w-sm animate-in slide-in-from-bottom-4 md:slide-in-from-right-4 duration-700 shrink-0">
                                <div class="bg-white/90 dark:bg-bg-tertiary/95 backdrop-blur-2xl border border-border-color p-5 md:p-6 rounded-3xl md:rounded-[2rem] shadow-2xl space-y-4 shrink-0">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                            <Brain :size="16" class="shrink-0" />
                                        </div>
                                        <h5 class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-tertiary">Wawasan Strategis</h5>
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex flex-col gap-1">
                                            <span class="text-[clamp(0.65rem,1.5vw,0.7rem)] font-black text-text-primary uppercase tracking-widest">{{ activeVibe.title }}</span>
                                            <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">{{ activeVibe.desc }}</p>
                                        </div>
                                        <div class="h-px bg-border-color"></div>
                                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div class="flex items-center gap-2">
                                                <Target :size="12" class="text-green-500 shrink-0" />
                                                <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-bold text-text-secondary uppercase">Target: {{ activeVibe.target }}</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <Zap :size="12" class="text-yellow-500 shrink-0" />
                                                <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-bold text-text-secondary uppercase">Dampak: {{ activeVibe.impact }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conversion Ecosystem Lead Magnet -->
            <div class="bg-linear-to-br from-bg-secondary to-bg-tertiary border border-border-color rounded-3xl md:rounded-[3.5rem] p-6 md:p-20 relative overflow-hidden group">
                <div class="absolute -right-20 -top-20 w-80 h-80 bg-accent-primary/5 rounded-full blur-[100px] group-hover:scale-110 transition-all duration-1000"></div>
                
                <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-8">
                        <div class="inline-flex items-center gap-3 px-5 py-2 bg-accent-primary/10 rounded-full border border-accent-primary/20 shrink-0">
                            <PenTool :size="14" class="text-accent-primary shrink-0" />
                            <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-[0.2em] text-accent-primary">Strategic Copywriting</span>
                        </div>
                        <h2 class="text-[clamp(1.75rem,5vw,3rem)] font-black text-text-primary leading-[1.1] tracking-tight">
                            Bukan Cuma Teks.<br>Tapi <span class="text-accent-primary">Arsitektur Konversi.</span>
                        </h2>
                        <p class="text-[clamp(1rem,2.5vw,1.125rem)] text-text-tertiary leading-relaxed max-w-xl font-medium">
                            Placeholder hanyalah langkah awal. Bangun fondasi brand yang kokoh dengan narasi strategis yang menyentuh emosi & memicu aksi pelanggan Anda.
                        </p>
                        <div class="flex flex-wrap gap-4 shrink-0">
                            <BaseButton variant="primary" class="w-full sm:w-auto h-16 px-8 sm:px-10 rounded-2xl font-black text-[clamp(0.75rem,2vw,0.85rem)] transition-all hover:-translate-y-1 shadow-2xl shadow-accent-primary/20 shrink-0" @click="consultCopy">
                                Konsultasi Strategi Konten Gratis
                            </BaseButton>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative">
                        <!-- Decorations for visual depth -->
                        <div class="absolute inset-0 bg-accent-primary/5 blur-3xl rounded-full"></div>
                        
                        <div v-for="benefit in benefits" :key="benefit.title" 
                            class="relative p-6 md:p-8 bg-bg-secondary border border-border-color rounded-2xl md:rounded-[2rem] hover:border-accent-primary transition-all group/card shrink-0 flex flex-row items-center gap-5 md:flex-col md:items-start md:gap-0">
                            <div class="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary md:mb-6 group-hover/card:scale-110 transition-transform shrink-0">
                                <component :is="benefit.icon" :size="24" class="shrink-0" />
                            </div>
                            <div class="flex-1">
                                <h5 class="text-[clamp(0.7rem,1.5vw,0.75rem)] font-black uppercase tracking-[0.2em] mb-1.5 text-text-primary">{{ benefit.title }}</h5>
                                <p class="text-[clamp(0.65rem,1.5vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">{{ benefit.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Strategy Education Section -->
        <template #education>
            <div class="space-y-12 py-10">
                <div class="flex flex-col md:flex-row gap-8 items-start">
                    <div class="flex-1 space-y-4">
                        <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight italic">Mengapa Tone (Nada) Penting dalam UI/UX?</h4>
                        <p class="text-[clamp(0.85rem,2vw,0.95rem)] text-text-tertiary leading-[1.8] font-medium">
                            Visual adalah apa yang user lihat, Teks adalah bagaimana user berbicara dengan produk Anda. 
                            Kesalahan fatal agensi adalah menggunakan teks Latin (Lorem Ipsum) yang memiliki panjang kata & ritme berbeda dengan Bahasa Indonesia, sehingga layout berantakan saat masuk tahap development.
                        </p>
                    </div>
                    <div class="lg:w-1/3 bg-bg-tertiary border border-border-color p-8 rounded-3xl space-y-4 shrink-0">
                        <div class="flex items-center gap-3">
                            <CheckCircle2 :size="18" class="text-green-500 shrink-0" />
                            <span class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase text-text-primary tracking-widest shrink-0">Tips Pro: Karakter</span>
                        </div>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-bold italic">
                            Pastikan Headline Anda tidak lebih dari 7 kata dalam Bahasa Indonesia untuk mempertahankan keterbacaan (Readability) di atas 80% pada perangkat mobile.
                        </p>
                    </div>
                </div>
            </div>
        </template>

        <!-- History Item Customization -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-border-color transition-colors"
                    :class="selectedStyle === item.input.style ? 'bg-accent-primary/10 border-accent-primary text-accent-primary' : 'bg-bg-tertiary text-text-tertiary'">
                    <component :is="getStyleIcon(item.input.style)" :size="20" class="shrink-0" />
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-black text-text-primary truncate uppercase tracking-widest">Arsitek Style {{ item.input.style }}</span>
                    <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary truncate leading-none mt-1 font-medium italic">
                        {{ item.input.preview }}...
                    </span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import {
    Type, Copy, RefreshCw, Coffee, Building2, Brain, Target, Zap, 
    Palette, FileText, Sparkles, CheckCircle2, Layout, MousePointerClick, PenTool
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { dictionaries } from '@/data/tools/loremDictionaries';
import { useToast } from '@/composables/useToast';
import { useToolHistory } from '@/composables/useToolHistory';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

const toast = useToast();
const popup = usePopupManager();
const { history, addEntry, removeEntry, clearHistory } = useToolHistory('indo-architect');

// Architecture State
const selectedStyle = ref<'jaksel' | 'formal' | 'santai'>('jaksel');
const selectedType = ref<'paragraph' | 'headline' | 'cta' | 'hero'>('paragraph');
const paragraphCount = ref(3);
const sentencesPerPara = ref(5);
const outputText = ref('');
const isGenerating = ref(false);
const copied = ref(false);

const heroTitle = ref('');
const heroSub = ref('');
const heroCta = ref('');

const styleOptions = [
    { id: 'jaksel', label: 'Agency / Startup Jaksel', vibe: 'Bold & Disruptive', icon: Coffee },
    { id: 'formal', label: 'Enterprise / Corporate', vibe: 'Trust & Authority', icon: Building2 },
    { id: 'santai', label: 'Community / Lifestyle', vibe: 'Social & Emotional', icon: Type }
] as const;

const copyTypes = [
    { id: 'paragraph', label: 'Paragraph' },
    { id: 'headline', label: 'Headline' },
    { id: 'cta', label: 'CTA Button' },
    { id: 'hero', label: 'Hero Section' }
] as const;

const benefits = [
    { icon: Brain, title: 'Psychology First', desc: 'Pemilihan diksi berdasarkan riset perilaku target audiens lokal.' },
    { icon: Layout, title: 'Layout Ready', desc: 'Panjang kalimat yang disesuaikan dengan standar desain UI modern.' },
    { icon: Target, title: 'High Conversion', desc: 'Mengarahkan user ke aksi nyata dengan kata-kata yang persuasif.' },
    { icon: MousePointerClick, title: 'Easy Deploy', desc: 'Sekali klik, copy-paste langsung ke Figma atau Web Code Anda.' }
];

// Computed Intelligence
const activeVibe = computed(() => {
    const vibes = {
        jaksel: {
            title: 'Digital Native Vibe',
            desc: 'Diksi ini menciptakan rasa "In the loop" dan modernitas. Sangat kuat untuk target pasar Gen Z/Millennial perkotaan & tech enthusiast.',
            target: 'Early Adopters',
            impact: 'Kepercayaan Tinggi'
        },
        formal: {
            title: 'Institutional Stability',
            desc: 'Bahasa Indonesia baku yang tertata memberikan kesan reliabilitas tanpa kompromi. Mengurangi hambatan kepercayaan pada sektor High-Risk.',
            target: 'Decision Makers',
            impact: 'Otoritas Tinggi'
        },
        santai: {
            title: 'Relatability & Empathy',
            desc: 'Menggunakan bahasa yang "membumi" meningkatkan kedekatan emosional. Cocok untuk membangun loyalitas komunitas jangka panjang.',
            target: 'Casual Users',
            impact: 'Engagemen Tinggi'
        }
    };
    return vibes[selectedStyle.value];
});

// Helper for Icons
const getStyleIcon = (style: string) => {
    if (style === 'jaksel') return Coffee;
    if (style === 'formal') return Building2;
    return Type;
};

// Advanced Generation Logic
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const generateSentence = (style: 'jaksel' | 'formal' | 'santai', forceLength?: number) => {
    const dict = dictionaries[style];
    const length = forceLength || (Math.floor(Math.random() * 8) + 5);
    let result: string[] = [];

    if (Math.random() > 0.6 && dict.starters.length > 0 && !forceLength) {
        result.push(getRandom(dict.starters));
    }

    for (let i = 0; i < length; i++) {
        result.push(getRandom(dict.words));
    }

    let final = result.join(' ');
    if (!/[A-Z]/.test(final.charAt(0))) final = capitalize(final);
    return final + (forceLength ? '' : '.');
};

const generateAndAnimate = () => {
    isGenerating.value = true;
    setTimeout(() => {
        if (selectedType.value === 'paragraph') {
            const paras = [];
            for (let i = 0; i < paragraphCount.value; i++) {
                const sentences = [];
                for (let j = 0; j < sentencesPerPara.value; j++) {
                    sentences.push(generateSentence(selectedStyle.value));
                }
                paras.push(sentences.join(' '));
            }
            outputText.value = paras.join('\n\n');
        } else if (selectedType.value === 'headline') {
            outputText.value = generateSentence(selectedStyle.value, 6);
        } else if (selectedType.value === 'cta') {
            const words = dictionaries[selectedStyle.value].words;
            outputText.value = (getRandom(words) + ' ' + getRandom(words)).toUpperCase();
        } else if (selectedType.value === 'hero') {
            heroTitle.value = generateSentence(selectedStyle.value, 4);
            heroSub.value = generateSentence(selectedStyle.value, 15);
            heroCta.value = "Explore " + capitalize(getRandom(dictionaries[selectedStyle.value].words));
            outputText.value = `${heroTitle.value}\n${heroSub.value}\n${heroCta.value}`;
        }

        addEntry({
            style: selectedStyle.value,
            type: selectedType.value,
            preview: outputText.value.substring(0, 30)
        }, outputText.value);

        isGenerating.value = false;
    }, 400);
};

const copyText = async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        copied.value = true;
        toast.success('DNA Strategi Berhasil Disalin!');
        setTimeout(() => copied.value = false, 2000);
    } catch {
        toast.error('Gagal menyalin.');
    }
};

const consultCopy = () => {
    popup.openModal(Popups.CHAT_WA, {
        initialMessage: `Halo Kang Jessy! Saya baru saja menggunakan Advanced Brand Tone Architect. Saya menarik dengan style ${selectedStyle.value.toUpperCase()} dan butuh bantuan untuk merancang strategi konten yang premium untuk brand saya.`
    });
};

const restoreFromHistory = (item: any) => {
    selectedStyle.value = item.input.style;
    selectedType.value = item.input.type || 'paragraph';
    outputText.value = item.result;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch([selectedStyle, selectedType, paragraphCount, sentencesPerPara], () => {
    generateAndAnimate();
});

onMounted(generateAndAnimate);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

canvas-focus {
    animation: glow 2s infinite alternate;
}

@keyframes glow {
    from { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.1); }
    to { box-shadow: 0 0 40px rgba(var(--accent-rgb), 0.2); }
}
</style>
