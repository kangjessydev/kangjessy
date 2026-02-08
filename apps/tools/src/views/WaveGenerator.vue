<template>
    <ToolLayout title="SVG Wave & Blob Architect"
        subtitle="Generate elemen visual organik untuk background website modern. Copy kode SVG instan tanpa perlu coding."
        badge="Design Asset Gen" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">
        
        <div class="space-y-10">
            <!-- Main Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">
                    <div class="bg-bg-secondary border border-border-color rounded-[2.5rem] p-8 shadow-sm space-y-8">
                        <!-- Mode Selector -->
                        <div class="flex p-1 bg-bg-tertiary rounded-2xl border border-border-color shrink-0">
                            <button v-for="m in ['wave', 'blob']" :key="m" @click="mode = m as 'wave' | 'blob'"
                                class="flex-1 py-3 rounded-xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest transition-all shrink-0"
                                :class="mode === m ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'text-text-tertiary hover:text-text-primary'">
                                {{ m }} Generator
                            </button>
                        </div>

                        <!-- General Controls -->
                        <div class="space-y-6">
                            <div class="space-y-4">
                                <div class="flex justify-between items-center">
                                    <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-widest text-text-tertiary">Complexity ({{ points }})</label>
                                </div>
                                <input type="range" v-model.number="points" min="2" :max="mode === 'wave' ? 20 : 12" step="1"
                                    class="w-full accent-accent-primary cursor-pointer">
                            </div>

                            <div class="space-y-4">
                                <div class="flex justify-between items-center">
                                    <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-widest text-text-tertiary">Growth / Height</label>
                                </div>
                                <input type="range" v-model.number="growth" min="20" max="400" step="10"
                                    class="w-full accent-accent-primary cursor-pointer">
                            </div>

                            <div class="space-y-4">
                                <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-widest text-text-tertiary">Pick DNA Color</label>
                                <div class="flex gap-2 shrink-0">
                                    <button v-for="c in presetColors" :key="c" @click="color = c"
                                        class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 active:scale-90 shrink-0"
                                        :style="{ backgroundColor: c }"
                                        :class="color === c ? 'border-text-primary scale-110' : 'border-transparent'">
                                    </button>
                                    <div class="relative w-8 h-8 rounded-full overflow-hidden border-2 border-border-color shrink-0">
                                        <input type="color" v-model="color" class="absolute inset-[-5px] w-[200%] h-[200%] cursor-pointer shrink-0">
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center gap-3 pt-2 shrink-0">
                                <BaseButton variant="secondary" @click="generate" class="flex-1 py-4 rounded-2xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest shrink-0">
                                    <RefreshCw :size="14" class="mr-2 shrink-0" :class="{ 'animate-spin': generating }" />
                                    Randomize Shape
                                </BaseButton>
                            </div>
                        </div>
                    </div>

                    <!-- DNA Insight -->
                    <div class="bg-linear-to-br from-accent-primary/5 to-transparent border border-accent-primary/10 rounded-[2.5rem] p-8 space-y-3">
                         <div class="flex items-center gap-3">
                            <Zap :size="16" class="text-accent-primary shrink-0" />
                            <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] text-text-primary">Design Intelligence</span>
                         </div>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-bold italic">
                            "Bentuk {{ mode === 'wave' ? 'gelombang' : 'blob' }} organik memberikan kesan website yang fluid, bersahabat, dan tidak kaku secara teknis."
                         </p>
                    </div>
                </div>

                <!-- Right: Preview & Export -->
                <div class="lg:col-span-8 space-y-6">
                    <!-- Preview Canvas -->
                    <div class="bg-bg-secondary border border-border-color rounded-[3rem] p-8 lg:p-12 shadow-sm relative overflow-hidden group min-h-[500px] flex items-center justify-center">
                        <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px); background-size: 24px 24px;"></div>
                        
                        <div class="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                            <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[600px] drop-shadow-2xl">
                                <defs>
                                    <linearGradient :id="'gradient-' + _uid" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" :style="{ stopColor: color, stopOpacity: 1 }" />
                                        <stop offset="100%" :style="{ stopColor: adjustColor(color, -30), stopOpacity: 1 }" />
                                    </linearGradient>
                                </defs>
                                <path :d="pathData" :fill="'url(#gradient-' + _uid + ')'" class="transition-all duration-700 ease-in-out" />
                            </svg>
                        </div>

                        <!-- Top Right Badges -->
                        <div class="absolute top-8 right-8 flex gap-2">
                             <div class="px-3 py-1 bg-bg-tertiary/50 border border-border-color rounded-full text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest text-text-tertiary shrink-0">
                                {{ mode.toUpperCase() }} MODE
                             </div>
                        </div>
                    </div>

                    <!-- Export Bar -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button @click="copySVG" 
                            class="bg-bg-secondary border border-border-color rounded-3xl p-6 flex items-center justify-between group hover:border-accent-primary transition-all active:scale-95">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                    <Code :size="18" class="shrink-0" />
                                </div>
                                <div class="text-left">
                                    <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase text-text-tertiary tracking-widest leading-none mb-1">Copy Asset</p>
                                    <p class="text-[clamp(0.85rem,2vw,1rem)] font-black text-text-primary leading-none">SVG Code</p>
                                </div>
                            </div>
                            <Copy :size="16" class="text-text-tertiary group-hover:text-accent-primary transition-colors shrink-0" />
                        </button>

                        <button @click="downloadSVG"
                            class="bg-bg-secondary border border-border-color rounded-3xl p-6 flex items-center justify-between group hover:border-accent-secondary transition-all active:scale-95">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-accent-secondary/10 flex items-center justify-center text-accent-secondary shrink-0">
                                    <Download :size="18" class="shrink-0" />
                                </div>
                                <div class="text-left">
                                    <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase text-text-tertiary tracking-widest leading-none mb-1">Format File</p>
                                    <p class="text-[clamp(0.85rem,2vw,1rem)] font-black text-text-primary leading-none">Download .svg</p>
                                </div>
                            </div>
                            <ArrowRight :size="16" class="text-text-tertiary group-hover:text-accent-secondary transition-colors shrink-0" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education -->
        <template #education>
            <div class="space-y-8 py-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-center">
                    Branding Design Strategy
                </div>
                <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight">Kekuatan Garis Organik.</h4>
                <p class="text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed text-text-secondary">
                    Garis lurus dan kotak memberikan kesan kaku dan industrial. Sebaliknya, bentuk <strong>organik</strong> seperti wave dan blob memberikan kesan humanis, mengalir, dan modern. Gunakan elemen ini sebagai background section untuk memandu mata audiens mengalir dari satu bagian konten ke bagian berikutnya secara natural.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-bg-secondary p-8 rounded-3xl border border-border-color space-y-3">
                         <Layers :size="24" class="text-accent-primary shrink-0" />
                         <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black text-text-primary uppercase tracking-widest">Stacking Layers</h5>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">Tumpuk beberapa gelombang dengan opacity berbeda untuk menciptakan efek kedalaman (depth) yang premium.</p>
                    </div>
                    <div class="bg-bg-secondary p-8 rounded-3xl border border-border-color space-y-3">
                         <Palette :size="24" class="text-accent-secondary shrink-0" />
                         <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black text-text-primary uppercase tracking-widest">Gradient DNA</h5>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">Gunakan gradasi warna yang selaras dengan identitas brand untuk menciptakan kesan visual yang menyatu.</p>
                    </div>
                </div>
                
                <div class="pt-8 border-t border-border-color flex flex-col items-center text-center space-y-6">
                    <h3 class="text-[clamp(1rem,2.5vw,1.25rem)] font-black text-text-primary">Butuh Asset Visual yang Lebih Custom?</h3>
                    <p class="text-[clamp(0.75rem,2vw,0.85rem)] text-text-secondary max-w-sm">Dapatkan set icon, ilustrasi, dan background eksklusif yang dirancang khusus untuk memperkuat karakter digital brand Anda.</p>
                    <BaseButton variant="primary" @click="openConsultation" class="px-10 py-5 rounded-2xl font-black tracking-widest text-[clamp(0.65rem,1.5vw,0.7rem)] shrink-0">
                        Dapatkan Desain Eksklusif
                    </BaseButton>
                </div>
            </div>
        </template>

        <!-- History Item -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center overflow-hidden border border-border-color shrink-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full p-2 shrink-0">
                        <path :d="item.result" :fill="item.input.color" class="shrink-0" />
                    </svg>
                </div>
                <div class="flex flex-col gap-0.5 min-w-0">
                    <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-black text-text-primary uppercase tracking-tighter truncate">{{ item.input.mode }} DNA</span>
                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary font-bold font-mono truncate">{{ item.input.color }}</span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { 
    RefreshCw, Copy, Download, Code, ArrowRight,
    Zap, Layers, Palette
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

