<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="Proposal Penawaran"
      subtitle="Kelola dan pantau seluruh proposal solusi digital"
    >
      <div class="flex gap-2">
        <ButtonSecondary @click="fetchProposals">
          <RotateCw :size="18" :class="{ 'animate-spin': isLoading }" />
          Selaraskan CMS
        </ButtonSecondary>
        <ButtonPrimary @click="$router.push('/proposals/generator')">
          <Plus :size="18" />
          Buat Proposal Baru
        </ButtonPrimary>
      </div>
    </PageHeader>

    <!-- Stats Summary -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mt-2">
      <BentoStat
        title="Total Proposal"
        :value="proposals.length"
        :icon="FileText"
        variant="blue"
        tooltip="Total seluruh proposal yang tersimpan di sistem."
      />
      <BentoStat
        title="Terkait Lead"
        :value="leadLinkedCount"
        :icon="Users"
        variant="primary"
        unit="Leads"
        tooltip="Proposal yang bermula dari inkuiri form kontak/konsultasi."
      />
      <BentoStat
        title="Independen"
        :value="independentCount"
        :icon="Zap"
        variant="warning"
        unit="Proposal"
        tooltip="Proposal yang dibuat langsung via generator (Manual/Cepat)."
      />
      <BentoStat
        title="Konversi Deal"
        :value="convertedCount"
        :icon="TrendingUp"
        variant="success"
        unit="Deals"
        tooltip="Proposal yang berhasil dikonversi menjadi proyek aktif."
      />
    </div>

    <!-- Filter Bar -->
    <AdminCard
      no-padding
      class="hidden lg:block mb-6 rounded-[32px]! shadow-lg shadow-slate-200/5 border-slate-50 overflow-hidden"
    >
      <div class="flex gap-4 justify-between items-center p-3 sm:p-4">
        <!-- Search -->
        <div class="flex-1 relative group max-w-md">
          <Search
            :size="16"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#702DFF]"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan proyek atau klien..."
            class="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none"
          />
        </div>

        <div class="flex gap-3">
          <div class="relative">
            <select
              v-model="typeFilter"
              class="w-44 appearance-none bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 pr-10 text-[10px] font-black uppercase tracking-widest text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none cursor-pointer"
            >
              <option value="all">Semua Tipe</option>
              <option value="lead">Terkait Lead</option>
              <option value="independent">Independen</option>
            </select>
            <ChevronDown
              :size="14"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
            />
          </div>

          <div class="relative">
            <select
              v-model="statusFilter"
              class="w-44 appearance-none bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 pr-10 text-[10px] font-black uppercase tracking-widest text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Lead">Lead</option>
              <option value="Deal">Deal</option>
              <option value="Pending">Pending</option>
            </select>
            <ChevronDown
              :size="14"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </AdminCard>

    <!-- Mobile Tools -->
    <div class="lg:hidden flex gap-2 mb-6">
      <div class="flex-1 relative">
        <Search
          :size="16"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full bg-white border-2 border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-[#1B2559] shadow-sm outline-none"
        />
      </div>
    </div>

    <!-- Table View -->
    <div v-if="isLoading" class="p-20 text-center">
      <div
        class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
      ></div>
      <p
        class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
      >
        Accessing CMS Vault...
      </p>
    </div>

    <template v-else>
      <!-- Mobile Card View -->
      <div class="lg:hidden space-y-4 mb-8">
        <div
          v-if="paginatedProposals.length === 0"
          class="p-10 text-center bg-white rounded-[32px] border border-slate-100"
        >
          <div
            class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3"
          >
            <Search :size="20" class="text-slate-300" />
          </div>
          <h3 class="text-[#1B2559] font-black text-sm">
            Proposal tidak ditemukan
          </h3>
        </div>

        <div
          v-for="prop in paginatedProposals"
          :key="prop.id"
          class="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4 active:scale-[0.99] transition-transform relative overflow-hidden"
          :class="{
            'ring-2 ring-[#702DFF] bg-indigo-50/10': selectedIds.includes(
              prop.id,
            ),
          }"
        >
          <!-- Selection Overlay/Checkbox -->
          <div
            class="absolute top-0 left-0 w-1.5 h-full bg-slate-100"
            :class="{ 'bg-[#702DFF]': selectedIds.includes(prop.id) }"
          ></div>

          <div class="flex justify-between items-start pl-2">
            <div class="flex gap-3">
              <div class="pt-1">
                <input
                  type="checkbox"
                  :value="prop.id"
                  v-model="selectedIds"
                  class="w-5 h-5 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF]"
                />
              </div>
              <div>
                <span
                  class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border mb-2 inline-block"
                  :class="getStatusClass(prop.status)"
                >
                  {{ prop.status || "New" }}
                </span>
                <h3 class="font-black text-[#1B2559] text-sm leading-tight">
                  {{ prop.project_name || "Unnamed Project" }}
                </h3>
                <p class="text-[10px] font-bold text-slate-400 mt-1">
                  {{ prop.client_name }}
                </p>
              </div>
            </div>
            <button
              @click="handleDelete(prop.id)"
              class="p-2 -mr-2 -mt-2 text-slate-300 hover:text-rose-500 transition-colors"
            >
              <Trash2 :size="16" />
            </button>
          </div>

          <div
            class="flex items-center gap-3 pt-3 border-t border-slate-50 pl-2"
          >
            <div class="flex-1">
              <p
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
              >
                Tipe
              </p>
              <p class="text-[10px] font-bold text-[#1B2559]">
                {{ prop.project_type || "General" }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                @click="$router.push(`/proposals/generator?id=${prop.id}`)"
                class="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                @click="$router.push(`/proposals/${prop.id}`)"
                class="px-3 py-2 bg-[#1B2559] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#702DFF] transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <AdminCard
        no-padding
        class="hidden lg:block overflow-hidden rounded-[32px]! border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-8"
      >
        <div v-if="paginatedProposals.length === 0" class="p-20 text-center">
          <div
            class="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4"
          >
            <Search :size="32" class="text-slate-200" />
          </div>
          <h3 class="text-[#1B2559] font-black text-lg">
            Proposal tidak ditemukan
          </h3>
          <p class="text-slate-400 text-sm mt-1">
            Coba sesuaikan filter Anda atau buat proposal baru.
          </p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th class="pl-8! w-12 text-center">
                  <div class="flex items-center justify-center">
                    <input
                      type="checkbox"
                      :checked="isAllCurrentPageSelected"
                      @change="toggleSelectAll"
                      class="w-4 h-4 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF] cursor-pointer"
                    />
                  </div>
                </th>
                <th>Identitas Proposal</th>
                <th>Kategori</th>
                <th>Tipe Asal</th>
                <th>Status</th>
                <th class="text-right pr-8!">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="prop in paginatedProposals"
                :key="prop.id"
                class="table-row-hover group"
                :class="{ 'bg-indigo-50/30': selectedIds.includes(prop.id) }"
              >
                <td class="!pl-8 w-12 text-center">
                  <div class="flex items-center justify-center">
                    <input
                      type="checkbox"
                      v-model="selectedIds"
                      :value="prop.id"
                      class="w-4 h-4 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF] cursor-pointer"
                    />
                  </div>
                </td>
                <td>
                  <div class="flex flex-col">
                    <p
                      class="font-black text-[#1B2559] text-sm tracking-tight group-hover:text-[#702DFF] transition-colors mb-1"
                    >
                      {{ prop.project_name || "Unnamed Project" }}
                    </p>
                    <div class="flex items-center gap-2">
                      <span
                        class="text-[9px] font-black text-slate-400 uppercase tracking-widest italic"
                        >{{ prop.client_name }}</span
                      >
                      <span class="text-slate-200">•</span>
                      <span class="text-[9px] font-bold text-slate-300"
                        >#{{
                          prop.id
                            ? prop.id.substring(0, 8).toUpperCase()
                            : "NEW"
                        }}</span
                      >
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    class="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase tracking-widest border border-indigo-100/50"
                  >
                    {{ prop.project_type || "General" }}
                  </span>
                </td>
                <td>
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      :class="
                        prop.origin_type === 'from_lead'
                          ? 'bg-indigo-50 text-indigo-500'
                          : 'bg-amber-50 text-amber-500'
                      "
                    >
                      <Users
                        v-if="prop.origin_type === 'from_lead'"
                        :size="14"
                      />
                      <Zap v-else :size="14" />
                    </div>
                    <div>
                      <p
                        class="text-[10px] font-black text-[#1B2559] uppercase tracking-tighter"
                      >
                        {{
                          prop.origin_type === "from_lead"
                            ? "Lead-Linked"
                            : "Independent"
                        }}
                      </p>
                      <p
                        class="text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-60"
                      >
                        {{ prop.lead_id ? "Database Match" : "manual" }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col items-start gap-1">
                    <span
                      class="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest"
                      :class="getStatusClass(prop.status)"
                    >
                      {{ prop.status || "New" }}
                    </span>
                    <span
                      v-if="prop.status === 'approved'"
                      class="text-[8px] font-black text-emerald-500 flex items-center gap-1"
                    >
                      <CheckCircle :size="10" /> CONVERTED
                    </span>
                  </div>
                </td>
                <td class="!pr-8 text-right">
                  <div
                    class="flex items-center justify-end gap-1 transition-all"
                  >
                    <button
                      @click="$router.push(`/proposals/${prop.id}`)"
                      class="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1B2559] hover:text-white transition-all"
                      title="View Proposal"
                    >
                      <Eye :size="16" />
                    </button>
                    <button
                      @click="
                        $router.push(`/proposals/generator?id=${prop.id}`)
                      "
                      class="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-[#702DFF] hover:text-white transition-all"
                      title="Edit Data"
                    >
                      <Edit2 :size="16" />
                    </button>
                    <button
                      @click="handleDelete(prop.id)"
                      class="p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminCard>

      <!-- Pagination Controls -->
      <div
        v-if="totalPages > 1"
        class="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12"
      >
        <p
          class="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left"
        >
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
          {{ Math.min(currentPage * itemsPerPage, filteredProposals.length) }}
          of {{ filteredProposals.length }}
        </p>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            Previous
          </button>
          <div class="flex items-center gap-1">
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="currentPage = page"
              class="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black transition-colors"
              :class="
                currentPage === page
                  ? 'bg-[#702DFF] text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              "
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </template>

    <!-- Bulk Action Bar -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-10 opacity-0"
    >
      <div
        v-if="selectedIds.length > 0"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm px-4"
      >
        <div
          class="bg-[#1B2559] rounded-[24px] p-3 shadow-2xl shadow-indigo-900/40 flex items-center justify-between border border-white/10 backdrop-blur-xl"
        >
          <div class="flex items-center gap-3 pl-2 text-left">
            <div
              class="w-10 h-10 rounded-xl bg-[#702DFF] flex items-center justify-center text-white shadow-lg shadow-[#702DFF]/20 transition-all active:scale-90"
            >
              <CheckSquare :size="20" />
            </div>
            <div>
              <p class="text-white font-black text-sm tracking-tight">
                {{ selectedIds.length }} Selected
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="selectedIds = []"
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              title="Cancel Selection"
            >
              <X :size="18" />
            </button>
            <button
              @click="handleBulkDelete"
              :disabled="isDeleting"
              class="w-10 h-10 flex items-center justify-center bg-rose-500 rounded-xl text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all disabled:opacity-50"
              title="Delete Selected"
            >
              <div
                v-if="isDeleting"
                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              <Trash2 v-else :size="18" />
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modals & Toasts -->
    <ConfirmModal
      :is-open="isConfirmDeleteOpen"
      :title="
        deleteMode === 'bulk' ? 'Mass Destruction Protocol' : 'Hapus Proposal?'
      "
      :message="
        deleteMode === 'bulk'
          ? `Are you sure you want to permanently delete ${selectedIds.length} selected proposals? This action bypasses all protocols and cannot be undone.`
          : 'Proposal ini akan dihapus permanen dari sistem. Lanjutkan?'
      "
      :confirm-text="
        deleteMode === 'bulk' ? 'Confirm Permanent Delete' : 'Ya, Hapus'
      "
      variant="danger"
      :loading="isDeleting"
      @close="isConfirmDeleteOpen = false"
      @confirm="confirmDelete"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import {
  FileText,
  Plus,
  Search,
  RotateCw,
  Users,
  Zap,
  TrendingUp,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  CheckSquare,
  X,
} from "lucide-vue-next";
import proposalService, { type Proposal } from "../services/proposalService";
import { useErrorHandler } from "../composables/useErrorHandler";
import { useLoading } from "../composables/useLoading";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import BentoStat from "../components/ui/BentoStat.vue";
import ButtonPrimary from "../components/ui/ButtonPrimary.vue";
import ButtonSecondary from "../components/ui/ButtonSecondary.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import Toast from "../components/ui/Toast.vue";

const proposals = ref<Proposal[]>([]);
const selectedIds = ref<string[]>([]);
const isDeleting = ref(false);
const isConfirmDeleteOpen = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
const typeFilter = ref("all");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Delete state
const deleteMode = ref<"single" | "bulk">("bulk");
const itemToDelete = ref<string | null>(null);

// Composables
const { handleError } = useErrorHandler();
const { isLoading, withLoading } = useLoading("proposals");

const filteredProposals = computed(() => {
  return proposals.value.filter((p) => {
    const matchesSearch =
      !searchQuery.value ||
      p.project_name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.client_name.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" || p.status === statusFilter.value;

    // Type Filter
    let matchesType = true;
    if (typeFilter.value === "lead")
      matchesType = p.origin_type === "from_lead";
    if (typeFilter.value === "independent")
      matchesType = p.origin_type === "independent";

    return matchesSearch && matchesStatus && matchesType;
  });
});

const leadLinkedCount = computed(
  () => proposals.value.filter((p) => p.origin_type === "from_lead").length,
);
const independentCount = computed(
  () => proposals.value.filter((p) => p.origin_type === "independent").length,
);
const convertedCount = computed(
  () => proposals.value.filter((p) => p.status === "approved").length,
);

const totalPages = computed(() =>
  Math.ceil(filteredProposals.value.length / itemsPerPage),
);

const paginatedProposals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProposals.value.slice(start, end);
});

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  let pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 3) pages = [1, 2, 3, 4, total];
    else if (current >= total - 2)
      pages = [1, total - 3, total - 2, total - 1, total];
    else pages = [1, current - 1, current, current + 1, total];
  }
  return pages;
});

