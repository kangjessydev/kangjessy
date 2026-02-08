<template>
    <ToolLayout title="Advanced WhatsApp Link Engineer"
        subtitle="Ciptakan link chat profesional yang didesain untuk meningkatkan konversi sales & kemudahan pelanggan."
        badge="Enterprise Growth Tool" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-10 pb-20">
            <!-- Main Interface -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <!-- Left: Control Panel -->
                <div class="lg:col-span-12 xl:col-span-7 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] p-0 md:p-10 md:shadow-sm space-y-8 relative overflow-hidden group">
                        <!-- Abstract Deco -->
                        <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                        
                        <div class="relative z-10 space-y-8">
                            <!-- Number Input -->
                            <div class="space-y-4">
                                <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                    <Smartphone :size="14" class="text-accent-primary shrink-0" />
                                    Nomor Tujuan Bisnis
                                </label>
                                <div class="flex flex-col md:flex-row gap-4">
                                    <div class="relative flex-1 group/input">
                                        <div class="absolute inset-y-0 left-4 flex items-center gap-2 pr-3 border-r border-border-color/50 text-text-primary font-bold text-[1rem]">
                                            <div class="w-6 h-4 bg-gray-100 rounded-none overflow-hidden flex items-center justify-center border border-border-color/30">
                                                <img src="https://flagcdn.com/w20/id.png" class="w-full h-full object-cover" alt="ID">
                                            </div>
                                            <span>+62</span>
                                        </div>
                                        <input v-model="phoneNumber" type="tel" placeholder="812 3456 7890"
                                            class="w-full bg-bg-tertiary border border-border-color rounded-2xl py-5 pl-24 pr-4 text-[1.1rem] font-black text-text-primary focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 outline-none transition-all font-mono"
                                            @input="cleanPhoneInput">
                                    </div>
                                    <div class="flex items-center gap-2 px-6 py-4 bg-bg-tertiary border border-border-color rounded-2xl shrink-0">
                                        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-text-tertiary">Link Siap Digunakan</span>
                                    </div>
                                </div>
                                <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary italic px-2">Format: Langsung angka setelah kode negara. Contoh: 811xxxxxxxx</p>
                            </div>

                            <!-- Message & Templates -->
                            <div class="space-y-4">
                                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                        <MessageSquareQuote :size="14" class="text-accent-primary shrink-0" />
                                        Pesan Pesanan/Salam Kustom
                                    </label>
                                    
                                    <!-- Templates Dropdown/Pills -->
                                    <div class="flex flex-wrap gap-2 text-[clamp(0.6rem,1.5vw,0.65rem)] uppercase font-black tracking-widest">
                                        <button v-for="t in templates" :key="t.name" @click="useTemplate(t.msg)"
                                            class="px-3 py-1.5 rounded-lg border border-border-color bg-bg-tertiary text-text-tertiary hover:border-accent-primary hover:text-accent-primary transition-all active:scale-95 shrink-0">
                                            {{ t.name }}
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="relative">
                                    <textarea ref="messageArea" v-model="message" rows="5"
                                        placeholder="Halo Kang Jessy, saya tertarik dengan layanan..."
                                        class="w-full bg-bg-tertiary border border-border-color rounded-[1.5rem] p-4 md:p-6 text-text-primary focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 outline-none transition-all resize-none text-[1rem] leading-relaxed custom-scrollbar"></textarea>
                                    
                                    <!-- Floating Formatter -->
                                    <div class="absolute bottom-4 right-4 flex items-center gap-1 bg-bg-secondary/80 backdrop-blur-md border border-border-color rounded-xl p-1 shadow-lg">
                                        <button @click="applyFormat('*')" class="w-8 h-8 flex items-center justify-center hover:bg-bg-tertiary rounded-lg text-sm font-black text-text-primary transition-colors">B</button>
                                        <button @click="applyFormat('_')" class="w-8 h-8 flex items-center justify-center hover:bg-bg-tertiary rounded-lg text-sm italic text-text-primary transition-colors">I</button>
                                        <button @click="applyFormat('~')" class="w-8 h-8 flex items-center justify-center hover:bg-bg-tertiary rounded-lg text-sm line-through text-text-primary transition-colors shrink-0">S</button>
                                        <div class="w-px h-4 bg-border-color mx-1 shrink-0"></div>
                                        <div class="flex items-center gap-1 px-2 text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold text-text-tertiary">
                                            <span>{{ message.length }}</span>
                                            <span class="opacity-30">/</span>
                                            <span>2000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <BaseButton variant="primary" 
                                class="w-full h-16 rounded-2xl text-[1rem] font-black shadow-2xl shadow-accent-primary/20 hover:-translate-y-1 transition-all"
                                :disabled="!isValidPhone" @click="generateAndSave">
                                <Zap :size="20" class="mr-3" />
                                Generate
                            </BaseButton>
                        </div>
                    </div>

                    <!-- AI Conversion Insights -->
                    <div v-if="isValidPhone" class="bg-linear-to-br from-bg-secondary to-bg-tertiary border border-border-color rounded-none md:rounded-[2.5rem] p-0 md:p-8 space-y-6 animate-in slide-in-from-top-4 duration-700">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                    <Sparkles :size="20" />
                                </div>
                                <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary">Conversion Optimization IQ</h5>
                            </div>
                            <div class="flex items-center gap-2 shrink-0">
                                <span class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-bold text-text-tertiary">Skor:</span>
                                <span class="text-[clamp(0.85rem,2vw,0.9rem)] font-black" :class="conversionScore >= 80 ? 'text-green-500' : 'text-yellow-500'">{{ conversionScore }}%</span>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="tip in conversionTips" :key="tip.title" class="p-4 rounded-2xl border border-border-color/50 bg-bg-secondary/50 flex gap-4">
                                <CheckCircle :size="16" class="text-green-500 shrink-0 mt-0.5" />
                                <div class="space-y-1">
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase text-text-primary">{{ tip.title }}</p>
                                    <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary leading-relaxed font-medium">{{ tip.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Preview & Result -->
                <div class="lg:col-span-12 xl:col-span-5 space-y-8 lg:sticky lg:top-24">
                    
                    <!-- Live Bubble Preview (Phone Mockup) -->
                    <div class="relative mx-auto w-full max-w-[340px]">
                        <div class="absolute -inset-4 bg-accent-primary/5 rounded-[3.5rem] blur-2xl"></div>
                        <div class="relative bg-bg-secondary border-[8px] border-border-color rounded-[3rem] overflow-hidden shadow-2xl aspect-[9/18.5]">
                            <!-- Phone Status Bar -->
                            <div class="h-10 bg-bg-secondary px-8 flex items-center justify-between shrink-0">
                                <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold text-text-primary">09:41</span>
                                <div class="flex items-center gap-1.5 shrink-0">
                                    <Wifi :size="12" class="shrink-0" />
                                    <Battery :size="14" class="shrink-0" />
                                </div>
                            </div>
                            <!-- Phone Header -->
                            <div class="p-4 bg-[#075e54] dark:bg-bg-tertiary flex items-center gap-3 shrink-0">
                                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <User :size="20" class="text-white/50 shrink-0" />
                                </div>
                                <div class="min-w-0">
                                    <p class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-black text-white truncate uppercase tracking-tight leading-none mb-1">Bisnis Anda</p>
                                    <p class="text-[clamp(0.5rem,1.5vw,0.55rem)] text-white/60 leading-none">Online</p>
                                </div>
                            </div>
                            <!-- Chat Area -->
                            <div class="flex-1 h-full bg-[#e5ddd5] dark:bg-[#0b141a] p-4 relative overflow-y-auto">
                                <div class="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>
                                
                                <div class="relative z-10 flex flex-col items-end gap-2 pt-10">
                                    <div v-if="message" 
                                        class="max-w-[85%] bg-[#dcf8c6] dark:bg-[#005c4b] text-[#303030] dark:text-[#e9edef] p-4 rounded-2xl rounded-tr-none shadow-sm text-[clamp(0.7rem,1.8vw,0.75rem)] relative animate-in zoom-in-95 duration-300">
                                        <p class="whitespace-pre-wrap leading-relaxed v-html-formatted" v-html="formattedPreview"></p>
                                        <div class="flex items-center justify-end gap-1 mt-1 opacity-50 text-[clamp(0.5rem,1.5vw,0.55rem)]">
                                            <span>{{ currentTime }}</span>
                                            <CheckCheck :size="10" class="text-blue-500 shrink-0" />
                                        </div>
                                    </div>
                                    <div v-else class="w-full h-32 flex items-center justify-center">
                                        <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-black/30 dark:text-white/20 italic font-medium px-8 text-center leading-relaxed">Ketik pesan di sebelah kiri untuk simulasi...</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Bottom Input Bar -->
                            <div class="p-3 bg-bg-secondary flex items-center gap-3 border-t border-border-color/30">
                                <div class="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-tertiary"><Paperclip :size="16" /></div>
                                <div class="flex-1 bg-bg-tertiary rounded-full h-8 px-4 flex items-center">
                                    <span class="text-[10px] text-text-tertiary">Ketik pesan...</span>
                                </div>
                                <div class="w-8 h-8 rounded-full bg-[#075e54] flex items-center justify-center text-white"><Mic :size="16" /></div>
                            </div>
                        </div>
                    </div>

                    <!-- Instant Results -->
                    <Transition name="fade-slide">
                        <div v-if="isValidPhone" class="bg-bg-secondary border border-border-color rounded-3xl md:rounded-[2.5rem] p-5 md:p-8 space-y-6 shadow-sm">
                            <div class="flex flex-col md:flex-row items-start gap-6">
                                <div class="w-28 h-28 bg-white rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-lg group relative border border-border-color overflow-hidden">
                                    <div class="absolute inset-0 bg-accent-primary/90 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white z-20 cursor-pointer" @click="downloadQR">
                                        <Download :size="24" />
                                        <span class="text-[clamp(0.5rem,1.5vw,0.55rem)] font-black uppercase mt-1">Unduh</span>
                                    </div>
                                    <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generatedLink)}`" 
                                        class="w-full h-full object-contain" alt="QR Code">
                                </div>
                                
                                <div class="flex-1 min-w-0 space-y-4 pt-2">
                                    <div>
                                        <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-tertiary uppercase tracking-widest mb-2 font-mono">LINK SIAP SEBAR ANDA:</p>
                                        <div class="flex gap-2">
                                            <div class="flex-1 bg-bg-tertiary border border-border-color rounded-xl p-4 text-[clamp(0.6rem,1.5vw,0.65rem)] font-mono text-accent-primary truncate">
                                                {{ generatedLink }}
                                            </div>
                                            <button @click="copyToClipboard" 
                                                class="w-12 h-12 bg-accent-primary text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-accent-primary/20 shrink-0">
                                                <Copy v-if="!copied" :size="18" />
                                                <Check v-else :size="18" />
                                            </button>
                                        </div>
                                    </div>

                                    <div class="flex flex-wrap gap-2">
                                        <a :href="generatedLink" target="_blank" 
                                            class="h-10 px-5 bg-text-primary text-bg-primary rounded-xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-accent-primary hover:text-white transition-all shrink-0">
                                            <MessageCircle :size="14" class="shrink-0" />
                                            Test Chat
                                        </a>
                                        <button @click="showShareModal = true" 
                                            class="h-10 px-5 bg-bg-tertiary border border-border-color text-text-secondary rounded-xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest flex items-center gap-2 hover:border-accent-primary transition-all shrink-0">
                                            <Share2 :size="14" class="shrink-0" />
                                            Bagikan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Strategic Lead Magnet -->
            <div class="bg-linear-to-br from-[#075e54] to-[#128c7e] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 text-white shadow-2xl relative overflow-hidden group">
                <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
                <div class="absolute top-1/2 left-10 -translate-y-1/2 opacity-10 pointer-events-none transition-transform group-hover:rotate-12 duration-1000">
                    <MessageSquare :size="240" />
                </div>

                <div class="relative z-10 max-w-3xl space-y-8">
                     <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-md border border-white/20 shrink-0">
                        <Zap :size="14" class="text-yellow-400 shrink-0" />
                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-center">Peluang Pertumbuhan</span>
                    </div>
                    <div class="space-y-4">
                        <h3 class="text-3xl md:text-5xl font-black tracking-tight leading-tight">Sulap Chat Jadi Money.<br><span class="text-white/60">WhatsApp Marketing Funnel.</span></h3>
                        <p class="text-[0.95rem] md:text-lg text-white/80 leading-relaxed max-w-xl">
                            Punya link WA tapi tidak ada yang beli? Mungkin strategi funnel Anda yang salah. Ayo bangun sistem otomatis yang menyulap setiap chat masuk menjadi pelanggan setia.
                        </p>
                    </div>
                    <BaseButton variant="secondary" class="h-16 px-10 rounded-[1.25rem] font-black text-[14px] shadow-2xl hover:-translate-y-1 transition-all" @click="consultWA">
                        Dapatkan Strategi WA Marketing
                    </BaseButton>
                </div>
            </div>
        </div>

        <BottomSheet v-model="showShareModal" title="Bagikan Link Link WhatsApp" :icon="Share2">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
                <button v-for="p in sharePlatforms" :key="p.name" @click="p.action"
                    class="flex flex-col items-center gap-3 p-6 rounded-3xl bg-bg-secondary border border-border-color hover:border-accent-primary transition-all group">
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl transition-transform group-hover:scale-110 shadow-lg" :style="{ backgroundColor: p.color }">
                        <component :is="p.icon" :size="28" />
                    </div>
                    <span class="text-xs font-black uppercase tracking-widest text-text-tertiary group-hover:text-text-primary">{{ p.name }}</span>
                </button>
            </div>
        </BottomSheet>

        <!-- Education Content -->
        <template #education>
            <div class="space-y-12 py-6">
                <div class="max-w-3xl space-y-4">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-center">
                        Digital Sales Funnel
                    </div>
                    <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight">Kenapa Bisnis Anda Butuh Link WA Dinamis?</h4>
                    <p class="text-[clamp(0.85rem,2vw,0.95rem)] text-text-secondary leading-relaxed">
                        Memaksa pelanggan menyimpan nomor secara manual adalah pembunuh konversi nomor satu. Pengguna mobile di tahun 2026 sangat malas. Satu klik adalah standar kenyamanan baru.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="edu in educationPoints" :key="edu.title" class="p-6 md:p-8 bg-bg-secondary rounded-3xl md:rounded-[2.5rem] border border-border-color space-y-5 hover:border-accent-primary transition-colors">
                        <div class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                            <component :is="edu.icon" :size="24" class="shrink-0" />
                        </div>
                        <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-primary">{{ edu.title }}</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">{{ edu.desc }}</p>
                    </div>
                </div>
            </div>
        </template>

        <!-- Custom History Item -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <MessageCircle :size="20" class="shrink-0" />
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-[clamp(0.75rem,1.8vw,0.85rem)] font-black text-text-primary truncate">+62 {{ item.input.phone }}</span>
                    <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary truncate leading-none mt-1 font-medium">{{ item.input.msg || 'Tanpa Pesan' }}</span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
    Zap, Copy, Check, MessageCircle, Share2, Download, 
    MessageSquare, Smartphone, CheckCircle, Sparkles,
    User, Wifi, Battery, CheckCheck, Paperclip, Mic,
    MessageSquareQuote, Globe, MousePointerClick, History
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

const phoneNumber = ref('');
const message = ref('');
const copied = ref(false);
const messageArea = ref<HTMLTextAreaElement | null>(null);
const showShareModal = ref(false);

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('wa-v2');
const popup = usePopupManager();

const templates = [
    { name: 'Info Pesanan', msg: 'Halo Kang Jessy, saya mau tanya soal biaya pembuatan website untuk [Nama Bisnis]. Mohon infonya ya!' },
    { name: 'Bantuan', msg: 'Halo, saya butuh bantuan teknis terkait website saya. Bisa bantu cek, min?' },
    { name: 'Kolaborasi', msg: 'Halo Kang Jessy, saya dari [Nama Brand] ingin mengajukan tawaran kolaborasi strategi digital.' }
];

const conversionTips = [
    { title: 'Salam Terpersonalisas', desc: 'Gunakan nama brand Anda di pesan pembuka agar pelanggan merasa lebih akrab.' },
    { title: 'Call to Action Jelas', desc: 'Pastikan pesan menanyakan hal spesifik agar Anda lebih mudah membalasnya.' },
    { title: 'Poin Jualan Tebal', desc: 'Gunakan *bold* pada kata kunci seperti *Flash Sale* atau *Promo*.' },
    { title: 'Batas Karakter', desc: 'Pesan yang terlalu panjang (lebih dari 300 karakter) cenderung diabaikan.' }
];

const educationPoints = [
    { icon: MousePointerClick, title: 'Tanpa Hambatan', desc: 'Menghilangkan hambatan psikologis pelanggan saat ingin menghubungi Anda.' },
    { icon: Globe, title: 'Klik Iklan Mudah', desc: 'Link ini sangat krusial untuk dipasang pada Iklan Facebook atau Iklan TikTok (CTA).' },
    { icon: History, title: 'Pelacakan Lead', desc: 'Pesan kustom membantu Anda tahu campaign mana yang paling banyak menghasilkan chat.' }
];

const sharePlatforms = [
    { name: 'WhatsApp', icon: MessageCircle, color: '#25D366', action: () => openExternal(`https://wa.me/?text=${encodeURIComponent(generatedLink.value)}`) },
    { name: 'X / Twitter', icon: Globe, color: '#000000', action: () => openExternal(`https://twitter.com/intent/tweet?url=${encodeURIComponent(generatedLink.value)}`) },
    { name: 'Telegram', icon: MessageSquare, color: '#0088cc', action: () => openExternal(`https://t.me/share/url?url=${encodeURIComponent(generatedLink.value)}`) },
    { name: 'Email', icon: MessageSquareQuote, color: '#EA4335', action: () => openExternal(`mailto:?body=${encodeURIComponent(generatedLink.value)}`) }
];

