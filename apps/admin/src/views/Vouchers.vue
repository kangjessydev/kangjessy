<template>
  <div class="page-container">
    <PageHeader
      title="Promo & Voucher"
      subtitle="Buat dan kelola kode diskon untuk klien Anda"
    >
      <BaseButton variant="primary" @click="handleCreate">
        <Plus :size="18" />
        Buat Voucher
      </BaseButton>
    </PageHeader>

    <!-- Voucher Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BentoStat
        title="Voucher Aktif"
        :value="activeCount"
        :icon="Tag"
        variant="blue"
        tooltip="Total voucher yang saat ini aktif dan dapat digunakan."
      />
      <BentoStat
        title="Total Digunakan"
        value="128"
        :icon="ShoppingCart"
        variant="success"
        tooltip="Jumlah akumulasi penggunaan semua voucher."
      />
      <BentoStat
        title="Diskon Terberikan"
        :value="formatPrice(4500000)"
        :icon="TrendingDown"
        variant="danger"
        tooltip="Total nilai diskon yang telah dinikmati klien."
      />
      <BentoStat
        title="Tingkat Konversi"
        value="12%"
        :icon="TrendingUp"
        variant="primary"
        tooltip="Rasio penggunaan voucher terhadap total konversi."
      />
    </div>

    <!-- Vouchers Table -->
    <AdminCard
      no-padding
      class="overflow-hidden rounded-[32px]! border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-12"
    >
      <div v-if="loading" class="p-20 text-center">
        <div
          class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
        ></div>
        <p
          class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          Menyelaraskan Promo...
        </p>
      </div>

      <div v-else-if="vouchers.length === 0" class="p-20 text-center">
        <div
          class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
        >
          <Tag :size="32" class="text-slate-200" />
        </div>
        <h3 class="text-lg font-bold text-[#1B2559]">
          Voucher Tidak Ditemukan
        </h3>
        <p class="text-slate-400 text-sm mt-1">
          Buat kode diskon pertama Anda untuk meningkatkan penjualan.
        </p>
        <BaseButton variant="primary" @click="handleCreate" class="mt-6"
          >Buat Voucher</BaseButton
        >
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th class="pl-8!">Identitas Voucher</th>
              <th>Reward</th>
              <th>Persyaratan</th>
              <th>Berlaku Sampai</th>
              <th>Status</th>
              <th class="text-right pr-8!">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="voucher in vouchers"
              :key="voucher.id"
              class="table-row-hover group"
            >
              <td class="pl-8!">
                <div class="flex flex-col">
                  <p
                    class="font-black text-[#1B2559] text-sm tracking-widest font-mono uppercase group-hover:text-[#702DFF] transition-colors"
                  >
                    {{ voucher.code }}
                  </p>
                  <p
                    class="text-[10px] font-bold text-slate-400 uppercase mt-0.5"
                  >
                    {{ voucher.label }}
                  </p>
                </div>
              </td>
              <td>
                <div class="flex flex-col">
                  <span class="text-sm font-black text-[#1B2559]">
                    {{
                      voucher.type === "percent"
                        ? `${voucher.value}% OFF`
                        : `${formatPrice(voucher.value)} OFF`
                    }}
                  </span>
                  <span class="text-[9px] font-bold text-slate-400 uppercase">
                    {{
                      voucher.type === "percent" ? "Percentage" : "Fixed Amount"
                    }}
                  </span>
                </div>
              </td>
              <td>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-if="voucher.is_global"
                    class="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase tracking-widest rounded border border-indigo-100/50"
                  >
                    Global
                  </span>
                  <span
                    v-if="voucher.min_order"
                    class="px-2 py-0.5 bg-slate-50 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded border border-slate-100"
                  >
                    Min. {{ formatPrice(voucher.min_order) }}
                  </span>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <Clock :size="12" class="text-slate-300" />
                  <span class="text-xs font-bold text-slate-500">{{
                    formatDate(voucher.expiry_date)
                  }}</span>
                </div>
              </td>
              <td>
                <span
                  class="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest"
                  :class="
                    voucher.is_active
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-slate-100 text-slate-400'
                  "
                >
                  {{ voucher.is_active ? "Active" : "Inactive" }}
                </span>
              </td>
              <td class="text-right pr-8!">
                <div class="flex items-center justify-end gap-1 transition-all">
                  <button
                    @click="handleEdit(voucher)"
                    class="p-2 rounded-xl text-slate-300 hover:text-[#702DFF] hover:bg-indigo-50 transition-all"
                  >
                    <Edit2 :size="16" />
                  </button>
                  <button
                    @click="handleDelete(voucher)"
                    class="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminCard>

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
import BentoStat from "../components/ui/BentoStat.vue";
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
