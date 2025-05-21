
import React, { createContext, useState, useContext, useEffect } from "react";
import { SubscriptionTier, UserSubscription, SubscriptionBenefits } from "@/types/subscription";
import { useAuth } from "@/context/AuthContext";
import { getSubscriptionBenefits } from "@/data/subscriptionService";
import { toast } from "sonner";

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

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [remainingRentals, setRemainingRentals] = useState<number>(0);
  
  // Mock subscription for demo purposes - in a real app, this would come from a backend
  useEffect(() => {
    if (isAuthenticated && user) {
      // Try to load from localStorage
      const savedSubscription = localStorage.getItem("userSubscription");
      
      if (savedSubscription) {
        try {
          const parsedSubscription = JSON.parse(savedSubscription) as UserSubscription;
          setUserSubscription(parsedSubscription);
          
          // Initialize remaining rentals
          if (parsedSubscription.active) {
            const benefits = getSubscriptionBenefits(parsedSubscription.tier);
            setRemainingRentals(benefits.freeRentalsPerMonth);
          }
        } catch (e) {
          console.error("Failed to parse subscription data", e);
        }
      }
    } else {
      setUserSubscription(null);
    }
  }, [isAuthenticated, user]);
  
  const isSubscribed = Boolean(userSubscription?.active);
  const currentTier = userSubscription?.active ? userSubscription.tier : null;
  const benefits = getSubscriptionBenefits(currentTier || 'basic');
  
  const subscribe = async (planId: string): Promise<boolean> => {
    // In a real app, this would call an API to create a subscription
    try {
      // Extract tier from planId (e.g., "premium-monthly" -> "premium")
      const tier = planId.split('-')[0] as SubscriptionTier;
      
      const today = new Date();
      const endDate = new Date();
      
      // Set end date based on billing cycle
      if (planId.includes('yearly')) {
        endDate.setFullYear(today.getFullYear() + 1);
      } else {
        endDate.setMonth(today.getMonth() + 1);
      }
      
      const newSubscription: UserSubscription = {
        userId: user?.id || '',
        tier,
        active: true,
        startDate: today.toISOString(),
        endDate: endDate.toISOString(),
        autoRenew: true,
      };
      
      setUserSubscription(newSubscription);
      localStorage.setItem("userSubscription", JSON.stringify(newSubscription));
      
      // Set initial free rentals
      const newBenefits = getSubscriptionBenefits(tier);
      setRemainingRentals(newBenefits.freeRentalsPerMonth);
      
      toast.success(`You've successfully subscribed to the ${tier} plan!`);
      return true;
    } catch (error) {
      console.error("Failed to create subscription:", error);
      toast.error("Failed to create subscription. Please try again.");
      return false;
    }
  };
  
  const cancelSubscription = async (): Promise<boolean> => {
    try {
      if (!userSubscription) return false;
      
      const updatedSubscription = {
        ...userSubscription,
        active: false,
        autoRenew: false
      };
      
      setUserSubscription(updatedSubscription);
      localStorage.setItem("userSubscription", JSON.stringify(updatedSubscription));
      
      toast.success("Your subscription has been canceled");
      return true;
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      toast.error("Failed to cancel subscription. Please try again.");
      return false;
    }
  };
  
  const upgradeSubscription = async (newTier: SubscriptionTier): Promise<boolean> => {
    try {
      if (!userSubscription) return false;
      
      const updatedSubscription = {
        ...userSubscription,
        tier: newTier,
      };
      
      setUserSubscription(updatedSubscription);
      localStorage.setItem("userSubscription", JSON.stringify(updatedSubscription));
      
      // Update remaining rentals based on new tier
      const newBenefits = getSubscriptionBenefits(newTier);
      setRemainingRentals(newBenefits.freeRentalsPerMonth);
      
      toast.success(`Your subscription has been upgraded to ${newTier}`);
      return true;
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
      toast.error("Failed to upgrade subscription. Please try again.");
      return false;
    }
  };
  
  return (
    <SubscriptionContext.Provider
      value={{
        userSubscription,
        isSubscribed,
        currentTier,
        benefits,
        remainingRentals,
        setRemainingRentals,
        subscribe,
        cancelSubscription,
        upgradeSubscription
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
