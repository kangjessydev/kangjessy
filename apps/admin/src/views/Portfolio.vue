<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="Portfolio Showcase"
      subtitle="Manage case studies and project showcase for the website"
    >
      <BaseButton variant="primary" @click="router.push('/portfolio/new')">
        <Plus :size="18" />
        Add Case Study
      </BaseButton>
    </PageHeader>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Projects"
        :value="projects.length"
        :icon="Briefcase"
        colorClass="bg-blue-50 text-blue-600"
      />
      <StatsCard
        title="Success Projects"
        :value="successCount"
        :icon="CheckCircle"
        colorClass="bg-emerald-50 text-emerald-600"
      />
      <StatsCard
        title="Idea & Concepts"
        :value="projects.length - successCount"
        :icon="Clock"
        colorClass="bg-amber-50 text-amber-600"
      />
      <StatsCard
        title="Live Coverage"
        :value="publishedCount"
        :icon="TrendingUp"
        colorClass="bg-indigo-50 text-indigo-600"
      />
    </div>

    <!-- Filter Bar -->
    <DashboardCard
      class="mb-6 !rounded-[32px] shadow-lg shadow-slate-200/20 px-6 py-4"
    >
      <div class="flex flex-col lg:flex-row gap-4 justify-between items-center">
        <!-- Search -->
        <div class="w-full lg:w-auto flex-1 max-w-md relative group">
          <Search
            :size="18"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#702DFF] transition-colors"
          />
          <input
            v-model="searchQuery"
            type="text"
            class="input-field !pl-12 !py-3.5 !rounded-2xl border-slate-50 focus:border-[#702DFF]"
            placeholder="Search by title, client, or category..."
          />
        </div>

        <!-- Desktop Filters -->
        <div class="flex flex-wrap gap-2.5 w-full lg:w-auto justify-end">
          <select
            v-model="areaFilter"
            class="select-field !py-3.5 !px-5 !rounded-2xl !text-[10px] !font-black uppercase tracking-widest md:w-36"
          >
            <option value="all">All Areas</option>
            <option v-for="area in uniqueAreas" :key="area" :value="area">
              {{ area }}
            </option>
          </select>

          <select
            v-model="statusFilter"
            class="select-field !py-3.5 !px-5 !rounded-2xl !text-[10px] !font-black uppercase tracking-widest md:w-36"
          >
            <option value="all">Any Status</option>
            <option value="SUCCESS">Success Case</option>
            <option value="IDEA">Idea & Concept</option>
          </select>

          <select
            v-model="visibilityFilter"
            class="select-field !py-3.5 !px-5 !rounded-2xl !text-[10px] !font-black uppercase tracking-widest md:w-36"
          >
            <option value="all">Any Display</option>
            <option value="published">Live on Web</option>
            <option value="draft">Hidden (Draft)</option>
          </select>

          <select
            v-model="sortOrder"
            class="select-field !py-3.5 !px-5 !rounded-2xl !text-[10px] !font-black uppercase tracking-widest md:w-32 bg-slate-50 border-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">A-Z</option>
          </select>
        </div>
      </div>
    </DashboardCard>

    <!-- Bulk Action Bar (Float) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-10 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 scale-95"
    >
      <div
        v-if="selectedIds.length > 0"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#1B2559] text-white px-8 py-4 rounded-[40px] shadow-2xl flex items-center gap-8 border border-white/10 backdrop-blur-xl"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <CheckSquare :size="18" class="text-indigo-400" />
          </div>
          <span class="font-black text-sm tracking-tight"
            >{{ selectedIds.length }} Items Selected</span
          >
        </div>

        <div class="flex gap-2">
          <button
            @click="bulkUpdateVisibility('published')"
            class="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Publish
          </button>
          <button
            @click="bulkUpdateVisibility('draft')"
            class="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Hide
          </button>
          <div class="w-px bg-white/10 mx-2 self-stretch"></div>
          <button
            @click="handleBulkDelete"
            class="px-5 py-2.5 rounded-2xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all hover:scale-105 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </transition>

    <!-- Portfolio Table -->
    <DashboardCard
      no-padding
      class="overflow-hidden !rounded-[32px] border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-12"
    >
      <div v-if="loading" class="p-20 text-center">
        <div
          class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
        ></div>
        <p
          class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          Syncing with Digital Assets...
        </p>
      </div>

      <div v-else-if="filteredProjects.length === 0" class="p-20 text-center">
        <div
          class="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100"
        >
          <FolderOpen :size="40" class="text-slate-200" />
        </div>
        <h3 class="text-[#1B2559] font-black text-lg">No projects captured</h3>
        <p class="text-slate-400 text-sm mt-1">
          Try refining your search or filter parameters.
        </p>
        <button
          v-if="hasFilters"
          @click="resetFilters"
          class="mt-6 text-[#702DFF] text-xs font-black uppercase tracking-widest hover:underline"
        >
          Clear All Filters
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th class="w-12 text-center !pl-8">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded-lg border-slate-300 text-[#702DFF] focus:ring-[#702DFF] h-4 w-4"
                />
              </th>
              <th>Project & Client</th>
              <th>Area</th>
              <th>Technologies</th>
              <th>Record Status</th>
              <th>Visibility</th>
              <th class="text-right !pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in paginatedProjects"
              :key="project.id"
              class="table-row-hover group"
              :class="selectedIds.includes(project.id) ? 'bg-indigo-50/40' : ''"
            >
              <td class="text-center !pl-8">
                <input
                  type="checkbox"
                  :value="project.id"
                  v-model="selectedIds"
                  class="rounded-lg border-slate-300 text-[#702DFF] focus:ring-[#702DFF] h-4 w-4"
                />
              </td>
              <td class="cursor-pointer" @click="handleEdit(project)">
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 rounded-[24px] overflow-hidden bg-slate-100 border border-slate-100 shadow-sm shrink-0"
                  >
                    <img
                      v-if="project.mainImage"
                      :src="project.mainImage"
                      class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center bg-indigo-50/50"
                    >
                      <Layout :size="20" class="text-[#702DFF] opacity-30" />
                    </div>
                  </div>
                  <div>
                    <p
                      class="font-black text-[#1B2559] leading-tight text-sm tracking-tight group-hover:text-[#702DFF] transition-colors line-clamp-1"
                    >
                      {{ project.title }}
                    </p>
                    <div class="flex items-center gap-2 mt-2">
                      <p
                        class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                      >
                        {{ project.client || "INTERNAL PROJECT" }}
                      </p>
                      <span
                        v-if="project.industry"
                        class="text-[8px] font-black px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 uppercase tracking-tighter border border-slate-100/50"
                      >
                        {{ project.industry }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span
                  class="px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#702DFF] border border-indigo-100/50"
                >
                  {{ project.category || "GENERAL" }}
                </span>
              </td>
              <td>
                <div class="flex flex-wrap gap-1.5 max-w-[200px]">
                  <span
                    v-for="tech in project.technologies?.slice(0, 3)"
                    :key="tech"
                    class="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-tighter border border-slate-100"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="project.technologies?.length > 3"
                    class="text-[8px] font-black text-[#702DFF] pt-1 ml-1"
                    >+{{ project.technologies.length - 3 }}</span
                  >
                </div>
              </td>
              <td>
                <div class="flex items-center gap-1.5">
                  <div
                    class="w-1.5 h-1.5 rounded-full"
                    :class="
                      project.status === 'SUCCESS'
                        ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                        : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                    "
                  ></div>
                  <span
                    class="text-[10px] font-black uppercase tracking-widest"
                    :class="
                      project.status === 'SUCCESS'
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    "
                  >
                    {{ project.status || "IDEA" }}
                  </span>
                </div>
              </td>
              <td>
                <select
                  :value="project.visibility"
                  @change="onVisibilityChange(project, $event)"
                  class="appearance-none cursor-pointer px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all outline-none shadow-sm"
                  :class="
                    project.visibility === 'published'
                      ? 'bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200'
                      : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'
                  "
                >
                  <option value="published">LIVE</option>
                  <option value="draft">DRAFT</option>
                </select>
              </td>
              <td class="!pr-8">
                <div class="flex items-center justify-end gap-1 transition-all">
                  <button
                    @click="handleView(project)"
                    class="p-2.5 rounded-xl text-[#702DFF] hover:bg-indigo-50 transition-colors"
                    title="View Case Study"
                  >
                    <ExternalLink :size="16" />
                  </button>
                  <button
                    @click="handleEdit(project)"
                    class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                  >
                    <Edit2 :size="16" />
                  </button>
                  <button
                    @click="handleDelete(project)"
                    class="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div
        v-if="filteredProjects.length > 0"
        class="px-8 py-6 bg-slate-50/50 border-t border-slate-100/50 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >Page limit:</span
            >
            <select
              v-model="itemsPerPage"
              class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-[#1B2559] outline-none shadow-sm transition-all focus:ring-2 focus:ring-[#702DFF]/10"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>
          <span
            class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
          >
            Range {{ startIndex }} - {{ endIndex }} of
            {{ filteredProjects.length }} Assets
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2.5 rounded-2xl bg-white border border-slate-100 disabled:opacity-30 hover:border-[#702DFF] transition-all shadow-sm"
          >
            <ChevronLeft :size="18" />
          </button>
          <div class="flex gap-1.5">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="w-10 h-10 rounded-2xl text-[11px] font-black transition-all"
              :class="
                currentPage === page
                  ? 'bg-[#702DFF] text-white shadow-xl shadow-indigo-500/20'
                  : 'bg-white border border-slate-100 text-slate-400 hover:border-[#702DFF] hover:text-[#702DFF] shadow-sm'
              "
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="p-2.5 rounded-2xl bg-white border border-slate-100 disabled:opacity-30 hover:border-[#702DFF] transition-all shadow-sm"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </DashboardCard>

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Purge Case Study"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  Plus,
  Edit2,
  Trash2,
  Briefcase,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  CheckSquare,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layout,
  FolderOpen,
} from "lucide-vue-next";
import {
  portfolioService,
  type PortfolioItem,
} from "../services/portfolioService";
import PageHeader from "../components/ui/PageHeader.vue";
import DashboardCard from "../components/ui/DashboardCard.vue";
import { BaseButton } from "@kangjessy/ui";
import StatsCard from "../components/ui/StatsCard.vue";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const router = useRouter();
const projects = ref<PortfolioItem[]>([]);
const loading = ref(true);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
  isBulk: false,
});

// Filters
const searchQuery = ref("");
const statusFilter = ref("all");
const visibilityFilter = ref("all");
const areaFilter = ref("all");
const techFilter = ref("all");
const sortOrder = ref("newest");
const selectedIds = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

onMounted(fetchProjects);

async function fetchProjects() {
  loading.value = true;
  try {
    projects.value = await portfolioService.getAll();
  } catch (err) {
    showToast("Failed to fetch projects", "error");
  } finally {
    loading.value = false;
  }
}

const publishedCount = computed(
  () => projects.value.filter((p) => p.visibility === "published").length,
);
const successCount = computed(
  () => projects.value.filter((p) => p.status === "SUCCESS").length,
);
const hasFilters = computed(
  () =>
    searchQuery.value ||
    statusFilter.value !== "all" ||
    areaFilter.value !== "all",
);

const uniqueAreas = computed(() => {
  const areas = projects.value.map((p) => p.category).filter(Boolean);
  return [...new Set(areas)].sort();
});

const filteredProjects = computed(() => {
  let result = [...projects.value];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)),
    );
  }

  if (statusFilter.value !== "all") {
    result = result.filter((p) => p.status === statusFilter.value);
  }

  if (visibilityFilter.value !== "all") {
    result = result.filter((p) => p.visibility === visibilityFilter.value);
  }

  if (areaFilter.value !== "all") {
    result = result.filter((p) => p.category === areaFilter.value);
  }

  result.sort((a, b) => {
    const dateA = new Date(a.completionDate || a.created_at || 0).getTime();
    const dateB = new Date(b.completionDate || b.created_at || 0).getTime();
    if (sortOrder.value === "newest") return dateB - dateA;
    if (sortOrder.value === "oldest") return dateA - dateB;
    if (sortOrder.value === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return result;
});

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProjects.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / itemsPerPage.value),
);
const startIndex = computed(() =>
  filteredProjects.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const endIndex = computed(() =>
  Math.min(
    startIndex.value + itemsPerPage.value - 1,
    filteredProjects.value.length,
  ),
);
const isAllSelected = computed(
  () =>
    paginatedProjects.value.length > 0 &&
    paginatedProjects.value.every((p) => selectedIds.value.includes(p.id)),
);

watch(
  [searchQuery, statusFilter, visibilityFilter, areaFilter, itemsPerPage],
  () => (currentPage.value = 1),
);

const resetFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "all";
  visibilityFilter.value = "all";
  areaFilter.value = "all";
  sortOrder.value = "newest";
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const pageIds = paginatedProjects.value.map((p) => p.id);
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id));
  } else {
    paginatedProjects.value.forEach((p) => {
      if (!selectedIds.value.includes(p.id)) selectedIds.value.push(p.id);
    });
  }
};

