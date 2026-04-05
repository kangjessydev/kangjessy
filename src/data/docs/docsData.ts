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
        id: 'content-management',
        name: 'Manajemen Konten',
        items: [
            {
                id: 'membuat-artikel',
                slug: 'membuat-artikel',
                title: 'Cara Membuat Artikel Baru',
                fileName: 'membuat-artikel.md',
                readTime: '4 min'
            }
        ]
    }
];
