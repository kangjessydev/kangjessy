<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header dengan Navigasi Balik -->
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="router.back()"
        class="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#7029FF] hover:border-indigo-100 hover:shadow-sm transition-all active:scale-90"
      >
        <ChevronLeft :size="20" />
      </button>
      <div>
        <h1 class="text-2xl font-black text-[#1B2559] tracking-tight">
          Detail Intelijen Klien
        </h1>
        <p
          class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1"
        >
          Informasi Komprehensif & Riwayat Interaksi
        </p>
      </div>
    </div>

    <div v-if="loading" class="p-20 text-center">
      <div
        class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
      ></div>
      <p
        class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
      >
        Menyusun Profil...
      </p>
    </div>

    <div v-else-if="client" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Kolom Kiri: Profil & Insights -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Card Profil Utama -->
        <AdminCard
          class="relative overflow-hidden rounded-[40px]! border-none shadow-xl shadow-slate-200/20"
        >
          <div
            class="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-indigo-500 to-[#702DFF]"
          ></div>

          <div class="relative pt-12 px-6 pb-8 text-center">
            <div
              class="w-24 h-24 bg-white rounded-[32px] mx-auto mb-4 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden"
            >
              <div
                class="w-full h-full bg-slate-50 flex items-center justify-center text-[#702DFF] font-black text-3xl"
              >
                {{ client.name.charAt(0).toUpperCase() }}
              </div>
            </div>

            <h2 class="text-xl font-black text-[#1B2559] tracking-tight mb-1">
              {{ client.name }}
            </h2>
            <p class="text-slate-400 text-sm font-medium mb-4">
              {{ client.company || "Personal Client" }}
            </p>

            <div class="flex flex-wrap justify-center gap-2 mb-6">
              <span
                class="px-3 py-1.5 bg-indigo-50 text-[#702DFF] text-[9px] font-black uppercase tracking-widest rounded-xl border border-indigo-100/50"
              >
                {{ client.type || "General Lead" }}
              </span>
              <span
                class="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100"
                :class="getStatusClass(client.status)"
              >
                {{ client.status }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
              <div class="text-left">
                <p
                  class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1"
                >
                  Lifetime Value
                </p>
                <p class="text-lg font-black text-emerald-500 tracking-tight">
                  {{ formatPrice(totalRevenue) }}
                </p>
              </div>
              <div class="text-left">
                <p
                  class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1"
                >
                  Recency
                </p>
                <p class="text-lg font-black text-[#1B2559] tracking-tight">
                  {{ lastInteraction }}
                </p>
              </div>
            </div>
          </div>
        </AdminCard>

        <!-- Card Intelligence Tools -->
        <AdminCard
          class="p-6 rounded-[32px]! border-slate-100 shadow-lg shadow-slate-200/10"
        >
          <h3
            class="text-sm font-black text-[#1B2559] uppercase tracking-widest mb-6 flex items-center gap-2"
          >
            <Zap :size="16" class="text-amber-400" />
            WA Automator
          </h3>

          <div class="space-y-3">
            <button
              @click="openWhatsApp('greeting')"
              class="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#25D366] hover:bg-white transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#25D366] transition-colors shadow-sm"
                >
                  <MessageCircle :size="16" />
                </div>
                <span
                  class="text-xs font-black text-slate-600 group-hover:text-[#1B2559]"
                  >Sapaan Hangat</span
                >
              </div>
              <ChevronRight
                :size="14"
                class="text-slate-300 group-hover:text-[#25D366]"
              />
            </button>

            <button
              @click="openWhatsApp('follow_up')"
              class="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#702DFF] hover:bg-white transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#702DFF] transition-colors shadow-sm"
                >
                  <Zap :size="16" />
                </div>
                <span
                  class="text-xs font-black text-slate-600 group-hover:text-[#1B2559]"
                  >Follow Up Lead</span
                >
              </div>
              <ChevronRight
                :size="14"
                class="text-slate-300 group-hover:text-[#702DFF]"
              />
            </button>

            <button
              @click="openWhatsApp('invoice')"
              class="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-500 hover:bg-white transition-all group"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors shadow-sm"
                >
                  <DollarSign :size="16" />
                </div>
                <span
                  class="text-xs font-black text-slate-600 group-hover:text-[#1B2559]"
                  >Tagihan Invoice</span
                >
              </div>
              <ChevronRight
                :size="14"
                class="text-slate-300 group-hover:text-amber-500"
              />
            </button>
          </div>
        </AdminCard>
      </div>

      <!-- Kolom Kanan: Detail Tabs -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Tab Navigation -->
        <div
          class="flex gap-1 p-1 bg-slate-100/50 backdrop-blur-md rounded-[22px] w-fit border border-slate-200/50"
        >
          <button
            @click="activeTab = 'timeline'"
            class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="
              activeTab === 'timeline'
                ? 'bg-white text-[#702DFF] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            "
          >
            <Clock :size="14" />
            Lini Masa Interaksi
          </button>
          <button
            @click="activeTab = 'projects'"
            class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="
              activeTab === 'projects'
                ? 'bg-white text-[#702DFF] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            "
          >
            <Layers :size="14" />
            Riwayat Proyek
          </button>
          <button
            @click="activeTab = 'brief'"
            class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="
              activeTab === 'brief'
                ? 'bg-white text-[#702DFF] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            "
          >
            <FileText :size="14" />
            Detail Brief
          </button>
        </div>

        <!-- Tab 1: Timeline / Logs -->
        <div
          v-if="activeTab === 'timeline'"
          class="space-y-4 animate-fade-in-up"
        >
          <AdminCard
            no-padding
            class="overflow-hidden bg-white rounded-[32px]! shadow-xl shadow-slate-200/10 border border-slate-50"
          >
            <div
              class="p-6 border-b border-slate-50 flex items-center justify-between"
            >
              <h3
                class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
              >
                Tambah Catatan Baru
              </h3>
              <div class="flex gap-2">
                <button
                  v-for="type in interactionTypes"
                  :key="type.id"
                  @click="newInteraction.type = type.id"
                  class="w-10 h-10 rounded-xl flex items-center justify-center transition-all border shrink-0"
                  :class="
                    newInteraction.type === type.id
                      ? 'bg-[#7029FF] text-white border-[#7029FF] shadow-lg shadow-indigo-500/20 active:scale-95'
                      : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-200'
                  "
                  :title="type.label"
                >
                  <component :is="type.icon" :size="18" />
                </button>
              </div>
            </div>

            <div class="p-6 space-y-4">
              <textarea
                v-model="newInteraction.content"
                placeholder="Tulis apa yang terjadi dengan klien ini... (Hasil meeting, catatan follow-up, dll)"
                class="w-full bg-slate-50 border-none rounded-[24px] p-5 text-sm font-medium focus:ring-2 focus:ring-[#7029FF]/10 min-h-[120px] transition-all"
              ></textarea>
              <div class="flex justify-end">
                <ButtonPrimary
                  @click="saveInteraction"
                  :disabled="!newInteraction.content || saving"
                  class="rounded-2xl"
                >
                  <Send v-if="!saving" :size="16" />
                  <RotateCw v-else :size="16" class="animate-spin" />
                  Simpan Catatan
                </ButtonPrimary>
              </div>
            </div>
          </AdminCard>

          <div class="space-y-4">
            <div
              v-if="interactions.length === 0"
              class="p-12 text-center bg-white rounded-[32px] border border-dashed border-slate-200"
            >
              <div
                class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <MessageSquare :size="24" class="text-slate-200" />
              </div>
              <p class="text-slate-400 text-sm font-medium italic">
                Belum ada riwayat interaksi yang dicatat.
              </p>
            </div>

            <div
              v-for="log in interactions"
              :key="log.id"
              class="group bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm hover:shadow-md transition-all flex gap-4"
            >
              <div
                class="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-lg"
                :class="getLogColor(log.type)"
              >
                <component :is="getLogIcon(log.type)" :size="20" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-[10px] font-black uppercase tracking-widest text-slate-300"
                  >
                    {{ formatDate(log.created_at) }} •
                    {{ formatTime(log.created_at) }}
                  </span>
                  <button
                    @click="deleteInteraction(log.id)"
                    class="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                  >
                    <Trash2 :size="14" />
                  </button>
                </div>
                <p
                  class="text-[13px] font-medium text-[#1B2559] leading-relaxed"
                >
                  {{ log.content }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Projects History -->
        <div v-if="activeTab === 'projects'" class="animate-fade-in-up">
          <AdminCard
            no-padding
            class="overflow-hidden bg-white rounded-[32px]! border border-slate-50 shadow-xl shadow-slate-200/10 mb-8"
          >
            <div class="overflow-x-auto">
              <table class="table-main">
                <thead>
                  <tr>
                    <th class="pl-8!">Nama Proyek</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Progres</th>
                    <th class="text-right pr-8!">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="projects.length === 0">
                    <td
                      colspan="5"
                      class="p-12 text-center text-slate-400 font-medium italic"
                    >
                      Tidak ada proyek ditemukan untuk klien ini.
                    </td>
                  </tr>
                  <tr
                    v-for="proj in projects"
                    :key="proj.id"
                    class="table-row-hover group"
                  >
                    <td class="pl-8!">
                      <p
                        class="text-sm font-black text-[#1B2559] group-hover:text-[#7029FF] transition-colors tracking-tight"
                      >
                        {{ proj.name }}
                      </p>
                      <p
                        class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5"
                      >
                        {{ formatDate(proj.created_at) }}
                      </p>
                    </td>
                    <td>
                      <span
                        class="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest"
                        :class="getProjectStatusClass(proj.status)"
                      >
                        {{ proj.status }}
                      </span>
                    </td>
                    <td>
                      <span
                        class="text-[11px] font-black text-[#1B2559] tracking-tighter"
                        >{{ formatPrice(proj.price || 0) }}</span
                      >
                    </td>
                    <td>
                      <div
                        class="w-24 bg-slate-100 h-2 rounded-full overflow-hidden"
                      >
                        <div
                          class="bg-[#7029FF] h-full transition-all"
                          :style="{ width: (proj.progress || 0) + '%' }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-right pr-8!">
                      <button
                        @click="router.push(`/projects/${proj.id}/edit`)"
                        class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <Eye :size="16" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AdminCard>
        </div>

        <!-- Tab 3: Detailed Brief -->
        <div v-if="activeTab === 'brief'" class="space-y-6 animate-fade-in-up">
          <AdminCard
            class="p-8 rounded-[40px]! bg-slate-50 border-none shadow-inner"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-10 h-10 rounded-2xl bg-[#702DFF] flex items-center justify-center text-white shadow-lg shadow-[#702DFF]/20"
              >
                <Target :size="20" />
              </div>
              <h3
                class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
              >
                Informasi Brief Project
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div class="space-y-1">
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Nama Proyek Impian
                </p>
                <p class="text-sm font-black text-[#1B2559]">
                  {{ client.project_name || "Tidak dititipkan" }}
                </p>
              </div>
              <div class="space-y-1">
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Budget Tersedia
                </p>
                <p class="text-sm font-black text-emerald-600 tracking-tight">
                  {{ formatPrice(client.budget || 0) }}
                </p>
              </div>
              <div class="space-y-1">
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Gaya Visual (Vibe)
                </p>
                <p class="text-sm font-black text-[#1B2559]">
                  {{ client.visual_style || "General / Modern Clean" }}
                </p>
              </div>
              <div class="space-y-1">
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Deadline Target
                </p>
                <p class="text-sm font-black text-[#1B2559]">
                  {{ client.deadline || "Standard (7-14 Hari)" }}
                </p>
              </div>
            </div>

            <div class="space-y-2 mb-8">
              <p
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
              >
                Kombinasi Fitur (LEGO)
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="feat in client.features?.split(',') || [
                    'Standard Core',
                  ]"
                  :key="feat"
                  class="px-3 py-1.5 bg-white text-slate-600 text-[9px] font-black rounded-xl uppercase tracking-widest border border-slate-100 shadow-sm"
                >
                  {{ feat.trim() }}
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <p
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
              >
                Narasi Brief / Masalah Klien
              </p>
              <div
                class="bg-white p-6 rounded-[32px] border border-slate-100 text-[13px] font-medium text-[#1B2559] leading-relaxed italic shadow-sm"
              >
                {{
                  client.brief ||
                  "Klien ini tidak meninggalkan catatan detail pada formulir awal."
                }}
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronLeft,
  Users,
  Zap,
  RotateCw,
  MessageCircle,
  DollarSign,
  Clock,
  Layers,
  FileText,
  Send,
  MoreHorizontal,
  Eye,
  Trash2,
  CheckCircle,
  MessageSquare,
  Target,
  Phone,
  Briefcase,
  Calendar,
} from "lucide-vue-next";
import { clientsService } from "../services/clientsService";
import { interactionsService } from "../services/interactionsService";
import { projectsService } from "../services/projectsService";
import { transactionsService } from "../services/transactionsService";
import type { Client, Interaction, Project } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import {
  ButtonPrimary,
  ButtonSecondary,
  BaseButton,
  Toast,
} from "@kangjessy/ui";

const route = useRoute();
const router = useRouter();
const clientId = route.params.id as string;

const client = ref<Client | null>(null);
const interactions = ref<Interaction[]>([]);
const projects = ref<Project[]>([]);
const loading = ref(true);
const saving = ref(false);
const activeTab = ref("timeline");
const totalRevenue = ref(0);

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const newInteraction = ref({
  type: "note" as "whatsapp" | "call" | "meeting" | "note",
  content: "",
});

const interactionTypes: {
  id: "whatsapp" | "call" | "meeting" | "note";
  label: string;
  icon: any;
}[] = [
  { id: "note", label: "Catatan", icon: FileText },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "call", label: "Telepon", icon: Phone },
  { id: "meeting", label: "Meeting", icon: Users },
];

