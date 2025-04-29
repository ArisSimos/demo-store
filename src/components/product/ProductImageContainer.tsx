
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ProductImageContainerProps {
  src: string;
  alt: string;
}

const ProductImageContainer: React.FC<ProductImageContainerProps> = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden relative group">
      {/* Zoom icon overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
        <div className="bg-white p-2 rounded-full">
          <Search className="h-5 w-5" />
        </div>
      </div>
      
      <div className="overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-auto object-cover object-center transition-transform duration-500 ${isZoomed ? 'scale-110' : ''}`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>
      
      {/* Thumbnail indicators - could be expanded later */}
      <div className="flex justify-center space-x-2 mt-2">
        <div className="h-2 w-10 bg-primary rounded-full"></div>
        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductImageContainer;
