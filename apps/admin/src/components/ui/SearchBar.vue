<template>
    <div class="relative group flex-1 w-full max-w-md">
        <Search :size="16"
            class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#702DFF]" />
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            type="text" :placeholder="placeholder"
            class="input-field !pl-14 !py-2.5 !rounded-xl !text-[11px] !bg-slate-50/50 hover:bg-slate-50 focus:bg-white transition-all w-full" />
    </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'

defineProps<{
    modelValue: string
    placeholder?: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>
