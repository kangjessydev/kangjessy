<template>
  <aside
    class="sidebar bg-white border-r border-slate-100/80 flex flex-col transition-all duration-500 ease-in-out z-100 shadow-[1px_0_10px_rgba(0,0,0,0.01)]"
    :class="[
      effectiveCollapsed ? 'collapsed w-20' : 'w-72',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Brand -->
    <div
      class="flex items-center shrink-0 transition-all duration-500 px-6 py-4"
      :class="effectiveCollapsed ? 'justify-center px-2!' : 'mb-2'"
    >
      <router-link
        to="/"
        class="flex items-center gap-3 w-full group/brand"
        :class="effectiveCollapsed ? 'justify-center' : ''"
      >
        <div
          class="w-10 h-10 bg-linear-to-br from-[#1B2559] to-[#4338ca] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/10 text-white font-black text-lg transition-transform duration-500 group-hover/brand:scale-105 overflow-hidden border-2 border-white/10"
        >
          <img
            src="/logo-agency.png"
            class="w-full h-full object-contain p-1.5"
            alt="Logo"
          />
        </div>
        <div
          v-if="!effectiveCollapsed"
          class="whitespace-nowrap overflow-hidden transition-all duration-500"
        >
          <h1
            class="text-[15px] font-black text-[#1B2559] leading-tight uppercase tracking-tighter"
          >
            KANG
            <span class="text-indigo-500">JESSY</span>
          </h1>
          <p
            class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.25em] -mt-0.5"
          >
            Agency Admin
          </p>
        </div>
      </router-link>
    </div>

    <!-- Navigation Groups -->
    <nav
      class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar transition-all duration-300 pb-4"
      :class="
        effectiveCollapsed ? 'space-y-6 py-4 px-2' : 'space-y-8 py-2 px-5'
      "
    >
      <div v-for="group in navigationConfig" :key="group.title">
        <!-- Title / Separator for Collapsed -->
        <h3
          v-if="!effectiveCollapsed"
          class="px-3 mb-4 text-[10px] font-black text-slate-300 uppercase tracking-[.2em] opacity-80"
        >
          {{ group.title }}
        </h3>
        <div
          v-else
          class="h-px bg-slate-100 w-8 mx-auto mb-6 rounded-full opacity-50"
        ></div>

        <div
          class="space-y-1"
          :class="effectiveCollapsed ? 'flex flex-col items-center gap-2' : ''"
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

    <!-- Sidebar Profile -->
    <SidebarProfile :collapsed="effectiveCollapsed" />
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useSidebar } from "../../composables/useSidebar";
import { navigationConfig } from "../../config/navigation";
import SidebarItem from "./SidebarItem.vue";
import SidebarProfile from "./SidebarProfile.vue";

const route = useRoute();
const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();

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
.custom-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f1f5f9;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #e2e8f0;
}
</style>
