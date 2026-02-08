<template>
    <div>
        <!-- Folder Button -->
        <div class="flex items-center group">
            <button @click="toggleExpand" 
                class="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors shrink-0"
                :style="{ marginLeft: `${level * 12}px` }">
                <ChevronRight v-if="hasChildren" :size="14" 
                    class="transition-transform duration-200" 
                    :class="{ 'rotate-90': isExpanded }" />
            </button>
            <button @click="$emit('select', folder.id)"
                class="flex-1 flex items-center gap-2 px-2 py-2 rounded-lg transition-all text-left min-w-0"
                :class="selectedId === folder.id ? 'bg-indigo-50 text-[#702DFF]' : 'hover:bg-slate-50 text-slate-600'">
                <Folder :size="14" class="shrink-0" :class="selectedId === folder.id ? 'text-[#702DFF]' : 'text-amber-400'" />
                <span class="text-[11px] font-bold truncate flex-1">{{ folder.name }}</span>
            </button>
            <button @click.stop="$emit('delete', folder.id)"
                class="w-6 h-6 rounded-md flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 hover:text-rose-500 hover:bg-rose-50 transition-all shrink-0"
                title="Delete folder">
                <Trash2 :size="12" />
            </button>
        </div>

        <!-- Children -->
        <Transition
            enter-active-class="transition-all duration-200 ease-out overflow-hidden"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-[500px]"
            leave-active-class="transition-all duration-150 ease-in overflow-hidden"
            leave-from-class="opacity-100 max-h-[500px]"
            leave-to-class="opacity-0 max-h-0">
            <div v-if="isExpanded && hasChildren">
                <FolderItem 
                    v-for="child in children" 
                    :key="child.id"
                    :folder="child"
                    :all-folders="allFolders"
                    :selected-id="selectedId"
                    :level="level + 1"
                    @select="$emit('select', $event)"
                    @delete="$emit('delete', $event)"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { Folder, ChevronRight, Trash2 } from 'lucide-vue-next'
import type { MediaFolder } from '../../types'

const props = defineProps<{
    folder: MediaFolder
    selectedId: string | null
    level: number
    allFolders?: MediaFolder[]
}>()

defineEmits<{
    (e: 'select', folderId: string): void
    (e: 'delete', folderId: string): void
}>()

const isExpanded = ref(true)

// Get all folders from parent or use prop
const folders = inject<{ value: MediaFolder[] }>('folders', { value: [] })
const allFoldersList = computed(() => props.allFolders || folders.value)

const children = computed(() => {
    return allFoldersList.value.filter(f => f.parentId === props.folder.id)
})

const hasChildren = computed(() => children.value.length > 0)

const toggleExpand = () => {
    if (hasChildren.value) {
        isExpanded.value = !isExpanded.value
    }
}
</script>
