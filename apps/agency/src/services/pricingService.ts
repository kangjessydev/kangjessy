import {
  projectTypes as hardcodedProjectTypes,
  availableFeatures as hardcodedFeatures,
  timelineOptions as hardcodedTimelines,
  styleOptions as hardcodedStyles,
  serviceCategories as hardcodedServices
} from '../data/landing/order';
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
  icon?: any; // Added icon support
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
  status: 'active' | 'coming-soon';
  order: number;
  badge?: string;
  isFeatured?: boolean;
  icon: any;
  title: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  deliveryTime?: string;
  revisions?: string;
  overview?: string;
  included?: string[];
  detailedFeatures?: { title: string; icon?: string; items: string[] }[];
  process?: { title: string; description: string }[];
  technologies?: string[];
  packageFeatures?: string[];
  faq?: { question: string; answer: string }[];
  workflow: { title: string; description: string }[];
}

const iconMap: Record<string, any> = {
  Languages, Zap, BarChart3, Wallet, MessageSquare, ShieldCheck, Database, Search, Cpu, Layout, ScanLine, History, Repeat, Server, Settings2, Headphones, Users,
  Monitor, ShoppingBag, Hotel, Building2, BookOpen, MessageCircle, UserCheck, ShoppingCart, Check, Palette, Lock, Globe, Rocket
};

export const pricingService = {
  async getAllFeatures(): Promise<Feature[]> {
    return hardcodedFeatures.map(f => ({
      ...f,
      icon: iconMap[f.id] || Zap
    }));
  },

  async getAllProjectTypes(): Promise<ProjectType[]> {
    return hardcodedProjectTypes.map(p => ({
      ...p,
      icon: iconMap[p.id] || Layout
    }));
  },

  async getAllServices(): Promise<ServiceData[]> {
    return hardcodedServices.map(s => ({
      id: s.id,
      status: s.status as any,
      order: s.order,
      badge: s.badge,
      isFeatured: s.isFeatured,
      icon: iconMap[s.icon] || Globe,
      title: s.title,
      tagline: s.tagline,
      price: s.price,
      originalPrice: s.originalPrice,
      deliveryTime: s.deliveryTime,
      revisions: s.revisions,
      overview: s.overview,
      included: s.included,
      detailedFeatures: s.detailedFeatures,
      process: s.process,
      technologies: s.technologies,
      packageFeatures: s.packageFeatures,
      faq: s.faq,
      workflow: s.workflow,
    } as ServiceData));
  },

  async getAllStyles(): Promise<any[]> {
    return hardcodedStyles.map(s => ({
      ...s,
      image: `/images/styles/${s.id}.jpg` // Fallback path
    }));
  },

  async getAllTimelines(): Promise<any[]> {
    return hardcodedTimelines;
  }
};
