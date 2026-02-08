<template>
    <div class="min-h-screen bg-bg-primary pt-32 pb-20 px-6 flex justify-center items-start overflow-x-hidden">
        <!-- Background Elements -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-accent-primary/10 blur-[120px] rounded-full"></div>
            <div class="absolute bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-accent-secondary/10 blur-[120px] rounded-full"></div>
        </div>

        <div class="w-full max-w-2xl relative z-10">
            <template v-if="!isSuccess">
                <div class="text-center mb-12 animate-fade-in-up">
                    <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white italic tracking-tight mb-4">
                        Share Your <span class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Story</span>
                    </h1>
                    <p class="text-text-secondary text-lg max-w-lg mx-auto leading-relaxed">
                        Pengalaman Anda sangat berarti bagi kami. Bantu kami menjadi lebih baik dengan membagikan cerita kerjasama kita.
                    </p>
                </div>

                <div class="bg-bg-secondary/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl space-y-8 animate-fade-in-up [animation-delay:200ms]">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <!-- Name & Job Title -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-text-tertiary ml-2 uppercase tracking-widest">Nama Lengkap</label>
                                <div class="relative group">
                                    <UserIcon class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors shrink-0" :size="18" />
                                    <input v-model="form.name" type="text" required placeholder="Contoh: Jessy James"
                                        class="w-full bg-bg-primary/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 transition-all text-[0.95rem]" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-text-tertiary ml-2 uppercase tracking-widest">Pekerjaan / Jabatan</label>
                                <div class="relative group">
                                    <BriefcaseIcon class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors shrink-0" :size="18" />
                                    <input v-model="form.jobTitle" type="text" required placeholder="Contoh: Founder"
                                        class="w-full bg-bg-primary/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 transition-all text-[0.95rem]" />
                                </div>
                            </div>
                        </div>

                        <!-- Company & Website -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-text-tertiary ml-2 uppercase tracking-widest">Nama Perusahaan</label>
                                <div class="relative group">
                                    <GlobeIcon class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors shrink-0" :size="18" />
                                    <input v-model="form.company" type="text" required placeholder="Contoh: Tech Corp"
                                        class="w-full bg-bg-primary/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 transition-all text-[0.95rem]" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-text-tertiary ml-2 uppercase tracking-widest">URL Website (Opsional)</label>
                                <div class="relative group">
                                    <LinkIcon class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors shrink-0" :size="18" />
                                    <input v-model="form.companyUrl" type="url" placeholder="https://..."
                                        class="w-full bg-bg-primary/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white outline-none focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 transition-all text-[0.95rem]" />
                                </div>
                            </div>
                        </div>

                        <!-- Testimonial Content -->
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-text-tertiary ml-2 uppercase tracking-widest">Pesan Testimonial</label>
                            <textarea v-model="form.text" required rows="5" 
                                placeholder="Bagaimana pengalaman Anda bekerjasama dengan kami?"
                                class="w-full bg-bg-primary/50 border border-white/5 rounded-2xl p-6 text-white outline-none focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 transition-all resize-none text-[0.95rem]"></textarea>
                        </div>

                        <!-- Submit Button -->
                        <div class="pt-4">
                            <BaseButton type="submit" variant="primary" size="lg" class="w-full h-16 text-lg font-bold shadow-xl shadow-accent-primary/20" :disabled="isLoading">
                                <Loader2 v-if="isLoading" class="animate-spin mr-2 shrink-0" :size="24" />
                                <span v-else>Kirim Testimonial</span>
                            </BaseButton>
                        </div>
                    </form>

                    <p class="text-center text-xs text-text-tertiary leading-relaxed px-8">
                        Dengan menekan tombol kirim, Anda setuju cerita pengalaman Anda ditampilkan secara publik di portfolio kami.
                    </p>
                </div>
            </template>

            <!-- Success State -->
            <div v-else class="text-center space-y-8 py-20 animate-fade-in-up">
                <div class="w-24 h-24 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
                    <CheckIcon :size="48" stroke-width="3" class="shrink-0" />
                </div>
                <div class="space-y-4">
                    <h2 class="text-[clamp(2rem,5vw,3rem)] font-black text-white italic tracking-tight leading-none">Terima Kasih, <span class="text-accent-primary">{{ form.name.split(' ')[0] }}!</span></h2>
                    <p class="text-text-secondary text-lg max-w-sm mx-auto leading-relaxed">
                        Testimonial Anda telah kami terima dan akan segera tampil di website setelah proses review.
                    </p>
                </div>
                <div class="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <BaseButton to="/testimonials" variant="secondary" size="lg">
                        Lihat Testimonial Lain
                    </BaseButton>
                    <BaseButton to="/" variant="primary" size="lg">
                        Kembali ke Home
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { 
    User as UserIcon, 
    Briefcase as BriefcaseIcon, 
    Globe as GlobeIcon,
    Link as LinkIcon,
    Loader2, 
    Check as CheckIcon 
} from 'lucide-vue-next';
import { BaseButton } from "@kangjessy/ui";
import { useSEO } from '../../composables/useSEO';

useSEO({
    title: 'Share Your Experience',
    description: 'Bagikan pengalaman Anda bekerja dengan KangJessy Agency. Kami sangat menghargai feedback Anda.',
    url: '/share-experience'
});

const isSuccess = ref(false);
const isLoading = ref(false);

const form = reactive({
    name: '',
    jobTitle: '',
    company: '',
    companyUrl: '',
    text: '',
    rating: 5 // Default internal rating
});

const handleSubmit = async () => {
    isLoading.value = true;
    
    // Simulate API Call
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        isSuccess.value = true;
        
        // Note for AI/Human: Later this will connect to Supabase
        console.log('Testimonial Payload:', { ...form });
    } catch (e) {
        console.error(e);
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
</style>

