<template>
  <div class="page-container">
    <PageHeader
      title="Promos & Vouchers"
      subtitle="Create and manage discount codes for your clients"
    >
      <BaseButton variant="primary" @click="handleCreate">
        <Plus :size="18" />
        Create Voucher
      </BaseButton>
    </PageHeader>

    <!-- Voucher Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Active Vouchers"
        :value="activeCount"
        :icon="Tag"
        colorClass="bg-blue-50 text-blue-600"
      />
      <StatsCard
        title="Total Used"
        value="128"
        :icon="ShoppingCart"
        colorClass="bg-emerald-50 text-emerald-600"
      />
      <StatsCard
        title="Total Discount"
        :value="formatPrice(4500000)"
        :icon="TrendingDown"
        colorClass="bg-rose-50 text-rose-600"
      />
      <StatsCard
        title="Conversion Rate"
        value="12%"
        :icon="TrendingUp"
        colorClass="bg-indigo-50 text-indigo-600"
      />
    </div>

    <!-- Vouchers Grid -->
    <div v-if="loading" class="p-20 text-center">
      <div
        class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"
      ></div>
      <p
        class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs"
      >
        Fetching active promos...
      </p>
    </div>

    <div
      v-else-if="vouchers.length === 0"
      class="p-20 text-center card bg-slate-50/50 border-dashed"
    >
      <div
        class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
      >
        <Tag :size="32" class="text-slate-300" />
      </div>
      <h3 class="text-lg font-bold text-[#1B2559]">No Vouchers Yet</h3>
      <p class="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
        Create your first discount code to boost sales and customer loyalty.
      </p>
      <BaseButton variant="primary" @click="handleCreate"
        >Create Now</BaseButton
      >
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="voucher in vouchers"
        :key="voucher.id"
        class="card group relative border-none overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <!-- Ticket Design Style -->
        <div
          class="p-6 bg-slate-50/50 border-b border-dashed border-slate-200 relative"
        >
          <!-- Decorative punch holes -->
          <div
            class="absolute -bottom-3 -left-3 w-6 h-6 bg-[#f4f7fe] rounded-full border border-slate-100"
          ></div>
          <div
            class="absolute -bottom-3 -right-3 w-6 h-6 bg-[#f4f7fe] rounded-full border border-slate-100"
          ></div>

          <div class="flex justify-between items-start mb-4">
            <span
              class="badge-chip"
              :class="voucher.is_active ? 'badge-success' : 'badge-gray'"
            >
              {{ voucher.is_active ? `Active` : `Inactive` }}
            </span>
            <div class="flex items-center gap-1 transition-all">
              <button
                @click="handleEdit(voucher)"
                class="btn-ghost w-8 h-8"
                title="Edit"
              >
                <Edit2 :size="14" />
              </button>
              <button
                @click="handleDelete(voucher)"
                class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50"
                title="Delete"
              >
                <Trash2 :size="14" />
              </button>
            </div>
          </div>

          <h3
            class="text-2xl font-black text-[#702DFF] tracking-widest font-mono uppercase truncate"
            :title="voucher.code"
          >
            {{ voucher.code }}
          </h3>
          <p class="text-xs font-bold text-[#1B2559] mt-1 truncate">
            {{ voucher.label }}
          </p>
        </div>

        <div class="p-6 space-y-4">
          <p
            class="text-[11px] text-slate-500 font-medium leading-relaxed italic line-clamp-2 min-h-[2.5em]"
          >
            "{{ voucher.desc || "No description provided." }}"
          </p>

          <div class="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
            <div>
              <p
                class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
              >
                Discount
              </p>
              <p class="text-lg font-black text-[#1B2559]">
                {{
                  voucher.type === "percent"
                    ? `${voucher.value}%`
                    : formatPrice(voucher.value)
                }}
              </p>
            </div>
            <div class="text-right">
              <p
                class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
              >
                Expires
              </p>
              <p class="text-xs font-black text-slate-700 mt-1">
                {{ formatDate(voucher.expiry_date) }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-if="voucher.is_global"
              class="text-[9px] px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg font-black uppercase tracking-widest"
              >Global</span
            >
            <span
              v-if="voucher.min_order"
              class="text-[9px] px-2 py-1 bg-slate-100 text-slate-500 rounded-lg font-black uppercase tracking-widest"
              >Min. {{ formatPrice(voucher.min_order) }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <VoucherFormModal
      :is-open="showModal"
      :edit-data="editingVoucher"
      @close="showModal = false"
      @save="handleSave"
    />

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Delete Voucher"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Plus,
  Tag,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Edit2,
  Trash2,
} from "lucide-vue-next";
import { couponsService, type Coupon } from "../services/couponsService";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import StatsCard from "../components/ui/StatsCard.vue";
import VoucherFormModal from "../components/promo/VoucherFormModal.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import Toast from "../components/ui/Toast.vue";

const vouchers = ref<Coupon[]>([]);
const loading = ref(true);
const showModal = ref(false);
const editingVoucher = ref<Coupon | null>(null);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});

// Fetch Data
const fetchVouchers = async () => {
  loading.value = true;
  try {
    vouchers.value = await couponsService.getAll();
  } catch (err) {
    console.error(err);
    showToast("Failed to load vouchers", "error");
  } finally {
    loading.value = false;
  }
};

// Stats
const activeCount = computed(
  () => vouchers.value.filter((v) => v.is_active).length,
);

// Helpers
const formatPrice = (price: number) =>
  "Rp " + (price || 0).toLocaleString("id-ID");
const formatDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";
const showToast = (message: string, variant: "success" | "error") => {
  toast.value = { show: true, message, variant };
};

// Handlers
const handleCreate = () => {
  editingVoucher.value = null;
  showModal.value = true;
};

const handleEdit = (v: Coupon) => {
  editingVoucher.value = v;
  showModal.value = true;
};

const handleSave = async (data: Partial<Coupon>) => {
  try {
    if (editingVoucher.value?.id) {
      // Update
      await couponsService.update(editingVoucher.value.id, data);
      showToast("Voucher updated successfully", "success");
    } else {
      // Create
      await couponsService.create(data as unknown as Coupon);
      showToast("Voucher created successfully", "success");
    }
    showModal.value = false;
    fetchVouchers(); // Refresh list
  } catch (e) {
    console.error("Save failed", e);
    showToast("Failed to save voucher", "error");
  }
};

const handleDelete = (v: Coupon) => {
  if (!v.id) return;
  confirmModal.value = {
    isOpen: true,
    title: "Delete Voucher?",
    message: `Are you sure you want to delete ${v.code}? This action cannot be undone.`,
    targetId: v.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  if (!id) return;

  confirmModal.value.isOpen = false;

  try {
    await couponsService.delete(id);
    vouchers.value = vouchers.value.filter((item) => item.id !== id);
    showToast("Voucher deleted", "success");
  } catch (e) {
    console.error("Delete failed", e);
    showToast("Failed to delete voucher", "error");
  }
};

onMounted(fetchVouchers);
</script>
