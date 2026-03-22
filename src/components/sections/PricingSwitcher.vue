<template>
  <section class="py-24 md:py-32" id="pricing">
    <div class="container relative z-10">
      <SectionHeader 
        badge="Tailored Solutions" 
        title="Investment for Your Digital Future" 
        subtitle="Pilih paket yang paling sesuai dengan target bisnis Anda saat ini. Transparan, terukur, dan berorientasi pada hasil."
        align="center"
      />

      <!-- Category Tabs -->
      <div class="flex justify-center mt-12 mb-16">
        <div class="inline-flex p-1.5 bg-white/[0.03] border border-border-color rounded-2xl backdrop-blur-md">
          <button 
            v-for="tab in categories" 
            :key="tab.id"
            @click="activeCategory = tab.id"
            class="px-8 py-3 rounded-xl transition-all duration-300 font-semibold text-[0.95rem] relative"
            :class="activeCategory === tab.id ? 'bg-accent-primary text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]' : 'text-text-secondary hover:text-text-primary'"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Frequency Toggle (only for Maintenance) -->
      <div v-if="activeCategory === 'maintenance'" class="flex justify-center mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
        <div class="inline-flex p-1 bg-white/[0.02] border border-border-color/50 rounded-full">
          <button 
            v-for="freq in frequencies" 
            :key="freq.id"
            @click="activeFrequency = freq.id"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeFrequency === freq.id ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-text-primary'"
          >
            {{ freq.name }}
          </button>
        </div>
      </div>

      <!-- Mobile Controls (Development) -->
      <div v-if="activeCategory === 'development'" class="md:hidden flex justify-end gap-2.5 mb-4 px-4">
        <button
          @click="scrollSliderDev('prev')"
          aria-label="Previous plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronLeftIcon :size="20" />
        </button>
        <button
          @click="scrollSliderDev('next')"
          aria-label="Next plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronRightIcon :size="20" />
        </button>
      </div>

      <!-- Development Plans Grid -->
      <div v-if="activeCategory === 'development'" ref="devSliderRef" @scroll="handleScrollDev" class="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 animate-in fade-in zoom-in-95 duration-700 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div 
          v-for="plan in developmentPlans" 
          :key="plan.id"
          class="relative group shrink-0 w-[85vw] md:w-auto snap-center"
        >
          <div 
            class="h-full rounded-[32px] p-8 flex flex-col transition-all duration-500 backdrop-blur-xl group-hover:-translate-y-2 relative overflow-hidden"
            :class="plan.isPopular 
              ? 'bg-gradient-to-b from-accent-primary/[0.08] to-transparent border border-accent-primary shadow-[0_0_40px_rgba(59,130,246,0.2)]' 
              : 'bg-white/[0.03] border border-border-color hover:bg-white/[0.05] hover:border-accent-primary/50'"
          >
            <!-- Plan Header -->
            <div class="mb-8 relative z-10">
              <span 
                v-if="plan.badge" 
                class="px-4 py-1.5 text-[0.75rem] font-bold rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm"
                :class="plan.isPopular ? 'bg-accent-primary text-white' : 'bg-accent-primary/10 text-accent-primary'"
              >
                {{ plan.badge }}
              </span>
              <h3 class="text-2xl font-bold text-text-primary mb-3">{{ plan.name }}</h3>
              <p class="text-[0.9rem] text-text-secondary leading-relaxed min-h-[48px]">{{ plan.description }}</p>
            </div>

            <!-- Pricing -->
            <div class="mb-8">
              <div class="flex items-baseline gap-2">
                <span class="text-text-secondary text-lg font-medium">Rp</span>
                <span class="text-4xl font-extrabold text-text-primary tracking-tight">{{ plan.price }}</span>
              </div>
              <p v-if="plan.originalPrice" class="text-sm text-text-secondary mt-1 flex items-center justify-start gap-2">
                <span class="line-through opacity-50">Was Rp {{ plan.originalPrice }}</span>
                <span v-if="calculateDiscount(plan.originalPrice, plan.price) > 0" class="text-xs font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full">-{{ calculateDiscount(plan.originalPrice, plan.price) }}%</span>
              </p>
            </div>

            <!-- Features List -->
            <ul class="grow space-y-4" :class="isFeaturesExpanded ? 'mb-4' : 'mb-0'">
              <li 
                v-for="(feature, index) in plan.features" 
                :key="feature.text"
                v-show="index < 5 || isFeaturesExpanded"
                class="flex items-start gap-3 group/item relative"
                :class="feature.included ? 'text-text-primary' : 'text-text-secondary opacity-40'"
              >
                <div class="mt-1 shrink-0">
                  <CheckCircle v-if="feature.included" :size="18" class="text-accent-primary transition-transform group-hover/item:scale-110" />
                  <XCircle v-else :size="18" class="text-text-secondary shrink-0" />
                </div>
                <div class="w-full relative isolate">
                  <span class="text-[0.9rem] leading-tight inline-flex items-center flex-wrap" :class="feature.isPopular ? 'font-semibold text-accent-primary' : ''">
                    <span class="mr-1">{{ feature.text }}</span>
                    <!-- Info Icon Trigger -->
                    <div v-if="feature.tooltip" class="relative inline-flex items-center top-0.5 group/tooltip w-4 h-4 cursor-help text-text-tertiary hover:text-accent-primary transition-colors shrink-0">
                      <Info :size="14" />
                      <!-- Tooltip Box -->
                      <div class="absolute bottom-[calc(100%+0.5rem)] left-0 md:left-1/2 md:-translate-x-1/2 min-w-[200px] sm:min-w-[240px] max-w-[260px] p-3.5 rounded-2xl bg-[#0f1117] border border-border-color shadow-xl text-[0.75rem] text-text-secondary font-medium leading-relaxed opacity-0 invisible pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:pointer-events-auto transition-all duration-300 z-50">
                        {{ feature.tooltip }}
                        <!-- Arrow -->
                        <div class="absolute -bottom-1.5 left-2 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-[#0f1117] border-b border-r border-border-color rotate-45"></div>
                      </div>
                    </div>
                  </span>
                </div>
              </li>
            </ul>

            <!-- Accordion Toggle for Development Plans -->
            <button 
              v-if="plan.features.length > 5" 
              @click="toggleExpand()"
              class="text-xs font-semibold text-accent-primary flex items-center gap-1.5 mb-8 hover:text-white transition-colors self-start pb-2"
            >
              <span>{{ isFeaturesExpanded ? 'Sembunyikan' : `Lihat ${plan.features.length - 5} Fitur Tambahan` }}</span>
              <ChevronDown 
                :size="14" 
                class="transition-transform duration-300" 
                :class="isFeaturesExpanded ? 'rotate-180' : ''" 
              />
            </button>

            <!-- CTA -->
            <BaseButton 
              :variant="plan.isPopular ? 'primary' : 'secondary'" 
              size="lg" 
              class="w-full justify-center group-hover:scale-[1.02] transition-all"
              @click="handleOrder(plan.id)"
            >
              {{ plan.ctaText }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Mobile Indicator for Development -->
      <div v-if="activeCategory === 'development'" class="md:hidden flex justify-center gap-2 -mt-4 mb-4 relative z-20">
        <span
          v-for="(_, i) in developmentPlans"
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="devSlide === i ? 'w-6 bg-accent-primary' : 'w-2 bg-border-color'"
        ></span>
      </div>

      <!-- Mobile Controls (Maintenance) -->
      <div v-else-if="activeCategory === 'maintenance'" class="md:hidden flex justify-end gap-2.5 mb-4 px-4">
        <button
          @click="scrollSliderMaint('prev')"
          aria-label="Previous plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronLeftIcon :size="20" />
        </button>
        <button
          @click="scrollSliderMaint('next')"
          aria-label="Next plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronRightIcon :size="20" />
        </button>
      </div>

      <!-- Maintenance Plans Grid -->
      <div v-if="activeCategory === 'maintenance'" ref="maintSliderRef" @scroll="handleScrollMaint" class="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 animate-in fade-in zoom-in-95 duration-700 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div 
          v-for="plan in maintenancePlans" 
          :key="plan.id"
          class="bg-white/[0.03] border border-border-color rounded-[32px] p-8 flex flex-col hover:bg-white/[0.05] transition-all duration-500 backdrop-blur-xl group hover:border-accent-secondary/50 shrink-0 w-[85vw] md:w-auto snap-center"
        >
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-text-primary mb-3">{{ plan.name }}</h3>
            <p class="text-[0.9rem] text-text-secondary leading-relaxed min-h-[48px]">{{ plan.description }}</p>
          </div>

          <!-- Price Display based on frequency -->
          <div class="mb-8">
            <div class="flex items-baseline gap-2">
              <span class="text-text-secondary text-lg font-medium">Rp</span>
              <span class="text-4xl font-extrabold text-text-primary tracking-tight transition-all duration-300">
                {{ getMaintenancePrice(plan) }}
              </span>
              <span class="text-sm text-text-secondary">/ {{ activeFrequency }}</span>
            </div>
          </div>

          <ul class="flex-grow space-y-4 mb-10">
            <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-3">
              <div class="mt-1 shrink-0">
                <ShieldCheck :size="18" class="text-accent-secondary" />
              </div>
              <span class="text-[0.9rem] text-text-primary leading-tight">{{ feat }}</span>
            </li>
          </ul>

          <BaseButton 
            variant="secondary" 
            size="lg" 
            class="w-full justify-center hover:bg-accent-secondary hover:text-white transition-all"
            @click="handleOrder(plan.id)"
          >
            {{ plan.ctaText }}
          </BaseButton>
        </div>
      </div>

      <!-- Mobile Indicator for Maintenance -->
      <div v-if="activeCategory === 'maintenance'" class="md:hidden flex justify-center gap-2 mt-4 relative z-20">
        <span
          v-for="(_, i) in maintenancePlans"
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="maintSlide === i ? 'w-6 bg-accent-primary' : 'w-2 bg-border-color'"
        ></span>
      </div>

      <!-- Add-on Extras Grid -->
      <div class="mt-24">
        <div class="flex items-center gap-4 mb-12">
          <div class="h-px bg-linear-to-r from-accent-primary/50 to-transparent flex-grow"></div>
          <h3 class="text-xl font-bold text-text-primary uppercase tracking-widest px-4">Individual Services & Add-ons</h3>
          <div class="h-px bg-linear-to-l from-accent-primary/50 to-transparent flex-grow"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div v-for="cat in addonServices" :key="cat.category" class="space-y-6">
            <h4 class="text-accent-primary font-bold text-lg border-b border-border-color pb-3 mb-6">{{ cat.category }}</h4>
            
            <div 
              v-for="item in cat.items" 
              :key="item.name"
              @click="handleAddonOrder(item, cat.category)"
              class="flex justify-between items-start gap-4 p-4 rounded-2xl hover:bg-white/3 transition-all group border border-transparent hover:border-border-color/50 cursor-pointer"
            >
              <div class="grow">
                <h5 class="text-text-primary font-semibold group-hover:text-accent-primary transition-colors">{{ item.name }}</h5>
                <p class="text-[0.85rem] text-text-secondary mt-1">{{ item.desc }}</p>
              </div>
              <div class="text-right">
                <span class="text-text-primary font-bold text-[1rem]">Rp {{ item.price }}</span>
                <button class="block w-full text-[0.7rem] text-accent-primary mt-2 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                   + Add Service
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Consultation Banner -->
        <div class="mt-20 p-10 bg-linear-to-br from-accent-primary/10 to-transparent border border-accent-primary/20 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left backdrop-blur-xl relative overflow-hidden">
          <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-accent-primary/5 blur-[80px] rounded-full"></div>
          
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-text-primary mb-2">Punya Kebutuhan Sangat Spesifik?</h3>
            <p class="text-text-secondary max-w-[500px]">Saya melayani pengembangan sistem custom yang dirancang khusus untuk alur bisnis unik Anda. Konsultasikan visi Anda secara gratis.</p>
          </div>
          
          <div class="flex flex-wrap justify-center gap-4 relative z-10">
            <BaseButton variant="primary" size="lg" @click="openConsultation">
              Free Consultation
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SectionHeader from '../ui/SectionHeader.vue';
import { BaseButton } from "@kangjessy/ui";
import { 
  developmentPlans, 
  maintenancePlans, 
  addonServices,
  type MaintenancePlan 
} from '../../data/landing/pricing';
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from 'lucide-vue-next';

import { usePopupManager, Popups } from '../../composables/usePopupManager';

const popup = usePopupManager();

defineEmits(['consultation']);

const openConsultation = () => {
  popup.openModal(Popups.CHAT_WA, {
    title: 'Free Consultation',
    bubbleMessage: 'Halo! Saya siap berdiskusi tentang kebutuhan proyek Anda secara gratis. Ceritakan visi Anda dan kita cari solusi terbaik bersama!',
  });
};

const categories = [
  { id: 'development', name: 'Digital Development' },
  { id: 'maintenance', name: 'Maintenance Plans' }
];

const frequencies = [
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'one-time', name: 'One-time' }
];

