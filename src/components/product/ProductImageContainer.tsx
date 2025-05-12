
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface ProductImageContainerProps {
  src: string;
  alt: string;
}

const ProductImageContainer: React.FC<ProductImageContainerProps> = ({ src, alt }) => {
  return (
    <div className="relative hover-book">
      <div className="flex">
        <div className="book-spine relative h-full z-10 rounded-l-sm overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* Book spine texture */}
            <div className="h-full w-full bg-gradient-to-b from-amber-800/20 via-transparent to-amber-800/20"></div>
          </div>
        </div>
        
        <div className="bg-white rounded-r-lg overflow-hidden border border-amber-200 shadow-md book-cover transform origin-left transition-transform duration-300">
          <AspectRatio ratio={3/4} className="w-full">
            <img 
              src={src} 
              alt={alt} 
              className="object-contain w-full h-full" 
            />
          </AspectRatio>
        </div>
      </div>
      
      {/* Book shadow effect */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/10 blur-md rounded-full"></div>
    </div>
  );
};

export default ProductImageContainer;