const onVisibilityChange = async (project: PortfolioItem, event: Event) => {
  const newVal = (event.target as HTMLSelectElement).value as
    | "published"
    | "draft";
  const oldVal = project.visibility;
  project.visibility = newVal;
  try {
    await portfolioService.update(project.id, { visibility: newVal } as any);
    showToast(`Visibility updated to ${newVal}`, "success");
  } catch (e) {
    project.visibility = oldVal;
    showToast("Failed to update visibility", "error");
  }
};

const handleEdit = (p: PortfolioItem) => router.push(`/portfolio/${p.id}/edit`);
const handleView = (p: PortfolioItem) =>
  window.open(`https://kangjessy.com/project/${p.slug || p.id}`, "_blank");

const handleDelete = (p: PortfolioItem) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Project?",
    message: `Are you sure you want to delete "${p.title}"?`,
    targetId: p.id,
    isBulk: false,
  };
};

const handleBulkDelete = () => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Selected?",
    message: `Are you sure you want to delete ${selectedIds.value.length} projects?`,
    targetId: null,
    isBulk: true,
  };
};

const executeDelete = async () => {
  const { targetId, isBulk } = confirmModal.value;
  confirmModal.value.isOpen = false;
  if (isBulk) {
    const ids = [...selectedIds.value];
    selectedIds.value = [];
    for (const id of ids) {
      await portfolioService.delete(id);
      projects.value = projects.value.filter((p) => p.id !== id);
    }
    showToast(`Projects deleted`, "success");
  } else if (targetId) {
    await portfolioService.delete(targetId);
    projects.value = projects.value.filter((p) => p.id !== targetId);
    showToast("Project deleted", "success");
  }
};

const bulkUpdateVisibility = async (v: "published" | "draft") => {
  const ids = [...selectedIds.value];
  selectedIds.value = [];
  for (const id of ids) {
    const p = projects.value.find((item) => item.id === id);
    if (p) p.visibility = v;
    await portfolioService.update(id, { visibility: v } as any);
  }
  showToast("Visibility updated", "success");
};

const showToast = (message: string, variant: "success" | "error") => {
  toast.value = { show: true, message, variant };
};
</script>