onMounted(fetchData);

async function fetchData() {
  loading.value = true;
  try {
    const [clientData, logsData, projectsData, transactionsData] =
      await Promise.all([
        clientsService.getById(clientId),
        interactionsService.getByClientId(clientId),
        projectsService.getByClientId(clientId),
        transactionsService.getAll(), // We filter manually for simplicity, or we can add method
      ]);

    client.value = clientData;
    interactions.value = logsData;
    projects.value = projectsData;

    // Calculate LTV
    const clientTransactions = transactionsData.filter(
      (tx: any) => tx.client_id === clientId && tx.type === "income",
    );
    totalRevenue.value = clientTransactions.reduce(
      (acc: number, tx: any) => acc + tx.amount,
      0,
    );
  } catch (err) {
    showToast("Gagal memuat data klien", "error");
  } finally {
    loading.value = false;
  }
}

const lastInteraction = computed(() => {
  if (interactions.value.length === 0) return "Baru Saja";
  const last = interactions.value[0].created_at;
  return formatDate(last);
});

async function saveInteraction() {
  if (!newInteraction.value.content) return;
  saving.value = true;
  try {
    const log = await interactionsService.create({
      client_id: clientId,
      type: newInteraction.value.type,
      content: newInteraction.value.content,
    });
    interactions.value.unshift(log);
    newInteraction.value.content = "";
    showToast("Catatan berhasil disimpan", "success");
  } catch (err) {
    showToast("Gagal menyimpan catatan", "error");
  } finally {
    saving.value = false;
  }
}

