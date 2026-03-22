<template>
    <div class="fixed bottom-24 md:bottom-10 right-6 md:right-10 flex flex-col items-end gap-5 transition-all duration-300"
        :class="hasActiveSheet ? 'opacity-0 translate-y-10 pointer-events-none z-0' : 'opacity-100 translate-y-0 z-9999'">
        <!-- Floating Buttons Group -->
        <div class="flex flex-col items-end gap-4">
            <div class="flex flex-col items-end gap-3">
                <TransitionGroup enter-active-class="transition duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    enter-from-class="opacity-0 scale-50 translate-y-8"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-50 translate-y-8">
                    <div v-if="isExpanded" key="email" class="flex items-center gap-3 group">
                        <span
                            class="bg-bg-secondary border border-border-color px-3 py-1.5 rounded-xl text-[0.8rem] font-semibold text-text-primary shadow-lg opacity-0 translate-x-3 transition-all group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">Email
                            Support</span>
                        <button @click="emit('open-email')"
                            class="w-12 h-12 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-xl hover:-translate-y-1 hover:scale-110 transition-all">
                            <MailIcon :size="18" />
                        </button>
                    </div>
                    <div v-if="isExpanded" key="ai" class="flex items-center gap-3 group">
                        <span
                            class="bg-bg-secondary border border-border-color px-3 py-1.5 rounded-xl text-[0.8rem] font-semibold text-text-primary shadow-lg opacity-0 translate-x-3 transition-all group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">Tanya
                            AI (Beta)</span>
                        <button @click="emit('open-ai')"
                            class="w-12 h-12 rounded-full bg-linear-to-tr from-[#0088cc] to-[#00aaff] text-white flex items-center justify-center shadow-xl hover:-translate-y-1 hover:scale-110 transition-all">
                            <BotIcon :size="18" />
                        </button>
                    </div>
                    <div v-if="isExpanded" key="wa" class="flex items-center gap-3 group">
                        <span
                            class="bg-bg-secondary border border-border-color px-3 py-1.5 rounded-xl text-[0.8rem] font-semibold text-text-primary shadow-lg opacity-0 translate-x-3 transition-all group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">Chat
                            WhatsApp</span>
                        <button @click="emit('open-wa')"
                            class="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:-translate-y-1 hover:scale-110 transition-all">
                            <MessageCircleIcon :size="18" />
                        </button>
                    </div>
                </TransitionGroup>
            </div>

            <!-- Main Toggle -->
            <div class="relative w-[60px] h-[60px]">
                <div v-if="!isExpanded"
                    class="absolute inset-0 rounded-full border-2 border-accent-primary animate-[pulse-ring_2s_infinite]">
                </div>
                <button @click="isExpanded = !isExpanded"
                    class="relative z-10 w-[60px] h-[60px] rounded-full bg-linear-to-tr from-accent-primary to-accent-secondary text-white flex items-center justify-center shadow-[0_10px_30px_rgba(var(--accent-primary-rgb),0.4)] transition-all duration-400 hover:scale-110"
                    :class="{ 'bg-bg-secondary! bg-none! border! border-border-color! text-text-primary! shadow-none!': isExpanded }">
                    <XIcon v-if="isExpanded" :size="24" />
                    <MessageSquareIcon v-else :size="24" />
                </button>
            </div>
        </div>

        <!-- Back to Top -->
        <Transition enter-active-class="transition duration-400 ease-out" enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-400 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
            <button v-if="showBackToTop" @click="scrollToTop"
                class="w-11 h-11 rounded-xl bg-bg-secondary border border-border-color text-text-secondary flex items-center justify-center transition-all hover:border-accent-primary hover:text-accent-primary hover:-translate-y-1 shadow-lg">
                <ArrowUpIcon :size="20" />
            </button>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { activeSheet } from "@kangjessy/ui"

const hasActiveSheet = computed(() => activeSheet.value !== null)
import {
    MessageSquare as MessageSquareIcon,
    MessageCircle as MessageCircleIcon,
    Mail as MailIcon,
    ArrowUp as ArrowUpIcon,
    X as XIcon,
    Bot as BotIcon
} from 'lucide-vue-next'

const emit = defineEmits(['open-wa', 'open-email', 'open-ai'])

const isExpanded = ref(false)
const showBackToTop = ref(false)

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
    showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes pulse-ring {
    0% {
        transform: scale(1);
        opacity: 0.8;
    }

    100% {
        transform: scale(1.6);
        opacity: 0;
    }
}
</style>
