<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :class="{ 'dark-mode': isDark() }"
    :title="isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <transition name="icon-fade" mode="out-in">
      <component :is="isDark() ? Moon : Sun" :key="theme" :size="size" class="icon" />
    </transition>
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useDarkMode } from '../../composables/useDarkMode'

const props = defineProps<{
  size?: number
}>()

const { theme, isDark, toggleTheme } = useDarkMode()
</script>

<style scoped>
@reference "tailwindcss";
.theme-toggle {
  @apply w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300;
  @apply bg-slate-100 hover:bg-slate-200 text-slate-600;
}

.theme-toggle.dark-mode {
  @apply bg-slate-700 hover:bg-slate-600 text-amber-400;
}

.icon {
  @apply transition-transform duration-300;
}

.theme-toggle:hover .icon {
  @apply rotate-12 scale-110;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.2s ease;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>
