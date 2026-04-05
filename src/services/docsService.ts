import { docsData, type DocCategory, type DocItem } from '../data/docs/docsData';
import { marked } from 'marked';

// Import all markdown files in the docs/markdown folder as raw strings
const mdFiles = import.meta.glob('../data/docs/markdown/*.md', { query: '?raw', import: 'default' });

export interface DocumentDetail extends DocItem {
    content: string;
    categoryName: string;
}

export const docsService = {
    /**
     * Get the full index (sidebar format)
     */
    getIndex(): DocCategory[] {
        return docsData;
    },

    /**
     * Locate the doc item from the static data
     */
    findDocInfo(slug: string): { item: DocItem; category: DocCategory } | null {
        for (const category of docsData) {
            const item = category.items.find(i => i.slug === slug);
            if (item) {
                return { item, category };
            }
        }
        return null;
    },

    /**
     * Load parsed Markdown content for a single doc slug
     */
    async getDocContent(slug: string): Promise<DocumentDetail | null> {
        const info = this.findDocInfo(slug);
        if (!info) return null;

        const { item, category } = info;
        const key = `../data/docs/markdown/${item.fileName}`;

        let contentHtml = '';
        if (mdFiles[key]) {
             const raw: any = await mdFiles[key]();
             contentHtml = await marked.parse(raw);
        } else {
             contentHtml = `<p>Error: Markdown file <strong>${item.fileName}</strong> not found.</p>`;
        }

        return {
            ...item,
            categoryName: category.name,
            content: contentHtml
        };
    }
};
