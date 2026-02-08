import { sanityClient, sanityWriteClient } from '@kangjessy/database';

export interface PortfolioProject {
    _id?: string;
    id?: string;
    slug?: string | { current: string };
    title: string;
    category?: string;
    categories?: string[];
    tags?: string[];
    excerpt?: string;
    description?: string;
    content?: string;
    challenge?: string | { description: string };
    image?: string | null;
    mainImage?: string | null;
    gallery?: any[];
    client?: string;
    date?: string;
    status?: string | 'Success' | 'IDEA' | 'Live';
    liveUrl?: string;
    githubUrl?: string;
    technologies?: string[];
    steps?: { title: string; desc: string }[];
    metrics?: { label: string; value: string; icon: string }[];
    faqs?: { q: string; a: string }[];
    pivot?: { title: string; subtitle: string; items: { icon: string; title: string; desc: string }[] };
    impact?: string;
    publishedAt?: string;
    _createdAt?: string;
}

export const portfolioService = {
    async getProjects() {
        const query = `*[_type == "project"] | order(date desc) {
            "id": _id,
            _id,
            "slug": slug.current,
            title,
            excerpt,
            "category": category->title,
            "image": image.asset->url,
            "mainImage": image.asset->url,
            client,
            date,
            description,
            content,
            status,
            liveUrl,
            githubUrl,
            technologies,
            steps,
            metrics,
            faqs,
            pivot,
            impact,
            "_createdAt": _createdAt
        }`;
        try {
            return await sanityClient.fetch(query);
        } catch (err) {
            console.error('Error fetching portfolio projects:', err);
            return [];
        }
    },

    async getProjectById(id: string) {
        const query = `*[_type == "project" && (_id == $id || _id == "drafts." + $id)][0] {
            "id": _id,
            _id,
            "slug": slug.current,
            title,
            "category": category->_id,
            "image": image.asset->url,
            "mainImage": image.asset->url,
            gallery[] {
                asset-> { url }
            },
            client,
            date,
            description,
            content,
            status,
            liveUrl,
            githubUrl,
            technologies,
            steps,
            metrics,
            faqs,
            pivot,
            impact,
            "_createdAt": _createdAt
        }`;
        try {
            return await sanityClient.fetch(query, { id });
        } catch (err) {
            console.error(`Error fetching project by ID (${id}):`, err);
            return null;
        }
    },

    async addProject(project: Partial<PortfolioProject> & { imageAssetId?: string, categoryId?: string }) {
        const slugValue = project.slug || project.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'project-' + Math.random().toString(36).substring(7);

        const doc: any = {
            _type: 'project',
            title: project.title,
            slug: { _type: 'slug', current: slugValue },
            description: project.description || '',
            content: project.content || '',
            client: project.client || '',
            date: project.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            status: project.status || 'Success',
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            technologies: project.technologies || [],
            steps: project.steps || [],
            metrics: project.metrics || [],
            faqs: project.faqs || [],
            pivot: project.pivot,
            impact: project.impact,
        };

        if (project.categoryId) {
            doc.category = { _type: 'reference', _ref: project.categoryId };
        }

        if (project.imageAssetId) {
            doc.image = {
                _type: 'image',
                asset: { _type: 'reference', _ref: project.imageAssetId }
            };
        }

        const result = await sanityWriteClient.create(doc);
        return { ...result, id: result._id };
    },

    async updateProject(id: string, updates: Partial<PortfolioProject> & { imageAssetId?: string, categoryId?: string }) {
        const patch: any = {
            title: updates.title,
            description: updates.description,
            content: updates.content,
            client: updates.client,
            date: updates.date,
            status: updates.status,
            liveUrl: updates.liveUrl,
            githubUrl: updates.githubUrl,
            technologies: updates.technologies,
            steps: updates.steps,
            metrics: updates.metrics,
            faqs: updates.faqs,
            pivot: updates.pivot,
            impact: updates.impact,
        };

        if (updates.slug) {
            patch.slug = { _type: 'slug', current: updates.slug };
        }

        if (updates.categoryId) {
            patch.category = { _type: 'reference', _ref: updates.categoryId };
        }

        if (updates.imageAssetId) {
            patch.image = {
                _type: 'image',
                asset: { _type: 'reference', _ref: updates.imageAssetId }
            };
        }

        const result = await sanityWriteClient.patch(id).set(patch).commit();
        return { ...result, id: result._id };
    },

    async deleteProject(id: string) {
        await sanityWriteClient.delete(id);
        return true;
    },

    async getCategories() {
        return await sanityClient.fetch(`*[_type == "category"] | order(title asc) {
            "id": _id,
            _id,
            title,
            "slug": slug.current
        }`);
    },

    async addCategory(title: string) {
        const doc = {
            _type: 'category',
            title,
            slug: { _type: 'slug', current: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
        };
        return await sanityWriteClient.create(doc);
    },

    async uploadImage(file: File) {
        return await sanityWriteClient.assets.upload('image', file);
    }
};
