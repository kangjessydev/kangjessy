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
    <div class="flex flex-col lg:grid lg:grid-cols-12 bg-bg-primary h-[calc(100dvh-64px)] lg:h-[600px] lg:max-h-[75vh] overflow-hidden border-t border-border-color/50">
      
      <!-- Left Column: Templates (Independent Scroll) -->
      <div class="lg:col-span-4 bg-bg-secondary/50 border-b lg:border-b-0 lg:border-r border-border-color flex flex-col h-auto lg:h-full shrink-0 z-10 overflow-hidden">
        <div class="pt-6 lg:pt-16 pb-4 lg:pb-12 px-6 lg:px-8 overflow-y-auto custom-scrollbar lg:h-full">
            <div class="mb-4 lg:mb-8 shrink-0">
                <span class="hidden lg:block text-[0.65rem] font-black text-accent-primary uppercase tracking-[0.4em] mb-3">Quick Start</span>
                <h3 class="text-xl lg:text-2xl font-black text-white leading-tight">Pilih Topik Konsultasi</h3>
                <p class="text-xs text-text-tertiary mt-2 leading-relaxed">Klik salah satu kartu di bawah untuk mengisi pesan secara otomatis.</p>
            </div>

            <div class="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden gap-3 pb-2 lg:pb-10 -mx-6 px-6 lg:mx-0 lg:px-0 custom-scrollbar">
                <button 
                    v-for="template in templates" 
                    :key="template.id"
                    @click="selectTemplate(template)"
                    class="min-w-[240px] lg:min-w-0 lg:w-full group text-left p-3 lg:p-4 rounded-2xl border border-border-color bg-bg-primary transition-all duration-300 hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:-translate-y-1 lg:hover:translate-x-1 lg:hover:-translate-y-0 flex items-center gap-3 lg:gap-4 shrink-0"
                    :class="{ 'border-accent-primary bg-accent-primary/5 ring-1 ring-accent-primary/20': activeTemplateId === template.id }"
                >
                    <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center -rotate-45 border border-white/10">
                        <div class="rotate-45">
                            <component :is="template.icon" :size="20" />
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-sm font-bold text-white leading-tight">{{ template.label }}</h4>
                        <p class="text-[10px] text-text-tertiary uppercase tracking-widest mt-1">{{ template.category }}</p>
                    </div>
                </button>
            </div>
        </div>
      </div>

      <!-- Right Column: Form (Independent Scroll) -->
      <div class="lg:col-span-8 flex-1 flex flex-col h-full overflow-hidden bg-bg-primary relative">
        <div class="flex-1 pt-6 lg:pt-16 pb-6 lg:pb-12 px-4 lg:px-12 overflow-y-auto custom-scrollbar">
            <!-- Message bubble display -->
            <div class="mb-8 lg:mb-12 shrink-0">
                <div class="flex flex-col items-start max-w-[95%]">
                    <div class="bg-bg-secondary border border-border-color px-5 py-4 lg:px-6 lg:py-5 rounded-[4px_24px_24px_24px] lg:rounded-[4px_32px_32px_32px] text-[0.85rem] lg:text-[0.95rem] leading-relaxed text-text-primary shadow-sm relative">
                        <div class="absolute -left-2 top-0 w-4 h-4 bg-bg-secondary border-l border-t border-border-color -rotate-45"></div>
                        <p class="relative z-10">{{ displayGreeting }}</p>
                        <span class="block text-[0.6rem] lg:text-[0.65rem] text-text-tertiary font-bold mt-2 lg:mt-3 text-right uppercase tracking-[0.2em]">{{ currentTime }}</span>
                    </div>
                </div>
            </div>

            <!-- Inputs Area -->
            <div class="space-y-8">
                <div class="space-y-2">
                    <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Siapa Nama Anda?</label>
                    <div class="relative group">
                        <User :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors" />
                        <input
                            v-model="form.name"
                            type="text"
                            placeholder="Ex: John Doe"
                            class="w-full bg-bg-secondary border border-border-color rounded-2xl pl-14 pr-5 py-5 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 placeholder:text-text-tertiary shadow-inner"
                        />
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Pesan / Detail Pertanyaan</label>
                    <textarea
                        v-model="form.message"
                        placeholder="Ceritakan apa yang bisa saya bantu..."
                        rows="5"
                        class="w-full bg-bg-secondary border border-border-color rounded-2xl px-6 py-5 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 resize-none placeholder:text-text-tertiary shadow-inner"
                    ></textarea>
                </div>

                <!-- Action Button -->
                <div class="pt-4 lg:pt-8 pb-10 lg:pb-14 shrink-0 px-2 mt-auto">
                    <button
                        @click="handleSend"
                        :disabled="!form.name.trim() || !form.message.trim() || loading"
                        class="group w-full relative h-[64px] lg:h-[72px] bg-green-600 hover:bg-green-500 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[1rem] lg:text-lg transition-all active:scale-[0.98] overflow-hidden shadow-none"
                    >
                        <div class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                        
                        <div v-if="loading" class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <template v-else>
                            <Send :size="18" class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            <span>{{ actionText || 'Hubungkan ke WhatsApp' }}</span>
                        </template>
                    </button>
                    <p class="text-[0.55rem] lg:text-[0.65rem] text-text-tertiary text-center mt-4 lg:mt-6 uppercase tracking-widest font-bold opacity-40">Direct connection to personal business WhatsApp</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref, computed, watch, markRaw } from "vue";
