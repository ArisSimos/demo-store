
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { getCategoryById } from '@/data/productService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const category = getCategoryById(product.category);
  
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image h-64 w-full object-cover"
          />
          {product.salePrice && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold">
              SALE
            </div>
          )}
          {product.format === 'audiobook' && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-bold flex items-center">
              <BookOpen size={12} className="mr-1" />
              AUDIO
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2">
            {category && (
              <span className="category-badge mb-2">
                {category.name}
              </span>
            )}
          </div>
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          {product.author && (
            <p className="text-sm text-muted-foreground mb-2">by {product.author}</p>
          )}
          <div className="flex items-baseline mt-1 mb-3">
            {product.salePrice ? (
              <>
                <span className="price mr-2">${product.salePrice.toFixed(2)}</span>
                <span className="price-sale">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          variant="default" 
          className="btn-cart w-full"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