const _uid = getCurrentInstance()?.uid || Math.random().toString(36).substr(2, 9);
const { history, addEntry, removeEntry, clearHistory } = useToolHistory('wave-blob-generator');
const toast = useToast();
const popup = usePopupManager();

// State
const mode = ref<'wave' | 'blob'>('wave');
const points = ref( mode.value === 'wave' ? 5 : 6 );
const growth = ref(200);
const color = ref('#4F46E5');
const pathData = ref('');
const generating = ref(false);

const presetColors = ['#4F46E5', '#EC4899', '#10B981', '#F59E0B', '#6366F1', '#D946EF'];

const viewBox = computed(() => mode.value === 'wave' ? '0 0 1440 320' : '0 0 500 500');

// Generators
const generateWave = () => {
    const w = 1440;
    const h = 320;
    const segmentWidth = w / (points.value - 1);
    const pts = [];

    // Generate points
    for (let i = 0; i < points.value; i++) {
        pts.push({
            x: i * segmentWidth,
            y: (h / 2) + (Math.random() - 0.5) * growth.value
        });
    }

    // Start path
    const pStart = pts[0];
    if (!pStart) return;

    let d = `M 0 ${h} L 0 ${pStart.y} `;
    
    // Smooth curves using midpoints as anchors
    for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        if (!p1 || !p2) continue;
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        d += `Q ${p1.x} ${p1.y}, ${midX} ${midY} `;
    }

    // Connect to the last point and close
    const last = pts[pts.length - 1];
    if (last) {
        d += `L ${last.x} ${last.y} L ${w} ${h} Z`;
    }
    pathData.value = d;
};

