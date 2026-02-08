<template>
    <div class="min-h-screen bg-bg-primary pt-24 pb-16">
        <div class="container mx-auto px-4">
            <!-- Header / Breadcrumb -->
            <nav
                class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[clamp(0.75rem,2vw,0.8rem)] font-medium text-text-tertiary mb-6 overflow-hidden">
                <router-link to="/" class="hover:text-accent-primary transition-colors shrink-0">Home</router-link>
                <ChevronRight :size="12" class="shrink-0" />
                <router-link to="/"
                    class="hover:text-accent-primary transition-colors shrink-0">Tools</router-link>
                <ChevronRight :size="12" class="shrink-0" />
                <span
                    class="text-text-primary uppercase tracking-widest font-bold truncate max-w-[150px] md:max-w-none">{{
                    title }}</span>
            </nav>

            <SectionHeader :title="title" :subtitle="subtitle" align="left" :badge="badge" class="mb-12">
                <template #title>
                    <slot name="header-title">{{ title }}</slot>
                </template>
            </SectionHeader>

            <!-- Main Layout: Stacked (No Sidebar) -->
            <div class="flex flex-col gap-12">
                <!-- Main Tool Area -->
                <main class="flex flex-col gap-8">
                    <div
                        class="bg-bg-secondary border border-border-color rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-sm">
                        <slot />
                    </div>

                    <!-- Education Section (if provided) -->
                    <div v-if="$slots.education"
                        class="bg-bg-tertiary/30 border border-border-color/50 rounded-2xl md:rounded-3xl p-4 md:p-8">
                        <h3
                            class="text-[0.85rem] md:text-[0.9rem] font-black uppercase tracking-widest text-text-primary mb-4 flex items-center gap-2">
                            <Info :size="18" class="text-accent-primary" />
                            Mengapa Tool ini Penting?
                        </h3>
                        <div class="text-[0.95rem] text-text-secondary leading-relaxed space-y-4 prose-sm prose-invert">
                            <slot name="education" />
                        </div>
                    </div>
                </main>

                <!-- Footer Widgets (History, Tips, Feedback) -->
                <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <!-- History Section -->
                    <div
                        class="bg-bg-secondary border border-border-color rounded-3xl p-6 shadow-md overflow-hidden relative">
                        <div
                            class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-accent-primary to-accent-secondary opacity-50">
                        </div>

                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-[0.85rem] font-black uppercase tracking-widest text-text-primary">Terakhir
                                Dibuat</h3>
                            <button @click="$emit('clear-history')"
                                class="text-[10px] uppercase font-bold text-text-tertiary hover:text-red-500 transition-colors">
                                Hapus Semua
                            </button>
                        </div>

                        <div v-if="history.length === 0"
                            class="py-12 flex flex-col items-center text-center opacity-40">
                            <History :size="32" class="mb-3" />
                            <p class="text-[0.8rem] px-8">Belum ada riwayat. Mulai buat sesuatu!</p>
                        </div>

                        <div v-else class="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                            <TransitionGroup name="list">
                                <div v-for="item in history" :key="item.id"
                                    class="group/h-item relative bg-bg-tertiary border border-border-color rounded-2xl p-4 transition-all hover:border-accent-primary/40 cursor-pointer active:scale-95"
                                    @click="$emit('restore', item)">
                                    <div class="flex flex-col flex-1 min-w-0 pr-6">
                                        <slot name="history-item" :item="item">
                                            <span class="text-[0.85rem] font-bold text-text-primary truncate mb-1">{{
                                                item.title ||
                                                'Untitled' }}</span>
                                            <span class="text-[0.7rem] text-text-tertiary">{{ formatDate(item.timestamp)
                                                }}</span>
                                        </slot>
                                    </div>
                                    <button @click.stop="$emit('remove-entry', item.id)"
                                        class="absolute top-4 right-4 text-text-tertiary hover:text-red-500 transition-colors opacity-0 group-hover/h-item:opacity-100">
                                        <Trash2 :size="14" />
                                    </button>
                                </div>
                            </TransitionGroup>
                        </div>

                        <!-- Notice -->
                        <div
                            class="mt-6 pt-6 border-t border-border-color flex items-start gap-2 text-[0.7rem] text-text-tertiary leading-snug">
                            <ShieldCheck :size="14" class="shrink-0 text-accent-primary opacity-60" />
                            <span>Data disimpan di browser Anda secara lokal.</span>
                        </div>
                    </div>

                    <!-- Feature Tip -->
                    <div
                        class="bg-linear-to-br from-accent-primary/10 to-transparent border border-accent-primary/20 rounded-3xl p-6">
                        <div class="flex items-center gap-3 mb-3">
                            <div
                                class="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-white">
                                <Zap :size="16" />
                            </div>
                            <span class="text-xs font-black uppercase tracking-widest text-text-primary">Tips Pro</span>
                        </div>
                        <p class="text-[0.85rem] text-text-secondary leading-relaxed italic">
                            "Gunakan tools ini untuk mempermudah workflow harian bisnis Anda. Gratis selamanya dari
                            KangJessy."
                        </p>
                    </div>

                    <!-- Feedback / Request Section -->
                    <div class="bg-bg-secondary border border-border-color border-dashed rounded-3xl p-6 text-center">
                        <div
                            class="w-12 h-12 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4 text-accent-primary">
                            <MessageSquareQuote :size="24" />
                        </div>
                        <h4 class="text-[0.85rem] font-bold text-text-primary mb-2">Punya Ide atau Masalah?</h4>
                        <p class="text-[0.75rem] text-text-tertiary leading-relaxed mb-4">
                            Bantu kami menyempurnakan tool ini. Berikan feedback atau request fitur baru langsung ke
                            WhatsApp.
                        </p>
                        <button @click="sendFeedback"
                            class="w-full py-3 bg-bg-tertiary border border-border-color rounded-xl text-xs font-bold text-text-primary hover:border-accent-primary hover:text-accent-primary transition-all flex items-center justify-center gap-2">
                            Kirim Feedback
                        </button>
                    </div>

                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronRight, Info, History, Trash2, ShieldCheck, Zap, MessageSquareQuote } from 'lucide-vue-next';
import SectionHeader from '@/components/SectionHeader.vue';
import { usePopupManager } from '@/composables/usePopupManager';

const props = defineProps<{
    title: string;
    subtitle?: string;
    badge?: string;
    history: any[];
}>();

defineEmits(['clear-history', 'remove-entry', 'restore']);

const { Popups, openModal } = usePopupManager();

const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(timestamp));
};

const sendFeedback = () => {
    openModal(Popups.CHAT_WA, {
        title: `Feedback: ${props.title}`,
        bubbleMessage: 'Halo Kang! saya punya ide atau saran pengembangan nih buat Tools yang ini...',
        initialMessage: `Saya punya feedback untuk tool "${props.title}":\n\n`,
        actionText: 'Kirim Feedback',
        category: 'Tool Feedback'
    });
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* Custom Scrollbar for History List */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(var(--color-border), 0.5);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(var(--color-accent-primary), 0.5);
}
</style>
