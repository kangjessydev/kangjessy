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

      <!-- Voucher Section (Trigger Pattern) -->
      <div class="mb-10 pt-8 border-t border-border-color/30">
        <label class="text-[0.7rem] font-black uppercase tracking-[0.2em] text-text-tertiary mb-3 block px-1">
          Promo & Voucher
        </label>
        
        <button 
          @click="isDiscountSheetOpen = true"
          class="w-full p-5 rounded-[24px] border-2 border-dashed flex items-center justify-between transition-all group overflow-hidden relative"
          :class="discountAmount > 0 
            ? 'bg-emerald-500/5 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
            : 'bg-bg-secondary/30 border-border-color hover:border-accent-primary/40'"
        >
          <div class="flex items-center gap-3.5 text-left relative z-10">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              :class="discountAmount > 0 
                ? 'bg-emerald-500 text-white shadow-lg' 
                : 'bg-bg-primary text-text-tertiary group-hover:bg-accent-primary group-hover:text-white'"
            >
              <TicketIcon :size="18" />
            </div>
            <div class="flex flex-col">
              <span class="text-[0.6rem] font-black uppercase text-text-tertiary tracking-widest mb-0.5">Voucher Diskon</span>
              <span class="text-sm font-bold truncate max-w-[140px]" :class="discountAmount > 0 ? 'text-emerald-500' : 'text-text-primary'">
                {{ discountCode ? `KODE: ${discountCode}` : 'Klik untuk pake promo' }}
              </span>
            </div>
          </div>
          
          <div class="flex items-center gap-3 relative z-10 shrink-0">
            <span v-if="discountAmount > 0" class="font-mono text-emerald-500 font-black text-sm">-Rp {{ formatPrice(discountAmount) }}</span>
            <ChevronDownIcon :size="14" class="text-text-tertiary group-hover:text-accent-primary transition-colors" />
          </div>

          <!-- Background Highlight -->
          <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-accent-primary/5 rounded-full blur-2xl group-hover:bg-accent-primary/10 transition-colors"></div>
        </button>

        <!-- Remove Applied Coupon -->
        <button 
          v-if="discountAmount > 0"
          @click="$emit('apply-discount', '')"
          class="mt-3 w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors"
        >
          <TrashIcon :size="12" /> Lepas Kupon
        </button>
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

    <!-- Voucher Selection Drawer (Desktop Variant) -->
    <BottomSheet
      v-model="isDiscountSheetOpen"
      title="Pake Kupon Diskon"
      :icon="TicketIcon"
      maxWidth="500px"
    >
      <div class="p-8 space-y-10">
        <!-- Manual Input -->
        <div class="space-y-4">
          <label class="text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1">Punya kode promo sendiri?</label>
          <div class="flex gap-2">
            <input
              v-model="localCoupon"
              type="text"
              placeholder="MASUKKAN KODE"
              class="flex-1 bg-bg-primary border-2 border-border-color rounded-2xl py-4 px-6 text-sm text-text-primary outline-none focus:border-accent-primary transition-all uppercase font-mono font-bold shadow-inner"
              @keyup.enter="$emit('apply-discount', localCoupon)"
            />
            <button
              @click="$emit('apply-discount', localCoupon)"
              class="px-8 py-4 bg-accent-primary text-white text-sm font-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-accent-primary/20"
            >
              Gunakan
            </button>
          </div>
        </div>

        <!-- Promo List -->
        <div class="space-y-6">
          <h5 class="text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1">Promo Tersedia</h5>
          <div class="grid grid-cols-1 gap-5">
            <div
              v-for="coupon in coupons"
              :key="coupon.code"
              class="flex flex-col border-2 rounded-[32px] transition-all relative overflow-hidden group/coupon"
              :class="discountCode?.toUpperCase() === coupon.code.toUpperCase()
                ? 'bg-emerald-500/5 border-emerald-500 shadow-lg shadow-emerald-500/5'
                : 'bg-bg-primary border-border-color hover:border-accent-primary/40'"
            >
              <!-- Ticket Body -->
              <div class="p-6 flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl bg-bg-secondary flex items-center justify-center text-accent-secondary group-hover/coupon:scale-110 transition-transform">
                  <TicketIcon :size="28" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-mono font-black text-sm text-text-primary tracking-wider">{{ coupon.code }}</span>
                    <span class="text-[0.6rem] font-black text-text-tertiary uppercase">{{ coupon.expiryDate }}</span>
                  </div>
                  <h5 class="text-base font-black text-text-primary truncate">
                    {{ coupon.label }}
                  </h5>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="px-6 pb-6 pt-5 border-t border-dashed border-border-color/50 bg-bg-secondary/30">
                <p class="text-[0.7rem] text-text-tertiary leading-relaxed mb-5">
                  {{ coupon.desc }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="text-[0.6rem] font-black uppercase text-accent-secondary tracking-widest mb-0.5">Berlaku Hingga</span>
                    <span class="text-xs text-text-secondary font-bold">{{ coupon.expiryDate }}</span>
                  </div>

                  <button
                    v-if="discountCode?.toUpperCase() !== coupon.code.toUpperCase()"
                    @click="$emit('apply-discount', coupon.code); isDiscountSheetOpen = false"
                    class="px-6 py-2.5 bg-accent-primary text-white text-[0.75rem] font-black rounded-xl active:scale-95 transition-all shadow-lg shadow-accent-primary/10"
                  >
                    Pakai
                  </button>
                  <div v-else class="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-[0.75rem] font-black shadow-lg shadow-emerald-500/20">
                    <CheckIcon :size="14" />
                    Terpasang
                  </div>
                </div>
              </div>

              <!-- Ticket Notches -->
              <div class="absolute -left-3 top-[80px] -translate-y-1/2 w-6 h-6 bg-bg-secondary rounded-full border border-border-color/20 shadow-inner"></div>
              <div class="absolute -right-3 top-[80px] -translate-y-1/2 w-6 h-6 bg-bg-secondary rounded-full border border-border-color/20 shadow-inner"></div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="p-8 pb-10 bg-bg-secondary border-t border-border-color/50 flex justify-center">
          <button
            @click="isDiscountSheetOpen = false"
            class="px-10 py-4 bg-bg-primary border border-border-color text-text-secondary text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-bg-tertiary transition-all"
          >
            Tutup
          </button>
        </div>
      </template>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Sparkles as SparklesIcon,
  Ticket as TicketIcon,
  Trash2 as TrashIcon,
  Search as SearchIcon,
} from "lucide-vue-next";
import type { Coupon } from "../../../services/couponService";
import { BottomSheet, BaseButton } from "@kangjessy/ui";

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
const isDiscountSheetOpen = ref(false);
const localCoupon = ref(props.discountCode);

watch(
  () => props.discountCode,
  (newVal) => {
    localCoupon.value = newVal;
  },
);
</script>
