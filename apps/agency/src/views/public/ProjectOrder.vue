<template>
  <div class="min-h-screen bg-bg-primary pt-24 lg:pt-32 pb-24">
    <!-- Site Navbar will be here from App.vue wrapper -->

    <header class="mb-[clamp(3.5rem,10vw,5rem)] px-4">
      <div class="max-w-[1200px] mx-auto">
        <SectionHeader
          badge="Project Initiation"
          title="Wujudkan Proyek Impian Anda"
          subtitle="Konfigurasi proyek dengan mudah. Data tersimpan otomatis di browser ini."
          align="center"
        />

        <!-- Discreet Internal Actions -->
        <div class="flex justify-center mt-6 gap-3">
          <button
            @click="copyDraftLink"
            class="px-4 py-2 rounded-full bg-bg-secondary border border-border-color text-text-secondary text-xs font-bold flex items-center gap-2 hover:border-accent-primary hover:text-accent-primary transition-all active:scale-95"
          >
            <Share2Icon :size="14" />
            Simpan & Share Draft
          </button>
          <Transition
            enter-active-class="transition duration-400 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-90"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-90"
          >
            <div
              v-if="lastSaved"
              class="px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold flex items-center gap-2"
            >
              <SaveIcon :size="14" />
              <span>{{ lastSaved }}</span>
            </div>
          </Transition>
        </div>

        <OrderProgressBar :step="step" />
      </div>
    </header>

    <main class="px-4">
      <div
        class="max-w-[1200px] mx-auto bg-bg-secondary/50 backdrop-blur-3xl border border-border-color rounded-[32px] min-h-[600px] shadow-2xl overflow-hidden"
      >
        <Transition
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="opacity-0 translate-x-5"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-5"
          mode="out-in"
        >
          <!-- Step 1 -->
          <OrderStep1
            v-if="step === 1"
            :selectedType="selectedType"
            @update:selectedType="selectType"
            v-model:selectedStyle="selectedStyle"
            v-model:selectedTimeline="selectedTimeline"
            :selectedFeatures="selectedFeatures"
            :totalPriceWithoutMultiplier="totalPriceWithoutMultiplier"
            :totalBundleSavings="totalBundleSavings"
            :isMicro="isMicro"
            :formatPrice="formatPrice"
            :available-features="features"
            :project-types="projectTypes"
            :service-types="serviceTypes"
            :styles="styles"
            :timelines="timelines"
            @toggle-feature="toggleFeature"
          >
            <template #summary>
              <OrderSummaryCard
                :currentType="currentType"
                :selectedFeatures="selectedFeatures"
                :currentTimeline="currentTimeline"
                :timelineMultiplier="timelineMultiplier"
                :totalPrice="totalPrice"
                :totalPriceBeforeDiscount="totalPriceBeforeDiscount"
                :totalPriceWithoutMultiplier="totalPriceWithoutMultiplier"
                :totalBundleSavings="totalBundleSavings"
                :discountCode="discountCode"
                :activeCoupon="activeCoupon"
                :discountAmount="discountAmount"
                :coupons="availableCoupons"
                :getFeatureName="getFeatureName"
                :getFeaturePrice="getFeaturePrice"
                :formatPrice="formatPrice"
                @next="goToStep2"
                @apply-discount="(code) => applyDiscount(code)"
              />
            </template>
          </OrderStep1>

          <!-- Step 2 -->
          <OrderStep2
            v-else
            :form="form"
            :isSubmitting="isSubmitting"
            :currentType="currentType"
            :currentStyle="currentStyle"
            :currentTimeline="currentTimeline"
            :selectedFeatures="selectedFeatures"
            :totalPrice="totalPrice"
            :formatPrice="formatPrice"
            :getFeatureName="getFeatureName"
            @back="step = 1"
            @submit="submitOrder"
            @whatsapp="redirectToWhatsApp"
          >
            <template #summary>
              <OrderSummaryCard
                :currentType="currentType"
                :selectedFeatures="selectedFeatures"
                :currentTimeline="currentTimeline"
                :timelineMultiplier="timelineMultiplier"
                :totalPrice="totalPrice"
                :totalPriceBeforeDiscount="totalPriceBeforeDiscount"
                :totalPriceWithoutMultiplier="totalPriceWithoutMultiplier"
                :totalBundleSavings="totalBundleSavings"
                :discountCode="discountCode"
                :activeCoupon="activeCoupon"
                :discountAmount="discountAmount"
                :coupons="availableCoupons"
                :getFeatureName="getFeatureName"
                :getFeaturePrice="getFeaturePrice"
                :formatPrice="formatPrice"
                buttonText="Kirim Penawaran"
                :showWhatsApp="true"
                @next="submitOrder"
                @apply-discount="(code) => applyDiscount(code)"
                @whatsapp="redirectToWhatsApp"
              />
            </template>
          </OrderStep2>
        </Transition>
      </div>
    </main>

    <!-- Success Modal -->
    <OrderSuccessModal
      :show="showSuccess"
      :customerName="form.name"
      :totalPrice="totalPrice"
      :formatPrice="formatPrice"
      :projectId="createdProjectId"
      @close="showSuccess = false"
      @view-invoice="router.push(`/portal?id=${createdProjectId}`)"
      @go-home="goHome"
    />

    <!-- Draft actions moved to header -->

    <!-- Order Mobile Summary (Responsive Actions & Discounts) -->
    <OrderMobileSummary
      v-if="step === 1 || step === 2"
      :step="step"
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
      :coupons="availableCoupons"
      :get-feature-name="getFeatureName"
      :get-feature-price="getFeaturePrice"
      :format-price="formatPrice"
      :available-features="features"
      :project-types="projectTypes"
      @next="step === 1 ? goToStep2() : submitOrder()"
      @select-type="(val) => selectType(val)"
      @toggle-feature="(id) => toggleFeature(id)"
      @apply-discount="(code) => applyDiscount(code)"
      @back="step = 1"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "../../composables/useToast";
