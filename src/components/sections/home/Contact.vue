<template>
  <section id="contact" class="bg-bg-primary py-32">
    <div class="container mx-auto px-4">
      
      <SectionHeader
        badge="Let's Talk"
        title="Siap Mulai Proyek?"
        subtitle="Pilih cara termudah untuk terhubung. Saya siap merespons dalam hitungan jam."
        align="center"
      />

      <!-- Contact Cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-16 max-w-4xl mx-auto">
        <component
          :is="item.action ? 'button' : 'div'"
          v-for="(item, index) in contactItems"
          :key="item.label"
          @click="item.action && item.action()"
          class="group flex flex-col items-center gap-3 p-5 md:p-8 rounded-[24px] bg-bg-secondary border border-border-color hover:border-accent-primary/50 transition-all duration-300 hover:bg-bg-secondary/80 hover:-translate-y-1 text-center"
          :class="[{ 'cursor-pointer': item.action }, index === 2 ? 'col-span-2 md:col-span-1' : 'col-span-1']"
        >
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-bg-primary border border-border-color flex items-center justify-center text-text-secondary group-hover:text-accent-primary group-hover:border-accent-primary/40 transition-all duration-300 shrink-0">
            <component :is="item.icon" :size="24" />
          </div>
          <div>
            <span class="block text-[0.65rem] font-black text-text-tertiary uppercase tracking-widest mb-1">{{ item.label }}</span>
            <span class="block text-[1rem] font-bold text-text-primary group-hover:text-accent-primary transition-colors">{{ item.value }}</span>
          </div>
          <span v-if="item.action" class="text-[0.75rem] text-accent-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
            Klik untuk {{ item.label === 'WhatsApp' ? 'chat' : 'kirim email' }} →
          </span>
        </component>
      </div>

      <!-- Pricing Bento Link -->
      <div class="mt-8 max-w-3xl mx-auto cursor-pointer group" @click="scrollToPricing">
        <div class="relative rounded-[32px] overflow-hidden bg-accent-primary/[0.05] border border-accent-primary/30 backdrop-blur-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 hover:bg-accent-primary/[0.08] hover:border-accent-primary hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:-translate-y-1">
          <!-- Background Glow -->
          <div class="absolute -right-20 -top-20 w-48 h-48 bg-accent-primary/20 blur-[60px] rounded-full transition-all group-hover:bg-accent-primary/30"></div>
          
          <div class="relative z-10 text-center md:text-left">
            <h3 class="text-2xl font-bold text-text-primary flex items-center gap-3 justify-center md:justify-start">
              <span>Jelajahi Paket & Harga</span>
              <RocketIcon :size="24" class="text-accent-primary shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </h3>
            <p class="text-[0.9rem] text-text-secondary mt-2 max-w-[400px]">Harga transparan, fitur jelas, dan bebas janji manis. Temukan paket terbaik yang paling sesuai dengan visi digital Anda.</p>
          </div>

          <div class="relative z-10 shrink-0">
            <div class="w-12 h-12 rounded-full bg-accent-primary flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <ArrowRightIcon :size="20" />
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modals -->
    <WhatsAppModal
      :isOpen="isWAModalOpen"
      initialMessage="Halo Kang Jessy! Saya ingin diskusi tentang project baru."
      category="Contact Section"
      @close="isWAModalOpen = false"
    />
    <EmailModal
      :isOpen="isEmailModalOpen"
      initialSubject="Project Inquiry"
      @close="isEmailModalOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SectionHeader from "../../ui/SectionHeader.vue";
import WhatsAppModal from "../../modals/WhatsAppModal.vue";
import EmailModal from "../../modals/EmailModal.vue";
import { Mail, MapPin, ArrowRight as ArrowRightIcon, Rocket as RocketIcon } from "lucide-vue-next";
import WhatsappIcon from "../../icons/WhatsappIcon.vue";
import { useSiteSettings } from "../../../composables/useSiteSettings";

const { settings } = useSiteSettings();

const isWAModalOpen = ref(false);
const isEmailModalOpen = ref(false);

const scrollToPricing = () => {
  const el = document.getElementById('pricing');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const contactItems = [
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    value: settings.value.whatsapp,
    action: () => (isWAModalOpen.value = true),
  },
  {
    icon: Mail,
    label: "Email",
    value: settings.value.email,
    action: () => (isEmailModalOpen.value = true),
  },
  {
    icon: MapPin,
    label: "Location",
    value: settings.value.location,
    action: null as any,
  },
];
</script>
