import { blogPosts, type BlogPost as DummyBlogPost } from '../data/landing/blogs';
import { marked } from 'marked';

const mdFiles = import.meta.glob('../data/landing/blogs/*.md', { query: '?raw', import: 'default' });

export interface BlogPost {
    _id?: string;
    id?: string;
    slug?: string | { current: string };
    title: string;
    category?: string;
    categories?: string[];
    excerpt: string;
    content: string;
    body?: any[];
    status: 'draft' | 'published';
    image?: string | null;
    mainImage?: string | null;
    tags?: string[];
    views?: number;
    author?: string;
    readTime?: string;
    publishedAt?: string;
    _createdAt?: string;
    // SEO Fields
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
}

const mapPost = (p: DummyBlogPost): BlogPost => ({
    id: String(p.id),
    _id: String(p.id),
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: '',
    status: 'published',
    image: p.image,
    mainImage: p.image,
    author: p.author,
    readTime: p.readTime,
    publishedAt: p.date,
    _createdAt: p.date,
    category: p.category,
    categories: [p.category],
    tags: p.tags,
});

export const blogService = {
    async getPosts() {
        return Promise.all(blogPosts.map(async p => {
            const result = mapPost(p);
            const key = `../data/landing/blogs/${p.fileName}`;
            if (mdFiles[key]) {
                 const raw: any = await mdFiles[key]();
                 result.content = await marked.parse(raw);
            } else {
                 result.content = `<p>${p.excerpt}</p>`;
            }
            return result;
        }));
    },

    async getPostBySlug(slug: string) {
        const post = blogPosts.find(p => p.slug === slug);
        if (!post) return null;
        
        const result = mapPost(post);
        const key = `../data/landing/blogs/${post.fileName}`;
        if (mdFiles[key]) {
             const raw: any = await mdFiles[key]();
             result.content = await marked.parse(raw);
        } else {
             result.content = `<p>${post.excerpt}</p>`;
        }
        return result;
    },

    async getPostById(id: string) {
        const post = blogPosts.find(p => String(p.id) === id);
        if (!post) return null;

        const result = mapPost(post);
        const key = `../data/landing/blogs/${post.fileName}`;
        if (mdFiles[key]) {
             const raw: any = await mdFiles[key]();
             result.content = await marked.parse(raw);
        } else {
             result.content = `<p>${post.excerpt}</p>`;
        }
        return result;
    },

    // --- CATEGORIES & TAGS ---
    async getCategories() {
        return [
            { id: '1', _id: '1', title: 'Technology', slug: 'technology', description: 'Tech related', count: 1 },
            { id: '2', _id: '2', title: 'Marketing', slug: 'marketing', description: 'Marketing related', count: 1 }
        ];
    },

    async addCategory(name: string) {
        return { _id: 'new-cat', title: name };
    },

    async deleteCategory(_id: string) {
        return true;
    },

    async getTags() {
        return [
            { id: '1', _id: '1', title: 'Web Dev', slug: 'web-dev', count: 1 },
            { id: '2', _id: '2', title: 'AI', slug: 'ai', count: 1 },
            { id: '3', _id: '3', title: 'Marketing', slug: 'marketing', count: 1 }
        ];
    },

    async addTag(name: string) {
        return { _id: 'new-tag', title: name };
    },

    async deleteTag(_id: string) {
        return true;
    },

    async addPost(post: any) {
        console.warn('Portfolio is currently in hardcoded mode. Add operation ignored.');
        return { ...post, id: Date.now().toString(), status: 'published' };
    },

    async updatePost(id: string, updates: any) {
        console.warn('Portfolio is currently in hardcoded mode. Update operation ignored.');
        return { ...updates, id, status: 'published' };
    },

    async deletePost(_id: string) {
        console.warn('Portfolio is currently in hardcoded mode. Delete operation ignored.');
        return true;
    },

    async uploadImage(file: File) {
        console.warn('Portfolio is currently in hardcoded mode. Upload operation ignored.');
        return { url: URL.createObjectURL(file) };
    }
};
