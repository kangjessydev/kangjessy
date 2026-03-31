<template>
  <BottomSheet
    :modelValue="isOpen"
    :title="title || 'WhatsApp Consultation'"
    :icon="MessageSquare"
    maxWidth="5xl"
    contentClass="!overflow-hidden !pb-0"
    fullHeight
    @update:modelValue="$emit('close')"
    @close="$emit('close')"
  >
    <!-- Main Content Grid with ultra-safe height to prevent any bottom clipping -->
    <div class="flex flex-col lg:grid lg:grid-cols-12 bg-bg-primary h-[calc(100dvh-120px)] lg:h-[600px] lg:max-h-[75vh] overflow-hidden border-t border-border-color/50">
      
      <!-- Left Column: Templates (Desktop Only) -->
      <div class="hidden lg:flex lg:col-span-4 bg-bg-secondary/50 border-b lg:border-b-0 lg:border-r border-border-color flex-col h-auto lg:h-full shrink-0 z-10 overflow-hidden">
        <div class="pt-6 lg:pt-12 pb-4 lg:pb-12 px-6 lg:px-8 overflow-y-auto custom-scrollbar lg:h-full overscroll-contain">
            <!-- Smart Support Shortcut (Gatekeeper) -->
            <div class="mb-10 lg:mb-12">
                <div @click="switchToSmartSupport" class="group relative cursor-pointer overflow-hidden p-px rounded-2xl bg-linear-to-br from-accent-primary/50 via-transparent to-accent-primary/20 shadow-xl hover:shadow-accent-primary/10 transition-all duration-500">
                    <div class="bg-bg-primary/95 group-hover:bg-accent-primary/5 p-4 lg:p-5 rounded-[15px] relative z-10">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-[0_4px_15px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-500">
                                <Bot :size="20" />
                            </div>
                            <div>
                                <h4 class="text-sm font-black text-white leading-tight">Cari Jawaban Cepat?</h4>
                                <p class="text-[0.7rem] text-text-tertiary mt-1">Gunakan Smart Support (FAQ)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-6 lg:mb-8 shrink-0 flex items-center gap-3">
                <div class="h-px bg-border-color/50 grow"></div>
                <span class="text-[0.6rem] font-black text-text-tertiary uppercase tracking-[0.3em] shrink-0">Atau Konsultasi Langsung</span>
                <div class="h-px bg-border-color/50 grow"></div>
            </div>

            <!-- Templates List Grouped -->
            <div class="space-y-8">
                <div v-for="category in templateGroups" :key="category.name">
                    <h5 class="text-[0.65rem] font-black text-accent-primary/80 uppercase tracking-[0.2em] mb-4 pl-1">{{ category.name }}</h5>
                    <div class="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden gap-3 pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 custom-scrollbar">
                        <button 
                            v-for="template in category.items" 
                            :key="template.id"
                            @click="selectTemplate(template)"
                            class="min-w-[220px] lg:min-w-0 lg:w-full group text-left p-3.5 rounded-2xl border border-border-color bg-bg-primary/50 transition-all duration-300 hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:-translate-y-1 lg:hover:translate-x-1 lg:hover:-translate-y-0 flex items-center gap-3 shrink-0"
                            :class="{ 'border-accent-primary bg-accent-primary/5 ring-1 ring-accent-primary/20': activeTemplateId === template.id }"
                        >
                            <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center -rotate-45 border border-white/5 group-hover:bg-accent-primary/10 transition-colors">
                                <div class="rotate-45 text-text-secondary group-hover:text-accent-primary transition-colors">
                                    <component :is="template.icon" :size="18" />
                                </div>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-[0.8rem] font-bold text-white leading-tight group-hover:text-accent-primary transition-colors">{{ template.label }}</h4>
                                <p class="text-[0.55rem] text-text-tertiary uppercase tracking-widest mt-1 opacity-60">{{ template.desc }}</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="lg:col-span-8 flex-1 flex flex-col h-full overflow-hidden bg-bg-primary relative">

        <!-- ============================================================ -->
        <!-- DESKTOP LAYOUT: scrollable content + fixed footer button     -->
        <!-- ============================================================ -->
        <div class="hidden lg:flex flex-col h-full overflow-hidden">

          <!-- Scrollable content: balon + name + textarea -->
          <div class="flex-1 overflow-y-auto custom-scrollbar overscroll-contain px-12 pt-10 pb-4 flex flex-col gap-3">

            <!-- 1. Greeting Bubble -->
            <div class="shrink-0">
              <div class="flex flex-col items-start max-w-[90%]">
                <div class="bg-bg-secondary border border-border-color px-6 py-5 rounded-[4px_32px_32px_32px] text-[0.95rem] leading-relaxed text-text-primary shadow-sm relative">
                  <div class="absolute -left-2 top-0 w-4 h-4 bg-bg-secondary border-l border-t border-border-color -rotate-45"></div>
                  <p class="relative z-10">{{ displayGreeting }}</p>
                  <span class="block text-[0.65rem] text-text-tertiary font-bold mt-3 text-right uppercase tracking-[0.2em]">{{ currentTime }}</span>
                </div>
              </div>
            </div>

            <!-- 2. Name Field -->
            <div class="shrink-0 space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Siapa Nama Anda?</label>
              <div class="relative group">
                <User :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ex: John Doe"
                  class="w-full bg-bg-secondary border border-border-color rounded-2xl pl-11 pr-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 placeholder:text-text-tertiary"
                />
              </div>
            </div>

            <!-- 3. Message Textarea -->
            <div class="shrink-0 space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Pesan / Detail Pertanyaan</label>
              <textarea
                ref="messageTextarea"
                v-model="form.message"
                placeholder="Ceritakan masalah Anda..."
                class="w-full min-h-[120px] bg-bg-secondary border border-border-color rounded-2xl px-5 py-4 text-text-primary text-[0.95rem] leading-relaxed outline-none resize-none placeholder:text-text-tertiary custom-scrollbar transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10"
              ></textarea>
            </div>

          </div>

          <!-- Fixed footer: Submit Button -->
          <div class="shrink-0 px-12 pb-8 pt-4 border-t border-border-color/30">
            <button
              @click="handleSend"
              :disabled="!form.name.trim() || !form.message.trim() || loading"
              class="group w-full relative h-[64px] bg-green-600 hover:bg-green-500 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all active:scale-[0.98] overflow-hidden"
            >
              <div class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              <div v-if="loading" class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <template v-else>
                <Send :size="18" class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span>{{ actionText || 'Kirim ke WhatsApp' }}</span>
              </template>
            </button>
          </div>

        </div>

        <!-- ============================================================ -->
        <!-- MOBILE LAYOUT: scrollable content + fixed footer             -->
        <!-- ============================================================ -->

        <!-- Mobile: Scrollable area (balon + name + textarea) -->
        <div class="lg:hidden flex-1 overflow-y-auto custom-scrollbar overscroll-contain px-4 pt-6 pb-4 flex flex-col gap-3">

          <!-- 1. Greeting Bubble -->
          <div class="shrink-0">
            <div class="flex flex-col items-start max-w-[95%]">
              <div class="bg-bg-secondary border border-border-color px-5 py-4 rounded-[4px_24px_24px_24px] text-[0.85rem] leading-relaxed text-text-primary shadow-sm relative">
                <div class="absolute -left-2 top-0 w-4 h-4 bg-bg-secondary border-l border-t border-border-color -rotate-45"></div>
                <p class="relative z-10">{{ displayGreeting }}</p>
                <span class="block text-[0.6rem] text-text-tertiary font-bold mt-2 text-right uppercase tracking-[0.2em]">{{ currentTime }}</span>
              </div>
            </div>
          </div>

          <!-- 2. Name Field -->
          <div class="shrink-0 space-y-1.5">
            <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Siapa Nama Anda?</label>
            <div class="relative group">
              <User :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
              <input
                v-model="form.name"
                type="text"
                placeholder="Ex: John Doe"
                class="w-full bg-bg-secondary border border-border-color rounded-2xl pl-11 pr-4 py-3.5 text-text-primary text-[0.9rem] outline-none transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 placeholder:text-text-tertiary"
              />
            </div>
          </div>

          <!-- 3. Message Textarea -->
          <div class="shrink-0 space-y-1.5">
            <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Pesan / Detail Pertanyaan</label>
            <textarea
              ref="messageTextarea"
              v-model="form.message"
              @input="resizeTextarea"
              placeholder="Ceritakan masalah Anda..."
              class="w-full min-h-[100px] bg-bg-secondary border border-border-color rounded-2xl px-4 py-3.5 text-text-primary text-[0.9rem] leading-relaxed outline-none resize-none placeholder:text-text-tertiary custom-scrollbar transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10"
            ></textarea>
          </div>

        </div>

        <!-- Mobile: Fixed footer (? button + submit button) -->
        <div class="lg:hidden shrink-0 bg-bg-primary border-t border-border-color/60 px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] min-h-[72px] relative">

          <!-- Template Popover (opens upward from footer) -->
          <div
            v-if="showMobileTemplates"
            class="absolute bottom-[calc(100%+8px)] left-4 right-4 max-h-[60dvh] overflow-y-auto bg-bg-secondary border border-border-color rounded-2xl shadow-2xl custom-scrollbar z-50"
          >
            <div class="p-3 space-y-4">
              <!-- Smart Support shortcut -->
              <div @click="switchToSmartSupport" class="group cursor-pointer overflow-hidden p-px rounded-[14px] bg-linear-to-br from-accent-primary/50 via-transparent to-accent-primary/20 transition-all active:scale-[0.98]">
                <div class="bg-bg-primary/95 p-3 rounded-[13px] flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                    <Bot :size="16" />
                  </div>
                  <div>
                    <h4 class="text-[0.75rem] font-black text-white leading-tight">Cari Jawaban Cepat?</h4>
                    <p class="text-[0.6rem] text-text-tertiary mt-0.5">Gunakan Smart Support (FAQ)</p>
                  </div>
                </div>
              </div>

              <!-- Template groups -->
              <div v-for="category in templateGroups" :key="'mob-'+category.name">
                <h5 class="text-[0.55rem] font-black text-accent-primary/80 uppercase tracking-[0.2em] mb-2 px-1">{{ category.name }}</h5>
                <div class="flex flex-col gap-1.5">
                  <button
                    v-for="template in category.items"
                    :key="'mob-'+template.id"
                    @click="selectTemplate(template)"
                    class="w-full text-left p-3 rounded-[14px] border border-border-color bg-bg-primary/40 hover:border-accent-primary/50 active:scale-[0.98] transition-all flex items-center gap-3"
                  >
                    <div class="w-7 h-7 shrink-0 rounded-lg bg-white/5 flex items-center justify-center -rotate-45 border border-white/5">
                      <div class="rotate-45 text-text-secondary">
                        <component :is="template.icon" :size="14" />
                      </div>
                    </div>
                    <h4 class="text-[0.8rem] font-semibold text-white">{{ template.label }}</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer buttons row -->
          <div class="flex items-center gap-3">

            <!-- ? Button: toggle template popover -->
            <button
              @click="showMobileTemplates = !showMobileTemplates"
              title="Pilih template pesan"
              class="shrink-0 w-[50px] h-[50px] rounded-full border transition-all flex items-center justify-center"
              :class="showMobileTemplates
                ? 'bg-accent-primary/10 border-accent-primary/50 text-accent-primary'
                : 'bg-bg-secondary border-border-color text-text-tertiary hover:border-accent-primary/40 hover:text-accent-primary'"
            >
              <HelpCircle :size="20" />
            </button>

            <!-- Submit button (primary, grows full width) -->
            <button
              @click="handleSend"
              :disabled="!form.name.trim() || !form.message.trim() || loading"
              class="group flex-1 relative h-[50px] bg-green-600 hover:bg-green-500 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white rounded-full flex items-center justify-center gap-2.5 font-black text-[0.95rem] transition-all active:scale-[0.98] overflow-hidden shadow-[0_4px_14px_rgba(22,163,74,0.25)] disabled:shadow-none"
            >
              <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <template v-else>
                <Send :size="16" class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>{{ actionText || 'Kirim ke WhatsApp' }}</span>
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
  MessageSquare, 
  User, 
  Send, 
  HelpCircle,
  Bot,
} from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";
import { useSiteSettings } from "../../composables/useSiteSettings";
import { usePopupManager, Popups } from "../../composables/usePopupManager";
import { whatsappTemplateGroups } from "../../data/contact/whatsappTemplates";

