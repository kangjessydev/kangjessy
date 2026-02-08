<script setup>
import {
    Search,
    Filter,
    ArrowUpRight,
    Star,
    Monitor,
    Palette,
    BookOpen
} from 'lucide-vue-next';

const { products } = useProducts();
const searchQuery = ref('');
const activeCategory = ref('All');

const categories = ['All', 'Source Code', 'UI Template', 'E-Book'];

// Filter logic
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = activeCategory.value === 'All' || product.category === activeCategory.value;

        return matchesSearch && matchesCategory;
    });
});

useHead({
    title: 'Catalog - KangJessy Store',
    meta: [{ name: 'description', content: 'Browse our premium collection of digital assets.' }]
});
</script>

<template>
    <div class="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
                <h1 class="text-4xl font-bold mb-4">Explore Collection</h1>
                <p class="text-gray-400 max-w-md">Find the perfect resources to accelerate your development workflow.
                </p>
            </div>

            <!-- Search & Filter -->
            <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div class="relative group">
                    <Search
                        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input v-model="searchQuery" type="text" placeholder="Search products..."
                        class="w-full sm:w-64 bg-surface/50 border border-white/10 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                </div>
            </div>
        </div>

        <!-- Category Tabs -->
        <div
            class="flex flex-col sm:flex-row md:items-center justify-between gap-4 md:gap-8 pb-4 mb-8 border-b border-white/5 overflow-x-auto">
            <div class="flex items-center gap-2">
                <button v-for="cat in categories" :key="cat" @click="activeCategory = cat"
                    class="px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                    :class="activeCategory === cat ? 'bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-surface/30 text-gray-400 hover:text-white hover:bg-surface/60'">
                    {{ cat }}
                </button>
            </div>

            <div class="text-xs text-gray-500 font-medium">
                Showing {{ filteredProducts.length }} results
            </div>
        </div>

        <!-- Product Grid -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="product in filteredProducts" :key="product.id"
                class="group bg-surface/30 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <NuxtLink :to="`/products/${product.id}`" class="block">
                    <div class="aspect-[4/3] relative overflow-hidden bg-gray-900">
                        <img :src="product.image" :alt="product.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />

                        <!-- Category Badge -->
                        <div
                            class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
                            <Monitor v-if="product.category === 'Source Code'" class="w-3 h-3 text-primary" />
                            <Palette v-else-if="product.category === 'UI Template'" class="w-3 h-3 text-secondary" />
                            <BookOpen v-else class="w-3 h-3 text-green-400" />
                            {{ product.category }}
                        </div>
                    </div>

                    <div class="p-6">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{{
                                product.title }}</h3>
                            <div
                                class="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded-md">
                                <Star class="w-3 h-3 fill-current" /> {{ product.rating }}
                            </div>
                        </div>

                        <p class="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 h-10">
                            {{ product.description }}
                        </p>

                        <div class="flex items-center justify-between pt-4 border-t border-white/5">
                            <span class="text-2xl font-bold text-white">{{ product.price }}</span>
                            <span
                                class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowUpRight class="w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="py-32 text-center">
            <div class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search class="w-10 h-10 text-gray-600" />
            </div>
            <h3 class="text-xl font-bold mb-2">No products found</h3>
            <p class="text-gray-500">Try adjusting your search or filter criteria.</p>
            <button @click="[searchQuery = '', activeCategory = 'All']" class="mt-6 text-primary hover:underline">Clear
                all filters</button>
        </div>
    </div>
</template>
