<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="Financial Intelligence"
      subtitle="Monitor cash flow, debt recovery, and project profitability"
    >
      <div class="flex gap-2">
        <ButtonSecondary @click="fetchData">
          <RotateCw :size="18" :class="{ 'animate-spin': loading }" />
          Sync Ledger
        </ButtonSecondary>
        <ButtonPrimary @click="isModalOpen = true">
          <Plus :size="18" />
          Add Transaction
        </ButtonPrimary>
      </div>
    </PageHeader>

    <!-- Navigation Tabs -->
    <div
      class="flex gap-1 p-1 bg-slate-100/50 backdrop-blur-md rounded-[22px] w-fit mb-8 border border-slate-200/50"
    >
      <button
        @click="activeTab = 'ledger'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'ledger'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <BookOpen :size="14" />
        Buku Kas
      </button>
      <button
        @click="activeTab = 'commitments'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'commitments'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <HandCoins :size="14" />
        Hutang & Piutang
      </button>
      <button
        @click="activeTab = 'intelligence'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'intelligence'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <TrendingUp :size="14" />
        Intelligence
      </button>
    </div>

    <!-- Stats Summary Section -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
      <BentoStat
        title="Saldo Kas (Cash)"
        :value="stats.netCashflow"
        :icon="Wallet"
        variant="primary"
        is-currency
        tooltip="Total uang nyata yang ada di tangan saat ini (Pemasukan dikurangi Pengeluaran)."
        simulation="Pastikan saldo ini cukup untuk menutupi biaya operasional (Burn Rate) minimal untuk 3 bulan ke depan."
      />
      <BentoStat
        title="Piutang (Receivables)"
        :value="stats.totalReceivables"
        :icon="ArrowUpRight"
        variant="success"
        is-currency
        tooltip="Uang klien yang seharusnya masuk ke kita tapi belum dibayar (Misal: Sisa pelunasan proyek)."
        simulation="Tagih Piutang ini segera! Ini adalah modal Kakak yang tertahan di orang lain."
      />
      <BentoStat
        title="Pengeluaran (Expenses)"
        :value="stats.totalExpenses"
        :icon="ArrowDownLeft"
        variant="danger"
        is-currency
        tooltip="Total uang yang sudah keluar untuk operasional maupun modal proyek."
        simulation="Fokuskan pengeluaran pada aset yang mendatangkan ROI (Return on Investment) tinggi."
      />
      <BentoStat
        title="Hutang (Debts)"
        :value="stats.totalDebts"
        :icon="CreditCard"
        variant="warning"
        is-currency
        tooltip="Uang yang Kakak pinjam dari orang lain/vendor dan harus dikembalikan."
        simulation="Hutang produktif (untuk modal kerja) itu bagus, asal cicilannya tidak mengganggu cashflow."
      />
    </div>

    <!-- Tab Content: Ledger -->
    <div v-if="activeTab === 'ledger'" class="space-y-6 animate-fade-in">
      <DashboardCard title="Global Transaction Ledger" no-padding>
        <template #action>
          <div class="flex items-center gap-4">
            <div class="relative">
              <Search
                :size="14"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari transaksi..."
                class="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all w-48 md:w-64"
              />
            </div>
          </div>
        </template>

        <div v-if="loading" class="p-20 text-center">
          <RotateCw
            :size="32"
            class="animate-spin text-indigo-500 mx-auto mb-4"
          />
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Processing Data...
          </p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th class="!pl-8">Deskripsi & Tipe</th>
                <th>Kategori</th>
                <th>Project/Link</th>
                <th>Nominal</th>
                <th>Tanggal</th>
                <th class="text-right !pr-8">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredLedger.length === 0">
                <td
                  colspan="6"
                  class="p-20 text-center text-slate-300 font-bold uppercase tracking-widest text-[10px]"
                >
                  Tidak ada data transaksi ditemukan
                </td>
              </tr>
              <tr
                v-for="tx in filteredLedger"
                :key="tx.id"
                class="table-row-hover group"
              >
                <td class="!pl-8">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border"
                      :class="getTypeClass(tx.type)"
                    >
                      <component :is="getIconComponent(tx.type)" :size="18" />
                    </div>
                    <div>
                      <p
                        class="font-black text-[#1B2559] leading-tight text-sm tracking-tight capitalize"
                      >
                        {{ tx.title }}
                      </p>
                      <p
                        class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1 opacity-60"
                      >
                        {{ tx.type }} •
                        {{ tx.payment_method?.replace("_", " ") || "Manual" }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    class="px-2 py-1 bg-slate-50 text-slate-500 text-[8px] font-black rounded-lg uppercase tracking-widest border border-slate-100"
                  >
                    {{ tx.category || "General" }}
                  </span>
                </td>
                <td>
                  <div v-if="tx.project" class="flex flex-col">
                    <p
                      class="text-[10px] font-black text-indigo-600 uppercase tracking-tight truncate max-w-[150px]"
                    >
                      {{ tx.project.project_name }}
                    </p>
                    <p
                      class="text-[8px] font-bold text-slate-400 uppercase opacity-60"
                    >
                      {{ tx.client?.name || "Linked Project" }}
                    </p>
                  </div>
                  <span
                    v-else
                    class="text-[9px] font-black text-slate-300 uppercase italic"
                    >Internal</span
                  >
                </td>
                <td
                  class="font-black text-sm"
                  :class="
                    tx.type === 'income' || tx.type === 'receivable'
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  "
                >
                  <div class="flex flex-col">
                    <span
                      >{{
                        tx.type === "income" || tx.type === "receivable"
                          ? "+"
                          : "-"
                      }}
                      {{ formatPrice(tx.amount) }}</span
                    >
                    <span
                      v-if="tx.status === 'pending'"
                      class="text-[8px] text-amber-500 uppercase tracking-widest"
                      >PENDING</span
                    >
                  </div>
                </td>
                <td>
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    {{ formatDate(tx.transaction_date) }}
                  </p>
                </td>
                <td class="!pr-8 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="confirmDelete(tx)"
                      class="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>

    <!-- Tab Content: Commitments (Hutang Piutang) -->
    <div
      v-else-if="activeTab === 'commitments'"
      class="animate-fade-in space-y-8"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Receivables (Piutang) -->
        <DashboardCard title="Daftar Piutang (Uang Masuk Tertunda)" no-padding>
          <div class="overflow-x-auto">
            <table class="table-main">
              <thead>
                <tr>
                  <th class="!pl-6">Klien/Proyek</th>
                  <th>Nominal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tx in receivables"
                  :key="tx.id"
                  class="table-row-hover"
                >
                  <td class="!pl-6">
                    <p class="text-[11px] font-black text-[#1B2559] uppercase">
                      {{ tx.client?.name || tx.title }}
                    </p>
                    <p class="text-[9px] font-bold text-slate-400">
                      {{ tx.project?.project_name || "General" }}
                    </p>
                  </td>
                  <td class="font-black text-emerald-600">
                    {{ formatPrice(tx.amount) }}
                  </td>
                  <td>
                    <button
                      @click="markAsCompleted(tx)"
                      class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-lg uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Mark Paid
                    </button>
                  </td>
                </tr>
                <tr v-if="receivables.length === 0">
                  <td
                    colspan="3"
                    class="p-10 text-center text-slate-300 font-bold uppercase text-[9px]"
                  >
                    Zero receivables recorded
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <!-- Debts (Hutang) -->
        <DashboardCard title="Daftar Hutang (Uang Keluar Tertunda)" no-padding>
          <div class="overflow-x-auto">
            <table class="table-main">
              <thead>
                <tr>
                  <th class="!pl-6">Kreditur/Keterangan</th>
                  <th>Nominal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in debts" :key="tx.id" class="table-row-hover">
                  <td class="!pl-6">
                    <p class="text-[11px] font-black text-[#1B2559] uppercase">
                      {{ tx.title }}
                    </p>
                    <p class="text-[9px] font-bold text-slate-400 capitalize">
                      {{ tx.category }}
                    </p>
                  </td>
                  <td class="font-black text-rose-600">
                    {{ formatPrice(tx.amount) }}
                  </td>
                  <td>
                    <button
                      @click="markAsCompleted(tx)"
                      class="px-3 py-1 bg-rose-50 text-rose-600 text-[8px] font-black rounded-lg uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all"
                    >
                      Mark Repaid
                    </button>
                  </td>
                </tr>
                <tr v-if="debts.length === 0">
                  <td
                    colspan="3"
                    class="p-10 text-center text-slate-300 font-bold uppercase text-[9px]"
                  >
                    Zero active debts
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>

    <!-- Tab Content: Intelligence (Analytic Charts) -->
    <div
      v-else-if="activeTab === 'intelligence'"
      class="animate-fade-in space-y-8"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <DashboardCard title="90-Day Cashflow Momentum" class="lg:col-span-8">
          <div class="h-80 flex items-end justify-between px-4 pb-4">
            <div
              v-for="(day, idx) in monthlyTrends"
              :key="idx"
              class="flex flex-col items-center gap-4 flex-1"
            >
              <div class="w-full flex items-end justify-center gap-1 h-full">
                <!-- Progress bar for income -->
                <div
                  class="w-8 bg-indigo-500/10 rounded-t-lg relative overflow-hidden group/bar"
                  :style="{ height: (day.income / maxTrendValue) * 100 + '%' }"
                >
                  <div
                    class="absolute inset-0 bg-indigo-500 opacity-80 transition-all hover:opacity-100"
                  ></div>
                </div>
              </div>
              <span
                class="text-[8px] font-black text-slate-400 uppercase tracking-tighter"
                >{{ day.month }}</span
              >
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Expense Distribution" class="lg:col-span-4">
          <div class="space-y-6 mt-4">
            <div v-for="cat in expenseCategories" :key="cat.name">
              <div class="flex justify-between items-center mb-2">
                <span
                  class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                  >{{ cat.name }}</span
                >
                <span class="text-[10px] font-black text-slate-400"
                  >{{ cat.percent }}%</span
                >
              </div>
              <div
                class="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100"
              >
                <div
                  class="h-full bg-[#702DFF] rounded-full transition-all duration-1000"
                  :style="{ width: cat.percent + '%' }"
                ></div>
              </div>
            </div>
            <div
              v-if="expenseCategories.length === 0"
              class="py-20 text-center text-slate-300"
            >
              <PieChart :size="48" class="mx-auto opacity-20 mb-4" />
              <p class="text-[10px] font-black uppercase tracking-widest">
                No detailed analytics
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>

    <!-- Modals & Toasts -->
    <TransactionModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @saved="onPostUpdate"
    />

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      title="Mass Destruction Protocol"
      message="Deleting this ledger entry will permanently alter your financial history. This cannot be undone. Proceed?"
      variant="danger"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
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
  Plus,
  RotateCw,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Search,
  BookOpen,
  HandCoins,
  TrendingUp,
  Trash2,
  History,
  PieChart,
  ChevronDown,
} from "lucide-vue-next";
import {
  transactionsService,
  type FinanceTransaction,
} from "../services/transactionsService";
import { projectsService } from "../services/projectsService";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoStat from "../components/ui/BentoStat.vue";
import DashboardCard from "../components/ui/DashboardCard.vue";
import ButtonPrimary from "../components/ui/ButtonPrimary.vue";
import ButtonSecondary from "../components/ui/ButtonSecondary.vue";
import TransactionModal from "../components/finance/TransactionModal.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import Toast from "../components/ui/Toast.vue";

