<template>
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] relative items-start">
        <div class="p-8 lg:p-14 lg:border-r border-border-color/50 bg-bg-primary/30 min-h-[800px]">
            <button
                class="bg-transparent border-0 text-text-secondary flex items-center gap-1.5 cursor-pointer mb-8 transition-colors hover:text-accent-primary font-bold text-sm"
                @click="$emit('back')">
                <ChevronLeftIcon :size="16" />
                Kembali ke Konfigurasi
            </button>

            <div class="mb-10">
                <h2 class="text-[clamp(1.75rem,8vw,2.5rem)] font-black mb-2 text-text-primary tracking-tight">Informasi
                    Kontak</h2>
                <p class="text-text-secondary font-medium">Lengkapi data agar kami bisa menghubungi Anda</p>
            </div>

            <form @submit.prevent="$emit('submit')" class="space-y-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="flex flex-col gap-2.5">
                        <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Nama
                            Lengkap *</label>
                        <input type="text" v-model="form.name" placeholder="John Doe" required
                            class="bg-bg-primary border-2 border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5">
                    </div>
                    <div class="flex flex-col gap-2.5">
                        <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Email
                            *</label>
                        <input type="email" v-model="form.email" placeholder="john@company.com" required
                            class="bg-bg-primary border-2 border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5">
                    </div>
                    <div class="flex flex-col gap-2.5">
                        <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">WhatsApp
                            *</label>
                        <input type="tel" v-model="form.phone" placeholder="08123456789" required
                            class="bg-bg-primary border-2 border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5">
                    </div>
                    <div class="flex flex-col gap-2.5">
                        <label
                            class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Perusahaan</label>
                        <input type="text" v-model="form.company" placeholder="PT. Sukses Jaya"
                            class="bg-bg-primary border-2 border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5">
                    </div>

                    <div class="flex flex-col gap-2.5 sm:col-span-2">
                        <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Link
                            Referensi (Opsional)</label>
                        <input type="text" v-model="form.reference" placeholder="Contoh: pinterest.com/awwwards"
                            class="bg-bg-primary border-2 border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5">
                    </div>

                    <!-- Domain Selector -->
                    <div class="flex flex-col gap-5 sm:col-span-2">
                        <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Status Website & Domain</label>
                        
                        <!-- Premium Radio Group -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label 
                                class="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group"
                                :class="form.websiteStatus === 'yes' ? 'border-accent-primary bg-accent-primary/5' : 'border-border-color hover:border-accent-primary/20 bg-bg-primary/50'"
                            >
                                <input type="radio" value="yes" v-model="form.websiteStatus" class="sr-only">
                                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                                    :class="form.websiteStatus === 'yes' ? 'border-accent-primary' : 'border-text-tertiary group-hover:border-accent-primary'">
                                    <div class="w-2.5 h-2.5 rounded-full bg-accent-primary scale-0 transition-all"
                                        :class="{ 'scale-100': form.websiteStatus === 'yes' }"></div>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm font-bold text-text-primary">Sudah punya Website</span>
                                    <span class="text-[0.65rem] text-text-tertiary font-medium uppercase tracking-tight">Redesign / Maintenance</span>
                                </div>
                            </label>

                            <label 
                                class="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer group"
                                :class="form.websiteStatus === 'no' ? 'border-accent-primary bg-accent-primary/5' : 'border-border-color hover:border-accent-primary/20 bg-bg-primary/50'"
                            >
                                <input type="radio" value="no" v-model="form.websiteStatus" class="sr-only">
                                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                                    :class="form.websiteStatus === 'no' ? 'border-accent-primary' : 'border-text-tertiary group-hover:border-accent-primary'">
                                    <div class="w-2.5 h-2.5 rounded-full bg-accent-primary scale-0 transition-all"
                                        :class="{ 'scale-100': form.websiteStatus === 'no' }"></div>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm font-bold text-text-primary">Belum punya Website</span>
                                    <span class="text-[0.65rem] text-text-tertiary font-medium uppercase tracking-tight">Buat Baru (Start from Scratch)</span>
                                </div>
                            </label>
                        </div>

                        <!-- Dynamic Domain Checker Input -->
                        <div class="flex flex-col gap-3">
                            <label 
                                v-if="form.websiteStatus"
                                class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest"
                            >
                                {{ form.websiteStatus === 'yes' ? 'Website Sekarang' : 'Domain Impian' }}
                            </label>
                            <div class="relative flex items-center">
                                <GlobeIcon v-if="form.websiteStatus === 'no'" :size="18" class="absolute left-5 text-text-tertiary shrink-0" />
                                <LinkIcon v-else :size="18" class="absolute left-5 text-text-tertiary shrink-0" />
                                <input type="text" v-model="form.domain" 
                                    :placeholder="form.websiteStatus === 'yes' ? 'www.websitekamu.com' : 'namabisnismu.com'"
                                    @input="debounceDomainCheck"
                                    class="w-full bg-bg-primary border-2 border-border-color rounded-2xl pl-12 pr-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5">
                            </div>
                            <div v-if="form.domain"
                                class="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[0.85rem] border transition-all duration-300 font-bold"
                                :class="domainStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : (domainStatus.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-bg-secondary border-border-color text-text-tertiary')">
                                <Loader2Icon v-if="domainStatus.loading" :size="16" class="animate-spin shrink-0" />
                                <CheckIcon v-else-if="domainStatus.available" :size="16" class="shrink-0" />
                                <XIcon v-else-if="domainStatus.available === false" :size="16" class="shrink-0" />
                                <span>{{ domainStatus.message }}</span>
                            </div>
                        <p v-if="form.websiteStatus === 'no'" class="text-[0.7rem] text-text-tertiary italic mt-2">
                            *Domain akan kami cek kembali ketersediaannya di penyedia domain, dan statusnya akan kami infokan via WhatsApp.
                        </p>
                    </div>
                </div>

                    <!-- Honeypot -->
                    <div class="hidden">
                        <input type="text" v-model="form.honeypot" tabindex="-1" autocomplete="off">
                    </div>
                </div>

                <div class="flex flex-col gap-2.5">
                    <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Brief Proyek
                        *</label>
                    <textarea v-model="form.brief" rows="5"
                        placeholder="Ceritakan tentang proyek Anda, target audience, atau fitur khusus yang diinginkan..."
                        required
                        class="bg-bg-primary border-2 border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-lg focus:shadow-accent-primary/5 resize-none"></textarea>
                </div>

                <div class="mt-8 pt-8 border-t border-border-color">
                    <p class="text-[0.75rem] text-text-tertiary text-center leading-relaxed max-w-md mx-auto">
                        Dengan mengirim penawaran, Anda menyetujui Ketentuan Layanan kami. Kami akan menghubungi Anda
                        dalam 1x24 jam kerja untuk sesi konsultasi pertama.
                    </p>
                </div>
            </form>
        </div>

        <!-- Summary Slot -->
        <div class="hidden lg:block sticky top-24 h-fit">
            <slot name="summary"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
    ChevronLeft as ChevronLeftIcon,
    Globe as GlobeIcon,
    Link as LinkIcon,
    Loader2 as Loader2Icon,
    Check as CheckIcon,
    X as XIcon
} from 'lucide-vue-next';

