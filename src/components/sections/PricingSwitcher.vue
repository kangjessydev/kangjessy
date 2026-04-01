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
      <div v-if="activeCategory === 'development'" ref="devSliderRef" @scroll="handleScrollDev" class="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 animate-in fade-in zoom-in-95 duration-700 pt-16 pb-16 -mt-12 md:-mt-16 -mb-12 md:-mb-16 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        <div 
          v-for="plan in developmentPlans" 
          :key="plan.id"
          class="relative group shrink-0 w-[85vw] md:w-auto snap-center hover:z-50"
        >
          <div 
            class="h-full rounded-[32px] p-8 flex flex-col transition-all duration-500 backdrop-blur-xl group-hover:-translate-y-2 relative"
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

            <!-- Metadata (Estimate, Revisions, Tech) -->
            <div class="grid grid-cols-3 gap-2 mb-8 py-5 border-y border-white/5">
              <div class="flex flex-col items-center text-center gap-1.5">
                <Clock :size="16" class="text-accent-primary opacity-80" />
                <span class="text-[0.65rem] text-text-tertiary uppercase font-black tracking-widest">Estimasi</span>
                <span class="text-[0.8rem] text-text-primary font-bold">{{ plan.estimate }}</span>
              </div>
              <div class="flex flex-col items-center text-center gap-1.5 border-x border-white/5">
                <RefreshCw :size="16" class="text-accent-primary opacity-80" />
                <span class="text-[0.65rem] text-text-tertiary uppercase font-black tracking-widest">Revisi</span>
                <span class="text-[0.8rem] text-text-primary font-bold">{{ plan.revisions }}</span>
              </div>
              <div class="flex flex-col items-center text-center gap-1.5">
                <Zap :size="16" class="text-accent-primary opacity-80" />
                <span class="text-[0.65rem] text-text-tertiary uppercase font-black tracking-widest">Teknologi</span>
                <span class="text-[0.8rem] text-text-primary font-bold">{{ plan.technology }}</span>
              </div>
            </div>

            <!-- Features List (Grouped) -->
            <div class="grow space-y-7 mb-10">
               <div v-for="group in plan.featureGroups" :key="group.name" class="space-y-3.5">
                  <h4 class="text-[0.7rem] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2.5">
                    <span class="w-5 h-px bg-accent-primary/30"></span>
                    {{ group.name }}
                  </h4>
                  <ul class="space-y-3 px-1">
                    <li v-for="feature in group.items" :key="feature.text" class="flex items-start gap-3 group/item" :class="feature.included ? '' : 'opacity-25 grayscale select-none'">
                       <div class="shrink-0 mt-0.5">
                          <CheckCircle v-if="feature.included" :size="16" class="text-accent-primary group-hover/item:scale-110 transition-transform" />
                          <XCircle v-else :size="16" class="text-text-tertiary shrink-0" />
                       </div>
                       <div class="flex items-center gap-1.5 flex-wrap">
                          <span class="text-[0.9rem] leading-tight font-medium" :class="feature.isPopular ? 'text-accent-primary font-bold' : (feature.included ? 'text-text-primary' : 'text-text-tertiary')">
                            {{ feature.text }}
                          </span>
                          <div v-if="feature.tooltip && feature.included" class="relative inline-flex items-center group/tooltip w-4 h-4 cursor-help text-text-tertiary hover:text-accent-primary transition-colors">
                            <Info :size="12" @click="openMobileTooltip(feature.text, feature.tooltip)" />
                            <!-- Desktop Tooltip -->
                            <div class="hidden md:block absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 p-3 rounded-xl bg-[#0f1117] border border-border-color shadow-xl text-[0.7rem] text-text-secondary font-medium leading-relaxed opacity-0 invisible pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 min-w-[200px]">
                              {{ feature.tooltip }}
                              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f1117] border-b border-r border-border-color rotate-45"></div>
                            </div>
                          </div>
                       </div>
                    </li>
                  </ul>
               </div>
            </div>

            <!-- Target User Note -->
            <div class="mb-8 p-5 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group/note">
               <div class="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover/note:opacity-100 transition-opacity"></div>
               <p class="text-[0.85rem] text-text-secondary leading-relaxed relative z-10">
                  <span class="text-text-primary font-black uppercase text-[0.7rem] tracking-widest block mb-1.5 opacity-60">Cocok untuk:</span>
                  {{ plan.suitableFor }}
               </p>
            </div>

            <!-- CTA -->
            <BaseButton 
              :variant="plan.isPopular ? 'primary' : 'secondary'" 
              size="lg" 
              class="w-full justify-center group-hover:scale-[1.02] transition-all py-6! text-[1rem] shadow-xl"
              :class="plan.isPopular ? 'shadow-accent-primary/20' : ''"
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

      <!-- Strategy Note (Development) -->
      <div v-if="activeCategory === 'development'" class="max-w-3xl mx-auto mt-10 md:mt-16 mb-4 p-5 md:p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/10 flex items-start gap-4 animate-in fade-in duration-500">
        <div class="mt-0.5 w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
          <Info :size="16" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-text-primary mb-1">Catatan Penting</h4>
          <p class="text-[0.85rem] text-text-secondary leading-relaxed">
            Paket di atas tidak ditentukan dari <strong>jenis website</strong> (Toko Online, Profil Bisnis, dll), melainkan murni dari <strong>skala pendataan dan kompleksitas teknisnya</strong>. Segala jenis website bisa dimulai dari <span class="text-text-primary font-semibold">Starter</span>. Masih ragu menentukan skala? <a href="#" @click.prevent="openConsultation" class="text-accent-primary font-semibold hover:underline">Mari diskusikan gratis!</a>
          </p>
        </div>
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
      <div v-if="activeCategory === 'maintenance'" ref="maintSliderRef" @scroll="handleScrollMaint" class="flex md:grid md:grid-cols-2 max-w-5xl md:mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 animate-in fade-in zoom-in-95 duration-700 pt-16 pb-16 -mt-12 md:-mt-16 -mb-12 md:-mb-16 -mx-4 px-4 md:px-0 no-scrollbar">
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
            <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-3">
              <div class="shrink-0">
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

      <!-- Strategy Note (Maintenance) -->
      <div v-if="activeCategory === 'maintenance'" class="max-w-3xl mx-auto mt-10 md:mt-16 mb-4 p-5 md:p-6 rounded-[24px] bg-accent-secondary/5 border border-accent-secondary/10 flex items-start gap-4 animate-in fade-in duration-500">
        <div class="mt-0.5 w-8 h-8 rounded-full bg-accent-secondary/10 flex items-center justify-center text-accent-secondary shrink-0">
          <Info :size="16" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-text-primary mb-1">Penting Diketahui</h4>
          <p class="text-[0.85rem] text-text-secondary leading-relaxed">
            Setiap paket maintenance mencakup layanan secara menyeluruh — tidak dipisah per fitur — agar penanganannya lebih efektif dan terstruktur. Sebelum servis dimulai, saya akan melakukan pengecekan awal gratis untuk memahami kondisi website Anda dan memastikan layanan yang tepat. Punya pertanyaan atau kendala mendesak? <a href="#" @click.prevent="openConsultation" class="text-accent-secondary font-semibold hover:underline border-b border-accent-secondary/30">Mari kita bicarakan!</a>
          </p>
        </div>
      </div>

      <!-- Add-on Extras Grid -->
      <div class="mt-24">
        <div class="flex items-center gap-4 mb-12">
          <div class="h-px bg-linear-to-r from-accent-primary/50 to-transparent flex-grow"></div>
          <h3 class="text-xl font-bold text-text-primary uppercase tracking-widest px-4 text-center">Individual Services & Add-ons</h3>
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
              <div class="text-right shrink-0">
                <div v-if="item.originalPrice" class="text-[0.7rem] text-text-secondary line-through opacity-50 mb-0.5">
                  Rp {{ item.originalPrice }}
                </div>
                <div class="flex items-center justify-end gap-1.5">
                  <span v-if="item.originalPrice" class="text-[0.65rem] font-black text-accent-primary bg-accent-primary/10 px-1.5 py-0.5 rounded-md leading-none">
                    -{{ calculateDiscount(item.originalPrice, item.price) }}%
                  </span>
                  <span class="text-text-primary font-bold text-[1rem]">Rp {{ item.price }}</span>
                </div>
                <button class="block w-full text-[0.7rem] text-accent-primary mt-2 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                   + Add Service
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Addon Note -->
        <div class="max-w-3xl mx-auto mt-12 text-center px-4">
          <p class="text-[0.85rem] text-text-secondary italic opacity-80">
            *Perlu diketahui: Penambahan fitur satuan atau custom module tetap memerlukan evaluasi dari saya untuk memastikan 100% kompatibilitas sistem dengan infrastruktur eksisting proyek Anda.
          </p>
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

    <!-- Mobile Tooltip BottomSheet -->
    <BottomSheet v-model="isMobileTooltipOpen" :title="mobileTooltipTitle" :showClose="true">
      <div class="px-6 py-8 text-text-secondary leading-relaxed text-sm">
        {{ mobileTooltipText }}
      </div>
    </BottomSheet>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import SectionHeader from '../ui/SectionHeader.vue';