const activeCategory = ref('development');
const activeFrequency = ref('monthly');
const isFeaturesExpanded = ref(false);

const toggleExpand = () => {
  isFeaturesExpanded.value = !isFeaturesExpanded.value;
};

const devSlide = ref(0);
const devSliderRef = ref<HTMLElement | null>(null);

const handleScrollDev = (e: Event) => {
  const target = e.target as HTMLElement;
  const firstChild = target.children[0] as HTMLElement;
  if (firstChild) {
    const itemWidth = firstChild.offsetWidth + 24; // approx standard gap
    devSlide.value = Math.round(target.scrollLeft / itemWidth);
  }
};

const scrollSliderDev = (direction: "next" | "prev") => {
  if (!devSliderRef.value) return;
  const items = devSliderRef.value.querySelectorAll(".snap-center");
  if (items.length === 0) return;
  const itemWidth = (items[0] as HTMLElement).offsetWidth + 24;
  const totalSlides = developmentPlans.length;
  if (direction === "next") {
    if (devSlide.value >= totalSlides - 1) devSliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
    else devSliderRef.value.scrollBy({ left: itemWidth, behavior: "smooth" });
  } else {
    if (devSlide.value <= 0) devSliderRef.value.scrollTo({ left: itemWidth * (totalSlides - 1), behavior: "smooth" });
    else devSliderRef.value.scrollBy({ left: -itemWidth, behavior: "smooth" });
  }
};

