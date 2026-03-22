import type { RoadmapStage } from '@kangjessy/config';
export type { RoadmapStage };

export const blueprintService = {
    async getAllStages() {
        return [
            {
                id: 'stage-1',
                title: 'Discovery & Strategy',
                description: 'Memahami visi bisnis Anda, menentukan audiens target, dan memetakan struktur situs web atau aplikasi untuk memastikan fondasi yang kuat.',
                sort_order: 1,
                steps: [
                    { id: '1-1', title: 'Konsultasi Awal', description: 'Diskusi mendalam mengenai kebutuhan, tujuan bisnis, dan harapan Anda.', sort_order: 1 },
                    { id: '1-2', title: 'Riset Kompetitor & Audiens', description: 'Menganalisis pasar saingan dan target audiens untuk strategi optimal.', sort_order: 2 },
                    { id: '1-3', title: 'Pembuatan Sitemap', description: 'Membuat peta situs struktur halaman agar navigasi logis dan mudah digunakan.', sort_order: 3 }
                ]
            },
            {
                id: 'stage-2',
                title: 'Design & Prototyping',
                description: 'Menerjemahkan ide ke dalam desain visual yang menakjubkan dan interaktif sebelum proses penulisan kode dimulai.',
                sort_order: 2,
                steps: [
                    { id: '2-1', title: 'Wireframing', description: 'Membuat kerangka hitam-putih untuk tata letak elemen pada setiap halaman.', sort_order: 1 },
                    { id: '2-2', title: 'Desain UI/UX', description: 'Proses pewarnaan, pemilihan tipografi, dan gaya visual merek Anda.', sort_order: 2 },
                    { id: '2-3', title: 'Interactive Prototype', description: 'Membuat simulasi klik untuk mendemonstrasikan bagaimana aplikasi akan bekerja.', sort_order: 3 }
                ]
            },
            {
                id: 'stage-3',
                title: 'Development & Integration',
                description: 'Tim teknis kami mulai menulis baris kode, membangun fitur kustom, dan mengintegrasikan sistem dengan API atau pihak ketiga.',
                sort_order: 3,
                steps: [
                    { id: '3-1', title: 'Setup Server & Database', description: 'Mempersiapkan lingkungan server dan arsitektur database.', sort_order: 1 },
                    { id: '3-2', title: 'Coding Frontend', description: 'Membuat antarmuka visual yang responsif menggunakan framework modern.', sort_order: 2 },
                    { id: '3-3', title: 'Coding Backend & API', description: 'Membangun logika bisnis utama, sistem autentikasi, dan integrasi data.', sort_order: 3 }
                ]
            },
            {
                id: 'stage-4',
                title: 'Testing & Launch',
                description: 'Fase uji coba ketat untuk menyingkirkan bug, memastikan keamanan, sebelum akhirnya produk rilis ke publik.',
                sort_order: 4,
                steps: [
                    { id: '4-1', title: 'Quality Assurance (QA)', description: 'Pengujian fitur, keamanan, dan bug dalam berbagai perangkat.', sort_order: 1 },
                    { id: '4-2', title: 'User Acceptance Testing', description: 'Klien mencoba aplikasi secara mandiri untuk konfirmasi hasil akhir.', sort_order: 2 },
                    { id: '4-3', title: 'Deployment & Rilis', description: 'Aplikasi di-deploy ke production server dan siap digunakan dunia.', sort_order: 3 }
                ]
            }
        ] as any[];
    },

    async getStageById(id: string) {
        const stages = await this.getAllStages();
        return stages.find(s => s.id === id) || null;
    }
};
