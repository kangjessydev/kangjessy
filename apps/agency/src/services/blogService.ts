import { sanityClient, sanityWriteClient } from '@kangjessy/database';

export interface BlogPost {
    _id?: string;
    id?: string;
    slug?: string | { current: string };
    title: string;
    category?: string; // For backward compatibility or single selector
    categories?: string[]; // The actual array used in UI
    excerpt: string;
    content: string; // HTML from RichEditor
    body?: any[]; // PortableText if needed
    status: 'draft' | 'published';
    image?: string | null;
    mainImage?: string | null; // For frontend compatibility
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

export const blogService = {
    async getPosts() {
        const query = `*[_type == "post"] | order(_createdAt desc){
            "id": _id,
            _id,
            "slug": slug.current,
            title,
            "category": coalesce(categories[0]->title, "General"),
            "categories": coalesce(categories[]->title, []),
            "tags": coalesce(tags[]->title, []),
            excerpt,
            content,
            status,
            "image": mainImage.asset->url,
            "mainImage": mainImage.asset->url,
            views,
            "author": coalesce(authorName, "KangJessy"),
            readTime,
            publishedAt,
            "_createdAt": _createdAt
        }`;
        try {
            const data = await sanityClient.fetch(query);
            return data.map((p: any) => ({
                ...p,
                author: p.author || 'KangJessy',
                status: p.status || (p.publishedAt ? 'published' : 'draft')
            })) as BlogPost[];
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            return [];
        }
    },

    async getPostBySlug(slug: string) {
        const query = `*[_type == "post" && slug.current == $slug][0]{
            "id": _id,
            _id,
            "slug": slug.current,
            title,
            "category": coalesce(categories[0]->title, "General"),
            "categories": coalesce(categories[]->title, []),
            "tags": coalesce(tags[]->title, []),
            excerpt,
            content,
            body,
            status,
            "image": mainImage.asset->url,
            "mainImage": mainImage.asset->url,
            views,
            "author": coalesce(authorName, "KangJessy"),
            readTime,
            publishedAt,
            "_createdAt": _createdAt,
            "seoTitle": coalesce(seoTitle, title),
            "seoDescription": coalesce(seoDescription, excerpt),
            "seoKeywords": seoKeywords
        }`;
        try {
            const data = await sanityClient.fetch(query, { slug });
            if (!data) return null;
            return { 
                ...data, 
                author: data.authorName || 'KangJessy',
                status: data.status || (data.publishedAt ? 'published' : 'draft')
            } as BlogPost;
        } catch (err) {
            console.error(`Error fetching post by slug (${slug}):`, err);
            throw err;
        }
    },

    async getPostById(id: string) {
        const query = `*[_type == "post" && (_id == $id || _id == "drafts." + $id)][0]{
            "id": _id,
            _id,
            "slug": slug.current,
            title,
            "category": categories[0]->_id,
            "categories": categories[]->_id,
            "tags": tags[]->_id,
            excerpt,
            content,
            status,
            "image": mainImage.asset->url,
            "mainImage": mainImage.asset->url,
            views,
            "author": coalesce(authorName, "KangJessy"),
            readTime,
            publishedAt,
            "_createdAt": _createdAt
        }`;
        try {
            const data = await sanityClient.fetch(query, { id });
            if (!data) return null;
            return { 
                ...data, 
                author: data.authorName || 'KangJessy',
                status: data.status || 'draft' 
            };
        } catch (err) {
            console.error(`Error fetching post by ID (${id}):`, err);
            return null;
        }
    },

    // --- CATEGORIES & TAGS ---
    async getCategories() {
        return await sanityClient.fetch(`*[_type == "blogCategory"] | order(title asc) {
            "id": _id,
            _id,
            title,
            "slug": slug.current,
            description,
            "count": count(*[_type == "post" && references(^._id)])
        }`);
    },

    async addCategory(name: string) {
        const doc = {
            _type: 'blogCategory',
            title: name,
            slug: { _type: 'slug', current: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
        };
        return await sanityWriteClient.create(doc);
    },

    async deleteCategory(id: string) {
        return await sanityWriteClient.delete(id);
    },

    async getTags() {
        return await sanityClient.fetch(`*[_type == "blogTag"] | order(title asc) {
            "id": _id,
            _id,
            title,
            "slug": slug.current,
            "count": count(*[_type == "post" && references(^._id)])
        }`);
    },

    async addTag(name: string) {
        const doc = {
            _type: 'blogTag',
            title: name,
            slug: { _type: 'slug', current: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
        };
        return await sanityWriteClient.create(doc);
    },

    async deleteTag(id: string) {
        return await sanityWriteClient.delete(id);
    },

    async addPost(post: Partial<BlogPost> & { imageAssetId?: string, categoryIds?: string[], tagIds?: string[], slug?: string }) {
        const slugValue = post.slug || post.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post-' + Math.random().toString(36).substring(7);

        const doc: any = {
            _type: 'post',
            title: post.title,
            slug: { _type: 'slug', current: slugValue },
            excerpt: post.excerpt || '',
            content: post.content,
            status: post.status || 'published',
            authorName: post.author || 'KangJessy',
            readTime: post.readTime || '5 min',
            views: post.views || 0,
            categories: (post.categoryIds || []).filter(id => !!id).map(id => ({ _type: 'reference', _ref: id, _key: Math.random().toString(36).substring(7) })),
            tags: (post.tagIds || []).filter(id => !!id).map(id => ({ _type: 'reference', _ref: id, _key: Math.random().toString(36).substring(7) }))
        };

        if (doc.status === 'published') {
            doc.publishedAt = new Date().toISOString();
        }

        if (post.imageAssetId) {
            doc.mainImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: post.imageAssetId }
            };
        }

        const result = await sanityWriteClient.create(doc);
        return { ...result, id: result._id, status: result.status || 'published' } as unknown as BlogPost;
    },

    async updatePost(id: string, updates: Partial<BlogPost> & { imageAssetId?: string, categoryIds?: string[], tagIds?: string[], slug?: string }) {
        const patch: any = {
            title: updates.title,
            excerpt: updates.excerpt,
            content: updates.content,
            status: updates.status,
            authorName: updates.author,
            readTime: updates.readTime,
            views: updates.views,
            categories: (updates.categoryIds || []).filter(id => !!id).map(id => ({ _type: 'reference', _ref: id, _key: Math.random().toString(36).substring(7) })),
            tags: (updates.tagIds || []).filter(id => !!id).map(id => ({ _type: 'reference', _ref: id, _key: Math.random().toString(36).substring(7) }))
        };

        if (updates.slug) {
            patch.slug = { _type: 'slug', current: updates.slug };
        } else if (updates.title) {
            patch.slug = { 
                _type: 'slug', 
                current: updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') 
            };
        }

        if (updates.status === 'published') {
            patch.publishedAt = new Date().toISOString();
        }

        if (updates.imageAssetId) {
            patch.mainImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: updates.imageAssetId }
            };
        }

        const result = await sanityWriteClient.patch(id).set(patch).commit();
        return { ...result, id: result._id, status: result.status || updates.status } as unknown as BlogPost;
    },

    async deletePost(id: string) {
        await sanityWriteClient.delete(id);
        return true;
    },

    async uploadImage(file: File) {
        const asset = await sanityWriteClient.assets.upload('image', file);
        return asset;
    }
};
