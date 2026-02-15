<template>
  <component
    :is="componentTag"
    :to="!isExternal ? to : undefined"
    :href="isExternal ? finalHref : href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span
      v-if="loading"
      class="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full inline-block"
    ></span>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isExternalLink, ensureProtocol } from "@kangjessy/config";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    to?: string | object | null;
    href?: string;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    to: null,
    href: "",
    loading: false,
    disabled: false,
  },
);

const isExternal = computed(() => {
  const link = props.href || (typeof props.to === "string" ? props.to : "");
  return isExternalLink(link);
});

const finalHref = computed(() => {
  const link = props.href || (typeof props.to === "string" ? props.to : "");
  return isExternal.value ? ensureProtocol(link) : props.href;
});

const componentTag = computed(() => {
  if (isExternal.value) return "a";
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const buttonClasses = computed(() => {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold tracking-tight transition-all duration-300 rounded-2xl cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants: Record<string, string> = {
    primary:
      "bg-accent-primary text-white hover:brightness-110 shadow-lg shadow-accent-primary/20 border border-transparent",
    secondary:
      "bg-white/5 backdrop-blur-sm text-text-primary hover:bg-white/10 border border-white/10",
    outline:
      "bg-transparent border border-white/10 text-text-primary hover:border-accent-primary/50 hover:text-accent-primary",
    ghost:
      "bg-transparent text-text-tertiary hover:text-text-primary hover:bg-white/5",
    danger:
      "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20",
  };

  const sizes: Record<string, string> = {
    xs: "px-2.5 py-1.5 text-[10px] uppercase tracking-widest",
    sm: "px-4 py-2 text-xs uppercase tracking-wider",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  const variantClass = variants[props.variant as string] || variants.primary;
  const sizeClass = sizes[props.size as string] || sizes.md;

  return `${base} ${variantClass} ${sizeClass} ${props.loading ? "opacity-70 pointer-events-none" : ""}`;
});

</script>
