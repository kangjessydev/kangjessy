<template>
  <div class="page-container max-w-7xl mx-auto pb-24 px-4 sm:px-6 relative">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1
          class="text-2xl md:text-3xl font-black text-[#1B2559] tracking-tight mb-1"
        >
          {{ pageConfig.title }}
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          {{ pageConfig.subtitle }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#7029FF] transition-colors"
            :size="18"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari data..."
            class="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#7029FF]/20 focus:border-[#7029FF] w-full md:w-64 transition-all shadow-sm"
          />
        </div>
        <BaseButton
          variant="primary"
          @click="router.push(`${route.path}/create`)"
          class="shadow-lg shadow-[#7029FF]/20"
        >
          <Plus :size="18" />
          <span>Tambah Baru</span>
        </BaseButton>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-40 bg-white rounded-[24px] animate-pulse"
      ></div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="filteredItems.length === 0"
      class="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200"
    >
      <div
        class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300"
      >
        <Database :size="32" />
      </div>
      <h3 class="text-lg font-bold text-[#1B2559]">Data Kosong</h3>
      <p class="text-slate-500 text-sm mb-6">
        Belum ada data untuk kategori ini.
      </p>
      <BaseButton
        variant="secondary"
        @click="router.push(`${route.path}/create`)"
      >
        Buat Data Pertama
      </BaseButton>
    </div>

    <!-- Data Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="group bg-white rounded-[24px] p-5 border border-slate-100 hover:border-[#7029FF]/30 hover:shadow-xl hover:shadow-[#7029FF]/5 transition-all duration-300 relative overflow-hidden"
      >
        <!-- Status Indicator -->
        <div class="absolute top-4 right-4 z-10">
          <span
            class="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
            :class="
              item.is_active
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-slate-100 text-slate-400'
            "
          >
            {{ item.is_active ? "Active" : "Draft" }}
          </span>
        </div>

        <div class="flex items-start gap-4 mb-4">
          <!-- Icon/Image -->
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
            :class="
              item.image_url ? 'bg-slate-100' : 'bg-[#7029FF]/5 text-[#7029FF]'
            "
          >
            <img
              v-if="item.image_url"
              :src="item.image_url"
              class="w-full h-full object-cover rounded-xl"
            />
            <component v-else :is="getIconComponent(item.icon)" :size="24" />
          </div>

          <div class="flex-1 min-w-0 pr-8">
            <h3
              class="font-bold text-[#1B2559] truncate mb-1 group-hover:text-[#7029FF] transition-colors"
            >
              {{ item.name }}
            </h3>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {{ item.description || "Tidak ada deskripsi" }}
            </p>
          </div>
        </div>

        <!-- Metadata Values -->
        <div
          class="flex items-center gap-3 pt-4 border-t border-slate-50 text-xs font-semibold text-slate-600"
        >
          <div
            v-if="item.base_price"
            class="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg"
          >
            <DollarSign :size="12" class="text-emerald-500" />
            {{ formatCurrency(item.base_price) }}
          </div>
          <div
            v-if="item.metadata?.multiplier"
            class="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg"
          >
            <Zap :size="12" class="text-amber-500" />
            {{ item.metadata.multiplier }}x Speed
          </div>
        </div>

        <!-- Actions Overlay -->
        <div
          class="absolute inset-0 bg-white/90 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
        >
          <button
            @click="router.push(`${route.path}/${item.id}/edit`)"
            class="w-10 h-10 rounded-full bg-[#7029FF] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="Edit"
          >
            <Edit3 :size="18" />
          </button>
          <!-- Delete button could be added here if needed -->
          <button
            @click="confirmDelete(item.id)"
            class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="Hapus"
          >
            <Trash2 :size="18" />
          </button>
        </div>
      </div>
    </div>

    <ConfirmDialog
      :is-open="showDeleteDialog"
      title="Hapus Data Master?"
      message="Data yang dihapus tidak dapat dikembalikan. Pastikan data tidak sedang digunakan oleh order aktif."
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
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
  DollarSign,
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
// Assuming you have a ConfirmDialog component, if not I'll mock it or use window.confirm for now
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";
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
      category: "feature",
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

const getIconComponent = (name: any) => {
  if (!name) return LucideIcons.HelpCircle;
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
  return iconMap[name] || (LucideIcons as any)[name] || LucideIcons.HelpCircle;
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
    alert("Gagal menghapus data");
  }
};

watch(() => route.path, loadData);
onMounted(loadData);
</script>
