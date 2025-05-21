
import React, { useState } from 'react';
import { Minus, Plus, Heart, ShoppingCart, Share2, Percent, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, RentalOption } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'buy' | 'rent'>('buy');
  const [selectedRentalOption, setSelectedRentalOption] = useState<string | null>(
    product.rentalOptions && product.rentalOptions.length > 0 ? product.rentalOptions[0].id : null
  );
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (purchaseType === 'buy') {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart`);
    } else if (purchaseType === 'rent' && selectedRentalOption) {
      const rentalOption = product.rentalOptions?.find(option => option.id === selectedRentalOption);
      if (rentalOption) {
        addToCart(product, quantity, {
          isRental: true,
          rentalOptionId: rentalOption.id,
          rentalDuration: rentalOption.durationDays,
          rentalPrice: rentalOption.price
        });
        toast.success(`${product.name} added to cart for ${rentalOption.label} rental`);
      }
    }
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
        toast("Sharing failed", {
          description: "Could not share this product."
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied!", {
        description: "Product link copied to clipboard."
      });
    }
  };

  // Calculate potential savings from bulk discount
  const showBulkDiscount = purchaseType === 'buy' && product.bulkDiscount && quantity >= product.bulkDiscount.threshold;
  const bulkDiscountAmount = showBulkDiscount
    ? ((product.salePrice || product.price) * quantity * product.bulkDiscount!.discountPercentage) / 100
    : 0;
  
  // Get current price based on purchase type
  const getBasePrice = () => {
    if (purchaseType === 'rent' && selectedRentalOption) {
      const rentalOption = product.rentalOptions?.find(option => option.id === selectedRentalOption);
      return rentalOption ? rentalOption.price : 0;
    }
    return product.salePrice || product.price;
  };
  
  const basePrice = getBasePrice();
  const originalPrice = basePrice * quantity;
  const finalPrice = purchaseType === 'buy' ? originalPrice - bulkDiscountAmount : originalPrice;

  // Check if product has rental options
  const hasRentalOptions = product.rentalOptions && product.rentalOptions.length > 0;
  
  return (
    <div>
      {/* Bulk discount badge */}
      {product.bulkDiscount && purchaseType === 'buy' && (
        <div className="mb-4 bg-primary/10 text-primary p-3 rounded-md flex items-center">
          <Percent className="mr-2 h-5 w-5" />
          <span>
            Buy {product.bulkDiscount.threshold}+ and get {product.bulkDiscount.discountPercentage}% off!
          </span>
        </div>
      )}

      {/* Purchase type selector */}
      {hasRentalOptions && (
        <div className="mb-6">
          <Tabs 
            defaultValue="buy" 
            value={purchaseType}
            onValueChange={(value) => setPurchaseType(value as 'buy' | 'rent')}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="rent">Rent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy" className="pt-4">
              <p className="text-sm text-muted-foreground">
                Purchase and own this book forever.
              </p>
            </TabsContent>
            
            <TabsContent value="rent" className="pt-4">
              {product.rentalOptions && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Rent this book for a limited time period.
                  </p>
                  
                  <RadioGroup 
                    value={selectedRentalOption || ''}
                    onValueChange={setSelectedRentalOption}
                    className="flex flex-col space-y-2"
                  >
                    {product.rentalOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50">
                        <RadioGroupItem value={option.id} id={`rental-${option.id}`} />
                        <Label htmlFor={`rental-${option.id}`} className="flex w-full justify-between cursor-pointer">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            {option.label}
                          </span>
                          <span className="font-semibold">${option.price.toFixed(2)}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </TabsContent>
          </Tabs>
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
          <span>
            {purchaseType === 'buy' ? 'Price' : 'Rental Price'} × {quantity}
          </span>
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
          disabled={!product.inStock || (purchaseType === 'rent' && !selectedRentalOption)}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {purchaseType === 'buy' ? 'Add to Cart' : 'Rent Now'}
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