// State
const activeTab = ref("ledger");
const transactions = ref<FinanceTransaction[]>([]);
const loading = ref(true);
const searchQuery = ref("");
const isModalOpen = ref(false);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const confirmModal = ref({ isOpen: false, targetId: null as string | null });

// Fetch Data
const fetchData = async () => {
  loading.value = true;
  try {
    const data = await transactionsService.getAll();
    transactions.value = data;
  } catch (err) {
    console.error(err);
    showToast("Gagal sinkronisasi satelit data keuangan.", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

// Computed Stats
const stats = computed(() => {
  const inc = transactions.value
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((s, t) => s + Number(t.amount), 0);

  const exp = transactions.value
    .filter((t) => t.type === "expense" && t.status === "completed")
    .reduce((s, t) => s + Number(t.amount), 0);

  const rcv = transactions.value
    .filter((t) => t.type === "receivable" && t.status === "pending")
    .reduce((s, t) => s + Number(t.amount), 0);

  const dbt = transactions.value
    .filter((t) => t.type === "debt" && t.status === "pending")
    .reduce((s, t) => s + Number(t.amount), 0);

  return {
    netCashflow: inc - exp,
    totalReceivables: rcv,
    totalExpenses: exp,
    totalDebts: dbt,
  };
});

// Filtering
const filteredLedger = computed(() => {
  if (!searchQuery.value) return transactions.value;
  const q = searchQuery.value.toLowerCase();
  return transactions.value.filter(
    (tx) =>
      tx.title.toLowerCase().includes(q) ||
      tx.category?.toLowerCase().includes(q) ||
      tx.client?.name?.toLowerCase().includes(q),
  );
});

const receivables = computed(() =>
  transactions.value.filter(
    (t) => t.type === "receivable" && t.status === "pending",
  ),
);
const debts = computed(() =>
  transactions.value.filter((t) => t.type === "debt" && t.status === "pending"),
);

// Analytics Logic
const expenseCategories = computed(() => {
  const expenses = transactions.value.filter((t) => t.type === "expense");
  if (expenses.length === 0) return [];

  const cats: Record<string, number> = {};
  expenses.forEach((e) => {
    cats[e.category || "Other"] =
      (cats[e.category || "Other"] || 0) + Number(e.amount);
  });

  const total = Object.values(cats).reduce((a, b) => a + b, 0);
  return Object.entries(cats)
    .map(([name, amount]) => ({
      name,
      percent: Math.round((amount / total) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);
});

const monthlyTrends = computed(() => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const res = [];

  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mLabel = months[d.getMonth()];
    const mValue = d.getMonth() + 1;
    const yValue = d.getFullYear();

    const income = transactions.value
      .filter((t) => {
        const td = new Date(t.transaction_date);
        return (
          td.getMonth() + 1 === mValue &&
          td.getFullYear() === yValue &&
          t.type === "income"
        );
      })
      .reduce((s, t) => s + Number(t.amount), 0);

    res.push({ month: mLabel, income });
  }
  return res;
});

const maxTrendValue = computed(() =>
  Math.max(...monthlyTrends.value.map((t) => t.income), 1000000),
);

// Helpers
const formatPrice = (v: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v);
const formatDate = (v: string) =>
  new Date(v).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getTypeClass = (type: string) => {
  switch (type) {
    case "income":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "expense":
      return "bg-rose-50 text-rose-600 border-rose-100";
    case "receivable":
      return "bg-indigo-50 text-indigo-600 border-indigo-100";
    case "debt":
      return "bg-amber-50 text-amber-600 border-amber-100";
    default:
      return "bg-slate-50 text-slate-400 border-slate-100";
  }
};

const getIconComponent = (type: string) => {
  switch (type) {
    case "income":
      return ArrowUpRight;
    case "receivable":
      return Target;
    case "debt":
      return History;
    default:
      return ArrowDownLeft;
  }
};

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const onPostUpdate = () => {
  showToast("Sirkulasi kas berhasil diverifikasi dan dicatat.");
  fetchData();
};

const confirmDelete = (tx: any) => {
  confirmModal.value = { isOpen: true, targetId: tx.id };
};

const executeDelete = async () => {
  if (!confirmModal.value.targetId) return;
  try {
    await transactionsService.delete(confirmModal.value.targetId);
    showToast("Catatan transaksi berhasil dihapus dari ledger.");
    fetchData();
  } catch (err) {
    showToast("Gagal menghapus catatan.", "error");
  } finally {
    confirmModal.value.isOpen = false;
  }
};

const markAsCompleted = async (tx: FinanceTransaction) => {
  try {
    // If it was a receivable, mark as income
    // If it was a debt, mark as settled
    const payload: Partial<FinanceTransaction> = {
      status: "completed",
      type: tx.type === "receivable" ? "income" : tx.type,
    };
    await transactionsService.update(tx.id, payload);
    showToast("Status komitmen telah diverifikasi!");
    fetchData();
  } catch (err) {
    showToast("Gagal merubah status.", "error");
  }
};
</script>

<style scoped>
.page-container {
  padding-top: 2rem;
  padding-bottom: 5rem;
}

.table-main th {
  @apply text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] py-5 px-4 bg-slate-50/50 border-y border-slate-100;
}

.table-main td {
  @apply py-5 px-4 border-b border-slate-50 transition-all;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
