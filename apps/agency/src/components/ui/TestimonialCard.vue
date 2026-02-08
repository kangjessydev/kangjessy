<template>
    <article
        class="bg-bg-secondary/50 backdrop-blur-sm border border-border-color rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-accent-primary shadow-sm group"
        :class="customClass">
        <!-- Quote Icon -->
        <div class="text-accent-primary mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
            <QuoteIcon :size="24" class="shrink-0" />
        </div>

        <!-- Testimonial Text -->
        <p class="text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed text-text-primary mb-8 grow font-normal">
            "{{ text }}"
        </p>

        <!-- Client Info -->
        <div class="flex items-center gap-4 pt-6 border-t border-border-color">
            <!-- Avatar/Initials -->
            <div
                class="w-11 h-11 bg-bg-tertiary text-accent-primary rounded-lg grid place-items-center text-sm font-bold border border-border-color shadow-xs shrink-0 group-hover:bg-accent-primary group-hover:text-white transition-colors">
                {{ initials || getInitials(name) }}
            </div>
            
            <!-- Details -->
            <div class="flex flex-col min-w-0">
                <h4 class="text-[clamp(0.875rem,2vw,1rem)] font-bold text-text-primary leading-tight mb-1">
                    {{ name }}
                </h4>
                <p class="text-[clamp(0.75rem,1.5vw,0.85rem)] text-text-secondary leading-tight">
                    <template v-if="companyUrl">
                        {{ jobTitle }} @ <a :href="companyUrl" target="_blank" rel="noopener noreferrer"
                            class="text-accent-primary font-semibold hover:underline">{{ company }}</a>
                    </template>
                    <template v-else>
                        {{ jobTitle }} {{ company ? '@ ' + company : '' }}
                    </template>
                </p>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
export default {
    name: 'TestimonialCard'
}
</script>

<script setup lang="ts">
import { Quote as QuoteIcon } from 'lucide-vue-next';

interface Props {
    name: string;
    text: string;
    jobTitle?: string;
    company?: string;
    companyUrl?: string;
    initials?: string;
    customClass?: string;
}

const props = defineProps<Props>();

const getInitials = (name: string): string => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    const first = parts[0];
    const last = parts[parts.length - 1];
    
    if (parts.length > 1 && first && last && first[0] && last[0]) {
        return (first[0] + last[0]).toUpperCase();
    }
    return first?.[0]?.toUpperCase() || '??';
};
</script>
