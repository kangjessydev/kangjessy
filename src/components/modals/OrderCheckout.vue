<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="handleClose"></div>

        <!-- Modal Panel -->
        <Transition name="modal-pop">
          <div
            v-if="isOpen"
            class="relative w-full max-w-5xl max-h-[92vh] bg-bg-secondary border border-border-color/80 rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.6)] flex overflow-hidden"
          >
            <!-- Close button — floating outside the modal at top-right -->
            <button
              @click="handleClose"
              class="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-bg-tertiary border border-border-color hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all z-30 flex items-center justify-center group shadow-lg"
            >
              <XIcon :size="18" class="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <!-- ===== LEFT PANEL: Plan Info ===== -->
            <div class="hidden md:flex flex-col justify-between w-[38%] shrink-0 bg-linear-to-br from-accent-primary/20 via-accent-primary/5 to-bg-secondary p-10 border-r border-border-color/50 relative">
              <!-- Decorative glow -->
              <div class="absolute -top-20 -left-20 w-64 h-64 bg-accent-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
              <div class="absolute -bottom-20 -right-20 w-48 h-48 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

              <!-- Top: Brand -->
              <div class="relative z-10">
                <span class="inline-block px-3 py-1 bg-accent-primary/15 text-accent-primary text-[0.65rem] font-black rounded-full uppercase tracking-widest mb-5">
                  Checkout Order
                </span>
                <h2 class="text-xl font-bold text-text-primary leading-tight">Mulai Proyek<br/>Anda Sekarang</h2>
              </div>

              <!-- Plan: LOCKED (pre-selected from PricingSwitcher) -->
              <div v-if="props.plan" class="relative z-10 my-6 p-4 rounded-[18px] bg-bg-primary/50 border border-accent-primary/20 backdrop-blur-sm">
                <div class="flex items-center justify-between mb-1.5">
                  <h4 class="text-accent-primary font-black uppercase text-[0.6rem] tracking-widest">Paket Dipilih</h4>
                  <span class="text-[0.55rem] text-text-tertiary font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full">Terkunci</span>
                </div>
                <h3 class="text-base font-bold text-text-primary">{{ props.plan.name }}</h3>
                <div class="mt-3 pt-3 border-t border-border-color/50 flex items-baseline gap-2">
                  <span class="text-xl font-black text-text-primary">Rp {{ props.plan.price || '—' }}</span>
                  <span class="text-xs text-text-tertiary">{{ props.plan.price ? '/ Project' : 'Custom' }}</span>
                </div>
                <p v-if="props.plan.originalPrice" class="text-xs text-text-tertiary mt-1 flex items-center justify-start gap-2">
                  <span class="line-through opacity-60">Was Rp {{ props.plan.originalPrice }}</span>
                  <span v-if="calculateDiscount(props.plan.originalPrice, props.plan.price) > 0" class="font-bold text-accent-primary bg-accent-primary/10 px-1.5 py-0.5 rounded text-[0.6rem]">-{{ calculateDiscount(props.plan.originalPrice, props.plan.price) }}%</span>
                </p>
              </div>

              <!-- Plan: CUSTOM DROPDOWN (no pre-selection) -->
              <div v-else class="relative z-20 my-6" ref="dropdownRef">
                <h4 class="text-accent-primary font-black uppercase text-[0.6rem] tracking-widest mb-2">Pilih Paket</h4>

                <!-- Collapsed: show empty prompt -->
                <button
                  v-if="!selectedPlan"
                  @click="isDropdownOpen = !isDropdownOpen"
                  class="w-full flex items-center justify-between gap-3 p-4 rounded-[18px] bg-bg-primary/50 border transition-all duration-200 text-left"
                  :class="isDropdownOpen ? 'border-accent-primary/50' : 'border-border-color/50 hover:border-accent-primary/30'"
                >
                  <span class="block text-sm text-text-tertiary">Pilih paket terlebih dahulu...</span>
                  <ChevronDownIcon :size="16" class="text-text-tertiary shrink-0 transition-transform duration-200" :class="isDropdownOpen ? 'rotate-180 text-accent-primary' : ''" />
                </button>

                <!-- Selected: show plan card (same as locked) with change button -->
                <div v-else class="p-4 rounded-[18px] bg-bg-primary/50 border border-accent-primary/20">
                  <div class="flex items-center justify-between mb-1.5">
                    <h4 class="text-accent-primary font-black uppercase text-[0.6rem] tracking-widest">Paket Dipilih</h4>
                    <button @click="isDropdownOpen = !isDropdownOpen" class="text-[0.55rem] text-accent-primary font-bold uppercase tracking-wider hover:underline">
                      Ganti ▾
                    </button>
                  </div>
                  <h3 class="text-base font-bold text-text-primary">{{ selectedPlan.name }}</h3>
                  <div class="mt-3 pt-3 border-t border-border-color/50 flex items-baseline gap-2">
                    <span class="text-xl font-black text-text-primary">Rp {{ selectedPlan.price }}</span>
                    <span class="text-xs text-text-tertiary">/ Project</span>
                  </div>
                  <p v-if="selectedPlan.originalPrice" class="text-xs text-text-tertiary mt-1 flex items-center gap-2">
                    <span class="line-through opacity-60">Was Rp {{ selectedPlan.originalPrice }}</span>
                    <span v-if="calculateDiscount(selectedPlan.originalPrice, selectedPlan.price) > 0" class="font-bold text-accent-primary bg-accent-primary/10 px-1.5 py-0.5 rounded text-[0.6rem]">-{{ calculateDiscount(selectedPlan.originalPrice, selectedPlan.price) }}%</span>
                  </p>
                </div>

                <!-- Dropdown Options -->
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 -translate-y-2 scale-95"
                  enter-to-class="opacity-100 translate-y-0 scale-100"
                  leave-active-class="transition duration-150 ease-in"
                  leave-from-class="opacity-100 translate-y-0 scale-100"
                  leave-to-class="opacity-0 -translate-y-2 scale-95"
                >
                  <div
                    v-if="isDropdownOpen"
                    class="dropdown-list absolute left-0 right-0 mt-2 rounded-[18px] overflow-hidden shadow-2xl z-50 border border-border-color"
                  >
                    <div class="max-h-[240px] overflow-y-auto custom-scrollbar divide-y divide-border-color/50">
                      <div v-for="group in planGroups" :key="group.label">
                        <p class="px-4 pt-3 pb-1 text-[0.6rem] font-black uppercase tracking-widest text-text-tertiary">{{ group.label }}</p>
                      <button
                        v-for="p in group.plans"
                        :key="p.id"
                        @click="selectPlan(p)"
                        class="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-all hover:bg-accent-primary/10 last:pb-3"
                        :class="selectedPlan?.id === p.id ? 'bg-accent-primary/10' : ''"
                      >
                        <span class="text-sm font-semibold" :class="selectedPlan?.id === p.id ? 'text-accent-primary' : 'text-text-primary'">{{ p.name }}</span>
                        <div class="flex flex-col items-end shrink-0">
                          <span class="text-xs font-bold" :class="selectedPlan?.id === p.id ? 'text-accent-primary' : 'text-text-secondary'">Rp {{ p.price }}</span>
                          <div v-if="p.originalPrice" class="flex items-center gap-1.5 mt-0.5">
                            <span class="text-[0.6rem] text-text-tertiary line-through opacity-60">Rp {{ p.originalPrice }}</span>
                            <span v-if="calculateDiscount(p.originalPrice, p.price) > 0" class="text-accent-primary bg-accent-primary/10 px-1 py-px rounded-[4px] font-bold text-[0.55rem]">-{{ calculateDiscount(p.originalPrice, p.price) }}%</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
              </div>

              <!-- Trust signals (compact) -->
              <div class="relative z-10 space-y-2.5 mt-auto">
                <div v-for="trust in trustItems" :key="trust.text" class="flex items-center gap-2.5">
                  <component :is="trust.icon" :size="14" class="text-accent-primary shrink-0" />
                  <span class="text-[0.72rem] text-text-secondary">{{ trust.text }}</span>
                </div>
              </div>
            </div>

            <!-- ===== RIGHT PANEL: Form ===== -->
            <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
              <!-- Scrollable form area -->
              <div class="grow overflow-y-auto px-8 pt-8 pb-6 custom-scrollbar">

                <!-- Mobile-only header -->
                <div class="md:hidden mb-6">
                  <span class="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-[0.65rem] font-black rounded-full uppercase tracking-widest mb-3">Checkout Order</span>
                  <h2 class="text-xl font-bold text-text-primary">Mulai Proyek Anda</h2>
                </div>

                <!-- Plan summary (mobile only) -->
                <div v-if="plan" class="md:hidden p-4 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 mb-6">
                  <p class="text-xs text-accent-primary font-bold uppercase tracking-widest mb-1">Paket: {{ plan.name }}</p>
                  <p class="text-xl font-black text-text-primary">Rp {{ plan.price || 'Custom' }}</p>
                </div>

                <div class="space-y-5">
                  <!-- Row 1 -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary">Nama Lengkap</label>
                      <input v-model="form.name" type="text" placeholder="Jessy Kang" class="form-input" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary">WhatsApp / Phone</label>
                      <input v-model="form.phone" type="tel" placeholder="08123xxxx" class="form-input" />
                    </div>
                  </div>

                  <!-- Row 2 -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary">Email</label>
                      <input v-model="form.email" type="email" placeholder="jessy@example.com" class="form-input" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary">Brand / Perusahaan <span class="normal-case font-normal">(opsional)</span></label>
                      <input v-model="form.company" type="text" placeholder="Nama brand Anda" class="form-input" />
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary">Brief Singkat</label>
                    <textarea
                      v-model="form.brief"
                      rows="3"
                      placeholder="Ceritakan kebutuhan utama Anda (fitur, referensi desain, target audience, dll)..."
                      class="form-input resize-none"
                    ></textarea>
                  </div>

                  <!-- Trust note -->
                  <div class="flex items-start gap-3 p-3.5 bg-white/3 rounded-2xl border border-border-color/50">
                    <ShieldCheckIcon :size="16" class="text-green-500 shrink-0 mt-0.5" />
                    <p class="text-[0.72rem] text-text-secondary leading-relaxed">
                      Data dikirim aman ke Google Sheet. Kami hubungi Anda via WhatsApp setelah ini.
                    </p>
                  </div>
                </div>
              </div>

              <div class="px-8 py-4 border-t border-border-color/50 shrink-0">
                <button
                  @click="handleSubmit"
                  :disabled="!isFormValid || loading"
                  class="checkout-btn group"
                >
                  <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <template v-else>
                    <RocketIcon :size="18" class="mr-2" />
                    <span>Kirim Pesanan & WhatsApp</span>
                    <ArrowRightIcon :size="18" class="group-hover:translate-x-1 transition-transform ml-2" />
                  </template>
                </button>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onUnmounted } from 'vue';
