<template>
    <div class="bg-bg-primary min-h-screen pt-28 pb-20">
        <div class="container">
            <!-- Hero -->
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in-up">
                <SectionHeader badge="Our Insights" align="center" class="mb-0!">
                    <template #title>
                        <h1 class="text-[clamp(2.3rem,7vw,3.5rem)] font-bold tracking-tight text-white mb-4">
                            KangJessy <span class="text-accent-primary italic">Blog</span>
                        </h1>
                    </template>
                </SectionHeader>
                <p class="text-[clamp(1rem,2vw,1.1rem)] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                    Berbagi ide, tutorial, dan tren terbaru seputar teknologi dan marketing digital untuk membantu
                    bisnis Anda tumbuh
                    lebih cerdas.
                </p>
            </div>

            <!-- Search & Filters Command Bar -->
            <div class="mb-16 relative z-30 animate-fade-in-up" ref="commandBarRef" style="animation-delay: 0.1s">
                <div
                    class="bg-bg-secondary/40 backdrop-blur-xl border border-border-color rounded-[24px] p-2 md:p-3 flex flex-col gap-2 md:flex-row md:items-center shadow-2xl shadow-black/20">

                    <!-- Search Section -->
                    <div class="relative grow md:max-w-md group">
                        <SearchIcon :size="18"
                            class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-accent-primary" />
                        <input v-model="searchQuery" type="text" placeholder="Cari tutorial, ide, atau tren..."
                            class="w-full py-3 pl-11 pr-11 bg-bg-primary/50 border border-transparent rounded-xl text-sm text-text-primary outline-none transition-all focus:bg-bg-primary focus:border-accent-primary/30" />
                        <!-- Clear Search -->
                        <button v-if="searchQuery" @click="searchQuery = ''"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-white transition-colors">
                            <XIcon :size="16" />
                        </button>
                    </div>

                    <!-- Divider (Desktop Only) -->
                    <div class="hidden md:block w-px h-8 bg-border-color/50 mx-2"></div>

                    <!-- Desktop Filters Area -->
                    <div class="hidden md:flex items-center gap-2 grow justify-between">
                        <div class="flex items-center gap-2">
                            <!-- Category Dropdown -->
                            <div class="relative" ref="categoryRef">
                                <button @click.stop="isCategoryDropdownOpen = !isCategoryDropdownOpen"
                                    class="h-11 px-4 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                                    :class="selectedCategory !== 'All'
                                        ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                                        : 'bg-bg-primary/30 border-transparent text-text-secondary hover:border-border-color hover:text-text-primary'">
                                    <span
                                        class="text-[10px] font-black uppercase tracking-widest opacity-50">Topik</span>
                                    <span class="text-xs font-bold">{{ selectedCategory === 'All' ? 'Semua Topik' :
                                        selectedCategory }}</span>
                                    <ChevronDownIcon :size="14" class="transition-transform duration-300"
                                        :class="{ 'rotate-180': isCategoryDropdownOpen }" />
                                </button>

                                <div v-if="isCategoryDropdownOpen"
                                    class="absolute top-full left-0 mt-3 w-56 bg-[#121212] border border-border-color rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <button @click="selectedCategory = 'All'; isCategoryDropdownOpen = false"
                                        class="w-full text-left px-5 py-3 text-xs font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors flex items-center justify-between">
                                        Semua Topik
                                        <span class="px-1.5 py-0.5 rounded bg-white/5 text-[9px] opacity-40">{{
                                            posts.length }}</span>
                                    </button>
                                    <div class="h-px bg-white/5"></div>
                                    <button v-for="cat in categories" :key="cat" v-show="cat !== 'All'"
                                        @click="selectedCategory = cat; isCategoryDropdownOpen = false"
                                        class="w-full text-left px-5 py-3.5 text-xs text-text-secondary hover:bg-white/5 hover:text-text-primary transition-colors border-t border-white/5">
                                        {{ cat }}
                                    </button>
                                </div>
                            </div>

                            <!-- Sort Toggle -->
                            <div
                                class="flex bg-bg-primary/30 p-1 rounded-xl border border-transparent hover:border-border-color transition-colors">
                                <button @click="sortBy = 'newest'"
                                    class="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
                                    :class="sortBy === 'newest' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:text-white'">
                                    Terbaru
                                </button>
                                <button @click="sortBy = 'popular'"
                                    class="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
                                    :class="sortBy === 'popular' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:text-white'">
                                    Populer
                                </button>
                            </div>
                        </div>

                        <!-- Filter Reset (Desktop Inline) -->
                        <button v-if="searchQuery || selectedCategory !== 'All'"
                            @click="searchQuery = ''; selectedCategory = 'All'"
                            class="flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-tighter text-red-400/60 hover:text-red-400 transition-colors cursor-pointer group">
                            <XIcon :size="14" class="transition-transform group-hover:rotate-90" />
                            Reset
                        </button>
                    </div>

                    <!-- Mobile Filter Hint -->
                    <div
                        class="md:hidden flex items-center justify-center py-2 text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
                        Gunakan tombol terapung untuk memfilter
                    </div>
                </div>
            </div>

            <!-- Posts Grid -->
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="i in 3" :key="i"
                    class="bg-bg-secondary/50 h-[450px] rounded-2xl border border-border-color animate-pulse"></div>
            </div>

            <div v-else-if="visiblePosts.length > 0" class="space-y-16">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up"
                    style="animation-delay: 0.2s">
                    <router-link v-for="post in visiblePosts" :key="post.slug" :to="`/blog/${post.slug}`"
                        class="group bg-bg-secondary/30 backdrop-blur-sm border border-border-color rounded-2xl overflow-hidden flex flex-row md:flex-col hover:border-accent-primary/40 transition-all duration-500 relative shadow-xs">

                        <!-- Image Container (Small on mobile, full on desktop) -->
                        <div class="relative w-32 md:w-full h-auto md:aspect-16/10 overflow-hidden shrink-0">
                            <img v-if="post.mainImage" :src="post.mainImage" :alt="post.title"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div
                                class="absolute inset-0 bg-linear-to-t from-bg-primary/95 via-transparent to-transparent opacity-80 hidden md:block">
                            </div>

                            <!-- Category Badge (Desktop Only) -->
                            <div class="absolute top-4 left-4 hidden md:block">
                                <span
                                    class="px-3 py-1 bg-accent-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                                    {{ post.categories?.[0] || 'Agency' }}
                                </span>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-4 md:p-8 flex-1 flex flex-col relative min-w-0">
                            <!-- Subtle Glow -->
                            <div
                                class="absolute -bottom-12 -right-12 w-32 h-32 bg-accent-primary/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            </div>

                            <div
                                class="flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2 md:mb-4">
                                <span class="md:hidden text-accent-primary shrink-0">{{ post.categories?.[0] || 'Agency' }}</span>
                                <span class="flex items-center gap-1">
                                    <CalendarIcon :size="10" class="text-accent-primary/60 shrink-0" /> {{ formatDate(post.publishedAt) }}
                                </span>
                                <span class="hidden sm:flex items-center gap-1">
                                    <ClockIcon :size="10" class="text-accent-primary/60 shrink-0" /> {{ post.readTime || '4 min' }}
                                </span>
                            </div>

                            <h2
                                class="text-sm md:text-[clamp(1.125rem,2vw,1.3rem)] font-bold text-text-primary mb-2 md:mb-4 leading-snug group-hover:text-accent-primary transition-colors line-clamp-2 md:line-clamp-2">
                                {{ post.title }}
                            </h2>

                            <p class="hidden md:block text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                                {{ post.excerpt || 'Klik untuk membaca selengkapnya mengenai topik menarik ini...' }}
                            </p>

                            <div class="mt-auto pt-3 md:pt-6 border-t border-white/5 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div
                                        class="w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                        <UserIcon :size="10" />
                                    </div>
                                    <span
                                        class="text-[10px] md:text-[11px] font-bold text-text-tertiary truncate max-w-[80px] md:max-w-none">{{
                                            post.author }}</span>
                                </div>
                                <div
                                    class="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-accent-primary group-hover:translate-x-1 transition-transform">
                                    <span class="hidden md:inline">Read Article</span>
                                    <ArrowRight :size="12" />
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>

                <!-- Load More Button -->
                <div v-if="hasMore" class="flex justify-center pt-8 animate-fade-in-up">
                    <BaseButton variant="secondary" size="lg" @click="loadMore" class="px-12 rounded-2xl group/btn">
                        <span>Lihat Lebih Banyak</span>
                        <ChevronDownIcon :size="18" class="ml-2 group-hover:translate-y-1 transition-transform" />
                    </BaseButton>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="py-32 text-center space-y-6 animate-fade-in-up">
                <div
                    class="w-20 h-20 bg-bg-secondary/50 border border-border-color rounded-full flex items-center justify-center mx-auto text-text-tertiary">
                    <SearchIcon :size="32" class="shrink-0" />
                </div>
                <div class="space-y-2">
                    <h3 class="text-xl font-bold text-text-primary">Ouch! Artikel tidak ditemukan</h3>
                    <p class="text-text-secondary max-w-sm mx-auto text-sm leading-relaxed">
                        Kami tidak menemukan artikel yang cocok dengan pencarian Anda. Coba kata kunci lain atau reset
                        filter.
                    </p>
                </div>
            </div>

            <!-- Mobile Floating Filter Button -->
            <Teleport to="body">
                <Transition name="fab">
                    <button v-if="!loading && !isCommandBarVisible" @click="isFilterSheetOpen = true"
                        class="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 h-14 pl-5 pr-6 bg-accent-primary text-white rounded-full shadow-[0_8px_30px_rgba(var(--accent-primary-rgb),0.4)] flex items-center gap-2 active:scale-90 transition-all border border-white/10 group">
                        <div class="relative">
                            <SlidersIcon :size="20" />
                            <div v-if="searchQuery || selectedCategory !== 'All'"
                                class="absolute -top-2 -right-2 w-4 h-4 bg-white text-accent-primary text-[8px] font-black rounded-full flex items-center justify-center border-2 border-accent-primary">
                                !
                            </div>
                        </div>
                        <span class="text-xs font-black uppercase tracking-widest">Filter</span>
                    </button>
                </Transition>
            </Teleport>

            <!-- Mobile Filter BottomSheet -->
            <BottomSheet v-model="isFilterSheetOpen" title="Filter Blog" :icon="SlidersIcon" :show-close="false">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                <SlidersIcon :size="18" />
                            </div>
                            <h4 class="text-[1.1rem] font-bold text-text-primary tracking-tight">Filter Blog</h4>
                        </div>
                        <button @click="searchQuery = ''; selectedCategory = 'All'"
                            class="px-4 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                            Reset
                        </button>
                    </div>
                </template>
                <div class="p-6 flex flex-col gap-8 pb-safe">
                    <!-- Topik (Chip Style) -->
                    <div>
                        <h5 class="text-text-primary font-bold mb-4 flex items-center gap-2 text-sm">
                            <span class="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
                            Telusuri Topik
                        </h5>
                        <div class="flex flex-wrap gap-2">
                            <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
                                class="px-5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
                                :class="selectedCategory === cat
                                    ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary'
                                    : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:text-text-primary'">
                                {{ cat === 'All' ? 'Semua Topik' : cat }}
                            </button>
                        </div>
                    </div>

                    <!-- Precise 20px Spacer -->
                    <div class="h-5"></div>
                </div>
            </BottomSheet>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import {
    Search as SearchIcon, Calendar as CalendarIcon,
    Clock as ClockIcon, User as UserIcon,
    ArrowRight, X as XIcon, ChevronDown as ChevronDownIcon,
    SlidersHorizontal as SlidersIcon
} from 'lucide-vue-next';
import { blogService } from '../../services/blogService';
import SectionHeader from '../../components/ui/SectionHeader.vue';
import { BaseButton } from "@kangjessy/ui";
import { BottomSheet } from "@kangjessy/ui";
import { useSEO } from '../../composables/useSEO';

