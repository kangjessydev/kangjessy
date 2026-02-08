<template>
    <div class="richtext-editor border border-slate-100 rounded-[32px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all flex flex-col min-h-[600px] mb-20 relative"
        id="tiptap-editor-container">

        <!-- Toolbar - STICKY logic refined -->
        <!-- Logic: Normally stays at top of container. When scrolled, sticks at top-72px (below navbar) -->
        <div v-if="editor"
            class="toolbar flex flex-wrap items-center gap-1 p-3 bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-[72px] z-30 shadow-sm rounded-t-[32px] transition-all"
            id="editor-toolbar">
            <button @click="editor!!.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }" class="toolbar-btn" title="Bold (Ctrl+B)">
                <Bold :size="16" />
            </button>
            <button @click="editor!!.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }" class="toolbar-btn" title="Italic (Ctrl+I)">
                <Italic :size="16" />
            </button>
            <div class="w-px h-6 bg-slate-200 mx-1"></div>

            <button @click="editor!!.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="toolbar-btn"
                title="Heading 2">
                <Heading2 :size="16" />
            </button>
            <button @click="editor!!.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="toolbar-btn"
                title="Heading 3">
                <Heading3 :size="16" />
            </button>
            <div class="w-px h-6 bg-slate-200 mx-1"></div>

            <button @click="editor!!.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }" class="toolbar-btn" title="Bullet List">
                <List :size="16" />
            </button>
            <button @click="editor!!.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }" class="toolbar-btn" title="Ordered List">
                <ListOrdered :size="16" />
            </button>
            <div class="w-px h-6 bg-slate-200 mx-1"></div>

            <button @click="editor!!.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }" class="toolbar-btn" title="Blockquote">
                <Quote :size="16" />
            </button>

            <!-- Code Block Button -->
            <button @click="editor!!.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }" class="toolbar-btn" title="Code Block">
                <Code :size="16" />
            </button>

            <button @click="editor!!.chain().focus().toggleHighlight().run()"
                :class="{ 'is-active': editor.isActive('highlight') }" class="toolbar-btn" title="Highlight">
                <Highlighter :size="16" />
            </button>

            <div class="w-px h-6 bg-slate-200 mx-1 text-slate-100 flex items-center">|</div>
            <button @click.stop.prevent="addImage" class="toolbar-btn group/img" title="Insert Image">
                <ImageIcon :size="16" class="group-hover/img:scale-110 transition-transform" />
            </button>

            <!-- Link Editor Trigger -->
            <div class="relative link-editor-container">
                <button @click="toggleLinkUI" :class="{ 'is-active': editor.isActive('link') || showLinkUI }"
                    class="toolbar-btn" title="Insert Link">
                    <LinkIcon :size="16" />
                </button>

                <!-- Floating Link Editor (The Add/Edit UI for inputting URL) -->
                <transition enter-active-class="transition duration-200 ease-out"
                    enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100">
                    <div v-if="showLinkUI"
                        class="absolute left-0 top-full mt-2 w-80 p-4 bg-white rounded-3xl shadow-2xl border border-slate-100 z-[100] flex flex-col gap-3">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Connect
                                URL</label>
                            <div class="flex items-center gap-2">
                                <div class="flex-1 relative">
                                    <LinkIcon :size="12"
                                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <input v-model="linkUrl" type="url" placeholder="https://example.com"
                                        class="w-full bg-slate-50 border-none rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none placeholder:text-slate-300 transition-all font-mono"
                                        @keydown.enter="applyLink" autofocus />
                                </div>
                                <button @click="applyLink"
                                    class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                                    <Check :size="18" />
                                </button>
                                <button @click="showLinkUI = false"
                                    class="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-all active:scale-95">
                                    <X :size="18" />
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <!-- Editor Surface -->
        <div class="flex-1 cursor-text relative group/editor" @click="focusEditor">
            <EditorContent :editor="editor" class="prose prose-slate max-w-none p-10 outline-none" />

            <!-- LINK PREVIEW BUBBLE (Appear on Link Click) -->
            <transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="scale-95 opacity-0 translate-y-2"
                enter-to-class="scale-100 opacity-100 translate-y-0">
                <div v-if="showLinkPreview && linkPreviewData"
                    class="fixed z-150 bg-[#1B2559]/95 backdrop-blur-xl text-white px-5 py-4 rounded-[24px] shadow-2xl border border-white/10 flex flex-col gap-3 min-w-[280px]"
                    :style="{ left: linkPreviewPosition.x + 'px', top: linkPreviewPosition.y + 'px' }" @mousedown.stop>
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex flex-col flex-1 overflow-hidden">
                            <span
                                class="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300/60 mb-1.5">Link
                                Target</span>
                            <a :href="linkPreviewData" target="_blank" @click.stop
                                class="text-[13px] font-extrabold text-white truncate hover:text-indigo-300 transition-colors flex items-center gap-2 group/url font-mono lowercase">
                                {{ linkPreviewData }}
                                <ExternalLink :size="12"
                                    class="group-hover/url:translate-x-0.5 group-hover/url:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                        <div class="flex items-center gap-1 shrink-0">
                            <button @click="editCurrentLink"
                                class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all active:scale-90"
                                title="Edit Link">
                                <Edit3 :size="14" />
                            </button>
                            <button @click="removeLink"
                                class="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all active:scale-90"
                                title="Remove Link">
                                <X :size="14" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-xl border border-white/5">
                        <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <p class="text-[10px] font-bold text-slate-400">Ctrl + Click link in editor to visit directly
                        </p>
                    </div>
                </div>
            </transition>

            <!-- CODE BLOCK LANGUAGE SELECTOR (Floating Top-Right Inside Code Block) -->
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100">
                <div v-if="activeCodeBlockEl && editor?.isActive('codeBlock')"
                    class="fixed z-150 bg-[#1B2559]/90 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden flex items-center"
                    :style="codeMenuPosition">
                    <select :value="currentCodeLanguage"
                        @change="e => updateCodeLanguage((e.target as HTMLSelectElement).value)"
                        class="bg-transparent border-none py-1.5 pl-3 pr-8 text-[10px] font-black uppercase tracking-widest text-indigo-200 focus:ring-0 cursor-pointer appearance-none outline-none">
                        <option v-for="lang in codeLanguages" :key="lang.value" :value="lang.value"
                            class="bg-[#1B2559] text-white">
                            {{ lang.label }}
                        </option>
                    </select>
                    <ChevronDown :size="10"
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400/50 pointer-events-none" />
                </div>
            </transition>
        </div>

        <div v-if="!editor" class="flex-1 flex items-center justify-center p-20">
            <div class="flex flex-col items-center gap-4">
                <div class="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-300">Initializing
                    Workspace...</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted, computed } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import {
    Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Code, Highlighter,
    Image as ImageIcon, Link as LinkIcon, Check, X, ExternalLink, Edit3, ChevronDown
} from 'lucide-vue-next'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue', 'trigger-media-modal'])

