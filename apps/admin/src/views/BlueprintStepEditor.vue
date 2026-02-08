<template>
  <div class="page-container">
    <!-- Action Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div class="flex flex-col gap-1">
          <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <router-link to="/blueprint" class="hover:text-[#702DFF] transition-colors">Stages</router-link>
            <ChevronRight :size="10" />
            <router-link :to="`/blueprint/stages/${step.stage_id}/steps`" class="hover:text-[#702DFF] transition-colors">
              {{ stageName }} Steps
            </router-link>
            <ChevronRight :size="10" />
            <span class="text-[#702DFF]">{{ isEdit ? 'Edit Step' : 'New Step' }}</span>
          </nav>
          <h1 class="text-2xl font-black text-[#1B2559] mt-1">{{ isEdit ? 'Edit Blueprint Step' : 'Create New Step' }}</h1>
        </div>
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <BaseButton variant="secondary" @click="router.back()" class="flex-1 sm:flex-none">Cancel</BaseButton>
          <BaseButton variant="secondary" @click="handleSave(false)" :loading="saving" class="flex-1 sm:flex-none !border-indigo-100 !text-[#702DFF] hover:!bg-indigo-50">
            <Save :size="18" />
            Save
          </BaseButton>
          <BaseButton variant="primary" @click="handleSave(true)" :loading="saving" class="w-full sm:w-auto">
            <Check :size="18" />
            Save & Close
          </BaseButton>
        </div>
      </div>

    <div v-if="loading" class="p-20 text-center">
      <div class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content Area -->
      <div class="lg:col-span-2 space-y-6">
        <DashboardCard title="Step Information" subtitle="Detail utama mengenai langkah di roadmap ini" :stretch="false">
          <div class="space-y-5">
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Step Title</label>
              <input v-model="step.title" type="text" class="input-field text-lg font-bold" placeholder="E.g. Fondasi Brand Identity">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Step ID (Slug)</label>
                <input v-model="step.id" type="text" class="input-field" placeholder="v-1" :disabled="!!isEdit">
              </div>
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Parent Stage</label>
                <select v-model="step.stage_id" class="select-field">
                  <option v-for="stage in stages" :key="stage.id" :value="stage.id">{{ stage.name }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Short Description</label>
              <textarea v-model="step.description" rows="3" class="input-field" placeholder="Short summary for the list view..."></textarea>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detailed Content (Markdown/HTML)</label>
              <textarea v-model="step.content" rows="10" class="input-field font-mono text-xs" placeholder="Full article or detail content..."></textarea>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Interactive Content (Checklist/Bullets)" subtitle="Daftar item untuk tipe checklist atau poin penting" :stretch="false">
          <div class="space-y-4">
            <div v-for="(_, index) in richContent" :key="index" class="flex gap-2">
              <input v-model="richContent[index]" type="text" class="input-field" :placeholder="`Item #${index + 1}`">
              <button @click="removeItem(index)" class="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                <Trash2 :size="18" />
              </button>
            </div>
            <button @click="addItem" class="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 font-bold text-xs hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2">
              <Plus :size="16" /> Add List Item
            </button>
          </div>
        </DashboardCard>
      </div>

      <!-- Settings Sidebar -->
      <div class="space-y-6">
        <DashboardCard title="Metadata & UI" :stretch="false">
          <div class="space-y-5">
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Step Type</label>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="type in types" :key="type" @click="step.type = type" 
                  class="px-3 py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all"
                  :class="step.type === type ? 'border-[#702DFF] bg-indigo-50 text-[#702DFF]' : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-indigo-100'">
                  {{ type }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Importance</label>
              <select v-model="step.importance" class="select-field">
                <option value="critical">Critical</option>
                <option value="recommended">Recommended</option>
                <option value="optional">Optional</option>
              </select>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Icon</label>
                <button @click="isIconPickerOpen = true" class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-white border border-slate-100 rounded-xl transition-all group">
                   <div class="flex items-center gap-2">
                     <component :is="getIconComponent(step.icon || 'HelpCircle')" :size="18" class="text-[#702DFF]" />
                     <span class="text-sm font-bold text-[#1B2559]">{{ step.icon || 'Select Icon' }}</span>
                   </div>
                   <ChevronDown :size="14" class="text-slate-300 group-hover:text-[#702DFF]" />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Typical Duration</label>
              <div class="flex gap-2">
                <input v-model="durationValue" type="text" class="input-field flex-1" placeholder="1-2 / Instan">
                <select v-model="durationUnit" class="select-field w-24">
                  <option value="">None</option>
                  <option value="Hari">Hari</option>
                  <option value="Jam">Jam</option>
                  <option value="Menit">Menit</option>
                  <option value="Minggu">Minggu</option>
                </select>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Call to Action (CTA)" :stretch="false">
          <div class="space-y-5">
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Action Label</label>
              <input v-model="step.action_label" type="text" class="input-field" placeholder="E.g. Baca Materi, Pesan Layanan">
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Link</label>
              <input v-model="step.link" type="text" class="input-field" placeholder="E.g. /blog/..., https://google.com">
            </div>
          </div>
        </DashboardCard>
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
              :class="step.icon === iconName ? 'border-[#702DFF] bg-indigo-50 text-[#702DFF]' : 'border-slate-50 hover:border-indigo-100 hover:bg-slate-50 text-slate-400'">
              <component :is="getIconComponent(iconName)" :size="24" />
              <span class="text-[7px] font-black uppercase mt-1 truncate w-full text-center px-0.5">{{ iconName }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Toast v-if="toast.show" :message="toast.message" :variant="toast.variant" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as LucideIcons from 'lucide-vue-next'
import { ChevronRight, Save, Plus, Trash2, X, ChevronDown, Check } from 'lucide-vue-next'
import { blueprintService, type RoadmapStep, type RoadmapStage } from '../services/blueprintService'
import { BaseButton } from "@kangjessy/ui"
import Toast from '../components/ui/Toast.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.params.id && route.params.id !== 'new')

const loading = ref(true)
const saving = ref(false)
const stages = ref<RoadmapStage[]>([])
const richContent = ref<string[]>([])
const toast = ref({ show: false, message: '', variant: 'success' as 'success' | 'error' })

const isIconPickerOpen = ref(false)
const durationValue = ref('')
const durationUnit = ref('Hari')

const step = ref<Partial<RoadmapStep>>({
  id: '',
  stage_id: (route.query.stageId as string) || '',
  type: 'article',
  title: '',
  description: '',
  icon: 'FileText',
  importance: 'recommended',
  duration: '',
  action_label: '',
  link: '',
  content: '',
  sort_order: 0
})

const types = ['article', 'tool', 'service', 'checklist'] as const
const stageName = computed(() => stages.value.find(s => s.id === step.value.stage_id)?.name || 'Stage')

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

onMounted(async () => {
  loading.value = true
  try {
    // Load stages for dropdown
    stages.value = await blueprintService.getAllStages()
    
    if (isEdit.value) {
      const id = route.params.id as string
      let found = false
      for (const stage of stages.value) {
        const s = stage.steps?.find(st => st.id === id)
        if (s) {
          step.value = { ...s }
          richContent.value = s.rich_content || []
          
          // Parse duration (e.g. "1-2 Hari")
          if (s.duration) {
            const parts = s.duration.split(' ')
            if (parts.length > 1) {
              durationValue.value = parts[0] || ''
              durationUnit.value = parts[1] || ''
            } else {
              durationValue.value = s.duration
              durationUnit.value = ''
            }
          }
          found = true
          break
        }
      }
      
      if (!found) {
        showToast('Step not found', 'error')
        router.push('/blueprint')
      }
    }
  } catch (err) {
    console.error(err)
    showToast('Failed to load editor data', 'error')
  } finally {
    loading.value = false
  }
})

const selectIcon = (icon: string) => {
  step.value.icon = icon
  isIconPickerOpen.value = false
}

const handleSave = async (redirect: boolean = false) => {
  if (!step.value.id || !step.value.title || !step.value.stage_id) {
    showToast('Missing required fields (ID, Title, Stage)', 'error')
    return
  }

  saving.value = true
  try {
    // Combine duration
    let combinedDuration = durationValue.value
    if (durationValue.value && durationUnit.value) {
      combinedDuration = `${durationValue.value} ${durationUnit.value}`
    }

    const dataToSave = {
      ...step.value,
      duration: combinedDuration,
      rich_content: richContent.value.filter(item => item.trim() !== '')
    }
    await blueprintService.upsertStep(dataToSave)
    showToast('Step saved successfully', 'success')
    
    if (redirect) {
      setTimeout(() => {
        router.push(`/blueprint/stages/${step.value.stage_id}/steps`)
      }, 1000)
    }
  } catch (err) {
    console.error(err)
    showToast('Failed to save step', 'error')
  } finally {
    saving.value = false
  }
}

const addItem = () => richContent.value.push('')
const removeItem = (index: number) => richContent.value.splice(index, 1)

const getIconComponent = (name: string) => {
  return (LucideIcons as any)[name] || LucideIcons.HelpCircle
}

const showToast = (message: string, variant: 'success' | 'error') => {
  toast.value = { show: true, message, variant }
}
</script>