const maintSlide = ref(0);
const maintSliderRef = ref<HTMLElement | null>(null);

const handleScrollMaint = (e: Event) => {
  const target = e.target as HTMLElement;
  const firstChild = target.children[0] as HTMLElement;
  if (firstChild) {
    const itemWidth = firstChild.offsetWidth + 24; // approx standard gap
    maintSlide.value = Math.round(target.scrollLeft / itemWidth);
  }
};

const scrollSliderMaint = (direction: "next" | "prev") => {
  if (!maintSliderRef.value) return;
  const items = maintSliderRef.value.querySelectorAll(".snap-center");
  if (items.length === 0) return;
  const itemWidth = (items[0] as HTMLElement).offsetWidth + 24;
  const totalSlides = maintenancePlans.length;
  if (direction === "next") {
    if (maintSlide.value >= totalSlides - 1) maintSliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
    else maintSliderRef.value.scrollBy({ left: itemWidth, behavior: "smooth" });
  } else {
    if (maintSlide.value <= 0) maintSliderRef.value.scrollTo({ left: itemWidth * (totalSlides - 1), behavior: "smooth" });
    else maintSliderRef.value.scrollBy({ left: -itemWidth, behavior: "smooth" });
  }
};

const handleAddonOrder = (item: any, categoryName: string) => {
  popup.openModal(Popups.ORDER_CHECKOUT, { 
    plan: {
      id: `addon-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: item.name,
      price: item.price,
      description: item.desc,
      badge: categoryName,
      features: [],
      ctaText: 'Pesan Layanan',
      isPopular: false
    }
  });
};

const getMaintenancePrice = (plan: MaintenancePlan) => {
  if (activeFrequency.value === 'weekly') return plan.weeklyPrice;
  if (activeFrequency.value === 'one-time') return plan.oneTimePrice;
  return plan.monthlyPrice;
};

const handleOrder = (planId: string) => {
  // Find the plan object
  const allPlans = activeCategory.value === 'development' ? developmentPlans : maintenancePlans;
  const selectedPlan = (allPlans as any[]).find(p => p.id === planId);

  // If maintenance, we need to pass the price correctly based on frequency
  const planData = { ...selectedPlan };
  if (activeCategory.value === 'maintenance') {
    planData.price = getMaintenancePrice(selectedPlan as MaintenancePlan);
  }

  popup.openModal(Popups.ORDER_CHECKOUT, { 
    plan: planData 
  });
};

const calculateDiscount = (original?: string, current?: string) => {
  if (!original || !current) return 0;
  const orig = parseInt(original.replace(/\./g, ''));
  const curr = parseInt(current.replace(/\./g, ''));
  if (orig && curr && orig > curr) {
    return Math.round(((orig - curr) / orig) * 100);
  }
  return 0;
};
</script>

<style scoped>
/* Optional micro-animations */
.animate-in {
  animation: slide-up 0.6s ease-out forwards;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