// SEO Setup
useSEO({
    title: 'Blog & Insights',
    description: 'Berbagi ide, tutorial, dan tren terbaru seputar teknologi dan marketing digital untuk membantu bisnis Anda tumbuh lebih cerdas.',
    url: '/blog'
});

const posts = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('All');
const sortBy = ref<'newest' | 'popular'>('newest');
const isFilterSheetOpen = ref(false);
const isCategoryDropdownOpen = ref(false);
const categoryRef = ref<HTMLElement | null>(null);
const commandBarRef = ref<HTMLElement | null>(null);
const isCommandBarVisible = ref(true);

let observer: IntersectionObserver | null = null;

const handleOutsideClick = (event: MouseEvent) => {
    if (typeof window === 'undefined') return;
    if (categoryRef.value && !categoryRef.value.contains(event.target as Node)) {
        isCategoryDropdownOpen.value = false;
    }
};

// Load More Logic
const visibleCount = ref(6);
const increment = 6;

const categories = computed(() => {
    const cats = ['All'];
    posts.value.forEach(post => {
        const catList = post.categories || [];
        catList.forEach((cat: string) => {
            if (cat && !cats.includes(cat)) {
                cats.push(cat);
            }
        });
    });
    return cats;
});

const filteredPosts = computed(() => {
    let result = posts.value.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategory.value === 'All' || 
            (post.categories && post.categories.includes(selectedCategory.value));
        return matchesSearch && matchesCategory;
    });

    if (sortBy.value === 'popular') {
        return [...result].sort((a, b) => (b.title.length - a.title.length));
    }

    return result;
});

