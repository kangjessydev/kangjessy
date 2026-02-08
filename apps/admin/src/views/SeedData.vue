<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Seed Data</h1>
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-lg font-semibold mb-2">Blueprint Data Seed</h2>
      <p class="mb-4 text-gray-600">
        Click below to populate the "The Blueprint" roadmap data into Supabase.
      </p>

      <div
        v-if="status"
        class="mb-4 p-4 rounded"
        :class="
          statusType === 'error'
            ? 'bg-red-50 text-red-600'
            : 'bg-green-50 text-green-600'
        "
      >
        {{ status }}
      </div>

      <button
        @click="seedBlueprint"
        :disabled="loading"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ loading ? "Seeding..." : "Seed Blueprint Data" }}
      </button>

      <div
        class="mt-4 text-xs text-gray-500 font-mono whitespace-pre-wrap h-64 overflow-y-auto border p-2 bg-gray-50"
        v-if="logs"
      >
        {{ logs }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { blueprintService } from "../services/blueprintService";
import type { RoadmapStage } from "@kangjessy/config";

const loading = ref(false);
const status = ref("");
const statusType = ref("info");
const logs = ref("");

const log = (msg: string) => {
  logs.value += msg + "\n";
  console.log(msg);
};

const roadmapData: RoadmapStage[] = [
  {
    id: "visionary",
    name: "The Visionary",
    subtitle: "Tahap Memulai & Identitas",
    icon: "Palette",
    description:
      "Sangat cocok untuk Anda yang baru memiliki ide bisnis atau ingin melegalkan identitas brand agar terlihat profesional sejak hari pertama.",
    sort_order: 1,
    steps: [
      {
        id: "v-1",
        type: "article",
        title: "Fondasi Brand identity",
        description:
          "Kenapa konsistensi visual menentukan kepercayaan pelanggan pertama Anda.",
        icon: "Target",
        duration: "1-2 Hari",
        importance: "critical",
        rich_content: [
          "Psikologi warna dalam branding",
          "Tipografi yang membangun trust",
          "Konsistensi lintas platform digital",
        ],
        content:
          "Identitas brand bukan hanya soal logo. Ini adalah tentang bagaimana pelanggan merasakan bisnis Anda. Memilih warna dan font yang tepat bisa meningkatkan persepsi nilai bisnis Anda hingga 80%.",
        link: "/blog/fondasi-brand-identity-digital",
        action_label: "Baca Materi Strategi",
        sort_order: 1,
      },
      {
        id: "v-2",
        type: "tool",
        title: "Tentukan Aura Brand",
        description:
          "Gunakan AI Palette Generator untuk menemukan kombinasi warna yang pas.",
        icon: "Palette",
        duration: "Instan",
        importance: "recommended",
        rich_content: [
          "Generate 5 mood color berbeda",
          "Cek kontras standar WCAG",
          "Export ke Figma/CSS",
        ],
        link: "https://kangjessy-tools.vercel.app/palette-generator",
        action_label: "Coba Palette Generator",
        sort_order: 2,
      },
      {
        id: "v-3",
        type: "service",
        title: "Starter Landing Page",
        description:
          "Validasi ide bisnis Anda dengan satu halaman web yang fokus pada konversi.",
        icon: "Layout",
        duration: "3-4 Hari",
        importance: "critical",
        rich_content: [
          "High Fidelity Design",
          "Responsive Mobile View",
          "Contact Form Integration",
        ],
        link: "/order?type=landing-page",
        action_label: "Pesan Landing Page",
        sort_order: 3,
      },
    ],
  },
  {
    id: "scaler",
    name: "The Scaler",
    subtitle: "Membangun Kredibilitas",
    icon: "Monitor",
    description:
      'Bisnis Anda sudah jalan, namun ingin terlihat lebih "established" dan bisa dipercaya oleh klien-klien besar atau korporasi.',
    sort_order: 2,
    steps: [
      {
        id: "s-1",
        type: "article",
        title: "Website vs Media Sosial",
        description:
          'Kenapa memiliki "rumah digital" resmi jauh lebih aman dibanding hanya numpang di platform pihak ketiga.',
        icon: "Globe",
        duration: "1 Hari",
        importance: "critical",
        rich_content: [
          "Ownership atas data pelanggan",
          "Kontrol penuh atas User Experience",
          "Membangun ranking SEO jangka panjang",
        ],
        content:
          "Media sosial adalah hak milik platform lain. Website adalah aset properti Anda sendiri. Di sini, Anda memegang kontrol penuh atas data dan bagaimana Anda ingin dipandang oleh dunia.",
        link: "/blog/website-vs-media-sosial",
        action_label: "Baca Selengkapnya",
        sort_order: 1,
      },
      {
        id: "s-2",
        type: "tool",
        title: "Copywriting Profesional",
        description:
          "Tulis profil perusahaan atau sales copy yang menjual dengan bantuan AI.",
        icon: "Type",
        duration: "Instan",
        importance: "recommended",
        rich_content: [
          "Professional tone converter",
          "Focus on unique selling point",
          "Grammar & Flow improvement",
        ],
        link: "https://kangjessy-tools.vercel.app/professional-rewriter",
        action_label: "Coba Smart Rewriter",
        sort_order: 2,
      },
      {
        id: "s-3",
        type: "service",
        title: "Premium Company Profile",
        description:
          "Tampil elegan dan kredibel dengan arsitektur website modern multipage.",
        icon: "Rocket",
        duration: "7-10 Hari",
        importance: "critical",
        rich_content: [
          "Up to 7 Core Pages",
          "Custom CMS Implementation",
          "Professional SEO Foundation",
        ],
        link: "/order?type=company-profile",
        action_label: "Bangun Company Profile",
        sort_order: 3,
      },
      {
        id: "s-4",
        type: "checklist",
        title: "Digital Trust Audit",
        description:
          "Pastikan semua aset digital Anda memancarkan profesionalisme.",
        icon: "Target",
        duration: "1 Hari",
        importance: "recommended",
        rich_content: [
          "Review SSL & Security Header",
          "Audit Google Business Profile",
          "Analisis testimoni & social proof",
        ],
        action_label: "Lihat Checklist Audit",
        sort_order: 4,
      },
    ],
  },
  {
    id: "optimizer",
    name: "The Optimizer",
    subtitle: "Optimasi & Performa",
    icon: "Search",
    description:
      "Anda sudah punya website, tapi merasa belum maksimal? Mari bedah performanya dan tingkatkan kemampuan mendatangkan lead.",
    sort_order: 3,
    steps: [
      {
        id: "o-1",
        type: "article",
        title: "Data-Driven Growth",
        description:
          "Memahami perilaku pengunjung website untuk menaikkan average order value.",
        icon: "Filter",
        duration: "2 Hari",
        importance: "recommended",
        rich_content: [
          "Heatmap analysis sederhana",
          "Conversion Rate Optimization (CRO)",
          "A/B Testing fundamental",
        ],
        content:
          'Banyak orang punya traffic tapi tidak ada sales. Optimasi konversi (CRO) adalah seni memindahkan orang dari "melihat" menjadi "membeli".',
        link: "/blog/data-driven-growth-cro",
        action_label: "Pelajari CRO",
        sort_order: 1,
      },
      {
        id: "o-2",
        type: "tool",
        title: "SEO Health Check",
        description:
          "Audit kesehatan SEO website Anda secara instan untuk melihat apa yang perlu diperbaiki.",
        icon: "Search",
        duration: "5 Menit",
        importance: "critical",
        link: "https://kangjessy-tools.vercel.app/seo-scanner",
        action_label: "Scan Website Sekarang",
        sort_order: 2,
      },
      {
        id: "o-3",
        type: "service",
        title: "Sales Funnel System",
        description:
          "Ubah website statis menjadi mesin penjualan otomatis yang didesain khusus untuk closing.",
        icon: "ShoppingCart",
        duration: "10-14 Hari",
        importance: "critical",
        rich_content: [
          "Automated Lead Capture",
          "Direct Checkout Integration",
          "Retargeting Pixel Setup",
        ],
        link: "/order?type=sales-funnel",
        action_label: "Buat Sales Funnel",
        sort_order: 3,
      },
      {
        id: "o-4",
        type: "article",
        title: "Speed & UX Optimization",
        description:
          "Website lambat membunuh konversi. Pelajari cara mencapai skor Core Web Vitals yang hijau.",
        icon: "Zap",
        duration: "1 Hari",
        importance: "recommended",
        rich_content: [
          "Image lazy loading & compression",
          "Critical CSS rendering",
          "Font loading optimization",
        ],
        content:
          "Setiap delay 1 detik pada loading website dapat menurunkan tingkat konversi hingga 7%. Kecepatan bukan sekadar kemewahan, tapi kebutuhan.",
        action_label: "Baca Panduan Speed",
        sort_order: 4,
      },
    ],
  },
  {
    id: "automator",
    name: "The Automator",
    subtitle: "Sistem & Automasi",
    icon: "Zap",
    description:
      "Operasional bisnis mulai kewalahan? Saatnya memangkas tugas repetitif dan membiarkan robot bekerja untuk Anda.",
    sort_order: 4,
    steps: [
      {
        id: "a-1",
        type: "article",
        title: "The Power of Automation",
        description:
          "Bagaimana memangkas 10 jam kerja per minggu dengan mengkoneksikan antar aplikasi.",
        icon: "Cpu",
        duration: "1 Hari",
        importance: "recommended",
        rich_content: [
          "Integrasi Sheets ke WhatsApp",
          "Auto-Invoicing system",
          "CRM Sync Automation",
        ],
        content:
          "Automasi bukan soal mengganti manusia, tapi soal membebaskan manusia dari tugas membosankan agar bisa fokus pada strategi besar.",
        link: "/blog/power-of-automation-business",
        action_label: "Baca Studi Kasus",
        sort_order: 1,
      },
      {
        id: "a-2",
        type: "tool",
        title: "Link WA Generator",
        description:
          "Buat link WhatsApp profesional dengan pesan kustom untuk memudahkan CS Anda.",
        icon: "MessageCircle",
        duration: "Instan",
        importance: "optional",
        link: "https://kangjessy-tools.vercel.app/whatsapp-generator",
        action_label: "Buat Link WA",
        sort_order: 2,
      },
      {
        id: "a-3",
        type: "service",
        title: "Workflow Automation",
        description:
          "Integrasikan semua tools bisnis Anda (Sheets, WA, Email) ke dalam satu alur otomatis.",
        icon: "Workflow",
        duration: "14+ Hari",
        importance: "critical",
        rich_content: [
          "Audit Workflow Bisnis",
          "Zapier/Make.com Implementation",
          "Internal Admin Dashboard",
        ],
        link: "/order?type=workflow-auto",
        action_label: "Integrasi Sekarang",
        sort_order: 3,
      },
    ],
  },
];

const seedBlueprint = async () => {
  loading.value = true;
  status.value = "";
  logs.value = "";

  try {
    log("Starting seed process...");

    for (const stage of roadmapData) {
      const { steps, ...stageData } = stage;

      log(`Saving stage: ${stageData.name}...`);
      const savedStage = await blueprintService.upsertStage(stageData);
      log(`Stage saved with ID: ${savedStage.id}`);

      // Upsert Steps
      const stepsWithStageId = (steps || []).map((step) => ({
        ...step,
        stage_id: savedStage.id,
      }));

      log(`Saving ${stepsWithStageId.length} steps for ${stageData.name}...`);
      // Reuse updateStepOrder which essentially upserts
      await blueprintService.updateStepOrder(stepsWithStageId);
      log("Steps saved.");
    }

    status.value = "Seeding completed successfully!";
    statusType.value = "success";
  } catch (e: any) {
    status.value = "Seeding failed: " + e.message;
    statusType.value = "error";
    log("Error: " + e.message);
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
