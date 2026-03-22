<template>
  <div class="min-h-screen bg-bg-primary pt-24 lg:pt-32">
    <div class="container mx-auto px-4">
      <SectionHeader 
        badge="Detail Pricing Tool" 
        title="Custom Project Estimator" 
        subtitle="Gunakan alat ini jika Anda ingin merakit fitur secara spesifik dan mendapatkan rincian biaya kustom."
        align="center"
      />
    </div>
    
    <!-- We reuse the existing CostCalculator component -->
    <CostCalculator />

    <div class="container mx-auto px-4 pb-24">
       <div class="max-w-[800px] mx-auto p-8 rounded-[32px] bg-white/2 border border-border-color text-center">
          <h3 class="text-xl font-bold text-text-primary mb-4">Butuh bantuan manual?</h3>
          <p class="text-text-secondary mb-8">Jika kalkulasi di atas tidak sesuai dengan kebutuhan unik Anda, jangan ragu untuk berdiskusi langsung.</p>
          <BaseButton variant="primary" size="lg" @click="$router.push('/order')">
             Bicarakan Brief Proyek
          </BaseButton>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from '../../components/ui/SectionHeader.vue';
import CostCalculator from '../../components/sections/CostCalculator.vue';
import { BaseButton } from "@kangjessy/ui";
import { useSEO } from '../../composables/useSEO';

useSEO({
  title: 'Project Cost Estimator',
  description: 'Dapatkan estimasi biaya kustom untuk proyek website Anda dengan alat kalkulator interaktif.',
  url: '/get-estimate'
});
</script>
