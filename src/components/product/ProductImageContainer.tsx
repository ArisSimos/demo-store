
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface ProductImageContainerProps {
  src: string;
  alt: string;
}

const ProductImageContainer: React.FC<ProductImageContainerProps> = ({ src, alt }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 bottom-0 w-[12px] bg-gradient-to-r from-amber-800 to-amber-700 shadow-inner z-10"></div>
      <div className="bg-muted/30 rounded-lg overflow-hidden border border-amber-200 shadow-md pl-2">
        <AspectRatio ratio={3/4} className="w-full">
          <img 
            src={src} 
            alt={alt} 
            className="object-contain w-full h-full" 
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default ProductImageContainer;
