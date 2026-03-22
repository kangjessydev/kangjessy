<template>
  <section id="services" class="bg-bg-primary" :class="[paddingClass]">
    <div class="container mx-auto px-4" :class="containerClass">
      <SectionHeader v-if="showHeader" :title="title" :subtitle="subtitle">
        <template #title>
          <slot name="title">
            <span v-html="formattedTitle"></span>
          </slot>
        </template>
      </SectionHeader>

      <!-- Desktop View -->
      <div class="hidden md:grid grid-cols-12 gap-6">
        <ServiceCard
          v-for="(service, index) in sortedServices"
          :key="service.id"
          :service="service"
          :project-types="projectTypes"
          :available-features="features"
          :custom-class="getGridClass(index) + ' min-h-[400px]'"
        />
      </div>

      <!-- Mobile View (Slider) -->
      <div class="md:hidden">
        <div class="flex justify-end gap-2.5 mb-4">
          <button
            @click="scrollSlider('prev')"
            aria-label="Previous service"
            class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
          >
            <ChevronLeftIcon :size="20" />
          </button>
          <button
            @click="scrollSlider('next')"
            aria-label="Next service"
            class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
          >
            <ChevronRightIcon :size="20" />
          </button>
        </div>

        <div
          ref="sliderRef"
          @scroll="handleScroll"
          class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-5 no-scrollbar mx-[-20px] px-5"
        >
          <ServiceCard
            v-for="service in sortedServices"
            :key="'mob-' + service.id"
            :service="service"
            :project-types="projectTypes"
            :available-features="features"
            custom-class="snap-center shrink-0 w-[calc(100%-20px)] shadow-lg"
          />
        </div>

        <div class="flex justify-center gap-2 mt-2.5">
          <span
            v-for="(_, i) in sortedServices"
            :key="i"
            class="h-2 rounded-full transition-all duration-300"
            :class="[
              currentSlide === i
                ? 'w-6 bg-accent-primary'
                : 'w-2 bg-border-color',
            ]"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import SectionHeader from "../../ui/SectionHeader.vue";
import ServiceCard from "../../ui/ServiceCard.vue";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "lucide-vue-next";
import {
  pricingService,
  type ServiceData,
  type ProjectType,
  type Feature,
} from "../../../services/pricingService";

const props = defineProps({
  title: {
    type: String,
    default: "Pilih Solusi yang Kamu Butuhin",
  },
  subtitle: {
    type: String,
    default:
      'Gak ada solusi yang "one size fits all". Saya bangun sistem yang emang dirancang khusus buat nyelesein masalah unik di bisnis kamu.',
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  paddingClass: {
    type: String,
    default: "py-16 md:py-32",
  },
  containerClass: {
    type: String,
    default: "",
  },
});

const currentSlide = ref(0);
const sliderRef = ref<HTMLElement | null>(null);
const services = ref<ServiceData[]>([]);
const projectTypes = ref<ProjectType[]>([]);
const features = ref<Feature[]>([]);

onMounted(async () => {
  const [svcs, projs, feats] = await Promise.all([
    pricingService.getAllServices(),
    pricingService.getAllProjectTypes(),
    pricingService.getAllFeatures(),
  ]);
  services.value = svcs;
  projectTypes.value = projs;
  features.value = feats;
});

const formattedTitle = computed(() => {
  return props.title.replace(
    "Spesifik",
    '<span class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Spesifik</span>',
  );
});

const sortedServices = computed(() => {
  return (services.value || []).sort(
    (a, b) => (a.order || 99) - (b.order || 99),
  );
});

const getGridClass = (index: number) => {
  const pattern = [
    "col-span-12 md:col-span-7",
    "col-span-12 md:col-span-5",
    "col-span-12 md:col-span-5",
    "col-span-12 md:col-span-7",
  ];
  return pattern[index % pattern.length];
};

// SLIDER LOGIC
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const scrollLeft = target.scrollLeft;
  const clientWidth = target.clientWidth; // Less likely to cause forced reflow than offsetWidth on children during transition
  if (clientWidth > 0) {
    currentSlide.value = Math.round(scrollLeft / (clientWidth - 20)); // Approx width based on w-[calc(100%-20px)]
  }
};

const scrollSlider = (direction: "next" | "prev") => {
  if (!sliderRef.value) return;
  const items = sliderRef.value.querySelectorAll(".snap-center");
  if (items.length === 0) return;

  const itemWidth = (items[0] as HTMLElement).offsetWidth + 16;
  const totalSlides = sortedServices.value.length;

  if (direction === "next") {
    if (currentSlide.value >= totalSlides - 1) {
      sliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      sliderRef.value.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  } else {
    if (currentSlide.value <= 0) {
      sliderRef.value.scrollTo({
        left: itemWidth * (totalSlides - 1),
        behavior: "smooth",
      });
    } else {
      sliderRef.value.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  }
};
</script>
