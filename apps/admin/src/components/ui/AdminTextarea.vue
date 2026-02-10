<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="label-main px-2">
      {{ label }}
      <span v-if="required" class="text-rose-500 ml-1">*</span>
    </label>
    <div class="relative group">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        class="input-field min-h-[120px] resize-none py-4"
        :class="[{ '!border-rose-500 !focus:ring-rose-500': error }]"
        @input="handleInput"
      ></textarea>
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
interface Props {
  id?: string;
  label?: string;
  modelValue?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  rows?: number;
}

withDefaults(defineProps<Props>(), {
  rows: 4,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
}
</script>
