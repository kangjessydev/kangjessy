<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <!-- Background Decor -->
    <div
      class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-100/30 blur-[120px] rounded-full opacity-50"
    ></div>
    <div
      class="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-50/40 blur-[100px] rounded-full opacity-40"
    ></div>

    <PageHeader :title="pageDisplay.title" :subtitle="pageDisplay.subtitle">
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          @click="loadData"
          :loading="loading"
          class="!bg-white shadow-sm"
        >
          <RotateCw :size="18" :class="{ 'animate-spin': loading }" />
          Segarkan
        </BaseButton>
        <BaseButton variant="primary" @click="handleCreate">
          <Plus :size="18" />
          Tambah {{ pageDisplay.itemLabel }} Baru
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Content -->
    <div v-if="loading && items.length === 0" class="p-40 text-center">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-[#702DFF]"
      ></div>
      <p
        class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]"
      >
        Menyelaraskan data master...
      </p>
    </div>

    <DashboardCard
      v-else
      no-padding
      overflow-visible
      class="!rounded-[40px] border border-slate-100/50 shadow-2xl shadow-indigo-500/5 mb-12 bg-white/70 backdrop-blur-xl animate-fade-in-up"
    >
      <div class="overflow-x-auto no-scrollbar">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-100/50">
              <th
                class="text-left py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                Identitas {{ pageDisplay.itemLabel }}
              </th>
              <!-- Show Icon column for Service & Project Types -->
              <th
                v-if="
                  ['service_type', 'project_type'].includes(
                    pageDisplay.category,
                  )
                "
                class="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                Ikon
              </th>
              <!-- Show Thumbnail column ONLY for Style Vibes -->
              <th
                v-if="pageDisplay.category === 'style_vibe'"
                class="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                Thumbnail
              </th>
              <th
                class="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                Urutan
              </th>
              <th
                class="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                Status
              </th>
              <!-- Commercial Data context based on category -->
              <th
                v-if="
                  ['project_type', 'project_deadline'].includes(
                    pageDisplay.category,
                  )
                "
                class="text-left py-6 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                {{
                  pageDisplay.category === "project_type"
                    ? "Harga Dasar"
                    : "Multiplier"
                }}
              </th>
              <th
                class="text-right py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-if="items.length === 0">
              <td colspan="6" class="p-32 text-center">
                <div
                  class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-inner text-slate-200"
                >
                  <LayoutGrid :size="32" />
                </div>
                <h3
                  class="text-[#1B2559] font-black uppercase text-xs tracking-widest"
                >
                  Tidak ada data ditemukan
                </h3>
                <p class="text-slate-400 text-[11px] mt-2 font-medium">
                  Mulai bangun master harga Anda dengan menambah data pertama.
                </p>
              </td>
            </tr>
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              class="group hover:bg-white transition-all duration-300"
            >
              <td class="py-7 px-10">
                <div class="flex flex-col gap-1.5">
                  <h3
                    class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors leading-tight"
                  >
                    {{ item.name }}
                  </h3>
                  <div class="flex items-center gap-2">
                    <span
                      class="text-[9px] font-black text-slate-300 bg-white px-2 py-0.5 rounded border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-400 transition-colors uppercase tracking-widest leading-none"
                    >
                      {{ item.slug }}
                    </span>
                  </div>
                  <p
                    class="text-[11px] text-slate-400 font-medium line-clamp-2 max-w-sm mt-1 leading-relaxed"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </td>
              <!-- Dynamic Icon Display -->
              <td
                v-if="
                  ['service_type', 'project_type'].includes(
                    pageDisplay.category,
                  )
                "
                class="py-7 px-6"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400"
                >
                  <component :is="getIconComponent(item.icon)" :size="20" />
                </div>
              </td>

              <!-- Thumbnail ONLY for style_vibe -->
              <td
                v-if="pageDisplay.category === 'style_vibe'"
                class="py-7 px-6"
              >
                <div
                  v-if="item.image_url"
                  class="relative group/img aspect-[4/3] w-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-xl shadow-slate-200/50 transition-transform duration-500 hover:scale-110 hover:z-10"
                >
                  <img
                    :src="item.image_url"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-24 aspect-[4/3] rounded-2xl bg-slate-50/50 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-200 gap-1.5 opacity-60"
                >
                  <ImageIcon :size="20" stroke-width="1.5" />
                  <span class="text-[8px] font-black uppercase"
                    >TANPA ASSET</span
                  >
                </div>
              </td>
              <td class="py-7 px-6">
                <div class="flex items-center gap-3">
                  <div class="flex flex-col gap-0.5">
                    <button
                      @click="moveItem(index, -1)"
                      :disabled="index === 0"
                      class="p-1.5 hover:bg-indigo-50 hover:text-[#702DFF] rounded-lg transition-all disabled:opacity-20 text-slate-300"
                      title="Geser Atas"
                    >
                      <ChevronUp :size="14" />
                    </button>
                    <button
                      @click="moveItem(index, 1)"
                      :disabled="index === items.length - 1"
                      class="p-1.5 hover:bg-indigo-50 hover:text-[#702DFF] rounded-lg transition-all disabled:opacity-20 text-slate-300"
                      title="Geser Bawah"
                    >
                      <ChevronDown :size="14" />
                    </button>
                  </div>
                  <div class="flex flex-col">
                    <span
                      class="text-sm font-black text-[#1B2559] leading-none mb-1"
                      >{{ item.sort_order || 0 }}</span
                    >
                    <span
                      class="text-[7px] font-black text-slate-300 uppercase tracking-widest"
                      >Posisi Urut</span
                    >
                  </div>
                </div>
              </td>
              <td class="py-7 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full shadow-sm"
                    :class="
                      item.is_active
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-slate-200'
                    "
                  ></div>
                  <span
                    class="text-[10px] font-black uppercase tracking-widest"
                    :class="
                      item.is_active ? 'text-emerald-600' : 'text-slate-400'
                    "
                  >
                    {{ item.is_active ? "Aktif / Live" : "Offline" }}
                  </span>
                </div>
              </td>
              <td
                v-if="
                  ['project_type', 'project_deadline'].includes(
                    pageDisplay.category,
                  )
                "
                class="py-7 px-6"
              >
                <div class="flex flex-col">
                  <span
                    v-if="pageDisplay.category === 'project_deadline'"
                    class="text-sm font-black text-[#1B2559]"
                  >
                    x{{ item.multiplier || 1 }}
                  </span>
                  <span v-else class="text-sm font-black text-[#1B2559]">
                    Rp {{ formatPrice(item.base_price) }}
                  </span>
                  <span
                    class="text-[8px] font-black text-slate-300 uppercase tracking-widest"
                    >{{
                      pageDisplay.category === "project_deadline"
                        ? "Multiplier"
                        : "Harga Dasar"
                    }}</span
                  >
                </div>
              </td>
              <td class="py-7 px-10">
                <div class="flex items-center justify-end gap-2 transition-all">
                  <button
                    @click="handleEdit(item.id)"
                    class="p-3 rounded-2xl text-slate-300 hover:text-[#702DFF] hover:bg-indigo-50 hover:shadow-sm transition-all"
                  >
                    <Edit2 :size="18" />
                  </button>
                  <button
                    @click="handleDelete(item.id)"
                    class="p-3 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:shadow-sm transition-all"
                  >
                    <Trash2 :size="18" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardCard>

    <!-- Confirm Dialog -->
    <ConfirmModal
      :is-open="confirm.isOpen"
      title="Hapus Data?"
      message="Tindakan ini tidak bisa dibatalkan. Apakah Anda yakin ingin menghapus data ini secara permanen dari master data?"
      confirm-text="Hapus"
      cancel-text="Batal"
      variant="danger"
      @close="confirm.isOpen = false"
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
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Plus,
  Edit2,
  Trash2,
  RotateCw,
  LayoutGrid,
  ChevronUp,
  ChevronDown,
  Layout,
  Globe,
  Cpu,
  Rocket,
  ShoppingCart,
  BookOpen,
  Users,
  PieChart,
  Activity,
  Workflow,
  Bot,
  FileSearch,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-vue-next";
