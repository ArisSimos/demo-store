import React, { useState, useEffect } from "react";
import { SubscriptionTier, UserSubscription, SubscriptionBenefits } from "@/types/subscription";
import { useAuth } from "@/context/AuthContext";
import { getSubscriptionBenefits } from "@/data/subscriptionService";
import { toast } from "sonner";
import { SubscriptionContext } from "./SubscriptionContextValue";
import { useCart } from "@/context/CartContext"; // Import your cart context

export type SubscriptionContextType = {
  userSubscription: UserSubscription | null;
  isSubscribed: boolean;
  currentTier: SubscriptionTier | null;
  benefits: SubscriptionBenefits;
  remainingRentals: number;
  setRemainingRentals: React.Dispatch<React.SetStateAction<number>>;
  subscribe: (planId: string) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  upgradeSubscription: (newTier: SubscriptionTier) => Promise<boolean>;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [remainingRentals, setRemainingRentals] = useState<number>(0);
  const { addToCart } = useCart();

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

      // Check for user object
      if (!user) {
        console.error("No user found during subscription.");
        toast.error("You must be logged in to subscribe.");
        return false;
      }

      const newSubscription: UserSubscription = {
        userId: user.id,
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

      // Add membership to cart
      const membershipProduct = {
        id: `membership-${tier}`,
        name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Membership`,
        price: tier === "premium" ? 19.99 : 9.99, // Example: set price based on tier
        description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} membership subscription.`,
        image: "/membership.png", // Use a placeholder or membership image
        category: "membership",
        inStock: true,
        featured: false,
      };

      addToCart(membershipProduct, 1, {
        isRental: false,
        rentalOptionId: "",
        rentalDuration: 0,
        rentalPrice: 0,
      });

      // Send welcome email
      // Optionally send a welcome email here if email service is available.
      toast.success(`You've successfully subscribed to the ${tier} plan!`);

      await fetch('/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          tier,
          email: user.email,
        }),
      });

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

export function useSubscription() {
  const context = React.useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}

// useSubscription hook has been moved to a separate file for Fast Refresh compatibility.