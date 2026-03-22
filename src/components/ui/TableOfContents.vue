<template>
    <!-- Desktop: Sticky Sidebar (hidden on mobile) -->
    <aside v-if="items.length > 0" class="hidden lg:block fixed top-24 right-8 w-64 transition-all duration-300"
        :class="{ 'opacity-0 pointer-events-none': !isVisible }">
        <div class="bg-bg-secondary/80 backdrop-blur-xl border border-border-color rounded-2xl p-5 shadow-2xl">
            <div class="flex items-center gap-2 mb-4 pb-3 border-b border-border-color">
                <List :size="18" class="text-accent-primary" />
                <h4 class="text-sm font-bold text-text-primary">Daftar Isi</h4>
            </div>
            <nav class="flex flex-col gap-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                <a v-for="item in items" :key="item.id" @click.prevent="$emit('navigate', item.id)"
                    :href="`#${item.id}`"
                    class="text-sm text-text-secondary hover:text-accent-primary transition-colors leading-relaxed cursor-pointer py-1 hover:bg-accent-primary/5 rounded-lg px-2"
                    :class="{
                        'pl-4 border-l-2 border-border-color ml-2': item.level === 3,
                        'font-semibold': item.level === 2
                    }">
                    {{ item.text }}
                </a>
            </nav>
        </div>
    </aside>

    <!-- Mobile: Floating Button + BottomSheet -->
    <div v-if="items.length > 0" class="lg:hidden">
        <!-- Floating Toggle Button -->
        <button @click="mobileOpen = true"
            class="fixed bottom-24 right-6 z-2500 w-14 h-14 bg-accent-primary hover:bg-accent-secondary text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            <List :size="24" />
        </button>

        <!-- Mobile TOC using BottomSheet -->
        <BottomSheet v-model="mobileOpen" :show-close="false" :show-handle="true" :close-on-backdrop="true"
            :swipe-to-close="true">
            <template #header>
                <div class="flex items-center gap-2">
                    <List :size="20" class="text-accent-primary" />
                    <h4 class="text-lg font-bold text-text-primary">Daftar Isi</h4>
                </div>
            </template>

            <nav class="flex flex-col gap-2 p-6 pb-20">
                <a v-for="item in items" :key="item.id" @click.prevent="handleMobileNavigate(item.id)"
                    :href="`#${item.id}`"
                    class="text-base text-text-secondary hover:text-accent-primary transition-colors leading-relaxed cursor-pointer py-2 hover:bg-accent-primary/5 rounded-lg px-3"
                    :class="{
                        'pl-6 border-l-2 border-border-color ml-3': item.level === 3,
                        'font-semibold': item.level === 2
                    }">
                    {{ item.text }}
                </a>
            </nav>
        </BottomSheet>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { List } from 'lucide-vue-next';
import { BottomSheet } from "@kangjessy/ui";

defineProps<{
    items: Array<{ id: string; text: string; level: number }>;
    isVisible?: boolean;
}>();

const emit = defineEmits<{
    navigate: [id: string];
}>();

const mobileOpen = ref(false);

const handleMobileNavigate = (id: string) => {
    emit('navigate', id);
    mobileOpen.value = false;
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}
</style>
