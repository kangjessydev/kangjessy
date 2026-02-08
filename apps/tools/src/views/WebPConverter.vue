<template>
    <ToolLayout title="Enterprise Image Speed Optimizer"
        subtitle="Optimasi aset digital Anda dengan standar WebP modern. Kurangi ukuran file tanpa mengorbankan kualitas visual."
        badge="Speed & Performance Tool" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-12 pb-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <!-- Sidebar: Controls & Upload -->
                <div class="lg:col-span-12 xl:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div class="bg-bg-secondary border border-border-color rounded-[2.5rem] p-6 md:p-10 shadow-sm space-y-8 relative overflow-hidden group">
                        <!-- Background Deco -->
                        <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>

                        <div class="relative z-10 space-y-8">
                            <!-- Dropzone -->
                            <div @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop"
                                class="relative group/zone cursor-pointer border-2 border-dashed border-border-color hover:border-accent-primary/50 transition-all rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[280px] overflow-hidden bg-bg-tertiary/20">
                                <input type="file" id="file-upload" class="hidden" accept="image/png, image/jpeg, image/jpg"
                                    @change="handleFileUpload">

                                <div v-if="!currentFile" class="flex flex-col items-center text-center">
                                    <div class="w-20 h-20 bg-accent-primary/10 rounded-3xl flex items-center justify-center text-accent-primary mb-6 group-hover/zone:scale-110 group-hover/zone:rotate-3 transition-all duration-500 shrink-0">
                                        <ImagePlus :size="36" class="shrink-0" />
                                    </div>
                                    <h4 class="text-[clamp(1rem,2.5vw,1.25rem)] font-black text-text-primary mb-2 tracking-tight">Optimasi Gambar</h4>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary px-10 leading-relaxed max-w-[300px]">
                                        Tarik & lepas file high-res Anda di sini untuk memulai audit ukuran.
                                    </p>
                                </div>

                                <div v-else class="absolute inset-0 w-full h-full p-4 group/preview">
                                    <img :src="previewOriginal" class="w-full h-full object-contain rounded-2xl shadow-2xl transition-transform duration-700 group-hover/preview:scale-[1.02]">
                                    <div class="absolute inset-x-0 bottom-4 bg-black/60 opacity-0 group-hover/zone:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md p-4 rounded-xl">
                                        <div class="flex items-center gap-2">
                                            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0"><RefreshCw :size="16" class="shrink-0" /></div>
                                            <span class="text-white font-black text-[clamp(0.6rem,1.5vw,0.65rem)] uppercase tracking-[0.2em] shrink-0">Pilih Gambar Lain</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Quality Settings -->
                            <Transition name="fade">
                                <div v-if="currentFile" class="space-y-8 animate-in slide-in-from-top-4 duration-500">
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between">
                                            <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary">Compression IQ</label>
                                            <span class="text-[clamp(1rem,2.5vw,1.125rem)] font-mono font-black text-accent-primary">{{ quality }}%</span>
                                        </div>
                                        <input type="range" min="10" max="100" v-model.number="quality"
                                            class="w-full h-1.5 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary">
                                        <div class="flex justify-between text-[clamp(0.55rem,1.5vw,0.6rem)] font-black text-text-tertiary uppercase tracking-widest px-1">
                                            <span>Kecepatan Max</span>
                                            <span>Kualitas Max</span>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-3">
                                        <button @click="quality = 75"
                                            class="p-4 rounded-2xl border transition-all text-left group relative overflow-hidden"
                                            :class="quality === 75 ? 'border-accent-primary bg-accent-primary/5' : 'border-border-color hover:border-accent-primary/30'">
                                            <span class="block text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest text-text-tertiary mb-1">Standard</span>
                                            <span class="block text-[clamp(0.8rem,2vw,0.85rem)] font-black text-text-primary">Balanced (75%)</span>
                                        </button>
                                        <button @click="quality = 60"
                                            class="p-4 rounded-2xl border transition-all text-left group relative overflow-hidden"
                                            :class="quality === 60 ? 'border-yellow-500 bg-yellow-500/5' : 'border-border-color hover:border-yellow-500/30'">
                                            <span class="block text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest text-text-tertiary mb-1">Aggressive</span>
                                            <span class="block text-[clamp(0.8rem,2vw,0.85rem)] font-black text-text-primary">Turbo (60%)</span>
                                        </button>
                                    </div>
                                </div>
                            </Transition>

                            <BaseButton v-if="currentFile" variant="primary" class="w-full h-14 rounded-2xl font-black shadow-xl shadow-accent-primary/20" @click="downloadWebP">
                                <Download :size="18" class="mr-3" />
                                Unduh WebP Teroptimasi
                            </BaseButton>
                        </div>
                    </div>

                    <!-- Speed Gains IQ Card -->
                    <Transition name="fade">
                        <div v-if="resultWebP && !isFileLarger" class="bg-linear-to-br from-bg-secondary to-bg-tertiary border border-border-color rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                    <Zap :size="20" class="shrink-0" />
                                </div>
                                <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary">Prediksi Performa</h5>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-4 rounded-2xl bg-bg-secondary border border-border-color/50 flex flex-col gap-1">
                                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black text-text-tertiary uppercase tracking-widest">Estimasi Hemat Waktu (4G)</span>
                                    <span class="text-[clamp(1rem,2.5vw,1.125rem)] font-black text-green-500">-{{ estimatedSpeedGain }}s</span>
                                </div>
                                <div class="p-4 rounded-2xl bg-bg-secondary border border-border-color/50 flex flex-col gap-1">
                                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black text-text-tertiary uppercase tracking-widest">Skor Efisiensi</span>
                                    <span class="text-[clamp(1rem,2.5vw,1.125rem)] font-black text-text-primary">{{ calculateSavings }}%</span>
                                </div>
                            </div>
                            
                            <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary leading-relaxed italic px-2">
                                *Simulasi menunjukkan loading gambar akan {{ calculateSavings }}% lebih cepat dari versi aslinya.
                            </p>
                        </div>
                    </Transition>
                </div>

                <!-- Main Area: Result & Comparison -->
                <div class="lg:col-span-12 xl:col-span-7 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div v-if="resultWebP" class="space-y-8">
                        <!-- Comparative Canvas -->
                        <div class="bg-bg-secondary border border-border-color rounded-[3rem] p-1 overflow-hidden shadow-2xl group">
                            <div class="h-14 bg-bg-tertiary/50 border-b border-border-color flex items-center justify-between px-8">
                                <div class="flex items-center gap-3">
                                    <div class="flex gap-1.5">
                                        <div class="w-3 h-3 rounded-full bg-red-500/30"></div>
                                        <div class="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                                        <div class="w-3 h-3 rounded-full bg-green-500/30"></div>
                                    </div>
                                    <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-tertiary uppercase tracking-[0.2em] ml-4">Visual Audit Mode</span>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-2">
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold text-text-tertiary uppercase">Sebelum vs Sesudah</span>
                                        <div class="w-8 h-4 bg-bg-primary rounded-full relative p-0.5 border border-border-color shrink-0">
                                            <div class="w-3 h-3 bg-accent-primary rounded-full transition-all shrink-0" :style="{ marginLeft: isComparing ? '1rem' : '0' }"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Image Comparison Display -->
                            <div class="relative bg-[url('https://patterns.ibrahimcesar.cloud/architect-opacity.svg')] bg-repeat aspect-video flex items-center justify-center overflow-hidden">
                                <img :src="isComparing ? resultWebP.url : previewOriginal" 
                                    class="w-full h-full object-contain transition-all duration-300"
                                    @mousedown="isComparing = true" @mouseup="isComparing = false"
                                    @touchstart="isComparing = true" @touchend="isComparing = false">
                                
                                <div class="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
                                    <div class="px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 text-white text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest animate-bounce text-center">
                                        {{ isComparing ? 'Hasil Teroptimasi' : 'Tahan untuk Lihat Asli' }}
                                    </div>
                                </div>

                                <!-- Difference Warning -->
                                <div v-if="isFileLarger" class="absolute inset-0 bg-red-500/20 backdrop-blur-[2px] flex items-center justify-center p-10 text-center">
                                    <div class="bg-white dark:bg-bg-secondary p-8 rounded-[2rem] shadow-2xl border border-red-500/30 max-w-sm space-y-4">
                                        <AlertTriangle :size="48" class="text-red-500 mx-auto" />
                                        <h4 class="text-lg font-black text-text-primary">Kualitas Terlalu Tinggi!</h4>
                                        <p class="text-xs text-text-tertiary leading-relaxed">
                                            Setting kualitas di atas <strong>90%</strong> sering kali menciptakan "Phantom Data" yang membuat file WebP lebih besar dari aslinya. Turunkan slider kualitas untuk optimasi maksimal.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Technical Stats Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-bg-secondary border border-border-color p-8 rounded-[2rem] flex flex-col items-center text-center group hover:border-accent-primary transition-all">
                                <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black text-text-tertiary uppercase tracking-widest mb-4">Ukuran Asli</span>
                                <span class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary">{{ formatSize(currentFile?.size || 0) }}</span>
                                <div class="w-full h-1.5 bg-bg-tertiary rounded-full mt-6 overflow-hidden">
                                    <div class="h-full bg-text-tertiary/20 w-full"></div>
                                </div>
                            </div>
                            
                            <div class="bg-bg-secondary border p-8 rounded-[2rem] flex flex-col items-center text-center transition-all"
                                :class="isFileLarger ? 'border-red-500/50' : 'border-accent-primary shadow-xl shadow-accent-primary/5'">
                                <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest mb-4" :class="isFileLarger ? 'text-red-500' : 'text-accent-primary'">Ukuran Hasil</span>
                                <span class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary">{{ formatSize(resultWebP.blob.size) }}</span>
                                <div class="w-full h-1.5 bg-bg-tertiary rounded-full mt-6 overflow-hidden">
                                    <div class="h-full bg-accent-primary transition-all duration-1000" :style="{ width: isFileLarger ? '100%' : `${100 - calculateSavings}%` }"></div>
                                </div>
                            </div>

                            <div class="bg-linear-to-br from-accent-primary to-accent-secondary p-8 rounded-[2rem] flex flex-col items-center justify-center text-center text-white shadow-2xl">
                                <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest mb-2 opacity-80">Total Penghematan</span>
                                <span class="text-[clamp(2rem,6vw,2.5rem)] font-black">{{ isFileLarger ? '0' : calculateSavings }}%</span>
                                <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black mt-4 uppercase tracking-[0.2em] opacity-80">Aset Lebih Ringan</p>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else class="h-full min-h-[500px] border border-border-color border-dashed rounded-[3rem] flex flex-col items-center justify-center p-20 text-center space-y-6">
                        <div class="w-24 h-24 rounded-full bg-bg-tertiary flex items-center justify-center text-text-tertiary/20">
                            <ImagePlus :size="48" />
                        </div>
                        <div class="space-y-2">
                            <h3 class="text-xl font-black text-text-tertiary">Siap untuk Optimasi</h3>
                            <p class="text-sm text-text-tertiary/60 leading-relaxed max-w-sm">
                                Masukkan file gambar Anda untuk memulai proses audit & optimasi kecepatan secara real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enterprise Speed Lead Magnet -->
            <div class="bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-[3.5rem] p-10 md:p-20 text-white relative overflow-hidden group">
                <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
                <div class="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none transition-transform group-hover:rotate-12 duration-1000">
                    <Rocket :size="300" />
                </div>

                <div class="relative z-10 max-w-3xl space-y-10">
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10 shrink-0">
                        <Gauge :size="16" class="text-accent-primary shrink-0" />
                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] text-center">Core Web Vitals Strategy</span>
                    </div>
                    
                    <div class="space-y-6">
                        <h2 class="text-3xl md:text-5xl font-black tracking-tight leading-[1.1]">Website Lemot? <br><span class="text-white/50">Gambar yang Gemuk Pelakunya.</span></h2>
                        <p class="text-[1rem] md:text-xl text-white/70 leading-relaxed max-w-2xl">
                            Google benci website lambat. Kami bantu audit seluruh aset visual Anda dan meningkatkan performa Core Web Vitals untuk SEO yang lebih baik & konversi lebih tinggi.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-4 pt-4">
                        <BaseButton variant="secondary" class="h-16 px-10 rounded-2xl font-black text-[14px] shadow-2xl hover:-translate-y-1 transition-all" @click="consultSpeed">
                            Audit Kecepatan Website Gratis
                        </BaseButton>
                        <div class="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 shrink-0">
                            <div class="flex -space-x-2 shrink-0">
                                <div v-for="i in 3" :key="i" class="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-bg-tertiary shrink-0"></div>
                            </div>
                            <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-bold text-white/60 uppercase tracking-widest">+12 Proyek Teroptimasi minggu ini</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Strategy Identity Section -->
        <template #education>
            <div class="space-y-16 py-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div class="space-y-6">
                        <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight italic">Why Speed is Your Best Salesman?</h4>
                        <p class="text-[clamp(0.85rem,2vw,0.95rem)] text-text-tertiary leading-[1.8] text-justify">
                            Sebanyak 53% user meninggalkan website jika loading lebih dari 3 detik. WebP bukan sekadar format gambar, ini adalah kunci untuk mengurangi LCP (Largest Contentful Paint) — parameter krusial dalam algoritma ranking Google 2026.
                        </p>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="p-6 bg-bg-secondary border border-border-color rounded-3xl space-y-2">
                                <span class="text-[clamp(1.25rem,3vw,1.5rem)] font-black text-accent-primary">-30%</span>
                                <p class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-bold text-text-tertiary uppercase">Bounce Rate Reduction</p>
                            </div>
                            <div class="p-6 bg-bg-secondary border border-border-color rounded-3xl space-y-2">
                                <span class="text-[clamp(1.25rem,3vw,1.5rem)] font-black text-green-500">+15%</span>
                                <p class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-bold text-text-tertiary uppercase">Conversion Lift</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <h4 class="text-2xl font-black text-text-primary tracking-tight">Standard Optimasi Enterprise</h4>
                        <div class="space-y-4">
                            <div v-for="point in [
                                { t: 'Smart Alpha Channel', d: 'WebP mendukung transparansi dengan ukuran jauh lebih kecil dari PNG24.' },
                                { t: 'Predictive Encoding', d: 'Algoritma yang memprediksi pixel berdasarkan blok tetangga untuk kompresi maksimal.' },
                                { t: 'Browser Native', d: 'Proses 100% di browser tanpa mengirim data privasi ke server pihak ketiga.' }
                            ]" :key="point.t" class="p-5 bg-bg-tertiary/50 rounded-2xl border border-border-color/30 flex gap-4">
                                <CheckCircle :size="18" class="text-accent-primary shrink-0" />
                                <div class="min-w-0">
                                    <h6 class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-text-primary truncate">{{ point.t }}</h6>
                                    <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary leading-relaxed font-medium">{{ point.d }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- History Item Customization -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-border-color transition-colors"
                    :class="item.input.savings > 0 ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'">
                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black">{{ item.input.savings > 0 ? '-' : '+' }}{{ Math.abs(item.input.savings) }}%</span>
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-[clamp(0.75rem,1.8vw,0.8rem)] font-black text-text-primary truncate">{{ item.input.name }}</span>
                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary truncate leading-none mt-1 font-medium italic">
                        {{ item.input.originalSize }} ➝ {{ item.input.newSize }}
                    </span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { 
    ImagePlus, Download, RefreshCw, AlertTriangle, 
    CheckCircle, Zap, Rocket, Gauge 
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

const toast = useToast();
const popup = usePopupManager();
const { history, addEntry, removeEntry, clearHistory } = useToolHistory('webp-v2');

// Speed Optimizer State
const currentFile = ref<File | null>(null);
const previewOriginal = ref<string>('');
const resultWebP = ref<{ blob: Blob, url: string } | null>(null);
const quality = ref(75);
const isProcessing = ref(false);
const isComparing = ref(false);
let debounceTimer: ReturnType<typeof setTimeout>;

const triggerFileInput = () => {
    document.getElementById('file-upload')?.click();
};

const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) processFile(file);
};

