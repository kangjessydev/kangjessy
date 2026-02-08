<template>
  <header :class="[
    'mb-12',
    align === 'center' ? 'text-center flex flex-col items-center' : '',
    align === 'left' ? 'text-left flex flex-col items-start' : '',
    align === 'right' ? 'text-right flex flex-col items-end' : ''
  ]">
    <span v-if="badge"
      class="inline-block px-3 py-1 bg-bg-secondary border border-border-color rounded-full text-xs font-medium text-accent-primary mb-5 tracking-wide uppercase">
      {{ badge }}
    </span>
    <h2 class="text-[clamp(1.25rem,6vw,2.5rem)] font-black text-text-primary mb-4 leading-tight tracking-tight">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p v-if="subtitle"
      :class="[align === 'center' ? 'mx-auto' : '', 'text-text-secondary text-[clamp(1rem,2vw,1.125rem)] leading-relaxed max-w-2xl']">
      {{ subtitle }}
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SectionHeader',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    badge: { type: String, default: '' },
    align: { type: String as () => 'left' | 'center' | 'right', default: 'center' }
  }
});
</script>
