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
    <div class="flex flex-col lg:grid lg:grid-cols-12 bg-bg-primary h-[calc(100dvh-64px)] lg:h-[600px] lg:max-h-[75vh] overflow-hidden border-t border-border-color/50">
      
      <!-- Left Column: Templates (Independent Scroll) -->
      <div class="lg:col-span-4 bg-bg-secondary/50 border-b lg:border-b-0 lg:border-r border-border-color flex flex-col h-auto lg:h-full shrink-0 z-10 overflow-hidden">
        <div class="pt-6 lg:pt-16 pb-4 lg:pb-12 px-6 lg:px-8 overflow-y-auto custom-scrollbar lg:h-full">
            <div class="mb-4 lg:mb-8 shrink-0">
                <span class="hidden lg:block text-[0.65rem] font-black text-red-500 uppercase tracking-[0.4em] mb-3">Email Presets</span>
                <h3 class="text-xl lg:text-2xl font-black text-white leading-tight">Pilih Tujuan Email</h3>
                <p class="text-xs text-text-tertiary mt-2">Pilih template subjek untuk mempermudah kategorisasi pesan Anda.</p>
            </div>

            <div class="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden gap-3 pb-2 lg:pb-10 -mx-6 px-6 lg:mx-0 lg:px-0 custom-scrollbar">
                <button 
                    v-for="template in templates" 
                    :key="template.id"
                    @click="selectTemplate(template)"
                    class="min-w-[240px] lg:min-w-0 lg:w-full group text-left p-3 lg:p-4 rounded-2xl border border-border-color bg-bg-primary transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/5 hover:-translate-y-1 lg:hover:translate-x-1 lg:hover:-translate-y-0 flex items-center gap-3 lg:gap-4 shrink-0"
                    :class="{ 'border-red-500 bg-red-500/5 ring-1 ring-red-500/20': activeTemplateId === template.id }"
                >
                    <div class="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center text-text-tertiary group-hover:text-red-500 transition-colors">
                        <component :is="template.icon" :size="18" />
                    </div>
                    <div class="flex-1">
                        <h4 class="text-sm font-bold text-white leading-tight">{{ template.label }}</h4>
                        <p class="text-[9px] text-text-tertiary uppercase tracking-widest mt-1">{{ template.category }}</p>
                    </div>
                </button>
            </div>
        </div>
      </div>

      <!-- Right Column: Form (Independent Scroll) -->
      <div class="lg:col-span-8 flex-1 flex flex-col h-full overflow-hidden bg-bg-primary relative">
        <div class="flex-1 pt-6 lg:pt-16 pb-6 lg:pb-12 px-4 lg:px-12 overflow-y-auto custom-scrollbar">
            <div class="mb-8 lg:mb-10 shrink-0">
                <div class="flex flex-col items-start max-w-[95%]">
                    <div class="bg-bg-secondary border border-border-color px-5 py-4 lg:px-6 lg:py-5 rounded-[4px_24px_24px_24px] lg:rounded-[4px_32px_32px_32px] text-[0.85rem] lg:text-[0.95rem] leading-relaxed text-text-primary shadow-sm relative">
                        <div class="absolute -left-2 top-0 w-4 h-4 bg-bg-secondary border-l border-t border-border-color -rotate-45"></div>
                        <p>Halo! Silakan gunakan form atau template di samping untuk mengirimkan pesan email Anda. Saya akan membalas secepat mungkin.</p>
                        <span class="block text-[0.6rem] lg:text-[0.65rem] text-text-tertiary font-bold mt-2 lg:mt-3 text-right uppercase tracking-[0.2em]">{{ currentTime }}</span>
                    </div>
                </div>
            </div>

            <div class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Nama</label>
                        <input v-model="form.name" type="text" placeholder="John Doe" class="w-full bg-bg-secondary border border-border-color rounded-2xl px-5 py-5 text-text-primary text-sm outline-none transition-all focus:border-red-500/50 shadow-inner" />
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Email</label>
                        <input v-model="form.email" type="email" placeholder="john@email.com" class="w-full bg-bg-secondary border border-border-color rounded-2xl px-5 py-5 text-text-primary text-sm outline-none transition-all focus:border-red-500/50 shadow-inner" />
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Subject</label>
                    <input v-model="form.subject" type="text" placeholder="Subjek pesan Anda..." class="w-full bg-bg-secondary border border-border-color rounded-2xl px-5 py-5 text-text-primary text-sm outline-none transition-all focus:border-red-500/50 shadow-inner" />
                </div>

                <div class="space-y-2">
                    <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Message</label>
                    <textarea v-model="form.message" placeholder="Tulis detail proposal atau pertanyaan..." rows="5" class="w-full bg-bg-secondary border border-border-color rounded-2xl px-6 py-5 text-text-primary text-sm outline-none transition-all focus:border-red-500/50 resize-none shadow-inner"></textarea>
                </div>

                <!-- Action Button -->
                <div class="pt-4 lg:pt-8 pb-10 lg:pb-14 shrink-0 px-2 mt-auto">
                    <button
                        @click="handleSend"
                        :disabled="!isFormValid || loading"
                        class="group w-full relative h-[64px] lg:h-[72px] bg-red-600 hover:bg-red-500 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[1rem] lg:text-lg transition-all active:scale-[0.98] overflow-hidden shadow-none"
                    >
                        <div class="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                        
                        <div v-if="loading" class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <template v-else>
                            <SendIcon :size="18" />
                            <span>Kirim Email Sekarang</span>
                        </template>
                    </button>
                    <!-- Small disclaimer under button matching WA Modal -->
                    <p class="text-[0.55rem] lg:text-[0.65rem] text-text-tertiary text-center mt-4 lg:mt-6 uppercase tracking-widest font-bold opacity-40">Direct connection to personal email</p>
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
  Mail as MailIcon, 
  Send as SendIcon, 
  Briefcase, 
  FileText, 
  Mic, 
  AlertCircle, 
  BookOpen
} from "lucide-vue-next";
import { BottomSheet } from "@kangjessy/ui";
import { useSiteSettings } from "../../composables/useSiteSettings";

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

