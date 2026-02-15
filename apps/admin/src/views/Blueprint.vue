<template>
  <div class="page-container">
    <PageHeader
      title="The Blueprint Stages"
      subtitle="Daftar tahapan utama dalam Digital Business Roadmap"
    >
      <BaseButton variant="primary" @click="openStageModal()">
        <Plus :size="18" />
        New Stage
      </BaseButton>
    </PageHeader>

    <!-- Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <BentoStat
        title="Total Stages"
        :value="stages.length"
        :icon="Layers"
        variant="primary"
        tooltip="Jumlah tahapan utama dalam Digital Business Roadmap."
      />
      <BentoStat
        title="Total Steps"
        :value="totalSteps"
        :icon="Zap"
        variant="success"
        tooltip="Akumulasi seluruh langkah aksi dari semua tahapan."
      />
    </div>

    <!-- Table -->
    <BentoTable
      :columns="[
        { key: 'identity', label: 'Stage Identity' },
        { key: 'icon', label: 'Icon' },
        { key: 'steps', label: 'Steps Count' },
        { key: 'order', label: 'Order' },
        { key: 'actions', label: 'Actions', align: 'right' },
      ]"
      :items="stages"
      :loading="loading"
      loading-text="Menyusun Roadmap..."
      empty-title="Roadmap Kosong"
      empty-message="Belum ada tahapan yang dibuat."
      :empty-icon="Layers"
    >
      <!-- Custom Identity Cell -->
      <template #cell-identity="{ item }">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#702DFF] font-black text-xs shrink-0 border border-indigo-100 shadow-sm"
          >
            {{ item.id.substring(0, 2).toUpperCase() }}
          </div>
          <div class="min-w-0">
            <h3
              class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors cursor-pointer truncate"
              @click="goToSteps(item.id)"
            >
              {{ item.name }}
            </h3>
            <p
              class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate"
            >
              {{ item.subtitle }}
            </p>
          </div>
        </div>
      </template>

      <!-- Custom Icon Cell -->
      <template #cell-icon="{ item }">
        <div
          class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400"
        >
          <component :is="getIconComponent(item.icon || 'Layers')" :size="18" />
        </div>
      </template>

      <!-- Steps count cell -->
      <template #cell-steps="{ item }">
        <span
          class="text-xs font-black text-slate-500 uppercase tracking-widest"
          >{{ item.steps?.length || 0 }} Steps</span
        >
      </template>

      <!-- Order cell -->
      <template #cell-order="{ index }">
        <div class="flex items-center gap-1">
          <button
            @click="moveStage(index, -1)"
            :disabled="index === 0"
            class="p-1.5 hover:bg-indigo-50 hover:text-[#702DFF] rounded-lg transition-all disabled:opacity-20"
            title="Move Up"
          >
            <ChevronUp :size="16" />
          </button>
          <button
            @click="moveStage(index, 1)"
            :disabled="index === stages.length - 1"
            class="p-1.5 hover:bg-indigo-50 hover:text-[#702DFF] rounded-lg transition-all disabled:opacity-20"
            title="Move Down"
          >
            <ChevronDown :size="16" />
          </button>
        </div>
      </template>

      <!-- Actions Cell -->
      <template #cell-actions="{ item }">
        <div class="flex items-center justify-end gap-1">
          <button
            @click="goToSteps(item.id)"
            class="p-2.5 rounded-xl text-slate-400 hover:text-[#702DFF] hover:bg-indigo-50 transition-all"
            title="Manage Steps"
          >
            <List :size="16" />
          </button>
          <button
            @click="openStageModal(item)"
            class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all"
            title="Edit Stage"
          >
            <Edit2 :size="16" />
          </button>
          <button
            @click="handleDelete(item)"
            class="p-2.5 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all"
            title="Delete"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </template>
    </BentoTable>

    <!-- Stage Modal -->
    <div
      v-if="modal.show"
      class="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-sm z-1000 flex items-center justify-center p-4"
      @click.self="modal.show = false"
    >
      <div
        class="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-white/20"
      >
        <h2 class="text-2xl font-black text-[#1B2559] mb-6">
          {{ modal.data.id && modal.isEdit ? "Edit Stage" : "New Stage" }}
        </h2>

        <form @submit.prevent="saveStage" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >Stage ID (Slug)</label
              >
              <input
                v-model="modal.data.id"
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
                placeholder="visionary"
                :disabled="modal.isEdit"
              />
            </div>
            <div>
              <label
                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >Stage Name</label
              >
              <input
                v-model="modal.data.name"
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
                placeholder="The Visionary"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-1">
              <label
                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >Icon</label
              >
              <button
                type="button"
                @click="isIconPickerOpen = true"
                class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-white border border-slate-100 rounded-xl transition-all group"
              >
                <div class="flex items-center gap-2">
                  <component
                    :is="getIconComponent(modal.data.icon || 'Layers')"
                    :size="18"
                    class="text-[#702DFF]"
                  />
                  <span class="text-sm font-bold text-[#1B2559] truncate">{{
                    modal.data.icon || "Select"
                  }}</span>
                </div>
                <ChevronDown
                  :size="14"
                  class="text-slate-300 group-hover:text-[#702DFF]"
                />
              </button>
            </div>
            <div class="md:col-span-1">
              <label
                class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                >Subtitle</label
              >
              <input
                v-model="modal.data.subtitle"
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
                placeholder="Tahap Memulai"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
              >Description</label
            >
            <textarea
              v-model="modal.data.description"
              rows="3"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="Brief description of this stage..."
            ></textarea>
          </div>

          <div class="flex gap-3 mt-8">
            <BaseButton
              variant="secondary"
              @click="modal.show = false"
              class="flex-1"
              >Cancel</BaseButton
            >
            <BaseButton
              variant="primary"
              type="submit"
              :loading="modal.loading"
              class="flex-1"
              >Save Stage</BaseButton
            >
          </div>
        </form>
      </div>
    </div>

    <!-- Icon Picker Modal -->
    <div
      v-if="isIconPickerOpen"
      class="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-sm z-2000 flex items-center justify-center p-4"
      @click="isIconPickerOpen = false"
    >
      <div
        class="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 border border-white/20"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-black text-[#1B2559]">Select Icon</h3>
          <button
            @click="isIconPickerOpen = false"
            class="p-2 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X :size="20" class="text-slate-400" />
          </button>
        </div>

        <div
          class="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto p-1 custom-scrollbar"
        >
          <button
            v-for="iconName in availableIcons"
            :key="iconName"
            @click="selectIcon(iconName)"
            class="flex flex-col items-center justify-center p-2 rounded-xl border transition-all hover:scale-105"
            :class="
              modal.data.icon === iconName
                ? 'border-[#702DFF] bg-indigo-50 text-[#702DFF]'
                : 'border-slate-50 hover:border-indigo-100 hover:bg-slate-50 text-slate-400'
            "
          >
            <component :is="getIconComponent(iconName)" :size="24" />
            <span
              class="text-[7px] font-black uppercase mt-1 truncate w-full text-center px-0.5"
              >{{ iconName }}</span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Delete Stage"
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as LucideIcons from "lucide-vue-next";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  Zap,
  List,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-vue-next";
import {
  blueprintService,
  type RoadmapStage,
} from "../services/blueprintService";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoTable from "../components/ui/BentoTable.vue";
import { BaseButton } from "@kangjessy/ui";
import BentoStat from "../components/ui/BentoStat.vue";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const router = useRouter();
const loading = ref(true);
const stages = ref<RoadmapStage[]>([]);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const isIconPickerOpen = ref(false);
const availableIcons = [
  "Palette",
  "Target",
  "Layout",
  "Rocket",
  "Zap",
  "Globe",
  "Monitor",
  "Search",
  "Type",
  "Clock",
  "CheckCircle",
  "HelpCircle",
  "FileText",
  "ShoppingCart",
  "MessageCircle",
  "Workflow",
  "Cpu",
  "Filter",
  "Layers",
  "List",
  "Settings",
  "ExternalLink",
  "Inbox",
  "Send",
  "Users",
  "Briefcase",
  "Code",
  "BarChart",
  "BookOpen",
  "Camera",
  "Cloud",
  "Database",
  "Eye",
  "Gift",
  "Heart",
  "Home",
  "Key",
  "Link",
  "Lock",
  "Mail",
  "Map",
  "Music",
  "Phone",
  "Play",
  "Star",
  "Tag",
  "Trash",
  "User",
  "Video",
];

const modal = ref({
  show: false,
  loading: false,
  isEdit: false,
  data: {} as any,
});

const selectIcon = (icon: string) => {
  modal.value.data.icon = icon;
  isIconPickerOpen.value = false;
};

const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});

