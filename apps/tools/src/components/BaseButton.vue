<template>
  <component :is="componentTag" :to="to" :href="href" :class="buttonClasses" :disabled="loading" v-bind="$attrs">
    <span v-if="loading"
      class="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block"></span>
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    variant: { type: String as () => 'primary' | 'secondary' | 'outline', default: 'primary' },
    size: { type: String as () => 'sm' | 'md' | 'lg', default: 'md' },
    to: { type: [String, Object], default: null },
    href: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  },
  setup(props) {
    const componentTag = computed(() => {
      if (props.to) return 'router-link';
      if (props.href) return 'a';
      return 'button';
    });

    const buttonClasses = computed(() => {
      const base = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary focus:ring-accent-primary';

      const variants = {
        primary: 'bg-accent-primary hover:brightness-90 !text-white border border-transparent shadow-xs transition-all active:scale-[0.98]',
        secondary: 'bg-bg-secondary hover:bg-bg-primary text-text-primary border border-border-color',
        outline: 'bg-transparent border border-border-color text-text-primary hover:text-accent-primary hover:border-accent-primary'
      };

      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg'
      };

      const loadingClass = props.loading ? 'opacity-70 pointer-events-none cursor-wait' : '';

      return `${base} ${variants[props.variant || 'primary']} ${sizes[props.size || 'md']} ${loadingClass}`;
    });

    return {
      componentTag,
      buttonClasses
    };
  }
});
</script>
