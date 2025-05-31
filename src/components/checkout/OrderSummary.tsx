import React from 'react';
import { Separator } from "@/components/ui/separator";
import { CartItem } from '@/types';
import { Clock, Sparkles } from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  grandTotal: number;
  bulkDiscountTotal?: number;
  membershipDiscountTotal?: number;
  couponDiscount?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  subtotal, 
  grandTotal,
  bulkDiscountTotal = 0,
  membershipDiscountTotal = 0,
  couponDiscount = 0
}) => {
  const { isSubscribed, currentTier } = useSubscription();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.isRental ? item.rentalOptionId : 'purchase'}`} className="flex justify-between">
            <div>
              <span className="font-medium">{item.quantity} x </span>
              <span>
                {item.isMembership
                  ? <span className="text-amber-700 font-semibold">{item.product.name}</span>
                  : item.product.name}
              </span>
              {item.isRental && item.rentalDuration && (
                <div className="text-xs flex items-center text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.rentalDuration} day rental
                  {item.rentalPrice === 0 && (
                    <span className="ml-1 text-green-600 font-medium">(Free with membership)</span>
                  )}
                </div>
              )}
            </div>
            <span>
              ${((item.isRental && item.rentalPrice !== undefined) 
                ? item.rentalPrice * item.quantity
                : (item.product.salePrice || item.product.price) * item.quantity
              ).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {bulkDiscountTotal > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Bulk Discount</span>
            <span>-${bulkDiscountTotal.toFixed(2)}</span>
          </div>
        )}
        
        {membershipDiscountTotal > 0 && (
          <div className="flex justify-between text-amber-600 dark:text-amber-400">
            <span className="flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              {currentTier?.charAt(0).toUpperCase()}{currentTier?.slice(1)} Discount
            </span>
            <span>-${membershipDiscountTotal.toFixed(2)}</span>
          </div>
        )}
        
        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Coupon Discount</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
        
        {isSubscribed && (
          <div className="mt-2 pt-2 border-t border-dashed border-gray-200 text-xs text-center text-muted-foreground">
            <div className="flex items-center justify-center">
              <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
              <span>{currentTier?.charAt(0).toUpperCase()}{currentTier?.slice(1)} Membership Benefits Applied</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
