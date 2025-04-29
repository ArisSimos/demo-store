
import React from 'react';
import { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <>
      {/* Book details */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {product.publisher && (
          <div>
            <span className="text-sm text-muted-foreground">Publisher:</span>
            <p>{product.publisher}</p>
          </div>
        )}
        {product.publicationDate && (
          <div>
            <span className="text-sm text-muted-foreground">Publication Date:</span>
            <p>{product.publicationDate}</p>
          </div>
        )}
        {product.isbn && (
          <div>
            <span className="text-sm text-muted-foreground">ISBN:</span>
            <p>{product.isbn}</p>
          </div>
        )}
        {product.pages && (
          <div>
            <span className="text-sm text-muted-foreground">Pages:</span>
            <p>{product.pages}</p>
          </div>
        )}
        {product.format && (
          <div>
            <span className="text-sm text-muted-foreground">Format:</span>
            <p className="capitalize">{product.format}</p>
          </div>
        )}
        {product.duration && (
          <div>
            <span className="text-sm text-muted-foreground">Duration:</span>
            <p>{product.duration}</p>
          </div>
        )}
        {product.narrator && (
          <div>
            <span className="text-sm text-muted-foreground">Narrator:</span>
            <p>{product.narrator}</p>
          </div>
        )}
      </div>
      
      {/* Status */}
      <div className="mb-6">
        <p className="flex items-center">
          <span className="mr-2">Status:</span>
          {product.inStock ? (
            <span className="text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-red-600 font-medium">Out of Stock</span>
          )}
        </p>
      </div>
      
      {/* Description */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </>
  );
};

export default ProductDetails;
