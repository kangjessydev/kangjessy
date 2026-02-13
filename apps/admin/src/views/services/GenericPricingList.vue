<template>
  <div class="page-container max-w-7xl mx-auto pb-24 px-4 sm:px-6 relative">
    <PageHeader :title="pageConfig.title" :subtitle="pageConfig.subtitle">
      <div class="flex items-center gap-3">
        <div class="relative group">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7029FF] transition-colors"
            :size="16"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search data..."
            class="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#7029FF]/20 focus:border-[#7029FF] w-full md:w-64 transition-all shadow-sm"
          />
        </div>
        <BaseButton
          variant="primary"
          @click="router.push(`${route.path}/create`)"
        >
          <Plus :size="18" />
          <span>Add New</span>
        </BaseButton>
      </div>
    </PageHeader>

    <AdminCard
      no-padding
      class="overflow-hidden rounded-[32px]! border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-12"
    >
      <!-- Loading State -->
      <div v-if="loading" class="p-20 text-center">
        <div
          class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
        ></div>
        <p
          class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          Syncing master data...
        </p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredItems.length === 0" class="text-center py-20">
        <div
          class="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center mx-auto mb-4 text-slate-200"
        >
          <Database :size="32" />
        </div>
        <h3 class="text-lg font-black text-[#1B2559]">Empty Inventory</h3>
        <p class="text-slate-400 text-sm mt-1">
          No data found for this category.
        </p>
        <BaseButton
          variant="secondary"
          @click="router.push(`${route.path}/create`)"
          class="mt-6 font-black uppercase tracking-widest text-[10px]"
        >
          Create First Entry
        </BaseButton>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th class="pl-8!">Item Identity</th>
              <th>Metadata Info</th>
              <th>Numeric Values</th>
              <th>Status</th>
              <th class="text-right pr-8!">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredItems"
              :key="item.id"
              class="table-row-hover group"
            >
              <td class="pl-8!">
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-100"
                    :class="
                      item.image_url
                        ? 'bg-slate-100'
                        : 'bg-[#7029FF]/5 text-[#7029FF]'
                    "
                  >
                    <img
                      v-if="item.image_url"
                      :src="item.image_url"
                      class="w-full h-full object-cover rounded-xl"
                    />
                    <component
                      v-else
                      :is="getIconComponent(item.icon)"
                      :size="20"
                    />
                  </div>
                  <div class="flex flex-col">
                    <p
                      class="font-black text-[#1B2559] text-sm tracking-tight group-hover:text-[#702DFF] transition-colors leading-tight"
                    >
                      {{ item.name }}
                    </p>
                    <p
                      class="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[200px] mt-0.5"
                    >
                      {{ item.description || "No description" }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-if="item.metadata?.multiplier"
                    class="px-2 py-0.5 rounded-lg bg-indigo-50 text-[#702DFF] text-[8px] font-black uppercase tracking-widest border border-indigo-100/50"
                  >
                    {{ item.metadata.multiplier }}x Impact
                  </span>
                  <span
                    v-if="item.metadata?.originalPrice"
                    class="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-slate-100"
                  >
                    Val: {{ formatCurrency(item.metadata.originalPrice) }}
                  </span>
                </div>
              </td>
              <td>
                <div class="flex flex-col">
                  <p class="text-sm font-black text-[#1B2559]">
                    {{
                      item.base_price
                        ? formatCurrency(item.base_price)
                        : "Variable"
                    }}
                  </p>
                  <p class="text-[9px] font-bold text-slate-300 uppercase">
                    Base Rate
                  </p>
                </div>
              </td>
              <td>
                <span
                  class="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest"
                  :class="
                    item.is_active
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-slate-100 text-slate-400'
                  "
                >
                  {{ item.is_active ? "Active" : "Draft" }}
                </span>
              </td>
              <td class="text-right pr-8!">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="router.push(`${route.path}/${item.id}/edit`)"
                    class="p-2 rounded-xl text-slate-300 hover:text-[#7029FF] hover:bg-indigo-50 transition-all"
                  >
                    <Edit3 :size="16" />
                  </button>
                  <button
                    @click="confirmDelete(item.id)"
                    class="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all"
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

    <ConfirmDialog
      :is-open="showDeleteDialog"
      title="Hapus Data Master?"
      message="Data yang dihapus tidak dapat dikembalikan. Pastikan data tidak sedang digunakan oleh order aktif."
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
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
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Plus,
  Search,
  Database,
  Edit3,
  Trash2,
  Zap,
  Globe,
  Cpu,
  Rocket,
  Layout,
  ShoppingCart,
  BookOpen,
  Activity,
  Users,
  PieChart,
  Workflow,
  Bot,
  FileSearch,
  TrendingUp,
  MessageSquare,
  Layers,
} from "lucide-vue-next";
import * as LucideIcons from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import PageHeader from "../../components/ui/PageHeader.vue";
import AdminCard from "../../components/ui/AdminCard.vue";
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";
import Toast from "../../components/ui/Toast.vue";
import {
  pricingService,
  type PricingItem,
} from "../../services/pricingService";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const items = ref<PricingItem[]>([]);
const searchQuery = ref("");
const showDeleteDialog = ref(false);
const itemToDelete = ref<string | null>(null);

