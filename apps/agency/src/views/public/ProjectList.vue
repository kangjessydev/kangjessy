<template>
  <div>
    <div class="min-h-screen bg-bg-primary pt-36 pb-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <!-- Header -->
        <header class="text-center mb-10">
          <SectionHeader badge="Full Portfolio" align="center">
            <template #title>
              <h1
                class="text-[clamp(2.5rem,8vw,4rem)] font-extrabold bg-linear-to-r from-text-primary to-text-secondary bg-clip-text text-transparent leading-tight mb-4"
              >
                Selected <span class="text-accent-primary">Projects</span>
              </h1>
            </template>
          </SectionHeader>
          <p
            class="text-[clamp(1rem,2.5vw,1.15rem)] text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Kumpulan proyek, eksperimen, dan hasil kerja sama dengan klien yang
            menunjukkan kemampuan teknis dan estetika desain.
          </p>
        </header>

        <!-- Search & Filters Command Bar -->
        <div class="mb-12 relative z-30" ref="commandBarRef">
          <div
            class="bg-bg-secondary/40 backdrop-blur-xl border border-border-color rounded-[24px] p-2 md:p-3 flex flex-col gap-2 md:flex-row md:items-center shadow-2xl shadow-black/20"
          >
            <!-- Search Section -->
            <div class="relative grow md:max-w-md group">
              <SearchIcon
                :size="18"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari ide, stack, atau project..."
                class="w-full py-3 pl-11 pr-4 bg-bg-primary/50 border border-transparent rounded-xl text-sm text-text-primary outline-none transition-all focus:bg-bg-primary focus:border-accent-primary/30"
              />
            </div>

            <!-- Divider (Desktop Only) -->
            <div class="hidden md:block w-px h-8 bg-border-color/50 mx-2"></div>

            <!-- Desktop Filters Area -->
            <div class="hidden md:flex items-center gap-2 grow justify-between">
              <div class="flex items-center gap-2">
                <!-- Category Dropdown -->
                <div class="relative" ref="categoryRef">
                  <button
                    @click.stop="
                      isCategoryDropdownOpen = !isCategoryDropdownOpen;
                      isStackDropdownOpen = false;
                      isStatusDropdownOpen = false;
                    "
                    class="h-11 px-4 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                    :class="
                      activeFilter !== 'All'
                        ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                        : 'bg-bg-primary/30 border-transparent text-text-secondary hover:border-border-color hover:text-text-primary'
                    "
                  >
                    <span
                      class="text-[10px] font-black uppercase tracking-widest opacity-50"
                      >Area</span
                    >
                    <span class="text-xs font-bold">{{
                      activeFilter === "All" ? "All Areas" : activeFilter
                    }}</span>
                    <ChevronDownIcon
                      :size="14"
                      class="transition-transform duration-300"
                      :class="{ 'rotate-180': isCategoryDropdownOpen }"
                    />
                  </button>

                  <div
                    v-if="isCategoryDropdownOpen"
                    class="absolute top-full left-0 mt-3 w-56 bg-[#121212] border border-border-color rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <button
                      @click="
                        activeFilter = 'All';
                        isCategoryDropdownOpen = false;
                      "
                      class="w-full text-left px-5 py-3 text-xs font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors flex items-center justify-between"
                    >
                      Semua Bidang
                      <span
                        class="px-1.5 py-0.5 rounded bg-white/5 text-[9px] opacity-40"
                        >{{ projects.length }}</span
                      >
                    </button>
                    <div class="h-px bg-white/5"></div>
                    <button
                      v-for="cat in categoriesList"
                      :key="cat"
                      @click="
                        activeFilter = cat;
                        isCategoryDropdownOpen = false;
                      "
                      class="w-full text-left px-5 py-3.5 text-xs text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors flex items-center justify-between"
                    >
                      {{ cat }}
                      <span class="text-[10px] opacity-30">{{
                        getCount(cat)
                      }}</span>
                    </button>
                  </div>
                </div>

                <!-- Stack Dropdown -->
                <div class="relative" ref="stackRef">
                  <button
                    @click.stop="
                      isStackDropdownOpen = !isStackDropdownOpen;
                      isCategoryDropdownOpen = false;
                      isStatusDropdownOpen = false;
                    "
                    class="h-11 px-4 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    :class="
                      activeStack !== 'All'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                        : 'bg-bg-primary/30 border-transparent text-text-secondary hover:border-border-color hover:text-text-primary'
                    "
                  >
                    <span
                      class="text-[10px] font-black uppercase tracking-widest opacity-50"
                      >Tech</span
                    >
                    <span class="text-xs font-bold">{{
                      activeStack === "All" ? "All Tech" : activeStack
                    }}</span>
                    <ChevronDownIcon
                      :size="14"
                      class="transition-transform duration-300"
                      :class="{ 'rotate-180': isStackDropdownOpen }"
                    />
                  </button>

                  <div
                    v-if="isStackDropdownOpen"
                    class="absolute top-full left-0 mt-3 w-64 bg-[#121212] border border-border-color rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <div class="p-3 bg-white/2 border-b border-white/5">
                      <div class="relative">
                        <SearchIcon
                          :size="12"
                          class="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                        />
                        <input
                          v-model="stackSearchQuery"
                          type="text"
                          placeholder="Cari technology..."
                          class="w-full bg-bg-primary/50 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-[10px] text-text-primary outline-none focus:border-emerald-500 transition-all"
                          @click.stop
                        />
                      </div>
                    </div>
                    <div class="max-h-[300px] overflow-y-auto custom-scrollbar">
                      <button
                        v-if="!stackSearchQuery"
                        @click="
                          activeStack = 'All';
                          isStackDropdownOpen = false;
                        "
                        class="w-full text-left px-5 py-3 text-xs font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors"
                      >
                        Semua Tech
                      </button>
                      <button
                        v-for="stack in filteredStackList"
                        :key="stack"
                        @click="
                          activeStack = stack;
                          isStackDropdownOpen = false;
                        "
                        class="w-full text-left px-5 py-3.5 text-xs text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors border-t border-white/5 flex items-center justify-between"
                      >
                        {{ stack }}
                        <span class="text-[10px] opacity-30">{{
                          getStackCount(stack)
                        }}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Status Dropdown -->
                <div class="relative" ref="statusRef">
                  <button
                    @click.stop="
                      isStatusDropdownOpen = !isStatusDropdownOpen;
                      isCategoryDropdownOpen = false;
                      isStackDropdownOpen = false;
                    "
                    class="h-11 px-4 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    :class="
                      activeStatus !== 'All'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-bg-primary/30 border-transparent text-text-secondary hover:border-border-color hover:text-text-primary'
                    "
                  >
                    <span
                      class="text-[10px] font-black uppercase tracking-widest opacity-50"
                      >Status</span
                    >
                    <span class="text-xs font-bold">{{
                      activeStatus === "All" ? "All Status" : activeStatus
                    }}</span>
                    <ChevronDownIcon
                      :size="14"
                      class="transition-transform duration-300"
                      :class="{ 'rotate-180': isStatusDropdownOpen }"
                    />
                  </button>

                  <div
                    v-if="isStatusDropdownOpen"
                    class="absolute top-full left-0 mt-3 w-56 bg-[#121212] border border-border-color rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <button
                      @click="
                        activeStatus = 'All';
                        isStatusDropdownOpen = false;
                      "
                      class="w-full text-left px-5 py-3 text-xs font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors flex items-center justify-between"
                    >
                      Semua Status
                      <span
                        class="px-1.5 py-0.5 rounded bg-white/5 text-[9px] opacity-40"
                        >{{ projects.length }}</span
                      >
                    </button>
                    <div class="h-px bg-white/5"></div>
                    <button
                      v-for="stat in statusList"
                      :key="stat"
                      @click="
                        activeStatus = stat;
                        isStatusDropdownOpen = false;
                      "
                      class="w-full text-left px-5 py-3.5 text-xs text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors border-t border-white/5 flex items-center justify-between"
                    >
                      {{ stat }}
                      <span class="text-[10px] opacity-30">{{
                        getStatusCount(stat)
                      }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Filter Reset (Desktop Inline) -->
              <button
                v-if="activeFiltersCount > 0"
                @click="resetFilters"
                class="flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-tighter text-red-400/60 hover:text-red-400 transition-colors cursor-pointer group"
              >
                <XIcon
                  :size="14"
                  class="transition-transform group-hover:rotate-90"
                />
                Reset
              </button>
            </div>

            <!-- Mobile Search Filter Hint -->
            <div
              class="md:hidden flex items-center justify-center py-2 text-[10px] text-text-tertiary font-bold uppercase tracking-widest"
            >
              Gunakan tombol terapung untuk memfilter
            </div>
          </div>
        </div>

        <!-- Mobile Floating Filter Button -->
        <Teleport to="body">
          <Transition name="fab">
            <button
              v-if="!loading && !isCommandBarVisible"
              @click="isFilterSheetOpen = true"
              class="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 h-14 pl-5 pr-6 bg-accent-primary text-white rounded-full shadow-[0_8px_30px_rgba(var(--accent-primary-rgb),0.4)] flex items-center gap-2 active:scale-90 transition-all border border-white/10 group"
            >
              <div class="relative">
                <SlidersIcon :size="20" />
                <div
                  v-if="activeFiltersCount > 0"
                  class="absolute -top-2 -right-2 w-4 h-4 bg-white text-accent-primary text-[8px] font-black rounded-full flex items-center justify-center border-2 border-accent-primary"
                >
                  !
                </div>
              </div>
              <span class="text-xs font-black uppercase tracking-widest"
                >Filter</span
              >
            </button>
          </Transition>
        </Teleport>

        <!-- Loading State -->
        <div
          v-if="loading"
          class="flex flex-col items-center justify-center py-40"
        >
          <Loader2
            :size="48"
            class="text-accent-primary animate-spin mb-4 shrink-0"
          />
          <p
            class="text-text-secondary animate-pulse uppercase tracking-[0.2em] font-black text-[clamp(0.7rem,1.5vw,0.75rem)]"
          >
            Loading Portfolio...
          </p>
        </div>

        <template v-else>
          <!-- Projects Grid -->
          <div v-if="filteredProjects.length > 0" class="space-y-12">
            <TransitionGroup
              name="stagger"
              tag="div"
              class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
            >
              <ProjectCard
                v-for="project in displayedProjects"
                :key="project._id"
                :project="project"
                @click="$router.push(`/project/${project.slug.current}`)"
                @filter-stack="activeStack = $event"
              />
            </TransitionGroup>

            <!-- Load More -->
            <LoadMore
              :has-more="hasMore"
              :loading="isLoadingMore"
              @load="loadMore"
            />
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="text-center py-20 bg-bg-secondary/30 rounded-[32px] border border-border-color border-dashed"
          >
            <div
              class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bg-secondary mb-6 text-text-tertiary"
            >
              <FolderXIcon :size="40" class="shrink-0" />
            </div>
            <h3
              class="font-bold text-text-primary mb-2 text-[clamp(1.1rem,2vw,1.25rem)]"
            >
              Project tidak ditemukan
            </h3>
            <p class="text-text-secondary mb-8 max-w-md mx-auto">
              Coba gunakan kata kunci lain atau ubah kategori filter Anda.
            </p>
            <button
              class="px-8 py-3 bg-accent-primary text-white font-bold rounded-xl transition-all hover:bg-blue-600 hover:-translate-y-1 shadow-lg cursor-pointer"
              @click="resetFilters"
            >
              Lihat Semua Project
            </button>
          </div>
        </template>
      </div>
    </div>

    <!-- Mobile Filter BottomSheet -->
    <BottomSheet
      v-model="isFilterSheetOpen"
      title="Filter Project"
      :icon="SlidersIcon"
      :show-close="false"
    >
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary"
            >
              <SlidersIcon :size="18" />
            </div>
            <h4
              class="text-[1.1rem] font-bold text-text-primary tracking-tight"
            >
              Filter Project
            </h4>
          </div>
          <button
            @click="resetFilters"
            class="px-4 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
          >
            Reset
          </button>
        </div>
      </template>
      <div class="p-6 flex flex-col gap-8 pb-safe">
        <!-- Bidang Pekerjaan (Chip Style) -->
        <div>
          <h5 class="text-text-primary font-bold mb-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
            Bidang Pekerjaan
          </h5>
          <div class="flex flex-wrap gap-2">
            <button
              @click="activeFilter = 'All'"
              class="px-5 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
              :class="
                activeFilter === 'All'
                  ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                  : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'
              "
            >
              All Categories
            </button>
            <button
              v-for="cat in categoriesList"
              :key="cat"
              @click="activeFilter = cat"
              class="px-5 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
              :class="
                activeFilter === cat
                  ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                  : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'
              "
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Tech Stack (Chip Style) -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-text-primary font-bold flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Tech Stack
            </h5>
            <!-- Mobile Search for Stack -->
            <div class="relative max-w-[150px]">
              <SearchIcon
                :size="12"
                class="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary"
              />
              <input
                v-model="stackSearchQuery"
                type="text"
                placeholder="Cari..."
                class="w-full bg-bg-tertiary/60 border border-border-color rounded-lg py-1.5 pl-8 pr-3 text-[10px] text-text-primary outline-none focus:border-accent-primary"
              />
            </div>
          </div>
          <div class="flex flex-wrap gap-2 pt-1 pb-4">
            <button
              @click="activeStack = 'All'"
              class="px-4 py-2 rounded-xl border text-[10px] uppercase tracking-widest font-bold transition-all duration-300 active:scale-95"
              :class="
                activeStack === 'All'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                  : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'
              "
            >
              All Tech
            </button>
            <button
              v-for="stack in stackSearchQuery ? filteredStackList : stackList"
              :key="stack"
              @click="activeStack = stack"
              class="px-4 py-2 rounded-xl border text-[10px] uppercase tracking-widest font-bold transition-all duration-300 active:scale-95"
              :class="
                activeStack === stack
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                  : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'
              "
            >
              {{ stack }}
            </button>
          </div>
        </div>

        <!-- Status (Chip Style) -->
        <div>
          <h5 class="text-text-primary font-bold mb-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Status Project
          </h5>
          <div class="flex flex-wrap gap-2">
            <button
              @click="activeStatus = 'All'"
              class="px-5 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
              :class="
                activeStatus === 'All'
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'
              "
            >
              All Status
            </button>
            <button
              v-for="stat in statusList"
              :key="stat"
              @click="activeStatus = stat"
              class="px-5 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
              :class="
                activeStatus === stat
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'
              "
            >
              {{ stat }}
            </button>
          </div>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script lang="ts">
export default {
  name: "PortfolioPage",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useSEO } from "../../composables/useSEO";
import { portfolioService } from "../../services/portfolioService";
import ProjectCard from "../../components/sections/portfolio/ProjectCard.vue";
import SectionHeader from "../../components/ui/SectionHeader.vue";
import { BottomSheet } from "@kangjessy/ui";
import LoadMore from "../../components/ui/LoadMore.vue";
import {
  Search as SearchIcon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
  SlidersHorizontal as SlidersIcon,
  Loader2,
  FolderX as FolderXIcon,
} from "lucide-vue-next";

// SEO Setup
useSEO({
  title: "Full Portfolio",
  description:
    "Lihat berbagai proyek sukses yang telah saya kerjakan, mulai dari sistem internal, SaaS, hingga website company profile premium.",
  url: "/projects",
});

const route = useRoute();
const projects = ref<any[]>([]);
const loading = ref(true);
const activeFilter = ref("All");
const activeStack = ref("All");
const activeStatus = ref("All");
const searchQuery = ref("");
const stackSearchQuery = ref("");
const isFilterSheetOpen = ref(false);
const isCategoryDropdownOpen = ref(false);
const isStackDropdownOpen = ref(false);
const isStatusDropdownOpen = ref(false);

const categoryRef = ref<HTMLElement | null>(null);
const stackRef = ref<HTMLElement | null>(null);
const statusRef = ref<HTMLElement | null>(null);
const commandBarRef = ref<HTMLElement | null>(null);
const isCommandBarVisible = ref(true);

let observer: IntersectionObserver | null = null;

// Pagination
const itemsPerPage = 6;
const visibleCount = ref(itemsPerPage);
const isLoadingMore = ref(false);

const handleOutsideClick = (event: MouseEvent) => {
  if (categoryRef.value && !categoryRef.value.contains(event.target as Node)) {
    isCategoryDropdownOpen.value = false;
  }
  if (stackRef.value && !stackRef.value.contains(event.target as Node)) {
    isStackDropdownOpen.value = false;
  }
  if (statusRef.value && !statusRef.value.contains(event.target as Node)) {
    isStatusDropdownOpen.value = false;
  }
};

const categoriesList = computed(() => {
  const cats = new Set<string>();
  projects.value.forEach((p) => {
    if (p.category) cats.add(p.category);
  });
  return Array.from(cats).sort();
});

const stackList = computed(() => {
  const stacks = new Set<string>();
  projects.value.forEach((p) => {
    p.technologies?.forEach((t: string) => stacks.add(t));
  });
  return Array.from(stacks).sort();
});

const filteredStackList = computed(() => {
  if (!stackSearchQuery.value) return stackList.value;
  const query = stackSearchQuery.value.toLowerCase();
  return stackList.value.filter((s) => s.toLowerCase().includes(query));
});

const statusList = computed(() => {
  const statuses = new Set<string>();
  projects.value.forEach((p) => {
    if (p.status) statuses.add(p.status);
  });
  return Array.from(statuses).sort();
});

const filteredProjects = computed(() => {
  let result = projects.value;

  if (activeFilter.value !== "All") {
    result = result.filter((p) => p.category === activeFilter.value);
  }

  if (activeStack.value !== "All") {
    result = result.filter((p) => p.technologies?.includes(activeStack.value));
  }

  if (activeStatus.value !== "All") {
    result = result.filter((p) => p.status === activeStatus.value);
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies?.some((t: string) => t.toLowerCase().includes(query)),
    );
  }

  return result;
});

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, visibleCount.value);
});