function openExternal(url: string) {
    window.open(url, '_blank');
}

const isValidPhone = computed(() => {
    const clean = phoneNumber.value.replace(/\D/g, '');
    return clean.length >= 8 && clean.length <= 15;
});

const cleanPhoneInput = () => {
    phoneNumber.value = phoneNumber.value.replace(/\D/g, '').substring(0, 15);
};

const generatedLink = computed(() => {
    if (!isValidPhone.value) return '';
    const clean = phoneNumber.value.startsWith('0') ? phoneNumber.value.substring(1) : phoneNumber.value;
    const base = 'https://wa.me/62';
    const msg = message.value ? `?text=${encodeURIComponent(message.value)}` : '';
    return `${base}${clean}${msg}`;
});

const conversionScore = computed(() => {
    if (!message.value) return 40;
    let score = 50;
    if (message.value.length > 20 && message.value.length < 150) score += 20;
    if (message.value.includes('*')) score += 10;
    if (message.value.includes('?')) score += 10;
    if (message.value.length > 300) score -= 10;
    return Math.min(100, Math.max(0, score));
});

const formattedPreview = computed(() => {
    if (!message.value) return '';
    return message.value
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        .replace(/~(.*?)~/g, '<del>$1</del>')
        .replace(/```(.*?)```/gs, '<code class="bg-black/10 px-1 rounded">$1</code>');
});

