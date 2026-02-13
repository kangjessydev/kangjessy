<template>
  <div class="page-container">
    <PageHeader
      title="Portfolio Areas"
      subtitle="Categorize your projects by development expertise"
    >
      <BaseButton variant="primary" @click="openAddModal">
        <Plus :size="18" />
        Add Area
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Areas List -->
      <AdminCard
        title="Project Areas"
        no-padding
        class="lg:col-span-2 overflow-hidden rounded-[32px]!"
      >
        <BentoTable
          :columns="[
            { key: 'name', label: 'Area Name' },
            { key: 'slug', label: 'Slug' },
            { key: 'actions', label: 'Actions', align: 'right' },
          ]"
          :items="areas"
          :loading="loading"
          empty-title="No areas found"
          empty-message="Add your first development area!"
          :empty-icon="Briefcase"
        >
          <!-- Custom Name Cell -->
          <template #cell-name="{ item }">
            <span class="font-black text-[#1B2559] leading-tight">{{
              item.name
            }}</span>
          </template>

          <!-- Custom Slug Cell -->
          <template #cell-slug="{ item }">
            <code
              class="text-[10px] bg-indigo-50/50 px-2 py-1 rounded-lg text-[#702DFF] font-black uppercase tracking-widest border border-indigo-100/50"
            >
              {{ item.slug }}
            </code>
          </template>

          <!-- Actions Cell -->
          <template #cell-actions="{ item }">
            <div class="flex items-center justify-end gap-1">
              <button
                @click="handleEdit(item)"
                class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all"
                title="Edit Area"
              >
                <Edit2 :size="16" />
              </button>
              <button
                @click="openDeleteConfirm(item)"
                class="p-2.5 rounded-xl text-slate-200 hover:text-rose-600 hover:bg-rose-50 transition-all"
                title="Delete"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </template>
        </BentoTable>
      </AdminCard>

      <!-- Quick Tips -->
      <AdminCard title="Expertise Layout">
        <div class="space-y-6">
          <div
            class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50"
          >
            <h4
              class="text-xs font-black text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-2"
            >
              <Briefcase :size="14" /> Logic
            </h4>
            <p class="text-xs text-indigo-900/70 leading-relaxed">
              Areas represent your core services like AI, Full Stack, or Mobile
              Apps.
            </p>
          </div>
          <div
            class="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50"
          >
            <h4
              class="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2"
            >
              <Target :size="14" /> Precision
            </h4>
            <p class="text-xs text-emerald-900/70 leading-relaxed">
              Well-defined areas help clients find relevant case studies
              quickly.
            </p>
          </div>
        </div>
      </AdminCard>
    </div>

    <!-- Modal Area -->
    <div
      v-if="modal.show"
      class="fixed inset-0 z-1000 flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm"
      @click.self="modal.show = false"
    >
      <div
        class="bg-white w-full max-w-md p-8 shadow-2xl rounded-[32px]! animate-scale-in"
      >
        <h3 class="text-2xl font-black text-[#1B2559] mb-6">
          {{ modal.isEdit ? "Edit Area" : "New Portfolio Area" }}
        </h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Area Name</label
            >
            <input
              v-model="modal.data.name"
              @input="updateSlug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="e.g. Artificial Intelligence"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Slug</label
            >
            <input
              v-model="modal.data.slug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="ai-automation"
            />
          </div>
        </div>
        <div class="flex gap-3">
          <BaseButton
            variant="secondary"
            class="flex-1"
            @click="modal.show = false"
            >Cancel</BaseButton
          >
          <BaseButton variant="primary" class="flex-1" @click="saveArea"
            >Save Area</BaseButton
          >
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Delete Area"
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
import { ref, onMounted } from "vue";
import { Plus, Trash2, Edit2, Briefcase, Target } from "lucide-vue-next";
import { portfolioService } from "../services/portfolioService";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoTable from "../components/ui/BentoTable.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const areas = ref<any[]>([]);
const loading = ref(true);
const modal = ref({
  show: false,
  isEdit: false,
  data: { name: "", slug: "" } as any,
});
const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const fetchAreas = async () => {
  loading.value = true;
  try {
    areas.value = await portfolioService.getAreas();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const updateSlug = () => {
  modal.value.data.slug = modal.value.data.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
};

const saveArea = async () => {
  if (!modal.value.data.name) return;
  try {
    if (modal.value.isEdit) {
      const updated = await portfolioService.updateArea(
        modal.value.data.id,
        modal.value.data,
      );
      const index = areas.value.findIndex((a) => a.id === updated.id);
      if (index !== -1) areas.value[index] = updated;
      showToast("Area updated successfully");
    } else {
      const saved = await portfolioService.createArea(modal.value.data);
      areas.value.unshift(saved);
      showToast("Area created successfully");
    }
    modal.value.show = false;
  } catch (err) {
    showToast("Failed to save area", "error");
  }
};

const handleEdit = (area: any) => {
  modal.value.isEdit = true;
  modal.value.data = { ...area };
  modal.value.show = true;
};

const openDeleteConfirm = (area: any) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Area?",
    message: `Are you sure you want to delete "${area.name}"? This will affect project categorization.`,
    targetId: area.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  if (!id) return;

  try {
    await portfolioService.deleteArea(id);
    areas.value = areas.value.filter((a) => a.id !== id);
    showToast("Area deleted");
  } catch (err) {
    showToast("Delete failed", "error");
  }
};

const openAddModal = () => {
  modal.value.isEdit = false;
  modal.value.data = { name: "", slug: "" };
  modal.value.show = true;
};

onMounted(fetchAreas);
</script>
