<template>
    <ToolLayout title="Social Content Safe-Zone Architect"
        subtitle="Pastikan elemen penting desain Anda tidak tertutup UI platform media sosial. Preview presisi untuk Reels & TikTok."
        badge="Content Precision Tool" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-12 pb-20">
            <!-- Main Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <!-- Left: Control Panel -->
                <div class="lg:col-span-5 space-y-8 animate-in slide-in-from-left-4 duration-500">
                    <div class="bg-bg-secondary border border-border-color rounded-[2.5rem] p-8 shadow-sm space-y-8 relative overflow-hidden group">
                        
                        <!-- Platform Selector -->
                         <div class="space-y-4">
                            <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                <Smartphone :size="14" class="text-accent-primary shrink-0" />
                                Target Platform
                            </label>
                            <div class="grid grid-cols-1 gap-2">
                                <button v-for="p in platforms" :key="p.id" @click="activePlatform = p.id"
                                    class="flex items-center justify-between px-6 py-4 rounded-2xl border transition-all shrink-0"
                                    :class="activePlatform === p.id ? 'bg-accent-primary border-accent-primary text-white shadow-lg' : 'bg-bg-tertiary border-border-color text-text-tertiary hover:text-text-primary'">
                                    <div class="flex items-center gap-3">
                                        <component :is="p.icon" :size="18" class="shrink-0" />
                                        <span class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-widest">{{ p.name }}</span>
                                    </div>
                                    <Check v-if="activePlatform === p.id" :size="14" class="shrink-0" />
                                </button>
                            </div>
                        </div>

                        <!-- Asset Upload -->
                         <div class="space-y-4 pt-4 border-t border-border-color/30">
                            <label class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                <ImageIcon :size="14" class="text-accent-secondary shrink-0" />
                                Desain Konten Anda
                            </label>
                            <div @click="triggerUpload" 
                                class="relative h-40 bg-bg-tertiary border-2 border-dashed border-border-color hover:border-accent-primary rounded-[2rem] flex flex-col items-center justify-center cursor-pointer group/upload transition-all overflow-hidden shrink-0">
                                <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleUpload">
                                
                                <template v-if="userImage">
                                    <img :src="userImage" class="w-full h-full object-cover opacity-60 shrink-0">
                                    <div class="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary/40 backdrop-blur-sm p-4 text-center">
                                        <RefreshCw :size="24" class="text-white mb-2 shrink-0" />
                                        <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest text-white">Ganti Desain</span>
                                    </div>
                                </template>
                                <template v-else>
                                    <UploadCloud :size="32" class="text-text-tertiary group-hover/upload:text-accent-primary mb-3 transition-colors shrink-0" />
                                    <span class="text-[clamp(0.6rem,1.8vw,0.65rem)] font-black uppercase tracking-widest text-text-tertiary text-center">Unggah Gambar (9:16)</span>
                                </template>
                            </div>
                        </div>

                        <!-- Guide Visibility -->
                        <div class="flex items-center justify-between p-4 bg-bg-tertiary rounded-2xl border border-border-color shrink-0">
                             <div class="flex items-center gap-2">
                                <Eye :size="14" class="text-accent-primary shrink-0" />
                                <span class="text-[clamp(0.6rem,1.8vw,0.65rem)] font-black uppercase tracking-widest text-text-primary">Tampilkan Grid Aman</span>
                             </div>
                             <button @click="showGrid = !showGrid" 
                                class="w-10 h-6 rounded-full relative transition-colors duration-300 shrink-0"
                                :class="showGrid ? 'bg-accent-primary' : 'bg-bg-secondary'">
                                <div class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
                                    :class="showGrid ? 'left-5' : 'left-1'"></div>
                             </button>
                        </div>
                    </div>

                    <!-- Expert Advice -->
                    <div class="bg-linear-to-br from-accent-secondary/5 to-transparent border border-accent-secondary/10 rounded-[2.5rem] p-8 space-y-4">
                        <div class="flex items-center gap-3">
                           <Zap :size="20" class="text-accent-secondary shrink-0" />
                           <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] text-text-primary">Social Tech DNA</span>
                        </div>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-bold italic">
                           "Bagian bawah Reels adalah titik paling rawan. Pastikan Call to Action (CTA) Anda berada di tengah layar agar tidak tumpang tindih dengan caption atau tombol interaksi."
                        </p>
                    </div>
                </div>

                <!-- Right: Mockup Preview -->
                <div class="lg:col-span-7 space-y-8 flex items-center justify-center px-4">
                    <div class="relative w-full max-w-[360px] aspect-[9/19] bg-black rounded-[3rem] border-[10px] border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.4)] overflow-hidden group">
                        <!-- User Image -->
                        <div class="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                            <img v-if="userImage" :src="userImage" class="w-full h-full object-cover">
                            <div v-else class="text-zinc-700 font-black uppercase text-[10px] tracking-widest">Preview Desain</div>
                        </div>

                        <!-- Overlay UI Layers (Platform Specific) -->
                        <div class="absolute inset-0 pointer-events-none transition-opacity duration-500" :class="{ 'opacity-100': true }">
                            <!-- Safe Zone Grid Overlay -->
                            <div v-if="showGrid" class="absolute inset-0 border-x-2 border-dashed border-red-500/20 flex flex-col justify-between">
                                <div class="h-[15%] border-b-2 border-dashed border-red-500/30 bg-red-500/5 flex items-center justify-center font-black text-[clamp(0.45rem,1.2vw,0.5rem)] text-red-500/50 uppercase tracking-widest shrink-0">Header Danger Zone</div>
                                <div class="flex-1"></div>
                                <div class="h-[25%] border-t-2 border-dashed border-red-500/30 bg-red-500/5 flex items-center justify-center font-black text-[clamp(0.45rem,1.2vw,0.5rem)] text-red-500/50 uppercase tracking-widest text-center px-10 shrink-0">UI Danger Zone<br>(Caption & Buttons)</div>
                            </div>

                            <!-- Common Elements: Time, Battery -->
                            <div class="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between text-white/80 font-bold text-[10px]">
                                <span>09:41</span>
                                <div class="flex items-center gap-1.5">
                                    <Wifi :size="12" />
                                    <div class="w-5 h-2.5 border border-white/40 rounded-sm relative"><div class="absolute left-0.5 top-0.5 bottom-0.5 w-[70%] bg-white rounded-px"></div></div>
                                </div>
                            </div>

                            <!-- Platform Specific UI -->
                            <!-- Instagram Reels -->
                            <template v-if="activePlatform === 'ig-reels'">
                                 <div class="absolute top-12 left-6 flex items-center gap-2 text-white font-black text-[clamp(0.75rem,2vw,0.85rem)] drop-shadow-md shrink-0">
                                    <span>Reels</span>
                                    <ChevronDown :size="14" class="shrink-0" />
                                </div>
                                <div class="absolute right-3 bottom-24 flex flex-col items-center gap-6 text-white drop-shadow-lg shrink-0">
                                    <div class="flex flex-col items-center gap-1 shrink-0"><Heart :size="24" class="shrink-0" /> <span class="text-[clamp(0.5rem,1.5vw,0.55rem)] font-bold">12.4K</span></div>
                                    <div class="flex flex-col items-center gap-1 shrink-0"><MessageCircle :size="24" class="shrink-0" /> <span class="text-[clamp(0.5rem,1.5vw,0.55rem)] font-bold">842</span></div>
                                    <div class="flex flex-col items-center gap-1 shrink-0"><Send :size="24" class="shrink-0" /> <span class="text-[clamp(0.5rem,1.5vw,0.55rem)] font-bold">2.1K</span></div>
                                    <MoreVertical :size="20" class="shrink-0" />
                                    <div class="w-8 h-8 rounded-lg border-2 border-white overflow-hidden bg-zinc-800 shrink-0"></div>
                                </div>
                                <div class="absolute left-5 bottom-8 right-16 space-y-2 text-white drop-shadow-md shrink-0">
                                    <div class="flex items-center gap-2 shrink-0">
                                        <div class="w-8 h-8 rounded-full bg-zinc-600 border border-white/20 shrink-0"></div>
                                        <span class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black">kangjessy.agency</span>
                                        <span class="px-2 py-0.5 border border-white/50 rounded-lg text-[clamp(0.45rem,1.2vw,0.5rem)] font-black uppercase shrink-0">Follow</span>
                                    </div>
                                    <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] leading-relaxed line-clamp-2">Optimalkan desain konten Anda agar tidak terpotong oleh UI Instagram... #branding #design #agency</p>
                                    <div class="flex items-center gap-2 text-[clamp(0.6rem,1.5vw,0.65rem)] shrink-0">
                                        <Music :size="10" class="shrink-0" />
                                        <span>Original Audio • kangjessy.agency</span>
                                    </div>
                                </div>
                            </template>

                            <!-- TikTok -->
                            <template v-else-if="activePlatform === 'tiktok'">
                                 <div class="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/60 font-black text-[clamp(0.65rem,1.8vw,0.7rem)] shrink-0">
                                    <span class="text-white border-b-2 border-white pb-1">Following</span>
                                    <span>For You</span>
                                </div>
                                <div class="absolute right-3 bottom-20 flex flex-col items-center gap-5 text-white drop-shadow-lg shrink-0">
                                    <div class="w-12 h-12 rounded-full border-2 border-white relative bg-zinc-700 shrink-0">
                                        <div class="absolute -bottom-2 translate-x-1/2 right-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[clamp(0.55rem,1.5vw,0.6rem)] text-white font-bold shrink-0">+</div>
                                    </div>
                                    <div class="flex flex-col items-center gap-1 shrink-0"><Heart :size="32" fill="currentColor" class="text-red-500 shrink-0" /> <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold">542K</span></div>
                                    <div class="flex flex-col items-center gap-1 shrink-0"><MessageCircle :size="32" fill="currentColor" class="shrink-0" /> <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold">4521</span></div>
                                    <div class="flex flex-col items-center gap-1 shrink-0"><Bookmark :size="32" fill="currentColor" class="shrink-0" /> <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold">82.1K</span></div>
                                    <div class="flex flex-col items-center gap-1 shrink-0"><Share2 :size="32" fill="currentColor" class="shrink-0" /> <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold">12.5K</span></div>
                                    <div class="w-10 h-10 rounded-full bg-zinc-900 border-4 border-zinc-700 flex items-center justify-center animate-spin-slow overflow-hidden shrink-0">
                                        <Disc :size="24" class="shrink-0" />
                                    </div>
                                </div>
                                <div class="absolute left-4 bottom-8 right-20 space-y-3 text-white drop-shadow-md shrink-0">
                                    <h6 class="text-[clamp(0.75rem,2vw,0.85rem)] font-black">@kangjessydigital</h6>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] leading-relaxed line-clamp-3">Preview presisi untuk desain konten TikTok Anda. Pastikan Call to Action aman dari tombol share dan bookmark! #tiktokmarketing #tipsdesain</p>
                                    <div class="flex items-center gap-3 text-[clamp(0.65rem,1.8vw,0.7rem)] bg-black/20 w-max px-3 py-1 rounded-full border border-white/10 shrink-0">
                                        <Music :size="12" class="shrink-0" />
                                        <span class="overflow-hidden whitespace-nowrap">Taylor Swift - Cruel Summer</span>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- Scan Line Animation -->
                        <div class="absolute left-0 right-0 h-1 bg-accent-primary shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] z-30 animate-scan"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education -->
        <template #education>
            <div class="space-y-8 py-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-center">
                    Social UX Principles
                </div>
                <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight">Menghindari Hambatan Visual.</h4>
                <p class="text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed text-text-secondary">
                    Banyak kreator pemula membuat konten yang terlihat bagus di aplikasi pengeditan, namun saat diunggah, elemen penting seperti harga, judul, atau tombol <strong>tertutup oleh antarmuka aplikasi</strong>. Hal ini dapat menurunkan tingkat keterlibatan (engagement) karena pesan utama tidak tersampaikan dengan jelas.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-bg-secondary p-8 rounded-3xl border border-border-color space-y-4">
                         <Target :size="24" class="text-accent-primary shrink-0" />
                         <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black text-text-primary uppercase tracking-widest">The Center Rule</h5>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">Tempatkan teks dan elemen informatif utama di area tengah layar (Central Focus Area) untuk menjamin keterbacaan di semua jenis smartphone.</p>
                    </div>
                    <div class="bg-bg-secondary p-8 rounded-3xl border border-border-color space-y-4">
                         <AlertCircle :size="24" class="text-accent-secondary shrink-0" />
                         <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black text-text-primary uppercase tracking-widest">Bottom 25% Rule</h5>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">Hindari meletakkan teks penting di bagian bawah (25% dari tinggi layar) karena area ini hampir selalu didominasi oleh caption dan tombol navigasi.</p>
                    </div>
                </div>
                
                <div class="pt-8 border-t border-border-color flex flex-col items-center text-center space-y-6">
                    <h3 class="text-[clamp(1rem,2.5vw,1.25rem)] font-black text-text-primary">Butuh Konten yang Menonjol & Berkonversi?</h3>
                    <p class="text-[clamp(0.75rem,2vw,0.85rem)] text-text-secondary max-w-sm">Dapatkan desain konten media sosial eksklusif yang dirancang khusus untuk algoritma terbaru dan kenyamanan mata audiens.</p>
                    <BaseButton variant="primary" @click="consultWA" class="px-10 py-5 rounded-2xl font-black tracking-widest text-[clamp(0.65rem,1.5vw,0.7rem)] shrink-0">
                        Mulai Kerjasama Konten
                    </BaseButton>
                </div>
            </div>
        </template>

        <!-- History Item -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4 group">
                <div class="w-10 h-18 rounded-lg bg-bg-tertiary flex items-center justify-center border border-border-color overflow-hidden shrink-0">
                    <img :src="item.input.image" class="w-full h-full object-cover opacity-80 shrink-0">
                </div>
                <div class="flex flex-col min-w-0 gap-1">
                    <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-black text-text-primary uppercase tracking-tighter truncate">{{ item.input.platform }} ANALYSIS</span>
                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary font-bold uppercase tracking-widest truncate">{{ item.timestamp }}</span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
    Smartphone, ImageIcon, Eye, UploadCloud, RefreshCw, Zap,
    Heart, MessageCircle, Send, MoreVertical, Music, 
    Instagram, Bookmark, Disc, Target, AlertCircle, Wifi,
    Check, ChevronDown
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('safe-zone-architect');
const toast = useToast();
const popup = usePopupManager();

