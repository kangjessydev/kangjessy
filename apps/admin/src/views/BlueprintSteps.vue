<template>
  <div class="page-container">
    <PageHeader :title="`Steps: ${stageName}`" :subtitle="`Manajemen langkah-langkah di tahap ${stageName}`">
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="router.push('/blueprint')">
          <ChevronLeft :size="18" />
          Back to Stages
        </BaseButton>
        <BaseButton variant="primary" @click="createNewStep">
          <Plus :size="18" />
          Add New Step
        </BaseButton>
      </div>
    </PageHeader>

    <div v-if="loading" class="p-20 text-center">
      <div class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-100">
              <th class="text-left py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Step Name</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Importance</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</th>
              <th class="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order</th>
              <th class="text-right py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="steps.length === 0">
              <td colspan="6" class="p-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">No steps found in this stage.</td>
            </tr>
            <tr v-for="(step, index) in steps" :key="step.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3 cursor-pointer" @click="editStep(step.id)">
                  <div class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#702DFF] transition-colors border border-slate-100">
                    <component :is="getIconComponent(step.icon)" :size="16" />
                  </div>
                  <div>
                    <h4 class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors line-clamp-1">{{ step.title }}</h4>
                    <p class="text-[10px] text-slate-400 line-clamp-1">{{ step.description }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md" :class="getTypeClass(step.type)">
                  {{ step.type }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md" :class="getImportanceClass(step.importance)">
                  {{ step.importance }}
                </span>
              </td>
              <td class="py-4 px-4 text-xs font-bold text-slate-400 italic">
                {{ step.duration || '-' }}
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <div class="flex flex-col gap-0.5">
                    <button @click="moveStep(index, -1)" :disabled="index === 0" class="p-1 hover:bg-indigo-50 hover:text-[#702DFF] rounded transition-all disabled:opacity-20" title="Move Up">
                      <ChevronUp :size="14" />
                    </button>
                    <button @click="moveStep(index, 1)" :disabled="index === steps.length - 1" class="p-1 hover:bg-indigo-50 hover:text-[#702DFF] rounded transition-all disabled:opacity-20" title="Move Down">
                      <ChevronDown :size="14" />
                    </button>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button @click="editStep(step.id)" class="btn-ghost w-8 h-8" title="Edit Step">
                    <Edit2 :size="14" />
                  </button>
                  <button @click="handleDelete(step)" class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50" title="Delete">
                    <Trash2 :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal :is-open="confirmModal.isOpen" :title="confirmModal.title" :message="confirmModal.message"
      variant="danger" confirm-text="Delete Step" @close="confirmModal.isOpen = false" @confirm="executeDelete" />

    <!-- Toast -->
    <Toast v-if="toast.show" :message="toast.message" :variant="toast.variant" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as LucideIcons from 'lucide-vue-next'
import { Plus, Edit2, Trash2, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-vue-next'
import { blueprintService, type RoadmapStep } from '../services/blueprintService'
import PageHeader from '../components/ui/PageHeader.vue'
import { BaseButton } from "@kangjessy/ui"
import Toast from '../components/ui/Toast.vue'
import ConfirmModal from '../components/ui/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const stageId = route.params.stageId as string
const stageName = ref('Loading...')
const steps = ref<RoadmapStep[]>([])
const loading = ref(true)
const toast = ref({ show: false, message: '', variant: 'success' as 'success' | 'error' })

const confirmModal = ref({
  isOpen: false,
  title: '',
  message: '',
  targetId: null as string | null
})

const fetchData = async () => {
  loading.value = true
  try {
    const allStages = await blueprintService.getAllStages()
    const stage = allStages.find(s => s.id === stageId)
    if (stage) {
      stageName.value = stage.name
      steps.value = stage.steps || []
    } else {
      showToast('Stage not found', 'error')
      router.push('/blueprint')
    }
  } catch (err) {
    console.error(err)
    showToast('Failed to fetch steps', 'error')
  } finally {
    loading.value = false
  }
}

const createNewStep = () => {
  router.push({
    path: '/blueprint/steps/new',
    query: { stageId }
  })
}

const editStep = (stepId: string) => {
  router.push(`/blueprint/steps/${stepId}/edit`)
}

const handleDelete = (step: RoadmapStep) => {
  confirmModal.value = {
    isOpen: true,
    title: 'Delete Step?',
    message: `Are you sure you want to delete "${step.title}"?`,
    targetId: step.id
  }
}

const executeDelete = async () => {
  const id = confirmModal.value.targetId
  confirmModal.value.isOpen = false
  if (!id) return

  try {
    await blueprintService.deleteStep(id)
    await fetchData()
    showToast('Step deleted', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to delete step', 'error')
  }
}

const getIconComponent = (name: string) => {
  return (LucideIcons as any)[name] || LucideIcons.HelpCircle
}

const getTypeClass = (type: string) => {
  switch (type) {
    case 'article': return 'bg-blue-50 text-blue-500'
    case 'tool': return 'bg-amber-50 text-amber-500'
    case 'service': return 'bg-indigo-50 text-indigo-500'
    case 'checklist': return 'bg-emerald-50 text-emerald-500'
    default: return 'bg-slate-50 text-slate-500'
  }
}

const getImportanceClass = (importance: string) => {
  switch (importance) {
    case 'critical': return 'bg-rose-50 text-rose-500'
    case 'recommended': return 'bg-indigo-50 text-indigo-500'
    default: return 'bg-slate-50 text-slate-500'
  }
}

const showToast = (message: string, variant: 'success' | 'error') => {
  toast.value = { show: true, message, variant }
}

const moveStep = async (index: number, direction: number) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= steps.value.length) return

  const item = steps.value[index]
  const targetItem = steps.value[targetIndex]
  
  if (!item || !targetItem) return

  // Swap sort_order
  const oldOrder = item.sort_order
  item.sort_order = targetItem.sort_order
  targetItem.sort_order = oldOrder

  // Update in state
  const newSteps = [...steps.value]
  newSteps[index] = targetItem
  newSteps[targetIndex] = item
  steps.value = newSteps

  try {
    // Send full objects to ensure all required fields are present for upsert
    await blueprintService.updateStepOrder([
      { ...item },
      { ...targetItem }
    ])
    showToast('Order updated', 'success')
  } catch (err) {
    console.error(err)
    showToast('Failed to update order', 'error')
    await fetchData() // Revert on failure
  }
}

onMounted(fetchData)
</script>
