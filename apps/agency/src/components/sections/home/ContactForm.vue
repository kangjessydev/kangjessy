<template>
  <div class="w-full">
    <form class="space-y-6">
      <!-- Project Type (Optional) -->
      <div class="flex flex-col gap-2">
        <label
          for="consultation-service"
          class="text-[0.85rem] font-semibold text-text-primary"
        >
          Kamu Butuh Apa?
          <span class="text-text-secondary font-normal text-[0.75rem]"
            >(opsional)</span
          >
        </label>
        <select
          id="consultation-service"
          v-model="form.service"
          class="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-[0_0_0_4px_rgba(var(--accent-primary-rgb),0.1)] appearance-none cursor-pointer"
        >
          <option value="">Pilih jika sudah tahu...</option>
          <option v-for="opt in services" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>

      <!-- Brief (Optional) -->
      <div class="flex flex-col gap-2">
        <label
          for="consultation-brief"
          class="text-[0.85rem] font-semibold text-text-primary"
        >
          Ceritakan Singkat
          <span class="text-text-secondary font-normal text-[0.75rem]"
            >(opsional)</span
          >
        </label>
        <textarea
          id="consultation-brief"
          v-model="form.message"
          rows="4"
          placeholder="Mau bikin apa? Atau ada masalah yang perlu diselesaikan?

Contoh: 'Mau bikin web toko online tapi bingung mulai dari mana'"
          class="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary text-[0.95rem] outline-none resize-none transition-all focus:border-accent-primary focus:shadow-[0_0_0_4px_rgba(var(--accent-primary-rgb),0.1)]"
        ></textarea>
      </div>

      <!-- Contact Info (Required) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="flex flex-col gap-2">
          <label
            for="consultation-whatsapp"
            class="text-[0.85rem] font-semibold text-text-primary flex items-center gap-1"
          >
            Kontak WhatsApp
            <span class="text-rose-500">*</span>
          </label>
          <input
            id="consultation-whatsapp"
            type="tel"
            v-model="form.contact"
            placeholder="0812-3456-7890"
            required
            class="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-[0_0_0_4px_rgba(var(--accent-primary-rgb),0.1)]"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label
            for="consultation-name"
            class="text-[0.85rem] font-semibold text-text-primary flex items-center gap-1"
          >
            Nama Kamu
            <span class="text-rose-500">*</span>
          </label>
          <input
            id="consultation-name"
            type="text"
            v-model="form.name"
            placeholder="Budi Santoso"
            required
            class="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary focus:shadow-[0_0_0_4px_rgba(var(--accent-primary-rgb),0.1)]"
          />
        </div>
      </div>

      <!-- Honeypot -->
      <input
        type="text"
        v-model="form.honeypot"
        style="position: absolute; left: -5000px"
        tabindex="-1"
        autocomplete="off"
      />

      <!-- Info Guide -->
      <div class="bg-bg-secondary border-2 border-border-color rounded-xl p-4">
        <p
          class="text-[0.8rem] font-bold text-text-primary mb-3 flex items-center gap-2"
        >
          <InfoIcon :size="16" class="text-accent-primary" />
          Pilih cara terbaik untuk Anda:
        </p>
        <ul class="text-[0.75rem] text-text-secondary space-y-2 ml-1">
          <li class="flex items-start gap-2.5">
            <MailCheckIcon
              :size="16"
              class="text-accent-primary shrink-0 mt-0.5"
            />
            <span
              ><strong class="text-text-primary">Tunggu Kang Jessy:</strong>
              Dapatkan proposal lengkap + estimasi harga (1x24 jam)</span
            >
          </li>
          <li class="flex items-start gap-2.5">
            <MessageSquareIcon
              :size="16"
              class="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
            />
            <span
              ><strong class="text-text-primary">Chat Langsung:</strong> Butuh
              jawaban cepat atau diskusi informal</span
            >
          </li>
        </ul>
      </div>

      <!-- Submit Buttons (Hybrid) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- Primary: Wait for Admin with Proposal -->
        <button
          type="button"
          @click="handleSubmit('wait')"
          :disabled="loading"
          class="group relative px-6 py-4 bg-accent-primary hover:brightness-90 text-white text-[0.9rem] font-bold rounded-lg transition-all shadow-xs hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 order-1"
        >
          <span
            class="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-[0.6rem] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm"
          >
            Rekomendasi
          </span>
          <MailCheckIcon v-if="!loading" :size="18" />
          <span v-if="loading">Mengirim...</span>
          <span v-else class="text-center leading-tight"
            >Kirim & Tunggu Proposal</span
          >
        </button>

        <!-- Secondary: Instant WhatsApp Chat -->
        <button
          type="button"
          @click="handleSubmit('instant')"
          :disabled="loading"
          class="group px-6 py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-[0.9rem] font-bold rounded-lg transition-all shadow-xs hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 order-2"
        >
          <MessageCircleIcon v-if="!loading" :size="18" />
          <span v-if="loading">Mengirim...</span>
          <span v-else class="text-center leading-tight">Chat Cepat di WA</span>
        </button>
      </div>
    </form>

    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-400 ease-out"
        enter-from-class="opacity-0 translate-x-[100px]"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-400 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <div
          v-if="showToast"
          :class="[
            'fixed top-[40px] right-[40px] z-[99999] flex items-center gap-3 px-5 py-4 min-w-[320px] bg-bg-secondary border border-border-color rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl',
            toastType === 'success'
              ? 'border-l-4 border-l-accent-primary'
              : 'border-l-4 border-l-status-error',
          ]"
        >
          <div
            :class="[
              toastType === 'success'
                ? 'text-accent-primary'
                : 'text-status-error',
              'shrink-0',
            ]"
          >
            <CheckCircleIcon v-if="toastType === 'success'" :size="20" />
            <AlertCircleIcon v-else :size="20" />
          </div>
          <div class="flex-1">
            <p
              class="m-0 text-[0.9rem] font-bold text-text-primary leading-tight"
            >
              {{ toastMessage }}
            </p>
            <p class="m-0 text-[0.75rem] text-text-secondary mt-0.5">
              {{ toastSubMessage }}
            </p>
          </div>
          <button
            class="bg-none border-none text-text-secondary hover:text-text-primary text-[1.2rem] cursor-pointer px-1 transition-colors"
            @click="showToast = false"
          >
            &times;
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  MessageCircle,
  CheckCircle,
  AlertCircle,
  MailCheck,
  MessageSquare,
  Info,
} from "lucide-vue-next";
import { clientService } from "../../../services/clientService";
import { siteConfig } from "../../../data/config/siteConfig";