const visiblePosts = computed(() => {
    return filteredPosts.value.slice(0, visibleCount.value);
});

const hasMore = computed(() => {
    return visibleCount.value < filteredPosts.value.length;
});

const loadMore = () => {
    visibleCount.value += increment;
};

// Reset visible count when filters change
watch([searchQuery, selectedCategory, sortBy], () => {
    visibleCount.value = increment;
});

const formatDate = (date: string) => {
    if (!date) return 'Just now';
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

onMounted(async () => {
    window.scrollTo(0, 0);
    window.addEventListener('click', handleOutsideClick);

    // Observer for sticky FAB (appears much sooner when scrolling)
    observer = new IntersectionObserver((entries) => {
        if (entries[0]) {
            isCommandBarVisible.value = entries[0].isIntersecting;
        }
    }, {
        threshold: 0,
        rootMargin: '-450px 0px 0px 0px'
    });

    if (commandBarRef.value) {
        observer.observe(commandBarRef.value);
    }

    try {
        const data = await blogService.getPosts();
        // Filter only published posts for public view
        posts.value = data.filter(post => post.status === 'published');
    } catch (e) {
        console.error('Error fetching blogs from Sanity:', e);
    } finally {
        loading.value = false;
    }
});

import { onUnmounted } from 'vue';
onUnmounted(() => {
    window.removeEventListener('click', handleOutsideClick);
    if (observer) observer.disconnect();
});
</script>

<style scoped>
/* FAB Animation */
.fab-enter-active {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fab-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-enter-from {
    opacity: 0;
    transform: translate(-50%, 30px) scale(0.5);
}

.fab-leave-to {
    opacity: 0;
    transform: translate(-50%, 40px) scale(0.5);
}

/* No more local scoped styles needed, using Tailwind 4 utilities */
</style>