import { X as XIcon, ShieldCheck as ShieldCheckIcon, ArrowRight as ArrowRightIcon, ChevronDown as ChevronDownIcon, Shield, Zap, Rocket as RocketIcon } from 'lucide-vue-next';
import WhatsappIcon from '../icons/WhatsappIcon.vue';
import { clientService } from '../../services/clientService';
import { useToast } from '../../composables/useToast';
import { useSiteSettings } from '../../composables/useSiteSettings';
import { developmentPlans, maintenancePlans, type PricingPlan } from '../../data/landing/pricing';

const props = defineProps<{
  isOpen: boolean;
  plan?: PricingPlan | null;
}>();

const emit = defineEmits(['close']);

const toast = useToast();
const { settings } = useSiteSettings();
const loading = ref(false);
const isDropdownOpen = ref(false);
const selectedPlan = ref<PricingPlan | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

// Active plan: locked from props OR manually selected
const activePlan = computed(() => props.plan || selectedPlan.value);

// Plan groups for the dropdown
const planGroups = [
  { label: 'Digital Development', plans: developmentPlans },
  {
    label: 'Maintenance (Monthly)',
    plans: maintenancePlans.map(p => ({
      id: p.id, name: p.name, price: p.monthlyPrice,
      description: p.description, ctaText: p.ctaText,
      features: p.features.map(f => ({ text: f, included: true })),
    })) as PricingPlan[]
  },
];

