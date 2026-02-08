<template>
    <div class="tools-site-layout min-h-screen bg-bg-primary">
        <ToolsNavbar />
        <main class="min-h-screen">
            <RouterView />
        </main>
        <ToolsFooter />
    </div>
</template>

<script setup lang="ts">
import ToolsNavbar from '../components/ToolsNavbar.vue';
import ToolsFooter from '../components/ToolsFooter.vue';
</script>

<style scoped>
.tools-site-layout {
    display: flex;
    flex-direction: column;
}
</style>
