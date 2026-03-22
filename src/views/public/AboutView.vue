<template>
    <div class="bg-bg-primary min-h-screen pt-24 pb-20">
        <div class="container">
            <!-- Hero / Profile Section -->
            <div class="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
                <!-- Sidebar -->
                <aside class="lg:block">
                    <div class="sticky top-28 space-y-8">
                        <!-- Profile Card -->
                        <div class="bg-bg-secondary border border-border-color rounded-[32px] p-6 sm:p-8 text-center shadow-sm">
                            <div class="relative w-40 h-40 mx-auto mb-8">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessy" alt="Avatar"
                                    class="w-full h-full rounded-[40px] bg-bg-tertiary border-4 border-bg-primary" />
                                <div
                                    class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[0.7rem] font-bold whitespace-nowrap flex items-center gap-2 shadow-lg">
                                    <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                    Open for Hire
                                </div>
                            </div>

                            <h1 class="text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold text-text-primary mb-2">KangJessy</h1>
                            <p class="text-accent-primary font-bold text-sm uppercase tracking-widest mb-8">Business
                                Solution Developer</p>

                            <div class="space-y-4 pt-6 border-t border-border-color mb-8">
                                <div class="flex items-center gap-3 text-sm text-text-secondary">
                                    <MapPin :size="16" class="text-accent-primary shrink-0" />
                                    <span>Malang, Indonesia</span>
                                </div>
                                <div class="flex items-center gap-3 text-sm text-text-secondary overflow-hidden">
                                    <Mail :size="16" class="text-accent-primary shrink-0" />
                                    <span class="truncate">hi.kangjessy@gmail.com</span>
                                </div>
                            </div>

                            <div class="grid grid-cols-4 gap-3 mb-8">
                                <a v-for="social in socialLinks" :key="social.url" :href="social.url"
                                    :aria-label="social.name"
                                    class="h-12 flex items-center justify-center bg-bg-primary border border-border-color rounded-xl text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 transition-all duration-300">
                                    <component :is="social.icon" :size="20" />
                                </a>
                            </div>

                            <BaseButton variant="primary" size="lg" class="w-full group">
                                <span>Get Resume</span>
                                <Download :size="18" class="ml-2 transition-transform group-hover:translate-y-1" />
                            </BaseButton>
                        </div>
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="space-y-16">
                    <!-- Intro Section: The Narrative -->
                    <div class="space-y-10">
                        <SectionHeader :badge="introData.badge" align="left" class="!mb-0">
                            <template #title>
                                <span v-html="introData.title"></span>
                            </template>
                        </SectionHeader>

                        <p class="text-[clamp(1.1rem,2vw,1.35rem)] text-text-secondary leading-relaxed max-w-3xl font-medium">
                            {{ introData.description }}
                        </p>

                        <!-- The Journey Narrative -->
                        <div class="bg-bg-secondary border border-border-color rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden group">
                            <div class="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full group-hover:bg-accent-primary/10 transition-colors"></div>
                            
                            <div class="relative z-10 space-y-8">
                                <div class="flex items-center gap-4 text-accent-primary">
                                    <div class="w-12 h-12 bg-accent-primary/10 rounded-2xl flex items-center justify-center border border-accent-primary/20">
                                        <Rocket :size="24" />
                                    </div>
                                    <h3 class="text-2xl font-black text-text-primary uppercase tracking-tight">The Origin Story</h3>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                                    <div v-for="(p, i) in introData.journey.slice(0, 2)" :key="i" 
                                        class="text-[clamp(0.95rem,1.5vw,1.05rem)] text-text-secondary leading-relaxed space-y-4"
                                        v-html="p">
                                    </div>
                                </div>
                                <div class="pt-8 border-t border-border-color/50 text-[clamp(1rem,1.5vw,1.1rem)] text-text-primary font-bold italic leading-relaxed" 
                                    v-html="introData.journey[2]">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bento Grid: Facts & Tech DNA -->
                    <div class="space-y-12">
                        <div class="flex items-center gap-4">
                            <h2 class="text-[0.65rem] font-black uppercase tracking-[0.3em] text-text-tertiary">Strategic DNA & Capabilities</h2>
                            <div class="h-px flex-1 bg-border-color/50"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <!-- Large Bento: Core Stack -->
                            <div class="md:col-span-8 bg-linear-to-br from-bg-secondary to-bg-tertiary border border-border-color rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between group hover:border-accent-primary transition-all duration-500 shadow-sm relative overflow-hidden">
                                <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-primary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                                <div class="relative z-10">
                                    <div class="flex items-center gap-3 mb-8">
                                        <div class="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-white shadow-lg shadow-accent-primary/20">
                                            <Code2 :size="20" />
                                        </div>
                                        <span class="text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary">Technical Foundation</span>
                                    </div>
                                    <h4 class="text-3xl font-black text-text-primary mb-6 tracking-tight">Crafting Scalable <br/><span class="text-accent-primary">Digital Architecture.</span></h4>
                                    <div class="flex flex-wrap gap-3">
                                        <span v-for="skill in technicalSkills" :key="skill.category" 
                                            class="px-5 py-2.5 bg-bg-primary/50 border border-border-color rounded-2xl text-[11px] font-bold text-text-primary uppercase tracking-wider backdrop-blur-sm group-hover:border-accent-primary/30 transition-colors">
                                            {{ skill.category }}
                                        </span>
                                    </div>
                                </div>
                                <p class="mt-10 text-sm text-text-secondary leading-relaxed max-w-xl relative z-10">
                                    Berfokus pada keamanan data dan skalabilitas sistem. Menggunakan Laravel untuk backend yang kokoh dan Vue.js untuk antarmuka yang responsif dan fluid.
                                </p>
                            </div>

                            <!-- Small Bento: Experience Fact -->
                            <div class="md:col-span-4 bg-bg-secondary border border-border-color rounded-[2.5rem] p-6 sm:p-10 flex flex-col items-center text-center justify-center group hover:bg-bg-tertiary transition-all duration-300">
                                <div class="w-16 h-16 bg-accent-secondary/10 text-accent-secondary rounded-[2rem] flex items-center justify-center mb-6 border border-accent-secondary/20 group-hover:scale-110 transition-transform">
                                    <Zap :size="32" />
                                </div>
                                <h5 class="text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary mb-2">Automation Focus</h5>
                                <p class="text-lg font-bold text-text-primary leading-tight">
                                    Mengubah proses <span class="line-through opacity-40">Manual</span><br/> menjadi Workflow Otomatis.
                                </p>
                            </div>

                            <!-- Flexible Grid Items -->
                            <div v-for="fact in quickFacts.slice(1)" :key="fact.label" 
                                class="md:col-span-4 bg-bg-secondary border border-border-color rounded-[2.5rem] p-6 sm:p-8 hover:border-accent-primary transition-all duration-300">
                                <div class="w-12 h-12 bg-bg-primary border border-border-color rounded-2xl flex items-center justify-center text-accent-primary mb-6">
                                    <component :is="getIcon(fact.icon)" :size="22" />
                                </div>
                                <span class="block text-[0.6rem] font-black uppercase tracking-widest text-text-tertiary mb-2">{{ fact.label }}</span>
                                <h6 class="text-[0.95rem] font-bold text-text-primary leading-snug">{{ fact.text }}</h6>
                            </div>

                            <!-- Adaptive Skills Bento -->
                            <div class="md:col-span-12 bg-linear-to-r from-accent-primary/5 to-transparent border border-accent-primary/10 rounded-[2.5rem] p-6 sm:p-10 mt-4">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    <div v-for="as in adaptiveSkills.slice(0, 3)" :key="as.title" class="space-y-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-2 h-2 rounded-full bg-accent-primary"></div>
                                            <h4 class="text-xs font-black uppercase tracking-widest text-text-primary">{{ as.title }}</h4>
                                        </div>
                                        <p class="text-[11px] text-text-secondary leading-relaxed">{{ as.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Experience & Certificates Section -->
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-16 pt-10">
                        <!-- Experience timeline -->
                        <div class="space-y-10">
                            <div class="flex items-center gap-4">
                                <Briefcase :size="20" class="text-accent-primary shrink-0" />
                                <h2 class="text-[clamp(1.1rem,2vw,1.35rem)] font-bold text-text-primary uppercase tracking-tight">Professional Milestones</h2>
                            </div>
                            
                            <div class="relative pl-8 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-linear-to-b before:from-accent-primary before:to-transparent">
                                <div v-for="exp in experienceData" :key="exp.year" class="relative group">
                                    <div class="absolute -left-[36.5px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-4 border-accent-primary group-hover:scale-125 transition-transform duration-300"></div>
                                    <span class="text-[0.65rem] font-black text-accent-primary tracking-[0.2em] uppercase">{{ exp.year }}</span>
                                    <h4 class="text-[clamp(1.05rem,1.5vw,1.2rem)] font-black text-text-primary mt-1 group-hover:text-accent-primary transition-colors">{{ exp.role }}</h4>
                                    <p class="text-text-tertiary font-bold text-xs uppercase tracking-widest mb-4">{{ exp.company }}</p>
                                    <p class="text-[0.95rem] text-text-secondary leading-relaxed bg-bg-secondary/50 p-6 rounded-2xl border border-border-color/30 group-hover:border-accent-primary/20 transition-all">
                                        {{ exp.description }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Certificates Card -->
                        <div class="space-y-10">
                            <div class="flex items-center gap-4">
                                <Award :size="20" class="text-accent-primary shrink-0" />
                                <h2 class="text-[clamp(1.1rem,2vw,1.35rem)] font-bold text-text-primary uppercase tracking-tight">Elite Credentials</h2>
                            </div>

                            <div class="grid grid-cols-1 gap-6">
                                <div v-for="cert in certificatesData" :key="cert.id" 
                                    class="group bg-bg-secondary border border-border-color rounded-3xl p-5 sm:p-7 flex items-center justify-between hover:border-accent-primary transition-all duration-500 hover:shadow-xl hover:shadow-accent-primary/5 hover:-translate-y-1">
                                    <div class="space-y-3">
                                        <span class="inline-block px-3 py-1 rounded-full bg-accent-primary/10 text-[0.6rem] font-black uppercase tracking-widest text-accent-primary border border-accent-primary/20">{{ cert.platform }}</span>
                                        <h6 class="font-extrabold text-text-primary text-[1rem] tracking-tight leading-tight">{{ cert.title }}</h6>
                                        <p class="text-[11px] text-text-tertiary font-medium">{{ cert.date }} • <span class="font-mono text-accent-primary/60">{{ cert.credentialId }}</span></p>
                                    </div>
                                    <a :href="cert.url" target="_blank" 
                                        class="w-14 h-14 rounded-2xl border border-border-color flex items-center justify-center text-text-tertiary transition-all shrink-0 group-hover:bg-accent-primary group-hover:border-accent-primary group-hover:text-white group-active:scale-95">
                                        <ArrowUpRight :size="24" class="group-hover:text-white transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Project Archive - Full Width Section -->
            <div class="mt-32 space-y-12">
                <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-10 border-b border-border-color/50">
                    <SectionHeader title="Complete Project Archive" 
                        subtitle="Daftar lengkap proyek yang telah dikerjakan sejak 2018." 
                        align="left" class="!mb-0" />
                    
                    <div class="flex flex-wrap md:flex-nowrap items-end gap-3 md:gap-4">
                        <div class="flex-1 md:flex-none space-y-2">
                            <label class="text-[0.6rem] font-black uppercase tracking-widest text-text-tertiary ml-1 opacity-60">Year Filter</label>
                            <select v-model="selectedYear" 
                                class="w-full md:w-32 bg-bg-secondary border border-border-color rounded-2xl px-4 py-3 text-xs font-bold text-text-primary outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 transition-all appearance-none cursor-pointer">
                                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                            </select>
                        </div>
                        <div class="flex-1 md:flex-none space-y-2">
                            <label class="text-[0.6rem] font-black uppercase tracking-widest text-text-tertiary ml-1 opacity-60">Tech Stack</label>
                            <select v-model="selectedTech" 
                                class="w-full md:w-48 bg-bg-secondary border border-border-color rounded-2xl px-4 py-3 text-xs font-bold text-text-primary outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 transition-all appearance-none cursor-pointer">
                                <option v-for="tech in technologies" :key="tech" :value="tech">{{ tech }}</option>
                            </select>
                        </div>
                        <div class="w-full md:w-24 space-y-2">
                            <label class="text-[0.6rem] font-black uppercase tracking-widest text-text-tertiary ml-1 opacity-60">Show</label>
                            <select v-model="itemsPerPage" 
                                class="w-full bg-bg-secondary border border-border-color rounded-2xl px-4 py-3 text-xs font-bold text-text-primary outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 transition-all appearance-none cursor-pointer">
                                <option v-for="opt in entryOptions" :key="opt" :value="opt">{{ opt }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bg-bg-secondary border border-border-color rounded-[24px] overflow-hidden shadow-sm">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-bg-primary/50 text-[clamp(0.65rem,1.5vw,0.75rem)] font-bold uppercase tracking-widest text-text-tertiary border-b border-border-color">
                                    <th class="px-4 sm:px-8 py-4 sm:py-5">Date</th>
                                    <th class="px-4 sm:px-8 py-4 sm:py-5">Project</th>
                                    <th class="px-8 py-5 hidden md:table-cell">Tech Stack</th>
                                    <th class="px-4 sm:px-8 py-4 sm:py-5 text-right">Link</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border-color">
                                <tr v-for="project in paginatedProjects" :key="project.id" 
                                    class="group hover:bg-bg-primary/30 transition-colors duration-200">
                                    <td class="px-4 sm:px-8 py-4 sm:py-6 text-xs sm:text-sm font-mono text-accent-primary/70">{{ project.date }}</td>
                                    <td class="px-4 sm:px-8 py-4 sm:py-6">
                                        <div class="font-bold text-text-primary mb-1 text-sm sm:text-base">{{ project.title }}</div>
                                        <div class="text-[10px] sm:text-xs text-text-tertiary uppercase tracking-wider">{{ project.category }}</div>
                                    </td>
                                    <td class="px-8 py-6 hidden md:table-cell">
                                        <div class="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                                            <span v-for="tag in project.tags" :key="tag" 
                                                class="px-2 py-0.5 bg-bg-primary border border-border-color rounded text-text-secondary">
                                                {{ tag }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-4 sm:px-8 py-4 sm:py-6 text-right">
                                        <router-link :to="'/project/' + project.slug" 
                                            class="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-bg-primary border border-border-color text-text-tertiary group-hover:bg-accent-primary group-hover:border-accent-primary group-hover:text-white transition-all">
                                            <ArrowUpRight :size="18" />
                                        </router-link>
                                    </td>
                                </tr>
                                <tr v-if="paginatedProjects.length === 0">
                                    <td colspan="4" class="px-8 py-20 text-center text-text-tertiary italic">
                                        No projects found matching your filters.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Table Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 pt-10">
                    <button class="px-6 py-2.5 rounded-xl border border-border-color font-bold text-sm text-text-secondary hover:border-accent-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
                        :disabled="currentPage === 1" @click="currentPage--">Previous</button>

                    <div class="flex items-center gap-1.5">
                        <button v-for="page in totalPages" :key="page" 
                            class="w-10 h-10 rounded-xl border border-border-color font-bold text-sm transition-all"
                            :class="page === currentPage ? 'bg-accent-primary border-accent-primary text-white' : 'text-text-tertiary hover:border-accent-primary'" 
                            @click="currentPage = page">{{ page }}</button>
                    </div>

                    <button class="px-6 py-2.5 rounded-xl border border-border-color font-bold text-sm text-text-secondary hover:border-accent-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
                        :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
                </div>
            </div>

            <!-- Portfolio CTA -->
            <div class="mt-32">
                <div class="relative bg-bg-secondary border border-border-color rounded-[3rem] p-8 sm:p-12 lg:p-24 overflow-hidden text-center shadow-sm group">
                    <!-- Dynamic Glow Background -->
                    <div class="absolute inset-0 bg-linear-to-b from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div class="absolute -top-24 -left-24 w-96 h-96 bg-accent-primary/5 blur-[120px] rounded-full group-hover:bg-accent-primary/10 transition-colors"></div>
                    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-secondary/5 blur-[120px] rounded-full group-hover:bg-accent-secondary/10 transition-colors"></div>
                    
                    <div class="relative z-10 space-y-12 max-w-2xl mx-auto">
                        <div class="space-y-4">
                            <span class="inline-block px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-[0.65rem] font-black uppercase tracking-[0.3em] text-accent-primary">The Next Chapter</span>
                            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-black text-text-primary leading-[1.1] tracking-tighter">Ready to Start Your <br/><span class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent italic">Own Journey?</span></h2>
                            <p class="text-text-secondary text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed">
                                Mari kita diskusikan bagaimana koding dan sistem otomatisasi bisa membantu mengakselerasi pertumbuhan bisnis Anda saat ini.
                            </p>
                        </div>

                        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                            <BaseButton to="/order" variant="primary" size="lg" class="w-full sm:w-auto px-12 py-5 shadow-2xl shadow-accent-primary/20">
                                Start a Collaboration
                            </BaseButton>
                            <BaseButton to="/services" variant="secondary" size="lg" class="w-full sm:w-auto px-12 py-5">
                                Explore Services
                            </BaseButton>
                        </div>

                        <!-- Trusted Text -->
                        <div class="pt-12 flex flex-col items-center gap-4 opacity-40">
                            <div class="h-px w-24 bg-border-color"></div>
                            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-text-tertiary">Consistent Results Since 2018</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {
    Github, Instagram, Linkedin, Download,
    ArrowUpRight, Mail, MapPin,
    Briefcase, Award, GraduationCap, Code2,
    Rocket, Building2, Zap, Database, Monitor
} from 'lucide-vue-next';

// Data Imports
import { projectsData } from '../../data/landing/projects';
import { technicalSkills, adaptiveSkills } from '../../data/landing/skills';
import { experienceData } from '../../data/landing/experience';
import { certificatesData } from '../../data/landing/certificates';
import { siteConfig } from '../../data/config/siteConfig';
import { introData, quickFacts } from '../../data/landing/about';

// UI Components
import SectionHeader from '../../components/ui/SectionHeader.vue';
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
const entryOptions = [5, 10, 25, 50];

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

const getIcon = (iconName: string) => iconMap[iconName] || Code2;

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
