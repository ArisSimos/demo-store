
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '@/data/productService';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface RecommendedBooksProps {
  currentProductId?: string;
  category?: string;
  author?: string;
  limit?: number;
  title?: string;
}

const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  currentProductId,
  category,
  author,
  limit = 4,
  title = "Recommended for You"
}) => {
  const allProducts = getAllProducts();
  
  // Filter out the current product and get recommendations based on parameters
  const getRecommendedProducts = (): Product[] => {
    let filteredProducts = allProducts.filter(product => 
      (!currentProductId || product.id !== currentProductId)
    );
    
    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }
    
    // Filter by author if provided
    if (author) {
      filteredProducts = filteredProducts.filter(product => 
        product.author && product.author.includes(author)
      );
    }
    
    // If no products match the criteria, return featured products
    if (filteredProducts.length === 0) {
      filteredProducts = allProducts.filter(product => 
        product.featured && (!currentProductId || product.id !== currentProductId)
      );
    }
    
    // Shuffle the array to get random recommendations
    const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
    
    // Return limited number of products
    return shuffled.slice(0, limit);
  };
  
  const recommendedProducts = getRecommendedProducts();
  
  if (recommendedProducts.length === 0) return null;
  
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