const showLinkUI = ref(false)
const linkUrl = ref('')
const showLinkPreview = ref(false)
const linkPreviewData = ref('')
const linkPreviewPosition = ref({ x: 0, y: 0 })

// Code Block state
const activeCodeBlockEl = ref<HTMLElement | null>(null)
const codeMenuPosition = ref({ top: '0px', left: '0px' })

// Code languages
const codeLanguages = [
    { label: 'Auto Detect', value: 'plaintext' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Python', value: 'python' },
    { label: 'PHP', value: 'php' },
    { label: 'JSON', value: 'json' },
    { label: 'Bash', value: 'bash' },
    { label: 'SQL', value: 'sql' },
]

const currentCodeLanguage = computed(() => {
    return editor.value?.getAttributes('codeBlock').language || 'plaintext'
})

const lowlight = createLowlight(common)

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({
            codeBlock: false,
        }),
        CodeBlockLowlight.configure({
            lowlight,
            HTMLAttributes: {
                class: 'code-block-fancy',
            },
        }),
        Link.configure({
            openOnClick: false, // EXPLICITLY FALSE
            HTMLAttributes: {
                class: 'editor-link-ui',
            },
        }),
        Image.configure({
            HTMLAttributes: {
                class: 'rounded-[40px] shadow-2xl border-8 border-white my-12 mx-auto block max-w-full hover:scale-[1.02] transition-transform duration-500',
            },
        }),
        Highlight.configure({
            HTMLAttributes: {
                class: 'bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-lg font-bold',
            },
        }),
        Typography,
        Placeholder.configure({
            placeholder: 'Start building your masterpiece here...',
        }),
    ],
    editorProps: {
        attributes: {
            class: 'outline-none min-h-[500px] focus:outline-none',
        },
        handleDOMEvents: {
            click: (_view, event) => {
                const target = event.target as HTMLElement
                const link = target.closest('a')

                if (link && target.closest('.ProseMirror')) {
                    // Check if clicked inside our own preview bubble
                    if (target.closest('.fixed.z-\\[150\\]')) return false

                    // CTRL + Click = let browser open it
                    if (event.ctrlKey || event.metaKey) {
                        return false
                    }

                    // NORMAL CLICK = INTERCEPT
                    event.preventDefault()
                    event.stopPropagation()
                    event.stopImmediatePropagation()

                    const rect = link.getBoundingClientRect()
                    linkPreviewData.value = link.href

                    linkPreviewPosition.value = {
                        x: Math.min(rect.left, window.innerWidth - 300),
                        y: rect.top - 120
                    }
                    showLinkPreview.value = true
                    return true
                }

                // Close preview if clicking elsewhere
                if (!target.closest('.editor-link-ui') && !target.closest('.fixed.z-\\[150\\]')) {
                    showLinkPreview.value = false
                }

                return false
            }
        }
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
    onSelectionUpdate: ({ editor }) => {
        const { view, state } = editor
        const { from } = state.selection

        if (editor.isActive('codeBlock')) {
            const dom = view.domAtPos(from).node as HTMLElement
            const pre = dom.closest('.code-block-fancy')
            if (pre) {
                activeCodeBlockEl.value = pre as HTMLElement
                updateCodeMenuPos()
            }
        } else {
            activeCodeBlockEl.value = null
        }
    }
})

