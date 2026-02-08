<template>
    <nav
        class="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 bg-gradient-to-t from-slate-50 via-white/95 to-white/80 backdrop-blur-xl border-t border-slate-100 flex justify-between items-center safe-area-bottom">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
            class="flex flex-col items-center gap-1 group relative py-1" v-slot="{ isActive }">
            <div class="w-12 h-8 flex items-center justify-center rounded-2xl transition-all duration-300"
                :class="isActive ? 'bg-indigo-50 text-[#702DFF] scale-110 shadow-sm shadow-indigo-500/10' : 'text-slate-400'">
                <component :is="item.icon" :size="20" stroke-width="2.5" />
            </div>
            <span class="text-[9px] font-black uppercase tracking-widest transition-colors"
                :class="isActive ? 'text-[#1B2559]' : 'text-slate-300'">
                {{ item.label }}
            </span>

            <!-- Pulse Indicator for Active -->
            <div v-if="isActive"
                class="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#702DFF] rounded-full animate-pulse"></div>
        </router-link>
    </nav>
</template>

<script setup lang="ts">
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Briefcase,
    PieChart
} from 'lucide-vue-next'

const navItems = [
    { label: 'Home', path: '/', icon: LayoutDashboard },
    { label: 'Orders', path: '/orders', icon: ShoppingCart },
    { label: 'Leads', path: '/leads', icon: Users },
    { label: 'Jobs', path: '/projects', icon: Briefcase },
    { label: 'Stat', path: '/finance', icon: PieChart }
]
</script>

<style scoped>
.safe-area-bottom {
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
}

/* Remove tap highlight on mobile */
* {
    -webkit-tap-highlight-color: transparent;
}
</style>
