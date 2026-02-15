<template>
  <div
    class="bg-bg-secondary border rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-[border-color,background-color,box-shadow] duration-500 relative h-full group overflow-hidden"
    :class="[
      service.isFeatured
        ? 'border-accent-primary/50 shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] bg-bg-secondary/80 backdrop-blur-sm'
        : 'border-border-color hover:border-accent-primary/30',
      { 'opacity-80': service.status === 'coming-soon' },
      customClass,
    ]"
  >
    <!-- Background Decorative Icon -->
    <div
      class="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"
    >
      <component :is="getIcon(service.icon)" :size="200" />
    </div>

    <div class="flex justify-between items-center mb-6 sm:mb-10 relative z-10">
      <div
        class="w-14 h-14 bg-accent-primary/10 border border-accent-primary/20 rounded-2xl flex items-center justify-center text-accent-primary shadow-lg shadow-accent-primary/5"
      >
        <component :is="getIcon(service.icon)" :size="28" />
      </div>
      <div class="flex flex-col items-end gap-1">
        <span
          class="text-[clamp(0.6rem,1.5vw,0.7rem)] font-black uppercase bg-white/5 border border-white/5 px-4 py-1.5 rounded-full tracking-[1px] text-text-tertiary"
          :class="{
            'bg-accent-primary! text-white! border-accent-primary!':
              service.isFeatured,
          }"
        >
          {{
            service.status === "coming-soon"
              ? "Coming Soon"
              : service.badge || "Professional Solution"
          }}
        </span>
      </div>
    </div>

    <div class="flex-1 relative z-10">
      <h3
        class="text-[clamp(1.75rem,3vw,2rem)] font-black mb-4 text-text-primary leading-[1.15] tracking-tight"
      >
        {{ service.title }}
      </h3>
      <p
        class="text-[clamp(0.9rem,1.5vw,1.05rem)] text-text-secondary leading-relaxed mb-6 sm:mb-10 max-w-[90%] opacity-80"
      >
        {{ service.tagline }}
      </p>

      <!-- Features List -->
      <div
        v-if="service.included"
        class="space-y-4"
        :class="{ 'opacity-50 grayscale': service.status === 'coming-soon' }"
      >
        <div
          v-for="f in service.included.slice(0, 4)"
          :key="f"
          class="flex items-center gap-3.5 text-[clamp(0.85rem,1.5vw,0.9rem)] text-text-secondary font-medium"
        >
          <div
            class="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            :class="
              service.isFeatured
                ? 'bg-accent-primary text-white'
                : 'bg-accent-primary/10 text-accent-primary'
            "
          >
            <CheckIcon :size="12" />
          </div>
          <span>{{ f }}</span>
        </div>
      </div>
    </div>

    <div
      class="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10"
    >
      <div class="flex flex-col gap-1.5">
        <span
          class="text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold uppercase text-text-secondary opacity-60 tracking-[0.2em]"
        >
          {{ service.status === "coming-soon" ? "Status" : "Investasi Mulai" }}
        </span>

        <!-- Pricing Container -->
        <div
          class="flex items-center gap-2 relative group/price cursor-default"
        >
          <!-- Main Price Only (Clean Look) -->
          <span
            class="text-[clamp(1.5rem,3vw,1.75rem)] font-black text-text-primary tracking-tight transition-colors group-hover/price:text-white"
          >
            {{ formatCurrency(pricing.display) }}
          </span>

          <!-- Hot Deal Flame Icon -->
          <div
            v-if="
              pricing.original &&
              pricing.original > pricing.display &&
              service.status !== 'coming-soon'
            "
            class="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-500/80 transition-all duration-500 group-hover/price:bg-amber-500 group-hover/price:text-white group-hover/price:shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover/price:scale-110"
          >
            <Flame
              :size="18"
              class="transition-transform duration-700 group-hover/price:animate-pulse"
              stroke-width="2.5"
            />

            <!-- Tooltip/Badge text (Visible on mobile, hover on desktop) -->
            <div
              class="absolute bottom-full left-0 mb-3 px-3 py-1.5 bg-amber-500 text-black text-[0.65rem] font-black uppercase tracking-wider rounded-lg shadow-xl z-20 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover/price:opacity-100 md:group-hover/price:translate-y-0 whitespace-nowrap pointer-events-none"
            >
              Promo Hari Ini
              <div
                class="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-amber-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <BaseButton
        :to="service.status === 'coming-soon' ? '#' : `/service/${service.id}`"
        :variant="getButtonVariant(service)"
        size="lg"
        :disabled="service.status === 'coming-soon'"
        class="w-full sm:w-auto rounded-xl! px-8! group/btn"
        :class="{
          'opacity-70 cursor-not-allowed': service.status === 'coming-soon',
        }"
      >
        <span
          :class="
            service.status === 'coming-soon'
              ? 'text-text-primary font-bold'
              : 'text-white font-bold tracking-wide'
          "
        >
          {{
            service.status === "coming-soon" ? "Coming Soon" : "Lihat Solusi"
          }}
        </span>
        <ArrowRightIcon
          :size="18"
          v-if="service.status !== 'coming-soon'"
          class="ml-2 text-white transition-transform group-hover/btn:translate-x-1"
        />
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  Brain as BrainIcon,
  Zap as ZapIcon,
  Cpu as CpuIcon,
  Monitor as MonitorIcon,
  Check as CheckIcon,
  Settings as SettingsIcon,
  ArrowRight as ArrowRightIcon,
  ShoppingCart as CartIcon,
  Flame,
  Layers as LayersIcon,
  Rocket as RocketIcon,
} from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import type { ServiceData, ProjectType } from "../../services/pricingService";

