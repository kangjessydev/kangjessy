<template>
  <div
    class="min-h-screen bg-[#F1F5F9] py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white text-left"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Top Actions -->
      <div class="flex justify-between items-center mb-8 print:hidden">
        <BaseButton variant="secondary" @click="$router.back()">
          <ArrowLeft :size="18" /> Kembali
        </BaseButton>
        <div class="flex gap-3">
          <BaseButton variant="secondary" @click="handlePrint">
            <Printer :size="18" /> Cetak / PDF
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="$router.push(`/orders/${id}/edit`)"
          >
            <Edit2 :size="18" /> Ubah Data
          </BaseButton>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-48 bg-white rounded-[40px] shadow-xl border border-slate-100"
      >
        <div class="relative">
          <div class="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
          <div
            class="absolute top-0 left-0 w-16 h-16 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <p
          class="mt-6 text-slate-400 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse"
        >
          Menyusun Dokumen...
        </p>
      </div>

      <!-- Main Document Wrapper -->
      <div v-else-if="order" class="space-y-8 print:space-y-0">
        <!-- SECTION 1: COVER PAGE (Always shows) -->
        <div
          class="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col print:shadow-none print:border-none print:rounded-none"
          :class="isProposal ? 'min-h-[600px]' : 'min-h-0'"
        >
          <div
            class="bg-[#1B2559] text-white relative flex-1 flex flex-col justify-center items-center text-center overflow-hidden"
            :class="isProposal ? 'p-16' : 'p-10'"
          >
            <!-- Decor (Proposal Only) -->
            <div
              v-if="isProposal"
              class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full -mr-64 -mt-64 blur-3xl"
            ></div>
            <div
              v-if="isProposal"
              class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full -ml-48 -mb-48 blur-2xl"
            ></div>

            <div class="relative z-10 space-y-8 w-full max-w-2xl">
              <div class="flex flex-col items-center gap-4">
                <div
                  class="bg-white rounded-[32px] shadow-2xl shadow-indigo-500/40"
                  :class="isProposal ? 'p-4' : 'p-3'"
                >
                  <img
                    src="/logo-agency.png"
                    alt="Kang Jessy Logo"
                    class="object-contain"
                    :class="isProposal ? 'w-12 h-12' : 'w-8 h-8'"
                  />
                </div>
                <!-- Logic for Title -->
                <div v-if="!isProposal" class="text-center space-y-1">
                  <h1 class="text-2xl font-black tracking-tighter uppercase">
                    Kang <span class="text-indigo-400">Jessy</span>
                  </h1>
                  <p
                    class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
                  >
                    Digital Solutions Hub
                  </p>
                </div>
                <h1
                  v-else
                  class="text-3xl font-black tracking-tighter uppercase"
                >
                  Kang <span class="text-indigo-400">Jessy</span>
                </h1>
              </div>

              <div class="space-y-4">
                <p
                  v-if="isProposal"
                  class="text-[12px] font-black text-indigo-300 uppercase tracking-[0.6em]"
                >
                  Proposal Proyek
                </p>
                <div
                  v-else
                  class="inline-block px-4 py-1 rounded-full bg-white/10 text-[10px] font-black text-indigo-300 uppercase tracking-[0.4em] mb-4 border border-white/20"
                >
                  Invoice Resmi
                </div>

                <h2
                  class="font-black text-white tracking-tighter leading-none"
                  :class="
                    isProposal
                      ? 'text-5xl lg:text-7xl'
                      : 'text-3xl lg:text-4xl text-indigo-100'
                  "
                >
                  {{
                    order.project_name ||
                    (order.project_type === "Custom Request"
                      ? "Strategic Digital Solution"
                      : order.project_type)
                  }}
                </h2>
              </div>

              <div
                class="w-full grid grid-cols-2 gap-8 text-left"
                :class="
                  isProposal
                    ? 'pt-12 border-t border-white/10'
                    : 'pt-6 border-t border-white/10 mt-6'
                "
              >
                <div>
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                  >
                    Dipersiapkan Untuk
                  </p>
                  <p
                    class="font-black text-white tracking-tight"
                    :class="isProposal ? 'text-xl' : 'text-lg'"
                  >
                    {{ order.name }}
                  </p>
                  <p class="text-sm font-bold text-indigo-300">
                    {{ order.company || "Entitas Pribadi" }}
                  </p>
                </div>
                <div class="text-right">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                  >
                    Tanggal Terbit
                  </p>
                  <p
                    class="font-black text-white tracking-tight"
                    :class="isProposal ? 'text-xl' : 'text-lg'"
                  >
                    {{ formatDate(order.created_at) }}
                  </p>
                  <p class="text-sm font-bold text-indigo-300">
                    REF: #{{ order.id.slice(0, 8).toUpperCase() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-indigo-50/50 flex justify-between items-center"
            :class="isProposal ? 'p-8 px-16' : 'p-4 px-8'"
          >
            <p
              class="text-[10px] font-black text-indigo-400 uppercase tracking-widest"
            >
              {{
                isProposal
                  ? "ARSITEKTUR SOLUSI KANG JESSY"
                  : "DOKUMEN TAGIHAN RESMI"
              }}
            </p>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              {{
                isProposal
                  ? "DOKUMEN RAHASIA"
                  : "INVOICE #INV-" + order.id.slice(0, 8).toUpperCase()
              }}
            </p>
          </div>
        </div>

        <!-- SECTION 2: EXECUTIVE SUMMARY & PROBLEM (Proposal Exclusive) -->
        <div
          v-if="isProposal"
          class="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-16 space-y-16 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div class="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div class="md:col-span-4 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"
                >
                  <Info :size="20" />
                </div>
                <h3
                  class="text-xs font-black text-[#1B2559] uppercase tracking-[0.3em]"
                >
                  01. Gambaran Umum
                </h3>
              </div>
              <p class="text-slate-400 text-xs font-bold leading-relaxed">
                Dokumen ini merangkum visi teknis dan operasional untuk
                mentransformasi kebutuhan bisnis Anda ke dalam infrastruktur
                digital performa tinggi.
              </p>
            </div>
            <div class="md:col-span-8 space-y-8">
              <div class="space-y-4">
                <h4 class="text-3xl font-black text-[#1B2559] tracking-tighter">
                  Ringkasan Eksekutif
                </h4>
                <p class="text-base text-slate-500 leading-relaxed font-medium">
                  {{
                    parsedBrief.background ||
                    "Kami melihat potensi besar dalam mensinergikan proses bisnis Anda dengan teknologi KJ-PRO. Melalui riset awal, kami mengidentifikasi beberapa kunci pertumbuhan yang bisa diakselerasi via sistem otomasi dan desain berbasis konversi."
                  }}
                </p>
              </div>

              <div
                v-if="parsedBrief.problem"
                class="p-8 bg-rose-50/50 rounded-3xl border border-rose-100 flex gap-6"
              >
                <div
                  class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"
                >
                  <AlertTriangle :size="24" />
                </div>
                <div class="space-y-2">
                  <p
                    class="text-[10px] font-black text-rose-500 uppercase tracking-widest"
                  >
                    Identifikasi Tantangan
                  </p>
                  <p class="text-sm font-bold text-slate-700 leading-relaxed">
                    "{{ parsedBrief.problem }}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: THE PROPOSED SOLUTION (Proposal Exclusive) -->
        <div
          v-if="isProposal"
          class="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-16 space-y-16 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div class="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div class="md:col-span-4 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"
                >
                  <Target :size="20" />
                </div>
                <h3
                  class="text-xs font-black text-[#1B2559] uppercase tracking-[0.3em]"
                >
                  02. Pendekatan Strategis
                </h3>
              </div>
              <p class="text-slate-400 text-xs font-bold leading-relaxed">
                Solusi KJ-PRO dirancang untuk skalabilitas jangka panjang, bukan
                sekadar peluncuran sekali jalan.
              </p>
            </div>
            <div class="md:col-span-8 space-y-12">
              <div class="space-y-4">
                <h4 class="text-3xl font-black text-[#1B2559] tracking-tighter">
                  Solusi Inti Terpersonalisasi
                </h4>
                <p class="text-base text-slate-500 leading-relaxed font-medium">
                  {{
                    parsedBrief.solution ||
                    "Strategi kami adalah membangun pondasi yang kokoh menggunakan 'Enterprise-Grade Framework'. Kami fokus pada kecepatan akses (Core Web Vitals), keamanan data, dan antarmuka yang intuitif bagi admin maupun end-user."
                  }}
                </p>
              </div>

              <!-- Packages Cards In-Narrative -->
              <div
                class="p-8 bg-indigo-50 border border-indigo-100 rounded-[32px] space-y-8"
              >
                <div class="flex items-start gap-6">
                  <div
                    class="w-16 h-16 rounded-2xl bg-white text-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/10"
                  >
                    <component :is="foundationIcon" :size="32" />
                  </div>
                  <div>
                    <p
                      class="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1"
                    >
                      Architecture Core
                    </p>
                    <h5 class="text-xl font-black text-[#1B2559]">
                      {{ order.project_type }}
                    </h5>
                    <p class="text-xs text-slate-400 font-bold mt-1 max-w-sm">
                      {{ selectedProjectType?.desc }}
                    </p>
                  </div>
                </div>

                <div v-if="selectedFeatures.length" class="space-y-4">
                  <p
                    class="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-4"
                  >
                    Modul Kecerdasan
                    <span class="flex-1 h-px bg-indigo-100"></span>
                  </p>
                  <div class="grid grid-cols-1 gap-3">
                    <div
                      v-for="f in selectedFeatures"
                      :key="f.id"
                      class="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-indigo-50/50 group hover:bg-white hover:border-indigo-100 transition-all"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0"
                        >
                          <CheckCircle :size="16" />
                        </div>
                        <div>
                          <p class="text-[11px] font-black text-[#1B2559]">
                            {{ f.name }}
                          </p>
                          <p class="text-[9px] text-slate-400 font-bold">
                            {{ f.desc }}
                          </p>
                        </div>
                      </div>
                      <p
                        class="text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-xl shrink-0"
                      >
                        {{ formatPrice(f.price) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: INVESTMENT & TERMS (Invoice Look-alike but as Section) -->
        <div
          class="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-16 space-y-16 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start gap-12"
          >
            <div class="max-w-md space-y-6">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-slate-100 text-[#1B2559] flex items-center justify-center"
                >
                  <DollarSign :size="20" />
                </div>
                <h3
                  class="text-xs font-black text-[#1B2559] uppercase tracking-[0.3em]"
                >
                  {{
                    isProposal
                      ? "03. Ringkasan Finansial"
                      : "01. Rincian Tagihan"
                  }}
                </h3>
              </div>
              <p
                class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
              >
                {{
                  isProposal
                    ? "Penetapan Harga & Alokasi Pembayaran"
                    : "Item Layanan & Total Pembayaran"
                }}
              </p>
              <div class="space-y-6 border-l-2 border-indigo-50 pl-6">
                <!-- Revision Policy -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Kebijakan Pertumbuhan & Revisi
                    </p>
                  </div>
                  <div class="space-y-2 pl-3">
                    <div
                      class="flex items-start gap-2 text-[10px] text-slate-500 font-bold"
                    >
                      <Check :size="10" class="mt-0.5 text-emerald-500" />
                      <span
                        >FREE: 3x Minor Revisions (Typo, Icons, Color
                        adjustments, small wording).</span
                      >
                    </div>
                    <div
                      class="flex items-start gap-2 text-[10px] text-slate-500 font-bold"
                    >
                      <Check :size="10" class="mt-0.5 text-rose-500" />
                      <span
                        >PAID: Major overhauls, design restructuring, or new
                        logic modules after approval.</span
                      >
                    </div>
                  </div>
                </div>

                <div v-for="(term, idx) in terms" :key="idx" class="space-y-2">
                  <p
                    class="text-[9px] font-black text-indigo-500 uppercase tracking-widest"
                  >
                    {{ term.title }}
                  </p>
                  <p class="text-xs text-slate-500 font-bold leading-relaxed">
                    {{ term.content }}
                  </p>
                </div>

                <!-- Payment Info -->
                <div
                  class="mt-8 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100"
                >
                  <p
                    class="text-[9px] font-black text-[#1B2559] uppercase tracking-[0.2em] mb-3"
                  >
                    Official Payment Gateway
                  </p>
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-8 bg-white border border-slate-200 rounded flex items-center justify-center font-black text-[#0066AE] text-[10px]"
                    >
                      BCA
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-[#1B2559]">
                        KJ-PRO DIGITAL TECH
                      </p>
                      <p
                        class="text-xs font-black text-indigo-600 tracking-wider"
                      >
                        8020-441-291
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex-1 w-full max-w-sm space-y-6">
              <div class="p-8 bg-slate-50 rounded-[32px] space-y-4">
                <div
                  class="flex justify-between font-black text-slate-500 uppercase"
                  :class="isProposal ? 'text-[10px]' : 'text-xs'"
                >
                  <span>Sistem Inti Utama</span>
                  <span>{{ formatPrice(foundationPrice) }}</span>
                </div>
                <div class="space-y-2">
                  <div
                    class="flex justify-between font-black text-slate-500 uppercase"
                    :class="isProposal ? 'text-[10px]' : 'text-xs'"
                  >
                    <span>Modul Tambahan</span>
                    <span>{{ formatPrice(featuresTotal) }}</span>
                  </div>
                  <!-- Details for modules -->
                  <div
                    v-if="selectedFeatures.length"
                    class="pl-4 space-y-1 border-l border-slate-200"
                  >
                    <div
                      v-for="f in selectedFeatures"
                      :key="f.id"
                      class="flex justify-between font-bold text-slate-400 uppercase"
                      :class="isProposal ? 'text-[8px] italic' : 'text-[10px]'"
                    >
                      <span>• {{ f.name }}</span>
                      <span>{{ formatPrice(f.price) }}</span>
                    </div>
                  </div>
                </div>
                <div
                  v-if="voucherDiscount > 0"
                  class="flex justify-between text-[10px] font-black text-rose-500 uppercase"
                >
                  <span class="flex items-center gap-2">
                    <Tag :size="12" /> Kupon: {{ order.voucher }}
                  </span>
                  <span>- {{ formatPrice(voucherDiscount) }}</span>
                </div>

                <div class="pt-6 border-t border-slate-200">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2"
                  >
                    {{ isProposal ? "Estimasi Investasi" : "Total Tagihan" }}
                  </p>
                  <p
                    class="font-black text-[#1B2559] tracking-tighter"
                    :class="isProposal ? 'text-5xl' : 'text-3xl'"
                  >
                    {{ formatPrice(finalDisplayTotal) }}
                  </p>
                </div>
              </div>

              <!-- Ledger (Invoice Only) -->
              <div
                v-if="!isProposal"
                class="p-6 bg-[#1B2559] rounded-[32px] text-white space-y-4"
              >
                <div class="flex justify-between items-end">
                  <div>
                    <p class="text-[8px] font-black opacity-40 uppercase mb-1">
                      {{ order.id ? "Dibayar saat ini" : "" }}
                    </p>
                    <p class="text-xl font-black">
                      {{ formatPrice(order.paid_amount) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-[8px] font-black opacity-40 uppercase mb-1">
                      {{ order.id ? "Sisa Tagihan" : "" }}
                    </p>
                    <p
                      class="text-xl font-black"
                      :class="
                        balanceRemaining > 0
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      "
                    >
                      {{ formatPrice(balanceRemaining) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 5: SIGNATURE & AUTHENTICATION -->
        <div
          class="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-16 flex flex-col md:flex-row justify-between items-center gap-12 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-[24px] border border-indigo-100 flex items-center justify-center text-[#702DFF] shadow-inner"
              >
                <Zap :size="32" />
              </div>
              <div>
                <p
                  class="text-xl font-black text-[#1B2559] tracking-tighter uppercase"
                >
                  Kang <span class="text-[#7029FF]">Jessy</span>
                </p>
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Pusat Autentikasi
                </p>
              </div>
            </div>
            <p
              class="text-[10px] font-bold text-slate-400 max-w-xs leading-relaxed"
            >
              Dokumen ini diautentikasi secara digital dan sah sebagai
              kesepakatan dasar pengerjaan proyek setelah pembayaran Komitmen
              (DP) dilakukan.
            </p>
          </div>

          <div class="text-center md:text-right space-y-4">
            <p
              class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
            >
              Tanda Tangan Tervalidasi
            </p>
            <div class="relative inline-block">
              <div class="absolute -top-6 -left-6 opacity-10">
                <Zap :size="100" />
              </div>
              <div
                class="p-8 bg-slate-50 border-2 border-dashed border-indigo-100 rounded-[40px] shadow-inner"
              >
                <p class="text-[14px] font-black text-indigo-500 italic px-10">
                  SISTEM KANG JESSY
                </p>
              </div>
            </div>
            <div>
              <p class="text-sm font-black text-[#1B2559]">
                Identitas Sistem: AUT-{{
                  String(route.params.id).slice(0, 8).toUpperCase()
                }}
              </p>
              <p
                class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1"
              >
                {{ formatDate(new Date().toISOString()) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Banner (Print Only) -->
        <div class="hidden print:block text-center pt-8">
          <p
            class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
          >
            www.kangjessy.com • Kang Jessy Digital Solutions Hub
          </p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else
        class="text-center py-48 bg-white rounded-[40px] shadow-xl border border-slate-100"
      >
        <div
          class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Trash2 :size="40" />
        </div>
        <h3 class="text-2xl font-black text-[#1B2559] tracking-tight">
          Kegagalan Sinkronisasi Rekaman
        </h3>
        <p class="text-slate-400 text-sm mt-3 px-12">
          Gagal menyinkronkan data dengan pangkalan data intelijen untuk ID:
          {{ route.params.id }}
        </p>
        <BaseButton
          variant="secondary"
          class="mt-10 px-10"
          @click="$router.back()"
          >Kembali</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeft,
  Printer,
  Edit2,
  Zap,
  Check,
  Layout,
  Target,
  Info,
  Trash2,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Tag,
} from "lucide-vue-next";
import { clientsService } from "../services/clientsService";
import { couponsService, type Coupon } from "../services/couponsService";
import { projectTypes } from "../data/order/projects";
import { availableFeatures } from "../data/order/features";
import type { Client } from "../types";
import { BaseButton } from "@kangjessy/ui";

const route = useRoute();
const id = computed(() => route.params.id as string);
const order = ref<Client | null>(null);
const loading = ref(true);
const activeVouchers = ref<Coupon[]>([]);

const isProposal = computed(() => {
  return order.value?.status !== "Deal";
});

// Logic to split the BRIEF into different narrative parts
// We expect specific markers like [BG], [PROB], [SOL] in the brief field
const parsedBrief = computed(() => {
  const b = order.value?.brief || "";
  const parts = {
    background: "",
    problem: "",
    solution: "",
  };

  if (b.includes("[BG]") || b.includes("[PROB]") || b.includes("[SOL]")) {
    const bgMatch = b.match(/\[BG\]([\s\S]*?)(?=\[PROB\]|\[SOL\]|$)/);
    const probMatch = b.match(/\[PROB\]([\s\S]*?)(?=\[BG\]|\[SOL\]|$)/);
    const solMatch = b.match(/\[SOL\]([\s\S]*?)(?=\[BG\]|\[PROB\]|$)/);

    parts.background = bgMatch?.[1]?.trim() || "";
    parts.problem = probMatch?.[1]?.trim() || "";
    parts.solution = solMatch?.[1]?.trim() || "";
  } else {
    // Legacy support: everything into background
    parts.background = b;
  }

  return parts;
});

// Use a watch to handle route changes and initial mount
watch(
  () => route.params.id,
  async (newId: any) => {
    if (!newId) return;

    loading.value = true;

    // Safety timeout to prevent infinite loading screen
    const safetyTimer = setTimeout(() => {
      if (loading.value) {
        console.warn("Loading safety timeout reached");
        loading.value = false;
      }
    }, 5000);

    try {
      const [data, vouchers] = await Promise.all([
        clientsService.getById(String(newId)),
        couponsService.getAll(),
      ]);

      if (data) {
        order.value = data;
        activeVouchers.value = vouchers;
      } else {
        console.error("No record found for ID:", newId);
      }
    } catch (err) {
      console.error("Sync record failed", err);
    } finally {
      clearTimeout(safetyTimer);
      loading.value = false;
    }
  },
  { immediate: true },
);

const selectedProjectType = computed(() =>
  projectTypes.find((t) => t.name === order.value?.project_type),
);
const foundationIcon = computed(
  () => selectedProjectType.value?.icon || Layout,
);
const foundationPrice = computed(
  () => selectedProjectType.value?.basePrice || 0,
);

const selectedFeatures = computed(() => {
  if (!order.value?.features) return [];
  const ids = order.value.features.split(",");
  return availableFeatures.filter((f) => ids.includes(f.id));
});

const featuresTotal = computed(() =>
  selectedFeatures.value.reduce((sum, f) => sum + f.price, 0),
);

const currentVoucher = computed(() =>
  activeVouchers.value.find((v) => v.code === order.value?.voucher),
);

const voucherDiscount = computed(() => {
  if (!order.value?.voucher || !currentVoucher.value) return 0;
  const subtotal = foundationPrice.value + featuresTotal.value;
  return currentVoucher.value.type === "percent"
    ? Math.round(subtotal * (currentVoucher.value.value / 100))
    : currentVoucher.value.value;
});

const finalDisplayTotal = computed(() => {
  return isProposal.value
    ? foundationPrice.value + featuresTotal.value - voucherDiscount.value
    : order.value?.total_amount || 0;
});

const balanceRemaining = computed(() => {
  return finalDisplayTotal.value - (order.value?.paid_amount || 0);
});

const terms = [
  {
    title: "01. Strategi Pembayaran",
    content:
      "Biaya investasi dibagi menjadi: Commitment Fee (50%) untuk memulai pengembangan, dan Pelunasan Akhir (50%) sebelum penyerahan akses sistem sepenuhnya.",
  },
  {
    title: "02. Kepemilikan Data",
    content:
      "Seluruh hak akses infrastruktur dan kepemilikan aset digital akan diserahkan sepenuhnya kepada klien setelah seluruh proses administrasi selesai.",
  },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatPrice = (v: any) =>
  "Rp " + (Number(v) || 0).toLocaleString("id-ID");

const handlePrint = () => {
  if (globalThis.window) globalThis.window.print();
};
</script>

<style scoped>
@media print {
  .print\:hidden {
    display: none !important;
  }
  body,
  html,
  .min-h-screen {
    background: white !important;
    padding: 0 !important;
  }
  .max-w-5xl {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
  }
  .bg-white {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
  }
  .print\:page-break-before {
    page-break-before: always;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
