<template>
    <ToolLayout title="Professional Communication Architect"
        subtitle="Ubah draft pesan acak atau bahasa santai jadi komunikasi kelas dunia yang persuasif & elegan."
        badge="AI Business Writing" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-12">
            <!-- Main Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Draft Input -->
                <div class="lg:col-span-5 space-y-8">
                    <div class="bg-bg-secondary border border-border-color rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 md:shadow-sm space-y-8 relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                            <PenTool :size="80" />
                        </div>

                        <div class="relative z-10 space-y-6">
                            <div class="space-y-3">
                                <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                                    <MessageSquare :size="14" class="text-accent-primary shrink-0" />
                                    Input Draft Mentah
                                </label>
                                <textarea v-model="rawInput" rows="6" 
                                    placeholder="Tuliskan poin-poin ide Anda di sini... (Misal: 'bro, sori telat kirim desainnya, besok ya')"
                                    class="w-full bg-bg-tertiary border border-border-color rounded-2xl p-6 text-text-primary focus:border-accent-primary focus:ring-8 focus:ring-accent-primary/5 outline-none transition-all text-sm font-medium leading-relaxed resize-none"></textarea>
                            </div>

                            <!-- Options Grid -->
                            <div class="grid grid-cols-1 gap-4 pt-4 border-t border-border-color/30">
                                <div class="space-y-3">
                                    <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-tertiary">Transformasi Mode</label>
                                    <div class="grid grid-cols-2 gap-2">
                                        <button v-for="m in modes" :key="m.id" @click="activeMode = m.id"
                                            class="px-4 py-3 rounded-xl border text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest transition-all text-center"
                                            :class="activeMode === m.id ? 'bg-accent-primary border-accent-primary text-white shadow-lg' : 'bg-bg-tertiary border-border-color text-text-tertiary hover:text-text-primary'">
                                            {{ m.label }}
                                        </button>
                                    </div>
                                </div>

                                <div class="space-y-3">
                                    <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-widest text-text-tertiary">Personalized Tone</label>
                                    <div class="flex flex-wrap gap-2">
                                        <button v-for="t in tones" :key="t" @click="activeTone = t"
                                            class="px-4 py-2 rounded-full border text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest transition-all"
                                            :class="activeTone === t ? 'bg-accent-secondary border-accent-secondary text-white' : 'bg-bg-tertiary border-border-color text-text-tertiary'">
                                            {{ t }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <BaseButton variant="primary" :disabled="!rawInput || loading" @click="rewrite" class="w-full py-5 rounded-2xl shadow-xl shadow-accent-primary/20">
                                <div class="flex items-center gap-2">
                                    <Zap v-if="!loading" :size="16" />
                                    <Loader2 v-else :size="16" class="animate-spin" />
                                    <span class="font-black uppercase tracking-widest">Architect Message</span>
                                </div>
                            </BaseButton>
                        </div>
                    </div>

                    <!-- Psychology Insight -->
                    <div class="bg-linear-to-br from-accent-primary/5 to-transparent border border-accent-primary/10 rounded-[2.5rem] p-8 space-y-4">
                         <div class="flex items-center gap-3">
                            <Brain :size="20" class="text-accent-primary shrink-0" />
                            <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] text-text-primary">Social Proof DNA</span>
                         </div>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium italic">
                            "Kata-kata adalah representasi dari kualitas kerja Anda. Komunikasi yang terstruktur memberikan sinyal bahwa Anda adalah partner bisnis yang punya integritas dan keteraturan."
                         </p>
                    </div>
                </div>

                <!-- Right: Refined Output -->
                <div class="lg:col-span-7 space-y-6">
                    <div v-if="refinedOutput" class="animate-in slide-in-from-bottom-8 duration-700">
                        <div class="bg-bg-secondary border border-border-color rounded-3xl md:rounded-[3rem] p-6 md:p-12 md:shadow-sm space-y-8 relative overflow-hidden group">
                            
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                        <CheckCheck :size="20" />
                                    </div>
                                    <div>
                                        <h4 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-primary">Refined Communication</h4>
                                        <p class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary font-bold uppercase tracking-widest">{{ activeMode }} • {{ activeTone }}</p>
                                    </div>
                                </div>
                                <button @click="copyOutput" class="p-3 bg-bg-tertiary border border-border-color rounded-xl hover:text-accent-primary transition-all">
                                    <Copy v-if="!copied" :size="18" />
                                    <Check v-else :size="18" class="text-green-500" />
                                </button>
                            </div>

                            <div class="relative min-h-[200px] md:min-h-[300px]">
                                <p class="text-[clamp(1rem,2.5vw,1.25rem)] text-text-primary font-medium leading-relaxed italic whitespace-pre-wrap select-all md:px-2">
                                    {{ refinedOutput }}
                                </p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-5 bg-bg-tertiary/30 rounded-2xl border border-border-color flex gap-4 items-start">
                                    <Lightbulb :size="18" class="text-accent-secondary shrink-0 mt-1" />
                                    <div>
                                        <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase text-text-secondary mb-1">Strategi Digunakan:</p>
                                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Menggunakan pembukaan yang apresiatif dan penutupan berbasis Call-to-Action.</p>
                                    </div>
                                </div>
                                <div class="p-5 bg-bg-tertiary/30 rounded-2xl border border-border-color flex gap-4 items-start">
                                    <ShieldCheck :size="18" class="text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase text-text-secondary mb-1">Status Keamanan:</p>
                                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Bebas dari ambiguitas dan menjaga sopan santun profesional.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Placeholder -->
                    <div v-else class="h-full min-h-[400px] md:min-h-[500px] bg-bg-secondary/30 border border-border-color border-dashed rounded-3xl md:rounded-[3rem] flex flex-col items-center justify-center text-center p-8 md:p-12 opacity-40">
                        <div class="w-20 h-20 bg-bg-tertiary rounded-full flex items-center justify-center mb-6">
                            <Sparkles :size="32" class="text-text-tertiary" />
                        </div>
                        <h4 class="text-lg font-black text-text-primary mb-2">Architecting Excellence...</h4>
                        <p class="text-sm text-text-tertiary max-w-xs">Tuliskan draft Anda di sebelah kiri untuk melihat keajaiban transformasi komunikasi.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education -->
        <template #education>
            <div class="space-y-8 py-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-center">
                    Enterprise Communication SOP
                </div>
                <h4 class="text-2xl font-black text-text-primary tracking-tight">Kekuatan Narasi Profesional.</h4>
                <p class="text-[0.95rem] leading-relaxed text-text-secondary">
                    Dalam dunia bisnis, bukan hanya *apa* yang Anda katakan, tapi *bagaimana* Anda mengatakannya. Komunikasi yang terstruktur—mulai dari subjek hingga penutup—menentukan apakah klien akan menghargai Anda sebagai expert atau hanya sekadar vendor biasa.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-bg-secondary p-8 rounded-3xl border border-border-color space-y-4">
                         <Target :size="24" class="text-accent-primary shrink-0" />
                         <h5 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black text-text-primary uppercase tracking-widest">The "WIIFM" Principle</h5>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium"><em>What's In It For Me?</em> Pastikan setiap kalimat menyoroti keuntungan bagi lawan bicara, bukan hanya menceritakan diri Anda sendiri.</p>
                    </div>
                    <div class="bg-bg-secondary p-8 rounded-3xl border border-border-color space-y-4">
                         <Shield :size="24" class="text-accent-secondary shrink-0" />
                         <h5 class="text-[clamp(0.75rem,2vw,0.8rem)] font-black text-text-primary uppercase tracking-widest">Clarity is Kind</h5>
                         <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed font-medium">Menjadi profesional tidak berarti menggunakan kata-kata yang rumit. Justru, kejelasan pesan adalah tanda kecerdasan tertinggi.</p>
                    </div>
                </div>
            </div>
        </template>

        <!-- History Item -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <FileText :size="18" />
                </div>
                <div class="flex flex-col min-w-0 gap-0.5">
                    <span class="text-[clamp(0.75rem,1.8vw,0.8rem)] font-black text-text-primary truncate">{{ item.input.raw.substring(0, 30) }}...</span>
                    <span class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary font-bold uppercase tracking-widest shrink-0">{{ item.input.mode }}</span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
    MessageSquare, Zap, Loader2, PenTool, Brain,
    CheckCheck, Copy, Check, Lightbulb, ShieldCheck,
    Target, Shield, FileText, Sparkles
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('pro-rewriter');
const toast = useToast();

