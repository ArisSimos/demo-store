
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';
import { Product, Category } from '@/types';

export interface ProductInfoProps {
  product: Product;
  category?: Category;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, category }) => {
  const isOnSale = product.salePrice && product.salePrice < product.price;
  
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {category && (
          <Badge variant="outline" className="text-xs">
            {category.name}
          </Badge>
        )}
        
        {product.author && (
          <span className="text-sm text-muted-foreground">
            by <a href={`/author/${encodeURIComponent(product.author)}`} className="hover:underline">{product.author}</a>
          </span>
        )}
        
        <div className="flex items-center text-sm text-amber-500">
          <Star className="h-4 w-4 mr-1 fill-current" />
          <span>4.5 (120 reviews)</span>
        </div>
      </div>
      
      <div className="flex items-baseline mb-6">
        {isOnSale ? (
          <>
            <span className="text-2xl font-bold text-primary mr-2">
              ${product.salePrice.toFixed(2)}
            </span>
            <span className="text-lg line-through text-muted-foreground">
              ${product.price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
        )}
        
        {isOnSale && (
          <Badge variant="destructive" className="ml-2">
            Sale
          </Badge>
        )}
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Clock className="h-4 w-4 mr-1" />
        <span>
          {product.inStock 
            ? 'In Stock - Ships within 1-2 business days' 
            : 'Out of Stock - Available for backorder'}
        </span>
      </div>
      
      {product.bulkDiscount && (
        <div className="mt-2 p-2 bg-muted/50 border rounded-md">
          <p className="text-sm font-medium">
            Buy {product.bulkDiscount.threshold} or more and save {product.bulkDiscount.discountPercentage}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
