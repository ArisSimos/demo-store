
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { getCategoryById } from '@/data/products';

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
            className="product-image"
          />
          {product.salePrice && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold">
              SALE
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
          className="btn-cart"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
