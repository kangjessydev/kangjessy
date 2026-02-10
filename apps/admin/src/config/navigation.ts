import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Briefcase,
  DollarSign,
  Tag,
  Settings,
  Image,
  Layers,
  Zap,
  Database,
  Type
} from "lucide-vue-next";

export interface MenuItem {
  path: string;
  label: string;
  icon?: any;
  children?: { path: string; label: string }[];
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const navigationConfig: MenuGroup[] = [
  {
    title: "Overview",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
      { path: "/projects", label: "Manajemen Proyek", icon: Zap },
      { path: "/orders", label: "Pesanan", icon: ShoppingCart },
      { path: "/leads", label: "Inbox Leads", icon: Users },
      {
        path: "/proposals",
        label: "Proposals CMS",
        icon: FileText,
        children: [
          { path: "/proposals", label: "All Proposals" },
          { path: "/proposals/generator", label: "Live Generator" },
        ],
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        path: "/blog",
        label: "Blog",
        icon: FileText,
        children: [
          { path: "/blog", label: "Semua Artikel" },
          { path: "/blog/categories", label: "Kategori" },
          { path: "/blog/tags", label: "Tag" },
        ],
      },
      {
        path: "/portfolio",
        label: "Portfolio",
        icon: Briefcase,
        children: [
          { path: "/portfolio", label: "Semua Portofolio" },
          { path: "/portfolio/areas", label: "Bidang" },
          { path: "/portfolio/tech", label: "Tech Stack" },
        ],
      },
      { path: "/media", label: "Galeri Media", icon: Image },
      { path: "/blueprint", label: "The Blueprint", icon: Layers },
    ],
  },
  {
    title: "Service Management",
    items: [
      {
        path: "/services",
        label: "Master Data",
        icon: Database,
        children: [
          { path: "/services/main", label: "Layanan (Services)" },
          { path: "/services/project-types", label: "Tipe Proyek" },
          { path: "/services/style-vibes", label: "Style Vibes" },
          { path: "/services/deadlines", label: "Deadlines" },
          { path: "/services/features", label: "Fitur Tambahan" },
        ],
      },
    ],
  },
  {
    title: "Business",
    items: [
      { path: "/finance", label: "Keuangan", icon: DollarSign },
      { path: "/vouchers", label: "Kupon & Diskon", icon: Tag },
    ],
  },
  {
    title: "System",
    items: [{ path: "/settings", label: "Settings", icon: Settings }],
  },
];
