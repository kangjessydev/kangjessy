<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="Articles & News"
      subtitle="Share your thoughts and updates with your audience"
    >
      <BaseButton variant="primary" @click="router.push('/blog/new')">
        <Plus :size="18" />
        Write New Post
      </BaseButton>
    </PageHeader>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Posts"
        :value="posts.length"
        :icon="FileText"
        colorClass="bg-blue-50 text-blue-600"
      />
      <StatsCard
        title="Published"
        :value="publishedCount"
        :icon="CheckCircle"
        colorClass="bg-emerald-50 text-emerald-600"
      />
      <StatsCard
        title="Drafts"
        :value="posts.length - publishedCount"
        :icon="Clock"
        colorClass="bg-amber-50 text-amber-600"
      />
      <StatsCard
        title="Engagement"
        value="Premium"
        :icon="TrendingUp"
        colorClass="bg-indigo-50 text-indigo-600"
      />
    </div>

    <!-- Filter Bar -->
    <AdminCard
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
            placeholder="Search articles by title or keywords..."
          />
        </div>

        <!-- Desktop Filters -->
        <div class="flex flex-wrap gap-2.5 w-full lg:w-auto justify-end">
          <select
            v-model="statusFilter"
            class="select-field !py-3.5 !px-5 !rounded-2xl !text-[10px] !font-black uppercase tracking-widest md:w-40"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <select
            v-model="sortOrder"
            class="select-field !py-3.5 !px-5 !rounded-2xl !text-[10px] !font-black uppercase tracking-widest md:w-40 bg-slate-50 border-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">A-Z</option>
          </select>
        </div>
      </div>
    </AdminCard>

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
            >{{ selectedIds.length }} posts selected</span
          >
        </div>

        <div class="flex gap-2">
          <button
            @click="bulkUpdateStatus('published')"
            class="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Publish
          </button>
          <button
            @click="bulkUpdateStatus('draft')"
            class="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Set Draft
          </button>
          <div class="w-px bg-white/10 mx-2 self-stretch"></div>
          <button
            @click="handleBulkDelete"
            class="px-5 py-2.5 rounded-2xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </transition>

    <!-- Table Content -->
    <AdminCard
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
          Harvesting content...
        </p>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="p-20 text-center">
        <div
          class="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100"
        >
          <BookOpen :size="40" class="text-slate-200" />
        </div>
        <h3 class="text-[#1B2559] font-black text-lg">No articles found</h3>
        <p class="text-slate-400 text-sm mt-1">
          Try refining your search or filter parameters.
        </p>
        <button
          v-if="searchQuery || statusFilter !== 'all'"
          @click="resetFilters"
          class="mt-6 text-[#702DFF] text-xs font-black uppercase tracking-widest hover:underline"
        >
          Clear Filters
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
              <th>Article Identity</th>
              <th>Category</th>
              <th>Publication State</th>
              <th>Date Info</th>
              <th class="text-right !pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in paginatedPosts"
              :key="post.id"
              class="table-row-hover group"
              :class="selectedIds.includes(post.id) ? 'bg-indigo-50/40' : ''"
            >
              <td class="text-center !pl-8">
                <input
                  type="checkbox"
                  :value="post.id"
                  v-model="selectedIds"
                  class="rounded-lg border-slate-300 text-[#702DFF] focus:ring-[#702DFF] h-4 w-4"
                />
              </td>
              <td class="cursor-pointer" @click="handleEdit(post)">
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 rounded-[24px] overflow-hidden bg-slate-100 border border-slate-100 shadow-sm shrink-0"
                  >
                    <img
                      v-if="post.featured_image"
                      :src="post.featured_image"
                      class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center bg-indigo-50/50"
                    >
                      <FileText :size="20" class="text-[#702DFF] opacity-30" />
                    </div>
                  </div>
                  <div>
                    <h3
                      class="font-black text-[#1B2559] leading-tight text-sm tracking-tight group-hover:text-[#702DFF] transition-colors line-clamp-1 max-w-[300px]"
                    >
                      {{ post.title }}
                    </h3>
                    <p
                      class="text-[11px] text-slate-400 line-clamp-1 mt-1 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity"
                    >
                      {{ post.excerpt || "No summary overview provided..." }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="hidden lg:table-cell">
                <div
                  v-if="post.categories?.length"
                  class="flex flex-wrap gap-1.5"
                >
                  <span
                    v-for="cat in post.categories"
                    :key="typeof cat === 'string' ? cat : cat.id"
                    class="px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#702DFF] border border-indigo-100/50"
                  >
                    {{ typeof cat === "string" ? cat : cat.name }}
                  </span>
                </div>
                <span
                  v-else
                  class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                  >General</span
                >
              </td>
              <td>
                <select
                  :value="post.status"
                  @change="onStatusChange(post, $event)"
                  class="appearance-none cursor-pointer px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all outline-none shadow-sm"
                  :class="
                    post.status === 'published'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'
                  "
                >
                  <option value="published">PUBLISHED</option>
                  <option value="draft">DRAFT</option>
                </select>
              </td>
              <td>
                <div class="flex flex-col">
                  <span
                    class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >{{
                      formatDate(post.published_at || post.created_at)
                    }}</span
                  >
                  <span
                    class="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5"
                    >{{
                      formatTime(post.published_at || post.created_at)
                    }}</span
                  >
                </div>
              </td>
              <td class="!pr-8">
                <div class="flex items-center justify-end gap-1 transition-all">
                  <button
                    @click="handleView(post)"
                    class="p-2.5 rounded-xl text-[#702DFF] hover:bg-indigo-50 transition-colors"
                    title="View Public Article"
                  >
                    <ExternalLink :size="16" />
                  </button>
                  <button
                    @click="handleEdit(post)"
                    class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                  >
                    <Edit2 :size="16" />
                  </button>
                  <button
                    @click="handleDelete(post)"
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
        v-if="filteredPosts.length > 0"
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
            {{ filteredPosts.length }} Articles
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
    </AdminCard>

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Purge Content"
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
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  CheckSquare,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-vue-next";
import { blogService } from "../services/blogService";
import type { BlogPost } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import StatsCard from "../components/ui/StatsCard.vue";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const router = useRouter();
const posts = ref<BlogPost[]>([]);
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

// Filters & Selection & Pagination
const searchQuery = ref("");
const statusFilter = ref("all");
const sortOrder = ref("newest");
const selectedIds = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

onMounted(fetchPosts);

async function fetchPosts() {
  loading.value = true;
  try {
    posts.value = await blogService.getAll();
  } catch (err) {
    showToast("Failed to fetch posts", "error");
  } finally {
    loading.value = false;
  }
}

const publishedCount = computed(
  () => posts.value.filter((p) => p.status === "published").length,
);

const filteredPosts = computed(() => {
  let result = [...posts.value];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q)),
    );
  }
  if (statusFilter.value !== "all") {
    result = result.filter((p) => p.status === statusFilter.value);
  }
  result.sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    if (sortOrder.value === "newest") return dateB - dateA;
    if (sortOrder.value === "oldest") return dateA - dateB;
    if (sortOrder.value === "title") return a.title.localeCompare(b.title);
    return 0;
  });
  return result;
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPosts.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / itemsPerPage.value),
);
const startIndex = computed(() =>
  filteredPosts.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const endIndex = computed(() =>
  Math.min(
    startIndex.value + itemsPerPage.value - 1,
    filteredPosts.value.length,
  ),
);
const isAllSelected = computed(
  () =>
    paginatedPosts.value.length > 0 &&
    paginatedPosts.value.every((p) => selectedIds.value.includes(p.id)),
);

watch([searchQuery, statusFilter, itemsPerPage], () => (currentPage.value = 1));

const resetFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "all";
  sortOrder.value = "newest";
};
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const pageIds = paginatedPosts.value.map((p) => p.id);
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id));
  } else {
    paginatedPosts.value.forEach((p) => {
      if (!selectedIds.value.includes(p.id)) selectedIds.value.push(p.id);
    });
  }
};

