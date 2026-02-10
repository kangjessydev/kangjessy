<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        @click="$emit('cancel')"
      ></div>

      <!-- Modal -->
      <div
        class="bg-white rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl border border-white/50 animate-pop-in"
      >
        <div class="flex flex-col items-center text-center">
          <div
            class="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6"
          >
            <AlertTriangle :size="32" stroke-width="2" />
          </div>

          <h3 class="text-xl font-black text-[#1B2559] mb-2">
            {{ title }}
          </h3>

          <p
            class="text-slate-500 text-sm font-medium leading-relaxed mb-8 px-4"
          >
            {{ message }}
          </p>

          <div class="flex items-center gap-3 w-full">
            <button
              @click="$emit('cancel')"
              class="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              @click="$emit('confirm')"
              class="flex-1 py-3.5 rounded-2xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";

defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
}>();

defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes popIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pop-in {
  animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
