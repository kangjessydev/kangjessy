// Shared Constants & Pricing
export const PRICING = {
    FOUNDATION: {
        WEB: 5000000,
        SYSTEM: 10000000
    },
    MULTIPLIERS: {
        FEATURE_PREMIUM: 1.1, // Silent Multiplier for manual config
        TIMELINE: {
            STANDARD: 1.0,
            EXPRESS: 1.5,
            PRIORITY: 2.0
        }
    }
};

// Types & Interfaces
export interface RoadmapStep {
    id: string;
    stage_id?: string;
    type: 'article' | 'tool' | 'service' | 'checklist';
    title: string;
    description: string;
    icon: string;
    link?: string;
    action_label?: string;
    content?: string;
    duration?: string;
    importance: 'critical' | 'recommended' | 'optional';
    rich_content?: string[];
    sort_order?: number;
}

export interface RoadmapStage {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    icon: string;
    sort_order: number;
    steps?: RoadmapStep[];
}

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

export interface Coupon {
    id: string;
    code: string;
    label: string;
    desc: string;
    type: 'percent' | 'fixed';
    value: number;
    isActive: boolean;
    expiryDate: string;
    minOrder?: number;
    maxDiscount?: number;
    isGlobal: boolean;
    allowedProjectIds?: string[];
    allowedFeatureIds?: string[];
    allowedTimelineIds?: string[];
    terms?: string;
}

// Link Utilities
export const isExternalLink = (url: string | undefined | null): boolean => {
    if (!url || typeof url !== 'string') return false;
    if (url.startsWith('http://') || url.startsWith('https://') || url.includes('://')) return true;
    if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('wa.me')) return true;
    if (url.includes('.') && !url.startsWith('/') && !url.startsWith('#') && !url.startsWith('./') && !url.startsWith('../')) return true;
    return false;
};

export const ensureProtocol = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('#')) return url;
    if (url.includes('.') && !url.startsWith('/') && !url.startsWith('#')) return `https://${url}`;
    return url;
};
