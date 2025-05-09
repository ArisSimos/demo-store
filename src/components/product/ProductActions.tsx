
import React, { useState } from 'react';
import { Minus, Plus, Heart, ShoppingCart, Share2, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
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
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on BookHaven!`,
        url: window.location.href,
      }).catch(err => {
        toast({
          title: "Sharing failed",
          description: "Could not share this product.",
          variant: "destructive"
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard.",
      });
    }
  };

  // Calculate potential savings from bulk discount
  const showBulkDiscount = product.bulkDiscount && quantity >= product.bulkDiscount.threshold;
  const bulkDiscountAmount = showBulkDiscount
    ? ((product.salePrice || product.price) * quantity * product.bulkDiscount!.discountPercentage) / 100
    : 0;
  
  const originalPrice = (product.salePrice || product.price) * quantity;
  const finalPrice = originalPrice - bulkDiscountAmount;

  return (
    <div>
      {/* Bulk discount badge */}
      {product.bulkDiscount && (
        <div className="mb-4 bg-primary/10 text-primary p-3 rounded-md flex items-center">
          <Percent className="mr-2 h-5 w-5" />
          <span>
            Buy {product.bulkDiscount.threshold}+ and get {product.bulkDiscount.discountPercentage}% off!
          </span>
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-4">
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
      
      {/* Display price calculation */}
      <div className="mb-4 p-3 bg-muted/50 rounded-md">
        <div className="flex justify-between mb-1">
          <span>Price × {quantity}</span>
          <span>${originalPrice.toFixed(2)}</span>
        </div>
        
        {showBulkDiscount && (
          <div className="flex justify-between text-green-600 mb-1">
            <span>Bulk Discount ({product.bulkDiscount!.discountPercentage}%)</span>
            <span>-${bulkDiscountAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-bold pt-1 border-t border-muted-foreground/20">
          <span>Total</span>
          <span>${finalPrice.toFixed(2)}</span>
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
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
          />
          {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="sm:flex-initial"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
