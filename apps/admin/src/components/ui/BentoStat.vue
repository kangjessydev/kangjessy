<template>
  <div
    class="stat-card group relative bg-white/80 backdrop-blur-xl border border-slate-100 uppercase"
    :class="{
      'lg:cursor-default cursor-pointer active:scale-[0.98] transition-transform':
        tooltip,
    }"
    @click="handleCardTap"
  >
    <!-- Overflow Clip for Decorative elements only -->
    <div
      class="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none"
    >
      <div
        class="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        :class="glowClasses"
      ></div>
    </div>

    <!-- Desktop Tooltip Trigger (hover only) -->
    <div v-if="tooltip" class="absolute top-4 right-4 z-50 hidden lg:block">
      <div class="relative flex items-center group/tooltip">
        <Info
          :size="14"
          class="text-slate-200 hover:text-[#702DFF] transition-colors cursor-help"
        />

        <!-- Desktop Tooltip (hover) -->
        <div
          class="pointer-events-none absolute bottom-full right-0 mb-3 w-64 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 translate-y-2 group-hover/tooltip:translate-y-0"
        >
          <div
            class="bg-[#1B2559]/95 backdrop-blur-xl text-white p-5 rounded-[24px] shadow-2xl border border-white/10 ring-1 ring-black/5"
          >
            <div class="flex items-center gap-2 mb-2 text-[#702DFF]">
              <Zap :size="12" />
              <span class="text-[9px] font-black uppercase tracking-widest"
                >Guide & Simulation</span
              >
            </div>
            <p
              class="text-[11px] font-bold leading-relaxed text-slate-200 border-b border-white/5 pb-3 mb-3 lowercase first-letter:uppercase"
            >
              {{ tooltip }}
            </p>
            <div v-if="simulation" class="space-y-2">
              <div
                class="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400"
              >
                <span>Scenario Simulation</span>
                <span class="text-[#702DFF]">ACTIVE</span>
              </div>
              <p
                class="text-[10px] font-medium text-slate-400 italic lowercase first-letter:uppercase"
              >
                {{ simulation }}
              </p>
            </div>
          </div>
          <!-- Tooltip Arrow -->
          <div
            class="absolute top-full right-1 -mt-1 border-8 border-transparent border-t-[#1B2559]/95"
          ></div>
        </div>
      </div>
    </div>

    <div :class="['stat-icon', variantClasses]">
      <component :is="icon" :size="24" />
    </div>
    <div class="flex-1 min-w-0">
      <p
        class="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5 truncate"
      >
        {{ title }}
      </p>
      <div class="flex items-baseline gap-1.5 overflow-hidden">
        <p
          class="text-xl md:text-2xl font-black text-[#1B2559] leading-tight tracking-tighter whitespace-nowrap truncate"
        >
          {{ isCurrency ? formatCompact(Number(value)) : value }}
        </p>
        <span
          v-if="unit"
          class="text-[10px] font-black text-slate-300 uppercase leading-none shrink-0"
        >
          {{ unit }}
        </span>
      </div>
    </div>

    <!-- Mobile hint indicator -->
    <div
      v-if="tooltip"
      class="lg:hidden absolute bottom-2 right-3 text-slate-200"
    >
      <Info :size="10" />
    </div>
  </div>

  <!-- Mobile Modal (centered) -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showMobileTooltip"
        class="lg:hidden fixed inset-0 z-[200] flex items-center justify-center p-6"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="showMobileTooltip = false"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-[#1B2559] text-white p-6 rounded-[28px] shadow-2xl border border-white/10 w-full max-w-sm animate-scale-in"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  variantClasses,
                ]"
              >
                <component :is="icon" :size="20" />
              </div>
              <div>
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  {{ title }}
                </p>
                <p class="text-lg font-black text-white">
                  {{ isCurrency ? formatCompact(Number(value)) : value }}
                  <span v-if="unit" class="text-xs text-slate-400">{{
                    unit
                  }}</span>
                </p>
              </div>
            </div>
            <button
              @click="showMobileTooltip = false"
              class="text-slate-400 hover:text-white p-2 -mr-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X :size="20" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex items-center gap-2 text-[#702DFF] mb-2">
                <Zap :size="12" />
                <span class="text-[9px] font-black uppercase tracking-widest"
                  >Penjelasan</span
                >
              </div>
              <p
                class="text-[13px] font-medium leading-relaxed text-slate-300 lowercase first-letter:uppercase"
              >
                {{ tooltip }}
              </p>
            </div>

            <div v-if="simulation" class="pt-4 border-t border-white/10">
              <div class="flex items-center gap-2 text-amber-400 mb-2">
                <Zap :size="12" />
                <span class="text-[9px] font-black uppercase tracking-widest"
                  >Simulasi Bisnis</span
                >
              </div>
              <p
                class="text-[12px] font-medium text-slate-400 italic lowercase first-letter:uppercase"
              >
                {{ simulation }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Info, Zap, X } from "lucide-vue-next";

const showMobileTooltip = ref(false);

export type BentoVariant =
  | "primary"
  | "blue"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface Props {
  title: string;
  value: string | number;
  icon: any;
  variant?: BentoVariant;
  unit?: string;
  isCurrency?: boolean;
  tooltip?: string;
  simulation?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  unit: "",
  isCurrency: false,
  tooltip: "",
  simulation: "",
});

const variantClasses = computed(() => {
  const map: Record<BentoVariant, string> = {
    primary: "bg-[#702DFF]/10 text-[#702DFF]",
    blue: "bg-blue-50 text-blue-600",
    info: "bg-cyan-50 text-cyan-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-rose-50 text-rose-600",
  };
  return map[props.variant];
});

const glowClasses = computed(() => {
  const map: Record<BentoVariant, string> = {
    primary: "bg-[#702DFF]/20",
    blue: "bg-blue-500/20",
    info: "bg-cyan-500/20",
    success: "bg-emerald-500/20",
    warning: "bg-amber-500/20",
    danger: "bg-rose-500/20",
  };
  return map[props.variant];
});

function formatCompact(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  } as any).format(val);
}

// Handle card tap - only show modal on mobile
function handleCardTap() {
  if (!props.tooltip) return;
  // Check if mobile (lg breakpoint = 1024px)
  if (window.innerWidth < 1024) {
    showMobileTooltip.value = true;
  }
}
</script>