const MessageCircleIcon = MessageCircle;
const CheckCircleIcon = CheckCircle;
const AlertCircleIcon = AlertCircle;
const MailCheckIcon = MailCheck;
const MessageSquareIcon = MessageSquare;
const InfoIcon = Info;

const loading = ref(false);
const showToast = ref(false);
const toastType = ref<"success" | "error">("success");
const toastMessage = ref("");
const toastSubMessage = ref("");

const getEmptyForm = () => ({
  name: "",
  contact: "",
  service: "",
  message: "",
  honeypot: "",
});

const form = reactive(getEmptyForm());

// Services - sync dengan Order Form
const services = [
  "Starter Landing Page",
  "Premium Company Profile",
  "Custom CRM System",
  "LMS Academy",
  "Intelligent Chatbot AI",
  "Workflow Automation",
  "Belum Tahu / Custom Request",
];

const triggerToast = (
  type: "success" | "error",
  message: string,
  subMessage: string = "",
) => {
  toastType.value = type;
  toastMessage.value = message;
  toastSubMessage.value =
    subMessage || (type === "success" ? "Berhasil!" : "Silakan coba lagi.");
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 4000);
};

const handleSubmit = async (submitType: "wait" | "instant") => {
  loading.value = true;
  console.log(`[ConsultationForm] Starting submission (${submitType})...`);

  try {
    // Honeypot check
    if (form.honeypot) {
      console.log("[ConsultationForm] Honeypot detected, fake success");
      await new Promise((r) => setTimeout(r, 1000));
      triggerToast("success", "Terima kasih!");
      Object.assign(form, getEmptyForm());
      return;
    }

    // Prepare payload with different source based on submit type
    const payload = {
      name: form.name,
      phone: form.contact,
      budget: 0, // No budget in consultation form
      source:
        submitType === "wait"
          ? "web_consultation_wait"
          : "web_consultation_instant",
      type: "general_inquiry" as const,
      project_type: form.service || "Belum Ditentukan",
      brief: form.message || "-",
      visual_style: "-",
      ref_link: "-",
      notes: `Submit Type: ${submitType === "wait" ? "Wait for proposal" : "Instant chat"}\n${form.message || ""}`,
    };

    console.log("[ConsultationForm] Payload:", payload);

    // Save to Supabase
    const client = await clientService.addLead(payload);
    console.log("[ConsultationForm] ✅ Saved to Leads:", client);

    // Different action based on submit type
    if (submitType === "wait") {
      // Show success, no redirect
      triggerToast(
        "success",
        "Kirim & Tunggu Proposal Berhasil!",
        "Proposal akan segera dikirim via WA (Max 1x24 Jam).",
      );
      Object.assign(form, getEmptyForm());
    } else {
      // Instant chat: redirect to WhatsApp
      triggerToast(
        "success",
        "Membuka Chat Cepat di WA...",
        "Data tersimpan! Sedang mengalihkan ke WhatsApp Anda.",
      );

      const message = buildWhatsAppMessage();
      const waUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

      setTimeout(() => {
        window.open(waUrl, "_blank");
        Object.assign(form, getEmptyForm());
      }, 1500);
    }
  } catch (error) {
    console.error("[ConsultationForm] ❌ Error:", error);
    triggerToast("error", "Gagal mengirim. Silakan coba lagi.");
  } finally {
    loading.value = false;
  }
};

const buildWhatsAppMessage = () => {
  let msg = `Halo Kang Jessy! 👋\n\nSaya ${form.name} mau konsultasi`;

  if (form.service) {
    msg += ` tentang ${form.service}`;
  }

  msg += `.`;

  if (form.message) {
    msg += `\n\n${form.message}`;
  }

  msg += `\n\nBisa bantu saya?`;

  return msg;
};
</script>
