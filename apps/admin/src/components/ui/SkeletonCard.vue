<template>
  <div class="skeleton-card" :class="heightClass">
    <!-- Header -->
    <div v-if="showHeader" class="skeleton-header">
      <div class="skeleton-line w-1/3 h-6"></div>
      <div class="skeleton-line w-20 h-4"></div>
    </div>

    <!-- Content -->
    <div class="skeleton-content" :class="contentGapClass">
      <div v-for="i in lines" :key="i" class="skeleton-line" :class="getLineWidth(i)"></div>
    </div>

    <!-- Footer (optional) -->
    <div v-if="showFooter" class="skeleton-footer">
      <div class="skeleton-line w-24 h-10 rounded-xl"></div>
      <div class="skeleton-line w-16 h-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  lines?: number
  height?: 'sm' | 'md' | 'lg' | 'auto'
  showHeader?: boolean
  showFooter?: boolean
}>()

const heightClass = computed(() => {
  const heights = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    auto: 'h-auto'
  }
  return heights[props.height || 'auto']
})

const contentGapClass = computed(() => {
  return props.lines && props.lines > 5 ? 'gap-3' : 'gap-4'
})

const getLineWidth = (index: number) => {
  const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3']
  return widths[index % widths.length]
}
</script>

<style scoped>
@reference "tailwindcss";
.skeleton-card {
  @apply bg-white rounded-2xl p-6 border border-slate-100 space-y-6;
}

.skeleton-header {
  @apply flex items-center justify-between pb-4 border-b border-slate-100;
}

.skeleton-content {
  @apply flex flex-col;
}

.skeleton-footer {
  @apply flex items-center justify-between pt-4 border-t border-slate-100;
}

.skeleton-line {
  @apply h-4 bg-slate-100 rounded-lg animate-pulse;
}
</style>