const { settings } = useSiteSettings();
const popup = usePopupManager();

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    title?: string;
    actionText?: string;
    initialMessage?: string;
    initialName?: string;
    bubbleMessage?: string;
    category?: string;
  }>(),
  {
    category: "General Consultation",
  },
);

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
  name: props.initialName || "",
  message: "",
});

const messageTextarea = ref<HTMLTextAreaElement | null>(null);

const resizeTextarea = () => {
    if (!messageTextarea.value) return;
    messageTextarea.value.style.height = 'auto'; // Reset height
    messageTextarea.value.style.height = Math.min(messageTextarea.value.scrollHeight, 120) + 'px';
};

watch(() => form.value.message, () => {
    setTimeout(resizeTextarea, 10);
});

const displayGreeting = computed(() => {
  return (
    props.bubbleMessage ||
    "Halo! Saya siap membantu diskusi project Anda. Silakan isi pesan di bawah atau pilih template untuk terhubung langsung ke WhatsApp saya."
  );
});

// Template groups diimport dari src/data/contact/whatsappTemplates.ts
const templateGroups = whatsappTemplateGroups;

const selectTemplate = (template: any) => {
  activeTemplateId.value = template.id;
  form.value.message = template.text;
  showMobileTemplates.value = false; // Hide accordion immediately on mobile after selection
};

const switchToSmartSupport = () => {
    emit('close');
    setTimeout(() => {
        popup.openModal(Popups.CHAT_AI);
    }, 300);
};

// Set initial data when modal opens
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      form.value.message = props.initialMessage || settings.value.whatsappMsg;
      if (props.initialName) form.value.name = props.initialName;
      activeTemplateId.value = null;
      showMobileTemplates.value = false;
    }
  },
);

const handleSend = async () => {
  if (!form.value.name.trim() || !form.value.message.trim()) return;
  loading.value = true;
  const finalMessage = `Halo KangJessy! Saya ${form.value.name}.\n\n${form.value.message}`;
  const waUrl = `https://wa.me/${settings.value.whatsapp}?text=${encodeURIComponent(finalMessage)}`;
  window.open(waUrl, "_blank");
  loading.value = false;
  emit("close");
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