const updateCodeMenuPos = () => {
    if (activeCodeBlockEl.value) {
        const rect = activeCodeBlockEl.value.getBoundingClientRect()
        codeMenuPosition.value = {
            top: `${rect.top + 16}px`,
            left: `${rect.right - 160}px`
        }
    }
}

// Focus editor function
const focusEditor = () => {
    editor.value?.commands.focus()
}

// Global click handler for closing stuff
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.richtext-editor') && !target.closest('.fixed')) {
        showLinkPreview.value = false
        activeCodeBlockEl.value = null
        showLinkUI.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', updatePositions)
    window.addEventListener('resize', updatePositions)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', updatePositions)
    window.removeEventListener('resize', updatePositions)
    editor.value?.destroy()
})

const updatePositions = () => {
    if (showLinkPreview.value) {
        const activeLink = document.querySelector('a.editor-link-ui[href="' + linkPreviewData.value + '"]')
        if (activeLink) {
            const rect = activeLink.getBoundingClientRect()
            linkPreviewPosition.value = { x: Math.min(rect.left, window.innerWidth - 300), y: rect.top - 120 }
        }
    }
    if (activeCodeBlockEl.value) {
        updateCodeMenuPos()
    }
}

// Sync external changes
watch(() => props.modelValue, (value) => {
    const isSame = editor.value?.getHTML() === value
    if (isSame) return
    editor.value?.commands.setContent(value, { emitUpdate: false })
})

const updateCodeLanguage = (language: string) => {
    editor.value?.chain().focus().updateAttributes('codeBlock', { language }).run()
}



// ... (code omitted)

const addImage = () => {
    emit('trigger-media-modal')
}

