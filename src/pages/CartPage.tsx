
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ticket, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateCoupon } from '@/data/products';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/context/SubscriptionContext';

const CartPage: React.FC = () => {
  const { 
    items, 
    clearCart, 
    subtotal, 
    grandTotal, 
    applyCoupon,
    bulkDiscountTotal,
    membershipDiscountTotal,
    couponDiscount
  } = useCart();
  const { isSubscribed, currentTier } = useSubscription();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    const coupon = validateCoupon(couponCode);
    if (coupon) {
      setCouponError('');
      applyCoupon(coupon);
      
      if (coupon.discountType === 'percentage') {
        toast({
          title: "Coupon Applied!",
          description: `You got ${coupon.discountValue}% off!`,
        });
      } else if (coupon.discountType === 'fixed') {
        toast({
          title: "Coupon Applied!",
          description: `You got $${coupon.discountValue} off!`,
        });
      }
    } else {
      applyCoupon(null);
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                  />
                ))}
                <Button variant="destructive" onClick={() => clearCart()} className="mt-4">
                  Clear Cart
                </Button>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {bulkDiscountTotal > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Bulk Discount:</span>
                      <span className="font-semibold text-green-600">
                        -${bulkDiscountTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  {membershipDiscountTotal > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                        Member Discount:
                      </span>
                      <span className="font-semibold text-amber-600">
                        -${membershipDiscountTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  {couponDiscount > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Coupon Discount:</span>
                      <span className="font-semibold text-green-600">
                        -${couponDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Shipping:</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">Total:</span>
                    <span className="font-bold text-xl">${grandTotal.toFixed(2)}</span>
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

                {/* Coupon */}
                <div className="mb-6">
                  <Input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="mb-2"
                  />
                  {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
                  <Button onClick={handleApplyCoupon} className="w-full">Apply Coupon</Button>
                </div>

                <Button asChild className="w-full">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                
                {!isSubscribed && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="text-sm text-amber-800">
                      <p className="font-medium flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Subscribe and save!
                      </p>
                      <p className="text-xs mt-1">
                        Join our membership program to get up to 15% off on all purchases, free rentals and more.
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full mt-2 border-amber-300 bg-white hover:bg-amber-100">
                        <Link to="/subscription">View Plans</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
