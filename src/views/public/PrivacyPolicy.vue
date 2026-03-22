<template>
  <div class="min-h-screen bg-bg-primary pt-32 pb-20">
    <div class="container max-w-4xl mx-auto px-6">
      <h1 class="text-4xl font-extrabold mb-8 bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Privacy Policy</h1>
      
      <div class="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
        <p>Last updated: January 21, 2026</p>
        
        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">1. Introduction</h2>
          <p>Welcome to KangJessy Agency. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">2. Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, and project details when you contact us or use our client portal. We also collect non-personal data like browser type and IP address for analytical purposes.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Process your project orders</li>
            <li>Communicate with you regarding updates or support</li>
            <li>Improve our website performance and user experience</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us via WhatsApp or Email available on our Contact page.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSEO } from '../../composables/useSEO';

useSEO({
    title: 'Privacy Policy',
    description: 'Privacy Policy for KangJessy Agency. Learn how we handle your personal data.',
    url: '/privacy-policy'
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
