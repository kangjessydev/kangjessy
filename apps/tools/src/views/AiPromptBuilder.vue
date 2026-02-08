<template>
    <ToolLayout title="Affiliate Context Architect"
        subtitle="Ubah foto produk biasa (foto HP) menjadi foto/video katalog profesional. Ciptakan prompt pendamping untuk AI Generator Pro."
        badge="Product Enhancer" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <template #default>
            <div class="space-y-12">
                <!-- STEP 1: TAB SELECTOR (FIXED TOGGLE) -->
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex-1 space-y-2">
                        <h3 class="text-xl font-black text-text-primary uppercase tracking-tight">Pilih Target Output</h3>
                        <p class="text-sm text-text-tertiary font-medium">Ingin mengubah foto HP Anda menjadi Gambar Estetik atau Video Sinematik?</p>
                    </div>
                    
                    <div class="inline-flex p-1.5 bg-bg-secondary border border-border-color rounded-2xl md:rounded-3xl shadow-inner shrink-0">
                        <button @click="isVideoMode = false" 
                            class="flex items-center gap-3 px-6 py-3 rounded-xl md:rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all"
                            :class="!isVideoMode ? 'bg-indigo-500 text-white shadow-lg' : 'text-text-tertiary hover:text-text-primary'">
                            <Camera :size="16" /> Photo Mode
                        </button>
                        <button @click="isVideoMode = true" 
                            class="flex items-center gap-3 px-6 py-3 rounded-xl md:rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all"
                            :class="isVideoMode ? 'bg-accent-primary text-white shadow-lg' : 'text-text-tertiary hover:text-text-primary'">
                            <Video :size="16" /> Video Mode
                        </button>
                    </div>
                </div>

                <!-- STEP 2: GUIDE BOX & BETA NOTICE -->
                <div class="space-y-4">
                    <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                            <AlertTriangle :size="20" />
                        </div>
                        <div class="space-y-0.5">
                            <h4 class="text-[10px] font-black text-amber-500 uppercase tracking-widest">Experimental Feature (Beta)</h4>
                            <p class="text-[10px] text-text-tertiary font-medium">Tool ini masih dalam tahap pengembangan intensif untuk akurasi maksimal. Mohon maklum jika hasil belum 100% sempurna.</p>
                        </div>
                    </div>

                    <div class="bg-indigo-500/5 border border-indigo-500/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8">
                        <div class="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/20 transform -rotate-3">
                            <component :is="isVideoMode ? Video : ImagePlus" :size="32" />
                        </div>
                        <div class="space-y-2">
                            <h4 class="text-sm font-black text-indigo-400 uppercase tracking-widest">Alur Kerja {{ isVideoMode ? 'Image-to-Video' : 'Image-to-Image' }}</h4>
                            <p class="text-[clamp(0.75rem,2vw,0.8rem)] text-text-secondary leading-relaxed font-medium">
                                Siapkan <strong class="text-text-primary underline">Foto Produk HP</strong> Anda. Upload ke AI, lalu gunakan prompt di bawah untuk memberitahu AI suasana atau gerakan yang diinginkan.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- STEP 3: PRODUCT IDENTIFICATION -->
                <div class="space-y-8 pt-10 border-t border-border-color/30">
                    <div class="flex items-center gap-5">
                        <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary text-white text-lg font-black shadow-xl shadow-accent-primary/20 rotate-3">1</div>
                        <div>
                            <h3 class="text-[clamp(0.8rem,2vw,0.85rem)] font-black text-text-primary uppercase tracking-[0.25em]">Identitas Produk</h3>
                            <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Sebutkan nama produk di foto Anda agar AI lebih akurat mendeteksinya.</p>
                        </div>
                    </div>

                    <div class="relative group">
                        <input v-model="productName" type="text" placeholder="Contoh: Botol Parfum, Sepatu Sneakers, Jam Tangan..."
                            class="w-full bg-bg-secondary border-2 border-border-color rounded-2xl px-6 py-5 text-lg font-bold placeholder:text-text-tertiary/30 focus:border-accent-primary outline-none transition-all">
                    </div>
                </div>

                <!-- STEP 4: CONTEXT / MOTION (WITH DESCRIPTIONS) -->
                <div class="space-y-10 pt-10 border-t border-border-color/30">
                    <div class="flex items-center justify-between gap-6">
                        <div class="flex items-center gap-5">
                            <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-secondary text-white text-lg font-black shadow-xl shadow-accent-secondary/20 -rotate-3 shrink-0">2</div>
                            <div>
                                <h3 class="text-[clamp(0.8rem,2vw,0.85rem)] font-black text-text-primary uppercase tracking-[0.25em]">{{ isVideoMode ? 'Pilih Gerakan (Motion)' : 'Pilih Konteks Visual' }}</h3>
                                <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">{{ isVideoMode ? 'Tentukan bagaimana kamera harus meng-explore produk Anda.' : 'Pilih suasana terbaik yang bakal naikin nilai jual produknya.' }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div v-for="category in activeCategories" :key="category.id"
                            class="bg-bg-secondary border border-border-color rounded-[2.5rem] p-8 space-y-6 group hover:border-accent-primary/30 transition-all">
                            <div class="flex items-center gap-4 border-b border-border-color pb-4">
                                <div class="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all transform group-hover:scale-110">
                                    <component :is="category.icon" :size="20" />
                                </div>
                                <h4 class="text-[11px] font-black text-text-primary uppercase tracking-widest">{{ category.name }}</h4>
                            </div>
                            <div class="flex flex-col gap-3">
                                <button v-for="mod in category.modifiers" :key="mod.id"
                                    @click="toggleModifier(mod)"
                                    class="w-full px-5 py-5 rounded-2xl border transition-all flex flex-col gap-1 text-left relative"
                                    :class="isModifierSelected(mod) ? 'bg-accent-primary border-accent-primary text-white scale-[1.02] shadow-xl' : 'bg-bg-tertiary border-border-color text-text-tertiary hover:border-accent-primary/50 hover:text-text-primary'">
                                    <div class="flex items-center justify-between w-full mb-1">
                                        <span class="text-[11px] font-black uppercase">{{ mod.label }}</span>
                                        <div v-if="isModifierSelected(mod)" class="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                            <Check :size="10" stroke-width="4" class="text-accent-primary" />
                                        </div>
                                    </div>
                                    <span class="text-[9px] font-medium leading-tight opacity-70" :class="isModifierSelected(mod) ? 'text-white' : 'text-text-tertiary'">{{ mod.desc }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STEP 5: FINAL OUTPUT -->
                <div v-if="generatedPrompt" class="pt-10 border-t border-border-color/30 animate-in slide-in-from-bottom-8 duration-700">
                    <div class="flex items-center gap-5 mb-10">
                        <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500 text-white text-lg font-black shadow-xl shadow-green-500/20 rotate-12 shrink-0">3</div>
                        <h3 class="text-[clamp(0.8rem,2vw,0.85rem)] font-black text-text-primary uppercase tracking-[0.25em]">Prompt Pendamping {{ isVideoMode ? 'Video' : 'Photo' }}</h3>
                    </div>

                    <div class="bg-bg-secondary border border-border-color rounded-[3rem] p-8 md:p-14 relative overflow-hidden group">
                        <div class="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/20 blur-[100px] rounded-full"></div>
                        
                        <div class="relative max-w-4xl mx-auto space-y-12">
                            <!-- Prompt Container -->
                            <div class="relative group">
                                <div class="w-full bg-bg-tertiary border-2 border-dashed border-border-color rounded-[2.5rem] p-8 md:p-12 text-left text-text-primary text-lg md:text-2xl leading-relaxed font-bold italic select-all group-hover:border-accent-primary/40 transition-all shadow-inner">
                                    {{ generatedPrompt }}
                                </div>
                                <div class="mt-4 flex items-center gap-2 px-6">
                                    <div class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                                    <p class="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Accuracy Tuning: Logic sedang dalam optimalisasi mingguan</p>
                                </div>
                                <button @click="copyPrompt"
                                    class="absolute -top-10 -right-6 md:-right-10 w-24 h-24 bg-accent-primary text-white rounded-3xl shadow-2xl hover:scale-110 active:scale-90 transition-all z-20 flex flex-col items-center justify-center gap-1 shrink-0">
                                    <Copy v-if="!copied" :size="28" />
                                    <Check v-else :size="28" />
                                    <span class="text-[9px] font-black uppercase tracking-widest">{{ copied ? 'COPIED!' : 'COPY' }}</span>
                                </button>
                            </div>

                            <!-- THE "ULTIMATE GUIDE" -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-border-color/30 pt-10">
                                <div class="space-y-6">
                                    <h4 class="text-xs font-black text-accent-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                        <CloudUpload :size="14" /> Tutorial Eksekusi
                                    </h4>
                                    <div class="space-y-4">
                                        <div class="flex gap-4 items-start">
                                            <div class="px-2 py-0.5 bg-bg-tertiary rounded text-[10px] font-black text-text-primary shrink-0">1</div>
                                            <p v-if="!isVideoMode" class="text-[11px] text-text-secondary leading-relaxed">Pake ChatGPT/Midjourney, lalu <strong class="text-text-primary">Upload Foto Produk HP</strong> Anda.</p>
                                            <p v-else class="text-[11px] text-text-secondary leading-relaxed">Buka <strong class="text-text-primary">Luma Dream Machine</strong> atau <strong class="text-text-primary">Kling AI</strong>, lalu <strong class="text-text-primary">Upload Foto Produk</strong> Anda.</p>
                                        </div>
                                        <div class="flex gap-4 items-start">
                                            <div class="px-2 py-0.5 bg-bg-tertiary rounded text-[10px] font-black text-text-primary shrink-0">2</div>
                                            <p class="text-[11px] text-text-secondary leading-relaxed">Setelah foto muncul, <strong class="text-text-primary">Paste Prompt</strong> di atas k kolom pesan.</p>
                                        </div>
                                        <div class="flex gap-4 items-start">
                                            <div class="px-2 py-0.5 bg-bg-tertiary rounded text-[10px] font-black text-text-primary shrink-0">3</div>
                                            <p class="text-[11px] text-text-secondary leading-relaxed">Tekan Enter dan biarkan AI menyulapnya jadi konten pro!</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-6">
                                    <h4 class="text-xs font-black text-accent-secondary uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Zap :size="14" /> Tips Cerdas
                                    </h4>
                                    <p class="text-[11px] text-text-tertiary leading-relaxed font-medium">
                                        {{ isVideoMode ? 'Gunakan mode Orbital Pan untuk barang yang punya bentuk unik agar ter-explore semua sisinya.' : 'Latar marmer atau minimalis akan langsung menaikkan "harga" barang di mata pembeli.' }}
                                    </p>
                                    <div class="p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl flex items-center gap-3">
                                        <UserCheck :size="16" class="text-accent-primary" />
                                        <span class="text-[9px] font-black text-accent-primary uppercase tracking-widest">Konten Pro = Pembeli Gak Ragu!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #education>
            <div class="py-12 px-8 bg-bg-secondary rounded-[3rem] border border-border-color">
                <div class="max-w-3xl space-y-6">
                    <h4 class="text-xl font-black text-text-primary tracking-tight">Kekuatan Konteks Visual</h4>
                    <p class="text-sm text-text-secondary leading-relaxed">
                        User zaman sekarang bosen sama foto putih polos. Mereka pengen liat produk "hidup" di lingkungannya. Prompt ini didesain agar AI gak ngerubah bentuk asli barang Anda, tapi cuman ngerubah sekelilingnya jadi jauh lebih estetik.
                    </p>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Copy, Check, Zap, ImagePlus, CloudUpload,
    Palette, Camera, Sun, Video,
    UserCheck, Layers, Move, AlertTriangle
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';

const { history, addEntry, clearHistory, removeEntry } = useToolHistory('aff-context-architect-v6');
const toast = useToast();

const productName = ref('');
const isVideoMode = ref(false);
const selectedModifiers = ref<any[]>([]);
const copied = ref(false);

const imageCategories = [
    {
        id: 'setting',
        name: 'The Setting (Suasana)',
        icon: Layers,
        modifiers: [
            { id: 'marble', label: 'Luxury Marble', value: 'placed on a high-end white marble countertop with clean shadows', desc: 'Meja marmer mewah, bersih, refleksi tajam.' },
            { id: 'interior', label: 'Zen Minimalist', value: 'inside a modern minimalist zen-style interior with soft morning sunlight', desc: 'Ruangan minimalis, cahaya jendela lembut.' },
            { id: 'nature', label: 'Organic Garden', value: 'surrounded by lush green foliage and tropical plants, natural outdoor setting', desc: 'Taman hijau segar, cahaya matahari asri.' },
            { id: 'studio', label: 'Pure Studio', value: 'in a professional photography studio with a plain soft gray background', desc: 'Background polos, fokus 100% ke produk.' }
        ]
    },
    {
        id: 'vibe',
        name: 'The Vibe (Style)',
        icon: Palette,
        modifiers: [
            { id: 'ugc', label: 'Authentic UGC', value: 'realistic user-generated content aesthetic, candid social media feel', desc: 'Gaya foto HP agar pembeli lebih percaya.' },
            { id: 'luxury', label: 'Boutique Fancy', value: 'boutique advertising style, expensive look, high-end finishing', desc: 'Gaya iklan brand mahal yang sangat bersih.' },
            { id: 'moody', label: 'Dramatic Dark', value: 'moody atmosphere with deep blacks and sharp cinematic lighting contrast', desc: 'Aura misterius, bayangan tajam, maskulin.' }
        ]
    },
    {
        id: 'camera',
        name: 'Camera Logic',
        icon: Camera,
        modifiers: [
            { id: 'bokeh', label: 'Dreamy Bokeh', value: 'shallow depth of field, blurred professional background focus', desc: 'Latar belakang blur cantik, fokus ke produk.' },
            { id: 'flat', label: 'Flatlay Art', value: 'top-down flatlay perspective, perfectly organized composition', desc: 'Foto dari atas, properti disusun rapi.' },
            { id: 'macro', label: 'Macro Texture', value: 'close-up macro focus on the product textures and fine details', desc: 'Zoom sangat dekat untuk bedah detail bahan.' }
        ]
    },
    {
        id: 'human',
        name: 'Human Presence (Model)',
        icon: UserCheck,
        modifiers: [
            { id: 'holding', label: 'Holding Product', value: 'a pair of elegant hands holding the product gently, focus on product', desc: 'Hanya tangan yang memegang produk, fokus ke detail barang.' },
            { id: 'using', label: 'Actively Using', value: 'a person actively using the product in a daily lifestyle setting', desc: 'Model sedang menggunakan produk (misal: pakai serum/ikat sepatu).' },
            { id: 'admire', label: 'Admiration Look', value: 'a happy person looking at the product with a satisfied smile, focus on product', desc: 'Model menatap produk dengan wajah kagum & puas.' },
            { id: 'asian', label: 'S.E. Asian User', value: 'featuring a relatable South East Asian person as the user', desc: 'Model wajah lokal (Indonesia/ASEAN) agar lebih relevan.' }
        ]
    }
];

const videoCategories = [
    {
        id: 'motion',
        name: 'Camera Motion',
        icon: Move,
        modifiers: [
            { id: 'orbital', label: 'Orbital Pan', value: 'dynamic orbital camera rotation around the product, cinematic slow motion', desc: 'Kamera berputar 360 derajat mengelilingi produk.' },
            { id: 'zoom', label: 'Slow Zoom-In', value: 'smooth cinematic slow zoom-in towards the product details', desc: 'Mendekat perlahan ke arah merk/detail utama.' },
            { id: 'drone', label: 'Drone Flyby', value: 'aerial drone fly-over perspective, low altitude cinematic flow', desc: 'Efek kamera terbang rendah melewati produk.' },
            { id: 'dolly', label: 'Dolly Track', value: 'professional smooth dolly track movement from left to right', desc: 'Geser horizontal halus (Kiri ke Kanan).' }
        ]
    },
    {
        id: 'env_v',
        name: 'Atmosphere Effect',
        icon: Sun,
        modifiers: [
            { id: 'light', label: 'Light Sweeps', value: 'cinematic anamorphic light sweeps passing over the product', desc: 'Pantulan garis cahaya lewat di atas produk.' },
            { id: 'smoke', label: 'Mystic Fog', value: 'subtle elegant smoke or fog swirling around the product base', desc: 'Asap tipis mewah mengalir di sekitar produk.' },
            { id: 'particles', label: 'Magic Dust', value: 'floating dust particles in golden hour sunlight, magical feeling', desc: 'Butiran debu emas melayang di cahaya surya.' }
        ]
    },
    {
        id: 'speed',
        name: 'Timing Style',
        icon: Zap,
        modifiers: [
            { id: 'slow', label: 'Elegant Slow-Mo', value: 'hyper slow motion, emphasizing every detail and reflection', desc: 'Gerakan super lambat agar refleksi terlihat.' },
            { id: 'ramping', label: 'Speed Ramp', value: 'cinematic speed ramping from fast to slow focus motion', desc: 'Gerakan cepat lalu melambat (efek dramatis).' },
            { id: 'organic', label: 'Organic Shake', value: 'natural handheld camera movement, very subtle organic shake', desc: 'Goyangan HP lembut agar terasa manusiawi.' }
        ]
    },
    {
        id: 'human_v',
        name: 'Human Interaction',
        icon: UserCheck,
        modifiers: [
            { id: 'hand_v', label: 'Hand Demo', value: 'elegant hands performing a slow demo of the product', desc: 'Tangan sedang mendemokan cara pakai (unboxing/apply).' },
            { id: 'smile_v', label: 'User Reaction', value: 'happy person reacting to the product in a lifestyle video', desc: 'Ekspresi senang orang saat menggunakan produk.' },
            { id: 'walking', label: 'Walking Model', value: 'a person walking while carrying/wearing the product cinematically', desc: 'Model berjalan sambil membawa/memakai produk.' }
        ]
    }
];

const activeCategories = computed(() => {
    return isVideoMode.value ? videoCategories : imageCategories;
});

const generatedPrompt = computed(() => {
    if (!productName.value && selectedModifiers.value.length === 0) return '';
    
    const parts = [];
    const item = productName.value || 'this product';
    
    if (isVideoMode.value) {
        parts.push(`Cinematic commercial video of ${item} from the uploaded photo`);
        selectedModifiers.value.forEach(m => parts.push(m.value));
        parts.push('maintaining strict visual consistency with the original image, 4k, hyper-realistic, professional video coloring, high commercial quality');
    } else {
        parts.push(`Based on the uploaded image, generate a professional commercial photo of ${item}`);
        selectedModifiers.value.forEach(m => parts.push(m.value));
        parts.push('maintaining the original product design and proportions, 8k resolution, photorealistic, ray tracing, studio lighting --ar 3:4 --v 6.0 --stylize 250');
    }
    
    return parts.join(', ');
});

const isModifierSelected = (m: any) => selectedModifiers.value.some(mod => mod.id === m.id);

const toggleModifier = (m: any) => {
    const idx = selectedModifiers.value.findIndex(mod => mod.id === m.id);
    if (idx === -1) selectedModifiers.value.push(m);
    else selectedModifiers.value.splice(idx, 1);
};

const copyPrompt = async () => {
    if (!generatedPrompt.value) return;
    try {
        await navigator.clipboard.writeText(generatedPrompt.value);
        copied.value = true;
        toast.success(`Prompt ${isVideoMode.value ? 'Video' : 'Photo'} Berhasil Disalin!`);
        addEntry({ product: productName.value, mode: isVideoMode.value ? 'video' : 'photo' }, generatedPrompt.value);
        setTimeout(() => { copied.value = false; }, 2000);
    } catch { toast.error('Gagal menyalin.'); }
};

const restoreFromHistory = (item: any) => {
    productName.value = item.input.product;
    isVideoMode.value = item.input.mode === 'video';
};
</script>

<style scoped>
@keyframes rotate-3 {
  from { transform: rotate(0deg); }
  to { transform: rotate(3deg); }
}
</style>
