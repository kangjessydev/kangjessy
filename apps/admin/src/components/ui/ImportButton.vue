<template>
  <div>
    <!-- Import Button -->
    <button
      @click="handleClick"
      :disabled="isImporting"
      class="import-button"
      :class="[sizeClass, variantClass, { 'is-importing': isImporting }]"
    >
      <transition name="icon-swap" mode="out-in">
        <Loader2 v-if="isImporting" :size="iconSize" class="animate-spin" />
        <Upload v-else :size="iconSize" />
      </transition>
      <span v-if="!iconOnly">{{ isImporting ? "Importing..." : label }}</span>
    </button>

    <!-- Import Modal -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-indigo-100 text-[#702DFF] flex items-center justify-center"
                >
                  <FileUp :size="20" />
                </div>
                <div>
                  <h3 class="text-sm font-black text-[#1B2559]">Import Data</h3>
                  <p class="text-[10px] text-slate-400">
                    Restore from backup file
                  </p>
                </div>
              </div>
              <button
                @click="closeModal"
                class="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X :size="18" class="text-slate-400" />
              </button>
            </div>

            <!-- Content -->
            <div class="modal-body">
              <!-- No file selected -->
              <div
                v-if="!selectedFile"
                class="upload-zone"
                @click="triggerFileSelect"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <div class="upload-icon">
                  <FileJson :size="32" />
                </div>
                <p class="text-xs font-bold text-slate-600 mt-3">
                  Click to select or drag & drop
                </p>
                <p class="text-[10px] text-slate-400 mt-1">JSON or CSV files</p>
              </div>

              <!-- File preview -->
              <div v-else-if="preview" class="preview-zone">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"
                  >
                    <CheckCircle :size="20" />
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-bold text-[#1B2559]">
                      {{ selectedFile.name }}
                    </p>
                    <p class="text-[10px] text-slate-400">
                      {{ formatFileSize(selectedFile.size) }}
                    </p>
                  </div>
                  <button
                    @click="clearFile"
                    class="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X :size="14" class="text-slate-400" />
                  </button>
                </div>

                <!-- Preview info -->
                <div class="bg-slate-50 rounded-xl p-4 space-y-2">
                  <div class="flex justify-between text-xs">
                    <span class="text-slate-500">Module</span>
                    <span class="font-bold text-[#1B2559]">{{
                      preview.module
                    }}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-slate-500">Records</span>
                    <span class="font-bold text-[#1B2559]">{{
                      preview.recordCount
                    }}</span>
                  </div>
                  <div
                    v-if="preview.meta?.exportedAt"
                    class="flex justify-between text-xs"
                  >
                    <span class="text-slate-500">Exported</span>
                    <span class="font-bold text-slate-600">{{
                      formatDate(preview.meta.exportedAt)
                    }}</span>
                  </div>
                </div>

                <!-- Warning -->
                <div
                  class="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100"
                >
                  <AlertTriangle
                    :size="14"
                    class="text-amber-500 shrink-0 mt-0.5"
                  />
                  <p class="text-[10px] text-amber-700">
                    Import will add new records. Existing data will not be
                    affected.
                  </p>
                </div>
              </div>

              <!-- Error state -->
              <div v-else-if="error" class="error-zone">
                <div
                  class="w-12 h-12 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center mb-3"
                >
                  <AlertCircle :size="24" />
                </div>
                <p class="text-xs font-bold text-rose-600">{{ error }}</p>
                <button
                  @click="clearFile"
                  class="text-[10px] text-slate-500 hover:text-slate-700 mt-2"
                >
                  Try another file
                </button>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
              <button @click="closeModal" class="btn-secondary">Cancel</button>
              <button
                @click="confirmImport"
                :disabled="!preview || isImporting"
                class="btn-primary"
                :class="{ 'opacity-50 cursor-not-allowed': !preview }"
              >
                <Loader2 v-if="isImporting" :size="14" class="animate-spin" />
                <Upload v-else :size="14" />
                {{ isImporting ? "Importing..." : "Import Data" }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Upload,
  Loader2,
  FileUp,
  X,
  FileJson,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from "lucide-vue-next";
import { useImport, type ImportPreview } from "../../composables/useImport";

const props = defineProps<{
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  iconOnly?: boolean;
  importHandler: (
    moduleName: string,
    data: any[],
  ) => Promise<{ success: boolean; imported: number; errors?: string[] }>;
}>();

const emit = defineEmits<{
  imported: [{ success: boolean; message: string; recordCount?: number }];
}>();

const { isImporting, previewImport, executeImport, selectFile } = useImport();

const showModal = ref(false);
const selectedFile = ref<File | null>(null);
const preview = ref<ImportPreview | null>(null);
const error = ref<string | null>(null);

const handleClick = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  clearFile();
};

const clearFile = () => {
  selectedFile.value = null;
  preview.value = null;
  error.value = null;
};

const triggerFileSelect = async () => {
  const file = await selectFile();
  if (file) {
    await processFile(file);
  }
};

const handleDrop = async (event: DragEvent) => {
  const file = event.dataTransfer?.files[0];
  if (file) {
    await processFile(file);
  }
};

const processFile = async (file: File) => {
  selectedFile.value = file;
  error.value = null;

  const result = await previewImport(file);
  if (result) {
    preview.value = result;
  } else {
    error.value = `Invalid file format. Please use a valid JSON or CSV export file.`;
  }
};

const confirmImport = async () => {
  if (!selectedFile.value || !preview.value) return;

  const result = await executeImport(selectedFile.value, props.importHandler);

  emit("imported", {
    success: result.success,
    message: result.message,
    recordCount: result.recordCount,
  });

  if (result.success) {
    closeModal();
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const iconSize = computed(() => {
  const sizes = { sm: 14, md: 16, lg: 18 };
  return sizes[props.size || "md"];
});

const sizeClass = computed(() => {
  const classes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };
  return classes[props.size || "md"];
});

const variantClass = computed(() => {
  const classes = {
    primary: "bg-[#702DFF] hover:bg-[#5a1fd9] text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
  };
  return classes[props.variant || "secondary"];
});
</script>

<style scoped>
@reference "tailwindcss";
.import-button {
  @apply inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200;
}

.import-button:disabled {
  @apply opacity-70 cursor-not-allowed;
}

.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4;
}

.modal-content {
  @apply bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden;
}

.modal-header {
  @apply flex items-center justify-between p-5 border-b border-slate-100;
}

.modal-body {
  @apply p-5;
}

.modal-footer {
  @apply flex items-center justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50;
}

.upload-zone {
  @apply border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#702DFF] hover:bg-indigo-50/30 transition-all;
}

.upload-icon {
  @apply w-16 h-16 rounded-2xl bg-indigo-100 text-[#702DFF] flex items-center justify-center mx-auto;
}

.preview-zone {
  @apply space-y-4;
}

.error-zone {
  @apply text-center py-6;
}

.btn-secondary {
  @apply px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all;
}

.btn-primary {
  @apply px-4 py-2 text-xs font-bold bg-[#702DFF] text-white hover:bg-[#5a1fd9] rounded-xl transition-all flex items-center gap-2;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95);
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.15s ease;
}

.icon-swap-enter-from,
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
