<template>
  <div class="h-full bg-accent-primary/2 p-8 lg:p-10 border-l border-border-color/50">
    <div>
      <div class="flex items-center justify-between mb-10">
        <h3 class="text-xl font-bold flex items-center gap-3 text-text-primary uppercase tracking-tight">
          <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
            <LayoutIcon :size="18" />
          </div>
          Ringkasan Biaya
        </h3>
      </div>

      <div class="space-y-6 mb-10">
        <!-- Base Type -->
        <div class="group">
          <div class="flex justify-between items-end mb-1">
            <span class="text-[0.85rem] text-text-tertiary font-bold uppercase tracking-wider">Tipe Project</span>
            <div class="flex flex-col items-end">
              <span
                v-if="currentType?.originalPrice && currentType.originalPrice > currentType.basePrice"
                class="text-xs text-text-tertiary line-through opacity-70"
              >
                Rp {{ formatPrice(currentType.originalPrice) }}
              </span>
              <span class="font-mono text-text-primary font-bold">
                Rp {{ formatPrice(currentType?.basePrice || 0) }}
              </span>
            </div>
          </div>
          <div class="text-sm font-semibold text-text-primary">
            {{ currentType?.name }}
          </div>
        </div>

        <!-- Bundled Features -->
        <div v-if="currentType?.features?.length" class="space-y-2">
          <button @click="showBundled = !showBundled" class="flex items-center gap-2 w-full text-left group">
            <span class="text-[0.75rem] text-text-tertiary font-bold uppercase tracking-wider">
              Sudah Termasuk ({{ currentType.features.length }})
            </span>
            <ChevronDownIcon
              :size="12"
              class="text-text-tertiary transition-transform duration-200 mt-0.5"
              :class="showBundled ? 'rotate-180' : ''"
            />
          </button>
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
          >
            <ul v-if="showBundled" class="space-y-1 pl-1">
              <li
                v-for="featId in currentType.features"
                :key="featId"
                class="flex items-center gap-2 text-[0.75rem] text-emerald-500/70"
              >
                <CheckIcon :size="11" class="text-emerald-500 shrink-0" />
                <span>{{ getFeatureName(featId) }}</span>
              </li>
            </ul>
          </Transition>
        </div>

        <!-- Add-ons -->
        <div class="space-y-4 pt-4 border-t border-border-color/10">
          <span class="text-[0.85rem] text-text-tertiary font-bold uppercase tracking-wider block">
            Fitur Tambahan (Add-ons)
          </span>
          <div class="space-y-3">
            <TransitionGroup
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-x-4"
              enter-to-class="opacity-100 translate-x-0"
            >
              <div
                v-for="featId in selectedFeatures"
                :key="featId"
                class="flex justify-between text-[0.95rem] text-text-secondary items-start group"
              >
                <div class="flex gap-2">
                  <span class="text-accent-primary opacity-50 shrink-0">•</span>
                  <span>{{ getFeatureName(featId) }}</span>
                </div>
                <div class="flex flex-col items-end shrink-0 ml-4">
                  <span 
                    v-if="getFeatureOriginalPrice(featId)" 
                    class="text-[10px] text-text-tertiary line-through opacity-50 font-mono"
                  >
                    Rp {{ formatPrice(getFeatureOriginalPrice(featId) || 0) }}
                  </span>
                  <span class="font-mono text-text-primary/80 whitespace-nowrap">
                    Rp {{ formatPrice(getFeaturePrice(featId)) }}
                  </span>
                </div>
              </div>
            </TransitionGroup>
            <div
              v-if="selectedFeatures.length === 0"
              class="text-sm text-text-tertiary italic bg-bg-secondary/30 p-4 rounded-xl border border-border-color/50 border-dashed"
            >
              Belum ada fitur tambahan dipilih
            </div>
          </div>
        </div>

        <!-- Modifiers -->
        <div class="space-y-3 pt-4 border-t border-border-color/30">
          <div v-if="timelineMultiplier > 1" class="p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl flex justify-between items-center text-sm">
            <div class="flex flex-col">
              <span class="text-[0.7rem] uppercase tracking-widest font-black text-accent-primary">Urgency Fee</span>
              <span class="text-xs text-text-tertiary">{{ currentTimeline?.label }}</span>
            </div>
            <span class="font-mono text-accent-primary font-black">
              +Rp {{ formatPrice(totalPriceBeforeDiscount - totalPriceWithoutMultiplier) }}
            </span>
          </div>

          <div v-if="discountAmount > 0" class="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex justify-between items-center text-sm">
            <div class="flex flex-col">
              <span class="text-[0.7rem] uppercase tracking-widest font-black text-emerald-500">Hemat (Kupon)</span>
              <span class="text-xs text-text-tertiary font-bold">{{ activeCoupon?.label }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-mono text-emerald-500 font-black">-Rp {{ formatPrice(discountAmount) }}</span>
              <button @click="$emit('apply-discount', '')" class="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all">
                <XIcon :size="12" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Box -->
      <div class="relative group mb-10">
        <div class="relative bg-bg-primary border-2 border-accent-primary/30 rounded-[32px] p-8 text-center shadow-2xl overflow-hidden">
          <span class="block text-[0.75rem] font-black text-accent-primary uppercase tracking-[0.25em] mb-4">Estimasi Investasi</span>
          <div class="flex items-baseline justify-center gap-2 mb-0.5 flex-wrap">
            <span class="text-xl font-bold text-text-tertiary">Rp</span>
            <span class="text-[clamp(2rem,10vw,3rem)] font-black text-text-primary leading-none tracking-tighter transition-all duration-300" :class="{ 'text-emerald-500! scale-105': discountAmount > 0 || totalBundleSavings > 0 }">
              {{ formatPrice(totalPrice) }}
            </span>
          </div>

          <div v-if="totalBundleSavings > 0 || discountAmount > 0" class="flex flex-col items-center gap-2 mt-4 relative z-10">
            <div v-if="totalBundleSavings > 0" class="group/savings inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-500/10 rounded-[20px] border border-emerald-500/20 shadow-sm">
              <SparklesIcon :size="16" class="text-emerald-500 animate-pulse" />
              <div class="text-left leading-tight">
                <span class="block text-[9px] font-black text-emerald-500 uppercase tracking-[0.15em] mb-0.5">Penawaran Terbaik</span>
                <span class="text-[0.8rem] font-black text-text-primary">Hemat Rp {{ formatPrice(totalBundleSavings) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!hideButton">
        <BaseButton 
          v-if="!showWhatsApp"
          variant="primary" 
          class="w-full py-4 rounded-2xl font-bold text-lg shadow-xl shadow-accent-primary/25" 
          @click="$emit('next')"
        >
          {{ buttonText || 'Lanjut Tahap Berikutnya' }}
        </BaseButton>
        <BaseButton 
          v-else
          variant="primary" 
          class="w-full py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/25 bg-emerald-500 border-emerald-500 hover:bg-emerald-600" 
          @click="$emit('whatsapp')"
        >
          {{ buttonText || 'Kirim Penawaran ke WhatsApp' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Layout as LayoutIcon,
  ChevronDown as ChevronDownIcon,
  Check as CheckIcon,
  X as XIcon,
  Sparkles as SparklesIcon,
} from "lucide-vue-next";
import type { Coupon } from "../../../services/couponService";
import { BaseButton } from "@kangjessy/ui";

interface Props {
  currentType: any;
  selectedFeatures: string[];
  currentTimeline: any;
  timelineMultiplier: number;
  totalPrice: number;
  totalPriceBeforeDiscount: number;
  totalPriceWithoutMultiplier: number;
  totalBundleSavings: number;
  discountCode: string;
  activeCoupon: any;
  discountAmount: number;
  coupons: Coupon[];
  getFeatureName: (id: string) => string;
  getFeaturePrice: (id: string, original?: boolean) => number;
  getFeatureOriginalPrice: (id: string) => number | undefined;
  formatPrice: (price: number) => string;
  buttonText?: string;
  hideButton?: boolean;
  showWhatsApp?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["next", "apply-discount", "whatsapp"]);

const showBundled = ref(true); // default: terbuka
const localCoupon = ref(props.discountCode);

watch(
  () => props.discountCode,
  (newVal) => {
    localCoupon.value = newVal;
  },
);
</script>
