<template>
    <BottomSheet :modelValue="isOpen" title="AI Assistant" :icon="BotIcon" maxWidth="5xl" contentClass="!overflow-hidden !pb-0" fullHeight
        @update:modelValue="$emit('close')" @close="$emit('close')">
        
        <div class="flex flex-col lg:grid lg:grid-cols-12 bg-bg-primary h-[calc(100dvh-64px)] lg:h-[600px] lg:max-h-[75vh] overflow-hidden border-t border-border-color/50">
            
            <!-- Left Column: Settings & Knowledge -->
            <div class="lg:col-span-4 bg-bg-secondary/50 border-b lg:border-b-0 lg:border-r border-border-color flex flex-col h-auto lg:h-full shrink-0 z-10 overflow-hidden">
                <div class="pt-4 lg:pt-16 pb-4 lg:pb-12 px-4 lg:px-8 overflow-y-auto custom-scrollbar lg:h-full">
                    
                    <div class="hidden lg:block mb-8 shrink-0">
                        <span class="text-[0.65rem] font-black text-accent-primary uppercase tracking-[0.4em] mb-3 block">AI Assistant</span>
                        <h3 class="text-2xl font-black text-white leading-tight">Diskusi & Konsultasi</h3>
                        <p class="text-xs text-text-tertiary mt-2 leading-relaxed">Pilih mode interaksi yang sesuai dengan kebutuhan project Anda.</p>
                    </div>

                    <!-- Mode Switcher -->
                    <div class="space-y-4 lg:mb-10 shrink-0">
                        <label class="hidden lg:block text-[0.6rem] font-black text-text-tertiary uppercase tracking-[0.3em] px-1">Pilih Mode Interaksi</label>
                        <div class="flex flex-row lg:grid lg:grid-cols-1 gap-2 p-1.5 bg-bg-primary rounded-2xl border border-border-color">
                            <button 
                                @click="switchMode('chatbot')"
                                class="flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 lg:gap-3 p-2.5 lg:p-3 rounded-xl transition-all duration-300"
                                :class="activeMode === 'chatbot' ? 'bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/20' : 'hover:bg-white/5 text-text-secondary'"
                            >
                                <MessageSquare :size="16" class="shrink-0" />
                                <div class="text-left hidden lg:block">
                                    <div class="text-[0.75rem] font-black uppercase leading-none mb-1">Smart Support</div>
                                    <div class="text-[0.6rem] opacity-60">Instan & Shortcut FAQ</div>
                                </div>
                                <span class="lg:hidden text-[0.75rem] font-bold">Smart Support</span>
                            </button>
                            <button 
                                @click="switchMode('ai')"
                                class="flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 lg:gap-3 p-2.5 lg:p-3 rounded-xl transition-all duration-300"
                                :class="activeMode === 'ai' ? 'bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/20' : 'hover:bg-white/5 text-text-secondary'"
                            >
                                <BotIcon :size="16" class="shrink-0" />
                                <div class="text-left hidden lg:block">
                                    <div class="text-[0.75rem] font-black uppercase leading-none mb-1">AI Assistant</div>
                                    <div class="text-[0.6rem] opacity-60">Eksperimental & Kreatif</div>
                                </div>
                                <span class="lg:hidden text-[0.75rem] font-bold">AI Assistant</span>
                                <span class="hidden lg:inline-block ml-auto text-[8px] bg-accent-primary text-white px-1.5 py-0.5 rounded font-black tracking-widest">BETA</span>
                            </button>
                        </div>
                    </div>

                    <!-- Side System Health -->
                    <div class="hidden lg:block space-y-6 pb-20">
                        <div class="space-y-2">
                             <h4 class="text-[0.65rem] font-black text-text-tertiary uppercase tracking-[0.3em] mb-4 px-1">System Health</h4>
                             <div class="p-4 rounded-xl border border-border-color bg-bg-primary">
                                 <div class="flex items-center justify-between mb-2">
                                     <span class="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Status</span>
                                     <span class="text-[10px] text-green-500 font-black uppercase">Online</span>
                                 </div>
                                 <div class="flex items-center justify-between">
                                     <span class="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Latency</span>
                                     <span class="text-[10px] text-text-tertiary font-black uppercase">~120ms</span>
                                 </div>
                             </div>
                        </div>

                        <!-- Footer Info -->
                        <div class="mt-10 pt-8 border-t border-border-color shrink-0">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></div>
                                <span class="text-[10px] font-black text-white uppercase tracking-widest">Model: Gemini 2.0 Pro</span>
                            </div>
                            <p class="text-[9px] text-text-tertiary leading-relaxed uppercase tracking-widest opacity-40">AI models can make mistakes. Please verify important information.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Chat Interface -->
            <div class="lg:col-span-8 flex-1 flex flex-col overflow-hidden h-full relative bg-bg-primary">
                
                <!-- Messages Area -->
                <div class="flex-1 pt-6 lg:pt-16 pb-6 lg:pb-12 px-4 lg:px-10 space-y-6 lg:space-y-8 overflow-y-auto custom-scrollbar" ref="messageContainer">
                    <div v-for="(msg, index) in messages" :key="index"
                        :class="['flex w-full', msg.role === 'assistant' ? 'justify-start' : 'justify-end']"
                    >
                        
                        <div
                            :class="['max-w-[90%] px-6 py-5 rounded-[24px] text-[0.95rem] leading-relaxed shadow-sm relative',
                                msg.role === 'assistant'
                                    ? (msg.type === 'warning' 
                                        ? 'bg-red-500/10 text-red-200 rounded-tl-sm border border-red-500/30' 
                                        : 'bg-bg-secondary text-text-primary rounded-tl-sm border border-border-color')
                                    : 'bg-linear-to-tr from-accent-primary to-accent-secondary text-white rounded-tr-sm']">
                            
                            <div v-if="msg.type === 'warning'" class="flex items-center gap-2 mb-2 text-red-400">
                                <AlertTriangle :size="14" />
                                <span class="text-[0.6rem] font-black uppercase tracking-widest">System Warning</span>
                            </div>

                            <div v-if="msg.role === 'assistant'" class="markdown-body" v-html="renderMarkdown(msg.content)"></div>
                            <p v-else class="m-0 whitespace-pre-wrap">{{ msg.content }}</p>

                            <span :class="['block text-[0.65rem] mt-3 font-black uppercase tracking-widest opacity-40 text-right', 
                                msg.type === 'warning' ? 'text-red-300' : '']">
                                {{ msg.time }}
                            </span>
                        </div>
                    </div>

                    <!-- Loading Indicator -->
                    <div v-if="isLoading" class="flex justify-start pb-4">
                        <div class="bg-bg-secondary border border-border-color px-5 py-4 rounded-3xl rounded-tl-sm flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.32s]"></span>
                            <span class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.16s]"></span>
                            <span class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce"></span>
                        </div>
                    </div>

                    <!-- Scroll Gap -->
                    <div class="h-10 shrink-0"></div>
                </div>

                <!-- Footer Area -->
                <div class="pt-4 pb-10 lg:pb-16 px-4 lg:px-8 bg-bg-primary border-t border-border-color shrink-0">
                    
                    <!-- Mode 1: AI Assistant (Free Typing) -->
                    <div v-if="activeMode === 'ai'" class="bg-bg-secondary border border-border-color rounded-2xl p-2 pl-6 flex items-end gap-3 transition-all focus-within:border-accent-primary/50 focus-within:ring-4 focus-within:ring-accent-primary/5 shadow-inner">
                        <textarea v-model="userInput" @keydown.enter.prevent="handleEnter" placeholder="Ketik pertanyaan bebas..."
                            rows="1" ref="inputRef"
                            class="flex-1 bg-transparent border-0 text-text-primary py-4 text-[0.95rem] outline-none resize-none max-h-[120px] custom-scrollbar"></textarea>
                        <button @click="sendMessage" :disabled="!userInput.trim() || isLoading"
                            class="w-14 h-14 bg-linear-to-tr from-accent-primary to-accent-secondary text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shrink-0">
                            <SendIcon :size="24" />
                        </button>
                    </div>

                    <!-- Mode 2: Smart Support (Collapsible Vertical FAQ) -->
                    <div v-else class="relative">
                        <!-- Toggle Button -->
                        <button 
                            @click="isFaqOpen = !isFaqOpen"
                            class="w-full flex items-center justify-between p-4 bg-bg-secondary border border-border-color rounded-2xl hover:border-accent-primary/50 transition-all group"
                        >
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                    <HelpCircle :size="18" />
                                </div>
                                <div class="text-left">
                                    <span class="text-[0.7rem] font-black text-white uppercase tracking-widest block leading-none mb-1">Pilih Pertanyaan FAQ</span>
                                    <span class="text-[0.6rem] text-text-tertiary uppercase tracking-widest block leading-none">Klik untuk melihat daftar pertanyaan</span>
                                </div>
                            </div>
                            <ChevronUp :size="18" class="text-text-tertiary transition-transform duration-300" :class="{ 'rotate-180': isFaqOpen }" />
                        </button>

                        <!-- Vertical List (Absolute to not push chat layout too much) -->
                        <div v-if="isFaqOpen" class="absolute bottom-full left-0 w-full mb-3 max-h-[300px] overflow-y-auto bg-bg-primary border border-border-color rounded-2xl shadow-2xl custom-scrollbar flex flex-col p-2 z-50 animate-in slide-in-from-bottom-2 duration-300">
                             <button 
                                v-for="(faq, idx) in faqData" 
                                :key="idx"
                                @click="handleFaqSelection(faq.question)"
                                class="w-full text-left p-4 rounded-xl hover:bg-white/5 border-b last:border-0 border-border-color/50 transition-colors flex items-center gap-4 group"
                            >
                                <Zap :size="12" class="text-text-tertiary group-hover:text-accent-primary transition-colors" />
                                <span class="text-[0.85rem] text-text-secondary group-hover:text-white transition-colors">{{ faq.question }}</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </BottomSheet>