import { 
  MessageSquare, 
  User, 
  Send, 
  Stethoscope,
  Home,
  BookOpen,
  Settings,
  Zap,
  HelpCircle
} from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";
import { useSiteSettings } from "../../composables/useSiteSettings";

const { settings } = useSiteSettings();

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
const currentTime = computed(() =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
);

const form = ref({
  name: props.initialName || "",
  message: "",
});

const displayGreeting = computed(() => {
  return (
    props.bubbleMessage ||
    "Halo! Saya siap membantu diskusi project Anda. Silakan isi pesan di bawah atau pilih template untuk terhubung langsung ke WhatsApp saya."
  );
});

// Templates Data
const templates = [
  { id: 'estimate', label: 'Minta Estimasi Biaya', category: 'Budgeting', icon: markRaw(Zap), text: 'Halo Kang Jessy, saya ingin minta estimasi biaya untuk pengembangan project saya.' },
  { id: 'dental', label: 'Klinik Gigi Digital', category: 'Medical', icon: markRaw(Stethoscope), text: 'Halo Kang Jessy, saya tertarik untuk mendigitalisasi klinik gigi saya. Apa saja langkah awalnya?' },
  { id: 'architect', label: 'Portfolio Arsitektur', category: 'Design', icon: markRaw(Home), text: 'Halo Kang Jessy, saya ingin membangun portfolio arsitektur premium agar terlihat lebih profesional.' },
  { id: 'lms', label: 'Sistem Kursus Online', category: 'Education', icon: markRaw(BookOpen), text: 'Halo Kang Jessy, saya ingin punya platform kursus online mandiri di domain saya sendiri.' },
  { id: 'custom', label: 'Sistem Kustom / ERP', category: 'Business', icon: markRaw(Settings), text: 'Halo Kang Jessy, saya butuh sistem manajemen operasional kustom untuk bisnis.' },
  { id: 'other', label: 'Pertanyaan Lainnya', category: 'General', icon: markRaw(HelpCircle), text: 'Halo Kang Jessy, ada beberapa hal yang ingin saya tanyakan terkait jasa pengembangan digital Anda.' }
];

const selectTemplate = (template: any) => {
  activeTemplateId.value = template.id;
  form.value.message = template.text;
};

// Set initial data when modal opens
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      form.value.message = props.initialMessage || settings.value.whatsappMsg;
      if (props.initialName) form.value.name = props.initialName;
      activeTemplateId.value = null;
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
