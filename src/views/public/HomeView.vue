<template>
  <div class="home-view bg-bg-primary overflow-x-hidden">
    <HeroSection />
    <WhyChooseMe />
    <!-- <BentoServices /> -->
    <!-- <MicroServices /> -->
    <PricingSwitcher />
    <DesignStyleShowcase />
    <FAQ />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useSEO } from '../../composables/useSEO'
import HeroSection from '../../components/sections/HeroSection.vue'

// SEO Setup
useSEO({
  title: 'Specialist Website High-Conversion & Maintenance',
  description: 'Bantu bisnis Anda tumbuh dengan Website High-Conversion (Landing Page/Company Profile) dan layanan Maintenance/Fitur Rakitan custom. Eksekusi cepat, hasil serius.',
  url: '/'
})

// Lazy load below-fold sections
const WhyChooseMe = defineAsyncComponent(() => import('../../components/sections/home/WhyChooseMe.vue'))
const PricingSwitcher = defineAsyncComponent(() => import('../../components/sections/PricingSwitcher.vue'))
const DesignStyleShowcase = defineAsyncComponent(() => import('../../components/sections/home/DesignStyleShowcase.vue'))
const FAQ = defineAsyncComponent(() => import('../../components/sections/home/FAQ.vue'))
const Contact = defineAsyncComponent(() => import('../../components/sections/home/Contact.vue'))
</script>
