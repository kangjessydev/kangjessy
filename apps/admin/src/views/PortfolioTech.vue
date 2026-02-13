<template>
  <div class="page-container">
    <PageHeader
      title="Tech Stack"
      subtitle="Manage the technologies used across your projects"
    >
      <BaseButton variant="primary" @click="openAddModal">
        <Plus :size="18" />
        Add Technology
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <!-- Tech List -->
      <AdminCard
        title="All Technologies"
        no-padding
        class="lg:col-span-2 overflow-hidden rounded-[32px]!"
      >
        <BentoTable
          :columns="[
            { key: 'name', label: 'Technology' },
            { key: 'slug', label: 'Slug' },
            { key: 'actions', label: 'Actions', align: 'right' },
          ]"
          :items="technologies"
          :loading="loading"
          empty-title="No technologies found"
          empty-message="Grow your stack!"
          :empty-icon="Code"
        >
          <!-- Custom Name Cell -->
          <template #cell-name="{ item }">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#702DFF] border border-slate-100/50"
              >
                <Code :size="14" />
              </div>
              <span class="font-black text-[#1B2559] leading-tight">{{
                item.name
              }}</span>
            </div>
          </template>

          <!-- Custom Slug Cell -->
          <template #cell-slug="{ item }">
            <code
              class="text-[10px] bg-slate-50/50 px-2 py-1 rounded-lg text-slate-400 font-bold uppercase tracking-widest border border-slate-100/50"
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
                title="Edit Tech"
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

      <AdminCard title="Stack Highlights">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in technologies"
            :key="tech.id"
            class="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100/50 hover:bg-[#702DFF] hover:text-white hover:border-[#702DFF] transition-all cursor-pointer"
          >
            {{ tech.name }}
          </span>
        </div>
      </AdminCard>
    </div>

    <!-- Modal Tech -->
    <div
      v-if="modal.show"
      class="fixed inset-0 z-1000 flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm"
      @click.self="modal.show = false"
    >
      <div
        class="bg-white w-full max-w-md p-8 shadow-2xl rounded-[32px]! animate-scale-in"
      >
        <h3 class="text-2xl font-black text-[#1B2559] mb-6">
          {{ modal.isEdit ? "Update Tech" : "New Technology" }}
        </h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Tech Name</label
            >
            <input
              v-model="modal.data.name"
              @input="updateSlug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="e.g. Next.js"
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
              placeholder="nextjs"
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
          <BaseButton variant="primary" class="flex-1" @click="saveTech">{{
            modal.isEdit ? "Update Tech" : "Add to Stack"
          }}</BaseButton>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Remove Tech"
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
import { Plus, Code, Trash2, Edit2 } from "lucide-vue-next";
import { portfolioService } from "../services/portfolioService";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoTable from "../components/ui/BentoTable.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const technologies = ref<any[]>([]);
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

const fetchTech = async () => {
  loading.value = true;
  try {
    technologies.value = await portfolioService.getTechnologies();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
};

const updateSlug = () => {
  modal.value.data.slug = modal.value.data.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const saveTech = async () => {
  if (!modal.value.data.name) return;
  try {
    if (modal.value.isEdit) {
      const updated = await portfolioService.updateTechnology(
        modal.value.data.id,
        modal.value.data,
      );
      const index = technologies.value.findIndex((t) => t.id === updated.id);
      if (index !== -1) technologies.value[index] = updated;
      showToast("Technology updated");
    } else {
      const saved = await portfolioService.createTechnology(modal.value.data);
      technologies.value.unshift(saved);
      showToast("Technology added to stack");
    }
    modal.value.show = false;
  } catch (err) {
    showToast("Failed to save technology", "error");
  }
};

const handleEdit = (tech: any) => {
  modal.value.isEdit = true;
  modal.value.data = { ...tech };
  modal.value.show = true;
};

const openDeleteConfirm = (tech: any) => {
  confirmModal.value = {
    isOpen: true,
    title: "Remove from Stack?",
    message: `Are you sure you want to remove "${tech.name}"? This might affect projects using this tech.`,
    targetId: tech.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  if (!id) return;

  try {
    await portfolioService.deleteTechnology(id);
    technologies.value = technologies.value.filter((t) => t.id !== id);
    showToast("Tech removed");
  } catch (err) {
    showToast("Delete failed", "error");
  }
};

const openAddModal = () => {
  modal.value.isEdit = false;
  modal.value.data = { name: "", slug: "" };
  modal.value.show = true;
};

onMounted(fetchTech);
</script>
