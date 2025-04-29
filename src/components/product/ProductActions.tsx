
import React, { useState } from 'react';
import { Minus, Plus, Heart, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      {/* Quantity selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Quantity</h3>
        <div className="flex items-center">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-l border border-r-0"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-14 h-10 flex items-center justify-center border text-center">
            {quantity}
          </span>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-r border border-l-0"
            onClick={incrementQuantity}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="flex-1"
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button variant="outline" size="lg">
          <Heart className="mr-2 h-5 w-5" />
          Wishlist
        </Button>
        <Button variant="outline" size="icon" className="sm:flex-initial">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
