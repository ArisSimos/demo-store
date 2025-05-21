
import { SubscriptionPlan, SubscriptionTier, SubscriptionBenefits } from '@/types/subscription';

// Subscription plans data
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic-monthly',
    name: 'Basic',
    tier: 'basic',
    price: 4.99,
    billingCycle: 'monthly',
    description: 'Great for casual readers',
    features: [
      '5% discount on all purchases',
      '1 free book rental per month',
      'Access to member-only events'
    ]
  },
  {
    id: 'basic-yearly',
    name: 'Basic (Yearly)',
    tier: 'basic',
    price: 49.99,
    billingCycle: 'yearly',
    description: 'Great for casual readers',
    features: [
      '5% discount on all purchases',
      '1 free book rental per month',
      'Access to member-only events',
      'Save 16% compared to monthly billing'
    ]
  },
  {
    id: 'premium-monthly',
    name: 'Premium',
    tier: 'premium',
    price: 9.99,
    billingCycle: 'monthly',
    description: 'Perfect for book enthusiasts',
    popular: true,
    features: [
      '10% discount on all purchases',
      '3 free book rentals per month',
      'Free shipping on all orders',
      'Early access to new releases',
      'Access to premium reading lists'
    ]
  },
  {
    id: 'premium-yearly',
    name: 'Premium (Yearly)',
    tier: 'premium',
    price: 99.99,
    billingCycle: 'yearly',
    description: 'Perfect for book enthusiasts',
    popular: true,
    features: [
      '10% discount on all purchases',
      '3 free book rentals per month',
      'Free shipping on all orders',
      'Early access to new releases',
      'Access to premium reading lists',
      'Save 17% compared to monthly billing'
    ]
  },
  {
    id: 'ultimate-monthly',
    name: 'Ultimate',
    tier: 'ultimate',
    price: 19.99,
    billingCycle: 'monthly',
    description: 'The ultimate experience for bookworms',
    features: [
      '15% discount on all purchases',
      'Unlimited book rentals',
      'Free express shipping on all orders',
      'VIP access to author events',
      'Exclusive book club membership',
      'Personalized reading recommendations'
    ]
  },
  {
    id: 'ultimate-yearly',
    name: 'Ultimate (Yearly)',
    tier: 'ultimate',
    price: 199.99,
    billingCycle: 'yearly',
    description: 'The ultimate experience for bookworms',
    features: [
      '15% discount on all purchases',
      'Unlimited book rentals',
      'Free express shipping on all orders',
      'VIP access to author events',
      'Exclusive book club membership',
      'Personalized reading recommendations',
      'Save 17% compared to monthly billing'
    ]
  }
];

// Get benefits for a specific subscription tier
export const getSubscriptionBenefits = (tier: SubscriptionTier): SubscriptionBenefits => {
  switch (tier) {
    case 'basic':
      return {
        discountPercentage: 5,
        freeRentalsPerMonth: 1,
        freeShipping: false,
        exclusiveContent: false,
        earlyAccess: false,
        maxRentalDuration: 14 // 14 days max rental duration
      };
    case 'premium':
      return {
        discountPercentage: 10,
        freeRentalsPerMonth: 3,
        freeShipping: true,
        exclusiveContent: true,
        earlyAccess: false,
        maxRentalDuration: 21 // 21 days max rental duration
      };
    case 'ultimate':
      return {
        discountPercentage: 15,
        freeRentalsPerMonth: 999, // Unlimited (using a high number)
        freeShipping: true,
        exclusiveContent: true,
        earlyAccess: true,
        maxRentalDuration: 30 // 30 days max rental duration
      };
    default:
      return {
        discountPercentage: 0,
        freeRentalsPerMonth: 0,
        freeShipping: false,
        exclusiveContent: false,
        earlyAccess: false,
        maxRentalDuration: 7 // 7 days max rental duration for non-subscribers
      };
  }
};

// Get plans filtered by billing cycle
export const getPlansByBillingCycle = (cycle: 'monthly' | 'yearly'): SubscriptionPlan[] => {
  return subscriptionPlans.filter(plan => plan.billingCycle === cycle);
};

// Calculate price after subscription discount
export const calculatePriceWithSubscription = (
  originalPrice: number, 
  tier: SubscriptionTier | null
): number => {
  if (!tier) return originalPrice;
  
  const benefits = getSubscriptionBenefits(tier);
  return originalPrice * (1 - benefits.discountPercentage / 100);
};
