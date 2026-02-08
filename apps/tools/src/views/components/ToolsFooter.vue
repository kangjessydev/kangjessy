<template>
    <footer class="bg-bg-primary border-t border-border-color pt-20 pb-12 relative overflow-hidden">
        <!-- Background Decoration -->
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div class="max-w-[1400px] mx-auto px-8 relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                <!-- Brand -->
                <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-white">
                            <Wrench :size="16" />
                        </div>
                        <span class="text-xl font-black text-text-primary tracking-tight">
                            KangJessy <span class="text-accent-primary">Tools</span>
                        </span>
                    </div>
                    <p class="text-text-secondary text-sm max-w-sm leading-relaxed">
                        Kumpulan alat bantu produktivitas gratis untuk marketer, developer, dan pebisnis. Update secara berkala.
                    </p>
                </div>

                <!-- Action / Suggestion -->
                <div class="flex flex-col items-center md:items-end gap-6">
                    <div class="flex flex-col items-center md:items-end text-center md:text-right">
                        <h4 class="text-text-primary font-black text-lg mb-2">Punya ide tool baru?</h4>
                        <p class="text-text-tertiary text-sm">Bagikan ide Anda dan biarkan kami membangunnya.</p>
                    </div>
                    <button @click="handleSuggest" 
                        class="px-8 py-3 bg-bg-secondary border border-border-color rounded-2xl text-text-primary font-black text-sm hover:border-accent-primary hover:text-accent-primary transition-all active:scale-95 group">
                        Kirim Saran Ide
                        <ArrowRight :size="16" class="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex flex-wrap justify-center gap-3">
                    <a v-for="social in siteConfig.socialLinks" :key="social.name" :href="social.url"
                        target="_blank"
                        class="w-10 h-10 rounded-xl bg-bg-secondary border border-border-color text-text-secondary flex items-center justify-center transition-all hover:text-accent-primary hover:border-accent-primary">
                        <component :is="getSocialIcon(social.icon)" :size="18" />
                    </a>
                </div>
                
                <p class="text-text-tertiary text-[0.8rem] font-medium">
                    &copy; {{ new Date().getFullYear() }} KangJessy. Built with <span class="text-red-500 mx-1">❤</span> for builders.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { Wrench, ArrowRight, Github, Linkedin, Youtube, Instagram, Hash, ExternalLink } from 'lucide-vue-next';
import { siteConfig } from '@/data/config/siteConfig';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

const popup = usePopupManager();

const getSocialIcon = (iconName: string) => {
    const icons: Record<string, any> = {
        'Github': Github,
        'Linkedin': Linkedin,
        'Youtube': Youtube,
        'Instagram': Instagram,
        'Thread': Hash
    };
    return icons[iconName] || ExternalLink;
};

const handleSuggest = () => {
    popup.openModal(Popups.CHAT_WA, {
        title: 'Saran Ide Tool',
        bubbleMessage: 'Halo Kang! saya punya ide tool keren nih buat ditambahin ke koleksi Tools...',
        initialMessage: 'Halo Kang! Saya punya ide tool keren nih...',
        actionText: 'Kirim Ide ke WhatsApp',
        category: 'Tools Idea'
    });
};
</script>