const selectPlan = (p: PricingPlan) => {
  selectedPlan.value = p;
  isDropdownOpen.value = false;
};

const calculateDiscount = (original?: string, current?: string) => {
  if (!original || !current) return 0;
  const orig = parseInt(original.replace(/\./g, ''));
  const curr = parseInt(current.replace(/\./g, ''));
  if (orig && curr && orig > curr) {
    return Math.round(((orig - curr) / orig) * 100);
  }
  return 0;
};

const trustItems = [
  { icon: Shield, text: 'Data Anda 100% aman & tidak dibagikan' },
  { icon: Zap, text: 'Respon WA dalam 1-3 jam kerja' },
  { icon: WhatsappIcon, text: 'Konsultasi awal gratis, tanpa komitmen' },
];

const form = reactive({ name: '', email: '', phone: '', company: '', brief: '' });

const isFormValid = computed(() =>
  form.name.length > 2 && (form.email.includes('@') || form.phone.length > 8)
);

watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    selectedPlan.value = null;
    isDropdownOpen.value = false;
  }
});

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
  }
};
onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));

const handleClose = () => {
  if (loading.value) return;
  emit('close');
};

const handleSubmit = async () => {
  if (!isFormValid.value || loading.value) return;
  loading.value = true;
  try {
    await clientService.addLead({
      name: form.name, email: form.email, phone: form.phone, company: form.company,
      type: 'project_order', status: 'New',
      project_type: activePlan.value?.id || 'Custom',
      budget: parseInt((activePlan.value?.price ?? '').replace(/\./g, '') || '0'),
      brief: form.brief, source: 'Direct Checkout'
    });
    toast.success('Data berhasil tercatat di sistem!');
    const msg = `Halo KangJessy! Saya ${form.name}.\n\nSaya ingin memesan paket: *${activePlan.value?.name || 'Custom Project'}*\n\n*Brief:* ${form.brief || 'Diskusi lebih lanjut via WA'}\n\nMohon bantuannya kak!`;
    const waUrl = `https://wa.me/${settings.value.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setTimeout(() => {
      loading.value = false;
      handleClose();
      Object.assign(form, { name: '', email: '', phone: '', company: '', brief: '' });
      selectedPlan.value = null;
    }, 500);
  } catch {
    toast.error('Gagal mengirim data. Silakan coba lagi.');
    loading.value = false;
  }
};
</script>

<style scoped>
@reference "../../style.css";

.form-input {
  @apply w-full bg-bg-primary border border-border-color rounded-2xl px-4 py-3 text-text-primary text-[0.9rem] outline-none transition-all focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 placeholder:text-text-tertiary;
}

.checkout-btn {
  @apply w-full bg-accent-primary hover:bg-accent-primary/90 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white py-4 rounded-2xl flex items-center justify-center font-black text-base transition-all active:scale-[0.98] shadow-xl shadow-accent-primary/20 disabled:shadow-none;
}

/* Solid opaque background - prevents bleed-through */
.dropdown-list {
  background-color: var(--color-bg-primary, #0f1117);
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-pop-enter-active { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-pop-leave-active { transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.7, 0, 0.84, 0); }
.modal-pop-enter-from, .modal-pop-leave-to { opacity: 0; transform: scale(0.94) translateY(16px); }
</style>