import { useOrderCalculator } from "../../composables/useOrderCalculator";
import SectionHeader from "../../components/ui/SectionHeader.vue";
import OrderProgressBar from "../../components/sections/order/OrderProgressBar.vue";
import OrderStep1 from "../../components/sections/order/OrderStep1.vue";
import OrderStep2 from "../../components/sections/order/OrderStep2.vue";
import OrderSummaryCard from "../../components/sections/order/OrderSummaryCard.vue";
import OrderSuccessModal from "../../components/sections/order/OrderSuccessModal.vue";
import OrderMobileSummary from "../../components/sections/order/OrderMobileSummary.vue";
import { Share2 as Share2Icon, Save as SaveIcon } from "lucide-vue-next";
import { useSEO } from "../../composables/useSEO";

useSEO({
  title: "Initiate Project Order",
  description:
    "Mulai proyek digital Anda di sini. Konfigurasi fitur, estimasi harga, dan tentukan timeline dengan mudah.",
  url: "/order",
});

// Data & Config
import { whatsappConfig, defaultConfig } from "../../data/config/orderConfig";

// Services
import { projectService } from "../../services/projectService";
import { clientService } from "../../services/clientService";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const {
  selectedType,
  selectedStyle,
  selectedFeatures,
  selectedTimeline,
  discountCode,
  activeCoupon,
  discountAmount,
  availableCoupons,
  totalPriceBeforeDiscount,
  totalPriceWithoutMultiplier,
  totalBundleSavings,
  isMicro,
  timelineMultiplier,
  currentType,
  currentStyle,
  currentTimeline,
  totalPrice,
  selectType,
  applyDiscount,
  toggleFeature,
  getFeatureName,
  getFeaturePrice,
  formatPrice,
  features,
  projectTypes,
  serviceTypes,
  styles,
  timelines,
} = useOrderCalculator();

const step = ref(1);
const isSubmitting = ref(false);
const showSuccess = ref(false);
const lastSaved = ref("");
const createdProjectId = ref("");

const form = reactive({
  name: "",
  email: "",
  phone: "",
  company: "",
  domain: "",
  brief: "",
});

// --- Lifecycle & Persistence ---
onMounted(() => {
  loadDraft();
  // Auto-save setup
  const saveTimer = setInterval(saveDraft, 30000); // Every 30s
  return () => clearInterval(saveTimer);
});

// Watch for deep changes to save
watch(
  [
    () => selectedType.value,
    () => selectedFeatures.value,
    () => selectedTimeline.value,
    () => selectedStyle.value,
    form,
  ],
  () => {
    saveDraft();
  },
  { deep: true },
);

const saveDraft = () => {
  const draft = {
    selectedType: selectedType.value,
    selectedFeatures: selectedFeatures.value,
    selectedTimeline: selectedTimeline.value,
    selectedStyle: selectedStyle.value,
    form: { ...form },
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(defaultConfig.storageKey, JSON.stringify(draft));
  lastSaved.value = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadDraft = () => {
  // 1. Direct Order from Service Detail (Highest Priority)
  const typeFromUrl = route.query.type;
  if (typeFromUrl) {
    selectedType.value = typeFromUrl as string;

    // Check for specific feature addition from Home Carousel
    const featureToAdd = route.query.addFeature;
    if (featureToAdd) {
      selectedFeatures.value = [featureToAdd as string];
    } else {
      selectedFeatures.value = [];
    }

    selectedTimeline.value = defaultConfig.selectedTimeline;

    // Clear old draft to prevent conflict
    localStorage.removeItem(defaultConfig.storageKey);
    return;
  }

  // 2. Shared Draft Logic
  const sharedData = route.query.draft;
  if (sharedData) {
    try {
      const decoded = JSON.parse(atob(sharedData as string));
      Object.assign(selectedType.value, decoded.type);
      selectedFeatures.value = decoded.features || [];
      toast.success("Draft bersama berhasil dimuat!");
      return;
    } catch (e) {
      toast.error("Gagal memuat draft bersama.");
    }
  }

  // 3. Local Storage Restore (Fallback)
  const saved = localStorage.getItem(defaultConfig.storageKey);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      selectedType.value = data.selectedType || defaultConfig.selectedType;
      selectedFeatures.value = data.selectedFeatures || [];
      selectedTimeline.value =
        data.selectedTimeline || defaultConfig.selectedTimeline;
      if (data.selectedStyle) selectedStyle.value = data.selectedStyle;
      if (data.form) Object.assign(form, data.form);
    } catch (e) {
      console.error("Failed to load draft");
    }
  }
};