const totalSteps = computed(() =>
  (stages.value || []).reduce(
    (acc: number, stage: any) => acc + (stage.steps?.length || 0),
    0,
  ),
);

const fetchData = async () => {
  loading.value = true;
  try {
    stages.value = await blueprintService.getAllStages();
  } catch (err) {
    console.error(err);
    showToast("Failed to fetch stages", "error");
  } finally {
    loading.value = false;
  }
};

const openStageModal = (stage?: RoadmapStage) => {
  modal.value.isEdit = !!stage;
  modal.value.data = stage
    ? { ...stage }
    : {
        id: "",
        name: "",
        subtitle: "",
        description: "",
        icon: "Layers",
        sort_order: stages.value.length,
      };
  modal.value.show = true;
};

const saveStage = async () => {
  modal.value.loading = true;
  try {
    await blueprintService.upsertStage(modal.value.data);
    await fetchData();
    modal.value.show = false;
    showToast("Stage saved successfully", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to save stage", "error");
  } finally {
    modal.value.loading = false;
  }
};

const handleDelete = (stage: RoadmapStage) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Stage?",
    message: `Are you sure you want to delete "${stage.name}"? This will also delete all steps inside it.`,
    targetId: stage.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  if (!id) return;

  try {
    await blueprintService.deleteStage(id);
    await fetchData();
    showToast("Stage deleted", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to delete stage", "error");
  }
};

const goToSteps = (stageId: string) => {
  router.push(`/blueprint/stages/${stageId}/steps`);
};

const moveStage = async (index: number, direction: number) => {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= stages.value.length) return;

  const item = stages.value[index];
  const targetItem = stages.value[targetIndex];

  if (!item || !targetItem) return;

  // Swap sort_order
  const oldOrder = item.sort_order;
  item.sort_order = targetItem.sort_order;
  targetItem.sort_order = oldOrder;

  // Update in state
  const newStages = [...stages.value];
  newStages[index] = targetItem;
  newStages[targetIndex] = item;
  stages.value = newStages;

  try {
    await blueprintService.updateStageOrder([{ ...item }, { ...targetItem }]);
    showToast("Order updated", "success");
  } catch (err) {
    console.error(err);
    showToast("Failed to update order", "error");
    await fetchData();
  }
};

const getIconComponent = (name: string) => {
  return (LucideIcons as any)[name] || LucideIcons.HelpCircle;
};

const showToast = (message: string, variant: "success" | "error") => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

onMounted(fetchData);
</script>
