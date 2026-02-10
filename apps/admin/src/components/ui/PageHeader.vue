<template>
  <header
    class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
  >
    <div>
      <div v-if="$slots.breadcrumb" class="mb-2">
        <slot name="breadcrumb" />
      </div>
      <h1 class="heading-xl">{{ title }}</h1>
      <p v-if="subtitle" class="subtitle mb-0">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.default" class="flex items-center gap-3">
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}
defineProps<Props>();
</script>
