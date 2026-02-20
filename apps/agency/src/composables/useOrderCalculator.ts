import { ref, computed, watch, onMounted } from "vue";
import { pricingConfig, roundPrice, DEFAULT_SETUP_FEE } from "../data/config/order/settings";
import { couponService, type Coupon } from "../services/couponService";
import { pricingService, type Feature, type ProjectType } from "../services/pricingService";

export function useOrderCalculator() {
  const selectedType = ref(""); // Kosong = belum pilih apapun (tidak auto-select)
  const selectedStyle = ref("minimalist-luxury");
  const selectedFeatures = ref<string[]>([]);
  const selectedTimeline = ref(""); // Kosong = belum pilih deadline/timeline
  
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
      const [
        fetchedCoupons, 
        fetchedFeatures, 
        fetchedProjectTypes, 
        fetchedServices,
        fetchedStyles,
        fetchedTimelines
      ] = await Promise.all([
        couponService.getAllActive(),
        pricingService.getAllFeatures(),
        pricingService.getAllProjectTypes(),
        pricingService.getAllServices(),
        pricingService.getAllStyles(),
        pricingService.getAllTimelines()
      ]);
      
      availableCoupons.value = fetchedCoupons;
      features.value = fetchedFeatures || [];
      projectTypes.value = fetchedProjectTypes || [];
      serviceTypes.value = fetchedServices || [];
      styles.value = fetchedStyles;
      timelines.value = fetchedTimelines;
    } catch (err) {
      console.error("Failed to fetch data from DB", err);
    }
  };

  onMounted(fetchData);
  const currentStyle = computed(() =>
    styles.value.find((s) => s.id === selectedStyle.value) || styles.value[0]
  );
  
  const currentTimeline = computed(() =>
    timelines.value.find((t) => t.id === selectedTimeline.value) || null
  );

  const timelineMultiplier = computed(() => currentTimeline.value?.multiplier || 1);

  const getFeaturePrice = (id: string) => features.value.find((f) => f.id === id)?.price || 0;
  const getFeatureName = (id: string) => features.value.find((f) => f.id === id)?.name || id;
  const formatPrice = (price: number) => new Intl.NumberFormat("id-ID").format(Math.round(price));

  const isMicro = computed(() => !!currentType.value?.isMicro || currentType.value?.id === 'fitur-rakitan');

  // --- AUTOMATED PRICING CORE LOGIC ---
  
  const calculateTieredPrice = (totalValue: number) => {
    const tier = pricingConfig.tieredDiscounts.find(t => totalValue >= t.threshold);
    const discount = tier ? tier.discount : 0;
    return totalValue * (1 - discount);
  };

  const calculateProjectTypePrice = (type: ProjectType) => {
    if (type.id === 'fitur-rakitan') return { base: 0, market: 0 };
    
    const includedIds = type.features || [];
    const marketValue = includedIds.reduce((acc, id) => {
      // Find feature price (use getFeaturePrice helper)
      const price = getFeaturePrice(id);
      // Hardcode starter-pack market value if not found in features library 
      // (safeguard for initialization phase)
      if (price === 0 && id === 'starter-pack') return acc + 1000000;
      return acc + price;
    }, 0);

    const discountedPrice = calculateTieredPrice(marketValue);
    
    return {
      base: Math.round(discountedPrice),
      market: Math.round(marketValue)
    };
  };

  const projectTypesWithPrices = computed(() => {
    return projectTypes.value.map(type => {
      const { base, market } = calculateProjectTypePrice(type);
      return {
        ...type,
        basePrice: base,
        originalPrice: market
      };
    });
  });

  const currentType = computed(() => {
    if (!selectedType.value) return null;
    return projectTypesWithPrices.value.find((t) => t.id === selectedType.value) || null;
  });

  const projectPriceData = computed(() => {
    if (!currentType.value) return { base: 0, market: 0 };
    return {
      base: currentType.value.basePrice || 0,
      market: currentType.value.originalPrice || 0
    };
  });

  const totalPriceWithoutMultiplier = computed(() => {
    let base = projectPriceData.value.base;
    
    // Add-on features: use EFFECTIVE price (includes per-feature setupFee if no Starter Pack)
    let addonsTotal = selectedFeatures.value.reduce((acc, id) => {
        if (currentType.value?.features?.includes(id)) return acc;
        return acc + getEffectiveAddOnPrice(id); // setupFee silently included
    }, 0);

    return base + addonsTotal;
  });

  // Per-feature effective price: bakes overhead into feature price (invisible to client)
  // If hasStarterPack → no overhead (Starter Pack already covers it)
  // If no Starter Pack → price + (feature.setupFee ?? DEFAULT_SETUP_FEE)
  const hasStarterPack = computed(() => {
    const bundled = currentType.value?.features || [];
    return bundled.some(id => id.trim().toLowerCase() === 'starter-pack');
  });

  const getEffectiveAddOnPrice = (id: string): number => {
    const feat = features.value.find(f => f.id === id);
    if (!feat) return 0;
    if (hasStarterPack.value) return feat.price; // No overhead for website packages
    const overhead = feat.setupFee !== undefined ? feat.setupFee : DEFAULT_SETUP_FEE;
    return feat.price + overhead;
  };

  const getFeatureOriginalPrice = (id: string): number | undefined => {
    const feat = features.value.find(f => f.id === id);
    if (!feat) return undefined;
    if (hasStarterPack.value) return feat.originalPrice;
    
    // For maintenance, if has originalPrice, we also add setupFee to it to keep discount gap consistent
    if (feat.originalPrice) {
      const overhead = feat.setupFee !== undefined ? feat.setupFee : DEFAULT_SETUP_FEE;
      return feat.originalPrice + overhead;
    }
    return undefined;
  };

  // Effective features array: prices include overhead for maintenance context
  // Used by OrderStep1 Library Fitur to display consistent effective prices
  const effectiveFeatures = computed(() =>
    features.value.map(feat => {
      if (hasStarterPack.value) return feat;
      const overhead = feat.setupFee !== undefined ? feat.setupFee : DEFAULT_SETUP_FEE;
      const newPrice = feat.price + overhead;
      const newOriginalPrice = feat.originalPrice ? feat.originalPrice + overhead : undefined;
      return { ...feat, price: newPrice, originalPrice: newOriginalPrice };
    })
  );

  const totalPriceBeforeDiscount = computed(() => {
    return totalPriceWithoutMultiplier.value * timelineMultiplier.value;
  });

  const activeCoupon = computed(() => {
    if (!discountCode.value || availableCoupons.value.length === 0) return null;
    const coupon = availableCoupons.value.find(
      (c) => c.code.toUpperCase() === discountCode.value.trim().toUpperCase()
    );
    if (!coupon || !coupon.isActive) return null;
    
    const expiry = new Date(coupon.expiryDate);
    if (new Date() > expiry) return null;

    if (coupon.minOrder && totalPriceBeforeDiscount.value < coupon.minOrder) return null;
    return coupon;
  });

  const discountAmount = computed(() => {
    if (!activeCoupon.value) return 0;
    let disc = activeCoupon.value.type === "percent" 
      ? (totalPriceBeforeDiscount.value * activeCoupon.value.value) / 100 
      : activeCoupon.value.value;
    
    if (activeCoupon.value.maxDiscount && disc > activeCoupon.value.maxDiscount) disc = activeCoupon.value.maxDiscount;
    return disc;
  });

  const totalPrice = computed(() => {
    const raw = Math.max(0, totalPriceBeforeDiscount.value - discountAmount.value);
    return roundPrice(raw);
  });

  const rawTotalForRounding = computed(() =>
    Math.max(0, totalPriceBeforeDiscount.value - discountAmount.value)
  );
  const roundingSavings = computed(() =>
    Math.max(0, rawTotalForRounding.value - totalPrice.value)
  );

  const totalBundleSavings = computed(() => {
    // 1. Bundle savings = selisih market value vs discounted base (untuk project type)
    const bundleSavings = Math.max(0, projectPriceData.value.market - projectPriceData.value.base);
    
    // 2. Add-on savings = selisih originalPrice vs effectivePrice untuk setiap add-on pilihan
    const addonsSavings = selectedFeatures.value.reduce((acc, id) => {
        if (currentType.value?.features?.includes(id)) return acc; // Lewati jika sudah masuk bundle
        const orig = getFeatureOriginalPrice(id);
        const price = getEffectiveAddOnPrice(id);
        if (orig && orig > price) return acc + (orig - price);
        return acc;
    }, 0);

    // 3. Tambahkan rounding savings (pembulatan ke bawah = hemat klien)
    return bundleSavings + addonsSavings + roundingSavings.value;
  });

  // Cleanup selected features when type changes
  watch(selectedType, (newId) => {
    if (!newId) {
      selectedFeatures.value = []; // Reset fitur jika type dikosongkan
      return;
    }
    const newType = projectTypes.value.find((t) => t.id === newId);
    if (!newType) return;
    selectedFeatures.value = selectedFeatures.value.filter((featId) => {
      const feat = features.value.find((f) => f.id === featId);
      return feat ? feat.relevantTo.includes(newType.serviceId) : true;
    });
  });

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
    selectType: (id: string) => selectedType.value = id,
    selectStyle: (id: string) => selectedStyle.value = id,
    selectTimeline: (id: string) => selectedTimeline.value = id,
    toggleFeature: (id: string) => {
        const idx = selectedFeatures.value.indexOf(id);
        idx === -1 ? selectedFeatures.value.push(id) : selectedFeatures.value.splice(idx, 1);
    },
    applyDiscount: (code: string) => discountCode.value = code,
    availableCoupons,
    features, 
    styles,   
    timelines, 
    projectTypes: computed(() => projectTypesWithPrices.value),
    serviceTypes,
    getFeatureName,
    getFeaturePrice,
    formatPrice,
    getEffectiveAddOnPrice,
    getFeatureOriginalPrice,
    effectiveFeatures,
  };
}
