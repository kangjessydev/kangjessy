<template>
  <BottomSheet :is-open="isOpen" :mode="mode" @close="$emit('close')">
    <!-- Viewing State -->
    <template v-if="mode === 'view' && lead">
      <div
        class="px-6 md:px-8 pt-4 md:pt-8 pb-4 md:pb-6 flex items-center justify-between border-b border-slate-50"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-[20px] bg-indigo-50 flex items-center justify-center text-[#702DFF] border border-indigo-100/50"
          >
            <User :size="20" />
          </div>
          <div>
            <h2
              class="text-xl md:text-2xl font-black text-[#1B2559] tracking-tight"
            >
              {{ lead.name }}
            </h2>
            <p
              class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2"
            >
              <Calendar :size="10" />
              Captured on {{ formatDate(lead.created_at) }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="mode = 'edit'"
            class="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-indigo-50 text-[#702DFF] hover:bg-[#702DFF] hover:text-white transition-all flex items-center justify-center"
          >
            <Edit2 :size="16" />
          </button>
          <button
            @click="$emit('close')"
            class="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center"
          >
            <X :size="18" />
          </button>
        </div>
      </div>

      <div class="px-6 md:px-8 py-6 md:py-8 space-y-8">
        <!-- Main Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Identity Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 mb-2">
              <span
                class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                >Client Identity</span
              >
              <div class="h-[1px] flex-1 bg-slate-50"></div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
                >
                  <Mail :size="14" />
                </div>
                <span class="text-sm font-bold text-[#1B2559]">{{
                  lead.email || "No email provided"
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
                >
                  <Phone :size="14" />
                </div>
                <span class="text-sm font-bold text-[#1B2559]">{{
                  lead.phone || "No phone provided"
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
                >
                  <Building :size="14" />
                </div>
                <span class="text-sm font-bold text-[#1B2559]">{{
                  lead.company || "Personal Project"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Project Context Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 mb-2">
              <span
                class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                >Project Scope</span
              >
              <div class="h-[1px] flex-1 bg-slate-50"></div>
            </div>
            <div class="space-y-3">
              <div
                class="flex items-center justify-between p-3 bg-indigo-50/30 rounded-2xl border border-indigo-100/30"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#702DFF] shadow-sm"
                  >
                    <Layout :size="14" />
                  </div>
                  <span class="text-sm font-black text-[#1B2559]">{{
                    lead.project_type || "General Inquiry"
                  }}</span>
                </div>
                <span
                  class="text-[8px] font-black uppercase text-indigo-400 tracking-tighter bg-white px-2 py-0.5 rounded-full shadow-sm"
                  >Core Type</span
                >
              </div>

              <div
                v-if="lead.voucher"
                class="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border border-emerald-100/50"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm"
                  >
                    <Hash :size="14" />
                  </div>
                  <span class="text-sm font-black text-[#1B2559] uppercase tracking-wider">{{
                    lead.voucher
                  }}</span>
                </div>
                <span
                  class="text-[8px] font-black uppercase text-emerald-400 tracking-tighter bg-white px-2 py-0.5 rounded-full shadow-sm"
                  >Applied Voucher</span
                >
              </div>

              <div
                class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm"
                  >
                    <Globe :size="14" />
                  </div>
                  <span class="text-sm font-bold text-[#1B2559] flex items-center gap-1.5"
                    >Source: 
                    <span 
                      class="px-2 py-0.5 rounded-lg text-[10px] uppercase font-black border"
                      :class="getSourceClass(lead.source)"
                    >
                      {{ getSourceLabel(lead.source) }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aesthetics & Economy -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="p-5 bg-[#0F172A] rounded-3xl relative overflow-hidden group"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"
            >
              <Palette :size="48" class="text-white" />
            </div>
            <p
              class="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2"
            >
              Preferred Style
            </p>
            <p class="text-[15px] font-black text-white italic tracking-tight">
              {{ lead.visual_style || "Not Specified" }}
            </p>
          </div>

          <div
            class="p-5 bg-[#F8FAFC] rounded-3xl border-2 border-slate-100 relative overflow-hidden group"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"
            >
              <DollarSign :size="48" class="text-indigo-600" />
            </div>
            <p
              class="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2"
            >
              Allocated Budget
            </p>
            <p class="text-[15px] font-black text-[#1B2559] tracking-tighter">
              {{
                lead.budget
                  ? formatPrice(lead.budget)
                  : "Negotiable / To Be Discussed"
              }}
            </p>
          </div>
        </div>

        <!-- Message/Brief Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div
              class="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"
            >
              <MessageSquare :size="14" />
            </div>
            <span
              class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
              >Inquiry Details</span
            >
          </div>
          <div class="relative">
            <div
              class="absolute -left-1 top-4 w-1 h-12 bg-indigo-500 rounded-full"
            ></div>
            <div
              class="p-6 md:p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 text-[14px] leading-[1.7] text-[#1B2559] font-medium whitespace-pre-wrap shadow-inner italic"
            >
              "{{
                lead.brief || lead.notes || "No detailed message provided."
              }}"
            </div>
          </div>
        </div>

        <!-- Reference Section -->
        <div v-if="lead.ref_link" class="space-y-4">
          <p
            class="text-[9px] font-black text-slate-300 uppercase tracking-widest pl-1"
          >
            Reference Inspiration
          </p>
          <a
            :href="lead.ref_link"
            target="_blank"
            class="flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl group hover:border-[#702DFF] transition-all"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#702DFF] shadow-sm"
              >
                <LinkIcon :size="18" />
              </div>
              <div class="flex flex-col">
                <span
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1"
                  >External Link</span
                >
                <span
                  class="text-sm font-bold text-[#1B2559] truncate max-w-[200px] md:max-w-md"
                  >{{ lead.ref_link }}</span
                >
              </div>
            </div>
            <div
              class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#702DFF] group-hover:text-white transition-all"
            >
              <ExternalLink :size="16" />
            </div>
          </a>
        </div>
      </div>
    </template>

    <!-- Editing State -->
    <template v-else>
      <div
        class="px-6 md:px-8 pt-4 md:pt-8 pb-4 md:pb-6 flex items-center justify-between border-b border-slate-50"
      >
        <div>
          <h2
            class="text-xl md:text-2xl font-black text-[#1B2559] tracking-tight"
          >
            Edit Lead
          </h2>
          <p
            class="text-[9px] md:text-[10px] font-black text-[#702DFF] uppercase tracking-widest mt-1"
          >
            Refining Prospect Data
          </p>
        </div>
        <button
          @click="mode = 'view'"
          class="text-[10px] font-black uppercase text-slate-400 hover:text-[#702DFF]"
        >
          Cancel
        </button>
      </div>

      <div class="px-6 md:px-8 py-6 md:py-8">
        <form
          @submit.prevent="handleSubmit"
          class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div class="space-y-1.5 md:col-span-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Full Name</label
            >
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl md:rounded-[24px] py-3.5 px-6 text-sm font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl md:rounded-[24px] py-3.5 px-6 text-sm font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Phone</label
            >
            <input
              v-model="form.phone"
              type="text"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl md:rounded-[24px] py-3.5 px-6 text-sm font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Project Type</label
            >
            <input
              v-model="form.project_type"
              type="text"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl md:rounded-[24px] py-3.5 px-6 text-sm font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Budget Value</label
            >
            <input
              v-model="form.budget"
              type="number"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl md:rounded-[24px] py-3.5 px-6 text-sm font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none"
            />
          </div>

          <div class="space-y-1.5 md:col-span-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Visual Style</label
            >
            <select
              v-model="form.visual_style"
              class="w-full bg-slate-50 border-2 border-transparent rounded-2xl md:rounded-[24px] py-3.5 px-6 text-sm font-black text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none appearance-none"
            >
              <option
                v-for="opt in styleOptions"
                :key="opt.val"
                :value="opt.val"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <div class="space-y-1.5 md:col-span-2 px-1 pb-4">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >Brief Message</label
            >
            <textarea
              v-model="form.brief"
              rows="4"
              class="w-full bg-slate-50 border-2 border-transparent rounded-3xl py-4 px-6 text-sm font-medium text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none resize-none"
            ></textarea>
          </div>
        </form>
      </div>

      <div class="px-6 md:px-8 pb-10 md:pb-8 flex gap-3">
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="w-full px-6 py-4 rounded-2xl md:rounded-[24px] bg-[#702DFF] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95 transition-all disabled:opacity-50"
        >
          Update Lead Data
        </button>
      </div>
    </template>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import {
  X,
  Edit2,
  ExternalLink,
  User,
  Calendar,
  Mail,
  Phone,
  Building,
  Layout,
  Globe,
  Palette,
  DollarSign,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";
import type { Client } from "../../types";
import { getSourceLabel, getSourceClass, formatCurrency } from "../../utils/formatters";

const props = defineProps<{
  isOpen: boolean;
  lead: Client | null;
  loading?: boolean;
}>();

const emit = defineEmits(["close", "save"]);

const mode = ref<"view" | "edit">("view");

const styleOptions = [
  { label: "Minimalis & Bersih (Apple Style)", val: "Minimalist" },
  { label: "Modern & High-Tech", val: "Modern High-Tech" },
  { label: "Profesional & Korporat", val: "Professional" },
  { label: "Ceria & Full Color", val: "Colorful" },
  { label: "Saya Bingung, Butuh Saran", val: "Bingung" },
];

const form = reactive({
  name: "",
  email: "",
  phone: "",
  company: "",
  project_type: "",
  budget: 0,
  visual_style: "",
  ref_link: "",
  brief: "",
});

watch(
  () => props.lead,
  (newVal) => {
    if (newVal) {
      mode.value = "view";
      form.name = newVal.name || "";
      form.email = newVal.email || "";
      form.phone = newVal.phone || "";
      form.company = newVal.company || "";
      form.project_type = newVal.project_type || newVal.type || "";
      form.budget = newVal.budget || 0;
      form.visual_style = newVal.visual_style || "";
      form.ref_link = newVal.ref_link || "";
      form.brief = newVal.brief || newVal.notes || "";
    }
  },
  { immediate: true },
);

function handleSubmit() {
  emit("save", { ...form });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price: number) {
  return formatCurrency(price);
}
</script>
