<template>
  <div class="rich-editor rounded-2xl border border-border-color overflow-hidden bg-bg-secondary focus-within:border-accent-primary transition-all">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 border-b border-border-color bg-bg-primary/50 backdrop-blur-sm sticky top-0 z-10">
      <button 
        @click="editor.chain().focus().toggleBold().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('bold') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Bold">
        <Bold :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleItalic().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('italic') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Italic">
        <Italic :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleUnderline().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('underline') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Underline">
        <UnderlineIcon :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleStrike().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('strike') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Strike">
        <Strikethrough :size="16" />
      </button>
      
      <div class="w-px h-4 bg-border-color mx-1"></div>

      <button 
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('heading', { level: 2 }) }"
        class="px-2 py-1.5 rounded-lg hover:bg-bg-secondary transition-colors text-[10px] font-black" title="Heading 2">
        H2
      </button>
      <button 
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('heading', { level: 3 }) }"
        class="px-2 py-1.5 rounded-lg hover:bg-bg-secondary transition-colors text-[10px] font-black" title="Heading 3">
        H3
      </button>

      <div class="w-px h-4 bg-border-color mx-1"></div>

      <button 
        @click="editor.chain().focus().toggleBulletList().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('bulletList') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Bullet List">
        <List :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleOrderedList().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('orderedList') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Ordered List">
        <ListOrdered :size="16" />
      </button>

      <div class="w-px h-4 bg-border-color mx-1"></div>

      <button 
        @click="editor.chain().focus().toggleCode().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('code') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Code">
        <Code :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleCodeBlock().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('codeBlock') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Code Block">
        <Terminal :size="16" />
      </button>
      <button 
        @click="setLink" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('link') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Link">
        <LinkIcon :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().toggleBlockquote().run()" 
        :class="{ 'bg-accent-primary/20 text-accent-primary': editor.isActive('blockquote') }"
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Quote">
        <Quote :size="16" />
      </button>

      <div class="w-px h-4 bg-border-color mx-1"></div>

      <button 
        @click="editor.chain().focus().undo().run()" 
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Undo">
        <Undo :size="16" />
      </button>
      <button 
        @click="editor.chain().focus().redo().run()" 
        class="p-2 rounded-lg hover:bg-bg-secondary transition-colors" title="Redo">
        <Redo :size="16" />
      </button>
    </div>

    <!-- Editor Content -->
    <EditorContent :editor="editor" class="p-6 min-h-[300px] prose prose-invert prose-sm max-w-none focus:outline-none" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, Underline as UnderlineIcon,
  Quote, Undo, Redo, Code, Terminal, Link as LinkIcon 
} from 'lucide-vue-next';
import { watch, onBeforeUnmount } from 'vue';

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit.configure({
        heading: {
            levels: [2, 3],
        },
    }),
    Underline,
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'text-accent-primary underline cursor-pointer',
        },
    }),
    Placeholder.configure({
      placeholder: props.placeholder || 'Mulai menulis...',
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
});

const setLink = () => {
    const previousUrl = editor.value?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
    }

    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
};

// Sync external changes to editor
watch(() => props.modelValue, (newValue) => {
  const isSame = editor.value?.getHTML() === newValue;
  if (!isSame) {
    editor.value?.commands.setContent(newValue || '', { emitUpdate: false });
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
:deep(.tiptap) {
  min-height: 250px;
  outline: none !important;
}

:deep(.tiptap p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.rich-editor:focus-within {
    box-shadow: 0 0 0 4px rgba(var(--accent-primary-rgb), 0.05);
}

:deep(.tiptap h2) {
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

:deep(.tiptap h3) {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
}

:deep(.tiptap blockquote) {
    border-left: 3px solid var(--accent-primary);
    padding-left: 1.5rem;
    font-style: italic;
    color: var(--text-secondary);
    margin: 1.5rem 0;
}
</style>
