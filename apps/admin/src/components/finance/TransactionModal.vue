<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-[#1B2559]/40 backdrop-blur-sm" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-lg transform overflow-hidden rounded-[32px] bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100">
                            <div class="flex items-center justify-between mb-8">
                                <div>
                                    <h3 class="text-xl font-black text-[#1B2559] leading-tight">Record Entry</h3>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                        Movement of capital record</p>
                                </div>
                                <button @click="closeModal"
                                    class="p-2 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-rose-500 transition-colors">
                                    <X :size="20" />
                                </button>
                            </div>

                            <!-- Form -->
                            <div class="space-y-6">
                                <!-- Type Toggle -->
                                <div class="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                    <button @click="formData.type = 'income'"
                                        class="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                        :class="formData.type === 'income' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'">
                                        <TrendingUp :size="14" />
                                        Income
                                    </button>
                                    <button @click="formData.type = 'expense'"
                                        class="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                        :class="formData.type === 'expense' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-400'">
                                        <TrendingDown :size="14" />
                                        Expense
                                    </button>
                                </div>

                                <!-- Input Amount -->
                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction
                                        Value</label>
                                    <div class="relative">
                                        <span
                                            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs pointer-events-none">Rp</span>
                                        <input type="text" :value="formattedAmount" @input="handleAmountInput"
                                            class="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-[#702DFF]/10 font-black text-2xl text-[#1B2559] outline-none transition-all"
                                            placeholder="0" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                        <select v-model="formData.category" class="select-field !text-xs !py-3">
                                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                                        </select>
                                    </div>
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-Category</label>
                                        <select v-model="formData.sub_category" class="select-field !text-xs !py-3">
                                            <optgroup label="Income Types" v-if="formData.type === 'income'">
                                                <option value="project_dp">DP Project</option>
                                                <option value="project_final">Final Payment</option>
                                                <option value="subscription">Subscription</option>
                                                <option value="store_sale">Store Item Sale</option>
                                            </optgroup>
                                            <optgroup label="Expense Types" v-else>
                                                <option value="hosting">Hosting/Domain</option>
                                                <option value="ads">Ads/Marketing</option>
                                                <option value="subcontractor">Subcontractor</option>
                                                <option value="assets">Assets/Tools</option>
                                                <option value="salary">Salary</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment
                                            Method</label>
                                        <select v-model="formData.source" class="select-field !text-xs !py-3">
                                            <option value="Manual">Manual Transfer</option>
                                            <option value="Midtrans">Midtrans</option>
                                            <option value="Stripe">Stripe</option>
                                            <option value="Cash">Cash</option>
                                        </select>
                                    </div>
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Effective
                                            Date</label>
                                        <input type="date" v-model="formData.date"
                                            class="select-field !text-xs !py-3" />
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label
                                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction
                                        Title</label>
                                    <input v-model="formData.title" type="text"
                                        placeholder="e.g. DP Web App Development" class="input-field !py-3 !text-sm" />
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Linked
                                            Client</label>
                                        <select v-model="formData.client_id" class="select-field !text-xs !py-3">
                                            <option :value="null">No Client</option>
                                            <option v-for="client in clients" :key="client.id" :value="client.id">{{
                                                client.name }}</option>
                                        </select>
                                    </div>
                                    <div class="space-y-2" v-if="formData.client_id">
                                        <label
                                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Link
                                            to Project</label>
                                        <select v-model="formData.project_id" class="select-field !text-xs !py-3">
                                            <option :value="null">Common Transaction</option>
                                            <option v-for="proj in filteredProjects" :key="proj.id" :value="proj.id">{{
                                                proj.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-10 flex gap-3">
                                <button @click="closeModal"
                                    class="flex-1 py-4 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl">
                                    Cancel
                                </button>
                                <button @click="handleSubmit" :disabled="loading || !formData.amount"
                                    class="flex-[2] py-4 bg-[#702DFF] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#702DFF]/20 flex items-center justify-center gap-2">
                                    <Save :size="16" v-if="!loading" />
                                    <RotateCw :size="16" class="animate-spin" v-else />
                                    Record Entry
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <Toast v-if="toast.show" :message="toast.message" :variant="toast.variant" @close="toast.show = false" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { X, TrendingUp, TrendingDown, Save, RotateCw } from 'lucide-vue-next'
import Toast from '../ui/Toast.vue'
import { clientsService } from '../../services/clientsService'
import { projectsService } from '../../services/projectsService'
import { transactionsService } from '../../services/transactionsService'
import type { Client, Project } from '../../types'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close', 'saved'])

const loading = ref(false)
const clients = ref<Client[]>([])
const allProjects = ref<Project[]>([])
const categories = ['services', 'store', 'subscription', 'other']

const formData = ref({
    type: 'income' as 'income' | 'expense',
    amount: 0,
    category: 'services',
    sub_category: 'project_dp',
    title: '',
    date: new Date().toISOString().split('T')[0],
    client_id: null as string | null,
    project_id: null as string | null,
    source: 'Manual'
})

const toast = ref({ show: false, message: '', variant: 'success' as 'success' | 'error' })
const showToast = (message: string, variant: 'success' | 'error' = 'success') => {
    toast.value = { show: true, message, variant }
    if (variant === 'success') {
        setTimeout(() => { toast.value.show = false }, 3000)
    }
}

onMounted(async () => {
    try {
        const [cData, pData] = await Promise.all([
            clientsService.getAll(),
            projectsService.getAll()
        ])
        clients.value = cData
        allProjects.value = pData
    } catch (e) { console.error(e) }
})

const filteredProjects = computed(() => {
    if (!formData.value.client_id) return []
    return allProjects.value.filter(p => p.client_id === formData.value.client_id)
})

watch(() => formData.value.client_id, () => {
    formData.value.project_id = null
})

watch(() => formData.value.type, (newType) => {
    formData.value.sub_category = newType === 'income' ? 'project_dp' : 'hosting'
    formData.value.category = newType === 'income' ? 'services' : 'other'
})

const formattedAmount = computed(() => formData.value.amount ? formData.value.amount.toLocaleString('id-ID') : '')

const handleAmountInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '')
    formData.value.amount = val ? parseInt(val) : 0
}

const closeModal = () => emit('close')

const handleSubmit = async () => {
    if (!formData.value.amount) {
        showToast("Please enter a transaction amount", 'error')
        return
    }
    loading.value = true
    try {
        const payload = {
            ...formData.value,
            client_id: formData.value.client_id || undefined,
            project_id: formData.value.project_id || undefined
        }
        await transactionsService.create(payload as any)
        formData.value = {
            type: 'income',
            amount: 0,
            category: 'services',
            sub_category: 'project_dp',
            title: '',
            date: new Date().toISOString().split('T')[0],
            client_id: null,
            project_id: null,
            source: 'Manual'
        }
        emit('saved')
        closeModal()
    } catch (err) {
        console.error(err)
        showToast('Failed to save transaction', 'error')
    } finally {
        loading.value = false
    }
}
</script>
