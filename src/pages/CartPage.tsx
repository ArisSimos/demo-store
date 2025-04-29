
import React from 'react';
import { Trash2, ShoppingCart, Percent } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import CouponForm from '@/components/cart/CouponForm';

const CartPage: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    appliedCoupon,
    applyCoupon,
    couponDiscount,
    bulkDiscountTotal,
    grandTotal
  } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 bg-muted/30 border-b">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {items.map(item => {
                      const price = item.product.salePrice || item.product.price;
                      const total = price * item.quantity;
                      const bulkDiscount = item.product.bulkDiscount && item.quantity >= item.product.bulkDiscount.threshold
                        ? (price * item.quantity * item.product.bulkDiscount.discountPercentage) / 100
                        : 0;
                      
                      return (
                        <div key={item.product.id} className="p-4">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-6">
                              <div className="flex items-center">
                                <div className="w-16 h-16 flex-shrink-0 mr-4">
                                  <Link to={`/product/${item.product.id}`}>
                                    <img 
                                      src={item.product.image} 
                                      alt={item.product.name} 
                                      className="w-full h-full object-cover rounded"
                                    />
                                  </Link>
                                </div>
                                <div>
                                  <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary">
                                    {item.product.name}
                                  </Link>
                                  {item.product.author && (
                                    <p className="text-sm text-muted-foreground">
                                      by {item.product.author}
                                    </p>
                                  )}
                                  <button 
                                    className="text-xs text-destructive hover:text-destructive/80 mt-1 flex items-center"
                                    onClick={() => removeFromCart(item.product.id)}
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-span-2 text-center">
                              <span>${price.toFixed(2)}</span>
                              {item.product.salePrice && (
                                <span className="block text-xs line-through text-muted-foreground">
                                  ${item.product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            <div className="col-span-2 flex justify-center">
                              <div className="flex items-center border rounded-md">
                                <button 
                                  className="px-2 py-1 text-muted-foreground"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  className="w-12 h-8 text-center border-0"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                                />
                                <button 
                                  className="px-2 py-1 text-muted-foreground"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div className="col-span-2 text-right">
                              <span className="font-medium">${total.toFixed(2)}</span>
                              
                              {/* Show bulk discount if applicable */}
                              {bulkDiscount > 0 && (
                                <div className="text-xs text-green-600 mt-1 flex items-center justify-end">
                                  <Percent className="h-3 w-3 mr-1" />
                                  Save ${bulkDiscount.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="bg-card rounded-lg shadow-sm p-4 sticky top-20">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {bulkDiscountTotal > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Percent className="h-4 w-4 mr-1" />
                          Bulk Discount
                        </span>
                        <span>-${bulkDiscountTotal.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Ticket className="h-4 w-4 mr-1" />
                          Coupon Discount
                        </span>
                        <span>-${couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-2 mt-2 font-bold text-lg flex justify-between">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <CouponForm 
                    onApplyCoupon={applyCoupon}
                    appliedCoupon={appliedCoupon}
                    subtotal={subtotal}
                  />
                  
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-sm text-center">
                    <Link to="/coupons" className="text-primary hover:underline flex items-center justify-center">
                      <Ticket className="h-4 w-4 mr-1" />
                      View all available coupons
                    </Link>
                  </div>
                </div>
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
