<template>
    <nav class="fixed top-0 left-0 right-0 z-1000 p-4 md:p-6 transition-all duration-300"
        :class="{ 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-color shadow-sm': isScrolled }">
        <div class="max-w-[1400px] mx-auto flex items-center justify-between">
            <!-- Logo Section -->
            <div class="flex items-center gap-4">
                <router-link to="/" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                        <img src="/logo.png" alt="KangJessy Logo" class="w-full h-full object-contain" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[1.1rem] font-black text-text-primary tracking-tight leading-none group-hover:text-accent-primary transition-colors">
                            Kang<span class="text-accent-primary">Jessy</span>
                        </span>
                        <span class="text-[0.65rem] font-black text-text-tertiary mt-0.5 tracking-widest lowercase">smart tools</span>
                    </div>
                </router-link>

                <!-- Ecosystem Dropdown -->
                <div class="relative" ref="dropdownRef">
                    <button @click="toggleDropdown" 
                        class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-color hover:border-accent-primary/50 bg-bg-secondary/50 text-text-secondary hover:text-text-primary transition-all text-xs font-bold">
                        <span>Ecosystem</span>
                        <ChevronDown :size="12" class="transition-transform duration-300" :class="{ 'rotate-180': isDropdownOpen }" />
                    </button>

                    <Transition
                        enter-active-class="transition duration-200 ease-out"
                        enter-from-class="transform scale-95 opacity-0 translate-y-2"
                        enter-to-class="transform scale-100 opacity-100 translate-y-0"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="transform scale-100 opacity-100 translate-y-0"
                        leave-to-class="transform scale-95 opacity-0 translate-y-2"
                    >
                        <div v-if="isDropdownOpen" class="absolute top-full left-0 mt-2 w-48 bg-bg-secondary border border-border-color rounded-xl shadow-xl overflow-hidden py-1 z-50">
                            <a href="https://kangjessy.vercel.app" target="_blank" class="flex items-center gap-3 px-4 py-3 hover:bg-bg-tertiary transition-colors group">
                                <Globe :size="14" class="text-text-tertiary group-hover:text-accent-primary" />
                                <div class="flex flex-col">
                                    <span class="text-xs font-bold text-text-primary">Main Agency</span>
                                    <span class="text-[10px] text-text-tertiary">kangjessy.vercel.app</span>
                                </div>
                            </a>
                            <a href="https://kangjessy-store.vercel.app" target="_blank" class="flex items-center gap-3 px-4 py-3 hover:bg-bg-tertiary transition-colors group">
                                <ShoppingBag :size="14" class="text-text-tertiary group-hover:text-accent-secondary" />
                                <div class="flex flex-col">
                                    <span class="text-xs font-bold text-text-primary">Digital Store</span>
                                    <span class="text-[10px] text-text-tertiary">kangjessy-store.vercel.app</span>
                                </div>
                            </a>
                            <div class="h-px bg-border-color/50 my-1"></div>
                            <router-link to="/" class="flex items-center gap-3 px-4 py-3 bg-accent-primary/5">
                                <Wrench :size="14" class="text-accent-primary" />
                                <div class="flex flex-col">
                                    <span class="text-xs font-bold text-accent-primary">Smart Tools</span>
                                    <span class="text-[10px] text-accent-primary/70">Current Workspace</span>
                                </div>
                            </router-link>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 md:gap-6">
                <!-- Theme Toggle -->
                <button @click="toggleTheme"
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-secondary border border-border-color text-text-primary hover:text-accent-primary transition-all active:scale-95">
                    <component :is="isDark ? Moon : Sun" :size="18" />
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
    Wrench, Moon, Sun, ChevronDown, Globe, ShoppingBag 
} from 'lucide-vue-next';
import { useGlobalTheme } from '@/composables/useTheme';
import { onClickOutside } from '@vueuse/core';

const { isDark, toggleTheme } = useGlobalTheme();
const isScrolled = ref(false);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

onClickOutside(dropdownRef, () => {
    isDropdownOpen.value = false;
});

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>
