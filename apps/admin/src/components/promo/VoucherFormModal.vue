<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-200">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all border border-slate-100"
            >
              <!-- Header -->
              <div
                class="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
              >
                <div>
                  <h3 class="text-lg font-black text-[#1B2559]">
                    {{ isEditing ? "Edit Voucher" : "Create New Voucher" }}
                  </h3>
                  <p class="text-xs text-slate-500 font-medium mt-0.5">
                    Configure discounts and usage limits
                  </p>
                </div>
                <button
                  @click="closeModal"
                  class="p-2 rounded-xl hover:bg-white hover:text-rose-500 text-slate-400 transition-all shadow-sm"
                >
                  <X :size="20" />
                </button>
              </div>

              <!-- Form -->
              <div
                class="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
              >
                <!-- Code & Label -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >Voucher Code</label
                    >
                    <div class="relative">
                      <Tag
                        :size="16"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        v-model="formData.code"
                        type="text"
                        placeholder="e.g. SALE2026"
                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-[#1B2559] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#702DFF]/20 focus:border-[#702DFF] uppercase tracking-wider"
                      />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >Label (Public)</label
                    >
                    <input
                      v-model="formData.label"
                      type="text"
                      placeholder="e.g. New Year Promo"
                      class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-[#1B2559] focus:outline-none focus:ring-2 focus:ring-[#702DFF]/20 focus:border-[#702DFF]"
                    />
                  </div>
                </div>

                <!-- Description -->
                <div class="space-y-2">
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                    >Description</label
                  >
                  <textarea
                    v-model="formData.desc"
                    rows="2"
                    placeholder="Describe the promo details..."
                    class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-[#1B2559] focus:outline-none focus:ring-2 focus:ring-[#702DFF]/20 focus:border-[#702DFF] resize-none"
                  ></textarea>
                </div>

                <!-- Discount Rules -->
                <div
                  class="p-5 border border-slate-100 rounded-2xl bg-slate-50/30 space-y-4"
                >
                  <p
                    class="text-xs font-black text-[#702DFF] flex items-center gap-2"
                  >
                    <Percent :size="14" />
                    Discount Rules
                  </p>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="space-y-2">
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                        >Type</label
                      >
                      <select
                        v-model="formData.type"
                        class="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-bold text-[#1B2559] outline-none focus:border-[#702DFF]"
                      >
                        <option value="percent">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (Rp)</option>
                      </select>
                    </div>

                    <div class="space-y-2 md:col-span-2">
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                        >Value</label
                      >
                      <div class="relative">
                        <span
                          v-if="formData.type === 'fixed'"
                          class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400"
                          >Rp</span
                        >
                        <span
                          v-else
                          class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400"
                          >%</span
                        >

                        <input
                          v-model.number="formData.value"
                          type="number"
                          class="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-bold text-[#1B2559] outline-none focus:border-[#702DFF]"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Expiry -->
                    <div class="space-y-2">
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                        >Expiry Date</label
                      >
                      <div class="relative">
                        <Calendar
                          :size="16"
                          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          v-model="formData.expiry_date"
                          type="date"
                          class="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-medium text-[#1B2559] outline-none focus:border-[#702DFF]"
                        />
                      </div>
                    </div>

                    <!-- Min Order -->
                    <div class="space-y-2">
                      <label
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                        >Min. Order (Optional)</label
                      >
                      <div class="relative">
                        <span
                          class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400"
                          >Rp</span
                        >
                        <input
                          v-model.number="formData.min_order"
                          type="number"
                          placeholder="0"
                          class="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-medium text-[#1B2559] outline-none focus:border-[#702DFF]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Settings Toggles -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Status Toggle -->
                  <div
                    class="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white hover:border-[#702DFF] transition-colors cursor-pointer"
                    @click="formData.is_active = !formData.is_active"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                        :class="
                          formData.is_active
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-slate-100 text-slate-400'
                        "
                      >
                        <Power :size="20" />
                      </div>
                      <div>
                        <p class="text-sm font-bold text-[#1B2559]">
                          Active Status
                        </p>
                        <p class="text-[10px] text-slate-400 font-medium">
                          Enable usage
                        </p>
                      </div>
                    </div>
                    <div
                      class="w-12 h-6 rounded-full p-1 transition-colors relative"
                      :class="
                        formData.is_active ? 'bg-emerald-500' : 'bg-slate-200'
                      "
                    >
                      <div
                        class="w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                        :class="
                          formData.is_active ? 'translate-x-6' : 'translate-x-0'
                        "
                      ></div>
                    </div>
                  </div>

                  <!-- Global Toggle -->
                  <div
                    class="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white hover:border-[#702DFF] transition-colors cursor-pointer"
                    @click="formData.is_global = !formData.is_global"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                        :class="
                          formData.is_global
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-slate-100 text-slate-400'
                        "
                      >
                        <Globe :size="20" />
                      </div>
                      <div>
                        <p class="text-sm font-bold text-[#1B2559]">
                          Global Voucher
                        </p>
                        <p class="text-[10px] text-slate-400 font-medium">
                          Valid for all items
                        </p>
                      </div>
                    </div>
                    <div
                      class="w-12 h-6 rounded-full p-1 transition-colors relative"
                      :class="
                        formData.is_global ? 'bg-[#702DFF]' : 'bg-slate-200'
                      "
                    >
                      <div
                        class="w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                        :class="
                          formData.is_global ? 'translate-x-6' : 'translate-x-0'
                        "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div
                class="px-8 py-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50"
              >
                <button
                  @click="closeModal"
                  class="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-[#1B2559] hover:bg-white transition-all"
                >
                  Cancel
                </button>
                <button
                  @click="save"
                  :disabled="loading"
                  class="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#702DFF] hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span
                    v-if="loading"
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></span>
                  {{ loading ? "Saving..." : "Save Voucher" }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <Toast
    v-if="toast.show"
    :message="toast.message"
    :variant="toast.variant"
    @close="toast.show = false"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { X, Tag, Percent, Calendar, Power, Globe } from "lucide-vue-next";
import Toast from "../ui/Toast.vue";
import type { Coupon } from "../../services/couponsService";

const props = defineProps<{
  isOpen: boolean;
  editData: Coupon | null;
}>();

const emit = defineEmits(["close", "save"]);

const loading = ref(false);

const defaultForm: Partial<Coupon> = {
  code: "",
  label: "",
  desc: "",
  type: "percent",
  value: 0,
  is_active: true,
  is_global: true,
  min_order: 0,
  expiry_date: "",
};

const formData = ref<Partial<Coupon>>({ ...defaultForm });

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const isEditing = computed(() => !!props.editData);

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      if (props.editData) {
        formData.value = { ...props.editData };
      } else {
        formData.value = { ...defaultForm };
        // Default expiry +30 days
        const d = new Date();
        d.setDate(d.getDate() + 30);
        formData.value.expiry_date = d.toISOString().split("T")[0];
      }
    }
  },
);

const closeModal = () => {
  emit("close");
};

const save = async () => {
  if (!formData.value.code || !formData.value.value) {
    showToast("Please fill required fields (Code, Value)", "error");
    return;
  }

  loading.value = true;
  try {
    await emit("save", formData.value);
    // close is handled by parent upon success
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
