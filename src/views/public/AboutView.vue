<template>
    <div class="bg-bg-primary min-h-screen pt-28 pb-32">
        <div class="container max-w-5xl px-6 md:px-8">
            <!-- Professional Clean Hero -->
            <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
                <div class="lg:w-1/3 flex justify-center lg:justify-start">
                    <div class="relative group">
                        <div class="absolute inset-0 bg-accent-primary/5 rounded-[48px] rotate-6 group-hover:rotate-3 transition-transform duration-700"></div>
                        <!-- Ganti src di bawah ini dengan foto asli saat sudah siap -->
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessy" alt="Foto Jessy"
                            class="relative z-10 w-48 h-48 md:w-60 md:h-60 rounded-[40px] bg-bg-secondary border border-border-color shadow-sm object-cover" />
                    </div>
                </div>

                <div class="lg:w-2/3 space-y-6 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/5 border border-accent-primary/10 rounded-full">
                        <span class="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                        <span class="text-[10px] font-bold text-accent-primary uppercase tracking-[0.2em]">Currently Available</span>
                    </div>
                    <h1 class="text-3xl md:text-5xl font-bold text-text-primary tracking-tight leading-[1.2]">
                        Saya Jessy — Developer
                        <br class="hidden md:block" />
                        <span class="text-text-tertiary">yang bantu bisnis tumbuh.</span>
                    </h1>
                    <p class="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl font-medium">
                        {{ introData.description }}
                    </p>
                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                        <BaseButton to="/order" variant="primary" size="lg" class="rounded-2xl px-10">Start Collaboration</BaseButton>
                        <div class="flex items-center gap-3">
                            <a v-for="social in socialLinks" :key="social.url" :href="social.url"
                                class="w-11 h-11 flex items-center justify-center bg-bg-secondary border border-border-color rounded-xl text-text-tertiary hover:text-accent-primary transition-colors">
                                <component :is="social.icon" :size="18" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Focus Areas (Lightweight Layout) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 border-t border-border-color/50 pt-16">
                 <div v-for="as in adaptiveSkills.slice(0, 3)" :key="as.title" class="space-y-3">
                    <h3 class="text-xs font-bold text-accent-primary uppercase tracking-widest">{{ as.title }}</h3>
                    <p class="text-text-secondary text-sm leading-relaxed font-medium">{{ as.description }}</p>
                 </div>
            </div>

            <!-- Narrative Breakdown (Human Storytelling) -->
            <div class="flex flex-col lg:flex-row gap-16 md:gap-24 mb-40 items-start">
                 <div class="lg:w-1/2 space-y-8">
                     <h2 class="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">The Journey So Far</h2>
                     <p class="text-lg text-text-secondary leading-relaxed font-medium opacity-90" v-html="introData.journey[2]"></p>
                     
                     <div class="grid grid-cols-2 gap-8 pt-8 border-t border-border-color/50">
                        <div>
                            <span class="block text-2xl font-bold text-text-primary mb-1">2018</span>
                            <span class="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Year Started</span>
                        </div>
                        <div>
                            <span class="block text-2xl font-bold text-text-primary mb-1">100+</span>
                            <span class="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">Clients Helped</span>
                        </div>
                     </div>
                 </div>

                 <div class="lg:w-1/2 space-y-10">
                     <div v-for="(p, i) in introData.journey.slice(0, 2)" :key="i" 
                        class="text-text-secondary leading-loose text-base font-medium opacity-80"
                        v-html="p">
                     </div>
                 </div>
            </div>

            <!-- Timeline & Experience (Clean Horizontal) -->
            <div class="mb-40">
                <div class="flex items-center gap-4 mb-12">
                    <h2 class="text-xs font-bold text-text-tertiary uppercase tracking-[0.3em]">Professional History</h2>
                    <div class="h-px flex-1 bg-border-color/30"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="exp in experienceData" :key="exp.year" class="p-8 bg-bg-secondary/40 border border-border-color rounded-3xl space-y-3 hover:bg-bg-secondary transition-colors">
                        <span class="text-[10px] font-bold text-accent-primary uppercase tracking-widest">{{ exp.year }}</span>
                        <h4 class="text-lg font-bold text-text-primary">{{ exp.role }}</h4>
                        <p class="text-[9px] font-bold text-text-tertiary uppercase tracking-widest pb-3 border-b border-border-color/30">{{ exp.company }}</p>
                        <p class="text-sm text-text-secondary leading-relaxed opacity-80 font-medium">{{ exp.description }}</p>
                    </div>
                </div>
            </div>

            <!-- Lightweight Project Archive -->
            <div class="mb-40">
                <div class="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold text-text-primary tracking-tight">Project Archive</h2>
                        <p class="text-xs text-text-tertiary font-medium">Tracking major developments and case studies.</p>
                    </div>
                    <div class="flex gap-3">
                        <select v-model="selectedYear" class="bg-bg-secondary border border-border-color rounded-xl px-4 py-2 text-[11px] font-bold text-text-primary outline-none focus:border-accent-primary transition-all">
                            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                        </select>
                        <select v-model="selectedTech" class="bg-bg-secondary border border-border-color rounded-xl px-4 py-2 text-[11px] font-bold text-text-primary outline-none focus:border-accent-primary transition-all">
                            <option v-for="tech in technologies" :key="tech" :value="tech">{{ tech }}</option>
                        </select>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr class="text-[9px] font-bold uppercase tracking-widest text-text-tertiary px-4">
                                <th class="pb-4 pl-6">Year</th>
                                <th class="pb-4">Project Title</th>
                                <th class="pb-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in paginatedProjects" :key="project.id" class="group bg-bg-secondary/30 hover:bg-bg-secondary transition-all">
                                <td class="py-5 pl-6 rounded-l-2xl text-[11px] font-mono text-text-tertiary">{{ project.date }}</td>
                                <td class="py-5">
                                    <span class="block font-bold text-text-primary text-sm mb-0.5">{{ project.title }}</span>
                                    <span class="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">{{ project.category }}</span>
                                </td>
                                <td class="py-5 pr-6 rounded-r-2xl text-right">
                                    <router-link :to="'/project/' + project.slug" class="inline-flex items-center gap-2 text-[10px] font-bold text-accent-primary opacity-0 group-hover:opacity-100 transition-all">
                                        CASE STUDY <ArrowUpRight :size="14" />
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Simple Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
                     <button v-for="page in totalPages" :key="page" 
                        class="w-10 h-10 rounded-xl border border-border-color text-[11px] font-bold transition-all"
                        :class="page === currentPage ? 'bg-text-primary text-bg-primary border-text-primary' : 'text-text-tertiary hover:border-accent-primary'"
                        @click="currentPage = page">{{ page }}</button>
                </div>
            </div>

            <!-- Soft Call to Action -->
            <div class="text-center py-20 bg-bg-secondary/40 border border-border-color rounded-[48px] px-8 relative overflow-hidden group">
                <div class="relative z-10">
                    <h2 class="text-2xl md:text-3xl font-bold text-text-primary mb-3 tracking-tight">Ready to start something new?</h2>
                    <p class="text-text-secondary max-w-lg mx-auto mb-10 text-sm md:text-base font-medium opacity-80">
                        Let's focus on building a robust solution that solves your real business challenges. No fluff, just scalable code.
                    </p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <BaseButton to="/order" variant="primary" size="lg" class="rounded-2xl px-12">Get in Touch</BaseButton>
                        <BaseButton to="/services" variant="secondary" size="lg" class="rounded-2xl px-12">Explore Services</BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {
    Github, Instagram, Linkedin,
    ArrowUpRight, Mail, MapPin,
    Briefcase, Award, GraduationCap, Code2,
    Rocket, Building2, Zap, Database, Monitor
} from 'lucide-vue-next';

