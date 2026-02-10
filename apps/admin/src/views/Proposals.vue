<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="CMS Proposal"
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
          <button
            @click="isSelectionMode = !isSelectionMode"
            class="px-5 h-12 rounded-2xl border-2 flex items-center justify-center transition-all active:scale-95 gap-2"
            :class="
              isSelectionMode
                ? 'bg-[#702DFF] border-[#702DFF] text-white'
                : 'bg-slate-50 border-transparent text-slate-400 hover:text-[#702DFF]'
            "
          >
            <CheckSquare :size="16" />
            <span class="text-[10px] font-black uppercase tracking-widest">{{
              isSelectionMode ? "Mode AKTIF" : "Seleksi"
            }}</span>
          </button>

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
      <button
        @click="isSelectionMode = !isSelectionMode"
        class="w-14 h-auto rounded-2xl border-2 flex items-center justify-center transition-all shadow-sm active:scale-90"
        :class="
          isSelectionMode
            ? 'bg-[#702DFF] border-[#702DFF] text-white'
            : 'bg-white border-slate-100 text-[#702DFF]'
        "
      >
        <CheckSquare :size="20" />
      </button>
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

    <AdminCard
      v-else
      no-padding
      class="overflow-hidden rounded-[32px]! border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-12"
    >
      <div v-if="filteredProposals.length === 0" class="p-20 text-center">
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
              <th v-if="isSelectionMode" class="pl-8! w-12 text-center">
                <div class="flex items-center justify-center">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                    class="w-4 h-4 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF] cursor-pointer"
                  />
                </div>
              </th>
              <th :class="{ 'pl-8!': !isSelectionMode }">Identitas Proposal</th>
              <th>Kategori</th>
              <th>Tipe Asal</th>
              <th>Status</th>
              <th class="text-right pr-8!">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prop in filteredProposals"
              :key="prop.id"
              class="table-row-hover group"
              :class="{ 'bg-indigo-50/30': selectedIds.includes(prop.id) }"
            >
              <td v-if="isSelectionMode" class="!pl-8 w-12 text-center">
                <div class="flex items-center justify-center">
                  <input
                    type="checkbox"
                    v-model="selectedIds"
                    :value="prop.id"
                    class="w-4 h-4 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF] cursor-pointer"
                  />
                </div>
              </td>
              <td :class="{ '!pl-8': !isSelectionMode }">
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
                        prop.id ? prop.id.substring(0, 8).toUpperCase() : "NEW"
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
                    <Users v-if="prop.origin_type === 'from_lead'" :size="14" />
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
                <div class="flex items-center justify-end gap-1 transition-all">
                  <button
                    @click="$router.push(`/proposals/${prop.id}`)"
                    class="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1B2559] hover:text-white transition-all"
                    title="View Proposal"
                  >
                    <Eye :size="16" />
                  </button>
                  <button
                    @click="$router.push(`/proposals/generator?id=${prop.id}`)"
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
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-2xl px-4"
      >
        <div
          class="bg-[#1B2559] rounded-[32px] p-4 shadow-2xl shadow-indigo-900/40 flex items-center justify-between border border-white/10 backdrop-blur-xl"
        >
          <div class="flex items-center gap-4 pl-4 text-left">
            <div
              class="w-10 h-10 rounded-2xl bg-[#702DFF] flex items-center justify-center text-white shadow-lg shadow-[#702DFF]/20 transition-all active:scale-90"
            >
              <CheckSquare :size="20" />
            </div>
            <div>
              <p class="text-white font-black text-sm tracking-tight">
                {{ selectedIds.length }} Selected
              </p>
              <p
                class="text-slate-400 text-[10px] uppercase font-black tracking-widest"
              >
                Manage proposals bulkly
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="
                selectedIds = [];
                isSelectionMode = false;
              "
              class="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleBulkDelete"
              :disabled="isBulkDeleting"
              class="px-8 py-3 bg-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Trash2 :size="14" v-if="!isBulkDeleting" />
              <div
                v-else
                class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modals & Toasts -->
    <ConfirmModal
      :is-open="isConfirmDeleteOpen"
      title="Mass Destruction Protocol"
      :message="`Are you sure you want to permanently delete ${selectedIds.length} selected proposals? This action bypasses all protocols and cannot be undone.`"
      confirm-text="Confirm Permanent Delete"
      variant="danger"
      :loading="isBulkDeleting"
      @close="isConfirmDeleteOpen = false"
      @confirm="confirmBulkDelete"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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
const isBulkDeleting = ref(false);
const isConfirmDeleteOpen = ref(false);
const isSelectionMode = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
const typeFilter = ref("all");

// Composables
const { handleError } = useErrorHandler();
const { isLoading, withLoading } = useLoading("proposals");

const isAllSelected = computed(() => {
  return (
    filteredProposals.value.length > 0 &&
    selectedIds.value.length === filteredProposals.value.length
  );
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = filteredProposals.value.map((p) => p.id);
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
  isConfirmDeleteOpen.value = true;
}

async function confirmBulkDelete() {
  isBulkDeleting.value = true;
  try {
    for (const id of selectedIds.value) {
      await proposalService.delete(id);
    }
    showToast(`${selectedIds.value.length} proposals deleted`, "success");
    selectedIds.value = [];
    isSelectionMode.value = false;
    await fetchProposals();
  } catch (e: any) {
    showToast(e.message || "Failed to delete proposals", "error");
  } finally {
    isBulkDeleting.value = false;
    isConfirmDeleteOpen.value = false;
  }
}

async function handleDelete(id: string) {
  if (!confirm("Are you sure you want to delete this proposal?")) return;
  try {
    await proposalService.delete(id);
    proposals.value = proposals.value.filter((p) => p.id !== id);
    showToast("Proposal deleted", "success");
  } catch (err: any) {
    showToast(err.message || "Delete failed", "error");
  }
}

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