const copyDraftLink = () => {
  const draft = {
    type: selectedType.value,
    features: selectedFeatures.value,
    style: selectedStyle.value,
  };
  const encoded = btoa(JSON.stringify(draft));
  const url = `${window.location.origin}${window.location.pathname}?draft=${encoded}`;

  navigator.clipboard.writeText(url);
  saveDraft();
  toast.success("Link draft berhasil disalin!");
};

// --- Actions ---
const goToStep2 = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  step.value = 2;
};

const processOrder = async (isWhatsApp = false) => {
  isSubmitting.value = true;
  try {
    // 1. CREATE CLIENT / LEAD in Supabase
    const client = await clientService.addLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      type: "project_order",
      status: "New", // Capitalized "New" for Admin Dashboard consistency
      project_type: currentType.value?.name || selectedType.value,
      budget: totalPrice.value,
      source: isWhatsApp ? "order_whatsapp" : "order_form",
      brief: form.brief,
      features: selectedFeatures.value.map((f) => getFeatureName(f)),
      voucher: discountCode.value || undefined,
    });

    if (!client?.id) throw new Error("Gagal mengidentifikasi klien.");

    if (!isWhatsApp) {
      // 3. Trigger Transactional Email (Resend)
      // Note: This might fail locally if not running with 'vercel dev'
      try {
        await fetch("/api/send-invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order: {
              id: client.id,
              name: form.name,
              email: form.email,
              projectType: currentType.value?.name,
              timeline: selectedTimeline.value,
              features: selectedFeatures.value.map((f) => getFeatureName(f)),
              total: totalPrice.value,
            },
          }),
        });
        toast.success("Invoice telah dikirim ke email Anda.");
      } catch (emailErr) {
        console.warn("Email service unavailable (local dev?)", emailErr);
      }

      // Save final result to 'GZ_ORDER_TEMP' for Invoice view compatibility
      const finalData = {
        selectedType: selectedType.value,
        selectedFeatures: selectedFeatures.value,
        selectedTimeline: selectedTimeline.value,
        selectedStyle: selectedStyle.value,
        form: { ...form },
        clientId: client.id,
      };
      localStorage.setItem("GZ_ORDER_TEMP", JSON.stringify(finalData));

      showSuccess.value = true;
      localStorage.removeItem(defaultConfig.storageKey);
    } else {
      toast.success("Data terkirim ke sistem! Membuka WhatsApp...");
    }
    return client;
  } catch (e) {
    console.error("Order process failed:", e);
    toast.error("Gagal memproses pemesanan.");
    throw e;
  } finally {
    isSubmitting.value = false;
  }
};

const submitOrder = async () => {
  await processOrder(false);
};

const redirectToWhatsApp = async () => {
  // 1. Try to save to DB first (as a Lead)
  try {
    await processOrder(true);
  } catch (e) {
    console.warn("Silent fail save to DB, still opening WA");
  }

  // 2. Open WhatsApp with formatted message
  const featuresList = selectedFeatures.value
    .map((f) => `- ${getFeatureName(f)}`)
    .join("\n");

  const discountText =
    discountAmount.value > 0
      ? `\n🎉 *Hemat (Kupon ${discountCode.value}):* -Rp ${formatPrice(discountAmount.value)}`
      : "";

  const message = `Halo Admin! Saya baru saja melakukan order project via website. Berikut detailnya:

📦 *TIPE PROJECT*
${currentType.value?.name || selectedType.value}
_(Rp ${formatPrice(currentType.value?.basePrice || 0)})_

✨ *FITUR TAMBAHAN*
${featuresList || "- Tidak ada tambahan"}

⏱️ *TIMELINE*
${currentTimeline.value?.label} _(${currentTimeline.value?.multiplier}x Multiplier)_

💰 *TOTAL ESTIMASI: Rp ${formatPrice(totalPrice.value)}* ${discountText}

--------------------------------
*DATA PEMESAN*
👤 Nama: ${form.name || "-"}
📧 Email: ${form.email || "-"}
🏢 Perusahaan: ${form.company || "-"}
📝 Brief Singkat:
${form.brief || "-"}

Mohon segera diproses invoice-nya. Terima kasih!`;

  const encoded = encodeURIComponent(message);
  window.open(
    `https://wa.me/${whatsappConfig.phoneNumber}?text=${encoded}`,
    "_blank",
  );
};

const goHome = () => {
  router.push("/");
};
</script>
