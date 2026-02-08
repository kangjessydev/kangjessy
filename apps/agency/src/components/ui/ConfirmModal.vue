<template>
    <Transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="show" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
            
            <!-- Modal Content -->
            <Transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="ease-in duration-200" leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
                <div v-if="show" class="bg-bg-primary border border-border-color w-full max-w-sm rounded-[32px] overflow-hidden relative shadow-2xl p-8 text-center font-sans">
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        :class="variant === 'danger' ? 'bg-rose-500/10 text-rose-500' : 'bg-accent-primary/10 text-accent-primary'">
                        <AlertTriangle v-if="variant === 'danger'" :size="32" />
                        <Info v-else :size="32" />
                    </div>
                    
                    <h3 class="text-xl font-black text-text-primary mb-2 italic" v-html="title"></h3>
                    <p class="text-sm font-medium text-text-secondary leading-relaxed mb-8">
                        {{ message }}
                    </p>
                    
                    <div class="flex flex-col gap-3">
                        <button @click="$emit('confirm')" 
                            class="w-full font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
                            :class="variant === 'danger' ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20' : 'bg-accent-primary hover:bg-accent-secondary text-white shadow-accent-primary/20'">
                            {{ confirmLabel || 'Confirm' }}
                        </button>
                        <button @click="$emit('cancel')" 
                            class="w-full bg-bg-secondary hover:bg-bg-tertiary text-text-primary font-bold py-4 rounded-xl transition-all cursor-pointer">
                            {{ cancelLabel || 'Cancel' }}
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { AlertTriangle, Info } from 'lucide-vue-next';

interface Props {
    show: boolean;
    title: string;
    message: string;
    variant?: 'danger' | 'info';
    confirmLabel?: string;
    cancelLabel?: string;
}

withDefaults(defineProps<Props>(), {
    variant: 'danger'
});

defineEmits(['confirm', 'cancel']);
</script>
