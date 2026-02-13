<template>
  <div class="page-container max-w-7xl mx-auto pb-24 px-4 sm:px-6 relative">
    <!-- Background Decor -->
    <div
      class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-100/30 blur-[120px] rounded-full opacity-50"
    ></div>
    <div
      class="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-50/40 blur-[100px] rounded-full opacity-40"
    ></div>

    <!-- Header -->
    <div
      class="flex items-center justify-between mb-8 px-1 lg:px-2 pt-4 lg:pt-0 relative z-10"
    >
      <div class="flex items-center gap-4 lg:gap-5">
        <button
          @click="router.back()"
          class="w-11 h-11 lg:w-12 lg:h-12 bg-white/70 backdrop-blur-md border border-slate-100/50 rounded-2xl flex items-center justify-center hover:bg-white transition-all text-slate-400 hover:text-[#7029FF] shadow-sm active:scale-95 group"
        >
          <ArrowLeft
            :size="20"
            class="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>
        <div>
          <nav
            class="flex items-center gap-2 text-[8px] lg:text-[9px] font-black uppercase tracking-[0.25em] text-slate-300 mb-1.5 ml-0.5"
          >
            <span
              class="hover:text-slate-400 cursor-default transition-colors"
              >{{ pageDisplay.title }}</span
            >
            <ChevronRight :size="10" class="opacity-30" />
            <span class="text-[#7029FF] brightness-90">{{
              isEdit ? "Update Data" : "Buat Baru"
            }}</span>
          </nav>
          <h1
            class="text-xl lg:text-4xl font-black text-[#1B2559] leading-tight tracking-tight drop-shadow-sm"
          >
            {{
              isEdit
                ? "Edit " + pageDisplay.itemLabel
                : "Buat " + pageDisplay.itemLabel
            }}
          </h1>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <BaseButton
          variant="secondary"
          @click="router.back()"
          class="hidden sm:flex"
          >Batal</BaseButton
        >
        <BaseButton
          variant="secondary"
          @click="saveItem(false)"
          :loading="saving"
          class="bg-white! border-slate-100/50! shadow-sm! rounded-xl!"
        >
          Simpan
        </BaseButton>
        <BaseButton variant="primary" @click="saveItem(true)" :loading="saving">
          <Save :size="18" />
          {{ isEdit ? "Simpan & Tutup" : "Terbitkan " + pageDisplay.itemLabel }}
        </BaseButton>
      </div>
    </div>

    <!-- Main Content -->
    <div v-if="loading" class="p-24 text-center">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-50 border-t-[#702DFF]"
      ></div>
      <p
        class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]"
      >
        Processing master data...
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start"
    >
      <!-- Main Form Area -->
      <div class="lg:col-span-8 space-y-8">
        <AdminCard
          title="A. Definisi Dasar"
          subtitle="Konfigurasi identitas dan slug"
          :stretch="false"
          class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <BaseInput
              v-model="form.name"
              :label="pageDisplay.itemLabel + ' Name'"
              :placeholder="'E.g. ' + pageDisplay.exampleName"
              :icon="TypeIcon"
              class="rounded-2xl!"
              @input="handleNameInput"
            />

            <div class="space-y-2">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2"
                >Slug Identifier</label
              >
              <div
                class="flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-100/50 rounded-2xl transition-all h-[58px]"
              >
                <HashIcon :size="18" class="text-slate-300 shrink-0" />
                <div class="flex-1 flex items-center gap-2 overflow-hidden">
                  <input
                    v-if="isEditingSlug"
                    v-model="form.slug"
                    type="text"
                    class="bg-transparent border-none p-0 text-sm font-bold text-[#702DFF] focus:ring-0 w-full lowercase tracking-wider"
                    placeholder="item-slug"
                  />
                  <span
                    v-else
                    class="text-sm font-bold text-slate-400 truncate opacity-60"
                  >
                    {{ form.slug || "generating..." }}
                  </span>
                </div>
                <button
                  @click="isEditingSlug = !isEditingSlug"
                  class="p-2 rounded-lg hover:bg-white hover:text-[#702DFF] hover:shadow-sm transition-all text-slate-300"
                >
                  <Check v-if="isEditingSlug" :size="16" />
                  <Edit3 v-else :size="16" />
                </button>
              </div>
            </div>

            <AdminTextarea
              v-model="form.description"
              label="Deskripsi Estetik / Detail"
              placeholder="Jelaskan secara singkat detail atau keunggulan pilihan ini..."
              class="md:col-span-2"
            />

            <!-- Icon Selection: Only for Service & Project Types -->
            <div
              v-if="
                ['service_type', 'project_type'].includes(pageDisplay.category)
              "
              class="md:col-span-2 space-y-4"
            >
              <div class="flex gap-4 items-end">
                <AdminSelect
                  v-model="form.icon"
                  label="Pilih Ikon Visual"
                  class="flex-1"
                >
                  <option value="">Pilih Ikon...</option>
                  <option
                    v-for="icon in availableIcons"
                    :key="icon"
                    :value="icon"
                  >
                    {{ icon }}
                  </option>
                </AdminSelect>
                <!-- Mini Preview Area -->
                <div
                  class="w-[58px] h-[58px] rounded-2xl bg-indigo-50 flex items-center justify-center text-[#702DFF] border border-indigo-100/50 shadow-inner mb-0.5"
                  title="Preview Ikon"
                >
                  <component :is="getIconComponent(form.icon)" :size="24" />
                </div>
              </div>
              <p
                class="text-[9px] text-slate-300 font-bold uppercase tracking-widest ml-2"
              >
                *Ikon ini akan muncul di kalkulator website sebagai reprsentasi
                visual kategori.
              </p>
            </div>
          </div>
        </AdminCard>

        <!-- Dynamic Metadata for Project Types -->
        <AdminCard
          v-if="pageDisplay.category === 'project_type'"
          title="B. Metadata & Relasi"
          subtitle="Hubungkan dengan kategori layanan utama"
          :stretch="false"
          class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <AdminSelect
              v-model="form.metadata.service_id"
              label="Kategori Layanan Utama"
            >
              <option value="">Pilih Layanan Utama...</option>
              <option
                v-for="svc in serviceTypes"
                :key="svc.slug"
                :value="svc.slug"
              >
                {{ svc.name }}
              </option>
            </AdminSelect>

            <BaseInput
              v-model="form.metadata.badge"
              label="Badge / Label Khusus"
              placeholder="Misal: Best Value, Promo"
              :icon="Zap"
              class="rounded-2xl!"
            />
          </div>
        </AdminCard>

        <!-- Commercial Data: Price or Multiplier -->
        <AdminCard
          v-if="
            ['project_type', 'project_deadline'].includes(pageDisplay.category)
          "
          title="C. Data Komersial"
          :subtitle="
            pageDisplay.category === 'project_type'
              ? 'Tentukan harga dasar paket'
              : 'Tentukan multiplier kecepatan'
          "
          :stretch="false"
          class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <BaseInput
              v-if="pageDisplay.category === 'project_type'"
              v-model.number="form.base_price"
              label="Harga Dasar (Rp)"
              placeholder="0"
              type="number"
              prefix="Rp."
              class="rounded-2xl!"
            />

            <BaseInput
              v-if="pageDisplay.category === 'project_deadline'"
              v-model.number="form.multiplier"
              label="Multiplier Harga (x)"
              placeholder="1.0"
              type="number"
              step="0.05"
              :icon="Zap"
              class="rounded-2xl!"
            />
          </div>
        </AdminCard>

        <AdminCard
          v-if="pageDisplay.category === 'style_vibe'"
          title="D. Representasi Visual"
          subtitle="Thumbnail dan aset tampilan gaya"
          :stretch="false"
          class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
        >
          <div class="space-y-6 mt-4">
            <div
              class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div class="space-y-1">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2"
                  >Resource Asset</label
                >
                <p
                  class="text-[9px] text-slate-300 font-bold uppercase tracking-widest ml-2"
                >
                  Pilih gambar dari Media Library
                </p>
              </div>
              <BaseButton
                variant="secondary"
                @click="isMediaPickerOpen = true"
                class="bg-white! shadow-sm! rounded-xl! py-2.5!"
              >
                <ImageIcon :size="16" class="mr-2" />
                Open Media Library
              </BaseButton>
            </div>

            <div
              v-if="form.image_url"
              class="relative group aspect-[16/9] lg:aspect-[21/9] rounded-[32px] overflow-hidden bg-slate-100 border-4 border-white shadow-xl group cursor-pointer"
              @click="isMediaPickerOpen = true"
            >
              <img
                :src="form.image_url"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-8"
              >
                <p
                  class="text-white text-[10px] font-black uppercase tracking-widest"
                >
                  Change Image Asset
                </p>
                <div
                  class="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white"
                >
                  <Edit3 :size="16" />
                </div>
              </div>
              <!-- Remove Selection -->
              <button
                @click.stop="form.image_url = ''"
                class="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-500 text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 flex items-center justify-center"
              >
                <X :size="18" />
              </button>
            </div>
            <div
              v-else
              class="aspect-[16/9] lg:aspect-[21/9] rounded-[32px] border-2 border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300 gap-4 cursor-pointer hover:bg-slate-100 hover:border-[#702DFF]/20 transition-all group"
              @click="isMediaPickerOpen = true"
            >
              <div
                class="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:text-[#7029FF] transition-all group-hover:scale-110"
              >
                <ImageIcon :size="32" stroke-width="1.5" />
              </div>
              <div class="text-center">
                <p class="text-[10px] font-black uppercase tracking-[0.2em]">
                  Pilih Visual Master
                </p>
                <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase">
                  Klik untuk membuka Library
                </p>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-50">
              <BaseInput
                v-model="form.image_url"
                label="Direct URL Fallback"
                placeholder="Or paste direct image URL here..."
                :icon="ImageIcon"
                class="rounded-2xl!"
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard
          title="E. Pencarian & Indeks"
          subtitle="Organisasi sistem"
          :stretch="false"
          class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <BaseInput
              v-model.number="form.sort_order"
              label="Urutan Tampilan"
              placeholder="0"
              type="number"
              :icon="ArrowUp10"
              class="rounded-2xl!"
            />
          </div>
        </AdminCard>
        <!-- Feature Settings -->
        <AdminCard
          v-if="pageDisplay.category === 'additional_feature'"
          title="F. Konfigurasi Fitur"
          subtitle="Relasi dan harga coret"
          :stretch="false"
          class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <!-- Original Price -->
            <BaseInput
              v-model.number="form.metadata.originalPrice"
              label="Harga Coret (Original Price)"
              placeholder="0"
              type="number"
              prefix="Rp."
              class="rounded-2xl!"
            />

            <!-- Relevant Services Checkboxes -->
            <div class="col-span-1 md:col-span-2 space-y-3">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2"
              >
                Relevan Untuk Layanan
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="svc in serviceTypes"
                  :key="svc.slug"
                  class="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100/50 rounded-xl cursor-pointer hover:border-[#7029FF]/20 transition-all select-none"
                  @click="toggleRelevantService(svc.slug)"
                >
                  <div
                    class="w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0"
                    :class="
                      form.metadata.relevantTo?.includes(svc.slug)
                        ? 'bg-[#7029FF] border-[#7029FF] text-white'
                        : 'bg-white border-slate-200'
                    "
                  >
                    <Check
                      v-if="form.metadata.relevantTo?.includes(svc.slug)"
                      :size="12"
                      stroke-width="3"
                    />
                  </div>
                  <span class="text-sm font-bold text-[#1B2559]">{{
                    svc.name
                  }}</span>
                </div>
              </div>
              <p
                class="text-[9px] text-slate-300 font-bold uppercase tracking-widest ml-2"
              >
                *Fitur ini hanya akan muncul jika user memilih layanan yang
                dicentang.
              </p>
            </div>
          </div>
        </AdminCard>
      </div>

      <!-- Settings Sidebar -->
      <div class="lg:col-span-4 space-y-8">
        <div class="sticky top-24 space-y-8">
          <!-- Publishing Card -->
          <AdminCard
            title="Status & Visibilitas"
            subtitle="Atur ketersediaan di website"
            :stretch="false"
            class="rounded-[40px]! border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
          >
            <div class="space-y-6 mt-4">
              <div
                class="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-slate-100/50 group hover:border-indigo-100/50 transition-all"
              >
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black uppercase tracking-widest text-[#1B2559]"
                    >Status Produksi</span
                  >
                  <span
                    class="text-[9px] font-bold uppercase"
                    :class="
                      form.is_active ? 'text-emerald-500' : 'text-slate-400'
                    "
                  >
                    {{
                      form.is_active ? "Live di Website" : "Offline / Sembunyi"
                    }}
                  </span>
                </div>
                <label
                  class="relative inline-flex items-center cursor-pointer group/toggle"
                >
                  <input
                    type="checkbox"
                    v-model="form.is_active"
                    class="sr-only peer"
                  />
                  <div
                    class="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7029FF] shadow-inner"
                  ></div>
                </label>
              </div>
            </div>
          </AdminCard>

          <!-- Info Card -->
          <div
            class="bg-indigo-50/30 rounded-[40px] p-8 border border-white shadow-xl shadow-indigo-500/5 relative overflow-hidden group"
          >
            <div
              class="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-2xl"
            ></div>
            <div class="flex items-start gap-4 relative z-10">
              <div
                class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#7029FF] shrink-0 shadow-sm border border-indigo-50"
              >
                <Info :size="20" />
              </div>
              <div>
                <h4
                  class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-2"
                >
                  Sync Intelligence
                </h4>
                <p
                  class="text-[10px] text-slate-500 font-medium leading-relaxed"
                >
                  Setiap perubahan data master akan langsung sinkron dengan
                  kalkulator order. Pastikan data akurat sebelum menyimpan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <!-- Media Picker Modal -->
    <MediaPickerModal
      :is-open="isMediaPickerOpen"
      @close="isMediaPickerOpen = false"
      @select="handleMediaSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronRight,
  Save,
  Info,
  ArrowLeft,
  Image as ImageIcon,
  Type as TypeIcon,
  Hash as HashIcon,
  Edit3,
  Check,
  X,
  Zap,
  DollarSign,
  Layers,
  ArrowUp10,
  Layout,
  Globe,
  Cpu,
  Rocket,
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
  Plus as PlusIcon,
  Trash2 as TrashIcon,
} from "lucide-vue-next";
import * as LucideIcons from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import AdminCard from "../../components/ui/AdminCard.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import AdminSelect from "../../components/ui/AdminSelect.vue";
import AdminTextarea from "../../components/ui/AdminTextarea.vue";
import Toast from "../../components/ui/Toast.vue";
import MediaPickerModal from "../../components/media/MediaPickerModal.vue";
import {
  pricingService,
  type PricingItem,
} from "../../services/pricingService";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);

