
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
  Users 
} from 'lucide-vue-next';

// Re-using the Feature interface but making it compatible with DB
export interface Feature {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  relevantTo: string[];
  icon?: any; // For carousel
  deliveryTime?: string; // For carousel transparency
  serviceName?: string; // For labeling
}

const iconMap: Record<string, any> = {
  Languages, Zap, BarChart3, Wallet, MessageSquare, ShieldCheck, Database, Search, Cpu, Layout, ScanLine, History, Repeat, Server, Settings2, Headphones, Users
};

export const featureService = {
  async getAllActive() {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*');

      if (error) throw error;

      return data.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price), // Ensure number
        originalPrice: item.original_price ? Number(item.original_price) : undefined,
        desc: item.description,
        relevantTo: item.relevant_to || [],
        icon: iconMap[item.icon] || Zap, // Fallback icon
        deliveryTime: item.delivery_time,
        serviceName: item.service_name
      })) as Feature[];
    } catch (err) {
      console.error('Error fetching features:', err);
      return [];
    }
  }
};
