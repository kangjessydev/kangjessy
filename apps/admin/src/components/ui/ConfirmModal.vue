<template>
  <BottomSheet :is-open="isOpen" @close="closeModal">
    <div class="p-6 md:p-8">
      <!-- Icon & Header -->
      <div class="flex flex-col items-center text-center mb-8">
        <div 
          class="w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[32px] flex items-center justify-center mb-6 shadow-2xl transition-transform hover:scale-110"
          :class="variant === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-[#702DFF]'"
        >
          <template v-if="variant === 'danger'">
            <AlertTriangle :size="32" class="md:hidden" />
            <AlertTriangle :size="40" class="hidden md:block" />
          </template>
          <template v-else>
            <Info :size="32" class="md:hidden" />
            <Info :size="40" class="hidden md:block" />
          </template>
        </div>
        
        <h3 class="text-xl md:text-2xl font-black text-[#1B2559] leading-tight px-4">{{ title }}</h3>
        <p class="mt-3 text-sm md:text-base font-medium text-slate-400 leading-relaxed px-2">
          {{ message }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col md:flex-row gap-3 pb-6 md:pb-0">
        <button 
          @click="closeModal"
          class="order-2 md:order-1 flex-1 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
        >
          {{ cancelText }}
        </button>
        <button 
          @click="handleConfirm"
          class="order-1 md:order-2 flex-[1.5] py-4 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          :class="variant === 'danger' ? 'bg-rose-500 shadow-rose-500/20 hover:bg-rose-600' : 'bg-[#702DFF] shadow-indigo-500/20 hover:bg-[#6020EE]'"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { AlertTriangle, Info } from 'lucide-vue-next'
import { BottomSheet } from "@kangjessy/ui"

const props = withDefaults(defineProps<{
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'info'
}>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info'
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => emit('close')
const handleConfirm = () => {
  emit('confirm')
  closeModal()
}
</script>
