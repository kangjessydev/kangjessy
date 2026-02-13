<template>
  <section id="contact" class="bg-bg-primary py-32">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div class="contact-info">
          <SectionHeader
            badge="Konsultasi Gratis"
            subtitle="Punya pertanyaan tentang proyekmu? Atau mau diskusi solusi terbaik? Chat saya via WhatsApp, gratis!"
            align="left"
          >
            <template #title>
              {{ settings.name.split(" ")[0] }}
              <span
                class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
                >{{ settings.name.split(" ").slice(1).join(" ") }}</span
              >
            </template>
          </SectionHeader>

          <div class="flex flex-col gap-4 mt-10">
            <div
              v-for="item in contactItems"
              :key="item.label"
              class="relative group w-full"
            >
              <!-- Unified Detailed Card -->
              <component
                :is="item.action ? 'button' : 'div'"
                @click="item.action && item.action()"
                :aria-label="
                  item.action
                    ? `Contact via ${item.label}: ${item.value}`
                    : undefined
                "
                class="flex items-center gap-5 w-full p-4 rounded-2xl bg-bg-secondary/50 border border-border-color hover:border-accent-primary/50 transition-all duration-300 group hover:bg-bg-secondary text-left"
                :class="{ 'active:scale-[0.99] cursor-pointer': item.action }"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-primary group-hover:text-accent-primary group-hover:border-accent-primary/50 transition-colors shrink-0"
                >
                  <component :is="item.icon" :size="22" />
                </div>

                <div class="flex flex-col min-w-0">
                  <span
                    class="text-[clamp(0.6rem,1.5vw,0.7rem)] font-bold text-text-tertiary uppercase tracking-widest"
                    >{{ item.label }}</span
                  >
                  <span
                    class="text-[clamp(1rem,2vw,1.125rem)] font-black text-text-primary mt-0.5 truncate w-full"
                    >{{ item.value }}</span
                  >
                </div>
              </component>
            </div>
          </div>
        </div>

        <div
          class="bg-bg-secondary/50 backdrop-blur-sm border border-border-color rounded-2xl p-8 shadow-xl"
        >
          <ContactForm />
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
import ContactForm from "./ContactForm.vue";
import SectionHeader from "../../ui/SectionHeader.vue";
import WhatsAppModal from "../../modals/WhatsAppModal.vue";
import EmailModal from "../../modals/EmailModal.vue";
import { Mail, Phone, MapPin } from "lucide-vue-next";
import { siteConfig } from "../../../data/config/siteConfig";
import { useSiteSettings } from "../../../composables/useSiteSettings";

const { settings } = useSiteSettings();

const isWAModalOpen = ref(false);
const isEmailModalOpen = ref(false);

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: settings.value.email,
    action: () => (isEmailModalOpen.value = true),
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: settings.value.whatsapp,
    action: () => (isWAModalOpen.value = true),
  },
  {
    icon: MapPin,
    label: "Location",
    value: settings.value.location,
    action: null as any,
  },
];
</script>
