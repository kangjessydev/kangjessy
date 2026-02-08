<template>
  <div
    class="h-full bg-accent-primary/2 p-8 lg:p-10 border-l border-border-color/50"
  >
    <div>
      <div class="flex items-center justify-between mb-10">
        <h3
          class="text-xl font-bold flex items-center gap-3 text-text-primary uppercase tracking-tight"
        >
          <div
            class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0"
          >
            <LayoutIcon :size="18" />
          </div>
          Ringkasan Biaya
        </h3>
      </div>

      <div class="space-y-6 mb-10">
        <!-- Base Type -->
        <div class="group">
          <div class="flex justify-between items-end mb-1">
            <span
              class="text-[0.85rem] text-text-tertiary font-bold uppercase tracking-wider"
              >Tipe Project</span
            >
            <div class="flex flex-col items-end">
              <span
                v-if="
                  currentType?.originalPrice &&
                  currentType.originalPrice > currentType.basePrice
                "
                class="text-xs text-text-tertiary line-through opacity-70"
              >
                Rp {{ formatPrice(currentType.originalPrice) }}
              </span>
              <span class="font-mono text-text-primary font-bold"
                >Rp {{ formatPrice(currentType?.basePrice || 0) }}</span
              >
            </div>
          </div>
          <div class="text-sm font-semibold text-text-primary">
            {{ currentType?.name }}
          </div>
        </div>

        <!-- Features List -->
        <div class="space-y-4">
          <span
            class="text-[0.85rem] text-text-tertiary font-bold uppercase tracking-wider block"
            >Fitur & Layanan</span
          >
          <div class="space-y-3">
            <TransitionGroup
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 -translate-x-4"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-200 ease-in absolute"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-4"
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
                <span
                  class="font-mono text-text-primary/80 whitespace-nowrap ml-4 shrink-0"
                  >Rp {{ formatPrice(getFeaturePrice(featId)) }}</span
                >
              </div>
            </TransitionGroup>
            <div
              v-if="selectedFeatures.length === 0"
              class="text-sm text-text-tertiary italic bg-bg-secondary/30 p-4 rounded-xl border border-border-color/50 border-dashed"
            >
              Pilih fitur untuk menambahkan kustomisasi
            </div>
          </div>
        </div>

        <!-- Modifiers (Timeline & Discount) -->
        <div class="space-y-3 pt-4 border-t border-border-color/30">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="timelineMultiplier > 1"
              class="p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl flex justify-between items-center text-sm"
            >
              <div class="flex flex-col">
                <span
                  class="text-[0.7rem] uppercase tracking-widest font-black text-accent-primary"
                  >Urgency Fee</span
                >
                <span class="text-xs text-text-tertiary">{{
                  currentTimeline?.label
                }}</span>
              </div>
              <span class="font-mono text-accent-primary font-black"
                >+Rp
                {{
                  formatPrice(
                    totalPriceBeforeDiscount - totalPriceWithoutMultiplier,
                  )
                }}</span
              >
            </div>
          </Transition>

          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="discountAmount > 0"
              class="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex justify-between items-center text-sm"
            >
              <div class="flex flex-col">
                <span
                  class="text-[0.7rem] uppercase tracking-widest font-black text-emerald-500"
                  >Hemat (Kupon)</span
                >
                <span class="text-xs text-text-tertiary font-bold">{{
                  activeCoupon?.label
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-mono text-emerald-500 font-black"
                  >-Rp {{ formatPrice(discountAmount) }}</span
                >
                <button
                  @click="$emit('apply-discount', '')"
                  class="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <XIcon :size="12" />
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Total Box -->
      <div class="relative group mb-10">
        <div
          class="relative bg-bg-primary border-2 border-accent-primary/30 rounded-[32px] p-8 text-center shadow-2xl overflow-hidden"
        >
          <span
            class="block text-[0.75rem] font-black text-accent-primary uppercase tracking-[0.25em] mb-4"
            >Estimasi Investasi</span
          >
          <div
            class="flex items-baseline justify-center gap-2 mb-0.5 flex-wrap"
          >
            <span class="text-xl font-bold text-text-tertiary">Rp</span>
            <span
              class="text-[clamp(2rem,10vw,3rem)] font-black text-text-primary leading-none tracking-tighter transition-all duration-300"
              :class="{
                'text-emerald-500! scale-105':
                  discountAmount > 0 || totalBundleSavings > 0,
              }"
            >
              {{ formatPrice(totalPrice) }}
            </span>
          </div>

          <!-- Total Savings Highlights (Bundle + Coupon) -->
          <div
            v-if="totalBundleSavings > 0 || discountAmount > 0"
            class="flex flex-col items-center gap-2 mt-4 relative z-10"
          >
            <!-- Bundle Savings (High Value Anchor) -->
            <div
              v-if="totalBundleSavings > 0"
              class="group/savings inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-500/10 rounded-[20px] border border-emerald-500/20 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700"
            >
              <div class="relative">
                <SparklesIcon
                  :size="16"
                  class="text-emerald-500 animate-pulse"
                />
                <div
                  class="absolute inset-0 bg-emerald-500 blur-md opacity-20 animate-pulse"
                ></div>
              </div>
              <div class="text-left leading-tight">
                <span
                  class="block text-[9px] font-black text-emerald-500 uppercase tracking-[0.15em] mb-0.5"
                  >Penawaran Terbaik</span
                >
                <span class="text-[0.8rem] font-black text-text-primary"
                  >Hemat Rp {{ formatPrice(totalBundleSavings) }}</span
                >
              </div>
            </div>

            <!-- Coupon Savings -->
            <div
              v-if="discountAmount > 0"
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-secondary/10 rounded-full border border-accent-secondary/20"
            >
              <TicketIcon :size="12" class="text-accent-secondary" />
              <span
                class="text-[10px] font-black text-accent-secondary uppercase"
                >Kupon: -Rp {{ formatPrice(discountAmount) }}</span
              >
            </div>
          </div>

          <!-- Decorative Shine for total box -->
          <div
            class="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full"
          ></div>
        </div>
      </div>

      <!-- Generic Gojek-style Discount Trigger -->
      <div class="mb-10 lg:mb-12">
        <button
          @click="isDiscountSheetOpen = true"
          class="w-full flex items-center justify-between p-5 bg-bg-secondary border-2 border-border-color rounded-[24px] hover:border-accent-secondary/50 hover:bg-accent-secondary/5 transition-all group overflow-hidden relative"
        >
          <div class="flex items-center gap-4 relative z-10">
            <div
              class="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center text-accent-secondary group-hover:scale-110 transition-transform shrink-0"
            >
              <TicketIcon :size="24" />
            </div>
            <div class="flex flex-col text-left">
              <span
                class="text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary"
                >Promosi & Diskon</span
              >
              <span class="text-[0.95rem] font-bold text-text-primary">
                {{
                  discountCode
                    ? `Kupon: ${discountCode}`
                    : "Pakai promo biar hemat"
                }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-2 relative z-10">
            <span
              v-if="discountAmount > 0"
              class="text-xs font-black text-emerald-500 uppercase"
              >Terpakai</span
            >
            <ChevronRightIcon
              :size="20"
              class="text-text-tertiary group-hover:text-accent-secondary group-hover:translate-x-1 transition-all"
            />
          </div>

          <!-- Decorative background -->
          <div
            class="absolute -right-4 -bottom-4 w-24 h-24 bg-accent-secondary/5 rounded-full blur-2xl group-hover:bg-accent-secondary/10 transition-colors"
          ></div>
        </button>
      </div>

      <BaseButton
        v-if="!hideButton"
        variant="primary"
        size="lg"
        class="w-full py-5 rounded-2xl shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
        @click="$emit('next')"
      >
        <span class="text-base">{{ buttonText || "Lanjut Booking Sesi" }}</span>
        <ArrowRightIcon :size="20" class="ml-2" />
      </BaseButton>

      <!-- Secondary Action (WhatsApp) -->
      <button
        v-if="showWhatsApp"
        class="w-full mt-4 py-4 flex items-center justify-center gap-2.5 text-text-tertiary hover:text-accent-primary font-bold text-sm transition-all group"
        @click="$emit('whatsapp')"
      >
        <div
          class="w-8 h-8 rounded-full bg-bg-tertiary/50 flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors shrink-0"
        >
          <MessageCircleIcon :size="16" />
        </div>
        <span>Konsultasi via WhatsApp</span>
      </button>
    </div>

    <!-- Desktop Discount Sheet (Drawer Style) -->
    <BottomSheet
      v-model="isDiscountSheetOpen"
      title="Promo & Penawaran"
      :icon="TicketIcon"
    >
      <div class="p-8 space-y-12 pb-12">
        <!-- Manual Input Section -->
        <div class="space-y-4">
          <h4
            class="text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1"
          >
            Punya kode promo sendiri?
          </h4>
          <div
            class="flex gap-3 p-2 bg-bg-primary border-2 border-border-color rounded-2xl focus-within:border-accent-primary transition-all shadow-inner"
          >
            <input
              v-model="localCoupon"
              type="text"
              placeholder="Masukkan Kode (Misal: KANGJESSY10)"
              class="flex-1 bg-transparent border-none py-3 px-4 text-[0.95rem] text-text-primary outline-none uppercase font-mono font-bold"
              @keyup.enter="handleApply(localCoupon)"
            />
            <button
              @click="handleApply(localCoupon)"
              class="px-8 py-3 bg-accent-primary text-white text-xs font-black rounded-xl active:scale-95 transition-all shadow-lg shadow-accent-primary/20"
            >
              Pake
            </button>
          </div>
        </div>

        <!-- Gojek Style Coupons -->
        <div class="space-y-6">
          <div class="flex items-center justify-between px-1">
            <h4
              class="text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary"
            >
              Promo Untukmu
            </h4>
            <span
              class="text-[0.6rem] font-bold text-accent-secondary px-2 py-1 bg-accent-secondary/10 rounded-lg"
              >TERBATAS</span
            >
          </div>

          <div class="grid grid-cols-1 gap-5">
            <div
              v-for="coupon in coupons"
              :key="coupon.code"
              class="flex flex-col border-2 rounded-[28px] transition-all group relative overflow-hidden"
              :class="
                discountCode?.toUpperCase() === coupon.code.toUpperCase()
                  ? 'bg-emerald-500/5 border-emerald-500 shadow-lg shadow-emerald-500/5'
                  : 'bg-bg-primary border-border-color hover:border-accent-secondary/30'
              "
            >
              <!-- Coupon Header -->
              <div class="p-5 flex items-center gap-5">
                <div
                  class="w-14 h-14 rounded-2xl bg-bg-secondary border border-border-color flex items-center justify-center text-accent-secondary group-hover:scale-110 transition-transform shrink-0"
                >
                  <TicketIcon :size="28" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-0.5">
                    <span
                      class="font-mono font-black text-base text-text-primary tracking-tight"
                      >{{ coupon.code }}</span
                    >
                    <span
                      class="text-[0.65rem] font-black text-text-tertiary uppercase"
                      >{{ coupon.expiryDate }}</span
                    >
                  </div>
                  <h5
                    class="text-sm font-black text-text-primary leading-tight"
                  >
                    {{ coupon.label }}
                  </h5>
                </div>
              </div>

              <!-- Coupon Body (Gojek Style) -->
              <div
                class="px-5 pb-5 pt-4 border-t border-dashed border-border-color/50 bg-bg-secondary/30"
              >
                <p
                  class="text-[0.7rem] text-text-tertiary leading-relaxed mb-4"
                >
                  {{ coupon.desc }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span
                      class="text-[0.6rem] font-black uppercase text-accent-secondary tracking-widest leading-none mb-1"
                      >Syarat & Ketentuan</span
                    >
                    <span
                      class="text-[0.65rem] text-text-secondary font-medium"
                      >{{ coupon.terms }}</span
                    >
                  </div>

                  <button
                    v-if="
                      discountCode?.toUpperCase() !== coupon.code.toUpperCase()
                    "
                    @click="handleApply(coupon.code)"
                    class="px-5 py-2 bg-accent-primary text-white text-[0.7rem] font-black rounded-lg active:scale-95 transition-all"
                  >
                    Pake
                  </button>
                  <div
                    v-else
                    class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-[0.7rem] font-black animate-in fade-in zoom-in duration-300"
                  >
                    <CheckIcon :size="12" />
                    Terpakai
                  </div>
                </div>
              </div>

              <!-- Ticket notch effect -->
              <div
                class="absolute -left-3 top-[70px] -translate-y-1/2 w-6 h-6 bg-bg-secondary rounded-full border-2 border-border-color/20"
              ></div>
              <div
                class="absolute -right-3 top-[70px] -translate-y-1/2 w-6 h-6 bg-bg-secondary rounded-full border-2 border-border-color/20"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="p-8 pt-0 bg-bg-secondary">
          <BaseButton
            variant="secondary"
            size="lg"
            class="w-full rounded-2xl py-4 font-black border-2"
            @click="isDiscountSheetOpen = false"
          >
            Tutup
          </BaseButton>
        </div>
      </template>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  ArrowRight as ArrowRightIcon,
  Layout as LayoutIcon,
  Ticket as TicketIcon,
  ChevronRight as ChevronRightIcon,
  Check as CheckIcon,
  X as XIcon,
  MessageCircle as MessageCircleIcon,
  Sparkles as SparklesIcon,
} from "lucide-vue-next";
import type { Coupon } from "@kangjessy/config";
import { BaseButton, BottomSheet } from "@kangjessy/ui";

const props = defineProps<{
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
  getFeaturePrice: (id: string) => number;
  formatPrice: (price: number) => string;
  buttonText?: string;
  hideButton?: boolean;
  showWhatsApp?: boolean;
}>();

const emit = defineEmits(["next", "apply-discount", "whatsapp"]);

const isDiscountSheetOpen = ref(false);
const localCoupon = ref(props.discountCode);

watch(
  () => props.discountCode,
  (newVal) => {
    localCoupon.value = newVal;
  },
);

const handleApply = (code: string) => {
  emit("apply-discount", code);
  // Be proactive: close the sheet when user applies
  setTimeout(() => {
    isDiscountSheetOpen.value = false;
  }, 400);
};
</script>
