import { projectsData, type Project } from '../data/landing/projects';

export interface PortfolioProject extends Project {}

// Helper to keep compatibility with components expecting Sanity's urlFor
export function urlFor(source: any) {
    return {
        url: () => {
            if (typeof source === 'string') return source;
            if (source?.asset?.url) return source.asset.url;
            return '';
        }
    };
}

export const portfolioService = {
    async getProjects(): Promise<PortfolioProject[]> {
        return [...projectsData].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
    },

    async getProjectsByRelatedService(serviceId: string): Promise<PortfolioProject[]> {
        return projectsData.filter(p => p.relatedServices?.includes(serviceId));
    },

    async getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
        const found = projectsData.find(p => p.slug === slug);
        return found || null;
    },

    async getProjectById(id: string | number): Promise<PortfolioProject | null> {
        const numId = typeof id === 'string' ? parseInt(id) : id;
        return projectsData.find(p => p.id === numId) || null;
    },

    async addProject(project: any) {
        console.warn('Portfolio is currently in hardcoded mode. Add operation ignored.');
        return { ...project, id: Date.now() };
    },

    async updateProject(_id: string | number, project: any) {
        console.warn('Portfolio is currently in hardcoded mode. Update operation ignored.');
        return project;
    },

    async deleteProject(_id: string | number) {
        console.warn('Portfolio is currently in hardcoded mode. Delete operation ignored.');
        return true;
    },

    async getCategories() {
        const categories = projectsData.map(p => p.category);
        return [...new Set(categories)];
    }
};
