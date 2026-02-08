<template>
  <div
    class="group flex flex-col gap-5 cursor-pointer"
    role="button"
    tabindex="0"
    :aria-label="`View details for project: ${project.title}`"
    @click="$emit('click', project)"
    @keydown.enter="$emit('click', project)"
    @keydown.space.prevent="$emit('click', project)"
  >
    <!-- Image Container (Showcase) -->
    <div
      class="relative w-full aspect-4/3 rounded-[24px] overflow-hidden border border-white/5 bg-bg-secondary"
    >
      <!-- Main Image -->
      <template v-if="project.image">
        <img
          :src="getImageUrl(project.image)"
          :alt="project.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width="600"
          height="450"
          loading="lazy"
        />
      </template>

      <!-- Fallback Icon/Gradient -->
      <template v-else-if="project.localIcon || project.icon">
        <div
          class="w-full h-full flex items-center justify-center bg-linear-to-br from-bg-secondary to-bg-tertiary group-hover:scale-105 transition-transform duration-700"
          :style="{ background: project.localColor || project.color }"
        >
          <div
            class="w-20 h-20 text-white drop-shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity"
          >
            <component
              :is="getIconComponent(project.localIcon || project.icon)"
              :size="80"
              stroke-width="1.5"
            />
          </div>
        </div>
      </template>

      <!-- Default Fallback -->
      <template v-else>
        <div
          class="w-full h-full flex items-center justify-center bg-bg-tertiary/30"
        >
          <FolderIcon :size="48" class="text-text-tertiary opacity-30" />
        </div>
      </template>

      <!-- Overlay & Badges -->
      <div
        class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"
      ></div>

      <!-- Status Badge (Top Right) -->
      <div
        v-if="project.status === 'IDEA'"
        class="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-accent-primary z-20 flex items-center gap-1.5 shadow-lg"
      >
        <span
          class="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"
        ></span>
        Concept
      </div>

      <!-- Category Badge (Top Left) -->
      <div
        v-if="project.category"
        class="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/90 z-20 shadow-lg"
      >
        {{ project.category }}
      </div>
    </div>

    <!-- Content Info -->
    <div class="flex flex-col gap-3 px-1">
      <div class="flex justify-between items-start gap-4">
        <div class="space-y-1">
          <h3
            class="text-xl font-bold text-text-primary leading-tight group-hover:text-accent-primary transition-colors duration-300"
          >
            {{ project.title }}
          </h3>
          <div
            class="text-xs font-bold text-text-tertiary uppercase tracking-wider flex items-center gap-2"
          >
            <span>{{ project.client || "Personal" }}</span>
            <span class="w-1 h-1 rounded-full bg-text-tertiary/30"></span>
            <span>{{ project.date }}</span>
          </div>
        </div>
        <div
          class="w-10 h-10 rounded-full border border-white/5 bg-bg-secondary flex items-center justify-center text-text-primary group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary transition-all duration-300 shrink-0"
        >
          <ArrowUpRightIcon
            :size="20"
            class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </div>
      </div>

      <!-- Description (Desktop) -->
      <p
        class="text-sm text-text-secondary leading-relaxed line-clamp-2 md:line-clamp-4 hidden md:block"
        :title="project.excerpt || project.description"
      >
        {{ project.excerpt || project.description }}
      </p>

      <!-- Tech Stack (Scrollable/Wrap) -->
      <div class="flex flex-wrap gap-2 mt-1">
        <span
          v-for="tag in (project.tags || project.technologies || []).slice(
            0,
            3,
          )"
          :key="tag"
          class="text-[10px] px-3 py-1 rounded-full bg-bg-secondary border border-white/5 text-text-secondary font-bold hover:text-white hover:border-white/20 transition-colors cursor-default"
        >
          {{ tag }}
        </span>
        <span
          v-if="(project.tags || project.technologies || []).length > 3"
          class="text-[10px] px-2 py-1 text-text-tertiary font-bold"
        >
          +{{ (project.tags || project.technologies || []).length - 3 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProjectCard",
};
</script>

<script setup lang="ts">
import {
  Folder as FolderIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Globe,
  ShieldCheck,
  ShoppingBag,
  BarChart3,
  Building2,
  Monitor,
  MessageCircle,
  UserCheck,
  ShoppingCart,
  BookOpen,
  ShieldAlert,
  Leaf,
  Boxes,
  Cpu,
  MapPinned,
  Hotel,
} from "lucide-vue-next";
import { urlFor } from "@kangjessy/database";

interface Project {
  _id: string;
  title: string;
  description: string;
  excerpt?: string;
  category: string;
  date: string;
  client?: string;
  image?: any;
  technologies?: string[];
  tags?: string[];
  localIcon?: string;
  icon?: string;
  localColor?: string;
  color?: string;
  slug: { current: string };
  status?: string;
}

defineProps<{
  project: Project;
  customClass?: string;
}>();

defineEmits(["click", "filter-stack"]);

const getImageUrl = (source: any) => {
  if (typeof source === "string") return source;
  try {
    return urlFor(source).url();
  } catch (e) {
    return "";
  }
};

const getIconComponent = (name: string | undefined) => {
  if (!name) return FolderIcon;
  const icons: Record<string, any> = {
    Globe,
    ShieldCheck,
    ShoppingBag,
    BarChart3,
    Building2,
    Monitor,
    MessageCircle,
    UserCheck,
    ShoppingCart,
    BookOpen,
    Hotel,
    ShieldAlert,
    Leaf,
    Boxes,
    Cpu,
    MapPinned,
  };
  return icons[name] || FolderIcon;
};
</script>
