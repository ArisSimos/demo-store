import React from "react";
import { SubscriptionTier, UserSubscription, SubscriptionBenefits } from "@/types/subscription";

interface SubscriptionContextType {
  userSubscription: UserSubscription | null;
  isSubscribed: boolean;
  currentTier: SubscriptionTier | null;
  benefits: SubscriptionBenefits;
  remainingRentals: number;
  setRemainingRentals: (value: number) => void;
  subscribe: (planId: string) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  upgradeSubscription: (newTier: SubscriptionTier) => Promise<boolean>;
}

export const SubscriptionContext = React.createContext<SubscriptionContextType | undefined>(undefined);
