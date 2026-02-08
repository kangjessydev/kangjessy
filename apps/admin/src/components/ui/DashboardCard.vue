<template>
  <div
    :class="[
      'card flex flex-col',
      overflowVisible ? 'overflow-visible' : 'overflow-hidden',
      { 'h-full': stretch },
    ]"
  >
    <!-- Header -->
    <div
      v-if="title || $slots.action"
      class="px-6 pt-6 pb-4 flex items-center justify-between"
    >
      <div>
        <h3 v-if="title" class="heading-lg">{{ title }}</h3>
        <p
          v-if="subtitle"
          class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1"
        >
          {{ subtitle }}
        </p>
      </div>
      <div v-if="$slots.action" class="flex gap-2">
        <slot name="action" />
      </div>
    </div>

    <!-- Body -->
    <div
      :class="[
        'flex-1',
        {
          'px-6 pb-6': !noPadding,
          'pt-6': !noPadding && !title && !$slots.action,
          'pt-0': !noPadding && (title || $slots.action),
          'p-0': noPadding,
        },
      ]"
      :id="id ? `${id}-body` : undefined"
    >
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      class="px-6 py-3 bg-slate-50/50 border-t border-slate-50"
      :id="id ? `${id}-footer` : undefined"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
  title?: string;
  subtitle?: string;
  noPadding?: boolean;
  stretch?: boolean;
  overflowVisible?: boolean;
}

withDefaults(defineProps<Props>(), {
  stretch: true,
  overflowVisible: false,
});
</script>
