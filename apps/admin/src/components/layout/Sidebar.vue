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
      class="flex items-center shrink-0 px-2 transition-all duration-300"
      :class="effectiveCollapsed ? 'h-16 justify-center' : 'h-20 mb-2'"
    >
      <router-link
        to="/"
        class="flex items-center gap-3 w-full"
        :class="effectiveCollapsed ? 'justify-center' : ''"
      >
        <div
          class="w-10 h-10 bg-gradient-to-br from-[#1B2559] to-[#702DFF] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 text-white font-black text-lg transition-all duration-300"
          :class="
            effectiveCollapsed ? 'w-10 h-10 text-lg' : 'w-10 h-10 text-lg'
          "
        >
          KJ
        </div>
        <div
          v-if="!effectiveCollapsed"
          class="whitespace-nowrap overflow-hidden"
        >
          <h1 class="text-lg font-black text-[#1B2559] leading-tight">
            KangJessy
          </h1>
          <p
            class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]"
          >
            Agency Admin
          </p>
        </div>
      </router-link>
    </div>

    <!-- Navigation Groups -->
    <nav
      class="flex-1 overflow-y-auto overflow-x-hidden -mx-2 px-2 custom-scrollbar transition-all duration-300"
      :class="effectiveCollapsed ? 'space-y-4 py-4' : 'space-y-6'"
    >
      <div v-for="group in menuGroups" :key="group.title">
        <!-- Title / Separator for Collapsed -->
        <h3
          v-if="!effectiveCollapsed"
          class="px-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
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
          <div
            v-for="item in group.items"
            :key="item.path"
            :class="effectiveCollapsed ? 'w-full flex justify-center' : ''"
          >
            <!-- Standard Link or Parent Item -->
            <component
              :is="item.children ? 'div' : 'router-link'"
              :to="!item.children ? item.path : undefined"
              @click="item.children ? toggleExpand(item.path) : undefined"
              class="relative flex items-center px-4 py-3 rounded-xl transition-all duration-200 group/item cursor-pointer select-none"
              :class="[
                isActive(item.path) && !item.children
                  ? 'bg-[#1B2559] text-white shadow-lg shadow-indigo-900/10'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-[#1B2559]',
                effectiveCollapsed
                  ? 'justify-center !px-0 w-10 h-10 aspect-square'
                  : 'justify-between',
                item.children && isExpanded(item.path)
                  ? 'bg-slate-50/50 text-[#1B2559]'
                  : '',
              ]"
            >
              <div class="flex items-center gap-3">
                <!-- Icon -->
                <component
                  :is="item.icon"
                  :size="18"
                  :class="
                    isActive(item.path) && !item.children
                      ? 'text-white'
                      : 'text-slate-400 group-hover/item:text-[#702DFF]'
                  "
                  class="transition-colors shrink-0"
                />

                <!-- Label -->
                <span
                  v-if="!effectiveCollapsed"
                  class="text-sm font-bold tracking-wide truncate"
                  >{{ item.label }}</span
                >
              </div>

              <!-- Chevron for Submenu -->
              <ChevronDown
                v-if="item.children && !effectiveCollapsed"
                :size="14"
                class="text-slate-400 transition-transform duration-200"
                :class="isExpanded(item.path) ? 'rotate-180' : ''"
              />

              <!-- Active Indicator (Right Border) for Single Item -->
              <div
                v-if="
                  isActive(item.path) && !item.children && !effectiveCollapsed
                "
                class="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#702DFF] shadow-[0_0_10px_#702DFF]"
              ></div>

              <!-- Tooltip for Collapsed State -->
              <div
                v-if="effectiveCollapsed"
                class="absolute left-full ml-4 px-4 py-2 bg-[#1B2559] text-white text-xs font-bold rounded-xl opacity-0 translate-x-3 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all z-[100] whitespace-nowrap shadow-xl border border-white/10"
              >
                <div
                  class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1B2559] rotate-45 border-l border-b border-white/10"
                ></div>
                {{ item.label }}
              </div>
            </component>

            <!-- Submenu Children (Tree Style) -->
            <transition
              enter-active-class="transition-all duration-300 ease-out overflow-hidden"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-60 opacity-100"
              leave-active-class="transition-all duration-200 ease-in overflow-hidden"
              leave-from-class="max-h-60 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div
                v-if="
                  item.children && isExpanded(item.path) && !effectiveCollapsed
                "
                class="ml-[1.65rem] border-l-2 border-slate-100 space-y-1 my-2"
              >
                <router-link
                  v-for="child in item.children"
                  :key="child.path"
                  :to="child.path"
                  class="relative flex items-center gap-2 py-2 pr-4 pl-6 text-xs font-bold transition-all rounded-r-lg group/child"
                  :class="
                    isChildActive(child.path)
                      ? 'bg-indigo-50/50 text-[#702DFF]'
                      : 'text-slate-400 hover:text-[#1B2559] hover:bg-slate-50'
                  "
                >
                  <!-- Horizontal Branch Connector -->
                  <div
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-slate-100 group-hover/child:bg-slate-200"
                    :class="isChildActive(child.path) ? '!bg-indigo-100' : ''"
                  ></div>

                  <!-- Dot Indicator -->
                  <div
                    class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                    :class="
                      isChildActive(child.path)
                        ? 'bg-[#702DFF]'
                        : 'bg-slate-300 group-hover/child:bg-slate-400'
                    "
                  ></div>

                  <span>{{ child.label }}</span>
                </router-link>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Briefcase,
  DollarSign,
  Tag,
  Settings,
  Image,
  ChevronDown,
  Layers,
  Zap,
} from "lucide-vue-next";
import { useSidebar } from "../../composables/useSidebar";

