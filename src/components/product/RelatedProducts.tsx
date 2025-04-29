
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Books</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
