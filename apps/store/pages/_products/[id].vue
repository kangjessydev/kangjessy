<script setup>
import {
    Star,
    CheckCircle2,
    ShieldCheck,
    Zap,
    ArrowLeft,
    Download,
    Share2
} from 'lucide-vue-next';

const route = useRoute();
const { getProductById } = useProducts();

const product = computed(() => getProductById(route.params.id));

useHead({
    title: product.value ? `${product.value.title} - KangJessy Store` : 'Product Not Found',
});
</script>

<template>
    <div v-if="product" class="min-h-screen pt-32 pb-20">
        <!-- Breadcrumb -->
        <div class="max-w-7xl mx-auto px-6 mb-8">
            <NuxtLink to="/products"
                class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <ArrowLeft class="w-4 h-4" /> Back to Store
            </NuxtLink>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

            <!-- Left Column: Media & Details -->
            <div>
                <div class="rounded-3xl overflow-hidden border border-white/10 bg-surface/30 mb-8 relative group">
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none">
                    </div>
                    <img :src="product.image" :alt="product.title" class="w-full aspect-[4/3] object-cover" />
                    <div class="absolute bottom-6 left-6 z-20 flex gap-4">
                        <button
                            class="bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors">
                            View Preview
                        </button>
                    </div>
                </div>

                <!-- Features List -->
                <div class="mb-12">
                    <h3 class="font-bold text-xl mb-6 flex items-center gap-2">
                        <Zap class="w-5 h-5 text-primary" /> Key Features
                    </h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <li v-for="feature in product.features" :key="feature"
                            class="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                            <CheckCircle2 class="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <span class="text-sm text-gray-300">{{ feature }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Description -->
                <div class="prose prose-invert prose-p:text-gray-400 prose-headings:text-white max-w-none">
                    <h3 class="text-xl font-bold mb-4">About this product</h3>
                    <div class="whitespace-pre-line leading-relaxed">
                        {{ product.fullDescription }}
                    </div>
                </div>
            </div>

            <!-- Right Column: Purchasing -->
            <div class="lg:sticky lg:top-32 h-fit">
                <div
                    class="bg-surface/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                    <!-- Glow effect -->
                    <div
                        class="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none">
                    </div>

                    <div class="flex items-start justify-between mb-2 relative z-10">
                        <span
                            class="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {{ product.category }}
                        </span>
                        <div class="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                            <Star class="w-4 h-4 fill-current" /> {{ product.rating }}
                            <span class="text-gray-500 font-normal">({{ product.reviews }} reviews)</span>
                        </div>
                    </div>

                    <h1 class="text-3xl md:text-4xl font-bold mb-4 relative z-10">{{ product.title }}</h1>
                    <p class="text-gray-400 mb-8 leading-relaxed relative z-10">{{ product.description }}</p>

                    <div class="flex items-end gap-2 mb-8 border-b border-white/5 pb-8 relative z-10">
                        <span class="text-5xl font-bold tracking-tight">{{ product.price }}</span>
                        <span class="text-gray-500 mb-2 text-lg">one-time payment</span>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-4 relative z-10">
                        <button
                            class="w-full bg-white text-black font-bold text-lg py-4 rounded-2xl hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-1 flex items-center justify-center gap-2">
                            Buy Now
                            <ArrowLeft class="w-5 h-5 rotate-180" />
                        </button>
                        <p class="text-center text-xs text-gray-500 mt-2">Secure manual payment verification.</p>
                    </div>

                    <!-- Trust Badges -->
                    <div class="mt-8 pt-8 border-t border-white/5 space-y-4 relative z-10">
                        <div class="flex items-center gap-3 text-sm text-gray-400">
                            <ShieldCheck class="w-5 h-5 text-green-400" />
                            <span>Verified by KangJessy Team</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm text-gray-400">
                            <Download class="w-5 h-5 text-blue-400" />
                            <span>Instant access after approval</span>
                        </div>
                    </div>
                </div>

                <!-- Share -->
                <div class="mt-6 flex justify-center">
                    <button class="text-gray-500 hover:text-white flex items-center gap-2 text-sm transition-colors">
                        <Share2 class="w-4 h-4" /> Share this product
                    </button>
                </div>
            </div>

        </div>
    </div>

    <div v-else class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div class="text-6xl mb-4">🤷‍♂️</div>
        <h1 class="text-3xl font-bold mb-2">Product Not Found</h1>
        <p class="text-gray-400 mb-8">The product you are looking for does not exist or has been removed.</p>
        <NuxtLink to="/products"
            class="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors">
            Back to Store
        </NuxtLink>
    </div>
</template>