// Menu Data definition
interface MenuItem {
  path: string;
  label: string;
  icon?: any;
  children?: { path: string; label: string }[];
}

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: "Overview",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
      { path: "/projects", label: "Manajemen Proyek", icon: Zap },
      { path: "/orders", label: "Pesanan", icon: ShoppingCart },
      { path: "/leads", label: "Inbox Leads", icon: Users },
      {
        path: "/proposals",
        label: "Proposals CMS",
        icon: FileText,
        children: [
          { path: "/proposals", label: "All Proposals" },
          { path: "/proposals/generator", label: "Live Generator" },
        ],
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        path: "/blog",
        label: "Blog",
        icon: FileText,
        children: [
          { path: "/blog", label: "Semua Artikel" },
          { path: "/blog/categories", label: "Kategori" },
          { path: "/blog/tags", label: "Tag" },
        ],
      },
      {
        path: "/portfolio",
        label: "Portfolio",
        icon: Briefcase,
        children: [
          { path: "/portfolio", label: "Semua Portofolio" },
          { path: "/portfolio/areas", label: "Bidang" },
          { path: "/portfolio/tech", label: "Tech Stack" },
        ],
      },
      { path: "/media", label: "Galeri Media", icon: Image },
      { path: "/blueprint", label: "The Blueprint", icon: Layers },
    ],
  },
  {
    title: "Business",
    items: [
      { path: "/finance", label: "Keuangan", icon: DollarSign },
      { path: "/vouchers", label: "Kupon & Diskon", icon: Tag },
    ],
  },
  {
    title: "System",
    items: [{ path: "/settings", label: "Settings", icon: Settings }],
  },
];

const route = useRoute();
const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();

// State for expanding menus
const expandedItems = ref<string[]>([]);
const effectiveCollapsed = computed(() => {
  return isCollapsed.value && !isMobileOpen.value;
});

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  // For parent items, keep them active if any child is visited
  return route.path === path || (path !== "/" && route.path.startsWith(path));
};

const isChildActive = (path: string) => {
  if (path === "/blog") {
    // Special case for 'All Posts' to not be active when in sub-modules
    return (
      route.path === "/blog" ||
      (route.path.startsWith("/blog/") &&
        !route.path.includes("/categories") &&
        !route.path.includes("/tags"))
    );
  }
  if (path === "/portfolio") {
    // Special case for 'All Projects'
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

const isExpanded = (path: string) => expandedItems.value.includes(path);

const toggleExpand = (path: string) => {
  if (expandedItems.value.includes(path)) {
    expandedItems.value = expandedItems.value.filter((p) => p !== path);
  } else {
    expandedItems.value.push(path);
  }
};

// Initialize expanded items based on current route
const initExpanded = () => {
  for (const group of menuGroups) {
    for (const item of group.items) {
      if (item.children && route.path.startsWith(item.path)) {
        if (!expandedItems.value.includes(item.path)) {
          expandedItems.value.push(item.path);
        }
      }
    }
  }
};

// Run init on mount (via watch immediate)
watch(
  () => route.path,
  () => {
    closeMobileSidebar();
    // Optional: Auto expand on navigation?
    // Let's keep it manual toggle mostly, but initial load should expand.
    // For now, let's just run it once.
  },
  { immediate: false },
);

// We need to run initExpanded once immediately.
// Since router is ready, we can check route.path.
// But we need to make sure we are inside setup context where route is available.
// Let's use immediate watch for initialization of expanded items logic or just call it.
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
