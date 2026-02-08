<template>
    <section class="bg-bg-primary py-12 md:py-32" id="faq">
        <div class="container mx-auto px-4">
            <SectionHeader :badge="badge" align="center">
                <template #title>
                    <h2 class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">{{
                        title }}
                    </h2>
                </template>
                <template #desc>
                    <slot name="desc">
                        {{ description }}
                    </slot>
                </template>
            </SectionHeader>

            <div class="max-w-3xl mx-auto flex flex-col gap-4">
                <AccordionItem v-for="(item, index) in items" :key="index" :title="item.question"
                    :isOpen="activeIndex === index" @toggle="toggleFAQ(index)">
                    <p class="text-text-secondary leading-relaxed">{{ item.answer }}</p>
                </AccordionItem>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { homeFaq, type FAQ } from '../../../data/faqs/homeFaq';
import SectionHeader from '../../ui/SectionHeader.vue';
import AccordionItem from '../../ui/AccordionItem.vue';

withDefaults(defineProps<{
    badge?: string;
    title?: string;
    description?: string;
    items?: FAQ[];
}>(), {
    badge: 'Got Questions?',
    title: 'Frequently Asked Questions',
    description: 'Punya pertanyaan sebelum mulai bekerja sama? Berikut adalah jawaban untuk beberapa pertanyaan yang paling sering diajukan.',
    items: () => homeFaq
});

const activeIndex = ref<number | null>(null);

const toggleFAQ = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
</script>