// Reset page on filter change
watch([searchQuery, statusFilter, typeFilter], () => {
  currentPage.value = 1;
  selectedIds.value = [];
});

const isAllCurrentPageSelected = computed(() => {
  return (
    paginatedProposals.value.length > 0 &&
    paginatedProposals.value.every((p) => selectedIds.value.includes(p.id))
  );
});

function toggleSelectAll() {
  if (isAllCurrentPageSelected.value) {
    // Deselect current page items
    selectedIds.value = selectedIds.value.filter(
      (id) => !paginatedProposals.value.find((p) => p.id === id),
    );
  } else {
    // Select all current page items
    const newIds = paginatedProposals.value.map((p) => p.id);
    selectedIds.value = [...new Set([...selectedIds.value, ...newIds])];
  }
}

function getStatusClass(status: string | undefined) {
  const s = status || "Lead";
  switch (s) {
    case "Lead":
      return "bg-indigo-50 text-indigo-600 border border-indigo-100";
    case "Deal":
      return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    case "Pending":
      return "bg-amber-50 text-amber-600 border border-amber-100";
    default:
      return "bg-slate-50 text-slate-400 border border-slate-100";
  }
}

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

function showToast(message: string, variant: "success" | "error" = "success") {
  toast.value = { show: true, message, variant };
  setTimeout(() => (toast.value.show = false), 3000);
}