async function deleteInteraction(id: string) {
  if (!confirm("Hapus catatan ini?")) return;
  try {
    await interactionsService.delete(id);
    interactions.value = interactions.value.filter((i) => i.id !== id);
    showToast("Catatan dihapus", "success");
  } catch (err) {
    showToast("Gagal menghapus catatan", "error");
  }
}

function openWhatsApp(scenario: "greeting" | "follow_up" | "invoice") {
  if (!client.value?.phone) {
    showToast("Nomor WhatsApp tidak terdaftar", "error");
    return;
  }

  const phone = client.value.phone.replace(/[^0-9]/g, "");
  let message = "";

  const prefix = `Halo Kak ${client.value.name}, Jessy di sini dari agensi digital KangJessy...`;

  if (scenario === "greeting") {
    message = `${prefix} Saya hanya ingin menyapa dan memastikan apakah ada yang bisa saya bantu terkait rencana digitalisasi bisnisnya hari ini? 😊`;
  } else if (scenario === "follow_up") {
    message = `${prefix} Melanjutkan pembicaraan kita kemarin terkait proyek *${client.value.project_name || "digital"}*, apakah sudah ada keputusan atau mau ada yang didiskusikan lagi Kak?`;
  } else if (scenario === "invoice") {
    message = `${prefix} Berikut rincian progres proyek kita. Oh ya, sekedar pengingat untuk termin pembayaran selanjutnya sebesar *${formatPrice(client.value.budget || 0)}* ya Kak agar pengerjaan tetap sesuai jadwal. Terima kasih!`;
  }

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
}

