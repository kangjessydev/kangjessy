<template>
  <Teleport to="body">
    <!-- ===== DESKTOP MODAL ===== -->
    <Transition name="fade">
      <div v-if="isOpen && isDesktop" class="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="handleClose"></div>

        <!-- Modal Panel -->
        <Transition name="modal-pop">
          <div
            v-if="isOpen && isDesktop"
            class="relative w-full max-w-5xl max-h-[92vh] bg-bg-secondary border border-border-color/80 rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden overscroll-none"
          >
            <!-- Close button -->
            <button
              @click="handleClose"
              class="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-bg-tertiary border border-border-color hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all z-30 flex items-center justify-center group shadow-lg"
            >
              <XIcon :size="18" class="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <!-- LEFT PANEL: Plan Info -->
            <div class="hidden md:flex flex-col w-[40%] lg:w-[38%] shrink-0 bg-linear-to-br from-accent-primary/20 via-accent-primary/5 to-bg-secondary p-8 lg:p-10 border-r border-border-color/50 relative overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-contain">
              <!-- Decorative glow -->
              <div class="absolute -top-20 -left-20 w-64 h-64 bg-accent-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
              <div class="absolute -bottom-20 -right-20 w-48 h-48 bg-accent-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

              <!-- Top: Brand -->
              <div class="relative z-10">
                <span class="inline-block px-3 py-1 bg-accent-primary/15 text-accent-primary text-[0.65rem] font-black rounded-full uppercase tracking-widest mb-4 lg:mb-5">
                  Checkout Summary
                </span>
                <h2 class="text-xl lg:text-2xl font-bold text-text-primary leading-tight tracking-tight">Otomasi Bisnis<br/>Dimulai Dari Sini</h2>
              </div>

              <!-- Plan Display -->
              <div v-if="activePlan" class="relative z-10 my-6 p-4 lg:p-5 rounded-[22px] bg-bg-primary/50 border border-accent-primary/20 backdrop-blur-sm shadow-xl">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-accent-primary font-black uppercase text-[0.6rem] tracking-[0.2em] opacity-80">Paket Dipilih</h4>
                  <template v-if="props.plan">
                      <span class="text-[0.55rem] text-text-tertiary font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">Locked</span>
                  </template>
                  <template v-else>
                      <button @click="selectedPlan = null" class="text-[0.55rem] text-accent-primary font-bold uppercase tracking-wider hover:underline">Ganti Paket</button>
                  </template>
                </div>

                <h3 class="text-lg lg:text-xl font-bold text-text-primary">{{ activePlan.name }}</h3>
                <p class="text-[0.72rem] lg:text-[0.8rem] text-text-tertiary leading-relaxed mt-2 line-clamp-2 opacity-80">{{ activePlan.description }}</p>
                
                <div class="mt-4 pt-4 border-t border-border-color/30">
                    <div class="flex items-baseline gap-2 mb-1">
                        <span class="text-2xl font-black text-text-primary tracking-tight">Rp {{ activePlan.price || '—' }}</span>
                        <span class="text-[0.7rem] text-text-tertiary font-medium">{{ activePlan.price ? getFrequencyLabel(activePlan.billingCycle) : 'Custom' }}</span>
                    </div>
                    <!-- Original Price display -->
                    <div v-if="activePlan.originalPrice" class="flex items-center gap-2 mb-1">
                        <span class="text-[0.65rem] text-text-tertiary line-through opacity-70 font-medium">Was Rp {{ activePlan.originalPrice }}</span>
                        <span v-if="calculateDiscount(activePlan.originalPrice, activePlan.price) > 0" class="text-[0.6rem] font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-md leading-none">-{{ calculateDiscount(activePlan.originalPrice, activePlan.price) }}%</span>
                    </div>
                </div>

                <!-- Accordion Toggle Button (Above the list) -->
                <button 
                  v-if="activePlan.features?.length" 
                  @click="isFeaturesExpanded = !isFeaturesExpanded"
                  class="mt-5 text-[0.7rem] font-bold text-accent-primary flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-widest bg-accent-primary/10 px-3 py-1.5 rounded-full inline-flex w-fit"
                >
                  <span>{{ isFeaturesExpanded ? 'Tutup Benefit' : 'Lihat Benefit Paket' }}</span>
                  <ChevronDownIcon 
                    :size="14" 
                    class="transition-transform duration-300" 
                    :class="isFeaturesExpanded ? 'rotate-180' : ''" 
                  />
                </button>

                <!-- Feature List (Opens when clicked) -->
                <Transition
                  enter-active-class="transition-[max-height,opacity] duration-300 ease-out"
                  leave-active-class="transition-[max-height,opacity] duration-200 ease-in"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-[500px] opacity-100"
                  leave-from-class="max-h-[500px] opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <ul v-show="isFeaturesExpanded" class="mt-4 space-y-1.5 overflow-hidden">
                    <li 
                      v-for="f in activePlan.features" 
                      :key="typeof f === 'string' ? f : f.text" 
                      class="flex items-center gap-2.5 py-0.5"
                    >
                        <CheckCircle :size="14" class="text-accent-primary shrink-0" />
                        <div class="flex-1">
                            <span class="text-[0.68rem] lg:text-[0.75rem] font-medium text-text-secondary leading-tight">{{ typeof f === 'string' ? f : f.text }}</span>
                        </div>
                    </li>
                  </ul>
                </Transition>
              </div>

              <!-- Plan Dropdown -->
              <div v-else class="relative z-20 my-6" ref="dropdownRef">
                <h4 class="text-accent-primary font-black uppercase text-[0.6rem] tracking-widest mb-3 px-1">Pilih Paket</h4>
                <button
                  @click="isDropdownOpen = !isDropdownOpen"
                  class="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-bg-primary/50 border border-border-color/50 hover:border-accent-primary/40 transition-all text-left group"
                >
                  <span class="block text-[0.85rem] text-text-tertiary group-hover:text-text-secondary transition-colors">Telusuri paket tersedia...</span>
                  <ChevronDownIcon :size="16" class="text-accent-primary transition-transform duration-300" :class="isDropdownOpen ? 'rotate-180' : ''" />
                </button>

                <!-- Dropdown List -->
                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="opacity-0 -translate-y-2 scale-95"
                  enter-to-class="opacity-100 translate-y-0 scale-100"
                >
                  <div v-if="isDropdownOpen" class="dropdown-list absolute left-0 right-0 mt-3 rounded-2xl overflow-hidden shadow-2xl z-50 border border-border-color bg-bg-secondary/95 backdrop-blur-xl">
                    <div class="max-h-[300px] overflow-y-auto custom-scrollbar divide-y divide-border-color/50">
                      <div v-for="group in planGroups" :key="group.label">
                        <div class="px-5 pt-4 pb-1 text-[0.55rem] font-black uppercase tracking-[0.2em] text-accent-primary opacity-60">{{ group.label }}</div>
                        <button
                          v-for="p in group.plans"
                          :key="p.id"
                          @click="selectPlan(p)"
                          class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-all hover:bg-accent-primary/10 group/item"
                        >
                          <span class="text-sm font-bold text-text-primary group-hover/item:text-accent-primary transition-colors">{{ p.name }}</span>
                          <span class="text-xs font-black text-text-secondary">Rp {{ p.price }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- Trust signals (compact) -->
              <div class="relative z-10 space-y-3 mt-auto pt-6">
                <div v-for="trust in trustItems" :key="trust.text" class="flex items-center gap-3 group">
                  <div class="w-7 h-7 rounded-lg bg-accent-primary/5 flex items-center justify-center text-accent-primary shrink-0 transition-transform group-hover:scale-110">
                      <component :is="trust.icon" :size="14" />
                  </div>
                  <span class="text-[0.72rem] text-text-secondary font-medium tracking-wide">{{ trust.text }}</span>
                </div>
              </div>
            </div>

            <!-- RIGHT PANEL: Form -->
            <div class="flex flex-col flex-1 min-w-0 overflow-hidden bg-bg-primary">
              <!-- Scrollable form area -->
              <div class="grow overflow-y-auto px-6 pt-6 sm:px-8 sm:pt-10 md:px-12 md:pt-12 pb-8 custom-scrollbar overscroll-contain">
                
                <!-- Header (Responsive) -->
                <div class="mb-10">
                   <div class="flex items-center gap-2 mb-3">
                       <div class="w-8 h-px bg-accent-primary"></div>
                       <span class="text-[0.65rem] font-black text-accent-primary uppercase tracking-[0.4em]">Checkout Details</span>
                   </div>
                   <h2 class="text-2xl font-black text-white tracking-tight leading-tight">Konfigurasi Proyek</h2>
                   <p class="text-[0.85rem] text-text-tertiary mt-2">Lengkapi data di bawah agar kami bisa langsung menghubungi Anda.</p>
                </div>

                <div class="space-y-6">
                  <!-- Row 1 -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Nama Lengkap</label>
                      <div class="relative group">
                          <User :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" />
                          <input v-model="form.name" type="text" placeholder="John Doe" class="form-input" />
                      </div>
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">WhatsApp / Phone</label>
                      <div class="relative group">
                          <Phone :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" />
                          <input v-model="form.phone" type="tel" placeholder="0812xxxxxxxx" class="form-input" />
                      </div>
                    </div>
                  </div>

                  <!-- Row 2 -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Email Aktif</label>
                      <div class="relative group">
                          <Mail :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" />
                          <input v-model="form.email" type="email" placeholder="john@example.com" class="form-input" />
                      </div>
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Brand <span class="capitalize opacity-50 font-normal">(opsional)</span></label>
                      <div class="relative group">
                          <Building :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" />
                          <input v-model="form.company" type="text" placeholder="Nama brand / PT" class="form-input" />
                      </div>
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Ceritakan Kebutuhan Anda</label>
                    <textarea
                      v-model="form.brief"
                      rows="4"
                      placeholder="Apa masalah utama atau fitur yang harus ada di website Anda?"
                      class="form-input !pl-5 resize-none pt-4"
                    ></textarea>
                  </div>

                  <!-- Security Note -->
                  <div class="flex items-start gap-4 p-5 bg-white/2 rounded-2xl border border-border-color/50">
                    <ShieldCheck :size="18" class="text-green-500 shrink-0 mt-0.5" />
                    <p class="text-[0.72rem] text-text-secondary leading-relaxed">
                      Data Anda dikirim secara privat & aman. Kami akan membalas via WhatsApp dalam selang waktu paling lambat 3 jam kerja.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Footer Button -->
              <div class="px-8 sm:px-12 py-6 border-t border-border-color/50 shrink-0">
                <button
                  @click="handleSubmit"
                  :disabled="!isFormValid || loading || !activePlan"
                  class="checkout-btn group relative h-16 overflow-hidden"
                >
                  <div v-if="loading" class="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <template v-else>
                    <RocketIcon :size="20" class="mr-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span class="text-lg font-black tracking-tight">{{ activePlan ? 'Kirim & Mulai Chat' : 'Harap Pilih Paket' }}</span>
                  </template>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- ===== MOBILE BOTTOM SHEET ===== -->
    <BottomSheet
      v-if="!isDesktop && isOpen"
      :modelValue="isOpen"
      title="Checkout Order"
      :icon="RocketIcon"
      maxWidth="5xl"
      contentClass="!p-0 !overflow-hidden"
      fullHeight
      @update:modelValue="handleCloseWrapper"
    >
      <div class="flex flex-col h-full bg-bg-primary overflow-hidden">
        <!-- Scrollable form area -->
        <div class="grow overflow-y-auto px-6 pt-6 pb-8 custom-scrollbar overscroll-contain">
          <!-- Mobile summary -->
          <div v-if="activePlan" class="p-5 rounded-2xl bg-accent-primary/5 border border-accent-primary/20 mb-8 mt-2">
              <div class="flex items-center justify-between mb-2">
                  <span class="text-[0.6rem] font-bold text-accent-primary uppercase tracking-widest">Plan Selected</span>
                  <span class="text-white font-black text-sm">Rp {{ activePlan.price }}</span>
              </div>
              <h3 class="font-bold text-white">{{ activePlan.name }}</h3>

              <!-- Optional Original Price for mobile -->
              <div v-if="activePlan.originalPrice" class="flex items-center gap-2 mt-2">
                  <span class="text-[0.65rem] text-text-tertiary line-through opacity-70 font-medium">Was Rp {{ activePlan.originalPrice }}</span>
                  <span v-if="calculateDiscount(activePlan.originalPrice, activePlan.price) > 0" class="text-[0.6rem] font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-md leading-none">-{{ calculateDiscount(activePlan.originalPrice, activePlan.price) }}%</span>
              </div>

              <!-- Accordion Toggle Button (Mobile) -->
              <button 
                v-if="activePlan.features?.length" 
                @click="isFeaturesExpanded = !isFeaturesExpanded"
                class="mt-4 text-[0.65rem] font-bold text-accent-primary flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-widest bg-accent-primary/10 px-3 py-1.5 rounded-full w-fit"
              >
                <span>{{ isFeaturesExpanded ? 'Tutup Benefit' : 'Lihat Benefit Paket' }}</span>
                <ChevronDownIcon 
                  :size="12" 
                  class="transition-transform duration-300" 
                  :class="isFeaturesExpanded ? 'rotate-180' : ''" 
                />
              </button>

              <!-- Feature List (Mobile) -->
              <Transition
                enter-active-class="transition-[max-height,opacity] duration-300 ease-out"
                leave-active-class="transition-[max-height,opacity] duration-200 ease-in"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-[500px] opacity-100"
                leave-from-class="max-h-[500px] opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <ul v-show="isFeaturesExpanded" class="mt-4 space-y-2 overflow-hidden border-t border-accent-primary/10 pt-4">
                  <li 
                    v-for="f in activePlan.features" 
                    :key="typeof f === 'string' ? f : f.text" 
                    class="flex items-center gap-2.5 py-0.5"
                  >
                      <CheckCircle :size="14" class="text-accent-primary shrink-0" />
                      <span class="text-[0.7rem] font-medium text-text-secondary leading-tight flex-1">{{ typeof f === 'string' ? f : f.text }}</span>
                  </li>
                </ul>
              </Transition>
          </div>

          <div v-else class="mb-8 mt-2 relative z-20" ref="dropdownRef">
            <h4 class="text-accent-primary font-black uppercase text-[0.6rem] tracking-widest mb-3 px-1">Pilih Paket</h4>
            <button
              @click="isDropdownOpenMobile = !isDropdownOpenMobile"
              class="w-full flex items-center justify-between gap-3 p-4 rounded-2xl bg-bg-primary/50 border border-border-color/50 hover:border-accent-primary/40 transition-all text-left"
            >
              <span class="block text-[0.85rem] text-text-tertiary">Telusuri paket tersedia...</span>
              <ChevronDownIcon :size="16" class="text-accent-primary transition-transform duration-300" :class="isDropdownOpenMobile ? 'rotate-180' : ''" />
            </button>

            <!-- Dropdown List -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
            >
              <div v-if="isDropdownOpenMobile" class="absolute left-0 right-0 mt-3 rounded-2xl overflow-hidden shadow-2xl z-50 border border-border-color bg-bg-secondary/95 backdrop-blur-xl">
                <div class="max-h-[300px] overflow-y-auto custom-scrollbar divide-y divide-border-color/50">
                  <div v-for="group in planGroups" :key="group.label">
                    <div class="px-5 pt-4 pb-1 text-[0.55rem] font-black uppercase tracking-[0.2em] text-accent-primary opacity-60">{{ group.label }}</div>
                    <button
                      v-for="p in group.plans"
                      :key="p.id"
                      @click="selectPlanMobile(p)"
                      class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-all hover:bg-accent-primary/10"
                    >
                      <span class="text-sm font-bold text-text-primary">{{ p.name }}</span>
                      <span class="text-xs font-black text-text-secondary">Rp {{ p.price }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <div class="space-y-5">
            <div class="space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Nama Lengkap</label>
              <div class="relative group">
                  <User :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  <input v-model="form.name" type="text" placeholder="John Doe" class="form-input" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">WhatsApp / Phone</label>
              <div class="relative group">
                  <Phone :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  <input v-model="form.phone" type="tel" placeholder="0812xxxxxxxx" class="form-input" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Email Aktif</label>
              <div class="relative group">
                  <Mail :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  <input v-model="form.email" type="email" placeholder="john@example.com" class="form-input" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Brand <span class="capitalize opacity-50 font-normal">(opsional)</span></label>
              <div class="relative group">
                  <Building :size="18" class="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  <input v-model="form.company" type="text" placeholder="Nama brand / PT" class="form-input" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary px-1">Ceritakan Kebutuhan Anda</label>
              <textarea
                v-model="form.brief"
                rows="4"
                placeholder="Apa masalah utama atau fitur yang harus ada di website Anda?"
                class="form-input !pl-5 resize-none pt-4"
              ></textarea>
            </div>

            <!-- Security Note -->
            <div class="flex items-start gap-4 p-5 bg-white/2 rounded-2xl border border-border-color/50">
              <ShieldCheck :size="18" class="text-green-500 shrink-0 mt-0.5" />
              <p class="text-[0.72rem] text-text-secondary leading-relaxed">
                Data Anda dikirim secara privat & aman. Kami akan membalas via WhatsApp secepatnya.
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Button -->
        <div class="px-6 py-6 border-t border-border-color/50 shrink-0">
          <button
            @click="handleSubmit"
            :disabled="!isFormValid || loading || !activePlan"
            class="checkout-btn relative h-14 overflow-hidden"
          >
            <div v-if="loading" class="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
            <template v-else>
              <RocketIcon :size="20" class="mr-3" />
              <span class="text-base font-black tracking-tight">{{ activePlan ? 'Kirim & Mulai Chat' : 'Harap Pilih Paket' }}</span>
            </template>
          </button>
        </div>
      </div>
    </BottomSheet>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, markRaw, onMounted, onUnmounted } from 'vue';
import { 
    X as XIcon, 
    ShieldCheck, 
    ChevronDown as ChevronDownIcon, 
    Shield, 
    Zap, 
    Rocket as RocketIcon, 
    CheckCircle,
    User,
    Phone,
    Mail,
    Building
} from 'lucide-vue-next';
import { BottomSheet } from '@kangjessy/ui';
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
const isDropdownOpenMobile = ref(false);
const selectedPlan = ref<PricingPlan | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

// Responsive check
const isDesktop = ref(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
const updateBreakpoint = () => {
    isDesktop.value = window.innerWidth >= 1024;
};

// Accordion feature toggle
const isFeaturesExpanded = ref(false);

const activePlan = computed(() => props.plan || selectedPlan.value);

const planGroups = [
  { label: 'Digital Development', plans: developmentPlans },
  {
    label: 'Maintenance (Subscription)',
    plans: maintenancePlans.map(p => ({
      id: p.id, name: p.name, price: p.monthlyPrice,
      description: p.description, ctaText: p.ctaText,
      features: p.features.map(f => ({ text: f, included: true })),
      billingCycle: 'monthly'
    })) as PricingPlan[]
  },
];

const selectPlan = (p: PricingPlan) => {
  selectedPlan.value = p;
  isDropdownOpen.value = false;
  isFeaturesExpanded.value = false;
};
const selectPlanMobile = (p: PricingPlan) => {
  selectedPlan.value = p;
  isDropdownOpenMobile.value = false;
  isFeaturesExpanded.value = false;
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
  { icon: markRaw(Shield), text: 'Data 100% aman & terenkripsi' },
  { icon: markRaw(Zap), text: 'Respon WhatsApp 1-3 jam' },
  { icon: markRaw(WhatsappIcon), text: 'Konsultasi gratis tanpa komitmen' },
];

const form = reactive({ name: '', email: '', phone: '', company: '', brief: '' });

const isFormValid = computed(() =>
  form.name.length > 2 && (form.email.includes('@') || form.phone.length > 8)
);

watch(() => props.isOpen, (val) => {
  if (val && isDesktop.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  if (!val) {
    setTimeout(() => {
        selectedPlan.value = null;
        isDropdownOpen.value = false;
        isDropdownOpenMobile.value = false;
        isFeaturesExpanded.value = false;
    }, 300);
  }
});

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isDropdownOpen.value = false;
    isDropdownOpenMobile.value = false;
  }
};

onMounted(() => {
    window.addEventListener('resize', updateBreakpoint);
    document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint);
    document.removeEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = '';
});