</template>

<script setup lang="ts">
import { ref, onUpdated, nextTick, watch } from 'vue';
import { 
    Bot as BotIcon, 
    Send as SendIcon, 
    MessageSquare,
    ChevronUp,
    HelpCircle,
    AlertTriangle,
    Zap
} from 'lucide-vue-next';
import { marked } from 'marked';
import { BottomSheet } from "@kangjessy/ui";
import { faqData } from '../../data/support/faqData';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  time: string;
  type?: 'default' | 'warning';
}

const props = defineProps<{
    isOpen: boolean;
    initialMessage?: string;
}>();

const emit = defineEmits(['close']);

// Scroll Lock Management
watch(() => props.isOpen, (val) => {
    if (typeof document !== 'undefined') {
        if (val) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
});

const activeMode = ref<'chatbot' | 'ai'>('chatbot');
const isFaqOpen = ref(false); // Collapsible FAQ state

const messages = ref<Message[]>([
    {
        role: 'assistant',
        content: 'Halo! Saya Smart Assistant KangJessy. Mode **Smart Support** aktif.\n\nKlik tombol **"Pilih Pertanyaan FAQ"** di bawah untuk melihat topik bantuan yang tersedia.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'default'
    }
]);

const userInput = ref('');
const isLoading = ref(false);
const messageContainer = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLTextAreaElement | null>(null);

const renderMarkdown = (text: string) => {
    return marked.parse(text);
};

const scrollToBottom = async () => {
    await nextTick();
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
};

const handleEnter = (e: KeyboardEvent) => {
    if (e.shiftKey) return;
    sendMessage();
};

const switchMode = (mode: 'chatbot' | 'ai') => {
    activeMode.value = mode;
    isFaqOpen.value = false;
    const msg = mode === 'ai' 
        ? 'Mode **AI Assistant** diaktifkan. Anda kini bisa mengetik pertanyaan secara bebas.'
        : 'Mode **Smart Support** diaktifkan. Silakan gunakan daftar **Shortcut FAQ** untuk respon instan.';
    
    messages.value.push({
        role: 'assistant',
        content: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'default'
    });
    scrollToBottom();
};

const handleFaqSelection = (question: string) => {
    isFaqOpen.value = false; // Auto-hide on selection
    handleQuickAction(question);
};

const handleQuickAction = (trigger: string) => {
    userInput.value = trigger;
    sendMessage();
};

const sendMessage = async () => {
    if (!userInput.value.trim() || isLoading.value) return;

    const userText = userInput.value.trim();
    userInput.value = '';

    messages.value.push({
        role: 'user',
        content: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    scrollToBottom();
    isLoading.value = true;

    await handleChatbotResponse(userText);
    
    isLoading.value = false;
    scrollToBottom();
};

const handleChatbotResponse = async (input: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const cleanInput = input.toLowerCase();
    
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of faqData) {
        if (cleanInput === item.question.toLowerCase()) {
            bestMatch = item;
            maxMatches = 999;
            break;
        }
        let currentMatches = 0;
        for (const kw of item.keywords) {
            if (cleanInput.includes(kw)) currentMatches++;
        }
        if (currentMatches > maxMatches) {
            maxMatches = currentMatches;
            bestMatch = item;
        }
    }

    if (bestMatch && maxMatches > 0) {
        messages.value.push({
            role: 'assistant',
            content: bestMatch.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'default'
        });
    } else {
        messages.value.push({
            role: 'assistant',
            content: '**⚠️ Fitur Eksperimental (Limit API):** Mohon maaf, saat ini sistem AI dalam tahap pengembangan intensif sehingga belum bisa merespon pertanyaan ini secara mendalam.\n\nSangat disarankan untuk menghubungi saya langsung ke WhatsApp.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'warning'
        });
    }
};

watch(() => props.isOpen, (val) => {
    if (val) {
        nextTick(() => {
            if (inputRef.value) inputRef.value.focus();
            scrollToBottom();
        });
    }
});

onUpdated(scrollToBottom);
</script>

<style scoped>
.markdown-body :deep(p) { margin: 0 0 10px 0; }
.markdown-body :deep(p:last-child) { margin-bottom: 0; }
.markdown-body :deep(ul), .markdown-body :deep(ol) { padding-left: 20px; margin-bottom: 10px; }
.markdown-body :deep(code) { background: rgba(0, 0, 0, 0.2); padding: 2px 5px; border-radius: 4px; font-size: 0.85em; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
</style>
