<template>
  <section class="py-24 bg-bg-primary overflow-hidden">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header section (Branding Consistent) -->
      <div class="mb-14 text-center md:text-left max-w-3xl">
        <div
          class="inline-block px-3 py-1 bg-bg-secondary border border-border-color rounded-full text-[10px] font-black text-accent-primary mb-5 tracking-widest uppercase"
        >
          Rapid Solutions
        </div>
        <h2
          class="text-[clamp(1.75rem,5vw,2.75rem)] font-black text-text-primary leading-tight tracking-tight mb-4"
        >
          Micro-Services <span class="text-accent-primary">&</span> Add-ons
        </h2>
        <p
          class="text-text-secondary text-[0.95rem] md:text-[1rem] leading-relaxed max-w-xl"
        >
          Tambahkan fitur spesifik ke website Anda secara instan.
          <span class="text-text-primary font-bold"
            >Pilih "Custom Request" untuk rakitan bebas.</span
          >
        </p>
      </div>

      <div class="flex flex-col gap-6">
        <!-- Filter Tabs (Desktop - Above Everything) -->
        <div
          class="hidden lg:flex bg-bg-secondary p-1 rounded-2xl border border-border-color w-fit self-start"
          role="tablist"
          aria-label="Micro-services categories"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            role="tab"
            :aria-selected="activeTab === tab.id"
            :aria-label="`Filter by ${tab.label}`"
            class="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300"
            :class="
              activeTab === tab.id
                ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20'
                : 'text-text-tertiary hover:text-text-primary'
            "
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Main Row: Sticky Card + Carousel (Desktop Side-by-Side) -->
        <div class="flex flex-col lg:flex-row gap-6 lg:items-center">
          <!-- Sticky Card -->
          <div class="lg:w-[320px] shrink-0 relative min-h-[440px]">
            <button
              @click="showFoundation = !showFoundation"
              aria-label="Toggle between Custom Request and Foundation packages"
              class="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
              title="Switch View"
            >
              <ArrowLeftRight :size="18" />
            </button>

            <Transition name="card-flip" mode="out-in">
              <div
                v-if="!showFoundation"
                key="custom"
                class="p-7 bg-bg-secondary border border-border-color rounded-3xl flex flex-col justify-between relative overflow-hidden min-h-[440px]"
              >
                <div
                  class="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                ></div>

                <div class="relative z-10 mb-4">
                  <div
                    class="w-14 h-14 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary mb-4 border border-accent-primary/20"
                  >
                    <Wrench :size="28" stroke-width="1.5" />
                  </div>
                  <h3
                    class="text-3xl font-black text-text-primary mb-2 leading-tight tracking-tight"
                  >
                    Custom<br />Req.
                  </h3>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    Perbaikan spesifik atau fitur custom.
                  </p>
                </div>

                <button
                  @click="router.push('/order?type=fitur-rakitan')"
                  class="flex-1 group/btn p-6 bg-bg-primary border border-border-color rounded-2xl hover:border-accent-primary/40 transition-all text-left flex flex-col justify-between"
                >
                  <div class="flex flex-col h-full">
                    <div class="flex items-center justify-between mb-4">
                      <span
                        class="text-base font-black text-text-primary group-hover/btn:text-accent-primary transition-colors"
                      >
                        Ad-hoc Maintenance
                      </span>
                      <div
                        class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0"
                      >
                        <Zap :size="16" />
                      </div>
                    </div>

                    <p
                      class="text-[0.7rem] text-text-tertiary leading-relaxed mb-6"
                    >
                      Gunakan ini untuk perbaikan bug, edit konten, atau
                      penambahan fitur yang tidak ada di paket.
                    </p>

                    <div class="flex items-center justify-between mt-auto">
                      <div class="flex flex-col">
                        <span
                          class="text-[9px] font-black text-text-tertiary uppercase tracking-widest mb-0.5"
                          >Metode</span
                        >
                        <span
                          class="text-xl font-bold text-accent-primary uppercase"
                          >Rakit Bebas</span
                        >
                      </div>
                      <div
                        class="w-9 h-9 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg shadow-accent-primary/20 group-hover/btn:scale-110 transition-transform"
                      >
                        <ArrowRight :size="16" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div
                v-else
                key="foundation"
                class="p-7 bg-bg-secondary border border-border-color rounded-3xl flex flex-col justify-between relative overflow-hidden min-h-[440px]"
              >
                <div
                  class="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                ></div>

                <div class="relative z-10">
                  <div
                    class="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 border border-amber-500/20"
                  >
                    <Layers :size="28" stroke-width="1.5" />
                  </div>
                  <h3
                    class="text-3xl font-black text-text-primary mb-3 leading-tight tracking-tight"
                  >
                    Core<br />Foundation
                  </h3>
                  <p class="text-text-secondary text-sm mb-6 leading-relaxed">
                    Paket pondasi untuk memulai dari nol.
                  </p>
                </div>

                <div class="relative flex-1 flex flex-col">
                  <Transition name="slide-fade" mode="out-in">
                    <div
                      v-if="currentFoundation"
                      :key="currentFoundation.id"
                      class="flex-1 flex flex-col"
                    >
                      <button
                        @click="
                          router.push(`/order?type=${currentFoundation.id}`)
                        "
                        class="flex-1 group/btn p-6 bg-bg-primary border border-border-color rounded-2xl hover:border-amber-500/40 transition-all text-left flex flex-col justify-between"
                      >
                        <div class="flex flex-col h-full">
                          <div class="flex items-center justify-between mb-4">
                            <div class="flex flex-col">
                              <span
                                class="text-base font-black text-text-primary group-hover/btn:text-amber-500 transition-colors"
                              >
                                {{ currentFoundation.name }}
                              </span>
                              <!-- Slide Indicators -->
                              <div class="flex gap-1 mt-1">
                                <div
                                  v-for="(_, i) in foundationPackages"
                                  :key="i"
                                  class="h-1 rounded-full transition-all duration-300"
                                  :class="
                                    activeFoundationIndex === i
                                      ? 'w-4 bg-amber-500'
                                      : 'w-1 bg-border-color'
                                  "
                                ></div>
                              </div>
                            </div>

                            <div class="flex gap-1">
                              <button
                                @click.stop="prevFoundation"
                                aria-label="Previous foundation package"
                                class="w-7 h-7 rounded-lg border border-border-color flex items-center justify-center text-text-tertiary hover:bg-bg-secondary hover:text-amber-500 transition-all active:scale-90"
                              >
                                <ChevronLeft :size="14" />
                              </button>
                              <button
                                @click.stop="nextFoundation"
                                aria-label="Next foundation package"
                                class="w-7 h-7 rounded-lg border border-border-color flex items-center justify-center text-text-tertiary hover:bg-bg-secondary hover:text-amber-500 transition-all active:scale-90"
                              >
                                <ChevronRight :size="14" />
                              </button>
                            </div>
                          </div>

                          <p
                            class="text-[0.7rem] text-text-tertiary leading-relaxed mb-6"
                          >
                            {{ currentFoundation.desc }}
                          </p>

                          <div
                            class="flex items-center justify-between mt-auto"
                          >
                            <div class="flex flex-col">
                              <span
                                class="text-[9px] font-black text-text-tertiary uppercase tracking-widest mb-0.5"
                                >Mulai Dari</span
                              >
                              <span class="text-xl font-bold text-amber-500">{{
                                formatPrice(currentFoundation.basePrice)
                              }}</span>
                            </div>
                            <div
                              class="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover/btn:scale-110 transition-transform"
                            >
                              <ArrowRight :size="16" />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </Transition>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Filter Tabs (Mobile - Below Sticky Card) -->
          <div
            class="flex bg-bg-secondary p-1 rounded-2xl border border-border-color lg:hidden"
            role="tablist"
            aria-label="Micro-services categories mobile"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              role="tab"
              :aria-selected="activeTab === tab.id"
              :aria-label="`Filter by ${tab.label}`"
              class="flex-1 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
              :class="
                activeTab === tab.id
                  ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20'
                  : 'text-text-tertiary hover:text-text-primary'
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Carousel Container (Right Side on Desktop) -->
          <div class="flex-1 relative overflow-hidden mask-fade-sides">
            <div
              class="flex gap-5 animate-marquee-fast hover:pause-animation w-fit py-4"
            >
              <div
                v-for="(item, idx) in carouselData"
                :key="`${item?.id}-${idx}`"
                @click="handleItemClick(item)"
                class="w-[280px] md:w-[310px] shrink-0 group/card p-7 bg-bg-secondary border border-border-color rounded-[32px] hover:border-accent-primary/40 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between relative overflow-hidden min-h-[440px] shadow-sm cursor-pointer"
              >
                <div
                  class="absolute inset-0 bg-linear-to-br from-transparent to-accent-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="relative z-10">
                  <div class="flex justify-between items-start mb-6">
                    <div
                      class="w-12 h-12 bg-bg-primary rounded-xl flex items-center justify-center text-accent-primary border border-border-color group-hover/card:bg-accent-primary group-hover/card:text-white transition-all duration-500 shadow-sm"
                    >
                      <component
                        :is="item?.icon"
                        :size="24"
                        stroke-width="1.5"
                      />
                    </div>
                    <div class="flex flex-col items-end gap-1.5">
                      <span
                        class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border"
                        :class="
                          isBundle(item)
                            ? 'bg-amber-400/10 text-amber-500 border-amber-500/20'
                            : 'bg-accent-primary/10 text-accent-primary border-accent-primary/20'
                        "
                      >
                        {{ isBundle(item) ? "Package" : "Add-on" }}
                      </span>
                      <div
                        class="flex items-center gap-1.5 text-[9px] font-bold text-text-tertiary"
                      >
                        <Clock :size="10" /> {{ item?.deliveryTime }}
                      </div>
                    </div>
                  </div>

                  <h3
                    class="text-xl md:text-2xl font-black text-text-primary mb-4 leading-tight group-hover/card:text-accent-primary transition-colors"
                  >
                    {{ item?.name }}
                  </h3>
                  <p
                    class="text-[0.95rem] text-text-secondary leading-relaxed mb-8 line-clamp-4"
                  >
                    {{ item?.desc }}
                  </p>

                  <div class="space-y-2 mb-6">
                    <div
                      class="flex items-center gap-2 text-[11px] font-bold text-text-tertiary uppercase tracking-wider"
                    >
                      <Clock :size="14" class="text-accent-primary" />
                      Est. Kerja: {{ item?.deliveryTime }}
                    </div>
                    <div
                      v-if="isBundle(item)"
                      class="flex items-center gap-2 text-[11px] font-bold text-text-tertiary uppercase tracking-wider"
                    >
                      <Zap :size="14" class="text-accent-primary" />
                      Full Foundation & Support
                    </div>
                    <div
                      v-else
                      class="flex items-center gap-2 text-[11px] font-bold text-text-tertiary uppercase tracking-wider"
                    >
                      <Zap :size="14" class="text-accent-primary" />
                      Instant Activation / Setup
                    </div>
                  </div>
                </div>

                <!-- Price Only (No Button) -->
                <div
                  class="relative z-10 pt-6 border-t border-border-color mt-auto bg-bg-secondary/80 backdrop-blur-sm"
                >
                  <span
                    class="text-xl md:text-2xl font-bold text-text-primary leading-none block"
                  >
                    {{ formatPrice(getItemPrice(item)) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  pricingService,
  type Feature,
  type ProjectType,
} from "../../../services/pricingService";
import {
  Clock,
  ArrowRight,
  Wrench,
  Zap,
  Layers,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";

const router = useRouter();

const tabs = [
  { id: "all", label: "Semua" },
  { id: "bundles", label: "Paket Bisnis" },
  { id: "features", label: "Fitur Instan" },
];

const activeTab = ref("all");
const showFoundation = ref(false);
const activeFoundationIndex = ref(0);
const features = ref<Feature[]>([]);
const projectTypes = ref<ProjectType[]>([]);

onMounted(async () => {
  const [feats, projs] = await Promise.all([
    pricingService.getAllFeatures(),
    pricingService.getAllProjectTypes(),
  ]);
  features.value = feats;
  projectTypes.value = projs;
});

const isBundle = (item: any) => item && "serviceId" in item;

const filteredItems = computed(() => {
  const bundles = (projectTypes.value || []).filter(
    (p) => !p.id.startsWith("foundation-") && p.id !== "fitur-rakitan",
  );
  const featureList = features.value; // Use dynamic features

  if (activeTab.value === "bundles") return bundles;
  if (activeTab.value === "features") return featureList;

  const result = [];
  const max = Math.max(bundles.length, featureList.length);
  for (let i = 0; i < max; i++) {
    if (bundles[i]) result.push(bundles[i]);
    if (featureList[i]) result.push(featureList[i]);
  }
  return result;
});

const carouselData = computed(() => {
  return [
    ...filteredItems.value,
    ...filteredItems.value,
    ...filteredItems.value,
  ];
});

const animationDuration = computed(() => {
  const baseSpeed = 40;
  const itemCount = filteredItems.value.length;
  // Handling empty list to avoid NaN if useful, though itemCount 0 is fine
  return Math.max(60, (itemCount / 10) * baseSpeed);
});

const durationString = computed(() => `${animationDuration.value}s`);

const handleItemClick = (item: any) => {
  if (isBundle(item)) {
    router.push(`/order?type=${item.id}`);
  } else {
    router.push(`/order?type=fitur-rakitan&addFeature=${item.id}`);
  }
};

const getItemPrice = (item: any) => {
  if (!item) return 0;
  return isBundle(item) ? item.basePrice : item.price || 0;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.round(price));

const foundationPackages = computed(() =>
  (projectTypes.value || []).filter((p) => p.id.startsWith("foundation-")),
);

const currentFoundation = computed(
  () =>
    foundationPackages.value[activeFoundationIndex.value] ||
    foundationPackages.value[0],
);

const nextFoundation = () => {
  activeFoundationIndex.value =
    (activeFoundationIndex.value + 1) % foundationPackages.value.length;
};

const prevFoundation = () => {
  activeFoundationIndex.value =
    (activeFoundationIndex.value - 1 + foundationPackages.value.length) %
    foundationPackages.value.length;
};
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-33.333% - 6.66px));
  }
}

.animate-marquee-fast {
  animation: marquee v-bind(durationString) linear infinite;
  display: flex;
}

.pause-animation:hover {
  animation-play-state: paused;
}

.mask-fade-sides {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.card-flip-enter-active,
.card-flip-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-flip-enter-from {
  opacity: 0;
  transform: rotateY(90deg) scale(0.9);
}

.card-flip-leave-to {
  opacity: 0;
  transform: rotateY(-90deg) scale(0.9);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
