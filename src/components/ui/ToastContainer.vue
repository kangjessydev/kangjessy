<template>
    <div class="fixed top-6 right-6 z-2000 flex flex-col gap-3 pointer-events-none">
        <TransitionGroup name="toast">
            <div v-for="toast in toasts" :key="toast.id" 
                class="pointer-events-auto min-w-[300px] bg-bg-secondary border border-border-color rounded-xl p-4 shadow-2xl flex items-start gap-4 animate-slide-in relative overflow-hidden backdrop-blur-md"
                :class="typeStyles[toast.type]">
                <div class="absolute left-0 top-0 bottom-0 w-1" :class="accentStyles[toast.type]"></div>
                
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-[0.6rem] font-black uppercase tracking-widest opacity-50">{{ toast.type }}</span>
                        <button @click="removeToast(toast.id)" class="text-text-tertiary hover:text-text-primary transition-colors">
                            <XIcon :size="14" />
                        </button>
                    </div>
                    <p class="text-sm font-bold text-text-primary leading-snug">{{ toast.message }}</p>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useToast } from '../../composables/useToast'
import { X as XIcon } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const typeStyles = {
    success: 'border-emerald-500/20 bg-emerald-500/[0.02]',
    error: 'border-red-500/20 bg-red-500/[0.02]',
    info: 'border-accent-primary/20 bg-accent-primary/[0.02]',
    warning: 'border-amber-500/20 bg-amber-500/[0.02]'
}

const accentStyles = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-accent-primary',
    warning: 'bg-amber-500'
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from { opacity: 0; transform: translateX(30px) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateX(30px) scale(0.9); }

@keyframes slideIn {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}
</style>
