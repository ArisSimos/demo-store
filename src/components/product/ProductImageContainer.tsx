
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface ProductImageContainerProps {
  src: string;
  alt: string;
}

const ProductImageContainer: React.FC<ProductImageContainerProps> = ({ src, alt }) => {
  return (
    <div className="bg-muted/30 rounded-lg overflow-hidden">
      <AspectRatio ratio={3/4} className="w-full">
        <img 
          src={src} 
          alt={alt} 
          className="object-contain w-full h-full" 
        />
      </AspectRatio>
    </div>
  );
};

export default ProductImageContainer;
