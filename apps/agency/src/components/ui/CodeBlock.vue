<template>
    <div class="my-8 md:my-10 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl relative group">
        <!-- Editor Header -->
        <div class="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
            <!-- MAC Window Controls -->
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>

            <!-- Filename / Language -->
            <span class="text-xs font-mono text-text-tertiary select-none">
                {{ filename || language || 'script.js' }}
            </span>

            <!-- Copy Button -->
            <button @click="copyCode"
                class="flex items-center gap-1.5 text-xs font-medium text-text-tertiary hover:text-white transition-colors cursor-pointer"
                :title="copied ? 'Copied!' : 'Copy Code'">
                <component :is="copied ? Check : Copy" :size="14" />
                <span v-if="copied">Copied!</span>
                <span v-else>Copy</span>
            </button>
        </div>

        <!-- Code Content -->
        <div class="relative overflow-x-auto custom-scrollbar">
            <!-- Line Numbers (Optional Visual) -->
            <div
                class="absolute top-0 left-0 py-6 px-3 text-right select-none text-[#505050] font-mono text-sm leading-relaxed border-r border-white/5 bg-[#1e1e1e] hidden sm:block">
                <div v-for="i in lineCount" :key="i">{{ i }}</div>
            </div>

            <!-- Code Area -->
            <pre class="p-6 sm:pl-16 font-mono text-sm leading-relaxed text-[#d4d4d4] min-w-max">
                <code v-html="highlightedCode"></code>
            </pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy, Check } from 'lucide-vue-next';

const props = defineProps<{
    code: string;
    language?: string;
    filename?: string;
}>();

const copied = ref(false);

const lineCount = computed(() => {
    return props.code.trim().split('\n').length;
});

// Simple Syntax Highlighter (Regex-based)
const highlightedCode = computed(() => {
    let raw = props.code;

    // 1. Escape HTML first
    raw = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 2. Protect and highlight strings first (to avoid conflicts)
    const stringPlaceholders: string[] = [];
    raw = raw.replace(/(['"`])((?:\\.|(?!\1).)*?)\1/g, (match) => {
        const placeholder = `___STRING_${stringPlaceholders.length}___`;
        stringPlaceholders.push(`<span style="color: #ce9178;">${match}</span>`);
        return placeholder;
    });

    // 3. Highlight comments
    raw = raw.replace(/(\/\/.*?)$/gm, '<span style="color: #6a9955;">$1</span>');
    raw = raw.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6a9955;">$1</span>');

    // 4. Highlight keywords (pink/purple)
    const keywords = /\b(const|let|var|function|return|if|else|for|while|import|from|export|default|class|extends|async|await|new|try|catch|finally|break|continue|switch|case|do|throw|typeof|instanceof)\b/g;
    raw = raw.replace(keywords, '<span style="color: #c586c0;">$1</span>');

    // 5. Highlight arrow functions
    raw = raw.replace(/=&gt;/g, '<span style="color: #c586c0;">=&gt;</span>');

    // 6. Highlight types/built-ins (cyan)
    const types = /\b(ref|computed|onMounted|reactive|watch|watchEffect|string|number|boolean|any|void|null|undefined|true|false|console|document|window|Math|JSON|Array|Object|Promise|Set|Map)\b/g;
    raw = raw.replace(types, '<span style="color: #4ec9b0;">$1</span>');

    // 7. Highlight numbers (light green)
    raw = raw.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>');

    // 8. Highlight function calls (yellow)
    raw = raw.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span style="color: #dcdcaa;">$1</span>');

    // 9. Restore strings
    stringPlaceholders.forEach((str, i) => {
        raw = raw.replace(`___STRING_${i}___`, str);
    });

    return raw;
});

const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(props.code);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy!', err);
    }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    height: 8px;
    background: #1e1e1e;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #424242;
    border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #505050;
}
</style>
