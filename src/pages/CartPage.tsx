import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ticket } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateCoupon } from '@/data/products';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartPage: React.FC = () => {
  const { cartItems, clearCart, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    const coupon = validateCoupon(couponCode);
    if (coupon) {
      setCouponError('');
      if (coupon.discountType === 'percentage') {
        setDiscount(coupon.discountValue);
        toast({
          title: "Coupon Applied!",
          description: `You got ${coupon.discountValue}% off!`,
        })
      } else if (coupon.discountType === 'fixed') {
        setDiscount(coupon.discountValue);
        toast({
          title: "Coupon Applied!",
          description: `You got $${coupon.discountValue} off!`,
        })
      }
    } else {
      setDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };

  const totalPrice = getTotalPrice();
  const discountedPrice = totalPrice - (totalPrice * discount) / 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
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
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                  />
                ))}
                <Button variant="destructive" onClick={() => clearCart()}>Clear Cart</Button>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Discount:</span>
                    <span className="font-semibold">-{discount}%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Shipping:</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">Total:</span>
                    <span className="font-bold text-xl">${discountedPrice.toFixed(2)}</span>
                  </div>
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
