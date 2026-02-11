<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 bg-black/90 z-10000 flex items-center justify-center p-5"
        @click.self="$emit('close')"
      >
        <div
          class="max-w-[520px] w-full bg-bg-secondary/80 backdrop-blur-xl border border-border-color rounded-[32px] p-6 sm:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-scale-in"
        >
          <div class="text-accent-primary mb-6 flex justify-center">
            <CheckCircleIcon
              :size="64"
              class="animate-bounce-subtle shrink-0"
            />
          </div>
          <h2
            class="text-[clamp(1.5rem,8vw,2rem)] font-bold mb-4 text-text-primary tracking-tight"
          >
            Pesanan Terkirim!
          </h2>
          <p
            class="text-text-secondary leading-relaxed mb-8 text-base sm:text-lg"
          >
            Terima kasih <strong>{{ customerName }}</strong
            >! Kami telah menerima detail proyek Anda dan akan menghubungi dalam
            1x24 jam.
          </p>

          <div
            class="bg-bg-primary p-5 rounded-2xl mb-8 flex flex-wrap gap-4 sm:gap-8 justify-center border border-border-color"
          >
            <div class="flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-[120px]">
              <span
                class="text-[0.7rem] sm:text-[0.8rem] text-text-secondary opacity-70 uppercase tracking-wider"
                >ID Project</span
              >
              <strong class="text-base sm:text-lg text-text-primary"
                >#{{
                  projectId
                    ? projectId.substring(0, 8).toUpperCase()
                    : "PENDING"
                }}</strong
              >
            </div>
            <div class="hidden sm:block w-px bg-border-color"></div>
            <div class="flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-[120px]">
              <span
                class="text-[0.7rem] sm:text-[0.8rem] text-text-secondary opacity-70 uppercase tracking-wider"
                >Estimasi</span
              >
              <strong class="text-base sm:text-lg text-text-primary"
                >Rp {{ formatPrice(totalPrice) }}</strong
              >
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <BaseButton
              variant="primary"
              size="lg"
              class="w-full"
              @click="$emit('view-invoice')"
            >
              <FileTextIcon :size="18" class="mr-2" />
              Masuk ke Client Portal
            </BaseButton>
            <div class="flex gap-3">
              <BaseButton
                variant="secondary"
                size="md"
                class="flex-1"
                @click="$emit('go-home')"
              >
                Beranda
              </BaseButton>
              <BaseButton
                variant="secondary"
                size="md"
                class="flex-1"
                @click="$emit('close')"
              >
                Tutup
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  CheckCircle as CheckCircleIcon,
  FileText as FileTextIcon,
} from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";

defineProps<{
  show: boolean;
  customerName: string;
  totalPrice: number;
  formatPrice: (price: number) => string;
  projectId?: string;
}>();

defineEmits(["close", "view-invoice", "go-home"]);
</script>

<style scoped>
@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite ease-in-out;
}
</style>