import * as LucideIcons from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import DashboardCard from "../../components/ui/DashboardCard.vue";
import PageHeader from "../../components/ui/PageHeader.vue";
import ConfirmModal from "../../components/ui/ConfirmModal.vue";
import Toast from "../../components/ui/Toast.vue";
import {
  pricingService,
  type PricingItem,
} from "../../services/pricingService";

// State
const items = ref<PricingItem[]>([]);
const loading = ref(true);
const confirm = ref({ isOpen: false, id: null as string | null });
const route = useRoute();
const router = useRouter();

const pageDisplay = computed(() => {
  const path = route.path;
  if (path.includes("style-vibes"))
    return {
      title: "Style Vibes",
      subtitle: "Manajemen gaya visual yang bisa dipilih klien",
      itemLabel: "Style",
      category: "style_vibe" as const,
    };
  if (path.includes("project-types"))
    return {
      title: "Tipe Project",
      subtitle: "Tentukan paket project dan harga dasarnya",
      itemLabel: "Tipe Project",
      category: "project_type" as const,
    };
  if (path.includes("deadlines"))
    return {
      title: "Deadline Pengerjaan",
      subtitle: "Atur kecepatan pengerjaan dan multiplier harga",
      itemLabel: "Deadline",
      category: "project_deadline" as const,
    };
  if (path.includes("services"))
    return {
      title: "Layanan",
      subtitle: "Kategori layanan umum",
      itemLabel: "Layanan",
      category: "service_type" as const,
    };
  return {
    title: "Master Harga",
    subtitle: "Manajemen Data Harga",
    itemLabel: "Item",
    category: "style_vibe" as const,
  };
});

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const loadData = async () => {
  loading.value = true;
  try {
    items.value = await pricingService.getByCategory(
      pageDisplay.value.category,
    );
  } catch (err) {
    console.error(err);
    showToast("Gagal memuat data", "error");
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID").format(price || 0);
};

const handleCreate = () => {
  const path = route.path.endsWith("/")
    ? route.path + "new"
    : route.path + "/new";
  router.push(path);
};

const handleEdit = (id: string) => {
  const path = route.path.endsWith("/")
    ? route.path + `${id}/edit`
    : route.path + `/${id}/edit`;
  router.push(path);
};

const handleDelete = (id: string) => {
  confirm.value = { isOpen: true, id };
};

const executeDelete = async () => {
  if (!confirm.value.id) return;
  try {
    await pricingService.deleteItem(confirm.value.id);
    showToast("Berhasil dihapus", "success");
    loadData();
  } catch (err) {
    console.error(err);
    showToast("Gagal menghapus", "error");
  } finally {
    confirm.value.isOpen = false;
  }
};

const showToast = (msg: string, variant: "success" | "error") => {
  toast.value = { show: true, message: msg, variant };
};

const moveItem = async (index: number, direction: number) => {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= items.value.length) return;

  const item = items.value[index];
  const targetItem = items.value[targetIndex];

  if (!item || !targetItem) return;

  // Swap sort_order
  const oldOrder = item.sort_order;
  item.sort_order = targetItem.sort_order;
  targetItem.sort_order = oldOrder;

  // Update in state
  const newItems = [...items.value];
  newItems[index] = targetItem;
  newItems[targetIndex] = item;
  items.value = newItems;

  try {
    await pricingService.updateItemOrder([
      { id: item.id, sort_order: item.sort_order },
      { id: targetItem.id, sort_order: targetItem.sort_order },
    ]);
  } catch (err) {
    console.error(err);
    showToast("Gagal memperbarui urutan", "error");
    await loadData();
  }
};

const getIconComponent = (name: any) => {
  if (typeof name !== "string") return Layout;
  const iconMap: any = {
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
  };
  return iconMap[name] || (LucideIcons as any)[name] || Layout;
};

onMounted(loadData);

watch(
  () => route.path,
  () => {
    loadData();
  },
);
</script>
