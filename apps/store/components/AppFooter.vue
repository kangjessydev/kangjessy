<script setup>
import { Hexagon } from 'lucide-vue-next';
</script>

<template>
  <footer class="border-t border-white/5 bg-[#050505] pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div class="col-span-1 md:col-span-2">
        <h2 class="text-2xl font-bold tracking-tighter mb-4 flex items-center gap-2">
          <Hexagon class="text-primary w-6 h-6 fill-primary/20" />
          <span>Kang<span class="text-primary">Jessy</span></span>
        </h2>
        <p class="text-gray-400 max-w-sm leading-relaxed text-sm">
          Premium digital resources for the modern developer. Elevate your workflow with production-ready boilerplates
          and design systems.
        </p>
      </div>

      <div>
        <h3 class="font-bold mb-6 text-white">Ecosystem</h3>
        <ul class="space-y-4 text-sm text-gray-400">
          <li>
            <NuxtLink to="/products" class="hover:text-primary transition-colors">Source Codes</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products" class="hover:text-primary transition-colors">UI Templates</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products" class="hover:text-primary transition-colors">Creator Tools</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold mb-6 text-white">Company</h3>
        <ul class="space-y-4 text-sm text-gray-400">
          <li>
            <NuxtLink to="#" class="hover:text-primary transition-colors">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/docs/LICENSING_PLAN" class="hover:text-primary transition-colors">Licensing</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="hover:text-primary transition-colors">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
      <p>&copy; {{ new Date().getFullYear() }} KangJessy. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>
