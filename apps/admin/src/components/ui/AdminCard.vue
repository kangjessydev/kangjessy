<template>
  <div
    class="bento-card bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col transition-all duration-300 hover:shadow-md"
    :class="[
      { 'hover:border-indigo-100': hoverEffect },
      { 'h-full': stretch },
      overflowVisible ? 'overflow-visible' : 'overflow-hidden',
    ]"
  >
    <!-- Header -->
    <div
      v-if="title || $slots.header || $slots.action"
      class="px-8 pt-7 pb-4 flex items-center justify-between"
    >
      <div class="flex-1">
        <slot name="header">
          <h3
            v-if="title"
            class="text-lg font-black text-[#1B2559] tracking-tight"
          >
            {{ title }}
          </h3>
          <p
            v-if="subtitle"
            class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1"
          >
            {{ subtitle }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.action" class="flex gap-2">
        <slot name="action" />
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1" :class="[noPadding ? 'p-0' : 'px-8 pb-8 pt-2']">
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      class="px-8 py-5 bg-slate-50/50 border-t border-slate-50/50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
  hoverEffect?: boolean;
  stretch?: boolean;
  overflowVisible?: boolean;
}

withDefaults(defineProps<Props>(), {
  noPadding: false,
  hoverEffect: true,
  stretch: true,
  overflowVisible: false,
});
</script>

<style scoped>
@reference "tailwindcss";

.bento-card {
  @apply relative;
}
</style>