const pageConfig = computed(() => {
  const path = route.path;
  if (path.includes("features"))
    return {
      title: "Fitur Tambahan",
      subtitle: "Kelola library fitur & add-ons",
      category: "additional_feature",
    };
  if (path.includes("project-types"))
    return {
      title: "Tipe Proyek",
      subtitle: "Kelola paket dasar website/sistem",
      category: "project_type",
    };
  if (path.includes("deadlines"))
    return {
      title: "Opsi Deadline",
      subtitle: "Atur multiplier kecepatan pengerjaan",
      category: "project_deadline",
    };
  if (path.includes("services"))
    return {
      title: "Layanan Utama",
      subtitle: "Kategori besar layanan (The Foundation, The Core)",
      category: "service_type",
    };
  return {
    title: "Master Data",
    subtitle: "Kelola data pricing",
    category: "feature",
  };
});

const loadData = async () => {
  loading.value = true;
  try {
    // We use getByCategory from generic service
    // Note: We might need to ensure 'getByCategory' exists in pricingService or add it
    // Based on previous interaction, it seems likely exist or we map specific calls

    // Quick mapper based on category
    let data: any[] = [];
    const cat = pageConfig.value.category;

    // Gunakan method spesifik jika ada, atau generic query
    // Di step sebelumnya kita lihat pricingService punya getAllFeatures, getAllProjectTypes, dll.
    // Tapi akan lebih clean kalau kita pakai Generic Fetch by Category di service.
    // Asumsi: pricingService.getByCategory(cat) available (saya akan cek/tambahkan klo belum)

    // FALLBACK LOGIC manually mapping (until generic method confirmed):
    /*
    if (cat === 'feature') data = await pricingService.getAllFeatures();
    else if (cat === 'project_type') data = await pricingService.getAllProjectTypes();
    else if (cat === 'project_deadline') data = await pricingService.getAllTimelines();
    else if (cat === 'service_type') data = await pricingService.getAllServices();
    */

    // Better way: use the exact same DB call method 'getByCategory' if you have it exposed.
    // Let's rely on `getByCategory` we saw in PricingEditor.vue (line 608 use!)
    data = await pricingService.getByCategory(cat);
    items.value = data;
  } catch (err) {
    console.error("Failed to load data", err);
  } finally {
    loading.value = false;
  }
};

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  const q = searchQuery.value.toLowerCase();
  return items.value.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      (i.description && i.description.toLowerCase().includes(q)),
  );
});

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(
    val,
  );
};

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const getIconComponent = (name: any) => {
  if (!name) return LucideIcons.CircleHelp;
  const iconMap: any = {
    Zap,
    Globe,
    Cpu,
    Rocket,
    Layout,
    ShoppingCart,
    BookOpen,
    Activity,
    Users,
    PieChart,
    Workflow,
    Bot,
    FileSearch,
    TrendingUp,
    MessageSquare,
    Database,
    Layers,
  };
  return iconMap[name] || (LucideIcons as any)[name] || LucideIcons.CircleHelp;
};

const confirmDelete = (id: string) => {
  itemToDelete.value = id;
  showDeleteDialog.value = true;
};

const handleDelete = async () => {
  if (!itemToDelete.value) return;
  try {
    await pricingService.deleteItem(itemToDelete.value);
    // Refresh locally
    items.value = items.value.filter((i) => i.id !== itemToDelete.value);
    showDeleteDialog.value = false;
  } catch (err) {
    console.error("Delete failed", err);
    showToast("Gagal menghapus data", "error");
  }
};

watch(() => route.path, loadData);
onMounted(loadData);
</script>
