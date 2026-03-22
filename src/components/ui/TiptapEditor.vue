<template>
    <div v-if="editor"
        class="tiptap-editor group border border-border-color rounded-xl overflow-hidden bg-bg-secondary/50 focus-within:ring-0 focus-within:border-accent-primary/20 transition-all flex flex-col h-full">

        <!-- Rich Toolbar -->
        <div
            class="flex flex-col border-b border-border-color bg-bg-tertiary/20 shrink-0 sticky top-0 z-20 backdrop-blur-md">

            <!-- Main Toolbar Buttons (Scrollable on Mobile) -->
            <div class="flex items-center gap-1 p-2 overflow-x-auto custom-scrollbar no-scrollbar-mobile md:flex-wrap">
                <!-- History -->
                <button type="button" @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors disabled:opacity-30 cursor-pointer"
                    title="Undo">
                    <UndoIcon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors disabled:opacity-30 cursor-pointer"
                    title="Redo">
                    <RedoIcon :size="16" />
                </button>
                <div class="w-px h-4 bg-border-color mx-1 shrink-0"></div>

                <!-- Text Formatting -->
                <button type="button" @click="editor.chain().focus().toggleBold().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('bold') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Bold">
                    <BoldIcon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('italic') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Italic">
                    <ItalicIcon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('strike') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Strikethrough">
                    <StrikeIcon :size="16" />
                </button>

                <div class="w-px h-4 bg-border-color mx-1 shrink-0"></div>

                <!-- Headings -->
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('heading', { level: 1 }) }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Heading 1">
                    <Heading1Icon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('heading', { level: 2 }) }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Heading 2">
                    <Heading2Icon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('heading', { level: 3 }) }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Heading 3">
                    <Heading3Icon :size="16" />
                </button>

                <div class="w-px h-4 bg-border-color mx-1 shrink-0"></div>

                <!-- Lists & Blocks -->
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('bulletList') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Bullet List">
                    <ListIcon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('orderedList') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Ordered List">
                    <ListOrderedIcon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('blockquote') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Quote">
                    <QuoteIcon :size="16" />
                </button>
                <button type="button" @click="editor.chain().focus().setHorizontalRule().run()"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Horizontal Divider">
                    <MinusIcon :size="16" />
                </button>

                <div class="w-px h-4 bg-border-color mx-1 shrink-0"></div>

                <!-- Code & Link -->
                <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('codeBlock') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Code Block">
                    <CodeIcon :size="16" />
                </button>

                <!-- Language Selector -->
                <select v-if="editor.isActive('codeBlock')" @change="updateLanguage($event)"
                    class="ml-1 h-6 shrink-0 text-[0.65rem] bg-bg-primary border border-border-color rounded px-2 text-text-secondary focus:border-accent-primary outline-none">
                    <option value="auto">Auto</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="vue">Vue</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="python">Python</option>
                    <option value="bash">Bash</option>
                    <option value="json">JSON</option>
                </select>

                <button type="button" @click="toggleLinkMenu"
                    :class="{ 'bg-accent-primary/10 text-accent-primary': editor.isActive('link') }"
                    class="p-1.5 shrink-0 rounded hover:bg-white/5 text-text-tertiary transition-colors cursor-pointer"
                    title="Link (Ctrl+K)">
                    <LinkIcon :size="16" />
                </button>
            </div>

            <!-- Link Input Panel (WordPress Style) -->
            <div v-if="showLinkMenu"
                class="flex items-center gap-2 p-2 bg-bg-primary border-t border-border-color animate-fade-in-down">
                <input ref="linkInputRef" v-model="linkUrl" type="text" placeholder="Tempel atau ketik URL..."
                    class="flex-1 h-8 px-3 rounded-lg bg-bg-secondary border border-border-color text-xs text-text-primary focus:border-accent-primary outline-none"
                    @keydown.enter.prevent="applyLink" @keydown.esc="showLinkMenu = false" />
                <button type="button" @click="applyLink"
                    class="h-8 px-3 bg-accent-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                    <CheckIcon :size="14" />
                </button>
                <button type="button" @click="removeLink" v-if="editor.isActive('link')"
                    class="h-8 px-3 bg-red-500/10 text-red-500 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors"
                    title="Hapus Link">
                    <UnlinkIcon :size="14" />
                </button>
                <button type="button" @click="showLinkMenu = false"
                    class="h-8 px-3 text-text-tertiary hover:text-text-primary transition-colors">
                    <XIcon :size="14" />
                </button>
            </div>
        </div>

        <!-- Editor Content -->
        <editor-content :editor="editor"
            class="flex-1 overflow-y-auto prose prose-invert prose-emerald max-w-none p-6 outline-hidden custom-scrollbar" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import {
    Bold as BoldIcon, Italic as ItalicIcon, Strikethrough as StrikeIcon,
    Link as LinkIcon, Unlink as UnlinkIcon, Heading1 as Heading1Icon, Heading2 as Heading2Icon, Heading3 as Heading3Icon,
    List as ListIcon, ListOrdered as ListOrderedIcon, Code as CodeIcon,
    Quote as QuoteIcon, Minus as MinusIcon, Undo as UndoIcon, Redo as RedoIcon,
    Check as CheckIcon, X as XIcon
} from 'lucide-vue-next'
import { watch, ref, nextTick } from 'vue'

