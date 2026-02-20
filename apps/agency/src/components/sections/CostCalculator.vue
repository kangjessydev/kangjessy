<template>
  <section class="py-24 md:py-32 bg-bg-primary" id="calculator">
    <div class="container mx-auto px-4">
      <div class="max-w-[900px] mx-auto text-center mb-16">
        <SectionHeader
          badge="Pricing Tool"
          title="Interactive Cost Calculator"
          subtitle="Estimasi biaya proyek Anda secara transparan. Pilih fitur yang Anda butuhkan dan dapatkan perkiraan investasinya."
          align="center"
        />
      </div>

      <div
        class="bg-bg-secondary/40 backdrop-blur-3xl border border-border-color/60 rounded-[40px] overflow-visible shadow-[0_30px_100px_rgba(0,0,0,0.4)] relative"
      >
        <OrderStep1
          v-model:selected-type="selectedType"
          v-model:selected-style="selectedStyle"
          v-model:selected-timeline="selectedTimeline"
          :selected-features="selectedFeatures"
          @toggle-feature="toggleFeature"
          :total-price-without-multiplier="totalPriceWithoutMultiplier"
          :total-bundle-savings="totalBundleSavings"
          :is-micro="isMicro"
          :format-price="formatPrice"
          :available-features="effectiveFeatures"
          :project-types="projectTypes"
          :service-types="serviceTypes"
          :styles="styles"
          :timelines="timelines"
        >
          <template #summary>
            <OrderSummaryCard
              :current-type="currentType"
              :selected-features="selectedFeatures"
              :current-timeline="currentTimeline"
              :timeline-multiplier="timelineMultiplier"
              :total-price="totalPrice"
              :total-price-before-discount="totalPriceBeforeDiscount"
              :total-price-without-multiplier="totalPriceWithoutMultiplier"
              :total-bundle-savings="totalBundleSavings"
              :discount-code="discountCode"
              :active-coupon="activeCoupon"
              :discount-amount="discountAmount"
              :get-feature-name="getFeatureName"
              :get-feature-price="getEffectiveAddOnPrice"
              :get-feature-original-price="getFeatureOriginalPrice"
              :format-price="formatPrice"
              :coupons="availableCoupons"
              @next="handleNext"
              @apply-discount="(code) => applyDiscount(code)"
            />
          </template>
        </OrderStep1>
      </div>
    </div>

    <!-- Mobile Summary Bar/Section -->
    <OrderMobileSummary
      :current-type="currentType"
      :selected-features="selectedFeatures"
      :current-timeline="currentTimeline"
      :timeline-multiplier="timelineMultiplier"
      :total-price="totalPrice"
      :total-price-before-discount="totalPriceBeforeDiscount"
      :total-price-without-multiplier="totalPriceWithoutMultiplier"
      :total-bundle-savings="totalBundleSavings"
      :discount-code="discountCode"
      :active-coupon="activeCoupon"
      :discount-amount="discountAmount"
      :get-feature-name="getFeatureName"
      :get-feature-price="getEffectiveAddOnPrice"
      :get-feature-original-price="getFeatureOriginalPrice"
      :format-price="formatPrice"
      :available-features="effectiveFeatures"
      :project-types="projectTypes"
      :coupons="availableCoupons"
      @next="handleNext"
      @select-type="(val) => selectType(val)"
      @toggle-feature="(id) => toggleFeature(id)"
      @apply-discount="(code) => applyDiscount(code)"
    />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SectionHeader from "../ui/SectionHeader.vue";
import OrderStep1 from "./order/OrderStep1.vue";
import OrderSummaryCard from "./order/OrderSummaryCard.vue";
import OrderMobileSummary from "./order/OrderMobileSummary.vue";

import { useOrderCalculator } from "../../composables/useOrderCalculator";
import { defaultConfig } from "../../data/config/orderConfig";

const router = useRouter();
defineEmits(["next"]);
const {
  selectedType,
  selectedFeatures,
  selectedTimeline,
  selectedStyle,
  discountCode,
  activeCoupon,
  discountAmount,
  totalPriceBeforeDiscount,
  totalPriceWithoutMultiplier,
  totalBundleSavings,
  isMicro,
  timelineMultiplier,
  currentType,
  currentTimeline,
  totalPrice,
  selectType,
  toggleFeature,
  applyDiscount,
  getFeatureName,
  formatPrice,
  timelines,
  projectTypes,
  serviceTypes,
  styles,
  availableCoupons,
  getEffectiveAddOnPrice,
  getFeatureOriginalPrice,
  effectiveFeatures,
} = useOrderCalculator();

const handleNext = () => {
  // Simpan data ke localStorage agar bisa dilanjutkan di halaman Order
  const draft = {
    selectedType: selectedType.value,
    selectedFeatures: selectedFeatures.value,
    selectedTimeline: selectedTimeline.value,
    selectedStyle: selectedStyle.value,
    form: {
      name: "",
      email: "",
      phone: "",
      company: "",
      brief: "",
      reference: "",
    },
    step: 2, // Langsung ke step info kontak
    timestamp: Date.now(),
  };

  localStorage.setItem(defaultConfig.storageKey, JSON.stringify(draft));
  router.push("/order");
};
</script>

<style scoped>
/* Scoped styles are handled by tailwind in the child components */
</style>
