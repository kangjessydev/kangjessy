<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="BentoTable Demo"
      subtitle="Reusable table component following Bento design system"
    >
      <ButtonSecondary @click="fetchData">
        <RotateCw :size="18" :class="{ 'animate-spin': isLoading }" />
        Refresh Data
      </ButtonSecondary>
    </PageHeader>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <BentoStat
        title="Total Records"
        :value="tableData.length"
        :icon="Database"
        variant="blue"
      />
      <BentoStat
        title="Active"
        :value="activeCount"
        :icon="CheckCircle"
        variant="success"
      />
      <BentoStat
        title="Pending"
        :value="pendingCount"
        :icon="Clock"
        variant="warning"
      />
      <BentoStat
        title="Archived"
        :value="archivedCount"
        :icon="Archive"
        variant="primary"
      />
    </div>

    <!-- BentoTable Component -->
    <BentoTable
      :columns="columns"
      :items="tableData"
      :loading="isLoading"
      loading-text="Loading demo data..."
      empty-title="No data available"
      empty-message="Click the refresh button to load sample data"
      :empty-icon="Database"
      container-class="mb-12"
    >
      <!-- Custom Name Cell -->
      <template #cell-name="{ item }">
        <div class="flex flex-col">
          <p
            class="font-black text-[#1B2559] leading-tight text-sm tracking-tight group-hover:text-[#702DFF] transition-colors truncate max-w-[180px] mb-1.5"
          >
            {{ item.name }}
          </p>
          <div class="flex items-center gap-1.5">
            <span
              class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
            >
              ID: {{ item.id }}
            </span>
          </div>
        </div>
      </template>

      <!-- Custom Email Cell -->
      <template #cell-email="{ value }">
        <a
          :href="`mailto:${value}`"
          class="text-[11px] font-bold text-indigo-500 hover:text-[#702DFF] transition-colors"
        >
          {{ value }}
        </a>
      </template>

      <!-- Custom Status Cell with Badge -->
      <template #cell-status="{ item }">
        <select
          v-model="item.status"
          @change="onStatusChange(item)"
          class="appearance-none cursor-pointer px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all outline-none shadow-sm w-32"
          :class="getStatusClass(item.status)"
        >
          <option value="Active">ACTIVE</option>
          <option value="Pending">PENDING</option>
          <option value="Archived">ARCHIVED</option>
        </select>
      </template>

      <!-- Custom Role Cell -->
      <template #cell-role="{ value }">
        <span class="badge-chip" :class="getRoleBadge(value)">
          {{ value }}
        </span>
      </template>

      <!-- Custom Actions Cell -->
      <template #cell-actions="{ item }">
        <div
          class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all"
        >
          <button
            @click="viewItem(item)"
            class="btn-action bg-indigo-50 text-indigo-600 hover:bg-[#702DFF] hover:text-white"
            title="View Details"
          >
            <Eye :size="16" />
          </button>
          <button
            @click="editItem(item)"
            class="btn-action bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
            title="Edit"
          >
            <Edit :size="16" />
          </button>
          <button
            @click="deleteItem(item)"
            class="btn-action bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white"
            title="Delete"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </template>

      <!-- Mobile View -->
      <template #mobile-content="{ item }">
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <p class="font-black text-[#1B2559] text-sm leading-tight mb-1">
              {{ item.name }}
            </p>
            <p
              class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
            >
              {{ item.email }}
            </p>
          </div>
          <select
            v-model="item.status"
            @change="onStatusChange(item)"
            class="appearance-none px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border-2 outline-none shadow-sm"
            :class="getStatusClass(item.status)"
          >
            <option value="Active">ACTIVE</option>
            <option value="Pending">PENDING</option>
            <option value="Archived">ARCHIVED</option>
          </select>
        </div>

        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <span
              class="text-[8px] font-black text-indigo-400 uppercase tracking-widest"
              >Role</span
            >
            <div class="h-[1px] flex-1 bg-slate-50"></div>
          </div>
          <span class="badge-chip text-[8px]" :class="getRoleBadge(item.role)">
            {{ item.role }}
          </span>
        </div>

        <div
          class="flex items-center justify-end gap-2 pt-4 border-t border-slate-50"
        >
          <button
            @click="viewItem(item)"
            class="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center"
          >
            <Eye :size="16" />
          </button>
          <button
            @click="editItem(item)"
            class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"
          >
            <Edit :size="16" />
          </button>
          <button
            @click="deleteItem(item)"
            class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </template>
    </BentoTable>

    <!-- Toast Notification -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  RotateCw,
  Database,
  CheckCircle,
  Clock,
  Archive,
  Eye,
  Edit,
  Trash2,
} from "lucide-vue-next";
import BentoTable, { type TableColumn } from "../components/ui/BentoTable.vue";
import BentoStat from "../components/ui/BentoStat.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import ButtonSecondary from "../components/ui/ButtonSecondary.vue";
import Toast from "../components/ui/Toast.vue";

// Table Configuration
const columns: TableColumn[] = [
  { key: "name", label: "Name", headerClass: "!pl-8" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  {
    key: "actions",
    label: "Actions",
    align: "right",
    headerClass: "!pr-8",
    cellClass: "!pr-8",
  },
];

// Demo Data
const tableData = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Pending",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Editor",
    status: "Archived",
  },
]);

const isLoading = ref(false);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

// Computed Stats
const activeCount = computed(
  () => tableData.value.filter((item) => item.status === "Active").length,
);
const pendingCount = computed(
  () => tableData.value.filter((item) => item.status === "Pending").length,
);
const archivedCount = computed(
  () => tableData.value.filter((item) => item.status === "Archived").length,
);

// Methods
function fetchData() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    showToast("Data refreshed successfully");
  }, 1500);
}

function getStatusClass(status: string) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Pending":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "Archived":
      return "bg-slate-50 text-slate-400 border-slate-100";
    default:
      return "bg-slate-50 text-slate-400 border-slate-100";
  }
}

function getRoleBadge(role: string) {
  switch (role) {
    case "Admin":
      return "badge-new";
    case "Editor":
      return "badge-warning";
    case "Viewer":
      return "badge-gray";
    default:
      return "badge-gray";
  }
}

function onStatusChange(item: any) {
  showToast(`${item.name}'s status changed to ${item.status}`);
}

function viewItem(item: any) {
  showToast(`Viewing details for ${item.name}`);
}

function editItem(item: any) {
  showToast(`Editing ${item.name}`);
}

function deleteItem(item: any) {
  if (confirm(`Delete ${item.name}?`)) {
    const index = tableData.value.findIndex((i) => i.id === item.id);
    if (index > -1) {
      tableData.value.splice(index, 1);
      showToast(`${item.name} deleted`, "error");
    }
  }
}

function showToast(message: string, variant: "success" | "error" = "success") {
  toast.value = { show: true, message, variant };
}
</script>

<style scoped>
.btn-action {
  @apply w-10 h-10 rounded-2xl transition-all flex items-center justify-center;
}
</style>
