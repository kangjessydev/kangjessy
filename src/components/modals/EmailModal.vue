<template>
  <BottomSheet
    :modelValue="isOpen"
    title="Email Support"
    :icon="MailIcon"
    maxWidth="5xl"
    contentClass="!overflow-hidden !pb-0"
    fullHeight
    @update:modelValue="$emit('close')"
    @close="$emit('close')"
  >
    <div class="flex flex-col lg:grid lg:grid-cols-12 bg-bg-primary h-[calc(100dvh-120px)] lg:h-[600px] lg:max-h-[75vh] overflow-hidden border-t border-border-color/50">

      <!-- Left Column: Email Templates (Desktop Only) -->
      <div class="hidden lg:flex lg:col-span-4 bg-bg-secondary/50 border-b lg:border-b-0 lg:border-r border-border-color flex-col h-auto lg:h-full shrink-0 z-10 overflow-hidden">
        <div class="pt-12 pb-12 px-8 overflow-y-auto custom-scrollbar lg:h-full overscroll-contain">
          <div class="mb-8 shrink-0">
            <span class="block text-[0.65rem] font-black text-red-500 uppercase tracking-[0.4em] mb-3">Email Presets</span>
            <h3 class="text-2xl font-black text-white leading-tight">Pilih Tujuan Email</h3>
            <p class="text-xs text-text-tertiary mt-2">Pilih template subjek untuk mempermudah kategorisasi pesan Anda.</p>
          </div>

          <div class="flex flex-col gap-3">
            <button
              v-for="template in templates"
              :key="template.id"
              @click="selectTemplate(template)"
              class="w-full group text-left p-4 rounded-2xl border border-border-color bg-bg-primary transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/5 hover:translate-x-1 flex items-center gap-4 shrink-0"
              :class="{ 'border-red-500 bg-red-500/5 ring-1 ring-red-500/20': activeTemplateId === template.id }"
            >
              <div class="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center text-text-tertiary group-hover:text-red-500 transition-colors shrink-0">
                <component :is="template.icon" :size="18" />
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-bold text-white leading-tight group-hover:text-red-400 transition-colors">{{ template.label }}</h4>
                <p class="text-[9px] text-text-tertiary uppercase tracking-widest mt-1">{{ template.category }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-8 flex-1 flex flex-col h-full overflow-hidden bg-bg-primary relative">

        <!-- ============================================================ -->
        <!-- DESKTOP LAYOUT: scrollable content + fixed footer button     -->
        <!-- ============================================================ -->
        <div class="hidden lg:flex flex-col h-full overflow-hidden">

          <!-- Scrollable content: balon + semua form fields -->
          <div class="flex-1 overflow-y-auto custom-scrollbar overscroll-contain px-12 pt-10 pb-4 flex flex-col gap-3">

            <!-- Greeting Bubble -->
            <div class="shrink-0">
              <div class="flex flex-col items-start max-w-[90%]">
                <div class="bg-bg-secondary border border-border-color px-6 py-5 rounded-[4px_32px_32px_32px] text-[0.95rem] leading-relaxed text-text-primary shadow-sm relative">
                  <div class="absolute -left-2 top-0 w-4 h-4 bg-bg-secondary border-l border-t border-border-color -rotate-45"></div>
                  <p class="relative z-10">Halo! Silakan gunakan form di bawah untuk mengirimkan pesan email Anda. Saya akan membalas secepat mungkin.</p>
                  <span class="block text-[0.65rem] text-text-tertiary font-bold mt-3 text-right uppercase tracking-[0.2em]">{{ currentTime }}</span>
                </div>
              </div>
            </div>

            <!-- Nama & Email (2 kolom) -->
            <div class="shrink-0 grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Nama</label>
                <input v-model="form.name" type="text" placeholder="John Doe"
                  class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 placeholder:text-text-tertiary" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Email</label>
                <input v-model="form.email" type="email" placeholder="john@email.com"
                  class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 placeholder:text-text-tertiary" />
              </div>
            </div>

            <!-- Subject -->
            <div class="shrink-0 space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Subject</label>
              <input v-model="form.subject" type="text" placeholder="Subjek pesan Anda..."
                class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 placeholder:text-text-tertiary" />
            </div>

            <!-- Message -->
            <div class="shrink-0 space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Pesan</label>
              <textarea v-model="form.message" placeholder="Tulis detail proposal atau pertanyaan..." rows="5"
                class="w-full min-h-[120px] bg-bg-secondary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] leading-relaxed outline-none resize-none placeholder:text-text-tertiary custom-scrollbar transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
              ></textarea>
            </div>

          </div>

          <!-- Fixed footer: Submit Button -->
          <div class="shrink-0 px-12 pb-8 pt-4 border-t border-border-color/30">
            <button
              @click="handleSend"
              :disabled="!isFormValid || loading"
              class="group w-full relative h-[64px] bg-red-600 hover:bg-red-500 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all active:scale-[0.98] overflow-hidden"
            >
              <div class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              <div v-if="loading" class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <template v-else>
                <SendIcon :size="18" class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span>Kirim Email Sekarang</span>
              </template>
            </button>
          </div>

        </div>

        <!-- ============================================================ -->
        <!-- MOBILE LAYOUT: scrollable content + fixed footer             -->
        <!-- ============================================================ -->

        <!-- Mobile: Scrollable area (balon + semua fields) -->
        <div class="lg:hidden flex-1 overflow-y-auto custom-scrollbar overscroll-contain px-4 pt-6 pb-4 flex flex-col gap-3">

          <!-- Greeting Bubble -->
          <div class="shrink-0">
            <div class="flex flex-col items-start max-w-[95%]">
              <div class="bg-bg-secondary border border-border-color px-5 py-4 rounded-[4px_24px_24px_24px] text-[0.85rem] leading-relaxed text-text-primary shadow-sm relative">
                <div class="absolute -left-2 top-0 w-4 h-4 bg-bg-secondary border-l border-t border-border-color -rotate-45"></div>
                <p class="relative z-10">Halo! Silakan gunakan form di bawah untuk mengirimkan pesan email Anda. Saya akan membalas secepat mungkin.</p>
                <span class="block text-[0.6rem] text-text-tertiary font-bold mt-2 text-right uppercase tracking-[0.2em]">{{ currentTime }}</span>
              </div>
            </div>
          </div>

          <!-- Nama -->
          <div class="shrink-0 space-y-1.5">
            <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Nama</label>
            <input v-model="form.name" type="text" placeholder="John Doe"
              class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 placeholder:text-text-tertiary" />
          </div>

          <!-- Email -->
          <div class="shrink-0 space-y-1.5">
            <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Email</label>
            <input v-model="form.email" type="email" placeholder="john@email.com"
              class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 placeholder:text-text-tertiary" />
          </div>

          <!-- Subject -->
          <div class="shrink-0 space-y-1.5">
            <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Subject</label>
            <input v-model="form.subject" type="text" placeholder="Subjek pesan Anda..."
              class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 placeholder:text-text-tertiary" />
          </div>

          <!-- Message -->
          <div class="shrink-0 space-y-1.5">
            <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Pesan</label>
            <textarea v-model="form.message" placeholder="Tulis detail proposal atau pertanyaan..." rows="4"
              class="w-full min-h-[100px] bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] leading-relaxed outline-none resize-none placeholder:text-text-tertiary custom-scrollbar transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
            ></textarea>
          </div>

        </div>

        <!-- Mobile: Fixed footer (? button + kirim button) -->
        <div class="lg:hidden shrink-0 bg-bg-primary border-t border-border-color/60 px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] min-h-[72px] relative">

          <!-- Template Popover (opens upward) -->
          <div
            v-if="showMobileTemplates"
            class="absolute bottom-[calc(100%+8px)] left-4 right-4 max-h-[60dvh] overflow-y-auto bg-bg-secondary border border-border-color rounded-2xl shadow-2xl custom-scrollbar z-50"
          >
            <div class="p-3 space-y-2">
              <button
                v-for="template in templates"
                :key="'mob-'+template.id"
                @click="selectTemplate(template)"
                class="w-full text-left p-3 rounded-[14px] border border-border-color bg-bg-primary/40 hover:border-red-500/50 hover:bg-red-500/5 active:scale-[0.98] transition-all flex items-center gap-3"
                :class="{ 'border-red-500 bg-red-500/5': activeTemplateId === template.id }"
              >
                <div class="w-8 h-8 rounded-xl bg-bg-tertiary flex items-center justify-center text-text-tertiary shrink-0">
                  <component :is="template.icon" :size="16" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-[0.8rem] font-semibold text-white truncate">{{ template.label }}</h4>
                  <p class="text-[0.6rem] text-text-tertiary uppercase tracking-wider mt-0.5">{{ template.category }}</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Footer buttons row -->
          <div class="flex items-center gap-3">

            <!-- ? Button: toggle template popover -->
            <button
              @click="showMobileTemplates = !showMobileTemplates"
              title="Pilih template email"
              class="shrink-0 w-[50px] h-[50px] rounded-full border transition-all flex items-center justify-center"
              :class="showMobileTemplates
                ? 'bg-red-500/10 border-red-500/50 text-red-500'
                : 'bg-bg-secondary border-border-color text-text-tertiary hover:border-red-500/40 hover:text-red-500'"
            >
              <FileText :size="20" />
            </button>

            <!-- Submit button -->
            <button
              @click="handleSend"
              :disabled="!isFormValid || loading"
              class="group flex-1 relative h-[50px] bg-red-600 hover:bg-red-500 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white rounded-full flex items-center justify-center gap-2.5 font-black text-[0.95rem] transition-all active:scale-[0.98] overflow-hidden shadow-[0_4px_14px_rgba(220,38,38,0.25)] disabled:shadow-none"
            >
              <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <template v-else>
                <SendIcon :size="16" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Kirim Email</span>
              </template>
            </button>

          </div>
        </div>

      </div>

    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Mail as MailIcon,
  Send as SendIcon,
  FileText,
} from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";
import { useSiteSettings } from "../../composables/useSiteSettings";
import { emailTemplates } from "../../data/contact/emailTemplates";

