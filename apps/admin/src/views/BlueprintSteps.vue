<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      :title="stage?.name || 'Loading Stage...'"
      :subtitle="stage?.subtitle || 'Managing steps for this stage'"
    >
      <template #breadcrumb>
        <BaseButton
          variant="secondary"
          @click="router.push('/blueprint')"
          class="px-3! py-2! rounded-xl! mb-2"
        >
          <ArrowLeft :size="16" />
        </BaseButton>
      </template>
      <div class="flex gap-2">
        <BaseButton variant="primary" @click="openStepModal()">
          <Plus :size="18" />
          Add Step
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Table -->
    <BentoTable
      :columns="[
        { key: 'detail', label: 'Step Detail' },
        { key: 'action', label: 'Action Path' },
        { key: 'order', label: 'Order' },
        { key: 'actions', label: 'Actions', align: 'right' },
      ]"
      :items="steps"
      :loading="loading"
      loading-text="Memuat Langkah..."
      empty-title="Belum Ada Langkah"
      empty-message="Mulai bangun roadmap dengan menambahkan langkah aksi pertama."
      :empty-icon="Zap"
    >
      <!-- Custom Detail Cell -->
      <template #cell-detail="{ item }">
        <div class="flex flex-col py-1">
          <div class="flex items-center gap-2 mb-1">
            <h3
              class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors"
            >
              {{ item.title }}
            </h3>
            <span
              v-if="item.is_required"
              class="px-2 py-0.5 bg-rose-50 text-rose-500 text-[8px] font-black uppercase tracking-widest rounded-lg border border-rose-100"
              >Required</span
            >
          </div>
          <p
            class="text-[11px] text-slate-400 font-medium line-clamp-2 max-w-md italic"
          >
            {{ item.description || "Tidak ada deskripsi detail." }}
          </p>
        </div>
      </template>

      <!-- Custom Action Cell -->
      <template #cell-action="{ item }">
        <div v-if="item.action_label" class="flex flex-col py-1">
          <span
            class="text-[10px] font-black text-[#1B2559] uppercase tracking-wider mb-1"
          >
            {{ item.action_label }}
          </span>
          <a
            v-if="item.action_url"
            :href="item.action_url"
            target="_blank"
            class="text-[9px] text-indigo-500 hover:text-[#702DFF] hover:underline truncate max-w-[180px] flex items-center gap-1 transition-colors"
          >
            {{ item.action_url.replace("https://", "") }}
            <ExternalLink :size="8" />
          </a>
        </div>
        <span v-else class="text-[10px] text-slate-300 italic">No action</span>
      </template>

      <!-- Custom Order Cell -->
      <template #cell-order="{ index }">
        <div class="flex items-center gap-1">
          <button
            @click="moveStep(index, -1)"
            :disabled="index === 0"
            class="p-1.5 hover:bg-indigo-50 hover:text-[#702DFF] rounded-lg transition-all disabled:opacity-20 text-slate-400"
          >
            <ChevronUp :size="16" />
          </button>
          <button
            @click="moveStep(index, 1)"
            :disabled="index === steps.length - 1"
            class="p-1.5 hover:bg-indigo-50 hover:text-[#702DFF] rounded-lg transition-all disabled:opacity-20 text-slate-400"
          >
            <ChevronDown :size="16" />
          </button>
        </div>
      </template>

      <!-- Custom Actions Cell -->
      <template #cell-actions="{ item }">
        <div class="flex items-center justify-end gap-1">
          <button
            @click="openStepModal(item)"
            class="p-2.5 rounded-xl text-slate-300 hover:text-[#702DFF] hover:bg-indigo-50 transition-all"
            title="Edit Step"
          >
            <Edit2 :size="16" />
          </button>
          <button
            @click="handleDelete(item)"
            class="p-2.5 rounded-xl text-slate-200 hover:text-rose-600 hover:bg-rose-50 transition-all"
            title="Delete"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </template>
    </BentoTable>

    <!-- Step Modal -->
    <div
      v-if="modal.show"
      class="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-sm z-1000 flex items-center justify-center p-4"
      @click.self="modal.show = false"
    >
      <div
        class="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-white/20 animate-scale-in"
      >
        <h2 class="text-2xl font-black text-[#1B2559] mb-6">
          {{ modal.isEdit ? "Edit Step" : "New Step" }}
        </h2>

        <form @submit.prevent="saveStep" class="space-y-4">
          <div>
            <label
              class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
              >Step Title</label
            >
            <input
              v-model="modal.data.title"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="e.g. Market Research"
              required
            />
          </div>

          <div>
            <label
              class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
              >Description</label
            >
            <textarea
              v-model="modal.data.description"
              rows="3"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="Brief explanation of what to do in this step..."
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >Action Label</label
              >
              <input
                v-model="modal.data.action_label"
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
                placeholder="e.g. Download PDF"
              />
            </div>
            <div>
              <label
                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >Action URL</label
              >
              <input
                v-model="modal.data.action_url"
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
                placeholder="https://..."
              />
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              v-model="modal.data.is_required"
              id="is_required"
              class="w-4 h-4 rounded border-slate-300 text-[#702DFF] focus:ring-[#702DFF]"
            />
            <label for="is_required" class="text-xs font-bold text-[#1B2559]"
              >This step is mandatory (Required)</label
            >
          </div>

          <div class="flex gap-3 mt-8">
            <BaseButton
              variant="secondary"
              @click="modal.show = false"
              class="flex-1"
              type="button"
              >Cancel</BaseButton
            >
            <BaseButton
              variant="primary"
              type="submit"
              :loading="modal.loading"
              class="flex-1"
              >Save Step</BaseButton
            >
          </div>
        </form>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Delete Step"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
    />

    <!-- Toast -->
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
import { useRoute, useRouter } from "vue-router";
import {
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Zap,
} from "lucide-vue-next";
import {
  blueprintService,
  type RoadmapStage,
  type RoadmapStep,
} from "../services/blueprintService";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoTable from "../components/ui/BentoTable.vue";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const route = useRoute();
const router = useRouter();
const stageId = route.params.stageId as string;