const getFrequencyLabel = (cycle?: string) => {
  if (!cycle) return '/ Project';
  switch (cycle) {
    case 'weekly': return '/ Week';
    case 'monthly': return '/ Month';
    case 'one-time': return '(One-time Payment)';
    case 'project': return '/ Project';
    default: return '/ Project';
  }
};

const handleClose = () => {
  if (loading.value) return;
  emit('close');
};

const handleCloseWrapper = (val: boolean) => {
    if (!val) {
        handleClose();
    }
};

const handleSubmit = async () => {
  if (!isFormValid.value || loading.value || !activePlan.value) return;
  loading.value = true;
  try {
    await clientService.addLead({
      name: form.name, email: form.email, phone: form.phone, company: form.company,
      type: 'project_order', status: 'New',
      project_type: activePlan.value.id || 'Custom',
      budget: parseInt((activePlan.value.price ?? '').replace(/\./g, '') || '0'),
      brief: form.brief, source: 'Direct Checkout'
    });
    toast.success('Pemesanan berhasil tercatat!');
    const msg = `Halo KangJessy! Saya ${form.name}.\n\nSaya tertarik memesan paket: *${activePlan.value.name}*\n\n*Brief:* ${form.brief || 'Diskusi via WA'}\n\nMohon bantuannya kak!`;
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
  @apply w-full bg-bg-secondary border border-border-color rounded-2xl pl-14 pr-5 py-5 text-text-primary text-[0.95rem] outline-none transition-all focus:border-accent-primary/50 focus:ring-4 focus:ring-accent-primary/5 placeholder:text-text-tertiary;
}

.checkout-btn {
  @apply w-full bg-accent-primary hover:bg-accent-primary/90 disabled:bg-bg-tertiary disabled:text-text-tertiary text-white py-4 rounded-2xl flex items-center justify-center font-black text-lg transition-all active:scale-[0.98] shadow-xl shadow-accent-primary/20 disabled:shadow-none;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-pop-enter-active { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-pop-leave-active { transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.7, 0, 0.84, 0); }
.modal-pop-enter-from, .modal-pop-leave-to { opacity: 0; transform: scale(0.94) translateY(16px); }

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}
</style>
