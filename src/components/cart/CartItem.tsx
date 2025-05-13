
import React from 'react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeFromCart, updateQuantity }) => {
  const { product, quantity } = item;
  const price = product.salePrice || product.price;
  const totalPrice = price * quantity;
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    // Show confirmation toast using the proper typing for Sonner
    toast(
      <div className="flex flex-col space-y-2">
        <p>Remove "{product.name}" from cart?</p>
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toast.dismiss()}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => {
              removeFromCart(product.id);
              toast.dismiss();
              toast.success("Item removed from cart");
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-4">
      <div className="flex flex-1 items-center">
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-20 h-20 object-cover rounded"
          />
        </Link>
        <div className="ml-4">
          <Link to={`/product/${product.id}`} className="font-medium hover:underline">
            {product.name}
          </Link>
          <p className="text-sm text-gray-600">${price.toFixed(2)} each</p>
          {product.bulkDiscount && (
            <p className="text-xs text-green-600">
              Buy {product.bulkDiscount.threshold}+ and save {product.bulkDiscount.discountPercentage}%
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center mt-4 md:mt-0">
        <div className="flex items-center border rounded mr-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDecrement} 
            disabled={quantity <= 1}
            className="h-8 w-8"
            title="Decrease quantity"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-2 min-w-[20px] text-center">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleIncrement}
            className="h-8 w-8"
            title="Increase quantity"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRemove} 
            className="text-red-500 hover:text-red-700 h-8 w-8"
            title="Remove from cart"
            aria-label="Remove from cart"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
