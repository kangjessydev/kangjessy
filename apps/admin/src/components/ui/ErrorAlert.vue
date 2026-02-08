<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div v-if="error" class="error-alert" :class="alertClass">
      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div class="shrink-0 mt-0.5">
          <component :is="iconComponent" :size="20" class="animate-pulse" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h4
            class="font-black text-sm mb-1 uppercase tracking-wide"
            v-if="error.code"
          >
            {{ error.code.replace(/_/g, " ") }}
          </h4>
          <p class="text-sm font-medium">{{ error.message }}</p>
          <p
            v-if="showDetails && error.details"
            class="text-xs opacity-60 mt-1 font-mono"
          >
            {{ JSON.stringify(error.details, null, 2) }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            v-if="retryable && onRetry"
            @click="onRetry"
            class="px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            :class="retryButtonClass"
          >
            <RotateCw :size="14" class="inline mr-1" />
            Retry
          </button>
          <button
            @click="handleClose"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
            title="Close"
          >
            <X :size="16" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { XCircle, AlertTriangle, Info, RotateCw, X } from "lucide-vue-next";
import type { AppError } from "../../composables/useErrorHandler";

const props = defineProps<{
  error: AppError | null;
  variant?: "error" | "warning" | "info";
  retryable?: boolean;
  showDetails?: boolean;
  onRetry?: () => void;
  onClose?: () => void;
}>();

const emit = defineEmits<{
  close: [];
  retry: [];
}>();

const alertClass = computed(() => {
  const variant = props.variant || "error";
  const classes = {
    error: "bg-rose-50 border-rose-200 text-rose-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
  };
  return classes[variant];
});

const iconComponent = computed(() => {
  const variant = props.variant || "error";
  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };
  return icons[variant];
});

const retryButtonClass = computed(() => {
  const variant = props.variant || "error";
  const classes = {
    error: "bg-rose-600 text-white hover:bg-rose-700",
    warning: "bg-amber-600 text-white hover:bg-amber-700",
    info: "bg-blue-600 text-white hover:bg-blue-700",
  };
  return classes[variant];
});

const handleClose = () => {
  emit("close");
  props.onClose?.();
};
</script>

<style scoped>
.error-alert {
  @apply border rounded-2xl p-4 shadow-lg;
}
</style>
