
import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { calculateBulkDiscount } from '@/data/productService';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Calculate any applicable bulk discount
  const bulkDiscount = item.product.bulkDiscount ? calculateBulkDiscount(item.product, item.quantity) : 0;
  const itemTotal = ((item.product.salePrice || item.product.price) * item.quantity) - bulkDiscount;

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(item.product.id, newQuantity);
    
    if (change > 0) {
      toast.success(`Increased quantity of ${item.product.name}`);
    } else if (change < 0 && newQuantity > 0) {
      toast.info(`Decreased quantity of ${item.product.name}`);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    removeItem(item.product.id);
    setConfirmOpen(false);
    setIsRemoving(false);
    toast.success(`${item.product.name} removed from cart`);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center py-4 border-b 
      ${isRemoving ? 'animate-shake bg-red-50' : ''}`}>
      <div className="flex items-center sm:w-1/2 mb-3 sm:mb-0">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
          <img 
            src={item.product.image} 
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="ml-4 flex flex-col">
          <div className="text-base font-medium">{item.product.name}</div>
          <div className="mt-1 text-sm text-gray-500">
            {item.product.author && <span>By {item.product.author}</span>}
          </div>
          <div className="mt-1 text-sm">
            {item.product.salePrice ? (
              <div className="flex items-center">
                <span className="font-medium text-primary">${item.product.salePrice.toFixed(2)}</span>
                <span className="ml-2 text-gray-500 line-through">${item.product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-medium">${item.product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex w-full sm:w-1/2 justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
            className="h-8 w-8 rounded-md"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="mx-3 w-8 text-center">
            {item.quantity}
          </span>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleQuantityChange(1)}
            className="h-8 w-8 rounded-md"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            {bulkDiscount > 0 && (
              <div className="text-xs text-green-600">Bulk discount: -${bulkDiscount.toFixed(2)}</div>
            )}
            <div className="font-medium">${itemTotal.toFixed(2)}</div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{item.product.name}" from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsRemoving(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartItem;