const currentTime = computed(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
});

function useTemplate(msg: string) {
    message.value = msg;
}

function applyFormat(symbol: string) {
    if (!messageArea.value) return;
    const t = messageArea.value;
    const s = t.selectionStart;
    const e = t.selectionEnd;
    const sel = message.value.substring(s, e);
    message.value = message.value.substring(0, s) + symbol + sel + symbol + message.value.substring(e);
    setTimeout(() => {
        t.focus();
        t.setSelectionRange(s + symbol.length, s + symbol.length + sel.length);
    }, 0);
}

function generateAndSave() {
    if (!isValidPhone.value) return;
    addEntry({ phone: phoneNumber.value, msg: message.value }, generatedLink.value);
}

function copyToClipboard() {
    if (!generatedLink.value) return;
    navigator.clipboard.writeText(generatedLink.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
}

async function downloadQR() {
    if (!generatedLink.value) return;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(generatedLink.value)}`;
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const bUrl = window.URL.createObjectURL(blob);
        const l = document.createElement('a');
        l.href = bUrl;
        l.download = `WA_QR_BrandReady.png`;
        l.click();
    } catch {
        window.open(url, '_blank');
    }
}

function restoreFromHistory(item: any) {
    phoneNumber.value = item.input.phone;
    message.value = item.input.msg;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function consultWA() {
    popup.openModal(Popups.CHAT_WA, { 
        initialMessage: `Halo Kang Jessy! Saya ingin konsultasi strategi WhatsApp Marketing & Funnel untuk bisnis saya. Baru saja mencoba Advanced WA Link Engineer Anda dan merasa ini sangat potensial.` 
    });
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(20px); }

.v-html-formatted :deep(strong) { font-weight: 800; color: inherit; }
.v-html-formatted :deep(em) { font-style: italic; }
.v-html-formatted :deep(del) { text-decoration: line-through; opacity: 0.6; }
</style>