const loading = ref(true);
const saving = ref(false);
const isEditingSlug = ref(false);
const isMediaPickerOpen = ref(false);
const serviceTypes = ref<PricingItem[]>([]);

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const pageDisplay = computed(() => {
  const path = route.path;
  if (path.includes("style-vibes"))
    return {
      title: "Style Vibes",
      listPath: "/services/style-vibes",
      itemLabel: "Style",
      category: "style_vibe",
      exampleName: "Modern Dark",
    };
  if (path.includes("features"))
    return {
      title: "Fitur Tambahan",
      listPath: "/services/features",
      itemLabel: "Fitur",
      category: "additional_feature",
      exampleName: "SEO Audit",
    };
  if (path.includes("project-types"))
    return {
      title: "Tipe Project",
      listPath: "/services/project-types",
      itemLabel: "Tipe Project",
      category: "project_type",
      exampleName: "Company Profile",
    };
  if (path.includes("deadlines"))
    return {
      title: "Deadline Pengerjaan",
      listPath: "/services/deadlines",
      itemLabel: "Deadline",
      category: "project_deadline",
      exampleName: "Ekspres",
    };
  if (path.includes("services"))
    return {
      title: "Layanan Utama",
      listPath: "/services/main",
      itemLabel: "Layanan",
      category: "service_type",
      exampleName: "Web Development",
    };
  return {
    title: "Master Harga",
    listPath: "/services/style-vibes",
    itemLabel: "Item",
    category: "style_vibe" as any,
    exampleName: "",
  };
});

