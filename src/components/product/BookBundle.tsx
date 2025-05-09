
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface BookBundleProps {
  title: string;
  description: string;
  products: Product[];
  discountPercentage: number;
}

const BookBundle: React.FC<BookBundleProps> = ({ 
  title, 
  description, 
  products, 
  discountPercentage 
}) => {
  const { addToCart } = useCart();
  
  const originalPrice = products.reduce((sum, product) => 
    sum + (product.salePrice || product.price), 0);
    
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  
  const handleAddBundleToCart = () => {
    products.forEach(product => addToCart(product));
    
    // Show toast notification through useCart's internal toast system
  };
  
  return (
    <div className="p-6 border rounded-lg mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center">
            <Package className="mr-2 h-5 w-5" />
            {title}
          </h3>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center">
          <Percent className="mr-1 h-4 w-4" />
          <span className="font-medium">{discountPercentage}% OFF</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {products.map(product => (
          <Link 
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-center p-2 hover:bg-muted/50 rounded-md"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-12 h-16 object-cover rounded mr-3" 
            />
            <div>
              <p className="font-medium line-clamp-1">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                ${(product.salePrice || product.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Bundle Price:</p>
          <div className="flex items-baseline">
            <span className="text-xl font-bold mr-2">${discountedPrice.toFixed(2)}</span>
            <span className="text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Button onClick={handleAddBundleToCart}>
          Add Bundle to Cart
        </Button>
      </div>
    </div>
  );
};

export default BookBundle;
