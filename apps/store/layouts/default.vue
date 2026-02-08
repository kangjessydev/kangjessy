<template>
  <div class="min-h-screen bg-background text-white selection:bg-primary selection:text-white flex flex-col">
    <AppNavbar />
    <main class="flex-grow pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
