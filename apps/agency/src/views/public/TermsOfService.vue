<template>
  <div class="min-h-screen bg-bg-primary pt-32 pb-20">
    <div class="container max-w-4xl mx-auto px-6">
      <h1 class="text-4xl font-extrabold mb-8 bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Terms of Service</h1>
      
      <div class="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
        <p>Last updated: January 21, 2026</p>
        
        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">1. Agreement to Terms</h2>
          <p>By accessing or using KangJessy Agency services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">2. Services</h2>
          <p>KangJessy Agency provides web development, automation, and digital asset services. Details of specific projects will be outlined in separate project agreements.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">3. Payments and Refunds</h2>
          <p>Payments for digital assets in our store are final and non-refundable. For service projects, payment terms (deposits, milestones) will be specified in the invoice or project proposal.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">4. Intellectual Property</h2>
          <p>Unless otherwise agreed, KangJessy Agency retains intellectual property rights to custom code libraries and frameworks. Clients receive a license to use the final deliverables for their specific business needs.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">5. Limitation of Liability</h2>
          <p>KangJessy Agency shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services or products.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';

useSEO({
    title: 'Terms of Service',
    description: 'Terms of Service for KangJessy Agency. Read our rules and guidelines.',
    url: '/terms-of-service'
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
