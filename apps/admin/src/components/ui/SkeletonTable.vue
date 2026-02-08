<template>
  <div class="skeleton-table">
    <!-- Table Header -->
    <div class="skeleton-table-header">
      <div v-for="col in columns" :key="col" class="skeleton-cell">
        <div class="skeleton-line w-3/4 h-4"></div>
      </div>
    </div>

    <!-- Table Rows -->
    <div v-for="row in rows" :key="row" class="skeleton-table-row">
      <div v-for="col in columns" :key="`${row}-${col}`" class="skeleton-cell">
        <div class="skeleton-line" :class="getCellWidth(col)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rows?: number
  columns?: number
}>()

const rows = computed(() => props.rows || 5)
const columns = computed(() => props.columns || 4)

const getCellWidth = (colIndex: number) => {
  // Vary widths for more realistic skeleton
  const widths = ['w-full', 'w-4/5', 'w-3/4', 'w-2/3']
  return widths[colIndex % widths.length]
}
</script>

<style scoped>
.skeleton-table {
  @apply bg-white rounded-2xl border border-slate-100 overflow-hidden;
}

.skeleton-table-header {
  @apply grid gap-4 p-6 border-b border-slate-100 bg-slate-50/50;
  grid-template-columns: repeat(v-bind('columns'), 1fr);
}

.skeleton-table-row {
  @apply grid gap-4 p-6 border-b border-slate-50;
  grid-template-columns: repeat(v-bind('columns'), 1fr);
}

.skeleton-table-row:last-child {
  @apply border-b-0;
}

.skeleton-cell {
  @apply flex items-center;
}

.skeleton-line {
  @apply h-4 bg-slate-100 rounded-lg animate-pulse;
}
</style>