const form = ref<Partial<PricingItem>>({
  name: "",
  slug: "",
  description: "",
  image_url: "",
  is_active: true,
  sort_order: 0,
  category: pageDisplay.value.category,
  metadata: {
    service_id: "",
    badge: "",
    relevantTo: [],
    originalPrice: 0,
  },
});

const loadServiceTypes = async () => {
  try {
    serviceTypes.value = await pricingService.getByCategory("service_type");
  } catch (err) {
    console.error("Failed to fetch service types", err);
  }
};

const loadItem = async () => {
  // Always load service categories if we're in project type mode or additional feature mode
  if (
    pageDisplay.value.category === "project_type" ||
    pageDisplay.value.category === "additional_feature"
  ) {
    await loadServiceTypes();
  }

  if (!isEdit.value) {
    // Initialize default metadata structure based on category
    if (pageDisplay.value.category === "service_type") {
      form.value.metadata = {
        badge: "Professional Solution",
        status: "active",
        is_featured: false,
        features: [
          "100% Kepemilikan & Akses Source Code",
          "Desain Premium & UX Copywriting",
        ], // Default template
        ...(form.value.metadata || {}),
      };
    } else if (pageDisplay.value.category === "additional_feature") {
      // Ensure array init
      form.value.metadata = {
        relevantTo: [],
        originalPrice: 0,
        ...(form.value.metadata || {}),
      };
    }

    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const id = route.params.id as string;
    const item = await pricingService.getById(id);
    if (item) {
      form.value = {
        ...item,
        metadata: {
          service_id: "",
          badge: "",
          status: "active",
          is_featured: false,
          features: [],
          relevantTo: [],
          originalPrice: 0,
          ...(item.metadata || {}),
        },
      };
    } else {
      showToast("Item not found", "error");
      router.push(pageDisplay.value.listPath);
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to load item", "error");
  } finally {
    loading.value = false;
  }
};

const addFeature = () => {
  if (!form.value.metadata.features) form.value.metadata.features = [];
  form.value.metadata.features.push("");
};

const removeFeature = (index: number) => {
  if (form.value.metadata.features) {
    form.value.metadata.features.splice(index, 1);
  }
};

const toggleRelevantService = (slug: string) => {
  if (!form.value.metadata.relevantTo) form.value.metadata.relevantTo = [];
  const idx = form.value.metadata.relevantTo.indexOf(slug);
  if (idx === -1) {
    form.value.metadata.relevantTo.push(slug);
  } else {
    form.value.metadata.relevantTo.splice(idx, 1);
  }
};

const saveItem = async (redirect: boolean = true) => {
  if (!form.value.name || !form.value.slug) {
    showToast("Name and Slug are required", "error");
    return;
  }

  saving.value = true;
  try {
    const result = await pricingService.upsertItem(form.value);
    showToast(
      isEdit.value ? "Updated successfully!" : "Created successfully!",
      "success",
    );

    if (redirect) {
      // Navigate back to list after success
      setTimeout(() => {
        router.push(pageDisplay.value.listPath);
      }, 1000);
    } else if (!isEdit.value && result && result.id) {
      // If it was a new record and we're staying, redirect to its edit page
      router.replace(`${route.path.replace("/create", `/${result.id}/edit`)}`);
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to save item", "error");
  } finally {
    saving.value = false;
  }
};

const handleNameInput = () => {
  if (!isEditingSlug.value && !isEdit.value && form.value.name) {
    form.value.slug = form.value.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
};

const handleMediaSelect = (media: any) => {
  form.value.image_url = media.url;
  isMediaPickerOpen.value = false;
  showToast("Asset selected successfully", "success");
};

const showToast = (msg: string, variant: "success" | "error") => {
  toast.value = { show: true, message: msg, variant };
};

const availableIcons = [
  "Zap",
  "Globe",
  "Cpu",
  "Rocket",
  "Layout",
  "ShoppingCart",
  "BookOpen",
  "Activity",
  "Users",
  "PieChart",
  "Workflow",
  "Bot",
  "FileSearch",
  "TrendingUp",
  "MessageSquare",
  "Database",
  "Layers",
];

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

onMounted(loadItem);
</script>