// Email Templates
const templates = [
  { id: 'partnership', label: 'Penawaran Kerjasama', category: 'Business', icon: markRaw(Briefcase), subject: '[Partnership] Penawaran Kerjasama Strategis', body: 'Halo Kang Jessy,\n\nSaya tertarik untuk bekerja sama dalam bidang pengembangan digital. Bisnis saya bergerak di bidang...' },
  { id: 'proposal', label: 'Permintaan Proposal', category: 'Project', icon: markRaw(FileText), subject: '[Request] Permintaan Proposal Project Digital', body: 'Halo Kang Jessy,\n\nKami sedang merencanakan sebuah project pengembangan sistem. Mohon info ketersediaan slot dan estimasi awal untuk spesifikasi berikut...' },
  { id: 'speaker', label: 'Undangan Mentor/Speaker', category: 'Event', icon: markRaw(Mic), subject: '[Invitations] Undangan Menjadi Mentor/Speaker', body: 'Halo Kang Jessy,\n\nKami melihat antusiasme Anda di bidang Agentic AI dan pengembangan digital. Kami ingin mengundang Anda dalam event kami yang akan diadakan pada...' },
  { id: 'feedback', label: 'Laporan & Feedback', category: 'Quality', icon: markRaw(AlertCircle), subject: '[Feedback] Masukan Untuk Website/Layanan', body: 'Halo Kang Jessy,\n\nSaya ingin memberikan masukan terkait website/layanan Anda. Secara keseluruhan sudah bagus, namun ada beberapa hal yang bisa ditingkatkan...' },
  { id: 'course', label: 'Tanya Kursus/Coaching', category: 'Education', icon: markRaw(BookOpen), subject: '[Education] Pertanyaan Terkait Program Kursus', body: 'Halo Kang Jessy,\n\nSaya tertarik untuk mengikuti program kursus atau private coaching yang Anda tawarkan. Bagaimana teknis pendaftaran dan kurikulumnya?' }
];

const selectTemplate = (t: any) => {
  activeTemplateId.value = t.id;
  form.value.subject = t.subject;
  form.value.message = t.body;
};

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      if (props.initialSubject) form.value.subject = props.initialSubject;
      activeTemplateId.value = null;
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
