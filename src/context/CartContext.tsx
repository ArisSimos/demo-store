
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '@/types';
import { toast } from 'sonner';
import { calculateBulkDiscount } from '@/data/products';
import { useSubscription } from './SubscriptionContext';
import { calculatePriceWithSubscription } from '@/data/subscriptionService';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, rentalInfo?: {
    isRental: boolean;
    rentalOptionId: string;
    rentalDuration: number;
    rentalPrice: number;
  }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon | null) => void;
  couponDiscount: number;
  bulkDiscountTotal: number;
  membershipDiscountTotal: number;
  grandTotal: number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const { isSubscribed, currentTier, remainingRentals, setRemainingRentals } = useSubscription();
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon));
      } catch (e) {
        console.error('Failed to parse coupon from localStorage', e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('appliedCoupon');
    }
  }, [appliedCoupon]);
  
  const addToCart = (product: Product, quantity = 1, rentalInfo?: {
    isRental: boolean;
    rentalOptionId: string;
    rentalDuration: number;
    rentalPrice: number;
  }) => {
    setItems(prevItems => {
      // For rental items, we treat them as separate items even if the product is the same
      const isRental = !!rentalInfo?.isRental;
      const rentalOptionId = rentalInfo?.rentalOptionId;
      
      // Check if this is a free rental from membership
      let useFreeRental = false;
      if (isRental && isSubscribed && remainingRentals > 0) {
        useFreeRental = true;
        setRemainingRentals(remainingRentals - 1);
      }
      
      // Find existing item - for rentals, we check both product ID and rental option ID
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && 
        ((!isRental && !item.isRental) || (isRental && item.isRental && item.rentalOptionId === rentalOptionId))
      );
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        
        toast('Cart updated', {
          description: `${product.name} quantity updated in your cart.`
        });
        
        return updatedItems;
      } else {
        // New item
        const rentalPrice = useFreeRental ? 0 : rentalInfo?.rentalPrice;
        
        const newItem: CartItem = {
          product,
          quantity,
          ...(isRental ? {
            isRental: true,
            rentalOptionId: rentalInfo.rentalOptionId,
            rentalDuration: rentalInfo.rentalDuration,
            rentalPrice
          } : {})
        };
        
        if (useFreeRental) {
          toast('Added to cart', {
            description: `${product.name} (free rental) added to your cart.`
          });
        } else {
          toast('Added to cart', {
            description: `${product.name} ${isRental ? '(rental)' : ''} added to your cart.`
          });
        }
        
        return [...prevItems, newItem];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.product.id === productId);
      if (removedItem) {
        toast('Removed from cart', {
          description: `${removedItem.product.name} removed from your cart.`
        });
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    toast('Cart cleared', {
      description: 'All items have been removed from your cart.'
    });
    setItems([]);
    setAppliedCoupon(null);
  };
  
  const applyCoupon = (coupon: Coupon | null) => {
    setAppliedCoupon(coupon);
  };

  // Add isInCart method implementation
  const isInCart = (productId: string): boolean => {
    return items.some(item => item.product.id === productId);
  };
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate regular subtotal
  const subtotal = items.reduce((total, item) => {
    if (item.isRental && item.rentalPrice !== undefined) {
      return total + (item.rentalPrice * item.quantity);
    } else {
      return total + ((item.product.salePrice || item.product.price) * item.quantity);
    }
  }, 0);

  // Calculate bulk discounts (only for purchase items, not rentals)
  const bulkDiscountTotal = items.reduce((total, item) => {
    if (!item.isRental) {
      return total + calculateBulkDiscount(item.product, item.quantity);
    }
    return total;
  }, 0);
  
  // Calculate membership discount (only for purchase items, not rentals)
  const membershipDiscountTotal = isSubscribed && currentTier ? items.reduce((total, item) => {
    if (!item.isRental) {
      const regularPrice = item.product.salePrice || item.product.price;
      const discountedPrice = calculatePriceWithSubscription(regularPrice, currentTier);
      const discount = (regularPrice - discountedPrice) * item.quantity;
      return total + discount;
    }
    return total;
  }, 0) : 0;
  
  // Calculate coupon discount
  const couponDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (subtotal * appliedCoupon.discountValue) / 100
      : Math.min(appliedCoupon.discountValue, subtotal)
    : 0;

  // Apply maximum discount if specified
  const finalCouponDiscount = appliedCoupon?.maxDiscountAmount
    ? Math.min(couponDiscount, appliedCoupon.maxDiscountAmount)
    : couponDiscount;
  
  // Calculate grand total
  const grandTotal = Math.max(0, subtotal - bulkDiscountTotal - membershipDiscountTotal - finalCouponDiscount);
  
  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    appliedCoupon,
    applyCoupon,
    couponDiscount: finalCouponDiscount,
    bulkDiscountTotal,
    membershipDiscountTotal,
    grandTotal,
    isInCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
