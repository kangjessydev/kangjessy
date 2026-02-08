<template>
    <div v-if="hasMore" class="flex justify-center mt-12">
        <button @click="$emit('load')" :disabled="loading"
            class="group relative px-10 py-4 bg-bg-secondary border border-border-color rounded-2xl font-bold text-text-primary transition-all hover:border-accent-primary hover:bg-accent-primary/5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:shadow-accent-primary/5">
            <div class="relative z-10 flex items-center gap-3">
                <template v-if="loading">
                    <Loader2 :size="18" class="animate-spin text-accent-primary" />
                    <span class="animate-pulse tracking-wide">Loading...</span>
                </template>
                <template v-else>
                    <span class="tracking-wide">Tampilkan Lebih Banyak</span>
                    <ChevronDownIcon :size="18" class="transition-transform duration-300 group-hover:translate-y-1" />
                </template>
            </div>

            <!-- Subtle hover glow -->
            <div
                class="absolute inset-0 bg-radial-[circle_at_50%_120%] from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'LoadMore'
}
</script>

<script setup lang="ts">
import { Loader2, ChevronDown as ChevronDownIcon } from 'lucide-vue-next';

defineProps<{
    hasMore: boolean;
    loading?: boolean;
}>();

defineEmits<{
    (e: 'load'): void;
}>();
</script>