const { settings } = useSiteSettings();

const props = defineProps<{
  isOpen: boolean;
  initialSubject?: string;
}>();

const emit = defineEmits(["close"]);

// Scroll Lock Management
watch(() => props.isOpen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});

const loading = ref(false);
const activeTemplateId = ref<string | null>(null);
const showMobileTemplates = ref(false);

const currentTime = computed(() =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
);

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isFormValid = computed(() => {
  return (
    form.value.name.trim() &&
    form.value.email.trim() &&
    form.value.email.includes("@") &&
    form.value.subject.trim() &&
    form.value.message.trim()
  );
});

// Templates diimport dari src/data/contact/emailTemplates.ts
const templates = emailTemplates;

const selectTemplate = (t: any) => {
  activeTemplateId.value = t.id;
  form.value.subject = t.subject;
  form.value.message = t.body;
  showMobileTemplates.value = false;
};

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      if (props.initialSubject) form.value.subject = props.initialSubject;
      activeTemplateId.value = null;
      showMobileTemplates.value = false;
    }
  },
);

const handleSend = async () => {
  if (!isFormValid.value) return;
  loading.value = true;
  try {
    const mailtoLink = `mailto:${settings.value.email}?subject=${encodeURIComponent(form.value.subject)}&body=${encodeURIComponent(`Name: ${form.value.name}\n\n${form.value.message}`)}`;
    window.location.href = mailtoLink;
    emit("close");
  } catch (error) {
    console.error("Email Send Error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@keyframes shimmer {
  100% { transform: translateX(100%); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}
</style>
