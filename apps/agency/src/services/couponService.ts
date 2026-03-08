import type { Coupon } from '@kangjessy/config';
export type { Coupon };

const mockCoupons: Coupon[] = [
  {
      id: 'coupon-1',
      code: 'WELCOME20',
      label: 'Welcome Bonus',
      desc: 'Diskon 20% untuk semua project baru',
      type: 'percent',
      value: 20,
      isActive: true,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      minOrder: 1000000,
      maxDiscount: 500000,
      isGlobal: true,
      allowedProjectIds: [],
      allowedFeatureIds: [],
      allowedTimelineIds: [],
      terms: 'Berlaku untuk user baru'
  }
];

export const couponService = {
  async validateCoupon(code: string) {
    const coupon = mockCoupons.find(c => c.code === code.toUpperCase() && c.isActive);
    return coupon || null;
  },

  async getAllActive() {
    return mockCoupons.filter(c => c.isActive);
  }
}
