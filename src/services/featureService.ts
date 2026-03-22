import { availableFeatures } from '../data/landing/order';
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
  Users 
} from 'lucide-vue-next';

export interface Feature {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  relevantTo: string[];
  icon?: any;
  deliveryTime?: string;
  serviceName?: string;
}

const iconMap: Record<string, any> = {
  Languages, Zap, BarChart3, Wallet, MessageSquare, ShieldCheck, Database, Search, Cpu, Layout, ScanLine, History, Repeat, Server, Settings2, Headphones, Users
};

export const featureService = {
  async getAllActive() {
    return availableFeatures.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      desc: item.desc,
      relevantTo: item.relevantTo || [],
      icon: iconMap[item.id] || Zap, // fallback to Zap
      deliveryTime: undefined,
      serviceName: undefined
    })) as Feature[];
  }
};
