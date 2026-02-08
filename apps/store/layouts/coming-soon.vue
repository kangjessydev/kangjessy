<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary selection:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none opacity-40 mix-blend-screen animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none opacity-30"></div>
    
    <div class="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full">
        <!-- Minimal Header -->
        <header class="absolute top-0 left-0 pt-8 w-full flex justify-center md:justify-start">
            <div class="flex items-center gap-2">
                 <slot name="logo" />
            </div>
        </header>

        <main class="flex-grow flex items-center justify-center">
            <slot />
        </main>

        <footer class="absolute bottom-0 left-0 pb-8 w-full text-center text-xs text-gray-600">
            &copy; {{ new Date().getFullYear() }} KangJessy. All rights reserved.
        </footer>
    </div>
  </div>
</template>
