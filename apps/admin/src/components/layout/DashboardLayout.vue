<template>
  <div class="flex min-h-screen relative">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Mobile Overlay -->
    <div
      v-if="isMobileOpen"
      @click="closeMobileSidebar"
      class="fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Main Content -->
    <div class="main-wrapper" :class="{ expanded: isCollapsed }">
      <TopNav />
      <main class="flex-1 pb-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Sidebar from "./Sidebar.vue";
import TopNav from "./TopNav.vue";
import { useSidebar } from "../../composables/useSidebar";
import { useDarkMode } from "../../composables/useDarkMode";

const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();
const { initTheme } = useDarkMode();

// Initialize theme
onMounted(() => {
  initTheme();
});

// Auto-close sidebar on route change (mobile)
// Note: router watcher usually in Sidebar, but global listener here is fine
</script>
