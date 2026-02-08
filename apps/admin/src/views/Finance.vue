<template>
  <div class="page-container">
    <PageHeader
      title="Financial Intelligence"
      subtitle="Monitor your agency's cash flow, debt recovery, and profit margins"
    >
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="fetchData" :loading="loading">
          <RotateCw :size="18" />
          Sync Data
        </BaseButton>
        <BaseButton variant="primary" @click="isModalOpen = true">
          <Plus :size="18" />
          Record Entry
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Financial Core Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Gross Income"
        :value="formatPrice(stats.totalIncome)"
        :icon="TrendingUp"
        colorClass="bg-emerald-50 text-emerald-600"
      />
      <StatsCard
        title="Total Expense"
        :value="formatPrice(stats.totalExpense)"
        :icon="TrendingDown"
        colorClass="bg-rose-50 text-rose-600"
      />
      <StatsCard
        title="Net Profit"
        :value="formatPrice(stats.netProfit)"
        :icon="Wallet"
        colorClass="bg-[#702DFF]/5 text-[#702DFF]"
      />
      <StatsCard
        title="Debt Recovery"
        :value="formatPrice(stats.pendingPayments)"
        :icon="CreditCard"
        colorClass="bg-amber-50 text-amber-600"
      />
    </div>

    <!-- Analytics Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      <!-- 7-Day Growth Chart -->
      <DashboardCard
        title="7-Day Performance"
        class="lg:col-span-8"
        :stretch="false"
      >
        <template #action>
          <span
            class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
            >Revenue vs Date</span
          >
        </template>
        <div class="h-64 flex items-end justify-between gap-4 mt-8 px-4">
          <div
            v-for="day in last7Days"
            :key="day.date"
            class="flex-1 flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div class="relative w-full flex items-end justify-center gap-1">
              <!-- Income Bar -->
              <div
                class="w-full max-w-[12px] bg-slate-100 relative rounded-full overflow-hidden transition-all duration-700 hover:w-[14px]"
                :style="{ height: getBarHeight(day.income) + 'px' }"
              >
                <div
                  class="absolute bottom-0 w-full bg-[#702DFF] h-full opacity-20"
                ></div>
                <div
                  class="absolute bottom-0 w-full bg-[#702DFF] h-full rounded-t-full shadow-[0_0_10px_rgba(112,45,255,0.3)]"
                ></div>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <span
                class="text-[9px] font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors"
                >{{ formatPriceShort(day.income) }}</span
              >
              <span
                class="text-[8px] font-bold text-slate-300 uppercase tracking-tighter mt-1"
                >{{ day.label }}</span
              >
            </div>
          </div>
        </div>
      </DashboardCard>

      <!-- Category Analysis -->
      <DashboardCard
        title="Expense Breakdown"
        class="lg:col-span-4"
        :stretch="false"
      >
        <div
          v-if="expenseCategories.length === 0"
          class="h-64 flex flex-col items-center justify-center text-slate-300"
        >
          <PieChart :size="48" class="opacity-20 mb-2" />
          <p class="text-[10px] font-black uppercase tracking-widest">
            No expense data
          </p>
        </div>
        <div v-else class="space-y-6 mt-4">
          <div v-for="cat in expenseCategories.slice(0, 5)" :key="cat.name">
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
              class="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100"
            >
              <div
                class="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                :style="{ width: cat.percent + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>

    <!-- History Table -->
    <DashboardCard title="Global Ledger" no-padding>
      <div v-if="loading" class="p-20 text-center">
        <div
          class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"
        ></div>
        <p
          class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]"
        >
          Calculating balance sheets...
        </p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th>Entity & Transaction</th>
              <th>Reference Status</th>
              <th>Value</th>
              <th>Verification Date</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="transactions.length === 0">
              <td
                colspan="5"
                class="p-20 text-center text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]"
              >
                Zero ledger entries recorded
              </td>
            </tr>
            <tr
              v-for="tx in transactions"
              :key="tx.id"
              class="table-row-hover group"
            >
              <td>
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border"
                    :class="
                      tx.type === 'income'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-rose-50 text-rose-600 border-rose-100'
                    "
                  >
                    <ArrowUpRight v-if="tx.type === 'income'" :size="18" />
                    <ArrowDownLeft v-else :size="18" />
                  </div>
                  <div>
                    <p
                      class="font-black text-[#1B2559] leading-tight text-sm tracking-tight"
                    >
                      {{ tx.title || tx.description }}
                    </p>
                    <div class="flex items-center gap-1.5 mt-1">
                      <p
                        class="text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1"
                      >
                        <User :size="10" />
                        {{ tx.client?.name || "Internal" }}
                      </p>
                      <span
                        v-if="tx.project?.name"
                        class="text-[9px] font-black text-[#702DFF] uppercase bg-indigo-50 px-1.5 py-0.5 rounded"
                      >
                        PROJ: {{ tx.project.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="flex flex-col gap-1">
                  <div class="flex gap-2">
                    <span
                      class="badge-chip border-none !bg-slate-50 !text-slate-500 text-[8px] px-1.5 py-0.5 uppercase"
                    >
                      {{ tx.category || "General" }}
                    </span>
                    <span
                      class="badge-chip border-none text-[8px] px-1.5 py-0.5 uppercase"
                      :class="
                        tx.type === 'income' ? 'badge-success' : 'badge-danger'
                      "
                    >
                      {{ tx.type }}
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span
                      class="text-[9px] font-bold text-slate-300 uppercase tracking-tighter"
                      >{{ tx.sub_category || "-" }}</span
                    >
                    <span
                      v-if="tx.source"
                      class="text-[9px] font-bold text-slate-300 uppercase tracking-tighter"
                      >• via {{ tx.source }}</span
                    >
                  </div>
                </div>
              </td>
              <td
                class="font-black"
                :class="
                  tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                "
              >
                {{ tx.type === "income" ? "+" : "-" }}
                {{ formatPrice(tx.amount) }}
              </td>
              <td>
                <p
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >
                  {{ formatDate(tx.date) }}
                </p>
              </td>
              <td>
                <div class="flex items-center justify-end gap-2 transition-all">
                  <button
                    @click="confirmDelete(tx)"
                    class="p-2 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
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

    <!-- Components -->
    <TransactionModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @saved="onPostUpdate"
    />

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      title="Delete Transaction"
      message="Deleting this ledger entry will permanently affect your balance records. Proceed?"
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
import { ref, computed, onMounted } from "vue";
import {
  Plus,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCw,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  User,
  PieChart,
} from "lucide-vue-next";
import { transactionsService } from "../services/transactionsService";
import { clientsService } from "../services/clientsService";
import DashboardCard from "../components/ui/DashboardCard.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import StatsCard from "../components/ui/StatsCard.vue";
import TransactionModal from "../components/finance/TransactionModal.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import Toast from "../components/ui/Toast.vue";

const transactions = ref<any[]>([]);
const clients = ref<any[]>([]);
const loading = ref(true);
const isModalOpen = ref(false);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const confirmModal = ref({
  isOpen: false,
  targetId: null as string | null,
});

onMounted(fetchData);

async function fetchData() {
  loading.value = true;
  try {
    const [txData, clientData] = await Promise.all([
      transactionsService.getAll(),
      clientsService.getAll(),
    ]);
    transactions.value = txData;
    clients.value = clientData;
  } catch (err) {
    console.error(err);
    showToast("Failed to sync financial bridge", "error");
  } finally {
    loading.value = false;
  }
}

// Compute Stats
const stats = computed(() => {
  const inc = transactions.value
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + (t.amount || 0), 0);
  const exp = transactions.value
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + (t.amount || 0), 0);
  const debt = clients.value
    .filter((c) => c.status === "Deal")
    .reduce((s, c) => s + ((c.budget || 0) - (c.paid_amount || 0)), 0);

  return {
    totalIncome: inc,
    totalExpense: exp,
    netProfit: inc - exp,
    pendingPayments: debt,
  };
});

