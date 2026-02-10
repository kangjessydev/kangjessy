<template>
  <div>
    <!-- Desktop Table View -->
    <AdminCard
      no-padding
      class="hidden md:block overflow-hidden !rounded-[32px] border border-slate-100/50 shadow-xl shadow-slate-200/20"
      :class="containerClass"
    >
      <div class="overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                :class="[
                  column.headerClass,
                  column.align === 'right' ? 'text-right' : '',
                ]"
              >
                <!-- Slot for custom header content -->
                <slot :name="`header-${column.key}`" :column="column">
                  <!-- Default header rendering -->
                  {{ column.label }}
                </slot>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="getItemKey(item, index)"
              class="table-row-hover group"
              :class="rowClass"
            >
              <td
                v-for="column in columns"
                :key="column.key"
                :class="[
                  column.cellClass,
                  column.align === 'right' ? 'text-right' : '',
                ]"
              >
                <!-- Slot for custom cell content -->
                <slot
                  :name="`cell-${column.key}`"
                  :item="item"
                  :value="getNestedValue(item, column.key)"
                  :index="index"
                >
                  <!-- Default cell rendering -->
                  {{ getNestedValue(item, column.key) }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0 && !loading" class="p-20 text-center">
        <div
          class="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4"
        >
          <slot name="empty-icon">
            <component :is="emptyIcon" :size="32" class="text-slate-200" />
          </slot>
        </div>
        <h3 class="text-[#1B2559] font-black text-lg">{{ emptyTitle }}</h3>
        <p class="text-slate-400 text-sm mt-1">{{ emptyMessage }}</p>
      </div>
    </AdminCard>

    <!-- Mobile Card View -->
    <div
      v-if="mobileView"
      class="md:hidden space-y-4"
      :class="mobileContainerClass"
    >
      <slot
        name="mobile-item"
        v-for="(item, index) in items"
        :item="item"
        :index="index"
      >
        <!-- Default mobile card (can be overridden) -->
        <div
          :key="getItemKey(item, index)"
          class="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/20 border border-slate-50 active:scale-95 transition-all"
        >
          <slot name="mobile-content" :item="item" :index="index">
            <p class="text-slate-400 text-sm">
              Define mobile-content slot for custom mobile view
            </p>
          </slot>
        </div>
      </slot>

      <!-- Mobile Empty State -->
      <div v-if="items.length === 0 && !loading" class="p-12 text-center">
        <div
          class="w-14 h-14 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-3"
        >
          <component :is="emptyIcon" :size="28" class="text-slate-200" />
        </div>
        <h3 class="text-[#1B2559] font-black text-base">{{ emptyTitle }}</h3>
        <p class="text-slate-400 text-xs mt-1">{{ emptyMessage }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-20 text-center">
      <div
        class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
      ></div>
      <p
        class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
      >
        {{ loadingText }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  headerClass?: string;
  cellClass?: string;
}
</script>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import AdminCard from "./AdminCard.vue";

interface Props {
  columns: TableColumn[];
  items: any[];
  itemKey?: string; // Property to use as unique key (default: 'id')
  loading?: boolean;
  loadingText?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: any;
  containerClass?: string;
  rowClass?: string;
  mobileView?: boolean;
  mobileContainerClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  itemKey: "id",
  loading: false,
  loadingText: "Loading data...",
  emptyTitle: "No data found",
  emptyMessage: "Try adjusting your filters or add new data.",
  emptyIcon: Search,
  containerClass: "",
  rowClass: "",
  mobileView: true,
  mobileContainerClass: "mb-20",
});

// Get nested value from object using dot notation (e.g., 'user.name')
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

// Get unique key for each row
function getItemKey(item: any, index: number) {
  return item[props.itemKey] || `item-${index}`;
}
</script>
