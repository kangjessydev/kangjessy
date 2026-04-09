<template>
  <div class="bg-bg-primary min-h-screen pt-40 pb-20 font-sans">
    <div class="container max-w-2xl mx-auto px-6 text-center space-y-12 animate-fade-in">
      
      <!-- Logo/Brand Placeholder -->
      <div class="text-[clamp(1.5rem,4vw,2rem)] font-bold text-text-primary tracking-tighter">
        KangJessy <span class="text-accent-primary italic">Docs.</span>
      </div>

      <!-- Main Message -->
      <div class="space-y-6">
        <h1 class="text-[clamp(2rem,6vw,3.5rem)] font-bold text-text-primary leading-tight tracking-tight">
          Pusat Bantuan Sedang <br/> <span class="bg-accent-primary/20 text-accent-primary px-3 rounded-lg">Dalam Pemeliharaan</span>
        </h1>
        <p class="text-text-secondary leading-relaxed max-w-sm mx-auto">
          Kami sedang menyiapkan panduan teknis yang lengkap untuk Anda. Halaman ini akan segera hadir secara bertahap.
        </p>
      </div>

      <!-- Simple Action -->
      <div class="pt-12">
        <router-link to="/" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-tertiary hover:text-white transition-colors">
          <ArrowLeft :size="16" />
          <span>Kembali ke Beranda</span>
        </router-link>
      </div>

      <!-- Subtle Credit -->
      <div class="pt-24 text-[10px] uppercase font-black tracking-widest text-text-tertiary/30">
        KangJessy Digital Ecosystem &copy; 2026
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { useSEO } from '../../composables/useSEO';

// SEO Setup
useSEO({
    title: 'Maintenance | KangJessy Docs',
    description: 'Pusat bantuan KangJessy sedang dalam pemeliharaan.',
    url: '/docs'
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}
</style>