// Data Imports
import { projectsData } from '../../data/landing/projects';
import { adaptiveSkills } from '../../data/landing/skills';
import { experienceData } from '../../data/landing/experience';
import { siteConfig } from '../../data/config/siteConfig';
import { introData } from '../../data/landing/about';

// UI Components
import { BaseButton } from "@kangjessy/ui";
import { useSEO } from '../../composables/useSEO';

// SEO Setup
useSEO({
    title: 'About KangJessy | Profile & Capabilities',
    description: 'Pelajari lebih lanjut tentang KangJessy, Fullstack Developer yang fokus pada solusi bisnis otomatis dan scalable.',
    url: '/about'
});

// Filter Logic
const selectedYear = ref('All');
const selectedTech = ref('All');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const getYear = (date: string) => {
    const parts = date.split(' ');
    return parts[parts.length - 1];
};

const years = computed(() => {
    const uniqueYears = new Set(projectsData.map(p => getYear(p.date)));
    return ['All', ...(Array.from(uniqueYears).filter(Boolean) as string[]).sort((a, b) => b.localeCompare(a))];
});

const technologies = computed(() => {
    const uniqueTechs = new Set(projectsData.flatMap(p => p.tags));
    return ['All', ...Array.from(uniqueTechs).sort()];
});

const filteredProjects = computed(() => {
    return projectsData.filter(p => {
        const yearMatch = selectedYear.value === 'All' || getYear(p.date) === selectedYear.value;
        const techMatch = selectedTech.value === 'All' || p.tags.includes(selectedTech.value);
        return yearMatch && techMatch;
    });
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage.value));

const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProjects.value.slice(start, end);
});

watch([selectedYear, selectedTech, itemsPerPage], () => {
    currentPage.value = 1;
});

// Social Links Mapping
const iconMap: Record<string, any> = {
    Github, Instagram, Linkedin, Mail, MapPin,
    Briefcase, Award, GraduationCap, Code2,
    Rocket, Building2, Zap, Database, Monitor
};

// getIcon kept for potential future use: const getIcon = (iconName: string) => iconMap[iconName] || Code2;

const socialLinks = computed(() => {
    return siteConfig.socialLinks.map(social => ({
        ...social,
        icon: iconMap[social.icon] || Github
    }));
});

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>

<style scoped>
/* Gradient text support */
:deep(.gradient-text) {
    background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}
</style>
