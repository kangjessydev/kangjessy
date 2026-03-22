<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-xl border-t border-border-color md:hidden h-[68px] safe-area-inset-bottom transition-all duration-300 overflow-visible"
    :class="
      hasActiveSheet
        ? 'opacity-0 translate-y-full pointer-events-none'
        : 'opacity-100 translate-y-0 z-2000'
    "
  >
    <div
      class="flex justify-around items-center h-full max-w-md mx-auto px-2 relative"
    >
      <!-- Home -->
      <router-link
        to="/"
        class="nav-item"
        :class="{ active: currentPath === '/' }"
      >
        <HomeIcon :size="20" />
        <span>Home</span>
      </router-link>

      <!-- Services -->
      <button
        @click="toggleServicesMenu"
        class="nav-item"
        :class="{
          active: currentPath.startsWith('/services') || isServicesMenuOpen,
        }"
      >
        <ServicesIcon :size="20" />
        <span>Services</span>
      </button>

      <!-- Hire Me (Center Highlight) -->
      <router-link to="/order" class="nav-item-center">
        <div class="center-icon">
          <SparklesIcon :size="24" />
        </div>
        <span>Hire Me</span>
      </router-link>

      <!-- Blog -->
      <router-link
        to="/blog"
        class="nav-item"
        :class="{ active: currentPath.startsWith('/blog') }"
      >
        <BookOpenIcon :size="20" />
        <span>Blog</span>
      </router-link>

      <!-- Chat -->
      <button
        @click="toggleChatMenu"
        class="nav-item"
        :class="{ active: isChatMenuOpen }"
      >
        <MessageSquareIcon :size="20" />
        <span>Chat</span>
      </button>
    </div>

    <!-- Services Menu Overlay -->
    <Transition
      enter-active-class="transition duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]"
      enter-from-class="opacity-0 translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
    >
      <div
        v-if="isServicesMenuOpen"
        class="absolute bottom-[80px] left-4 right-4 bg-bg-secondary border border-border-color rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-2001 max-h-[60vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-[1rem] font-bold text-text-primary">Layanan Kami</h3>
          <button
            @click="isServicesMenuOpen = false"
            class="text-text-tertiary"
          >
            <XIcon :size="18" />
          </button>
        </div>

        <div class="grid grid-cols-1 gap-3">
          <router-link
            v-for="svc in serviceLinks"
            :key="svc.text"
            :to="svc.url || '/services'"
            @click="isServicesMenuOpen = false"
            class="flex items-center gap-4 p-3 rounded-2xl bg-bg-primary/50 border border-border-color/50 active:scale-[0.98] active:bg-bg-primary transition-all no-underline text-left group relative overflow-hidden"
          >
            <!-- Promo Badge (New) -->
            <div
              v-if="svc.text.includes('Website') || svc.text.includes('Sistem')"
              class="absolute top-0 right-0 px-2 py-0.5 bg-accent-primary text-white text-[9px] font-black uppercase tracking-widest rounded-bl-lg shadow-sm z-10"
            >
              PROMO
            </div>

            <div
              class="w-12 h-12 rounded-xl bg-bg-secondary border border-border-color flex items-center justify-center text-accent-primary shadow-sm shrink-0 group-hover:border-accent-primary/50 group-hover:text-accent-primary transition-colors"
            >
              <component :is="svc.icon" :size="20" />
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <span
                class="text-[0.8rem] font-bold text-text-primary leading-tight mb-0.5 truncate"
                >{{ svc.text }}</span
              >
              <span
                class="text-[0.65rem] text-text-secondary leading-snug line-clamp-1"
                >{{ svc.desc || "Solusi digital profesional." }}</span
              >
            </div>
            <div class="text-text-tertiary">
              <component
                :is="svc.url ? 'ChevronRight' : 'ExternalLink'"
                :size="14"
              />
            </div>
          </router-link>
        </div>

        <div class="mt-6 pt-4 border-t border-border-color/50 text-center">
          <router-link
            to="/services"
            @click="isServicesMenuOpen = false"
            class="text-xs font-bold text-accent-primary uppercase tracking-widest no-underline"
          >
            Lihat Semua Layanan
          </router-link>
        </div>
      </div>
    </Transition>

    <!-- Chat Menu Overlay -->
    <Transition
      enter-active-class="transition duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]"
      enter-from-class="opacity-0 translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
    >
      <div
        v-if="isChatMenuOpen"
        class="absolute bottom-[80px] left-4 right-4 bg-bg-secondary border border-border-color rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-2001"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-[1rem] font-bold text-text-primary">
            Butuh Bantuan?
          </h3>
          <button @click="isChatMenuOpen = false" class="text-text-tertiary">
            <XIcon :size="18" />
          </button>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="link in chatLinks"
            :key="link.label"
            @click="link.action"
            class="flex flex-col items-center gap-2"
          >
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-90"
              :class="link.color"
            >
              <component :is="link.icon" :size="22" />
            </div>
            <span class="text-[0.7rem] font-bold text-text-secondary">{{
              link.label
            }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Home as HomeIcon,
  LayoutGrid as ServicesIcon,
  Sparkles as SparklesIcon,
  BookOpen as BookOpenIcon,
  MessageSquare as MessageSquareIcon,
  MessageCircle as MessageCircleIcon,
  Mail as MailIcon,
  Bot as BotIcon,
  X as XIcon,
} from "lucide-vue-next";
import { usePopupManager, Popups } from "../../composables/usePopupManager";
import { useSiteSettings } from "../../composables/useSiteSettings";
import { activeSheet } from "@kangjessy/ui";
import { menuItems } from "../../data/config/menuConfig";

