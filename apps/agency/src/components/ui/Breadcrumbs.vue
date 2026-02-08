<template>
    <nav class="flex items-center gap-3 text-sm text-text-secondary mb-6 flex-wrap" aria-label="Breadcrumb">
        <router-link to="/"
            class="text-text-secondary hover:text-accent-primary transition-colors duration-300 no-underline">Home</router-link>
        <template v-for="(item, index) in items" :key="index">
            <span class="text-text-secondary opacity-50 text-xs">/</span>
            <router-link v-if="item.to" :to="item.to"
                class="text-text-secondary hover:text-accent-primary transition-colors duration-300 no-underline">
                {{ item.label }}
            </router-link>
            <span v-else class="text-text-primary font-semibold">
                {{ item.label }}
            </span>
        </template>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface BreadcrumbItem {
    label: string;
    to?: string;
}

export default defineComponent({
    name: 'Breadcrumbs',
    props: {
        items: {
            type: Array as () => BreadcrumbItem[],
            required: true
        }
    }
});
</script>
