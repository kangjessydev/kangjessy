<template>
  <aside
    class="sidebar bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ease-in-out z-[100]"
    :class="[
      effectiveCollapsed ? 'collapsed' : '',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Brand -->
    <div
      class="flex items-center shrink-0 transition-all duration-300 px-6"
      :class="effectiveCollapsed ? 'h-16 justify-center px-2!' : 'h-20 mb-2'"
    >
      <router-link
        to="/"
        class="flex items-center gap-3 w-full"
        :class="effectiveCollapsed ? 'justify-center' : ''"
      >
        <div
          class="w-10 h-10 bg-linear-to-br from-[#1B2559] to-[#702DFF] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 text-white font-black text-lg transition-all duration-300 overflow-hidden"
        >
          <img
            v-if="branding.logo"
            :src="branding.logo"
            class="w-full h-full object-contain p-1.5"
          />
          <span v-else>{{ branding.name.substring(0, 2).toUpperCase() }}</span>
        </div>
        <div
          v-if="!effectiveCollapsed"
          class="whitespace-nowrap overflow-hidden"
        >
          <h1
            class="text-sm font-black text-[#1B2559] leading-tight uppercase tracking-tight"
          >
            {{ branding.name.split(" ")[0] }}
            <span
              v-if="branding.name.split(' ').length > 1"
              class="text-indigo-400"
            >
              {{ branding.name.split(" ").slice(1).join(" ") }}
            </span>
          </h1>
          <p
            class="text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em]"
          >
            Agency Admin
          </p>
        </div>
      </router-link>
    </div>

    <!-- Navigation Groups -->
    <nav
      class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar transition-all duration-300 pb-12"
      :class="
        effectiveCollapsed ? 'space-y-4 py-4 px-2' : 'space-y-6 py-2 px-4'
      "
    >
      <div v-for="group in navigationConfig" :key="group.title">
        <!-- Title / Separator for Collapsed -->
        <h3
          v-if="!effectiveCollapsed"
          class="px-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80"
        >
          {{ group.title }}
        </h3>
        <div
          v-else
          class="h-px bg-slate-100 w-8 mx-auto mb-4 rounded-full"
        ></div>

        <div
          class="space-y-0.5"
          :class="effectiveCollapsed ? 'flex flex-col items-center gap-1' : ''"
        >
          <SidebarItem
            v-for="item in group.items"
            :key="item.path"
            :item="item"
            :collapsed="effectiveCollapsed"
            :active="isActive(item.path)"
            :expanded="isExpanded(item.path)"
            @toggle-expand="toggleExpand"
          />
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useSidebar } from "../../composables/useSidebar";
import { useBranding } from "../../composables/useBranding";
import { navigationConfig } from "../../config/navigation";
import SidebarItem from "./SidebarItem.vue";

const route = useRoute();
const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();
const { branding } = useBranding();

// State for expanding menus
const expandedItems = ref<string[]>([]);
const effectiveCollapsed = computed(() => {
  return isCollapsed.value && !isMobileOpen.value;
});

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path === path || (path !== "/" && route.path.startsWith(path));
};

const isExpanded = (path: string) => expandedItems.value.includes(path);

const toggleExpand = (path: string) => {
  if (expandedItems.value.includes(path)) {
    expandedItems.value = expandedItems.value.filter((p) => p !== path);
  } else {
    expandedItems.value.push(path);
  }
};

const initExpanded = () => {
  for (const group of navigationConfig) {
    for (const item of group.items) {
      if (item.children && route.path.startsWith(item.path)) {
        if (!expandedItems.value.includes(item.path)) {
          expandedItems.value.push(item.path);
        }
      }
    }
  }
};

watch(
  () => route.path,
  () => {
    closeMobileSidebar();
  },
  { immediate: false },
);

initExpanded();
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
