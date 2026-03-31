import { markRaw } from "vue";
import {
  Rocket,
  RefreshCw,
  Zap,
  Handshake,
  Cpu,
  HelpCircle,
} from "lucide-vue-next";

export interface WhatsAppTemplate {
  id: string;
  label: string;
  desc: string;
  icon: any;
  text: string;
}

export interface WhatsAppTemplateGroup {
  name: string;
  items: WhatsAppTemplate[];
}

/**
 * Template pesan WhatsApp yang ditampilkan di modal.
 * Tambah/edit template di sini tanpa perlu buka komponen WhatsAppModal.vue
 */
export const whatsappTemplateGroups: WhatsAppTemplateGroup[] = [
  {
    name: "Production & Project",
    items: [
      {
        id: "estimate",
        label: "Estimasi Proyek",
        desc: "Build New Site",
        icon: markRaw(Rocket),
        text: "Halo Kang Jessy, saya ingin minta estimasi biaya untuk pembangunan project baru saya.",
      },
      {
        id: "issue",
        label: "Lapor Bug / Kendala",
        desc: "Bug & Maintenance",
        icon: markRaw(RefreshCw),
        text: "Halo Kang Jessy, ada kendala teknis pada website saya yang perlu segera diperiksa.",
      },
      {
        id: "feature",
        label: "Tambah Fitur Baru",
        desc: "Product Scale",
        icon: markRaw(Zap),
        text: "Halo Kang Jessy, saya ingin menambah fitur khusus pada sistem website saya yang sudah ada.",
      },
    ],
  },
  {
    name: "Strategy & Growth",
    items: [
      {
        id: "partnership",
        label: "Kolaborasi Bisnis",
        desc: "Partnership Inquiry",
        icon: markRaw(Handshake),
        text: "Halo Kang Jessy, saya tertarik untuk mendiskusikan peluang kolaborasi strategi jangka panjang.",
      },
      {
        id: "automation",
        label: "Audit & Automasi",
        desc: "Workflow Optimization",
        icon: markRaw(Cpu),
        text: "Halo Kang Jessy, saya ingin mengonsultasikan alur kerja bisnis saya agar bisa diautomasi lewat sistem.",
      },
      {
        id: "other",
        label: "Pertanyaan Lain",
        desc: "General Question",
        icon: markRaw(HelpCircle),
        text: "Halo Kang Jessy, ada beberapa hal strategis yang ingin saya tanyakan terkait jasa Anda.",
      },
    ],
  },
];
