<template>
    <ToolLayout title="Premium Brand Transaction Architect"
        subtitle="Ciptakan invoice profesional yang memperkuat kesan eksklusif brand Anda di setiap transaksi."
        badge="Architectural Beta" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-8 md:space-y-12 pb-10 md:pb-20">
            <!-- Main Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Form Editor -->
                <div class="lg:col-span-4 space-y-6 animate-in slide-in-from-left-4 duration-500">
                    <!-- Beta Notice -->
                    <div class="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-5 flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                            <AlertCircle :size="18" class="shrink-0" />
                        </div>
                        <div class="space-y-1">
                            <h4 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-widest text-amber-500">Tahap Uji Coba (BETA)</h4>
                            <p class="text-[clamp(0.7rem,1.8vw,0.75rem)] leading-relaxed text-amber-500/80 font-medium italic">
                                Kami sedang mengoptimalkan stabilitas render PDF untuk berbagai logo & browser. Jika terjadi kendala download, silakan coba ganti logo atau refresh halaman.
                            </p>
                        </div>
                    </div>

                    <!-- Template Selector -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-2xl md:rounded-[2rem] p-0 md:p-6 md:shadow-sm space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                <Layout :size="16" class="shrink-0" />
                            </div>
                            <h3 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-[0.2em] text-text-primary">Eksentrisitas Layout</h3>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                            <button v-for="t in ['modern', 'minimal', 'bold']" :key="t" 
                                @click="currentTemplate = t"
                                :class="[
                                    'py-2.5 rounded-xl border text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest transition-all',
                                    currentTemplate === t 
                                        ? 'bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20' 
                                        : 'bg-bg-tertiary border-border-color text-text-tertiary hover:border-accent-primary'
                                ]">
                                {{ t }}
                            </button>
                        </div>
                    </div>

                    <!-- Business Identity -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-2xl md:rounded-[2rem] p-0 md:p-6 md:shadow-sm space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                <Building2 :size="16" class="shrink-0" />
                            </div>
                            <h3 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-[0.2em] text-text-primary">Eksentrisitas Bisnis</h3>
                        </div>

                        <div @click="triggerLogoUpload" 
                            class="relative h-24 bg-bg-tertiary border-2 border-dashed border-border-color hover:border-accent-primary rounded-xl flex flex-col items-center justify-center group/logo transition-all cursor-pointer overflow-hidden">
                            <input type="file" ref="logoInput" class="hidden" accept="image/*" @change="handleLogoUpload">
                            <img v-if="invoiceData.sender.logo" :src="invoiceData.sender.logo" class="h-16 w-auto object-contain">
                            <div v-else class="flex flex-col items-center gap-1 text-text-tertiary">
                                <UploadCloud :size="18" class="shrink-0" />
                                <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest">Upload Logo</span>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <input v-model="invoiceData.sender.name" type="text" placeholder="Nama Brand Anda"
                                class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-2.5 text-xs font-bold text-text-primary focus:border-accent-primary outline-none transition-colors">
                            <textarea v-model="invoiceData.sender.details" rows="2" placeholder="Alamat & Kontak Bisnis..."
                                class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-2.5 text-[11px] font-medium text-text-secondary focus:border-accent-primary outline-none resize-none transition-colors"></textarea>
                        </div>
                    </div>

                    <!-- Client Data -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-2xl md:rounded-[2rem] p-0 md:p-6 md:shadow-sm space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary shrink-0">
                                <User :size="16" class="shrink-0" />
                            </div>
                            <h3 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-[0.2em] text-text-primary">Profil Klien</h3>
                        </div>
                        <div class="space-y-3">
                            <input v-model="invoiceData.client.name" type="text" placeholder="Nama Klien / Perusahaan"
                                class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-2.5 text-xs font-bold text-text-primary focus:border-accent-primary outline-none transition-colors">
                            <div class="grid grid-cols-2 gap-3">
                                <input v-model="invoiceData.meta.invoiceNumber" type="text" placeholder="INV-001"
                                    class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-2.5 text-[10px] font-bold text-text-primary focus:border-accent-primary outline-none text-center transition-colors">
                                <input v-model="invoiceData.meta.date" type="date"
                                    class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-2.5 text-[10px] font-bold text-text-primary focus:border-accent-primary outline-none transition-colors">
                            </div>
                            <textarea v-model="invoiceData.client.details" rows="2" placeholder="Alamat Klien..."
                                class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-2.5 text-[11px] font-medium text-text-secondary focus:border-accent-primary outline-none resize-none transition-colors"></textarea>
                        </div>
                    </div>

                    <!-- Item List Editor -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-2xl md:rounded-[2rem] p-0 md:p-6 md:shadow-sm space-y-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                    <ShoppingBag :size="16" class="shrink-0" />
                                </div>
                                <h3 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-[0.2em] text-text-primary">Daftar Layanan</h3>
                            </div>
                            <button @click="addItem" class="w-8 h-8 rounded-full bg-bg-tertiary border border-border-color flex items-center justify-center text-text-primary hover:bg-accent-primary hover:text-white transition-all shadow-xs">
                                <Plus :size="14" />
                            </button>
                        </div>
                        
                        <div class="space-y-3 md:space-y-4">
                            <div v-for="(item, idx) in invoiceData.items" :key="idx" class="p-3 md:p-4 bg-bg-tertiary rounded-2xl border border-border-color/50 space-y-2 md:space-y-3 relative group">
                                <button v-if="invoiceData.items.length > 1" @click="removeItem(idx)" 
                                    class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                    <Trash2 :size="10" />
                                </button>
                                <input v-model="item.description" type="text" placeholder="Deskripsi Layanan"
                                    class="w-full bg-transparent border-b border-border-color pb-1 text-[11px] font-bold text-text-primary focus:border-accent-primary outline-none placeholder:opacity-50">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                                    <div class="space-y-1">
                                        <label class="text-[clamp(0.45rem,1.5vw,0.5rem)] font-black uppercase text-text-tertiary">Qty</label>
                                        <input v-model.number="item.qty" type="number" 
                                            class="w-full bg-bg-secondary border border-border-color rounded-lg px-2 py-1.5 text-[10px] font-bold text-text-primary text-center outline-none">
                                    </div>
                                    <div class="space-y-1">
                                        <label class="text-[clamp(0.45rem,1.5vw,0.5rem)] font-black uppercase text-text-tertiary">Harga (IDR)</label>
                                        <input v-model.number="item.price" type="number" 
                                            class="w-full bg-bg-secondary border border-border-color rounded-lg px-2 py-1.5 text-[10px] font-bold text-text-primary text-right outline-none">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Details -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-2xl md:rounded-[2rem] p-0 md:p-6 md:shadow-sm space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                <CreditCard :size="16" class="shrink-0" />
                            </div>
                            <h3 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black uppercase tracking-[0.2em] text-text-primary">Metode Pembayaran</h3>
                        </div>
                        <textarea v-model="invoiceData.paymentDetails" rows="3" placeholder="Contoh: BCA 1234567890 a/n Kang Jessy"
                            class="w-full bg-bg-tertiary border border-border-color rounded-xl px-4 py-3 text-[11px] font-medium text-text-secondary focus:border-accent-primary outline-none resize-none transition-colors"></textarea>
                    </div>

                    <!-- Actions -->
                    <BaseButton variant="primary" class="w-full py-5 rounded-2xl shadow-xl shadow-accent-primary/20 sticky bottom-4 z-10" @click="generatePDF" :disabled="isGenerating">
                        <Download v-if="!isGenerating" :size="18" class="mr-2 shrink-0" />
                        <Loader2 v-else :size="18" class="mr-2 animate-spin shrink-0" />
                        Render Premium Invoice
                    </BaseButton>
                </div>

                <!-- Right: Paper Preview -->
                <div class="lg:col-span-8 flex flex-col items-center">
                    <div class="w-full bg-bg-secondary border border-border-color rounded-2xl md:rounded-[2.5rem] p-2 md:p-8 shadow-sm overflow-hidden relative min-h-[700px] flex items-start justify-center">
                        <div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="background-image: radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px); background-size: 24px 24px;"></div>
                        
                        <!-- Tool-specific scale adjustments -->
                        <div class="w-full max-w-full overflow-x-auto overflow-y-visible no-scrollbar py-4 px-2 flex justify-center lg:block">
                            <!-- SCALE WRAPPER: Handles the viewport scaling -->
                            <div :class="['invoice-scale-wrapper origin-top transition-all duration-700 min-w-fit', `template-${currentTemplate}`]">
                                <!-- INVOICE PAPER: The actual document captured by PDF -->
                                <div id="invoice-preview" class="invoice-paper relative bg-white text-slate-700 shadow-2xl shrink-0"
                                    style="width: 210mm; min-height: 297mm; padding: 20mm; font-family: 'Inter', sans-serif;">
                                    
                                    <!-- TEMPLATE MODIFIER: MODERN -->
                                    <template v-if="currentTemplate === 'modern'">
                                    <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
                                    <div class="flex justify-between items-start mb-16">
                                        <div class="w-[60%] text-left">
                                            <div class="min-h-[50px] mb-8 flex items-center">
                                                <img v-if="invoiceData.sender.logo" :src="invoiceData.sender.logo" class="h-14 w-auto object-contain">
                                                <div v-else class="flex items-center gap-2">
                                                    <div class="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Building :size="20" /></div>
                                                    <span class="text-xl font-bold tracking-tight uppercase text-slate-800">{{ invoiceData.sender.name || 'BRAND NAME' }}</span>
                                                </div>
                                            </div>
                                            <div class="text-[10px] text-slate-500 font-medium leading-relaxed whitespace-pre-line border-l-2 border-slate-100 pl-4">
                                                {{ invoiceData.sender.details || 'Identity detail not provided.' }}
                                            </div>
                                        </div>
                                        <div class="text-right flex flex-col items-end">
                                            <h1 class="text-5xl font-bold text-slate-100 uppercase tracking-tighter mb-6 select-none leading-none">INVOICE</h1>
                                            <div class="space-y-4">
                                                <div class="flex flex-col items-end">
                                                    <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Number</span>
                                                    <span class="text-lg font-bold text-slate-800">#{{ invoiceData.meta.invoiceNumber }}</span>
                                                </div>
                                                <div class="flex flex-col items-end">
                                                    <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Issue Date</span>
                                                    <span class="text-[10px] font-semibold text-slate-600">{{ formatDate(invoiceData.meta.date) }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <!-- TEMPLATE MODIFIER: MINIMAL -->
                                <template v-else-if="currentTemplate === 'minimal'">
                                    <div class="flex justify-between items-end mb-20 border-b border-slate-100 pb-12">
                                        <div class="text-left">
                                            <h1 class="text-2xl font-light text-slate-900 uppercase tracking-[0.3em] mb-8">Statement</h1>
                                            <div class="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
                                                {{ invoiceData.sender.name || 'BRAND IDENTITY' }}<br>
                                                {{ invoiceData.meta.invoiceNumber }} / {{ formatDate(invoiceData.meta.date) }}
                                            </div>
                                        </div>
                                        <img v-if="invoiceData.sender.logo" :src="invoiceData.sender.logo" class="h-12 w-auto object-contain">
                                        <div v-else class="w-10 h-10 bg-slate-100 rounded-full"></div>
                                    </div>
                                </template>

                                <!-- TEMPLATE MODIFIER: BOLD -->
                                <template v-else-if="currentTemplate === 'bold'">
                                    <div class="bg-slate-900 -mx-[20mm] -mt-[20mm] p-[20mm] mb-16 flex justify-between items-center text-white">
                                        <div>
                                            <h1 class="text-6xl font-black tracking-tighter leading-none mb-2">INVOICE.</h1>
                                            <p class="text-xs font-bold opacity-60 tracking-widest uppercase">Transaction Report / {{ invoiceData.meta.invoiceNumber }}</p>
                                        </div>
                                        <div class="text-right">
                                            <img v-if="invoiceData.sender.logo" :src="invoiceData.sender.logo" class="h-16 w-auto object-contain brightness-0 invert">
                                            <div v-else class="text-2xl font-black">{{ invoiceData.sender.name || 'BRAND' }}</div>
                                        </div>
                                    </div>
                                </template>

                                <!-- SHARED CONTENT: CLIENT & STATUS (Styled per template) -->
                                <div class="grid grid-cols-12 gap-6 mb-16 pt-2 items-start">
                                    <div class="col-span-7 text-left">
                                        <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Recipient</span>
                                        <h3 :class="['font-bold text-slate-800 mb-2', currentTemplate === 'bold' ? 'text-2xl' : 'text-lg']">
                                            {{ invoiceData.client.name || 'Customer Profile' }}
                                        </h3>
                                        <p class="text-[10px] text-slate-500 font-medium leading-relaxed whitespace-pre-line max-w-[80%]">
                                            {{ invoiceData.client.details || 'Client detail not provided.' }}
                                        </p>
                                    </div>
                                    <div class="col-span-5 flex flex-col items-end gap-6 text-right">
                                        <div :class="['px-4 py-1.5 rounded-full border text-[8px] font-bold uppercase tracking-widest', currentTemplate === 'bold' ? 'bg-slate-900 text-white border-slate-900' : 'bg-accent-primary/5 text-accent-primary border-accent-primary/10']">
                                            Awaiting Transaction
                                        </div>
                                        <div>
                                            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Due Amount</span>
                                            <span :class="['font-bold text-slate-800 tracking-tight', currentTemplate === 'bold' ? 'text-4xl' : 'text-2xl']">
                                                {{ formatCurrency(grandTotal) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- SHARED CONTENT: ITEMS LIST (Styled per template) -->
                                <div class="mb-12">
                                    <div :class="['grid grid-cols-12 gap-4 px-6 py-3 border text-slate-400 rounded-xl mb-4', currentTemplate === 'minimal' ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-100']">
                                        <div class="col-span-6 text-[8px] font-bold uppercase tracking-widest text-left">Description</div>
                                        <div class="col-span-1 text-center text-[8px] font-bold uppercase tracking-widest">Qty</div>
                                        <div class="col-span-2 text-right text-[8px] font-bold uppercase tracking-widest">Unit</div>
                                        <div class="col-span-3 text-right text-[8px] font-bold uppercase tracking-widest">Total</div>
                                    </div>
                                    <div class="space-y-1">
                                        <div v-for="(item, idx) in invoiceData.items" :key="idx" class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 items-center last:border-0 hover:bg-slate-50/30 transition-colors">
                                            <div class="col-span-6 flex flex-col text-left">
                                                <span class="text-[11px] font-bold text-slate-700">{{ item.description || 'Service entry' }}</span>
                                            </div>
                                            <div class="col-span-1 text-center text-[10px] font-medium text-slate-400">{{ item.qty }}</div>
                                            <div class="col-span-2 text-right text-[10px] font-medium text-slate-400">{{ formatCurrency(item.price) }}</div>
                                            <div class="col-span-3 text-right text-[11px] font-bold text-slate-700">{{ formatCurrency(item.qty * item.price) }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- SHARED CONTENT: SUMMARY -->
                                <div class="flex justify-end pt-8 border-t border-slate-50">
                                    <div class="w-[40%] space-y-3">
                                        <div class="flex justify-between px-2">
                                            <span class="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Subtotal</span>
                                            <span class="text-[10px] font-bold text-slate-600">{{ formatCurrency(grandTotal) }}</span>
                                        </div>
                                        <div :class="['flex justify-between items-center p-6 text-white rounded-2xl shadow-xl', currentTemplate === 'bold' ? 'bg-slate-900 shadow-slate-300' : 'bg-slate-800 shadow-slate-200']">
                                            <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">Total</span>
                                            <span class="text-2xl font-bold tracking-tight">{{ formatCurrency(grandTotal) }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- SHARED CONTENT: FOOTER -->
                                <div class="mt-auto pt-20 grid grid-cols-12 gap-10">
                                    <div class="col-span-8 text-left">
                                        <h5 class="text-[9px] font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <div class="w-1 h-3 bg-accent-primary rounded-full"></div>
                                            Payment Protocol
                                        </h5>
                                        <div :class="['p-4 rounded-xl border', currentTemplate === 'minimal' ? 'bg-white border-slate-100' : 'bg-slate-50 border-dashed border-slate-200']">
                                            <p class="text-[10px] text-slate-600 font-medium leading-relaxed whitespace-pre-line">{{ invoiceData.paymentDetails || 'Contact issuer for instructions.' }}</p>
                                        </div>
                                    </div>
                                    <div class="col-span-4 flex flex-col items-end justify-end">
                                        <div v-if="currentTemplate !== 'modern'" class="text-right mb-4">
                                            <h5 class="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Issued By</h5>
                                            <p class="text-[9px] font-bold text-slate-800 uppercase">{{ invoiceData.sender.name || 'BRAND' }}</p>
                                        </div>
                                        <div class="w-16 h-16 border-2 border-slate-100 rounded-full flex items-center justify-center grayscale opacity-10">
                                            <Check :size="24" class="text-slate-400" />
                                        </div>
                                    </div>
                                </div>

                                <!-- BRANDING -->
                                    <div class="mt-16 text-center pt-8 border-t border-slate-50">
                                        <p class="text-[7px] font-bold text-slate-200 uppercase tracking-[0.5em]">Architected by Kang Jessy Agency Ecosystem</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education -->
        <template #education>
            <div class="space-y-8 py-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[10px] font-black uppercase tracking-widest">
                    Enterprise Branding DNA
                </div>
                <h4 class="text-2xl font-black text-text-primary tracking-tight">Invoice: Sentuhan Akhir Profesionalisme.</h4>
                <p class="text-[0.95rem] leading-relaxed text-text-secondary">
                    Banyak bisnis yang mengabaikan desain invoice, padahal ini adalah dokumen penting yang menentukan <strong>perceived value</strong> layanan Anda di mata klien. Invoice yang rapi, bermerk, dan premium memberikan kesan bahwa Anda adalah partner bisnis yang punya integritas dan keteraturan tinggi.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-bg-secondary p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border-color space-y-4">
                         <CreditCard :size="24" class="text-accent-primary" />
                         <h5 class="text-sm font-black text-text-primary uppercase tracking-widest">Payment Speed</h5>
                         <p class="text-[11px] text-text-tertiary leading-relaxed font-medium">Invoice yang jelas dan informatif terbukti mempercepat proses pembayaran hingga 24% lebih awal dibandingkan invoice standar.</p>
                    </div>
                    <div class="bg-bg-secondary p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border-color space-y-4">
                         <ShieldCheck :size="24" class="text-accent-secondary" />
                         <h5 class="text-sm font-black text-text-primary uppercase tracking-widest">Legal Credibility</h5>
                         <p class="text-[11px] text-text-tertiary leading-relaxed font-medium">Dokumentasi yang teratur melindungi posisi hukum dan memperjelas hak serta kewajiban Anda dan klien secara tertulis.</p>
                    </div>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { 
    Building2, User, Layout, UploadCloud, Download, Loader2, 
    CreditCard, ShieldCheck, Plus, Trash2, Check, ShoppingBag, 
    AlertCircle
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';
import html2pdf from 'html2pdf.js';

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('invoice-architect-v3');
const toast = useToast();

// State
const isGenerating = ref(false);
const logoInput = ref<HTMLInputElement | null>(null);
const currentTemplate = ref('modern');

const invoiceData = reactive({
    sender: { name: '', details: '', logo: null as string | null },
    client: { name: '', details: '' },
    meta: {
        invoiceNumber: 'INV-' + new Date().getFullYear() + '-001',
        date: new Date().toISOString().split('T')[0]
    },
    items: [
        { description: 'Premium Brand Identity Design', qty: 1, price: 5000000 }
    ],
    paymentDetails: '',
    notes: ''
});

// Persistence for Sender Info
onMounted(() => {
    const saved = localStorage.getItem('invoice_sender_v3');
    if (saved) invoiceData.sender = JSON.parse(saved);
});

watch(() => invoiceData.sender, (val) => {
    localStorage.setItem('invoice_sender_v3', JSON.stringify(val));
}, { deep: true });

// Actions
const triggerLogoUpload = () => {
    if (logoInput.value) {
        logoInput.value.click();
    }
};

const handleLogoUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Logo terlalu besar (Max 2MB)');
            return;
        }
        const reader = new FileReader();
        reader.onload = (el) => {
            invoiceData.sender.logo = el.target?.result as string;
            toast.success('Logo berhasil diunggah');
        };
        reader.readAsDataURL(file);
    }
};

const addItem = () => {
    invoiceData.items.push({ description: '', qty: 1, price: 0 });
};

const removeItem = (idx: number) => {
    invoiceData.items.splice(idx, 1);
};

const grandTotal = computed(() => {
    return invoiceData.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
});

const formatCurrency = (v: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);
};

const formatDate = (ds?: string) => {
    if (!ds) return '-';
    return new Date(ds).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const generatePDF = () => {
    const element = document.getElementById('invoice-preview');
    if (!element) {
        toast.error('Gagal mendeteksi elemen preview.');
        return;
    }
    
    // Prevent multiple clicks
    if (isGenerating.value) return;
    
    isGenerating.value = true;
    
    const invoiceNumber = invoiceData.meta.invoiceNumber || 'Invoice';

    // Options optimized for performance and stability
    const opt: any = {
        margin: 0,
        filename: `${invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { 
            scale: 2, 
            useCORS: false,
            allowTaint: true,
            letterRendering: true,
            logging: false,
            backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use the worker API explicitly for better control
    const worker = html2pdf().set(opt).from(element);
    
    worker.save()
        .then(() => {
            isGenerating.value = false;
            toast.success('Enterprise Invoice Architechted!');
            addEntry({ client: invoiceData.client.name, total: grandTotal.value }, JSON.parse(JSON.stringify(invoiceData)));
        })
        .catch((err: any) => {
            console.error('PDF Render Error:', err);
            isGenerating.value = false;
            toast.error('Gagal me-render PDF. Coba gunakan logo lain atau cek file gambar Anda.');
        });

    // Safety timeout to reset state if promise hangs
    setTimeout(() => {
        if (isGenerating.value) {
            isGenerating.value = false;
            console.warn('PDF generation timed out, resetting state.');
        }
    }, 15000); // 15 seconds limit
};

const restoreFromHistory = (item: any) => {
    Object.assign(invoiceData, item.result);
    toast.info('Invoice data restored');
};
</script>

<style scoped>
/* Font import for Inter via CSS to ensure precision in PDF */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.invoice-paper { box-shadow: 0 0 80px rgba(0,0,0,0.1); display: flex; flex-direction: column; }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }

/* SCALE WRAPPER: Target of CSS scaling */
.invoice-scale-wrapper {
    transform: scale(0.5);
    transform-origin: top center;
}

/* Fix for PDF scaling on desktop browsers */
@media screen and (min-width: 1024px) {
    .invoice-scale-wrapper {
        transform: scale(0.8);
    }
}
@media screen and (min-width: 1280px) {
    .invoice-scale-wrapper {
        transform: scale(0.9);
    }
}
@media screen and (min-width: 1536px) {
    .invoice-scale-wrapper {
        transform: scale(1);
    }
}

/* Base transform for smaller containers */
@media screen and (max-width: 1023px) {
    .invoice-scale-wrapper { transform: scale(0.5); }
    @media screen and (min-width: 480px) {
        .invoice-scale-wrapper { transform: scale(0.55); }
    }
    @media screen and (min-width: 640px) {
        .invoice-scale-wrapper { transform: scale(0.6); }
    }
    @media screen and (min-width: 768px) {
        .invoice-scale-wrapper { transform: scale(0.7); }
    }
}
@media screen and (max-width: 479px) {
    .invoice-scale-wrapper { transform: scale(0.36); }
}

/* Specific Template Overrides if needed beyond utility classes */
.template-minimal { border: 1px solid #f1f5f9; }
.template-bold { background: #fff !important; }
</style>