import { BaseButton, BottomSheet } from "@kangjessy/ui";
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
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Clock,
  RefreshCw,
  Zap
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

// Mobile Tooltip State
const isMobileTooltipOpen = ref(false);
const mobileTooltipTitle = ref('');
const mobileTooltipText = ref('');

const openMobileTooltip = (title: string, text: string) => {
  // Only trigger on mobile sizes if we restrict it, but relying on BottomSheet behavior is fine
  // We'll just open it if window width is mobile, or we let it open on click anywhere since desktop has hover anyway.
  if (window.innerWidth < 768) {
    mobileTooltipTitle.value = title;
    mobileTooltipText.value = text;
    isMobileTooltipOpen.value = true;
  }
};

const categories = [
  { id: 'development', name: 'Digital Development' },
  { id: 'maintenance', name: 'Maintenance Plans' }
];

const frequencies = [
  { id: 'monthly', name: 'Monthly' },
  { id: 'one-time', name: 'One-time' }
];

const route = useRoute();
const activeCategory = ref(route.hash === '#maintenance' ? 'maintenance' : 'development');

const scrollToSection = () => {
  nextTick(() => {
    const el = document.getElementById('pricing');
    if (el) {
      // smooth scroll with an offset for any sticky navbar
      const yOffset = -80; 
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
};

watch(() => route.hash, (newHash) => {
  if (newHash === '#maintenance') {
    activeCategory.value = 'maintenance';
    scrollToSection();
  } else if (newHash === '#development') {
    activeCategory.value = 'development';
    scrollToSection();
  }
});

onMounted(() => {
  if (route.hash === '#maintenance' || route.hash === '#development') {
    setTimeout(scrollToSection, 300); // allow DOM to settle for initial load
  }
});

const activeFrequency = ref('monthly');



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
      isPopular: false,
      billingCycle: 'one-time'
    }
  });
};

const getMaintenancePrice = (plan: MaintenancePlan) => {
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
    planData.billingCycle = activeFrequency.value;
  } else {
    planData.billingCycle = 'project';
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
