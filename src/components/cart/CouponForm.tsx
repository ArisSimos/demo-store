
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Percent, Ticket } from 'lucide-react';
import { validateCoupon } from '@/data/products';
import { Coupon } from '@/types';
import { toast } from 'sonner';

interface CouponFormProps {
  onApplyCoupon: (coupon: Coupon) => void;
  appliedCoupon: Coupon | null;
  subtotal: number;
}

const CouponForm: React.FC<CouponFormProps> = ({ onApplyCoupon, appliedCoupon, subtotal }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast("Please enter a coupon code");
      return;
    }

    const coupon = validateCoupon(couponCode);
    
    if (!coupon) {
      toast("Invalid or expired coupon code", { 
        description: "Please check your code and try again."
      });
      return;
    }

    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      toast("Cannot apply coupon", { 
        description: `Your order must be at least $${coupon.minOrderValue.toFixed(2)} to use this coupon.` 
      });
      return;
    }

    onApplyCoupon(coupon);
    toast("Coupon applied successfully", { 
      description: `Discount: ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue.toFixed(2)}` }` 
    });
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null as unknown as Coupon);
    toast("Coupon removed");
  };

  return (
    <div className="bg-muted/30 p-4 rounded-lg mb-4">
      <h3 className="font-semibold mb-3 flex items-center">
        <Ticket className="mr-2 h-5 w-5" /> Coupon Code
      </h3>
      
      {appliedCoupon ? (
        <div>
          <div className="bg-primary/10 text-primary p-3 rounded-md mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <Percent className="mr-2 h-4 w-4" />
              <span className="font-semibold">{appliedCoupon.code}</span>
              <span className="ml-2">
                {appliedCoupon.discountType === 'percentage' 
                  ? `${appliedCoupon.discountValue}% off` 
                  : `$${appliedCoupon.discountValue.toFixed(2)} off`}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8" 
              onClick={handleRemoveCoupon}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input 
            placeholder="Enter coupon code" 
            value={couponCode} 
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleApplyCoupon}>Apply</Button>
        </div>
      )}
      
      <div className="mt-2 text-xs text-muted-foreground">
        <p>Try these codes: WELCOME10, FICTION20, AUDIO15, SUMMER5</p>
      </div>
    </div>
  );
};

export default CouponForm;
