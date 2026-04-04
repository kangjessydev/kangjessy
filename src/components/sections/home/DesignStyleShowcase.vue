<template>
  <section id="styles" class="bg-bg-primary py-32">
    <div class="container mx-auto px-4">
      <SectionHeader
        badge="Design Showreel"
        title="Pilih Style Website Anda"
        subtitle="Berikut adalah beberapa arah visual yang bisa kami eksekusi untuk bisnis Anda. Klik untuk melihat demo atau pelajari detailnya."
      >
        <template #title>
          Design
          <span
            class="bg-linear-to-r from-text-primary to-text-secondary bg-clip-text text-transparent"
            >Showreel</span
          >
        </template>
      </SectionHeader>

      <div class="min-h-[400px] mt-12">
        <TransitionGroup
          name="project-list"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <ProjectCard
            v-for="project in displayedProjects"
            :key="project._id"
            :project="project"
            @click="navigateToProject(project.slug.current)"
          />
        </TransitionGroup>
      </div>

      <div class="mt-16 text-center">
        <BaseButton
          to="/projects"
          variant="secondary"
          size="md"
          class="flex items-center gap-3"
        >
          <span>Lihat Seluruh Portfolio Teknis</span>
          <ArrowRightIcon :size="16" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { portfolioService } from "../../../services/portfolioService";
import ProjectCard from "../portfolio/ProjectCard.vue";
import { ArrowRight as ArrowRightIcon } from "lucide-vue-next";
import SectionHeader from "../../ui/SectionHeader.vue";
import { BaseButton } from "@kangjessy/ui";

const router = useRouter();
const projects = ref<any[]>([]);
const loading = ref(true);

const displayedProjects = computed(() => {
  return projects.value.filter(p => p.status === 'SHOWCASE');
});

const navigateToProject = (slug: string) => {
  if (slug) router.push(`/project/${slug}`);
};

onMounted(async () => {
  try {
    const allProjects = await portfolioService.getProjects();
    
    projects.value = allProjects.map((p: any) => ({
      ...p,
      _id: String(p._id || p.id),
      slug: typeof p.slug === "string" ? { current: p.slug } : p.slug,
      technologies: p.technologies || p.tags || [],
    }));
  } catch (e) {
    console.error("Error loading showcase data", e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.project-list-move {
  transition: transform 0.5s ease;
}

.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.4s ease;
}

.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
