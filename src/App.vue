<template>
  <div class="app-container">
    <ScrollProgress v-if="!isClientPortalRoute" />

    <!-- Main Public Layout -->
    <template v-if="!isClientPortalRoute">
      <Navbar />
      <main class="flex-1 min-h-[70vh]">
        <RouterView />
      </main>
      <Footer />
      <MobileNav />
      <FloatingAction
        class="hidden md:flex"
        @open-wa="popup.openModal(Popups.CHAT_WA)"
        @open-ai="popup.openModal(Popups.CHAT_AI)"
        @open-email="popup.openModal(Popups.CHAT_EMAIL)"
      />
    </template>

    <!-- Client Portal Layout (No Nav/Footer) -->
    <template v-else>
      <main class="bg-bg-primary min-h-screen">
        <RouterView />
      </main>
    </template>

    <!-- Global Modals -->
    <WhatsAppModal
      :isOpen="popup.activeModals[Popups.CHAT_WA]"
      v-bind="popup.getModalProps(Popups.CHAT_WA)"
      @close="popup.closeModal(Popups.CHAT_WA)"
    />
    <EmailModal
      :isOpen="popup.activeModals[Popups.CHAT_EMAIL]"
      v-bind="popup.getModalProps(Popups.CHAT_EMAIL)"
      @close="popup.closeModal(Popups.CHAT_EMAIL)"
    />
    <AIChatModal
      :isOpen="popup.activeModals[Popups.CHAT_AI]"
      v-bind="popup.getModalProps(Popups.CHAT_AI)"
      @close="popup.closeModal(Popups.CHAT_AI)"
    />

    <ToastContainer />
    <SpeedInsights />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, defineAsyncComponent } from "vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { useRoute } from "vue-router";
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import MobileNav from "./components/layout/MobileNav.vue";
import ScrollProgress from "./components/ui/ScrollProgress.vue";
import FloatingAction from "./components/layout/FloatingAction.vue";

const WhatsAppModal = defineAsyncComponent(
  () => import("./components/modals/WhatsAppModal.vue"),
);
const EmailModal = defineAsyncComponent(
  () => import("./components/modals/EmailModal.vue"),
);
const AIChatModal = defineAsyncComponent(
  () => import("./components/modals/AIChatModal.vue"),
);

import ToastContainer from "./components/ui/ToastContainer.vue";
import { usePopupManager, Popups } from "./composables/usePopupManager";
import { useGlobalTheme } from "./composables/useTheme";
import { useSiteSettings } from "./composables/useSiteSettings";

const route = useRoute();
const popup = usePopupManager();
const { initTheme } = useGlobalTheme();
const { fetchSettings } = useSiteSettings();

const isClientPortalRoute = computed(() => {
  return (
    route.path.includes("/portal") || String(route.name) === "client-portal"
  );
});

onMounted(() => {
  initTheme();
  fetchSettings();
});
</script>

<style>
* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
