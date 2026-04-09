export interface DocCategory {
    id: string;
    name: string;
    items: DocItem[];
}

export interface DocItem {
    id: string;
    slug: string;
    title: string;
    fileName: string;
    readTime?: string;
}

export const docsData: DocCategory[] = [
    {
        id: 'getting-started',
        name: 'Memulai',
        items: [
            {
                id: 'pengenalan',
                slug: 'pengenalan',
                title: 'Pengenalan Panduan',
                fileName: 'pengenalan.md',
                readTime: '2 min'
            }
        ]
    },
    {
        id: 'wordpress-guides',
        name: 'WordPress Ecosystem',
        items: [
            {
                id: 'wp-login',
                slug: 'akses-dasbor-wordpress',
                title: 'Akses Dasbor WordPress',
                fileName: 'wp-login.md',
                readTime: '3 min'
            },
            {
                id: 'wp-blog',
                slug: 'manajemen-blog-wordpress',
                title: 'Manajemen Blog & Posting',
                fileName: 'wp-blog.md',
                readTime: '5 min'
            }
        ]
    },
    {
        id: 'custom-panel-guides',
        name: 'Custom Dashboard',
        items: [
            {
                id: 'custom-panel-intro',
                slug: 'navigasi-panel-admin',
                title: 'Navigasi Panel Admin',
                fileName: 'custom-panel-intro.md',
                readTime: '4 min'
            },
            {
                id: 'custom-panel-users',
                slug: 'kelola-user-role',
                title: 'Kelola User & Role',
                fileName: 'custom-panel-users.md',
                readTime: '4 min'
            }
        ]
    },
    {
        id: 'modern-web-guides',
        name: 'Modern Web (Non-CMS)',
        items: [
            {
                id: 'modern-web-updates',
                slug: 'update-konten-statis',
                title: 'Update Konten Statis',
                fileName: 'modern-web-updates.md',
                readTime: '3 min'
            }
        ]
    }
];
