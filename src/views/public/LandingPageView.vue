<template>
    <div v-if="loading" class="min-h-screen bg-bg-primary flex items-center justify-center">
        <div class="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="pageData" :class="['min-h-screen font-sans', getTemplateClasses()]">
        <!-- Simple Landing Navbar -->
        <nav class="fixed top-0 left-0 right-0 z-100 backdrop-blur-xl border-b border-white/5 bg-black/20">
            <div class="container py-5 flex justify-between items-center">
                <router-link to="/" class="text-2xl font-black text-text-primary tracking-tighter">
                    Kang<span class="text-accent-primary">Jessy Agency</span>
                </router-link>
                <div class="hidden sm:block">
                    <BaseButton :to="sections.hero?.primaryCta?.link" variant="primary" size="sm"
                        @click="handleCtaClick(sections.hero?.primaryCta)">
                        {{ sections.hero?.primaryCta?.text || 'Get Started' }}
                    </BaseButton>
                </div>
            </div>
        </nav>

        <main class="pt-24 overflow-x-hidden">
            <!-- Hero Section -->
            <section v-if="sections.hero" class="py-20 lg:py-32">
                <div class="container">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-center lg:text-left">
                        <div class="space-y-8 animate-fade-in-up">
                            <span v-if="sections.hero.badge"
                                class="inline-block px-5 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-bold border border-accent-primary/20">
                                {{ sections.hero.badge }}
                            </span>
                            <h1 class="text-[clamp(3rem,7vw,4.5rem)] font-black leading-tight tracking-tight text-text-primary">
                                {{ sections.hero.headline }}
                            </h1>
                            <p class="text-[clamp(1.125rem,2vw,1.25rem)] text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {{ sections.hero.subheadline }}
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <BaseButton v-if="sections.hero.primaryCta" :to="sections.hero.primaryCta.link"
                                    variant="primary" size="lg" @click="handleCtaClick(sections.hero.primaryCta)">
                                    {{ sections.hero.primaryCta.text }}
                                </BaseButton>
                                <BaseButton v-if="sections.hero.secondaryCta" :to="sections.hero.secondaryCta.link"
                                    variant="secondary" size="lg" @click="handleCtaClick(sections.hero.secondaryCta)">
                                    {{ sections.hero.secondaryCta.text }}
                                </BaseButton>
                            </div>
                        </div>
                        <div v-if="sections.hero.heroImage" class="relative group animate-fade-in">
                            <div
                                class="absolute -inset-4 bg-accent-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            </div>
                            <img :src="sections.hero.heroImage" :alt="sections.hero.headline"
                                class="relative w-full rounded-[40px] shadow-2xl border border-white/10" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Social Proof / Stats -->
            <section v-if="sections.socialProof?.enabled" class="py-16">
                <div class="container">
                    <div
                        class="bg-bg-secondary border border-border-color rounded-[40px] p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        <div v-for="(stat, index) in sections.socialProof.stats" :key="index" class="space-y-2">
                            <div class="text-[clamp(2.5rem,5vw,3rem)] font-black text-accent-primary">{{ stat.number }}</div>
                            <div class="text-xs uppercase tracking-widest font-bold text-text-tertiary">
                                {{ stat.label }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Comparison Section -->
            <section v-if="sections.comparison?.enabled" class="py-24">
                <div class="container">
                    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 class="text-[clamp(1.875rem,5vw,3rem)] font-black tracking-tight">{{ sections.comparison.title }}</h2>
                        <p class="text-text-secondary text-[clamp(1.125rem,2vw,1.25rem)]">{{ sections.comparison.subtitle }}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <!-- Us -->
                        <div class="bg-accent-primary/5 border-2 border-accent-primary rounded-[32px] p-10 space-y-8">
                            <h3
                                class="text-2xl font-bold text-center underline decoration-accent-primary decoration-4 underline-offset-8">
                                {{ sections.comparison.usName }}
                            </h3>
                            <ul class="space-y-5">
                                <li v-for="item in sections.comparison.usItems" :key="item"
                                    class="flex items-start gap-4">
                                    <div
                                        class="w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center text-white shrink-0">
                                        <CheckIcon :size="14" class="shrink-0" />
                                    </div>
                                    <span class="text-lg font-medium">{{ item }}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- Others -->
                        <div
                            class="bg-bg-secondary border border-border-color rounded-[32px] p-10 space-y-8 opacity-60">
                            <h3 class="text-2xl font-bold text-center">Kursus Lain</h3>
                            <ul class="space-y-5">
                                <li v-for="item in sections.comparison.othersItems" :key="item"
                                    class="flex items-start gap-4 line-through italic">
                                    <div
                                        class="w-6 h-6 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center shrink-0">
                                        <XIcon :size="14" class="shrink-0" />
                                    </div>
                                    <span class="text-text-secondary">{{ item }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section v-if="sections.features?.enabled" class="py-24 bg-bg-secondary/30">
                <div class="container">
                    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 class="text-[clamp(1.875rem,5vw,3rem)] font-black tracking-tight">{{ sections.features.title }}</h2>
                        <p class="text-text-secondary text-[clamp(1.125rem,2vw,1.25rem)]">{{ sections.features.subtitle }}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div v-for="(item, index) in sections.features.items" :key="index"
                            class="bg-bg-secondary border border-border-color p-8 rounded-[32px] hover:border-accent-primary transition-all duration-300">
                            <div
                                class="w-14 h-14 bg-bg-primary border border-border-color rounded-2xl flex items-center justify-center text-accent-primary mb-6">
                                <ZapIcon :size="28" class="shrink-0" />
                            </div>
                            <h3 class="text-[clamp(1.125rem,2vw,1.25rem)] font-bold mb-4">{{ item.title }}</h3>
                            <p class="text-text-secondary leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Pricing Section -->
            <section v-if="sections.pricing?.enabled" id="pricing" class="py-24">
                <div class="container">
                    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 class="text-[clamp(1.875rem,5vw,3rem)] font-black tracking-tight text-white">{{ sections.pricing.title
                            }}</h2>
                        <p class="text-text-secondary text-[clamp(1.125rem,2vw,1.25rem)]">{{ sections.pricing.subtitle }}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div v-for="(plan, index) in sections.pricing.plans" :key="index"
                            :class="['relative overflow-hidden p-10 rounded-[40px] border transition-all duration-500',
                                plan.popular ? 'bg-bg-secondary border-accent-primary shadow-2xl scale-105 z-10' : 'bg-bg-secondary/50 border-border-color']">
                            <div v-if="plan.popular"
                                class="absolute top-6 right-6 bg-accent-primary text-white text-[0.65rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                {{ plan.badge || 'Popular' }}
                            </div>
                            <h3 class="text-[clamp(1.125rem,2vw,1.25rem)] font-bold text-text-tertiary uppercase tracking-[0.2em] mb-4">{{
                                plan.name }}</h3>
                            <div class="flex items-baseline gap-2 mb-8">
                                <span class="text-text-tertiary text-2xl font-bold">{{ sections.pricing.currency
                                    }}</span>
                                <span class="text-[clamp(2.5rem,5vw,3rem)] font-black text-white tracking-tighter">{{ formatPrice(plan.price)
                                    }}</span>
                            </div>
                            <ul class="space-y-4 mb-10">
                                <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-3">
                                    <div
                                        class="w-5 h-5 bg-accent-primary text-white rounded-full flex items-center justify-center shrink-0">
                                        <CheckIcon :size="12" class="shrink-0" />
                                    </div>
                                    <span class="text-text-secondary">{{ feat }}</span>
                                </li>
                            </ul>
                            <BaseButton :to="plan.cta.link" :variant="plan.popular ? 'primary' : 'secondary'"
                                class="w-full" @click="handleCtaClick(plan.cta)">
                                {{ plan.cta.text }}
                            </BaseButton>
                        </div>
                    </div>
                    <div v-if="sections.pricing.moneyBack?.enabled"
                        class="mt-12 text-center text-text-tertiary text-sm flex items-center justify-center gap-2">
                        <ShieldCheck :size="18" class="text-accent-primary shrink-0" />
                        {{ sections.pricing.moneyBack.text }}
                    </div>
                </div>
            </section>

            <!-- Final CTA Section -->
            <section v-if="sections.cta?.enabled" class="py-24 bg-bg-secondary border-y border-border-color">
                <div class="container text-center space-y-8">
                    <h2 class="text-[clamp(2.25rem,7vw,4.5rem)] font-black tracking-tighter">{{ sections.cta.title }}</h2>
                    <p class="text-[clamp(1.125rem,2vw,1.25rem)] text-text-secondary max-w-2xl mx-auto">{{ sections.cta.subtitle }}</p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <BaseButton :to="sections.cta.primaryCta.link" variant="primary" size="lg"
                            @click="handleCtaClick(sections.cta.primaryCta)">
                            {{ sections.cta.primaryCta.text }}
                        </BaseButton>
                    </div>
                    <p v-if="sections.cta.urgency?.enabled"
                        class="text-sm font-bold text-accent-primary flex items-center justify-center gap-2 animate-pulse">
                        <FlameIcon :size="18" class="shrink-0" />
                        {{ sections.cta.urgency.text }}
                    </p>
                </div>
            </section>
        </main>

        <footer class="py-12 bg-bg-primary text-text-tertiary border-t border-white/5">
            <div class="container flex flex-col md:flex-row justify-between items-center gap-8">
                <div class="text-xl font-black text-text-primary tracking-tighter">
                    Kang<span class="text-accent-primary">Jessy</span>
                </div>
                <p class="text-sm">© 2025 KangJessy. All rights reserved.</p>
                <div class="flex gap-8 text-sm font-bold uppercase tracking-widest">
                    <router-link to="/about" class="hover:text-accent-primary">About</router-link>
                    <router-link to="/projects" class="hover:text-accent-primary">Portfolio</router-link>
                </div>
            </div>
        </footer>


    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    Check as CheckIcon, X as XIcon, Zap as ZapIcon,
    ShieldCheck, Flame as FlameIcon
} from 'lucide-vue-next';
import { getLandingPage } from '../../data/landing/landingPages';
import { BaseButton } from "@kangjessy/ui";
import { useSEO } from '../../composables/useSEO';
import { useWhatsApp } from '../../composables/useWhatsApp';

