<script setup>
import {
  Monitor,
  Palette,
  BookOpen,
  Layout,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  Star,
  ArrowRight,
  Zap,
  CheckCircle2,
  Download,
  Lock,
  Search,
  Mail,
  Hexagon
} from 'lucide-vue-next';

const { products } = useProducts();

const categories = [
  { name: 'Source Codes', count: '12 Products', icon: Monitor },
  { name: 'UI Templates', count: '24 Products', icon: Palette },
  { name: 'E-Books', count: '8 Guides', icon: BookOpen },
  { name: 'Design Systems', count: '5 Kits', icon: Layout }
]

const features = [
  { title: 'Secure Access', desc: 'Instant access upon approval.', icon: ShieldCheck },
  { title: 'Regular Updates', desc: 'Lifetime updates for all products.', icon: RefreshCw },
  { title: 'Premium Support', desc: 'Direct access to developer support.', icon: MessageSquare },
]

useHead({
  title: 'KangJessy Store - Premium Digital Assets',
  meta: [
    { name: 'description', content: 'High-quality source codes, templates, and guides for modern developers.' }
  ]
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative pt-40 pb-32">
      <!-- Background Blobs -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none opacity-40 mix-blend-screen">
      </div>
      <div
        class="absolute top-40 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none opacity-30">
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
          <div class="lg:w-1/2">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8 backdrop-blur-3xl shadow-xl">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span class="text-gray-200 font-medium">New: SaaS Starter Kit v2.0</span>
            </div>

            <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Crafted for <br />
              <span class="text-gradient">Modern Builders</span>
            </h1>

            <p class="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Premium digital resources to fast-track your development.
              Stop reinventing the wheel and start shipping production-ready apps today.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                class="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                Explore Store
              </button>
              <button
                class="w-full sm:w-auto px-8 py-4 rounded-full font-semibold border border-white/10 hover:bg-white/5 transition-colors text-white backdrop-blur-sm">
                How it Works
              </button>
            </div>

            <div
              class="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 font-medium">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary" /> Instant Download
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary" /> Lifetime Updates
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary" /> Verified Code
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 relative">
            <div
              class="relative z-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-2 rounded-3xl backdrop-blur-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                alt="Dashboard Preview" class="rounded-2xl shadow-inner mix-blend-overlay opacity-80" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl">
              </div>
              <div class="absolute bottom-8 left-8 right-8">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                    <Zap class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold text-white text-lg">High Performance</h3>
                    <p class="text-sm text-gray-300">Optimized for Core Web Vitals</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Decorative circle -->
            <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-primary rounded-full blur-[80px] opacity-40"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 border-t border-white/5 bg-white/[0.02]">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Curated Collections</h2>
          <p class="text-gray-400">Everything you need to build your next big thing.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="cat in categories" :key="cat.name"
            class="group p-6 rounded-3xl bg-surface/50 border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
            <div
              class="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              <component :is="cat.icon" class="w-8 h-8" stroke-width="1.5" />
            </div>
            <h3 class="font-semibold text-white mb-1">{{ cat.name }}</h3>
            <p class="text-xs text-gray-500">{{ cat.count }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold mb-2">Trending Now</h2>
            <p class="text-gray-400">Top-rated resources by the community.</p>
          </div>
          <NuxtLink to="/products"
            class="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
            View All Products
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="product in products" :key="product.id"
            class="group bg-surface/30 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300">
            <!-- Image Area -->
            <div class="aspect-[4/3] relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img :src="product.image" :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span
                class="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white">
                {{ product.category }}
              </span>
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                  <Star class="w-3 h-3 fill-current text-yellow-500" /> {{ product.rating }} <span
                    class="text-gray-600 font-normal">({{ product.reviews
                    }})</span>
                </div>
              </div>

              <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer">{{
                product.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                {{ product.description }}
              </p>

              <div class="flex items-center justify-between pt-4 border-t border-white/5">
                <span class="text-2xl font-bold text-white">{{ product.price }}</span>
                <button
                  class="bg-white text-black px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center md:hidden">
          <NuxtLink to="/products"
            class="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
            View All Products
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works (Process) -->
    <section class="py-24 bg-gradient-to-b from-[#0F0F0F] to-black">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-primary text-sm font-bold tracking-wider uppercase mb-2 block">Simple Process</span>
          <h2 class="text-3xl font-bold mb-4">How It Works</h2>
          <p class="text-gray-400">Get your digital assets in 3 easy steps.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Connecting Line (Desktop) -->
          <div
            class="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent">
          </div>

          <div class="relative bg-surface/50 p-8 rounded-3xl border border-white/5 text-center backdrop-blur-sm z-10">
            <div
              class="w-16 h-16 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-white/10 flex items-center justify-center text-white mb-6 shadow-lg">
              <Search class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold mb-3">Choose & Buy</h3>
            <p class="text-gray-400 text-sm leading-relaxed">Select your desired product and complete the manual
              transfer payment.</p>
          </div>

          <div class="relative bg-surface/50 p-8 rounded-3xl border border-white/5 text-center backdrop-blur-sm z-10">
            <div
              class="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-2xl border border-white/10 flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
              <Mail class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold mb-3">Upload Proof</h3>
            <p class="text-gray-400 text-sm leading-relaxed">Upload your payment screenshot to the dashboard for instant
              verification.</p>
          </div>

          <div class="relative bg-surface/50 p-8 rounded-3xl border border-white/5 text-center backdrop-blur-sm z-10">
            <div
              class="w-16 h-16 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-white/10 flex items-center justify-center text-white mb-6 shadow-lg">
              <Zap class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold mb-3">Start Building</h3>
            <p class="text-gray-400 text-sm leading-relaxed">Once verified (usually &lt; 10 mins), access your downloads
              and license keys.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Props / Why Us -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 -skew-y-3 scale-110"></div>
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-secondary text-sm font-bold tracking-wider uppercase mb-2 block">Why Choose Us</span>
            <h2 class="text-4xl font-bold mb-6 leading-tight">We build tools that <br /> <span
                class="text-white">developers actually enjoy.</span></h2>
            <p class="text-gray-400 mb-8 leading-relaxed">
              Unlike generic marketplaces, every product here is hand-crafted, rigorously tested, and built with modern
              standards. No jQuery, no bloated dependencies—just pure, clean code.
            </p>

            <ul class="space-y-6">
              <li v-for="feat in features" :key="feat.title" class="flex gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-xl border border-white/10 text-white">
                  <component :is="feat.icon" class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="font-bold text-lg cursor-text">{{ feat.title }}</h4>
                  <p class="text-sm text-gray-400">{{ feat.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl rounded-full">
            </div>
            <div class="relative bg-black border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div class="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div class="w-12 h-12 rounded-full bg-gray-700"></div>
                <div>
                  <div class="h-4 w-32 bg-gray-800 rounded mb-2"></div>
                  <div class="h-3 w-20 bg-gray-800 rounded"></div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="h-4 w-full bg-gray-800 rounded"></div>
                <div class="h-4 w-[90%] bg-gray-800 rounded"></div>
                <div class="h-4 w-[60%] bg-gray-800 rounded"></div>
              </div>

              <div
                class="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-3">
                <ShieldCheck class="w-5 h-5" /> 100% Virus Free & Verified Code
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-24">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div
          class="bg-gradient-to-b from-surface to-black border border-white/10 p-12 rounded-[2.5rem] relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>

          <h2 class="text-3xl font-bold mb-4 relative z-10">Join the Inner Circle</h2>
          <p class="text-gray-400 mb-8 relative z-10">Get early access to new boilerplates and exclusive discounts.</p>

          <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
            <input type="email" placeholder="Enter your email"
              class="flex-grow px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors" />
            <button class="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </form>

          <p class="mt-4 text-xs text-gray-600 relative z-10">No spam, just code. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Scoped styles if needed, but Tailwind handles most */
</style>
