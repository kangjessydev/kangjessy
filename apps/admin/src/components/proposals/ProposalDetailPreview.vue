<template>
  <div
    class="bg-white rounded-[40px] shadow-2xl shadow-indigo-500/10 border border-slate-100 overflow-hidden flex flex-col h-[calc(100vh-220px)] lg:h-[calc(100vh-220px)] transition-all"
    :class="{ 'h-screen rounded-none': isMobile }"
  >
    <div
      class="w-full h-full overflow-y-auto custom-scrollbar text-left font-sans"
    >
      <!-- Cover Section -->
      <div
        class="bg-[#1B2559] p-6 md:p-12 text-white min-h-[300px] md:min-h-[400px] flex flex-col justify-center relative overflow-hidden"
      >
        <div class="mb-6 md:mb-8 flex items-center justify-between">
          <div
            class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg"
          >
            <img
              :src="branding.logo"
              alt="Logo"
              class="w-full h-full object-contain"
            />
          </div>
          <h1 class="text-lg md:text-xl font-black tracking-tighter uppercase">
            {{ branding.name.split(" ")[0] }}
            <span
              v-if="branding.name.split(' ').length > 1"
              class="text-indigo-400"
            >
              {{ branding.name.split(" ").slice(1).join(" ") }}
            </span>
          </h1>
        </div>
        <p
          class="text-[9px] md:text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3 md:mb-4"
        >
          Proposal Penawaran Proyek
        </p>
        <h2
          class="text-2xl md:text-4xl font-black tracking-tighter leading-none mb-8 md:mb-12"
        >
          {{ formData.project_name || "Transformasi Digital Strategis" }}
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-white/10 pt-6 md:pt-8"
        >
          <div>
            <p class="text-[8px] font-black text-slate-400 uppercase mb-2">
              Dipersiapkan Untuk
            </p>
            <p class="text-xs font-black">
              {{ formData.client_name || "Nama Klien" }}
            </p>
            <p class="text-[9px] font-bold text-indigo-300 opacity-60">
              {{ formData.company || "Organisasi" }}
            </p>
          </div>
          <div class="md:text-right">
            <p class="text-[8px] font-black text-slate-400 uppercase mb-2">
              Tanggal Terbit
            </p>
            <p class="text-xs font-black">
              {{ new Date().toLocaleDateString("id-ID") }}
            </p>
          </div>
        </div>
        <div
          class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-50 md:opacity-100"
        ></div>
      </div>

      <!-- Preview Narrative Section -->
      <div class="p-6 md:p-10 space-y-8 md:space-y-12">
        <div class="space-y-3 md:space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"
            >
              <Info :size="16" />
            </div>
            <h4
              class="text-[10px] font-black text-[#1C2559] uppercase tracking-widest"
            >
              01. Gambaran Umum
            </h4>
          </div>
          <p class="text-xs font-bold text-slate-500 leading-relaxed">
            {{
              narrative.bg ||
              "Narrative background will dynamically sync here..."
            }}
          </p>
        </div>

        <div
          v-if="narrative.prob"
          class="p-5 md:p-6 bg-rose-50 border border-rose-100 rounded-3xl flex flex-col md:flex-row gap-3 md:gap-4"
        >
          <AlertTriangle :size="20" class="text-rose-500 shrink-0" />
          <div>
            <p
              class="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1"
            >
              Identifikasi Tantangan
            </p>
            <p class="text-xs font-bold text-slate-600 leading-relaxed">
              {{ narrative.prob }}
            </p>
          </div>
        </div>

        <div class="space-y-3 md:space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"
            >
              <Target :size="16" />
            </div>
            <h4
              class="text-[10px] font-black text-[#1C2559] uppercase tracking-widest"
            >
              02. Pendekatan Strategis
            </h4>
          </div>
          <p class="text-xs font-bold text-slate-500 leading-relaxed">
            {{ narrative.sol || "Metodologi solusi akan muncul di sini..." }}
          </p>

          <!-- Modules List in Preview -->
          <div v-if="selectedFeatures.length" class="mt-8 space-y-4">
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Modul Kecerdasan Terpilih
            </p>
            <div class="space-y-3">
              <div
                v-for="f in selectedFeatures"
                :key="f.id"
                class="flex flex-col p-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div class="flex items-center gap-2 mb-2">
                  <Check :size="14" class="text-emerald-500" />
                  <span class="text-sm font-black text-[#1B2559]">{{
                    f.name
                  }}</span>
                </div>
                <p
                  class="text-[10px] text-slate-400 font-bold pl-5 mb-3 leading-relaxed"
                >
                  {{
                    f.desc ||
                    "Optimasi performa tinggi dan integrasi sistem cerdas."
                  }}
                </p>
                <div class="pl-5">
                  <span
                    class="text-xs font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-lg"
                    >{{ formatPrice(f.price) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- NEW: Deliverables & Terms Preview -->
      <div
        class="p-6 md:p-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-start print:block print:space-y-4"
      >
        <!-- Deliverables List -->
        <div v-if="formData.deliverables.length" class="space-y-4">
          <div class="flex items-center gap-2 mb-2">
            <div
              class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500"
            >
              <CheckCircle :size="12" />
            </div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Scope & Deliverables
            </p>
          </div>
          <div
            class="p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
          >
            <ul class="space-y-3 mb-0">
              <li
                v-for="(item, i) in formData.deliverables.filter(
                  (val) => val && val.trim(),
                )"
                :key="i"
                class="flex items-start gap-3"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"
                ></div>
                <span
                  class="text-xs font-bold text-slate-600 leading-relaxed"
                  >{{ item }}</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Terms Preview -->
        <div
          v-if="
            formData.terms ||
            formData.terms_payment ||
            formData.terms_copyright ||
            formData.terms_revision
          "
          class="space-y-4"
        >
          <div class="flex items-center gap-2 mb-2">
            <div
              class="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"
            >
              <FileText :size="12" />
            </div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Perjanjian & Ketentuan
            </p>
          </div>
          <div
            class="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 space-y-4"
          >
            <!-- Payment & Warranty -->
            <div v-if="formData.terms_payment" class="space-y-1">
              <p class="text-sm font-black text-[#1B2559] uppercase">
                PEMBAYARAN & GARANSI :
              </p>
              <p
                class="text-[11px] font-medium text-slate-500 whitespace-pre-line leading-relaxed"
              >
                {{ formData.terms_payment }}
              </p>
            </div>

            <!-- Copyright & License -->
            <div
              v-if="formData.terms_copyright"
              class="space-y-1 pt-3 border-t border-indigo-100/30"
            >
              <p class="text-sm font-black text-[#1B2559] uppercase">
                HAK CIPTA & LISENSI :
              </p>
              <p
                class="text-[11px] font-medium text-slate-500 whitespace-pre-line leading-relaxed"
              >
                {{ formData.terms_copyright }}
              </p>
            </div>

            <!-- Revision Limits -->
            <div
              v-if="formData.terms_revision"
              class="space-y-1 pt-3 border-t border-indigo-100/30"
            >
              <p class="text-sm font-black text-[#1B2559] uppercase">
                BATASAN REVISI :
              </p>
              <p
                class="text-[11px] font-medium text-slate-500 whitespace-pre-line leading-relaxed"
              >
                {{ formData.terms_revision }}
              </p>
            </div>

            <!-- Fallback -->
            <p
              v-if="
                !formData.terms_payment &&
                !formData.terms_copyright &&
                !formData.terms_revision &&
                formData.terms
              "
              class="text-[11px] font-medium text-slate-500 whitespace-pre-line leading-relaxed"
            >
              {{ formData.terms }}
            </p>
          </div>
        </div>
      </div>

      <div class="p-6 md:p-10 pt-8 border-t border-slate-100 space-y-8">
        <!-- Revision Policy Preview -->
        <div class="space-y-3">
          <p
            class="text-[10px] font-black text-amber-500 uppercase tracking-widest"
          >
            Kebijakan Pertumbuhan & Revisi
          </p>
          <div class="pl-4 border-l-2 border-amber-100 py-1">
            <p class="text-xs text-slate-500 font-bold leading-relaxed">
              • GRATIS: 3x Revisi Minor (Typo, Ikon, Warna)<br />
              • BERBAYAR: Perubahan total atau logika fitur baru
            </p>
          </div>
        </div>

        <div class="space-y-5">
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]"
          >
            Rincian Budget
          </p>
          <div class="flex flex-col gap-3">
            <!-- Base detail -->
            <div
              class="flex justify-between items-center text-sm font-black text-slate-600 uppercase"
            >
              <span>Sistem Inti Utama</span>
              <span>{{ formatPrice(foundationPrice) }}</span>
            </div>
            <!-- Modules detail -->
            <div v-if="selectedFeatures.length" class="space-y-2">
              <div
                class="flex justify-between items-center text-sm font-black text-slate-600 uppercase"
              >
                <span>Modul Tambahan</span>
                <span>{{
                  formatPrice(selectedFeatures.reduce((s, f) => s + f.price, 0))
                }}</span>
              </div>
              <div class="pl-6 border-l-2 border-slate-100 ml-1 space-y-1 py-1">
                <div
                  v-for="f in selectedFeatures"
                  :key="f.id"
                  class="flex justify-between text-xs font-bold text-slate-400 uppercase"
                >
                  <span>• {{ f.name }}</span>
                  <span>{{ formatPrice(f.price) }}</span>
                </div>
              </div>
            </div>

            <div
              class="pt-6 mt-4 border-t border-slate-200 flex justify-between items-center"
            >
              <div>
                <p
                  class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1"
                >
                  Total Investasi
                </p>
                <p class="text-[9px] font-bold text-slate-400 italic">
                  Berlaku selama 14 Hari
                </p>
              </div>

              <p class="text-xl md:text-2xl font-black text-[#1B2559]">
                {{ formatPrice(finalTotal) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Payment Instructions -->
        <div
          class="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100/50"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4"
            >
              <DollarSign :size="20" />
            </div>
            <p
              class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6"
            >
              Instruksi Pembayaran Transfer Bank
            </p>

            <div class="flex flex-col gap-3 w-full max-w-lg">
              <div
                v-for="(acc, index) in displayPaymentAccounts"
                :key="index"
                class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 transition-all hover:shadow-md"
              >
                <div
                  class="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2 shrink-0"
                >
                  <img
                    v-if="getBankLogo(acc.bank_name, acc.bank_logo)"
                    :src="getBankLogo(acc.bank_name, acc.bank_logo)"
                    class="w-full h-full object-contain"
                  />
                  <div v-else class="text-[10px] font-black text-slate-300">
                    BANK
                  </div>
                </div>
                <div class="text-left flex-1 min-w-0">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    {{ acc.bank_name }}
                  </p>
                  <p class="text-xl font-black text-[#1B2559] tracking-tight">
                    {{ acc.account_number }}
                  </p>
                  <p class="text-[9px] font-bold text-slate-400 uppercase">
                    a.n {{ acc.account_holder || branding.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-10">
          <p
            class="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6"
          >
            Tanda Tangan Elektronik Tervalidasi
          </p>
          <div class="flex flex-col items-center">
            <p class="text-xl font-black text-indigo-500 italic mb-1">
              {{ branding.name }}
            </p>
            <p
              class="text-[9px] font-bold text-indigo-300 uppercase tracking-widest"
            >
              Digital Authenticated System
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import {
  Info,
  AlertTriangle,
  Target,
  Check,
  FileText,
  CheckCircle,
  DollarSign,
} from "lucide-vue-next";
import { useBranding } from "../../composables/useBranding";
import { usePaymentSettings } from "../../composables/usePaymentSettings";

const props = defineProps<{
  formData: any;
  narrative: any;
  selectedFeatures: any[];
  foundationPrice: number;
  finalTotal: number;
  isMobile?: boolean;
}>();

const { branding } = useBranding();
const { activeBanks: globalActiveBanks, getBankLogo } = usePaymentSettings();

const displayPaymentAccounts = computed(() => {
  if (
    props.formData.payment_accounts &&
    props.formData.payment_accounts.length > 0
  ) {
    return props.formData.payment_accounts;
  }
  return globalActiveBanks.value;
});

onMounted(() => {
  // Composables handle their own loading from localStorage
});

const formatPrice = (v: number) => "Rp " + (v || 0).toLocaleString("id-ID");
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
