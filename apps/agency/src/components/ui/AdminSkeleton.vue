<template>
    <div class="min-h-screen bg-bg-primary flex">
        <!-- Sidebar Skeleton -->
        <aside class="w-64 border-r border-border-color bg-bg-secondary hidden lg:flex flex-col p-8 space-y-8 h-screen fixed top-0 z-1000">
            <div class="flex items-center gap-3 animate-pulse">
                <div class="w-9 h-9 rounded-lg bg-bg-tertiary"></div>
                <div class="space-y-1.5">
                    <div class="w-20 h-3 bg-bg-tertiary rounded"></div>
                    <div class="w-12 h-2.5 bg-bg-tertiary/50 rounded"></div>
                </div>
            </div>
            <div class="space-y-4 flex-1">
                <div v-for="i in 2" :key="i" class="space-y-2">
                    <div class="w-16 h-2.5 bg-bg-tertiary/40 rounded ml-3"></div>
                    <div v-for="j in 3" :key="j" class="w-full h-9 bg-bg-tertiary/20 rounded-lg animate-pulse"></div>
                </div>
            </div>
            <div class="p-4 border-t border-border-color space-y-2">
                <div class="flex justify-between items-center">
                    <div class="h-2.5 w-24 bg-bg-tertiary/40 rounded"></div>
                    <div class="h-2.5 w-8 bg-bg-tertiary/40 rounded"></div>
                </div>
                <div class="h-1.5 w-full bg-bg-tertiary rounded-full"></div>
            </div>
        </aside>

        <div class="flex-1 flex flex-col lg:ml-64">
            <!-- Navbar Skeleton -->
            <header class="h-20 border-b border-border-color flex items-center justify-between px-8 bg-bg-primary">
                <div class="flex items-center gap-4 animate-pulse">
                    <div class="w-32 h-6 bg-bg-tertiary/40 rounded-full"></div>
                    <div class="w-4 h-4 rounded bg-bg-tertiary/20"></div>
                </div>
                <div class="flex items-center gap-4 animate-pulse">
                    <div class="w-9 h-9 rounded-full bg-bg-tertiary/40"></div>
                </div>
            </header>

            <!-- Content Skeleton -->
            <div class="p-8 space-y-8 max-w-7xl mx-auto w-full">
                <div class="flex justify-between items-center animate-pulse">
                    <div class="space-y-2">
                        <div class="w-48 h-8 bg-bg-tertiary rounded"></div>
                        <div class="w-64 h-3 bg-bg-tertiary/50 rounded"></div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div v-for="i in 4" :key="i" class="h-32 bg-bg-secondary border border-border-color rounded-lg animate-pulse"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 h-80 bg-bg-secondary border border-border-color rounded-lg animate-pulse"></div>
                    <div class="h-80 bg-bg-secondary border border-border-color rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
</style>