const route = useRoute();
const router = useRouter();
const pageData = ref<any>(null);
const loading = ref(true);
const { openDirectChat } = useWhatsApp();

const sections = computed(() => pageData.value?.sections || {});

// SEO Setup
useSEO({
    title: computed(() => pageData.value?.meta?.title || pageData.value?.title),
    description: computed(() => pageData.value?.meta?.description || pageData.value?.sections?.hero?.subheadline),
    url: computed(() => `/lp/${route.params.slug}`)
});

const loadPageData = () => {
    loading.value = true;
    const slug = route.params.slug as string;
    const data = getLandingPage(slug);

    if (!data) {
        router.push({ name: 'home' });
        return;
    }

    pageData.value = data;
    loading.value = false;
};

onMounted(loadPageData);

// Watch for slug changes in the same component
watch(() => route.params.slug, loadPageData);

const handleCtaClick = (cta: any) => {
    if (cta.link === '#whatsapp-modal') {
        openDirectChat("Halo Kang Jessy! Saya tertarik dengan penawaran " + (pageData.value?.title || "ini") + ". Bisa diskusi?");
    }
};

const formatPrice = (price: number) => {
    return price.toLocaleString('id-ID');
};

const getTemplateClasses = () => {
    const template = pageData.value?.template || 1;
    switch (template) {
        case 2: return 'theme-vibrant';
        case 3: return 'theme-enterprise'; // We could implement light mode specific classes if needed
        default: return 'theme-default';
    }
};
</script>