const loading = ref(true);
const stage = ref<RoadmapStage | null>(null);
const steps = ref<RoadmapStep[]>([]);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const modal = ref({
  show: false,
  loading: false,
  isEdit: false,
  data: {} as Partial<RoadmapStep>,
});

const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});

const fetchData = async () => {
  loading.value = true;
  try {
    // 1. Get all stages to find current stage info (inefficient but works for now as we don't have getStageById)
    // Ideally add getStageById to service
    const allStages = await blueprintService.getAllStages();
    stage.value = allStages.find((s) => s.id === stageId) || null;

    if (stage.value && stage.value.steps) {
      steps.value = stage.value.steps;
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to fetch stage details", "error");
  } finally {
    loading.value = false;
  }
};

const openStepModal = (step?: RoadmapStep) => {
  modal.value.isEdit = !!step;
  modal.value.data = step
    ? { ...step }
    : {
        title: "",
        description: "",
        action_label: "",
        action_url: "",
        is_required: true,
        stage_id: stageId,
        sort_order: steps.value.length,
      };
  modal.value.show = true;
};

const saveStep = async () => {
  if (!modal.value.data.title) return;

  modal.value.loading = true;
  try {
    await blueprintService.upsertStep(modal.value.data);
    await fetchData();
    modal.value.show = false;
    showToast("Step saved successfully", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to save step", "error");
  } finally {
    modal.value.loading = false;
  }
};

const handleDelete = (step: RoadmapStep) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Step?",
    message: `Are you sure you want to delete "${step.title}"?`,
    targetId: step.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  if (!id) return;

  try {
    await blueprintService.deleteStep(id);
    await fetchData();
    showToast("Step deleted", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to delete step", "error");
  }
};

const moveStep = async (index: number, direction: number) => {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= steps.value.length) return;

  const item = steps.value[index];
  const targetItem = steps.value[targetIndex];

  if (!item || !targetItem) return;

  // Swap sort_order
  const oldOrder = item.sort_order;
  item.sort_order = targetItem.sort_order;
  targetItem.sort_order = oldOrder;

  try {
    // Optimistic UI update
    const newSteps = [...steps.value];
    newSteps[index] = targetItem;
    newSteps[targetIndex] = item;
    steps.value = newSteps;

    await blueprintService.updateStepOrder([item, targetItem]);
    showToast("Order updated", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to update order", "error");
    await fetchData(); // Revert on error
  }
};

const showToast = (message: string, variant: "success" | "error") => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

onMounted(fetchData);
</script>

<style scoped>
.page-container {
  padding-top: 2rem;
  padding-bottom: 5rem;
}
</style>