// Analytics Logic: Last 7 Days Performance
const last7Days = computed(() => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayIncome = transactions.value
      .filter((t) => t.date === dateStr && t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    days.push({
      date: dateStr,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      income: dayIncome,
    });
  }
  return days;
});

const getBarHeight = (amount: number) => {
  if (amount === 0) return 4;
  const max = Math.max(...last7Days.value.map((d) => d.income), 1000000);
  return Math.min(200, (amount / max) * 180);
};

// Analytics Logic: Top Expenses
const expenseCategories = computed(() => {
  const expenses = transactions.value.filter((t) => t.type === "expense");
  if (expenses.length === 0) return [];

  const cats: Record<string, number> = {};
  expenses.forEach((e) => {
    cats[e.category || "Other"] = (cats[e.category || "Other"] || 0) + e.amount;
  });

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  return Object.entries(cats)
    .map(([name, amount]) => ({
      name,
      amount,
      percent: Math.round((amount / total) * 100),
    }))
    .sort((a, b) => b.amount - a.amount);
});

// Handlers
const formatPrice = (p: number) => "Rp " + (p || 0).toLocaleString("id-ID");
const formatPriceShort = (p: number) => {
  if (p >= 1000000) return (p / 1000000).toFixed(1) + "M";
  if (p >= 1000) return (p / 1000).toFixed(0) + "K";
  return p;
};
const formatDate = (d: string) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "-";

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
};

const onPostUpdate = () => {
  showToast("Transaction record verified and added");
  fetchData();
};

const confirmDelete = (tx: any) => {
  confirmModal.value = { isOpen: true, targetId: tx.id };
};

const executeDelete = async () => {
  if (!confirmModal.value.targetId) return;
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  try {
    await transactionsService.delete(id);
    showToast("Ledger entry removed");
    fetchData();
  } catch (err) {
    showToast("Failed to void transaction", "error");
  }
};
</script>

<style scoped>
.badge-chip {
  @apply px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[9px] shadow-sm flex items-center border;
}

.badge-success {
  @apply bg-emerald-50 text-emerald-600 border-emerald-100;
}

.badge-danger {
  @apply bg-rose-50 text-rose-500 border-rose-100;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