const insertImage = (imageData: { src: string, alt?: string } | string) => {
    if (editor.value) {
        const src = typeof imageData === 'string' ? imageData : imageData.src
        const alt = typeof imageData === 'string' ? '' : (imageData.alt || '')
        editor.value.chain().focus().setImage({ src, alt }).run()
    }
}

defineExpose({
    insertImage
})

const toggleLinkUI = () => {
    if (showLinkUI.value) {
        showLinkUI.value = false
        return
    }

    const previousUrl = editor.value?.getAttributes('link').href
    linkUrl.value = previousUrl || ''
    showLinkUI.value = true

    setTimeout(() => {
        const input = document.querySelector('input[type="url"]') as HTMLInputElement
        if (input) input.focus()
    }, 50)
}

const editCurrentLink = () => {
    linkUrl.value = linkPreviewData.value
    showLinkPreview.value = false
    showLinkUI.value = true
}

const applyLink = () => {
    if (linkUrl.value === '') {
        removeLink()
        return
    }

    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl.value }).run()
    showLinkUI.value = false
    linkUrl.value = ''
}

const removeLink = () => {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    showLinkUI.value = false
    showLinkPreview.value = false
    linkUrl.value = ''
}
</script>

<style scoped>
.toolbar-btn {
    @apply w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#702DFF] hover:bg-slate-50 transition-all active:scale-90;
}

.toolbar-btn.is-active {
    @apply text-[#702DFF] bg-indigo-50/50 shadow-inner;
}

:deep(.ProseMirror) {
    @apply outline-none text-slate-700 leading-relaxed font-medium;
}

:deep(.ProseMirror p) {
    @apply mb-6 text-[15px] leading-relaxed text-slate-800;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
    @apply text-slate-200 content-[attr(data-placeholder)] float-left h-0 pointer-events-none italic font-normal;
}

:deep(.ProseMirror blockquote) {
    @apply border-l-[6px] border-[#702DFF] pl-8 py-4 italic text-slate-700 bg-slate-50/50 rounded-r-[32px] my-10 relative overflow-hidden;
}

:deep(.ProseMirror blockquote)::after {
    content: '"';
    @apply absolute -top-4 -left-2 text-[120px] text-indigo-500/5 font-serif select-none;
}

:deep(.ProseMirror h2) {
    @apply text-3xl font-black text-[#1B2559] mt-12 mb-6 tracking-tight leading-tight;
}

:deep(.ProseMirror h3) {
    @apply text-xl font-bold text-[#1B2559] mt-10 mb-5 tracking-tight leading-tight;
}

:deep(.ProseMirror ul) {
    @apply list-disc list-outside ml-8 space-y-3 my-8;
}

:deep(.ProseMirror ol) {
    @apply list-decimal list-outside ml-8 space-y-3 my-8;
}

:deep(.ProseMirror li) {
    @apply pl-4 text-slate-800;
}

/* PREMIUM Link Styles */
:deep(.editor-link-ui) {
    @apply text-[#702DFF] font-black underline decoration-indigo-200 underline-offset-[6px] hover:text-indigo-800 transition-all cursor-pointer hover:decoration-indigo-500;
}

/* PREMIUM Code Block */
:deep(.code-block-fancy) {
    @apply bg-[#0F172A] text-slate-300 rounded-[32px] my-10 border border-slate-800 shadow-2xl relative shadow-indigo-900/10;
}

:deep(.code-block-fancy code) {
    @apply block p-10 pt-16 overflow-x-auto font-mono text-[13px] leading-relaxed;
}

/* Syntax Highlighting */
:deep(.hljs-comment) {
    @apply text-slate-500 italic;
}

:deep(.hljs-keyword) {
    @apply text-indigo-400 font-black;
}

:deep(.hljs-string) {
    @apply text-emerald-400;
}

:deep(.hljs-title) {
    @apply text-sky-400 font-bold;
}

:deep(.hljs-variable) {
    @apply text-orange-400;
}

:deep(.hljs-number) {
    @apply text-amber-500;
}

:deep(.hljs-attr) {
    @apply text-blue-300;
}
</style>