const hasMore = computed(() => {
  return visibleCount.value < filteredProjects.value.length;
});

const loadMore = () => {
  isLoadingMore.value = true;
  setTimeout(() => {
    visibleCount.value += itemsPerPage;
    isLoadingMore.value = false;
  }, 600);
};

const getCount = (category: string) => {
  return projects.value.filter((p) => p.category === category).length;
};

const getStackCount = (stack: string) => {
  return projects.value.filter((p) => p.technologies?.includes(stack)).length;
};

const getStatusCount = (status: string) => {
  return projects.value.filter((p) => p.status === status).length;
};

const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchQuery.value) count++;
  if (activeFilter.value !== "All") count++;
  if (activeStack.value !== "All") count++;
  if (activeStatus.value !== "All") count++;
  return count;
});

const resetFilters = () => {
  activeFilter.value = "All";
  activeStack.value = "All";
  activeStatus.value = "All";
  searchQuery.value = "";
};

watch([activeFilter, activeStack, activeStatus, searchQuery], () => {
  visibleCount.value = itemsPerPage;
});

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: "instant" } as any);
  window.addEventListener("click", handleOutsideClick);

  try {
    const sanityProjects = await portfolioService.getProjects();

    projects.value = sanityProjects.map((p: any) => ({
      ...p,
      technologies: p.technologies || [],
      status: p.status || "SUCCESS",
    }));

    // Sort: IDEA projects first (if needed, or rely on Sanity order)
    /* projects.value.sort((a: any, b: any) => {
            if (a.status === 'IDEA' && b.status !== 'IDEA') return -1;
            if (a.status !== 'IDEA' && b.status === 'IDEA') return 1;
            return 0; // Keep sanity sort order
        }); */

    // Check for stack in query
    if (route.query.stack) {
      activeStack.value = String(route.query.stack);
    }

    // Check for category in query
    if (route.query.category) {
      activeFilter.value = String(route.query.category);
    }

    // Observer for sticky FAB (appears much sooner when scrolling)
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isCommandBarVisible.value = entries[0].isIntersecting;
        }
      },
      {
        threshold: 0,
        rootMargin: "-450px 0px 0px 0px",
      },
    );

    if (commandBarRef.value) {
      observer.observe(commandBarRef.value);
    }
  } catch (e) {
    console.error("Error fetching projects", e);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener("click", handleOutsideClick);
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* FAB Animation */
.fab-enter-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fab-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-enter-from {
  opacity: 0;
  transform: translate(-50%, 30px) scale(0.5);
}

.fab-leave-to {
  opacity: 0;
  transform: translate(-50%, 40px) scale(0.5);
}

/* Stagger Animation */
.stagger-enter-active,
.stagger-leave-active {
  transition: all 0.5s ease;
}

.stagger-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.stagger-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.stagger-move {
  transition: transform 0.5s ease;
}
</style>