const showToast = (m: string, v: "success" | "error") => {
  toast.value = { show: true, message: m, variant: v };
};
const formatTime = (d: string) =>
  d
    ? new Date(d).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
const formatDate = (d: string) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Draft";

const onStatusChange = (post: BlogPost, event: Event) => {
  const newVal = (event.target as HTMLSelectElement).value as any;
  handleQuickStatusChange(post, newVal);
};

const handleQuickStatusChange = async (post: BlogPost, newStatus: any) => {
  const old = post.status;
  post.status = newStatus;
  try {
    await blogService.update(post.id, { status: newStatus });
    showToast(`Status updated`, "success");
  } catch (e) {
    post.status = old;
    showToast("Failed to update", "error");
  }
};

const bulkUpdateStatus = async (status: any) => {
  const ids = [...selectedIds.value];
  selectedIds.value = [];
  for (const id of ids) {
    const post = posts.value.find((p) => p.id === id);
    if (post) post.status = status;
    await blogService.update(id, { status });
  }
  showToast("Bulk update complete", "success");
};

const handleEdit = (post: BlogPost) => router.push(`/blog/${post.id}/edit`);
const handleView = (post: BlogPost) =>
  window.open(`https://kangjessy.com/blog/${post.slug || post.id}`, "_blank");
const handleDelete = (post: BlogPost) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Article?",
    message: `Remove "${post.title}"?`,
    targetId: post.id,
    isBulk: false,
  };
};
const handleBulkDelete = () => {
  confirmModal.value = {
    isOpen: true,
    title: "Purge Selected?",
    message: `Remove ${selectedIds.value.length} articles?`,
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
      await blogService.delete(id);
      posts.value = posts.value.filter((p) => p.id !== id);
    }
    showToast("Articles purged", "success");
  } else if (targetId) {
    await blogService.delete(targetId);
    posts.value = posts.value.filter((p) => p.id !== targetId);
    showToast("Article removed", "success");
  }
};
</script>