// Helpers
function getStatusClass(status: string | undefined) {
  switch (status?.toLowerCase()) {
    case "new":
      return "bg-blue-50 text-blue-500";
    case "open":
      return "bg-amber-50 text-amber-500";
    case "deal":
      return "bg-emerald-50 text-emerald-500";
    default:
      return "bg-slate-50 text-slate-500";
  }
}

function getProjectStatusClass(status: string | undefined) {
  switch (status?.toLowerCase()) {
    case "done":
      return "bg-emerald-50 text-emerald-600";
    case "in_progress":
      return "bg-blue-50 text-blue-600";
    case "planning":
      return "bg-slate-50 text-slate-600";
    default:
      return "bg-rose-50 text-rose-600";
  }
}

function getLogColor(type: string) {
  switch (type) {
    case "whatsapp":
      return "bg-[#25D366]";
    case "call":
      return "bg-blue-500";
    case "meeting":
      return "bg-purple-500";
    default:
      return "bg-slate-500";
  }
}

function getLogIcon(type: string) {
  switch (type) {
    case "whatsapp":
      return MessageCircle;
    case "call":
      return Phone;
    case "meeting":
      return Users;
    default:
      return FileText;
  }
}

function showToast(message: string, variant: "success" | "error") {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}

function formatPrice(price: any) {
  if (!price) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateString: any) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: any) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}

@keyframes fadeInUp {
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
