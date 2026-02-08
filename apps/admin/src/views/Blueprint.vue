<template>
  <div class="page-container">
    <PageHeader title="The Blueprint Stages" subtitle="Daftar tahapan utama dalam Digital Business Roadmap">
      <BaseButton variant="primary" @click="openStageModal()">
        <Plus :size="18" />
        New Stage
      </BaseButton>
    </PageHeader>

    <!-- Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard title="Total Stages" :value="stages.length" :icon="Layers" colorClass="bg-indigo-50 text-indigo-600" />
      <StatsCard title="Total Steps" :value="totalSteps" :icon="Zap" colorClass="bg-emerald-50 text-emerald-600" />
    </div>

    <!-- Table -->
    <div v-if="loading" class="p-20 text-center">
      <div class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-100">
              <th class="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stage Identity</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Icon</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Steps Count</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order</th>
              <th class="text-right py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stage, index) in stages" :key="stage.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#702DFF] font-black text-xs">
                    {{ stage.id.substring(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <h3 class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors cursor-pointer" @click="goToSteps(stage.id)">
                      {{ stage.name }}
                    </h3>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ stage.subtitle }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <component :is="getIconComponent(stage.icon)" :size="16" />
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-xs font-bold text-slate-500">{{ stage.steps?.length || 0 }} Steps</span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <div class="flex flex-col gap-0.5">
                    <button @click="moveStage(index, -1)" :disabled="index === 0" class="p-1 hover:bg-indigo-50 hover:text-[#702DFF] rounded transition-all disabled:opacity-20" title="Move Up">
                      <ChevronUp :size="14" />
                    </button>
                    <button @click="moveStage(index, 1)" :disabled="index === stages.length - 1" class="p-1 hover:bg-indigo-50 hover:text-[#702DFF] rounded transition-all disabled:opacity-20" title="Move Down">
                      <ChevronDown :size="14" />
                    </button>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button @click="goToSteps(stage.id)" class="btn-ghost w-8 h-8" title="Manage Steps">
                    <List :size="14" />
                  </button>
                  <button @click="openStageModal(stage)" class="btn-ghost w-8 h-8" title="Edit Stage">
                    <Edit2 :size="14" />
                  </button>
                  <button @click="handleDelete(stage)" class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50" title="Delete">
                    <Trash2 :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Stage Modal -->
    <div v-if="modal.show" class="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-white/20">
        <h2 class="text-2xl font-black text-[#1B2559] mb-6">
          {{ modal.data.id && modal.isEdit ? 'Edit Stage' : 'New Stage' }}
        </h2>
        
        <form @submit.prevent="saveStage" class="space-y-4">
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage ID (Slug)</label>
            <input v-model="modal.data.id" type="text" class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]" placeholder="visionary" :disabled="modal.isEdit">
          </div>
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stage Name</label>
            <input v-model="modal.data.name" type="text" class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]" placeholder="The Visionary">
          </div>
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subtitle</label>
            <input v-model="modal.data.subtitle" type="text" class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]" placeholder="Tahap Memulai & Identitas">
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Icon</label>
              <button type="button" @click="isIconPickerOpen = true" class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-white border border-slate-100 rounded-xl transition-all group">
                 <div class="flex items-center gap-2">
                   <component :is="getIconComponent(modal.data.icon || 'Layers')" :size="18" class="text-[#702DFF]" />
                   <span class="text-sm font-bold text-[#1B2559] truncate">{{ modal.data.icon || 'Select Icon' }}</span>
                 </div>
                 <ChevronDown :size="14" class="text-slate-300 group-hover:text-[#702DFF]" />
              </button>
            </div>
          </div>
          <div class="col-span-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Description</label>
            <textarea v-model="modal.data.description" rows="3" class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]" placeholder="Brief description of this stage..."></textarea>
          </div>

          <div class="flex gap-3 mt-8">
            <BaseButton variant="secondary" @click="modal.show = false" class="flex-1">Cancel</BaseButton>
            <BaseButton variant="primary" type="submit" :loading="modal.loading" class="flex-1">Save Stage</BaseButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Icon Picker Modal -->
    <div v-if="isIconPickerOpen" class="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4" @click="isIconPickerOpen = false">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 border border-white/20" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-black text-[#1B2559]">Select Icon</h3>
          <button @click="isIconPickerOpen = false" class="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <X :size="20" class="text-slate-400" />
          </button>
        </div>
        
        <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto p-1 custom-scrollbar">
          <button v-for="iconName in availableIcons" :key="iconName" @click="selectIcon(iconName)" 
            class="flex flex-col items-center justify-center p-2 rounded-xl border transition-all hover:scale-105"
            :class="modal.data.icon === iconName ? 'border-[#702DFF] bg-indigo-50 text-[#702DFF]' : 'border-slate-50 hover:border-indigo-100 hover:bg-slate-50 text-slate-400'">
            <component :is="getIconComponent(iconName)" :size="24" />
            <span class="text-[7px] font-black uppercase mt-1 truncate w-full text-center px-0.5">{{ iconName }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal :is-open="confirmModal.isOpen" :title="confirmModal.title" :message="confirmModal.message"
      variant="danger" confirm-text="Delete Stage" @close="confirmModal.isOpen = false" @confirm="executeDelete" />

    <!-- Toast -->
    <Toast v-if="toast.show" :message="toast.message" :variant="toast.variant" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as LucideIcons from 'lucide-vue-next'
import { Plus, Edit2, Trash2, Layers, Zap, List, ChevronUp, ChevronDown, X } from 'lucide-vue-next'
import { blueprintService, type RoadmapStage } from '../services/blueprintService'
import PageHeader from '../components/ui/PageHeader.vue'
import { BaseButton } from "@kangjessy/ui"
import StatsCard from '../components/ui/StatsCard.vue'
import Toast from '../components/ui/Toast.vue'
import ConfirmModal from '../components/ui/ConfirmModal.vue'

const router = useRouter()
const loading = ref(true)
const stages = ref<RoadmapStage[]>([])
const toast = ref({ show: false, message: '', variant: 'success' as 'success' | 'error' })

const isIconPickerOpen = ref(false)
const availableIcons = [
  'Palette', 'Target', 'Layout', 'Rocket', 'Zap', 'Globe', 
  'Monitor', 'Search', 'Type', 'Clock', 'CheckCircle', 
  'HelpCircle', 'FileText', 'ShoppingCart', 'MessageCircle', 
  'Workflow', 'Cpu', 'Filter', 'Layers', 'List', 'Settings', 
  'ExternalLink', 'Inbox', 'Send', 'Users', 'Briefcase', 'Code',
  'BarChart', 'BookOpen', 'Camera', 'Cloud', 'Database', 'Eye',
  'Gift', 'Heart', 'Home', 'Key', 'Link', 'Lock', 'Mail', 'Map',
  'Music', 'Phone', 'Play', 'Star', 'Tag', 'Trash', 'User', 'Video'
]

const modal = ref({
  show: false,
  loading: false,
  isEdit: false,
  data: {} as any
})

const selectIcon = (icon: string) => {
  modal.value.data.icon = icon
  isIconPickerOpen.value = false
}

const confirmModal = ref({
  isOpen: false,
  title: '',
  message: '',
  targetId: null as string | null
})

const totalSteps = computed(() => stages.value.reduce((acc, stage) => acc + (stage.steps?.length || 0), 0))

const fetchData = async () => {
  loading.value = true
  try {
    stages.value = await blueprintService.getAllStages()
  } catch (err) {
    console.error(err)
    showToast('Failed to fetch stages', 'error')
  } finally {
    loading.value = false
  }
}

const openStageModal = (stage?: RoadmapStage) => {
  modal.value.isEdit = !!stage
  modal.value.data = stage ? { ...stage } : { id: '', name: '', subtitle: '', description: '', icon: 'Layers', sort_order: stages.value.length }
  modal.value.show = true
}

const saveStage = async () => {
  modal.value.loading = true
  try {
    await blueprintService.upsertStage(modal.value.data)
    await fetchData()
    modal.value.show = false
    showToast('Stage saved successfully', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to save stage', 'error')
  } finally {
    modal.value.loading = false
  }
}

const handleDelete = (stage: RoadmapStage) => {
  confirmModal.value = {
    isOpen: true,
    title: 'Delete Stage?',
    message: `Are you sure you want to delete "${stage.name}"? This will also delete all steps inside it.`,
    targetId: stage.id
  }
}

const executeDelete = async () => {
  const id = confirmModal.value.targetId
  confirmModal.value.isOpen = false
  if (!id) return

  try {
    await blueprintService.deleteStage(id)
    await fetchData()
    showToast('Stage deleted', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to delete stage', 'error')
  }
}

const goToSteps = (stageId: string) => {
  router.push(`/blueprint/stages/${stageId}/steps`)
}

const moveStage = async (index: number, direction: number) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= stages.value.length) return

  const item = stages.value[index]
  const targetItem = stages.value[targetIndex]
  
  if (!item || !targetItem) return

  // Swap sort_order
  const oldOrder = item.sort_order
  item.sort_order = targetItem.sort_order
  targetItem.sort_order = oldOrder

  // Update in state
  const newStages = [...stages.value]
  newStages[index] = targetItem
  newStages[targetIndex] = item
  stages.value = newStages

  try {
    await blueprintService.updateStageOrder([
      { ...item },
      { ...targetItem }
    ])
    showToast('Order updated', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to update order', 'error')
    await fetchData()
  }
}

const getIconComponent = (name: string) => {
  return (LucideIcons as any)[name] || LucideIcons.HelpCircle
}

const showToast = (message: string, variant: 'success' | 'error') => {
  toast.value = { show: true, message, variant }
}

onMounted(fetchData)
</script>