export default defineComponent({
  name: "ServiceCard",
  components: {
    BaseButton,
    CheckIcon,
    ArrowRightIcon,
    Flame,
  },
  props: {
    service: {
      type: Object as () => ServiceData,
      required: true,
    },
    projectTypes: {
      type: Array as () => ProjectType[],
      default: () => [],
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // AUTOMATED PRICING LOGIC
    // Finds the lowest starting price from available packages
    const pricing = computed(() => {
      if (props.service.status === "coming-soon") {
        return { display: 0, original: null };
      }

      // 1. Get packages for this service
      // CRITICAL FIX: Ignore basePrice 0 (like maintenance/placeholder) to avoid "Segera Hadir"
      const relatedPackages = (props.projectTypes || []).filter(
        (p) => p.serviceId === props.service.id && p.basePrice > 0,
      );

      // 2. If no packages, fallback to manual price in service data
      if (relatedPackages.length === 0) {
        return {
          display: props.service.price || 0,
          original: props.service.originalPrice || null,
        };
      }

      // 3. Sort by Base Price (Ascending)
      const sortedByPrice = [...relatedPackages].sort(
        (a, b) => a.basePrice - b.basePrice,
      );
      const cheapest = sortedByPrice[0];

      if (!cheapest) {
        return { display: 0, original: null };
      }

      return {
        display: cheapest.basePrice,
        original: cheapest.originalPrice || null,
      };
    });

    const getIcon = (iconName: string) => {
      const icons: Record<string, any> = {
        Brain: BrainIcon,
        Zap: ZapIcon,
        Cpu: CpuIcon,
        Monitor: MonitorIcon,
        Settings: SettingsIcon,
        ShoppingCart: CartIcon,
        Layers: LayersIcon,
        Rocket: RocketIcon,
      };
      return icons[iconName] || SettingsIcon;
    };

    const formatCurrency = (val: number) => {
      if (val === 0) return "Segera Hadir";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(val);
    };

    const getButtonVariant = (service: ServiceData) => {
      if (service.status === "coming-soon") return "secondary";
      if (service.isFeatured) return "primary";
      return "outline";
    };

    return {
      getIcon,
      pricing, // Expose computed pricing
      getButtonVariant,
      formatCurrency,
    };
  },
});
</script>