const handleDrop = (e: DragEvent) => {
    const file = e.dataTransfer?.files[0];
    if (file) processFile(file);
};

const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
        toast.error('File harus berupa JPG atau PNG untuk optimasi kecepatan.');
        return;
    }

    currentFile.value = file;
    resultWebP.value = null;

    const reader = new FileReader();
    reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
            previewOriginal.value = e.target.result;
            processConversion(true);
        }
    };
    reader.readAsDataURL(file);
};

watch(quality, () => {
    if (!currentFile.value) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        processConversion(true);
    }, 500);
});

const processConversion = async (silent = false) => {
    if (!previewOriginal.value || !currentFile.value) return;
    isProcessing.value = true;

    setTimeout(() => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        resultWebP.value = { blob, url };

                        const savings = Math.round(((currentFile.value!.size - blob.size) / currentFile.value!.size) * 100);
                        
                        if (!silent) {
                            addEntry({
                                name: currentFile.value?.name || 'asset',
                                originalSize: formatSize(currentFile.value?.size || 0),
                                newSize: formatSize(blob.size),
                                savings: savings
                            }, null);
                            
                            if (savings > 0) toast.success(`Optimasi Berhasil! Hemat ${savings}%`);
                        } else if (history.value.length === 0 || history.value[0]?.input.name !== currentFile.value?.name) {
                            // Initial entry for history
                             addEntry({
                                name: currentFile.value?.name || 'asset',
                                originalSize: formatSize(currentFile.value?.size || 0),
                                newSize: formatSize(blob.size),
                                savings: savings
                            }, null);
                        }
                    }
                    isProcessing.value = false;
                }, 'image/webp', quality.value / 100);
            }
        };
        img.src = previewOriginal.value;
    }, 100);
};

