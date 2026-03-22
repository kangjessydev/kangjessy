<template>
    <BottomSheet :modelValue="isOpen" title="AI Assistant" :icon="BotIcon" :fullHeight="true"
        @update:modelValue="$emit('close')" @close="$emit('close')">
        <!-- Header Extra Info -->
        <template #header>
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-4">
                    <div
                        class="w-10 h-10 bg-linear-to-tr from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center text-white shadow-lg">
                        <component :is="activeMode === 'ai' ? BotIcon : MessageSquareIcon" :size="20" />
                    </div>
                    <div>
                        <div class="relative group">
                            <button @click="isModeDropdownOpen = !isModeDropdownOpen" 
                                class="flex items-center gap-2 hover:bg-white/5 px-2 py-1 -ml-2 rounded-lg transition-colors">
                                <div class="flex items-center gap-2">
                                    <h4 class="text-[0.9rem] font-bold text-text-primary">
                                        {{ activeMode === 'ai' ? 'KangJessy AI' : 'Smart Support' }}
                                    </h4>
                                    <span class="text-[8px] bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded font-black tracking-widest leading-none">BETA</span>
                                    <ChevronDownIcon :size="14" class="text-text-tertiary group-hover:text-accent-primary transition-colors" />
                                </div>
                            </button>
                            
                            <!-- Mode Dropdown -->
                            <div v-if="isModeDropdownOpen" 
                                class="absolute top-full left-0 mt-2 w-48 bg-bg-secondary border border-border-color rounded-xl shadow-2xl p-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
                                <button @click="switchMode('chatbot')" 
                                    :class="['w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all', activeMode === 'chatbot' ? 'bg-accent-primary/10 text-accent-primary' : 'hover:bg-white/5 text-text-secondary']">
                                    <MessageSquareIcon :size="16" />
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-1.5">
                                            <span class="text-[11px] font-black uppercase">Smart Support</span>
                                            <span class="text-[8px] bg-accent-primary px-1.5 py-0.5 rounded text-white font-black">BETA</span>
                                        </div>
                                        <span class="text-[9px] opacity-60">Instan & Terakurat</span>
                                    </div>
                                </button>
                                <button @click="switchMode('ai')" 
                                    :class="['w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all mt-1', activeMode === 'ai' ? 'bg-accent-primary/10 text-accent-primary' : 'hover:bg-white/5 text-text-secondary']">
                                    <BotIcon :size="16" />
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-1.5">
                                            <span class="text-[11px] font-black uppercase">AI Assistant</span>
                                            <span class="text-[8px] bg-accent-primary px-1.5 py-0.5 rounded text-white font-black">BETA</span>
                                        </div>
                                        <span class="text-[9px] opacity-60">Diskusi Bebas & Kreatif</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <p class="text-[0.7rem] text-text-tertiary font-medium">
                            {{ activeMode === 'ai' ? 'Experimental Assistant' : 'Ready to help you' }}
                        </p>
                    </div>
                </div>
                <button @click="$emit('close')"
                    class="w-10 h-10 rounded-xl bg-bg-tertiary/50 flex items-center justify-center text-text-tertiary transition-all active:scale-90">
                    <XIcon :size="20" />
                </button>
            </div>
        </template>

        <!-- Chat Content Area -->
        <div class="flex flex-col min-h-full overflow-hidden">
            <div class="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar" ref="messageContainer">
                <div v-for="(msg, index) in messages" :key="index"
                    :class="['flex w-full', msg.role === 'assistant' ? 'justify-start' : 'justify-end']">
                    <div
                        :class="['max-w-[85%] px-5 py-4 rounded-3xl text-[0.92rem] leading-relaxed shadow-sm',
                            msg.role === 'assistant'
                                ? 'bg-bg-primary text-text-primary rounded-tl-sm border border-border-color'
                                : 'bg-linear-to-tr from-accent-primary to-accent-secondary text-white rounded-tr-sm shadow-xl shadow-accent-primary/20']">

                        <div v-if="msg.role === 'assistant'" class="markdown-body" v-html="renderMarkdown(msg.content)">
                        </div>
                        <p v-else class="m-0 whitespace-pre-wrap">{{ msg.content }}</p>

                        <span
                            :class="['block text-[0.65rem] mt-2 font-black uppercase tracking-widest opacity-40 text-right']">
                            {{ msg.time }}
                        </span>
                    </div>
                </div>

                <!-- Quick Actions Shortcuts (Contextual & Persistent) -->
                <div v-if="activeMode === 'chatbot' && currentQuickActions.length > 0" 
                    class="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <button v-for="action in currentQuickActions" :key="action.label"
                        @click="handleQuickAction(action.trigger)"
                        class="px-4 py-2 bg-bg-secondary border border-border-color rounded-2xl text-[0.75rem] font-bold text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-all flex items-center gap-2 shadow-sm whitespace-nowrap">
                        <component :is="getIcon(action.icon)" :size="14" />
                        {{ action.label }}
                    </button>
                </div>

                <!-- Loading Indicator -->
                <div v-if="isLoading" class="flex justify-start">
                    <div
                        class="bg-bg-primary border border-border-color px-5 py-4 rounded-3xl rounded-tl-sm flex items-center gap-1.5">
                        <span
                            class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.32s]"></span>
                        <span
                            class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.16s]"></span>
                        <span class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Area Footer -->
        <template #footer>
            <div
                class="bg-bg-primary border border-border-color rounded-2xl p-2 pl-5 flex items-end gap-3 transition-all focus-within:border-accent-primary/50 focus-within:ring-4 focus-within:ring-accent-primary/5">
                <textarea v-model="userInput" @keydown.enter.prevent="handleEnter" placeholder="Tanya apa saja..."
                    rows="1" ref="inputRef"
                    class="flex-1 bg-transparent border-0 text-text-primary py-3 text-[0.95rem] outline-none resize-none max-h-[150px] custom-scrollbar"></textarea>
                <button @click="sendMessage" :disabled="!userInput.trim() || isLoading"
                    class="w-12 h-12 bg-linear-to-tr from-accent-primary to-accent-secondary text-white rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:cursor-not-allowed shrink-0">
                    <SendIcon :size="20" />
                </button>
            </div>
        </template>
    </BottomSheet>
