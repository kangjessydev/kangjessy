<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-100000 flex flex-col items-center justify-center p-6 bg-bg-primary/40 backdrop-blur-xl"
      >
        <div class="relative flex flex-col items-center">
          <!-- Main Animation -->
          <div class="relative w-24 h-24 mb-10">
            <!-- Pulsing outer ring -->
            <div class="absolute inset-0 rounded-full bg-accent-primary/20 animate-ping"></div>
            <!-- Rotating gradient border -->
            <div 
              class="absolute inset-0 rounded-full border-4 border-transparent border-t-accent-primary border-r-accent-secondary animate-spin"
              style="animation-duration: 1.5s"
            ></div>
            <!-- Inner static/pulsing logo placeholder -->
            <div class="absolute inset-2 rounded-full bg-bg-secondary flex items-center justify-center shadow-lg border border-border-color">
              <div class="w-8 h-8 rounded bg-linear-to-tr from-accent-primary to-accent-secondary animate-pulse shadow-sm"></div>
            </div>
          </div>

          <!-- Text Animation -->
          <div class="text-center space-y-4 max-w-[280px]">
            <h3 class="text-xl font-black text-text-primary tracking-tight">
              {{ title }}
            </h3>
            <div class="flex flex-col gap-2">
              <p class="text-sm text-text-tertiary font-medium leading-relaxed animate-pulse">
                {{ subtitle }}
              </p>
              
              <!-- Progress bar simulation -->
              <div class="w-full h-1 bg-border-color/30 rounded-full overflow-hidden">
                <div class="h-full bg-linear-to-r from-accent-primary to-accent-secondary animate-loading-bar"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Background Decoration Light -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title?: string;
  subtitle?: string;
}>();
</script>

<style scoped>
@keyframes loading-bar {
  0% {
    width: 0%;
    transform: translateX(-100%);
  }
  50% {
    width: 70%;
    transform: translateX(0%);
  }
  100% {
    width: 100%;
    transform: translateX(100%);
  }
}

.animate-loading-bar {
  animation: loading-bar 2s infinite ease-in-out;
}
</style>
