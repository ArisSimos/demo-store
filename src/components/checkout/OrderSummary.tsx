
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { CartItem } from '@/types';
import { Clock } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  grandTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, grandTotal }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.isRental ? item.rentalOptionId : 'purchase'}`} className="flex justify-between">
            <div>
              <span className="font-medium">{item.quantity} x </span>
              <span>{item.product.name}</span>
              {item.isRental && item.rentalDuration && (
                <div className="text-xs flex items-center text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.rentalDuration} day rental
                </div>
              )}
            </div>
            <span>
              ${((item.isRental && item.rentalPrice) 
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
        {subtotal !== grandTotal && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Discount</span>
            <span>-${(subtotal - grandTotal).toFixed(2)}</span>
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
      </div>
    </div>
  );
};

export default OrderSummary;
