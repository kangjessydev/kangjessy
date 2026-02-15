<template>
  <div :class="collapsed ? 'w-full flex justify-center' : ''">
    <!-- Main Link / Accordion Trigger -->
    <component
      :is="item.children ? 'div' : 'router-link'"
      :to="!item.children ? item.path : undefined"
      @click="item.children ? $emit('toggle-expand', item.path) : undefined"
      class="relative flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 group/item cursor-pointer select-none mb-1"
      :class="[
        active && !item.children
          ? 'bg-linear-to-r from-[#1B2559] to-[#4338ca] text-white shadow-[0_8px_16px_-4px_rgba(27,37,89,0.3)]'
          : 'text-slate-500 hover:bg-slate-50 hover:text-[#1B2559]',
        collapsed
          ? 'justify-center px-0! w-10 h-10 aspect-square'
          : 'justify-between',
        item.children && expanded ? 'bg-indigo-50/40 text-[#1B2559]' : '',
      ]"
    >
      <div class="flex items-center gap-3">
        <!-- Icon -->
        <component
          :is="item.icon"
          :size="18"
          :class="
            active && !item.children
              ? 'text-white'
              : 'text-slate-400 group-hover/item:text-[#702DFF]'
          "
          class="transition-all duration-300 shrink-0 group-hover/item:scale-110"
        />

        <!-- Label -->
        <span
          v-if="!collapsed"
          class="text-[13px] font-bold tracking-tight truncate transition-colors"
          >{{ item.label }}</span
        >
      </div>

      <!-- Chevron for Submenu -->
      <ChevronDown
        v-if="item.children && !collapsed"
        :size="14"
        class="text-slate-400 transition-transform duration-300 ease-out"
        :class="expanded ? 'rotate-180' : ''"
      />

      <!-- Active Indicator Dot for Single Item -->
      <div
        v-if="active && !item.children && !collapsed"
        class="absolute -left-1 w-1 h-6 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
      ></div>

      <!-- Tooltip for Collapsed State -->
      <div
        v-if="collapsed"
        class="absolute left-full ml-4 px-4 py-2 bg-[#1B2559] text-white text-xs font-bold rounded-xl opacity-0 translate-x-3 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all z-100 whitespace-nowrap shadow-xl border border-white/10"
      >
        <div
          class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1B2559] rotate-45 border-l border-b border-white/10"
        ></div>
        {{ item.label }}
      </div>
    </component>

    <!-- Submenu Children -->
    <transition
      enter-active-class="transition-all duration-300 ease-out overflow-hidden"
      enter-from-class="max-h-0 opacity-0 transform -translate-y-2"
      enter-to-class="max-h-[500px] opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in overflow-hidden"
      leave-from-class="max-h-[500px] opacity-100 transform translate-y-0"
      leave-to-class="max-h-0 opacity-0 transform -translate-y-2"
    >
      <div
        v-if="item.children && expanded && !collapsed"
        class="ml-[1.65rem] border-l-2 border-slate-100/60 pl-2 space-y-0.5 my-1"
      >
        <router-link
          v-for="child in item.children"
          :key="child.path"
          :to="child.path"
          class="relative flex items-center gap-3 py-2 pr-4 pl-4 text-[11px] font-bold transition-all rounded-xl group/child"
          :class="
            isChildActive(child.path)
              ? 'bg-indigo-50/50 text-[#702DFF]'
              : 'text-slate-400 hover:text-[#1B2559] hover:bg-slate-50'
          "
        >
          <!-- Branch Line (L-shape part) -->
          <div 
            class="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-slate-100 group-hover/child:bg-slate-200 transition-colors"
            :class="isChildActive(child.path) ? 'bg-indigo-100' : ''"
          ></div>

          <!-- Dot / Bullet -->
          <div
            class="w-1 h-1 rounded-full shrink-0 transition-all duration-300"
            :class="
              isChildActive(child.path)
                ? 'bg-[#702DFF] scale-150 shadow-[0_0_8px_#702DFF]'
                : 'bg-slate-300 group-hover/child:bg-slate-400 group-hover/child:scale-125'
            "
          ></div>

          <span class="truncate tracking-wide">{{ child.label }}</span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { useRoute } from "vue-router";
import type { MenuItem } from "../../config/navigation";

const props = defineProps<{
  item: MenuItem;
  collapsed: boolean;
  active: boolean;
  expanded: boolean;
}>();

defineEmits(["toggle-expand"]);

const route = useRoute();

const isChildActive = (path: string) => {
  if (path === "/blog") {
    return (
      route.path === "/blog" ||
      (route.path.startsWith("/blog/") &&
        !route.path.includes("/categories") &&
        !route.path.includes("/tags"))
    );
  }
  if (path === "/portfolio") {
    return (
      route.path === "/portfolio" ||
      (route.path.startsWith("/portfolio/") &&
        !route.path.includes("/areas") &&
        !route.path.includes("/tech") &&
        !route.path.includes("/new") &&
        !route.path.endsWith("/edit"))
    );
  }
  return route.path.startsWith(path);
};
</script>
