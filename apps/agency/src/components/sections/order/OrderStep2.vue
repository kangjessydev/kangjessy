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

                    <!-- Domain Checker -->
                    <div class="flex flex-col gap-2.5 sm:col-span-2">
                        <label class="text-[0.8rem] font-black text-text-tertiary uppercase tracking-widest">Domain
                            Impian (Opsional)</label>
                        <div class="flex flex-col gap-3">
                            <div class="relative flex items-center">
                                <GlobeIcon :size="18" class="absolute left-5 text-text-tertiary shrink-0" />
                                <input type="text" v-model="form.domain" placeholder="namabisnismu.com"
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
                        </div>
                        <p class="text-[0.7rem] text-text-tertiary italic mt-1">*Cek ketersediaan awal. Status
                            'Tersedia' harus divalidasi saat pembelian.</p>
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
