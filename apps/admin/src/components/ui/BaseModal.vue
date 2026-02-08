<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
        
        <!-- Modal Content -->
        <div 
          class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
            <button 
              @click="$emit('close')" 
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X :size="20" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
            <slot name="footer">
              <BaseButton variant="secondary" @click="$emit('close')">Cancel</BaseButton>
              <BaseButton variant="primary" :loading="loading" @click="$emit('confirm')">Save Changes</BaseButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { BaseButton } from "@kangjessy/ui"

defineProps<{
  show: boolean
  title: string
  loading?: boolean
}>()

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
