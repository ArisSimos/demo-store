
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen, Heart, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getCategoryById } from '@/data/productService';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  showWishlistButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showWishlistButton = true }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const category = getCategoryById(product.category);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    toast.success(`${product.name} added to cart`);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  
  const productInCart = isInCart(product.id);
  const isRentable = product.rentalOptions && product.rentalOptions.length > 0;
  
  return (
    <div 
      className="product-card relative group rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showWishlistButton && (
        <button 
          className="absolute top-2 right-2 z-10 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
          }}
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
          />
        </button>
      )}
      
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <div
            className="bg-cover bg-center w-full h-64 transform transition-transform duration-500"
            style={{ 
              backgroundImage: `url(${product.image})`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          ></div>
          {product.salePrice && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold shadow-sm">
              SALE
            </div>
          )}
          {product.format === 'audiobook' && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-bold flex items-center shadow-sm">
              <BookOpen size={12} className="mr-1" />
              AUDIO
            </div>
          )}
          {isRentable && (
            <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center shadow-sm">
              <Clock size={12} className="mr-1" />
              RENTABLE
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2 min-h-[24px]">
            {category && (
              <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {category.name}
              </span>
            )}
          </div>
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          {product.author && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">by {product.author}</p>
          )}
          <div className="flex items-baseline mt-1 mb-3">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold mr-2">${product.salePrice.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          variant={productInCart ? "secondary" : "default"}
          className={`w-full transition-all ${isAdding ? 'bg-green-600' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          aria-label={product.inStock ? "Add to Cart" : "Out of Stock"}
        >
          {isAdding ? (
            <>
              <Check size={16} className="animate-bounce" />
              Added!
            </>
          ) : productInCart ? (
            <>
              <ShoppingCart size={16} className="mr-2" />
              In Cart
            </>
          ) : (
            <>
              <ShoppingCart size={16} className="mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
