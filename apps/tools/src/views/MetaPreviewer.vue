<template>
    <ToolLayout title="Social & Search Preview Engineer"
        subtitle="Simulasi tampilan link paling presisi. Pastikan brand Anda terlihat mahal & profesional saat dibagikan."
        badge="Enterprise SEO" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">
        
        <div class="space-y-10">
            <!-- Main Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Control Panel -->
                <div class="lg:col-span-5 space-y-8">
                    <!-- URL Fetch Card -->
                    <div class="bg-bg-secondary border border-border-color rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 md:shadow-sm relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                            <Search :size="80" />
                        </div>
                        
                        <div class="relative z-10 space-y-6">
                            <div class="space-y-2">
                                <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                    <Globe :size="14" class="text-accent-primary shrink-0" />
                                    Ambil Data Otomatis
                                </label>
                                <div class="flex gap-3">
                                    <div class="relative flex-1 group/url">
                                        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none font-mono">
                                            <span class="text-text-tertiary text-sm opacity-50">https://</span>
                                        </div>
                                        <input v-model="targetUrl" type="text" placeholder="website-kamu.com"
                                            class="w-full bg-bg-tertiary border border-border-color rounded-2xl py-4 pl-[4.8rem] pr-5 text-text-primary focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 outline-none transition-all font-mono text-sm"
                                            @keyup.enter="fetchMeta">
                                    </div>
                                    <BaseButton variant="primary" :disabled="!isValidUrl || loading" @click="fetchMeta"
                                        class="px-5 h-[54px] rounded-xl shadow-lg shadow-accent-primary/20 shrink-0">
                                        <Search v-if="!loading" :size="20" class="shrink-0" />
                                        <Loader2 v-else class="animate-spin shrink-0" :size="20" />
                                    </BaseButton>
                                </div>
                                <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary italic font-medium">Masukkan URL lengkap untuk simulasi instan.</p>
                            </div>

                            <!-- Interactive Fields -->
                            <div class="pt-6 border-t border-border-color/30 space-y-6">
                                <div class="space-y-2">
                                    <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-tertiary">Fokus Kata Kunci</label>
                                    <input v-model="focusKeyword" type="text" placeholder="Misal: Jasa Desain Agency..."
                                        class="w-full bg-accent-primary/5 border border-accent-primary/20 rounded-2xl p-4 text-text-primary focus:border-accent-primary outline-none text-sm font-bold placeholder:text-text-tertiary/40">
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between items-end mb-1">
                                        <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-tertiary">Judul Halaman (Title)</label>
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold" :class="metaTitle.length > 60 || metaTitle.length < 40 ? 'text-yellow-500' : 'text-green-500'">
                                            {{ metaTitle.length }} / 60
                                        </span>
                                    </div>
                                    <input v-model="metaTitle" type="text" maxlength="100"
                                        class="w-full bg-bg-tertiary border border-border-color rounded-2xl p-4 text-text-primary focus:border-accent-primary outline-none text-sm font-medium">
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between items-end mb-1">
                                        <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-tertiary">Meta Deskripsi</label>
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-bold" :class="metaDescription.length > 156 || metaDescription.length < 120 ? 'text-yellow-500' : 'text-green-500'">
                                            {{ metaDescription.length }} / 156
                                        </span>
                                    </div>
                                    <textarea v-model="metaDescription" rows="3" maxlength="200"
                                        class="w-full bg-bg-tertiary border border-border-color rounded-2xl p-4 text-text-primary focus:border-accent-primary outline-none text-sm font-medium resize-none leading-relaxed"></textarea>
                                </div>

                                <div class="space-y-2">
                                    <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-tertiary">URL Gambar Preview (OG Image)</label>
                                    <div class="flex gap-3">
                                        <input v-model="metaImage" type="url" placeholder="https://domain.com/social-card.jpg"
                                            class="flex-1 bg-bg-tertiary border border-border-color rounded-2xl py-4 px-4 text-text-primary focus:border-accent-primary outline-none font-mono text-xs">
                                        <div class="w-14 h-14 rounded-xl bg-bg-tertiary border border-border-color overflow-hidden shrink-0 shadow-inner group/img relative">
                                            <img v-if="metaImage" :src="metaImage" class="w-full h-full object-cover" @error="metaImage = ''">
                                            <div v-else class="w-full h-full flex items-center justify-center text-text-tertiary opacity-30">
                                                <ImageIcon :size="20" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SEO Health Card -->
                    <div class="bg-bg-secondary border border-border-color rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 space-y-6 relative overflow-hidden md:shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                    <Zap :size="20" />
                                </div>
                                <h4 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-widest text-text-primary">Audit Visual SEO</h4>
                            </div>
                            <div v-if="seoAnalysis.length" class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20 shrink-0">
                                {{ seoAnalysis.filter(c => c.status === 'success').length }} / {{ seoAnalysis.length }} PASSED
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div v-for="(check, idx) in seoAnalysis" :key="idx" 
                                class="flex items-start gap-4 p-4 rounded-2xl border border-border-color/50 transition-all hover:bg-bg-tertiary/40 group">
                                <div class="shrink-0 mt-0.5">
                                    <CheckCircle2 v-if="check.status === 'success'" :size="18" class="text-green-500" />
                                    <AlertTriangle v-else-if="check.status === 'error'" :size="18" class="text-red-500" />
                                    <AlertCircle v-else :size="18" class="text-yellow-500" />
                                </div>
                                <div class="flex flex-col gap-0.5">
                                    <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] font-black text-text-primary group-hover:text-accent-primary transition-colors">{{ check.label }}</span>
                                    <span class="text-[clamp(0.65rem,1.5vw,0.7rem)] text-text-tertiary leading-snug font-medium">{{ check.desc }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Consultation CTA -->
                        <div class="pt-4">
                            <BaseButton variant="secondary" @click="openConsultation" class="w-full py-4 rounded-2xl text-[clamp(0.65rem,1.5vw,0.7rem)] font-black uppercase tracking-widest border-accent-primary/20 hover:border-accent-primary transition-all">
                                <MessageSquare :size="14" class="mr-2 shrink-0" />
                                Konsultasi Strategis
                            </BaseButton>
                        </div>
                    </div>
                </div>

                <!-- Right: Previews Panel -->
                <div class="lg:col-span-7 space-y-8">
                    <div class="bg-bg-secondary border border-border-color rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 space-y-12 md:shadow-sm">
                        <div class="flex items-center justify-between">
                            <h4 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.25em] text-text-tertiary">Real-time Mockup Previews</h4>
                            <div class="hidden sm:flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div class="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div class="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>

                        <!-- Mockup Screens -->
                        <div class="space-y-12 max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar pb-10">
                            
                            <!-- Google Search Preview -->
                            <div class="space-y-4">
                                <div class="flex items-center gap-2 text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-tertiary uppercase tracking-widest px-2">
                                    <Search :size="12" class="shrink-0" /> Google Search
                                </div>
                                <div class="bg-white p-6 md:p-8 rounded-3xl shadow-2xl shadow-black/5 dark:shadow-none transition-all hover:scale-[1.01]">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                            <Globe :size="12" class="text-gray-400" />
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-[clamp(0.7rem,1.8vw,0.75rem)] text-[#202124] font-normal leading-none">{{ hostName.toLowerCase() }}.com</span>
                                            <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-[#70757a] font-normal leading-none mt-0.5">https://{{ displayUrl }}</span>
                                        </div>
                                    </div>
                                    <h3 class="text-[#1a0dab] text-xl font-medium leading-tight mb-1 hover:underline cursor-pointer">
                                        {{ metaTitle || 'Example Professional Service Page' }}
                                    </h3>
                                    <p class="text-[#4d5156] text-sm leading-relaxed line-clamp-2">
                                        {{ metaDescription || 'Berikan deskripsi yang menarik untuk meningkatkan CTR klik di hasil pencarian Google. Pastikan menyertakan Unique Value Proposition bisnis Anda.' }}
                                    </p>
                                </div>
                            </div>

                            <!-- Facebook Preview -->
                            <div class="space-y-4">
                                <div class="flex items-center gap-2 text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-tertiary uppercase tracking-widest px-2">
                                    <Share2 :size="12" class="shrink-0" /> Facebook / Social Post
                                </div>
                                <div class="bg-[#f0f2f5] dark:bg-[#1c1e21] rounded-2xl overflow-hidden border border-border-color shadow-xl transition-all hover:scale-[1.01]">
                                    <div class="aspect-[1.91/1] w-full bg-bg-tertiary relative overflow-hidden group">
                                        <img v-if="metaImage" :src="metaImage" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                                        <div v-else class="w-full h-full flex items-center justify-center bg-bg-tertiary text-text-tertiary/20">
                                            <ImageIcon :size="48" />
                                        </div>
                                    </div>
                                    <div class="p-4 bg-[#f0f2f5] dark:bg-white/[0.03] border-t border-border-color">
                                        <p class="text-[clamp(0.65rem,1.5vw,0.7rem)] text-text-tertiary uppercase font-bold tracking-wider mb-1">{{ displayUrl.toUpperCase() }}</p>
                                        <h4 class="text-text-primary font-bold text-base leading-tight mb-2 line-clamp-1 group-hover:text-accent-primary transition-colors">
                                            {{ metaTitle || 'Premium Digital Solutions' }}
                                        </h4>
                                        <p class="text-text-secondary text-sm line-clamp-2 leading-relaxed opacity-80">
                                            {{ metaDescription || 'Providing expert consultation and high-end digital architecture for modern brands.' }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- WhatsApp Preview -->
                            <div class="space-y-4">
                                <div class="flex items-center gap-2 text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-tertiary uppercase tracking-widest px-2">
                                    <MessageCircle :size="12" class="shrink-0" /> WhatsApp Preview
                                </div>
                                <div class="max-w-[85%] bg-[#dcf8c6] dark:bg-[#005c4b] p-2.5 rounded-2xl rounded-tl-none shadow-lg flex flex-col gap-1.5 transition-all hover:scale-[1.01]">
                                    <div class="bg-black/[0.04] dark:bg-black/20 rounded-xl p-2.5 flex gap-4">
                                        <div class="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white/20 shadow-sm">
                                            <img v-if="metaImage" :src="metaImage" class="w-full h-full object-cover">
                                            <div v-else class="w-full h-full flex items-center justify-center text-accent-primary/20">
                                                <ImageIcon :size="32" />
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                            <h4 class="text-[clamp(0.75rem,2vw,0.85rem)] font-black text-text-primary truncate uppercase tracking-tight">{{ metaTitle || 'My Cool Project' }}</h4>
                                            <p class="text-[clamp(0.65rem,1.5vw,0.7rem)] text-text-secondary line-clamp-2 leading-snug font-medium italic opacity-80">{{ metaDescription }}</p>
                                            <p class="text-[clamp(0.5rem,1.5vw,0.55rem)] text-text-tertiary mt-0.5 font-bold uppercase tracking-widest">{{ displayUrl }}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 px-1">
                                        <span class="text-blue-600 dark:text-blue-400 text-[clamp(0.75rem,2vw,0.8rem)] underline truncate font-medium">https://{{ displayUrl }}</span>
                                        <span class="text-[clamp(0.5rem,1.5vw,0.55rem)] text-text-tertiary/60 ml-auto font-black italic">12:30 AM</span>
                                    </div>
                                </div>
                            </div>

                            <!-- X / Large Card -->
                            <div class="space-y-4">
                                <div class="flex items-center gap-2 text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-text-tertiary uppercase tracking-widest px-2">
                                    <p class="font-black shrink-0">X</p> Large Card Preview
                                </div>
                                <div class="bg-bg-tertiary/20 rounded-3xl border border-border-color overflow-hidden transition-all hover:scale-[1.01] group">
                                    <div class="aspect-[1.91/1] w-full bg-bg-tertiary relative overflow-hidden">
                                        <img v-if="metaImage" :src="metaImage" class="w-full h-full object-cover">
                                        <div v-else class="w-full h-full flex items-center justify-center text-text-tertiary/20">
                                            <ImageIcon :size="48" />
                                        </div>
                                    </div>
                                    <div class="p-5 space-y-2">
                                        <h4 class="text-text-primary font-black text-[clamp(1rem,2.5vw,1.125rem)] group-hover:text-accent-primary transition-colors">{{ metaTitle || 'Bold Title Here' }}</h4>
                                        <p class="text-text-secondary text-[clamp(0.7rem,1.8vw,0.75rem)] line-clamp-2 italic leading-relaxed">{{ metaDescription }}</p>
                                        <div class="flex items-center gap-2 pt-2">
                                            <LinkIcon :size="12" class="text-text-tertiary shrink-0" />
                                            <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] text-text-tertiary font-bold uppercase tracking-widest">{{ displayUrl }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education Content -->
        <template #education>
            <div class="space-y-8 py-4">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div class="md:col-span-12 space-y-4">
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-center">
                            Digital Branding 101
                        </div>
                        <h4 class="text-2xl font-black text-text-primary tracking-tight">Kesan Pertama Terjadi di Chat Bar.</h4>
                        <p class="text-[0.9rem] leading-relaxed text-text-secondary">
                            Sebelum orang mengklik website Anda, mereka akan melihat "cuplikannya" terlebih dahulu di WhatsApp atau Google. Jika tampilannya berantakan (tidak ada gambar, judul terpotong), brand Anda akan terlihat amatir dan menurunkan kepercayaan calon klien secara instan.
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4">
                        <Target :size="28" class="text-accent-primary shrink-0" />
                        <h5 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-widest text-text-primary">Judul yang Menjual</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed">
                            Pastikan judul mengandung <strong>Solution-based focus</strong>. Jangan cuma nama brand, tapi tuliskan masalah apa yang Anda selesaikan di Title Tag tersebut.
                        </p>
                    </div>
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4">
                        <Palette :size="28" class="text-accent-secondary shrink-0" />
                        <h5 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-widest text-text-primary">Eksklusivitas Visual</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed">
                            Gunakan OG Image berukuran 1200x630 piksel. Gambar yang high-res dan bersih memberikan sinyal bahwa perusahaan Anda bonafide dan terpercaya.
                        </p>
                    </div>
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4">
                        <Gauge :size="28" class="text-green-500 shrink-0" />
                        <h5 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-widest text-text-primary">Optimasi CTR</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed">
                            Meta deskripsi idealnya berisi <strong>Call-to-Action (CTA)</strong> halus. Gunakan kata "Terbaik", "Gratis", atau "Profesional" untuk memicu rasa ingin tahu audiens.
                        </p>
                    </div>
                </div>
            </div>
        </template>

        <!-- Custom History Item -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                    <History :size="18" />
                </div>
                <div class="flex flex-col min-w-0 gap-0.5">
                    <span class="text-[clamp(0.75rem,1.8vw,0.8rem)] font-black text-text-primary truncate">{{ item.input.title || 'Tanpa Judul' }}</span>
                    <div class="flex items-center gap-2">
                         <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] font-bold text-text-tertiary uppercase tracking-widest bg-bg-tertiary px-1.5 py-0.5 rounded shrink-0">{{ item.input.url.replace('https://', '').replace('/', '') }}</span>
                         <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary opacity-50 shrink-0">{{ item.result.img ? 'With Image' : 'No Image' }}</span>
                    </div>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Search, Globe, Image as ImageIcon, Loader2,
    CheckCircle2, AlertCircle, Target,
    Zap, MessageSquare, History, Share2, MessageCircle, Link as LinkIcon,
    Palette, Gauge, AlertTriangle
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

// State
const targetUrl = ref('');
const focusKeyword = ref('');
const metaTitle = ref('');
const metaDescription = ref('');
const metaImage = ref('');
const loading = ref(false);
const fetchStatus = ref<'idle' | 'success' | 'blocked' | 'error'>('idle');

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('meta-previewer-v2');
const popup = usePopupManager();

// Computed
const isValidUrl = computed(() => {
    try {
        const u = targetUrl.value.trim();
        if (!u) return false;
        new URL(u.startsWith('http') ? u : `https://${u}`);
        return u.includes('.');
    } catch {
        return false;
    }
});

const displayUrl = computed(() => {
    if (!targetUrl.value) return 'website-kamu.com';
    try {
        const u = targetUrl.value.startsWith('http') ? targetUrl.value : `https://${targetUrl.value}`;
        return new URL(u).hostname.replace('www.', '');
    } catch {
        return targetUrl.value;
    }
});

const hostName = computed(() => {
    const domain = displayUrl.value.split('.')[0] || '';
    return domain.charAt(0).toUpperCase() + domain.slice(1);
});

const seoAnalysis = computed(() => {
    const checks = [];
    const kw = focusKeyword.value.toLowerCase().trim();

    // Title Checks
    if (metaTitle.value.length === 0) {
        checks.push({ label: 'Title Tag Hilang', status: 'error', desc: 'Google akan merubah judul web secara acak. Sangat buruk untuk branding.' });
    } else if (metaTitle.value.length < 45) {
        checks.push({ label: 'Judul Kurang Panjang', status: 'warning', desc: 'Idealnya 50-60 karakter untuk memaksimalkan kata kunci bidikan.' });
    } else if (metaTitle.value.length > 60) {
        checks.push({ label: 'Judul Terlalu Panjang', status: 'warning', desc: 'Akan terpotong (...) di hasil pencarian Google desktop & mobile.' });
    } else {
        checks.push({ label: 'Struktur Judul Sempurna', status: 'success', desc: 'Sangat ideal untuk visibilitas maksimal di semua perangkat.' });
    }

    // Description Checks
    if (metaDescription.value.length === 0) {
        checks.push({ label: 'Meta Deskripsi Kosong', status: 'error', desc: 'Mempengaruhi CTR. Google akan mengambil teks acak yang mungkin tidak menjual.' });
    } else if (metaDescription.value.length < 120) {
        checks.push({ label: 'Deskripsi Singkat', status: 'warning', desc: 'Yoast merekomendasikan minimal 120 karakter agar pesan tersampaikan utuh.' });
    } else if (metaDescription.value.length > 156) {
        checks.push({ label: 'Deskripsi Kepanjangan', status: 'warning', desc: 'Akan terpotong oleh Google. Letakkan poin penting di 150 karakter pertama.' });
    } else {
        checks.push({ label: 'Meta Deskripsi Optimal', status: 'success', desc: 'Panjang yang sangat disukai bot Google dan eye-catching bagi user.' });
    }

    // Image Check
    if (!metaImage.value) {
        checks.push({ label: 'Thumbnail (OG Image) Absen', status: 'error', desc: 'Link terlihat "mentah" dan tidak terpercaya saat dibagikan ke social media.' });
    } else {
        checks.push({ label: 'Preview Visual Aktif', status: 'success', desc: 'Gambar sudah terdeteksi dan siap memikat calon klien.' });
    }

    // Keyword Checks
    if (kw) {
        if (!metaTitle.value.toLowerCase().includes(kw)) {
            checks.push({ label: 'Kata Kunci di Judul Hilang', status: 'warning', desc: `Sisipkan "${kw}" agar audiens merasa website Anda adalah solusinya.` });
        }
        if (!metaDescription.value.toLowerCase().includes(kw)) {
            checks.push({ label: 'Absensi Kata Kunci di Deskripsi', status: 'warning', desc: `Gunakan "${kw}" agar deskripsi terasa lebih relevan.` });
        }
    }

    return checks;
});

// Actions
async function fetchMeta() {
    if (!isValidUrl.value) return;

    loading.value = true;
    fetchStatus.value = 'idle';

    const fullUrl = targetUrl.value.startsWith('http') ? targetUrl.value : `https://${targetUrl.value}`;

    try {
        let html = '';
        const proxies = [
            `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`,
            `https://corsproxy.io/?${encodeURIComponent(fullUrl)}`
        ];

        for (const proxy of proxies) {
            try {
                const response = await fetch(proxy);
                if (proxy.includes('allorigins')) {
                    const data = await response.json();
                    html = data.contents;
                } else {
                    html = await response.text();
                }
                
                // Anti-blocking refinement logic
                if (html && html.length > 500) {
                    const isChallenge = html.includes('<title>Just a moment...</title>') || 
                                       html.includes('cf-browser-verification') || 
                                       (html.includes('Ray ID:') && html.includes('Cloudflare'));
                    if (!isChallenge) break;
                }
            } catch (e) { console.warn(`Proxy failed: ${proxy}`); }
        }

        if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const title = doc.querySelector('title')?.innerText ||
                doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content');

            const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content');

            let img = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || '';

            metaTitle.value = title?.trim() || 'No Title Found';
            metaDescription.value = desc?.trim() || 'No Description Found';
            
            if (img && !img.startsWith('http')) {
                try {
                    const base = new URL(fullUrl);
                    img = new URL(img, base.origin).toString();
                } catch (e) { console.error('Image URL error', e); }
            }
            metaImage.value = img;
            fetchStatus.value = 'success';

            // Save to history
            addEntry({ 
                url: fullUrl, 
                title: metaTitle.value 
            }, { 
                title: metaTitle.value, 
                desc: metaDescription.value, 
                img: metaImage.value 
            });
        } else {
            fetchStatus.value = 'blocked';
        }
    } catch (e) {
        console.error('Fetch error:', e);
        fetchStatus.value = 'error';
    } finally {
        loading.value = false;
    }
}

function restoreFromHistory(item: any) {
    targetUrl.value = item.input.url;
    metaTitle.value = item.result.title;
    metaDescription.value = item.result.desc;
    metaImage.value = item.result.img;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openConsultation() {
    popup.openModal(Popups.CHAT_WA, {
        initialMessage: `Halo Kang Jessy! Saya baru saja menggunakan tool Social & Search Preview Engineer untuk link saya: ${targetUrl.value}. Ternyata tampilannya masih perlu dioptimasi. Bisa bantu diskusi strategi visual branding dan SEO-nya?`
    });
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(var(--color-border), 0.5);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-primary);
}
</style>
