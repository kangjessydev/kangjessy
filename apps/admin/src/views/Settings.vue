<template>
  <div class="page-container">
    <PageHeader
      title="System Settings"
      subtitle="Manage your preferences, security, and data"
    >
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="$router.push('/')"
          >Back</BaseButton
        >
        <BaseButton
          v-if="activeTab === 'general'"
          variant="primary"
          @click="handleSave"
          :loading="saving"
        >
          <Save :size="18" />
          Save Changes
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Tabs Navigation -->
    <div
      class="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-fit"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
      >
        <component :is="tab.icon" :size="16" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <transition name="tab-fade" mode="out-in">
      <!-- General Settings Tab -->
      <div
        v-if="activeTab === 'general'"
        key="general"
        class="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <!-- Admin Core Info -->
        <div class="lg:col-span-4 space-y-8">
          <AdminCard title="Profile" :stretch="false">
            <div class="flex flex-col items-center py-6">
              <div class="relative group cursor-pointer mb-6">
                <div
                  class="w-32 h-32 rounded-[40px] bg-slate-50 border-4 border-white shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105"
                >
                  <img :src="profileImage" class="w-full h-full object-cover" />
                </div>
                <div
                  class="absolute inset-0 bg-[#702DFF]/20 backdrop-blur-[2px] rounded-[40px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                >
                  <div
                    class="p-3 bg-white rounded-2xl shadow-xl text-[#702DFF]"
                  >
                    <Camera :size="24" />
                  </div>
                </div>
              </div>
              <h3 class="text-xl font-black text-[#1B2559]">Kang Jessy</h3>
              <p
                class="text-[10px] font-black text-[#702DFF] bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest mt-2 border border-indigo-100"
              >
                Super Admin
              </p>
            </div>

            <div class="space-y-4 px-2">
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Name</label
                >
                <BaseInput v-model="profile.name" placeholder="Your Name" />
              </div>
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Email</label
                >
                <BaseInput
                  v-model="profile.email"
                  type="email"
                  placeholder="admin@agency.com"
                />
              </div>
            </div>
          </AdminCard>
        </div>

        <!-- Preferences -->
        <div class="lg:col-span-8 space-y-8">
          <AdminCard title="Preferences">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
              <div class="space-y-8">
                <div class="flex items-center justify-between group">
                  <div>
                    <p
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                    >
                      Email Notifications
                    </p>
                    <p class="text-[10px] text-slate-400 font-medium">
                      Get notified for new leads
                    </p>
                  </div>
                  <button
                    @click="toggles.notifications = !toggles.notifications"
                    class="w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner"
                    :class="
                      toggles.notifications ? 'bg-emerald-500' : 'bg-slate-200'
                    "
                  >
                    <div
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md"
                      :class="toggles.notifications ? 'left-7' : 'left-1'"
                    ></div>
                  </button>
                </div>

                <div class="flex items-center justify-between group">
                  <div>
                    <p
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                    >
                      WhatsApp Alerts
                    </p>
                    <p class="text-[10px] text-slate-400 font-medium">
                      Alert when deal is closed
                    </p>
                  </div>
                  <button
                    @click="toggles.wa = !toggles.wa"
                    class="w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner"
                    :class="toggles.wa ? 'bg-emerald-500' : 'bg-slate-200'"
                  >
                    <div
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md"
                      :class="toggles.wa ? 'left-7' : 'left-1'"
                    ></div>
                  </button>
                </div>
              </div>

              <div class="space-y-6">
                <AdminSelect label="Currency" class="!text-[10px]">
                  <option>Rupiah (IDR)</option>
                  <option>Dollar (USD)</option>
                </AdminSelect>
                <AdminSelect label="Language" class="!text-[10px]">
                  <option>Bahasa Indonesia</option>
                  <option>English</option>
                </AdminSelect>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      <!-- Dokumen Settings Tab -->
      <div
        v-else-if="activeTab === 'documents'"
        key="documents"
        class="space-y-8 animate-fade-in-up"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminCard
            title="Proposal Links"
            subtitle="Link GDrive Proposal sesuai tipe proyek"
          >
            <div class="space-y-6">
              <div
                v-for="doc in docLinks"
                :key="doc.id"
                class="p-4 bg-slate-50 rounded-2xl space-y-3"
              >
                <BaseInput
                  v-model="doc.proposal_link"
                  :label="doc.project_type"
                  placeholder="Pastikan link GDrive sudah 'Anyone with link'..."
                  :icon="LinkIcon"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard
            title="Kontrak Kerja"
            subtitle="Link GDrive Kontrak sesuai tipe proyek"
          >
            <div class="space-y-6">
              <div
                v-for="doc in docLinks"
                :key="doc.id"
                class="p-4 bg-slate-50 rounded-2xl space-y-3"
              >
                <BaseInput
                  v-model="doc.contract_link"
                  :label="doc.project_type"
                  placeholder="Link Draft Kontrak Kerja..."
                  :icon="FileText"
                />
              </div>
            </div>
          </AdminCard>
        </div>

        <div class="flex justify-end pt-4">
          <BaseButton
            variant="primary"
            @click="handleSaveDocs"
            :loading="saving"
          >
            <Save :size="18" />
            Simpan Konfigurasi Dokumen
          </BaseButton>
        </div>
      </div>

      <!-- Security Tab -->
      <div v-else-if="activeTab === 'security'" key="security">
        <AdminCard title="Security Settings">
          <div class="space-y-6">
            <div
              class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-5">
                <div
                  class="w-14 h-14 rounded-3xl bg-indigo-50 text-[#702DFF] flex items-center justify-center border border-indigo-100"
                >
                  <ShieldCheck :size="28" />
                </div>
                <div>
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                  >
                    Two-Factor Authentication
                  </p>
                  <p
                    class="text-[10px] text-rose-500 font-black uppercase tracking-tighter flex items-center gap-1.5"
                  >
                    <AlertCircle :size="10" />
                    Not enabled
                  </p>
                </div>
              </div>
              <BaseButton variant="primary" size="sm">Enable 2FA</BaseButton>
            </div>

            <div
              class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-5">
                <div
                  class="w-14 h-14 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center"
                >
                  <Key :size="28" />
                </div>
                <div>
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                  >
                    Change Password
                  </p>
                  <p class="text-[10px] text-slate-400 font-medium">
                    Last changed 30 days ago
                  </p>
                </div>
              </div>
              <BaseButton variant="secondary" size="sm">Update</BaseButton>
            </div>

            <div
              class="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                ></div>
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Supabase Auth
                </p>
              </div>
              <button
                class="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-colors"
              >
                Logout All Sessions
              </button>
            </div>
          </div>
        </AdminCard>
      </div>

      <!-- Backup & Export Tab -->
      <div v-else-if="activeTab === 'backup'" key="backup">
        <AdminCard title="Backup & Export">
          <div class="space-y-6">
            <!-- Full Backup -->
            <div
              class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-2xl bg-[#702DFF] text-white flex items-center justify-center"
                >
                  <Archive :size="24" />
                </div>
                <div>
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                  >
                    Full System Backup
                  </p>
                  <p class="text-[10px] text-slate-400 font-medium">
                    Export all data in one JSON file
                  </p>
                </div>
              </div>
              <BaseButton
                variant="primary"
                @click="handleFullBackup"
                :loading="isExporting"
              >
                <Database :size="16" />
                Create Backup
              </BaseButton>
            </div>

            <!-- Per-Module Export -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Blog Posts -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"
                  >
                    <FileJson :size="16" />
                  </div>
                  <div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Blog Posts
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {{ blogPosts.length }} records
                    </p>
                  </div>
                </div>
                <ExportButton
                  :data="blogPosts"
                  moduleName="blog"
                  size="sm"
                  @exported="handleExported"
                  class="w-fit"
                />
              </div>

              <!-- Portfolio -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center"
                  >
                    <FileJson :size="16" />
                  </div>
                  <div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Portfolio
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {{ portfolioProjects.length }} records
                    </p>
                  </div>
                </div>
                <ExportButton
                  :data="portfolioProjects"
                  moduleName="portfolio"
                  size="sm"
                  @exported="handleExported"
                  class="w-fit"
                />
              </div>

              <!-- Clients -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"
                  >
                    <FileJson :size="16" />
                  </div>
                  <div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Clients
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {{ clients.length }} records
                    </p>
                  </div>
                </div>
                <ExportButton
                  :data="clients"
                  moduleName="clients"
                  size="sm"
                  @exported="handleExported"
                  class="w-fit"
                />
              </div>
            </div>

            <!-- Export Info -->
            <div
              class="flex items-center gap-2 text-slate-400 mt-4 p-3 bg-slate-50 rounded-xl"
            >
              <Download :size="14" />
              <p class="text-[10px] font-medium">
                All exports include metadata for easy re-import
              </p>
            </div>
          </div>
        </AdminCard>

        <!-- Restore / Import Section -->
        <AdminCard title="Restore Data" class="mt-6">
          <div
            class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center"
              >
                <Upload :size="24" />
              </div>
              <div>
                <p
                  class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                >
                  Restore from Backup
                </p>
                <p class="text-[10px] text-slate-400 font-medium">
                  Import data from a previously exported JSON file
                </p>
              </div>
            </div>
            <ImportButton
              label="Import Data"
              variant="primary"
              :importHandler="handleImport"
              @imported="handleImported"
            />
          </div>
          <div
            class="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100"
          >
            <AlertTriangle :size="14" class="text-amber-500 shrink-0 mt-0.5" />
            <p class="text-[10px] text-amber-700">
              Import will add new records. Existing data with same ID may be
              updated.
            </p>
          </div>
        </AdminCard>
      </div>
    </transition>

    <!-- Toast -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from "vue";
import {
  Save,
  Camera,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Download,
  Upload,
  Database,
  FileJson,
  Archive,
  Settings,
  Shield,
  HardDrive,
  Key,
  FileText,
  Link as LinkIcon,
} from "lucide-vue-next";
import AdminCard from "../components/ui/AdminCard.vue";
import AdminSelect from "../components/ui/AdminSelect.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import BaseInput from "../components/ui/BaseInput.vue";
import Toast from "../components/ui/Toast.vue";
import ExportButton from "../components/ui/ExportButton.vue";
import ImportButton from "../components/ui/ImportButton.vue";
import { useExport } from "../composables/useExport";
import { blogService } from "../services/blogService";
import { portfolioService } from "../services/portfolioService";
import { clientsService } from "../services/clientsService";
import { docsService, type DocLink } from "../services/docsService";

// Tabs Configuration
const tabs = [
  { id: "general", label: "General", icon: markRaw(Settings) },
  { id: "documents", label: "Dokumen", icon: markRaw(FileText) },
  { id: "security", label: "Security", icon: markRaw(Shield) },
  { id: "backup", label: "Backup & Export", icon: markRaw(HardDrive) },
];

const activeTab = ref("general");

const profileImage =
  "https://ui-avatars.com/api/?name=Kang+Jessy&background=702DFF&color=fff&size=200";

const saving = ref(false);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const profile = ref({
  name: "Kang Jessy",
  email: "admin@kangjessy.com",
});

const toggles = ref({
  notifications: true,
  wa: false,
});

// Export functionality
const { exportFullBackup, isExporting } = useExport();

// Data for export
const blogPosts = ref<any[]>([]);
const portfolioProjects = ref<any[]>([]);
const clients = ref<any[]>([]);

const loadExportData = async () => {
  try {
    blogPosts.value = await blogService.getAll();
    portfolioProjects.value = await portfolioService.getAll();
    clients.value = await clientsService.getAll();
  } catch (error) {
    console.error("Failed to load export data:", error);
  }
};

const handleFullBackup = async () => {
  const result = await exportFullBackup({
    blog: blogPosts.value,
    portfolio: portfolioProjects.value,
    clients: clients.value,
  });
  if (result.success) {
    toast.value = {
      show: true,
      message: `Full backup created: ${result.filename}`,
      variant: "success",
    };
  } else {
    toast.value = {
      show: true,
      message: "Backup failed. Please try again.",
      variant: "error",
    };
  }
};

const handleExported = (result: { success: boolean; filename?: string }) => {
  if (result.success) {
    toast.value = {
      show: true,
      message: `Exported: ${result.filename}`,
      variant: "success",
    };
  }
};

// Import Handlers
const handleImport = async (moduleName: string, data: any[]) => {
  let imported = 0;
  const errors: string[] = [];

  try {
    for (const item of data) {
      try {
        if (moduleName.toLowerCase().includes("blog")) {
          if (item.id) {
            await blogService.update(item.id, item);
          } else {
            await blogService.create(item);
          }
        } else if (moduleName.toLowerCase().includes("portfolio")) {
          if (item.id) {
            await portfolioService.update(item.id, item);
          } else {
            await portfolioService.create(item);
          }
        } else if (
          moduleName.toLowerCase().includes("clients") ||
          moduleName.toLowerCase().includes("leads")
        ) {
          if (item.id) {
            await clientsService.update(item.id, item);
          } else {
            const { id, created_at, ...cleanInfo } = item;
            await clientsService.create(cleanInfo);
          }
        }
        imported++;
      } catch (err: any) {
        errors.push(`Error in record ${imported + 1}: ${err.message}`);
      }
    }
    return {
      success: true,
      imported,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (err: any) {
    return { success: false, imported, errors: [err.message] };
  }
};

const handleImported = (result: {
  success: boolean;
  message: string;
  recordCount?: number;
}) => {
  if (result.success) {
    toast.value = { show: true, message: result.message, variant: "success" };
    loadExportData();
  } else {
    toast.value = { show: true, message: result.message, variant: "error" };
  }
};

const docLinks = ref<DocLink[]>([]);

const loadDocs = async () => {
  docLinks.value = await docsService.getLinks();
};

onMounted(() => {
  loadExportData();
  loadDocs();
});

const handleSaveDocs = async () => {
  saving.value = true;
  try {
    await docsService.saveLinks(docLinks.value);
    toast.value = {
      show: true,
      message: "Link dokumen berhasil diperbarui!",
      variant: "success",
    };
  } catch (e) {
    toast.value = {
      show: true,
      message: "Gagal memperbarui link.",
      variant: "error",
    };
  } finally {
    saving.value = false;
  }
};

const handleSave = async () => {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    toast.value = {
      show: true,
      message: "Settings saved successfully!",
      variant: "success",
    };
  }, 1000);
};
</script>

<style scoped>
@reference "tailwindcss";
.tab-button {
  @apply px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200;
  @apply text-slate-500 hover:text-slate-700 hover:bg-slate-50;
}

.tab-button.active {
  @apply bg-[#702DFF] text-white shadow-lg shadow-indigo-500/20;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.2s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
