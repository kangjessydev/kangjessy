<template>
    <div class="max-w-[500px] mx-auto mt-15">
        <div class="h-1.5 bg-bg-secondary rounded-full relative mb-6">
            <div class="absolute h-full bg-linear-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-600 ease-in-out"
                :style="{ width: progressWidth }"></div>
        </div>
        <div class="flex justify-between gap-4">
            <div class="flex flex-col items-center gap-1.5 sm:gap-2.5 transition-colors duration-300 flex-1"
                :class="step >= 1 ? (step > 1 ? 'text-accent-primary' : 'text-text-primary') : 'text-text-secondary opacity-50'">
                <span
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-bg-secondary border-2 border-border-color flex items-center justify-center font-extrabold transition-all shrink-0"
                    :class="{ 'bg-accent-primary! border-accent-primary! text-white shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.4)]': step >= 1 }">
                    <CheckIcon v-if="step > 1" :size="14" />
                    <span v-else>1</span>
                </span>
                <span class="text-[0.7rem] sm:text-[0.85rem] font-bold text-center">Konfigurasi</span>
            </div>
            <div class="flex flex-col items-center gap-1.5 sm:gap-2.5 transition-colors duration-300 flex-1"
                :class="step >= 2 ? 'text-text-primary' : 'text-text-secondary opacity-50'">
                <span
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-bg-secondary border-2 border-border-color flex items-center justify-center font-extrabold transition-all shrink-0"
                    :class="{ 'bg-accent-primary! border-accent-primary! text-white shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.4)]': step >= 2 }">
                    2
                </span>
                <span class="text-[0.7rem] sm:text-[0.85rem] font-bold text-center">Informasi</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Check as CheckIcon } from 'lucide-vue-next';

const props = defineProps<{
    step: number;
}>();

const progressWidth = computed(() => props.step === 1 ? '50%' : '100%');
</script>
