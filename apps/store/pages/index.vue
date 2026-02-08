<script setup>
import { Hexagon, Mail, ArrowRight, Github, Twitter, Instagram } from 'lucide-vue-next';

definePageMeta({
  layout: 'coming-soon'
});

const email = ref('');
const subscribed = ref(false);
const loading = ref(false);

const subscribe = () => {
  if (!email.value) return;
  loading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    subscribed.value = true;
    email.value = '';
  }, 1500);
};

useHead({
  title: 'Coming Soon - KangJessy Store',
  meta: [
    { name: 'description', content: 'Something extraordinary is in the works.' }
  ]
});
</script>

<template>
  <NuxtLayout name="coming-soon">
    <template #logo>
       <div class="flex items-center gap-2">
            <Hexagon class="text-primary w-8 h-8 fill-primary/20" stroke-width="2" />
            <span class="text-2xl font-bold tracking-tighter">Kang<span class="text-primary">Jessy</span></span>
       </div>
    </template>

    <div class="text-center max-w-3xl px-6">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8 backdrop-blur-3xl shadow-xl animate-bounce">
             <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
             <span class="text-gray-200 font-medium">Under Construction</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
            We are building the <br/>
            <span class="text-gradient">Future of Digital Assets</span>
        </h1>

        <p class="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            KangJessy Store is currently undergoing a major upgrade to bring you a premium marketplace for Source Codes, UI Templates, and E-Books.
            <br class="hidden md:block"/>
            Get ready for a world-class developer experience.
        </p>

        <!-- Notify Form -->
        <div class="max-w-md mx-auto relative mb-16">
            <div v-if="!subscribed" class="relative group">
               <div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div class="relative flex items-center bg-surface border border-white/10 rounded-full p-2">
                   <div class="pl-4 text-gray-400">
                       <Mail class="w-5 h-5" />
                   </div>
                   <input 
                      v-model="email" 
                      type="email" 
                      placeholder="Enter your email for early access" 
                      class="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-2 w-full focus:outline-none"
                      @keyup.enter="subscribe"
                   />
                   <button 
                      @click="subscribe" 
                      :disabled="loading"
                      class="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                       <span v-if="loading">...</span>
                       <span v-else>Notify Me</span>
                   </button>
               </div>
            </div>
            
            <div v-else class="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
                <span class="text-xl">🎉</span>
                <span class="font-bold">You're on the list! We'll be in touch soon.</span>
            </div>
        </div>

        <!-- Socials -->
        <div class="flex items-center justify-center gap-6">
            <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                <Github class="w-5 h-5" />
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                <Instagram class="w-5 h-5" />
            </a>
        </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #3B82F6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
