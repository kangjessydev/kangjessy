<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="label-main px-2">
      {{ label }}
      <span v-if="required" class="text-rose-500 ml-1">*</span>
    </label>
    <div class="relative group">
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        class="select-field"
        :class="[
          { '!border-rose-500 !focus:ring-rose-500': error },
          paddingClass,
        ]"
        @change="handleChange"
      >
        <slot />
      </select>

      <!-- Custom Chevron -->
      <div
        class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within:text-[#702DFF] transition-colors"
      >
        <ChevronDown :size="18" />
      </div>
    </div>
    <p
      v-if="error"
      class="mt-2 text-[10px] font-bold text-rose-500 ml-4 animate-fade-in-up"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-2 text-[10px] font-bold text-slate-300 ml-4 italic"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

interface Props {
  id?: string;
  label?: string;
  modelValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  paddingClass?: string;
}

withDefaults(defineProps<Props>(), {
  paddingClass: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

function handleChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
}
</script>
