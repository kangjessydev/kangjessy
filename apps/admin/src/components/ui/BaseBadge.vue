<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeVariant } from '../../types'

interface Props {
  variant?: BadgeVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gray'
})

const badgeClasses = computed(() => {
  const base = 'badge'
  
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    gray: 'badge-gray'
  }
  
  return `${base} ${variants[props.variant]}`
})
</script>
