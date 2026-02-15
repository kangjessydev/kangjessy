<template>
  <footer
    class="bg-bg-primary border-t border-border-color pt-32 pb-12 relative overflow-hidden"
  >
    <!-- Top Decorative Line -->
    <div
      class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent-primary to-transparent opacity-30"
    ></div>

    <div class="max-w-[1400px] mx-auto px-8">
      <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_3fr_1.2fr] gap-16 mb-16">
        <!-- Brand Section -->
        <div class="flex flex-col">
          <router-link
            to="/"
            class="flex items-center gap-3 text-[1.5rem] font-extrabold text-text-primary mb-6 justify-center lg:justify-start"
          >
            <img
              src="/logo.png"
              alt="KangJessy Logo"
              class="w-10 h-10 rounded-xl object-contain"
              width="40"
              height="40"
              loading="lazy"
            />
            <span
              >Kang<span
                class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
                >Jessy</span
              ></span
            >
          </router-link>
          <p
            class="text-text-secondary text-[0.95rem] leading-relaxed mb-8 max-w-[320px] mx-auto lg:mx-0 text-center lg:text-left"
          >
            Partner digital strategis untuk pengembangan web modern,
            otomatisasi, dan solusi IT inovatif. Membangun masa depan digital
            yang lebih cerdas.
          </p>
          <div class="flex gap-3 justify-center lg:justify-start">
            <a
              v-for="social in settings.socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Visit our ${social.name}`"
              class="w-10 h-10 rounded-xl bg-bg-secondary border border-border-color text-text-secondary! flex items-center justify-center transition-all duration-300 hover:bg-accent-primary hover:text-white! hover:border-accent-primary"
            >
              <component :is="getSocialIcon(social.icon)" :size="18" />
            </a>
          </div>
        </div>

        <!-- Links Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <!-- Column 1: Services -->
          <div
            class="flex flex-col gap-6 text-left lg:items-start lg:text-left"
          >
            <h4
              class="text-[0.85rem] font-bold text-text-primary uppercase tracking-widest"
            >
              Services
            </h4>
            <ul class="flex flex-col gap-3.5">
              <li v-for="service in servicesData" :key="service.id">
                <router-link
                  :to="`/service/${service.id}`"
                  class="nav-link text-[0.95rem] font-medium"
                >
                  {{ service.title }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Column 2: Tools -->
          <div
            class="flex flex-col gap-6 text-left lg:items-start lg:text-left"
          >
            <h4
              class="text-[0.85rem] font-bold text-text-primary uppercase tracking-widest"
            >
              Tools
            </h4>
            <ul class="flex flex-col gap-3.5">
              <li>
                <a
                  href="https://kangjessy-tools.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="nav-link text-[0.95rem] font-medium"
                  >All Tools</a
                >
              </li>
              <li>
                <a
                  href="https://kangjessy-tools.vercel.app/seo-scanner"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="nav-link text-[0.95rem] font-medium"
                  >SEO Scanner</a
                >
              </li>
              <li>
                <a
                  href="https://kangjessy-tools.vercel.app/palette-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="nav-link text-[0.95rem] font-medium"
                  >Palette Generator</a
                >
              </li>
              <li>
                <router-link
                  to="/services#calculator"
                  class="nav-link text-[0.95rem] font-medium"
                  >Cost Calculator</router-link
                >
              </li>
            </ul>
          </div>

          <!-- Column 3: Resources & Learn -->
          <div
            class="flex flex-col gap-6 text-left lg:items-start lg:text-left"
          >
            <h4
              class="text-[0.85rem] font-bold text-text-primary uppercase tracking-widest"
            >
              Resources & Learn
            </h4>
            <ul class="flex flex-col gap-3.5">
              <li>
                <a
                  href="https://kangjessy-docs.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="nav-link text-[0.95rem] font-medium"
                  >Documentation</a
                >
              </li>
              <li>
                <router-link
                  to="/blog"
                  class="nav-link text-[0.95rem] font-medium"
                  >Blog & Articles</router-link
                >
              </li>
              <!-- <li><router-link to="/changelog" class="nav-link text-[0.95rem] font-medium">Changelog</router-link></li> -->
              <li>
                <router-link
                  to="/projects"
                  class="nav-link text-[0.95rem] font-medium"
                  >Showcase</router-link
                >
              </li>
              <!-- <li><router-link to="/testimonials" class="nav-link text-[0.95rem] font-medium">Testimonials</router-link></li> -->
              <!-- <li><router-link to="/share-experience" class="nav-link text-[0.95rem] font-medium">Share Story</router-link></li> -->
            </ul>
          </div>

          <!-- Column 4: Company & Legal -->
          <div
            class="flex flex-col gap-6 text-left lg:items-start lg:text-left"
          >
            <h4
              class="text-[0.85rem] font-bold text-text-primary uppercase tracking-widest"
            >
              Company & Legal
            </h4>
            <ul class="flex flex-col gap-3.5">
              <li>
                <router-link
                  to="/about"
                  class="nav-link text-[0.95rem] font-medium"
                  >About Us</router-link
                >
              </li>
              <li>
                <router-link
                  to="/portal"
                  class="nav-link text-[0.95rem] font-medium"
                  >Client Portal</router-link
                >
              </li>
              <li>
                <button
                  @click="popup.openModal(Popups.CHAT_WA)"
                  class="nav-link text-[0.95rem] font-medium bg-transparent border-none cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <router-link
                  to="/privacy-policy"
                  class="nav-link text-[0.95rem] font-medium"
                  >Privacy Policy</router-link
                >
              </li>
              <li>
                <router-link
                  to="/terms-of-service"
                  class="nav-link text-[0.95rem] font-medium"
                  >Terms of Service</router-link
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="flex flex-col text-left lg:items-start lg:text-left">
          <h4
            class="text-[0.85rem] font-bold text-text-primary uppercase tracking-widest mb-6"
          >
            Stay Connected
          </h4>
          <p class="text-text-secondary text-[0.9rem] mb-6">
            Dapatkan update terbaru seputar produk dan layanan kami.
          </p>
          <div class="flex flex-col gap-4">
            <a
              :href="`mailto:${settings.email}`"
              class="flex items-center gap-2.5 text-text-secondary font-semibold text-[0.95rem] group w-fit transition-all hover:text-accent-primary"
            >
              <MailIcon :size="16" class="text-accent-primary" />
              <span class="relative">
                {{ settings.email }}
                <span
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full"
                ></span>
              </span>
            </a>
            <div
              class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-[0.75rem] text-green-500 font-bold w-fit"
            >
              <span
                class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
              ></span>
              <span>Online & Available</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center gap-5 text-text-secondary opacity-70 text-[0.85rem]"
      >
        <p>&copy; {{ currentYear }} KangJessy. All rights reserved.</p>
        <div class="flex items-center gap-2">
          <span>Built with</span>
          <span
            class="bg-bg-secondary px-2 py-0.5 rounded text-text-secondary font-semibold"
            >Vue 3</span
          >
          <span
            class="bg-bg-secondary px-2 py-0.5 rounded text-text-secondary font-semibold"
            >Vite</span
          >
          <span
            class="bg-bg-secondary px-2 py-0.5 rounded text-text-secondary font-semibold"
            >Tailwind</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import {
  Mail as MailIcon,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Hash,
  ExternalLink,
} from "lucide-vue-next";
import { useSiteSettings } from "../../composables/useSiteSettings";
import {
  pricingService,
  type ServiceData,
} from "../../services/pricingService";
import { usePopupManager, Popups } from "../../composables/usePopupManager";

const popup = usePopupManager();
const { settings } = useSiteSettings();
const currentYear = computed(() => new Date().getFullYear());
const servicesData = ref<ServiceData[]>([]);

onMounted(async () => {
  servicesData.value = await pricingService.getAllServices();
});

const getSocialIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Github: Github,
    Linkedin: Linkedin,
    Youtube: Youtube,
    Instagram: Instagram,
    Thread: Hash,
    Hash: Hash,
    Twitter: Hash,
    Globe: ExternalLink,
  };
  return icons[iconName] || ExternalLink;
};
</script>
