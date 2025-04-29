
import React from 'react';

interface ProductImageContainerProps {
  src: string;
  alt: string;
}

const ProductImageContainer: React.FC<ProductImageContainerProps> = ({ src, alt }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto object-cover object-center"
      />
    </div>
  );
};

export default ProductImageContainer;
