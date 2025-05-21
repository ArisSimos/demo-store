
export type SubscriptionTier = 'basic' | 'premium' | 'ultimate';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  description: string;
  popular?: boolean;
}

export interface UserSubscription {
  userId: string;
  tier: SubscriptionTier;
  active: boolean;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod?: string;
}

export interface SubscriptionBenefits {
  discountPercentage: number;
  freeRentalsPerMonth: number;
  freeShipping: boolean;
  exclusiveContent: boolean;
  earlyAccess: boolean;
  maxRentalDuration: number;
}