async function handleBulkDelete() {
  deleteMode.value = "bulk";
  isConfirmDeleteOpen.value = true;
}

async function handleDelete(id: string) {
  // Reset selectedIds to avoid confusion if bulk mode was active
  // selectedIds.value = [];
  // actually, keep selection, just delete one item.
  deleteMode.value = "single";
  itemToDelete.value = id;
  isConfirmDeleteOpen.value = true;
}

async function confirmDelete() {
  isDeleting.value = true;
  try {
    if (deleteMode.value === "bulk") {
      for (const id of selectedIds.value) {
        await proposalService.delete(id);
      }
      showToast(`${selectedIds.value.length} proposals deleted`, "success");
      selectedIds.value = [];
    } else {
      if (itemToDelete.value) {
        await proposalService.delete(itemToDelete.value);
        showToast("Proposal deleted", "success");
      }
    }
    await fetchProposals();
  } catch (e: any) {
    showToast(e.message || "Failed to delete proposals", "error");
  } finally {
    isDeleting.value = false;
    isConfirmDeleteOpen.value = false;
    itemToDelete.value = null;
  }
}

async function fetchProposals() {
  await withLoading(async () => {
    try {
      proposals.value = await proposalService.getAll();
    } catch (err) {
      handleError(err, "Sync CMS");
    }
  });
}

onMounted(() => {
  fetchProposals();
});
</script>
