<template>
  <BottomSheet :is-open="isOpen" @close="closeModal">
    <div class="p-6 md:p-8">
      <div class="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h3
            class="text-xl md:text-2xl font-black text-[#1B2559] leading-tight"
          >
            Review Message
          </h3>
          <p
            class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1"
          >
            Send update to {{ clientName }}
          </p>
        </div>
        <button
          @click="closeModal"
          class="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="space-y-6">
        <div class="relative group">
          <div
            class="absolute -top-2 left-6 px-2 bg-white text-[9px] font-black text-[#702DFF] uppercase tracking-widest z-10"
          >
            Message Content
          </div>
          <textarea
            v-model="editableText"
            class="w-full min-h-[250px] md:min-h-[300px] p-6 pt-8 bg-slate-50 border-2 border-transparent rounded-[32px] text-sm font-medium text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 focus:ring-8 focus:ring-[#7029FF]/5 outline-none transition-all resize-none shadow-inner"
            placeholder="Draft your message here..."
          >
          </textarea>
        </div>

        <div class="relative group">
          <div
            class="absolute -top-2 left-6 px-2 bg-white text-[9px] font-black text-[#702DFF] uppercase tracking-widest z-10"
          >
            Google Drive Proposal Link *
          </div>
          <input
            v-model="driveUrl"
            type="url"
            class="w-full p-4 md:p-5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 focus:ring-8 focus:ring-[#7029FF]/5 outline-none transition-all shadow-inner"
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div
          class="p-5 bg-amber-50 border border-amber-100 rounded-[24px] flex items-start gap-4"
        >
          <div
            class="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"
          >
            <Info :size="16" class="text-amber-600" />
          </div>
          <p class="text-[11px] font-bold text-amber-800 leading-relaxed pt-1">
            Harap masukkan link Google Drive proposal. Tombol kirim akan aktif
            setelah link diisi.
          </p>
        </div>
      </div>

      <div class="mt-8 flex flex-col md:flex-row gap-3 pb-6 md:pb-0">
        <button
          @click="closeModal"
          class="order-2 md:order-1 flex-1 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
        <button
          @click="handleSend"
          :disabled="!driveUrl"
          class="order-1 md:order-2 flex-[2] py-4 bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
        >
          <MessageCircle :size="18" />
          Send to WhatsApp
        </button>
      </div>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { X, MessageCircle, Info } from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";

const props = defineProps<{
  isOpen: boolean;
  text: string;
  clientPhone: string;
  clientName: string;
  initialDriveUrl?: string;
}>();

const emit = defineEmits(["close", "sent"]);

const editableText = ref(props.text);
const driveUrl = ref(props.initialDriveUrl || "");

watch(
  () => props.text,
  (newVal) => {
    editableText.value = newVal;
  },
);

watch(
  () => props.initialDriveUrl,
  (newVal) => {
    if (newVal) driveUrl.value = newVal;
  },
);

const closeModal = () => emit("close");

const handleSend = () => {
  if (!driveUrl.value) return;

  const phone = props.clientPhone.replace(/[^0-9]/g, "");
  const cleanPhone = phone.startsWith("0") ? "62" + phone.slice(1) : phone;

  const finalMessage = `${editableText.value}\n\nLink Proposal Drive: ${driveUrl.value}`;

  window.open(
    `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`,
    "_blank",
  );
  emit("sent");
  closeModal();
};
</script>
