<template>
    <div class="relative">
        <label v-if="label" class="block text-[10px] font-black text-text-tertiary uppercase tracking-widest mb-1.5 ml-1 select-none">
            {{ label }}
        </label>
        
        <!-- Trigger Button -->
        <button type="button" 
            @click="toggleDropdown"
            class="w-full text-left bg-bg-primary border rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-between transition-all group"
            :class="[
                isOpen ? 'border-accent-primary ring-2 ring-accent-primary/10' : 'border-border-color hover:border-accent-primary/50',
                !modelValue ? 'text-text-tertiary' : 'text-text-primary'
            ]">
            <span class="truncate block">{{ selectedLabel || placeholder }}</span>
            <div class="flex items-center gap-2">
                <ChevronDown :size="16" class="text-text-tertiary transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
            </div>
        </button>

        <!-- Dropdown Menu -->
        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0 translate-y-2"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 translate-y-2"
        >
            <div v-if="isOpen" class="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-bg-primary border border-border-color rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
                <!-- Search Input -->
                <div v-if="searchable" class="p-2 border-b border-border-color/50 sticky top-0 bg-bg-primary z-10">
                    <div class="relative">
                        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                        <input 
                            ref="searchInputRef"
                            v-model="searchQuery" 
                            type="text" 
                            placeholder="Cari opsi..." 
                            class="w-full bg-bg-secondary rounded-lg pl-9 pr-3 py-2 text-xs font-bold text-text-primary outline-none focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-text-tertiary/50"
                        >
                    </div>
                </div>

                <!-- Options List -->
                <div class="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-border-color p-1">
                    <div v-if="filteredOptions.length === 0 && !$slots.footer" class="p-4 text-center text-[10px] font-bold text-text-tertiary italic">
                        Tidak ada hasil ditemukan.
                    </div>
                    <button v-for="option in filteredOptions" :key="option.value"
                        type="button"
                        @click="selectOption(option)"
                        class="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between group/opt"
                        :class="modelValue === option.value ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'">
                        <span>{{ option.label }}</span>
                        <Check v-if="modelValue === option.value" :size="14" class="text-accent-primary" />
                    </button>
                    <slot name="footer" :query="searchQuery"></slot>
                </div>
            </div>
        </Transition>

        <!-- Backdrop -->
        <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-40 bg-transparent cursor-default"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, type PropType } from 'vue';
import { ChevronDown, Search, Check } from 'lucide-vue-next';

interface Option {
    label: string;
    value: string | number;
}

const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    options: { type: Array as PropType<Option[]>, default: () => [] },
    label: { type: String, default: '' },
    placeholder: { type: String, default: 'Pilih opsi...' },
    searchable: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const selectedLabel = computed(() => {
    const opt = props.options.find(o => o.value === props.modelValue);
    return opt ? opt.label : '';
});

const filteredOptions = computed(() => {
    if (!searchQuery.value || searchQuery.value.trim() === '') {
        return props.options;
    }
    const q = searchQuery.value.toLowerCase().trim();
    return props.options.filter(o => 
        o.label && String(o.label).toLowerCase().includes(q)
    );
});

const toggleDropdown = async () => {
    if (isOpen.value) {
        isOpen.value = false;
    } else {
        isOpen.value = true;
        searchQuery.value = '';
        if (props.searchable) {
            await nextTick();
            searchInputRef.value?.focus();
        }
    }
};

const selectOption = (opt: Option) => {
    emit('update:modelValue', opt.value);
    emit('change', opt);
    isOpen.value = false;
};
</script>
