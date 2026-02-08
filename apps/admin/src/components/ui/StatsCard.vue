<template>
  <div class="stat-card group relative">
    <!-- Overflow Clip for Decorative elements only -->
    <div
      class="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none"
    >
      <div
        class="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>
    </div>
    <!-- Tooltip Trigger (Desktop Only) -->
    <div v-if="tooltip" class="absolute top-4 right-4 z-50 hidden lg:block">
      <div class="relative flex items-center group/tooltip">
        <Info
          :size="14"
          class="text-slate-200 hover:text-[#702DFF] transition-colors cursor-help"
        />

        <!-- Premium Tooltip -->
        <div
          class="pointer-events-none absolute bottom-full right-0 mb-3 w-64 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 translate-y-2 group-hover/tooltip:translate-y-0"
        >
          <div
            class="bg-[#1B2559]/95 backdrop-blur-xl text-white p-5 rounded-[24px] shadow-2xl border border-white/10 ring-1 ring-black/5"
          >
            <div class="flex items-center gap-2 mb-2 text-[#702DFF]">
              <Zap :size="12" />
              <span class="text-[9px] font-black uppercase tracking-widest"
                >Intelligence Guide</span
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
                <span>Business Scenario</span>
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

    <div :class="['stat-icon', colorClass]">
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
  </div>
</template>

<script setup lang="ts">
import { Info, Zap } from "lucide-vue-next";

interface Props {
  title: string;
  value: string | number;
  icon: any;
  colorClass?: string;
  unit?: string;
  isCurrency?: boolean;
  tooltip?: string;
  simulation?: string;
}

const props = withDefaults(defineProps<Props>(), {
  colorClass: "bg-indigo-50 text-indigo-600",
  unit: "",
  isCurrency: false,
  tooltip: "",
  simulation: "",
});

function formatCompact(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  } as any).format(val);
}
</script>
