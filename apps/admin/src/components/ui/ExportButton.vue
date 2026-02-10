<template>
  <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
    <!-- JSON Export -->
    <button
      @click="handleExport('json')"
      :disabled="isExporting"
      class="export-btn"
      :class="[sizeClass, { 'active': exportingFormat === 'json', 'loading': isExporting && exportingFormat === 'json' }]">
      <transition name="icon-swap" mode="out-in">
        <Loader2 v-if="isExporting && exportingFormat === 'json'" :size="iconSize" class="animate-spin" />
        <FileJson v-else :size="iconSize" />
      </transition>
      <span v-if="!iconOnly">JSON</span>
    </button>

    <!-- CSV Export -->
    <button
      @click="handleExport('csv')"
      :disabled="isExporting"
      class="export-btn"
      :class="[sizeClass, { 'active': exportingFormat === 'csv', 'loading': isExporting && exportingFormat === 'csv' }]">
      <transition name="icon-swap" mode="out-in">
        <Loader2 v-if="isExporting && exportingFormat === 'csv'" :size="iconSize" class="animate-spin" />
        <FileSpreadsheet v-else :size="iconSize" />
      </transition>
      <span v-if="!iconOnly">CSV</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FileJson, FileSpreadsheet, Loader2 } from 'lucide-vue-next'
import { useExport, type ExportFormat } from '../../composables/useExport'

const props = defineProps<{
  data: any
  moduleName: string
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
}>()

const emit = defineEmits<{
  exported: [{ success: boolean; filename?: string }]
}>()

const { isExporting, exportData } = useExport()
const exportingFormat = ref<ExportFormat | null>(null)

const handleExport = async (format: ExportFormat) => {
  exportingFormat.value = format
  const result = await exportData(props.data, props.moduleName, {
    format
  })
  emit('exported', result)
  exportingFormat.value = null
}

const iconSize = computed(() => {
  const sizes = { sm: 12, md: 14, lg: 16 }
  return sizes[props.size || 'md']
})

const sizeClass = computed(() => {
  const classes = {
    sm: 'px-2 py-1 text-[10px]',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm'
  }
  return classes[props.size || 'md']
})
</script>

<style scoped>
@reference "tailwindcss";
.export-btn {
  @apply flex items-center gap-2 font-black uppercase tracking-widest rounded-lg transition-all duration-200;
  @apply text-slate-500 hover:text-[#702DFF] hover:bg-white dark:hover:bg-slate-700;
}

.export-btn:disabled {
  @apply opacity-50 cursor-not-allowed grayscale;
}

.export-btn.active {
  @apply bg-white dark:bg-slate-700 text-[#702DFF] shadow-sm;
}

.export-btn.loading {
  @apply text-[#702DFF];
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