const props = defineProps<{
    form: any;
    isSubmitting: boolean;
    currentType: any;
    currentStyle: any;
    currentTimeline: any;
    selectedFeatures: string[];
    totalPrice: number;
    formatPrice: (price: number) => string;
    getFeatureName: (id: string) => string;
}>();

const emit = defineEmits(['back', 'submit', 'whatsapp']);

const domainStatus = reactive({
    loading: false,
    available: null as boolean | null,
    message: '',
    type: ''
});

let domainTimeout: any = null;

const debounceDomainCheck = () => {
    if (!props.form.domain) {
        domainStatus.available = null;
        domainStatus.message = '';
        return;
    }

    domainStatus.loading = true;
    domainStatus.message = 'Mengecek ketersediaan...';
    domainStatus.type = 'checking';

    if (domainTimeout) clearTimeout(domainTimeout);
    domainTimeout = setTimeout(checkDomain, 800);
};

const checkDomain = async () => {
    const domain = props.form.domain.trim();
    if (!domain.includes('.')) {
        domainStatus.loading = false;
        domainStatus.available = false;
        domainStatus.message = 'Masukkan domain lengkap (ex: .com)';
        domainStatus.type = 'error';
        return;
    }

    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const data = await response.json();

        domainStatus.loading = false;
        if (data.Status === 0 && data.Answer) {
            domainStatus.available = false;
            domainStatus.message = 'Domain sudah terdaftar (Taken)';
            domainStatus.type = 'error';
        } else {
            domainStatus.available = true;
            domainStatus.message = 'Kemungkinan Tersedia!';
            domainStatus.type = 'success';
        }
    } catch (e) {
        domainStatus.loading = false;
        domainStatus.message = 'Gagal mengecek. Silakan lanjut saja.';
        domainStatus.type = '';
    }
};
</script>
