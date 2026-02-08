<template>
  <div class="loading-spinner" :class="sizeClass">
    <div class="spinner" :class="variantClass"></div>
    <p v-if="text" class="loading-text" :class="textSizeClass">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  text?: string
  fullscreen?: boolean
}>()

const sizeClass = computed(() => {
  if (props.fullscreen) return 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]'
  
  const sizes = {
    xs: 'inline-flex items-center gap-2',
    sm: 'inline-flex items-center gap-2',
    md: 'flex flex-col items-center gap-3',
    lg: 'flex flex-col items-center gap-4',
    xl: 'flex flex-col items-center gap-6'
  }
  return sizes[props.size || 'md']
})

const variantClass = computed(() => {
  const size = props.size || 'md'
  const variant = props.variant || 'primary'
  
  const spinnerSizes = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-[6px]'
  }
  
  const spinnerVariants = {
    primary: 'border-[#702DFF] border-t-transparent',
    secondary: 'border-slate-300 border-t-transparent',
    white: 'border-white border-t-transparent'
  }
  
  return `${spinnerSizes[size]} ${spinnerVariants[variant]}`
})

const textSizeClass = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizes[props.size || 'md']
})
</script>

<style scoped>
.spinner {
  @apply rounded-full animate-spin;
}

.loading-text {
  @apply font-bold text-slate-500 uppercase tracking-widest;
}
</style>
