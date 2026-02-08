<template>
    <BottomSheet :modelValue="isOpen" :title="'Email Support'" :icon="MailIcon" @update:modelValue="$emit('close')"
        @close="$emit('close')">
        <!-- Main Content -->
        <div class="p-6">
            <!-- Messages Display -->
            <div class="mb-8">
                <div class="flex flex-col items-start max-w-[90%]">
                    <div
                        class="bg-bg-primary border border-border-color px-5 py-4 rounded-[4px_24px_24px_24px] text-[0.95rem] leading-relaxed text-text-primary shadow-sm">
                        <p>Halo! Silakan kirim detail pertanyaan atau proposal Anda melalui form di bawah ini. Saya akan
                            membalas k email Anda secepatnya.</p>
                        <span
                            class="block text-[0.7rem] text-text-tertiary font-bold mt-2 text-right uppercase tracking-wider">{{
                                currentTime }}</span>
                    </div>
                </div>
            </div>

            <!-- Form Area -->
            <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label
                            class="block text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1">Nama
                            Lengkap</label>
                        <input v-model="form.name" type="text" placeholder="Masukkan nama..."
                            class="w-full bg-bg-primary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 placeholder:text-text-tertiary">
                    </div>
                    <div class="space-y-2">
                        <label
                            class="block text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1">Email
                            Aktif</label>
                        <input v-model="form.email" type="email" placeholder="nama@email.com"
                            class="w-full bg-bg-primary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 placeholder:text-text-tertiary">
                    </div>
                </div>

                <div class="space-y-2">
                    <label
                        class="block text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1">Subjek</label>
                    <input v-model="form.subject" type="text" placeholder="Ringkasan pertanyaan..."
                        class="w-full bg-bg-primary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 placeholder:text-text-tertiary">
                </div>

                <div class="space-y-2">
                    <label
                        class="block text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1">Pesan</label>
                    <textarea v-model="form.message" placeholder="Tulis pesan lengkap..." rows="4"
                        class="w-full bg-bg-primary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-red-500/50 focus:ring-4 focus:ring-red-500/5 resize-none placeholder:text-text-tertiary"></textarea>
                </div>
            </div>

            <p class="text-[0.65rem] text-text-tertiary font-medium text-center mt-6 px-4">
                Balasan akan dikirimkan ke alamat email yang Anda cantumkan di atas.
            </p>
        </div>

        <!-- Footer Action -->
        <template #footer>
            <button @click="handleSend" :disabled="!isFormValid || loading"
                class="w-full bg-red-500 hover:bg-red-600 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white p-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[0.95rem] transition-all active:scale-[0.98] shadow-xl shadow-red-500/20 disabled:shadow-none">
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin">
                </div>
                <template v-else>
                    <SendIcon :size="20" />
                    <span>Kirim Pesan Email</span>
                </template>
            </button>
        </template>
    </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Mail as MailIcon, Send as SendIcon } from 'lucide-vue-next';
import BottomSheet from './BottomSheet.vue';
import { siteConfig } from '@/data/config/siteConfig';

const props = defineProps<{
    isOpen: boolean;
    initialSubject?: string;
}>();

const emit = defineEmits(['close']);

const loading = ref(false);
const currentTime = computed(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const isFormValid = computed(() => {
    return form.value.name.trim() &&
        form.value.email.trim() &&
        form.value.email.includes('@') &&
        form.value.subject.trim() &&
        form.value.message.trim();
});

watch(() => props.isOpen, (val) => {
    if (val && props.initialSubject) {
        form.value.subject = props.initialSubject;
    }
});

const handleSend = async () => {
    if (!isFormValid.value) return;

    loading.value = true;

    try {
        const mailtoLink = `mailto:${siteConfig.socials.email}?subject=${encodeURIComponent(form.value.subject)}&body=${encodeURIComponent(`Name: ${form.value.name}\n\n${form.value.message}`)}`;
        window.location.href = mailtoLink;

        emit('close');
        form.value = { name: '', email: '', subject: '', message: '' };

    } catch (error) {
        console.error('Email Send Error:', error);
    } finally {
        loading.value = false;
    }
};
</script>
