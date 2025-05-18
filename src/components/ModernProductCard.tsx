
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types';
import { getCategoryById } from '@/data/productService';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ModernProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const category = product.category ? getCategoryById(product.category) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    toast({
      description: `${product.name} added to cart!`,
      action: (
        <Link to="/cart" className="px-3 py-2 rounded-md bg-amber-800 text-white hover:bg-amber-700">
          View Cart
        </Link>
      ),
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({ description: `${product.name} removed from wishlist` });
    } else {
      addToWishlist(product);
      toast({ description: `${product.name} added to wishlist` });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 } 
      }}
      className="product-card group relative backdrop-blur-sm bg-white/80 dark:bg-amber-900/30 rounded-lg border border-amber-100 dark:border-amber-800/50 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-amber-50 dark:bg-amber-800/30">
          <motion.img 
            src={product.image} 
            alt={product.name} 
            className="product-image w-full h-full object-cover object-center" 
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {product.salePrice && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              SALE
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div 
              className="flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={handleAddToCart}
                className="bg-amber-800 hover:bg-amber-700 text-white rounded-full p-2 shadow-md"
                size="icon"
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={toggleWishlist}
                variant="outline"
                className={`border-white text-white hover:bg-white/20 rounded-full p-2 ${
                  isInWishlist(product.id) ? 'bg-red-500/30' : 'bg-transparent'
                }`}
                size="icon"
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              {category && (
                <span className="category-badge inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200 mb-1">
                  {category.name}
                </span>
              )}
              <h3 className="font-serif font-medium text-lg text-amber-900 dark:text-amber-100 line-clamp-2 hover:text-amber-700 dark:hover:text-amber-200 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {product.author ? product.author : 'Unknown Author'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-100 dark:border-amber-800/50">
            <div className="flex flex-col">
              {product.salePrice ? (
                <>
                  <span className="price-sale text-sm line-through text-muted-foreground dark:text-amber-400/70">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="price font-semibold text-lg text-amber-900 dark:text-amber-200">
                    ${product.salePrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="price font-semibold text-lg text-amber-900 dark:text-amber-200">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="text-sm text-amber-600 dark:text-amber-400">
              {product.rating && (
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? "text-amber-500" : "text-gray-300"}>★</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModernProductCard;
