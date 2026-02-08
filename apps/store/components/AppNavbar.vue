<script setup>
import { Hexagon } from 'lucide-vue-next';
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold tracking-tighter flex items-center gap-2">
        <Hexagon class="text-primary w-8 h-8 fill-primary/20" stroke-width="2" />
        <span>Kang<span class="text-primary">Jessy</span></span>
      </NuxtLink>
      
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink to="/" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</NuxtLink>
        <NuxtLink to="/products" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Store</NuxtLink>
        <NuxtLink to="/license" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">License</NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <button class="text-sm text-gray-400 hover:text-white transition-colors">Sign In</button>
        <button class="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40">
          Get Started
        </button>
      </div>
    </div>
  </nav>
</template>
