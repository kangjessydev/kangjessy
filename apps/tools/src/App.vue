<template>
  <div class="app-container">
    <ToolsNavbar />
    <main class="min-h-screen">
      <RouterView />
    </main>
    <ToolsFooter />
    
    <!-- Global Modals (If needed) -->
    <WhatsAppModal :isOpen="popup.activeModals[Popups.CHAT_WA]" v-bind="popup.getModalProps(Popups.CHAT_WA)"
      @close="popup.closeModal(Popups.CHAT_WA)" />
    <EmailModal :isOpen="popup.activeModals[Popups.CHAT_EMAIL]" v-bind="popup.getModalProps(Popups.CHAT_EMAIL)"
      @close="popup.closeModal(Popups.CHAT_EMAIL)" />
    <AIChatModal :isOpen="popup.activeModals[Popups.CHAT_AI]" v-bind="popup.getModalProps(Popups.CHAT_AI)"
      @close="popup.closeModal(Popups.CHAT_AI)" />
    
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue'
import ToolsNavbar from './views/components/ToolsNavbar.vue'
import ToolsFooter from './views/components/ToolsFooter.vue'
import ToastContainer from './components/ToastContainer.vue'
import { usePopupManager, Popups } from './composables/usePopupManager'
import { useGlobalTheme } from './composables/useTheme'

const WhatsAppModal = defineAsyncComponent(() => import('./components/WhatsAppModal.vue'))
const EmailModal = defineAsyncComponent(() => import('./components/EmailModal.vue'))
const AIChatModal = defineAsyncComponent(() => import('./components/AIChatModal.vue'))

const popup = usePopupManager()
const { initTheme } = useGlobalTheme()

onMounted(() => {
  initTheme()
})
</script>

<style>
/* Reset and base styles already in style.css */
</style>