const downloadWebP = () => {
    if (!resultWebP.value) return;
    const l = document.createElement('a');
    l.href = resultWebP.value.url;
    l.download = `${currentFile.value?.name.split('.')[0]}_optimized.webp`;
    l.click();
};

const calculateSavings = computed(() => {
    if (!currentFile.value || !resultWebP.value) return 0;
    return Math.round(((currentFile.value.size - resultWebP.value.blob.size) / currentFile.value.size) * 100);
});

const estimatedSpeedGain = computed(() => {
    if (!currentFile.value || !resultWebP.value) return '0';
    const savedBytes = currentFile.value.size - resultWebP.value.blob.size;
    if (savedBytes <= 0) return '0';
    // Assume 3G speed approx 250KB/s
    const gain = (savedBytes / (250 * 1024)).toFixed(2);
    return gain;
});

const isFileLarger = computed(() => {
    if (!currentFile.value || !resultWebP.value) return false;
    return resultWebP.value.blob.size > currentFile.value.size;
});

const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const consultSpeed = () => {
    popup.openModal(Popups.CHAT_WA, {
        initialMessage: `Halo Kang Jessy! Saya baru saja menggunakan Enterprise Image Speed Optimizer. Saya ingin melakukan audit kecepatan website menyeluruh untuk bisnis saya karena Core Web Vitals saya merah.`
    });
};

const restoreFromHistory = (_item: any) => {
    toast.info('Mohon upload ulang file asli untuk re-optimasi.');
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
