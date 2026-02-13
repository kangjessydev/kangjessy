<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="Articles & News"
      subtitle="Bagikan pemikiran dan pembaruan terbaru dengan audiens Anda"
    >
      <BaseButton variant="primary" @click="router.push('/blog/new')">
        <Plus :size="18" />
        Tulis Artikel Baru
      </BaseButton>
    </PageHeader>

    <!-- Statistik -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <BentoStat
        title="Total Artikel"
        :value="posts.length"
        :icon="FileText"
        variant="blue"
        tooltip="Total keseluruhan artikel yang pernah ditulis."
      />
      <BentoStat
        title="Tayang"
        :value="publishedCount"
        :icon="CheckCircle"
        variant="success"
        tooltip="Artikel yang saat ini dapat diakses publik di website."
      />
      <BentoStat
        title="Draf"
        :value="posts.length - publishedCount"
        :icon="Clock"
        variant="warning"
        tooltip="Artikel yang masih dalam proses penulisan dan belum terbit."
      />
      <BentoStat
        title="Engagement"
        value="A+"
        :icon="TrendingUp"
        variant="primary"
        tooltip="Capaian jangkauan artikel (Simulasi)."
      />
    </div>

    <!-- Filter Bar -->
    <AdminCard
      no-padding
      class="mb-6 rounded-[32px]! border-none shadow-sm overflow-hidden"
    >
      <div
        class="flex flex-col lg:flex-row gap-4 justify-between items-center p-3 sm:p-4"
      >
        <div class="flex-1 w-full lg:max-w-md relative group px-1 lg:px-0">
          <BaseInput
            v-model="searchQuery"
            placeholder="Cari artikel berdasarkan judul atau kata kunci..."
            :icon="Search"
            class="w-full"
            @input="currentPage = 1"
          />
        </div>

        <div class="flex flex-wrap gap-2.5 w-full lg:w-auto justify-end">
          <AdminSelect
            v-model="statusFilter"
            class="md:w-40"
            @change="currentPage = 1"
          >
            <option value="all">Semua Status</option>
            <option value="published">Tayang</option>
            <option value="draft">Draf</option>
          </AdminSelect>

          <AdminSelect
            v-model="sortOrder"
            class="md:w-40 bg-slate-50 border-none"
            @change="currentPage = 1"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="title">A-Z</option>
          </AdminSelect>

          <div class="h-8 w-px bg-slate-100 mx-1 hidden md:block"></div>

          <div
            class="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-inner"
          >
            <button
              @click="viewMode = 'table'"
              class="p-2 rounded-lg transition-all"
              :class="
                viewMode === 'table'
                  ? 'bg-white text-[#7029FF] shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              "
              title="Table View"
            >
              <LayoutList :size="16" />
            </button>
            <button
              @click="viewMode = 'grid'"
              class="p-2 rounded-lg transition-all"
              :class="
                viewMode === 'grid'
                  ? 'bg-white text-[#7029FF] shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              "
              title="Grid View"
            >
              <LayoutGrid :size="16" />
            </button>
          </div>
        </div>
      </div>
    </AdminCard>

    <!-- Floating Bulk Action Bar -->
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
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-2xl bg-[#1B2559] text-white px-8 py-4 rounded-[40px] shadow-2xl flex items-center gap-8 border border-white/10 backdrop-blur-xl"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <CheckSquare :size="18" class="text-indigo-400" />
          </div>
          <span class="font-black text-sm tracking-tight"
            >{{ selectedIds.length }} artikel terpilih</span
          >
        </div>

        <div class="flex gap-2">
          <button
            @click="bulkUpdateStatus('published')"
            class="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Tayangkan
          </button>
          <button
            @click="bulkUpdateStatus('draft')"
            class="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Jadikan Draf
          </button>
          <div class="w-px bg-white/10 mx-2 self-stretch"></div>
          <button
            @click="handleBulkDelete"
            class="px-5 py-2.5 rounded-2xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all"
          >
            Hapus
          </button>
        </div>
      </div>
    </transition>

    <AdminCard
      no-padding
      class="bg-white overflow-hidden rounded-[32px]! border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-12"
    >
      <div v-if="loading" class="p-20 text-center">
        <div
          class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
        ></div>
        <p
          class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          Menyusun Konten...
        </p>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="p-20 text-center">
        <div
          class="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100"
        >
          <BookOpen :size="40" class="text-slate-200" />
        </div>
        <h3 class="text-[#1B2559] font-black text-lg">
          Artikel tidak ditemukan
        </h3>
        <p class="text-slate-400 text-sm mt-1">
          Coba sesuaikan kata kunci pencarian atau filter Anda.
        </p>
        <button
          v-if="searchQuery || statusFilter !== 'all'"
          @click="resetFilters"
          class="mt-6 text-[#702DFF] text-xs font-black uppercase tracking-widest hover:underline"
        >
          Bersihkan Filter
        </button>
      </div>

      <div v-else>
        <!-- Mode Tabel -->
        <div v-if="viewMode === 'table'" class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th class="w-12 text-center pl-8!">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                    class="rounded-lg border-slate-300 text-[#702DFF] focus:ring-[#702DFF] h-4 w-4"
                  />
                </th>
                <th :class="{ 'pl-8!': !isSelectionMode }">
                  Identitas Artikel
                </th>
                <th>Kategori</th>
                <th>Status Publikasi</th>
                <th>Info Tanggal</th>
                <th class="text-right pr-8!">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="post in paginatedPosts"
                :key="post.id"
                class="table-row-hover group"
                :class="selectedIds.includes(post.id) ? 'bg-indigo-50/40' : ''"
              >
                <td class="text-center pl-8!">
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
                        <FileText
                          :size="20"
                          class="text-[#702DFF] opacity-30"
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        class="font-black text-[#1B2559] leading-tight text-sm tracking-tight group-hover:text-[#7029FF] transition-colors line-clamp-1 max-w-[300px]"
                      >
                        {{ post.title }}
                      </h3>
                      <p
                        class="text-[11px] text-slate-400 line-clamp-1 mt-1 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                        {{ post.excerpt || "Tidak ada ringkasan tersedia..." }}
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
                      class="px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#7029FF] border border-indigo-100/50"
                    >
                      {{ typeof cat === "string" ? cat : cat.name }}
                    </span>
                  </div>
                  <span
                    v-else
                    class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                    >Umum</span
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
                    <option value="published">TAYANG</option>
                    <option value="draft">DRAF</option>
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
                <td class="pr-8!">
                  <div
                    class="flex items-center justify-end gap-1 transition-all"
                  >
                    <button
                      @click="handleView(post)"
                      class="p-2.5 rounded-xl text-[#7029FF] hover:bg-indigo-50 transition-colors"
                      title="Pratinjau"
                    >
                      <ExternalLink :size="16" />
                    </button>
                    <button
                      @click="handleEdit(post)"
                      class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 :size="16" />
                    </button>
                    <button
                      @click="handleDelete(post)"
                      class="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mode Grid -->
        <div v-else class="p-6 md:p-10">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start"
          >
            <div
              v-for="post in paginatedPosts"
              :key="post.id"
              class="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:border-[#7029FF]/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
              :class="
                selectedIds.includes(post.id)
                  ? 'ring-2 ring-[#7029FF] ring-offset-4'
                  : ''
              "
            >
              <div
                class="aspect-[16/10] relative overflow-hidden bg-slate-50 cursor-pointer"
                @click="handleEdit(post)"
              >
                <img
                  v-if="post.featured_image"
                  :src="post.featured_image"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-slate-200"
                >
                  <FileText :size="48" />
                </div>

                <!-- Bulk Selection Overlay -->
                <div class="absolute top-4 left-4">
                  <input
                    type="checkbox"
                    :value="post.id"
                    v-model="selectedIds"
                    class="rounded-xl border-white/40 bg-white/30 backdrop-blur-md text-[#702DFF] focus:ring-[#702DFF] h-6 w-6 transition-all cursor-pointer shadow-lg"
                  />
                </div>

                <!-- Status Overlay -->
                <div class="absolute top-4 right-4">
                  <span
                    class="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-sm text-[8px] font-black uppercase tracking-widest border border-white/20"
                    :class="
                      post.status === 'published'
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    "
                  >
                    {{ post.status === "published" ? "Tayang" : "Draf" }}
                  </span>
                </div>
              </div>

              <div class="p-6">
                <div class="mb-5">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="px-2 py-0.5 bg-indigo-50 text-[#7029FF] text-[8px] font-black uppercase tracking-widest rounded-lg border border-indigo-100"
                    >
                      {{
                        (typeof post.categories?.[0] === "string"
                          ? post.categories[0]
                          : post.categories?.[0]?.name) || "Umum"
                      }}
                    </span>
                    <span
                      class="text-[9px] font-bold text-slate-300 uppercase tracking-widest"
                      >{{ formatDate(post.created_at) }}</span
                    >
                  </div>
                  <h4
                    class="font-black text-[#1B2559] group-hover:text-[#7029FF] transition-colors line-clamp-2 text-lg tracking-tight leading-snug h-[3.5rem]"
                  >
                    {{ post.title }}
                  </h4>
                </div>

                <div
                  class="flex items-center justify-between pt-5 border-t border-slate-50"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center"
                    >
                      <FileText :size="12" class="text-slate-400" />
                    </div>
                    <span class="text-[10px] font-bold text-slate-400"
                      >Admin</span
                    >
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button
                      @click="handleView(post)"
                      class="p-2.5 rounded-2xl bg-slate-50 text-slate-400 hover:text-[#7029FF] hover:bg-white border border-transparent hover:border-slate-200 transition-all active:scale-90 shadow-sm"
                    >
                      <ExternalLink :size="16" />
                    </button>
                    <button
                      @click="handleEdit(post)"
                      class="py-2.5 px-5 rounded-2xl bg-[#7029FF] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#1B2559] transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginasi -->
        <div
          v-if="filteredPosts.length > 0"
          class="px-10 py-10 bg-slate-50/50 border-t border-slate-100/50 flex flex-col sm:flex-row justify-between items-center gap-8"
        >
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <span
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >Limit data:</span
              >
              <select
                v-model="itemsPerPage"
                class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-[#1B2559] outline-none shadow-sm transition-all focus:ring-2 focus:ring-[#7029FF]/10"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
              </select>
            </div>
            <span
              class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
            >
              Rentang {{ startIndex }} - {{ endIndex }} dari
              {{ filteredPosts.length }} Artikel
            </span>
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="w-12 h-12 rounded-[22px] bg-white border border-slate-100 disabled:opacity-30 hover:border-[#702DFF] transition-all shadow-sm flex items-center justify-center text-slate-500"
            >
              <ChevronLeft :size="20" />
            </button>
            <div class="flex items-center gap-2">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                class="w-12 h-12 rounded-[22px] text-[10px] font-black transition-all"
                :class="
                  currentPage === page
                    ? 'bg-[#1B2559] text-white shadow-xl shadow-indigo-900/10'
                    : 'bg-white border border-slate-100 text-slate-400 hover:border-[#702DFF] hover:text-[#702DFF] shadow-sm'
                "
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="w-12 h-12 rounded-[22px] bg-white border border-slate-100 disabled:opacity-30 hover:border-[#702DFF] transition-all shadow-sm flex items-center justify-center text-slate-500"
            >
              <ChevronRight :size="20" />
            </button>
          </div>
        </div>
      </div>
    </AdminCard>

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Hapus Permanen"
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
  LayoutList,
  LayoutGrid,
} from "lucide-vue-next";
import { blogService } from "../services/blogService";
import type { BlogPost } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import BentoStat from "../components/ui/BentoStat.vue";
import AdminSelect from "../components/ui/AdminSelect.vue";
import BaseInput from "../components/ui/BaseInput.vue";
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
const viewMode = ref<"table" | "grid">("table");
const searchQuery = ref("");
const statusFilter = ref("all");
const sortOrder = ref("newest");
const selectedIds = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const isSelectionMode = computed(() => selectedIds.value.length > 0);

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
