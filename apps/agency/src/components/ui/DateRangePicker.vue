<template>
    <div>
        <!-- Trigger Button -->
        <button @click="isOpen = true"
            class="flex items-center gap-2 h-10 px-4 bg-bg-primary border border-border-color rounded-lg text-[0.65rem] text-text-primary hover:border-accent-primary transition-all cursor-pointer select-none whitespace-nowrap">
            <CalendarIcon :size="14" class="text-text-tertiary shrink-0" />
            <span class="font-bold">{{ displayValue }}</span>
            <XIcon v-if="startDate || endDate" :size="12"
                class="text-text-tertiary hover:text-red-500 transition-colors shrink-0" @click.stop="clearDates" />
        </button>

        <!-- BottomSheet with Calendar -->
        <BottomSheet v-model="isOpen" title="Pilih Rentang Tanggal">
            <div class="p-6">
                <!-- Header Kalender -->
                <div class="flex justify-between items-center mb-6">
                    <button @click="prevMonth"
                        class="p-2 rounded-lg hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary transition-all cursor-pointer border-none">
                        <ChevronLeft :size="18" />
                    </button>
                    <span class="text-sm font-black text-text-primary uppercase tracking-widest">
                        {{ monthName }} {{ currentYear }}
                    </span>
                    <button @click="nextMonth"
                        class="p-2 rounded-lg hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary transition-all cursor-pointer border-none">
                        <ChevronRight :size="18" />
                    </button>
                </div>

                <!-- Grid Hari -->
                <div class="grid grid-cols-7 gap-1 mb-3">
                    <div v-for="day in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']" :key="day"
                        class="text-center text-[0.55rem] font-black text-text-tertiary uppercase py-2">
                        {{ day }}
                    </div>
                </div>

                <!-- Grid Tanggal -->
                <div class="grid grid-cols-7 gap-1 mb-6">
                    <div v-for="blank in blankDays" :key="'blank-' + blank" class="h-10"></div>
                    <button v-for="date in daysInMonth" :key="date" @click="handleDateClick(date)"
                        class="h-10 w-full rounded-lg text-[0.7rem] font-bold transition-all relative cursor-pointer border-none flex items-center justify-center p-0"
                        :class="getDateClasses(date)">
                        {{ date }}
                    </button>
                </div>

                <!-- Quick Select & Actions -->
                <div class="space-y-3 pt-4 border-t border-border-color/50">
                    <div class="grid grid-cols-3 gap-2">
                        <button @click="selectPreset('today')"
                            class="text-[0.65rem] font-bold text-text-tertiary hover:text-accent-primary py-2 px-3 hover:bg-accent-primary/5 rounded-lg transition-all cursor-pointer border border-border-color hover:border-accent-primary/30">
                            Hari Ini
                        </button>
                        <button @click="selectPreset('yesterday')"
                            class="text-[0.65rem] font-bold text-text-tertiary hover:text-accent-primary py-2 px-3 hover:bg-accent-primary/5 rounded-lg transition-all cursor-pointer border border-border-color hover:border-accent-primary/30">
                            Kemarin
                        </button>
                        <button @click="selectPreset('thisMonth')"
                            class="text-[0.65rem] font-bold text-text-tertiary hover:text-accent-primary py-2 px-3 hover:bg-accent-primary/5 rounded-lg transition-all cursor-pointer border border-border-color hover:border-accent-primary/30">
                            Bulan Ini
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button @click="clearDates"
                            class="text-[0.7rem] font-black text-text-tertiary hover:text-red-500 py-3 px-4 rounded-xl hover:bg-red-500/10 transition-all cursor-pointer border border-border-color hover:border-red-500/30 uppercase tracking-widest">
                            Hapus Filter
                        </button>
                        <button @click="isOpen = false"
                            class="text-[0.7rem] font-black text-white bg-accent-primary py-3 px-4 rounded-xl hover:opacity-90 transition-all cursor-pointer border-none uppercase tracking-widest">
                            Terapkan
                        </button>
                    </div>
                </div>
            </div>
        </BottomSheet>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar as CalendarIcon, X as XIcon, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { BottomSheet } from "@kangjessy/ui"

const props = defineProps<{
    startDate: string
    endDate: string
}>()

const emit = defineEmits(['update:startDate', 'update:endDate'])

const isOpen = ref(false)

// Kalender State
const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const monthName = computed(() => monthNames[currentMonth.value])

const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const blankDays = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

const displayValue = computed(() => {
    if (!props.startDate) return 'Semua Waktu'

    const startObj = new Date(props.startDate)
    const startStr = startObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })

    if (!props.endDate || props.startDate === props.endDate) {
        return startStr + ' ' + startObj.getFullYear()
    }

    const endObj = new Date(props.endDate)
    const endStr = endObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })

    return `${startStr} - ${endStr}`
})

const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear.value, currentMonth.value, day)
    const dateStr = clickedDate.toISOString().split('T')[0]

    if (!props.startDate || (props.startDate && props.endDate)) {
        // Start new range
        emit('update:startDate', dateStr)
        emit('update:endDate', '')
    } else {
        // Close range
        const start = new Date(props.startDate)
        if (clickedDate < start) {
            emit('update:startDate', dateStr)
            emit('update:endDate', props.startDate)
        } else {
            emit('update:endDate', dateStr)
        }
    }
}

const clearDates = () => {
    emit('update:startDate', '')
    emit('update:endDate', '')
}

const prevMonth = () => {
    currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
    currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const getDateClasses = (day: number) => {
    const d = new Date(currentYear.value, currentMonth.value, day)
    const dateStr = d.toISOString().split('T')[0]
    const isToday = new Date().toISOString().split('T')[0] === dateStr

    const isStart = props.startDate && props.startDate === dateStr
    const isEnd = props.endDate && props.endDate === dateStr

    let isInRange = false
    if (props.startDate && props.endDate && dateStr) {
        isInRange = dateStr > props.startDate && dateStr < props.endDate
    }

    if (isStart || isEnd) return 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30 z-10'
    if (isInRange) return 'bg-accent-primary/10 text-accent-primary rounded-none'
    if (isToday) return 'bg-bg-tertiary text-accent-primary border border-accent-primary/30 shadow-sm'

    return 'text-text-secondary hover:bg-bg-tertiary'
}

const selectPreset = (type: string) => {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    if (type === 'today') {
        emit('update:startDate', todayStr)
        emit('update:endDate', todayStr)
    } else if (type === 'yesterday') {
        const yes = new Date()
        yes.setDate(yes.getDate() - 1)
        const yesStr = yes.toISOString().split('T')[0]
        emit('update:startDate', yesStr)
        emit('update:endDate', yesStr)
    } else if (type === 'thisMonth') {
        const first = new Date(today.getFullYear(), today.getMonth(), 1)
        const last = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        emit('update:startDate', first.toISOString().split('T')[0])
        emit('update:endDate', last.toISOString().split('T')[0])
    }
}
</script>

<script lang="ts">
export default { name: 'DateRangePicker' }
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}
</style>
