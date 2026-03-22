<template>
  <BottomSheet
    :modelValue="isOpen"
    :title="title || 'Konfirmasi'"
    :icon="AlertTriangleIcon"
    @update:modelValue="$emit('cancel')"
    @close="$emit('cancel')"
  >
    <div class="p-8 text-center space-y-6">
      <div
        class="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20 shadow-lg shadow-red-500/5"
      >
        <AlertTriangleIcon :size="40" class="text-red-500" />
      </div>
      <div class="space-y-2">
        <h3 class="text-xl font-bold text-text-primary tracking-tight">
          {{ title || "Konfirmasi Tindakan" }}
        </h3>
        <p class="text-[0.9rem] text-text-tertiary leading-relaxed px-4">
          {{
            message ||
            `Apakah Anda yakin ingin melanjutkan tindakan ini? Tindakan ini mungkin tidak dapat
                    dibatalkan.`
          }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="$emit('cancel')"
          class="py-4 rounded-2xl text-[0.8rem] font-black uppercase tracking-widest text-text-tertiary bg-bg-tertiary/50 hover:bg-bg-tertiary transition-all active:scale-[0.98]"
        >
          Batal
        </button>
        <button
          @click="$emit('confirm')"
          class="py-4 rounded-2xl text-[0.8rem] font-black uppercase tracking-widest text-white bg-red-500 hover:bg-red-600 transition-all active:scale-[0.98] shadow-xl shadow-red-500/20"
        >
          Ya, Lanjutkan
        </button>
      </div>
    </template>
  </BottomSheet>
</template>

<script setup lang="ts">
import { AlertTriangle as AlertTriangleIcon } from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";

defineProps<{
  isOpen: boolean;
  title?: string;
  message?: string;
}>();

defineEmits(["confirm", "cancel"]);
</script>

<script lang="ts">
export default {
  name: "ConfirmModal",
};
</script>
