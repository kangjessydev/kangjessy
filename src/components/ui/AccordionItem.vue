<template>
    <div class="bg-bg-secondary border border-border-color rounded-2xl overflow-hidden transition-all duration-400 ease-in-out group/faq"
        :class="{ 'border-accent-primary! border-2 bg-accent-primary/5 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]': isOpen }">
        <button
            class="w-full px-5 sm:px-7 py-5 sm:py-6 flex justify-between items-center bg-none border-none cursor-pointer text-left text-text-primary transition-all duration-300"
            @click="$emit('toggle')" :aria-expanded="isOpen" :aria-controls="`faq-content-${title.replace(/\s+/g, '-').toLowerCase()}`">
            <slot name="title">
                <span class="text-[clamp(0.95rem,1.5vw,1rem)] font-bold leading-[1.4] transition-colors"
                    :class="{ 'text-accent-primary': isOpen }">{{ title }}</span>
            </slot>
            <span
                class="text-text-secondary opacity-40 shrink-0 transition-all duration-300 ml-4 p-2 rounded-full group-hover/faq:bg-border-color"
                :class="{ 'text-accent-primary opacity-100! bg-accent-primary/10 rotate-180': isOpen }">
                <ChevronDownIcon :size="20" />
            </span>
        </button>

        <Transition
            enter-active-class="transition-[max-height,opacity,transform] duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
            leave-active-class="transition-[max-height,opacity,transform] duration-400 cubic-bezier(0.4, 0, 0.2, 1)"
            enter-from-class="max-h-0 opacity-0 -translate-y-2"
            enter-to-class="max-h-[1000px] opacity-100 translate-y-0"
            leave-from-class="max-h-[1000px] opacity-100 translate-y-0"
            leave-to-class="max-h-0 opacity-0 -translate-y-2">
            <div v-show="isOpen" :id="`faq-content-${title.replace(/\s+/g, '-').toLowerCase()}`" class="text-text-secondary leading-[1.7]">
                <div class="px-5 sm:px-7 pb-6 sm:pb-8 pt-2">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AccordionItem'
}
</script>

<script setup lang="ts">
import { ChevronDown as ChevronDownIcon } from 'lucide-vue-next';

withDefaults(defineProps<{
    title?: string;
    isOpen?: boolean;
    iconSize?: number;
}>(), {
    title: '',
    isOpen: false,
    iconSize: 18
});

defineEmits(['toggle']);
</script>

<style scoped>
.max-height-0 {
    max-height: 0;
}

.max-height-\[1000px\] {
    max-height: 1000px;
}
</style>
