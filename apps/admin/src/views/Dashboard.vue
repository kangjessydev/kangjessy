<template>
  <div class="page-container">
    <PageHeader
      title="Intelligence Hub"
      subtitle="Comprehensive overview of your agency's sales performance and operational health"
    >
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          @click="fetchDashboardData"
          :loading="isLoading"
        >
          <RotateCw :size="18" />
          Refresh
        </BaseButton>
        <BaseButton variant="primary" @click="$router.push('/orders/new')">
          <Plus :size="18" />
          New Project
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Error Alert -->
    <ErrorAlert
      v-if="globalError"
      :error="globalError"
      :retryable="true"
      @close="clearError"
      @retry="fetchDashboardData"
      class="mb-6"
    />

    <!-- Key Performance Indicators -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
      <StatsCard v-for="stat in statItems" :key="stat.title" v-bind="stat" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      <!-- Performance Analytics (Actual Monthly Revenue) -->
      <DashboardCard
        title="Revenue Performance"
        class="lg:col-span-8"
        :stretch="false"
      >
        <template #action>
          <span
            class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
            >Calculated by Deal Value</span
          >
        </template>

        <div class="mt-8 overflow-x-auto no-scrollbar pb-4">
          <div
            class="h-64 flex flex-col justify-end gap-2 min-w-[600px] lg:min-w-0"
          >
            <div class="flex items-end justify-between h-48 px-4 gap-3">
              <div
                v-for="(month, idx) in monthlyData"
                :key="idx"
                class="flex-1 bg-indigo-50/40 rounded-t-2xl transition-all hover:bg-[#702DFF] hover:shadow-2xl hover:shadow-[#702DFF]/20 cursor-pointer group relative"
                :style="{ height: getMonthHeight(month.revenue) + 'px' }"
              >
                <div
                  class="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1B2559] text-white text-[9px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10 shadow-xl"
                >
                  {{ formatPrice(month.revenue) }}
                </div>
              </div>
            </div>
            <div
              class="flex justify-between px-4 text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-4"
            >
              <span
                v-for="m in monthLabels"
                :key="m"
                class="flex-1 text-center"
                >{{ m }}</span
              >
            </div>
          </div>
        </div>
      </DashboardCard>

      <!-- Conversion Funnel -->
      <DashboardCard
        title="Sales Pipeline"
        class="lg:col-span-4"
        :stretch="false"
      >
        <div class="space-y-6 mt-6">
          <div
            v-for="stage in pipelineStages"
            :key="stage.label"
            class="relative"
          >
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-2">
                <component :is="stage.icon" :size="14" class="text-[#702DFF]" />
                <span
                  class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                  >{{ stage.label }}</span
                >
              </div>
              <span class="text-[10px] font-black text-slate-400"
                >{{ stage.count }} Records</span
              >
            </div>
            <div
              class="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100"
            >
              <div
                class="h-full bg-gradient-to-r from-indigo-500 to-[#702DFF] rounded-full transition-all duration-1000"
                :style="{ width: stage.percent + '%' }"
              ></div>
            </div>
          </div>

          <div
            class="mt-10 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 text-center"
          >
            <p
              class="text-[9px] font-black text-[#702DFF] uppercase tracking-[0.2em] mb-1"
            >
              Conversion Quality
            </p>
            <h3 class="text-2xl font-black text-[#1B2559]">
              {{ funnelScore }}%
            </h3>
            <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase">
              Lead to Deal Ratio
            </p>
          </div>
        </div>
      </DashboardCard>
    </div>

    <!-- Active High-Value Projects Table -->
    <DashboardCard title="Priority Delivery Lane" no-padding>
      <template #action>
        <router-link
          to="/orders"
          class="text-[10px] font-black text-[#702DFF] uppercase tracking-[0.15em] hover:text-[#1B2559] transition-colors"
        >
          Explore Production Board
        </router-link>
      </template>

      <div class="hidden lg:block overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th>Client Identity</th>
              <th>Project Status</th>
              <th>Requirement Detail</th>
              <th class="text-right">Budget Value</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading State -->
            <tr v-if="isLoading">
              <td colspan="4" class="p-0">
                <SkeletonTable :rows="5" :columns="4" />
              </td>
            </tr>
            <!-- Empty State -->
            <tr v-else-if="recentProjects.length === 0">
              <td
                colspan="4"
                class="p-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs"
              >
                No active projects found
              </td>
            </tr>
            <!-- Data Rows -->
            <tr
              v-else
              v-for="p in recentProjects"
              :key="p.id"
              class="table-row-hover group"
            >
              <td>
                <div class="flex flex-col">
                  <p
                    class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors mb-1"
                  >
                    {{ p.name }}
                  </p>
                  <p
                    class="text-[9px] text-slate-400 font-bold uppercase tracking-widest"
                  >
                    {{
                      p.company ||
                      `Private
                    Deal`
                    }}
                  </p>
                </div>
              </td>
              <td>
                <span
                  class="badge-chip"
                  :class="getStatusClass(p.project_status)"
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-current"></div>
                  {{ p.project_status || "New" }}
                </span>
              </td>
              <td
                class="text-[11px] font-medium text-slate-500 italic max-w-xs truncate"
              >
                "{{
                  p.project_name ||
                  p.project_type ||
                  `General Service Arrangement`
                }}"
              </td>
              <td class="text-right">
                <p class="text-sm font-black text-[#1B2559]">
                  {{ formatPrice(p.total_amount || p.budget) }}
                </p>
                <p
                  class="text-[9px] font-black uppercase tracking-widest"
                  :class="getDebtColor(p)"
                >
                  {{ getRemainingDebtLabel(p) }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile List View -->
      <div class="lg:hidden divide-y divide-slate-50">
        <div v-if="isLoading" class="p-4 space-y-4">
          <div
            v-for="i in 3"
            :key="i"
            class="animate-pulse flex items-center justify-between"
          >
            <div class="space-y-2">
              <div class="h-3 w-32 bg-slate-100 rounded"></div>
              <div class="h-2 w-20 bg-slate-50 rounded"></div>
            </div>
            <div class="h-6 w-16 bg-slate-100 rounded-lg"></div>
          </div>
        </div>

        <div v-else-if="recentProjects.length === 0" class="p-12 text-center">
          <p
            class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
          >
            No active projects
          </p>
        </div>

        <div
          v-else
          v-for="p in recentProjects"
          :key="p.id"
          class="p-5 active:bg-slate-50 transition-colors"
        >
          <div class="flex items-start justify-between mb-2">
            <div>
              <h4 class="text-[13px] font-black text-[#1B2559] mb-0.5">
                {{ p.name }}
              </h4>
              <p
                class="text-[9px] font-black text-slate-400 uppercase tracking-wider"
              >
                {{ p.company || `Individual` }}
              </p>
            </div>
            <span
              class="badge-chip !px-2 !py-0.5"
              :class="getStatusClass(p.project_status)"
            >
              {{ p.project_status || "New" }}
            </span>
          </div>

          <div class="flex items-end justify-between mt-4">
            <div class="max-w-[180px]">
              <p class="text-[10px] text-slate-400 font-medium italic truncate">
                {{ p.project_name || p.project_type || `Service Project` }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs font-black text-[#1B2559]">
                {{ formatPrice(p.total_amount || p.budget) }}
              </p>
              <p
                class="text-[8px] font-black uppercase tracking-widest"
                :class="getDebtColor(p)"
              >
                {{ getRemainingDebtLabel(p) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Users,
  DollarSign,
  Zap,
  Plus,
  RotateCw,
  CheckCircle2,
  TrendingUp,
} from "lucide-vue-next";
import { portfolioService } from "../services/portfolioService";
import { clientsService } from "../services/clientsService";
import StatsCard from "../components/ui/StatsCard.vue";
import DashboardCard from "../components/ui/DashboardCard.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import ErrorAlert from "../components/ui/ErrorAlert.vue";
import { useErrorHandler } from "../composables/useErrorHandler";
import { useLoading } from "../composables/useLoading";

// Composables
const { globalError, handleError, clearError } = useErrorHandler();
const { isLoading, withLoading } = useLoading("dashboard");

const statsData = ref({
  activeDeals: 0,
  pendingLeads: 0,
  totalRevenue: 0,
  growth: 0,
});
const recentProjects = ref<any[]>([]);
const monthlyData = ref<any[]>([]);
const allRecords = ref<any[]>([]);

const monthLabels = [
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

const statItems = computed(() => [
  {
    title: "Active Orders",
    value: statsData.value.activeDeals,
    icon: Zap,
    colorClass: "bg-emerald-50 text-emerald-600",
    unit: "Production",
    tooltip:
      "Jumlah proyek yang saat ini sedang dalam fase pengerjaan aktif oleh tim.",
    simulation:
      "Makin tinggi angka ini, makin sibuk kapasitas produksi agensi Kakak saat ini.",
  },
  {
    title: "Prospect Leads",
    value: statsData.value.pendingLeads,
    icon: Users,
    colorClass: "bg-indigo-50 text-[#702DFF]",
    unit: "Inbox",
    tooltip:
      "Daftar calon klien potensial yang baru menghubungi dan menunggu respon/follow-up.",
    simulation:
      'Potensi "Uang Masuk" di masa depan. Jika angka ini tinggi, fokuslah pada tim sales/CRM.',
  },
  {
    title: "Project Value",
    value: statsData.value.totalRevenue,
    icon: DollarSign,
    colorClass: "bg-[#1B2559]/5 text-[#1B2559]",
    isCurrency: true,
    tooltip:
      "Estimasi total nilai kontrak dari seluruh proyek yang berstatus Deal.",
    simulation:
      "Ini adalah target omzet kotor yang harus dikawal hingga menjadi pelunasan (Cash in).",
  },
  {
    title: "Pipeline conversion",
    value: funnelScore.value + "%",
    icon: TrendingUp,
    colorClass: "bg-amber-50 text-amber-600",
    unit: "Success",
    tooltip: "Efektivitas tim dalam mengubah Leads menjadi Deal yang sah.",
    simulation:
      "Jika skor di bawah 20%, mungkin penawaran atau harga agensi perlu dievaluasi ulang.",
  },
]);

// Pipeline Stage Logic mockup for Sanity data
const pipelineStages = computed(() => {
  const total = allRecords.value.length || 1;
  return [
    {
      label: "Deals Closed",
      count: allRecords.value.filter((r) => r.status === "Deal").length,
      icon: CheckCircle2,
      percent:
        (allRecords.value.filter((r) => r.status === "Deal").length / total) *
        100,
    },
    {
      label: "Follow Up",
      count: allRecords.value.filter((r) => r.status === "Follow Up").length,
      icon: TrendingUp,
      percent:
        (allRecords.value.filter((r) => r.status === "Follow Up").length /
          total) *
        100,
    },
    {
      label: "Discovery/New",
      count: allRecords.value.filter((r) =>
        ["New", "Pending"].includes(r.status),
      ).length,
      icon: Zap,
      percent:
        (allRecords.value.filter((r) => ["New", "Pending"].includes(r.status))
          .length /
          total) *
        100,
    },
  ];
});

const funnelScore = computed(() => {
  const total = allRecords.value.length;
  if (!total) return 0;
  const deals = allRecords.value.filter((c) => c.status === "Deal").length;
  return Math.round((deals / total) * 100);
});

const formatPrice = (price: any) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price || 0);
};

const getMonthHeight = (revenue: number) => {
  const max = Math.max(...monthlyData.value.map((m) => m.revenue), 1000000);
  return (revenue / max) * 150; // Max height 150px
};

const getStatusClass = (status: string) => {
  const s = (status || "New").toLowerCase();
  if (s === "done" || s === "deal" || s === "success")
    return "bg-emerald-50 text-emerald-600 border-none";
  if (s === "in_progress") return "bg-indigo-50 text-[#702DFF] border-none";
  if (s === "cancel") return "bg-rose-50 text-rose-600 border-none";
  return "bg-blue-50 text-blue-600 border-none"; // Default for 'New'
};

const getRemainingDebtLabel = (p: any) => {
  const total = p.total_amount || p.budget || 0;
  const paid = p.paid_amount || 0;
  if (paid >= total && total > 0) return `Paid In Full`;
  if (paid === 0) return `Unpaid`;
  return `Owes ${formatPrice(total - paid)}`;
};

const getDebtColor = (p: any) => {
  const total = p.total_amount || p.budget || 0;
  const paid = p.paid_amount || 0;
  if (paid >= total && total > 0) return `text-emerald-500`;
  if (paid === 0) return `text-rose-400`;
  return `text-amber-500`;
};

const fetchDashboardData = async () => {
  await withLoading(async () => {
    try {
      const [allClients] = await Promise.all([
        clientsService.getAll(),
        portfolioService.getAll(),
      ]);

      allRecords.value = allClients;

      // Real Business Stats from Supabase
      const deals = allClients.filter((c) => c.status === "Deal");
      const leads = allClients.filter((c) =>
        ["New", "Pending", "Follow Up"].includes(c.status),
      );

      statsData.value.activeDeals = deals.length;
      statsData.value.pendingLeads = leads.length;
      statsData.value.totalRevenue = deals.reduce(
        (sum, c) => sum + (c.total_amount || c.budget || 0),
        0,
      );

      // Calculate monthly revenue mock data based on recent deals
      const months = new Array(12).fill(0).map((_, i) => ({
        month: monthLabels[i],
        revenue: deals
          .filter((d) => new Date(d.created_at).getMonth() === i)
          .reduce((sum, d) => sum + (d.total_amount || d.budget || 0), 0),
      }));
      monthlyData.value = months;

      // Recent Activity
      recentProjects.value = [...allClients]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 5);
    } catch (err) {
      handleError(err, "Dashboard Data Fetch");
    }
  });
};

onMounted(fetchDashboardData);
</script>

<style scoped>
@reference "tailwindcss";

.badge-chip {
  @apply px-2.5 py-1 rounded-lg font-black uppercase tracking-widest text-[9px] shadow-sm flex items-center gap-2;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
