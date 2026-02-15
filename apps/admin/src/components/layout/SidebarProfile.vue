<template>
  <div class="px-4 mt-auto mb-6">
    <div 
      class="bg-slate-50 border border-slate-100/50 rounded-2xl p-4 transition-all duration-300 group/profile"
      :class="collapsed ? 'px-2 py-3' : ''"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden relative group-hover/profile:scale-105 transition-transform">
          <img 
            v-if="profile.avatar" 
            :src="profile.avatar" 
            class="w-full h-full object-cover" 
            alt="Profile Avatar" 
          />
          <User v-else :size="20" class="text-indigo-600" />
        </div>

        <!-- Info -->
        <div v-if="!collapsed" class="flex-1 min-w-0 transition-opacity">
          <h4 class="text-xs font-black text-[#1B2559] truncate uppercase tracking-tight">{{ profile.name }}</h4>
          <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 truncate">{{ profile.role }}</p>
        </div>

        <!-- Logout Button (Floating for non-collapsed) -->
        <button 
          v-if="!collapsed"
          @click="handleLogout"
          class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:shadow-sm transition-all"
        >
          <LogOut :size="14" />
        </button>
      </div>

      <!-- Collapsed Logout Indicator -->
      <button 
        v-if="collapsed"
        @click="handleLogout"
        class="mt-3 w- كامل w-full py-2 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all"
      >
        <LogOut :size="14" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogOut, User } from 'lucide-vue-next'
import { useProfile } from '../../composables/useProfile'

defineProps<{
  collapsed: boolean
}>()

const { profile } = useProfile()

const handleLogout = () => {
  // Logic to logout
  window.location.href = '/login'
}
</script>