// State
const rawInput = ref('');
const refinedOutput = ref('');
const loading = ref(false);
const activeMode = ref('formal-email');
const activeTone = ref('Confident');
const copied = ref(false);

const modes = [
    { id: 'formal-email', label: 'Email Formal' },
    { id: 'persuasive-proposal', label: 'Proposal/Pitch' },
    { id: 'concise-brief', label: 'Brief Singkat' },
    { id: 'empathetic-response', label: 'Respon Empati' }
];

const tones = ['Confident', 'Polite', 'Direct', 'Creative'];

// Mock Rewriting Logic (Smart Template System)
async function rewrite() {
    if (!rawInput.value) return;
    
    loading.value = true;
    refinedOutput.value = '';

    // Artificial delay for "processing" feel
    await new Promise(r => setTimeout(r, 1500));

    const input = rawInput.value.toLowerCase();
    let result = '';

    // Logic for Formal Email
    if (activeMode.value === 'formal-email') {
        const greetings = activeTone.value === 'Confident' ? 'Yth. Bapak/Ibu,' : 'Halo, selamat pagi/siang,';
        const closing = activeTone.value === 'Confident' ? 'Salam hangat,\nKang Jessy Agency' : 'Terima kasih atas pengertiannya.';
        
        if (input.includes('telat') || input.includes('sorry') || input.includes('maaf')) {
            result = `${greetings}\n\nSaya ingin menyampaikan permohonan maaf atas sedikit keterlambatan dalam pengiriman draf progres proyek kita. Kami sedang memastikan setiap detail visual memenuhi standar kualitas tertinggi sebelum dikirimkan kepada Anda.\n\nFile tersebut akan kami serahkan paling lambat besok pagi. Terima kasih atas pengertian dan kerja sama yang baik ini.\n\n${closing}`;
        } else if (input.includes('tagihan') || input.includes('invoice') || input.includes('bayar')) {
            result = `${greetings}\n\nSemoga hari Anda menyenangkan. Bersama pesan ini, saya lampirkan dokumen terkait progres pekerjaan yang telah selesai. Sebagai kelanjutan dari kerja sama kita, berikut terlampir detail untuk proses administrasi selanjutnya.\n\nMohon kabari kami jika Bapak/Ibu memerlukan informasi tambahan terkait hal ini.\n\n${closing}`;
        } else {
            result = `${greetings}\n\nMelalui pesan ini, saya ingin menindaklanjuti terkait poin-poin yang telah kita diskusikan sebelumnya. Kami berkomitmen untuk memberikan solusi terbaik yang selaras dengan visi bisnis Anda.\n\nMari kita jadwalkan sesi diskusi singkat untuk mematangkan konsep ini lebih lanjut.\n\n${closing}`;
        }
    } 
    // Logic for Persuasive Proposal
    else if (activeMode.value === 'persuasive-proposal') {
        result = `Strategi Transformasi Digital: Menerjemahkan Ide Anda Menjadi Kenyataan\n\nBerdasarkan kebutuhan yang Anda sampaikan, kami melihat potensi besar untuk mengoptimalkan brand Anda melalui pendekatan visual yang berani dan teknologi yang efisien.\n\n"Draft Anda": ${rawInput.value}\n\nSolusi Kami:\n1. Re-branding yang fokus pada Unique Selling Point.\n2. Arsitektur komunikasi yang lebih persuasif bagi audiens.\n3. Implementasi aset kreatif eksklusif.\n\nSiapkah kita mulai menaikkan level bisnis Anda ke tahap berikutnya?`;
    }
    // Logic for Concise Brief
    else if (activeMode.value === 'concise-brief') {
        result = `Summary & Action Plan:\n\n- Konteks: ${rawInput.value}\n- Action Item: Pengiriman aset final akan dilakukan dalam waktu dekat.\n- Status: On Track dengan sedikit penyesuaian detail.\n- Next Step: Menunggu konfirmasi dari pihak manajemen.`;
    }
    // Default empathetic
    else {
        result = `Kami mengerti tantangan yang sedang Anda hadapi terkait "${rawInput.value}". Di Kang Jessy Agency, prioritas utama kami adalah membantu Anda melewatinya dengan solusi komunikasi yang lebih manusiawi namun tetap profesional.\n\nMari kita bicarakan solusinya bersama-sama.`;
    }

    refinedOutput.value = result;
    loading.value = false;

    // Save to history
    addEntry({ raw: rawInput.value, mode: activeMode.value, tone: activeTone.value }, result);
}

function copyOutput() {
    if (!refinedOutput.value) return;
    navigator.clipboard.writeText(refinedOutput.value);
    copied.value = true;
    toast.success('Pesan profesional berhasil disalin!');
    setTimeout(() => { copied.value = false; }, 2000);
}

function restoreFromHistory(item: any) {
    rawInput.value = item.input.raw;
    activeMode.value = item.input.mode;
    activeTone.value = item.input.tone;
    refinedOutput.value = item.result;
}
</script>

<style scoped>
/* Scoped customs if any */
</style>
