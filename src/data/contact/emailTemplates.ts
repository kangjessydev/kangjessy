import { markRaw } from "vue";
import {
  Briefcase,
  FileText,
  Mic,
  AlertCircle,
  BookOpen,
} from "lucide-vue-next";

export interface EmailTemplate {
  id: string;
  label: string;
  category: string;
  icon: any;
  subject: string;
  body: string;
}

/**
 * Template email yang ditampilkan di EmailModal.
 * Tambah/edit template di sini tanpa perlu buka komponen EmailModal.vue
 */
export const emailTemplates: EmailTemplate[] = [
  {
    id: "partnership",
    label: "Penawaran Kerjasama",
    category: "Business",
    icon: markRaw(Briefcase),
    subject: "[Partnership] Penawaran Kerjasama Strategis",
    body: "Halo Kang Jessy,\n\nSaya tertarik untuk bekerja sama dalam bidang pengembangan digital. Bisnis saya bergerak di bidang...",
  },
  {
    id: "proposal",
    label: "Permintaan Proposal",
    category: "Project",
    icon: markRaw(FileText),
    subject: "[Request] Permintaan Proposal Project Digital",
    body: "Halo Kang Jessy,\n\nKami sedang merencanakan sebuah project pengembangan sistem. Mohon info ketersediaan slot dan estimasi awal untuk spesifikasi berikut...",
  },
  {
    id: "speaker",
    label: "Undangan Mentor/Speaker",
    category: "Event",
    icon: markRaw(Mic),
    subject: "[Invitations] Undangan Menjadi Mentor/Speaker",
    body: "Halo Kang Jessy,\n\nKami melihat antusiasme Anda di bidang Agentic AI dan pengembangan digital. Kami ingin mengundang Anda dalam event kami yang akan diadakan pada...",
  },
  {
    id: "feedback",
    label: "Laporan & Feedback",
    category: "Quality",
    icon: markRaw(AlertCircle),
    subject: "[Feedback] Masukan Untuk Website/Layanan",
    body: "Halo Kang Jessy,\n\nSaya ingin memberikan masukan terkait website/layanan Anda. Secara keseluruhan sudah bagus, namun ada beberapa hal yang bisa ditingkatkan...",
  },
  {
    id: "course",
    label: "Tanya Kursus/Coaching",
    category: "Education",
    icon: markRaw(BookOpen),
    subject: "[Education] Pertanyaan Terkait Program Kursus",
    body: "Halo Kang Jessy,\n\nSaya tertarik untuk mengikuti program kursus atau private coaching yang Anda tawarkan. Bagaimana teknis pendaftaran dan kurikulumnya?",
  },
];
