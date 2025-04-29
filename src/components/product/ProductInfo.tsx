
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Product, Category } from '@/types';

interface ProductInfoProps {
  product: Product;
  category: Category | undefined;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, category }) => {
  return (
    <div className="mb-6">
      {category && (
        <span className="category-badge mb-2">
          {category.name}
        </span>
      )}
      {product.format === 'audiobook' && (
        <span className="ml-2 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold inline-flex items-center">
          <BookOpen size={12} className="mr-1" />
          AUDIOBOOK
        </span>
      )}
      <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
      {product.author && (
        <p className="text-lg text-muted-foreground mt-1">by {product.author}</p>
      )}
      <div className="flex items-baseline mt-4">
        {product.salePrice ? (
          <>
            <span className="text-3xl font-bold mr-2">${product.salePrice.toFixed(2)}</span>
            <span className="price-sale text-lg">${product.price.toFixed(2)}</span>
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
              {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
