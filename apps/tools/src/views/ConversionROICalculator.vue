<template>
    <ToolLayout 
        title="Conversion ROI Calculator" 
        subtitle="Visualisasikan potensi pertumbuhan profit Anda hanya dengan menaikkan tingkat konversi website."
        badge="Business Strategy Tool"
        :history="history"
        @clear-history="clearHistory"
        @remove-entry="removeEntry"
        @restore="restoreCalculation"
    >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Input Side -->
            <div class="lg:col-span-5 space-y-8">
                <div class="space-y-6">
                    <!-- Current Stats -->
                    <div class="space-y-4">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-text-tertiary">Data Pengunjung Bulanan</label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-4 flex items-center text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                                <UsersIcon :size="18" />
                            </div>
                            <input v-model.number="inputs.monthlyTraffic" type="number" 
                                class="w-full bg-bg-primary border border-border-color rounded-xl py-4 pl-12 pr-4 text-text-primary font-bold focus:border-accent-primary outline-none transition-all"
                                placeholder="Contoh: 10000" />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-text-tertiary">Conversion Rate Saat Ini (%)</label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-4 flex items-center text-text-tertiary group-focus-within:text-emerald-500 transition-colors">
                                <PercentIcon :size="18" />
                            </div>
                            <input v-model.number="inputs.currentConvRate" type="number" step="0.1"
                                class="w-full bg-bg-primary border border-border-color rounded-xl py-4 pl-12 pr-4 text-text-primary font-bold focus:border-emerald-500 outline-none transition-all"
                                placeholder="Contoh: 1.5" />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-text-tertiary">Rata-rata Nilai Order (Rp)</label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-4 flex items-center text-text-tertiary group-focus-within:text-accent-secondary transition-colors">
                                <span class="font-black text-sm">Rp</span>
                            </div>
                            <input v-model.number="inputs.averageOrderValue" type="number" 
                                class="w-full bg-bg-primary border border-border-color rounded-xl py-4 pl-12 pr-4 text-text-primary font-bold focus:border-accent-secondary outline-none transition-all"
                                placeholder="Contoh: 500000" />
                        </div>
                    </div>

                    <div class="pt-6 border-t border-border-color/50 space-y-4">
                        <label class="block text-[10px] font-black uppercase tracking-widest text-accent-primary flex items-center gap-2">
                             <TrendingUpIcon :size="14" /> Target Kenaikan Konversi (%)
                        </label>
                        <div class="px-2">
                            <input v-model.number="inputs.targetConvIncrease" type="range" min="0.5" max="10" step="0.5"
                                class="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary" />
                            <div class="flex justify-between text-[10px] font-bold text-text-tertiary mt-2 uppercase tracking-tighter">
                                <span>+0.5%</span>
                                <span class="text-accent-primary">+{{ inputs.targetConvIncrease }}% Optimize</span>
                                <span>+10%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <BaseButton variant="primary" size="lg" icon-right="Calculator" class="w-full rounded-2xl shadow-xl shadow-accent-primary/20" @click="saveToHistory()">
                    Simpan Perhitungan
                </BaseButton>
            </div>

            <!-- Result Side -->
            <div class="lg:col-span-7">
                <div class="bg-linear-to-br from-bg-tertiary to-bg-secondary border border-border-color rounded-3xl p-8 relative overflow-hidden h-full">
                    <!-- ROI Badge -->
                    <div class="absolute top-0 right-0 p-8 opacity-5">
                        <TrendingUpIcon :size="200" />
                    </div>

                    <div class="relative z-10 space-y-10">
                        <div>
                            <h4 class="text-[0.65rem] font-black uppercase tracking-[0.2em] text-text-tertiary mb-8">Hasil Proyeksi Bulanan</h4>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="p-6 bg-bg-primary/50 border border-border-color rounded-2xl">
                                    <span class="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-2 block">Revenue Saat Ini</span>
                                    <div class="text-2xl font-black text-text-primary">Rp {{ formatPrice(currentRevenue) }}</div>
                                    <div class="text-[10px] font-bold text-text-tertiary mt-1">{{ currentSales }} Sales / Bulan</div>
                                </div>
                                
                                <div class="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl relative overflow-hidden group">
                                    <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                                    <span class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 block">Potensi Revenue Baru</span>
                                    <div class="text-2xl font-black text-emerald-500">Rp {{ formatPrice(targetRevenue) }}</div>
                                    <div class="text-[10px] font-bold text-emerald-500/70 mt-1">{{ targetSales }} Sales / Bulan</div>
                                </div>
                            </div>
                        </div>

                        <!-- Growth Summary -->
                        <div class="pt-8 border-t border-border-color/50">
                            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div class="text-center md:text-left flex-1">
                                    <h5 class="text-sm font-black text-text-primary uppercase tracking-widest mb-1">Estimasi Kenaikan Profit</h5>
                                    <p class="text-text-tertiary text-xs leading-relaxed">Tambahan dana segar yang bisa masuk ke bisnis Anda setiap bulan.</p>
                                </div>
                                <div class="bg-linear-to-tr from-accent-primary to-accent-secondary p-1 rounded-2xl shadow-xl shadow-accent-primary/30">
                                    <div class="bg-bg-secondary px-8 py-4 rounded-[14px] text-center">
                                        <div class="text-[0.65rem] font-black text-accent-primary uppercase tracking-[0.2em] mb-1">Total Impact</div>
                                        <div class="text-3xl font-black text-text-primary tracking-tighter">+Rp {{ formatPrice(revenueIncrease) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- CTA Advice -->
                        <div class="p-6 bg-accent-primary/5 border-2 border-dashed border-accent-primary/20 rounded-2xl flex items-start gap-4">
                            <div class="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-white shrink-0 shadow-lg">
                                <SparklesIcon :size="20" />
                            </div>
                            <div>
                                <h6 class="text-sm font-black text-text-primary mb-1">Ambil Langkah Optimasi</h6>
                                <p class="text-[0.7rem] text-text-secondary leading-relaxed">
                                    Kenaikan <strong>{{ inputs.targetConvIncrease }}%</strong> konversi bisa dicapai dengan optimasi navigasi, copywriting persuasif, dan sistem checkout tanpa hambatan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template #education>
            <p>
                <strong>Conversion Rate Optimization (CRO)</strong> adalah cara paling hemat biaya untuk meningkatkan keuntungan tanpa harus menambah budget iklan. Bayangkan pengunjung Anda adalah aliran air, dan website Anda adalah pipa. CRO adalah cara menambal semua kebocoran di pipa tersebut sehingga lebih banyak air yang sampai ke bak penampungan (sales).
            </p>
            <ul>
                <li><strong>Mengapa 1% itu Berarti?</strong> Bagi bisnis dengan traffic 10.000 user/bulan, kenaikan 1% berarti tambahan 100 sales. Jika harga produk Rp 500.000, itu adalah tambahan <strong>Rp 50 Juta</strong> revenue per bulan.</li>
                <li><strong>Optimasi yang Kami Lakukan:</strong> Kami membedah User Journey klien, memperbaiki load speed, dan mengimplementasikan AI-driven copywriting untuk memastikan setiap klik memiliki potensi closing yang lebih besar.</li>
            </ul>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
    Users as UsersIcon, 
    Percent as PercentIcon, 
    TrendingUp as TrendingUpIcon, 
    Sparkles as SparklesIcon
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';


const STORAGE_KEY = 'conv_roi_history';

const inputs = ref({
    monthlyTraffic: 5000,
    currentConvRate: 1.0,
    averageOrderValue: 250000,
    targetConvIncrease: 2.0
});

const history = ref<any[]>([]);

// Calculations
const currentSales = computed(() => Math.round((inputs.value.monthlyTraffic * inputs.value.currentConvRate) / 100));
const currentRevenue = computed(() => currentSales.value * inputs.value.averageOrderValue);

const targetSales = computed(() => Math.round((inputs.value.monthlyTraffic * (inputs.value.currentConvRate + inputs.value.targetConvIncrease)) / 100));
const targetRevenue = computed(() => targetSales.value * inputs.value.averageOrderValue);

const revenueIncrease = computed(() => targetRevenue.value - currentRevenue.value);

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
};

// History Management
const saveToHistory = () => {
    const entry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        title: `ROI +Rp ${formatPrice(revenueIncrease.value)}`,
        data: { ...inputs.value }
    };

    history.value.unshift(entry);
    if (history.value.length > 5) history.value.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
};

const restoreCalculation = (item: any) => {
    inputs.value = { ...item.data };
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const removeEntry = (id: string) => {
    history.value = history.value.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
};

const clearHistory = () => {
    history.value = [];
    localStorage.removeItem(STORAGE_KEY);
};

onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) history.value = JSON.parse(saved);
});
</script>
