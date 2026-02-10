import { supabase } from '@kangjessy/database';
import { 
  Languages, 
  Zap, 
  BarChart3, 
  Wallet, 
  MessageSquare, 
  ShieldCheck, 
  Database, 
  Search, 
  Cpu, 
  Layout, 
  ScanLine, 
  History, 
  Repeat, 
  Server, 
  Settings2, 
  Headphones, 
  Users,
  Monitor,
  ShoppingBag,
  Hotel,
  Building2,
  BookOpen,
  MessageCircle,
  UserCheck,
  ShoppingCart,
  Check,
  Palette,
  Lock,
  Globe,
  Rocket
} from 'lucide-vue-next';

export interface Feature {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  relevantTo: string[];
  icon?: any; // Changed to any to support Component type
  deliveryTime?: string;
  serviceName?: string;
}

export interface ProjectType {
  id: string;
  serviceId: string;
  name: string;
  basePrice: number;
  originalPrice?: number;
  desc: string;
  maxPages?: string;
  revisions?: string;
  deliveryTime?: string;
  features?: string[];
  includedFeatureIds?: string[];
  detailedFeatures?: { title: string; icon?: string; items: string[] }[];
  category?: string;
  isFeatured?: boolean;
  isMicro?: boolean;
  badge?: string;
  workflow?: { title: string; description: string }[];
}

export interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  workflow: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
}

const iconMap: Record<string, any> = {
  Languages, Zap, BarChart3, Wallet, MessageSquare, ShieldCheck, Database, Search, Cpu, Layout, ScanLine, History, Repeat, Server, Settings2, Headphones, Users,
  Monitor, ShoppingBag, Hotel, Building2, BookOpen, MessageCircle, UserCheck, ShoppingCart, Check, Palette, Lock, Globe, Rocket
};

const mapFeature = (row: any): Feature => {
  const meta = row.metadata || {};
  return {
    id: row.slug,
    name: row.name,
    price: Number(row.base_price),
    // originalPrice: Tidak ada di DB seed saat ini, bisa ditambah nanti
    desc: row.description,
    icon: iconMap[row.icon] || Zap, // Map string to component with fallback
    relevantTo: meta.relevantTo || [],
    deliveryTime: meta.deliveryTime,
    serviceName: meta.serviceName
  };
};

const mapProject = (row: any): ProjectType => {
  const meta = row.metadata || {};
  return {
    id: row.slug,
    serviceId: meta.serviceId || "",
    name: row.name,
    basePrice: Number(row.base_price),
    // originalPrice: Number(meta.originalPrice), // Optional jika ada di metadata
    desc: row.description,
    maxPages: meta.maxPages,
    revisions: meta.revisions,
    deliveryTime: meta.deliveryTime,
    features: meta.features || [], // Legacy string array support
    includedFeatureIds: meta.includedFeatureIds || [],
    detailedFeatures: meta.detailedFeatures || [],
    category: meta.category || "The Core", // Default category
    isFeatured: meta.isFeatured || false,
    isMicro: meta.isMicro || false,
    badge: meta.badge,
    workflow: meta.workflow // Optional override
  };
};

export const pricingService = {
  async getAllFeatures(): Promise<Feature[]> {
    const { data, error } = await supabase
      .from("pricing_master")
      .select("*")
      .eq("category", "feature")
      .order("sort_order");

    if (error) {
      console.error("Error fetching features:", error);
      return [];
    }

    return (data || []).map(mapFeature);
  },

  async getAllProjectTypes(): Promise<ProjectType[]> {
    const { data, error } = await supabase
      .from("pricing_master")
      .select("*")
      .eq("category", "project_type")
      .order("sort_order");

    if (error) {
      console.error("Error fetching project types:", error);
      return [];
    }
    return (data || []).map(mapProject);
  },

  async getAllServices(): Promise<ServiceData[]> {
    const { data, error } = await supabase
      .from("pricing_master")
      .select("*")
      .eq("category", "service_type")
      .order("sort_order");

    if (error) {
       console.error("Error fetching services:", error);
       return [];
    }

    return (data || []).map((row) => ({
      id: row.slug,
      title: row.name,
      tagline: row.metadata?.tagline || row.description,
      icon: row.icon,
      workflow: row.metadata?.workflow || [],
      faq: row.metadata?.faq || []
    }));
  },

  async getAllStyles(): Promise<any[]> {
    const { data, error } = await supabase
      .from("pricing_master")
      .select("*")
      .eq("category", "style_vibe")
      .order("sort_order");

    if (error) return [];

    return (data || []).map((row) => ({
      id: row.slug,
      name: row.name,
      desc: row.description,
      image: row.image_url
    }));
  },

  async getAllTimelines(): Promise<any[]> {
    const { data, error } = await supabase
      .from("pricing_master")
      .select("*")
      .eq("category", "project_deadline")
      .order("sort_order");

    if (error) return [];

    return (data || []).map((row) => ({
      id: row.slug,
      label: row.name,
      desc: row.description,
      multiplier: Number(row.multiplier) || 1
    }));
  }
};