</template>

<script setup lang="ts">
import { ref, onUpdated, nextTick, watch } from 'vue';
import { 
    Bot as BotIcon, 
    X as XIcon, 
    Send as SendIcon, 
    MessageSquare as MessageSquareIcon, 
    ChevronDown as ChevronDownIcon,
    DollarSign,
    Workflow,
    Globe,
    User,
    Zap,
    Layout,
    ShoppingCart,
    MessageCircle
} from 'lucide-vue-next';
import { marked } from 'marked';
import { BottomSheet } from "@kangjessy/ui";
import { faqData, quickActions } from '../../data/support/faqData';

const props = defineProps<{
    isOpen: boolean;
    initialMessage?: string;
}>();

const emit = defineEmits(['close']);

const activeMode = ref<'chatbot' | 'ai'>('chatbot');
const isModeDropdownOpen = ref(false);

const messages = ref([
    {
        role: 'assistant',
        content: 'Halo! Saya Smart Assistant KangJessy.\n\nAnda bisa tanya apa saja seputar pembuatan website, alur kerja, hingga harga layanan saya.\n\n*Pilih menu atau ketik pertanyaan Anda di bawah!*',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
]);

const aiMessagesHistory = ref<any[]>([]);
const chatbotMessagesHistory = ref<any[]>([...messages.value]);
const currentQuickActions = ref<any[]>(quickActions.slice(0, 4)); // Default actions

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
        // Find the parent scrollable container of BottomSheet content
        // In this case, BottomSheet handles its own scroll, so we might need to target the slot container
        const scrollable = messageContainer.value.closest('.overflow-y-auto');
        if (scrollable) {
            scrollable.scrollTop = scrollable.scrollHeight;
        }
    }
};

const handleEnter = (e: KeyboardEvent) => {
    if (e.shiftKey) return;
    sendMessage();
};

