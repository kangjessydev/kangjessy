<template>
    <div class="relative group">
        <select :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            class="select-field !w-44 !py-2 !pl-4 !pr-10 !text-[10px] !font-black !rounded-xl !bg-white border border-slate-100 shadow-sm transition-all group-hover:border-indigo-100 focus:border-[#7029FF]/20 focus:ring-4 focus:ring-[#7029FF]/5"
            v-bind="$attrs">
            <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
            <slot />
        </select>
        <div
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors group-hover:text-[#702DFF] flex items-center justify-center">
            <slot name="icon">
                <ChevronDown :size="14" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
    modelValue: string | number
    placeholder?: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>
