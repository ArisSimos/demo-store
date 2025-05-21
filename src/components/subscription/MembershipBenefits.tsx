
import React from 'react';
import { Percent, Gift, Sparkles } from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MembershipBenefitsProps {
  productPrice: number;
}

const MembershipBenefits: React.FC<MembershipBenefitsProps> = ({ productPrice }) => {
  const { isSubscribed, benefits, currentTier } = useSubscription();
  
  if (!isSubscribed) {
    return (
      <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Become a Member</h3>
          <Badge variant="outline">Save up to 15%</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Subscribe to get discounts, free rentals, and more benefits.
        </p>
        <div className="text-sm mb-3">
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-primary" />
            <span>Up to 15% off on all books</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Gift className="h-4 w-4 text-primary" />
            <span>Free book rentals every month</span>
          </div>
        </div>
        <Button asChild size="sm" className="w-full mt-2">
          <Link to="/subscription">View Plans</Link>
        </Button>
      </div>
    );
  }
  
  // Calculate savings
  const discountedPrice = productPrice * (1 - benefits.discountPercentage / 100);
  const savings = productPrice - discountedPrice;
  
  return (
    <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium flex items-center">
          <Sparkles className="h-4 w-4 text-primary mr-1" />
          Member Benefits
        </h3>
        <Badge>{currentTier?.charAt(0).toUpperCase()}{currentTier?.slice(1)} Member</Badge>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Your discount:</span>
          <span className="font-medium text-green-600">{benefits.discountPercentage}% off</span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between">
            <span>You save:</span>
            <span className="font-medium text-green-600">${savings.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Free rentals remaining:</span>
          <span className="font-medium">
            {benefits.freeRentalsPerMonth === 999 ? "Unlimited" : `${benefits.freeRentalsPerMonth}`}
          </span>
        </div>
        
        {benefits.freeShipping && (
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
        )}
      </div>
      
      <Button variant="outline" size="sm" className="w-full mt-3" asChild>
        <Link to="/subscription">Manage Subscription</Link>
      </Button>
    </div>
  );
};

export default MembershipBenefits;
