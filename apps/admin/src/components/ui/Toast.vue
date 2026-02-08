<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-10 opacity-0 scale-95"
    enter-to-class="translate-y-0 opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100 scale-100"
    leave-to-class="translate-y-10 opacity-0 scale-95"
  >
    <div v-if="show" 
      class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] min-w-[320px] max-w-[480px]">
      <div :class="[
        'px-6 py-4 rounded-[24px] shadow-2xl backdrop-blur-xl border flex items-center gap-4',
        variant === 'error' ? 'bg-rose-500/95 border-rose-400/20 text-white' : 'bg-indigo-600/95 border-indigo-400/20 text-white'
      ]">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <component :is="variant === 'error' ? AlertCircle : CheckCircle" :size="20" />
        </div>
        <div class="flex-1">
          <p class="text-xs font-black uppercase tracking-widest opacity-60 mb-0.5">{{ variant === 'error' ? 'Notification' : 'Success' }}</p>
          <p class="text-[13px] font-bold leading-tight">{{ message }}</p>
        </div>
        <button @click="show = false" class="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <X :size="18" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AlertCircle, CheckCircle, X } from 'lucide-vue-next'

const props = defineProps<{
  message: string
  variant?: 'error' | 'success'
  duration?: number
}>()

const emit = defineEmits(['close'])
const show = ref(true)

onMounted(() => {
  if (props.duration !== 0) {
    setTimeout(() => {
      show.value = false
      setTimeout(() => emit('close'), 300)
    }, props.duration || 4000)
  }
})
</script>
