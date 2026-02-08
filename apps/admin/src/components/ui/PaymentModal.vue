<template>
  <BottomSheet :is-open="isOpen" @close="$emit('close')">
    <div class="p-6 md:p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-[#1B2559] tracking-tight">Record Payment</h2>
          <p class="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Order Ref: {{ clientName }}</p>
        </div>
        <button @click="$emit('close')" class="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center">
          <X :size="20" />
        </button>
      </div>

      <!-- Payment Summary Card -->
      <div class="bg-indigo-50/50 rounded-[32px] p-6 mb-8 border border-indigo-100/50">
        <div class="flex justify-between items-end">
          <div>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Valuation</p>
            <p class="text-xl md:text-2xl font-black text-[#1B2559] tracking-tighter">{{ formatPrice(totalAmount) }}</p>
          </div>
          <div class="text-right">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Unpaid Balance</p>
            <p class="text-lg md:text-xl font-black text-rose-500 tracking-tighter">{{ formatPrice(totalAmount - currentPaid) }}</p>
          </div>
        </div>
        <div class="mt-4 h-2 bg-white rounded-full overflow-hidden p-0.5">
          <div class="h-full bg-[#702DFF] rounded-full transition-all duration-1000" :style="{ width: (currentPaid / totalAmount * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-1.5">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Payment Amount (IDR)</label>
          <div class="relative group">
            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-[#702DFF] font-black text-sm">Rp</span>
            <input 
              type="number" 
              v-model="amount" 
              required
              placeholder="e.g. 2,500,000"
              class="w-full bg-slate-50 border-2 border-transparent rounded-[24px] py-4 pl-12 pr-6 text-sm font-black text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 focus:ring-8 focus:ring-[#7029FF]/5 transition-all outline-none"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Payment Notes</label>
          <textarea 
            v-model="notes" 
            rows="3"
            placeholder="e.g. Down Payment termin 1..."
            class="w-full bg-slate-50 border-2 border-transparent rounded-[24px] py-4 px-6 text-sm font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 focus:ring-8 focus:ring-[#7029FF]/5 transition-all outline-none resize-none"
          ></textarea>
        </div>

        <div class="flex flex-col md:flex-row gap-3 pt-2 pb-6 md:pb-0">
          <button 
            type="button" 
            @click="$emit('close')"
            class="order-2 md:order-1 flex-1 px-6 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="order-1 md:order-2 flex-[2] px-6 py-4 rounded-[24px] bg-[#702DFF] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            <span v-if="!loading">Confirm Payment</span>
            <RotateCw v-else class="animate-spin" :size="16" />
          </button>
        </div>
      </form>
    </div>
  </BottomSheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X, RotateCw } from 'lucide-vue-next'
import { BottomSheet } from "@kangjessy/ui"

const props = defineProps<{
  isOpen: boolean
  clientName: string
  totalAmount: number
  currentPaid: number
  loading?: boolean
}>()

const emit = defineEmits(['close', 'confirm'])

const amount = ref<number>(0)
const notes = ref('')

function handleSubmit() {
  if (amount.value <= 0) return
  emit('confirm', {
    amount: amount.value,
    notes: notes.value
  })
  // Reset for next time
  amount.value = 0
  notes.value = ''
}

function formatPrice(p: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p)
}
</script>
