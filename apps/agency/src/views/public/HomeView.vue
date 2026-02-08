<template>
  <div class="home-view bg-bg-primary overflow-x-hidden">
    <HeroSection />
    <WhyChooseMe />
    <BentoServices />
    <MicroServices />
    <CostCalculator />
    <Projects />
    <!-- <Testimonials /> -->
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
  title: 'Specialist Website, Sistem & Automasi Business',
  description: 'Bantu bisnis Anda Auto-Pilot dengan Landing Page High-Conversion, Sistem CRM/ERP custom, dan Robot Automasi AI. Eksekusi cepat, hasil serius.',
  url: '/'
})

// Lazy load below-fold sections
const WhyChooseMe = defineAsyncComponent(() => import('../../components/sections/home/WhyChooseMe.vue'))
const BentoServices = defineAsyncComponent(() => import('../../components/sections/home/BentoServices.vue'))
const MicroServices = defineAsyncComponent(() => import('../../components/sections/home/MicroServices.vue'))
const CostCalculator = defineAsyncComponent(() => import('../../components/sections/CostCalculator.vue'))
const Projects = defineAsyncComponent(() => import('../../components/sections/home/Projects.vue'))
// const Testimonials = defineAsyncComponent(() => import('../../components/sections/home/Testimonials.vue'))
const FAQ = defineAsyncComponent(() => import('../../components/sections/home/FAQ.vue'))
const Contact = defineAsyncComponent(() => import('../../components/sections/home/Contact.vue'))
</script>
