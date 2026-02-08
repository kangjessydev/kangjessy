<template>
    <div class="fixed top-0 left-0 w-full h-1 z-10002 pointer-events-none transition-opacity duration-300"
        :class="{ 'opacity-0': hasActiveSheet }">
        <div class="h-full bg-linear-to-r from-accent-primary to-accent-secondary shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.5)] transition-all duration-150 ease-out"
            :style="{ width: `${progress}%` }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { activeSheet } from "@kangjessy/ui";

const hasActiveSheet = computed(() => activeSheet.value !== null);

const progress = ref(0);
let ticking = false;

const updateProgress = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                const currentScroll = window.scrollY;
                progress.value = (currentScroll / scrollHeight) * 100;
            } else {
                progress.value = 0;
            }
            ticking = false;
        });
        ticking = true;
    }
};

onMounted(() => {
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial check
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress);
});
</script>
