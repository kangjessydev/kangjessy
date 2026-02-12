<template>
  <BottomSheet :is-open="isOpen" @close="closeModal">
    <div class="p-6">
      <!-- Icon & Header -->
      <div class="flex flex-col items-center text-center mb-6">
        <div
          class="w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center mb-4 shadow-xl transition-transform hover:scale-105"
          :class="
            variant === 'danger'
              ? 'bg-rose-50 text-rose-500'
              : 'bg-indigo-50 text-[#702DFF]'
          "
        >
          <template v-if="variant === 'danger'">
            <AlertTriangle :size="28" class="md:hidden" />
            <AlertTriangle :size="32" class="hidden md:block" />
          </template>
          <template v-else>
            <Info :size="28" class="md:hidden" />
            <Info :size="32" class="hidden md:block" />
          </template>
        </div>

        <h3
          class="text-lg md:text-xl font-black text-[#1B2559] leading-tight px-4"
        >
          {{ title }}
        </h3>
        <p
          class="mt-2 text-xs md:text-sm font-bold text-slate-400 leading-relaxed px-4"
        >
          {{ message }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col md:flex-row gap-3">
        <BaseButton
          variant="secondary"
          @click="closeModal"
          class="order-2 md:order-1 flex-1 !rounded-xl !py-3 text-sm font-bold"
          :disabled="loading"
        >
          {{ cancelText }}
        </BaseButton>
        <BaseButton
          :variant="variant === 'danger' ? 'danger' : 'primary'"
          @click="handleConfirm"
          :loading="loading"
          class="order-1 md:order-2 flex-[1.5] !rounded-xl !py-3 shadow-lg hover:shadow-xl text-sm font-bold"
        >
          {{ confirmText }}
        </BaseButton>
      </div>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { AlertTriangle, Info } from "lucide-vue-next";
import { BottomSheet, BaseButton } from "@kangjessy/ui";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "info";
    loading?: boolean;
  }>(),
  {
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "info",
    loading: false,
  },
);

const emit = defineEmits(["close", "confirm"]);

const closeModal = () => {
  if (!props.loading) emit("close");
};

const handleConfirm = () => {
  emit("confirm");
  // We don't close immediately if loading is true, wait for parent to finish or error
};
</script>
