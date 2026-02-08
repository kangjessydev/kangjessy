<template>
  <BottomSheet
    :modelValue="isOpen"
    :title="title || 'WhatsApp Consultation'"
    :icon="MessageCircle"
    @update:modelValue="$emit('close')"
    @close="$emit('close')"
  >
    <!-- Main Content -->
    <div class="p-6">
      <!-- Messages Display -->
      <div class="mb-8">
        <div class="flex flex-col items-start max-w-[90%]">
          <div
            class="bg-bg-primary border border-border-color px-5 py-4 rounded-[4px_24px_24px_24px] text-[0.95rem] leading-relaxed text-text-primary shadow-sm"
          >
            <p>{{ displayGreeting }}</p>
            <span
              class="block text-[0.7rem] text-text-tertiary font-bold mt-2 text-right uppercase tracking-wider"
              >{{ currentTime }}</span
            >
          </div>
        </div>
      </div>

      <!-- Form Area -->
      <div class="space-y-5">
        <div class="space-y-2">
          <label
            class="block text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1"
            >Nama Lengkap</label
          >
          <input
            v-model="form.name"
            type="text"
            placeholder="Masukkan nama Anda..."
            class="w-full bg-bg-primary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 placeholder:text-text-tertiary"
          />
        </div>

        <div class="space-y-2">
          <label
            class="block text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1"
            >Pesan Anda</label
          >
          <textarea
            v-model="form.message"
            placeholder="Tulis detail project atau pertanyaan..."
            rows="4"
            class="w-full bg-bg-primary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] outline-none transition-all focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 resize-none placeholder:text-text-tertiary"
          ></textarea>
        </div>
      </div>

      <p
        class="text-[0.65rem] text-text-tertiary font-medium text-center mt-6 px-4"
      >
        Pesan Anda akan diteruskan secara aman ke WhatsApp.
      </p>
    </div>

    <!-- Footer Action -->
    <template #footer>
      <button
        @click="handleSend"
        :disabled="!form.name.trim() || !form.message.trim() || loading"
        class="w-full bg-green-500 hover:bg-green-600 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white p-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[0.95rem] transition-all active:scale-[0.98] shadow-xl shadow-green-500/20 disabled:shadow-none"
      >
        <div
          v-if="loading"
          class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
        ></div>
        <template v-else>
          <MessageCircle :size="20" />
          <span>{{ actionText || "Kirim ke WhatsApp" }}</span>
        </template>
      </button>
    </template>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { MessageCircle } from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";
import { siteConfig } from "../../data/config/siteConfig";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    title?: string;
    actionText?: string;
    initialMessage?: string;
    bubbleMessage?: string;
    category?: string;
  }>(),
  {
    category: "General Consultation",
  },
);

const emit = defineEmits(["close"]);

const loading = ref(false);
const currentTime = computed(() =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
);

const form = ref({
  name: "",
  message: "",
});

const displayGreeting = computed(() => {
  return (
    props.bubbleMessage ||
    "Halo! Saya siap membantu diskusi project Anda. Silakan isi pesan di bawah dan klik kirim untuk terhubung ke WhatsApp saya."
  );
});

// Set initial message when modal opens
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      form.value.message =
        props.initialMessage || siteConfig.whatsapp.defaultMessage;
    }
  },
);

const handleSend = async () => {
  if (!form.value.name.trim() || !form.value.message.trim()) return;

  loading.value = true;

  // 1. Sync to Google Sheets (Removed as per user request)

  // 2. Open WhatsApp
  const finalMessage = `Halo KangJessy! Saya ${form.value.name}.\n\n${form.value.message}`;
  const waUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(finalMessage)}`;

  window.open(waUrl, "_blank");

  loading.value = false;
  emit("close");
};
</script>

<script lang="ts">
export default {
  name: "WhatsAppModal",
};
</script>
