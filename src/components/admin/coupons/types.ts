
// Define the coupon data structure
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate: string;
  isActive: boolean;
}

// Sample coupon data for development
export const SAMPLE_COUPONS: Coupon[] = [
  { 
    id: '1', 
    code: 'SUMMER20', 
    discountType: 'percentage', 
    discountValue: 20, 
    expiryDate: '2025-08-31',
    isActive: true
  },
  { 
    id: '2', 
    code: 'WELCOME10', 
    discountType: 'fixed', 
    discountValue: 10, 
    expiryDate: '2025-12-31',
    isActive: true
  },
  { 
    id: '3', 
    code: 'FLASH25', 
    discountType: 'percentage', 
    discountValue: 25, 
    expiryDate: '2025-06-01',
    isActive: false
  }
];