// State
const activePlatform = ref('ig-reels');
const userImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const showGrid = ref(true);

const platforms = [
    { id: 'ig-reels', name: 'Instagram Reels', icon: Instagram },
    { id: 'tiktok', name: 'TikTok Feed', icon: MessageCircle }
];

// Actions
const triggerUpload = () => {
    fileInput.value?.click();
};

const handleUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            userImage.value = e.target?.result as string;
            // Auto add to history for tracking
            addEntry({ platform: activePlatform.value, image: userImage.value }, 'Analyzed');
            toast.success('Desain berhasil diunggah!');
        };
        reader.readAsDataURL(file);
    }
};

const consultWA = () => {
    popup.openModal(Popups.CHAT_WA, {
        initialMessage: `Halo Kang Jessy! Saya baru saja menggunakan Social Content Safe-Zone Architect. Saya tertarik untuk mengonsultasikan pembuatan aset konten media sosial yang optimal untuk bisnis saya.`
    });
};

const restoreFromHistory = (item: any) => {
    userImage.value = item.input.image;
    activePlatform.value = item.input.platform;
    toast.info('Analisis desain dikembalikan');
};
</script>

<style scoped>
@keyframes scan {
    0% { top: 0%; opacity: 0.1; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0.1; }
}

.animate-scan {
    animation: scan 3s linear infinite;
}

@keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-spin-slow {
    animation: spin-slow 10s linear infinite;
}
</style>