const generateBlob = () => {
    const size = 500;
    const center = size / 2;
    const baseRadius = (growth.value / 2) + 50; 
    const pts = [];
    const step = (Math.PI * 2) / points.value;

    for (let i = 0; i < points.value; i++) {
        const angle = i * step;
        // Randomize radius with less extreme variance to prevent "bites"
        const r = baseRadius + (Math.random() - 0.5) * (growth.value * 0.4);
        pts.push({
            x: center + Math.cos(angle) * r,
            y: center + Math.sin(angle) * r
        });
    }

    // Close the loop for smoothing
    const pStart = pts[0];
    const pEnd = pts[pts.length - 1];
    
    if (!pStart || !pEnd) {
        pathData.value = '';
        return;
    }

    const firstMidX = (pStart.x + pEnd.x) / 2;
    const firstMidY = (pStart.y + pEnd.y) / 2;

    let d = `M ${firstMidX} ${firstMidY} `;
    
    for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        if (!p1 || !p2) continue;
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        d += `Q ${p1.x} ${p1.y}, ${midX} ${midY} `;
    }
    
    d += 'Z';
    pathData.value = d;
};

const generate = () => {
    generating.value = true;
    if (mode.value === 'wave') generateWave();
    else generateBlob();
    
    setTimeout(() => { generating.value = false; }, 400);
};

// Helpers
const adjustColor = (hex: string, amt: number) => {
    let usePound = false;
    if (hex[0] === '#') { hex = hex.slice(1); usePound = true; }
    let num = parseInt(hex, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255; else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255; else if (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255; else if (g < 0) g = 0;
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
};

const copySVG = () => {
    const svg = `<svg viewBox="${viewBox.value}" xmlns="http://www.w3.org/2000/svg"><path d="${pathData.value}" fill="${color.value}" /></svg>`;
    navigator.clipboard.writeText(svg);
    toast.success('SVG Code copied to clipboard!');
    addEntry({ mode: mode.value, points: points.value, color: color.value }, pathData.value);
};

const downloadSVG = () => {
    const svg = `<svg viewBox="${viewBox.value}" xmlns="http://www.w3.org/2000/svg"><path d="${pathData.value}" fill="${color.value}" /></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mode.value}-architect-${Date.now()}.svg`;
    link.click();
    toast.success('SVG file downloaded!');
};

const restoreFromHistory = (item: any) => {
    mode.value = item.input.mode;
    color.value = item.input.color;
    pathData.value = item.result;
    toast.info('Shape restored from history');
};

const openConsultation = () => {
    popup.openModal(Popups.CHAT_WA, {
        initialMessage: `Halo Kang Jessy! Saya baru saja menggunakan SVG Wave & Blob Architect. Saya ingin diskusi mengenai kebutuhan aset visual kustom untuk branding website saya agar lebih berkarakter.`
    });
};

watch([mode, points, growth], () => {
    generate();
});

onMounted(() => {
    generate();
});
</script>

<style scoped>
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    background: var(--color-bg-tertiary);
    border-radius: 5px;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: var(--color-accent-primary);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.3);
    transition: all 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}
</style>
