import { ref, computed, watch, onMounted } from "vue";
import {
  defaultConfig
} from "../data/config/orderConfig";
import { couponService, type Coupon } from "../services/couponService";
// import { featureService, type Feature } from "../services/featureService";
import { pricingService, type Feature, type ProjectType } from "../services/pricingService";

export function useOrderCalculator() {
  const selectedType = ref("foundation-web"); // Default updated to match DB slug
  const selectedStyle = ref("minimalist-luxury");
  const selectedFeatures = ref<string[]>([]);
  const selectedTimeline = ref("standard");
  
  const discountCode = ref("");
  const availableCoupons = ref<Coupon[]>([]);
  
  // Dynamic State
  const features = ref<Feature[]>([]); 
  const styles = ref<any[]>([]); 
  const timelines = ref<any[]>([]); 
  const projectTypes = ref<ProjectType[]>([]); 
  const serviceTypes = ref<any[]>([]); 

  const fetchData = async () => {
    try {
      // Parallel fetch
      const [
        fetchedCoupons, 
        fetchedFeatures, 
        fetchedProjectTypes, 
        fetchedServices
      ] = await Promise.all([
        couponService.getAllActive(),
        pricingService.getAllFeatures(),
        pricingService.getAllProjectTypes(),
        pricingService.getAllServices()
      ]);
      
      availableCoupons.value = fetchedCoupons;
      features.value = fetchedFeatures || [];
      projectTypes.value = fetchedProjectTypes || [];
      serviceTypes.value = fetchedServices || [];

      // Fetch Styles & Timelines (using raw DB access or new service method if we add one)
      // For now, let's assume we can fetch them via a generic helper or add specific methods to pricingService
      // To keep it simple, I'll add getStyles and getTimelines to pricingService in a bit.

      // TEMPORARY: using static for styles/timelines until added to service
      // We will add getStyles/getTimelines to pricingService next
      const fetchedStyles = await pricingService.getAllStyles();
      const fetchedTimelines = await pricingService.getAllTimelines();
      
      styles.value = fetchedStyles;
      timelines.value = fetchedTimelines;

    } catch (err) {
      console.error("Failed to fetch data from DB", err);
    }
  };

  onMounted(fetchData);

  const currentType = computed(() => {
    return projectTypes.value.find((t) => t.id === selectedType.value) || projectTypes.value[0];
  });
  
  const currentStyle = computed(() =>
    styles.value.find((s) => s.id === selectedStyle.value) || styles.value[0]
  );
  
  const currentTimeline = computed(() =>
    timelines.value.find((t) => t.id === selectedTimeline.value) || timelines.value[0]
  );

  const timelineMultiplier = computed(
    () => currentTimeline.value?.multiplier || 1
  );

  // Helper using the dynamic features ref
  const getFeatureName = (id: string) =>
    features.value.find((f) => f.id === id)?.name || id;
  const getFeaturePrice = (id: string) =>
    features.value.find((f) => f.id === id)?.price || 0;
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(Math.round(price));

  const isMicro = computed(() => !!currentType.value?.isMicro || currentType.value?.id === 'custom-maintenance');

  const totalPriceWithoutMultiplier = computed(() => {
    let base = currentType.value?.basePrice || 0;
    
    // Logic: If user picks "The Core/Foundation", they pay a premium for individual features
    // Compared to choosing a pre-configured bundle.
    // BUT: If they are ordering a Micro-Service or Custom Maintenance, no premium multiplier applies.
    const isFoundation = currentType.value?.id?.startsWith('foundation-');
    const featureMultiplier = (isFoundation && !isMicro.value) ? 1.25 : 1.0; // Hardcoded multiplier for now

    let featuresTotal = selectedFeatures.value.reduce(
      (acc, id) => {
        // Skip calculation if the feature is already included in the package base price
        if (currentType.value?.includedFeatureIds?.includes(id)) return acc;

        const price = getFeaturePrice(id);
        return acc + (price * featureMultiplier);
      },
      0
    );
    return base + featuresTotal;
  });

  const totalPriceBeforeDiscount = computed(() => {
    return totalPriceWithoutMultiplier.value * timelineMultiplier.value;
  });

  const activeCoupon = computed(() => {
    if (!discountCode.value || availableCoupons.value.length === 0) return null;
    
    // Find in fetched coupons from Supabase
    const coupon = availableCoupons.value.find(
      (c) => c.code.toUpperCase() === discountCode.value.trim().toUpperCase()
    );
    
    if (!coupon) return null;

    // Supabase fields use camelCase via service mapper
    if (!coupon.isActive) return null;
    
    const today = new Date();
    const expiry = new Date(coupon.expiryDate);
    if (today > expiry) return null; // Expired

    if (coupon.minOrder && totalPriceBeforeDiscount.value < coupon.minOrder) return null;
    if (coupon.isGlobal) return coupon;

    // Check allow lists...
    return coupon;
  });

  const discountAmount = computed(() => {
    if (!activeCoupon.value) return 0;
    
    let discount = 0;
    if (activeCoupon.value.type === "percent") {
      discount = (totalPriceBeforeDiscount.value * activeCoupon.value.value) / 100;
      // Cap maximum discount
      if (activeCoupon.value.maxDiscount && discount > activeCoupon.value.maxDiscount) {
        discount = activeCoupon.value.maxDiscount;
      }
    } else {
      discount = activeCoupon.value.value;
    }
    
    return discount;
  });

  const totalPrice = computed(() => {
    return Math.max(0, totalPriceBeforeDiscount.value - discountAmount.value);
  });

  const totalBundleSavings = computed(() => {
    if (!currentType.value || currentType.value.id.startsWith('foundation-')) return 0;

    // Logic: What would this cost if built manually?
    // 1. Identify Foundation Fee based on project category
    const isSystem = currentType.value.serviceId === 'business-system' || currentType.value.serviceId === 'saas-accelerator';
    const foundationFee = isSystem ? defaultConfig.foundationPrices.system : defaultConfig.foundationPrices.web;

    // 2. Sum of all features that are included in this bundle
    const includedFeaturesValue = (currentType.value.includedFeatureIds || []).reduce((acc, id) => {
      // Use helper which uses dynamic features
      return acc + getFeaturePrice(id);
    }, 0);

    // 3. Manual Build Price (Foundation + Features) * Multiplier
    const manualPrice = (foundationFee + includedFeaturesValue) * defaultConfig.featurePremiumMultiplier;

    // 4. Savings = Manual Price - Bundle Base Price
    // Plus any original price difference if specified manually in projects.ts
    const baseSavings = Math.max(0, manualPrice - (currentType.value.basePrice || 0));
    const marketSavings = Math.max(0, (currentType.value.originalPrice || 0) - (currentType.value.basePrice || 0));

    return Math.max(baseSavings, marketSavings);
  });

  // Watcher: Global Logic application
  // Whenever project type changes (from anywhere), clean up invalid features
  watch(selectedType, (newId) => {
    // Use .value because projectTypes is a Ref
    const newType = projectTypes.value.find((t) => t.id === newId);
    if (!newType) return;

    selectedFeatures.value = selectedFeatures.value.filter((featId) => {
      // Use dynamic features ref
      const featureDef = features.value.find((f) => f.id === featId);
      // If feature not found (or relevantTo missing), keep it safe or remove? 
      // Safe to keep if unknown, but logic says remove if not relevant.
      if (!featureDef) return true; 

      return featureDef.relevantTo.includes(newType.serviceId);
    });
  });

  const selectType = (id: string) => {
    selectedType.value = id;
  };

  const selectStyle = (id: string) => {
    selectedStyle.value = id;
  };
  const selectTimeline = (id: string) => {
    selectedTimeline.value = id;
  };

  const toggleFeature = (id: string) => {
    const idx = selectedFeatures.value.indexOf(id);
    idx === -1
      ? selectedFeatures.value.push(id)
      : selectedFeatures.value.splice(idx, 1);
  };

  return {
    selectedType,
    selectedStyle,
    selectedFeatures,
    selectedTimeline,
    currentType,
    currentStyle,
    currentTimeline,
    totalPrice,
    totalPriceBeforeDiscount,
    totalPriceWithoutMultiplier,
    totalBundleSavings,
    isMicro,
    timelineMultiplier,
    discountCode,
    activeCoupon,
    discountAmount,
    selectType,
    selectStyle,
    selectTimeline,
    toggleFeature,
    applyDiscount: (code: string) => discountCode.value = code,
    availableCoupons,
    features, 
    styles,   
    timelines, 
    projectTypes: computed(() => projectTypes.value),
    serviceTypes: serviceTypes,
    getFeatureName,
    getFeaturePrice,
    formatPrice,
  };
}