// Setup Lowlight for Syntax Highlighting
const lowlight = createLowlight(all)

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const showLinkMenu = ref(false)
const linkUrl = ref('')
const linkInputRef = ref<HTMLInputElement | null>(null)

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({
            codeBlock: false,
        }),
        CodeBlockLowlight.configure({
            lowlight,
        }),
        Placeholder.configure({
            placeholder: 'Mulai menulis cerita Anda...',
        }),
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                class: 'text-accent-primary underline cursor-pointer',
            },
        }),
    ],
    editorProps: {
        attributes: {
            class: 'focus:outline-none min-h-full',
        },
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())

        // Auto close link menu if selection changes and is no longer on a link
        if (!editor.isActive('link') && showLinkMenu.value && !linkUrl.value) {
            // optional: close menu logic if desired
        }
    },
})

watch(() => props.modelValue, (value) => {
    const isSame = editor.value?.getHTML() === value
    if (isSame) return
    editor.value?.commands.setContent(value, { emitUpdate: false })
})

const toggleLinkMenu = () => {
    if (!editor.value) return

    // Check if already active
    if (editor.value.isActive('link')) {
        linkUrl.value = editor.value.getAttributes('link').href
    } else {
        linkUrl.value = ''
    }

    showLinkMenu.value = !showLinkMenu.value

    if (showLinkMenu.value) {
        nextTick(() => {
            linkInputRef.value?.focus()
        })
    }
}

const applyLink = () => {
    if (!editor.value) return

    if (linkUrl.value === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
        editor.value.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.value }).run()
    }

    showLinkMenu.value = false
}

const removeLink = () => {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    showLinkMenu.value = false
}

const updateLanguage = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const language = target.value
    editor.value?.chain().focus().toggleCodeBlock({ language }).run()
}
</script>

<script lang="ts">
export default {
    name: 'TiptapEditor'
}
</script>

<style>
/* Tiptap Base */
.tiptap {
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    line-height: 1.7;
    font-size: 1rem;
    color: var(--text-secondary);
}

.tiptap:focus {
    outline: none;
}

/* Typhography Overrides */
.tiptap h1 {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 1.5em 0 0.5em;
    line-height: 1.1;
}

.tiptap h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 1.5em 0 0.5em;
    line-height: 1.2;
}

.tiptap h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 1.25em 0 0.5em;
    line-height: 1.3;
}

.tiptap ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
}

.tiptap ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1rem 0;
}

.tiptap li {
    margin-bottom: 0.25rem;
}

.tiptap blockquote {
    border-left: 4px solid var(--accent-primary);
    padding-left: 1.25rem;
    font-style: italic;
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
    margin: 1.5rem 0;
}

.tiptap hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 2rem 0;
}

/* Mobile Toolbar Optimizations */
.no-scrollbar-mobile {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.no-scrollbar-mobile::-webkit-scrollbar {
    display: none;
}

/* Syntax Highlighting (Atom One Dark theme equivalent) */
.tiptap pre {
    background: #1e1e1e;
    color: #abb2bf;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    overflow-x: auto;
}

.tiptap code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
}

.tiptap pre code {
    background: none;
    padding: 0;
    color: inherit;
    border-radius: 0;
}

/* Highlight.js Tokens */
.hljs-comment,
.hljs-quote {
    color: #5c6370;
    font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
    color: #c678dd;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
    color: #e06c75;
}

.hljs-literal {
    color: #56b6c2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
    color: #98c379;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
    color: #d19a66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
    color: #61aeee;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-strong {
    font-weight: bold;
}

.hljs-link {
    text-decoration: underline;
}

/* Link Styling */
.tiptap a {
    color: #3b82f6;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
}

.tiptap a:hover {
    color: #2563eb;
}
</style>