const { settings } = useSiteSettings();

const route = useRoute();
const popup = usePopupManager();
const currentPath = computed(() => route.path);
const isChatMenuOpen = ref(false);
const isServicesMenuOpen = ref(false);

// Watch for active bottom sheets and hide when one is open
const hasActiveSheet = computed(() => activeSheet.value !== null);

const toggleChatMenu = () => {
  isChatMenuOpen.value = !isChatMenuOpen.value;
  if (isChatMenuOpen.value) isServicesMenuOpen.value = false;
};

const toggleServicesMenu = () => {
  isServicesMenuOpen.value = !isServicesMenuOpen.value;
  if (isServicesMenuOpen.value) isChatMenuOpen.value = false;
};

// Ambil Core Services dari menuConfig (index 0, group 0)
const serviceLinks = computed(() => {
  const serviceMenu = menuItems.find((m) => m.text === "Services");
  if (serviceMenu && serviceMenu.groups) {
    return serviceMenu.groups[0]?.items || [];
  }
  return [];
});

const chatLinks = [
  {
    label: "WhatsApp",
    icon: MessageCircleIcon,
    color: "bg-[#25D366]",
    action: () => {
      popup.openModal(Popups.CHAT_WA, {
        category: "Mobile Nav",
        initialMessage: settings.value.whatsappMsg,
      });
      isChatMenuOpen.value = false;
    },
  },
  {
    label: "AI Assistant",
    icon: BotIcon,
    color: "bg-linear-to-tr from-accent-primary to-accent-secondary",
    action: () => {
      popup.openModal(Popups.CHAT_AI);
      isChatMenuOpen.value = false;
    },
  },
  {
    label: "Email",
    icon: MailIcon,
    color: "bg-[#EA4335]",
    action: () => {
      popup.openModal(Popups.CHAT_EMAIL);
      isChatMenuOpen.value = false;
    },
  },
];
</script>

<style scoped>
@reference "../../style.css";

.nav-item {
  @apply flex flex-col items-center gap-1 flex-1 text-text-secondary transition-all active:scale-95 cursor-pointer select-none no-underline pointer-events-auto;
}

.nav-item span {
  @apply text-[10px] font-bold;
}

.nav-item.active {
  @apply text-accent-primary;
}

.nav-item-center {
  @apply flex flex-col items-center gap-1 flex-1 relative -top-3 cursor-pointer select-none no-underline pointer-events-auto;
}

.nav-item-center span {
  @apply text-[10px] font-bold text-text-secondary;
}

.center-icon {
  @apply w-[52px] h-[52px] bg-accent-primary text-white rounded-full flex items-center justify-center transition-transform active:scale-90;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
