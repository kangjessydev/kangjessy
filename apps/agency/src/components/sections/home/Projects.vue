<template>
  <section id="projects" class="bg-bg-primary py-32">
    <div class="container mx-auto px-4">
      <SectionHeader
        title="Featured Projects"
        subtitle="A selection of my best work and technical solutions"
      >
        <template #title>
          Featured
          <span
            class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
            >Projects</span
          >
        </template>
      </SectionHeader>

      <!-- Category Filters -->
      <div class="flex mb-12 -mx-4 px-4 md:mx-0 md:px-0">
        <nav
          class="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-3 pb-4 w-full"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-6 py-2.5 rounded-full border text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shrink-0 whitespace-nowrap"
            :class="
              activeFilter === cat
                ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]'
                : 'bg-bg-secondary/50 border-border-color text-text-secondary hover:border-accent-primary/30 hover:text-text-primary hover:bg-bg-secondary'
            "
            @click="activeFilter = cat"
          >
            {{ cat }}
          </button>
        </nav>
      </div>

      <div class="min-h-[400px]">
        <TransitionGroup
          name="project-list"
          tag="div"
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <ProjectCard
            v-for="project in displayedProjects"
            :key="project._id"
            :project="project"
            @click="navigateToProject(project.slug.current)"
            @filter-stack="
              $router.push({ path: '/projects', query: { stack: $event } })
            "
          />
        </TransitionGroup>
      </div>

      <div
        class="mt-16 text-center"
        v-if="filteredProjects.length > 6 || activeFilter !== 'All'"
      >
        <BaseButton
          to="/projects"
          variant="secondary"
          size="md"
          class="flex items-center gap-3"
        >
          <span>Browse All Portfolio</span>
          <ArrowRightIcon :size="16" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { sanityClient } from "@kangjessy/database";
import { projectsData } from "../../../data/landing/projects";
import ProjectCard from "../portfolio/ProjectCard.vue";
import { ArrowRight as ArrowRightIcon } from "lucide-vue-next";
import SectionHeader from "../../ui/SectionHeader.vue";
import { BaseButton } from "@kangjessy/ui";

const router = useRouter();
const projects = ref<any[]>([]);
const loading = ref(true);
const activeFilter = ref("All");

// TOGGLE: Set to true to use local data (projects.ts), false for Sanity
const ENABLE_LOCAL_DATA = false;

const categories = computed(() => {
  const cats = ["All"];
  projects.value.forEach((p) => {
    const catName =
      typeof p.category === "object" ? p.category?.title : p.category;
    if (catName && !cats.includes(catName)) cats.push(catName);
  });
  return cats;
});

const filteredProjects = computed(() => {
  if (activeFilter.value === "All") return projects.value;
  return projects.value.filter((p) => {
    const catName =
      typeof p.category === "object" ? p.category?.title : p.category;
    return catName === activeFilter.value;
  });
});

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, 6);
});

const navigateToProject = (slug: string) => {
  if (slug) router.push(`/project/${slug}`);
};

onMounted(async () => {
  try {
    if (ENABLE_LOCAL_DATA) {
      projects.value = projectsData
        .filter((p) => p.status !== "IDEA")
        .map((p) => ({
          _id: String(p.id),
          title: p.title,
          slug: { current: p.slug || "" },
          category: p.category,
          tags: p.tags,
          description: p.description,
          localIcon: p.icon,
          localColor: p.color,
          date: p.date,
        }));
    } else {
      // Using a more optimized query for Home showcase
      const query = `*[_type == "project" && status != "IDEA"] | order(completionDate desc, _createdAt desc)[0...12]{
                _id,
                title,
                slug,
                excerpt,
                description,
                "image": mainImage.asset->url,
                "client": clientName,
                "category": coalesce(category->title, category),
                status,
                date,
                "technologies": technologies[]->title
            }`;

      const sanityProjects = await sanityClient.fetch(query);

      if (sanityProjects && sanityProjects.length) {
        projects.value = sanityProjects;
      } else {
        // Fallback to local if sanity is empty
        projects.value = (projectsData as any[]).map((p) => ({
          ...p,
          _id: String(p.id),
          slug: { current: p.slug },
          image: p.image,
          client: p.client || "Personal",
          localIcon: p.icon,
          localColor: p.color,
        }));
      }
    }
  } catch (e) {
    console.error(
      "Error fetching projects from Sanity, falling back to local data",
      e,
    );
    projects.value = (projectsData as any[]).map((p) => ({
      ...p,
      _id: String(p.id),
      slug: { current: p.slug },
      image: p.image,
      client: p.client || "Personal",
      localIcon: p.icon,
      localColor: p.color,
    }));
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
