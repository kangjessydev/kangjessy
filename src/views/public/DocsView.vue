<template>
  <div class="bg-bg-primary min-h-screen pt-24 pb-20 font-sans">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
      <div class="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        <!-- Sidebar Navigation (Desktop) -->
        <aside 
          class="hidden md:block w-full md:w-64 lg:w-72 shrink-0 transition-all duration-300"
        >
          <div class="md:sticky md:top-32 space-y-8 pr-4 max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar pb-10">
            <!-- Header sidebar -->
            <div class="mb-8 hidden md:block">
              <h2 class="text-xl font-black text-white tracking-tight">Dokumentasi</h2>
              <p class="text-xs text-text-tertiary mt-2">Pusat bantuan teknis & panduan kelola website.</p>
            </div>

            <!-- Categories -->
            <div v-for="category in index" :key="category.id" class="space-y-3">
              <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary/80 ml-2">
                {{ category.name }}
              </h3>
              <ul class="space-y-1">
                <li v-for="item in category.items" :key="item.id">
                  <router-link 
                    :to="`/docs/${item.slug}`"
                    class="block px-3 py-2 text-sm rounded-xl transition-all duration-300 cursor-pointer"
                    :class="route.params.slug === item.slug 
                      ? 'bg-accent-primary/10 text-accent-primary font-bold border border-accent-primary/20' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'"
                    @click="isSidebarOpen = false"
                  >
                    {{ item.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 min-w-0" v-if="!loading && currentDoc">
          <div class="max-w-3xl prose-container pb-20">
            <!-- Breadcrumb -->
            <div class="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-text-tertiary mb-8">
              <span>Docs</span>
              <span class="opacity-50">/</span>
              <span>{{ currentDoc.categoryName }}</span>
            </div>

            <!-- Rendered Markdown -->
            <div v-html="currentDoc.content" class="rich-content prose prose-invert prose-lg max-w-none"></div>
            
            <!-- Documentation Footer -->
            <div class="mt-16 pt-8 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-4">
              <p class="text-xs text-text-tertiary">Butuh bantuan lebih lanjut?</p>
              <div class="flex gap-4">
                <button @click="openDirectChat()" class="text-xs font-bold text-accent-primary hover:opacity-80 flex items-center gap-2">
                  <WhatsappIcon :size="14" />
                  Chat WhatsApp
                </button>
              </div>
            </div>
          </div>
        </main>

        <!-- Loading State -->
        <main class="flex-1" v-else-if="loading">
          <div class="max-w-3xl space-y-6 animate-pulse mt-8">
            <div class="h-10 bg-bg-secondary w-3/4 rounded-xl"></div>
            <div class="h-4 bg-bg-secondary w-1/4 rounded-md mb-12"></div>
            <div class="space-y-4">
              <div class="h-4 bg-bg-secondary rounded-md w-full"></div>
              <div class="h-4 bg-bg-secondary rounded-md w-full"></div>
              <div class="h-4 bg-bg-secondary rounded-md w-5/6"></div>
            </div>
          </div>
        </main>

        <!-- Not Found State -->
        <main class="flex-1 py-20 text-center" v-else>
           <h1 class="text-2xl font-bold text-white mb-4">Panduan Tidak Ditemukan</h1>
           <p class="text-text-secondary text-sm">Dokumen yang Anda cari tidak ada atau URL salah.</p>
        </main>

      </div>
    </div>
    
    <!-- Mobile: Floating Button -->
    <div class="md:hidden">
        <button @click="isSidebarOpen = true"
            class="fixed bottom-24 right-6 z-40 w-14 h-14 bg-accent-primary hover:bg-accent-secondary text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            <List :size="24" />
        </button>

        <!-- Mobile TOC using BottomSheet -->
        <BottomSheet v-model="isSidebarOpen" :show-close="false" :show-handle="true" :close-on-backdrop="true"
            :swipe-to-close="true">
            <template #header>
                <div class="flex items-center gap-2">
                    <List :size="20" class="text-accent-primary" />
                    <h4 class="text-lg font-bold text-text-primary">Daftar Panduan</h4>
                </div>
            </template>

            <div class="flex flex-col gap-6 p-6 pb-20 custom-scrollbar overflow-y-auto max-h-[70vh]">
                <div v-for="category in index" :key="category.id" class="space-y-3">
                  <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary/80 ml-2">
                    {{ category.name }}
                  </h3>
                  <ul class="space-y-1">
                    <li v-for="item in category.items" :key="item.id">
                      <router-link 
                        :to="`/docs/${item.slug}`"
                        class="block px-3 py-2 text-sm rounded-xl transition-all duration-300 cursor-pointer"
                        :class="route.params.slug === item.slug 
                          ? 'bg-accent-primary/10 text-accent-primary font-bold border border-accent-primary/20' 
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'"
                        @click="isSidebarOpen = false"
                      >
                        {{ item.title }}
                      </router-link>
                    </li>
                  </ul>
                </div>
            </div>
        </BottomSheet>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { List } from 'lucide-vue-next';
import { BottomSheet } from "@kangjessy/ui";
import WhatsappIcon from '../../components/icons/WhatsappIcon.vue';
import { docsService, type DocumentDetail } from '../../services/docsService';
import type { DocCategory } from '../../data/docs/docsData';
import { useSEO } from '../../composables/useSEO';
import { useWhatsApp } from '../../composables/useWhatsApp';

const route = useRoute();
const router = useRouter();
const { openDirectChat } = useWhatsApp();

const index = ref<DocCategory[]>([]);
const currentDoc = ref<DocumentDetail | null>(null);
const loading = ref(true);
const isSidebarOpen = ref(false);

const loadDoc = async () => {
    loading.value = true;
    let slug = route.params.slug as string;
    
    // Auto redirect to first doc if no slug provided
    if (!slug) {
        if (index.value.length > 0) {
           const firstCategory = index.value[0];
           if (firstCategory && firstCategory.items && firstCategory.items.length > 0) {
               const firstItem = firstCategory.items[0];
               if (firstItem && firstItem.slug) {
                   router.replace(`/docs/${firstItem.slug}`);
                   return;
               }
           }
        }
    }

    currentDoc.value = await docsService.getDocContent(slug);
    
    // Update SEO dynamically
    if (currentDoc.value) {
        useSEO({
            title: `${currentDoc.value.title} | Panduan`,
            description: `Panduan mengenai ${currentDoc.value.title} di ekosistem KangJessy.`,
            url: `/docs/${slug}`
        });
    }
    
    loading.value = false;
    window.scrollTo(0,0);
};

onMounted(() => {
    index.value = docsService.getIndex();
    loadDoc();
});

watch(() => route.params.slug, loadDoc);
</script>

<style scoped>
/* Prose container overrides if needed */
.prose-container :deep(h1) {
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 0.5em;
    color: var(--text-primary);
    letter-spacing: -0.03em;
}

.prose-container :deep(h2) {
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 2em;
    margin-bottom: 1em;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5em;
}

.prose-container :deep(p) {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5em;
}

.prose-container :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5em;
    color: var(--text-secondary);
}

.prose-container :deep(li) {
    margin-bottom: 0.5em;
    line-height: 1.6;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
}
</style>
