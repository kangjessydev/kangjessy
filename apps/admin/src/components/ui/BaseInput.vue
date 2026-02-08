<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">
      {{ label }}
      <span v-if="required" class="text-rose-500 ml-1">*</span>
    </label>
    <div class="relative group">
      <div v-if="icon" class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#7029FF]">
        <component :is="icon" :size="18" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="input-field"
        :class="[
          { '!border-rose-500 !focus:ring-rose-500': error },
          { 'pl-14': icon }
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="error" class="mt-2 text-[10px] font-bold text-rose-500 ml-2 animate-fade-in">{{ error }}</p>
    <p v-else-if="hint" class="mt-2 text-[10px] font-bold text-slate-300 ml-2 italic">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  id?: string
  label?: string
  type?: string
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  icon?: Component
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