const switchMode = (mode: 'chatbot' | 'ai') => {
    // Save current history
    if (activeMode.value === 'ai') aiMessagesHistory.value = [...messages.value];
    else chatbotMessagesHistory.value = [...messages.value];

    activeMode.value = mode;
    isModeDropdownOpen.value = false;

    // Restore or Init new mode history
    if (mode === 'ai') {
        if (aiMessagesHistory.value.length === 0) {
            messages.value = [{
                role: 'assistant',
                content: 'Mode AI Assistant Aktif. Silakan tanya apa saja, saya akan mencoba berpikir kreatif untuk menjawab Anda!\n\n*Catatan: Mode ini masih dalam tahap eksperimen.*',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }];
        } else {
            messages.value = [...aiMessagesHistory.value];
        }
    } else {
        messages.value = [...chatbotMessagesHistory.value];
    }
};

const handleQuickAction = (trigger: string) => {
    userInput.value = trigger;
    sendMessage();
};

const getIcon = (iconName: string) => {
    const icons: any = { DollarSign, Workflow, Globe, User, Zap, Layout, ShoppingCart, MessageCircle };
    return icons[iconName] || MessageSquareIcon;
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
    currentQuickActions.value = []; // Hide during thinking

    if (activeMode.value === 'chatbot') {
        await handleChatbotResponse(userText);
    } else {
        await handleAiResponse();
    }
    
    isLoading.value = false;
    scrollToBottom();
};

const handleChatbotResponse = async (input: string) => {
    // Simulating thinking time
    await new Promise(resolve => setTimeout(resolve, 800));

    const cleanInput = input.toLowerCase();
    
    // Simple Keyword Matching
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of faqData) {
        let currentMatches = 0;
        for (const kw of item.keywords) {
            if (cleanInput.includes(kw)) currentMatches++;
        }
        
        if (currentMatches > maxMatches) {
            maxMatches = currentMatches;
            bestMatch = item;
        }
    }

    let response = '';
    let nextStepLabels: string[] = [];

    if (bestMatch && maxMatches > 0) {
        response = bestMatch.answer;
        nextStepLabels = bestMatch.nextSteps || ['💰 Cek Harga', '🚀 Alur Kerja', '🌐 Layanan'];
    } else {
        response = 'Maaf, saya belum mengerti pertanyaan Anda secara detail. Coba gunakan kata kunci lain (seperti "harga", "layanan", "siapa") atau pindah ke **Mode AI Assistant** di menu atas untuk diskusi lebih bebas!';
        nextStepLabels = ['💰 Cek Harga', '🚀 Alur Kerja', '🌐 Layanan'];
    }

    messages.value.push({
        role: 'assistant',
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Update quick actions based on response
    currentQuickActions.value = quickActions.filter(a => nextStepLabels.includes(a.label));
};

const handleAiResponse = async () => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messages.value.map(m => ({ role: m.role, content: m.content }))
            })
        });

        const data = await response.json();

        if (data.reply) {
            messages.value.push({
                role: 'assistant',
                content: data.reply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        } else {
            throw new Error(data.error || 'Gagal mendapatkan respon');
        }
    } catch (error) {
        messages.value.push({
            role: 'assistant',
            content: 'Waduh, koneksi AI-ku lagi keganggu nih. Coba tanya lagi ya, atau gunakan **Smart Support** yang lebih stabil!',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    }
};

watch(() => props.isOpen, (val) => {
    if (val) {
        nextTick(() => {
            if (inputRef.value) inputRef.value.focus();
            scrollToBottom();
            if (props.initialMessage && messages.value.length === 1) {
                userInput.value = props.initialMessage;
            }
        });
    }
});

onUpdated(scrollToBottom);
</script>

<style scoped>
.markdown-body :deep(p) {
    margin: 0 0 10px 0;
}

.markdown-body :deep(p:last-child) {
    margin-bottom: 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
    padding-left: 20px;
    margin-bottom: 10px;
}

.markdown-body :deep(code) {
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 0.85em;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
}
</style>
