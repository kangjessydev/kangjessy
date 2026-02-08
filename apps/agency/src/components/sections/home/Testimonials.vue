<template>
    <section id="testimonials" class="bg-bg-primary py-32">
        <div class="container mx-auto px-4">
            <SectionHeader title="Client Reviews" subtitle="Reliable code delivered to reliable partners.">
                <template #title>
                    Client <span
                        class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Reviews</span>
                </template>
            </SectionHeader>

            <!-- Testimonials Grid/Slider -->
            <div class="md:hidden">
                <div class="flex justify-end gap-2.5 mb-4">
                    <button @click="scrollSlider('prev')"
                        aria-label="Previous testimonial"
                        class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors">
                        <ChevronLeftIcon :size="20" />
                    </button>
                    <button @click="scrollSlider('next')"
                        aria-label="Next testimonial"
                        class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors">
                        <ChevronRightIcon :size="20" />
                    </button>
                </div>

                <div ref="sliderRef" @scroll="handleScroll"
                    class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-5 no-scrollbar mx-[-20px] px-5">
                    <TestimonialCard v-for="(item, index) in testimonials" :key="'mob-' + index"
                        v-bind="item"
                        custom-class="snap-center shrink-0 w-[calc(100%-20px)] active:scale-[0.98]" />
                </div>

                <div class="flex justify-center gap-2 mt-4">
                    <span v-for="(_, i) in testimonials" :key="i" class="h-1.5 rounded-full transition-all duration-300"
                        :class="[currentSlide === i ? 'w-6 bg-accent-primary' : 'w-2 bg-border-color']"></span>
                </div>
            </div>

            <!-- Desktop View -->
            <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard v-for="(item, index) in testimonials" :key="'desk-' + index"
                    v-bind="item" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-vue-next';
import SectionHeader from '../../ui/SectionHeader.vue';
import TestimonialCard from '../../ui/TestimonialCard.vue';

const sliderRef = ref<HTMLElement | null>(null);
const currentSlide = ref(0);

const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const scrollLeft = target.scrollLeft;
    const items = target.querySelectorAll('article');
    if (items.length > 0) {
        const itemWidth = (items[0] as HTMLElement).offsetWidth + 16;
        currentSlide.value = Math.round(scrollLeft / itemWidth);
    }
};

const scrollSlider = (direction: 'next' | 'prev') => {
    if (!sliderRef.value) return;
    const items = sliderRef.value.querySelectorAll('article');
    if (items.length === 0) return;

    const itemWidth = (items[0] as HTMLElement).offsetWidth + 16;
    const totalSlides = testimonials.length;

    if (direction === 'next') {
        if (currentSlide.value >= totalSlides - 1) {
            sliderRef.value.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            sliderRef.value.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    } else {
        if (currentSlide.value <= 0) {
            sliderRef.value.scrollTo({ left: itemWidth * (totalSlides - 1), behavior: 'smooth' });
        } else {
            sliderRef.value.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    }
};

const testimonials = [
    {
        text: "Migrasi dari WordPress ke Laravel + Filament berjalan mulus tanpa downtime. Dashboard admin yang dibangun sangat intuitif untuk tim non-teknis kami.",
        name: 'Budi Santoso',
        jobTitle: 'Operations Director',
        company: 'Warung Pintar',
        initials: 'BS'
    },
    {
        text: "Our fintech dashboard needed real-time transaction monitoring. The Vue 3 + Supabase implementation exceeded expectations—fast, secure, and scalable.",
        name: 'Priya Sharma',
        jobTitle: 'Head of Product',
        company: 'PayNow Asia',
        initials: 'PS'
    },
    {
        text: "Refactored our legacy PHP codebase into a modern Laravel API. Performance improved by 60% and maintenance costs dropped significantly.",
        name: 'Ahmad Fauzi',
        jobTitle: 'CTO',
        company: 'LogistikKu',
        initials: 'AF'
    },
    {
        text: "Built our entire e-learning platform from scratch—Vue frontend, Laravel backend, payment gateway integration. Launched in 8 weeks, now serving 10K+ students.",
        name: 'Michelle Tan',
        jobTitle: 'Founder & CEO',
        company: 'SkillUp Academy',
        initials: 'MT'
    },
    {
        text: "Automation setup saved our team 15+ hours weekly. WhatsApp API integration with CRM is a game-changer for our sales pipeline.",
        name: 'Rizki Pratama',
        jobTitle: 'Sales Manager',
        company: 'PropTech Indonesia',
        initials: 'RP'
    },
    {
        text: "Clean code, thorough documentation, and proactive communication. The Filament admin panel he built is exactly what we needed—no bloat, just functionality.",
        name: 'Sarah Lim',
        jobTitle: 'Product Manager',
        company: 'HealthHub SG',
        initials: 'SL'
    }
];
</script>
